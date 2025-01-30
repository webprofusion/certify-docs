---
id: faq
title: Frequently Asked Questions
---

## Introduction

### What is Certify The Web - *Certify Certificate Manager*?
> *Certify Certificate Manager* is a GUI to manage, request and renew certificates from Let's Encrypt and other popular (or custom) certificate authorities who support the ACME (Automated Certificate Management Environment) standard. Automatic certificate management means that you no longer have to worry about certificates because they are being automatically managed in a reliable way. Deployment of certificates to the services that require them can also be extensively automated.

Our aim is to ensure that the app is easy to use and that you get setup with your TLS/SSL certificates as quickly as possible. Unlike other more basic tools, if a problem develops that prevents your certificate renewing the app will let you know by sending you a notification via our API (with no additional configuration).

Web hosting configurations vary and sometimes securing your site can be harder than expected, but the good news is that thousands of other users have succeeded before you. There are a few things that are good to know should you run into any problems. If you encounter a problem you can't resolve, check out our [support options](support.md).

### Is this application commercially supported?
Yes, full time [email support](support.md) is available for registered users who have purchased a license key (or those who are evaluating the software) via  https://certifytheweb.com/upgrade/. This makes the application ideal for organisations or professionals who need a dependable support option. Support operates office-hours, weekdays (Australian Western Standard Time) with some coverage on weekends. Telephone support and general consultancy is not currently available but we will try to help where we can for all questions. Users of the free Community Edition are also supported via our community forum and other [support options](support.md). 

*You are encouraged to test out the software yourself as an evaluation before purchasing, as not all usage scenarios will be supported.* 

## License Registration

*Certify Certificate Manager* has a free Community Edition which is limited to 5 different managed certificates (with unlimited renewals) and is intended for evaluation only. This limit may vary across updates and is designed to provide a free way for individuals and hobbyists to use the app and for commercial evaluation and testing. You can upgrade to licensed version (which includes access to the support helpdesk email) at https://certifytheweb.com/register - you will then receive a license key. 

To activate your license key open the app and navigate to the *About* tab, then click *Enter Key* to apply your license. To transfer to a new license key use *About > Deactivate Install*, then *About > Enter Key* to apply the new key. You can also deactivate the usage of a key within the app or from the https://certifytheweb.com License Keys tab. 

**If you are using this application within a business or funded organisation (beyond a temporary evaluation) you are required to purchase a license key.**

For more information about licensing see our [licensing guide](./guides/licensing.md).

