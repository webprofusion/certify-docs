---
id: certifydns
title: certifydns
---

# Certify DNS
Certify DNS is a cloud hosted version of the [acme-dns](https://github.com/joohoi/acme-dns) standard (CNAME delegation of acme challenge TXT records to a dedicated challenge response service). This service can be enabled through the https://certifytheweb.com License Keys tab when signed in. The service is compatible with most existing *acme-dns* clients so it can be used with other ACME clients on all operating systems.

**With Certify DNS, you create a special CNAME record in your domain DNS, instead of a TXT record. This CNAME record points to the Certify DNS cloud service and handles ACME challenge responses for your domain.**

## Using Certify DNS in Certify The Web

- Enable Certify DNS in your https://certifytheweb.com profile (under License Keys). While the service is in beta testing this can be enabled for free.
- Select Certify DNS as the DNS update method.
- Create your Certify DNS credentials using your account email address and license key. You only need to do this once.
- Click `Request Certificate` to perform a one-time registration with the Certify DNS service (per domain).
- You will be prompted to create a CNAME pointing to the TXT record hosted by the Certify DNS service. If you miss this prompt check back in the log file for your managed certificate (see the Status tab).
- Once you have created your CNAME record, delete any existing _acme-challenge TXT record in the same zone to avoid confusion.
- Resume the request using `Request Certificate`, the Certify DNS service will automatically provide the required TXT record responses on your behalf.
- Automatic renewals will then perform this process again without manual intervention.

## Using Certify DNS with other acme-dns compatible clients
- Once activated on your https://certifytheweb.com account as special URL will be shown under the License Keys tab. This passes your license key info as basic credentials to the Certify DNS service.
- Follow the normal instructions for your acme-dns client, using the provided URL as the base URL for the acme-dns service.

### Example: Certbot with acme-dns-auth.py (linux)
- Install Certbot and download acme-dns-auth.py (https://github.com/joohoi/acme-dns-certbot-joohoi)
- Update acme-dns-auth.py to set `ACMEDNS_URL = "https://<your key credentials>@certify-dns.certifytheweb.com"`. Your url with credentials if found on your certifytheweb.com License Keys tab when Certify DNS is enabled.
- Run certbot with the required auth hook, e.g.:
`sudo certbot certonly --manual --manual-auth-hook /etc/letsencrypt/acme-dns-auth.py --preferred-challenges dns --debug-challenges  -d www.example.com`
- On first run you will be prompted to create a specific CNAME in your domains DNS after registration completes. 

## Troubleshooting

If the error in the app is `NXDOMAIN for _acme-challenge...` , the Certificate Authority has been unable to find or follow the CNAME you have configured in your DNS.

## Advantages and Disadvantages
There are a number of factors to consider before delegating validation to a service like Certify DNS (or any acme-dns style service).

Advantages:
- Easy setup and can be used with any DNS provider even if they don't have an API
- Least privileged updates to DNS. Your existing DNS zone only needs initial CNAME records created and thereafter no further updates are required to your DNS.

Disadvantages:
- Delegating DNS validation to an external service theoretically allows the service to complete validation for certificates on your domain. **This is a security risk and you must trust the service provider.** An alternative is to host your own internet facing acme-dns server. You should review the requirements for doing that and assess whether it's the best choice for your organisation. Future updates to the CAA record standard for CA issuance will likely add a way to limit updates to specific CA accounts.