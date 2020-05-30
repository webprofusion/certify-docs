---
id: letsencrypt
title: What is Let's Encrypt?
---

Let's Encrypt are a free Certificate Authority (CA), and you can find out more details about them at https://letsencrypt.org 

They offer a free, automated, and open certificate authority brought to you by the nonprofit Internet Security Research Group (ISRG) https://www.abetterinternet.org/

The *Certify SSL Manager* app and related *Certify The Web* related services use the Let's Encrypt service to acquire free certificates and managed auto-renewal and (optionally) deployment. The Let's Encrypt service remains the responsibility of the Certificate Authority and we (Certify The Web operated by Webprofusion Pty Ltd) have no affiliation to their organisation or any control over their service. **Our software makes the process easier and automates how you acquire and use the certificates. We are not a Certificate Authority.**

The API Let's Encrypt offers for certificate requests is known as **ACME** (Automatic Certificate Management Environment). *Certify The Web* is an **ACME V2 client**, which means it can talk to ACME Certificate Authority services which support the ACME V2 API.

Using Certify to request a certificate also means you accept the current Let's Encrypt service privacy policy, and their terms and conditions.

Certificates issued by Let's Encrypt expire after 90 days, which means you need automated renewals to keep them active.

Every certificate renewal is a new certificate (not an extension of an existing one), with a new certificate thumbprint ('hash'). This means the certificate needs to be re-applied to whichever services were using the old certificate, which again requires automation.


There are many other tools and scripts available on many operating systems. We focus on providing a UI for Windows (and IIS in particular), to make the process as easy and quick as possible.

