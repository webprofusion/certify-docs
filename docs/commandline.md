---
id: commandline
title: Command Line (CLI)
---

A handful of options are available using the command line tool *certify.exe*. This can be found in the installation directory. 

Most users do not need to use the command line options at all as by default all certificate renewals are taken care of automatically by the Certify background service.

Usage: `certify <command>`

- `certify renew` : renew certificates for all auto renewed managed certificates, if they are due or have not yet been requested.

- `certify renew --renew-all-due` : renew all certificates which are due or have not yet been requested even if auto-renew is not enabled.

- `certify renew --force-renew-all` : renewal for all auto renewed certificates even if they are not yet due.

- `certify renew --renew-witherrors` : attempt renewal for all certificates which have most recently failed to renew.

- `certify deploy "<managed cert id>" "<task id>"` : perform a specific deployment task for the given managed certificate. See the Manual trigger mode for deployment tasks.

- `certify list` : list managed certificates and current running/not running status in IIS

- `certify list --json <path-to-output-json>` : output list of managed certificates as JSON to a given file path.

- `certify diag` : check existing ssl bindings and managed certificate integrity

- `certify activate <email> <key>` : activate the license for this instance of Certify The Web. Useful for larger scale automated deployments.

- `certify importcsv` : import managed certificates from a CSV file. See [CSV Import](csv-import.md) for more details

In addition there are `certify add` and `certify remove` commands to add or remove domains from an existing managed certificate. You can find the correct managed certificate ID in the app under *Certificate > Advanced > Actions > Managed Certificate Reference Id* (e.g. `a02e3afe-49ba-470a-83e5-2e397aa946eb:1`). 

These will not request/renew the actual certificate unless you append `--perform-request` to the end of the command. These commands assume the same domain validation settings are being used for all domains on the same managed certificate:

- `certify add <managed cert id, or new> domain1.test.com;domain2.test.com` : add one or more additional domains to the configuration of a managed certificate. e.g. `certify add new example.com`

- `certify add new domain1.test.com;domain2.test.com --template C:\Temp\managertcert-template.json` : add new managed cert with given domain, using a template (json exported from an existing managed cert).

- `certify remove <managed cert id> domain1.test.com;domain2.test.com` : remove one or more certificates from the configuration of a managed certificate. If removing a domain will mean there are zero domains remaining on the certificate then the managed certificate will be removed completely.

