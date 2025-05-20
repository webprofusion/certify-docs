---
title: Installing on Windows
---

:::warning[feature under development]
This feature is under development and documentation may refer to features and procedures that are not yet available.
:::

## Installing on Windows

There are two ways to install Certify Management Hub directly on Windows (if not using docker etc):

#### Install as a single service
Install as a single combined management hub service, this is the simplest method with the least amount of configuration between components. This serves the Management Hub API, a backend certify-agent instance, and the web UI. Internally this is using the Kestrel web server which is part of Microsoft ASP.Net.

You can download the latest **alpha test** version [7.0.2.23-alpha.07 : Released 2025/05/20](https://certifytheweb.s3.amazonaws.com/downloads/archive/hub/CertifyMgmtHubSetup_7.0.2.23-alpha.07.exe) - this is intended for test evaluation and not for production use, as subsequent updates may including breaking changes.

The current default configuration will make the service and UI available at `http://localhost:8080`

To use the service with https you can either [configure the service to use https](service.md) or reverse proxy the service from a webserver of your choice (Caddy, IIS, nginx, Apache etc and administer https on those as normal).

Do not install the Hub service where you also want to use Certify Certificate Manager as they will share the same settings/databases via different services which could create confusion or conflicts and is not a supported configuration. You can however upgrade a Certify Certificate Manager install to be a hub: uninstall Certify Certificate Manager (the desktop app_ first, install Certify Management Hub, then use the hub to administer your certificates as normal.

### Settings are preserved between installs/upgrades
On Windows your settings are preserved in `%PROGRAMDATA%\certify`. For most users, this is `C:\ProgramData\certify`. Uninstalling the app or installing a new version does not remove the files stored here. We recommend including this location in your regular backup procedure.
