---
title: Maintenance and Data Locations
description: Find the key Certify Certificate Manager data locations, upgrade guidance, script storage guidance, and other recurring maintenance tasks.
displayed_sidebar: helpSupportSidebar
---

# Maintenance and Data Locations

This page covers the main data locations, upgrade behavior, script storage, and other recurring maintenance topics.

## Important Paths

- General settings and service configuration are stored under `%ProgramData%\Certify` (Windows) or `/usr/share/certify` (Linux), referred to as `<certify data>` below.
- Managed certificate logs are stored under `%ProgramData%\Certify\logs` or `/usr/share/certify/logs`.
- Certificate assets are stored under `%ProgramData%\Certify\assets` or `/usr/share/certify/assets`.

You should normally restrict access to these locations to administrators and Local System.

## Where Certificates Are Stored

For normal Windows deployments, certificates are installed into the local machine certificate store under **My/Personal**.

Certificate files created during renewals are stored under `<certify data>\assets`. The filenames change over time, so if another service depends on files directly, use a [deployment task](../deployment/tasks_intro.md) instead of pointing at a temporary asset path.

## PFX Passwords

The default PFX password is blank (`""`) unless you configure one under **Certificate > Advanced > Signing and Security**.

If many certificates need the same password, manage it centrally through stored credentials rather than editing every managed certificate separately.

## Upgrades and Reinstalls

- Settings are preserved across upgrades and reinstalls.
- Uninstalling the app does not remove `<certify data>`.
- Back up `<certify data>` as part of your normal server backup process.

If the installer reports a file-in-use warning, do not continue blindly. Close the UI, allow the service to stop, and retry. If an update was interrupted, re-run the installer.

## Where to Store Custom Scripts

Do not store custom scripts under `%ProgramFiles%\CertifyTheWeb` because application upgrades can remove or overwrite files in that location.

Use a dedicated path such as `C:\Scripts` or `<certify data>\scripts` instead.

## Multi-Server Contact Email

The same CA account contact email can be used across multiple servers if that suits your operations model. The email address associated with a certificate order stays with that order until it expires.

## CA Expiry Notices After Changes

If a CA emails to say a certificate is about to expire but your current managed certificate looks healthy, you may have changed the domain set on the certificate in the past. In that case the CA may be warning about an older order rather than the current one.

## Next Docs to Read

- [Monitor renewals and alerts](../renewals.md)
- [Troubleshooting](troubleshooting.md)
- [Deployment tasks](../deployment/tasks_intro.md)