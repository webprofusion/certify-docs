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

## Next Planned Features

- Audit trail (OCSF, OTEL) to aid compliance considerations for industry standard information security compliance frameworks (SOC2, ISO 27001 etc).
   - Event history for charting/reporting, e.g. success vs failure events.
- Revised and extended CLI options for Certify Agent
- Smaller planned feature improvements:
   - Copy/move managed certificates and dependencies between target instances for simpler server migrations.
   - Auto convert instance managed cert to hub managed cert with cert subscription at instance
   - Extending use of tag scoped roles
   - Global reporting web hooks so hub and instances can all automatically submit status to central points of your choice. Include reporting sensitive updates such as a changes to script tasks, assigned tags etc.
   - Bulk instance settings sync/reporting to help manage the same settings across many instances

## Future Focus

1. **Usability enhancements**
   - Improve day-to-day administration, navigation, and certificate workflows.

2. **Documentation refinement**
   - Continue simplifying, expanding, and clarifying product guidance.

3. **Customer-suggested changes and features**
   - Prioritize improvements and new capabilities based on production feedback.

---

Feedback helps prioritize items - contact support if a feature is critical to your deployment.