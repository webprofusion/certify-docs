---
id: fortigate
title: Deploy to FortiGate
sidebar_label: FortiGate
description: Import the certificate to a Fortinet FortiGate and move the settings that used the previous certificate to it.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to FortiGate* task imports the certificate to a Fortinet FortiGate using the FortiOS REST API. It then moves everything that used the previous certificate over to the new one, such as the admin interface, SSL VPN, virtual IPs and SSL inspection profiles.

FortiOS can't replace a certificate in place, so each deployment imports the certificate under a new name, `<name>_<date and time>` (for example `www_example_com_261113101500`). The settings that used the previous certificate are switched to the new one, then the previous certificate is deleted. You set up where the certificate is used once, and renewals keep those settings up to date.

## Before you start

On the FortiGate:

- Create a REST API administrator (*System > Administrators > Create New > REST API Admin*) and note its API token. Its admin profile needs read and write access to the parts of the configuration that use the certificate, for example *System*, *VPN* and *Firewall*.
- Add the address of the computer running Certify to the administrator's *Trusted Hosts*. Requests from any other address are refused.
- Note the management address of the FortiGate, including the admin HTTPS port if it isn't 443, e.g. `https://192.168.1.99` or `https://fw.example.com:10443`.

## Setting up the task

1. Add the *Deploy to FortiGate* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: an *API Key or Token* credential containing the REST API administrator's token. Select *New* to add one.
   - **FortiGate Address**: the management URL of the FortiGate.
   - **Certificate Name**: the base name for the certificate, e.g. `www_example_com`. It can contain letters, numbers, `.`, `-` and `_`, up to 22 characters, as the task adds the date and time to it.
   - **VDOM**: the VDOM to import the certificate into. Use `root` unless multiple VDOMs are enabled.
   - **Allow Untrusted FortiGate Certificate**: enable this if the FortiGate still uses its default self-signed management certificate.
3. Save, then run the task with the ▶️ play button.
4. On the first deployment, select the new certificate wherever it should be used on the FortiGate, for example under *System > Settings > HTTPS server certificate*, in your SSL VPN settings, virtual IPs or SSL inspection profiles. Later renewals move those settings to each new certificate automatically.

If you already have a certificate imported under exactly the base name (e.g. `www_example_com`), the first deployment replaces it too, and moves its settings to the new certificate.

## How it works

- Intermediate certificates from the chain are imported as CA certificates, if they aren't on the FortiGate already, so the FortiGate sends the full chain to clients. If one can't be imported, the task logs a warning and carries on.
- The certificate and its private key are imported as a new local certificate.
- The task finds every setting that uses a previous deployment's certificate (named `<name>` or `<name>_<date and time>`) and changes it to the new certificate. Where a setting holds a list of certificates, only the previous certificate in the list is replaced. The admin interface certificate is changed last.
- Previous certificates are deleted once nothing uses them. If a setting can't be changed, the task reports an error naming it, and keeps the previous certificate so that setting keeps working.
- FortiOS saves configuration changes as they are made, and HA clusters synchronise them, so there's no separate save step.
- When the task is previewed or validated, it connects to the FortiGate and lists what deploying would change, without changing anything. This catches a wrong token, address or trusted host setting before a renewal depends on them.

## Troubleshooting

- **Access denied**: check the API token, that the REST API administrator's trusted hosts include the computer running Certify, and that its admin profile allows changing the settings that use the certificate.
- **Unexpected response**: check the FortiGate Address points to the management interface, including the admin HTTPS port.
- **Could not connect**: check Certify can reach the management address and port. If the FortiGate uses a self-signed management certificate, enable *Allow Untrusted FortiGate Certificate*.
- **Could not be changed to use it**: the new certificate was imported, but the named setting still uses the previous certificate. Check the admin profile allows changing that part of the configuration, or select the new certificate there yourself, then delete the previous certificate.
- **Could not delete previous certificate**: the new certificate is in use, but the previous one is still on the FortiGate. It may be used by a setting the task couldn't find. Check where it is used under *System > Certificates*, then delete it.
