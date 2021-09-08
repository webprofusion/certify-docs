---
id: faq
title: Frequently Asked Questions
---

## Introduction

### What is Certify The Web?
> Certify The Web is a GUI to manage, request and renew certificates from Let's Encrypt and other popular (or custom) certificate authorities who support the ACME (Automated Certificate Management Environment) standard. Automatic certificate management means that you no longer have to worry about certificates because they are being automatically managed in a reliable way. Deployment of certificates to the services that require them can also be extensively automated.

Our aim is to ensure that the app is easy to use and that you get setup with your TLS/SSL certificates as quickly as possible. Unlike other more basic tools, if a problem develops that prevents your certificate renewing Certify The Web will let you know by sending you a notification via our API (with no additional configuration).

Web hosting configurations vary and sometimes securing your site can be harder than expected, but the good news is that thousands of other users have succeeded before you. There are a few things that are good to know should you run into any problems. If you encounter a problem you can't resolve, check out our [support options](support).


### Is this application commercially supported?
Yes, full time [email support](support) is available for registered users who have purchased a license key (or those who are evaluating the software) for the Professional or Enterprise editions https://certifytheweb.com/upgrade/. This makes the application ideal for organisations or professionals who need a dependable support option. Support operates weekdays (Australian Western Standard Time) with some coverage on weekends. Telephone support and general consultancy is not currently available but we will try to help where we can for all questions. Users of the free Community Edition are also supported via our community forum and other [support options](support). 

*You are encouraged to test out the software yourself as an evaluation before purchasing as not all usage scenarios will be supported.* 

**If you use this application within a business, you should purchase a license key once you have completed your evaluation of the software.**

