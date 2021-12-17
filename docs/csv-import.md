---
id: csv-import
title: CSV Bulk Import
---

You can perform a bulk import of managed sites (requires the registered version) from a CSV file using the following method:

**Note: Bulk import of more than 200 domains/managed certificates in one batch is not recommended. The app can handle thousands of new items but the ACME CA (Let's Encrypt) API will rate limit requests. If your domains fail to renew (DNS issues etc), it's easier to troubleshoot a smaller number of domains. Large bulk imports are not recommended for mass migration from one server to another.**

## Create a new CSV file

Your file should be in the format IIS SiteID, Name, Domain1;Domain2;Domain3

Such as:

```
0, Test, test.com;www.test.com
3, TestSite2(Test again), example.com;subdomain.example.com

```

## Perform CSV import

- Open a new Command Prompt (Run as Administrator).

```
cd C:\Program Files (x86)\Certify\

certify importcsv c:\temp\sites.csv
```

If you have the main Certify SSL Manager UI open you will see the sites being added as they are imported. Once added you can then modify any required settings.

Performing the same import twice will create duplicates so you should backup your c:\programdata\certify\manageditems.db first in case you need to restore it.

## Requesting Certificates after CSV Import

The import will set up new managed certificates in the app but will not request or apply any certificates until the next automated renewal run (which is hourly).

To initiate the certificate requests immediately use the command line 'renew' option as Administrator, which will perform requests and deployment for all pending certificate renewals (including certificates not yet requested):

`C:\Program Files\CertifyTheWeb> certify renew`

# Advanced CSV options

You can optionally specify the CSV columns to import and their order by specifying a header row including any of:

```CSV
siteid, name, domains, primarydomain, includeinautorenew, performautoconfig,performchallengefilecopy, performextensionlessconfigchecks,performtlssnibindingconfigchecks,performautomatedcertbinding,enablefailurenotifications, prerequestpowershellscript, postrequestpowershellscript, webhooktrigger, webhookmethod, webhookurl,webhookcontenttype, webhookcontentbody
```
