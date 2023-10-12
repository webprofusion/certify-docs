---
id: nginx
title: Deployment Task - Deploy to nginx
---

The *Deploy to Nginx* task will export your certificate and the components you choose as a set of PEM format files.

To use a certificate with your web server, the service you are targeting needs to know the certificate for your domain (**Leaf or End-Entity Certificate**), intermediate certificates from your CA (if any) and the **Private Key** that corresponds to the public key in the certificate. Certify The Web can produce the files you need but currently it does not automatically configure nginx to use them.

## Task Parameters
### Authentication
This option lets you specify credentials if you are deploying to a remote server. If you are just deploying to the local machine leave this option set to *Local*. 

To deploy to a remote server via SSH you can select the SSH option and provide/select the credentials to use.

### File Paths
You can decide which output files you want and where they should be written to. The file paths should be *full filenames*, not just directories. Typically the actual filename doesn't matter and you can name them according your own preferences, the file extension is also not important and conventions can vary. The most important thing is for your nginx config to point to the correct files:

#### Output filepath for key
This is the output file for the **Private Key**. This file should be kept secure and not shared with anyone.

Example: `C:\nginx\certs\mysite\privkey.pem`

#### Output filepath for full chain
The full path to the file where the certificate **Full Chain** (your leaf certificate and any intermediate certificates) will be exported to.

Example: `C:\nginx\certs\mysite\fullchain.pem`

## Nginx Config
In a typical nginx config you would only need to specify the **Full Chain** and the **Private Key** only. You then point to these files in your config:
- Point *ssl_certificate_key* at your **Private Key** file
- Point *ssl_certificate* at your **Full Chain** file

### Restarting nginx
For your changes to take effect you will need to restart Nginx. You can do this by adding a *Stop, Start or Restart a Service" task after your *Deploy to nginx* task.

### CA Preferred Chain
Some CAs offer alternative certificate chains for compatibility. Let's Encrypt offers both a *DST Root CA X3* chain (expired) and a newer *ISRG Root X1* chain. Certify The Web v6.x onwards defaults to the newer chain. If you need to use the older chain (e.g. for old Android compatibility) you can do so by setting the *Preferred Chain* option under *Certificate > Advanced > Certificate Authority - Preferred Chain* to *DST Root CA X3* and re-requesting your certificate.