---
id: troubleshooting
title: Troubleshooting
description: Diagnose certificate request, validation, renewal, connectivity, and deployment issues across Certify The Web products.
displayed_sidebar: helpSupportSidebar
---

# Troubleshooting

This page covers common request, renewal, validation, connectivity, and deployment problems.

## Quick Triage Checklist

- Confirm you are using the latest version of the product you are troubleshooting.
- Read the log for the specific managed certificate before changing settings.
- Use **Test** and **Preview** in the UI where available.
- Confirm outbound HTTPS access to the CA and any APIs you depend on.
- Confirm your chosen validation method still matches your environment.

## If the UI Shows a "Service Not Started" Message

If the UI reports that the service is not started, see [Background Service](../backgroundservice.md) first. Common causes include conflicts on the local listener, interrupted upgrades, missing permissions, or service startup failures after a version change.

## Issues Communicating with the CA

In normal use the app must be able to talk to the ACME API for your chosen [certificate authority](certificate-authorities.md). If you see an error such as `The ACME service (directory) is unavailable.`, your machine is not successfully establishing communication with the CA service.

Common Error Messages:
- *CA ACME Directory is not accessible*
- *Could not create SSL/TLS secure channel*

Common reasons for connectivity issues include:
- TLS 1.2 not enabled or **an incompatible set of TLS ciphers is enabled**. We recommend using the IIS Crypto tool from Nartac in Best Practises mode to configure general TLS settings. Let's Encrypt changed their API in May 2025 which did affect older Windows systems and we have a [suggested fix.](https://community.certifytheweb.com/t/fix-could-not-create-ssl-tls-secure-channel-when-attempting-a-certificate-order-with-lets-encrypt-or-ca-acme-directory-is-not-accessible/2558)
- A service outage at the CA, check our [Certificate Authorities](certificate-authorities.md) list to see if your CA has a status info page.
- Blocking outgoing https (TCP port 443, outgoing) in Windows Firewall or at the network level.
- Inability to communicate via common cloud based service providers such as Cloudflare (perhaps due to IPv6 routing issues or some kind of blocking).

To see if there is a connectivity issue, find out the ACME API endpoint for your chosen CA and check you can communicate with it, e.g. for Let's Encrypt, using PowerShell:
```PS
Invoke-WebRequest -Uri https://acme-v02.api.letsencrypt.org/directory 
```
This should return a StatusCode 200 (OK) under normal conditions, if the request fails you need to determine why your system is unable to communicate, this may require assistance from your networking team.

If the above test works OK then next thing would be to determine if the CA is returning some kind of error that the app is unable to interpret. 

You can use tools such as Telerik Fiddler to see the https conversation between your machine and the CAs API but you can also try enabling Debug logging in the app. To do so, edit `C:\ProgramData\certify\serviceconfig.json` and set the `"LogLevel"` field to `"debug"` instead of `"information"`, then restart the Certify background service and attempt your request again (just click "Request Certificate" on a managed certificate). The `C:\ProgramData\certify\logs\session*.log` file will then include the actual http conversation between you and the CA and you can use this to see if the CA is returning an error that the app is unable to interpret, or if the connection is simply not operating normally.

## Validation or Certificate Request Fails

When a request fails, work from the specific error message and the validation method you selected.

- If you use [HTTP validation](../http-validation.md), confirm the CA can reach TCP port 80 on the requested hostname and that requests to `/.well-known/acme-challenge/` are not blocked, redirected incorrectly, or geofenced.
- If you use [DNS validation](../dns/validation.md), confirm the stored credentials still work, your zone selection is correct, and the propagation delay is realistic for your DNS provider.
- Use the in-app **Test** option where available.
- For external confirmation of HTTP validation, try [Let's Debug](https://letsdebug.net).

## IIS or Deployment Is Serving the Wrong Certificate

- Review the **Preview** tab and confirm the expected bindings appear in the deployment section.
- Avoid IP-specific HTTPS bindings unless they are absolutely required. They take precedence over less specific bindings.
- Prefer hostname bindings with SNI and IP set to **All Unassigned**.
- If bindings changed or a site was redeployed, review [Using Certificates in Windows](ssl-windows.md) and then re-apply or adjust deployment settings.

## The Browser Still Shows Security Problems

Different browser errors usually point to different root causes:

- If the certificate looks valid but the page still shows warnings, you may have mixed content where page assets are still loading over `http`.
- If the browser says it cannot provide a secure connection, the server may not support modern TLS ciphers or protocols. On Windows, IISCrypto by Nartac is commonly used to apply stronger defaults.
- If chain trust changed after a CA update, review the relevant knowledge base article such as [Let's Encrypt YE/YR roots on Windows](../kb/202601-letsencrypt.md).

## Renewals Succeed but the Service Still Presents an Old Certificate

- Confirm the renewed certificate is actually being deployed to the service you care about.
- Review the **Preview** tab to ensure the expected HTTPS binding or export task is still targeted.
- Check whether another binding, proxy, load balancer, or stale exported file is being used instead of the renewed certificate.
- If you use IIS, ensure only one relevant HTTPS binding answers that hostname and port combination.

## Alternative Solution

Occasionally you may be unable or unwilling to resolve a connectivity issue with a specific CA. In that case, try [a different CA](certificate-authorities.md) with one managed certificate first. If that works for your environment, you can then change the default CA.

## Still Need Help?

If you have checked logs, confirmed network access, and validated the deployment path but still cannot isolate the problem, use [support](../support.md) and include the relevant logs and reproduction details.
