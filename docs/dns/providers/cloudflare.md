---
id: cloudflare
title: Cloudflare DNS
---

## Setup your DNS API credentials

To use the Cloudflare DNS API, you need to either setup your API Token or use a Global Auth Key:

### Setup using an API Token

- Sign in to: https://dash.cloudflare.com/profile/api-tokens
- Click on `Create Token` and enter a friendly name for this token such as `Certify API access`
- Add permissions required to access and update your DNS zones:
  - Add `Zone > Zone > Read`
  - Add `Zone > DNS > Edit`
- Under Zone Resources, select:
  - Include > All zones
- Update key and copy/store the API Token locally.

### Setup using a Global Auth Key

- Sign in to: https://www.cloudflare.com/dns/
- Under your Domain Summary, copy down your Zone Id, you will need this later.
- Select Get your API Key, which will take your to 'My Profile'
- Under API Keys, select Global API Key
- Copy down the API Key.

## Add New Stored Credential

Now add a new Stored Credential under Settings in Certify, choosing Cloudflare DNS as the provider type, enter:

Either:

- Your Cloudflare API Token

or:

- Account Email Address
- Your Auth Key

Then select Save. You can then Test your credentials. If you get a message saying `No Zones returned` your API Token does not have the required permissions and you need to update it.

When using the credential as part of DNS validation in the app you will also be prompted to select the Zone Id, to ensure updates apply to the correct domain.
