---
id: dns-validation
title: About DNS Validation (dns-01)
---

## Why use DNS Validation?
To request a certificate from Let's Encrypt (or any Certificate Authority), you need to provide some kind of proof that you are entitled to receive the certificate for given domain(s). Let's Encrypt supports two methods of validation to prove control of your domain, `http-01` ([validation over HTTP](http-validation.md)) and `dns-01` (validation over DNS). 

**Wildcard domain certificates (those covering `*.yourdomain.com`) can only be requested using DNS validation.** DNS Validation is also especially useful if the domains you are trying to get certification for are not public websites, or cannot serve http requests on port 80.

## How to use DNS Validation

In order to validate your control of your domains to the certificate authority you will be required to create a specified TXT record in your domain's DNS zone.

To do this you may need to get the API credentials for the (hosted) DNS from your DNS providers control panel, store these credentials in the app then select them to be used for specific certificate requests.

If your DNS provider (or custom DNS setup) does not have an API we can talk to, you can write your own DNS update script or use the Manual DNS option (the request pauses while you manually update DNS).

### DNS API Providers

Currently supported DNS API providers include:
- Aliyun
- [AWS Route53](dns-awsroute53.md)
- [Azure DNS](dns-azuredns.md)
- [Cloudflare](dns-cloudflare.md) DNS *(Note: Cloudflare offer a free tier for DNS services)*
- [DNS Made Easy](dns-dnsmadeeasy.md)
- [GoDaddy](dns-godaddy.md)
- Microsoft DNS
- NameCheap
- [OVH](dns-ovh.md)
- Simple DNS Plus

**If you change API credentials, you need to replace the credential settings in Certify under 'Settings > Stored Credentials' to ensure renewals keep working. Once saved, there is also a 'Test' option so you can try out the credentials to check they still work.**

## Other DNS Validation Methods
You can alternatively use the following methods to manage your DNS TXT records:

### ACME DNS 
[acme-dns](https://github.com/joohoi/acme-dns) is a system to automatically manage TXT record values on behalf of your domain **just for challenge validation**. This is probably the easiest method if you have a  trusted acme-dns server you can use, this also avoids storing powerful DNS admin credentials on your server.

- Select acme-dns as the DNS update method
- Point to a trusted acme-dns server
- Request certificate, the first time you do so you will be prompted to create a CNAME pointing to the acme-dns server. 
- Resume the request using Request Certificate, the acme-dns server will provide the required TXT record responses on your behalf.
- Automatic renewals will then perform this process again without manual intervention.

### DNS Scripting
[DNS Scripting](dns-scripting.md) involves providing your own custom script to update/delete TXT records in your DNS using a .bat file which can then optionally call python, node scripts etc.

### Manual DNS 
If you are just experimenting with wildcard domains you may opt to use manual DNS updates (editing manually via your DNS control panel). 

**This is the least recommended option as you will need to update this for every renewal.** 

This method can also be extremely confusing when requesting a single cert for `*.domain.com` and `domain.com`, as you need to provide 2 values for the same TXT `_acme-challenge.domain.com` record (to answer both the `*.domain.com` and `domain.com` challenge responses).

To use Manual DNS:
- Select Manual DNS as your DNS update method
- Perform your initial certificate request. The request will pause and ask you to create a TXT record in your domain (one value for each domain or wildcard). Once you have completed that, wait for your DNS name servers to complete propagation. If you have trouble validating, wait an hour or more for this to complete.
- Use 'Request Certificate' to resume the request and check validation. 
- If the certificate authority can see the TXT value they asked for in your DNS, they will then allow a certificate to be issued and the request will resume as normal.


