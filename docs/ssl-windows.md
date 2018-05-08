---
id: ssl-windows
title: Using Certificates in Windows
---

Using SSL/TLS certificates in Windows has a few aspects that can prevent your site working properly if don't know about them. This guide outlines some key points. **See the special mention below for limitations regarding Windows Server 2008 R2 (IIS 7.5) and lower.**

## There Can Be Only One (SSL Binding Per Port/IP)
Windows only allows one SSL binding per specific IP, per Port (so typically port 443 for https). So if you use a fixed IP for your http website you probably don't want to do that for your SSL binding as well, unless you have lots of spare IP addresses on the server (you probably don't). This applies to all current versions of Windows.

## Server Name Indication (SNI)
The good news is that if you **do not specify a fixed IP for your binding**, Windows can decide which website to match port 443 requests against using **Server Name Indication (SNI)**. This applies to Windows Server 2012 and higher, or versions running IIS 8.0 or higher.

If you use a binding of IP *All Unassigned* in IIS you can then share port 443 across multiple websites by also specifying the hostname to match against in your binding, and enabling SNI.

## Binding Conflicts
Certify configures bindings with SNI enabled for you by default, but **if you already have fixed IP bindings for SSL certificates look out for issues**. Unless you have multiple IP addresses (which are not specifically bound to another SSL certificate) then creating any new certificate bindings will result in a conflict, and you could start seeing the wrong certificate being served by IIS for your website. 

**IP binding conflicts are the number one reason for certificate confusion in Windows/IIS.** 
If your site is serving the wrong certificate this is probably the cause.

 ## Invalid Private Key Permissions
If IIS cannot read or otherwise use the private key for your SSL certificate (either it's corrupted or it was created by a different user account) it will fallback to the next SSL Certificate it can find. This usually results in the website being presented with the wrong certificate (and results in various security errors in the Web Browsers). If IIS can't find another SSL certificate it will fail to serve any content at all. For this reason, be careful using non-standard accounts to create certificates. Changing the Certify SSL Manager background service to run under an alternative service account is not recommended or supported.

# Windows Server 2008 R2 (IIS 7.5) Limitations
Windows Server 2008 R2 and lower versions do not support SNI, so when a certificate binding is created it is associated with the IP address of the machine (actually the IP and port, usually port 443 for https). For this reason it is often difficult to use Server 2008 R2 or lower to host more than one https site.

 Unless you have multiple IP addresses available on the machine (or you use a non-standard port) you will only be able to have one https/certificate binding in IIS. If two or more bindings point to the same certificate (for instance a Wildcard certificate, or a SAN certificate with multiple host names included), deleting one binding will also affect the other binding(s) and you will need to manually fix bindings.

