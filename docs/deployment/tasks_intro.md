---
id: tasks_intro
title: Deployment Tasks
---

**Deployment Tasks are a powerful new feature introduced in Certify The Web v5.x and above.**
Once you have a certificate issued by a certificate authority you can go ahead and use that certificate for it's intended purpose. This is generally anything that might require a valid verified domain (such as a webserver, mail server, ftp service, remote access etc).

![Startup UI](/assets/screens/DeploymentTasks.png)

By default Certify The Web supports Auto deployment to the local machine certificate store and will auto configure/update https bindings in IIS on the local server.

 If you need to perform more custom steps using the certificate, or if you just want to perform certain workflows after the certificate has been renewed (such as a restarting a local or remote service), you can use *Deployment Tasks*.


## Pre-Request Tasks
You may wish to run a custom task before you renew your certificate. For instance, you may wish to to make automated firewall changes or call a custom Web Hook/API. These are called 'Pre-Request Tasks'.

## Post-Request (Deployment) Tasks
You may want to run any number of tasks after you have renewed your certificate or after it has been automatically deployed.  For instance, running scripts, exporting for different server types (Apache, nginx), copying to remote servers etc. These are called 'Deployment Tasks'.

### Task Triggers
You can configure a task to run either when a certificate request was successful or on error, or you can opt to run the task manually. 

Manually running a task is useful when you want to avoid restarting a service outside of maintenance hours, or if you wish to run the tasks from the command line, a script or a scheduled task. Example command line arguments are shown in the UI to help with scripting.

## Task Types
Supported task types, each with UI to configure the task parameters etc, include:

### Deploy to Microsoft Exchange
Apply the certificate to a local MS Exchange services and apply it to an optional list of services (IMAP, SMTP, IIS, POP etc).

### Deploy to ADFS, Remote Desktop (RDP) Gateway, RDP Listener service, Remote Access (RAS, SSTP VPN etc)
Pre-built PowerShell tasks to apply the latest certificate to common windows services. Includes Active Directory Federation Services (ADFS), Web Deploy/Web Management Service.

### Deploy to Certificate Store (Local)
Import the certificate into the local certificate store with your choice of store type (Personal, Web Hosting) and choice of Friendly Name. Note that the default auto deployment system in Certify will already store certificates in the My/Personal certificate store.

### Deploy to Microsoft Azure Key Vault
Export the certificate to Azure Key Vault for distribution to other application and services.

### Deploy to Apache, nginx, Generic Server, Certificate Export
Export the certificate to local or remote locations (including SSH/SFTP) as PEM format with Key file and optional chain file. 

For a general introduction to certificates and their file types see [Certificates](../guides/certificates).

### Deploy to Tomcat
Export the certificate as a pkcs12 key store for use with Apache Tomcat. See [more details](./tasks/tomcat).

### Run a Powershell script
Execute a custom [PowerShell script](../script-hooks). 

#### Passing custom arguments
Note if passing additional arguments to your script these should be in the format arg=value;arg2=value and `;` characters required as parameter values need to be escaped with `\`, like `key=abc\;123h;othervalue=test`. The `\` character can be escaped as `\\` e.g. to pass an couple of arguments and the first is `path` with value `c:\temp\folder` you could use `path=c:\temp\folder\\;other=test`

### Run a Script
Execute an environment specific script (such as as a windows batch file or a linux bash script).

### Call a custom Webhook
Call a webhook with details of the latest certificate request status. Your custom Body template can use variables, e.g.:
```
{
  "Success": "$Success",
  "PrimaryDomain": "$PrimaryDomain",
  "SANs": "$SubjectAlternativeNames"
}
```

For advanced webhook scenarios, a custom script is recommended (see Powershell script above).

### Stop, Start or Restart a Service
Select a local service to restart. Usually used in conjunction with another deployment task to cause the new certificate to new applied.
