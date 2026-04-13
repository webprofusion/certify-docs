---
title: Choose a Management Model
description: Decide when to use the Hub itself, joined CCM instances, Agents, or external ACME clients with managed challenge and managed ACME features.
---

# Choose a Management Model

The main design choice is where certificate requests, renewals, and deployment should run.

## Execution Location

Your main options are:

- on the Hub server itself
- on a joined *Certify Certificate Manager* instance
- on a joined *Certify Management Agent* instance
- on a managed instance that subscribes to a Hub-managed certificate
- in another ACME client that uses the Hub only for shared services

## Hub Execution

Best fit:

- the Hub server can reach the target systems and any deployment endpoints it needs
- you want a central web-only operating model
- you only need one or a few execution locations
- local deployment from the Hub is acceptable

Common cases:

- internal services managed from one Windows host
- DNS-based validation where the Hub can complete the order directly
- simple initial deployments and proof-of-concept environments

Less suitable when:

- HTTP validation must happen on many remote web servers
- deployment requires platform-local access that the Hub host does not have
- the work needs to stay with the machine that actually owns the certificate

## CCM Execution

Best fit:

- you already use *Certify Certificate Manager* on Windows servers
- IIS or other Windows-specific deployment remains local to those servers
- you want centralized administration without moving the execution point

Common cases:

- existing Windows certificate automation is already working
- you need to manage many Windows servers from one UI
- deployment uses local Windows features, shares, services, or PowerShell-based automation

## Agent Execution

Best fit:

- the target systems are Linux, macOS, container hosts, or headless environments
- renewals and deployment should happen near the workload
- you want the Hub to control the configuration but not run the work locally

Common cases:

- Apache, nginx, and other non-Windows stacks
- distributed platform teams
- external client monitoring on non-Windows hosts

## Certificate Subscription Model

Best fit:

- one system should renew the certificate
- another managed instance should only consume and deploy it
- CA accounts and challenge configuration should remain centralized

Common cases:

- a Hub-managed certificate is reused by one or more managed instances
- remote instances need the latest certificate but should not run local renewal

This model depends on the managed instance having the **Cert Consumer** role, usually filtered by tag so only the intended certificates are visible.

## External ACME Clients

Best fit:

- you already have another ACME client that you do not want to replace
- you need centralized DNS challenge handling
- you want the Hub to act as a managed ACME endpoint for compatible clients

Service patterns:

- **Managed Challenges**: the client still orders the certificate, but the Hub performs DNS updates on its behalf
- **Managed ACME Service**: the client talks to the Hub's ACME endpoint, and the Hub proxies the order to the real ACME CA

## Selection Criteria

### Hub

- central execution is simpler than distributing execution
- local access from the Hub host is enough
- you want the smallest number of moving parts

### CCM

- the workload is Windows-based
- deployment should stay with the Windows server that owns the workload
- you want to preserve existing CCM operating patterns

### Agent

- the workload is not Windows-based
- you need local execution on Linux or macOS
- you need headless operation

### Certificate Subscription

- renewal should stay on the source system
- the target instance only needs the resulting certificate
- certificate access should be controlled through managed instance roles and tags

### Managed Challenge or Managed ACME

- you want to reduce distribution of DNS API credentials
- you need to support other ACME clients
- the Hub should provide centralized authorization or API-based certificate services

## Mixed Deployments

Many environments use more than one model.

Examples:

- The Hub runs some internal certificates directly, while remote CCM instances handle IIS-bound sites.
- Agents renew certificates on Linux hosts, while the Hub provides managed DNS challenges centrally.
- One Hub-managed certificate is renewed centrally and consumed by selected managed instances through subscriptions.
- A third-party ACME client uses the Hub ACME service, while other systems are joined directly.

## Deployment Sequence

1. Start with one target instance and one working certificate path.
2. Confirm where renewals and deployment should run.
3. Add joined instances where local execution is required.
4. Add managed challenges or managed ACME only when shared services are needed.

## Read Next

- [Hub architecture and terminology](architecture.md)
- [Certificate subscriptions](../guides/certificate-subscriptions.md)
- [Certify Certificate Manager instances](../guides/ccm.md)
- [Certify Management Agent](../guides/agent.md)
- [Managed Challenges](../guides/managedchallenges.md)
- [Managed ACME Service](../guides/acme-server.md)
