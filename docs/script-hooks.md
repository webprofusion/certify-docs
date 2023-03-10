---
id: script-hooks
title: Scripting
---

# Scripting

Certify is extensible via PowerShell scripts tasks which can be configured to run before or after the Certificate Request. From v5 onwards these are found under the Tasks tab for your managed certificate. See [Tasks](deployment/tasks_intro.md) for more information.

The scripts are provided a parameter `$result` which contains the status and details of the managed certificate being requested. You can execute any commands including creating new processes, or using other command line tools. 

A common use for scripting is to use your new certificate for services other than IIS websites, such as Microsoft Exchange, RDP Gateway, FTP servers and other services. The app also has a range of built-in deployment tasks which also use scripting internally.

*By default the background service runs as Local System, so your scripts will execute in that context*, this can be important for issues regarding permissions, file system encryption etc. You can optionally configure your task to run as a specific user if network access or special permissions are required.

**Do not store scripts under the C:\Program Files\CertifyTheWeb\* folder. File stored there will be deleted next time you update the app**

All scripts should be refined and tested in a staging environment before use in production.

## Scripting Basics

Here is a sample PowerShell script which demonstrates a few commonly accessed pieces of information:

```PowerShell
param($result)   # required to access the $result parameter

# either $true or $false
$result.IsSuccess

# object containing all information Certify has about the saved Site
$result.ManagedItem

# the IIS (or other service) site ID
$result.ManagedItem.ServerSiteId   # ex: 1, 2, 3, ...

# the website root directory (if applicable)
$result.ManagedItem.RequestConfig.WebsiteRootPath   # ex: "C:\inetpub\wwwroot"

# the path to the created/renewed certificate PFX file
$result.ManagedItem.CertificatePath   # ex: "C:\ProgramData\Certify\certes\assets\pfx\00f9e07e-83ca-4029-a173-4b704ee78996.pfx"

# the certificate thumbprint
$result.ManagedItem.CertificateThumbprintHash # ex: "78b1080a1bf5e7fc0bbb0c0614fc4a18932db5f9"

# the previous certificate thumbprint
$result.ManagedItem.CertificatePreviousThumbprintHash  # ex: "18c1060a1be5e6fc0bbb0c0614fc4a18932db5fa"

# You can set $result.Abort to $true in a pre-request hook to prevent the certificate from
# being requested (has no effect in post-request hooks)
$result.Abort = $false
```

The `$result.ManagedItem` object is an instance of the <a href="https://github.com/webprofusion/certify/blob/development/src/Certify.Models/Config/ManagedCertificate.cs" target="_blank">ManagedCertificate</a> class, so all of the properties it has will be available in your script:

## Pre-Request Tasks

Notes: Pre-request scripts/tasks are executed immediately before the Certificate Request is about to be made (including the challenge file configuration checks).

* The `$result.IsSuccess` value will always be `$false`.
* If for some reason your script would like to prevent the Certificate Request from being executed, you may set `$result.Abort` to `$true` and the site your script was executed for will be skipped.

## Deployment Tasks (Post-Request)

Deployment task (post-request) scripts are executed immediately after the Certificate Request was completed, and the certificate was automatically installed and configured according to the site configuration within Certify.

By default these run if the request was successful but you can change the task trigger (On Success, On Fail, etc). You can also configure them for manual execution only, so that you can perform them during a maintenance window, or via a windows scheduled task using the command line.

* The `$result.IsSuccess` value indicates whether or not the Certificate Request was successfully completed.
* The `$result.Message` value provides a message describing the reason for failure, or a message indicating success.

Legacy uses for scripting (v4.x and lower) may have previously included CCS Export, PEM file creation etc however these functions are provided by built-in Deployment Tasks which you should use instead unless the built-in functionality does not meet your requirements.

### Example: Output the result properties to a text file
```PowerShell
# Logs results to the given path (modify as required)

param($result)  
$logpath = "c:\temp\ps-test.txt"

$date = Get-Date

Add-Content $logpath ("-------------------------------------------------");
Add-Content $logpath ("Script Run Date: " + $date)
Add-Content $logpath ($result | ConvertTo-Json)
```

