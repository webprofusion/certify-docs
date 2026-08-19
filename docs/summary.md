---
title: Certify The Web for Certificate Management
description: An executive summary of Certify The Web certificate management products, covering the problems they solve, prerequisites, recommended architecture, licensing, and implementation best practices.
displayed_sidebar: null
---

# Certify The Web for Certificate Management

This document is a high level overview for customers planning their new certificate management solution. It summarizes the problems our products solve, what you need before you start, what a typical deployment looks like, how licensing works, and what we recommend when you roll it out.

## The Problem

Every service that uses TLS (HTTPS etc) needs a certificate. That includes websites, APIs, mail servers, remote access gateways, and internal applications. Certificates prove that a domain is controlled by your organisation, and they make trusted encrypted connections possible.

In the past, certificates could remain valid for years, nowadays they typically expire within weeks or at most months. Public certificate lifetimes are getting shorter, and certificates from [authorities](guides/certificate-authorities.md) such as Let's Encrypt already expire after 90 days, you can even opt for 7 day certificates. Renewing them by hand does not scale, and a missed renewal usually means an outage on a service that was working fine the day before.

Automated (ACME) Certificate management involves five repeating steps:

1. **[Request](certificate-process.md)** a certificate from a [certificate authority](guides/certificate-authorities.md) (CA).
2. **Validate** that you control the domain, using [HTTP](http-validation.md) or [DNS](dns/validation.md).
3. **[Deploy](deployment/tasks_intro.md)** the certificate and its private key to the service that needs it.
4. **[Renew](renewals.md)** the certificate before it expires.
5. **[Monitor](dashboard/index.md)** renewals so failures are noticed before they become outages.

Most organisations can achieve this at a small scale using free command-line tools dilligently monitored by a system administrator. Where it gets complex is when you have dozens or hundreds of servers/services, often managed by different teams using different tools.

*Certify The Web* automates all five steps. Certificates and private keys stay under your control, on your own systems.

## What We Provide

We offer several products. They work well together, and most customers use more than one.

| Product | What it is | Use it when |
|---|---|---|
| **[Certify Management Hub](hub/index.md)** | Self-hosted web UI and API for central management | You have multiple servers or teams, or you want one place to see everything |
| **[Certify Certificate Manager](intro.md)** (CCM) | Windows desktop app and [background service](backgroundservice.md) | Certificates are needed on Windows or IIS servers |
| **[Certify Management Agent](hub/guides/agent.md)** | Lightweight service for headless systems | Certificates are needed on Linux, macOS, or containers |


We offer **[Certify DNS](dns/providers/certifydns.md)**, an optional managed service for [DNS validation](dns/validation.md). It is useful when your DNS provider has no API, or when you do not want DNS credentials stored on every server. It is licensed separately.

We also have **[Certify Dashboard](dashboard/index.md)** which is our hosted [renewal status reporting](renewals.md), generally used with CCM when you want simple renewal visibility without using the hub.

For most new deployments we recommend starting with **Certify Management Hub**, then adding CCM or Agent installations on the servers that need certificates deployed locally.

## Prerequisites


**Operating systems**

- **[Certificate Manager](guides/installation.md)** runs on any currently supported version of Windows or Windows Server. We do not officially support operating systems that Microsoft no longer supports.
- **[Management Hub](hub/installation/index.md)** and **[Management Agent](hub/guides/agent.md)** run on [Windows](hub/installation/windows.md), [Linux](hub/installation/linux.md), macOS, or in [containers](hub/installation/containers.md), including Kubernetes and OpenShift.
- Everything is self-contained. You do not need to install .NET separately.

**Permissions and access**

- Local administrator or root access to install the software.
- Permission to update the certificate store and web server bindings on target servers.
- If you use [DNS validation](dns/validation.md), credentials for your DNS provider, or a delegated setup using [Certify DNS](dns/providers/certifydns.md).

**Validation path**

- For [HTTP validation](http-validation.md), the certificate authority must be able to reach the host over the public internet on port 80.
- For DNS validation, wildcard certificates, or servers without public access, you need a way to update DNS records automatically.

