---
id: validation
title: DNS Domain Validation (dns-01)
---

## Why use DNS Validation?

To request a certificate from Let's Encrypt (or any Certificate Authority), you need to provide some kind of proof that you are entitled to receive the certificate for given domain(s). Let's Encrypt supports two methods of validation to prove control of your domain, `http-01` ([validation over HTTP](http-validation.md)) and `dns-01` (validation over DNS).

**Wildcard domain certificates (those covering `*.yourdomain.com`) can only be requested using DNS validation.** DNS Validation is also especially useful if the domains you are trying to get certification for are not public websites, or cannot serve http requests on port 80.

## How to use DNS Validation

In order to validate your control of your domains to the certificate authority you will be required to create a specified TXT record in your domain's DNS zone.

To do this you may need to get the API credentials for the (hosted) DNS from your DNS providers control panel, store these credentials in the app then select them to be used for specific certificate requests. DNS credentials are encrypted at rest using Windows DAPI, but where possible you should use limited privilege credentials.

If your DNS provider (or custom DNS setup) does not have an API we can talk to, you can write your own DNS update script or use the Manual DNS option (the request pauses while you manually update DNS).

### Certify DNS

Certify DNS is a cloud hosted version of the acme-dns standard (CNAME delegation of acme challenge TXT records to a dedicated challenge response service). This service can be enabled through the https://certifytheweb.com License Keys tab when signed in. The service is compatible with most existing _acme-dns_ clients so it can be used with other ACME clients on all operating systems. Read more about [Certify DNS](providers/certifydns.md).

### DNS API Providers

Current Built-In DNS API providers include:

- ACME DNS (see below), Aliyun \*, [AWS Route53](providers/awsroute53.md), [Azure DNS](providers/azuredns.md), [Cloudflare](providers/cloudflare.md), [DNS Made Easy](providers/dnsmadeeasy.md), [GoDaddy](providers/godaddy.md), Microsoft DNS \*, IONOS \*, [OVH](providers/dns-ovh.md) \*, Simple DNS Plus \*, TransIP \*

_\* marked providers are contributed and tested by users._

In addition we implement a number of DNS providers courtesy of the Posh-ACME: https://github.com/rmbolger/Posh-ACME project. If you encounter any issues with these you should verify they work normally within Posh-ACME and then raise an issue on our [github page](https://github.com/webprofusion/certify) :

