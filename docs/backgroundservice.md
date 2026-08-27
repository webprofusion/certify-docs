---
id: backgroundservice
title: Background Service
---

In order to perform certificate requests and automatic renewals we install a background service called "Certify.Service" or "Certify.Server.Core" (the full title is either `Certify Certificate Manager Service` or `Certify Management Agent` for v7 onwards). 

This service is installed to run as Local System and requires that the Local System account has the necessary privileges to administer IIS (if required) and the computers certificate store, as well as writing to the C:\ProgramData\Certify folder for configuration information. For more information on security and required permissions see [security](guides/security.md).

If you need to run the service under a different account (for example to support full impersonation scenarios), follow [Change the Background Service User (Windows)](guides/service-user-migration.md).

To check the log for this service, review `C:\ProgramData\Certify\logs\service.exceptions.log`.

## Custom configuration and Troubleshooting "..service not started" error

By default the background service runs a local http API server on port `9696` for the UI to talk to (bound to local loopback `127.0.0.2` and requiring windows authentication). _Do not open this service to external traffic on your firewall._

 If this port is in use by another application/service or for some other reason the service cannot create/use a binding to `127.0.0.2:9696` (localhost), or a security product is preventing **local** port access) then you will see the message **'Service not started'**.


:::info
If you are repeatedly seeing the "Service Not Started" error, first try deleting `serviceconfig.json` and `servers.json` from C:\ProgramData\Certify\ then restart the background service and the app and these config files will be recreated. This can help if automatic port negotiation has gotten out of sync.

In some cases antivirus software products (such as *ClamWin*, *Watchguard Advanced EPDR*, *ESET*) have been known to prevent the Certify service installing properly or can prevent some core features working like our temporary http challenge service listener.
:::

- `servers.json` : This is the connection information used by the UI to connect to the background service.
- `serviceconfig.json` : These are the service settings and includes the host/ip and port the service will listen on, so it needs to match the details in `servers.json`.

