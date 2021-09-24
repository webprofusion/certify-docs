---
id: kb-202109-letsencrypt
title: Let's Encrypt DST Root CA X3 expiry Sept 30th 2021 
---

# Summary

Certificate trusts relies on the "root" issuing certificate being trusted by your computer. From Sept 30th 2021 Let's Encrypts previous root certificate *DST Root CA X3* will expire. It is being replaced by their *ISRG Root X1* certificate.

The root certificate issues an Intermediate certificate which in turn is used to issue general certificates such as the ones for your website. This is called a "Chain" of trust. Your certificate (called a Leaf or end-entity certificate) will be validated by following this chain 

**In most cases, your systems will automatically switch over to the next trusted chain they can find.**

# Problem
In some cases, the expiry of the root may causes certificates to be considered untrusted or invalid. To fix this you need to make your server use (serve) the correct chain.

In other cases, the issue may be with the client computer.

## Problem Resolution

### Servers

We recommend the following steps to resolve a chain trust issue:

1. Install the latest version of Certify The Web. Even if you are not using the app currently, the upgrade will automatically fix common trust store issues (and it can then be uninstalled if not being used).
2. Reboot server (this forces windows to re-evaluate the served certificate chains). You may be able to avoid this reboot by using `iisreset /restart` to just restart IIS.
3. Check your certificate chain with Qualsys SSL Checker: https://www.ssllabs.com/ssltest/

The default chain served by Windows will be either:
- Leaf (your cert) > R3 > ISRG Root X1
- Leaf (your cert) > R3 > ISRG Root X1 > DST Root CA X3

Either chain is fine for most purposes. The old (expired) chain is Leaf (your cert) > R3 > DST Root CA X3 - so if you still see the old chain then you need to review further steps to resolve.

If you require (for compatibility reasons, such as old Android and other devices that don't know about *ISRG Root X1*) the chain to be *Leaf (your cert) > R3 > ISRG Root X1 > DST Root CA X3*, you need to install the version of the *ISRG Root X1* cert which is cross signed (issued) by *DST Root CA X3*. https://letsencrypt.org/certs/isrg-root-x1-cross-signed.der

If no other solution works or for any other reason you cannot update client trusts stores etc, you may consider moving your certificate to a new Certificate Authority.

### Clients (browsers etc)
If your site is working for most devices but not for some, the problem is with the trust store (list of trusted certificate).

On windows PCs, simply browsing to a website using Chrome, Edge etc with updated the client trust store with the required certificates. Browsing to https://valid-isrgrootx1.letsencrypt.org/ will prompt Windows to include *ISRG Root X1* in it trust store.