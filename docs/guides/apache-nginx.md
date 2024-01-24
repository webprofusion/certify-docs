---
id: apache-nginx
title: Using with Apache, nginx or Other Web Servers
---


The app is primarily designed for use with the IIS web server on Windows but it can also be used to acquire and automatically renew certificate for Apache and nginx etc, with a "standalone" mode, or alternatively using the "webroot" method.

Our standard IIS integration can automatically configure IIS sites, but for Apache or nginx etc. you will need to edit your web server configuration manually to use the certificate files the app produces.

# Getting a Certificate for your Web Server (Apache/nginx etc)

- If using the standalone http validation, make sure nothing is currently using port 80 (e.g. Apache, nginx)

- Use *New Certificate* to setup a new managed certificate, add your domains, click *Request Certificate* to try getting a cert. See [Requesting a Certificate](../certificate-process.md) for more information - If that all works proceed to deployment.

To alternatively use a "webroot" method (serving the http challenge via apache/nginx instead of using the http challenge server built into the client):
- set an output path for the challenge response files pointing to the root structure of your site, under *Authorization > Http > Site Root Directory*. Ensure that extensionless text files written into `/.well-known/acme-challenge/` can be browsed to over http. 
- You can use "Test' to check if challenges are being served ok.

If you cannot use HTTP validation (or you require a wildcard certificate) the nuse can use teh DNS validation method instead.

# Deployment to your Web Server (Apache/nginx etc)
Once you have your cert you can use a deployment task to place the cert files where you want them (e.g. `C:\certs\<yourwebsite>\`) and restart your web server service.

For Apache, use the [Deploy to Apache](../deployment/tasks/apache.md) task to export your certificate and the components you choose as a set of PEM format files.

For nginx, use the [Deploy to nginx](../deployment/tasks/nginx.md) task to export your certificate and the components you choose as a set of PEM format files.

For other similar web server types that require PEM output certificate files, use the *Deploy to Generic Server* task to export your certificate and the components you choose as a set of PEM format files.

The above tasks also support deployment over SSH if your service is remote to the machine being used to acquire the certificates.

You normally would set the fullchain.pem path and privkey.pem path *under Task Parameters), then save and select▶️Play next to the task to try it out. This should give you the output file you need in the location you want. You then just need to point your apache config at the right files. You can refine this task configuration and test the task without re-requesting a whole new certificate.

You would normally also need a *Stop/Start/Restart* service task (for the service running your web server).

Once you have these setup your subsequent renewals will be automatic.