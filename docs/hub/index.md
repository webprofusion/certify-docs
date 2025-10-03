---
id: hub
title: Getting Started
---

# Getting Started

*Certify Management Hub* is our new cross-platform product for centralized administration of managed certificates. 

:::warning[Beta Version]

The product is available to try out as an beta version (e.g. not the finished product). The documentation shown here is provisional and subject to major changes. To provide feedback contact `support at certifytheweb.com` or post to https://community.certifytheweb.com/. If testing, see current [Known Issues](known-issues.md)
:::

**All the core features of [Certify Certificate Manager](../intro.md), with a web based management UI and API.**
- **Self-hosted, cross-platform including Linux, macOS or Windows.**
- Optionally manage thousands of certs across hundreds of existing *Certify Certificate Manager* instances, or renew centrally, from a "single pane of glass" UI.
- Multi-user role based access security for administration and consuming certificates, with support for app/service security principles and individual scoped API access
- Optional single sign on with [OIDC support](./guides/oidc.md) via providers such as Azure Entra.
- Distribute certs using optional installed agents, deployment tasks, or use the API to pull the latest cert using your own integrations.
- Optional centralized DNS challenges compatible with most popular ACME clients, so that privileged DNS credentials do not need to be stored across individual ACME clients.
- Optional integrated visibility of renewal status for third party ACME clients such as win-acme, Certbot and acme.sh


![Startup UI](/assets/screens/hub/hub_intro.png)


