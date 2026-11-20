---
id: certificate-store
title: Deploy to Certificate Store (Local Machine)
sidebar_label: Certificate Store
description: Stores the certificate in a local machine Windows certificate store, optionally with a custom friendly name.
---

The *Deploy to Certificate Store (Local Machine)* task imports the certificate and its private key into the Windows local machine certificate store, in the store and with the friendly name you choose.

This task is deprecated and isn't normally needed. Certify's standard auto deployment already stores each certificate in the local machine *Personal* (`My`) store. Use this task only if you need the certificate in the *Web Hosting* store, or with a custom friendly name, or if auto deployment is set to *No Deployment* (which doesn't store the certificate).

New tasks of this type are named *Store Certificate* by default.

## Setting up the task

1. Add the *Deploy to Certificate Store (Local Machine)* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Store** (required): *Default* or *Personal (My)* stores the certificate in the *Personal* store. *Web Hosting* stores it in the *Web Hosting* store.
   - **Custom Friendly Name**: optional. The friendly name to give the certificate in the store. If you leave it blank, the friendly name is `<primary domain> [Certify] - <valid from> to <valid to>`, the same format auto deployment uses.
3. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task runs on the Windows server running Certify, as the Certify background service, so it only offers the *Local (as current service user)* target. Older tasks set to use a credential still run as the background service, and log a warning that the credential is not used.
- It loads the managed certificate's PFX file, using the PFX password if one is set (*Certificate > Advanced > Signing & Security*), and imports the certificate with its private key into the chosen local machine store.
- It imports the certificate a second time, then checks the stored certificate and its private key can be read. This works around a Windows issue where a key imported by the system account can be transient.
- It follows the *Store Certificate Intermediates* and *Windows Private Key Storage Provider* settings, like auto deployment does.
- When the task is previewed, it checks the store name is valid and reports the store it would use, e.g. *Would store certificate in Local Certificate Store [webhosting]*. Nothing is stored.

## Troubleshooting

- **Invalid Certificate Store Name**: the *Store* value is not one of *Default*, *Personal (My)* or *Web Hosting*.
- **Error storing certificate :: Certificate not found in store!** or **Certificate Private key not available.**: the import didn't complete, or the private key couldn't be read after import. Check the task log, and that the service account can write to the local machine certificate store.
