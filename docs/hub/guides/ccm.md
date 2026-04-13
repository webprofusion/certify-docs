---
title: Certify Certificate Manager (Desktop)
---

## Scope

Joining an existing *Certify Certificate Manager* (CCM) instance to the Hub allows centralized control of instance settings without using the desktop UI on each server.

If you are using *Certify Management Agent* on Linux or macOS, [see our agent guide](agent.md).

Start with the [latest version](https://downloads.certifytheweb.com/beta/latest/certify-ccm-windows-x64-latest.exe) of Certify Certificate Manager (v7+) with Hub support.

Basic sequence:

1. Set up a Joining API key in the hub (one is automatically created when the hub is installed).
2. Configure CCM to join the hub (via UI or command line)
3. Verify that the joining has completed in the hub UI

## Instance Identity

Do not reuse cloned settings from an already joined instance. If two instances share the same joined identity, they become difficult to manage correctly.

## Security

:::warning Important

The Hub has full control over CCM settings, including deployment tasks that may run local code.

 **Do not join a hub you don't control or trust.**

 :::

## Hub Join

By default a joining API key is created when the Hub is installed. It is available under *Settings > Security > API Access*. You need the Hub API URL, Client Id, and Client Secret.

### Desktop UI

1. In *Certify Certificate Manager*, go to **Settings > Management Hub**
2. Enter the following:
   - Management Hub API URL
   - Client ID
   - Client Secret
3. Click **Join**
4. Click **Join**.
5. Confirm the instance appears in the **Instances** list in the Hub UI.

### Command Line

For automated joins, run the following command from `C:\Program Files\CertifyTheWeb\` as an administrator:

```
certify hub join <url of mgmt hub API> <client id> <client secret>
```

## Verification

After joining, confirm that your instance appears in the Management Hub UI's **Instances** list.

## Per-Instance Settings

Stored credentials, CA accounts, and similar items remain per-instance settings. Select the correct target instance when working with them.

The Hub does not currently push global ACME accounts or stored credentials to all managed instances.

## Additional Joining Keys
 
If you manage instances across different organizations or trust zones, create separate joining keys for each group.

### Managed Instance Principal

A shared managed instance principal is automatically created when the hub is installed. If you would like to create separate identities you can set each up using:

1. In the hub, navigate to **Security > Users**
2. Click **Add New Security Principal**
3. Configure as follows:
   - **Type**: Application/Service
   - **Title**: "Hub Managed Instance"
   - **Description**: "Principal for Management Hub Instance Joining"
4. After adding, click the **Roles icon** (People+ icon) next to the new security principal's ID
5. Select the `Management Hub Managed Instance` role from Available Roles
6. Click **Save**

### Joining API Key

A joining API key is automatically created when the hub is installed. If you need to create separate ones you would do so using:

1. Navigate to **Settings > Security > API Access**
2. Click **Add API Token**
3. Select **Managed Instances Service Principal**
4. Enter **Instance Joining Key** as the title
5. Select **Management Hub Managed Instance** as the scoped role
   - **Important:** Click **Add/Remove Role Scope** to add it to the scope list
7. Click **Add** to create the new API token
8. Copy the **Client ID** and **Secret** values.