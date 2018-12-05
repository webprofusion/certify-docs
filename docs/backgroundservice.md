---
id: backgroundservice
title: Certify SSL Manager background service
---

In order to perform certificate requests and automatic renewals we install a background service called "Certify.Service" (Certify SSL Manager Service). This service is installed to run as Local System and requires that the Local System account has the necessary privileges to administer IIS (if required) and the computers certificate store, as well as writing to the C:\ProgramData\Certify folder for configuration information.

## Port 9696 is the default service port

By default the background service runs a local http API server on port 9696 for the UI to talk to (bound to localhost and requiring windows authentication). It is currently recommended to not open this port to external traffic on your firewall.


## Custom configurations ("..service not started" etc)
The certify background service operates a local API for the app on port `9696` by default. If this port is in use by another application/service(or for some other reason it cannot create a binding to `localhost:9696`).

The app should try to negotiate a different service port if it detects this problem however you can manually specify the settings if required by editing/adding the file `c:\programdata\certify\serviceconfig.json` with content as per the following (adjusted as required) then restarting both the service and UI:
```json
{
 "host":"localhost",
 "port":9696
}
```
For example an alternative configuration might be:
```json
{
 "host":"127.0.0.1",
 "port":9600
}
```

## Other Considerations
To operate properly the background service needs to be able to register an http listener for it's API server via http.sys, in some versions of windows the Http device may not be enabled and you will need to enable it. In other cases, you may have restrictions on port bindings to localhost, so you may have to modify these https://docs.microsoft.com/en-us/windows/desktop/http/add-urlacl or change the service config as above.