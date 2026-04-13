---
id: hub
title: Get Started with Certify Management Hub
description: Install and secure Certify Management Hub, understand its operating model, request certificates, and administer instances, security, and shared services.
---

# Get Started with Certify Management Hub

*Certify Management Hub* is a self-hosted, cross-platform web UI and API for centralized certificate management, managed challenges, reporting, and multi-instance administration.

:::info[Release Candidate]

The product is in the release candidate phase and is suitable for staged production use with appropriate testing and gradual adoption. If testing, see [Known Issues](known-issues.md)
:::

## Best Fit

- You need centralized certificate management across multiple servers or teams.
- You want a web UI and API instead of a local Windows desktop app.
- You need Linux, macOS, Windows, or container-based deployments.
- You want managed DNS challenges, OIDC sign-in, or visibility into third-party ACME clients.

## Before You Start

- Choose your deployment model first: [containers](installation/containers.md), [Windows](installation/windows.md), or [Linux](installation/linux.md).
- Change the default admin credentials immediately after installation.
- Do not expose the Hub publicly unless you have explicitly designed and reviewed that deployment.
- If you plan to administer existing *Certify Certificate Manager* or *Certify Management Agent* instances, keep them updated so they remain compatible with the Hub.

## Fastest Path to a Working Hub

1. Install the Hub using the [installation guide](installation/index.md) for your preferred platform.
2. Secure the instance by changing the admin password and reviewing the [service and TLS configuration](installation/service.md).
3. Decide whether the first certificate request will run on the Hub itself or on a joined target instance.
4. Follow the Hub-specific [certificate request guide](guides/request-certificate.md).
5. Add [managed challenges](guides/managedchallenges.md), [agents](guides/agent.md), or [Certify Certificate Manager instances](guides/ccm.md) as your deployment grows.


![Startup UI](/assets/screens/hub/hub_intro.png)


## What You Can Add Later

- [Managed Challenges](guides/managedchallenges.md) for centralized validation.
- [Managed ACME Service](guides/acme-server.md) for compatible external ACME clients.
- [Certify Management Agent](guides/agent.md) for Linux, macOS, and headless environments.
- [OIDC sign-in](guides/oidc.md) for external identity providers such as Azure Entra.

## Core Concepts

- [Hub architecture and terminology](concepts/architecture.md)
- [Choose a management model](concepts/management-models.md)

## Core Workflows

- [Request your first certificate](guides/request-certificate.md)
- [Manage certificates in the Hub](guides/certificate-operations.md)
- [Request and deploy certificates](guides/request-and-deploy-certificates.md)
- [Certificate subscriptions](guides/certificate-subscriptions.md)

## Administration

- [Hub settings overview](guides/hub-settings-overview.md)
- [Certificate Authorities and stored credentials](guides/certificate-authorities-and-credentials.md)
- [Security and access](guides/security-and-access.md)
- [Import, export, and migration](guides/import-export-and-migration.md)
- [Day-2 Hub operations](guides/day-2-operations.md)

## Next Docs to Read

- [Install and upgrade Certify Management Hub](installation/index.md)
- [Hub architecture and terminology](concepts/architecture.md)
- [Manage certificates in the Hub](guides/certificate-operations.md)
- [Join Certify Certificate Manager instances](guides/ccm.md)
- [Use Certify Management Agent](guides/agent.md)
- [Review known issues](known-issues.md)


For planned development, see our [hub product roadmap](roadmap.md).