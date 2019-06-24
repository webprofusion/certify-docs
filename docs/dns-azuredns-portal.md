---
id: dns-azuredns
title: Using Azure DNS
---

*Azure DNS documentation originally written by: Tony Johncock @Tony1044*

## Step 1 – Create App registrations (Legacy) in Azure Portal

- Login to https://portal.azure.com
- Select Azure Active Directory
- Click App registrations (Legacy)
- Click New application registration
    - Name: LetsCertify
    - Application type: Web app / API
    - Sign-on URL: https://www.mydomain.com
- Copy Application ID (like: xxxxxxxx-yyyy-zzzz-aaaa-bbbbbbbbbbbb)
- Click Settings
- Click Keys
    - Description: Login
    - Expires: never expires
- Click Save
- Copy Password value (aka Service Principal Secret) 

*IMPORTANT: The secret is only shown at this point. Copy it as once it’s hidden there is NO way to retrieve it*

## Step 2 - Grant the Application rights to update DNS
- Click on your DNS Zone
- Click on Access Control (IAM)
- Click on (+) Add
- Select:
    - Role: DNS Zone Contributor
    - Assign access to: Azure AD user, group or application
    - Select: Type in LetsEcnrypt
    - Click Save

## Step 3 – Retrieve Tenant ID
There are any number of ways to get Tenant ID:

- Click on Azure Active Directory
- Click on Properties
- Copy the Directory ID (Tenant ID)

## Step 4 – Retrieve Subscription ID
There are any number of ways to get Subscription ID:

- Click on Subscriptions
- Select your subscription
- In Overview, copy Subscription ID

## 6 – Configure Credentials in Certify SSL Manager

You now have all the information you require to configure Azure settings in the app. 

You can add this is a new Stored Credential under Settings or while you are editing a Managed Certificate, under Authorization > DNS. 

When using the credential as part of DNS validation in the app you will be prompted for the "Zone Id", for Azure DNS this is the DNS zone name, usually in the form of "yourdomain.com"
