---
id: sonicwall
title: Deploy to SonicWall
sidebar_label: SonicWall
description: Import the certificate to a SonicWall firewall and switch HTTPS management and SSL VPN to it.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to SonicWall* task imports the certificate to a SonicWall firewall using the SonicOS API. It then switches the HTTPS management and SSL VPN certificates over to it, if they used the previous certificate.

SonicOS keeps each imported certificate under its own name, so each deployment imports the certificate under a new name, `<name>_<date and time>` (for example `www_example_com_261119101500`). The settings that used the previous certificate are switched to the new one, then the previous certificate is deleted. You select the certificate once, and renewals keep those settings up to date.

The task works with SonicOS 7 (Gen7 firewalls). SonicOS 6 can't import a certificate through its API.

## Before you start

On the SonicWall:

- Enable the SonicOS API under *Device > Settings > Administration > SonicOS API*. Enable *RFC-7616 HTTP Digest Access authentication* (recommended) or *RFC-2617 HTTP Basic Access authentication*. Session security can stay on. Two-factor bearer token authentication isn't supported, and the digest *Integrity protection* option must not be set to *Enforced*.
- Use the built-in `admin` account, or create an administrator for Certify with full administrator rights.
- Note the management address of the SonicWall, including the management HTTPS port if it isn't 443, e.g. `https://192.168.168.168` or `https://fw.example.com:4433`.

## Setting up the task

1. Add the *Deploy to SonicWall* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Username and Password* credential for the SonicWall administrator. Select *New* to add one.
   - **SonicWall Address**: the management URL of the SonicWall.
   - **Certificate Name**: the base name for the certificate, e.g. `www_example_com`. It can contain letters, numbers, `.`, `-` and `_`, up to 30 characters, as the task adds the date and time to it.
   - **Delete Previous Certificates**: on by default. Turn it off if you also use the certificate somewhere the task doesn't switch, such as IPsec VPN policies, so the previous certificate stays until you change those yourself.
   - **Take Over Management**: off by default. Only one administrator can change the configuration at a time. If someone else is managing the SonicWall when the task runs, the task fails, unless this is on. If it's on, their session is ended and their unsaved changes are lost.
   - **Allow Untrusted SonicWall Certificate**: enable this if the SonicWall still uses its default self-signed management certificate.
3. Save, then run the task with the ▶️ play button.
4. On the first deployment, select the new certificate where it should be used on the SonicWall, for example under *Device > Settings > Administration > Web Management* (HTTPS management) or *Network > SSL VPN > Server Settings*. Later renewals switch those settings to each new certificate automatically.

If you already have a certificate imported under exactly the base name (e.g. `www_example_com`), the first deployment replaces it too, and switches its settings to the new certificate.

## How it works

- The task signs in to the SonicOS API, and signs out when it finishes.
- The certificate, private key and intermediate certificates are imported together as a PKCS#12 (.pfx) file with a random password, under the new name.
- The SSL VPN certificate, then the HTTPS management certificate, are switched to the new certificate if they used a previous certificate (named `<name>` or `<name>_<date and time>`). Other settings that can use a certificate, such as IPsec VPN policies, aren't changed.
- The changes are then committed (saved), so they take effect and survive a restart. If anything fails before the commit, the SonicWall keeps using the previous certificate.
- Previous certificates are deleted once neither setting uses them, if *Delete Previous Certificates* is on. If the SonicWall refuses to delete one, for example because something else still uses it, the task logs a warning and keeps it.
- When the task is previewed or validated, it signs in and lists what deploying would change, without changing anything. This catches wrong credentials, addresses or API settings before a renewal depends on them. A preview never ends another administrator's session.

## Troubleshooting

- **Access denied**: check the username and password, that the SonicOS API is enabled with Digest or Basic authentication, and that the user is an administrator.
- **Unexpected response**: check the SonicWall Address points to the management interface, including the management HTTPS port.
- **Could not connect**: check Certify can reach the management address and port. If the SonicWall uses a self-signed management certificate, enable *Allow Untrusted SonicWall Certificate*.
- **Could not start making changes**: another administrator is managing the SonicWall. Try again when they have logged out, or enable *Take Over Management*.
- **Could not be switched to it**: the new certificate was imported, but the named setting still uses the previous certificate. Select the new certificate there yourself, then delete the previous certificate.
- **The connection closed while saving the switch of the HTTPS management certificate**: the SonicWall restarts its management web server to use the new certificate, and the connection closed before it confirmed the change. Check that the HTTPS management certificate is the new one, then delete the previous certificate.
- **Could not delete previous certificate**: the new certificate is in use, but the previous one is still on the SonicWall, usually because something else uses it, such as an IPsec VPN policy. Change that setting to the new certificate, then delete the previous one.
