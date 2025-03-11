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

### Install as multiple services, possibly on different servers etc.
- Or, if you need more control over how things are organized, install the components separately:
    - **The Management Hub API**. This the provides aggregated services to talk to one or more *Certify Agent* or *Certify Certificate Manager* instances. The hub needs to know the details of the certify agent service it will use for backend storage services etc.
    - The **Certify Agent** service. This provides backend storage and certificate management services. The agent needs to know the final URL of the Management Hub API to talk to it.
    - Serve the **Web UI** via IIS or other web server. The `/wwwwroot/appsettings.json` file of the web app needs to be configured with the Management Hub API url.

The Management Hub API and Certify Agent service both need to be configured to know how to talk to each other, and this is often the most complex part to get right.


### Settings are preserved between installs/upgrades
On Windows your settings are preserved in `%PROGRAMDATA%\certify`. For most users, this is `C:\ProgramData\certify`. Uninstalling the app or installing a new version does not remove the files stored here. We recommend including this location in your regular backup procedure.