### Example: Send email via Gmail after unsuccessful renewal 
*Note: this is an example only, by default the app will use the certifytheweb.com API to notify you of repeated failures.*

```PowerShell
param($result)
if (!$result.IsSuccess) {
   $EmailFrom = "username@gmail.com"
   $EmailTo = "username@gmail.com"
   $Subject = "Cert Request Failed: " + $result.ManagedItem.RequestConfig.PrimaryDomain
   $Body = "Error: " + $result.Message
   $SMTPServer = "smtp.gmail.com"
   $SMTPClient = New-Object Net.Mail.SmtpClient($SmtpServer, 587)
   $SMTPClient.EnableSsl = $true
   $SMTPClient.Credentials = New-Object System.Net.NetworkCredential("username@gmail.com", "password");
   $SMTPClient.Send($EmailFrom, $EmailTo, $Subject, $Body)
   write-output "Sent notification email"
}
```

### Example: Restart RRAS after successful certificate renewal

```PowerShell
param($result)
if ($result.IsSuccess -and $result.ManagedItem.GroupId -eq 1) {
   write-output "Restarting RRAS..."
   Net Stop RemoteAccess
   Net Start RemoteAccess
   write-output "Done"
}
```

### Example: Convert CNG certificate storage to CSP (for Exchange 2013)

```PowerShell
param($result)
$tempfile = "$env:TEMP\CertifyTemp.pfx"
$pfx = get-pfxcertificate -filepath $result.ManagedItem.CertificatePath
certutil -f -p Certify -exportpfx $pfx.SerialNumber $tempfile
certutil -delstore my $pfx.SerialNumber
certutil -p Certify -csp "Microsoft RSA SChannel Cryptographic Provider" -importpfx $tempfile
remove-item $tempfile
```

### Example: Enable certificate for Exchange 2013 / 2016 services on local server

```PowerShell
param($result)
Enable-ExchangeCertificate -Thumbprint $result.ManagedItem.CertificateThumbprintHash -Services POP,IMAP,SMTP,IIS -Force
```

### Example: Update VMWare Horizon certificate
This example removes any previous certificate with the same FriendlyName (`vdm`) then renames the Friendly Name property of the new certificate to `vmd`. It then restarts the `wstunnel` service.

```PowerShell
param($result)

if ($result.IsSuccess) {

   $thumbprint = $result.ManagedItem.CertificateThumbprintHash # e.g. 2c127d49b4f63d947dd7b91750c9e57751eced0c

   # remove the old cert (by Friendly Name 'vdm') to avoid duplication, if it exists
   Get-ChildItem -Path cert:\LocalMachine\My | Where {$_.FriendlyName.Equals("vdm")} | Remove-Item

   # rename our new certificate
   $cert = Get-ChildItem -Path cert:\LocalMachine\My\$thumbprint

   $cert.FriendlyName ="vdm"

   # restart the wstunnel service to apply certificate
   Restart-Service wstunnel -Force -ErrorAction Stop
}

```


#### Example: Update certificate for SSTP VPN
```PowerShell


param($result)

# Store certificate in variable
$cert = Get-ChildItem -Path Cert:\LocalMachine\My | Where-Object {$_.Thumbprint -match $result.ManagedItem.CertificateThumbprintHash}

# Stop RRAS, set cert, start RRAS
Import-Module RemoteAccess
Stop-Service RemoteAccess
Set-RemoteAccess -SslCertificate $cert
Start-Service RemoteAccess
```

### Example: Update SQL Server connection certificate
This example updates the registry key for the SQL Server certificate thumbprint. Note that the instance name will affect the name of the registry key, so you need to find that and change that in the script. Some SQL Server editions may also require the certificate key to be converted to the older RSA SChannel CSP.

