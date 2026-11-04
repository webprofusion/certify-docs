---
title: Certify The Web for Certificate Management
description: An executive summary of Certify The Web certificate management products, covering the problems they solve, prerequisites, recommended architecture, licensing, and implementation best practices.
displayed_sidebar: null
---

# Certify The Web for Certificate Management

This page is a high level overview for customers planning a new certificate management solution. It covers the problems our products solve, what you need before you start, what a typical deployment looks like, how licensing works, and what we recommend during rollout.

## The Problem

Every service that uses TLS (HTTPS and similar) needs a certificate. That includes websites, APIs, mail servers, remote access gateways, and internal applications. A certificate proves that your organization controls a domain, and it lets clients make a trusted, encrypted connection.

Certificates used to stay valid for years. Now they typically expire within weeks or months. Public certificate lifetimes keep getting shorter: certificates from [authorities](guides/certificate-authorities.md) such as Let's Encrypt expire after 90 days, and you can opt for certificates that last about a week. Renewing by hand does not scale, and a missed renewal usually takes down a service that was working fine the day before.

Automated (ACME) certificate management repeats five steps:

1. **[Request](certificate-process.md)** a certificate from a [certificate authority](guides/certificate-authorities.md) (CA).
2. **Validate** that you control the domain, using [HTTP](http-validation.md) or [DNS](dns/validation.md).
3. **[Deploy](deployment/tasks_intro.md)** the certificate and its private key to the service that needs it.
4. **[Renew](renewals.md)** the certificate before it expires.
5. **[Monitor](dashboard/index.md)** renewals so you notice failures before they cause outages.

A system administrator can handle this for a few servers with free command line tools and careful monitoring. It gets harder with dozens or hundreds of servers and services, often run by different teams using different tools.

*Certify The Web* automates all five steps. Certificates and private keys stay on your own systems, under your control.

## What We Provide

Our products work together, and most customers use more than one.

| Product | What it is | Use it when |
|---|---|---|
| **[Certify Management Hub](hub/index.md)** | Self-hosted web UI and API for central management | You have multiple servers or teams, or you want one place to see everything |
| **[Certify Certificate Manager](intro.md)** (CCM) | Windows desktop app and [background service](backgroundservice.md) | Certificates are needed on Windows or IIS servers |
| **[Certify Management Agent](hub/guides/agent.md)** | Lightweight service for headless systems | Certificates are needed on Linux, macOS, or containers |

Two hosted services are also available:

- [Certify DNS](dns/providers/certifydns.md) is an optional managed service for [DNS validation](dns/validation.md). Use it when your DNS provider has no API, or when you do not want DNS credentials stored on every server. It is licensed separately.
- [Certify Dashboard](dashboard/index.md) is our hosted [renewal status reporting](renewals.md). Most customers use it with CCM to see renewal status without running the Hub.

For most new deployments we recommend starting with Certify Management Hub, then adding CCM or Agent installations on the servers that need certificates deployed locally.

### What Certify Management Hub does

The Hub is where you run certificate management for the whole organization. From one web UI and API you can:

- See the health and renewal state of every certificate on every joined instance, filtered by tag, CA, or key type.
- Create and edit certificate definitions and settings on any [joined CCM or Agent instance](hub/guides/managed-instances.md), without signing in to each server.
- [Request, renew, and deploy certificates](hub/guides/request-and-deploy-certificates.md) on the Hub server itself, using its built-in certificate service.
- Renew a certificate once and distribute it to many servers with [certificate subscriptions](hub/guides/certificate-subscriptions.md).
- Answer DNS challenges for other systems with [managed challenges](hub/guides/managedchallenges.md), or give Certbot, acme.sh, and other ACME clients a [managed ACME endpoint](hub/guides/acme-server.md).
- Track renewals made by other ACME clients such as Certbot, acme.sh, Posh-ACME, and win-acme.
- Control access with users, roles, [OIDC sign-in](hub/guides/oidc.md) (for example Microsoft Entra ID), and [API tokens](hub/guides/security-and-access.md) scoped to each instance or automation.

