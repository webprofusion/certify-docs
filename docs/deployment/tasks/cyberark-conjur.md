---
id: cyberark-conjur
title: Deploy to CyberArk Conjur
sidebar_label: CyberArk Conjur
description: Store the certificate, private key and chain in CyberArk Conjur variables, updated on each renewal.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to CyberArk Conjur* task stores the certificate and its private key in [CyberArk Conjur](https://www.conjur.org/) variables, for applications that fetch their secrets from Conjur, for example with Summon, the Conjur CLI or the Conjur Secrets Provider for Kubernetes. It works with Conjur Open Source, Conjur Enterprise (Secrets Manager, Self-Hosted) and Conjur Cloud.

Each renewal writes the variables again, so applications get the renewed certificate the next time they fetch it.

## Before you start

Conjur variables must be declared in policy before anything can write to them. In Conjur:

1. Declare a host for Certify, the variables for the certificate, and permit the host to update and read them. For example, in a file `certify.yml`:

   ```yaml
   - !host certify

   - !policy
     id: certs
     body:
     - &www-example-com
       - !variable www-example-com/certificate
       - !variable www-example-com/private_key
       - !variable www-example-com/chain
       - !variable www-example-com/fullchain
       - !variable www-example-com/pfx

     - !permit
       role: !host /certify
       privileges: [ read, update, execute ]
       resources: *www-example-com
   ```

   Only declare `pfx` if you use *Include PFX*. Applications reading the certificate need `read` and `execute` on the variables they use.

2. Load the policy as a Conjur administrator: `conjur policy load -b root -f certify.yml`. The output includes the API key of the new host. Keep it for the credential below. To get a new API key later, use `conjur host rotate-api-key -i certify`.

For each further certificate, declare another set of variables, with a different path, and permit the host on them.

## Setting up the task

1. Add the *Deploy to CyberArk Conjur* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *CyberArk Conjur API Key* credential. Select *New* to add one, with:
     - **Conjur URL**: the address of the Conjur server, e.g. `https://conjur.example.com`. For Conjur Cloud, use `https://<subdomain>.secretsmgr.cyberark.cloud/api`.
     - **Account**: the Conjur account (organization) name, e.g. `myorg`. For Conjur Cloud, it is `conjur`.
     - **Login**: the host's login, `host/` followed by its ID, e.g. `host/certify`. A host declared in a policy branch includes the branch, e.g. `host/apps/certify`.
     - **API Key**: the host's API key.
     - **CA Certificate** (optional): the CA certificate of the Conjur server's TLS certificate, in PEM format, if it isn't issued by a CA that the computer running the task trusts. Conjur Open Source and Enterprise are often set up with a self-signed CA.
     - **Allow Invalid TLS** (optional): skip checking the TLS certificate of the Conjur server. Use only for testing.
   - **Variable Path**: the path of the variables, e.g. `certs/www-example-com` for the variables `certs/www-example-com/certificate` and so on.
   - **Include PFX** (optional): also store the certificate as a PFX (PKCS#12) file.
3. Save, then run the task with the ▶️ play button.

## Variables

| Variable | Contents |
| --- | --- |
| `<path>/certificate` | The certificate, in PEM format |
| `<path>/private_key` | The private key, in unencrypted PKCS#8 PEM format (`BEGIN PRIVATE KEY`) |
| `<path>/chain` | The intermediate certificates, in PEM format. The root certificate is not included. |
| `<path>/fullchain` | The certificate followed by the intermediate certificates, as most web servers expect |
| `<path>/pfx` | Only with *Include PFX*: the PFX file, base64 encoded. It has the managed certificate's PFX password, if one is set. |

For example, to fetch the certificate and key with the Conjur CLI: `conjur variable get -i certs/www-example-com/fullchain` and `conjur variable get -i certs/www-example-com/private_key`.

## How it works

- The task signs in to Conjur with the host's API key, then writes each variable. The `certificate` variable is written last, so if a deployment stops part way, the next one writes them all again.
- If the `certificate` variable already holds this certificate, the task changes nothing. This needs the `execute` privilege on that variable. Without it, the task writes the variables on every deployment.
- Conjur keeps the last 20 values of each variable as versions.
- When the task is previewed or validated, it signs in, then checks the host can update each variable, and reports what deploying would change, without changing anything. This catches a wrong API key, or variables missing from policy, before a renewal depends on them.

## Limitations

- The task only signs in with an API key, as a Conjur host (or user). Other Conjur authenticators, such as JWT, Kubernetes or cloud identity authenticators, aren't supported.
- The task can't create variables. They must be declared in Conjur policy first, as above.
- Applications that cache the certificate, or only read it at startup, get the renewed certificate the next time they fetch it, for example when they restart.

## Troubleshooting

- **Conjur didn't accept the API key**: check the Account, Login and API Key of the credential. The API key changes when it is rotated, so update the credential after rotating it.
- **Can't update variable ..., or it isn't declared in policy**: Conjur reports both as not found. Check the variable path, declare the variables in policy, and permit the host to `update` them (with `read`, so it can see them).
- **Could not connect to ..., as its TLS certificate isn't trusted**: set the CA Certificate of the credential to the CA certificate of the Conjur server.
- **Could not connect to ...**: check that Certify can reach the Conjur URL over HTTPS, including through any proxy.
