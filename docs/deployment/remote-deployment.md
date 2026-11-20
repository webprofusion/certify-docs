---
id: remote-deployment
title: Strategies for Remote Deployment
sidebar_label: Remote deployment strategies
description: Ways to deploy a certificate to a server other than the one running Certify.
---

The simplest way to keep a certificate up to date on a server is usually to run Certify on that server. When that isn't possible or practical, these approaches let one Certify instance deploy to other machines.

:::tip
With [Certify Management Hub](../hub/index.md) you can also run a Certify instance on each server, joined to the Hub, and manage them all from one place.
:::

## Linux and other SSH targets

1. Add a task that copies the files you need over SSH/SFTP, such as [Deploy to Generic Server](./tasks/generic-server.md), [Deploy to Apache](./tasks/apache.md), [Deploy to nginx](./tasks/nginx.md) or [Export Certificate](./tasks/export-certificate.md).
2. Add a [Run a Program or Script](./tasks/run-script.md) task, also over SSH, to reload the services that use the certificate.

## Windows

### PowerShell with network impersonation

A [PowerShell script task](./tasks/powershell.md) can work on a remote machine by running as an account with the permissions it needs, using the *Network* logon type. This doesn't suit every script: some can't be impersonated well enough, for example scripts that start new processes. See [PowerShell Support and Execution Modes](../guides/powershell-support.md).

### Export to a share, then deploy with a scheduled task

When a remote script won't work, copy the certificate to the target server and let a scheduled task on that server deploy it:

1. Add an [Export Certificate](./tasks/export-certificate.md) task that copies the PFX to a temporary location on the target, such as a UNC share.
2. On the target server, write a script that looks for the PFX file and, if it is there:
   - runs your deployment steps using the file,
   - deletes the file, so the next run does nothing until a renewal exports a new one,
   - reports any error, for example in a log or a notification.
3. Schedule the script with Windows Task Scheduler, running regularly (hourly, daily or in a maintenance window) as an account with the permissions it needs.

Because the script only acts when the file exists, the deployment only runs after a renewal.
