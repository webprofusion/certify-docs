---
id: ui-options
title: Guide to UI Options
---

## Managed Certificates
The left side of the main window shows the list of Managed Certificates the app is currently looking after.

## Managed Certificate Details

### Status
If you have a current certificate managed by the app this view shows the date of the last renewal, when the certificate expires and any issues encountered during the most recent auto-renewal attempts. 

You can also open the Log file for this Managed Certificate to see any recently encountered issues.

### Certificate Domains
This view lets you manage the domains you will include in your certificate request:

![Choosing Domains](/assets/choose_domains.png)

You can optionally select an existing website hosted on this server, this will auto populate the list of domains to include in the certificate based on the existing hostname bindings of the website. This website will also become the preferred 'target' for the final deployed certificate.

If you don't choose an existing website or want to manually add domains, enter the domains and select 'Add Domains'. You can add domains individually or in a semicolon separated list.

To remove a domain from the list, select the domain and press the 'Delete' key.

#### Wildcard Domains
You can also manually add *Wildcard Domains* to a certificate request. A wildcard domain takes the form `*.yourdomain.com` and the resulting certificate would cover the `yourdomain.com` and `anything.yourdomain.com`, but it will not cover nested subdomains i.e. `www.anything.yourdomain.com`

You cannot mix certificate requests for a Wildcard and a first-level subdomain (e.g. in a request for `*.yourdomain.com` and `www.yourdomain.com`, you should remove the `www.yourdomain.com` as it's already covered by the wildcard domain).

Wildcard domains require DNS validation, HTTP validation is not supported.

### Authorization (Validation)
This view lets you decide how you will prove current control of the domains being requested on your certificate. The options cover [HTTP Validation](http-validation) and [DNS Validation](dns-validation).

![Authorization](/assets/choose_auth.png)
### Preview
This view describes which actions will be performed based on your current settings. This view is especially useful if you have complex deployment requirements or if you just want to understand exactly what will happen when the certificate is requested and applied.

![Preview](/assets/preview.png)

### Test
You can use the `Test` option to run basic configuration checks to see if your request is likely to succeed or if further configuration is required.

### Request Certificate
When you have configured the options for your certificate, choose `Request Certificate`. The app will then begin the certificate request process (as per the plan shown in 'Preview'). 

If the request is successful your certificate will be created/renewed and deployed as per your settings. If there are problems requesting or deploying your certificate you can see more information under the `Status` tab and in the Log.

Once successfully requested, by default your certificate will auto renew (based on the interval in Settings, and before the 90-day expiry).

### Deployment
By default, deployment is set to 'Auto', which matches all IIS websites which have hostname bindings matching the certificate, adding or updating https bindings as required.

Other options include:
- Deploy to a Single or All websites
- Matching certificate to bindings based on various criteria.
- Storage only (stored to Certificate store in the current machine)
- No Deployment - the certificate file is downloaded but no other deployment action is performed.

### Advance Options
Checking 'Show Advanced Options' in the Managed Certificate view enables a range of further options:

#### Tasks
The app supports a wide range of pre-built deployment task and your own scripting, this enables you to perform all kinds of different custom steps with your new or updated certificate.

##### Pre/Post Request Scripting
You can opt to perform [pre and post-request PowerShell scripting](script-hooks.md). This is especially useful for custom deployment tasks which need to be notified of the new certificate thumbprint, or for distributing your new certificate to other services in your organisation. Note that during certificate renewal your script will run as the account used for the [Background Service](backgroundservice.md), by default this is Local System.

##### Web Hooks
You can also choose to make requests (GET or POST) to custom http based web hooks.

## In Progress
The *In Progress* view shows any currently running request/renewals.

## Settings
Commonly used settings you can specify include:

#### Auto Renewal Interval (Days) 
This is how many days the app will wait after your certificate was last renewed, before attempting another renewal. This is generally a number well in advance of the default 90 days expiry, to allow time to account for any renewal issues that arise.

#### Stored Credentials
Stored Credentials are protected API keys/passwords which are required in order to automate certificate renewal. This is generally used to managed API credentials for DNS API providers.

## About
 On the *About* tab you can:
 - See details on the current app version
 - Check for updates
 - Register - this will take you to the registration website where you can purchase the Professional and Enterprise versions of the app.
 - Enter Key - this allows you to enter a registration key and activate your licensed version of the app.