---
title: Install for Windows
---


#### Installing Certify Management Hub
The management hub is installed as a single service which serves the Management Hub API, a backend certify-agent instance, and the web UI. Internally this is using the Kestrel web server which is part of Microsoft ASP.Net.

[Download the latest **beta** version for Windows](https://downloads.certifytheweb.com/beta/latest/certify-mgmthub-windows-x64-latest.exe) 

Note: this version is intended for test evaluation and is not yet intended for production use, as subsequent updates may including breaking changes.

### Upgrading
To upgrade download and install the latest version as normal. On Windows your settings are preserved in `%PROGRAMDATA%\certify`. For most users, this is `C:\ProgramData\certify`. Uninstalling the app or installing a new version does not remove the files stored here. We recommend including this location in your regular backup procedure.

## Additional Information

The current default configuration will make the service and UI available at `http://localhost:8080`

To use the service with https you can either [configure the service to use https](service.md) or reverse proxy the service from a webserver of your choice (Caddy, IIS, nginx, Apache etc and administer https on those as normal).

Do not install the Hub service where you also want to use Certify Certificate Manager as they will share the same settings/databases via different services which could create confusion or conflicts and is not a supported configuration. You can however upgrade a Certify Certificate Manager install to be a hub: uninstall Certify Certificate Manager (the desktop app) first, install Certify Management Hub, then use the hub to administer your certificates as normal.

Suggested Configuration for multi-user access:
- Create an internal DNS hostname for the service e.g. certify-hub.yourowndomain.com and point it at the internal IP of your server hosting the hub.
- [Configure the service to use https](service.md)
- Setup individual user accounts under Settings > Security > Users, and assign the roles required for each user (e.g. Administrator).
