---
id: certifydns
title: certifydns
---

# Certify DNS
Certify DNS is a cloud hosted version of the acme-dns standard (CNAME delegation of acme challenge TXT records to a dedicated challenge response service). This service can be enabled Certify The Web users through the https://certifytheweb.com License Keys tab when signed in. The service is compatible with most existing *acme-dns* clients so it can be used with other ACME clients on all operating systems.

**With Certify DNS, you create a special CNAME record in your domain DNS, instead of a TXT record. This CNAME record points to the Certify DNS cloud service and handles ACME challenge responses for your domain.**

- Enable Certify DNS in your https://certifytheweb.com profile (under License Keys). While the service is in beta testing you will need to request access via `support {at} certifytheweb.com`
- Select Certify DNS as the DNS update method.
- Create your Certify DNS credentials using your account email address and license key. You only need to do this once.
- Click `Request Certificate` to perform a one-time registration with the Certify DNS service (per domain).
- You will be prompted to create a CNAME pointing to the TXT record hsoted by the Certify DNS service. If you miss this prompt check back in the log file for your managed certificate (see the Status tab).
- Once you have created your CNAME record, delete any existing _acme-challenge TXT record in the same zone to avoid confusion.
- Resume the request using `Request Certificate`, the Certify DNS service will automatically provide the required TXT record responses on your behalf.
- Automatic renewals will then perform this process again without manual intervention.


## Troubleshooting

If the error in the app is `NXDOMAIN for _acme-challenge...` , the Certificate Authority has been unable to find or follow the CNAME you have configured in your DNS.

    