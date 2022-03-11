---
id: best-practices
title: Best Practices
---

# Best Practices
Once you have setup your certificate and your website is accessible over https you could stop there and users will be able to access your website using a secure TLS (Transport Layer Security) connection (also known as it's old name, SSL). 

However, if you scan your website with a tool such as https://www.ssllabs.com/ssltest/ it will likely point out a number of areas you could improve upon, many of which are quite cryptic. These include areas such as *HTTP Strict Transport Security* (HSTS), *Protocols* and *Cipher Suites*.

Even if you have a great automated score for security, your choice of operating system can be a security or operational risk and the way you manage your application lifecycle could be a risk to your organisation.

## Redirecting all visitors to HTTPS
A user could try to access your site by just typing the domain or perhaps they will even type the full domain with `https://` - whether the site loads as `http://` or `https://` will depend on the web browser or the link the user followed, so in some cases users will see a site as "insecure". To avoid this, you can automatically direct the users browser to the HTTPS version of your site.

### Redirect to HTTP using IIS
If you are using IIS on Windows, there are a few way to redirect users from http to https. The most common method uses the *URL Rewrite* module https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module which is an extension to IIS which uses a web.config directive to rewrite http requests.

#### Example rewrite rule to redirect http:// to https:// :
```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>

            <!-- redirect to https rule -->
            <rules>
                <rule name="Redirect HTTP to HTTPS" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions>
                        <add input="{HTTPS}" pattern="off" />
                    </conditions>
                    <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
                </rule>
            </rules>

        </rewrite>
    </system.webServer>
</configuration>

```

## HTTP Strict Transport Security (HSTS)
One technique to encourage users to only use the `https` version of your site is to add a special http header to your webserver responses, this tells their browser to remember that your site prefers to use https.

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
           
           <!-- add HTTP Strict Transport Security (HSTS) rule to outgoing headers -->

            <outboundRules>
                <rule name="Add the STS header in HTTPS responses">
                    <match serverVariable="RESPONSE_Strict_Transport_Security" pattern=".*" />
                    <conditions>
                        <add input="{HTTPS}" pattern="on" />
                    </conditions>
                    <action type="Rewrite" value="max-age=31536000" />
                </rule>
            </outboundRules>

        </rewrite>
    </system.webServer>
</configuration>
```

For other related techniques for IIS, see https://docs.microsoft.com/en-us/iis/get-started/whats-new-in-iis-10-version-1709/iis-10-version-1709-hsts

## Is port 80 really a security risk?
One common opinion amongst network administrators is that TCP port 80 (used for http) represents a security risk, therefore it is common to block this port, which in turns means you can't use HTTP validation for your certificate renewal process etc. 

However, an open port does not directly affect your system security, it's the *process listening to that port* which is the potential security risk. So when evaluating security best practice keep in mind the justification for each recommendation. 

## Mixed Content Warnings

Whether you are using a custom built website or a content management system (wordpress etc) you may find that the browser still considers your website insecure, even though it's loading the main page over `https` with a valid certificate. This is often caused by "mixed content" e.g. some resources such as images, stylesheets or script being loaded using `http`. To resolve this, change any referenced content in your site to only use `https://` for content URLs.

## Protocols and Cipher Suites

### TLS Protocols 
A *protocol* (such as TLS 1.1 or TLS 1.2) is a standard for the secured communication used during https requests to your server. Your server supports various protocols which may or may not be enabled and these will vary depending on your version of Windows, they will also vary depending on whether a request is being made to your server, or whether you server is making an outgoing request to something else. 

Older protocols such as TLS 1.0 and TLS 1.1 are commonly disabled in modern configurations due to various security issues found in older versions, you may however still need to support them for old software accessing your site (this is up to you). 

### Cipher Suites
A *cipher suite* is a set of agreed algorithms your system is willing to use to negotiate the secure TLS connection (see https://en.wikipedia.org/wiki/Cipher_suite). Many older algorithms are now considered too weak or they are vulnerable to exploits and for these reasons may need to be disabled for your system to be considered "secure".

### Protocol and Cipher Suite Configuration
TLS protocol and Cipher Suite support can be modified by changing values in the windows registry, but one commonly used free tool to make this simpler is *IIS Crypto* by Nartac Software: https://www.nartac.com/Products/IISCrypto

On *Windows Server 2016* onwards you will likely find that applying the "Best Practices" mode of this tool is enough to improve your default TLS security. For *Windows Server 2012 R2* and older your list of supported Cipher suites is more limited and you may need to enable a few additional cipher suites in order to ensure your server can still communicate properly with other services. 

## Upgrade your operating system

An unpatched operating system will be increasingly vulnerable to security issues and attacks.

Certify The Web will no longer support any Microsoft OS after the end of it's official support lifecycle. If an OS version is not supported by Microsoft, it cannot be effectively supported by anyone else and you are at extreme risk of unpatched security vulnerabilities.

If you are running **Windows Server 2008 R2** or lower (including derivatives such as SBS 2011 etc) you should urgently move your applications to a new version of windows. 

If you are running **Windows Server 2012**, mainstream support from Microsoft ended in 2018 and if you are on extended support this will end in Oct 2023. 

Mainstream microsoft support for **Windows Server 2016** ended in January 2022.

## Disaster Recovery Planning
It's very common for organisations to consider their apps as being "too difficult" to move to newer operating systems. This is a critical risk for your system and if your service is *business critical* (i.e. your business cannot effectively operate without it) then it's also a high priority risk to your business. If you *cannot* move an app (because you don't really know how), consider whether you can even restore it if the server fails and the impact to your organisation if that happens. 

Write a simply worded document that you can hand to a competent IT administrator (they should not have to know the system or how it works beforehand) that lets them recover your system to a new server. The document should summarize what the system does, how it's put together and most importantly how to set it all up again to the point where users can start using it. **Exercise the plan by getting someone else to setup a test system using your document.**




