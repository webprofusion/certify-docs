---
title: Request Your First Certificate
description: Follow the quickest path to your first working certificate in Certify Management Hub, then continue to the fuller certificate workflow guides.
---

# Request Your First Certificate

:::info Target Instance

In *Certify Management Hub*, each managed certificate is stored on a selected **Target Instance**. That instance holds the request configuration and performs the certificate request. The target can be the Hub server itself or a joined *Certify Certificate Manager* instance.

:::


## Certificate Authority

Before requesting a certificate, configure a CA account on the target instance under *Settings* > *Certificate Authorities*.

- [Let's Encrypt](https://letsencrypt.org) is the default CA. You can optionally enter an email address for contact about certificate renewal issues, then agree to the CAs terms and conditions and click OK. Note that omitting an email address will also prevent automated failure notifications provided by the certifytheweb.com API.

- For some CAs you can optionally select "Use Staging" to only create a test account which creates test (not publicly trusted) certificates. If you select this option you also need to indicate that you will use Staging in your certificate settings later.

## Certificate Request

A certificate request needs the identifiers to include and a way to prove control of them.

To add a new managed certificate:
1. Select *Certificates* > *New*.
    - The target instance defaults to the Hub server, but a joined *Certify Certificate Manager* instance can be selected instead.
2. Provide a descriptive title for your certificate (for your own reference) and add the set of domains you want to include.
3. On the *Authorization* tab, configure how to prove domain control by adding one or more challenge-response configurations. If your domain points to the same server as the *Target Instance* then that instance can provide HTTP domain validation responses. Otherwise, select dns-01 as the challenge type and configure an appropriate DNS validation method.
4. Select **Test** to perform a basic check, then select **Request Certificate** to begin the order.

:::info 

To create a test certificate using a CA staging environment, select *Certificate > Advanced > Certificate Authority*, choose the CA, and enable *Use Staging Mode*.

:::

After the request succeeds, either use the certificate on the same server as the Hub or export it with a deployment task.

The Hub API can also be used from another machine to pull the latest version of the certificate.

## Related Guides

For the broader operating model, continue with:

- [Manage certificates in the Hub](certificate-operations.md)
- [Request and deploy certificates](request-and-deploy-certificates.md)
- [Certificate Authorities and stored credentials](certificate-authorities-and-credentials.md)