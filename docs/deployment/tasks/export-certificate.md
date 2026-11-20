---
id: export-certificate
title: Export Certificate
sidebar_label: Export Certificate
description: Export the certificate as a PFX or PEM file to a local folder, a Windows network share, or a remote server over SSH.
---

The *Export Certificate* task writes the latest certificate to a file in the format you choose: the full PFX, or one PEM component such as the certificate, the private key or the chain. The file can be written to the machine running Certify, to a Windows network (UNC) share, or to a remote server over SSH (SFTP).

Each task exports one file. To export several files, add one task for each, or use [Deploy to Generic Server](./generic-server.md), which writes the certificate, key and chain files in one task. For a general introduction to certificates and their file types see [Certificates](../../guides/certificates.md).

## Before you start

- Decide where the file should go. The destination folder must already exist, and the account writing the file needs write permission to it.
- To write to a network share as a specific Windows user, create a stored Windows credential with that user's domain, username and password.
- To copy the file to a remote server over SSH, create an *SSH Credentials* stored credential with the username and either a password or the path to a private key file (with an optional passphrase). See [SSH private keys](#ssh-private-keys).
- To protect the exported private key with a new password, create a *Password* stored credential.

## Setting up the task

1. Add the *Export Certificate* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, choose the *Target Type*:
   - **Local (as current service user)**: write the file on this machine as the Certify background service user.
   - **Local (as specific user)**: write the file on this machine (or to a share) as the Windows user in the stored *Credentials* you select.
   - **Windows (Network)**: write the file to a UNC path, e.g. `\\SERVERNAME\Share\mycert.pfx`, as the Windows user in the stored *Credentials* you select.
   - **SSH (Remote)**: copy the file to a remote server using SFTP. Set **Target Host** to the hostname or IP address of the server, with an optional port, e.g. `server.example.com` or `192.168.1.10:2222` (the default port is 22). Select the stored *SSH Credentials* to use.
3. Set the task parameters:
   - **Destination File Path** (required): the full path of the file to write, including the file name, e.g. `C:\CertifyCerts\mycert.pfx`, `\\SERVERNAME\Share\mycert.pfx` or `/etc/ssl/private/mycert.key`. An existing file is replaced.
   - **Export As** (required): the type of file to export. See [Export types](#export-types). The default is *PFX*.
   - **Strict Export**: if enabled, only intermediate certificates from the certificate's own PFX file are exported. Certificates found in the local certificate store are not added to the chain.
   - **Optional New Password**: a stored password credential to protect the exported private key. Only shown when *Export As* includes the private key. See [Optional New Password](#optional-new-password).
4. Save, then run the task with the ▶️ play button to test it.

## Export types

| Export As | File contents |
| --- | --- |
| PEM - Primary Certificate (e.g. .crt) | Your certificate (the leaf or end-entity certificate) only. |
| PEM - Intermediate Certificate Chain + Root CA Cert (e.g. .chain) | The intermediate certificates and the root CA certificate. |
| PEM - Intermediate Certificate Chain (e.g. .pem) | The intermediate certificates only. |
| PEM - Private Key (e.g. .key) | The private key only. |
| PEM - Full Certificate Chain (Excluding Key) | Your certificate, the intermediate certificates and the root CA certificate. |
| PEM - Full Certificate Chain (Including Key) | The private key, your certificate, the intermediate certificates and the root CA certificate, in one file. |
| PEM - Primary Certificate + Intermediate Certificate Chain (e.g. .crt) | Your certificate and the intermediate certificates (without the root). This is the "full chain" file most web servers expect. |
| PFX (PKCS#12), Full certificate including private key | The full PFX file, with the certificate, private key and chain. |

The file extension you use doesn't change the contents, so name the file to suit the software that uses it.

## Optional New Password

*Optional New Password* is only shown when *Export As* is set to a type which includes the private key:

- **PFX**: the exported PFX is protected with the new password instead of the certificate's own PFX password. The PFX uses the same encryption as the *Enable Modern PFX Alg* setting: AES-256 when it is enabled (not supported by Windows Server 2016 and older), otherwise 3DES.
- **PEM - Private Key** and **PEM - Full Certificate Chain (Including Key)**: the private key is exported as an encrypted PKCS#8 key (`-----BEGIN ENCRYPTED PRIVATE KEY-----`, AES-256). Your server will need the password to load the key, for instance using `ssl_password_file` in nginx or `SSLPassPhraseDialog` in Apache.

Without a new password, a PFX export is a copy of the certificate's own PFX file, protected by its PFX password if it has one (*Certificate > Advanced > Signing & Security*). PEM private keys are exported without a password.

If you change *Export As* to a type without the private key, the password selection is cleared when you save the task.

The [Deploy to Tomcat](./tomcat.md) and [Deploy to CCS](./ccs.md) tasks have the same *Optional New Password* for the PFX files they deploy.

## How it works

- The task reads the managed certificate's PFX file and builds the file for the selected *Export As* type. If the certificate has a PFX password, it is used to read the PFX.
- It then writes the file to the destination:
  - **Local** target types write the file directly. With *Local (as specific user)*, the file is written as the stored Windows user.
  - **Windows (Network)** writes the file to the UNC path as the stored Windows user.
  - **SSH (Remote)** copies the file over SFTP. The SSH user must be able to write to the destination path without `sudo`.
- When the task is previewed or validated, no file is written. The task checks a *Destination File Path* is set, and that it is a UNC path when the target type is *Windows (Network)*.

## SSH private keys

The app uses the SSH.NET library for SSH connections. If you use a private key file to authenticate, the file must be in PEM (text) format. Several key types are supported, but if the key is encrypted with a passphrase, only aes256-cbc encryption is [supported by SSH.NET](https://github.com/sshnet/SSH.NET/issues/742#issuecomment-1292945883).

## Troubleshooting

- **A destination file path is required for certificate export**: set *Destination File Path*.
- **UNC Path (e.g. \\\\SERVERNAME\\Share) is expected for Windows Network resource paths**: with *Windows (Network)*, the path must start with `\\`.
- **Source certificate file is not present. Export cannot continue**: the managed certificate doesn't have a certificate file yet. Request the certificate first.
- **Cannot write file to a directory name**: *Destination File Path* is a folder. Add the file name to the path.
- **Failed to copy to destination file. Ensure the target directory exists**: the destination folder doesn't exist, or the account writing the file doesn't have permission to write there.
- **Task using Windows Credentials requires a valid username and password**: the selected stored credentials are missing a username or password.
- **Export failed due to connection or file copy failure**: the SFTP copy failed. Check the task log for the reason, e.g. the target host or credentials are wrong, or the destination folder doesn't exist or isn't writable by the SSH user.
- **Export - the new password credential could not be unlocked or was not accessible**: the stored credential selected for *Optional New Password* could not be read, or has no password.
- **Export - the credentials for this task could not be unlocked or were not accessible**: the PFX password credential of the managed certificate (*Certificate > Advanced > Signing & Security*) could not be read.
