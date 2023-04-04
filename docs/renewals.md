---
id: renewals
title: Certificate Renewals
---

All certificates have an expiry date, after which they cannot be used to secure communication. Certificates from Let's Encrypt expire after 90 days, so for that reason renewals need to happen often, and if there's going to be a problem with validation that will prevent the renewal, you need to know in advance of the certificate expiry.

**By default, Certify will attempt to auto-renew your certificates and tell you if something goes wrong**

If the renewal process fails repeatedly, **it will try to notify you** via our API before certificate expiration becomes a problem, unless you have disabled the *Enable Status Reports to Dashboard* option under Settings. **Ensure that your 'Certificate Authority Account' under Settings > Certificate Authorities is set to a real, monitored, email address** preferably accessible by others if you are a group of site administrators. You do not need to configure anything else like SMTP relays etc. to use this feature, it's all automatic by default.

In addition, as your certificate approaches expiration, the certificate authority (such as Let's Encrypt) will also email you. This can also happen if you have changed a certificate (for instance to add more domains to it) so you may get emails for expiring certificates you have since replaced.

## Dashboard
You can optionally send a notification to the https://certifytheweb.com dashboard when a renewal is successful or fails. This is useful if you have multiple administrators and want to be notified when a renewal fails. You can also see the status of all your certificates on the dashboard. To get started with sending reports to the Dashboard, select the *Add to Dashboard* option from the start up screen of the app on your machine.

## Certificate Cleanup

By default the app will remove certificates it has created (which have `[Certify]` in the 'friendly name') once they have been expired for over a month. This is to allow users who have manually allocated the certificate to other services to switch to the latest certificate before we delete the old one.

If you are renewing certificates regularly this means you may notice your server stores several duplicate certificates with different expiration dates at any one time, but they will eventually be cleaned up automatically once the app is sure they have expired and are unlikely to be in continued use.
