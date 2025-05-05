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

You can download the latest **alpha test** version [7.0.0.16-alpha.03 : Released 2025/05/03](https://certifytheweb.s3.amazonaws.com/downloads/archive/CertifyMgmtHubSetup_V7.0.0-alpha.03.exe) - this is intended for test evaluation and not for production use, as subsequent updates may including breaking changes.

The current default configuration will make the service and UI available at `http://localhost:8080` and you will need to set the API endpoint (the same URL) in the login UI.

To use the service with https you can either [configure the service to use https](service.md) or reverse proxy the service from a webserver of your choice (Caddy, IIS, nginx, Apache etc and administer https on those as normal).

### Install as multiple services, possibly on different servers etc.
- Or, if you need more control over how things are organized, install the components separately:
    - **The Management Hub API**. This the provides aggregated services to talk to one or more *Certify Agent* or *Certify Certificate Manager* instances. The hub needs to know the details of the certify agent service it will use for backend storage services etc.
    - The **Certify Agent** service. This provides backend storage and certificate management services. The agent needs to know the final URL of the Management Hub API to talk to it.
    - Serve the **Web UI** via IIS or other web server. The `/wwwwroot/appsettings.json` file of the web app needs to be configured with the Management Hub API url.

The Management Hub API and Certify Agent service both need to be configured to know how to talk to each other, and this is often the most complex part to get right.


### Settings are preserved between installs/upgrades
On Windows your settings are preserved in `%PROGRAMDATA%\certify`. For most users, this is `C:\ProgramData\certify`. Uninstalling the app or installing a new version does not remove the files stored here. We recommend including this location in your regular backup procedure.
