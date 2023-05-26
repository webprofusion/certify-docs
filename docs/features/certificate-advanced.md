---
id: certificate-advanced
title: Certificate - Advanced Options
---
# Certificate - Advanced Options

For most users, the default settings the app uses for certificate requests will be sufficient. However, if you need to change the way the app requests certificates you can do so by selecting your managed certificate and navigating to `Certificate` > `Advanced`.

## Certificate Authority
The Certificate Authority settings determine which default CA will be used when this certificate is requested or renewed. You can also set an overall preferred CA under Settings > Certificate Authorities. For more information about Certificate Authority options see [Certificate Authorities](../guides/certificate-authorities.md). The default *Auto* mode will just use the application default CA (typically that's *Let's Encrypt*). 

If you select a specific CA, be sure that you have setup an appropriate matching CA account under Settings > Certificate Authorities, otherwise your certificate request will fail.

### Staging Mode
If your CA supports a *Staging* mode (test certificates which are not publicy trusted) you can opt to use that by checking the *Use Staging Mode (Test Certificates)* option. This is useful for testing your certificate request process before you request a real certificate.

### Preferred Chain
If your CA supports multiple certificate chains you can specify which one you prefer to use. This is useful if you need to use a specific chain for compatibility with older devices.

## Signing & Security

This section covers options related to the Private Key and Certificate Signing Request (CSR) used to request your certificate.
See [Certificate Signing Request](../guides/csr.md) for more information on CSR related options.

### Security (PFX Password)
By default the app produce PFX file with a blank password. While this makes them more convenient to use in some situations, it is not secure if the file will be distributed to other locations etc. The password will be applied whn your certificate is next request/renewed. You can centrally manage the password (scu as updating the same password for many certificates) under *Settings > Stored Credentials*.

## General Options

#### Comments
Add an optional comment for your own use to describe this managed certificate or it's purpose.

#### Enable Auto Renewal
Include this managed certificate in standard auto renewal (enabled by default).

#### Notify Primary Contact on Renewal Failure
If enabled, the primary contact for this managed certificate will be notified if the certificate renewal fails repeatedly. This notification is sent via the `https://api.certifytheweb.com` API (not a user-supplied SMTP gateway etc) and by default doesn't require additional configuration.

#### Skip Certificate Request
Allows the user to completely skip the certificate request process for this managed certificate. This is mainly included for testing purposes and is not typically used.

## Actions
Actions covers a range of additional features (and information) which can be applied to a managed certificate. 

- View Certificate: opens the certificate using the system certificate viewer.
- Revoke Certificate: performs a certificate revoke. There is normally no reason to revoke a certificate except because of private key compromise. Revoking a certificate will *not* restore rate limits etc and is normally *not* the correct thing to do.

- Re-apply Certificate to Bindings: This performs the same Deployment action as the *Request Certificate* button on the main screen, but only for the current version of the managed certificate and it *does not* perform other deployment tasks. This is useful if you have made changes to the certificate Deployment mode settings and want to re-apply them without waiting for the next auto renewal.
- Re-fetch Latest Certificate: This will attempt to repeat the download step of the certificate order process. This is generally only useful for debugging purposes and is subject to the CA still considering the last certificate order valid.
- Managed Certificate Reference Id: This is used by some command line operations to identify the managed certificate. It is not normally required.
- Certificate Path: This shows the current path to the certificate file on disk. This is generally for information only and changes after every renewal.
- Current Certificate Order URI: This is the ACME URI of the last/current certificate order. This is generally for information only and changes after every renewal.
