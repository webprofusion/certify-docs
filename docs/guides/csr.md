---
id: csr
title: Certificate Signing & Security
---

# Certificate Signing Requests

When requesting a certificate from a [Certificate Authority (CA)](certificate-authorities.md) a special file called a Certificate Signing Request (CSR) is submitted. See also https://en.wikipedia.org/wiki/Certificate_signing_request

In the case of ACME domain validated certificates this CSR mainly just includes the list of domains you want to include on the certificate (other fields such as Organisation etc are discarded because ACME doesn't validate these). The CSR is signed using your Private Key, verifiable using the public key included in the CSR. This ensures that the same entity who completed certificate validation is also the same entity submitting the certificate signing request.

## OCSP Must-Staple
To enable OCSP-Must staple check *Require OCSP Must-Staple* under Certificate > Advanced > Signing & Security. This will add the OCSP Must Staple extension to the CSR and the resulting certificate.

## CSR Signing Key Algorithm (Private Key)
The app defaults to RSA 2048 for CSR signing keys (the certificate Private Key). This default was briefly changed in 6.x to ECDSA 256 but many older versions of Windows Server were found to be incompatible with the key type as a default. You can set your preference globally under *Settings* or per-managed certificate under *Certificate > Advanced  > Signing & Security > CSR Signing Algorithm*.

## Re-use a Private Key
In most cases you will want to use a new private key for each certificate request, but in some cases you may want to re-use an existing private key. For example, if you have a private key that is already in use by another system, or you have a private key that you want to use for multiple certificates. If you check *Use the same Private Key for Renewals* the app will generate a key on next renewal and re-use that for subsequent renewals of the same certificate.

You can also use a custom private key in PEM format, by selecting *Choose Private Key...* under Certificate > Advanced > Signing & Security > CSR Signing Key.

## Using a Custom CSR
In most cases the CSR (and private key) is generated for you, but in some cases you may need to supply your own, so that the resulting certificate can be used with other systems which require a CSR based workflow (such as SAP, various servers and IoT devices including printers etc).

- Click New Certificate, then in Certificate > Advanced > Signing & Security, Choose Custom CSR.
- Select your CSR file, then select your Private key file. The private key file is required in order to build the final certificate PFX.
- Click Request Certificate. This will perform the certificate request with the ACME CA and submit your CSR, a signed certificate will then be downloaded.