Certificate subscriptions can separate the job of renewing a certificate from the job of using it. The Hub holds the CA accounts, DNS credentials, and renewal settings, and it renews the certificate. Each subscribed CCM or Agent instance fetches the new certificate when the Hub renews it, then runs its own local deployment, such as IIS bindings or deployment tasks. Those servers no longer need to hold CA accounts or DNS credentials. You grant access per instance with the Cert Consumer role, optionally limited by tag, so each server sees only the certificates meant for it. One renewal can feed any number of servers, and a subscriber that loses contact with the Hub retries and catches up when it reconnects.

## Prerequisites

### Operating systems

- [Certificate Manager](guides/installation.md) runs on any currently supported version of Windows or Windows Server. We do not officially support operating systems that Microsoft no longer supports.
- [Management Hub](hub/installation/index.md) and [Management Agent](hub/guides/agent.md) run on [Windows](hub/installation/windows.md), [Linux](hub/installation/linux.md), macOS, or in [containers](hub/installation/containers.md), including Kubernetes and OpenShift.
- Each product is self-contained, so you do not need to install .NET separately.

### Permissions and access

- Local administrator or root access to install the software.
- Permission to update the certificate store and web server bindings on target servers.
- For [DNS validation](dns/validation.md), credentials for your DNS provider, or a delegated setup using [Certify DNS](dns/providers/certifydns.md).

### Validation path

- For [HTTP validation](http-validation.md), the certificate authority must be able to reach the host over the public internet on port 80.
- For DNS validation, wildcard certificates, or servers without public access, you need a way to update DNS records automatically.

### Anti-virus and endpoint protection

On Windows, add the application, its [background service](backgroundservice.md), and the [`C:\ProgramData\certify` data folder](guides/maintenance.md) to your exclusion list. Endpoint protection products are a common cause of [unexplained renewal failures](guides/troubleshooting.md).

## Recommended Architecture

The main decision is where the renewal and deployment work should run. A certificate usually has to be installed on the machine that serves it, so the work often runs on or near that machine. The Hub gives you one place to administer everything, and the work itself can run wherever suits each service. Most organizations end up with a mix of the approaches below.

### Where the work can run

- On the Hub. The Hub requests, validates, and [deploys](hub/guides/request-and-deploy-certificates.md) from its own server. This has the fewest moving parts when the Hub can already reach the systems it manages, for example internal services, DNS validation, or early testing.
- On a joined Certificate Manager. Renewal and deployment run on the Windows server that owns the workload, so IIS bindings, services, and PowerShell tasks stay local, while you administer it from the Hub.
- On a joined Agent. The same model for Linux, macOS, and container hosts running Apache, nginx, and other non-Windows stacks.
- Split between the two, with [certificate subscriptions](hub/guides/certificate-subscriptions.md). The Hub renews, and each subscribed instance only deploys. Use this when you want CA accounts, DNS credentials, and renewal settings kept in one place, or when one certificate is needed on several servers.
- In your existing ACME clients. With [managed challenges](hub/guides/managedchallenges.md) the client still orders the certificate and the Hub makes the DNS updates. With the [managed ACME service](hub/guides/acme-server.md) the client points at the Hub, and the Hub places the order with the real CA.

### The common pattern

For most organizations we recommend:

- [One Management Hub instance](hub/installation/index.md) on an internal server, as the central console and API, holding the shared CA accounts and DNS credentials.
- [Certificate Manager](hub/guides/ccm.md) on Windows servers that need certificates locally, [joined to the Hub](hub/guides/managed-instances.md).
- [Management Agent](hub/guides/agent.md) on Linux, macOS, and container hosts, joined to the Hub.
- Certificate subscriptions for certificates that several servers share, or for servers that should not hold credentials.
- [Certify Dashboard](dashboard/index.md) for organization-wide monitoring. With the Agent, it can also report on certificates renewed by other ACME clients such as Certbot and acme.sh.

### Hosting notes

- If you need to [deploy certificates](deployment/tasks_intro.md) to Windows targets such as services, shares, or IIS, [host the Hub on Windows](hub/installation/windows.md). Some Windows networking features are not available on Linux.
- The Hub uses [SQLite by default](features/data-stores.md), which is fine for a single instance. Larger deployments can use Microsoft SQL Server or PostgreSQL, and you are responsible for running and backing up those database servers.
- Do not expose the Hub to the public internet. Keep it on an internal network, behind a VPN, or restricted by firewall rules. See [security and access](hub/guides/security-and-access.md).

