---
id: load-balancing
title: Load Balanced Hosting
---

# Load Balanced Hosting

 If you are load balancing across a set of web servers (e.g. a Web Farm) your certificate options include:

- have each server manage it's own certificates
- centrally renewing certificates, then copying the certificates to each server
- terminating TLS on a web application firewall or reverse proxy.

Additionally you need to decide:
- how to perform domain validation (via http or dns).
- whether to centrally manage certificate renewals or perform renewals on each individual server. 

## Domain Validation
Http validation requires correctly answering an http challenge from the certificate authority which can be more difficult in load balanced scenarios because the wrong server is likely to respond. DNS validation instead updates a TXT record value in your domains DNS (this requires automated access to your DNS provider or CNAME delegation to a zone/service which allows automation).

If you can only use http validation you will require a web application firewall or reverse proxy server in order to ensure all `http://<your domain>/.well-known/acme-challenge/` requests go to the correct server (the one requesting the renewal). DNS validation is generally easier in this scenario.

## Testing

You should try out your intended deployment strategy on a set of test machines to you can learn how each of part is configured and practice sharing a certificate between multiple machines/sites.

## Windows (IIS) Deployment Strategies
### Centralized Certificate Store (CCS)

Centralized Certificate Store (CCS) is a feature you can enable in Windows to allow certificates to be dynamically loaded from a shared path.

- CCS allows you to store certificates on a network shared location and for IIS to automatically pick these up and use the latest file on any machine with access to the file.

- use the "Deploy to CCS" task to write out your certificate PFX file to a UNC share which all the machines have access to (or have multiple tasks and write to a share on each machine). 

This requires that you manage your own https bindings in IIS (configured for CCS) as the standard built-in https deployment in Certify The Web does not configure CCS enabled https bindings for you (and you should use a deployment mode of "Certificate Store Only" or "No Deployment" as "Auto" would instead try to setup the https bindings for you).


These recommendations assume you are simply load balancing your DNS name across multiple web servers (virtual machines etc). 

##  Azure 
If you are using any specific Azure functionality (azure web apps, web application gateway etc) the app has a Task which enables you to Deploy to Azure Key Vault (if you do use this you need to set a password on the PFX) - from there you can reference this certificate from multiple azure services.

## Apache (Windows or Linux)
You can use the Deploy To Apache task to copy your certificate files to a remote machine using SSH/FTP.