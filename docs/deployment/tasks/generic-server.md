---
id: generic-server
title: Deploy to Generic Server
sidebar_label: Generic Server
description: Export the certificate, private key and chain as PEM files to a local folder, a Windows network share, or a remote server over SSH.
---

The *Deploy to Generic Server (multi-purpose)* task exports your certificate and the components you choose as a set of PEM format files. Use it for any server or application that loads its certificate from PEM files, such as a Linux service, a mail server or an appliance.

To use a certificate, the service you are targeting needs the certificate for your domain (**Leaf or End-Entity Certificate**), the intermediate certificates from your CA (if any) and the **Private Key** that corresponds to the public key in the certificate. The task writes the files you need, but it doesn't configure the service to use them.

This task writes the same files as [Deploy to Apache](./apache.md) and [Deploy to nginx](./nginx.md). To export a single file in another format, such as a PFX, use [Export Certificate](./export-certificate.md). For a general introduction to certificates and their file types see [Certificates](../../guides/certificates.md).

## Task Parameters

### Target Type

This option sets where the files are written:

- **Local (as current service user)**: write the files on this machine as the Certify background service user.
- **Local (as specific user)**: write the files on this machine as the Windows user in the stored *Credentials* you select.
- **Windows (Network)**: write the files to UNC paths, e.g. `\\SERVERNAME\Share\cert.pem`, as the Windows user in the stored *Credentials* you select. All the file paths must be UNC paths.
- **SSH (Remote)**: copy the files to a remote server using SFTP. Set **Target Host** to the hostname or IP address of the server, with an optional port, e.g. `server.example.com` or `192.168.1.10:2222` (the default port is 22). Select the stored *SSH Credentials* to use, with the username and either a password or the path to a private key file. See [SSH private keys](#ssh-private-keys).

### File Paths

You decide which output files you want and where they are written. The file paths must be *full file names*, not just folders, and the folders must already exist. The file names and extensions don't matter, so you can name them to suit your service. An existing file is replaced.

You need to set the key file, and at least one of the cert file or the full chain file.

#### Output filepath for cert

(Optional, if you set *Output filepath for full chain*.) The file for your **Leaf Certificate** only.

Example: `/etc/ssl/mysite/cert.pem`

#### Output filepath for key

(Required.) The file for the **Private Key**. This file should be kept secure and not shared with anyone. The key is not protected with a password.

Example: `/etc/ssl/mysite/privkey.pem`

#### Output filepath for full chain

(Optional, if you set *Output filepath for cert*.) The file for the **Full Chain**: your leaf certificate followed by any intermediate certificates. The root CA certificate is not included.

Example: `/etc/ssl/mysite/fullchain.pem`

#### Output filepath for CA chain

(Optional.) The file for the **CA Chain**: any intermediate certificates. The root CA certificate is not included.

Example: `/etc/ssl/mysite/chain.pem`

## How it works

- The task exports each file you set, in this order: cert, key, CA chain, full chain. Each file is written the same way as an [Export Certificate](./export-certificate.md) task.
- If a file fails to export, the remaining files are not written.
- When the task is previewed or validated, no files are written. The task checks the key path and at least one of the cert or full chain paths are set, and that the paths are UNC paths when the target type is *Windows (Network)*.

## Using the files

Point your service's configuration at the files the task writes. Most services need either:

- the **Full Chain** and the **Private Key**, or
- the **Leaf Certificate**, the **CA Chain** and the **Private Key** as separate files.

### Reloading your service

For your changes to take effect you will usually need to restart or reload the service. Add a task after the *Deploy to Generic Server* task to do this:

- For a Windows service on the machine running Certify, use [Stop, Start or Restart a Service](./restart-service.md).
- For a service on a Linux or remote server, use [Run a Program or Script](./run-script.md), e.g. with the *SSH (Remote)* target type and a command such as `sudo systemctl reload myservice`.

### CA Preferred Chain

Some CAs offer alternative certificate chains for compatibility. To use a different chain, set *Certificate > Advanced > Certificate Authority - Preferred Chain* and request the certificate again.

## SSH private keys

The app uses the SSH.NET library for SSH connections. If you use a private key file to authenticate, the file must be in PEM (text) format. Several key types are supported, but if the key is encrypted with a passphrase, only aes256-cbc encryption is [supported by SSH.NET](https://github.com/sshnet/SSH.NET/issues/742#issuecomment-1292945883).

## Troubleshooting

- **Required: Output filepath for cert or Output filepath for full chain**: set at least one of these paths.
- **Required: Output filepath for key**: set the key path. It is always required.
- **UNC Path (e.g. \\\\SERVERNAME\\Share) is expected for Windows Network resource paths**: with *Windows (Network)*, every path must start with `\\`.
- **Source certificate file is not present. Export cannot continue**: the managed certificate doesn't have a certificate file yet. Request the certificate first.
- **Cannot write file to a directory name** or **Failed to copy to destination file. Ensure the target directory exists**: check each path is a full file name, the folder exists, and the account writing the files can write there.
- **Export failed due to connection or file copy failure**: the SFTP copy failed. Check the task log for the reason, e.g. the target host or credentials are wrong, or the folder doesn't exist or isn't writable by the SSH user without `sudo`.
