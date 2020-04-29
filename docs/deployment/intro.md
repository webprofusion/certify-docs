---
id: intro
title: Deployment Tasks
---

Once you have your certificate issued by your certificate authority you can go ahead and use that certificate for it's intended purpose. This is generally anything that might require a valid verified domain (such as a webserver, mail server, ftp service, remote access etc).

By default Certify The Web supports basic deployment to the local machine certificate store and can then also auto configure/update https bindings in IIS on the local server. If you need to perform more custom steps using the certificate, or if you just want to perform certain workflows after the certificate has been renewed (such as a restarting a local or remote service), you can use *Deployment Tasks*.

Supported Tasks types, each with UI to configure the task parameters etc, include:
- Deploy to:
    - Certificate Store (Local)
    - Apache
    - nginx
    - Tomcat
    - Microsoft Exchange services (IMAP, SMTP, IIS, POP etc)
    - Remote Desktop (RDP) Gateway
    - RDP Listener service
    - Active Directory Federation Services (ADFS)
    - Web Deploy/Web Management Service
- Certificate Export (to various file types, to local paths to via windows network or sftp)
- Run a Powershell script
- Run a remote script via SSH
- Call a custom Webhook

# Deployment Tasks
Deployment Tasks are custom steps which can run either before you request your certificate or after (or both). 

## Pre-Request Tasks
You may wish to run a custom task before you renew your certificate. For instance, you may wish to to make automated firewall changes or call a custom Web Hook/API. These are called 'Pre-Request Tasks'.

## Post-Request (Deployment) Tasks
You may want to run any number of tasks after you have renewed your certificate or after it has been automatically deployed.  For instance, running scripts, exporting for different server types (Apache, nginx), copying to remote servers etc. These are called 'Deployment Tasks'.