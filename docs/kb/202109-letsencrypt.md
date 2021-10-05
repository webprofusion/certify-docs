---
id: kb-202109-letsencrypt
title: Let's Encrypt DST Root CA X3 expiry Sept 30th 2021 
---

# Summary

Certificate trust mainly relies on the "root" issuing certificate (and intermediate certificates) being trusted by your computer. 

The root certificate issues an Intermediate certificate which in turn is used to issue general certificates such as the ones for your website. This is called a "Chain" of trust. Your certificate (called a Leaf or end-entity certificate) will be validated by following this chain.

*From Sept 30th 2021 Let's Encrypts previous root certificate *DST Root CA X3* (and it's R3 intermediate) will expire. It has been replaced by their *ISRG Root X1* certificate (and replacement R3 intermediate).*

:::note

**In most cases, your systems will automatically switch over to the next trusted chain they can find.**

:::

:::success Lean More About Certify The Web
Certify The Web is the most popular desktop UI for ACME certificate management and includes commercial support via email to our helpdesk. Find out more at  https://certifytheweb.com

The guidance in this article is aimed at all Windows users with Let's Encrypt related issues, for any ACME client.
:::

# Possible issues

The version of the *R3* intermediate signing certificate which chains to *DST Root CA X3* expired **September 29 19:21:40 2021 GMT.**

The *DST Root CA X3* root certificate expired **September 30 14:01:15 2021 GMT**.

- In some cases, the expiry of the root (and its related expiring R3 intermediate certificate) may causes certificates to be considered untrusted or invalid. To fix this you need to make your server use (serve) the correct chain.
- In other cases, the issue may be with the client computer.
- Some Certify The Web renewals will fail with *too many certificates (5) already issued for this exact set of domains in the last 168 hours*. See solution below.
- If you have clients complaining about some android devices not working with their websites, you may need to migrate to a different Certificate Authority (see below).