**Anti-virus and endpoint protection**

- (Windows) Add the application, its [background service](backgroundservice.md), and the [`C:\ProgramData\certify` data folder](guides/maintenance.md) to your exclusion list. Endpoint protection products are a common cause of [unexplained renewal failures](guides/troubleshooting.md).

## Recommended Architecture

**Where should the renewal and deployment work actually run?**

Most users adopt a hybrid approach depending on the requirements of the services they are targeting.

Certificates usually need to be installed on the machine that serves them, so the work often needs to happen close to that machine. The Hub gives you one place to administer everything, but the work itself can run wherever it makes most sense.

### The common pattern

For most organisations we recommend:

- **[One Management Hub instance](hub/installation/index.md)** on an internal server, as the central console and API.
- **[Certificate Manager](hub/guides/ccm.md)** on Windows servers that need certificates locally, [joined to the Hub](hub/guides/managed-instances.md).
- **[Management Agent](hub/guides/agent.md)** on Linux, macOS, and container hosts, joined to the Hub.
- **[Certify Dashboard](dashboard/index.md)** for organisation-wide monitoring, including certificates managed by other tools.

The Hub can also [request and deploy certificates directly](hub/guides/request-and-deploy-certificates.md), which is useful for internal services and for early testing.

### Other options

- **[Certificate subscriptions](hub/guides/certificate-subscriptions.md)**: renew a certificate once in the Hub, then let other machines collect and deploy the current copy using CCM/Agent. Good when you want to keep CA accounts and DNS credentials in one place.
- **[Managed challenges](hub/guides/managedchallenges.md)**: the Hub answers DNS challenges on behalf of other systems, so DNS credentials do not need to be spread across servers.
- **[Managed ACME service](hub/guides/acme-server.md)**: existing ACME clients such as Certbot or acme.sh point at the Hub, and the Hub handles the order with the real CA.

Most real environments end up using a mix of these.

### Hosting notes

- If you need to [deploy certificates](deployment/tasks_intro.md) to Windows targets, such as services, shares, or IIS, [host the Hub on Windows](hub/installation/windows.md). Some Windows networking features are not available on Linux.
- The Hub uses [SQLite by default](features/data-stores.md), which is fine for a single instance. For larger deployments you can use Microsoft SQL Server or PostgreSQL. You are responsible for running and backing up those database servers.
- Do not expose the Hub to the public internet. Keep it on an internal network, behind a VPN, or restricted by firewall rules. See [security and access](hub/guides/security-and-access.md).

See [Hub architecture](hub/concepts/architecture.md) and [choosing a management model](hub/concepts/management-models.md) for more detail.

## Licensing Considerations

[Licensing](guides/licensing.md) is based on the number of **installed instances**, not the number of certificates. Every instance can manage an unlimited number of certificates.

**You can evaluate before you buy.** Download and install the products and try them for free, with no feature restrictions and no time limit. We do limit dashboard and notification services we host to primarily service licensed installs. Support is limited to licensed customers and new evaluations.

**There are two ways to license:**

- **License bundles** are fixed-term keys, normally renewed every 12 months, sold by the number of installs they cover. Tiers run from a single install up to 250 installs. Tier names are just bundle sizes and are not related to the size or type of your organisation.
- **Cloud managed licensing** is a monthly subscription billed through the Microsoft Azure Marketplace. You increase or decrease the number of licensed installs whenever you need to. This suits organisations that want central billing or expect the count to change. You are billed for licensed installs, not for activated ones.

### Support
[Customer support](support.md) is provided by our support@certifytheweb.com email helpdesk. We do not currently offer telephone support or pre-sales/onboarding calls. We hope to offer that in the future as our organisation expands beyond the core software implementation & support.

**Points worth knowing before you plan a purchase:**

