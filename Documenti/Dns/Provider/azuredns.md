---
id: azuredns
title: Using Azure DNS
---

*Azure DNS documentation originally written by: Tony Johncock @Tony1044*

*Note: If you have not yet selected a DNS API provider to host your domain with be aware that Azure DNS is currently amongst the most complex to configure for API access. You should also note that **Azure Client Secrets can expire, causing your renewals to fail until you replace the key.***

## Step 1 – Install and configure Azure PowerShell

Follow the instructions here: https://docs.microsoft.com/en-us/powershell/azure/get-started-azureps

## Step 2 – Connect to Azure PS and create the Azure Service Principal and Enterprise Application
From PowerShell:

```powershell
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Import-Module Az.Accounts
PS C:\Users\Tony> Connect-AzAccount
```

This will launch a web dialog to log into your Azure tenant. Ensure you connect with an account with the relevant administrative credentials in the portal.

Pop your password and MFA requirements in as required when prompted.

Once connected, create the Application and Service Principal
Run the following script:

```powershell
$azurePassword = ConvertTo-SecureString "your secure password" -AsPlainText -Force

# Import-Module Az.Resources
$credentials = New-Object Microsoft.Azure.Commands.ActiveDirectory.PSADPasswordCredential -Property @{ StartDate=Get-Date; EndDate=Get-Date -Year 2024; Password=$azurePassword}
$MyServicePrincipal = New-AzADServicePrincipal -DisplayName "LetsEncrypt" -PasswordCredential $credentials
```

Once this has successfully run, you need to retrieve the ApplicationID:

```powershell
Get-AzADApplication | Select-Object displayname, objectid, applicationid
```

It returns something like the following:

```
DisplayName    ObjectId                             ApplicationId                       
-----------    --------                             -------------                       
LetsEncrypt    7f64adcf-xxxx-yyyy-zzzz-aabbccddeeff aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
```

Make a note of the ApplicationID

This will have created a service principal and an underlying Azure application.

## 3 - Grant the Application rights to update DNS
- Login to portal.azure.com from a web browser
- Click on your DNS Zone
- Click on Access Control (IAM)
- Click on (+) Add
- Select:
    - Role: DNS Zone Contributor
    - Assign access to: Azure AD user, group or application
    - Select: Type in LetsEncrypt
    - Click Save

## 4 - Create Service Principal Secret

From the Azure portal, click Azure Active Directory:

- Click App Registrations
- Click LetsEncrypt
- Click Certificates & secrets
- Click Client secrets
- Click New client secret
- Type a key description, choose when it will expire (or never – your choice) and click save.

*IMPORTANT: The secret is only shown at this point. Copy it as once it’s hidden there is NO way to retrieve it*

## 5 – Retrieve Tenant ID and Subscription ID
There are any number of ways to get the tenant ID, but since we’re already in PowerShell:

```powershell
Get-AzSubscription

Name                     Id                                   TenantId                             State  
----                     --                                   --------                             -----  
Subscription Name        xxxxxxxx-yyyy-zzzz-aaaa-bbbbbbbbbbbb zzzzzzzz-wwww-yyyy-aaaa-bbbbbbbbbbbb Enabled
```
 
## 6 – Configure Credentials in Certify SSL Manager

You now have all the information you require to configure Azure settings in the app. 

You can add this is a new Stored Credential under Settings or while you are editing a Managed Certificate, under Authorization > DNS. 

When using the credential as part of DNS validation in the app you will be prompted for the "Zone Id", for Azure DNS this is the DNS zone name, usually in the form of "yourdomain.com"
