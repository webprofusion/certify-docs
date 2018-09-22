---
id: faq
title: Frequently Asked Questions
---

# Support & FAQs

> Certify SSL Manager aims to be easy to use and to get you setup with your TLS/SSL certificates as quickly as possible. Web hosting configurations vary and sometimes securing your site can be harder than expected, but the good news is that thousands of other users have succeeded before you. There are a few things that are good to know should you run into any problems.


## Getting Help
### Community Discussion Forum
If you'd just like to ask general questions or help others get started, check out our community forum: <a href="https://community.certifytheweb.com" target="_blank">community.certifytheweb.com</a>

### GitHub Issues
If there is a general bug or feature request you'd like to discuss in public, you can create a new issue against our <a href="https://github.com/webprofusion/certify/issues" target="_blank">GitHub project</a>

### Email Support
Registered users can create a new support request for help. Email *apps at webprofusion.com*, including your license key, describing the problem in detail. Please including how to recreate the problem and any special configuration you may have.

## Getting Started

To get started using the Certify SSL Manager app for Windows, see the [Getting Started Guide](gettingstarted.md).

## FAQs
> How do I create a SAN certificate? I can't add my domains?

Certify SSL Manager reads domain/hostname information from IIS bindings. You need to add your IIS host name bindings (such as www.test.com and test.com) as http bindings, otherwise the app doesn't know what hostnames to include in your certificate.

> I get an unusal error when trying to make a new request

Assuming your server has direct access to the internet without a proxy (required), you can also Check the status of the Let's Encrypt service in case it is currently down.

> I get the error "Automated checks for extensionless content failed.." error

This means your web server configuration is not allowing files with no extension to be served to site visitors. Unfortunately this is a requirement of the Lets Encrypt service in order for it to fetch the verification file which is automatically created within your site when you request a certificate (more info).

To help with this requirement we try to automatically configure this for you. If you look in {your site}\.well-known\acme-challenge you will see we have created a web.config and a file called configcheck. If you can't browse to this configcheck file in your web browser (http://{your site}/.well-known/acme-challenge/configcheck then the Lets Encrypt service can't access the files it needs either. You can edit the web.config file in this folder to get extensionless files working, then you can re-request your certificate. A mimeMap entry for either "." or ".*" usually works depending on your operating system version.

> I have multiple different IP bindings on the same IIS server, how do I manage these?

The default setting for bindings is use 'All Unassigned' and enable SNI (Server Name Indication), this is ideal for many sites but if you have websites bound to multiple different IPs on your server you must specify which IP to create bindings against when you add each Managed Site. Each Managed Site can only be mapped to one IP but multiple domains on one site can be managed as several individual Managed Sites. Yes, this is where it starts to get complicated.

> My existing wildcard certificate is showing up instead of a Let's Encrypt certificate

Check the existing bindings you have on your sites. If you are binding to a specific (shared) IP address with a wildcard cert as your default fallback for https requests it will take precedence over other bindings on the same server on the same IP address (even if they are using SNI etc).

> The wrong SSL certificate is suddenly being served, making my site inaccessible

If you are using a specific IP address in your SNI binding settings:
This will currently create at least 2 bindings against the certificate which you can only see using 'netsh http show sslcert', one will be bound ip:port (e.g. 172.31.10.142:443) and the other will be hostname:port (e.g. example.certifytheweb.com:443).

The IP:Port binding should be removed as IP specific bindings take precedence over SNI (hostname) bindings. The solution is to delete the IP specific binding (replace the IP address with the correct one for your website):
netsh http delete sslcert ipport=172.31.10.142:443

Then change the settings for the Managed Site in Certify SSL Manager, under 'Advanced', set IP address to All Unassigned. This is to avoid the same issue repeating.

> If you receive an error 'A specified login session does not exist'

Use the 'Reapply Certificate to Bindings' button under Managed Site> Info. This is usually a problem with private key permissions. You may also find that sometimes a server restart is required to resolve this type of problem.

## I have 2 servers running the app.  Can the contact email can be the same on both?
*Yes, the contact email can be the same on all servers, or you can vary it as required.* There is only one contact per server. The contact email used at the time of requesting a certificate remains fixed until that certificate expires. The email address is generally used by Let's Encrypt to warn you of expiring certificates you have not yet renewed. If you get emails for a certificate you no longer need you can just ignore them and they will stop when the certificate has expired.


## "Service Not Started" message
By default the background service runs on port localhost:9696 and various conditions can cause conflicts. Read more to find out how to [configure the background service](backgroundservice.md).

