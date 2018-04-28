---
id: ui-options
title: Guide to UI Options
---

# Managed Certificates
The left side of the window shows the list of Managed Certificates the app is currently looking after.

# Managed Certificate Details

## Status
If you have a current certificate managed by the app this view shows the date of the last renewal, when the certificate expires and any issues encountered during the most recent auto-renewal attempts. 

## Certificate Domains
This view lets you manage the domains you will include in your certificate request. 

## Authorization
This view lets you decide how you will prove current control of the domains being requested on your certificate. The options cover [HTTP Validation](http-validation.md) and [DNS Validation](dns-validation.md).

## Preview
This view describes which actions will be performed based on your current settings. This view is especially useful if you have complex deployment requirements and you want to understand exactly what will happen when the certificate is requested and applied.

## Advance Options
Checking 'Show Advanced Options' in the Managed Certificate view enables a range of further options:

## Deployment
By default, deployment is to a single IIS website, adding or updating https bindings as required to upgrade or maintain the website bindings as https.

Other options include:
- Deploy to all websites
- Matching certificate to bindings based on various criteria.
- Storage only (stored to Certificate store in the current machine)
- No Deployment - the certificate file is downloaded but no other deployment action is performed.

## Scripting
### Pre/Post Request Scripting
You can opt to perform [pre and post-request PowerShell scripting](script-hooks.md). This is especially useful for custom deployment tasks which need to be notified of the new certificate thumbprint, or for distributing your new certificate to other services in your organisation.

### Web Hooks
You can also choose to make requests (GET or POST) to custom http based web hooks.

# In Progress
- TODO

# Settings
Commonly used settings you can specify include:

### Auto Renewal Interval (Days) 
This is how many days the app will wait after your certificate was last renewed, before attempting another renewal. This is generally a number well in advance of the default 90 days expiry, to allow time to account for any renewal issues that arise.

## Stored Credentials
Stored Credentials are protected API keys/passwords which are required in order to automate certificate renewal. This is generally used to managed API credentials for DNS API providers.

# About
 - TODO