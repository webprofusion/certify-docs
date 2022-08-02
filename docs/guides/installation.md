---
id: installation
title: Installation & Upgrades
---



## System Requirements

**Supported OS: Windows Server 2012 R2 (or higher, includes Windows 10) with .Net 4.6.2 (or higher).**

This app requires outgoing https for API calls, proxies are not officially supported.

## Installing

To get started, download and run the latest version of the app from https://certifytheweb.com 

You can install the Certify The Web - Certify Certificate Manager app on any Windows machine or server. In general the app will be installed on the same server that requires the certificate and most commonly this will be web servers or mail/webmail servers. 

The app consists of a user interface (UI) and a background service for certificate management tasks.

The setup file is digitally signed as Publisher 'Webprofusion Pty Ltd'.

The app requires elevated privileges to run. This is primarily in order to update the machine certificate store and update webserver bindings and is also used to ensure only administrative users are controlling the certificate management features.

The app runs in Community Edition mode by default, see [Licensing](licensing.md) for more information.

## Upgrading

By default the app will check for updates when you open the UI. If you do not regularly open the UI it's worth checking for updates periodically as some updates are critical to ensure continuous operation and only the latest version is supported.

The latest release notes for the app can be found at https://certifytheweb.com/home/changelog

### Settings are preserved between installs/upgrades
Your settings are preserved in `%PROGRAMDATA%\certify` so for most users this is `C:\ProgramData\certify`. Uninstalling the app or installing a new version does not remove the files stored here. We recommend including this location in your regular backup procedure.

### Common Issues
- If you are having problems with in-app upgrading, download the latest version from https://certifytheweb.com and install normally.
- If you are prompted to retry a file copy during upgrade, *do not cancel the setup or attempt rollback*. Instead, wait a moment and try again. The installer will automatically stop the background service but this can take a few seconds.
- If your setup/upgrade has been interrupted or exited abnormally, ensure no other users are using the Certify UI (especially via remote desktop access). Re-run setup.
- If you receive a 'Service Not Started' error see troubleshooting guidance in [Background Service](../backgroundservice.md)
