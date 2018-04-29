---
id: dns-validation
title: About DNS Validation (dns-01)
---

To request a certificate from Let's Encrypt (or any Certificate Authority), you need to provide some kind of proof that you are entitled to receive the certificate for given domain(s). Let's Encrypt support two methods of validation to prove control of your domain, http-01 ([validation over HTTP](http-validation.md)) and dns-01 (validation via DNS). Wildcard domain certificates (those covering *.yourdomain.com) can only be requested using DNS validation.

# DNS Validation Support

In order to validate your control of your domains to the certificate authority you will be required to create a specified TXT record in your domain's DNS zone.

To do this you needs to get the API credentials for the (hosted) DNS from your DNS providers control panel, store these credentials in the app then select them to be used for specific certificate requests.

If your DNS provider (or custom DNS setup) does not have an API we can talk to, automated certificate requests and renewal will not be possible.

# DNS Providers

The following DNS providers are supported:
- [Azure DNS](dns-azuredns.md)
- [AWS Route53](dns-awsroute53.md)
- [Cloudflare](dns-cloudflare.md) DNS *Note: Free plans are available*
- [GoDaddy](dns-godaddy.md)
- DNS Made Easy

**If you change API credentials, you need to replace the credential settings in Certify under 'Settings > Stored Credentials' to ensure renewals keep working. Once saved, there is also a 'Test' option so you can try out the credentials to check they work.**