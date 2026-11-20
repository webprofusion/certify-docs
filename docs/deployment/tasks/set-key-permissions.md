---
id: set-key-permissions
title: Set Certificate Key Permissions
sidebar_label: Set Key Permissions
description: Grants an account read or full control access to the stored certificate's private key.
---

The *Set Certificate Key Permissions* task grants a Windows account access to the private key of the certificate stored on the server running Certify. This isn't usually needed, but some services running as their own account need read permission on the private key before they can use the certificate.

The task works with the Windows local machine certificate store, so it is Windows only. It runs as the Certify background service.

## Before you start

- The certificate must already be in the local machine *Personal* (`My`) or *Web Hosting* store. Certify's auto deployment stores it in *Personal* by default.
- Note the account the service using the certificate runs as, e.g. `NT AUTHORITY\NETWORK SERVICE`.

## Setting up the task

1. Add the *Set Certificate Key Permissions* task under *Tasks* for your managed certificate. Place it after any task that stores the certificate.
2. Under *Task Parameters*, set:
   - **Account To Allow** (required): the account to grant access to, as an account name such as `DOMAIN\name`, or as a SID starting with `S-1-`. The default is `NT AUTHORITY\LOCAL SERVICE`.
   - **Permission To Grant**: *Read* (the default) or *Full Control*.
3. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued. The permission is set on the stored key of the current certificate only, so the task needs to run for each renewed certificate.

## How it works

- The task finds the current certificate by thumbprint, first in the local machine *Personal* store, then in *Web Hosting*.
- It finds the private key file for the certificate, then adds an allow rule for the account to the file's permissions.
- If the account already has the requested access, the key is left unchanged and the task reports success.
- When the task is previewed, it checks an account has been entered. Nothing is changed.

## Troubleshooting

- **An account is required**: enter a value for *Account To Allow*.
- **There is no current certificate for this managed certificate**: request the certificate first.
- **Certificate ... was not found in the machine certificate store**: the certificate isn't in the *Personal* or *Web Hosting* store. Check auto deployment stores it, or add a [Deploy to Certificate Store](./certificate-store.md) task before this one.
- **Failed to update certificate private key permissions**: the account name couldn't be resolved, the private key file couldn't be found, or its permissions couldn't be changed. The task log has the details.
