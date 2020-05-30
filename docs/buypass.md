---
id: buypass
title: BuyPass Go SSL
---


```Failed to build certificate as PFX. Check system date/time is correct and that the issuing CA is a trusted root CA on this machine. :Can not find issuer 'C=NO,O=Buypass AS-983163327,CN=Buypass Class 2 Root CA' for certificate 'C=NO,O=Buypass AS-983163327,CN=Buypass Class 2 CA 5'.```

Install the root certificate for buypass from: 

https://www.buypass.com/security/buypass-root-certificates

CA's generally have a root certificate (trusted by your operating system Root Certificate Authorities certificate store) and an Intermediate 'issuing' certificate which in turn is used to issue your domain's certificate.
Install Issuing (Buypass Class 2 CA 5) .cer to Local Machine> Intermediate Certification Authorities