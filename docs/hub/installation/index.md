---
title: Installation & Upgrades
---

## Installing Certify Management Hub

*Certify Management Hub* consists of a self-hosted web app, the Management Hub API, and core background service (*Certify Agent*) for overall hub management and certificate management tasks. 

Installations can choose between an all-in-one bundled service for simpler setup, or hosting of the individual components can be separated.

You can install the *Certify Management Hub* using docker, various Linux distributions, any supported Windows machine or server.

- [Docker and container environments](containers)
- [Windows](windows)
- Linux
- macOS

The product runs in Community Edition mode by default, see [Licensing](../../guides/licensing.md) for more information.

**The default admin login is `admin:changeme!` and you should change the password immediately before configuring any other parts of the system.** 

:::danger
Due to the nature of the work the management hub performs we do not recommend hosting on a public facing web server. While logins are required for most actions, the app and API are not considered to be security hardened for public exposure unless we explicitly state that they are. Default admin credentials should be changed immediately after setup.

*This alpha version may have some unguarded API endpoints and is not suitable for public hosting.*
:::

## Upgrading

By default the app will check for updates when you open the UI.  Some updates are critical to ensure continuous operation, and only the latest version is supported. In particular if you are managing multiple instances of *Certify Certificate Manager* or *Certify Agent* you may need to upgrade these so that the hub can continue to communicate with them properly.

The latest release notes for the app can be found at https://certifytheweb.com/home/changelog?product=hub

## System Requirements

You can self-host on Windows, macOS or Linux, or you can use your own choice of container environment (Docker, Kubernetes, Red Hat/IBM OpenShift etc).

The product internally uses .NET 9.0 or higher and specific supported operating systems are detailed here: https://github.com/dotnet/core/blob/main/release-notes/9.0/supported-os.md

For the web app, "evergreen" desktop web browsers are supported, typically this is Google Chrome, Microsoft Edge, Safari and Firefox.



