---
id: commandline
title: Command Line (CLI) Options
---

A handful of options are available using the command line tool *certify.exe*. This can be found in the installation directory. 

Most users do not need to use the command line options at all as by default all certificate renewals are taken care of automatically by the Certify background service.

Usage: ```certify <command>```

- ```certify renew``` : renew certificates for all auto renewed managed certificates, if they are due or have not yet been requested.
- ```certify renew --renew-all-due``` : renew all certificates which are due or have not yet been requested even if auto-renew is not enabled.
- ```certify renew --force-renew-all``` : renewal for all auto renewed certificates even if they are not yet due.
- ```certify renew --renew-witherrors``` : attempt renewal for all certificates which have most recently failed to renew.

- ```certify list``` : list managed certificates and current running/not running status in IIS
- ```certify diag``` : check existing ssl bindings and managed certificate integrity
- ```certify importcsv``` : import managed certificates from a CSV file. See [CSV Import](csv-import.md) for more details

