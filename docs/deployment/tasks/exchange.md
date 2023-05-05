---
id: exchange
title: Deployment Task - Deploy To Microsoft Exchange
---

## Requesting a certificate for Microsoft Exchange

Certify The Web can be used to request and install certificates for use with Microsoft Exchange. The process is similar to requesting a certificate for IIS, however there are some additional considerations for Exchange. 

The first part of the process is acquiring the appropriate certificate from a certificate authority (CA) and the second part is deploying the certificate on your Exchange services.

:::warning
This guide assumes you are already familiar with administering Microsoft Exchange. If you are not familiar with administering Exchange you should seek assistance from a qualified Exchange administrator. Exchange is generally part of your business critical infrastructure and if it is being administered by non-qualified staff you are actively risking your production system.

Practising on a test server is strongly recommended before making changes to your production environment.
:::

## Certificate Requirements
The single most important thing to get right for a certificate is for it to include the correct names corresponding to the services you will associate the certificate with and which your end users etc will access. For instance if your company domain was `contoso.com` then `mail.contoso.com`, `webmail.contoso.com` and `autodiscover.contoso.com` might all be necessary to include on one certificate, depending on your requirements. 

You cannot include local intranet names such as just `webmail` on a publicly trusted certificate, because you simply do not control that generic name globally and cannot prove that you do so to a public certificate authority. That means you can't just use local intranet names for your services at all including `localhost` or `.local` names.

While a certificate can technically be associated (bound) to a service *without* matching the name (e.g. you can try to access your service using `https://localhost`) standard browsers and software will not trust the certificate if the name you are trying to access does not match and will display a warning to the user or simply refuse to connect.

## Requesting your Certificate

Add your required domains to your certificate, for instance `mail.contoso.com` and `autodiscover.contoso.com` and then request your certificate from your chosen CA. If you prefer to use a wildcard name such as `*.contoso.com` then you can use that instead of specifying individual names. There are additional validation considerations for wildcard certificates.

To request a certificate, you can follow the standard [certificate request process](../../certificate-process.md). 

As a summary that process is:

In Certify The Web, running on the same server where Exchange is installed:
- Select *New Certificate*
- Add your required domains to your certificate, for instance `mail.contoso.com` and `autodiscover.example.com`
- On the *Authorization* tab, confirm how you will complete the domain validation process (DNS or HTTP). Http validation is the default and is usually the easiest to complete. For http validation to work all names on your certificate must resolve to the server where you are running Certify The Web and TCP port 80 must be open.
- Click *Test* to check basic configuration and connectivity, then click "Request Certificate" to begin the certificate request process.
- If your certificate request is successful the certificate will now be stored in the local machine certificate store and you can proceed to configuring Deployment Tasks to install the certificate on your Exchange server.

Other topics to consider include selecting between different Certificate Authorities, Private Key types and PFX password protection. These options are all configured under *Advanced*.

## Deploying Your Certificate to Exchanges Services
Once you have your certificate you can automate deploying it to your Exchange services. 

