---
title: Request and Deploy Certificates
description: Use the full Hub certificate workflow, including identifiers, authorization, advanced options, deployment, tasks, preview, test, and request actions.
---

# Request and Deploy Certificates

This guide covers certificates that are renewed on the selected target instance. For certificates sourced from the Hub and consumed by another managed instance, see [Certificate subscriptions](certificate-subscriptions.md).

## Prerequisites

Confirm:

- the correct **target instance** is selected
- at least one suitable ACME account exists on that instance
- any required stored credentials already exist
- you know whether deployment should happen automatically or through tasks

If ACME accounts or credentials are missing, see [Certificate Authorities and stored credentials](certificate-authorities-and-credentials.md).

## Certificate Actions

The certificate editor has four main actions:

- **Save**
- **Test**
- **Request Certificate**
- **Discard Changes** when editing an existing definition

Actions:

- **Save** stores your configuration without requesting a certificate.
- **Test** validates the configured authorization path and related prerequisites.
- **Request Certificate** starts the real certificate order.
- **Discard Changes** abandons unsaved edits.

## Editor Tabs

Main tabs:

- **Certificate**
- **Deployment**
- **Tasks**
- **Preview**

## Certificate Tab

The **Certificate** tab defines what certificate you want and how it should be issued.

Main inputs:

- the **Target Instance**
- a descriptive **Display Name**
- the certificate identifiers and validation method

The editor also includes **Use External Subscription**, which switches the certificate from local renewal to a source-certificate subscription model.

### Identifiers

This tab defines the names included on the certificate.

Supported inputs:

- adding identifiers manually
- selecting site bindings where supported
- using a primary subject plus optional additional identifiers

Use it for:

- the primary hostname
- any additional SAN entries
- wildcard names where your CA and validation method support them

### Authorization

This tab defines domain control validation.

Validation choice:

- use **HTTP** validation when the target instance can answer validation requests on the relevant host
- use **DNS** validation when HTTP is not appropriate or not possible

For DNS validation you may choose:

- direct DNS provider configuration on the target instance
- a local managed challenge if the certificate is hosted on the Hub itself
- a Hub-managed challenge path for authorized clients

If any identifier fails validation, the request cannot complete.

### Advanced

Use **Advanced** for non-default request settings.

Advanced settings include:

- **Certificate Authority**
- **Signing & Security**
- **General Options**
- **Actions**
- **Details**

Common cases:

- selecting a different CA or staging mode
- choosing key type or signing behavior
- using a custom CSR workflow
- setting special certificate request options

If there is no specific requirement, leave these settings near their defaults.

## Deployment Tab

The **Deployment** tab defines what happens after issuance.

Deployment can use:

- built-in deployment behavior
- additional deployment tasks

For supported local scenarios, **Auto** deployment can update matching bindings directly. This is most relevant where the selected target instance can update bindings itself, such as IIS on Windows.

Use built-in deployment when:

- the target platform supports it directly
- the default binding update behavior matches what you want

Use tasks when:

- deployment needs extra steps
- deployment targets are custom or non-standard
- files, services, or remote actions must be updated after renewal

## Tasks Tab

The **Tasks** tab defines extra actions before or after the certificate request.

Tasks are split into:

- **Deployment Tasks** that run after normal deployment
- **Pre-Request Tasks** that run before the request begins

Common cases:

- exporting certificate files
- restarting dependent services
- copying files to specific locations
- custom automation scripts

Tasks run on the selected target instance, so paths and permissions must match that machine.

## Preview Tab

The **Preview** tab shows what the configuration is expected to do.

Use Preview to confirm:

- the certificate has valid identifiers
- the expected deployment actions are visible
- the selected binding updates or tasks match your intent

If Preview shows no domains or no actionable output, correct that before requesting.

## Request Flow

1. Select the correct target instance.
2. Enter a useful display name.
3. Add identifiers.
4. Configure authorization.
5. Review advanced settings only if required.
6. Define deployment behavior.
7. Add pre-request or post-deployment tasks if needed.
8. Check Preview.
9. Run **Test**.
10. Run **Request Certificate**.

## Test Runs

Use **Test** whenever you change:

- identifiers
- DNS or HTTP authorization settings
- target instance
- deployment tasks
- CA or signing options

Testing helps catch problems before a real renewal.

## Common Mistakes

- creating the certificate on the wrong target instance
- forgetting to add a CA account on the selected target instance
- mixing HTTP validation with a host that the target instance cannot serve
- using local file or script paths that do not exist on the selected instance
- skipping Preview and Test before the first live request

## Read Next

- [Manage certificates in the Hub](certificate-operations.md)
- [Certificate Authorities and stored credentials](certificate-authorities-and-credentials.md)
- [Import, export, and migration](import-export-and-migration.md)
