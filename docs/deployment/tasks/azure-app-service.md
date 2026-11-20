---
id: task-azure-app-service
title: Deploy to Azure App Service
sidebar_label: Azure App Service
description: Uploads the certificate to Azure and binds it to the primary domain of an Azure App Service web app or function app.
---

:::info
This task is marked as experimental in the app.
:::

:::note
This task is deprecated. Azure offers free *App Service Managed Certificates*, so you may not need your own certificate automation for App Service. If you do, we recommend [deploying to Azure Key Vault](azure-key-vault.md) and importing the certificate to your app from Key Vault instead of using this task.
:::

The *Deploy to Azure App Service [deprecated]* task uploads the certificate to Azure App Service and adds an SNI SSL binding for it on a web app or function app.

## Before you start

In Azure:

- You need a working web app or function app. Its App Service plan must be Basic or higher to use custom certificates.
- Add your custom domain to the app before deploying a certificate for it. After setting up the app it can take several minutes before it accepts certificate deployments through the API.
- Create an app registration (service principal) for Certify, with a client secret. The [Azure DNS](../../dns/providers/azuredns.md#create-an-azure-ad-service-principal) page describes the steps. Note these values:
  - **Directory (tenant) ID**
  - **Application (client) ID**
  - **Client secret** (the secret *value*, not the secret ID). Client secrets expire, so you need to renew it and update the stored credential periodically.
- Give the app registration a role that can read the app, create certificates in the app's resource group and update the app, such as *Contributor* on the resource group.
- Note your *Subscription ID*.

Azure may require the PFX to have a password. To set one, go to *Certificate > Advanced > Signing & Security* and set the PFX password under *Security*, then select *Request Certificate* again to rebuild the certificate with the password.

## Setting up the task

1. Add the *Deploy to Azure App Service [deprecated]* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: an *Azure AD Application Client Secret* credential. Select *New* to add one, with the *Directory (tenant) Id*, *Application (client) Id* and *Client Secret* from your app registration.
   - **App Service Name** (required): the name of the web app or function app, e.g. `my-example-app`.
   - **Subscription Id** (required): the ID of the Azure subscription the app is in.
   - **Azure Service** (required): the Azure cloud the app is in: *Azure Cloud* (the default), *Azure China*, *Azure Germany* or *Azure US Government*.
3. Save, then run the task with the ▶️ play button. You should see a success message in the task log.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task looks for a web app with the *App Service Name* (not case sensitive) in the subscription. If there isn't one, it looks for a function app with that name.
- If the app's resource group already has a certificate with the same thumbprint, the task uses it. Otherwise it uploads the PFX to the resource group, in the app's region, named after the primary domain and the date, e.g. `www.example.com_20261120`. If the managed certificate has a PFX password, it is used for the upload.
- It then adds or updates an SNI SSL binding for the certificate's primary domain on the app. Other domains on the certificate are not bound.
- When the task is previewed, it only checks that *App Service Name* and *Subscription Id* are set. It does not connect to Azure.

## Troubleshooting

- **Service name is required** or **Subscription Id is required**: set the missing parameter.
- **App or function not found**: no web app or function app with that name was found in the subscription. The task log lists the web apps and function apps the credential can see.
- **Azure App Service Deployment Failed**: check the task log for the detail, such as an authentication error from Azure, or an error adding the binding when the custom domain has not been added to the app.