[Akamai](https://poshac.me/docs/latest/Plugins/Akamai),
[AutoDNS](https://poshac.me/docs/latest/Plugins/AutoDNS),
[All-Inkl](https://poshac.me/docs/latest/Plugins/All-Inkl),
[Bunny](https://poshac.me/docs/latest/Plugins/Bunny),
[ClouDNS](https://poshac.me/docs/latest/Plugins/ClouDNS),
[Combell](https://poshac.me/docs/latest/Plugins/Combell),
[Constellix](https://poshac.me/docs/latest/Plugins/Constellix),
[DMEasy](https://poshac.me/docs/latest/Plugins/DMEasy),
[DNSPod](https://poshac.me/docs/latest/Plugins/DNSPod),
[DNSimple](https://poshac.me/docs/latest/Plugins/DNSimple),
[DomainOffensive](https://poshac.me/docs/latest/Plugins/DomainOffensive),
[Domeneshop](https://poshac.me/docs/latest/Plugins/Domeneshop)
[deSEC](https://poshac.me/docs/latest/Plugins/DeSEC),
[DigitalOcean](https://poshac.me/docs/latest/Plugins/DOcean),
[Dreamhost](https://poshac.me/docs/latest/Plugins/Dreamhost),
[Dynu](https://poshac.me/docs/latest/Plugins/Dynu),
[EasyDNS](https://poshac.me/docs/latest/Plugins/EasyDNS),
[Gandi](https://poshac.me/docs/latest/Plugins/Gandi),
[Google Cloud](https://poshac.me/docs/latest/Plugins/GCloud),
[Google Domains](https://poshac.me/docs/latest/Plugins/GoogleDomains),
[Hetzner](https://poshac.me/docs/latest/Plugins/Hetzner),
[HostingDe](https://poshac.me/docs/latest/Plugins/HostingDe),
[Hurricane Electric](https://poshac.me/docs/latest/Plugins/HurricaneElectric),
[Infoblox](https://poshac.me/docs/latest/Plugins/Infoblox),
[Infomaniak](https://poshac.me/docs/latest/Plugins/Infomaniak)
[INWX](https://poshac.me/docs/latest/Plugins/INWX)
[IONOS](https://poshac.me/docs/latest/Plugins/IONOS)
[IBM Cloud/SoftLayer](https://poshac.me/docs/latest/Plugins/IBMSoftLayer),
[ISPConfig](https://poshac.me/docs/latest/Plugins/ISPConfig),
[Leaseweb](https://poshac.me/docs/latest/Plugins/LeaseWeb/),
[Linode](https://poshac.me/docs/latest/Plugins/Linode),
[Loopia](https://poshac.me/docs/latest/Plugins/Loopia),
[LuaDns](https://poshac.me/docs/latest/Plugins/LuaDns),
[name.com](https://poshac.me/docs/latest/Plugins/NameCom),
[Namecheap](https://poshac.me/docs/latest/Plugins/Namecheap)
[NameSilo](https://poshac.me/docs/latest/Plugins/NameSilo)
[NS1](https://poshac.me/docs/latest/Plugins/NS1),
[PointDNS](https://poshac.me/docs/latest/Plugins/PointDNS),
[Porkbun](https://poshac.me/docs/latest/Plugins/Porkbun),
[PowerDNS](https://poshac.me/docs/latest/Plugins/PowerDNS),
[Rackspace](https://poshac.me/docs/latest/Plugins/Rackspace),
[RFC2136](https://poshac.me/docs/latest/Plugins/RFC2136),
[Selectel](https://poshac.me/docs/latest/Plugins/Selectel),
[Simply](https://poshac.me/docs/latest/Plugins/Simply),
[TencentDNS](https://poshac.me/docs/latest/Plugins/TencentDNS),
[TotalUptime](https://poshac.me/docs/latest/Plugins/TotalUptime),
[UKFast](https://poshac.me/docs/latest/Plugins/UKFast),
[Yandex](https://poshac.me/docs/latest/Plugins/Yandex),
[Zilore](https://poshac.me/docs/latest/Plugins/Zilore)
[Zonomi](https://poshac.me/docs/latest/Plugins/Zonomi)

**If you change API credentials, you need to replace the credential settings in Certify under 'Settings > Stored Credentials' to ensure renewals keep working. Once saved, there is also a 'Test' option so you can try out the credentials to check they still work.**

### Propagation Delay Seconds

When using DNS validation, the certificate authority will check your DNS TXT record using your authoritative nameserver to see if they agree on the expected value of the corresponding `_acme-challenge` record for each domain/subdomain identifier. When the TXT record is updated it can often take up to a minute or two for all your nameservers to agree, we refer to the time we wait to allow for this as *Propagation Delay*. The default propagation delay is 60 seconds, but you can increase this if you are having trouble with validation. If you are using a DNS provider which has a very long propagation delay you may need to increase this value e.g. to 300 seconds (5 minutes). 

### CNAME Delegation

An optional advanced approach to DNS validation which removes the need to update your primary domain DNS is to use CNAME delegation, this is where you create an `_acme-challenge.yourdomain.com` CNAME record for each domain/subdomain and point it at a corresponding TXT record in another DNS zone. This allows you to have a dedicated domain or subdomain which specifically handles DNS challenge requests (because it can be automated).

In the Authorization configuration UI, you can specify the `CNAME Delegation Rule` for each authorization configuration.

The rule format is: `*.source.domain:*.destination.domain`, you can specify multiple rules by separating rules with `;`.

So if for example your website `example.com` has names `example.com` and `www.example.com` these would normally require a challenge TXT record be automatically created for each entry e.g. `_acme-challenge.example.com` and `_acme-challenge.www.example.com`. In this example we could redirect those as CNAME entries to a dedicated zone such as `auth.example.org`.

- Configure all of the settings in order to update the target domain (instead of the original domain) and set your `CNAME Delegation Rule` as `*.example.com:*.auth.example.org`.
- You will then also need an `_acme-challenge` CNAME in your original domain setup to point to delegated domain, for each domain/subdomain (e.g. `_acme-challenge.example.com` pointing to `_acme-challenge.auth.example.org` and `_acme-challenge.www.example.com` pointing to `_acme-challenge.www.auth.example.org`).
- The app will create/update the target TXT record and values, using the DNS credentials/API selection you have specified for the target domain/DNS zone.

It's also possible to redirect multiple sources to one destination subdomain using a non-wildcard target e.g. a rule definition of `*.example.com:auth.example.org` would translate `_acme-challenge.www.example.com` to `_acme-challenge.auth.example.org`, ignoring the subdomain. This means all of your TXT updates can use the same TXT record but support for this will vary by DNS provider.

### Domain Match Rules
For certificates that require multiple authorizations across different domain (e.g. different DNS providers/zones or a mix of HTTP and DNS validation) you can use the `Domain Match Rule` to specify which domains/subdomains should be matched for the given authorization configuration. These are optional and *only* used if you have multiple authorization configurations for the same certificate. To match all (first level) subdomains of a domain use a wildcard `*.example.com` or to match only a single specific domain/subdomain identifier use `subdomain.example.com`, multiple rules can be supplied as semicolon separated. 

Note that `*.example.com` will *not* match a further subdomain level such as `something.subdomain.example.com`. To match multiple subdomains either explicitly or as a wildcard you can use a semicolon separated list e.g.`*.example.com;*.subdomain.example.com;www.something.example.com`. You can use the Preview tab to see which authorization configurations will match which identifiers, if an identifier is not matched the app will fall back to HTTP validation for that identifier.

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

## Common Issues
### DNS domain validations suddenly failing
DNS providers can and do change their APIs periodically which can impact renewals using DNS validation. For instance, GoDaddy changed their API to only allow API use for customers with more than 10 domains. Other DNS providers have retired their older APIs resulting in renewals that use those failing. We recommend that if a problem develops with DNS validation that you ensure you are using the latest version of the app and if the problem persists contact your DNS provider to ask if their API has recently changed.