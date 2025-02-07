---
id: renewals
title: Certificate Renewals
---

All certificates have an expiry date, after which they cannot be used to secure communication. Certificates from Let's Encrypt (our default CA) expire after 90 days, so for that reason renewals need to happen often, and if there's going to be a problem with validation that will prevent the renewal, you need to know in advance of the certificate expiry.

**By default, Certify will attempt to auto-renew your certificates and tell you if something goes wrong**

The renewal frequency defaults to 75% of the certificate lifetime. This is configurable under Settings in the app.

The app includes a Certify background service which performs all the main function for managed certificates, so you don't need to leave the UI open for renewals etc to run. 

## Monitoring Certificate Renewals

### Zero Config Status Reporting API
Unlike almost all other ACME clients, if the renewal process fails repeatedly, **the app  API will try to notify you** via our API before certificate expiration becomes a problem, without any special configuration from yourself, unless you have disabled the *Enable Status Reports to Dashboard* option under Settings. **Ensure that your 'Certificate Authority Account' under Settings > Certificate Authorities is set to a real, monitored, email address** preferably accessible by others if you are a group of site administrators. You do not need to configure anything else like SMTP relays etc. to use this feature, it's all automatic by default.

In addition, as your certificate approaches expiration, the certificate authority (such as Let's Encrypt) *may* also email you. This can also happen if you have changed a certificate (for instance to add more domains to it) so you may get emails for expiring certificates you have since replaced.

### Certify Dashboard
You can optionally send reports to the certifytheweb.com [Dashboard](dashboard/index.md) when a renewal is successful or fails. This is useful if you have multiple system administrators and want to see when a renewal fails, or if you want to monitor renewal attempt status across many servers. You can see the status of all your certificates on the dashboard. To get started with sending reports to the Dashboard, select the *Add to Dashboard* option from the start up screen of the app on your machine.

## App Updates Are Important

If the app offers an update you should check the release notes to see if they sounds relevant to you and if in doubt you should update the app anyway. Certificate Authorities regularly change how their services work, and not updating the app can result in future renewal failures. We only support the latest version of the app at all times.

## Certificate Cleanup

By default the app will remove certificates it has created (which have `[Certify]` in the 'friendly name') once they have been expired for over a month. This is to allow users who have manually allocated the certificate to other services to switch to the latest certificate before we delete the old one.

If you are renewing certificates regularly this means you may notice your server stores several duplicate certificates with different expiration dates at any one time, but they will eventually be cleaned up automatically once the app is sure they have expired and are unlikely to be in continued use.

You can change the certificate cleanup strategy based on your own preferences under Settings in the app. Note that cleaning up certificates too eagerly can limit your fallback options and we recommend the default settings.
