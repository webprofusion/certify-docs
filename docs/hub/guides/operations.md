---
title: Hub Operations
description: Operate Certify Management Hub after installation, including monitoring, upgrades, system checks, maintenance windows, external certificate managers, and support paths.
---

# Hub Operations

## Routine Checks

Use **Certificates > Summary** to see the overall health of your managed certificates and instances. The summary answers three questions, in this order:

- **What needs attention now?** The **Needs attention** list shows only things a person has to act on: requests waiting for you (for example a manual DNS record to create), certificates that have failed repeatedly or are about to expire with no renewal planned in time, certificates that were issued but could not be deployed, and instances that are disconnected, not responding, reporting a problem with themselves, or have a license about to expire. Each certificate or instance appears once, with its latest reason, and drops off the list once the cause is resolved. When nothing needs attention the list is not shown.
- **What is about to happen?** **Next 14 days** shows the renewal attempts planned for each day, which of them are held for a maintenance window, and a marker on any day a certificate will expire before a renewal is planned. Select a day to list its certificates.
- **What happened, and is it getting better or worse?** The status counts show their change since the same time yesterday. **Renewal activity** charts renewed, failed, waiting and deferred requests per day over 7, 30 or 90 days. A rising failed band is often the first sign of a CA, DNS provider or credential problem affecting many certificates. Select a day to show that day's activity. **Managed Instances** shows each instance's connection over the last 24 hours, and **Recent activity** lists events as they happen.

To review an individual item, select the managed certificate and open its **Status** tab. **Recent requests** lists its latest request attempts. Select one to see its stages and every message it produced. **View Log** shows the item's full log.

## Request Progress

**Certificates > Requests** shows certificate requests as they happen.

- **Now** lists running requests first, then requests waiting for you, then queued requests (grouped by renewal pass), then the requests that finished today.
- Each request shows the instance it runs on, what started it (the renewal schedule, a renewal pass, or the person who requested it), how long it has been running, and its progress through the same stages every request uses: Queued, Pre-request tasks, Order, Challenges, Propagation, Validation, Certificate and Deployment. Each stage shows how long it took. While waiting for DNS changes to propagate, the stage counts down to the end of the wait.
- Expand **Run log** to see every message the request produced, not only the latest.
- A request paused for a manual DNS challenge shows the TXT record to create, with copy buttons. Create the record, then select **Resume request**.
- A failed request shows the stage it failed at and how many times in a row it has failed. A certificate that was issued but whose deployment (binding or a deployment task) then failed is shown as such, not as a success.
- **History** lists earlier requests and can be filtered by outcome, instance, date and text.

Instances running an older version do not report stages, so their requests show only the latest message until the instance is upgraded.

## Activity

**Certificates > Activity** lists what the Hub has recorded, newest first, and updates as new activity arrives:

- the outcome of each certificate request, and the totals of each renewal pass (the requests in a pass are grouped under it)
- renewals that were due but held back, for example outside a maintenance window, after repeated failures, or because the target site is stopped
- certificates found to be revoked, and renewals brought forward by a renewal check
- instances joining, connecting, disconnecting, not responding, changing version or license, and reporting or resolving problems with themselves (such as their data store being unavailable)
- the Hub starting and stopping
- changes made through the Hub: certificates added, edited, removed, requested or reset, and deployment tasks run, with who made them

Filter by **Problems**, **Requests**, **Instances** or **Changes**, and by instance, date or text.

Activity follows the same access rules as the certificate list. Users whose roles are limited by tags or domain restrictions only see activity for the certificates they can see, and only users who can list managed instances see instance and Hub activity.

An instance that loses its connection to the Hub holds its activity (up to 500 events) and sends it when it reconnects.

### Activity Retention

The Hub keeps activity and request history for 90 days by default. Change this under **Settings > Hub > General > Activity History** (7 to 730 days). Older history is removed automatically.

The history is kept in the Hub's own `activity.db` file, in the `activity` folder of the Hub data location, separately from the configured data store. Include it in backups if you want to keep the history.

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

If the problem is still not clear after checking Summary, Requests, Activity, and System Status, the next step is to review [Known Issues](../known-issues.md), then [Troubleshooting](../../guides/troubleshooting.md), and then [Get Help and Support](../../support.md) if you need direct assistance.

## Operations Checklist

A simple operating routine is to work through **Needs attention** on the Summary, check that the certificate health counts are not rising, and check for stuck or unexpected in-progress requests. If the environment uses joined instances, confirm that they are connected and have stayed connected. When something changes unexpectedly, filter **Activity** to **Changes** to see recent changes made through the Hub, review recent admin changes to CA accounts, credentials, or security tokens, and check System Status if the UI or service behavior looks abnormal. Before major changes, make sure backups are current and the upgrade plan is clear.

## Read Next

- [Manage certificates in the Hub](certificate-operations.md)
- [Hub settings overview](hub-settings-overview.md)
- [Known Issues](../known-issues.md)