The service can also publish its API over a local named pipe instead of http, see [Switching the service transport](#switching-the-service-transport-http-or-named-pipe). The port and http related steps below do not apply when the named pipe is in use.

If the default port 9696 is already in use you can manually specify the settings required by editing/adding the file `c:\programdata\certify\serviceconfig.json` (and servers.json) with content as per the following (adjusted as required) then restarting both the service and UI:

```json
{
  "host": "localhost",
  "port": 9696
}
```
Any local IP, loopback address (or `localhost`) can be used, local loopback addresses are strongly recommended (ip range 127.*) so that remote access is not possible.

For example an alternative configuration might be:

```json
{
  "host": "127.0.0.1",
  "port": 9695
}
```

*You will also need to update corresponding configuration in the `servers.json` file (which the UI refers to in order to locate the service).*

To test that the reconfigured service is communicating OK, you can try opening the following URL in your browser:
`http://localhost:9695/api/system/appversion` where 'localhost' is your configured service `host` value and `9695` is an example configured port.

You can also try the same using PowerShell:

```ps
Invoke-RestMethod -Uri http://localhost:9696/api/system/appversion -UseDefaultCredentials
```

### Other Considerations for 'Service Not Started..'

To operate properly the background service needs to be able to register an http listener for its API server via http.sys, for that to work the IP address the service tries to use must be enabled as an http listen address and in some versions of windows the Http kernel service may not be enabled and you will need to enable it.


#### Enable http listener IP address

**You do not normally have to configure any netsh iplisten rules, unless your system already has restrictions in place.**

First check if you have any existing iplisten rules are defined:
```bat
netsh http show iplisten
```

If any are listed (other than `0.0.0.0`) then further IP listeners on different IPs need to be added.

If your system is restricting which IP addresses can listen for HTTP traffic you may find you need to enable iplisten for the service IP.

As per https://docs.microsoft.com/en-us/windows/win32/http/add-iplisten enable any IPv4 address to listen for http. :

```bat
netsh http add iplisten ipaddress=0.0.0.0
```
or Add IP listen on the local IPv6 address:
```bat
netsh http add iplisten ipaddress=::
```


**Or to target a specific IP address such as 127.0.0.2 (our default local loopback IP setting)**:

```bat
netsh http add iplisten ipaddress=127.0.0.2
```
You should monitor other effects on other services when changing the IP listen configuration. We have seen one report of Exchange/Outlook slowing down when the 0.0.0.0 address iplisten is enabled.

:::info
Check your current system IP listener rules using `netsh http show iplisten`. If you have any IP listen rules *already configured* not using the catch-all `0.0.0.0` IP then your system will not listen on the default 127.0.0.2 IP and you will need to run `netsh http add iplisten ipaddress=127.0.0.2` to allow the service listener to work.
:::

#### Allow Local System account to bind an http listener to the service port

In some cases you need to explicitly allow the service to listen as an http service on the localhost IP address. To do so run the following command from the command line as an Administrator, substituting your choice of listening IP address and port:

`netsh http add urlacl url=http://127.0.0.2:9696/ user="NT AUTHORITY\SYSTEM"`

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

If the state is not `RUNNING` use the following command to enable the service on demand:

```bat
sc config http start= demand
```

Then start the http service

```bat
net start http
```

If the service remains at `STOPPING` or similar then a system reboot may be required.

Once completed, restart the Certify background service from local services, then open the Certify Certificate Manager UI again to see if it can connect.

## Switching the service transport (http or named pipe)

On Windows the background service can publish its API either over the local http endpoint described above (the default) or over a local **named pipe**. The pipe is offered as a more secure alternative for clients on the same machine: it does not use the network stack at all, so there is no listening port, no `netsh` iplisten or urlacl configuration to maintain, and nothing for a firewall rule or a security product to block. Access is controlled by the pipe itself, which only allows the service account (Local System) and *elevated* local administrators, and explicitly denies remote callers arriving via the `IPC$` share.

:::warning
The service publishes **one** transport, not both. Selecting the named pipe means the http API is not published at all, and the `Host`, `Port` and `UseHTTPS` settings no longer apply. The app and the service must be configured to use the same transport or the app will report **'Service not started'**.
:::

Named pipes are a Windows-only feature. On Linux or macOS the service logs a warning and continues to use the http endpoint regardless of this setting.

### Switch to the named pipe

Both files in `C:\ProgramData\Certify\` need to be edited by hand:

1. In `serviceconfig.json`, add or change the `Transport` setting:

```json
{
  "UseHTTPS": false,
  "Port": 9696,
  "Host": "127.0.0.2",
  "Transport": "namedpipe"
}
```

2. In `servers.json`, set `Mode` to `namedpipe` on the connection the app uses (the one with `"IsDefault": true`):

```json
[
  {
    "Id": "452ac1b2-9baa-40f5-8ca7-7d2090976d0b",
    "DisplayName": "(local)",
    "Mode": "namedpipe",
    "Authentication": "default",
    "ServerMode": "v1",
    "IsDefault": true
  }
]
```

3. Restart the background service, then restart the app.

The `Host`, `Port` and `UseHTTPS` values in both files are ignored while the named pipe is in use, so you can leave them as they are and they will still be there when you switch back.

:::info
Instead of editing `servers.json`, you can delete it and restart the app. It is recreated from `serviceconfig.json` and will pick up whichever transport the service is configured for.
:::

### Switch back to http

Reverse the same two settings, then restart the service and the app:

- `serviceconfig.json`: `"Transport": "http"` (or remove the setting entirely, as http is the default)
- `servers.json`: `"Mode": "direct"`

Any value other than `namedpipe` is treated as http, so a typo in `Transport` leaves the service on the http endpoint rather than failing to start.

### Check which transport the service is using

The service records the endpoint it published at startup in `C:\ProgramData\Certify\logs\service_startup.log`.

To confirm the pipe is listening, list the local named pipes from PowerShell:

```ps
Get-ChildItem \.\pipe\ | Where-Object { $_.Name -like 'certify*' }
```

You should see `certify-service`. Note that the http test described earlier (`Invoke-RestMethod -Uri http://localhost:9696/api/system/appversion`) will not respond while the named pipe is selected, because the http endpoint is not published.

The command line tool can also be pointed at the pipe, which is a quick way to check the service is reachable independently of the app. Run this from an elevated command prompt, as an unelevated process cannot open the pipe:

```bat
certify list --pipe
```

### Recovery and advanced settings

If a machine is left in a state where the app cannot reach the service, the transport can be forced with an environment variable without editing any files. Set `CERTIFY_SERVICE_TRANSPORT` to `namedpipe` or `http` as a machine level environment variable; it overrides the `Transport` setting in `serviceconfig.json` for the service, and the transport selected by the app and the command line tool.

The pipe is named `certify-service` by default. If you need to change it (for example to run more than one instance on a machine) set the `CERTIFY_SERVICE_PIPE_NAME` environment variable. This must be set for the service *and* for the app, as each resolves the name independently.

## Managed Items Database

The data store for the managed certificates database is the C:\ProgramData\Certify\manageditems.db SQLite database. This stores your renewal configuration data (not certificates). This is an sqlite3 format database file.

You should include C:\ProgramData\Certify\ in your normal backup procedures, otherwise if you lose this configuration or it is corrupted you may need to add all of your managed certificates again. **To guard against database corruption you should add an exclusion to your anti-virus software to avoid sharing conflicts.**

On service startup and on a daily schedule the system will make a copy of manageditems.db called manageditems.db.bak.

### Data Recovery

Storage write errors or sudden unexpected system shutdowns can (in rare occasions) cause database corruption. In the event that your database (and backup) become corrupted the sqlite tools may be used to recover some or all of the information.

### Attempt an export

The following will copy the contents of manageditems.db to a new db file. You can try this in place of your original:

```
sqlite3.exe manageditems.db
sqlite> .backup output.db
```

Then copy new.db to manageditems.db and start the Certify service.

### Attempt a recovery using SQL dump

Based on the example from https://ronnieroller.com/Repair-an-SQLite-database we can export the database

```
sqlite3 manageditems-corrupted.db
sqlite> .mode insert
sqlite> .output dump.sql
sqlite> .dump
sqlite3.exe new.db < dump.sql
```

```
sqlite3 new.db "PRAGMA integrity_check"
```

Then copy new.db to manageditems.db and start the Certify service.
