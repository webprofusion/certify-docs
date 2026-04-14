---
title: Choose a Management Model
description: Decide when to use the Hub itself, joined CCM instances, Agents, or external ACME clients with managed challenge and managed ACME features.
---

# Choose a Management Model

Choosing a management model means deciding where certificate requests, renewals, and deployment should happen. Some teams want everything to run from the Hub. Others need the work to run close to the systems that use the certificate. The best option depends on network access, deployment needs, and how centralized you want day-to-day operations to be. You can use a mixed approach according to your own organizational preferences.

## Execution Location

The Hub supports several ways to manage and operate certificate renewals. You can renew certificate directly on the Hub, on a joined *Certify Certificate Manager* (CCM) instance, on a joined *Certify Management Agent*, on a managed instance that subscribes to a Hub-managed certificate, or in another ACME client that uses the Hub for shared services. Many environments end up using more than one of these models at the same time.

## Hub Execution

The Hub requests the certificate, completes validation, and handles deployment from the Hub server itself. This works well when the Hub can already reach the systems it needs to manage and when local deployment from the Hub is acceptable. It is often a good fit for centralized environments, internal services managed from one Windows host, DNS-based validation, or early proof-of-concept work.

This model is less suitable when work needs to happen on many remote systems or when deployment depends on access that only the target machine has. For example, if HTTP validation must happen on several web servers or deployment relies on platform-local tools, running everything from the Hub can become challenging.

## CCM Execution

CCM execution is a strong choice when you already use *Certify Certificate Manager* on Windows servers. In this model, the Hub gives you centralized administration, but the actual renewal and deployment work still runs on the joined CCM instance. That means IIS deployment and other Windows-specific tasks stay local to the server that owns the workload.

This approach works well when you already have Windows automation in place and do not want to move the execution point. It also fits environments where deployment depends on local Windows features such as IIS, CCS shares, services, or PowerShell-based automation.

## Agent Execution

Agent execution is intended for systems such as Linux, macOS, container hosts, or other headless environments. The Hub still manages the configuration, but the joined Management Agent runs renewals and deployment near the workload. This is useful when you want centralized control without forcing the Hub server to do all the work itself.

It is commonly used for Apache, nginx, and other non-Windows stacks. It also fits distributed platform teams and environments where external client monitoring needs to run on non-Windows hosts.

## Certificate Subscription Model

The certificate subscription model separates renewal from consumption. One system (the hub or another managed instance) renews the certificate, while another managed instance only receives and deploys the latest result. This is useful when you want CA accounts, ACME challenge settings, and renewal logic to stay centralized, but still need the certificate on other machines.

In practice, this allows a Hub-managed certificate to be reused by one or more managed instances without each instance running its own renewal. The managed instance normally needs the **Cert Consumer** role, and access is usually filtered by tag so only the intended certificates are visible.

## External ACME Clients

You can also keep using other ACME clients and use the Hub for shared services. This is helpful when you already have an existing client you do not want to replace, but you still want centralized DNS challenge handling or a managed ACME endpoint.

There are two main patterns. With **Managed Challenges**, the client still orders the certificate, but the Hub performs DNS updates on its behalf. With **Managed ACME Service**, the client talks to the Hub's ACME endpoint, and the Hub proxies the order to the real ACME CA.

## How to Choose

If the Hub server already has the access it needs and you want the fewest moving parts, Hub execution is usually the simplest choice. If the workload is Windows-based and deployment should stay on the Windows server that owns it, CCM is usually the better fit. If the workload is on Linux, macOS, or another headless platform, an Agent is usually the right option.

If renewal should happen in one place but the resulting certificate needs to be used somewhere else, the subscription model is often the cleanest approach. If you need to support other ACME clients or reduce how widely DNS API credentials are distributed, Managed Challenges or Managed ACME Service can be a better match.

## Mixed Deployments

Many real environments use a mix of models. For example, the Hub might handle a few internal certificates directly while remote CCM instances manage IIS-bound sites. Agents may renew certificates on Linux hosts while the Hub provides managed DNS challenges for the wider environment. In another setup, a certificate may be renewed centrally in the Hub and then consumed by selected managed instances through subscriptions. It is also possible to combine joined instances with third-party ACME clients that use the Hub's shared services.

## Deployment Sequence

A practical way to begin is to start with one target instance and make sure one certificate path works from end to end. Once that is working, confirm where renewal and deployment should run in your environment. After that, add joined instances only where local execution is required, and introduce Managed Challenges or Managed ACME only when shared services solve a real problem.

## Read Next

- [Hub architecture and terminology](architecture.md)
- [Certificate subscriptions](../guides/certificate-subscriptions.md)
- [Certify Certificate Manager instances](../guides/ccm.md)
- [Certify Management Agent](../guides/agent.md)
- [Managed Challenges](../guides/managedchallenges.md)
- [Managed ACME Service](../guides/acme-server.md)
