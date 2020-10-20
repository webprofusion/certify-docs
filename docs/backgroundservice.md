---
id: backgroundservice
title: Background Service
---

In order to perform certificate requests and automatic renewals we install a background service called "Certify.Service" (Certify SSL Manager Service). This service is installed to run as Local System and requires that the Local System account has the necessary privileges to administer IIS (if required) and the computers certificate store, as well as writing to the C:\ProgramData\Certify folder for configuration information.

To check the log for this service, review `C:\ProgramData\Certify\logs\service.exceptions.log`.

## Port 9696 is the default service port

By default the background service runs a local http API server on port 9696 for the UI to talk to (bound to localhost and requiring windows authentication). *Do not open this port to external traffic on your firewall.*

## Custom configuration and Troubleshooting "..service not started" error
The certify background service operates a local API for the app on port `9696` by default. If this port is in use by another application/service (or for some other reason it cannot create a binding to `localhost:9696`, or a security product is preventing **local** port access) then you will see the message 'Service not started'.

The app should try to negotiate a different service port if it detects that the port is already in use, however you can manually specify the settings if required by editing/adding the file `c:\programdata\certify\serviceconfig.json` with content as per the following (adjusted as required) then restarting both the service and UI:
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
 "port":9695
}
```

To test that the reconfigured service is communicating OK, you can try opening the following URL in your browser:
`http://localhost:9695/api/system/appversion` where 'localhost' is your configured service `host` value and `9695` is an example configured port.

You can also try the same using PowerShell:
```ps
Invoke-RestMethod -Uri http://localhost:9696/api/system/appversion -UseDefaultCredentials
```

## Other Considerations for 'Service Not Started..'
To operate properly the background service needs to be able to register an http listener for it's API server via http.sys, for that to work the IP address the service tries to use must be enabled as an http listen address and  in some versions of windows the Http kernel service may not be enabled and you will need to enable it. 

### Enable http listener IP address

As per https://docs.microsoft.com/en-us/windows/win32/http/add-iplisten enable any IP address to listen for http: 
```bat
netsh http add iplisten ipaddress=0.0.0.0
```

Or to target a specific IP address such as 127.0.0.1 (localhost):
```bat
netsh http add iplisten ipaddress=127.0.0.1
```


By default the windows http service is typically enabled but if you receive the error 'Operation is not supported on this platform' in `service.exceptions.log` then try checking the status of the windows http service. To do so, run the following from an elevated command prompt (using Run As Administrator):

```bat
sc query http
```

This should produce output like:
```bat
SERVICE_NAME: http
        TYPE               : 1  KERNEL_DRIVER
        STATE              : 4  RUNNING
                                (STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
        SERVICE_EXIT_CODE  : 0  (0x0)
        CHECKPOINT         : 0x0
        WAIT_HINT          : 0x0

```
If the state is not `RUNNING` use the following command the enable the service on demand:
```bat
sc config http start= demand
```
Then start the http service
 ``` bat
 net start http
 ```
 If the service remains at `STOPPING` or similar then a system reboot may be required.

 Once completed, restart the Certify SSL Manager background service from local services, then open the Certify The Web UI again to see if it can connect.

 In other cases, you may have permission restrictions on port bindings to localhost, so you may have to modify these https://docs.microsoft.com/en-us/windows/desktop/http/add-urlacl or change the service config as above.
