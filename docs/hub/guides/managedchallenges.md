---
id: managedchallenges
title: Managed Challenges
---

## Scope

A managed challenge allows the Hub to perform ACME challenge responses on behalf of other ACME clients. This is most useful for DNS-based challenges, where you do not want to distribute privileged DNS credentials to every client.

:::warning[feature under development]

This feature is under development and documentation may refer to features and procedures that are not yet available.
:::


## Flow

During a certificate request, the CA asks the ACME client to prepare a challenge response, usually an `_acme-challenge` TXT record. The client calls the Management Hub API with the required record details, and the Hub creates the DNS record on its behalf.

## Requirements

Managed challenges need two things:

- a managed challenge definition, including DNS provider, credentials, and domain match rule
- an API token scoped for managed challenge use

## Managed Challenge Definition

Under *Services > Managed Challenges*, select `+ Add`:
- Select dns-01 as the challenge type
- Select the DNS provider specific to your domains DNS service. 
- Add or select existing stored credentials for updating DNS via the selected API.
- Populate the *Domain Match Rule* to specify the domains this configuration can update DNS for, then Save.

## API Access

Before a managed challenge can be used, assign an API token to a specific service principal.

Under *Settings > Security > Users*, add a principal for the consuming service or application, then assign the **Managed Challenge Consumer** role.

Under *Settings > Security > API Access*, add an API token for that principal and scope it to **Managed Challenge Consumer**. Record the Client ID and Secret.

1. In the hub, navigate to **Settings > Security > Users**
2. Click **Add User**
3. Configure as follows:
   - **Type**: Application/Service
   - **Title**: "Managed Challenge User" (for example, to help identify the consumer of the managed challenge)
   - **Description**: "Managed challenge consumer" (for example)
4. After adding, click the **Roles icon** (People+ icon) next to the new security principal's ID
5. Select the `Managed Challenge Consumer` role from Available Roles to assign it.
6. Click **Save**

## API Token

1. Navigate to **Settings > Security > API Access**
2. Click **Add API Token**
3. Select **Managed Challenge User** as the security principal.
4. Enter **Managed Challenge API Key** as the title
5. Select **Managed Challenge Consumer** as the scoped role
    - **Important:** Click **Add/Remove Role Scope** to add it to the scope list
7. Click **Add** to create the new API token
8. Copy the **Client ID** and **Secret** values.

### Combined Join and Challenge Token

It is possible to create one token that supports both Hub joining and managed challenges. Some clients, such as *Certify Certificate Manager*, can use this for convenience if they already know the join key.

To do this, add **Managed Challenge Consumer** to the managed instance service principal, then create a join token scoped to both **Hub Managed Instance** and **Managed Challenge Consumer**.

## Client Configuration

Where an ACME client supports Certify Managed Challenges, configure that provider in the normal way, then supply the Client ID, Secret, and Hub API URL. The client uses the Hub API to perform the DNS updates.

### Certify Certificate Manager

In *Certify Certificate Manager*, under Authorization, select dns-01 as the Challenge Type, and *Certify Managed Challenge API* as the provider, then add/select the required managed challenge consumer credentials. If the instance is joined to the hub you can leave the hub API url blank.

### Hub Certificates

For certificates configured directly on the Hub, use a local managed challenge under Authorization > dns-01 > **Use Managed Challenge**. This avoids repeating DNS authorization configuration where many certificates use the same zone.
