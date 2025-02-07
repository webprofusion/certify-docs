---
id: http-validation
title: HTTP Domain Validation (http-01)
---
## Why use HTTP Validation?
To request a certificate from Let's Encrypt (or any Certificate Authority), you need to provide some kind of proof that you are entitled to receive the certificate for given domain(s). Let's Encrypt support two methods of validation to prove control of your domain, `http-01` (validation over HTTP) and `dns-01` ([validation via DNS](dns/validation.md)). Wildcard domain certificates (those covering `*.yourdomain.com`) can only be requested using DNS validation.

## How to use HTTP Validation (on Windows)
When Let's Encrypt performs domain validation over http (known as an `http-01` challenge) they ask for a randomly named text file to be presented in the `/.well-known/acme-challenge` path of your website. So they should be able to retrieve it at `http://<yourdomain>/.well-known/acme-challenge/<filename>`

**Your server must be able to respond on tcp port 80 in order to perform any HTTP validation. If your firewall blocks port 80, unblock it to proceed. You don't need IIS http bindings as by default the app will use it's own http challenge response server.**

If this step succeeds, you're all set to automatically complete HTTP validation of your domain. Once completed, Let's Encrypt marks your domain (associated with your account) as 'valid' and we can then proceed with requesting the final certificate.

### How Http Validation works

With *Certify Certificate Manager*, we attempt to answer the http challenge using the built-in [Http Challenge Server](http-challenge-server.md) and as a fallback we use IIS (or whichever webserver is configured for port 80 http traffic, if any) by automatically detecting the website folder to write the challenge response file to, or by writing to the website path you provide in your configuration (for Apache etc).

On *IIS* this process presents a few challenges, which we attempt to fix automatically:

* The file does not have an extension (like .txt etc), so a static file handler usually needs to be configured to handle extension-less files
* Existing handlers for extension-less content may intercept the request and prevent access to the file
* If authentication (basic, forms etc) is enabled the access to the file will be restricted so this needs to be disabled
* Due to the above, `Asp.Net` (and an app-pool) is generally required so that web.config can be supplied to override the configuration.
* Other customizations or app requirements for the parent website may affect configuration

So in the event that we cannot automatically provide the challenge response and fallback to IIS, we attempt to auto-configure the required configuration without modifying the configuration of the parent web application, 
this avoids app restarts for the parent application. 

We create a file called **configcheck** in the `/.well-known/acme-challenge` folder and
we cycle through a number of alternative web.config options and test each one. The testing process then makes a local http request to your website at `http://<yourdomain>/.well-known/acme-challenge/configcheck`

If the local request fails (perhaps because the local server can't resolve itself via DNS etc) and if proxy API support is enabled, the app asks
the https://api.certifytheweb.com server if it can access the resource instead (which also has the benefit of being external, just like the Let's Encrypt server is).

## Common Issues

### Timeout during http validation
Your firewall is blocking port 80. Open port TCP 80 in Windows Firewall and on any cloud hosting firewall rules you have.

### HTTP domain validations suddenly failing
If you find you are unexpectedly getting HTTP domain validation failures (particularly "Secondary validation") the most common cause is a Firewall blocking TCP port 80 (http) or you are blocking a range of IP or Geographic locations. To allow only your CAs HTTP validation requests through we recommend using a Web Application Firewall set to allow all http requests to any path starting with `/.well-known/acme-challenge/`. Alternatively block specific countries instead of blocking all countries, as your CA (the default being Let's Encrypt) may choose to validate from any geographic region.

### Error 500, 404 or 403 (or other http error code)
The most common problem is that auto configuration has failed to determine the best config for your system. Different editions/distributions of windows have different defaults.

1 - Check the challenge folder exists

Check that configcheck file has been created at: `wwwwroot\inetpub\*yourwebsite*\.well-known\acme-challenge`

If not, check your folder permissions allow this folder/files to be created. If necessary, check the website root path is correctly mapped.

2 - Check you can access 

`http://*yourdomain*/.well-known/acme-challenge/configcheck`

If the file exists on disk but you get an error **404** (not found) accessing the file then you have a problem with mapping extensionless files to static content.

If you get an error **500** (server error), the web.config  probably has a directive your server can't support. If the web.config has a ```<clear/>``` directive, try removing it.

If you get an error **403** (access denied), your web application is denying access to the challenge response file, probably because the parent web application requires authentication. Your web.config in the `/acme-challenge/` folder should include the following directive:

```xml 
    <system.web>
        <authorization>
        <allow users="*" />
        </authorization>
    </system.web>
  ```
  In addition you may need to modify the web.config of the parent web application to allow access to the `/.well-known/acme-challenge` folder:

  ```xml
  <configuration>
  ...
  ...
    <location path=".well-known/acme-challenge">
      <system.web>
         <authorization>
            <allow users="*"/>
         </authorization>
      </system.web>
    </location>
   ...
   ...
</configuration>
```
The use of a web.config file to control web application configuration requires `Asp.Net` to be installed alongside IIS.
