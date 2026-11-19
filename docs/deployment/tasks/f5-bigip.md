---
id: f5-bigip
title: Deployment Task - F5 BIG-IP
---

:::info
The *Deploy to F5 BIG-IP* task is currently under development and information here relates to an unreleased/beta feature.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to F5 BIG-IP* task adds or updates a named SSL certificate, key and certificate chain on an F5 BIG-IP using the iControl REST API.

Existing objects are updated in place, so any client SSL profiles that use them pick up the renewed certificate automatically. You don't need to change the profiles after each renewal.

## Before you start

On the BIG-IP:

- Create a user for Certify (recommended). A user with the *Administrator* role works on all versions. Other roles, such as *Certificate Manager*, may not be allowed to use the REST API or to remove the uploaded files, depending on the BIG-IP version. Local and remote (LDAP, RADIUS, TACACS+) users can sign in, as the task signs in for a token.
- Note the management address of the BIG-IP, e.g. `https://192.168.1.245` or `https://bigip.example.com:8443`.
- For an HA pair or cluster, use the address of the active device, and note the name of the device group to sync to (unless the group syncs automatically).
- The task works in the `Common` partition only.

## Setting up the task

1. Add the *Deploy to F5 BIG-IP* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: a *Username and Password* credential for the BIG-IP user. Select *New* to add one.
   - **BIG-IP Address**: the management URL of the BIG-IP.
   - **Certificate Name**: the name the SSL certificate and key have, or will have, on the BIG-IP, e.g. `www.example.com`. The certificate and key share this name, and the intermediate chain is stored as a certificate named `<name>_chain`. Names must start with a letter or underscore, and can contain letters, numbers, `.`, `-` and `_`.
   - **Save Configuration**: on by default. The task saves the running configuration afterwards so the change survives a restart. This also saves any other unsaved changes on the BIG-IP, so turn it off if you prefer to save the configuration yourself.
   - **Sync to Device Group**: optional. For an HA pair or cluster, the device group to sync the configuration to afterwards, e.g. `failover-group`. Leave it blank if the group syncs automatically, or if you sync manually.
   - **Allow Untrusted BIG-IP Certificate**: enable this if the BIG-IP still uses its default self-signed management certificate.
3. Save, then run the task with the ▶️ play button.
   - If the certificate doesn't exist yet, it is added. Select the certificate, key and `<name>_chain` chain in your client SSL profiles once.
   - If it already exists, it is updated and the client SSL profiles keep using it.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task signs in for a token, which it removes again when it finishes.
- The private key, certificate and intermediate chain are uploaded to `/var/config/rest/downloads` under random names.
- The key, certificate and chain objects are then added or updated together in a single transaction. Client SSL profiles never see a new certificate with the old key (or the other way round), and if any part fails, nothing changes.
- The uploaded files are removed, so the private key isn't left on the BIG-IP outside its key store. If the user isn't allowed to remove them, the task logs a warning naming the files, so you can remove them yourself.
- The configuration is saved, if *Save Configuration* is on, then synced to the device group, if one is set.
- When the task is previewed or validated, it signs in to the BIG-IP and checks which objects already exist, without changing anything. This catches wrong credentials or addresses before a renewal depends on them.

## Troubleshooting

- **Access denied**: check the username and password, and that the user's role allows using the REST API and managing SSL certificates.
- **Unexpected response**: check the BIG-IP Address points to the BIG-IP management interface.
- **Could not connect**: check Certify can reach the management address and port. If the BIG-IP uses a self-signed management certificate, enable *Allow Untrusted BIG-IP Certificate*.
- **Could not remove uploaded file**: the certificate was deployed, but the named files were left in `/var/config/rest/downloads`. One contains the private key, so remove it, and give the user a role that can run `unix-rm` through the REST API.
- **Saving the configuration failed**: the new certificate is in use, but will be lost when the BIG-IP restarts unless the configuration is saved.
- **Syncing to device group failed**: the new certificate is in use on the device Certify connected to, but not yet on the other devices in the group. Check the device group name, then sync it from the BIG-IP.
