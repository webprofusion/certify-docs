---
id: dns-validation
title: About DNS Validation (dns-01)
---

## Why use DNS Validation?
To request a certificate from Let's Encrypt (or any Certificate Authority), you need to provide some kind of proof that you are entitled to receive the certificate for given domain(s). Let's Encrypt support two methods of validation to prove control of your domain, `http-01` ([validation over HTTP](http-validation.md)) and `dns-01` (validation via DNS). 

**Wildcard domain certificates (those covering `*.yourdomain.com`) can only be requested using DNS validation.** DNS Validation is also especially useful if the domains you are trying to get certification for are not public websites, or cannot serve http requests on port 80.

## How to use DNS Validation

In order to validate your control of your domains to the certificate authority you will be required to create a specified TXT record in your domain's DNS zone.

To do this you needs to get the API credentials for the (hosted) DNS from your DNS providers control panel, store these credentials in the app then select them to be used for specific certificate requests.

If your DNS provider (or custom DNS setup) does not have an API we can talk to, you can write your own DNS update script or use the Manual DNS option (the request pauses while you manually update DNS).

## DNS Providers

The following DNS providers are supported:
- [Azure DNS](dns-azuredns.md)
- [AWS Route53](dns-awsroute53.md)
- [Cloudflare](dns-cloudflare.md) DNS *Note: Free plans are available*
- [DNS Made Easy](dns-dnsmadeeasy.md)
- [GoDaddy](dns-godaddy.md)
- [OVH](dns-ovh.md)
- Simple DNS Plus

**If you change API credentials, you need to replace the credential settings in Certify under 'Settings > Stored Credentials' to ensure renewals keep working. Once saved, there is also a 'Test' option so you can try out the credentials to check they still work.**

## DNS Scripting
To provide your own script to update DNS you need to create (or source) a Windows (CMD) batch file which expects the following sequence of arguments and creates a corresponding TXT record in your DNS zone:
- Target Domain (e.g. example.com)
- Record Name (e.g. _acme-challenge.example.com)
- Record Value (e.g. ABCBD123456789)

e.g. given a script at *C:\customscripts\UpdateDNS.bat*, this will be executed as:
 ```
C:\customscripts\UpdateDNS.bat example.com _acme-challenge.example.com ABCBD123456789
```
Note: you should assume the working directory of the process will not be the same as the script.

