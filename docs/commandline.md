---
id: commandline
title: Command Line (CLI) Options
---

A handful of options are available using the command line tool *certify.exe*. This can be found in the installation directory.

Usage: ```certify <command>```

- ```certify renew``` : renew certificates for all auto renewed managed sites, if they are due or have not yet been requested.
- ```certify list``` : list managed certificates and current running/not running status in IIS
- ```certify diag``` : check existing ssl bindings and managed certificate integrity
- ```certify importcsv``` : import managed certificates from a CSV file. See [CSV Import](csv-import.md) for more details

