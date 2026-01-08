---
id: kb-202601-letsencrypt
title: Let's Encrypt YE/YR Roots on Windows
---

# Summary

**From January 7th 2026 let's Encrypt have started to issue from a new hierarchy with root certificates Root YE (ECDSA chains) and Root YR (RSA chains).** This may affect compatibility with some "clients" (browsers and other software connecting to your services) if their trust store does not have these new roots. *This issuance chain is currently limited to ACME clients renewing with the *tlsserver* or *shortlived* profiles.*

Certificate trust mainly relies on the "root" issuing certificate (and intermediate certificates issued via that root) being trusted by your computer. 

This is called a "Chain" of trust. Your certificate (called a Leaf or end-entity certificate) will be validated by following this chain or using OS/app-specific chain building logic.

The [new YE/YR hierarchy](https://letsencrypt.org/certificates/) also includes a "cross-sign" to the already trusted ISRG Root X1/X3 roots. For most windows clients (browsers, .Net, PowerShell etc) this means the client will determine a trusted chain on it's own, even if it doesn't yet trust Root YR/Root YE.

## The Problem

If your server trusts the new Root YR and Root YR certificates for Let's Encrypt it will start to use them in the served chain with schannel enabled services like IIS. **The only way to control this is to not trust those roots on your server yet.**

If your server trusts the new roots YE/YR *before your connected clients do* your server may present a chain that your clients don't yet trust. This may affect clients such as browsers, mobile devices, apps, tools etc.

On Windows, the default TLS implementation schannel determines the most trusted path for a given certificate chain, regardless of what the initially intended/preferred chain should be. It then use this chain in the TLS conversation when presenting a TLS-enabled service to a client such as a browser.

### Example Errors for affected clients
Curl: `curl: (60) SSL certificate problem: unable to get local issuer certificate` 

## Possible Solutions

:::warning if you need to support old devices or those not updated to new roots
 If you require legacy support without workarounds, you may prefer to temporarily change the [Certificate Authority](../guides/certificate-authorities.md) for your certificates.
:::

### Issue from the older chain
Before May 2026 you can option to use the "classic" (default) ACME profile with the Let's Encrypt service and have your certificate issued form the older chain. This would normally be the most obvious fix unless that issuance has been retired.

### Update clients to trust the new self-signed roots

#### Manually Trust New Roots on Windows
Download the (self signed) roots from the CA and import into the *Local Machine* certificate store under *Trusted Root Certification Authorities*, then reboot. 

The quick way to do this is to open the file with the default windows certificate view, choose *Install Certificate..*, then choose *Local Machine* > *Place all certificates in the following store..* > *Trusted Root Certification Authorities*.

#### Linux, macOS, iOS etc

Update the OS with the latest updates, for some tools you may need to update the individual tools if they have their own trust store (sometimes called a "ca bundle").

Some operating systems hold onto the chain even if your server is no longer using it. Try a restart of the affected client device.

For older macOS not updated by Apple:

- Download the Root YE/Root YR certificate files
- Open the Keychain Access app and drag that file into the System folder of that app.
- Find the certificate in System and double click on it, open the Trust menu and change "Use System Defaults" to "Always Trust", then close that and enter your password to confirm the change (if prompted).

## Java based systems etc
Some applications maintain their own trust store. . Any system that can't be updated needs to see the cross-signed chain or you need to switch CA.

e.g. for Java you might use: `keytool -import -alias isrgrootx1 -keystore $JAVA_HOME/jre/lib/security/cacerts -trustcacerts -file rootye.cer`

## Azure (Application Gateway)
Ensure that the HTTP settings for back-end hosts are updated with the latest Trusted Root Certificate. Upload the new roots via the Azure Portal or via PowerShell. See [Application Gateway Troubleshooting](https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-backend-health-troubleshooting) for further details.

### Revert the served chain on your server

You can force your server to communicate using the "cross-signed" chains which preserve compatibility by removing *Root YE* and *Root YR* from *Trusted Root Certification Authorities* collection under certlm (Computer Certificates).

:::warning Caution - Workaround
This may have unintended side effects because it also changes how your server trusts services it connects to.
:::

Your server will however continue to trust the new roots while windows update etc is allowed to update the CA roots. Another option is to temporarily move *Root YE* and *Root YR* into the *Untrusted Certificates* collection, then reboot. You should make a note to review this decision every month and remove this workaround as soon as possible.

### Proxy your service
Instead, if you require this chain for compatibility, either use a proxy (Caddy, nginx, Apache) in front of IIS and use the proxy to terminate TLS. This lets you control the served chain via that proxy.

### Use a different CA
If no other solution works or for any other reason you cannot update client trusts stores etc or require other broader compatibility, you may need to consider moving your certificate to a different Certificate Authority.

## Other considerations
### Certify Certificate Manager - Export Tasks
If you use Certify The Web to export certificates to PEM files etc (for Apache or other servers), the chain you get in the export will correspond with the chain your server is currently building. The "Preferred Issuer" setting for the certificate authority will have *no effect*, because Windows is overriding the chain. We will release an update to control the strictness of export chains.

## Further Troubleshooting

:::tip Licensed Users can contact Certify The Web support
While the problem itself relates to and is controlled by Windows and Let's Encrypt, licensed users can contact Certify The Web support via `support at certifytheweb.com` if they have further related questions and issues they need advice with. We are in the AEST (Australia) Time Zone. A higher than normal volume of support tickets are expected so please expect delays and perform as much of your own troubleshooting and research as you can.
:::

## Useful Information
Visit the Let's Encrypt support community for more information about the chain changes: https://community.letsencrypt.org

### Chain Checking
Other ways to check and diagnose chain issues:
- Chain Checker by Certify The Web: https://chainchecker.certifytheweb.com/ provides useful diagnostics for Let's Encrypt chains.
- Qualsys SSL Server Test: https://www.ssllabs.com/ssltest/ is useful for full diagnostics of your certificate chain.
- Namecheap SSL Checker: https://decoder.link/sslchecker/
- OpenSSL: `openssl s_client -connect your.domain.com:443 -servername  your.domain.com`

### Further Reading
The Windows certificate chaining engine: https://social.technet.microsoft.com/wiki/contents/articles/3147.pki-certificate-chaining-engine-cce.aspx
