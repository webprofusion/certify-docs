---
title: Certificate Authorities and Stored Credentials
description: Configure CA accounts, failover, staging, and reusable stored credentials for certificate requests, DNS validation, and deployment in the Hub.
---

# Certificate Authorities and Stored Credentials

Most certificate workflows depend on two settings areas:

- **Certificate Authorities**
- **Stored Credentials**

Both are available under **Settings** and are usually managed per target instance.

## Certificate Authorities

The Hub uses CA accounts to order certificates from ACME-enabled certificate authorities.

The settings page distinguishes between:

- **ACME CA Accounts**
- the broader list of known **Certificate Authorities**

The important item is the account configured on the selected target instance.

## CA Accounts

A CA account represents the registration that the target instance uses when talking to a specific CA.

You need at least one suitable account before the Hub can request certificates.

Typical account choices include:

- Let's Encrypt
- Google Trust Services or Google Cloud ACME
- private or local ACME services where supported
- other compatible public or private ACME providers

## Production and Staging

Use **Production** accounts for real trusted certificates.

Use **Staging** accounts when you need to:

- test automation safely
- verify new authorization paths
- avoid production rate limits during early setup

If you use staging, use the matching staging option in the certificate settings as well.

## Automatic CA Failover

General settings exposes **Enable Automatic CA Failover** and a **Preferred CA** selector.

Use this only if:

- you have valid compatible CA accounts configured
- you understand which certificates can be issued by the alternative CA
- your environment can tolerate CA switching when the preferred provider fails

For simpler environments, keep one CA path first and add failover later.

## Local ACME and Managed ACME

The UI may also show the local Hub ACME service alongside public CAs. Treat that as a separate service model, not as a replacement for normal public CA accounts.

Use the managed ACME service when you want the Hub to provide an ACME-facing endpoint to other clients. Use normal ACME CA accounts when the Hub or target instance is ordering the certificate directly.

## Stored Credentials

Stored credentials are reusable secrets such as:

- DNS API keys
- passwords
- token pairs or other provider credentials

They are used by features such as:

- DNS authorization
- managed challenges
- deployment tasks
- instance-specific integrations

## Credential Reuse

Reuse one stored credential when:

- the same DNS zone or provider account is used by many certificates
- the same deployment integration needs the same credential repeatedly
- you want one controlled credential instead of duplicating secrets in many definitions

Avoid over-sharing when:

- different teams or tenants should be isolated
- the credential scope is broader than required
- you need clear ownership and revocation paths

## Recommendations

- Create CA accounts on the target instance that will perform the work.
- Keep staging and production clearly separated.
- Reuse stored credentials deliberately, not automatically.
- Name credentials and CA accounts so their purpose is obvious later.
- Add failover only after the primary path is stable.

## Common Errors

### There is no matching ACME account

This usually means the selected target instance does not have a compatible CA account configured for the certificate settings.

### DNS validation cannot proceed

This often means the required stored credential is missing, scoped incorrectly, or configured on a different target instance than the one performing the request.

## Read Next

- [Request and deploy certificates](request-and-deploy-certificates.md)
- [Managed Challenges](managedchallenges.md)
- [Managed ACME Service](acme-server.md)
