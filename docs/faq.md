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
Registered users can create a new support request for help. Email *support at certifytheweb.com*, including your license key, describing the problem in detail. Please including how to recreate the problem and any special configuration you may have.

## Getting Started

To get started using the Certify SSL Manager app for Windows, see the [Getting Started Guide](intro.md).

## FAQs
### How do I create a SAN certificate?

Certify SSL Manager reads domain/hostname information from IIS bindings or you can manually add them to the certificate. 

### I get an error when trying to make a new request

Read the error carefully and check the log for your managed site. Assuming your server has direct access to the internet without a proxy (required), you can use the 'Test' option to see if there are any problems the app can diagnose. Alternatively you can also try using the awesome [Let's Debug](https://letsdebug.net) service.

### I am completing the validation step correctly but I still get an error
Depending on the app version you may be encountering a bug with your account (for Let's Encrypt). Go to Settings and update the email address (it can be the same address), internally this will update your account id and account private key. Then try your request again.

### "Service Not Started" message
By default the background service runs on port localhost:9696 and various conditions can cause conflicts. Read more to find out how to [configure the background service](backgroundservice.md).

### I have one or more IP specific bindings on the same IIS server, how do I manage these?

**Do not use IP specific bindings unless you have a specific requirement for them.** 

If someone else configures existing IP specific bindings determine if they are really necessary for your requirements. 

On Windows, if you specify a certificate binding to an IP address then that IP is bound only to that certificate (per port, usually 443 for https) and this binding will take precedence over any other less specific bindings. 

The default setting for bindings created by the app is to use IP 'All Unassigned' and enable SNI (Server Name Indication), this is ideal for many sites.

If you require IP specific bindings (to support legacy non-SNI capable clients etc) the recommended approach is to run your first certificate request with Deployment set to 'Certificate Store'. You can then manually setup the https binding in IIS against the website, then set Deployment back to Auto and look at the Preview tab to ensure the next update will apply the binding update you expect. 

### My existing wildcard certificate is showing up instead of a Let's Encrypt certificate

Check the existing bindings you have on your sites. If you are binding to a specific (shared) IP address with a wildcard cert as your default fallback for https requests it will take precedence over other bindings on the same server on the same IP address (even if they are using SNI etc).

### The wrong SSL certificate is suddenly being served, making my site inaccessible

As above, one or more of your sites likely has an IP specific https binding.

### The certificate is renewing automatically but the browser is seeing an expired certificate

Check the 'Preview' tab in the app for your site to ensure the https binding of your site is targeted for updates. Ensure you only have one https binding in IIS which will respond to https requests. Also investigate if you have any IP specific bindings (as above).

### If you receive an error 'A specified login session does not exist'

Use the 'Re-apply Certificate to Bindings' button under *Managed Certificate> Show Advanced Options > Other Options*. This is usually a transient IIS issue and can be solved with a restart. If the problem persists you may have an issue with private key permissions. 

### I have 2 servers running the app.  Can the contact email can be the same on both?
*Yes, the contact email can be the same on all servers, or you can vary it as required.* There is only one contact per server. The contact email used at the time of requesting a certificate remains fixed until that certificate expires. The email address is generally used by Let's Encrypt to warn you of expiring certificates you have not yet renewed. 

### I have an email from Let's Encrypt Expiry Bot saying my certificate is about to expire
If Let's Encrypt think you haven't renewed a certificate they will let you know using the email address registered as a contact when you installed the app. If your receive an expiry warning, check your certificate is renewing OK. If it all looks good you probably changed the list of domains in your certificate at some point (perhaps adding www. or adding/removing domains) and LE is reminding you about the old version of your certificate, so you can ignore the notification.



