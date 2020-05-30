---
id: tasks_intro
title: Deployment Tasks
---

**Deployment Tasks are a powerful new feature introduced in Certify The Web v5.x and above.**
Once you have a certificate issued by a certificate authority you can go ahead and use that certificate for it's intended purpose. This is generally anything that might require a valid verified domain (such as a webserver, mail server, ftp service, remote access etc).

![Startup UI](/assets/screens/DeploymentTasks.png)

By default Certify The Web supports Auto deployment to the local machine certificate store and will auto configure/update https bindings in IIS on the local server.

 If you need to perform more custom steps using the certificate, or if you just want to perform certain workflows after the certificate has been renewed (such as a restarting a local or remote service), you can use *Deployment Tasks*.

Supported task types, each with UI to configure the task parameters etc, include:
- Deploy to:
    - Certificate Store (Local)
    - Apache
    - nginx
    - [Tomcat](tasks/tomcat)
    - Microsoft Exchange services (IMAP, SMTP, IIS, POP etc)
    - Remote Desktop (RDP) Gateway
    - RDP Listener service
    - Active Directory Federation Services (ADFS)
    - Web Deploy/Web Management Service
- Certificate Export (to various file types, to local paths to via windows network or sftp)
- Run a Powershell script
- Run a remote script via SSH
- Call a custom Webhook
- Stop, Start or Restart a Service

# Deployment Tasks
Deployment Tasks are custom steps which can run either before you request your certificate or after (or both). 

## Pre-Request Tasks
You may wish to run a custom task before you renew your certificate. For instance, you may wish to to make automated firewall changes or call a custom Web Hook/API. These are called 'Pre-Request Tasks'.

## Post-Request (Deployment) Tasks
You may want to run any number of tasks after you have renewed your certificate or after it has been automatically deployed.  For instance, running scripts, exporting for different server types (Apache, nginx), copying to remote servers etc. These are called 'Deployment Tasks'.


### Task Triggers
You can configure a task to run either when a certificate request was successful or on error, or you can opt to run the task manually. 

Manually running a task is useful when you want to avoid restarting a service outside of maintenance hours, or if you wish to run the tasks from the command line, a script or a scheduled task. Example command line arguments are shown in the UI to help with scripting,