---
id: remote-access
title: Deploy to RAS (DirectAccess, VPN, SSTP VPN etc)
sidebar_label: Remote Access (RAS)
description: Sets the SSL certificate used by local Windows Remote Access services with Set-RemoteAccess.
---

The *Deploy to RAS (DirectAccess, VPN, SSTP VPN etc)* task sets the SSL certificate used by Windows Remote Access on the server running Certify, using the `Set-RemoteAccess` PowerShell cmdlet. It provides a basic deployment for RAS. You may need your own script for more complex deployments.

New tasks of this type are named *Deploy to Remote Access Services* by default.

The task runs a PowerShell script on Windows, so Certify must run on the Remote Access server itself.

## Before you start

- Install Certify on the Remote Access server. The `RemoteAccess` PowerShell module must be available there.
- Request the certificate with the name clients connect to, e.g. `vpn.example.com`.
- The task looks for the certificate in the local machine *Personal* (`My`) store, which is where Certify's auto deployment stores it by default.

## Setting up the task

1. Add the *Deploy to RAS (DirectAccess, VPN, SSTP VPN etc)* task under *Tasks* for your managed certificate.
2. Under *Authentication*, choose how the script runs:
   - *Local (as current service user)* runs it as the Certify background service account (Local System by default).
   - *Local (as specific user)* or *Windows (Network)* runs it with a Windows credential you select under *Credentials*. The script still runs on this server.
3. Under *Task Parameters*, set:
   - **Include Service Restart?**: off by default. When enabled, the script stops the `RemoteAccess` service before applying the certificate and starts it again afterwards.
   - **Impersonation LogonType**: the Windows logon type used when the task runs with a selected credential. The default is *Interactive*.
4. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task runs a [PowerShell script](https://github.com/webprofusion/certify-plugins/blob/development/src/DeploymentTasks/Core/Providers/Assets/RemoteAccess.ps1), passing the current certificate details.
- The script imports the `RemoteAccess` module, finds the certificate by thumbprint in `Cert:\LocalMachine\My`, and runs `Set-RemoteAccess -SslCertificate` with it.
- If *Include Service Restart?* is enabled, the script stops the `RemoteAccess` service before `Set-RemoteAccess` and starts it afterwards.
- The task uses the *Automatic* PowerShell execution mode. For how that is resolved, and for impersonation considerations, see [PowerShell Support and Execution Modes](../../guides/powershell-support.md).
- When the task is previewed, nothing is checked or changed. The preview reports the task as ready to run.

If you need a more customized deployment, you can base your own script on this one and use it with a [Run a PowerShell Script](./powershell.md) task.

## Troubleshooting

- **`Set-RemoteAccess` fails because no certificate was given**: the certificate was not found in the local machine *Personal* store, for example because it is stored in the *Web Hosting* store instead.
- **The `RemoteAccess` module or `Set-RemoteAccess` is not found**: the task is not running on a Remote Access server, or the module is not available to the PowerShell version used. See [PowerShell Support and Execution Modes](../../guides/powershell-support.md).
