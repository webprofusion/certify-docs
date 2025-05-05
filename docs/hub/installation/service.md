---
title: Hub Service Config
---

## Port and TLS Certificate
By default the hub service will initially be created on `http://localhost:8080` which generally means it can't be used from other machines and it also doesn't have https enabled (the irony!).

A default sample config is created at `C:\ProgramData\certify\hubservice.json` or `/usr/share/certify/hubservice.json` and this allows you to customise the http listener, which is a .net Kestrel web server:

https://learn.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/endpoints?view=aspnetcore-9.0


An example config is included in the file to use a PFX file, so to setup https:

- Decide on your preferred fully qualified service name for the hub, e.g. `certifyhub.intranet.yourdomain.com`
- Use the management hub to acquire a certificate for the service name you need, using the normal certificate request process.
- Add a Deployment Task (Export Certificate) to export a PFX (PKCS#12) file to where it's required e.g. C:\ProgramData\certify\internal-certs\hub.pfx , then run the task to export the initial certificate.

Once you have a cert on disk you are ready to configure the service to use that cert file, edit the `hubservice.json` file to include the `HttpsInlineCertFile` entry. The choice of port and filename etc is arbitrary, as long as the process can access the file.:

```json
  "Kestrel": {
    "Endpoints": {
      "SvcHttpEndpoint": {
        "Url": "http://0.0.0.0:8080"
      },
     "HttpsInlineCertFile": {
        "Url": "https://0.0.0.0:9697",
        "Certificate": {
          "Path": "C:\\ProgramData\\certify\\internal-certs\\hub.pfx",
          "Password": ""
        }
      },
    }
  }
  ```

Then restart the `Certify Management Hub` service, you can now access the service via https e.g. `https://

This is an example configuration, so you can configure the endpoints and certificates however you prefer.