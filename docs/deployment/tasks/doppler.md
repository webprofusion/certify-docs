---
id: doppler
title: Deploy to Doppler
sidebar_label: Doppler
description: Stores the certificate, private key, full chain and PFX as secrets in a Doppler project config.
---

The *Deploy to Doppler* task writes the certificate and its private key as secrets in a [Doppler](https://www.doppler.com/) project config. Use it when your applications get their secrets from Doppler.

## Before you start

In Doppler:

- Note the name of the project, and of the config (environment) within it, e.g. `dev` or `prd`, where the secrets should go.
- Create a token that can write secrets to that config, for example a service token with read/write access.

## Setting up the task

1. Add the *Deploy to Doppler* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: an *API Key or Token* credential containing your Doppler token. Select *New* to add one.
   - **Project Name** (required): the Doppler project.
   - **Config Name** (required): the config in the project, e.g. `dev` or `prd`.
   - **Name for Certificate** (required): the secret name for the certificate, e.g. `EXAMPLE_COM_CERT`.
   - **Name for Private Key** (required): the secret name for the private key, e.g. `EXAMPLE_COM_KEY`.
   - **Name for Fullchain** (optional): the secret name for the certificate with its intermediates, e.g. `EXAMPLE_COM_FULLCHAIN`. Leave blank to skip this secret.
   - **Name for PFX** (optional): the secret name for the PFX file, e.g. `EXAMPLE_COM_PFX`. Leave blank to skip this secret.
3. Save, then run the task with the ▶️ play button.

Renewals run the task automatically after the new certificate is issued.

## How it works

- The task calls the Doppler API (`https://api.doppler.com/v3/configs/config/secrets`) to set the secrets in the project config. Secrets with the same names are updated. Other secrets in the config are not changed.
- It writes the certificate and private key secrets, plus the fullchain and PFX secrets if you set names for them:
  - Certificate: the certificate, in PEM format.
  - Private Key: the private key, in PEM format.
  - Fullchain: the certificate followed by the intermediate certificates, in PEM format.
  - PFX: the full PFX file, base64 encoded. If the managed certificate has a PFX password (*Certificate > Advanced > Signing & Security*), the PFX is protected with that password.
- Before it runs, and when the task is previewed, the task checks that the project and config names and the certificate and private key secret names are set. It does not connect to Doppler when previewed.

## Troubleshooting

- **Doppler project and config names required**: set both *Project Name* and *Config Name*.
- **Doppler secret names for the certificate and private key are required**: set both *Name for Certificate* and *Name for Private Key*.
- **Doppler update failed**: Doppler rejected the request. The message includes Doppler's response, for example when the token is invalid, doesn't have write access, or the project or config name is wrong.
