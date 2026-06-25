---
title: Certificate Subscriptions
description: Subscribe a managed instance to a certificate sourced from the Hub, and control certificate visibility with tag-scoped Cert Consumer roles.
---

# Certificate Subscriptions

## Scope

A certificate subscription allows a managed instance (Certify Certificate Manager or Certify Management Agent, joined to the hub) to use a certificate sourced from the Hub instead of renewing that certificate itself via ACME etc.

In the managed certificate editor this appears as **Use Certificate Subscription**.

Using certificate subscriptions is entirely optional and instances can manage their entire renewal via ACME in the usual way, if preferred.

## Subscription Model

With a subscription:

- the source certificate is renewed on the source system (the hub), not using ACME on the local instance.
- the consuming instance retrieves the source certificate either when it updates (Push/Auto mode) or just when due for renewal (Pull mode)
- local deployment then happens (IIS, Deployment Tasks etc) as would normally happen if the instance had performed the renewal itself.
- If applicable for the local instance configuration, Maintenance Windows still apply.

This is useful to minimize the responsibility of individual instances, so they just handle the final deployment to local services.

## Common Uses

- one Hub-managed certificate needs to be deployed to multiple services or servers
- a remote instance should receive an updated certificate but should not hold CA accounts or DNS credentials
- the hub is optionally being used to manage all challenge responses (e.g. HTTP or DNS)

## Access Control

The list of available source certificates depends on the managed instance permissions defined in the Hub. When an instance joins the hub it is assigned a *Security Principal* identity in the hub. You can then assign scoped roles to that instance.

Required access:

- go to **Security > Users > Managed Instances** in the Hub
- assign the **Cert Consumer** role to the managed instance
- optionally filter that role by tag so that only managed certificates with the given tag can be consumed.

Without an assigned Cert Consumer role, the instance cannot fetch source certificates from the Hub.

## Configuration

1. Create and maintain the source managed certificate in the Hub as normal.
2. Apply tags to that certificate if tag-scoped access will be used.
3. In the Hub, assign **Cert Consumer** to the managed instance and scope role by tag where required.
4. On the consuming instance, create or edit the certificate definition.
5. Enable **Use Certificate Subscription**.
6. Select the source certificate.
7. Save and validate the resulting deployment behavior on the consuming instance by selecting *Request Certificate*. *Test* will check pull access against the source.

The source system owns renewal of the actual certificate. The consuming instance owns local use of the retrieved certificate, including deployment paths, tasks, and permissions.

Note: if a PFX password is applied to the source certificate the same PFX password will be required on the consumer to decrypt and use the PFX.

## Common Issues

### The Hub certificate is not available for selection

This usually means the managed instance does not have permission to fetch the source certificates.

Check:

- that the instance has the **Cert Consumer** role
- that the role is tag scoped correctly (if tag scoping is being used)
- that the *source certificate tags* match the scope filter

## Read Next

- [Hub architecture and terminology](../concepts/architecture.md)
- [Security and access](security-and-access.md)
- [Choose a management model](../concepts/management-models.md)
- [Request and deploy certificates](request-and-deploy-certificates.md)
