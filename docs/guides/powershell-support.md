---
id: powershell-support
title: PowerShell Support and Execution Modes
slug: /powershell-support
description: How Certify runs PowerShell-based tasks on Windows and Linux, including Automatic, In Process, and System PowerShell modes.
---

This page describes how PowerShell-based tasks are hosted in *Certify Certificate Manager*, *Certify Management Agent*, and *Certify Management Hub*, including the [*Run a PowerShell Script*](../script-hooks.md) task and most built-in tasks which rely on PowerShell internally.

## Overview

These products can use either system PowerShell, when available, or an in-process hosted PowerShell. By default, tasks run as the current service user.

These PowerShell execution modes are currently supported:

| Mode | What it does | Typical use |
| --- | --- | --- |
| Automatic | Uses system PowerShell where available, then falls back to the embedded in-process host when no suitable system host is available. On Windows this typically means Windows PowerShell 5.1. On Linux this typically means the embedded host. | Recommended default for most tasks. |
| In Process | Runs the embedded PowerShell 7 host inside the current Certify service process. | Use when you want consistent PowerShell 7 behavior without depending on the machine's local PowerShell installation. |
| System PowerShell | Starts a separate PowerShell process provided by the operating system. | Use when your script depends on system-installed modules or host-specific behavior. |

If you enable *Settings > General > Service Config > Prefer Modern PowerShell* for your chosen instance, the app will prefer PowerShell 7 where available when launching System PowerShell.

## Automatic Mode

*Automatic* mode is used by default for the *Run a PowerShell Script* task and for most built-in tasks which use PowerShell internally.

On Windows, *Automatic* uses the system PowerShell host by default. This typically means Windows PowerShell 5.1.

On platforms where no suitable system PowerShell host is available, *Automatic* falls back to the embedded in-process PowerShell 7 host. This is the normal behavior for Linux-based installs.

## In Process Mode

*In Process* runs the embedded PowerShell 7 runtime inside the current Certify service process.

Use this mode when you want predictable PowerShell 7 behavior regardless of what is installed on the machine, or when you want to avoid relying on a separate system shell.

This is the closest equivalent to the older embedded-host model, except the embedded engine is now PowerShell 7 rather than embedded Windows PowerShell 5.1. PowerShell 5.1 is no longer available as an embedded option because it depends on a much older .NET runtime than the app uses. 

A major consideration is that system PowerShell modules loaded in PS 5.1 are *not* necessarily loaded by default. For example if you require any **Cim**Cmdlets you need to load the module at the start of your script (after *params*) and for older modules you also need to skip the check for compatible powershell version e.g.:

`Import-Module -Name CimCmdlets -SkipEditionCheck`

A good way to tell if a module is available by default in PowerShell 7 is to launch a PowerShell 7 system command prompt and try your commands there. Most modules are not imported by default.

## System PowerShell Mode

*System PowerShell* launches an external PowerShell process provided by the operating system.

Use this mode when your script depends on system-installed modules, Windows-only cmdlets, or behavior which differs between Windows PowerShell 5.1 and PowerShell 7.

## Impersonation and Compatibility

The choice of execution mode can significantly affect compatibility when a task runs using specific credentials or user credential impersonation. Impersonation is currently only supported on Windows.

Differences between modes can affect:

* which PowerShell version and module set are available
* how Windows logon tokens are applied
* whether child processes inherit the expected identity and environment
* access to network resources, remote shares, and Windows-integrated authentication

On Windows, the service is installed as Local System by default. That limits the type and extent of user impersonation available. If you need fuller user impersonation, you may need to run the service as a different user. That usually requires a service migration, including re-encryption of stored credentials, so it is best planned during the initial install.

If your deployment depends on impersonation, network access, launching other processes, or Windows-specific modules, validate the exact task under the same background service context and credentials you use in production.

Not every workflow will behave reliably under impersonation. If required, a staged approach is often more dependable: export the certificate or write the required values to a known location, then complete the final deployment step using your own scheduled task, watcher process, or service running in the target environment.

## PowerShell Execution Policies

PowerShell execution policies may be set by your administrator, which can affect script execution on Windows. The app tries to set the policy to `Unrestricted` by default, but that may conflict with higher-level policy settings.

You can set the default script execution policy in `%PROGRAMDATA%\Certify\serviceconfig.json`, then restart the Certify background service:

* `"PowershellExecutionPolicy":"Unrestricted"`
* `"PowershellExecutionPolicy":"Bypass"`
* `"PowershellExecutionPolicy":""` to use the default policy set by your administrator

## Recommended Approach

1. Start with *Automatic* unless you already know you need a specific host.
2. Switch to *System PowerShell* when you require system-installed Windows modules or host-specific behavior.
3. Switch to *In Process* when you want consistent embedded PowerShell 7 behavior across environments.
4. If you use impersonation, test with the real background service and target credentials rather than relying on interactive UI testing alone.

## Quick Diagnostics

If you need to confirm which host is being used, add temporary logging like the following to your script:

```PowerShell
param($result)

Write-Output ("PowerShell version: " + $PSVersionTable.PSVersion)
Write-Output ("Edition: " + $PSVersionTable.PSEdition)
Write-Output ("PSHOME: " + $PSHOME)
Write-Output ("User: " + [System.Environment]::UserName)
```

This makes it easier to confirm whether the task is running under Windows PowerShell 5.1, PowerShell 7, the system host, or the embedded in-process host.

For script examples and general scripting guidance, see [Scripting](../script-hooks.md).