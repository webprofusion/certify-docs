---
id: letsencrypt
title: What is Let's Encrypt?
---

Let's Encrypt is a free Certificate Authority (CA), and you can find out more details about them at https://letsencrypt.org

Using Certify to request a certificate also means you accept the current Let's Encrypt service privacy policy, and their terms and conditions.

Certificates issued by Let's Encrypt expire after 90 days, which means you need automated renewals to keep them active.

Every certificate renewal is a new certificate (not an extension of an existing one), with a new certificate thumbprint ('hash'). This means the certificate needs to be re-applied to whichever services were using the old certificate, which again requires automation.

The *Certify SSL Manager* app and related *Certify The Web* related services use the Let's Encrypt service to acquire free certificates and managed auto-renewal and (optionally) deployment. 

There are many other tools and scripts available on many operating systems. We focus on providing a UI for Windows (and IIS in particular), to make the process as easy and quick as possible.

