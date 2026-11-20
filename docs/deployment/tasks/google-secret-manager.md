---
id: google-secret-manager
title: Deploy to Google Cloud Secret Manager
sidebar_label: Google Cloud Secret Manager
description: Store the certificate, private key and chain as a JSON secret in Google Cloud Secret Manager, adding a new version on each renewal.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to Google Cloud Secret Manager* task stores the certificate and its private key as a secret in Google Cloud Secret Manager. Use it for applications that load their own certificate, for example on Cloud Run, GKE or Compute Engine, and read it from Secret Manager. For Google Cloud load balancers, use [Deploy to Google Cloud Certificate Manager](google-certificate-manager.md) instead.

The first deployment creates the secret, unless it already exists. Each renewal is added as a new version, so applications reading the `latest` version get the renewed certificate.

## Before you start

In Google Cloud:

1. Enable the Secret Manager API in the project: `gcloud services enable secretmanager.googleapis.com --project=my-project-123`.
2. Create a service account for Certify, and a JSON key for it:

   ```
   gcloud iam service-accounts create certify --project=my-project-123
   gcloud iam service-accounts keys create certify-key.json --iam-account=certify@my-project-123.iam.gserviceaccount.com
   ```

   If your organization blocks service account key creation (the `iam.disableServiceAccountKeyCreation` policy), ask an administrator for an exception for this project.

3. Give the service account these permissions, for example with a custom role:

   ```
   gcloud iam roles create certifySecretWriter --project=my-project-123 --title="Certify secret writer" --permissions=secretmanager.secrets.get,secretmanager.secrets.create,secretmanager.secrets.update,secretmanager.versions.add,secretmanager.versions.get
   gcloud projects add-iam-policy-binding my-project-123 --member=serviceAccount:certify@my-project-123.iam.gserviceaccount.com --role=projects/my-project-123/roles/certifySecretWriter
   ```

   To limit Certify to one secret, create the secret yourself first, then grant the role on that secret instead of the project with `gcloud secrets add-iam-policy-binding`. Certify then doesn't need `secretmanager.secrets.create`.

4. If the secret is encrypted with a Cloud KMS key, the Secret Manager service agent needs permission to use the key, as for any secret with customer-managed encryption.

Certify doesn't need `secretmanager.versions.access`, as it never reads the secret's value back.

## Setting up the task

1. Add the *Deploy to Google Cloud Secret Manager* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Google Cloud Service Account Key* credential. Select *New* to add one, and paste the whole contents of the JSON key file.
   - **Project ID** (optional): the project of the secret, e.g. `my-project-123`. Leave blank to use the project the service account belongs to.
   - **Secret ID**: the ID of the secret, e.g. `www-example-com-tls`. If there's no secret with this ID, the task creates it, with automatic replication.
   - **KMS Key** (optional): a Cloud KMS key to encrypt the secret with, used when the task creates the secret, e.g. `projects/my-project-123/locations/global/keyRings/certs/cryptoKeys/certs`. Leave blank for Google-managed encryption.
   - **Include PFX** (optional): also store the certificate as a PFX (PKCS#12) file. See [Secret format](#secret-format).
   - **API Endpoint** (optional): a custom Secret Manager endpoint URL, such as a Private Service Connect endpoint. Leave blank to use `https://secretmanager.googleapis.com`.
3. Save, then run the task with the ▶️ play button.

## Secret format

Each version of the secret is a JSON object, in the same format as [Deploy to AWS Secrets Manager](aws-secrets-manager.md#secret-format):

| Field | Contents |
| --- | --- |
| `certificate` | The certificate, in PEM format |
| `private_key` | The private key, in unencrypted PKCS#8 PEM format (`BEGIN PRIVATE KEY`) |
| `chain` | The intermediate certificates, in PEM format. The root certificate is not included. |
| `fullchain` | The certificate followed by the intermediate certificates, as most web servers expect |
| `pfx` | Only with *Include PFX*: the PFX file, base64 encoded. It has the managed certificate's PFX password, if one is set. |

## How it works

- If the secret doesn't exist, the task creates it, annotated `certify-managed-certificate-id` with the ID of the managed certificate.
- The task adds the certificate as a new version of the secret, which becomes the `latest` version. Earlier versions are kept.
- The task records the version it added (`certify-version`) and a SHA-256 hash of its value (`certify-value-sha256`) in the secret's annotations, keeping its other annotations. If the latest version is still the one it added, with the same value, the task changes nothing. If another version has been added since, the task adds the certificate again.
- When the task is previewed or validated, it signs in, reads the secret and checks the service account may add versions, then reports what deploying would change, without changing anything. This catches wrong credentials, permissions or project IDs before a renewal depends on them.

## Limitations

- Each managed certificate needs its own secret. The task won't write to a secret annotated for a different managed certificate.
- Earlier versions of the secret are kept, and Secret Manager charges for each active version. To limit how many are kept, disable or destroy old versions, or set a [version destroy TTL](https://cloud.google.com/secret-manager/docs/version-destroy-ttl) and expire them.
- The task works with global secrets, not regional secrets.
- Applications that cache the secret, or only read it at startup, get the renewed certificate the next time they read it, for example when they restart.

## Troubleshooting

- **Google Cloud didn't accept the service account key**: the key, or its service account, has been deleted or disabled. Create a new key and update the credential.
- **Access denied, the service account needs ... permissions**: grant the permissions above to the service account, on the project or the secret.
- **Secret Manager API has not been used in project ... or it is disabled**: enable the Secret Manager API in the project.
- **Holds the certificate of a different managed certificate**: the secret's `certify-managed-certificate-id` annotation names another managed certificate. Use a different secret ID.
- **Could not connect to Google Cloud**: check that Certify can reach `oauth2.googleapis.com` and the Secret Manager endpoint over HTTPS, including through any proxy.
