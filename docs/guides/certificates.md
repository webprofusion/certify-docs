---
id: certificates
title: Certificates
---

# Certificates

A certificate helps a service prove its identity during TLS, which many people still call SSL. In the Certify context, this usually means proving control of a domain name.

Certificates are part of a Public Key Infrastructure (PKI) trust model. A [Certificate Authority (CA)](certificate-authorities.md) issues the certificate after validating the requester. In most Certify scenarios, this is a Domain Validated (DV) certificate, meaning the CA checks that the requester controls the domain.

## What a certificate includes

A certificate contains public information signed by a CA. It is linked to a secret **private key** held by the service using the certificate.

- The **certificate** is public.
- The **private key** must stay private.
- The certificate contains a **public key**.
- Only the holder of the matching private key can correctly use that certificate during TLS.

This is what allows a client to verify that the service presenting the certificate is the legitimate holder of the private key.

## Certificate chain

Certificates are trusted because they are signed by a CA.

That trust usually involves:

- a **root certificate**
- one or more **intermediate certificates**
- the final **leaf** or **end-entity certificate** issued for your domain

The leaf certificate is the one installed on your site or service. The chain links it back to a trusted root certificate.

## TLS and SSL

The certificate and private key are used during the TLS handshake to provide:

- encryption
- service identity
- trust through the certificate chain

:::tip Learn more about TLS and PKI

If you are interested in reading more about how certificates work, what TLS is and why certificates are trusted, we recommend reading *Bulletproof TLS and PKI* published by Feisty Duck: https://www.feistyduck.com/books/bulletproof-tls-and-pki/ 

*Certify The Web users can get 15% off using the discount code CTW15*

:::

## Common file types

Certificate files can be confusing because different formats can contain different parts of the same certificate set:

- A `.pfx` or `.p12` file is a PKCS#12 container. It can include the certificate and its private key. This is common on Windows and is the default file type produced by Certify. It can also be protected with a password.
- A PEM file is a text-based format that can hold a certificate, a chain, or a private key. Common extensions include `.pem`, `.crt`, `.key`, and `.chain`.
- A `.der` file is a binary encoding of similar certificate data. A `.cer` file may also be DER encoded.

The file extension is often just a naming convention. What matters is the content and what your target service expects.

## Deployment basics

Different services use certificates in different ways:

- Some use certificate files directly.
- Some use the operating system certificate store.
- Some refer to certificates by a *thumbprint* stored in a registry key, configuration file, or database.

Examples:

- IIS on Windows can use the computer certificate store or a shared certificate store with PFX files (CCS).
- Apache and nginx usually use PEM-encoded certificate and key files.

Deploying a renewed certificate may mean replacing files, updating a thumbprint reference, or both, depending on the target service.
