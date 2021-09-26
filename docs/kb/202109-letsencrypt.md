---
id: kb-202109-letsencrypt
title: Let's Encrypt DST Root CA X3 expiry Sept 30th 2021 
---

# Summary

Certificate trust relies on the "root" issuing certificate being trusted by your computer. From Sept 30th 2021 Let's Encrypts previous root certificate *DST Root CA X3* will expire. It is being replaced by their *ISRG Root X1* certificate.

The root certificate issues an Intermediate certificate which in turn is used to issue general certificates such as the ones for your website. This is called a "Chain" of trust. Your certificate (called a Leaf or end-entity certificate) will be validated by following this chain.

**In most cases, your systems will automatically switch over to the next trusted chain they can find.**

# Possible issues
In some cases, the expiry of the root (and its related expiring R3 intermediate certificate) may causes certificates to be considered untrusted or invalid. To fix this you need to make your server use (serve) the correct chain.

In other cases, the issue may be with the client computer.

The version of the *R3* intermediate signing certificate which chains to *DST Root CA X3* expires *September 29 19:21:40 2021 GMT.*

The *DST Root CA X3* root certificate expires *September 30 14:01:15 2021 GMT*.

# Solutions

### Servers

We recommend the following steps to resolve a chain of trust issue:

1. Install the latest version of *Certify The Web* from https://certifytheweb.com or use the in-app update process. Even if you are not using this app currently, the upgrade will automatically fix common trust store issues (and it can then be uninstalled if not being used).
2. Reboot your server (this forces windows to re-evaluate the served certificate chains). You may be able to avoid this reboot by using `iisreset /restart` to just restart IIS.
3. Check your certificate chain with Qualsys SSL Checker: https://www.ssllabs.com/ssltest/

The default chain served by Windows (depending on the state of your server trust store) will be either:
- **Chain 1 (modern)** Leaf (your cert) > R3 > ISRG Root X1
- **Chain 2 (legacy)** Leaf (your cert) > R3 > ISRG Root X1 > DST Root CA X3

For IIS etc, you can only serve one of these chains per windows server (machine), not a combination per site etc.

Either chain is fine for most purposes. **The old (expired) chain is *Leaf (your cert) > R3 > DST Root CA X3*.** If you still see this old chain after the DST Root CA X3 expiry (after updating Certify The Web), then you need to review further steps to resolve. At a minimum you must ensure ISRG Root X1 (Self signed) is installed under your machine Trusted Certification Authorities using certlm.msc.

### Using Chain 1 (modern)
If you are serving the *ISRG Root X1 > DST Root CA X3 (self signed)* chain and want to switch to just the *ISRG Root X1* chain, you need to remove the cross signed version of the ISRG Root X1 (issued by DST Root CA X3) from your machine trust store. You may need to reboot to see the effect.

### Using Chain 2 (legacy)
If you require compatibility with old versions of Android and other devices that don't know about *ISRG Root X1*, you need to serve **Chain 2**. To do so, install the version of the *ISRG Root X1* cert which is **cross signed (issued) by *DST Root CA X3***. https://letsencrypt.org/certs/isrg-root-x1-cross-signed.der into the *Trusted Certification Authorities* (or Intermediate Certification Authorities) machine store using certlm.msc. You may need to reboot to see the effect.

If no other solution works or for any other reason you cannot update client trusts stores etc, you may consider moving your certificate to a new Certificate Authority.

### Clients (browsers etc)
If your site is working for most devices but not for some, the problem is with their trust store (their list of trusted root certificate).

On windows PCs, simply browsing to a website using Chrome, Edge etc with updated the client trust store with the required certificates. Browsing to https://valid-isrgrootx1.letsencrypt.org/ will prompt Windows to include *ISRG Root X1* in it trust store.

## Other considerations
### Export Tasks
If you use Certify The Web to export certificates to pem files etc (for Apache or other servers), the chain you get in the export will correspond which the chain your server is currently building. The "Preferred Issuer" setting for the certificate authority will have *no effect*, because Windows is overriding the chain.

## Further Troubleshooting
Further information and troubleshooting steps are here: https://community.certifytheweb.com/t/upcoming-expiry-of-dst-root-ca-x3-and-r3-intermediate-for-lets-encrypt/1480

While the problem itself relates to and is controlled by Windows and Let's Encrypt, licensed users can contact Certify The Web support if they have further related questions and issues they need advice with.