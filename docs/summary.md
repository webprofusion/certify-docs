---
title: Certify The Web for Certificate Management
description: Explore how Certificate Management can work and choose the Certify The Web products that fit your organisation.
displayed_sidebar: null
---

# Certify The Web for Certificate Management

If you are exploring our products and need a general overview of how they can be used to get things done, start here. This guide explains what certificates do, what needs to happen during their lifecycle, and how to choose the *Certify The Web* products that fit your environment.

## What automated certificate management involves

An SSL/TLS certificate proves that a domain belongs to your organisation and enables encrypted connections to a service such as a website, API, mail server, or remote access service. A certificate is issued for a limited period, so keeping services secure involves more than requesting a certificate once.

Certificate management usually includes:

1. **Requesting** a certificate from a certificate authority (CA), such as Let's Encrypt or another ACME-compatible CA.
2. **Validating** that your organisation controls the domain, usually through HTTP or DNS.
3. **Deploying** the certificate and private key to the service that needs it.
4. **Renewing** the certificate before it expires.
5. **Monitoring** renewals and failures so that problems do not become outages.

*Certify The Web* products automate these steps while keeping the certificate and deployment under your control.

## Choose a starting point

The best starting product depends mainly on where your certificates need to be managed. 

Our main *Certify Management Hub* and *Certify Certificate Manager* products can be downloaded and installed for evaluation with **no time limit**. The Hub has no feature limits during evaluation, while CCM will manage a limited number of certificates in its unlicensed mode.

We generally recommend you download and install the apps to evaluate them in a test environment.

### You manage certificates on a few Windows servers

Start with [Certify Certificate Manager](intro.md). It is a Windows desktop application and background service that can request and renew certificates, manage IIS bindings and the Windows Certificate Store, and deploy certificates to other services.

This is usually the right first choice when:

- Your services run on Windows or IIS.
- You just need a certificate for your Windows-based service without any extra complexity.
- One server, or a small number of independently managed servers, is the main scope.
- The people managing certificates are happy to remote desktop to the server to perform administration.
- You might want to upgrade the Hub later, but for now it seems more sophisticated than you really need.

Begin with [installing Certificate Manager](guides/installation.md), then [request your first certificate](certificate-process.md).

### You want central management across servers or teams

Start with [Certify Management Hub](hub/). The Hub provides a self-hosted web UI and API for central administration, access control, reporting, managed DNS challenges, and coordination of connected instances.

This is usually the right first choice when:

- Certificates are spread across multiple servers, sites, or teams.
- You need a shared view of certificate status and renewal failures.
- You want a web interface or API instead of managing each server separately.
- Your environment includes Windows, Linux, macOS, or containers.
- Your requirements are likely to get more sophisticated over time.

The Hub can manage certificates directly and can also coordinate [Certificate Manager](hub/guides/ccm.md) or [Management Agent](hub/guides/agent.md) instances. Start with the [Hub installation guide](hub/installation/index.md).

Broadly, we would expect most customers to use *Certify Management Hub*, with some use of CCM and Agent installations. Before the Hub was available, customers tended to install many CCM instances with no centralized management. For current deployments, we would expect most customers to want to use the Hub. If you have existing CCM installations, you can install the Hub and join them to it.

### You manage certificates on Linux or macOS without a desktop UI

Use [Certify Management Agent](hub/guides/agent.md) for headless Linux and macOS systems. An agent can manage certificates on the target system and report status to the Hub when central administration is needed.

This is a good fit when certificates must be deployed locally on Unix-like systems, especially when there is no suitable desktop session or when the system is managed remotely.

Both CCM and the Agent can monitor the status of renewals for some third-party ACME clients, such as Certbot, acme.sh, Posh-ACME, and win-acme, by reading their local configuration and recent logs and reporting back to the Hub.

### You need organisation-wide renewal visibility

Use [Certify Dashboard](dashboard/) for hosted monitoring of renewal activity, certificate status, and failures across your certificate estate.

Dashboard is focused on visibility. It is a good fit when certificates are already managed by other tools (and monitored by our Agent) or when different teams need a central view without moving certificate deployment into a new system. See [getting started with Dashboard](dashboard/index.md).

### You need delegated DNS validation

Use [Certify DNS](dns/providers/certifydns.md) when DNS validation is the right way to prove domain control and your certificate manager should not have direct access to the authoritative DNS provider. Certify DNS can handle delegated DNS challenges for compatible certificate management workflows.

## Products can work together

These products are not mutually exclusive. Common arrangements include:

- Certificate Manager on Windows servers, connected to the Hub for central administration.
- Management Agent on Linux or macOS systems, reporting to the Hub.
- The Hub managing some certificates directly while coordinating target instances for others.
- Dashboard providing organisation-wide monitoring for certificates managed by different tools.
- Certificate Manager or the Hub using Certify DNS for delegated DNS validation.

Start with the product closest to the systems that need certificates, then add central management or monitoring when the number of systems, teams, or certificate authorities makes local administration difficult.

## Things to Consider

You do not need to know every answer before choosing a product, but these questions will shape your setup:

- Which services and domains need certificates?
- Where do those services run: Windows, Linux, macOS, containers, or a hosted platform?
- Who should request, deploy, and approve certificates?
- Do you need one local administrator or a shared view across teams?
- Can the certificate authority reach your services over HTTP, or will you use DNS validation?
- Where must the certificate be installed or exported after renewal?
- Do you want a centralized view of failed renewal attempts?
- Do you want to automate all deployment, or do you just want to automate certificate *renewal* and leave deployment for some services as separate processes?

For a comparison of capabilities, see the [Product Feature Summary](features/index.md). For terminology and certificate formats, see [Certificates and file formats](guides/certificates.md).

## A practical first workflow

1. List the domains and services that need certificates, including the operating system on which each runs.
2. Choose the product that runs closest to those services.
3. Choose a certificate authority and a validation method.
4. Request a few certificates in a non-critical or test environment.
5. Confirm that deployment works and that the service presents the new certificate.
6. Verify the renewal schedule and configure notifications.
7. Expand to more services, instances, or teams once the first workflow is reliable.

Continue with the relevant product guide:

- [Get started with Certify Certificate Manager](intro.md)
- [Get started with Certify Management Hub](hub/)
- [Get started with Certify Dashboard](dashboard/)
- [Understand certificate requests and deployment](certificate-process.md)
- [Choose HTTP or DNS validation](http-validation.md)