```
param($result)

# Example script to set SQL Server certificate 

# Note that some instances of SQL server may require certificate key storage to use the "Microsoft RSA SChannel Cryptographic Provider" 
# See an example conversion: https://docs.certifytheweb.com/docs/script-hooks#example-convert-cng-certificate-storage-to-csp-for-exchange-2013

# See HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\ for the required instance key
$instanceKey = 'MSSQL15.MSSQLSERVER'  # Change this as required

# -------------------------------------------------------------------------

$registryPath = "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Microsoft SQL Server\$instanceKey\MSSQLServer\SuperSocketNetLib"
$oldthumbprint = (Get-Itemproperty -Path $registryPath).Certificate
$newthumbprint = $result.ManagedItem.CertificateThumbprintHash

if ($oldthumb -ne $newthumb) { 

  # apply the new certificate thumbprint to the registry key
  Set-ItemProperty -Path $registryPath -Name 'Certificate' -Value $newthumb

  # optionally restart the SQL service (uncomment if required in this step), correct service name may vary
  # Restart-Service mssqlserver
}
```


### Example: Update SQL Server Reporting Services

This is adapted from a community example: https://community.certifytheweb.com/t/sql-server-reporting-services-ssrs/332/7  

This script gets the report server config object the checks if an existing cert is bound it removes that, then creates the new binding.
```
param($result)

$ssrsServerName = "RS_MSSQLSERVER"
$ssrsReportManagerName = "ReportManager"
$ssrsReportWebServiceName = "ReportServerWebService"

$httpsPort = 443
$ipAddress = "0.0.0.0"

# Find the ssrsServerName by running:
# Get-WmiObject -namespace root\Microsoft\SqlServer\ReportServer -class __Namespace
# take the value of the name field

$version = (Get-WmiObject –namespace root\Microsoft\SqlServer\ReportServer\$ssrsServerName  –class __Namespace).Name
$rsConfig = Get-WmiObject –namespace "root\Microsoft\SqlServer\ReportServer\$ssrsServerName\$version\Admin" -class MSReportServer_ConfigurationSetting

# the cert thumbnail of the newest certificate
$newthumb = $result.ManagedItem.CertificateThumbprintHash.ToLower()

# check the cert thumbnail of the currently bound certificate (if any)

$oldthumb = ''

try {
   $oldthumb = $rsConfig.ListSSLCertificateBindings(1033).CertificateHash.Item([array]::LastIndexOf($rsConfig.ListSSLCertificateBindings(1033).Application, $ssrsReportManagerName))

   if ($oldthumb -ne $newthumb) {      
      $rsConfig.RemoveSSLCertificateBindings($ssrsReportManagerName, $oldthumb, $ipAddress, $httpsport, 1033) 
      $rsConfig.RemoveSSLCertificateBindings($ssrsReportWebServiceName, $oldthumb, $ipAddress, $httpsport, 1033)
   }
} catch {}

$rsConfig.CreateSSLCertificateBinding($ssrsReportManagerName, $newthumb, $ipAddress, $httpsport, 1033)
$rsConfig.CreateSSLCertificateBinding($ssrsReportWebServiceName, $newthumb, $ipAddress, $httpsport, 1033) 
```

### Example: Setting private key read permission for a specific account

Often you will need to allow a specific user account read permission on a certificate private key to allow a service to use the certificate properly:

```
param($result)

## Update the read permission on the certificate private key to allow NT AUTHORITY\LOCAL_SERVICE (for example) to use the cert (and private key)

# Specify the user, the permissions and the permission type
$permission = "NT AUTHORITY\LOCAL SERVICE","Read","Allow"

# get the stored certificate 
$cert = Get-ChildItem -Path cert:\LocalMachine\My\$result.ManagedItem.CertificateThumbprintHash

# configure file system access rule
$accessRule = New-Object -TypeName System.Security.AccessControl.FileSystemAccessRule -ArgumentList $permission;

# Location of the machine related keys
$keyPath = $env:ProgramData + "\Microsoft\Crypto\RSA\MachineKeys\";
$keyName = $cert.PrivateKey.CspKeyContainerInfo.UniqueKeyContainerName;
$keyFullPath = $keyPath + $keyName;

try
{
   # Get the current acl of the private key
   $acl = (Get-Item $keyFullPath).GetAccessControl('Access');
   # Add the new ace to the acl of the private key
   $acl.AddAccessRule($accessRule);

   # Write back the new acl
   Set-Acl -Path $keyFullPath -AclObject $acl;
}
catch
{
   throw $_;
}

```