See [Hub architecture](hub/concepts/architecture.md) and [choosing a management model](hub/concepts/management-models.md) for more detail.

## Licensing Considerations

[Licensing](guides/licensing.md) is based on the number of installed instances, not the number of certificates. Each instance can manage an unlimited number of certificates.

You can download and evaluate the products for free, with no feature restrictions and no time limit. Our hosted dashboard and notification services are mainly for licensed installs.

There are two ways to license:

- License bundles are fixed-term keys, normally renewed every 12 months, sold by the number of installs they cover. Tiers run from a single install up to 250 installs. Tier names are just bundle sizes and say nothing about the size or type of your organization.
- Cloud managed licensing is a monthly subscription billed through the Microsoft Azure Marketplace. You can raise or lower the number of licensed installs at any time, which suits organizations that want central billing or expect the count to change. You are billed for licensed installs, not activated ones.

Before you plan a purchase, note that:

- [Certify Management Hub](hub/index.md) needs a Power Pro bundle or higher, or cloud managed licensing with 10 or more installs (seats).
- [Certify Dashboard](dashboard/index.md) is included with any of these license keys.
- [Certify DNS](dns/providers/certifydns.md) is licensed separately and is not included with other products.
- Licenses can move between installs. Deactivate the key on the old server, then enter it on the new one.
- If you deactivate a license, existing renewals keep working and the install reverts to unlicensed evaluation mode.
- We sell electronically by credit card, PayPal, or Azure subscription. We do not process purchase orders or manual invoices. For centralized or delegated purchasing, use cloud managed licensing or buy through a reseller.
- Managed service providers can use one key across all customers or one key per customer, and can assign keys to customer accounts.

The [licensing guide](guides/licensing.md) has full detail, current pricing, and vendor information.

### Support

We provide [customer support](support.md) through our support@certifytheweb.com email helpdesk, for licensed customers and new evaluations. We do not currently offer telephone support or pre-sales and onboarding calls.

## Evaluation and Implementation Best Practices

### Try it first

Install the software as an evaluation and try the features you expect to use, so you learn what it can and can't do for your environment. Our docs cover specific concepts, and you can email us with questions.

### Start small

Pick a non-critical service and request one certificate. Confirm that it deploys, that the service presents it, and that the renewal is scheduled. Adding more instances is easy once that first path works.

### Secure the Hub

Change the default admin password immediately after installation, configure HTTPS for the [Hub service](hub/installation/service.md), and keep it off the public internet. See [security and access](hub/guides/security-and-access.md) and [OIDC sign-in](hub/guides/oidc.md).

### Use DNS validation where HTTP validation is difficult

[DNS validation](dns/validation.md) works for wildcard certificates and for servers with no inbound access from the internet. Use [managed challenges](hub/guides/managedchallenges.md) or [Certify DNS](dns/providers/certifydns.md) so that DNS credentials do not have to live on every server.

### Monitor

Set a notification email address and connect instances to the [Hub](hub/guides/managed-instances.md) or [Dashboard](dashboard/index.md). [Renewal failures](guides/troubleshooting.md) from firewall blocks, expired DNS credentials, or CA issues usually start weeks before the certificate expires, so there is time to fix them if someone sees them.

### Keep the software current

We only support the latest version, and joined instances need compatible versions to keep talking to the Hub. Roll out updates with your usual deployment tools, such as Ansible.

### Back up your configuration

Include [`C:\ProgramData\certify` on Windows, or `/usr/share/certify` on Linux](guides/maintenance.md), in your normal backup routine. [Stored credentials](guides/security.md) are encrypted to the machine that created them, so restoring a backup on another server does not bring them across. See also [import and export](guides/import-export.md).

### Test before major upgrades

Testing matters most if you use custom [PowerShell deployment scripts](guides/powershell-support.md), a [custom service account](guides/service-user-migration.md), or an [alternative database](features/data-stores.md).

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
6. [Join one Certificate Manager or Agent instance](hub/guides/managed-instances.md) and repeat the test on a remote server, then try a [certificate subscription](hub/guides/certificate-subscriptions.md) from the Hub to that instance.
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
- [Security, privacy, and terms (Trust Center)](trust-center/)
- [Get help and support](support.md)
