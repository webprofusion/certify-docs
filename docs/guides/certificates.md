---
id: certificates
title: Certificates
---

# Certificates

Certificates are part of a Public Key Infrastructure (PKI) trust mechanism which state that a [Certificate Authority (CA)](certificate-authorities.md) has validated the identity of something. In our case, certificates are Domain Validated (DV) certificates, meaning they are (automatically) validated to ensure they have been issued to the organization controlling the given domain.

A digital certificate consists of a set of public information which has been signed by a Certificate Authority and issued to the holder of a secret *Private Key*. It asserts that the CA believes the holder (represented by their own public key, derived from their own private key) controls a particular domain (or set of domains). The public certificate itself is useless to anyone else except to verify the identity of the service presenting it. They can encrypt something with the public key and only the holder of the private key can decrypt it. This proves that the service you are communicating with also holds the private key that was used when the certificate was created.

The Certificate Authority signs the certificate it awards using it's own certificate(s). This consists of a Root certificate and any number of Intermediate certificates (they may delegate to these for signing so they don't have to use their root certificate all the time).

The final 'domain' certificate you receive is sometimes also called the end-entity or leaf certificate.

The resulting certificate can be used as part of the TLS (also called SSL) protocol conversation to help ensure encrypted and authenticated communication.

:::tip Learn more about TLS and PKI

If you are interested in reading more about how certificates work, what TLS is and why certificates are trusted, we recommend reading *Bulletproof TLS and PKI* published by Feisty Duck: https://www.feistyduck.com/books/bulletproof-tls-and-pki/ 

*Certify The Web users can get 15% off using the discount code CTW15*

:::

## File Types

Certificates consists of a public and private cryptographic key and optionally the public 'certificate chain' used to issue the final certificate. Filenames and file type used to contain certificate information can be confusing:
- A `.pfx` (or `.p12`) file is a combined container format (PKCS#12) which can include the certificate and it's associated private key. The `.pfx` file extension is most commonly used on Windows and is the default file type produced by Certify. This type of file may optionally be encrypted with a password.
- a PEM file (sometimes with a `.pem` extension) can be either a certificate file, a chain (a set of certificates) or a private key file. Sometimes the extensions `.crt`, `.key`, `.chain` are used but these are usually PEM (base64 encoded text) files with different purposes.  The file extensions just help you identify what the file is for, and some are interchangeable.
- `.der` is a binary encoding of the same type of information and can be used for multiple certificate components (certificate files sometimes using the extension `.cer`, confusingly a `.key` file could be either a PEM encoded file or a DER encoded file).

Different services can choose which file types/sources they want to support for their certificates, for instance:
- IIS on Windows either uses the certificate that's stored in the computer certificate store or it can use a shared certificate file store with PFX files (CCS). 
- The Apache and nginx web servers uses PEM encoded certificate and key files (the file extension isn't important).

## Deployment
- Some services refer to certificate by files, others use the computer certificate store and a certificate *Thumbprint* value, which is then stored in a registry key, configuration file or database. Deploying to these services requires applying the new thumbprint value via an appropriate method.
