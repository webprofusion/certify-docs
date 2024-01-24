---
id: azuredns
title: Using Azure DNS
---

_Azure DNS documentation originally written by: Tony Johncock @Tony1044_

\*Note: If you have not yet selected a DNS API provider to host your domain with be aware that Azure DNS is currently amongst the most complex to configure for API access. You should also note that **Azure Client Secrets can expire, causing your renewals to fail until you replace the key.\***

# To Configure using Azure Portal

## Create an Azure AD Service Principle

- In Azure Active Directory, create a user who will then be assigned permissions to update your DNS zone, this can be an App registration. **Take note of your Application (client) ID and Directory (tenant) ID.**
- In your DNS Zone, use the Access Control (IAM) option to Add a Role Assignment (DNS Zone Contributor). **Take note of your DNS Zone resource-group name and Subscription ID**
- In the app registration user properties, go to Certificates & secrets, Client Secrets > New Client secret. Set a meaningful description such as "Certify The Web DNS updates", and set the preferred expiry (.e.g. 24 Months). When the secret expires the app will fail to make DNS updates, so you need to actively manage this secret and it's expiry. **Copy the secret "value" for later (the secret "ID" is not used)**

You can now add your Azure DNS credential in the app using the above noted values.

# To Configure using Powershell

## Step 1 – Install and configure Azure PowerShell and Microsoft Graph.

Azure PowerShell instructions: https://docs.microsoft.com/en-us/powershell/azure/get-started-azureps

Microsoft Graph instructions: https://learn.microsoft.com/en-us/powershell/microsoftgraph/installation?view=graph-powershell-1.0

## Step 2 – Connect to Azure PS and Microsoft Graph to create the Azure Service Principal and App Registration.

From PowerShell:

```powershell
$SubID = '<your subscription ID>'
$TenantId = '<your tenant (directory) ID>'

# optional commands to elevate and import the required modules
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Import-Module Microsoft.Graph.Applications, Microsoft.Graph.Authentication, Az.Accounts

# connect to Azure
Connect-AzAccount -SubscriptionID $subID

# connect to Graph - your account must have rights to grant consent for your organization
# https://learn.microsoft.com/en-us/graph/security-authorization
Connect-MgGraph -Scopes 'Application.ReadWrite.All' -NoWelcome -TenantID $TenantId
```

This may launch a web dialog to log into your Azure tenant and Microsoft Graph. Ensure you connect with an account with the relevant administrative credentials in the portal and complete any multi-factor authentication required by your organization.

Once connected, create the Application and Service Principal

Run the following script, replacing variables with your information.

```powershell
[array]$dnsZones = 'example.com', 'example.net'

$dnsRG = '<your RG>'

# application name
$appName = "Certify The Web"


# create the application
$App = New-MgApplication -DisplayName $AppName

# create a service principal for the application
$MyServicePrincipal = New-MgServicePrincipal -DisplayName $AppName -AppId $App.AppId -AccountEnabled:$true
```

Use $App and $MyServicePrincipal to view details about the App and SP.

```powershell
$app | format-list
$MyServicePrincipal | format-list
```


The App Registration and Service Principal should now be ready to use. 


## 3 - Grant the Application rights to update DNS

- Login to portal.azure.com from a web browser
- Click on your DNS Zone
- Click on Access Control (IAM)
- Click on (+) Add
- Select:
  - Role: DNS Zone Contributor
  - Assign access to: Azure AD user, group or application
  - Select: Certify The Web
    - The SP name must be typed in, as it will not appear in the user list by default
    - Use your SP name if you did not use the instruction default
  - Click Save

## 4 - Create Service Principal Secret

From the Azure portal, click Azure Active Directory:

- Click App Registrations
- Click "Certify The Web", or whatever app name you used
- Click Certificates & secrets
- Click Client secrets
- Click New client secret
- Type a key description, choose when it will expire (or never – your choice) and click save.

_IMPORTANT: The secret is only shown at this point. Copy it as once it’s hidden there is NO way to retrieve it_

## 5 – Retrieve Tenant ID, Subscription ID and Resource Group Name

There are any number of ways to get the tenant ID, but since we’re already in PowerShell:

```powershell
Get-AzSubscription

Name                     Id                                   TenantId                             State
----                     --                                   --------                             -----
Subscription Name        xxxxxxxx-yyyy-zzzz-aaaa-bbbbbbbbbbbb zzzzzzzz-wwww-yyyy-aaaa-bbbbbbbbbbbb Enabled
```

To find your Resource Group Name, browse to your DNS zone in Azure and note the resource group name shown.

## 6 – Configure Credentials in Certify Certificate Manager

You now have all the information you require to configure Azure settings in the app.

You can add this is a new Stored Credential under Settings or while you are editing a Managed Certificate, under Authorization > DNS.

When using the credential as part of DNS validation in the app you will be prompted for the "Zone Id", for Azure DNS this is the DNS zone name, usually in the form of "yourdomain.com"
