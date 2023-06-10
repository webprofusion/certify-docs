---
id: tasks_intro
title: Deployment Tasks
---

**Deployment Tasks are a powerful new feature introduced in Certify The Web v5.x and above.**
Once you have a certificate issued by a certificate authority you can go ahead and use that certificate for it's intended purpose. This is generally anything that might require a valid verified domain (such as a webserver, mail server, ftp service, remote access etc).

![Startup UI](/assets/screens/DeploymentTasks.png)

By default Certify The Web supports Auto deployment to the local machine certificate store and will auto configure/update https bindings in IIS on the local server.

If you need to perform more custom steps using the certificate, or if you just want to perform certain workflows after the certificate has been renewed (such as a restarting a local or remote service), you can use _Deployment Tasks_.

## Pre-Request Tasks

You may wish to run a custom task before you renew your certificate. For instance, you may wish to to make automated firewall changes or call a custom Web Hook/API. These are called 'Pre-Request Tasks'.

## Deployment Tasks

You may want to run any number of tasks after you have renewed your certificate or after it has been automatically deployed. For instance, running scripts, exporting for different server types (Apache, nginx), copying to remote servers etc. These are called 'Deployment Tasks' or Post-Request Tasks.

### Task Triggers

You can configure a task to run either when a certificate request was successful or on error, or you can opt to run the task manually.

Manually running a task is useful when you want to avoid restarting a service outside of maintenance hours, or if you wish to run the tasks from the command line, a script or a scheduled task. Example command line arguments are shown in the UI to help with scripting.

### Built-in Task Types

Built-in deployment task types, each with UI to configure the task parameters etc, include:


| Name | Description |
|---|---|
| Deploy Certificate to ADFS |  |
| [Deploy to Apache](./tasks/apache.md) | Export the certificate components in PEM file format for use with the Apache webserver. |
| [Deploy to Apache Tomcat](./tasks/tomcat.md) | Export the certificate as a pkcs12 key store for use with Apache Tomcat application server. |
| [Deploy to Azure App Service](./tasks/azure-app-service.md) | Note that setting a PFX password (Certificate> Advanced > Signing & Security) is required for this deployment. |
| Deploy to Azure Key Vault| |
| Deploy to Centralized Certificate Store (CCS)|  |
| [Deploy to Microsoft Exchange](./tasks/exchange.md)| Deploy the certificate to a local MS Exchange services and apply it to an optional list of services (IMAP, SMTP, IIS, POP etc). |
| Deploy to Hashicorp Vault|  |
| Deploy to RAS (Direct Access, VNP, SSTP VPN etc)| Provides a basic deployment for RAS. You may require your own script for more sophisticated deployments. |
| Run a Script | Execute an environment specific script (such as as a windows batch file or a linux bash script). |
| Stop, Start or Restart a Service | Select a local service to restart. Usually used in conjunction with another deployment task to cause the new certificate to new applied. |


### Run a Powershell script

Execute a custom [PowerShell script](../script-hooks.md).

Some example scripts (e.g. for `Web Management Service`) are provided under `C:\Program Files\CertifyTheWeb\Scripts\Common`. If you use any of these you should copy the script to your own choice of folder outside of Program Files as any app updates will overwrite the files in this Program Files location and any edits you make will be lost.

#### Passing custom arguments

Note if passing additional arguments to your script these should be in the format arg=value;arg2=value and `;` characters required as parameter values need to be escaped with `\`, like `key=abc\;123h;othervalue=test`. The `\` character can be escaped as `\\` e.g. to pass an couple of arguments and the first is `path` with value `c:\temp\folder` you could use `path=c:\temp\folder\\;other=test`

### Call a custom Webhook

Call a webhook with details of the latest certificate request status. Your custom Body template can use variables, e.g.:

```
{
  "Success": "$Success",
  "PrimaryDomain": "$PrimaryDomain",
  "SANs": "$SubjectAlternativeNames"
}
```

For advanced webhook scenarios, a custom script is recommended (see *Run a Powershell Script* above).

### Deploy to Apache, nginx, Generic Server, Certificate Export

Export the certificate to local or remote locations (including SSH/SFTP) as PEM format with Key file and optional chain file.

For a general introduction to certificates and their file types see [Certificates](../guides/certificates.md).

:::note  SSH Private Keys

We currently use the ssh.net library for .net to provide our SSH related features within Tasks. If using an ssh private key file for authentication please ensure the file is in PEM (text) format. Multiple key types are supported but only aes256-cbc key encryption is [supported by ssh.net](https://github.com/sshnet/SSH.NET/issues/742#issuecomment-1292945883). 

:::

### Deploy to Certificate Store (Local)

This task is deprecated and is not generally required. This imports the certificate into the local certificate store with your choice of store type (Personal, Web Hosting) and choice of Friendly Name. Note that the default auto deployment system in Certify will already store certificates in the My/Personal certificate store.