- *[Certify Management Hub](hub/index.md)* needs a **Power Pro** bundle or higher, or cloud managed licensing with 10 or more seats/installs.
- *[Certify Dashboard](dashboard/index.md)* is included with any of these license keys.
- *[Certify DNS](dns/providers/certifydns.md)* is licensed separately and is not included with other products.
- Licenses can move between installs. Deactivate on the old server, then enter the key on the new one.
- If you deactivate a license, existing renewals keep working. The install simply reverts to unlicensed evaluation mode.
- We sell electronically by credit card, PayPal, or Azure subscription. We do not process purchase orders or manual invoices. If you need centralised or delegated purchasing, use cloud managed licensing, or buy through a reseller.
- Managed service providers can use one key across all customers, or one key per customer, and can assign keys to customer accounts.

Full detail, current pricing, and vendor information are in the [licensing guide](guides/licensing.md).

## Evaluation and Implementation Best Practices

A few things help adoption go smoothly:

### Install

Go ahead and use the software as an evaluation, you will find it fairly easy to find your way around and our docs can help with specific concepts and questions. Spend time trying out features to get a feel for what the software can and can't do. Ask us questions.

### Start small

Pick a non-critical service. Request one certificate. Confirm it deploys, confirm the service presents it, and confirm the renewal is scheduled. Then expand. Adding more instances is easy once the first path works.

### Secure the Hub

Change the default admin password immediately after installation. Configure HTTPS for the [Hub service](hub/installation/service.md). Keep it off the public internet. See [security and access](hub/guides/security-and-access.md) and [OIDC sign-in](hub/guides/oidc.md).

### Prefer DNS validation where HTTP validation is tricky

[DNS validation](dns/validation.md) works for wildcard certificates and for servers with no inbound access from the internet. Use [managed challenges](hub/guides/managedchallenges.md) or [Certify DNS](dns/providers/certifydns.md) so that DNS credentials do not have to live on every server.

### Monitor

Configure preferred notification email address and connect instances to the [Hub](hub/guides/managed-instances.md) or [Dashboard](dashboard/index.md). [Renewal failures](guides/troubleshooting.md) (firewall blocks, expired DNS credentials, CA issues etc) usually start weeks before the certificate expires.

### Keep the software current

Only the latest version is supported, and joined instances need compatible versions to keep talking to the Hub. Use typical industry deployment tools like Ansible.

### Back up your configuration

 Include [`C:\ProgramData\certify` on Windows, or `/usr/share/certify` on Linux](guides/maintenance.md), in your normal backup routine. Note that [stored credentials](guides/security.md) are encrypted to the machine that created them, so a backup alone does not move them to another server. See also [import and export](guides/import-export.md).

### Test before major upgrades 

This matters most if you have custom [PowerShell deployment scripts](guides/powershell-support.md), a [custom service account](guides/service-user-migration.md), or an [alternative database](features/data-stores.md).

## Questions to Consider

- Which services and domains need certificates, and which operating systems do they run on?
- Who should be allowed to request, deploy, and approve certificates?
- Can the certificate authority reach your services for validation over [HTTP](http-validation.md), or do you need [DNS validation](dns/validation.md)?
- Where does each certificate need to be installed or [exported](guides/import-export.md) after renewal?
- Do you want to automate [deployment](deployment/tasks_intro.md) as well, or only renewal?
- Do you need one shared view of renewal failures across teams?

## Suggested Evaluation Path

1. List the domains and services that need certificates, with the operating system for each.
2. [Install *Certify Management Hub*](hub/installation/index.md) in a test environment.
3. Choose a [certificate authority](guides/certificate-authorities.md) and a validation method.
4. Request one or two certificates for non-critical services.
5. Confirm deployment works and that the service presents the new certificate.
6. [Join one Certificate Manager or Agent instance](hub/guides/managed-instances.md) and repeat the test on a remote server.
7. Configure notifications and check the [renewal schedule](renewals.md).
8. Expand to production once the first workflow is well understood.

## Where to Go Next

- [Compare product features in detail](features/index.md)
- [Get started with Certify Management Hub](hub/)
- [Get started with Certify Certificate Manager](intro.md)
- [Get started with Certify Dashboard](dashboard/)
- [Licensing and subscription options](guides/licensing.md)
- [Understand certificate requests and deployment](certificate-process.md)
- [Choose HTTP or DNS validation](http-validation.md)
- [Get help and support](support.md)
