---
id: hashicorp-vault
title: Deploy to HashiCorp Vault
sidebar_label: HashiCorp Vault
description: Stores the certificate, private key, intermediates and PFX as a secret in HashiCorp Vault.
---

The *Deploy to Hashicorp Vault* task writes the certificate and its private key to a secret in HashiCorp Vault, using the Vault HTTP API. Use it when your applications or automation read their certificates from Vault.

## Before you start

In Vault:

- Use a KV version 2 secrets engine (for example the default `secret/` mount). The task sends the secret in the KV version 2 format.
- Decide the path for the secret, e.g. `secret/data/examplecert`. For KV version 2 the API path includes `/data/` after the mount name.
- Create a token for Certify with a policy that allows writing to that path, for example:

```hcl
path "secret/data/examplecert" {
  capabilities = ["create", "update"]
}
```

## Setting up the task

1. Add the *Deploy to Hashicorp Vault* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: an *API Key or Token* credential containing your Vault token. Select *New* to add one.
   - **Vault URI** (required): the address of your Vault server, without a trailing `/`, e.g. `http://127.0.0.1:8200` or `https://vault.example.com:8200`.
   - **Vault Namespace** (optional): the Vault Enterprise namespace, e.g. `admin`. It is sent in the `X-Vault-Namespace` header.
   - **Path to Secret** (required): the API path of the secret, starting with `/v1/`, e.g. `/v1/secret/data/examplecert`.
3. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued. On KV version 2, each run writes a new version of the secret.

## How it works

- The task sends an HTTP `POST` to the *Vault URI* followed by the *Path to Secret*, with your token in the `X-Vault-Token` header. If *Vault Namespace* is set, it is sent in the `X-Vault-Namespace` header.
- The secret contains these keys:
  - `key`: the private key, in PEM format.
  - `cert`: the certificate, in PEM format.
  - `intermediates`: the intermediate certificates, in PEM format.
  - `pfx`: the full PFX file, base64 encoded. If the managed certificate has a PFX password (*Certificate > Advanced > Signing & Security*), the PFX is protected with that password.
- Before it runs, and when the task is previewed, the task checks that *Vault URI* is an `http` or `https` URL and that *Path to Secret* is set. It does not connect to Vault when previewed.

## Troubleshooting

- **Vault storage failed**: Vault rejected the request. The message includes Vault's response, for example a permission denied error if the token's policy doesn't allow writing to the path.
- **Vault URI is required and must be an http or https URL**: enter the full address including the scheme, e.g. `https://vault.example.com:8200`.
- **Path to Secret is required**: enter the API path of the secret, e.g. `/v1/secret/data/examplecert`.
- Check that the *Vault URI* and *Path to Secret* join to form the correct URL. The task joins them as they are, without adding or removing a `/`.
