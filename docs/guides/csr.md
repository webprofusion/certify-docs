---
id: csr
title: Certificate Signing & Security
---

# Certificate Signing Requests

When requesting a certificate from a [Certificate Authority (CA)](certificate-authorities.md) a special file called a Certificate Signing Request (CSR) is submitted. See also https://en.wikipedia.org/wiki/Certificate_signing_request

In the case of ACME domain validated certificates this CSR mainly just includes the list of domains you want to include on the certificate (other fields such as Organization etc are discarded because ACME doesn't validate these). The CSR is signed using your Private Key, verifiable using the public key included in the CSR. This ensures that the same entity who completed certificate validation is also the same entity submitting the certificate signing request.

## OCSP Must-Staple
In certificate request settings, enable *Require OCSP Must-Staple* to add the OCSP Must Staple extension to the CSR and resulting certificate.

## CSR Signing Key Algorithm (Private Key)
By default, Certify uses RSA 2048 for CSR signing keys (the certificate private key). This default was briefly changed in 6.x to ECDSA 256, but many older Windows Server versions were found to be incompatible with that default. You can set preferences globally or per managed certificate in product-specific certificate settings.

## Re-use a Private Key
In most cases you will want to use a new private key for each certificate request, but in some cases you may want to re-use an existing private key. For example, if you have a private key that is already in use by another system, or you have a private key that you want to use for multiple certificates. If you check *Use the same Private Key for Renewals* the app will generate a key on next renewal and re-use that for subsequent renewals of the same certificate.

You can also use a custom private key in PEM format from certificate signing/security settings.

## Using a Custom CSR
In most cases the CSR (and private key) is generated for you, but in some cases you may need to supply your own, so that the resulting certificate can be used with other systems which require a CSR based workflow (such as SAP, various servers and IoT devices including printers etc).

1. Create or edit the target certificate request.
2. In signing/security options, choose *Custom CSR*.
3. Select your CSR file, then your private key file (required to build the final PFX).
4. Request the certificate. Certify submits your CSR to the ACME CA, then downloads the signed certificate.