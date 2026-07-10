---
id: renewals
title: Monitor and Renew Certificates
description: Understand renewal timing, failure notifications, dashboard reporting, and certificate cleanup behavior across Certify Certificate Manager and Certify Management Hub workflows.
---

Renewal timing, failure visibility, dashboard reporting, and certificate cleanup apply across *Certify Certificate Manager* and *Certify Management Hub* managed instances.

All certificates have an expiry date, after which they cannot be used to secure communication. Certificates from Let's Encrypt (our default CA) expire after 90 days, so for that reason renewals need to happen often, and if there's going to be a problem with validation that will prevent the renewal, you need to know in advance of the certificate expiry.

**By default, Certify services attempt to auto-renew your certificates and report when something goes wrong**

The renewal frequency defaults to 75% of the certificate lifetime. This is configurable under Settings in the app.

Renewal operations are performed by the relevant Certify background service/agent, so renewals continue even when no UI session is open. 

## Monitoring Certificate Renewals

### Zero Config Status Reporting API
Unlike almost all other ACME clients, if the renewal process fails repeatedly, **the Certify status API will try to notify you** before certificate expiration becomes a problem, without requiring separate SMTP relay setup, unless status reporting has been disabled.

For best results, ensure your configured Certificate Authority account uses a real, monitored email address which your operations team can access. You can also configure a preferred notification email address under the app settings for each app instance.

In addition, as your certificate approaches expiration, the certificate authority *may* also email you. This can also happen if you have changed a certificate (for instance to add more domains to it) so you may get emails for expiring certificates you have since replaced.

### Certify Dashboard
You can optionally send reports to the certifytheweb.com [Dashboard](dashboard/index.md) when a renewal succeeds or fails. This is useful if you have multiple administrators or need to track renewal status across many servers and instances.

### Certify Management Hub
If you manage a significant number of certificates across multiple machines we recommend adopting [Certify Management Hub](hub/index.md). Individual instances can be joined to the hub for centralized monitoring and administration. The hub also enables a wider range of features and certificate management approaches (such as tagging and certificate subscriptions).

## App Updates Are Important

If your Certify components offer an update, review release notes and update promptly. Certificate Authorities regularly change service behavior, and delayed updates can cause renewal failures. We support the latest versions.

## Certificate Cleanup

By default, Certify removes certificates it created (which have `[Certify]` in the friendly name) once they have been expired for over a month. This allows time for manually managed dependencies to switch to newer certificates before old ones are removed.

If you renew certificates regularly you may notice several versions of a certificate in the store at once, each with different expiration dates. These are eventually cleaned up automatically once considered safe to remove.

You can adjust certificate cleanup strategy in product settings. Cleaning up too aggressively can reduce rollback options, so default settings are generally recommended.
