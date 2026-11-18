---
title: Migrate from win-acme and simple-acme
description: Move certificates renewed by win-acme or simple-acme into Certify, with a preview of what maps, a test before anything changes in the source, cut over, roll back and removal of the source renewal.
---

# Migrate from win-acme and simple-acme

Certificates that an instance monitors in win-acme or simple-acme can be moved into Certify one at a time, or several at once. The source renewal keeps running until you choose to cut over, and can be restored until you remove it.

Migration runs on the instance that monitors the certificate (Certify Certificate Manager or Management Agent). Secrets the source holds are read there at import and stored as credentials on that instance. They are never sent to the Hub or shown in the preview.

## Stages

| Stage | What happens | The source |
| --- | --- | --- |
| **Preview** | Reads the renewal and shows what would be created, with each setting marked as mapped, assumed, needing input, or blocking. | Unchanged |
| **Import** | Creates the managed certificate with auto renewal off. Allowed only when nothing blocks, every input is chosen and any assumptions are accepted. | Unchanged, still renews |
| **Test** | Runs the validation and deployment checks for the new item. | Unchanged, still renews |
| **Cut over** | Disables the source renewal and turns on auto renewal here. Needs a passing test. | Renewal disabled |
| **Verified** | Recorded automatically when this instance first renews the certificate after cut over. | Renewal disabled |
| **Roll back** | Restores the source renewal and turns auto renewal off here. Available after cut over. | Renewal restored |
| **Remove source** | Deletes the source renewal and its cached files, after showing exactly which files. | Renewal deleted |

Removal needs a verified migration. After cut over you can remove the source before a renewal has verified it, but only by confirming that choice. Source removal is always done one certificate at a time.

## Migrate a Certificate

1. Open the externally managed certificate in the Hub and find the **Migrate** panel, or select the item in Certificate Manager and select **Migrate to Certify** on its **Status** tab.
2. Select **Preview**. Review the findings:
   - **Mapped** settings carry over as they are. Where a setting can follow this instance's default instead, such as the key type, key reuse, preferred chain, profile or requested lifetime, choose which to use. The renewal interval follows this instance's setting unless you choose the source's.
   - **Assumptions** carry over with a change you should check, such as a default that differs.
   - **Inputs needed** ask you to choose something, usually a stored credential to use where the source's own could not be read.
   - **Blockers** prevent import. The finding says what to do, for example add a certificate authority or a DNS provider credential, then preview again.
3. Choose any inputs, tick to accept the assumptions, and select **Import**. By default the current certificate is adopted, so nothing is ordered until it is due for renewal.
4. Select **Test**, then **Cut over** once the test passes.
5. After the first renewal here, the migration shows as verified. Then select **Remove source**.

If the source renewal changes between preview and import, import is refused. Preview again.

### Several Certificates at Once

In the Hub certificate list, select the **Migrate** button in the toolbar. It lists the externally managed certificates on the current page, and imported ones still in progress. Select certificates, then **Preview**, **Import ready**, **Test** or **Cut over tested**. Certificates whose preview needs inputs or has blockers are imported from their own page.

### Renewals Split into Several Certificates

A win-acme renewal split by host, domain or site appears as one item per certificate. Each is previewed and imported separately, but because they share one renewal file they are cut over, rolled back and removed together. Import and test all of them before cutting over.

## What Migrates

| Source setting | In Certify |
| --- | --- |
| ACME server | The matching certificate authority. A server not configured here blocks import until it is added as a custom certificate authority. |
| ACME account | An existing account here for the same certificate authority is used. If there is none, the source account is imported. |
| Manual, IIS and CSR targets | Identifiers, IIS site, or the certificate request with its private key file. A certificate request created by a script blocks import. |
| Key type, key reuse, OCSP must-staple, preferred issuer, profile | The same request settings. |
| HTTP validation to a folder or self-hosted | HTTP validation to the same folder, or by the instance's own challenge server. FTP, SFTP, WebDAV and other remote HTTP validation blocks import. |
| DNS validation | The equivalent DNS provider, with its credentials stored at import. acme-dns registrations are copied. DNS scripts run through a generated wrapper. |
| TLS-ALPN validation | Not supported, blocks import. |
| Certificate store, PEM files, PFX file, IIS Central Certificate Store, Azure Key Vault | The equivalent store or deployment task. |
| IIS installation | IIS binding deployment to the same site. |
| Script installation | A PowerShell deployment task running a generated wrapper, which passes the same values the script received. |
| IIS FTP installation | Not supported, blocks import. |
| Rules in `validation.json` | Applied per identifier, as win-acme applies them. |

### Secrets

Secrets are read from the renewal, `settings.json`, `secrets.json` or environment variables. A secret win-acme protected with Windows data protection can only be read on the same machine, by a service running as an administrator or Local System. A secret win-acme gets by running a script is not read, and an AWS IAM role or Azure managed identity cannot move. In each of these cases the preview asks for a stored credential to use instead.

Generated wrapper scripts are written under `scripts\migrated` in the instance's data folder.

## What Removal Deletes and Keeps

Removal deletes the renewal file and that renewal's cached certificates and keys. It keeps:

- the win-acme account, `settings.json`, `validation.json` and `secrets.json`, which other renewals may use
- the win-acme scheduled task, which renews any remaining renewals
- certificates already installed in stores, exported files and IIS bindings, which the migrated certificate now maintains
- acme-dns registrations

Secrets in `secrets.json` therefore stay on disk after removal. Remove them yourself once no renewal uses them.

win-acme must not be running while its files change. If it is, cut over, roll back or removal fails and can be retried once it has finished.

## Read Next

- [Hub operations: external certificate manager monitoring](operations.md#external-certificate-manager-monitoring)
- [Import, export, and migration](import-export-and-migration.md)
