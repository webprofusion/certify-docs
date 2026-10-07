---
title: Get Started with Certify Dashboard
description: Use Certify Dashboard to monitor certificate renewals across servers, understand reporting sources, and decide when to add Hub or Agent components.
---

# Get Started with Certify Dashboard

*Certify Dashboard* is our hosted service for monitoring certificate renewals across your organization. You can report to the dashboard using [Certify Certificate Manager](/docs/intro) directly, or by using *Certify Management Agent* with supported ACME clients such as *Certbot* and *acme.sh*.

## Best Fit

- You want centralized visibility into renewal success and failure across multiple servers.
- You need a simple hosted monitoring layer without fully centralizing certificate operations.
- You want to see certificate expiry risk and failure details without logging into each server.

![Dashboard](/assets/screens/dashboard/dashboard_example.png)

## Quick Setup

1. If you use *Certify Certificate Manager*, enable dashboard reporting and choose **Add to Dashboard** from the start-up screen.
2. If you use other ACME clients, deploy *Certify Management Agent* and manage that configuration from *Certify Management Hub*.
3. Confirm that renewal activity appears in the dashboard after the next successful request or renewal.

## Features
- Monitor successful and failed renewals.
- See warnings for items nearing certificate expiration.
- View failure messages directly without checking individual server logs.
- Report automatically from *hundreds* of servers, for *thousands* of certificates.
- Avoid unexpected downtime due to repeated renewal failures.
- Minimal configuration required.

## Reporting to the Dashboard
Reports include a summary of the current certificates' public information and the most recent relevant error message from client logs for failed renewals. The reporting method varies depending on the ACME client software used.

### Using Certify Certificate Manager
If you use *Certify Certificate Manager*, you can start reporting to the dashboard by launching the app and selecting the *Add to Dashboard* option on the start-up screen. The instance name will then appear on your dashboard, and any subsequent certificate requests or renewals will be reported as they occur.

Ensure that *Status Reports to Dashboard* is enabled under Settings in the app (enabled by default).

### Using Other ACME Clients
To report to the dashboard from third-party ACME clients, you can use *Certify Management Agent* to monitor and report renewal status. The agent is a service that runs on your servers and understands the configuration of specific ACME clients. The agent configuration is managed using Certify Management Hub.

**We currently support:**
- Certbot
- acme.sh
- win-acme & simple-acme
- Posh-ACME

The agent is designed to run on Linux, macOS, or Windows.

## Team Access
You can give colleagues their own access to your dashboard, license keys and billing without sharing your sign in details. Your account stays the owner of its license keys, purchases and reporting instances.

1. Sign in at [dash.certifytheweb.com](https://dash.certifytheweb.com) and open **Team**.
2. Enter your colleague's email address, choose one or more roles, then select **Send Invitation**.
3. Your colleague follows the link in the email and signs in, or creates an account, using that same email address. Invitations expire after 7 days.

| Role | Access |
| --- | --- |
| Admin | Everything, including inviting and removing team members. |
| Billing | Purchase, renew and cancel licenses, and view invoices. |
| License Viewer | View license keys and their activated installs. |
| Dashboard Admin | View the dashboard, and remove reporting instances and status reports. |
| Dashboard Viewer | View the renewal status reported to the dashboard. |

Team members keep their own account. After accepting an invitation they can move between their own account and your organisation using **Switch Account**. Admins can change a member's roles or remove them from **Team** at any time.

## Licensing
*Certify Dashboard* is included with license key purchases for *Certify Certificate Manager*, *Certify Management Hub* and *Certify Management Agent*.

## Next Docs to Read

- [Certify Management Hub](../hub/)
- [Monitor renewals and alerts](../renewals.md)
- [Get help and support](../support.md)