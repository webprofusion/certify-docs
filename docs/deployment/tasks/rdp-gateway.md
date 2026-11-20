---
id: rdp-gateway
title: Deploy to RDP Gateway Service
sidebar_label: RDP Gateway
description: Sets the certificate used by the local Remote Desktop Gateway service.
---

The *Deploy to RDP Gateway Service* task sets the certificate used by Remote Desktop Gateway (RD Gateway) on the server running Certify. It provides a basic deployment for a local RD Gateway. You may need your own script for more complex deployments.

The task runs a PowerShell script on Windows, so Certify must run on the RD Gateway server itself.

## Before you start

- Install Certify on the server with the RD Gateway role.
- Request the certificate with the name your users connect to the gateway with, e.g. `rdgateway.example.com`.
- The task uses the certificate Certify stored in the local machine certificate store during auto deployment.

## Setting up the task

1. Add the *Deploy to RDP Gateway Service* task under *Tasks* for your managed certificate.
2. Under *Authentication*, choose how the script runs:
   - *Local (as current service user)* runs it as the Certify background service account (Local System by default).
   - *Local (as specific user)* or *Windows (Network)* runs it with a Windows credential you select under *Credentials*. The script still runs on this server.
3. Under *Task Parameters*, set:
   - **Include Service Restart?**: off by default. When enabled, the script restarts the `IAS`, `TSGateway` and `SSTPSvc` services after applying the certificate. All three services must be installed, as the script stops with an error if one can't be restarted. If your server doesn't have all of them, leave this off and add a [Stop, Start or Restart a Service](./restart-service.md) task for each service you use instead.
   - **Impersonation LogonType**: the Windows logon type used when the task runs with a selected credential. The default is *Interactive*.
4. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task runs a [PowerShell script](https://github.com/webprofusion/certify-plugins/blob/development/src/DeploymentTasks/Core/Providers/Assets/RDPGatewayServices.ps1), passing the thumbprint of the current certificate.
- The script reads the RD Gateway settings from WMI (`Win32_TSGatewayServerSettings` in the `root/cimv2/TerminalServices` namespace), then calls `SetCertificate` with the certificate thumbprint, followed by `Configure` to apply it.
- If *Include Service Restart?* is enabled, it then restarts `IAS`, `TSGateway` and `SSTPSvc`.
- The task uses the *Automatic* PowerShell execution mode. For how that is resolved, and for impersonation considerations, see [PowerShell Support and Execution Modes](../../guides/powershell-support.md).
- When the task is previewed, nothing is checked or changed. The preview reports the task as ready to run.

If you need a more customized deployment, you can base your own script on this one and use it with a [Run a PowerShell Script](./powershell.md) task.

## Troubleshooting

- **Certificate thumbprint was not supplied**: the managed certificate has no current certificate. Request the certificate first.
- **RD Gateway server settings were not found**: the RD Gateway role is not installed on the server running Certify, or the account the script runs as can't read its settings.
- **SetCertificate failed with return value ...** or **Configure failed with return value ...**: RD Gateway rejected the change. The return value is the error code from the WMI method.
