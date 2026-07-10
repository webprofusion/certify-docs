---
id: installation
title: Install and Upgrade Certify Certificate Manager
description: System requirements, installation steps, upgrade guidance, and common setup issues for Certify Certificate Manager on Windows.
---

Use this guide when you are installing *Certify Certificate Manager* on a Windows server or workstation, or when you need to review upgrade behavior and common installer issues.

## Quick Start

1. Confirm the server can reach the internet over HTTPS.
2. Download the current installer from https://certifytheweb.com.
3. Install with administrative privileges.
4. Request a first certificate using [Request Your First Certificate](../certificate-process.md).

## System Requirements

**Supported OS: Any currently Microsoft Supported Windows or Windows Server edition compatible with [.NET 10](https://github.com/dotnet/core/blob/main/os-lifecycle-policy.md).**

This app requires outgoing https for API calls. Proxies are not officially supported. The app will need to communicate with your choice of Certificate Authority over https (the default is Let's Encrypt). For licensing or status reporting it will need to connect to https://api.certifytheweb.com and if you use any DNS APIs or Deployment Tasks which communicate with a remote API or service you will need connectivity to those.

Some core app functionality can be affected by common anti-virus/protection products (including our background service, temporary http challenge listener, IIS fallback web.config writes etc). We recommend testing your configuration and ensuring that the app, its components, and the `C:\ProgramData\certify` data store path are whitelisted.

Note: The following OS versions **are no longer supported by Microsoft**: Windows Server 2008 R2, Windows 7, Windows 8.0, Windows 8.1, Windows Server 2012, Windows Server 2012 R2. If you are using one of these versions we recommend that you upgrade to a currently supported version of Windows.

## Installing

To get started, download and run the latest version of the app from https://certifytheweb.com 

You can install the *Certify Certificate Manager* app on any Windows machine or server. In general, the app will be installed on the same server that requires the certificate. Most commonly, this will be web servers or mail/webmail servers.

The app consists of a user interface (UI) and a background service for certificate management tasks.

The Windows setup executable is digitally signed as Publisher "Webprofusion Pty Ltd".

The app requires elevated privileges to run. This is primarily in order to update the machine certificate store and update webserver bindings. It is also used to ensure only administrative users are controlling the certificate management features.

The app runs in Community Edition mode by default, see [Licensing](licensing.md) for more information.

## Upgrading

By default the app will check for updates when you open the UI. If you do not regularly open the UI, it's worth checking for updates periodically. Some updates are critical to ensure continuous operation, and only the latest version is supported.

To upgrade manually you can download the latest version and install it. You don't normally need to uninstall first etc.

The latest release notes for the app can be found at https://certifytheweb.com/home/changelog

### Settings are preserved between installs/upgrades
Your settings are preserved in `%PROGRAMDATA%\certify`. For most users, this is `C:\ProgramData\certify`. Uninstalling the app or installing a new version does not remove the files stored here. We recommend including this location in your regular backup procedure.

### Upgrade from v6 to v7
v7 onwards of our app use .Net 10 or higher (self-contained, you do not need to update .net) include substantial changes to compatabilty.
- The Service exctuable has changed from Certify.Service.exe to Certify.Server.Core.exe (Certify Management Agent). If you had special security/firewall rules in place you may need to update them. If you have used a custom service account see below.
- You should test before upgrading, in particular if you have any custom powershell scripts for deployment tasks. Our internal Powershell process has changed from PS5.1 to PS7.x and the app will now call out to the system powershell process by default for compatability.

#### Upgrading with custom service accounts
By default the app would have previously used Local System for it's service. If you have customized this you will need to perform a careful upgrade to preserve encrypted items like Stored Credentials.

To proceed:
- Backup C:\ProgramData\certify (or equivalent location)
. Note which service account you were running the Certify background service under.
- Uninstall Certify Certificate Manager (your ProgramData settings will be preserved)
- Run the install for Certify Certificate Manager 7.x but choose the advanced option, this is to avoid starting the service after the install
- In Windows Local Services, set the log on for the new Certify.Server.Core.exe (Certify Management Agent) service to the same account you were using previously for the old service, ensure service startup is set to automatic, then start the service.
- The service will upgrade your settings and you can now launch the app.
- You should review that renewals are working as expected and any stored credentials for DNS etc are still operational.

#### Emergency Downgrade
If you require an emergency downgrade to 6.x:
- Ensure you have your previous backup of C:\ProgramData\certify ready to restore
- Download the [old version](https://certifytheweb.s3.amazonaws.com/downloads/archive/CertifyTheWebSetup_V6.1.11.exe) 
- Uninstall Certify Certificate Manager.
- Copy the newer C:\ProgramData\certify to a temp/backup location, then remove C:\ProgramData\certify
- Restore your old backup settings to C:\ProgramData\certify
- Install the older version normally.

### Common Issues
- For in-app upgrading issues, download the latest version from https://certifytheweb.com and install normally.
- If you are prompted to retry a file copy during upgrade, *do not cancel the setup or attempt rollback*. Instead, wait a moment and try again. The installer will automatically stop the background service but this can take a few seconds.
- If your setup/upgrade has been interrupted or exited abnormally, ensure no other users are using the Certify UI (especially via remote desktop access). Re-run setup.
- If you receive a 'Service Not Started' error see troubleshooting guidance in [Background Service](../backgroundservice.md)
