---
id: intro
title: Get Started with Certify Certificate Manager
description: Install Certify Certificate Manager on Windows, request your first certificate, plan renewals, and find the next guides to read.
---

# Certify Certificate Manager

*Certify Certificate Manager* is a Windows application and background service that automates the requesting, deployment, and renewal of SSL/TLS certificates from [Let's Encrypt and other ACME certificate authorities](guides/certificate-authorities.md).

![Startup UI](/assets/screens/landing_page.png)

## Core Capabilities

- Manage configurations via the desktop application, while a dedicated Windows background service handles scheduled certificate renewals.
- Automatically binds certificates to IIS websites, installs certificates directly to the Windows Certificate Store, or runs deployment tasks to export certificates for other local or remote services.
- Join your [Certify Management Hub](hub) for extended functionality and multi-server administration and monitoring.

## System & Domain Requirements

To use Certify Certificate Manager, your environment should meet the following conditions:
- Use a supported version of Windows ideally with outbound HTTPS access to contact your chosen Certificate Authority (public or custom).
- Install the software directly on the server hosting the target service, or use SSH/UNC shares etc to with deployment tasks to sync certificates to other destination systems.
- Ensure your target domains are active and can complete either [HTTP challenge validation](http-validation.md) (requiring port 80/443 access) or [DNS challenge validation](dns/validation.md) (requiring programmatic control or manual modification of your DNS zone).
- You must keep the software up to date. Certificate Authorities periodically change their services in ways that may become incompatible. 

## Quick Start: Requesting Your First Certificate

Setting up a managed certificate generally involves these steps:

1. **Install:** Download and run the installer as described in the [installation guide](guides/installation.md).
2. **Setup Bindings (IIS):** If you are securing IIS websites, configure your hostname bindings in IIS Manager before beginning.
3. **Add Managed Certificate:** In the Certify UI, click **New Certificate** and specify the domains you want to secure.
4. **Configure Challenge Validation:** Choose a validation method ([HTTP](http-validation.md) or [DNS](dns/validation.md)) and click **Test** to ensure path or DNS access is functional prior to placing the actual order.
5. **Preview**: The Preview tab will show you details of the certificate being ordered and the deployment that will happen, including any matching IIS site bindings the cert will target.
6. **Request Certificate:** Click **Request Certificate** to fetch and apply your certificate. Review the [request and deployment flow](certificate-process.md) to understand how the process executes.
7. **Automatic Renewal:** Once a certificate is successfully requested, Certify's background service will schedule it for routine renewal checks. Learn how this operates in the [renewal behavior guide](renewals.md).




## Options for Larger Deployments

- **Unattended Execution:** The Windows background service runs continuously to manage periodic automated renewals even when no users are logged in.
- **Automation Tasks:** Extend your deployment pipeline with built-in [deployment tasks](deployment/tasks_intro.md), custom [scripting hooks](script-hooks.md), or the [command line interface (CLI)](commandline.md).
- **Centralized Administration:** For coordinating across multiple servers or platforms, see the [Certify Management Hub](hub/) documentation.

## Next Docs to Read

- [Install and upgrade Certify Certificate Manager](guides/installation.md)
- [Request your first certificate](certificate-process.md)
- [Monitor renewals and alerts](renewals.md)
- [Troubleshoot common issues](guides/troubleshooting.md)
- [Browse all product and task entry points](/docs/)

:::info
*Certify The Web* is our [range](/docs/) of certificate management products, including *Certify Certificate Manager*, [Certify Management Hub](hub/), [Certify Dashboard](dashboard/), and [Certify DNS](/docs/dns/providers/certifydns).
:::



