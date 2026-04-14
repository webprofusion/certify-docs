---
title: Certificate Authorities and Stored Credentials
description: Configure CA accounts, failover, staging, and reusable stored credentials for certificate requests, DNS validation, and deployment in the Hub.
---

# Certificate Authorities and Stored Credentials

Most certificate workflows depend on two settings areas: **Certificate Authorities** and **Stored Credentials**. Both are available under **Settings** and are usually managed per target instance. The certificate authority (ACME) account is what the Hub uses to request a certificate, and the stored credential is what it uses when it needs a reusable secret such as a DNS API key or password.

## Certificate Authorities

The Hub uses CA accounts to order certificates from ACME-enabled certificate authorities. On the settings page, you will usually see both **ACME CA Accounts** and the broader list of known **Certificate Authorities**. The important detail is the account configured on the selected target instance, because that is the account the Hub will actually use when it places a request.

## CA Accounts

A CA account is the registration a target instance uses when talking to a specific certificate authority. You need at least one suitable account before the Hub can request any certificates. Common choices include Let's Encrypt, Google Trust Services or Google Cloud ACME, private or local ACME services where supported, and other compatible public or private ACME providers.

## Production and Staging

Use **Production** accounts for real trusted certificates. Optionally use **Staging** accounts when you want to test automation safely, verify a new authorization path, or avoid production rate limits during early setup. If you choose staging, make sure the matching staging option is also selected in the certificate settings so the request uses the correct environment from start to finish.

Use of Staging accounts is generally rare in practice, more users just work with one production ACME account per instance.

## Automatic CA Failover

General settings includes **Enable Automatic CA Failover** and a **Preferred CA** selector. This can be useful, but only when you already have valid and compatible CA accounts configured, understand which certificates the alternative CA can issue, and are comfortable with the environment switching providers when the preferred one fails. In simpler environments, it is usually better to keep one CA path working first and add failover later.

## Local ACME and Managed ACME

The UI may also show the local Hub ACME service alongside public certificate authorities. Treat this as a separate service model, not as a replacement for a normal public CA account. Use the managed ACME service when you want the Hub to act as an ACME-facing endpoint for other clients. Use standard ACME CA accounts when the Hub or the target instance is ordering the certificate directly.

## Stored Credentials

Stored credentials are reusable secrets such as DNS API keys, passwords, token pairs, or other provider credentials. They are used by features like DNS authorization, managed challenges, deployment tasks, and other instance-specific integrations. Instead of entering the same secret again and again, you store it once and reference it where needed.

## Credential Reuse

Reusing a stored credential makes sense when the same DNS zone or provider account is used by many certificates, when the same deployment integration needs the same secret repeatedly, or when you want one controlled credential instead of copying secrets into many certificate definitions. At the same time, avoid sharing credentials too broadly. If different teams or tenants should stay separate, if the credential has wider access than necessary, or if you need clear ownership and revocation paths, create separate credentials instead.

## Recommendations

Create CA accounts on the target instance that will perform the work, and keep staging and production clearly separate. Reuse stored credentials deliberately rather than automatically, and name both credentials and CA accounts so their purpose is still obvious later. If you plan to use failover, add it only after the primary certificate path is stable and well understood.

## Common Errors

### There is no matching ACME account

This usually means the selected target instance does not have a compatible CA account configured for the certificate settings. In most cases, the fix is to check which target instance is doing the work and then confirm that it has the expected CA account available.

### DNS validation cannot proceed

This often means the required stored credential is missing, scoped incorrectly, or configured on a different target instance than the one performing the request. It can also mean the credential exists but does not give the level of DNS access needed for the selected zone or provider.

## Read Next

- [Request and deploy certificates](request-and-deploy-certificates.md)
- [Managed Challenges](managedchallenges.md)
- [Managed ACME Service](acme-server.md)
