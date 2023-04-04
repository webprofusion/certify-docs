---
id: task-azure-app-service
title: Deployment Task - Azure App Service
---

The Azure App Service task is built to deploy to either a "web-app" or a "function" via Azure App Service. 

You need a working web-app or function app and an Application User setup using Azure AD, with a corresponding Secret. The info you need to collect for an Azure Application User credential is Directory/Tenant ID, Application/Client ID, Client Secret: (which you need to add using Azure AD and which you need to remind yourself to renew/update periodically).

- Ideally start with a working managed certificate, you will likely find that Azure requires a password to be set on the PFX that will be imported, so set that under Certificate > Advanced > Signing & Security - Security (scroll down for the option). Select *Request Certificate* again to re-build the certificate with the password set.

- Add the *Deploy to Azure App Service* task under Tasks for your managed certificate.

- On the *Task Parameters* tab, select/add the Azure App Service Credential you want to use to authenticate to the App Service, and the Azure App Service you want to deploy to. To add a stored credential, click "New" next to the credentials dropdown list to save new app login details

- Save the managed certificate and then click the ▶️ play button next to the task to run it. You should see a success message in the task log.

- Subsequent automated renewals will also run the deployment task after the renewal has completed successfully.

