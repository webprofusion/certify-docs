---
id: palo-alto
title: Deploy to Palo Alto Networks Firewall
sidebar_label: Palo Alto Networks
description: Replace a named certificate on a Palo Alto Networks firewall (PAN-OS) and commit the change.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to Palo Alto Networks Firewall* task imports the certificate and its private key to a Palo Alto Networks firewall (PAN-OS) using the XML API, then commits the change.

The certificate keeps the same name each time it is renewed, so the settings that use it pick up the new certificate automatically. These include SSL/TLS service profiles (for the management interface, GlobalProtect and captive portal), decryption and authentication settings. You don't need to change them after each renewal.

## Before you start

On the firewall:

- Create an administrator for Certify (recommended), under *Device > Administrators*. Give it an admin role whose *XML API* tab allows *Configuration*, *Operational Requests*, *Commit* and *Import*. A *Superuser* administrator also works.
- Use this administrator only for Certify. The task commits all the changes this administrator has made, so it doesn't commit other administrators' unfinished work. Any changes made through the web interface with the same account would be committed too.
- Note the management address of the firewall, e.g. `https://192.168.1.1` or `https://fw.example.com`.

The task works directly with a firewall. It doesn't deploy through Panorama templates. On a firewall managed by Panorama, it can still manage a certificate that is in the firewall's local configuration.

## Setting up the task

1. Add the *Deploy to Palo Alto Networks Firewall* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Username and Password* credential for the firewall administrator. Select *New* to add one.
   - **Firewall Address**: the management URL of the firewall.
   - **Certificate Name**: the name the certificate has, or will have, on the firewall, e.g. `www.example.com`. It can contain letters, numbers, `.`, `-` and `_`, up to 63 characters.
   - **Virtual System**: leave blank to import the certificate to *Shared*. On a firewall with multiple virtual systems, you can set the virtual system to import it into instead, e.g. `vsys1`. Use the location the existing certificate is in, if you are replacing one.
   - **Allow Untrusted Firewall Certificate**: enable this if the firewall still uses its default self-signed management certificate.
3. Save, then run the task with the ▶️ play button.
   - If the certificate doesn't exist yet, it is added. Select it once wherever it should be used on the firewall, for example in an SSL/TLS service profile, then commit.
   - If it already exists, it is replaced and the settings using it keep using it.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task signs in with the username and password to get an XML API key.
- It checks the certificate in the running configuration. If it is already the certificate being deployed, nothing is changed.
- The private key, certificate and intermediate certificates are imported in one file, so the firewall sends the full chain to clients. The key and certificate are replaced together, and if the import fails nothing changes.
- The task then commits the changes made by its administrator (a partial commit), and waits for the commit job to finish. A commit can take a few minutes on a large configuration.
- If the certificate is used by the management interface, the firewall restarts its web server as the commit completes. The task keeps checking the commit job until it can connect again.
- When the task is previewed or validated, it signs in and checks the certificate without changing anything. This catches a wrong username, password or address before a renewal depends on them.

## Troubleshooting

- **Access denied**: check the username and password, and that the administrator's role allows the XML API for *Configuration*, *Operational Requests*, *Commit* and *Import*.
- **Unexpected response**: check the Firewall Address points to the firewall management interface.
- **Could not connect**: check Certify can reach the management address and port. If the firewall uses a self-signed management certificate, enable *Allow Untrusted Firewall Certificate*.
- **Imported, but committing it failed**: the new certificate is in the candidate configuration, but the firewall is still using the previous one. The error says why, for example a commit lock held by another administrator, or a validation error. Fix the cause, then run the task again or commit the change on the firewall.
- **Commit job was still running**: the commit took longer than 20 minutes. Check its result under *Tasks* on the firewall.
