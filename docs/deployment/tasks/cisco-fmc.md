---
id: cisco-fmc
title: Deploy to Cisco Secure Firewall (FMC)
sidebar_label: Cisco Secure Firewall
description: Replace a PKCS12 certificate enrollment on Cisco Secure Firewall Management Center and reinstall it on threat defense devices.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to Cisco Secure Firewall (FMC)* task deploys the certificate to Cisco Secure Firewall Threat Defense (FTD) devices through Secure Firewall Management Center (FMC), using the FMC REST API. It needs management center version 7.7 or later.

The certificate and its private key go into a PKCS12 certificate enrollment object on the management center. The task then installs the enrollment again on each device it's installed on. Each device keeps the same trustpoint, so the settings that use it pick up each renewal. These include the remote access VPN identity certificate. You don't need to change them after each renewal.

## Before you start

On the management center:

- Make sure the REST API is enabled, under *System > Configuration > REST API Preferences*.
- Create a user for Certify (recommended), under *System > Users*, with a role that can change PKI objects and device certificates, such as *Network Admin*. On a multi-domain management center, give it access to the domain of the devices.
- Use this user only for Certify. The management center signs a user out of the web interface when the same user signs in to the REST API.
- Note the address of the management center, e.g. `https://fmc.example.com`.

## Setting up the task

1. Add the *Deploy to Cisco Secure Firewall (FMC)* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Username and Password* credential for the management center user. Select *New* to add one.
   - **Management Center Address**: the URL of the management center.
   - **Certificate Enrollment**: the name the certificate enrollment object has, or will have, on the management center, e.g. `vpn.example.com`. It can contain letters, numbers, `.`, `-` and `_`, up to 64 characters. To take over an existing PKCS12 enrollment, use its name.
   - **Devices** (optional): the names of devices to install the certificate on, separated by commas, as shown under *Devices > Device Management*. Devices the enrollment is already installed on always get each renewal, so you only need to name new devices.
   - **Domain** (optional): leave blank for the *Global* domain. On a multi-domain management center, set the domain of the enrollment and devices instead, e.g. `Global/Branch`.
   - **Allow Untrusted Management Center Certificate**: enable this if the management center still uses its default self-signed certificate.
3. Save, then run the task with the ▶️ play button.
   - If the enrollment doesn't exist yet, it is added, and installed on the devices you named. You can also install it under *Devices > Certificates* instead. Then select it wherever it should be used, for example as the identity certificate of a remote access VPN policy, and deploy the change.
   - If it already exists, its certificate is replaced, and it is installed again on the devices that have it.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task signs in with the username and password to get a REST API access token, and signs out when it finishes.
- It finds the certificate enrollment by name. Only PKCS12 enrollments are replaced. If the enrollment already has the certificate being deployed, it isn't changed.
- The private key, certificate and intermediate certificates go into a PKCS12 file, with the key encrypted using 3DES, which older devices can also read. The enrollment keeps its other settings, such as revocation checking.
- The task then installs the enrollment on each device, one at a time, and waits for the management center to finish each install. Devices it's already installed on are re-enrolled, even when the enrollment already had the certificate, in case an earlier install failed.
- Installing the certificate on a device doesn't need a configuration deployment, and other pending changes aren't deployed.
- When the task is previewed or validated, it signs in and reports what deploying would change, without changing anything. This catches a wrong username, password, address, domain or device name before a renewal depends on them.

## Limitations

- The management center must be version 7.7 or later. Earlier versions can store the PKCS12 file in the enrollment, but can't install it on devices through the REST API.
- A PKCS12 file can be up to 24 KB, which leaves plenty of room for a certificate and its chain.
- The task has not been tested with devices in a high availability pair or cluster.

## Troubleshooting

- **Could not sign in**: check the username and password, and that the REST API is enabled.
- **Access denied**: check the user's role allows changing PKI objects and device certificates, and that it has access to the domain.
- **Domain was not found**: the error lists the domains the user can access. Use one of those names.
- **No device named ... was found**: use the device name shown under *Devices > Device Management*, in the same domain as the enrollment.
- **Is a SCEP (or other) enrollment**: the task only replaces PKCS12 enrollments. Use a new *Certificate Enrollment* name, and the task adds a PKCS12 enrollment.
- **Was replaced, but installing it failed**: the enrollment has the new certificate, but the device named in the error doesn't have it yet. The error says why. Fix the cause, then run the task again, or re-enroll the certificate under *Devices > Certificates*.
- **Could not connect**: check Certify can reach the management center over HTTPS. If it uses a self-signed certificate, enable *Allow Untrusted Management Center Certificate*.
