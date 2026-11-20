---
id: update-port-binding
title: Update Port Binding
sidebar_label: Update Port Binding
description: Uses netsh to bind the certificate to an IP:port HTTPS binding in Windows HTTP.sys.
---

The *Update Port Binding* task binds the current certificate to an IP address and port using `netsh http`, without custom scripting. Use it for Windows services that use an HTTP.sys certificate binding on a fixed port, rather than an IIS site binding.

The task runs a PowerShell script on the Windows server running Certify, as the Certify background service. It only updates `ipport` bindings, not hostname (SNI) bindings.

## Setting up the task

1. Add the *Update Port Binding* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **IP** (required): the IP address of the binding, IPv4 or IPv6. The default `0.0.0.0` binds for all IPv4 addresses, and `::` for all IPv6 addresses.
   - **Port** (required): the port number of the binding, from 1 to 65535, e.g. `8443`.
   - **App Id (Guid)** (optional): the application ID to record with the binding, without braces, e.g. `4dc3e181-e14b-4a21-b022-59fc669b0914`. It helps you identify which application the binding is for. If you leave it blank, `c0a1e5ce-c001-c0de-ba5e-000000000042` is used.
3. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task runs a [PowerShell script](https://github.com/webprofusion/certify-plugins/blob/development/src/DeploymentTasks/Core/Providers/Assets/UpdatePortBinding.ps1), passing the thumbprint of the current certificate and your settings.
- The task checks the IP is an IP address and the port is a number before running the script, so only those values reach `netsh`. An IPv6 address is written in brackets, e.g. `ipport=[::]:8443`.
- The script deletes any existing binding for the IP and port with `netsh http delete sslcert ipport=<ip>:<port>`. This replaces a binding set by any application, not only one set by Certify.
- It then adds the new binding with `netsh http add sslcert ipport=<ip>:<port> certhash=<thumbprint> appid={<app id>}`. No certificate store is given, so `netsh` uses the local machine *Personal* (`My`) store, where Certify's auto deployment stores the certificate by default.
- The `netsh` commands and their output are written to the task log.
- When the task is previewed, it checks the IP, port and App Id values. Nothing is changed.

## Troubleshooting

- **An IP is required. Use 0.0.0.0 to catch all.**: enter a value for *IP*.
- **Invalid IP address**: enter an IP address such as `0.0.0.0`, `::` or `192.168.1.10`. Hostnames are not supported.
- **A port number is required.** or **Invalid port number**: enter a whole number from 1 to 65535 for *Port*.
- **Invalid App Id (GUID)**: the *App Id (Guid)* is not a valid GUID, or includes `{}` braces. Enter it without braces, or leave it blank to use the default App Id.
- **Error attempting to add binding**: `netsh` rejected the new binding. The message includes the `netsh` output. Check the IP and port, and that the certificate is in the local machine *Personal* store.
