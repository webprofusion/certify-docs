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

Certify DNS is a cloud hosted version of the acme-dns standard (CNAME delegation of acme challenge TXT records to a dedicated challenge response service). This service can be enabled through the https://certifytheweb.com License Keys tab when signed in. The service is compatible with most existing _acme-dns_ clients so it can be used with other ACME clients on all operating systems. Read more about [Certify DNS](providers/certifydns.md).

### DNS API Providers

Current Built-In DNS API providers include:

- ACME DNS (see below), Aliyun \*, [AWS Route53](providers/awsroute53.md), [Azure DNS](providers/azuredns.md), [Cloudflare](providers/cloudflare.md), [DNS Made Easy](providers/dnsmadeeasy.md), [GoDaddy](providers/godaddy.md), Microsoft DNS \*, IONOS \*, [OVH](providers/dns-ovh.md) \*, Simple DNS Plus \*, TransIP \*

_\* marked providers are contributed and tested by users._

In addition we implement a number of DNS providers courtesy of the Posh-ACME: https://github.com/rmbolger/Posh-ACME project. If you encounter any issues with these you should verify they work normally within Posh-ACME and then raise an issue on our [github page](https://github.com/webprofusion/certify) :

[Akamai](https://poshac.me/docs/v4/Plugins/Akamai),
[AutoDNS](https://poshac.me/docs/v4/Plugins/AutoDNS),
[All-Inkl](https://poshac.me/docs/v4/Plugins/All-Inkl),
[ClouDNS](https://poshac.me/docs/v4/Plugins/ClouDNS),
[Combell](https://poshac.me/docs/v4/Plugins/Combell),
[Constellix](https://poshac.me/docs/v4/Plugins/Constellix),
[DNSPod](https://poshac.me/docs/v4/Plugins/DNSPod),
[DNSimple](https://poshac.me/docs/v4/Plugins/DNSimple),
[DomainOffensive](https://poshac.me/docs/v4/Plugins/DomainOffensive),
[deSEC](https://poshac.me/docs/v4/Plugins/DeSEC),
[DigitalOcean](https://poshac.me/docs/v4/Plugins/DOcean),
[Dreamhost](https://poshac.me/docs/v4/Plugins/Dreamhost),
[Dynu](https://poshac.me/docs/v4/Plugins/Dynu),
[EasyDNS](https://poshac.me/docs/v4/Plugins/EasyDNS),
[Gandi](https://poshac.me/docs/v4/Plugins/Gandi),
[Google Cloud](https://poshac.me/docs/v4/Plugins/GCloud),
[Hetzner](https://poshac.me/docs/v4/Plugins/Hetzner),
[Hurricane Electric](https://poshac.me/docs/v4/Plugins/HurricaneElectric),
[Infoblox](https://poshac.me/docs/v4/Plugins/Infoblox),
[IBM Cloud/SoftLayer](https://poshac.me/docs/v4/Plugins/IBMSoftLayer),
[ISPConfig](https://poshac.me/docs/v4/Plugins/ISPConfig),
[Linode](https://poshac.me/docs/v4/Plugins/Linode),
[Loopia](https://poshac.me/docs/v4/Plugins/Loopia),
[LuaDns](https://poshac.me/docs/v4/Plugins/LuaDns),
[name.com](https://poshac.me/docs/v4/Plugins/NameCom),
[Namecheap](https://poshac.me/docs/v4/Plugins/Namecheap)
[NS1](https://poshac.me/docs/v4/Plugins/NS1),
[PointDNS](https://poshac.me/docs/v4/Plugins/PointDNS),
[Rackspace](https://poshac.me/docs/v4/Plugins/Rackspace),
[RFC2136](https://poshac.me/docs/v4/Plugins/RFC2136),
[Selectel](https://poshac.me/docs/v4/Plugins/Selectel),
[Simply](https://poshac.me/docs/v4/Plugins/Simply),
[TotalUptime](https://poshac.me/docs/v4/Plugins/TotalUptime),
[UKFast](https://poshac.me/docs/v4/Plugins/UKFast),
[Yandex](https://poshac.me/docs/v4/Plugins/Yandex),
[Zilore](https://poshac.me/docs/v4/Plugins/Zilore)
[Zonomi](https://poshac.me/docs/v4/Plugins/Zonomi)

**If you change API credentials, you need to replace the credential settings in Certify under 'Settings > Stored Credentials' to ensure renewals keep working. Once saved, there is also a 'Test' option so you can try out the credentials to check they still work.**

### CNAME Delegation

An optional advanced approach to DNS validation which removes the need to update your primary domain DNS is to use CNAME delegation, this is where you create an `_acme-challenge.yourdomain.com` CNAME record for each domain/subdomain and point it at a corresponding TXT record in another DNS zone. This allows you to have a dedicated domain or subdomain which specifically handles DNS challenge requests (because it can be automated).

In the Authorization configuration UI, you can specify the `CNAME Delegation Rule` for each authorization configuration.

The rule format is: `*.source.domain:*.destination.domain`, you can specify multiple rules by separating rules with `;`.

So if for example your website `example.com` has names `example.com` and `www.example.com` these would normally require a challenge TXT record be automatically created for each entry e.g. `_acme-challenge.example.com` and `_acme-challenge.www.example.com`. In this example we could redirect those as CNAME entries to a dedicated zone such as `auth.example.org`.

- Configure all of the settings in order to update the target domain (instead of the original domain) and set your `CNAME Delegation Rule` as `*.example.com:*.auth.example.org`.
- You will then also need an `_acme-challenge` CNAME in your original domain setup to point to delegated domain, for each domain/subdomain (e.g. `_acme-challenge.example.com` pointing to `_acme-challenge.auth.example.org` and `_acme-challenge.www.example.com` pointing to `_acme-challenge.www.auth.example.org`).
- The app will create/update the target TXT record and values, using the DNS credentials/API selection you have specified for the target domain/DNS zone.

It's also possible to redirect multiple sources to one destination subdomain using a non-wildcard target e.g. a rule definition of `*.example.com:auth.example.org` would translate `_acme-challenge.www.example.com` to `_acme-challenge.auth.example.org`, ignoring the subdomain. This means all of your TXT updates can use the same TXT record but support for this will vary by DNS provider.

## Other DNS Validation Methods

You can alternatively use the following methods to manage your DNS TXT records:

### ACME DNS

[acme-dns](https://github.com/joohoi/acme-dns) is a system to automatically manage TXT record values on behalf of your domain **just for challenge validation**. This is probably the easiest method if you have a trusted acme-dns server you can use, this also avoids storing powerful DNS admin credentials on your server. Find out more on [how to use acme-dns](providers/acme-dns.md).

### DNS Scripting

[DNS Scripting](providers/scripting.md) involves providing your own custom script to update/delete TXT records in your DNS using a .bat file which can then optionally call python, node scripts etc.

### Manual DNS

If you are just experimenting with wildcard domains you may opt to use manual DNS updates (editing manually via your DNS control panel).

**This is the least recommended option as you will need to update this for every renewal.**

This method can also be extremely confusing when requesting a single cert for `*.domain.com` and `domain.com`, as you need to provide 2 values for the same TXT `_acme-challenge.domain.com` record (to answer both the `*.domain.com` and `domain.com` challenge responses).

To use Manual DNS:

- Select Manual DNS as your DNS update method
- Perform your initial certificate request. The request will pause and ask you to create a TXT record in your domain (one value for each domain or wildcard). Once you have completed that, wait for your DNS name servers to complete propagation. If you have trouble validating, wait an hour or more for this to complete.
- Use 'Request Certificate' to resume the request and check validation.
- If the certificate authority can see the TXT value they asked for in your DNS, they will then allow a certificate to be issued and the request will resume as normal.
