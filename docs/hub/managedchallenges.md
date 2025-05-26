---
id: managedchallenges
title: Managed Challenges
---
## Introduction

A managed challenge provides a way for the management hub to perform ACME challenge responses on behalf of other ACME clients. This is useful for DNS based challenges, so that your ACME clients (including Certify Certificate Manager) don't need to know privileged credentials with direct access to your DNS API.

:::warning[feature under development]

This feature is under development and documentation may refer to features and procedures that are not yet available.
:::


## How It Works
When you perform a certificate request on any ACME client, the CA will ask your ACME client to prepare a particular "challenge response" (an `_acme-challenge` TXT record) in your domains DNS. Your ACME client will call the Management Hub API with details of the record to be created and the hub will create the record on it's behalf.

## Getting Started
To use a managed challenge you need two things:
- A configuration for the managed challenge. This will specify which DNS provider and credentials will be used and importantly it will specify the matching domains the challenge configuration can be used for with a Domain Match Rule.
- An assigned API Token allowing access to use managed challenges. This will be used by your ACME client to call the management hub API. Generally you should use individual API keys specific to each consumer instead of sharing them across machines, that way when a service is retired you can also remove it's access and you can maintain a clear idea of which things still need access.


### Define a Managed Challenge configuration
Under *Services > Managed Challenges*, select `+ Add`:
- Select dns-01 as the challenge type
- Select the DNS provider specific to your domains DNS service. 
- Add or select existing stored credentials for updating DNS via the selected API.
- Populate the *Domain Match Rule* to specify the domains this configuration can update DNS for, then Save.

### Configure API Access
Before you can use your managed challenge you need to configure API access. This involves assigning an API token for a specific *Service Principle* (a specific user or app).

Under *Settings > Security > Users*, add a User to represent the consumer (user or app etc) accessing the service, then assign them the Managed Challenge Consumer Role. They can have any other roles they need, but you'll need this specific role to access managed challenges.

Under *Settings > Security > API Access*, select Add API Token, select the required security principle, enter a descriptive title etc for this consumer token so you know why it exists and what it's being used for. To scope the API access token to managed challenges only, select Managed Challenge Consumer from the Role list and click Add/Remove Role Scope, then Save. A new API token will be created and you will need the Client ID and Secret values to access the API and use the managed challenge.

1. In the hub, navigate to **Settings > Security > Users**
2. Click **Add New Security Principle**
3. Configure as follows:
   - **Type**: Application/Service
   - **Title**: "Managed Challenge User" (for example, to help identify the consumer of the managed challenge)
   - **Description**: "Managed challenge consumer" (for example)
4. After adding, click the **Roles icon** (People+ icon) next to the new security principle's ID
5. Select the `Managed Challenge Consumer` role from Available Roles to assign it.
6. Click **Save**

### 2. Create an API Key to use the managed challenge

1. Navigate to **Settings > Security > API Access**
2. Click **Add API Token**
3. Select **Managed Challenge User** as the security principle.
4. Enter **Managed Challenge API Key** as the title
5. Select **Managed Challenge Consumer** as the scoped role
    - **Important:** Click **Add/Remove Role Scope** to add it to the scope list
7. Click **Add** to create the new API token
8. Copy the **Client ID** and **Secret** values - you'll need these for instance configuration

#### Combined Hub joining and Managed Challenge Key
It is possible to create a combined hub joining key and managed challenge key, which certain clients (such as Certify Certificate Manager) can use by default if they already know the hub joining key. This is provided as an option for convenience but is not configured by default. 

To enable this, add the Managed Challenge Consumer role to the managed instance service principle (or a new service principle), then create a new hub joining key with both the *Hub Managed Instance* role and *Managed Challenge Consumer* role scope.

### Configure your ACME Client
Where an ACME client supports Certify Managed Challenges you will follow the normal process used by that client for selecting that provider and you will be required to specify the Client ID and Secret from the above configuration, you will also need to specify the Management Hub API Url. When you then perform your certificate order it will call the Management Hub API to complete the DNS updates required.

In Certify Certificate Manager, under Authorization, select dns-01 as the Challenge Type, and Certify Managed Challenge API as the provider, then add the required credentials.

