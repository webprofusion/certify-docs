---
title: Certify Management Agent (Linux, macOS)
---

## Summary

The *Certify Management Agent* is a service which can be use on Linux or macOS to perform certificate renewals and deployment tasks, or to monitor renewals managed by external certificate managers (including Certbot, acme.sh, win-acme/simple-acme and Posh-ACME). The agent is functionally the same as [Certify Certificate Manager](ccm.md) on Windows, but without a Desktop UI.

## Installation and Upgrades

See our [install guide](../installation/linux#certify-management-agent) for details installing and upgrading.

## Joining the Management Hub

Joining your existing *Certify Management Agent* instance to a Management Hub allows you to control the instance settings, renewals and monitoring.

The basic steps are:

1. Set up a Joining API key in the hub (one is automatically created when the hub is installed).
2. Configure the agent to join the hub (via the command line)
3. Verify that the joining has completed in the hub UI

## Before Joining the Hub

### Security Considerations

:::warning Important

The Management Hub will have complete control over the Certify Management Agent instance settings, including the ability to specify deployment tasks which may include locally executed code (PowerShell etc).

 **Do not join a hub you don't control or trust.**

 :::

## Joining the Hub

By default a joining API key is created when you install the hub. This is found under *Settings > Security > API Access*. You will need the API URL (e.g. `https://hub.internal.yourdomain.com:9697` depending on your configuration), Client Id and Client Secret values.

```
curl -X POST http://127.0.0.2:9696/api/system/hub/join -H 'Content-Type: application/json' -d '{"clientId":"managedinstance_sp_01","secret":"<secret>","url":"<hub url>"}'
```

## Verification

After joining, confirm that your instance appears in the Management Hub UI's **Instances** list.

## Using the Hub to manage the agent

When you are working with individual settings such as Stored Credentials, Certificate Authority accounts etc these remain per-instance settings, so each instance of the app has it's own set of settings and you will selected the target 
instance when working with those. 

### Monitoring External Certificate Managers

The agent can provide monitoring of renewals that are managed by a selected number of ACME certificate management tools including Certbot, acme.sh, win-acme/simple-acme and Posh-ACME.

With your agent installed on your target machine and joined to the hub, configure the paths for your chosen certificate manager under *Settings > General > External Certificate Managers*, ensuring to select your target instance from the Target Instance dropdown list at the top the page. By default the system will attempt to discover existing config using the default paths. Configuration of log paths is only required where logs are stored separately from the other config (e.g. Certbot).

| Cert Manager  | Default Config Path  | Default Log Path  |
|---|---|---|
| acme.sh  | ~/.acme.sh/ |  - |
| certbot  | /etc/letsencrypt | /var/log/letsencrypt  |
| posh-acme  | %APPDATA%\Local\Posh-ACME  | -  |
| simple-acme  | %PROGRAMDATA%\simple-acme | -  |
| win-acme  | %PROGRAMDATA%\simple-acme |  - |

The user account the agent service runs as **will need permission to read** from whichever paths are required in your installation, otherwise it will fail to discover the certificate configurations etc.

The agent will cache results from each certificate manager and periodically refresh results, so changes to renewals etc will take a few minutes to show up in the hub UI.