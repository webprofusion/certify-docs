---
title: Security and Access
description: Manage local users, roles, API tokens, service principals, joined-instance access, and OIDC sign-in for Certify Management Hub.
---

# Security and Access

## Security Areas

Under **Settings > Security**, the Hub UI exposes:

- **Users**
- **Roles**
- **API Access**
- **OpenID Connect (OIDC)**

## Security Principals

The Hub security model includes different kinds of principals, such as:

- users
- applications or services
- groups
- managed instances

These principal types separate access for people, joined instances, managed challenge clients, and ACME consumers.

## Users and Roles

Use **Users** and **Roles** for human administrators and operators.

Typical flow:

1. Create or locate the user account.
2. Assign one or more roles.
3. Confirm the user signs in and sees only the expected features.

Use narrower roles wherever possible.

## API Access

Use **API Access** whenever a non-interactive client needs access to the Hub.

This includes:

- joined CCM instances
- joined Agents
- managed challenge consumers
- managed ACME consumers
- scripts or automations using the API directly

Recommended pattern:

- create a distinct security principal for each real consumer or consumer group
- create a token for that principal
- scope that token only to the roles it actually needs

This makes review and revocation easier.

## Joining Keys

By default, the Hub creates a joining API key during installation.

Use that key to join:

- *Certify Certificate Manager* instances
- *Certify Management Agent* instances

If you manage different organizations, environments, or trust zones, use separate joining principals and tokens.

## Managed Instance Roles

Managed instances can also receive roles beyond the basic join permission.

One important example is **Cert Consumer**, which allows a managed instance to consume certificates sourced from the Hub through an external certificate subscription.

Use managed instance roles when the instance needs access to a specific service, not just general Hub connectivity.

## Tag-Scoped Managed Instance Access

For certificate subscriptions, assign **Cert Consumer** to the managed instance and filter that role by tag.

This limits the source certificates visible to that instance.

Typical pattern:

1. Tag the Hub-managed certificates.
2. Assign **Cert Consumer** to the managed instance.
3. Scope or filter that role by the relevant tags.

This is the recommended way to expose only the intended certificates to a given subscriber.

## Managed Challenge Consumers

For managed DNS challenges, create a specific application or service principal and scope its API token to the managed challenge consumer role.

This keeps DNS challenge access separate from instance administration.

## Managed ACME Consumers

For the managed ACME service, create a dedicated principal and API token for each ACME client or service group. Where supported, expose the token as EAB credentials to the client.

This separates:

- instance joining
- managed DNS challenge usage
- ACME proxy service usage

## OIDC Sign-In

The Hub can also authenticate users through external OIDC providers.

The practical flow is:

1. Configure the provider under **OIDC**.
2. Let the user sign in once.
3. Assign Hub roles to the created account.
4. Have the user sign in again with the provider.

OIDC changes authentication, not authorization. Users still need Hub roles.

See [OIDC configuration](oidc.md) for the provider setup details.

## Security Practices

- Change default admin credentials immediately after installation.
- Use separate service principals for different integration purposes.
- Scope API tokens narrowly.
- Prefer named principals over shared anonymous secrets.
- Review unused tokens and old join keys regularly.
- Do not join a Hub you do not control or trust.

## Access Problems

### A user can sign in but sees almost nothing

They probably authenticated successfully but do not yet have the required Hub roles.

### A joined instance does not appear or cannot act correctly

Check the join token scope, instance version compatibility, and whether the instance identity was cloned from another machine.

### A managed challenge or ACME client cannot access the service

Check that:

- the principal exists
- the token is active
- the token includes the intended scoped role
- the client is using the correct Hub API URL

### A managed instance cannot see any subscribable Hub certificates

Check that:

- the managed instance has the **Cert Consumer** role
- the role scope or tag filter matches the source certificates
- the source certificates are tagged as expected

## Read Next

- [Certify Certificate Manager instances](ccm.md)
- [Certify Management Agent](agent.md)
- [Certificate subscriptions](certificate-subscriptions.md)
- [Managed Challenges](managedchallenges.md)
- [Managed ACME Service](acme-server.md)
- [OIDC configuration](oidc.md)
