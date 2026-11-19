---
id: kemp-loadmaster
title: Deployment Task - Kemp LoadMaster
---

:::info
The *Deploy to Kemp LoadMaster* task is currently under development and information here relates to an unreleased/beta feature.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to Kemp LoadMaster* task adds or replaces a named SSL certificate on a Progress Kemp LoadMaster using the LoadMaster API.

The certificate is replaced in place under the same name, so any Virtual Services that use it pick up the renewed certificate automatically. You don't need to reassign it after each renewal.

## Before you start

On the LoadMaster:

- Enable the API: *Certificates & Security > Remote Access > Enable API Interface*.
- Create a user for Certify (recommended) with permission to manage SSL certificates and intermediate certificates.
- To sign in with an API key rather than a password, generate an API key for that user under the LoadMaster's user management settings. API keys need a LoadMaster version that supports them.
- Note the management address of the LoadMaster, e.g. `https://192.168.1.10` or `https://lm.example.com:8443`. For an HA pair, use the shared management address so changes are made on the active unit.

## Setting up the task

1. Add the *Deploy to Kemp LoadMaster* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Kemp LoadMaster API* credential. Select *New* to add one, then enter either the user's **API Key**, or their **Username** and **Password**. If you enter an API key, it is used and the username and password are ignored.
   - **LoadMaster Address**: the management URL of the LoadMaster.
   - **Certificate Name**: the name the certificate has, or will have, on the LoadMaster, e.g. `www.example.com`. Names can only contain letters, numbers, `.`, `-` and `_`, so use something like `wildcard_example.com` for a wildcard certificate. The LoadMaster also rejects names that contain the words `ident`, `cfile`, `kfile`, `ffile`, `replace` or `password`.
   - **Allow Untrusted LoadMaster Certificate**: enable this if the LoadMaster still uses its default self-signed management certificate.
3. Save, then run the task with the ▶️ play button.
   - If no certificate with that name exists yet, it is added. Assign it to your Virtual Services on the LoadMaster once.
   - If it already exists, it is replaced and the Virtual Services keep using it.

Renewals run the task automatically after the new certificate is issued.

## How it works

- Intermediate certificates from the certificate chain are added to the LoadMaster's *Intermediate Certs* store first, if they are not already there. They are named `certify-ca-<thumbprint>`. If the LoadMaster rejects one (for example because the same intermediate is already stored under another name), the task logs a warning and carries on.
- The certificate and its private key are then uploaded, replacing any existing certificate with the same name.
- When the task is previewed or validated, it signs in to the LoadMaster and checks which certificates and intermediates already exist, without changing anything. This catches wrong credentials or addresses before a renewal depends on them.

## Troubleshooting

- **Access denied**: check the API key (or username and password), that the user can manage certificates, and that the API interface is enabled.
- **Unexpected response**: check the LoadMaster Address points to the LoadMaster management interface and that the API interface is enabled.
- **Could not connect**: check Certify can reach the management address and port. If the LoadMaster uses a self-signed management certificate, enable *Allow Untrusted LoadMaster Certificate*.
