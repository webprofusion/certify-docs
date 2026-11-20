---
id: adfs
title: Deploy to ADFS
sidebar_label: ADFS
description: Applies the certificate to a local Active Directory Federation Services (AD FS) server using the AD FS PowerShell cmdlets.
---

The *Deploy to ADFS* task applies the certificate to Active Directory Federation Services (AD FS) on the server running Certify. Use it to keep the AD FS service communications and SSL certificate up to date after each renewal.

The task runs a PowerShell script on Windows, so it only works where Certify runs on the AD FS server itself.

## Before you start

- Install Certify on the AD FS server. The AD FS PowerShell cmdlets (`Set-AdfsCertificate`, `Set-AdfsSslCertificate`) must be available there.
- Request the certificate with the AD FS service name, e.g. `sts.example.com`, and any other names AD FS needs.
- The task uses the certificate Certify stored in the local machine certificate store during auto deployment. It doesn't update Web Application Proxy servers.

For general guidance on AD FS certificates, see [Manage SSL certificates in AD FS and WAP](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/operations/manage-ssl-certificates-ad-fs-wap).

## Setting up the task

1. Add the *Deploy to ADFS* task under *Tasks* for your managed certificate.
2. Under *Authentication*, choose how the script runs:
   - *Local (as current service user)* runs it as the Certify background service account (Local System by default).
   - *Local (as specific user)* or *Windows (Network)* runs it with a Windows credential you select under *Credentials*. The script still runs on this server.
3. Under *Task Parameters*, set:
   - **Include Service Restart**: on by default. After applying the certificate, the script restarts the `WinHttpAutoProxySvc`, `W3SVC` and `adfssrv` services so AD FS picks up the new certificate.
   - **Use Alternate TLS client binding**: enable this if your AD FS uses the alternate TLS client binding for certificate authentication. The task then also runs `Set-AdfsAlternateTlsClientBinding` with the certificate.
   - **Impersonation LogonType**: the Windows logon type used when the task runs with a selected credential. The default is *Interactive*. *Service*, *Interactive* and *Batch* have been tested with this task.
4. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task runs a [PowerShell script](https://github.com/webprofusion/certify-plugins/blob/development/src/DeploymentTasks/Core/Providers/Assets/ADFS.ps1), passing the thumbprint of the current certificate.
- The script runs `Set-AdfsCertificate -CertificateType Service-Communications`, then `Set-AdfsSslCertificate`, using that thumbprint.
- If *Use Alternate TLS client binding* is enabled, it then runs `Set-AdfsAlternateTlsClientBinding`.
- If *Include Service Restart* is enabled, it then restarts `WinHttpAutoProxySvc`, `W3SVC` and `adfssrv`.
- The task uses the *Automatic* PowerShell execution mode. For how that is resolved, and for impersonation considerations, see [PowerShell Support and Execution Modes](../../guides/powershell-support.md).
- When the task is previewed, nothing is checked or changed. The preview reports the task as ready to run.

If you need a more customized deployment, you can base your own script on this one and use it with a [Run a PowerShell Script](./powershell.md) task.

## Troubleshooting

- **The AD FS cmdlets are not recognized**: the task is not running on an AD FS server, or the AD FS PowerShell module is not available to the PowerShell version used. See [PowerShell Support and Execution Modes](../../guides/powershell-support.md).
- **Errors from `Set-AdfsSslCertificate` or `Set-AdfsAlternateTlsClientBinding`**: these stop the script, and the task fails with the error AD FS reported. Check the task log for the details.
