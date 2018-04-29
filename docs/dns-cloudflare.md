---
id: dns-cloudflare
title: Cloudflare DNS
---

## Setup your DNS API credentials
To use the Cloudflare DNS API, you need to setup your API key: 

- Sign In to: https://www.cloudflare.com/dns/

- Under your Domain Summary, copy down your Zone Id, you will need this later.
- Select Get your API Key, which will take your to 'My Profile'
- Under API Keys, select Global API Key
- Copy down the API Key.

## Add New Stored Credential

Now add a new Stored Credential in Certify, choosing Cloudflare DNS as the provider type, enter:
    - Your Cloudflare Account Email Address
    - Your API Key
    - Select Save.

When using the credential as part of DNS validation in the app you will also be prompted for the Zone Id, to ensure updates apply to the correct domain.
