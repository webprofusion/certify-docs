---
id: dns-godaddy
title: GoDaddy DNS
---

## Setup your DNS API credentials
To use the GoDaddy DNS API, you need to setup your API key and authentication secret: 

- Browse to: https://developer.godaddy.com/keys

- Create a New API Key, name it however you like but so other administrators of the same account know what it's purpose is (e.g. 'Certify') and choose 'Production'.

- Copy the new API Key and the Secret, you cannot recover the same secret after it has been displayed once.

## Add New Stored Credential

Now add a new Stored Credential in Certify, choosing Cloudflare DNS as the provider type, enter:
    - Your API Key
    - Your API Secret
    - Select Save.

When using the credential as part of DNS validation in the app you will be prompted for the "Zone Id", for this API use the DNS zone name, usually in the form of "yourdomain.com"
