---
id: renewals
title: Certificate Renewals
---

All certificates have an expiry date, after which they cannot be used to secure communication. Certificates from Let's Encrypt expire after 90 days, so for that reason renewals need to happen often, and if there's going to be a problem with validation that will prevent the renewal, you need to know in advance of the certificate expiry.

**By default, Certify will attempt to auto-renew your certificates.**

If the process fails repeatedly, **it will try to notify you** (unless you have disabled the option) before certificate expiration becomes a problem. Set your 'Primary Contact' under Settings to a real, monitored, email address preferably accessible by others if you are a group of site administrators.

In addition, as your certificate approaches expiration, Let's Encrypt will also email you. This can also happen if you have changed a certificate (for instance to add more domains to it) so you may get emails for expiring certificates you have since replaced.

## Certificate Cleanup

By default the app will remove certificates it has created (which have `[Certify]` in the 'friendly name') once they have been expired for over a month. This is to allow users who have manually allocated the certificate to other services to switch to the latest certificate before we delete the old one.

If you are renewing certificates regularly this means you may notice your server stores several duplicate certificates with different expiration dates at any one time, but they will eventually be cleaned up automatically once the app is sure they have expired and are unlikely to be in continued use.
