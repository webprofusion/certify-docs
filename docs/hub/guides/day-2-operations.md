---
title: Day-2 Hub Operations
description: Operate Certify Management Hub after installation, including monitoring, upgrades, system checks, maintenance windows, external certificate managers, and support paths.
---

# Day-2 Hub Operations

## Routine Checks

Use **Certificates > Summary** to see the overall health of your managed certificates. To review indvidual items, select a managed certificate, review the status tab and select the View Log option to see recent log entries.

## Upgrades

Keep the Hub updated, especially if it manages other instances. Joined instances should stay reasonably close to the Hub version so that features and status reporting remain predictable. 

Before any significant upgrade, back up the Hub data and settings. After the upgrade, confirm that certificates still appear correctly, joined instances remain connected, and status information is updating as expected.

For platform-specific service steps, use the installation docs for [Windows](../installation/windows.md), [Linux](../installation/linux.md), and [service configuration](../installation/service.md).

## Backups

Back up the Hub data location regularly. Make sure the backup includes the settings and datastore path used by your deployment. This is especially important if you use local file-based storage or container volumes, because that data can be easier to overlook during infrastructure changes. For the correct Windows and Linux paths, follow the installation documentation.

## Maintenance Windows

Use maintenance windows (per-instance or per-managed certificate) only if renewals *must* be limited to specific times. After enabling them, check that the correct default window is selected, confirm that any certificate-specific overrides are intentional, and make sure the allowed window is wide enough to support retries. If the window is too narrow, renewals become less resilient and temporary failures are harder to recover from.

## System Status

The **System > Status** area shows key health checks for the Hub, including API availability, allocated API URLs, service configuration load state, plugin load state, and datastore health. Review this page when the UI behaves unexpectedly or when you need to confirm that the service started cleanly after a restart, configuration change, or upgrade.

## Feature Enablement

The **System > Features** area shows which major Hub capabilities are enabled, including management hub features, certificate management, challenge services, and ACME proxy services. Check this page when the UI or API does not show a feature you expected to use, because the issue may be feature availability rather than configuration.

## External Certificate Manager Monitoring

The General settings area supports monitoring for external certificate managers. Use this when the Hub should track renewals handled by tools such as Certbot, acme.sh, Posh-ACME, win-acme/simple-acme. After you configure discovery paths, verify that the paths are correct for the selected target instance, confirm that the service account can read them, and allow time for cached results to refresh.

## Tags and Filtering

Use tags consistently so you can filter certificate views by environment or application, identify ownership more quickly, and support migration or cleanup work later. Good tagging becomes more valuable over time, especially as the number of managed certificates and instances grows. 

**Tags used in role scoping inherently have a security implication** because they then control which instances can access each managed certificate etc.

## Licensing

Review **Settings > Licensing** when you need to apply a new license key, check the current activation state, or plan changes across multiple managed instances. This is also a useful place to verify licensing before expansion or upgrade work.

## Escalation

If the problem is still not clear after checking Summary, In Progress, and System Status, the next step is to review [Known Issues](../known-issues.md), then [Troubleshooting](../../guides/troubleshooting.md), and then [Get Help and Support](../../support.md) if you need direct assistance.

## Operations Checklist

A simple operating routine is to confirm that certificate health counts look normal, review any warnings or errors, and check for stuck or unexpected in-progress requests. If the environment uses joined instances, confirm that they are connected. When something changes unexpectedly, review recent admin changes to CA accounts, credentials, or security tokens, and check System Status if the UI or service behavior looks abnormal. Before major changes, make sure backups are current and the upgrade plan is clear.

## Read Next

- [Manage certificates in the Hub](certificate-operations.md)
- [Hub settings overview](hub-settings-overview.md)
- [Known Issues](../known-issues.md)
