---
title: Hub Architecture and Terminology
description: Understand the core Certify Management Hub components, how they relate to each other, and which settings stay local to each managed instance.
---

# Hub Architecture and Terminology

## Core Terms

*Certify Management Hub* is a web UI and API for administering certificate automation across one or more managed instances.

- The **Hub UI** is the web application you sign in to.
- The **Hub API** is the backend API used by the UI, joined instances, and optional service integrations.
- The **primary instance** is the integrated certificate management service running on the same machine as the Hub.
- A **target instance** is the instance that will store settings and perform the work for a certificate request or renewal.
- A **joined instance** is a *Certify Certificate Manager* or *Certify Management Agent* installation that has been connected to the Hub.
- A **managed certificate** is the stored configuration for a certificate order, renewal, and any related deployment tasks.
- A **certificate subscription** is a managed certificate that consumes a certificate sourced from the Hub instead of renewing that certificate locally.

## Components

### Hub UI

The Hub UI is used to:

- view certificate health and renewal state
- create and edit managed certificates
- manage settings for the selected target instance
- manage users, roles, API access, and OIDC sign-in
- define shared services such as managed DNS challenges

### Hub API

The Hub API backs the UI and also supports:

- joined CCM and Agent instances
- managed challenge consumers
- the managed ACME service
- external integrations that need certificate or status data

API status is shown under **Settings > System > Status**.

### Primary Instance

The Hub includes an integrated certificate management service. In the UI this appears as the Hub instance, for example `HUB-SERVER-01 (Hub) [Management Hub]`.

That primary instance can:

- request and renew certificates locally
- run deployment tasks locally
- store local ACME accounts, stored credentials, and other per-instance settings
- act as the default target instance unless you choose another one

### Joined Instances

Joined instances are remote installations that the Hub can administer.

Typical joined instances:

- *Certify Certificate Manager* on Windows
- *Certify Management Agent* on Linux, macOS, or headless environments

Joined instances expose certificate definitions and most local settings through the same UI.

## Target Instance

Many Hub actions apply to one selected target instance rather than to the whole Hub.

The selected instance usually:

- store the certificate definition
- store the ACME account used for ordering
- store any required stored credentials
- perform the challenge response checks and certificate request
- run any configured deployment tasks

If the target instance is the Hub, the work runs on the Hub server. If it is a joined CCM or Agent instance, the work runs there.

## Certificate Subscriptions

A certificate subscription changes the normal renewal model.

With a subscription:

- the source certificate is renewed on the source system
- the consuming instance does not renew that certificate locally
- the consuming instance retrieves the updated certificate from the Hub
- local deployment still happens on the consuming instance

This is useful when renewal should stay centralized but deployment should remain local to the machine using the certificate.

Subscription visibility is controlled through managed instance permissions. The model uses the **Cert Consumer** role, typically filtered by tag so a managed instance can only see the intended source certificates.

## Setting Scope

### Per-instance

- ACME CA accounts
- stored credentials
- external certificate manager discovery settings
- maintenance windows used by certificate renewals
- certificate deployment tasks
- managed certificate definitions

### Hub-wide

- users and role assignments
- API tokens and service principals
- OIDC provider configuration
- managed challenge definitions
- managed ACME service access model
- Hub feature enablement and status views

## Feature Areas

Under **Settings > System > Features**, these feature areas are shown:

- **Management Hub**: administer multiple managed instances from one UI
- **Certificate Management**: request and renew certificates directly on the selected instance
- **ACME Challenge Services**: managed DNS challenge handling through the Hub API
- **ACME Proxy Services**: a managed ACME service that can proxy orders for compatible ACME clients

Not every deployment uses every feature.

## Operating Model

The Hub combines three roles:

1. A centralized admin console.
2. A local certificate automation instance on the Hub server.
3. An API platform for connected instances and services.

The documentation separates those roles into:

- product concepts
- certificate workflows
- settings and security administration
- integrations such as managed challenges, managed ACME, CCM, and Agent

## Read Next

- [Choose a management model](management-models.md)
- [Certificate subscriptions](../guides/certificate-subscriptions.md)
- [Manage certificates in the Hub](../guides/certificate-operations.md)
- [Request and deploy certificates](../guides/request-and-deploy-certificates.md)
