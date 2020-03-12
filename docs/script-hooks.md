---
id: script-hooks
title: Scripting
---

# About Scripting

Certify is extensible via PowerShell scripts which can be configured to run before or after the Certificate Request (check `Show Advanced Options` and open the `Scripting` tab). The scripts are provided a parameter `$result` which contains the status and details of the managed certificate being requested. You can execute any commands including creating new processes, or using other command line tools.

A common use for scripting is to use your new certificate for services other than IIS websites, such as Microsoft Exchange, RDP Gateway, FTP servers and other services.

**Note: Before v4, the app is 32-bit as is the PowerShell process. See the 64-bit wrapper example below to run 64-bit commands (a common issue if a command is not found). From v4 onwards the PowerShell process is 64-bit.**

*By default the background service runs as Local System, so your scripts will execute in that context*, this can be important for issues regarding permissions, file system encryption etc. 

**Do not store scripts under the C:\Program Files\CertifyTheWeb\* folder. File stored there will be deleted next time you update the app**

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

## Pre-Request Script Hooks

Notes: Pre-request scripts are executed immediately before the Certificate Request is about to be made (including the challenge file configuration checks).

* The `$result.IsSuccess` value will always be `$false`.
* If for some reason your script would like to prevent the Certificate Request from being executed, you may set `$result.Abort` to `$true` and the site your script was executed for will be skipped.

### Example: Update IIS site root directory dynamically
```PowerShell
param($result)
$id = $result.ManagedItem.GroupId
$domain = $result.ManagedItem.RequestConfig.PrimaryDomain
[xml]$xml = . "$env:windir\system32\inetsrv\appcmd" list config /section:system.applicationHost/sites
$path = $xml.SelectSingleNode("//site[@id=$id]/application[@path='/']/virtualDirectory/@physicalPath").Value
$result.ManagedItem.RequestConfig.WebsiteRootPath = $path
write-output "Updated Path [$domain]: $path"
```

## Post-Request Script Hooks

Notes: Post-request scripts are executed immediately after the Certificate Request was completed, whether or not the request was successful and the certificate was automatically installed and configured according to the site configuration within Certify.
* The `$result.IsSuccess` value indicates whether or not the Certificate Request was successfully completed.
* The `$result.Message` value provides a message describing the reason for failure, or a message indicating success

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

### Example: Copy the PFX file to a Central Certificate Store (CCS) as a given user, for multiple domains

```PowerShell
# example script to copy the output PFX to a UNC path for Central Certificate Store
# Enabling CCS: https://techcommunity.microsoft.com/t5/iis-support-blog/central-certificate-store-ccs-with-iis/ba-p/377274
$result = Get-Content -Raw -Path C:\temp\ps-test.json | ConvertFrom-Json

$ccsPath="\\myserver\ccs"

if ($result.IsSuccess -eq $true) {

    # connect network share with credentials
    net use $ccsPath /USER:myserver\ccsuser password1

    # example file copy where cert contains webmail.example.com and autodiscover.example.com domains
    Copy-Item -Path $result.ManagedItem.CertificatePath -Destination $ccsPath\webmail.example.com.pfx -Force
    Copy-Item -Path $result.ManagedItem.CertificatePath -Destination $ccsPath\autodiscover.example.com.pfx -Force

    # disconnect network share
    net use $ccsPath /delete
}
```
### Example: Export certificate using OpenSSL to pem,crt,key etc for Apache (and other services)
Many services such as Apache, nginx and some mail servers etc work with certificates as pem or other formats. These generally need you to export the certificate and related public and private keys. The easiest way to do this is to install OpenSSL then use that to convert your PFX format certificate.

```PowerShell
param($result)

# script example adapted from https://community.certifytheweb.com/t/filezilla-server-ps-script/141/8

# Alias to your OpenSSL install
set-alias opensslcmd "C:\Tools\OpenSSL\openssl.exe" 

# Set paths to where keys will be saved. 
# This will vary depending on your required configuration. File name are not that important but your config must point to the same filenames.

$keypath = "C:\apache\conf\mydomain.com\"
$key = $keypath + "cert.key"
$rsakey = $keypath + "cert_rsa.key"
$pem = $keypath + "cert.pem"

# Get the latest PFX file path
$sourcepfx = $result.ManagedItem.CertificatePath

# Create the Key, RSA Key, and PEM file. Use the RSA Key & PEM for FileZilla
opensslcmd pkcs12 -in $sourcepfx -out $key -nocerts -nodes -passin pass:
opensslcmd rsa -in $key -out $rsakey
opensslcmd pkcs12 -in $sourcepfx -out $pem -nokeys -clcerts -passin pass:

# optional: restart the Apache service (example)
Restart-Service -Name Apache2.4 -Force
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

### Example: update Remote Desktop Role Certificates
This example assumes it's starting in a 32-bit instance and switches to the 64-bit powershell to import the 64-bit RemoteDesktop module. V4.x onwards of the app is 64-bit only.
```PowerShell
param($result)
set-alias ps64 "$env:windir\sysnative\WindowsPowerShell\v1.0\powershell.exe"
ps64 -args $result -command {
   $result = $args[0]
   $pfxpath = $result.ManagedItem.CertificatePath
   Import-Module RemoteDesktop
   Set-RDCertificate -Role RDPublishing -ImportPath $pfxpath -Force
   Set-RDCertificate -Role RDWebAcces -ImportPath $pfxpath -Force
   Set-RDCertificate -Role RDGateway -ImportPath $pfxpath -Force
   Set-RDCertificate -Role RDRedirector -ImportPath $pfxpath -Force
}
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
## Troubleshooting


* In the Certify UI, you may test scripts by clicking the "Test" button after entering the script filename for the hook you would like to test. This currently runs as your user account whereas the real renewal script will happen as Local System.
* For a testing pre-request script, the `$result.IsSuccess` value will be `$false`, and for a post-request script the value will be `$true`.
* The `$result.ManagedItem.CertificatePath` value will be set to the filename (including path) of the PFX file containing the requested certificate, unless the site is new and has not had a successful Certificate Request, in which case the value will not be set.

### Using 64-bit modules

If you attempt to import a module with [`Import-Module`](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/import-module?view=powershell-5.1) that does not run in 32-bit mode (i.e. RemoteDesktop), you may receive an error like `"Import-Module : The specified module 'RemoteDesktop' was not loaded because no valid module file was found in any module directory."`. To load a 64-bit module you can use this snippet to pass the `$result` object to a script running in 64-bit powershell:
```powershell
param($result)
set-alias ps64 "$env:windir\sysnative\WindowsPowerShell\v1.0\powershell.exe"
ps64 -args $result -command {
   $result = $args[0]
   write-output $result.IsSuccess
   import-module -name RemoteDesktop
   Set-RDCertificate ...
}
```
