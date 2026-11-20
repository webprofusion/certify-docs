---
id: powershell
title: Run a PowerShell Script
sidebar_label: PowerShell Script
description: Run your own PowerShell script before or after a certificate request, with details of the request passed to the script.
---

The *Run Powershell Script* task runs a PowerShell script file you provide. Use it for deployment steps the built-in tasks don't cover, such as applying the certificate to another service, calling an API, or sending a notification.

This page covers the task settings. For writing scripts (the `$result` object, warnings and failures, more examples) see [PowerShell Scripting](../../script-hooks.md). For how PowerShell is hosted, which version runs your script, and impersonation, see [PowerShell Support and Execution Modes](../../guides/powershell-support.md).

## Before you start

- Save your script as a `.ps1` file in a folder of your own. Don't keep it under the app installation folder (e.g. `C:\Program Files\CertifyTheWeb`), as app updates replace the files there and your changes would be lost.
- By default the task runs as the Certify background service user (Local System on Windows). Make sure that account can read the script and do what the script does, or set up the task to run as another Windows user (see *Target Type* below).

Some example scripts (e.g. for the *Web Management Service*) are installed under `C:\Program Files\CertifyTheWeb\Scripts\Common`. To use one, copy it to your own folder first and point the task at the copy. More examples are in the [certify-script-examples](https://github.com/webprofusion/certify-script-examples) repository.

## Setting up the task

1. Add the *Run Powershell Script* task under *Tasks* for your managed certificate, either as a Pre-Request task or as a Deployment task (see [Pre-request and post-request use](#pre-request-and-post-request-use)).
2. Under *Task Parameters*, choose the *Target Type*:
   - **Local (as current service user)**: run the script as the Certify background service user.
   - **Local (as specific user)** or **Windows (Network)**: run the script as the Windows user in the stored *Credentials* you select (domain, username and password). Select *New* to add one. Running as another user is only supported on Windows.
3. Set the task parameters:
   - **Program/Script** (required): the full path to the `.ps1` file, e.g. `C:\Scripts\deploy-cert.ps1`. Quotes around the path are removed.
   - **Pass Result as First Arg**: enabled by default. Passes the details of the certificate request to the script as the `$result` parameter. Your script needs `param($result)` to use it.
   - **Impersonation LogonType**: the Windows logon type used when the script runs as another user: *Network* (default), *New Credentials*, *Service*, *Interactive* or *Batch*.
   - **Impersonation Mode**: *Default*, *Full Impersonation* or *Full Impersonation With Profile*. *Full Impersonation* starts a new PowerShell process as the selected Windows user, and *Full Impersonation With Profile* also loads that user's profile and environment. Both need stored Windows credentials, only work on Windows, and always use a system PowerShell process whatever the *Execution Mode*.
   - **Execution Mode**: *Automatic* (default), *In-Process* or *System Process*. *Automatic* uses a system PowerShell process on Windows and the in-process PowerShell host on Linux and macOS. On Windows, *Automatic* uses in-process PowerShell when the task runs with Windows credentials.
   - **Arguments (optional)**: extra arguments for your script, in the form `arg1=value;arg2=value`. See [Passing custom arguments](#passing-custom-arguments).
   - **Script Timeout Mins.**: how long to wait for the script, from 1 to 120 minutes. Leave it blank to use the default of 5 minutes.
   - **Report Script Warnings**: if enabled, the task completes with a warning when the script writes a PowerShell warning (e.g. `Write-Warning`).
4. Save, then run the task with the ▶️ play button to test it. Ideally test after a successful certificate request, so your script has a real certificate to work with.

## Passing custom arguments

Each argument in *Arguments (optional)* is passed to your script as a named parameter, so your script needs a matching parameter for each one. For example, with *Pass Result as First Arg* enabled and these arguments:

```
siteName=Default Web Site;restart=true
```

your script would start with:

```PowerShell
param($result, $siteName, $restart)
```

- Separate arguments with `;`, and separate each name from its value with `=`. Spaces around names and values are removed.
- An argument with no `=` is passed with an empty value.
- The values `true` and `false` are passed as PowerShell booleans (`$true` and `$false`). Other values are passed as strings.
- Don't use the PowerShell `-name value` syntax. Arguments starting with `-` fail validation.

To use the special characters `;`, `=` and `\` inside a name or value, escape them with `\`:

| To pass | Write |
| --- | --- |
| `;` | `\;` |
| `=` | `\=` |
| `\` | `\\` |

For example, `key=abc\;123h;othervalue=test` passes `key` with the value `abc;123h` and `othervalue` with the value `test`.

A single `\` that isn't followed by `;`, `=` or another `\` is passed as it is, so Windows paths such as `path=C:\temp\folder` work without escaping. To end a value with `\` and follow it with another argument, write `\\` before the `;`, e.g. `path=C:\temp\folder\\;other=test` passes `path` as `C:\temp\folder\`. A `\\` anywhere in a value is passed as a single `\`, so write a UNC path such as `\\server\share` as `\\\\server\share`.

## Pre-request and post-request use

You can add this task as a Pre-Request task (it runs before the certificate is requested) or as a Deployment task (it runs after the request).

- **Pre-request**: use it for checks or preparation before the request, such as opening a firewall port. `$result.IsSuccess` is always `$false` at this point. If the task fails, the certificate request is aborted.
- **Post-request**: use it to deploy or use the new certificate. `$result.IsSuccess` tells you if the request succeeded, and `$result.ManagedItem.CertificatePath` is the path to the new PFX file. The task's *Trigger* decides whether it runs on success, on error, or only when you run it manually.

A failed post-request task marks the certificate request as failed. See [PowerShell Scripting](../../script-hooks.md) for the `$result` properties and how to report warnings and failures from your script.

## Example scripts

Write the certificate thumbprint and PFX path to a log file:

```PowerShell
param($result)

if ($result.IsSuccess) {
    $item = $result.ManagedItem
    Add-Content "C:\Scripts\cert-log.txt" ("{0} {1} {2}" -f (Get-Date), $item.CertificateThumbprintHash, $item.CertificatePath)
}
```

Restart a service passed in as an argument (*Arguments*: `serviceName=MyService`):

```PowerShell
param($result, $serviceName)

if ($result.IsSuccess) {
    Restart-Service -Name $serviceName
    Write-Output "Restarted $serviceName"
}
```

To restart a service you can also use the [Restart a Service](./restart-service.md) task instead of a script.

## How it works

- The task checks the script file exists and has a `.ps1` extension, then runs it using the selected *Execution Mode*.
- With *Local (as current service user)*, stored credentials are not used, and the script runs as the background service user.
- The `$result` object and your arguments are passed to the script as named parameters. In a system PowerShell process they are passed using a temporary payload file rather than on the command line.
- The script's output is included in the task log.
- If the script doesn't finish within *Script Timeout Mins.*, it is stopped and the task fails.
- The task fails if the script throws an error, writes an error, or exits with a non-zero exit code.
- When the task is previewed or validated, the script is not run. The settings are checked: that *Program/Script* is set, the arguments format, the timeout range, and that *Full Impersonation* has stored Windows credentials and is running on Windows.

## Troubleshooting

- **File '...' does not exist**: check the path in *Program/Script*, and that the account running the task can read it.
- **File '...' is not a powershell script**: the script file must have a `.ps1` extension.
- **Arguments must be provided in the format arg1=value;arg2=value;arg3=value**: remove any `-name value` style arguments and use `name=value` instead.
- **Timeout (Minutes) value is out of range (1-120)**: set *Script Timeout Mins.* to a whole number from 1 to 120, or leave it blank.
- **Commands credentials require a username and password**: the selected stored credentials are missing a username or password.
- **PowerShell Full Impersonation requires stored Windows credentials**: choose *Local (as specific user)* or *Windows (Network)* and select stored credentials, or set *Impersonation Mode* back to *Default*.
- **PowerShell Full Impersonation is only supported on Windows**: set *Impersonation Mode* to *Default* on Linux and macOS.
- If a script works when you run it yourself but not in the task, it is usually running as a different user, with a different PowerShell version, or without a module loaded. See [PowerShell Support and Execution Modes](../../guides/powershell-support.md#quick-diagnostics) for a script to check which host and user are in use.
