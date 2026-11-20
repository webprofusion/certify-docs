---
id: rdp-listener
title: Deploy to RDP Listener Service
sidebar_label: RDP Listener
description: Sets the certificate used by the local Remote Desktop (RDP) listener.
---

The *Deploy to RDP Listener Service (Terminal Services)* task sets the certificate that the Remote Desktop listener on the server running Certify presents to clients. It provides a basic deployment for a local RDP listener. Use it so that Remote Desktop connections to the server use a trusted certificate instead of the default self-signed one.

The task runs a PowerShell script on Windows, so Certify must run on the server you connect to.

## Before you start

- Request the certificate with the name users connect to the server with, e.g. `server1.example.com`.
- The task uses the certificate Certify stored in the local machine certificate store during auto deployment.

## Setting up the task

1. Add the *Deploy to RDP Listener Service (Terminal Services)* task under *Tasks* for your managed certificate.
2. Under *Authentication*, choose how the script runs:
   - *Local (as current service user)* runs it as the Certify background service account (Local System by default).
   - *Local (as specific user)* or *Windows (Network)* runs it with a Windows credential you select under *Credentials*. The script still runs on this server. This task has no logon type setting, so the credential is used with the *New Credentials* logon type.
3. The task has no other parameters. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task runs a [PowerShell script](https://github.com/webprofusion/certify-plugins/blob/development/src/DeploymentTasks/Core/Providers/Assets/RDPListenerService.ps1), passing the thumbprint of the current certificate.
- The script finds the `RDP-tcp` listener settings in WMI (`Win32_TSGeneralSetting` in the `root/cimv2/TerminalServices` namespace) and sets its `SSLCertificateSHA1Hash` to the certificate thumbprint.
- Only the default `RDP-tcp` listener is updated.
- The task uses the *Automatic* PowerShell execution mode. For how that is resolved, and for impersonation considerations, see [PowerShell Support and Execution Modes](../../guides/powershell-support.md).
- When the task is previewed, nothing is checked or changed. The preview reports the task as ready to run.

If you need a more customized deployment, you can base your own script on this one and use it with a [Run a PowerShell Script](./powershell.md) task.

## Troubleshooting

- **Certificate thumbprint was not supplied**: the managed certificate has no current certificate. Request the certificate first.
- **RDP listener configuration was not found**: no `RDP-tcp` listener was found in WMI, or the account the script runs as can't read it.
