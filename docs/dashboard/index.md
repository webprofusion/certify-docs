---
title: Using Certify Dashboard
---

*Certify Dashboard* is our hosted service for monitoring certificate renewals. You can report to the dashboard using [Certify Certificate Manager](/docs/intro), or by using our Certify Management Agent (on linux etc) with supported ACME tools like *Certbot* and *acme.sh*.

![Dashboard](/assets/screens/dashboard/dashboard_example.png)

## Features
- Monitor successful and failed renewals.
- Receive warnings for items nearing certificate expiration.
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

**We are currently accepting beta testers for the Dashboard Agent to help refine the product for:**
- Certbot
- acme.sh
- Other suggested ACME clients (contact us to discuss)

The agent is designed to run on Linux, macOS, or Windows.

## Licensing
*Certify Dashboard* is included with license key purchases for *Certify Certificate Manager*, *Certify Management Hub* and *Certify Management Agent*.