---
id: dns-account
title: Account Specific DNS Validation (dns-account-01)
---

`dns-account-01` is a variant of [`dns-01`](validation.md) DNS validation in which the TXT record name includes a label specific to your ACME account. Each ACME account (or each ACME client, as they each have their own account) then answers challenges at its own record name, so several of them can validate the same domain at the same time without overwriting each other's records.

:::info Draft standard
`dns-account-01` is defined by an IETF draft, [draft-ietf-acme-dns-account-label](https://datatracker.ietf.org/doc/draft-ietf-acme-dns-account-label/), which may still change. Your Certificate Authority (CA) must support it: check the CA's documentation before switching. Certify follows draft-03; the record format has not changed between revisions of the draft.
:::

## How it differs from dns-01

With dns-01, every client validating `example.com` uses the same record, `_acme-challenge.example.com`. With dns-account-01 the record is:

```
_<account label>._acme-challenge.example.com
```

The account label is an underscore followed by 16 characters, calculated from your ACME account URL (the first 10 bytes of its SHA-256 hash, in base32). For example, the account `https://example.com/acme/acct/ExampleAccount` has the label `_ujmmovf2vn55tgye`, so its record for `example.org` is `_ujmmovf2vn55tgye._acme-challenge.example.org`.

Everything else is as for dns-01:

- The TXT value is the same kind of value, and is different for every order and renewal.
- Certify creates and removes the record with your configured DNS provider, or pauses for you to create it with the Manual DNS option.
- A wildcard identifier such as `*.example.com` uses the record of its base domain.

The label depends only on the account URL, so it stays the same for every renewal using the same ACME account. A different account, including a staging account, has a different label.

## When to use it

dns-account-01 helps when more than one ACME client or account validates the same domain, for example:

- Several servers each request their own certificate for the same name.
- You use CNAME delegation, and want each server or account to have its own delegated record. With dns-01 there can be only one `_acme-challenge` CNAME per name, so all clients must share one delegation target.
- A certificate is renewed by more than one system during a migration.

If only one client validates each domain, dns-01 works just as well.

## Setting up dns-account-01

1. In the certificate's **Authorization** settings, choose the **dns-account-01** challenge type.
2. Choose the DNS update method and credentials, exactly as for dns-01. All DNS providers that support dns-01 can be used.
3. If you use a **CNAME Delegation Rule**, create the CNAME records at the account specific names. The hub's challenge settings show the record name for the **Certificate Authority** you select there (one entry for each CA, production or staging, you have an account with), which defaults to your certificate's CA. For example, with the rule `*.example.com:auth.example.net`, the CNAME for `www.example.com` is:

   ```
   _ujmmovf2vn55tgye._acme-challenge.www.example.com. CNAME _ujmmovf2vn55tgye._acme-challenge.auth.example.net.
   ```

4. Use **Test** to check that the DNS provider can create records.

The Management Hub's managed challenges also accept dns-account-01 records: a certificate using the hub managed challenge provider has its account specific record written by the hub. As for dns-01, CNAME delegation is applied by the hub's managed challenge; a record name the certificate's own delegation rule produces is accepted only where the hub's rule delegates to the same name, unless **Enforce Strict CNAME Delegation** is turned off.
