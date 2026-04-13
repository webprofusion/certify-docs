---
id: hub-roadmap
title: Product Roadmap
sidebar_label: Roadmap
---

# Product Roadmap

The roadmap highlights recently delivered work and the next focus areas for Certify Management Hub. Timelines are indicative and subject to change as we gather feedback from production deployments.

## Release Status

| Track | Status | Notes |
| --- | --- | --- |
| Hub Release Candidate | ✅ Available | Production-suitable with staged rollout and known issues documented. |
| Agent (Windows/Linux) | ✅ Available | Supports on-device certificate renewal with hub management and 3rd party ACME client reporting. |

## Recently Delivered

- Packaging and upgrade-path hardening for staged production use.
- Managed instance administration improvements, including management UI, resilience, and synchronization.
- Hub-native managed challenge workflows.
- Enhanced tagging and filtering for certificates and instances.
- Certificate subscriptions for consuming Hub-managed certificates from managed instances.
- Customer feedback-driven refinements and releases.
- Web-based management UI with API parity to the desktop CCM experience.
- Optional single sign-on through OIDC providers such as Azure Entra.
- Centralized visibility of renewal status, including non-Hub ACME clients.
- Integrated DNS challenge service to avoid distributing privileged DNS credentials.

## Future Focus

1. **Usability enhancements**
   - Improve day-to-day administration, navigation, and certificate workflows.

2. **Documentation refinement**
   - Continue simplifying, expanding, and clarifying product guidance.

3. **Customer-suggested changes and features**
   - Prioritize improvements and new capabilities based on production feedback.

---

Feedback helps prioritize items - contact support if a feature is critical to your deployment.