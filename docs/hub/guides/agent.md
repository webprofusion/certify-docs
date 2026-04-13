---
title: Certify Management Agent (Linux, macOS)
---

## Scope

*Certify Management Agent* is a service for Linux or macOS that can perform certificate renewals and deployment tasks, or monitor renewals managed by external certificate managers such as Certbot, acme.sh, win-acme/simple-acme, and Posh-ACME. Functionally, it is similar to [Certify Certificate Manager](ccm.md) on Windows, but without a desktop UI.

## Installation

See the [install guide](../installation/linux#certify-management-agent).

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

| Cert Manager  | Default Config Path  | Default Log Path  |
|---|---|---|
| acme.sh  | ~/.acme.sh/ |  - |
| certbot  | /etc/letsencrypt | /var/log/letsencrypt  |
| posh-acme  | %APPDATA%\Local\Posh-ACME  | -  |
| simple-acme  | %PROGRAMDATA%\simple-acme | -  |
| win-acme  | %PROGRAMDATA%\simple-acme |  - |

The service account must have read access to the relevant paths.

The Agent caches results and refreshes them periodically, so changes can take a few minutes to appear in the Hub UI.

## Service Commands

For systemd-based installs:

|Task|Command|
|---|---|
|Restart the Service | `sudo systemctl restart certify-agent` |
|Check systemd log | `journalctl -u certify-agent` |
|Follow current log | `journalctl -u certify-agent -f` |