### What do I need to know about the certificates this app provides?
We are not a Certificate Authority. This app primarily makes managing certificates easier. The actual certificates are issued by the Certificate Authority of your choice (the default is Let's Encrypt) and various limitations apply including:
- Let's Encrypt certificates are limited to a 90 day expiry (which is why auto-renewal is very important). 
- Let's Encrypt support up to 100 domains per certificate.
- Rate Limits apply when talking to the ACME/Let's Encrypt ACME API (number of certificates issued per week etc) https://letsencrypt.org/docs/rate-limits/
- Usage of the app to acquire certificates from Let's Encrypt requires agreement to the current Let's Encrypt service terms and conditions
- Certificates must be for public domains. Local intranet hostnames are not supported.

## Help Getting Started

### I can't register my email with Let's Encrypt
Check your server allows outgoing https requests. This is essential for talking to the API of the Certificate Authority being used (e.g. Let's Encrypt).

### Which outgoing https connections/IPs does the app connect to?
If you block outgoing https connections from the machine running the app you will block access to the APIs it requires. These include Let's Encrypt (the Certificate Authority) and may include api.certifytheweb.com if auto config diagnostics or status reporting is enabled.

Blocking outgoing https connections is not compatible with this application, or with Let's Encrypts API - they do not publish a list of IPs.

The app does not officially support proxied internet connections. Users have managed to use proxies successfully but it's the responsibility of the user to diagnose issues with outgoing https API calls when a proxy or firewall is in use.

### Do I Need to Keep the App Running?
No, you can close then app UI when you don't need it. *Certify Certificate Manager* installs a background *Certify Certificate Manager* service which will run in the background and manage your certificates. **You can close the app and the service will continue to run.** The app is just used to manage and request new certificates.

### "Service Not Started" message
By default the background service runs an internal API bound to localhost and various conditions can cause conflicts or failures. Read more to find out how to [configure or troubleshoot the background service](backgroundservice.md). 

### I get an error when trying to request my certificate
Read the error carefully and check the log for your managed site. Assuming your server has direct access to the internet without a proxy (required), you can use the 'Test' option to see if there are any problems the app can diagnose. Alternatively you can also try using the awesome [Let's Debug](https://letsdebug.net) service.

The most common problem people encounter is they are using the default HTTP domain validation method, which checks your domain using a specific HTTP (TCP port 80) request to /.well-known/acme-challenge. If you block incoming http or block geographically (or by IP range) you may be blocking the CA when they try to check your domain.

### How do I know which bindings will be updated when my certificate next auto-renews?
Check the *Preview* tab of your managed certificate, scroll down to the bottom Deployment section and review the bindings which will be updated when the next renewal occurs.

### IIS is serving the wrong certificate from another site

**Do not use IP specific bindings unless you have a specific requirement for them. They take priority over all other bindings using the same IP:port** 

IP specific bindings (one IP per cert, assigned to port 443) were historically required before SNI (Server Name Indication) was available. SNI has been present in Windows since Windows Server 2012. If someone else configured existing IP specific bindings *determine if they are absolutely necessary for your requirements*. 

If you are using IP specific bindings because that's how you've always done it, it's time to stop. On Windows, if you specify a certificate binding to an IP address then that IP is bound only to that certificate (per port, usually 443 for https) and this binding will take precedence over any other less specific bindings. 

The default setting for bindings created by the app is to set IP to 'All Unassigned', set the hostname and enable SNI (Server Name Indication), this is ideal for many sites. See [Using Certificates in Windows](guides/ssl-windows.md).

### The browser says my certificate is OK but my site has some insecure content
Your site is still referencing some content as `http` instead of `https` - you can view these requests in the browser developer tools. You need to update your website or content management system to use https urls.

### The browser says `This site can’t provide a secure connection`
Your server is not configured to support current TLS Cipher suites by default. This requires registry changes on your server. A great tool to apply best practice configuration on Windows is IISCrypto by Nartac https://www.nartac.com/Products/IISCrypto

## Maintenance

### Where are log files kept?
Each Managed Certificate has it's own log file which you can open using the View Log File option when viewing the details. By default, log files are kept at `%ProgramData%\Certify\logs`.

### Where does *Certify Certificate Manager* store certificates?
Certificate assets are stored under `%ProgramData%\Certify\assets`. You should normally permission this location so that only administrators and Local System can access it. Certificate files names are random after each renewal and to use a certificate file directly you should instead use a [Deployment Task](deployment/tasks_intro.md). For normal deployments the certificates are installed into the local machine certificate store under the My/Personal store.

### What is the PFX password?
The default PFX password is blank ("") but is configurable under *Certificate > Advanced > Signing and Security*. You can centrally manage this password so if many certs use the same password you don't have to edit each one individually.

### If I upgrade or re-install will I lose my settings and certificates?
Your settings are kept under `%ProgramData%\Certify` and you should consider backing up this location regularly. Settings are preserved and upgraded when new versions are installed. Settings are *not* removed if you Uninstall the app. **Do not store custom scripts under the %ProgramFiles%\CertifyTheWeb folder as these will deleted on upgrade.**

### Is it ok to ignore File In Use warnings when updating?
No, you should close the app before updating and if the installer cannot stop the service for you then you should manually stop the service before updating. If you ignore the warning and continue the update you may end up with a broken installation. You can however fix a broken installation by installing the app again (settings will be preserved).

### Oops, I upgraded and lost my custom scripts
All content under the applications program files folder is removed on upgrade, *do not store scripts there*. Instead, store your scripts in a dedicated folder such as C:\Scripts or together with the other *Certify Certificate Manager* settings as C:\ProgramData\Certify\Scripts (for example).

### My certificate is renewing OK but the IIS site bindings are not updated
Check the *Preview* tab for your managed certificate and ensure that the *Deployment* section will specifically update the expected https bindings. If they are not shown here your https binding will *not* be updated. 

The most common reason for this is when the Deployment mode is set to *Single Site* and you have re-deployed your IIS Site resulting in it having a new internal SiteID within IIS. Change your Deployment mode to 'Auto' and review the *Preview* tab to ensure your bindings are being properly targeted.

### The certificate is renewing automatically but the browser is seeing an expired certificate
Check the 'Preview' tab in the app for your site to ensure the https binding of your site is targeted for updates. Ensure you only have one https binding in IIS which will respond to https requests. Also investigate if you have any IP specific bindings (as above).

### I have 2 servers running the app. Can the contact email can be the same on both?
*Yes, the contact email can be the same on all servers, or you can vary it as required.* The contact email used at the time of requesting a certificate remains fixed until that certificate expires. The email address may also be used by your choice of CA to warn you of service changes or expiring certificates you have not yet renewed. 

### I have an email from the CA saying my certificate is about to expire
If your CA thinks you haven't renewed a certificate they will let you know using the email address registered as a contact when you installed the app. If you receive an expiry warning, check your certificate is renewing OK. If it all looks good you probably changed the list of domains in your certificate at some point (perhaps adding www. or adding/removing domains) and the CA is reminding you about the old version of your certificate, so you can ignore the notification.

### When trying to use BuyPass Go (or other CA) I get the error "Failed to build certificate as PFX."
Normally Certificate Authority root certificates are installed into Windows as part of windows updates but in some cases you may need to import the root certificate for a CA yourself. You should ensure that your servers are all receiving updates normally. See general instructions here:  http://woshub.com/updating-trusted-root-certificates-in-windows-10/

In general you should not see this issue with a current version of the app as known roots are no longer required for the PFX build process.