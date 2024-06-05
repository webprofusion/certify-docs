---
id: troubleshooting
title: Troubleshooting
---

## If the UI shows a "Service Not Started" message.
If you see this type of error reported by the UI, see [Background Service](../backgroundservice.md) for more troubleshooting information.

## Issues communicating with the CA
In normal use the app must be able to talk to the ACME API for your chosen Certificate Authority (e.g. Let's Encrypt). If you see an error reported such as `The ACME service (directory) is unavailable.` this would indicate your machine is not able to establish communication with the CA service.

Common reasons for connectivity issues include:
- A service outage at the CA, check our [Certificate Authorities](certificate-authorities.md) list to see if your CA has a status info page.
- Blocking outgoing https (TCP port 443, outgoing) in Windows Firewall or at the network level.
- TLS 1.2 not enabled or an incompatible set of TLS ciphers is enabled. We recommend using the IIS Crypto tool from Nartac in Best Practises mode to configure general TLS settings.
- Inability to communicate via common cloud based service providers such as Cloudflare (perhaps due to IPv6 routing issues or some kind of blocking).

To see if there is a connectivity issue, find out the ACME API endpoint for your chosen CA and check you can communicate with it, e.g. for Let's Encrypt, using PowerShell:
```PS
Invoke-WebRequest -Uri https://acme-v02.api.letsencrypt.org/directory 
```
This should return a StatusCode 200 (OK) under normal conditions, if the request fails you need to determine why your system is unable to communicate, this may require assistance from your networking team.

If the above test works OK then next thing would be to determine if the CA is returning some kind of error that the app is unable to interpret. 

You can use tools such as Telerik Fiddler to see the https conversation between your machine and the CAs API but you can also try enabling Debug logging in the app. To do so, edit `C:\ProgramData\certify\serviceconfig.json` and set the `"LogLevel"` field to `"debug"` instead of `"information"`, then restart the Certify background service and attempt your request again (just click "Request Certificate" on a managed certificate). The `C:\ProgramData\certify\logs\session*.log` file will then include the actual http conversation between you and the CA and you can use this to see if the CA is returning an error that the app is unable to interpret, or if the connection is simply not operating normally.

### Alternative Solutions
Occasionally you may be unable or unwilling to resolve the connectivity issue with the CA system. In this case we would suggest the next thing to try is to [use a different CA](certificate-authorities.md). You can try this for a single managed certificate and if that works change your default CA over to the new preferred CA.

# Domain Validation Issues Causing Failed Renewal
## HTTP domain validations suddenly failing
If you find you are unexpectedly getting HTTP domain validation failures (particularly "Secondary validation") the most common cause is a Firewall blocking TCP port 80 (http) or you are blocking a range of IP or Geographic locations. To allow only your CAs HTTP validation requests through we recommend using a Web Application Firewall set to allow all http requests to any path starting with `/.well-known/acme-challenge/`. Alternatively block specific countries instead of blocking all countries, as your CA (the default being Let's Encrypt) may choose to validate from any geographic region.

## DNS domain validations suddenly failing
DNS providers can and do change their APIs periodically which can impact renewals using DNS validation. For instance, GoDaddy changed their API to only allow API use for customers with more than 10 domains. Other DNS providers have retired their older APIs resulting in renewals that use those failing. We recommend that if a problem develops with DNS validation that you ensure you are using the latest version of the app and if the problem persists contact your DNS provider to ask if their API has recently changed.