---
id: dnsmadeeasy
title: DnsMadeEasy DNS API
---

## Setup your DNS API credentials
To use the DnsMadeEasy DNS API, you need to setup your API key: 

- Sign In to: https://dnsmadeeasy.com/account/info

- Under Config > Account Information, at the bottom of the page, select 'Generate New API Credentials'
- Copy down the API Key and API Secret  fd24d56f-1c3e-4789-bb69-b24c3cdf4c98

## Add New Stored Credential

Now add a new Stored Credential in Certify, choosing DnsMadeEasy DNS as the provider type, enter:
    - Your API Key
    - Your API Secret
    - Select Save.

When using the credential as part of DNS validation in the app you will also be prompted for the Zone Id (in this case, your domain name), to ensure updates apply to the correct domain.

Your Zone Id can be found by browsing to your domain in the control panel, the ZoneId is the number at the end of the url:
e.g.: ZoneId 1234567: `dnsmadeeasy.com/dns/managed/1234567`