:::warning CA Migration Recommended On Windows if you need to support old devices
In testing we have confirmed that when `DST Root CA X3` expires, although Windows can initially serve the legacy chain intended for Android compatibility, it will revert to the modern chain automatically when it notices `DST Root CA X3` has expired, if `ISRG Root X1 (self signed)` is also present in the trust store. A [workaround is available](#switching-to-chain-2-legacy)

This means Windows services like IIS generally will not continue to serve content to older operating systems which don't trust `ISRG Root X1`. If you require legacy support without workarounds, you should change [Certificate Authority](/docs/guides/certificate-authorities).
:::

# Solutions

## Servers
The following solutions mainly apply to Windows servers running IIS or other windows based services which use the windows trust store. Unless otherwise noted they are not specific to using Certify The Web. Apache, nginx etc have their own trust mechanisms :

### Certify The Web renewal failures
If you are using Certify The Web and see the error ** Error creating new order :: too many certificates (5) already issued for this exact set of domains in the last 168 hours** ensure you have installed the latest version of Certify The Web and wait 1 week for the error to clear. 

**As your server has repeatedly attempted to order a certificate and failed you will need to wait 1 week for the Let's Encrypt rate limit to reset for this certificate**, then renewals will automatically resume as normal, as long as you now have the ISRG Root X1 certificate installed. Root certificate updates are a normal part of automatic windows updates, so you should ideally review why your server is not receiving these.

Alternatively you could change Certificate Authority if this is an urgent renewal, Certify The Web supports several public certificate authorities: https://docs.certifytheweb.com/docs/guides/certificate-authorities

### Servers with problems after expiry
:::tip Check Your Chain
1 - To diagnose a chain issue for your server, scan one of your webservers domains with a [chain checker](#chain-checking)

2 - If your chain contains the expired R3 after it's expiry, reboot your server to clear cached chains.

3 - If the chain issue persists, re-request your certificate in Certify The Web to force a binding refresh or choose `Certificate > Advanced > Actions > Re-apply Certificate To Bindings`.
:::

### Server fixes and how to switch chain before (or after) expiry

We recommend the following steps to initially correct your servers certificate chain:

1. Install the latest version of *Certify The Web* from https://certifytheweb.com or use the in-app update process. Even if you are not using this app currently, the upgrade will automatically fix common trust store issues (and it can then be uninstalled if not being used).
2. **Reboot your server** (this forces windows to re-evaluate the served certificate chains). You may be able to avoid this reboot by using `iisreset /restart` to just restart IIS.
3. Check your certificate chain with a [chain checker](#chain-checking)
4. In some cases you may need to refresh your IIS bindings, the easiest method is to click 'Request Certificate' to change certificate and update bindings.

:::tip Valid Chains
The default chain served by Windows (depending on the state of your server trust store) will be either:

#### **Chain 1 (modern)** : (your cert) > R3 > ISRG Root X1
This chain is supported by current operating systems

#### **Chain 2 (legacy)** : (your cert) > R3 > ISRG Root X1 > DST Root CA X3
This chain is ideal if you need broader compatibility with older operating systems, including Android 7.1 and lower. This chain is [difficult to support on Windows](#switching-to-chain-2-legacy)
:::

For IIS etc, you can only serve one of these chains per Windows server (machine), not a combination per site etc. The default trust store maintenance in Certify The Web will provide the *modern* chain. If you need the legacy chain you may still need import the cross signed ISRG Root X1 (see *Switching to Chain 2*, below) unless it was already installed.

:::danger If your chain is still: (your cert) > R3 > DST Root CA X3
If you still see this old chain after the DST Root CA X3 expiry (after updating Certify The Web and after rebooting), then you need to resolve this urgently. At a minimum you must ensure ISRG Root X1 (Self signed) is installed under your machine Trusted Certification Authorities using certlm.msc and remove the R3 issued by DST Root CA X3 from Intermediate Certification Authorities. See the [further troubleshooting](#further-troubleshooting) section below.
:::

### Switching to Chain 1 (modern)
If you are serving the *ISRG Root X1 > DST Root CA X3 (self signed)* chain and want to switch to just the *ISRG Root X1* chain:
- remove the cross signed version of the ISRG Root X1 (issued by DST Root CA X3) from your machine trust store. 
- You may need to reboot to see the effect.

### Switching to Chain 2 (legacy)
If you require compatibility with old versions of Android and other devices that don't know about *ISRG Root X1*, you need to serve **Chain 2**. 

:::warning Caution - Workaround
A previously proposed workaround was to move `ISRG Root X1 (self signed)` to the `Untrusted` store in order to serve the legacy `DST Root CA X3` chain. This has unintended side effects (your server cannot validate https connections against services such as the Let's Encrypt API).

Servers which do not yet trust `ISRG Root X1 (self signed)` will be serving the legacy chain but will automatically switch when their trust store updates.

Instead, if you require this chain for compatibility, either use a proxy (Caddy, nginx, Apache) in front of IIS and use the proxy to terminate TLS.

If no other solution works or for any other reason you cannot update client trusts stores etc or require other broader compatibility, you may need to consider moving your certificate to a new Certificate Authority.
:::

## Non-IIS servers (Apache, nginx etc on Windows or Linux)
Verify that your service is configured to use your certificate, with it's private key *and* it's **chain**. These services will work without pointing to a chain file but in the case of the expired R3 your clients will try to resolve the R3 themselves (because you haven't given it to them) and they may then resolve it to the old (expired) one.

## Clients (browsers etc)
If your site is working for most devices but not for some, the problem is with their trust store (their list of trusted root certificate).

### Windows PCs
On windows PCs, simply browsing to a website using Chrome, Edge etc with updated the client trust store with the required certificates. Browsing to https://valid-isrgrootx1.letsencrypt.org/ will prompt Windows to include *ISRG Root X1* in its trust store automatically.

For Windows 7 (without outdated trust store) you should urgently replace the machine operating system with Windows 10 or higher. If this is not possible, manually install by browsing to http://x1.i.lencr.org/ in order to download the .cer file for ISRG Root X1, open file, click "Install Certificate..", Choose default option "automatically select..", Next, Finish. The ISRG Root X1 certificate will now be visible using certmgr.msc under Trusted Root Certification Authorities. Reboot machine.


### macOS, iOS etc
Some operating systems hold onto the expired `R3 > DST Root CA X3` chain even if your server is no longer using it. Try a restart of the affected client device.

For older macOS not updated by Apple:

- Download the ISRG Root X1 certificate file from http://x1.i.lencr.org/
- Open the Keychain Access app and drag that file into the System folder of that app.
- Find the ISRG Root X1 certificate in System and double click on it, open the Trust menu and change "Use System Defaults" to "Always Trust", then close that and enter your password to confirm the change (if prompted).

## Java based systems etc
Some applications maintain their own trust store. You may need to add the newer ISRG Root X1 certificate into your systems trusts store. Any system that can't be updated needs to see the legacy chain or you need to switch CA.

e.g. for Java you might use: `keytool -import -alias isrgrootx1 -keystore $JAVA_HOME/jre/lib/security/cacerts -trustcacerts -file isrgrootx1.cer` ([credit](https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190/258))

## Azure (Application Gateway)
Ensure that the HTTP settings for back-end hosts are updated with the latest Trusted Root Certificate. Download https://letsencrypt.org/certs/isrgrootx1.pem (same as .cer file) and upload via the Azure Portal or via PowerShell. See [Application Gateway Troubleshooting](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-backend-health-troubleshooting) for further details.

## Other considerations
### Export Tasks
If you use Certify The Web to export certificates to pem files etc (for Apache or other servers), the chain you get in the export will correspond with the chain your server is currently building. The "Preferred Issuer" setting for the certificate authority will have *no effect*, because Windows is overriding the chain.

### Renewals fail if ISRG Root X1 not installed
If your server does not have ISRG Root X1 installed, Certify The Web will fail to build your certificate when it renews. The certificate order with Let's Encrypt will succeed but the actual build and install of the PFX file will fail. **You must update Certify The Web to the latest version** or at least install the ISRG Root X1 certificate if your renewals are failing for this reason. Otherwise, you will hit the Let's Encrypt rate limit for duplicate certificate orders and your certificate will not fully renew.

## Further Troubleshooting

- A registry method to delete the old R3 is [documented here](https://gist.github.com/skusiak/83db2ba2fc1804b89151db01e97bbbec)
- If your expired chain keeps coming back, move (or install) the expired `R3 issued by DST Root CA X3` into the Untrusted store using `certlm.msc` (Manage Computer Certificates).
- Further information and troubleshooting steps are here: https://community.certifytheweb.com/t/upcoming-expiry-of-dst-root-ca-x3-and-r3-intermediate-for-lets-encrypt/1480

:::tip Licensed Users can contact Certify The Web support
While the problem itself relates to and is controlled by Windows and Let's Encrypt, licensed users can contact Certify The Web support via `support at certifytheweb.com` if they have further related questions and issues they need advice with. We are in the AEST (Australia) Time Zone. A higher than normal volume of support tickets are expected immediately up to, during and after the root expiry so please expect delays and perform as much of your own troubleshooting and research as you can.
:::

## Useful Information
Visit the Let's Encrypt support community for more information about the root expiry and chain changes: https://community.letsencrypt.org/t/production-chain-changes/150739/4
### Chain Checking
Other ways to check and diagnose chain issues:
- Chain Checker by Certify The Web: https://chainchecker.certifytheweb.com/ provides useful diagnostics for Let's Encrypt chains.
- Qualsys SSL Server Test: https://www.ssllabs.com/ssltest/ is useful for full diagnostics of your certificate chain.
- Namecheap SSL Checker: https://decoder.link/sslchecker/
- OpenSSL: `openssl s_client -connect your.domain.com:443 -servername  your.domain.com`

### Further Reading
The Windows certificate chaining engine: https://social.technet.microsoft.com/wiki/contents/articles/3147.pki-certificate-chaining-engine-cce.aspx

