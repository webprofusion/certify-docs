---
id: ssl-windows
title: Using Certificates in Windows
---

Using SSL/TLS certificates in Windows has a few aspects that can trip you up if you don't know about them. This guide outlines some key points.

# There Can Be Only One - SSL Binding Per Port/IP
If you use a fixed IP for your website you may not want to do that for your SSL binding as well. Windows only allows one SSL binding per specific IP, per Port (so typically 443). 

The good news is that **if you do not specify a fixed IP for your binding**, Windows can decide which website to match port 443 requests against using **Server Name Indication (SNI)**. 

If you use a binding of IP (All Unassigned) in IIS you can then share port 443 across multiple websites by also specifying the hostname to match against in your binding, and enabling SNI.

Certify does this for you by default, but **if you already have fixed IP bindings for SSL certificates look out for issues**. Unless you have multiple IP addresses (which are not specifically bound to another SSL certificate) then creating any new certificate bindings will result in a conflict, and you could start seeing the wrong certificate being served by IIS for your website. 

**IP binding conflicts are the number one reason for certificate confusion in Windows/IIS.**