---
title: Certificate Subscriptions
description: Subscribe a managed instance to a certificate sourced from the Hub, and control certificate visibility with tag-scoped Cert Consumer roles.
---

# Certificate Subscriptions

## Scope

A certificate subscription allows a managed instance to use a certificate sourced from the Hub instead of renewing that certificate locally.

In the certificate editor this appears as **Use External Subscription**.

## Subscription Model

With a subscription:

- the source certificate is renewed on the source system
- the consuming instance does not renew that certificate locally
- the consuming instance retrieves the source certificate when it updates
- local deployment still happens on the consuming instance

This is useful when one system should own renewal while another should only consume the resulting certificate.

## Common Uses

- one Hub-managed certificate is deployed to multiple managed instances
- a remote instance should receive an updated certificate but should not hold CA accounts or DNS credentials
- renewal logic should stay centralized while deployment stays local to the consuming machine

## Editor Fields

When **Use External Subscription** is enabled, the main fields are:

- **Source Type**
- **Retrieval Mode**
- **Managed Hub Certificate**

The editor shows **Managed Hub** as the source type and **Auto** as the retrieval mode.

## Access Control

The list of available source certificates depends on the managed instance permissions defined in the Hub.

Required access:

- go to **Security > Users > Managed Instances** in the Hub
- assign the **Cert Consumer** role to the managed instance
- filter that role by tag so the instance can only use the intended certificates

Without that permission, the instance cannot fetch source certificates from the Hub.

## Configuration

1. Create and maintain the source certificate in the Hub. 
2. Apply tags to that certificate if tag-scoped access will be used.
3. In the Hub, assign **Cert Consumer** to the managed instance and filter by tag where required.
4. On the consuming instance, create or edit the certificate definition.
5. Enable **Use External Subscription**.
6. Select the source type and source certificate.
7. Save and validate the resulting deployment behavior on the consuming instance.

The source system owns renewal. The consuming instance owns local use of the retrieved certificate, including deployment paths, tasks, and permissions.

Currently you should not apply a PFX password on teh source certificate as the consumer will not be able to decrypt that.

## Common Issues

### The Hub certificate is not available for selection

This usually means the managed instance does not have permission to fetch source certificates.

Check:

- that the instance has the **Cert Consumer** role
- that the role is tag scoped correctly (if tag scoping is being used)
- that the *source certificate tags* match the scope filter

## Read Next

- [Hub architecture and terminology](../concepts/architecture.md)
- [Security and access](security-and-access.md)
- [Choose a management model](../concepts/management-models.md)
- [Request and deploy certificates](request-and-deploy-certificates.md)
