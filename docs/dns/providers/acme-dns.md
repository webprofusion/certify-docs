---
id: acme-dns
title: acme-dns
---

# Getting Started with acme-dns

acme-dns is a method for domain validation via DNS CNAME redirection to a trusted acme-dns server which in turn handles automated TXT record queries required for the ACME certificate validation process.

**With acme-dns, you create a special CNAME record, instead of a TXT record. This CNAME record points to the acme-dns server and handles ACME challenge responses for your domain.**

- Select acme-dns as the DNS update method.
- Point to a trusted acme-dns server
- Click `Test` or `Request Certificate` to perform a one-time registration with the acme-dns server (per domain).
- You will be prompted to create a CNAME pointing to the acme-dns server. If you miss this prompt check back in the log file for your managed certificate (see the Status tab).
- Once you have created your CNAME record, delete any existing \_acme-challenge TXT record in the same zone to avoid confusion.
- Resume the request using `Request Certificate`, the acme-dns server will automatically provide the required TXT record responses on your behalf.
- Automatic renewals will then perform this process again without manual intervention.

## About acme-dns

You can read more about acme-dns and you can optionally host your own acme-dns server by following the configuration instructions from:
https://github.com/joohoi/acme-dns

## Troubleshooting

If you have configured your own server, test your acme-dns server is responding to DNS queries ok:

```bash
dig auth.example.org
```

If the error in the app is `NXDOMAIN for _acme-challenge...` , the Certificate Authority has been unable to find or follow the CNAME you have configured in your DNS.
