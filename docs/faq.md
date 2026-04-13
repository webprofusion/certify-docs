---
id: faq
title: Frequently Asked Questions
description: Quick answers and links to the right Certify The Web documentation for common setup, renewal, maintenance, and licensing questions.
displayed_sidebar: helpSupportSidebar
---

# Frequently Asked Questions

This page is a quick answer index. For deeper guidance, follow the linked pages for troubleshooting, maintenance, licensing, and product-specific setup.

## Start Here

- New to the product range: start at the [documentation home](/docs/).
- Installing *Certify Certificate Manager*: see [installation](guides/installation.md).
- Installing *Certify Management Hub*: see [Hub installation](hub/installation/index.md).
- Requesting a certificate: see [requesting a certificate](certificate-process.md) or [Hub certificate requests](hub/guides/request-certificate.md).

## Common Questions

### What is *Certify Certificate Manager*?

*Certify Certificate Manager* is a Windows application and background service for requesting, renewing, deploying, and monitoring certificates from Let's Encrypt and other ACME certificate authorities. It is designed to make certificate operations predictable and automatable.

### Is the product commercially supported?

Yes. Full-time [email support](support.md) is available for licensed users and active evaluations. Community Edition users are encouraged to use the community forum and self-service documentation.

### Do I need to keep the app running?

No. The UI can be closed. The background service continues to manage renewals and routine tasks. If the UI shows **Service Not Started**, use the [troubleshooting guide](guides/troubleshooting.md) and [background service guide](backgroundservice.md).

### What do I need to know about the certificates it requests?

We are not a certificate authority. The certificates are issued by the CA you choose, and the usual CA rules still apply. Common examples include:

- Let's Encrypt certificates are limited to a 90 day expiry (which is why auto-renewal is very important). 
- Let's Encrypt support up to 100 domains per certificate.
- Rate limits apply when using CA APIs such as Let's Encrypt: https://letsencrypt.org/docs/rate-limits/
- Using a CA through the app means you also agree to the CA's current terms and conditions.
- Certificates must be for public domains. Local intranet hostnames are not supported.

### Can I use the same CA contact email on multiple machines?

Yes. The same contact email can be used across multiple installs, or you can vary it if required.

## Find the Right Guide

- [Troubleshooting request, validation, and renewal problems](guides/troubleshooting.md)
- [Maintenance and data locations](guides/maintenance.md)
- [Licensing, transfers, and subscription options](guides/licensing.md)
- [Get help and support](support.md)
- [Certify Dashboard](dashboard/index.md)
- [Certify DNS](dns/providers/certifydns.md)

## Still Not Sure Where to Go?

If the problem category is unclear, start with [troubleshooting](guides/troubleshooting.md), then use [support](support.md) if needed.