### What do I need to know about the certificates this app provides?
We are not a Certificate Authority and this app makes managing certificates easier. The actual certificates are issued by the Certificate Authority of your choice (the default is Let's Encrypt) and various limitations apply including:
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

### "Service Not Started" message
By default the background service runs an internal API bound to localhost and various conditions can cause conflicts or failures. Read more to find out how to [configure or troubleshoot the background service](backgroundservice.md). The service will auto-negotiate an available port to listen on.

### I get an error when trying to request my certificate
Read the error carefully and check the log for your managed site. Assuming your server has direct access to the internet without a proxy (required), you can use the 'Test' option to see if there are any problems the app can diagnose. Alternatively you can also try using the awesome [Let's Debug](https://letsdebug.net) service.

### How do I know which bindings will be updated when my certificate next auto-renews?
Check the *Preview* tab of your managed certificate, scroll down to the bottom Deployment section and review the bindings which will be updated when the next renewal occurs.

### I have one or more IP specific bindings on the same IIS server, how do I manage these?

**Do not use IP specific bindings unless you have a specific requirement for them.** 

If someone else configured existing IP specific bindings *determine if they are absolutely necessary for your requirements*. 

On Windows, if you specify a certificate binding to an IP address then that IP is bound only to that certificate (per port, usually 443 for https) and this binding will take precedence over any other less specific bindings. 

The default setting for bindings created by the app is to use IP 'All Unassigned' and enable SNI (Server Name Indication), this is ideal for many sites.

If you require IP specific bindings (to support legacy non-SNI capable clients etc) the recommended approach is to run your first certificate request with Deployment set to 'Certificate Store'. You can then manually setup the https binding in IIS against the website, then set Deployment back to Auto and look at the Preview tab to ensure the next update will apply the binding update you expect. 

### My existing wildcard certificate is showing up instead of a Let's Encrypt certificate
Check the existing bindings you have on your sites. If you are binding to a specific (shared) IP address with a wildcard cert as your default fallback for https requests it will take precedence over other bindings on the same server on the same IP address (even if they are using SNI etc).

### The wrong SSL certificate is suddenly being served, making my site inaccessible
As above, one or more of your sites likely has an IP specific https binding.

### The browser says my certificate is OK but my site has some insecure content
Your site is still referencing some content as `http` instead of `https` - you can view these requests in the browser developer tools. You need to update your website or content management system to use https urls.

### The browser says `This site can’t provide a secure connection`
Your server is not configured to support current TLS Cipher suites by default. This requires registry changes on your server. A great tool to apply best practice configuration on Windows is IISCrypto by Nartac <a href="https://www.nartac.com/Products/IISCrypto">https://www.nartac.com/Products/IISCrypto</a>

## Maintenance

### Where are log files kept?
Each Managed Certificate has it's own log file which you can open using the View Log File option when viewing the details. By default, log files are kept at `%ProgramData%\Certify\logs`.

### Where does Certify The Web store certificates?
Certificate assets are stored under `%ProgramData%\Certify\assets`. You should normally permission this location so that only administrators and Local System can access it. Certificate files names are random after each renewal and to use a certificate file directly you should instead use a [Deployment Task](deployment/tasks_intro). For normal deployments the certificates are installed into the local machine certificate store under the My/Personal store.

### What is the PFX password?
The default PFX password is blank ("") but is configurable under Certificate > Advanced > Signing and Security. You can centrally manage this password so if many certs use the same password you don't have to edit each one individually.

### If I upgrade or re-install will I lose my settings and certificates?
Your settings are kept under `%ProgramData%\Certify` and you should consider backing up this location regularly. Settings are preserved and upgraded when new versions are installed. Settings are *not* removed if you Uninstall the app. **Do not store custom scripts under the %ProgramFiles%\CertifyTheWeb folder as these will deleted on upgrade.**

### Oops, I upgraded and lost my custom scripts
All content under the applications program files folder is removed on upgrade, *do not store scripts there*. Instead, store your scripts in a dedicated folder such as C:\Scripts or together with the other Certify The Web settings as C:\ProgramData\Certify\Scripts (for example).

### My certificate is renewing OK but the IIS site bindings are not updated
Check the *Preview* tab for your managed certificate and ensure that the *Deployment* section will specifically update the expected https bindings. If they are not shown here your https binding will *not* be updated. 

The most common reason for this is when the Deployment mode is set to *Single Site* and you have re-deployed your IIS Site resulting in it having a new internal SiteID within IIS. Change your Deployment mode to 'Auto' and review the *Preview* tab to ensure your bindings are being properly targeted.

### The certificate is renewing automatically but the browser is seeing an expired certificate
Check the 'Preview' tab in the app for your site to ensure the https binding of your site is targeted for updates. Ensure you only have one https binding in IIS which will respond to https requests. Also investigate if you have any IP specific bindings (as above).

### I have 2 servers running the app.  Can the contact email can be the same on both?
*Yes, the contact email can be the same on all servers, or you can vary it as required.* There is only one contact per server. The contact email used at the time of requesting a certificate remains fixed until that certificate expires. The email address is generally used by Let's Encrypt to warn you of expiring certificates you have not yet renewed. 

### I have an email from Let's Encrypt Expiry Bot saying my certificate is about to expire
If Let's Encrypt think you haven't renewed a certificate they will let you know using the email address registered as a contact when you installed the app. If your receive an expiry warning, check your certificate is renewing OK. If it all looks good you probably changed the list of domains in your certificate at some point (perhaps adding www. or adding/removing domains) and LE is reminding you about the old version of your certificate, so you can ignore the notification.

### When trying to use BuyPass Go I get the error "Can not find issuer 'C=NO,O=Buypass..."
Normally Certificate Authority root certificates are installed into Windows as part of windows updates but in some cases you may need to import the root certificate for a CA yourself. You should ensure that your servers are all receiving updates normally. See general instructions here:  http://woshub.com/updating-trusted-root-certificates-in-windows-10/

You can manually import the BuyPass root certificate by downloading it (Buypass Class 2 Root CA) from  https://www.buypass.com/security/buypass-root-certificates then importing it using the windows certificate UI (import it into the Trusted Root Certification Authorities store).

### I need to use an alternate chain (preferred chain) for my Certificate
From May 2021 Let's Encrypt are introducing a new default certificate 'chain' designed to support older Android devices. This chain has the root issuer *DST Root CA X3* (which expires 30th Sept 2021), for most users this will be compatible but in some cases you will require a chain with an unexpired root. To specify a preference for an alternate chain, edit your managed certificate Certificate > Advanced > Certificate Authority > Preferred Chain. 

To use Let's Encrypt's alternate unexpired chain you would set this to *ISRG Root X1*  then re-request your certificate. See also https://community.letsencrypt.org/t/production-chain-changes/150739

### My Let's Encrypt certificate chain is invalid after the "DST Root CA X3" expiry.
When Let's Encrypts `DST Root CA X3` expires on the 30th Sept 2021, so will one version of it's `R3` intermediate. If you experience problems with Windows changing over to the correct newer version of R3 (chained `R3 > ISRG Root X1 > DST Root CA X3`) first try rebooting your Windows server. 

You may also need to disable or delete the old R3 (after expiry) in the windows certificate manager: `Manage Computer Certificates > Intermediate Certification Authorities`. To disable the certificate right-click > properties, Disable all purposes for this certificate. To just delete the certificate, choose Delete. A reboot may be required for the change to take effect.

## License Registration

Certify The Web has a free Community Edition which is limited to 5 managed certificates and intended for evaluation only. This limit may vary across updates and is designed to provide a free way for individuals and hobbyists to use the app and for commercial evaluation and testing. You can upgrade to licensed version (which includes access to the support helpdesk email) at https://certifytheweb.com/register - you will then receive a license key. To activate your license key open the app and navigate to the About tab, then click Enter Key to apply your license. You can also deactivate the usage of a key within the app or from the https://certifytheweb.com License Keys tab.

**If you are using this application within a business or funded organisation (beyond a temporary evaluation) you are required to purchase a license key.**