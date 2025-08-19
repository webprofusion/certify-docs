---
id: validation
title: DNS Domain Validation (dns-01)
---

## Why use DNS Validation?

To request a certificate from Let's Encrypt (or any Certificate Authority), you must prove control of the domain names on the certificate. Two ACME challenge types are commonly used:

- `http-01` – [validation over HTTP](http-validation.md)
- `dns-01` – validation over DNS (TXT records)

**Wildcard certificates** (for example, `*.yourdomain.com`) can only be requested using DNS validation. DNS validation is also useful when:

- Your domains are not public websites.
- Port 80 (HTTP) cannot be used for validation.

## How to use DNS Validation

To validate control of your domains, you create a specific TXT record in the domain's DNS zone for each name on the certificate.

Notes:

- The TXT value is different for every order/renewal, so automation is strongly recommended.
- The app includes built‑in integrations for many popular DNS providers with APIs the app can use.

If your DNS provider (or custom DNS setup) does not have a supported API, you can either:

- Provide your own DNS update script, or
- Use the Manual DNS option (the request pauses while you update DNS records yourself).

### Certify DNS

Certify DNS is a cloud hosted version of the acme-dns standard (CNAME delegation of acme challenge TXT records to a dedicated challenge response service). This service can be enabled through the https://certifytheweb.com License Keys tab when signed in. The service is compatible with most existing _acme-dns_ clients so it can be used with other ACME clients on all operating systems. Read more about [Certify DNS](providers/certifydns.md).

### DNS API providers

Current built‑in DNS API providers include:

- ACME DNS (see below), Aliyun \*, [AWS Route53](providers/awsroute53.md), [Azure DNS](providers/azuredns.md), [Cloudflare](providers/cloudflare.md), [DNS Made Easy](providers/dnsmadeeasy.md), [GoDaddy](providers/godaddy.md), Microsoft DNS \*, IONOS \*, [OVH](providers/dns-ovh.md) \*, Simple DNS Plus \*, TransIP \*

_\* Providers marked with an asterisk are community‑contributed and tested by users._

In addition, several providers are supported via the Posh‑ACME project (https://github.com/rmbolger/Posh-ACME). If you encounter issues with these plugins:

1. Verify the provider works as expected in Posh‑ACME.
2. Then raise an issue on our [GitHub page](https://github.com/webprofusion/certify).

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

**If you change API credentials**, update them under Settings > Stored Credentials so renewals continue to work. Use the Test button to confirm connectivity.

### Propagation delay (seconds)

When using DNS validation, the CA checks your `_acme-challenge` TXT record via your authoritative name servers. After you update a TXT record, it can take time for all name servers to agree. The app waits for this window, called the **propagation delay**.

- Default: 60 seconds
- If validation is unreliable or your DNS provider is slow to propagate, increase to 120–300 seconds (or more if required)

### CNAME delegation

To avoid updating your primary DNS zone directly, you can use CNAME delegation:

1. In your primary zone, create an `_acme-challenge.<name>` CNAME for each domain/subdomain.
2. Point each CNAME at a corresponding `_acme-challenge.<name>` TXT record in a different (delegated) zone that you can automate.

In the Authorization configuration UI, set the `CNAME Delegation Rule` for each authorization configuration.

Rule format: `*.source.domain:*.destination.domain` (use `;` to separate multiple rules).

Example: your site `example.com` includes `example.com` and `www.example.com`. Normally you would create TXT records for `_acme-challenge.example.com` and `_acme-challenge.www.example.com`. Instead, you can delegate both to a dedicated zone such as `auth.example.org`.

- Configure the authorization to update the target (delegated) domain and set `CNAME Delegation Rule` to `*.example.com:*.auth.example.org`.
- In the original domain, add `_acme-challenge` CNAMEs pointing to the delegated zone, e.g., `_acme-challenge.example.com` → `_acme-challenge.auth.example.org` and `_acme-challenge.www.example.com` → `_acme-challenge.www.auth.example.org`.
- The app will create/update TXT records in the delegated zone using the DNS credentials/API you specified for that zone.

You can also map multiple sources to a single destination subdomain by using a non‑wildcard target. For example, `*.example.com:auth.example.org` maps `_acme-challenge.www.example.com` to `_acme-challenge.auth.example.org` (ignoring the subdomain). Not all DNS providers support multiple TXT values on a single record—check your provider’s capabilities.

### Domain match rules
If a certificate needs multiple authorization configurations (for example, different DNS zones/providers or a mix of HTTP and DNS), use `Domain Match Rule` to specify which names each configuration applies to. These rules are optional and only used when more than one authorization configuration exists.

Tips:

- `*.example.com` matches first‑level subdomains only, not `something.subdomain.example.com`.
- Use a semicolon‑separated list to match multiple patterns, e.g., `*.example.com;*.subdomain.example.com;www.something.example.com`.
- Use the Preview tab to confirm which identifiers match which configurations. If an identifier is not matched, the app falls back to HTTP validation for that name.

## Other DNS validation methods

You can alternatively use the following methods to manage your DNS TXT records:

### acme-dns

[acme-dns](https://github.com/joohoi/acme-dns) automatically manages TXT record values **only for challenge validation**. If you have access to a trusted acme-dns server, this is often the simplest approach and avoids storing DNS admin credentials on your servers. Learn more: [how to use acme-dns](providers/acme-dns.md).

### DNS scripting

[DNS scripting](providers/scripting.md) lets you run your own update/delete logic for TXT records. For example, call a `.bat` file that invokes PowerShell, Python, or Node.js.

### Manual DNS

If you’re experimenting with wildcard domains, you can use manual DNS updates (edit records in your DNS control panel).

**This is the least‑recommended option** because you must repeat the process for every renewal.

It can also be confusing when requesting a single cert for `*.domain.com` and `domain.com`: you must provide two TXT values for the same `_acme-challenge.domain.com` record (to answer both challenges).

To use Manual DNS:

1. Select Manual DNS as your DNS update method.
2. Start the certificate request. When prompted, create the TXT record(s) (one value per name). Wait for DNS propagation—if validation fails, wait longer (up to an hour) and try again.
3. Use Request Certificate to resume and validate.
4. If the CA can see the expected TXT values, the order proceeds and the certificate is issued.

## Common Issues
### DNS domain validations suddenly failing
DNS providers can and do change their APIs periodically which can impact renewals using DNS validation. For instance, GoDaddy changed their API to only allow API use for customers with more than 10 domains. Other DNS providers have retired their older APIs resulting in renewals that use those failing. We recommend that if a problem develops with DNS validation that you ensure you are using the latest version of the app and if the problem persists contact your DNS provider to ask if their API has recently changed.