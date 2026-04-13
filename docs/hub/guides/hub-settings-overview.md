---
title: Hub Settings Overview
description: Navigate the Hub settings areas, understand which settings are per-instance, and know where to go for certificate, security, operational, and system administration.
---

# Hub Settings Overview

## Target Instance

At the top of the Settings UI, the Hub shows a **Target Instance** selector.

Many settings apply to the selected instance, not globally.

Before making changes, confirm whether you mean to edit:

- the Hub's own integrated instance
- a specific joined CCM instance
- a specific joined Agent instance

## Settings Areas

The Hub UI exposes these main settings tabs:

- **Certificate Authorities**
- **Stored Credentials**
- **Maintenance Windows**
- **Import & Export**
- **General**
- **Security**
- **Licensing**
- **Tags**
- **System**

## Certificate Authorities

Purpose:

- add ACME accounts
- review account registration details
- prepare staging or production accounts on the selected instance
- support CA failover and normal certificate ordering

See [Certificate Authorities and stored credentials](certificate-authorities-and-credentials.md).

## Stored Credentials

Purpose:

- create reusable credentials for DNS or other integrations
- avoid repeating the same secret in many certificate definitions
- centralize credential rotation per target instance

See [Certificate Authorities and stored credentials](certificate-authorities-and-credentials.md).

## Maintenance Windows

Use this tab when certificate renewals must only run during approved time windows.

The live UI supports:

- named maintenance windows
- a default maintenance window
- unrestricted renewals when no window is enforced

Use maintenance windows only where required. Narrow windows reduce renewal flexibility.

## Import & Export

Use this area when:

- migrating certificate definitions from *Certify Certificate Manager*
- importing an exported archive into a chosen target instance
- previewing what will be imported before committing it

See [Import, export, and migration](import-export-and-migration.md).

## General

The General area groups settings such as:

- preferences
- external certificate managers
- service config
- certificate renewal settings
- default private key type
- automatic CA failover
- preferred CA
- ACME ARI behavior
- status reporting and telemetry

This tab controls default behavior for the selected instance.

## Security

Use Security to manage:

- users
- roles
- API access
- OIDC providers

This is the main Hub-wide access control area.

See [Security and access](security-and-access.md).

## Licensing

Use Licensing to:

- review license state
- apply a new license key
- manage product license activations
- plan license use across managed instances

## Tags

Use Tags to define categories that help organize certificates, instances, and other resources.

The tag system supports category definitions and dynamic values, which makes tags useful for filtering and reporting.

Use tags for:

- environment
- application or service name
- team ownership
- customer or tenant grouping

## System

Use System for runtime and platform checks.

This tab shows:

- **Features**: what major Hub features are enabled
- **Status**: Hub API, service config, platform, plugin, and datastore health information

Use this tab for checks such as:

- is the Hub API healthy
- what URLs are allocated
- is the service in development mode
- did plugins and datastore initialization complete correctly

## Administration Map

Use this split when deciding where to make a change:

- certificate issuance inputs: Certificate Authorities, Stored Credentials, General
- scheduling and organization: Maintenance Windows, Tags
- migration and bootstrap: Import & Export
- access control: Security
- licensing and runtime state: Licensing, System

## Read Next

- [Security and access](security-and-access.md)
- [Import, export, and migration](import-export-and-migration.md)
- [Day-2 Hub operations](day-2-operations.md)
