---
id: certificate-authorities
title: Certificate Authorities
---

# Certificate Authorities

## Introduction

For a certificate to be trusted by other computers it needs to be issued using another certificate controlled by a **Certificate Authority (CA)**. This is an organisation or service which controls the issuing of certificates. Your computer operating system update process will usually take care of maintaining a 'Trust Store' of root certificates and when your computer sees a certificate from that issuer it knows that's one of the certificates it should trust.

There are hundreds of publicly trusted Certificate Authorities and a subset of those implement a specification for certificate request/renewal called **ACME** (Automatic Certificate Management Environment) https://datatracker.ietf.org/doc/html/rfc8555 (ACME v2). Anyone can create (and use) a new certificate authority but only recognised CAs which can prove they follow strict issuance guidelines become generally trusted. You can, for instance, create your own ACME certificate authority and trust it within your organisation, but it won't be trusted by computers outside your organisation.

Certify The Web supports a number of built-in CAs but you can also configure your own custom ACME CA (either public or self-hosted). Different managed certificates can be configured to use different CAs or they can all default to the same CA.

The certificate issuance service remains the responsibility of the Certificate Authority and we (Certify The Web operated by Webprofusion Pty Ltd) have no affiliation to their organisation or any control over their service. **Our software makes the process easier and automates how you acquire and use the certificates. We are not a Certificate Authority.** Using Certify to request a certificate from a CA also means you accept the CAs current service privacy policy, and their terms and conditions.

## Supported CAs

Support for the following certificate authorities is included by default:

### Let's Encrypt
Let's Encrypt are possibly the most well-known automated certificate authority, having pioneered the process for free, trusted and automated certificates. You can find out more details about them at https://letsencrypt.org 

They offer a free, automated, and open certificate authority brought to you by the nonprofit Internet Security Research Group (ISRG) https://www.abetterinternet.org/

- Trusted by all major operating systems and browsers
- Certificates issued by Let's Encrypt expire after 90 days, which means you need automated renewals to keep them active.
- Important rate limits apply: https://letsencrypt.org/docs/rate-limits/
- Certificates can contain up to 100 domain per certificates. Wildcard certificates (*.domain.com) are supported when using DNS validation. 

### ZeroSSL
ZeroSSL (https://zerossl.com/) are an ACME service operated by apilayer (https://apilayer.com/).

- Trusted by all major operating systems and browsers
- Certificates expire after 90 days.
- Certificates can contain up to 100 domain per certificates. Wildcard certificates (*.domain.com) are supported when using DNS validation. 
- To use ZeroSSL you first need to sign up for a free account in order to get External Account Binding (EAB) credentials. 

### BuyPass Go
BuyPass are a Scandinavian certificate authority who also offer free certificates via their own ACME enabled service. https://www.buypass.com/ssl/products/acme 

- Trusted by all major operating systems and browsers
- Certificates expire after 180 days.
- Important rate limits apply: https://community.buypass.com/t/m2r5cj/rate-limits
- Certificates can contain up to 5 domains. Wildcard certificates are not supported.

### SSL .com
SSL .com are an established certificate Certificate Authority who now offer basic free certificates via their own ACME enabled service. https://www.ssl.com/how-to/order-free-90-day-ssl-tls-certificates-with-acme/

- Trusted by all major operating systems and browsers
- Certificates expire after 90 days.
- Certificates can contain 1 domain plus an optional www subdomain. Wildcard certificates are not supported.


## Managing CA accounts

Before you can use a different Certificate Authority in Certify you first need to create a new ACME account for that service under `Settings` > `Certicate Authorities`. If your provider requires External Account Binding (EAB) credentials you supply these in the Advanced tab.

In some situations it's useful to test the certificate request process against the *Staging* (test) version of a Certificate Authority. To use the staging version of your CA, add a new Certificate Authority account and select Staging from the Advanced tab. You can then request staging certificates for a particular managed certificate under `Certificate` > `Advanced` > `Certificate Authority`. Staging certificates are not publicly trusted, so can't be used for real websites. Some CAs do not provide a Staging API.

## Custom CAs (public or self-hosted)
You can add configuration for any certificate authority system which supports the ACME V2 (RFC8555) standard. There is a basic CA editor included in the app (enabled under `Settings` > `UI Settings` > `Certificate Authority Editor`) which can be accessed under `Settings` > `Certificate Authorities` > `Edit Certificate Authorities`. If you are confident editing JSON text files you can also manually edit `C:\ProgramData\Certify\ca.json` to add custom CAs.