### Example: Update the certificate on a local WinRM https listener (Windows Admin Center etc)
```
param($result)  

# update the local winrm https listener cert, assumes the cert is already installed to local computer certificate store using Certify
# based on https://serverfault.com/questions/589607/automatically-reconfigure-winrm-https-listener-with-new-certificate
 
Set-Location -Path WSMan:\localhost\Service

Set-Item -Path .\CertificateThumbprint -Value $result.ManagedItem.CertificateThumbprintHash
```
### Example: Convert PFX to Java Key Store using keytool
```
param($result)  

# adapt paths and passwords as required

$dest_password ="ajkspassword"
$dest_jks_file="C:\temp\mykeystore.jks"

C:\path\to\keytool -importkeystore -srckeystore $result.ManagedItem.CertificatePath -srcstoretype pkcs12 -destkeystore $dest_jks_file -deststoretype JKS -deststorepass $dest_password -srcstorepass "" 
```

### Example: Deploy to Web Management Service (Web Deploy etc)
This example uses netsh to update the certificate bound to port 8172 (Web Deploy etc), it then also sets the (binary) certificate hash in the registry so that the correct certificate is shown in the IIS user interface for the Web Management Service feature.
```
param($result)

$thumb = $result.ManagedItem.CertificateThumbprintHash

# get a new guid:
$guid = [guid]::NewGuid()

# remove the previous certificate:
& netsh http delete sslcert ipport=0.0.0.0:8172

# set the current certificate:
& netsh http add sslcert ipport=0.0.0.0:8172 certhash=$thumb appid="{$guid}"

# Set registry key so Web Management Service UI in IIS matches the new certificate selection

$registryPath ="HKLM:\Software\Microsoft\WebManagement\Server\"
$name="SslCertificateHash"

$hexValue= ($thumb -split '(.{2})' -ne '' -replace '^', '0X')
$binaryHash = ([byte[]] $hexValue)
New-ItemProperty -Path $registryPath -Name $name -Value $binaryHash -PropertyType BINARY -Force 
```
## Running In-Process vs Launch New Process
The Powershell deployment task can run in two modes on Windows: In-Process and as a New Process. This option mainly affects the process features when the background service is attempting to run the task as an impersonated user. In-Process has very limited user impersonation abilities, New Process has extended Impersonation capabilities but different limitations. 

In all cases the background service will attempt to run your task as the user you specify in an impesonation context with a specific Windows *LogonType*: https://learn.microsoft.com/en-us/windows-server/identity/securing-privileged-access/reference-tools-logon-types - this affects things like reuse of credentials across network resources and the relevance varies greatly depending on what your script does and which other processes it calls into.

In all case you will need to test to determine the best option for your specific script. It is not always possible to get a script to work under impersonation and in those cases you may need to write out the relevant certificate variables like the thumbprint or file path then perform operations separately using your own filewatcher process or a scheduled task elsewhere.

## Troubleshooting

* In the Certify UI, you may test scripts by clicking the ▶ button. You should ideally test scripts after you have completed a successful certificate request so that you have real results and a certificate to work with.

* The `$result.ManagedItem.CertificatePath` value will be set to the filename (including path) of the PFX file containing the requested certificate, unless the site is new and has not had a successful Certificate Request, in which case the value will not be set.

* PowerShell Execution Policies may be set by your administrator which affect script execution. The app will try to set the policy to "Unrestricted" by default which may conflict with higher level policy settings. You can set the default script execution policy in the server settings file (then restart the Certify background service) `%PROGRAMDATA%\Certify\serviceconfig.json`
   * `"PowershellExecutionPolicy":"Unrestricted"` or
   * `"PowershellExecutionPolicy":"Bypass"` or
   * `"PowershellExecutionPolicy":""` (blank string) to use the default policy set by your administrator.