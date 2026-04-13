---
title: Day-2 Hub Operations
description: Operate Certify Management Hub after installation, including monitoring, upgrades, system checks, maintenance windows, external certificate managers, and support paths.
---

# Day-2 Hub Operations

## Routine Checks

- **Certificates > Summary** for overall health state
- **Certificates > In Progress** for active requests
- **Settings > System > Status** for service and API status

These three areas cover most routine checks.

## Upgrades

For upgrades:

- keep the Hub updated, especially if it manages other instances
- keep joined instances reasonably aligned with the Hub version
- back up Hub data before significant changes
- verify certificates, instance connectivity, and status reporting after the upgrade

For platform-specific service steps, use the installation docs for [Windows](../installation/windows.md), [Linux](../installation/linux.md), and [service configuration](../installation/service.md).

## Backups

Back up the Hub data location regularly.

Include the settings and datastore path used by the deployment. For Windows and Linux paths, follow the installation documentation.

This is especially important when using local file-based storage or container volumes.

## Maintenance Windows

Use maintenance windows only when renewals must be limited to specific periods.

After enabling them:

- verify the correct default is selected
- confirm any certificate-specific overrides are intentional
- make sure the allowed window is wide enough for retries

Narrow windows reduce resilience.

## System Status

The **System > Status** area shows checks such as:

- Hub API availability
- API URLs allocated
- service config load state
- plugin load state
- datastore health

Review it when:

- the UI behaves unexpectedly
- you need to confirm the service actually started cleanly

## Feature Enablement

The **System > Features** area shows which major Hub capabilities are enabled, including management hub features, certificate management, challenge services, and ACME proxy services.

Check this page if the UI or API does not expose a feature you expected to use.

## External Certificate Manager Monitoring

The General settings area supports configuration for external certificate managers.

Use this when the Hub should monitor renewals managed by tools such as:

- Certbot
- acme.sh
- Posh-ACME
- win-acme or simple-acme

After configuring discovery paths:

- verify the paths are correct for the selected target instance
- confirm the service account can read those paths
- allow time for cached results to refresh

## Tags and Filtering

Use tags consistently to:

- filter certificate views by environment or application
- identify ownership quickly
- support migration or cleanup work later

## Licensing

Review **Settings > Licensing** when:

- applying a new license key
- checking license activation state
- planning changes across multiple managed instances

## Escalation

If the problem is not obvious after checking Summary, In Progress, and System Status, move to:

- [Known Issues](../known-issues.md)
- [Troubleshooting](../../guides/troubleshooting.md)
- [Get Help and Support](../../support.md)

## Operations Checklist

1. Confirm certificate health counts look normal.
2. Review any warning or error items.
3. Check for stuck or unexpected in-progress requests.
4. Confirm joined instances are connected.
5. Review recent admin changes to CA accounts, credentials, or security tokens.
6. Check System Status if the UI or service behavior looks abnormal.
7. Verify backups and upgrade plans before major changes.

## Read Next

- [Manage certificates in the Hub](certificate-operations.md)
- [Hub settings overview](hub-settings-overview.md)
- [Known Issues](../known-issues.md)
