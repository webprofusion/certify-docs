---
id: azure-key-vault
title: Deploy to Azure Key Vault
sidebar_label: Azure Key Vault
description: Imports the certificate and its private key to an Azure Key Vault as a Key Vault certificate.
---

The *Deploy to Azure Key Vault* task imports the certificate, with its private key, to an Azure Key Vault. Use it when Azure services, or your own applications, read their certificates from Key Vault. For example, Azure Application Gateway, Azure Front Door and Azure App Service can all use a certificate from Key Vault.

Each renewal imports the certificate under the same name, which adds a new version of the Key Vault certificate. Services that reference the certificate without a specific version pick up the latest version.

## Before you start

In Azure:

- Create a Key Vault, or choose an existing one, and note its *Vault URI*, e.g. `https://my-vault.vault.azure.net/`.
- Create an app registration (service principal) for Certify, with a client secret. The [Azure DNS](../../dns/providers/azuredns.md#create-an-azure-ad-service-principal) page describes the steps. Note these values:
  - **Directory (tenant) ID**
  - **Application (client) ID**
  - **Client secret** (the secret *value*, not the secret ID)
- Give the app registration permission to import certificates to the vault:
  - If the vault uses Azure role-based access control, assign the *Key Vault Certificates Officer* role to the app registration on the vault.
  - If the vault uses access policies, add an access policy for the app registration with the *Import* certificate permission.

Client secrets expire. When the secret expires the task fails until you add a new secret in Azure and update the stored credential in Certify.

## Setting up the task

1. Add the *Deploy to Azure Key Vault* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: an *Azure AD Application Client Secret* credential. Select *New* to add one, with the *Directory (tenant) Id*, *Application (client) Id* and *Client Secret* from your app registration.
   - **Azure Vault Uri** (required): the URI of your Key Vault, e.g. `https://my-vault.vault.azure.net/`.
   - **Certificate Name** (optional): the name for the certificate in Key Vault. It can contain only letters, numbers and `-`. If you leave it blank (or enter only spaces), the name of the managed certificate is used, with `.` replaced by `-` (so `www.example.com` becomes `www-example-com`) and international domain names converted to their ASCII (`xn--`) form.
   - **PFX Friendly Name** (optional): a friendly name to set on the certificate in the PFX before it is imported.
   - **Azure Service** (required): the Azure cloud your vault is in: *Azure Cloud* (the default), *Azure China* or *Azure US Government*. Azure Germany has closed, so tasks still set to it fail validation with a message asking you to choose another cloud.
3. Save, then run the task with the ▶️ play button. The task log shows `Deployed certificate [name] to Azure Key Vault` when it succeeds.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task signs in to Azure with the client secret credential, using the sign in authority for the selected *Azure Service*.
- It imports the managed certificate's PFX file (certificate, private key and chain) using the Key Vault certificate import operation. If the managed certificate has a PFX password (*Certificate > Advanced > Signing & Security*), the password is passed to Key Vault with the import.
- If the Key Vault certificate name already exists, Key Vault adds the import as a new version of that certificate.
- When the task is previewed, it only checks that the *Azure Vault Uri* is set, that the *Azure Service* is supported, and that a custom *Certificate Name* uses valid characters. It does not connect to Azure.

## Troubleshooting

- **Vault URI is required**: set the *Azure Vault Uri*.
- **Azure Service [...] is not supported**: the task is set to *Azure Germany*, which has closed. Choose the cloud your vault is in.
- **Certificate name can only be alphanumeric**: the *Certificate Name* contains a character other than a letter, number or `-`.
- **Key Vault Deployment Failed**: check the task log for the detail.
  - *Azure Authentication error*: the log includes the Directory (tenant) ID and Application (client) ID from the stored credential. Check they match your app registration, that the client secret value is correct and has not expired, and that the *Azure Service* matches the cloud your tenant is in.
  - A *Forbidden* error from Key Vault means the app registration doesn't have permission to import certificates to the vault. See [Before you start](#before-you-start).
- If your managed certificate name contains characters other than letters, numbers, `.` and `-` (for example a space or the `*` of a wildcard domain), set a *Certificate Name* so Key Vault accepts the name.

For an Azure App Service, consider using a certificate from Key Vault rather than the deprecated [Deploy to Azure App Service](azure-app-service.md) task.
