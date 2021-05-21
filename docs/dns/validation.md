---
id: validation
title: DNS Validation (dns-01)
---

## Why use DNS Validation?
To request a certificate from Let's Encrypt (or any Certificate Authority), you need to provide some kind of proof that you are entitled to receive the certificate for given domain(s). Let's Encrypt supports two methods of validation to prove control of your domain, `http-01` ([validation over HTTP](http-validation.md)) and `dns-01` (validation over DNS). 

**Wildcard domain certificates (those covering `*.yourdomain.com`) can only be requested using DNS validation.** DNS Validation is also especially useful if the domains you are trying to get certification for are not public websites, or cannot serve http requests on port 80.

## How to use DNS Validation

In order to validate your control of your domains to the certificate authority you will be required to create a specified TXT record in your domain's DNS zone.

To do this you may need to get the API credentials for the (hosted) DNS from your DNS providers control panel, store these credentials in the app then select them to be used for specific certificate requests.

If your DNS provider (or custom DNS setup) does not have an API we can talk to, you can write your own DNS update script or use the Manual DNS option (the request pauses while you manually update DNS).

### Certify DNS
Certify DNS is a cloud hosted version of the acme-dns standard (CNAME delegation of acme challenge TXT records to a dedicated challenge response service). This service can be enabled through the https://certifytheweb.com License Keys tab when signed in. The service is compatible with most existing *acme-dns* clients so it can be used with other ACME clients on all operating systems. Read more about [Certify DNS](providers/certifydns).
### DNS API Providers

Current DNS API providers include:
- ACME DNS (See below)
- Aliyun &ast;
- [AWS Route53](providers/awsroute53)
- [Azure DNS](providers/azuredns)
- [Cloudflare](providers/cloudflare) DNS *(Note: Cloudflare offer a free tier for DNS services)*
- [DNS Made Easy](providers/dnsmadeeasy) 
- [GoDaddy](providers/godaddy)
- Microsoft DNS &ast;
- NameCheap &ast;
- IONOS &ast;
- [OVH](providers/ovh) &ast;
- Simple DNS Plus &ast;
- TransIP *&ast;

*&ast; marked providers are contributed and tested by users.*

In addition we implement a number of DNS providers courtesy of the Posh-ACME: https://github.com/rmbolger/Posh-ACME project. If you encounter any issues with these you should verify they work normally within Posh-ACME and then raise an issue on our [github page](https://github.com/webprofusion/certify) :

[Akamai](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Akamai-Readme.md),
[AutoDNS](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/AutoDNS-Readme.md),
[ClouDNS](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/ClouDNS-Readme.md),
[DNSPod](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/DNSPod-Readme.md),
[DNSimple](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/DNSimple-Readme.md),
[DomainOffensive](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/DomainOffensive-Readme.md),
[deSEC](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/DeSEC-Readme.md),
[DigitalOcean](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/DOcean-Readme.md),
[Dreamhost](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Dreamhost-Readme.md),
[Dynu](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Dynu-Readme.md),
[EasyDNS](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/EasyDNS-Readme.md),
[Gandi](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Gandi-Readme.md),
[Google Cloud](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/GCloud-Readme.md),
[Hetzner](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Hetzner-Readme.md),
[Hurricane Electric](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/HurricaneElectric-Readme.md),
[Infoblox](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Infoblox-Readme.md),
[IBM Cloud/SoftLayer](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/IBMSoftLayer-Readme.md),
[Linode](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Linode-Readme.md),
[Loopia](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Loopia-Readme.md),
[LuaDns](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/LuaDns-Readme.md),
[name.com](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/NameCom-Readme.md),
[NS1](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/NS1-Readme.md),
[PointDNS](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/PointDNS-Readme.md),
[Rackspace](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Rackspace-Readme.md),
[RFC2136](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/RFC2136-Readme.md),
[Selectel](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Selectel-Readme.md),
[Simply](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Simply-Readme.md),
[Yandex](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Yandex-Readme.md),
[Zonomi](https://github.com/rmbolger/Posh-ACME/blob/master/Posh-ACME/Plugins/Zonomi-Readme.md)

**If you change API credentials, you need to replace the credential settings in Certify under 'Settings > Stored Credentials' to ensure renewals keep working. Once saved, there is also a 'Test' option so you can try out the credentials to check they still work.**

## Other DNS Validation Methods
You can alternatively use the following methods to manage your DNS TXT records:

### ACME DNS 
[acme-dns](https://github.com/joohoi/acme-dns) is a system to automatically manage TXT record values on behalf of your domain **just for challenge validation**. This is probably the easiest method if you have a trusted acme-dns server you can use, this also avoids storing powerful DNS admin credentials on your server. Find out more on [how to use acme-dns](/docs/dns/providers/acme-dns).


### DNS Scripting
[DNS Scripting](providers/scripting) involves providing your own custom script to update/delete TXT records in your DNS using a .bat file which can then optionally call python, node scripts etc.

### Manual DNS 
If you are just experimenting with wildcard domains you may opt to use manual DNS updates (editing manually via your DNS control panel). 

**This is the least recommended option as you will need to update this for every renewal.** 

This method can also be extremely confusing when requesting a single cert for `*.domain.com` and `domain.com`, as you need to provide 2 values for the same TXT `_acme-challenge.domain.com` record (to answer both the `*.domain.com` and `domain.com` challenge responses).

To use Manual DNS:
- Select Manual DNS as your DNS update method
- Perform your initial certificate request. The request will pause and ask you to create a TXT record in your domain (one value for each domain or wildcard). Once you have completed that, wait for your DNS name servers to complete propagation. If you have trouble validating, wait an hour or more for this to complete.
- Use 'Request Certificate' to resume the request and check validation. 
- If the certificate authority can see the TXT value they asked for in your DNS, they will then allow a certificate to be issued and the request will resume as normal.


