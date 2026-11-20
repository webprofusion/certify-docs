---
id: google-certificate-manager
title: Deploy to Google Cloud Certificate Manager
sidebar_label: Google Cloud Certificate Manager
description: Deploy the certificate to Google Cloud Certificate Manager as a self-managed certificate, updated in place on each renewal.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to Google Cloud Certificate Manager* task deploys the certificate to [Certificate Manager](https://cloud.google.com/certificate-manager/docs/overview) as a self-managed certificate, for use with Google Cloud load balancers.

The first deployment creates the certificate, unless it already exists. Renewals update the same certificate, so the certificate maps and load balancers that use it pick up each renewal. You attach the certificate to the load balancer once.

## Before you start

In Google Cloud:

1. Enable the Certificate Manager API in the project: `gcloud services enable certificatemanager.googleapis.com --project=my-project-123`.
2. Create a service account for Certify and a JSON key for it, as described for [Secret Manager](google-secret-manager.md#before-you-start). You can use the same service account and key for both tasks.
3. Give the service account the *Certificate Manager Editor* role (`roles/certificatemanager.editor`), or a custom role with these permissions: `certificatemanager.certs.get`, `certificatemanager.certs.create`, `certificatemanager.certs.update` and `certificatemanager.operations.get`.

   ```
   gcloud projects add-iam-policy-binding my-project-123 --member=serviceAccount:certify@my-project-123.iam.gserviceaccount.com --role=roles/certificatemanager.editor
   ```

4. Decide the location of the certificate: `global` for global external Application Load Balancers, or the region of a regional load balancer, e.g. `europe-west1`.

## Setting up the task

1. Add the *Deploy to Google Cloud Certificate Manager* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Google Cloud Service Account Key* credential. Select *New* to add one, and paste the whole contents of the JSON key file.
   - **Project ID** (optional): the project of the certificate, e.g. `my-project-123`. Leave blank to use the project the service account belongs to.
   - **Location**: `global`, or a region, e.g. `europe-west1`.
   - **Certificate ID**: the ID of the certificate in Certificate Manager, e.g. `www-example-com`. If there's no certificate with this ID, the task creates it.
   - **API Endpoint** (optional): a custom Certificate Manager endpoint URL, such as a Private Service Connect endpoint. Leave blank to use `https://certificatemanager.googleapis.com`.
3. Save, then run the task with the ▶️ play button.
4. After the first deployment, attach the certificate where it should be used. For a global load balancer, add it to a certificate map entry, e.g. `gcloud certificate-manager maps entries create www --map=my-map --certificates=www-example-com --hostname=www.example.com`, and attach the map to the target HTTPS proxy. For a regional load balancer, set it on the target HTTPS proxy. Later renewals update it automatically.

## How it works

- The certificate and its intermediate certificates, and its private key, are sent in PEM format. The root certificate is not included.
- A new certificate is labelled `certify-managed-certificate-id`, with the ID of the managed certificate.
- Renewals update the certificate in place, keeping its ID, so the resources using it don't need to change.
- If Certificate Manager already has this certificate, the task changes nothing.
- Creating or updating a certificate is a long-running operation in Google Cloud. The task waits up to 5 minutes for it to finish.
- When the task is previewed or validated, it signs in and reads the certificate, then reports whether deploying would create or update it, without changing anything. This catches wrong credentials, permissions or project IDs before a renewal depends on them.

## Limitations

- Each managed certificate needs its own Certificate Manager certificate. The task won't update a certificate labelled for a different managed certificate.
- The task can't replace a Google-managed certificate. Use a new certificate ID, then move your certificate map entries or proxies to it.
- The task creates certificates with the default scope. To use another scope, create the certificate yourself first, then the task updates it.
- The task doesn't update classic Compute Engine SSL certificate resources (`gcloud compute ssl-certificates`), which can't be changed once created. Use Certificate Manager for load balancers that Certify keeps up to date.
- Certificate Manager supports RSA and ECDSA P-256 and P-384 keys.

## Troubleshooting

- **Google Cloud didn't accept the service account key**: the key, or its service account, has been deleted or disabled. Create a new key and update the credential.
- **Access denied, the service account needs ... permissions**: grant the role or permissions above to the service account.
- **Certificate Manager API has not been used in project ... or it is disabled**: enable the Certificate Manager API in the project.
- **Is a Google-managed certificate**: use the ID of a self-managed certificate, or a new ID.
- **Google Cloud is still working on it after 5 minutes**: check the certificate in the Google Cloud console. The next deployment checks it again.
- **Could not connect to Google Cloud**: check that Certify can reach `oauth2.googleapis.com` and the Certificate Manager endpoint over HTTPS, including through any proxy.
