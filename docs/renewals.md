---
id: renewals
title: Certificate Renewals
---

Let's Encrypt certificates expire after 90 days, for that reason renewals need to happen often, and if there's going to be a problem with validation that will prevent the renewal, you need to know in advance of the certificate expiry.

**By default, Certify will attempt to auto-renew your certificates.**

If the process fails repeatedly, **it will try to notify you** (unless you have disabled the option) before certificate expiration becomes a problem. Set your 'Primary Contact' under Settings to a real, monitored, email address preferably accessible by others if you are a group of site administrators.

In addition, as your certificate approaches expiration, Let's Encrypt will also email you. This can also happen if you have changed a certificate (for instance to add more domains to it) so you may get emails for expiring certificates you have since replaced.
