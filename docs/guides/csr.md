---
id: csr
title: Certificate Signing Requests
---

# Certificate Signing Requests

When requesting a certificate from a [Certificate Authority (CA)](certificate-authorities.md) a special file called a Certificate Signing Request (CSR) is submitted. See also https://en.wikipedia.org/wiki/Certificate_signing_request

In the case of ACME domain validated certificates this CSR mainly just includes the list of domains you want to include on the certificate (other fields such as Organisation etc are discarded because ACME doesn't validate these). The CSR is signed using your Private Key, verifiable using the public key included in the CSR. This ensures that the same entity who completed certificate validation is also the same entity submitting the certificate signing request.

## Using a Custom CSR
In most cases the CSR (and private key) is generated for you, but in some cases you may need to supply your own, so that the resulting certificate can be used with other systems which require a CSR based workflow (such as SAP, various servers and IoT devices including printers etc).

- Click New Certificate, then in Certificate - Advanced > Signing & Security, Choose Custom CSR.
- Select your CSR file, then select your Private key file. The private key file is required in order to build the final certificate PFX.
- Click Request Certificate. This will perform the certificate request with the ACME CA and submit your CSR, a signed certificate will then be downloaded. 