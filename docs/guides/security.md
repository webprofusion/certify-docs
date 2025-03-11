---
id: security
title: Security
---

# Security Considerations
The *Certify Certificate Manager* app is configured by default to be fully usable with minimal configuration. This is great for usability but this approach is not necessarily best practice for security. In general, security best practices require that services and users have the absolute minimum of permissions assigned that they require to perform their function.

## Vulnerability Disclosure
If you have found a specific security vulnerability you believe we need to be aware of, please notify `support at certifytheweb.com` via email. We do not currently operate a bug bounty program. Software bugs etc can also be reported in public at https://github.com/webprofusion/certify/issues

## Updates
To ensure the best possible outcome always ensure that your operating system and the app components are fully up to date with vendor/os updates. Operating an internet facing server (web, email, ftp etc) without applying the latest security patches means your system will likely only continue to function due to luck (i.e. not yet being targeted by an attacker). This is doubly important if there is a network path from your internet facing server back to your corporate network. [Auto Updating](auto-update.md) is possible but comes with it's own security risks and caveats.

## Service Account
By default the application background service (Certify.Service) runs as Local System. This account has an *extremely* high level of privileges on the system (but not on the network). As an alternative it's possible to configure the service to run under a more restricted user account and just grant it the permissions it actually needs to run. If you do this you are required to ensure that the account has the permission you require and to re-apply this service account after updates are installed for the app (the installer will not currently preserve this account choice). You are also required to sync account credentials changes in order for the service to continue normal operation.

### Permissions Required
During normal operation the service will/may need to perform the following privileged actions:
- Run as a service (non-interactive)
- Add or Remove certificate in the local computer certificate store
- Add or Remove IIS https bindings
- Write challenge response files to the IIS sites(s) web root or site subfolders.
- Start a temporary http listener via http.sys on port 80, listening for http://*/.well-known/acme-challenge
- If used, deployment tasks may run scripts (PowerShell etc) as the same user the service runs under.
- The service will require read/write for all files under `%ProgramData%\Certify`

### App Permissions
The desktop app (which connects to the background service) runs as an Administrator or Power User group member. Users in these groups can connect to the background service, other users cannot. When the app performs actions it does so via the background service, so many actions are executing as the background service (not the desktop app).

## Risks to Consider
If using scripting, script files must be permissioned so that they can only be modified by the service or authorized users. The risk of having a writeable script is that some other user (perhaps an attacker with employee credentials) could replace a known script with a malicious script and have the service execute this script with elevated privileges.

The contents of `%ProgramData%\Certify` should generally be considered sensitive and especially `%ProgramData%\Certify\assets` which contains PFX files which could be used by an attacker to successfully impersonate a legitimate service (e.g. tricking a users machine to think they are accessing a genuine system in order to steal credentials).

Some app feature use Stored Credentials. These are encrypted using the Windows Data Protection APIs and the private keys of the background service account. If you change (or reset) accounts these credentials may become unreadable. Anyone with the ability to use the same account as the background service will be theoretically able to decrypt stored credentials.

## Risk Mitigation Strategies

For PowerShell scripting, scripts can be limited to those which have been signed using a code signing certificate (either a publicly trusted one issued by a public CA, or an internally trusted one using your own CA). If you then set your machine and user execution policy to AllSigned the script will not be able to run unless trusted. This is especially useful to stop script tampering, however it doesn't stop a script being replaced by another one which is also signed by a trusted authority.

### Example
```ps

# Lock down script execution to signed only (may affect other normal operation of the machine) 
Set-ExecutionPolicy AllSigned -Scope CurrentUser
Set-ExecutionPolicy AllSigned -Scope Machine

# Load a valid signing cert
$cert= Get-PfxCertificate -FilePath MyCodeSigningCert.pfx 

# Sign a script (appends a signature as comments to the end of the file)
Set-AuthenticodeSignature -FilePath .\test-signed.ps1 -Certificate $cert
```