---
id: certificate-process
title: Requesting a Certificate
---

When you install Certify you will be prompted to register with the the Certificate Authority who will validate and issue your certificates (e.g. Let's Encrypt). You should provide a real email address, otherwise they can't contact you if there is a problem with your certificate. 

## Requesting a Certificate
The basic process of requesting a certificate for your domain involves either proving you control the server for that domain or proving you control DNS for that domain, then the Certificate Authority can issue you a certificate once it's satisfied that you have met the requirements. 

This process can be handled automatically by Certify The Web, either by running the app on the web server for your domain, or by talking to your DNS service provider's API. Once a certificate has been issued it can be deployed automatically in a number of ways, the most common being to apply it to your web server *https bindings*

### 1. Choose the domains to include
The first step of requesting a certificate is to decide which domain (and subdomains) need to be included in your certificate. You can manually specify these or you can load the configured hostname bindings from an existing IIS site on your server. If you choose an existing IIS site this will also be your default target for the final https bindings to be created/updated.

![Choosing Domains](/assets/screens/ChooseDomains.png)

### 2. Decide how to validate domains
You will need to prove you control the domains you have added to your certificate. Only public domains can be validated automatically so intranet sites (hostname only with no domain etc e.g. SRVDEVAPP01) are not supported, however public domain names (like srvdevapp01.dev.domain.com) are fine.

You can validate using [HTTP validation (http-01)](http-validation) or [DNS Validation (dns-01)](dns-validation). 

**HTTP validation** requires that your domain be a publicly accessible website with an http service on port 80 (even if that's only for http validation purposes). 
![HTTP Validation](/assets/screens/Auth_http.png)

**DNS validation** requires that you can automatically create a TXT record in your domain's DNS zone (usually using a DNS API from a cloud DNS provider). If neither of these options are viable for you, you may not be able to use an automated certificate service.
![DNS Validation](/assets/screens/Auth_DNS.png)

### 3. Decide how to deploy
By default Certify will auto update/add https bindings on all sites with hostnames which match the certificate. You can also choose to customise how deployment occurs. The *Preview* feature (below) is especially important as this will show you which bindings will be created and updated.

You can customise this behaviour or even opt to have no deployment at all, however if you do customise binding behaviour (in Windows Server) you should have a clear understanding of the limitations of [SSL binding on Windows](ssl-windows)

![Deployment](/assets/screens/Deployment_Auto.png)

#### Advanced Options
There are a number of options available to customise the request/renewal process. See the full guide to the user interface [options](ui-options) available.

### 4. Preview
Using the *Preview* tab you can see a detailed summary of how your Managed Certificate is configured and what actions the app will plan to take next, including how the new certificate will be deployed.


### 5. Request Certificate
Finally, you can request your certificate which will automatically:
- Order the certificate you need (new or renewed)
- Perform the required validation
- Fetch the new certificate 
- Deploy it for you.