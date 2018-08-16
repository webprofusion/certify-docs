---
id: backgroundservice
title: Certify SSL Manager background service
---

In order to perform certificate requests and automatic renewals we install a background service called "Certify.Service" (Certify SSL Manager Service). This service is installed to run as Local System and requires that the Local System account has the necessary privileges to administer IIS (if required) and the computers certificate store, as well as writing to the C:\ProgramData\Certify folder for configuration information.

## Port 9696 is the default service port

By default the background service runs a local http API server on port 9696 for the UI to talk to (bound to localhost and requiring windows authentication). It is currently recommended to not open this port to external traffic on your firewall.


