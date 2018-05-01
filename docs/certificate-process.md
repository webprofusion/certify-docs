---
id: certificate-process
title: Certificate Request Process
---

When you install Certify you will be prompted to register with the Let's Encrypt service and you should provide a real email address for them to contact you, otherwise they can't contact you if there is a problem with your certificate. 

## Requesting a Certificate

### 1. Choose the domains to include
The first step of requesting a certificate if to decide which domain (and subdomains) need to be included in your certificate. You can manually specify these or you can load the configured hostname bindings from an existing IIS site on your server. If you choose an existing IIS site this will also be your default target for the final https bindings to be created/updated

### 2. Decide how to validate domains
You will need to prove you control the domains you have added to your certificate. Only public domains can be validated using Let's Encrypt so intranet sites (hostname only with no domain etc e.g. SRVDEVAPP01) are not supported, however public domain names (like srvdevapp01.dev.domain.com) are fine.

You can validate using [HTTP validation (http-01)](http-validation.md) or [DNS Validation (dns-01)](dns-validation.md). HTTP validation requires that your domain be a publicly accessible website with an http service on port 80, at least for the validation file. DNS validation requires that you can automatically create a TXT record in your domain's DNS zone (usually using a DNS API from a cloud DNS provider). If neither of these options are viable for you, you may not be able to use Let's Encrypt.

### 3. Decide how to deploy
By default Certify will auto update/add https bindings on your selected IIS website with your new certificate. 

You can customise this behaviour or even opt to have no deployment at all, however if you do customise binding behaviour you should have a clear understanding of the limitations of [SSL binding on Windows](ssl-windows.md)

## Advanced Options

There are a number of options available to customise the request/renewal process. See full guide to the user interface [options](ui-options.md) available.