:::info
To begin on a new Exchange install, start by assigning the new certificate to services in Exchange, this enables https for web services and TLS for mail services. You can do this using the Exchange Admin Center or the Exchange Management Shell. For more information see [Assign a certificate to Exchange services](https://docs.microsoft.com/en-us/exchange/architecture/client-access/assign-certificates-to-services?view=exchserver-2019).

Open Exchange Admin Center (EAC). Select *servers* on the left pane and navigate to *certificates* to administer certificate for each service.
:::

The Certify The Web app provides a basic built in deployment task called "Deploy To Microsoft Exchange" which uses a small powershell script to apply the certificate. [The script used](https://github.com/webprofusion/certify-plugins/blob/development/src/DeploymentTasks/Core/Providers/Assets/Exchange.ps1) is also available in the Certify The Web source code repository.

In Certify The Web, select your managed certificate:
- On the *Tasks tab*, under *Deployment Tasks*, select Add Task > Deploy To Microsoft Exchange. 
- Under *Task Parameters* the list of services the certificate will be applied to are listed e.g. `POP,IMAP,SMTP,IIS`. You can optionally edit this list to include only the services you require.
- Save the updated managed certificates settings, then you can try out the Deployment Task by clicking the run button ▶️ next to the task.
- When the certificate next automatically renews, this deployment task will also run.

For complex or customised deployments you may wish to use a [custom deployment script](../../script-hooks.md).

It's possible to continue to apply the certificate manually using the standard Exchange Admin Center features, however this is not recommended because certificates typically renew frequently (e.g. within 90 days) and you would need to remember to repeat the process each time. You should instead use automation to ensure your certificates are always up to date.

## Renewal Failures
Certificate can fail to renew for a number of reasons, including:
- Changes to your infrastructure (e.g. firewall changes, DNS changes)
- Temporary issues with your CA

**The app will recover from temporary issues automatically**, however if you have made changes to your infrastructure you may need to update your managed certificate settings to reflect the new configuration. You can force a certificate renewal attempt by selecting *Request Certificate*.

By default, **if your certificate renewal fails repeatedly, you will receive an email notification**. This email is trigger by the default status reporting to our API, which in turn sends an email via SendGrid if multiple failures have been detected. The email address used is the one you specified when you first setup your CA account in the application (under Settings > Certificate Authorities). You can also check the Certify The Web app or the https://certifytheweb.com dashboard (if enabled) for the status of your managed certificates.

If you don't understand why a renewal has suddenly failed it's best not to start changing settings if you are unsure, instead please [contact us for support](../../support.md) if you are a licensed user, or post a question on our [community forum](https://community.certifytheweb.com), ideally including your managed certificate log file, at the least we need your real domain name(s) in order to diagnose common renewal failures. 

Typical troubleshoot steps include checking your firewall (if using http validation TCP port 80 must be open and reachable, the app itself requires outgoing https access for APIs) and domain/DNS settings and restarting the server.

## General Considerations
Things to consider when administering certificates for exchange and IIS:

### Things to avoid
- Never delete a certificate from the certificate store while it is still in use by a service, this will break the service and you will need to re-assign a new certificate to the service. Certify The Web will maintain it's own certificates in the store and by default will remove them when they are definitely no longer required.
- Never revoke a certificate unless the private key has been compromised. Revoking a certificate will break any services using that certificate and is almost never required.

### Only use valid fully qualified domain names (or valid wildcard names)
Certificates need to be issued for valid fully qualified names or wildcards. A certificate can cover multiple hostnames or subdomains and can also be wildcards that cover all subdomains of a domain e.g. `*.contoso.com` would cover `mail.contoso.com` and `autodiscover.contoso.com` but not `mail.contoso.com.au` or `mail.contoso.local`.

If your exchange services and connections are configured to use local or intranet names like `localhost` or `mail.contoso.local` then the service will not have a valid TLS connection to the server and will not be able to use the certificate, this is because the name is not included in the certificate your are trying to use. You will need to ensure that all services and connections use valid hostnames which match your certificate(s).

### IP Address Bindings vs SNI Hostname Bindings
If you manually create an https "binding" (the configuration of an IP address or hostname + socket + certificate) then you should enable SNI (Server Name Indication), set a hostname and avoid using specific IP addresses, instead use `All Unassigned` or `*` in IIS etc. This maps to the catch-all address `0.0.0.0` and matches the binding to all network interfaces.

If you use a specific IP address in your binding you are constraining how the certificate can be applied to requests and you are also overriding other less specific bindings on the same IP address. This can cause [binding conflict problems](../../guides/ssl-windows.md) if you have multiple certificates on the same IP address.

## Alternative Tools
Other ACME clients are available on Windows and in some cases administrators looking after Exchange may prefer to use a different client. Certify The Web has an extensive feature set aimed at managing a large number of certificates and it may be more than you really need for a single Exchange deployment. 

Some other clients to consider for very specific tasks include [Posh-ACME (PowerShell)](https://github.com/rmbolger/Posh-ACME) and [win-acme (WACS - command line)](https://github.com/win-acme/win-acme). Both of these are well maintained projects which we (Certify The Web) also sponsor on Github.

## Other resources

Details of the general processes begin importing and installing a certificate for Exchange can be found here:

https://learn.microsoft.com/en-us/exchange/architecture/client-access/import-certificates?view=exchserver-2019

Assign certificates to services:

https://learn.microsoft.com/en-us/exchange/architecture/client-access/assign-certificates-to-services?view=exchserver-2019

Details of the certificate requirements for Exchange services can be found here:

https://learn.microsoft.com/en-us/exchange/architecture/client-access/certificates?view=exchserver-2019#certificate-requirements-for-exchange-services

Check Exchange Remote Connectivity:

https://testconnectivity.microsoft.com/tests/exchange