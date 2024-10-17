---
id: commandline
title: Command Line (CLI)
---

A set of command line are available using the tool _certify.exe_ which is found in the installation directory. The commands must be performed using an elevated administrators account.

:::tip
Most users do not need to use the command line options at all. By default all certificate renewals are taken care of automatically by the Certify background service.
:::

Usage: `certify <command>`

## Manage ACME Accounts

- `certify acmeaccount list`: list registered acme account details (JSON output)

- `certify acmeaccount add <ACME CA ID> <your contact email> <optional EAB key id> <optional EAB Key>`: add a new ACME account

You can use the `acmeaccount add` command to add/create a new ACME account registration. Using this command implies your agreement with the chosen ACME CAs current terms and conditions :

#### Example - Create Let's Encrypt Account:

`certify acmeaccount add letsencrypt.org hosting@example.com`

#### Example - Add Zero SSL Account with your EAB key id and key:

`certify acmeaccount add zerossl.com hosting@example.com "abcdkeyid" "_Example_Key_Value_"`

### Listing Managed Certificates

- `certify list` : list managed certificates and current running/not running status in IIS

- `certify list --json <path-to-output-json>` : output list of managed certificates as JSON to a given file path.

### Performing Renewals and Deployment Tasks

- `certify renew` : renew certificates for all auto renewed managed certificates, if they are due or have not yet been requested.

- `certify renew id=<first item id>,<next item id>` : target the specific comma separated list of IDs (no spaces), optionally with other renewal flags.

- `certify renew --renew-all-due` : renew all certificates which are due or have not yet been requested even if auto-renew is not enabled.

- `certify renew --force-renew-all` : renewal for all auto renewed certificates even if they are not yet due.

- `certify renew --renew-witherrors` : attempt renewal for all certificates which have most recently failed to renew.

- `certify deploy "<managed cert id>" "<task id>"` : perform a specific deployment task for the given managed certificate. See the Manual trigger mode for deployment tasks.

### Adding or Remove Managed Certificates

- `certify importcsv` : import managed certificates from a CSV file. See [CSV Import](csv-import.md) for more details

The `certify add` and `certify remove` commands can be used to add or remove domains from an existing managed certificate or create a new managed certificate. You can find the correct managed certificate ID in the app under _Certificate > Advanced > Actions > Managed Certificate Reference Id_ (e.g. `a02e3afe-49ba-470a-83e5-2e397aa946eb:1`). The remove command accepts `any` as the managed cert id to remove the matching domains from any managed certificates.

These will not request/renew the actual certificate unless you append `--perform-request` to the end of the command. These commands assume the same domain validation settings are being used for all domains on the same managed certificate:

- `certify remove <managed cert id, or any> domain1.test.com;domain2.test.com` : remove one or more certificates from the configuration of a managed certificate. If removing a domain will mean there are zero domains remaining on the certificate then the managed certificate will be removed completely.

- `certify add <managed cert id, or new> domain1.test.com;domain2.test.com` : add one or more additional domains to the configuration of a managed certificate. e.g. `certify add new example.com`

- `certify add new domain1.test.com;domain2.test.com --template C:\Temp\managedcert-template.json` : add new managed cert with given domain, using a template (json exported from an existing managed cert). 

:::info using templates
Templates are an advanced feature intended only for users who require managed certificate automation with non-default challenge configuration (e.g. DNS validation).

To generate a template:
- Use `certify list --json output.json` to export your managed certificates as JSON
- Edit the JSON file down to a single item, removing the array `[ ... ]`
- Save the file as your new template. Domains etc will be discarded from the template and you still need to provide these arguments

**Templates are not guaranteed to stay compatible between major version updates so you should test integrations which use them with each new release.**
:::


### Stored Credentials
For advanced automation scenarios you can add/update stored credentials or list your existing items:

- `certify credential store <unique storage key GUID> "<title>" "<type id>" "<secret>"` : for advanced automation use. Stores or updates a stored credential.

- `certify credential list` : list current stored credential summary information. This does not show secret values.

Note that when storing credentials information such as the Type ID and JSON format for the secrets will vary by credential type and are not arbitrary. Contact support to discuss your requirements.

### Diagnostics

- `certify diag` : check existing ssl bindings and managed certificate integrity

- `certify httpchallenge keys=stop,configcheck` : run the temporary http challenge server on port 80 to test firewall and routing configuration. This uses http.sys to register a listener for ACME http challenges as `http:/*/.well-known/acme-challenge/` and will not conflict with IIS. The server will run for 60 seconds after the last matching request is received or until stopped by calling the control key. 

With the example control key `stop` and config check key `configcheck` you can:
- test your servers response using `http://<your domain or server ip>/.well-known/acme-challenge/configcheck` e.g. `http://127.0.0.1/.well-known/acme-challenge/configcheck`  
- stop the service using `http://<your domain or server ip>/.well-known/acme-challenge/stop`. 

The user agent returned should be `Certify/HttpChallengeServer`

### Managing license activation

- `certify activate <email> <key>` : activate the license for this instance of *Certify Certificate Manager*. Useful for larger scale automated deployments.

- `certify deactivate <email>` : deactivates the license for this instance of *Certify Certificate Manager*.
