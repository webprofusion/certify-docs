---
id: netscaler
title: Deployment Task - NetScaler ADC
---

The *Deploy to NetScaler ADC* task adds or updates a named certificate-key pair on a NetScaler ADC (formerly Citrix ADC) using the NITRO API.

An existing certificate-key pair is updated in place, so any virtual servers bound to it pick up the renewed certificate automatically. You don't need to rebind it after each renewal.

## Before you start

On the NetScaler:

- Create a user for Certify (recommended) whose command policy allows managing SSL certificate-key pairs (`ssl certKey`), uploading and deleting files (`system file`) and, if you want the task to save the configuration, `save ns config`.
- Note the management address (NSIP) of the NetScaler, e.g. `https://192.168.1.10`. For an HA pair, use the address of the primary node, or a management address that always reaches the primary.
- The task works in the default admin partition only.

## Setting up the task

1. Add the *Deploy to NetScaler ADC* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Username and Password* credential for the NetScaler user. Select *New* to add one.
   - **NetScaler Address**: the management URL of the NetScaler.
   - **Certificate-Key Pair Name**: the name the certificate-key pair has, or will have, on the NetScaler, e.g. `www_example_com`. Names must start with a letter, number or underscore, and can contain letters, numbers, spaces and `_ # . : @ = -`, up to 63 characters. Older NetScaler versions allow only 31 characters.
   - **Save Configuration**: on by default. The task saves the running configuration afterwards so the change survives a restart. This also saves any other unsaved changes on the NetScaler, so turn it off if you prefer to save the configuration yourself.
   - **Allow Untrusted NetScaler Certificate**: enable this if the NetScaler still uses its default self-signed management certificate.
3. Save, then run the task with the ▶️ play button.
   - If no certificate-key pair with that name exists yet, it is added. Bind it to your virtual servers on the NetScaler once.
   - If it already exists, it is updated and the virtual servers keep using it.

Renewals run the task automatically after the new certificate is issued.

## How it works

- Intermediate certificates from the certificate chain are uploaded to `/nsconfig/ssl` and added as their own certificate-key pairs first, if they are not already there. They are named `certify-ca-<start of thumbprint>`. If the NetScaler rejects one (for example because the same intermediate is already installed under another name), the task logs a warning, carries on, and leaves any existing link for that certificate in place.
- The certificate and its private key are uploaded to `/nsconfig/ssl` as new files, named after the certificate-key pair with a timestamp, e.g. `www_example_com-20261113-101500123.crt`. The files in use are never overwritten.
- The certificate-key pair is then updated to use the new files, or added if it doesn't exist yet.
- The certificate is linked to its intermediate, and each intermediate to its own issuer, so clients receive the full chain. An existing link to a different issuer is replaced.
- The configuration is saved, if *Save Configuration* is on.
- Files that the task uploaded for the previous certificate are then deleted. Files with other names (for example ones you uploaded yourself before using Certify) are left alone.
- When the task is previewed or validated, it signs in to the NetScaler and checks which certificate-key pairs already exist, without changing anything. This catches wrong credentials or addresses before a renewal depends on them.

On an HA pair, new files in `/nsconfig/ssl` and configuration changes made on the primary are synchronised to the secondary node by the NetScaler.

## Troubleshooting

- **Access denied**: check the username and password, and that the user's command policy allows the commands listed under *Before you start*.
- **Unexpected response**: check the NetScaler Address points to the NetScaler management interface (NSIP).
- **Could not connect**: check Certify can reach the management address. If the NetScaler uses a self-signed management certificate, enable *Allow Untrusted NetScaler Certificate*.
- **Could not be linked to its issuer**: the certificate itself was updated, but clients may not receive the full chain. Check the certificate-key pair's links on the NetScaler.
- **Saving the configuration failed**: the new certificate is in use, but will be lost when the NetScaler restarts unless the configuration is saved. Check the user is allowed to run `save ns config`.
