---
id: dns-persist
title: Persistent DNS Validation (dns-persist-01)
---

`dns-persist-01` is a DNS validation method in which you create one TXT record for a domain, once, and the Certificate Authority (CA) checks that same record for every later order and renewal. Unlike [`dns-01`](validation.md), the record does not change and nothing needs to update DNS when a certificate renews.

It suits domains whose DNS cannot be updated automatically, or where the people who manage DNS are not the people who manage certificates.

:::info Draft standard
`dns-persist-01` is defined by an IETF draft, [draft-ietf-acme-dns-persist](https://datatracker.ietf.org/doc/draft-ietf-acme-dns-persist/), which is still changing. CAs are adopting it gradually and may follow different revisions. Certify supports all revisions so far, and works out from the CA which form of record it needs.
:::

## How it works

For each domain you validate, you create a TXT record at `_validation-persist.<your domain>`. It names the CA and your ACME account:

```
_validation-persist.example.com. IN TXT "letsencrypt.org; accounturi=https://acme-v02.api.letsencrypt.org/acme/acct/1234567890"
```

- The first part is one of the CA's **issuer domain names**. The CA ignores records for other CAs, so several CAs can each have their own record at the same name.
- `accounturi` identifies the **ACME account** allowed to use the record. A record is for one account only, so a staging account and a production account each need their own record.
- `policy=wildcard` (optional) also allows wildcard certificates such as `*.example.com` and any subdomain of the domain. Without it, the record only validates the exact domain.
- `persistUntil` (optional) is a UNIX timestamp after which the CA stops using the record for new validations. Certificates already issued are not affected.

A wildcard identifier such as `*.example.com` uses the record of its base domain, `_validation-persist.example.com`, which must then include `policy=wildcard`. One record covers both `example.com` and `*.example.com`.

### Hashed account values (draft-02)

The latest revision of the draft replaces the plain account URL with a hashed value, so your account URL is not published in DNS:

```
_validation-persist.example.com. IN TXT "letsencrypt.org; accounturi=https://acme-v02.api.letsencrypt.org/acme/account-hash/sha-256/5SQm7n6tPh2-PlLbCKGnViTXX5z19SCN4cPGQHSk-kw"
```

The hash is calculated from the domain, your account key and your account URL. You don't need to calculate it yourself: Certify shows the value to use. Some points to know:

- By default each domain gets a different value, so records for different domains cannot be linked to one account. You can instead choose one value for every domain (hashed with the domain name `*`), which is simpler to manage but lets anyone see that the domains share an account.
- A record made before an account key change keeps working, as the CA keeps the account's earlier keys. New records should use the value for the current key.
- A CA that moves from an earlier revision to draft-02 stops accepting plain account URLs, so those records need replacing. Certify tells you when this happens.

Certify detects which form a CA needs from the CA's ACME directory: a CA following draft-02 publishes an `accountHashPrefix` and its issuer domain names there.

## Setting up dns-persist-01

1. In the certificate's **Authorization** settings, choose the **dns-persist-01** challenge type. There is no DNS provider to configure.
2. Open **Record Options** and select the **Certificate Authority** the certificate will use, production or staging. Each CA you have an account with is listed once, and the records are built for the account a request to that CA uses.
3. Optionally choose:
   - the issuer domain name, if the CA has more than one,
   - **policy=wildcard**, which is ticked automatically when the certificate has wildcard identifiers,
   - for draft-02 CAs, one account value for every domain,
   - a **persistUntil** date. The record stops being used from 00:00 UTC on that date.
4. On the **Records** tab, copy the name and value of each record and create them as TXT records with your DNS provider. Values longer than 255 characters must be entered as several strings within one TXT record; the zone file form shows how they split.
5. Use **Test** to check the records. The test looks up each record and reports exactly what is wrong if the CA would not accept it.

If the CA does not publish its issuer domain names, the record shows `<issuer-domain-name>`, which you replace with the name given in the CA's documentation.

## What happens at renewal

Before asking the CA to validate, Certify looks up the `_validation-persist` record itself and checks it against what the CA will accept. This check never stops the request: the CA always makes the final check, as the machine running Certify may see DNS differently (for example with split-horizon DNS). Instead:

- If a suitable record is found, this is logged. A warning is logged if its `persistUntil` date is less than two weeks away.
- If no suitable record is found, a warning in the log says what is wrong and gives the record the CA would accept, for example when:
  - no record exists at the name,
  - the record is for a different ACME account,
  - the record uses the plain account URL but the CA requires a hashed value (or the other way round),
  - the record has no `policy=wildcard` but the certificate has wildcard identifiers,
  - the record's `persistUntil` date has passed.

  If the CA then fails the validation, this warning usually explains why.
- If DNS cannot be queried from the machine running Certify, a warning is logged and the CA checks the record.

**Test** reports the same findings as warnings.

Records are never removed by Certify, as they are meant to persist.

## Security considerations

- Anyone with your ACME account key can obtain certificates for every domain with a record for that account, for as long as the record exists. Protect the account key, and use `persistUntil` if you want records to lapse.
- Remove the records of CAs and accounts you no longer use. Deactivating an ACME account stops all its records validating immediately.
- Keep track of which domains have `_validation-persist` records, and review them after any DNS security incident.
- A [CAA record](https://datatracker.ietf.org/doc/html/rfc8657) with an `accounturi` parameter can further limit which account may obtain certificates for a domain.
