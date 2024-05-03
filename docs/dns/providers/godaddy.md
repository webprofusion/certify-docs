---
id: godaddy
title: GoDaddy DNS
---

:::warning GoDaddy API Limits

Note: from April 2024 GoDaddy have limited their API to accounts which have 10 or more domains. Existing users who have less domains than this will encounter the error `GoDaddy DNS API :: Failed to determine root domain in zone.`

:::

## Setup your DNS API credentials
To use the GoDaddy DNS API, you need to setup your API key and authentication secret: 

- Browse to: https://developer.godaddy.com/keys

- Create a New API Key, name it however you like but so other administrators of the same account know what it's purpose is (e.g. 'Certify') and choose 'Production'.

- Copy the new API Key and the Secret, you cannot recover the same secret after it has been displayed once.

## Add New Stored Credential

Now add a new Stored Credential in Certify, choosing GoDaddy DNS as the provider type, enter:
- Your API Key
- Your API Secret
- Select Save.

When using the credential as part of DNS validation in the app you will be prompted for the "Zone Id", for this API use the DNS zone name, usually in the form of "yourdomain.com"
