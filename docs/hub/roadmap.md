---
id: hub-roadmap
title: Product Roadmap
sidebar_label: Roadmap
---

# Product Roadmap

The roadmap highlights current focus areas for the Certify Management Hub. Timelines are indicative and subject to change as we gather feedback from production deployments.

## Release Status

| Track | Status | Notes |
| --- | --- | --- |
| Hub Release Candidate | ✅ Available | Production-suitable with staged rollout and known issues documented. |
| Agent (Windows/Linux) | ✅ Available | Supports on-device certificate renewal with hub management and 3rd party ACME client reporting. |

## Near-Term

1. **Production GA packaging**
   - Finalize installers and container images.
   - Harden upgrade paths from RC builds.

2. **Managed Instances**
   - Better management UI
   - Improved connection resilience
   - Better synchronization

3. **General Refinements**
   - Responding quickly to customer feedback with releases for important issues etc.

## Mid-Term 

1. **Hub-native Managed Challenges**
   - When working with managed challenges it should become simple or zero-config to use a managed challenge via the hub from any authorized instance including the hub itself.

2. **Tagging**
   - Enhanced ways to tag and categorized items in the hub for easier navigation and filtering when working with large numbers of items or instances.

## Future
1. **Pull certificates**
   - Pull and deploy the latest certificate managed by the hub to an agent
   
## Recently Delivered

- Web-based management UI with API parity to the desktop CCM experience.
- Optional single sign-on through OIDC providers such as Azure Entra.
- Centralized visibility of renewal status, including non-Hub ACME clients.
- Integrated DNS challenge service to avoid distributing privileged DNS credentials.

---

Feedback helps prioritize items - contact support if a feature is critical to your deployment.