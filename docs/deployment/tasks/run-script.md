---
id: run-script
title: Run a Program or Script
sidebar_label: Run a Script
description: Run a program, batch file or shell script after a certificate request, on the local machine or on a remote server over SSH.
---

The *Run...* task runs a program, Windows batch file or shell script after a certificate request. It can run the command on the machine running Certify, or on a remote server over SSH. A common use is to reload a service on a Linux server after a [Deploy to Generic Server](./generic-server.md) task has copied the new certificate files to it.

To run a PowerShell script, use the [Run a PowerShell Script](./powershell.md) task instead, which passes the certificate request details to your script.

## Before you start

- For a local command, note the full path to the program or script. On Linux, the script must be executable (e.g. `chmod +x`) and start with a shebang line such as `#!/bin/bash`.
- For a remote command, create an *SSH Credentials* stored credential with the username and either a password or the path to a private key file (with an optional passphrase). The private key file must be in PEM (text) format. See [SSH private keys](#ssh-private-keys).

## Setting up the task

1. Add the *Run...* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, choose the *Target Type*:
   - **Local (as current service user)**: run the command on this machine as the Certify background service user.
   - **Local (as specific user)**: run the command on this machine as the Windows user in the stored *Credentials* you select. This is only supported on Windows. Older tasks set to *Windows (Network)* work the same way: the command still runs on this machine, and the task log includes a warning saying so.
   - **SSH (Remote)**: run the command on a remote server. Set **Target Host** to the hostname or IP address of the server, with an optional port, e.g. `server.example.com` or `192.168.1.10:2222` (the default port is 22). Select the stored *SSH Credentials* to use.
3. Set the task parameters:
   - **Program/Script** (required): the command to run. Locally, use the full path to the program or script, e.g. `C:\Scripts\reload.bat` or `/opt/scripts/reload.sh`. Environment variables such as `%ProgramData%` are expanded. Over SSH, this is the command to run on the remote server, e.g. `sudo systemctl reload nginx`.
   - **Arguments (optional)**: arguments to pass to the program or script, as you would type them on a command line.
   - **Script Timeout Mins.**: how long to wait for the command to finish, from 1 to 120 minutes. Leave it blank to use the default of 2 minutes.
   - **Launch New Process**: applies when the command runs as another Windows user. If enabled, the command is started as a new process under that user. If disabled (the default), the command runs under impersonation of that user.
4. Save, then run the task with the ▶️ play button to test it.

## How it works

- **Locally**, the program or script is started directly with the arguments you give, without a window. Its output and error output are included in the task log.
  - If the command exits with a non-zero exit code, the task fails.
  - If the command doesn't finish within *Script Timeout Mins.*, the task stops waiting and fails.
- **Over SSH**, the task connects to the target host and runs *Program/Script* followed by *Arguments* as a single command.
  - If the command exits with a non-zero exit status, the task fails with the exit status and the command's output and error output.
  - If the command doesn't finish within *Script Timeout Mins.*, the task fails.
  - If the task can't connect or sign in to the target host, the task fails with the connection error.
  - Otherwise the task reports *Command Completed*, followed by the command's output if it wrote any.
- When the task is previewed or validated, the command is not run. For commands run on this machine, the task checks the script file exists at the given path. Paths on SSH targets are not checked.

## SSH private keys

The app uses the SSH.NET library for SSH connections. If you use a private key file to authenticate, the file must be in PEM (text) format. Several key types are supported, but if the key is encrypted with a passphrase, only aes256-cbc encryption is [supported by SSH.NET](https://github.com/sshnet/SSH.NET/issues/742#issuecomment-1292945883).

## Troubleshooting

- **A path to a script is required**: set *Program/Script*.
- **There is no local script file present at the given path or the process user ... does not have read permission**: check the path, and that the account running the task (shown in the message) can read the file.
- **Timeout (Minutes) value is out of range (1-120)**: set *Script Timeout Mins.* to a whole number from 1 to 120, or leave it blank.
- **Running scripts as another user (alternative credentials) is not supported on Linux**: use *Local (as current service user)* or *SSH (Remote)* on Linux.
- **Task with Windows Credentials requires a username and password**: no stored credentials are selected, or they are missing a username or password.
- **Script exited with the following ExitCode**: the command ran but reported an error. Check the output in the task log.
- **Script ran but took too long to exit and was closed**: the command was still running when the timeout was reached. Increase *Script Timeout Mins.* or check whether the command is waiting for input.
- **Command failed: ... :: Could not connect to ...**: the task couldn't connect or sign in to the SSH target host. Check the *Target Host*, port, firewall and SSH credentials.
- **Command failed: ... :: Exit status ...**: the command ran over SSH but reported an error. The message includes the command's output.
- **Command failed: ... :: The command did not complete within the timeout**: the SSH command was still running when the timeout was reached. Increase *Script Timeout Mins.* or check whether the command is waiting for input.
