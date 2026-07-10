---
id: service-user-migration
title: Change the Background Service User (Windows)
slug: /service-user-migration
description: Safely migrate the Certify background service from Local System to a service account while preserving encrypted settings.
---

By default, the Certify background service runs as **Local System**. If you need full Windows network/domain impersonation for PowerShell tasks, migrate the service to a local or domain account in the local **Administrators** group.

You cannot safely change only the service logon user. Stored encrypted items are bound to the current service identity, so a migration and re-import process is required.

## When to use this

Use this process when you need:

- Full Impersonation (or Full Impersonation with Profile) in PowerShell task execution
- Better compatibility with network-enabled processes, remoting, or domain-integrated access under a specific user identity

## Service User Migration Steps

1. Backup `C:\ProgramData\Certify`.
2. Ensure the target service account is in the local **Administrators** group.
3. Ensure the target service account has full control of `C:\ProgramData\Certify` and subfolders.
4. In Certify, export your current settings using **Settings > Import & Export > Export**.
5. Change the Windows service logon user for the Certify background service.
6. Restart the service, confirm it starts cleanly, then reopen the app.
7. Re-import settings using **Settings > Import & Export > Import** with overwrite.
8. Test renewals, deployment tasks, and stored credentials (for example DNS provider credentials and zone lookup tests).

## Important Notes

- Certificate store updates and IIS binding updates require elevated permissions. If the service account lacks required rights, renewals can fail.
- Stored credential access depends on Windows DAPI under the service identity. Re-importing after migration is expected.
- Validate this process in a staging/non-production environment first.

After migration, you can use **Full Impersonation** modes in PowerShell script tasks with improved compatibility for network access and remoting scenarios.
