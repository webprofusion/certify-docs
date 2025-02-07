---
id: installation
title: Installation & Upgrades
---

## System Requirements

**Supported OS: Any currently Microsoft Supported Windows or Windows Server edition with .NET Framework 4.6.2 (or higher).**

This app requires outgoing https for API calls. Proxies are not officially supported. 

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

### Common Issues
- For in-app upgrading issues, download the latest version from https://certifytheweb.com and install normally.
- If you are prompted to retry a file copy during upgrade, *do not cancel the setup or attempt rollback*. Instead, wait a moment and try again. The installer will automatically stop the background service but this can take a few seconds.
- If your setup/upgrade has been interrupted or exited abnormally, ensure no other users are using the Certify UI (especially via remote desktop access). Re-run setup.
- If you receive a 'Service Not Started' error see troubleshooting guidance in [Background Service](../backgroundservice.md)
