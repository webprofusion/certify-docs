---
id: dns-acmedns
title: Acme Dns (DNS challenge CNAME redirection)
---
## Setup or select an acme-dns server
https://github.com/joohoi/acme-dns

## Test your certificate request and configure CNAME
When a managed certificate using the  acme-dns provider is first tested for you will receive a message prompting you to configure a CNAME in your dns control panel, pointing to a specific record provided by the acm-dns service provider.


## Troubleshooting
Test you acme-dns server is responding to DNS queries ok:
```bash
dig auth.example.org
```

If error in app is NXDOMAIN for _acme-challenge... , Let's Encrypt has been unable to find or follow the CNAME you have configured in your DNS.


    