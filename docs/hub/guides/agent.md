---
title: Certify Management Agent (Linux, macOS)
---

## Scope

*Certify Management Agent* is a service for Linux or macOS that can perform certificate renewals and deployment tasks, or monitor renewals managed by external certificate managers such as Certbot, acme.sh, win-acme/simple-acme, and Posh-ACME. Functionally, it is similar to [Certify Certificate Manager](ccm.md) on Windows, but without a desktop UI.

## Installation

See the [install guide](../installation/linux#certify-management-agent).

To update, run the install steps again with the latest download. To update many servers at once, see [Update with Ansible](../../guides/ansible-update.md).

## Hub Join

Joining an Agent instance to the Hub allows centralized control of instance settings, renewals, and monitoring.

Basic sequence:

1. Set up a Joining API key in the hub (one is automatically created when the hub is installed).
2. Configure the agent to join the hub (via the command line)
3. Verify that the joining has completed in the hub UI

## Instance Identity

Do not reuse cloned settings from an already joined instance. If two instances share the same joined identity, they become difficult to manage correctly.

## Security

:::warning Important

The Management Hub has full control over Agent settings, including deployment tasks that may run local code.

 **Do not join a hub you don't control or trust.**

 :::

## Join Command

By default a joining API key is created when the Hub is installed. It is available under *Settings > Security > API Access*. You need the Hub API URL, Client Id, and Client Secret.

```
curl -X POST http://127.0.0.2:9696/api/system/hub/join -H 'Content-Type: application/json' -d '{"clientId":"managedinstance_sp_01","secret":"<secret>","url":"<hub url>"}'
```

## Verification

After joining, confirm that your instance appears in the Management Hub UI's **Instances** list.

## Per-Instance Settings

Stored credentials, CA accounts, and similar items remain per-instance settings. Select the correct target instance when working with them.

## External Certificate Manager Monitoring

The Agent can monitor renewals managed by Certbot, acme.sh, win-acme/simple-acme, and Posh-ACME.

Configure the paths under *Settings > General > External Certificate Managers* for the selected target instance. The system attempts discovery using default paths. Log paths are only needed where logs are stored separately, such as Certbot.

| Cert Manager | Config paths tried when none is configured, in order | Default Log Path |
|---|---|---|
| acme.sh | `$LE_WORKING_DIR`, then `~/.acme.sh`. On Windows, `C:\acme.sh` or `%PROGRAMDATA%\acme.sh` | The config path |
| certbot | `/etc/letsencrypt`. On Windows, `C:\Certbot` | `/var/log/letsencrypt`. On Windows, `C:\Certbot\log` |
| posh-acme | `$POSHACME_HOME`, then `~/.config/Posh-ACME`. On Windows, `%LOCALAPPDATA%\Posh-ACME` | - |
| simple-acme | On Windows, the `Client.ConfigurationPath` set in the `settings.json` beside `wacs.exe` (found through its scheduled task), then `%PROGRAMDATA%\simple-acme`. On Linux, `/usr/share/simple-acme`, then `~/.local/share/simple-acme` | The `Log` folder under the config path |
| win-acme | As simple-acme, with `win-acme` in place of `simple-acme` | The `Log` folder under the config path |

Paths starting with `~` are tried for the account the service runs as. For acme.sh, Posh-ACME and simple-acme, the same folder in other users' home folders is also tried, but only if exactly one user has it. If several users do, configure the path you want monitored.

A win-acme or simple-acme renewal that is split by host, domain or site is listed as one item per certificate.

The service account must have read access to the relevant paths.

The Agent caches results and refreshes them periodically, so changes can take a few minutes to appear in the Hub UI.

## Service Commands

For systemd-based installs:

|Task|Command|
|---|---|
|Restart the Service | `sudo systemctl restart certify-agent` |
|Check systemd log | `journalctl -u certify-agent` |
|Follow current log | `journalctl -u certify-agent -f` |
