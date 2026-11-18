---
title: Migrate from other ACME clients
description: Move certificates renewed by win-acme, simple-acme, certbot, acme.sh or Posh-ACME into Certify, with a preview of what maps, a test before anything changes in the source, cut over, roll back and removal of the source renewal.
---

# Migrate from other ACME clients

Certificates that an instance monitors in win-acme, simple-acme, certbot, acme.sh or Posh-ACME can be moved into Certify one at a time, or several at once. The source renewal keeps running until you choose to cut over, and can be restored until you remove it.

Migration runs on the instance that monitors the certificate (Certify Certificate Manager or Management Agent). Secrets the source holds are read there at import and stored as credentials on that instance. They are never sent to the Hub or shown in the preview.

## Stages

| Stage | What happens | The source |
| --- | --- | --- |
| **Preview** | Reads the renewal and shows what would be created, with each setting marked as mapped, assumed, needing input, or blocking. | Unchanged |
| **Import** | Creates the managed certificate with auto renewal off. Allowed only when nothing blocks, every input is chosen and any assumptions are accepted. | Unchanged, still renews |
| **Test** | Runs the validation and deployment checks for the new item. | Unchanged, still renews |
| **Cut over** | Disables the source renewal and turns on auto renewal here. Needs a passing test. See [how each client is disabled](#how-each-client-is-disabled). | Renewal disabled |
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

DNS alias (challenge delegation) settings in the source block import. Set up a challenge delegation on the item instead.

### certbot

| certbot setting | In Certify |
| --- | --- |
| `webroot` | HTTP validation to the same folder, per domain from `webroot_map`. |
| `standalone` | HTTP validation by the instance's own challenge server, on the same port. |
| `nginx` and `apache` authenticators | HTTP validation by the challenge server, with a finding to change it to a folder the web server serves, or to DNS, as the web server holds port 80. |
| `dns-*` plugins | The equivalent DNS provider, with credentials read from the plugin's credentials file at import. `dns-route53` uses the machine's AWS credentials, so the preview asks for a stored credential. |
| `manual` with an auth hook | DNS validation by script, running the same hooks with the `CERTBOT_*` values they expect. |
| `cert`, `chain`, `fullchain` and `privkey` files | Export tasks writing the same files, so services reading `live/` keep working. |
| `deploy_hook`, `renew_hook`, `post_hook` and `renewal-hooks/deploy` and `post` scripts | PowerShell deployment tasks running each command, given `RENEWED_LINEAGE` and `RENEWED_DOMAINS`. |
| `nginx` and `apache` installers | A task reloading the web server. |
| `renew_before_expiry` | Offered as the renewal interval. |
| Account | Read from `accounts/`. |

Pre hooks are not migrated.

### acme.sh

| acme.sh setting | In Certify |
| --- | --- |
| Webroot path, standalone, ALPN | HTTP validation to the same folder, the challenge server, or TLS-ALPN (which blocks import). |
| `dns_*` APIs | The equivalent DNS provider, with the saved values read from the domain's conf or `account.conf` at import. `dns_acmedns` registrations and `dns_nsupdate` TSIG keys are copied. |
| Installed files (`--install-cert`) | Export tasks writing the same files. A certificate not installed anywhere gets a finding, as acme.sh's own copies are no longer updated. |
| Reload command and renew hook | PowerShell deployment tasks running the same command, given `CERT_PATH` and the other paths. |
| Deploy hooks (`--deploy-hook`) | Not migrated. Add a deployment task doing the same before cut over. |
| Account | Read from the `ca` folder of the certificate's ACME server. |

An ECC certificate and an RSA certificate for the same domain are listed and migrated separately.

### Posh-ACME

| Posh-ACME setting | In Certify |
| --- | --- |
| `WebRoot` and `WebSelfHost` plugins | HTTP validation to the same folder, or the challenge server on the same port. |
| `Cloudflare`, `Route53`, `Azure` and `AcmeDns` plugins | The equivalent DNS provider. |
| Other DNS plugins | The same Posh-ACME plugin, which Certify runs itself, with the same arguments. |
| `Install` | The Local Machine certificate store. |
| Account | Read from the account's `acct.json`. |

Posh-ACME renews from a script or scheduled task you set up (`Submit-Renewal`). Anything that script does with the new certificate is not visible to the preview, so add deployment tasks doing the same before cut over.

### Secrets

Secrets are read from the source at import and never shown in the preview.

- **win-acme and simple-acme:** the renewal, `settings.json`, `secrets.json` or environment variables. A secret protected with Windows data protection can only be read on the same machine, by a service running as an administrator or Local System. A secret win-acme gets by running a script is not read.
- **certbot:** the DNS plugin's credentials file.
- **acme.sh:** the values it saved in the domain's conf or `account.conf`.
- **Posh-ACME:** the order's `pluginargs.json`. Secure values encrypted with the account's own key (`Set-PAAccount -UseAltPluginEncryption`) are read anywhere. Values encrypted with Windows data protection can only be read by the user who ran Posh-ACME, so either switch the account to its own key and preview again, or choose a stored credential. A key kept in a SecretManagement vault cannot be read.

An AWS IAM role, Azure managed identity or other ambient sign in cannot move. Where a secret cannot be read, the preview asks for a stored credential to use instead.

Generated wrapper scripts are written under `scripts\migrated` in the instance's data folder.

## How Each Client is Disabled

| Client | Cut over | Monitoring after cut over |
| --- | --- | --- |
| win-acme, simple-acme | Renames the renewal file to `.renewal.json.certify-migrated`. | No longer listed. |
| certbot | Sets `autorenew = False` in the lineage's renewal conf, noting the previous value so roll back restores it. | Still listed, marked as handed over. |
| acme.sh | Renames the domain's conf to `.conf.removed`, as `acme.sh --remove` does. | No longer listed. |
| Posh-ACME | Renames the order's `order.json` to `order.json.certify-migrated`. | No longer listed. |

win-acme, simple-acme, certbot and acme.sh must not be running while their files change. If one is, cut over, roll back or removal fails and can be retried once it has finished.

## What Removal Deletes and Keeps

Removal deletes only the migrated certificate's own files:

| Client | Deleted | Kept |
| --- | --- | --- |
| win-acme, simple-acme | The renewal file and that renewal's cached certificates and keys. | The account, `settings.json`, `validation.json` and `secrets.json`, and the scheduled task. |
| certbot | The renewal conf and archived files the `live/` files do not link to. | `live/` and the files it links to, accounts, `cli.ini`, credentials files, hooks, and the systemd timer or cron job. |
| acme.sh | The domain folder. | Installed files, `account.conf`, the `ca` folder and the cron job. |
| Posh-ACME | The order folder. | The account and its other orders. |

Certificates already installed in stores, exported files and IIS bindings are kept, as the migrated certificate now maintains them. acme-dns registrations are kept.

Secrets shared with other renewals, such as win-acme's `secrets.json`, certbot credentials files or acme.sh's `account.conf`, therefore stay on disk after removal. Remove them yourself once nothing uses them.

## Read Next

- [Hub operations: external certificate manager monitoring](operations.md#external-certificate-manager-monitoring)
- [Import, export, and migration](import-export-and-migration.md)
