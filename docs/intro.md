---
id: intro
title: Get Started with Certify Certificate Manager
description: Install Certify Certificate Manager on Windows, request your first certificate, plan renewals, and find the next guides to read.
---

# Get Started with Certify Certificate Manager

*Certify Certificate Manager* is a Windows application and background service for requesting, deploying, auto-renewing, and monitoring SSL/TLS certificates from [Let's Encrypt and other ACME certificate authorities](guides/certificate-authorities.md).

## Best Fit

- You manage certificates on Windows Server or Windows desktop systems.
- You want a desktop UI with a background service handling renewals.
- You need IIS integration, Windows certificate store deployment, or task-based export and automation.

## Before You Start

- Use a currently supported Windows version with outbound HTTPS access.
- Install on the server or workstation that needs the certificate, unless you have a specific remote deployment design.
- Ensure the domains on the certificate are public and can be validated by either [HTTP validation](http-validation.md) or [DNS validation](dns/validation.md).
- Plan to stay current with updates. Some changes from certificate authorities are operationally significant, and only the latest version is supported.

## Fastest Path to a Working Certificate

1. Install the app using the [installation guide](guides/installation.md).
2. If you use IIS, keep your hostname bindings in place before starting the first request.
3. Create a new managed certificate and confirm the domains you want to include.
4. Choose [HTTP validation](http-validation.md) or [DNS validation](dns/validation.md), then use **Test** if you want to verify the setup before ordering.
5. Review the [request flow and deployment behavior](certificate-process.md), then request the certificate.
6. Confirm the result in **Preview** and review [renewal behavior](renewals.md) so you know how monitoring and retry logic works.


![Startup UI](/assets/screens/landing_page.png)

## What Happens Next

- The background service handles automatic renewals and routine maintenance.
- You can extend deployments using [deployment tasks](deployment/tasks_intro.md), [scripting](script-hooks.md), or the [CLI](commandline.md).
- If you need centralized administration or cross-platform management later, review [Certify Management Hub](hub/).

<div className="diagram">
![Products](/assets/diagrams/products.png)
</div>

## Next Docs to Read

- [Install and upgrade Certify Certificate Manager](guides/installation.md)
- [Request your first certificate](certificate-process.md)
- [Monitor renewals and alerts](renewals.md)
- [Troubleshoot common issues](guides/troubleshooting.md)
- [Browse all product and task entry points](/docs/)

:::info
*Certify The Web* is our [range](/docs/) of certificate management products, including *Certify Certificate Manager*, [Certify Management Hub](hub/), [Certify Dashboard](dashboard/), and [Certify DNS](/docs/dns/providers/certifydns).
:::



