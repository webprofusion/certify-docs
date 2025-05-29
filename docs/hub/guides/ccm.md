---
title: Joining the Hub
---

## Summary

Joining your existing *Certify Certificate Manager* (CCM) instance to a Management Hub allows you to control the instance settings as if you were working in the conventional desktop app, without having to remote into the desktop of each instance.

To use Certify Management Hub with existing installations:

1. Set up a Joining API key in the hub (one is automatically created when the hub is installed).
2. Configure CCM to join the hub (via UI or command line)
3. Verify that the joining has completed in the hub UI

## Before Joining the Hub

### Security Considerations

:::warning Important

The management hub will have complete control over the Certify Certificate Manager instance settings, including the ability to specify deployment tasks which may include locally executed code (PowerShell etc).

 **Do not join a hub you don't control or trust.**

 :::

## Joining the Hub

By default a joining API key is created when you install the hub. This is found under *Settings > Security > API Access*. You will need the API URL (e.g. `https://hub.internal.yourdomain.com:9697` depending on your configuration), Client Id and Client Secret values.

### Method 1: Using the Desktop User Interface

1. In *Certify Certificate Manager*, go to **Settings > Management Hub**
2. Enter the following:
   - Management Hub API URL
   - Client ID
   - Client Secret
3. Click **Join**
4. The app will attempt to join the management hub
5. If successful, the instance will appear in the **Instances** list of the Management Hub UI and managed certificates will be shown in the hub.

### Method 2: Using the Command Line

If you need to automate joining for a large number of instances you may prefer to script using the command line. To do so, run the following command (from `C:\Program Files\CertifyTheWeb\` as a member of Administrators):

```
certify hub join <url of mgmt hub API> <client id> <client secret>
```

## Verification

After joining, confirm that your instance appears in the Management Hub UI's **Instances** list.


# Using the Hub to manage a CCM instance

Your existing *Certify Certificate Manager* install remains much the same as it was before, except it can also be externally managed via the hub. When you are working with individual settings such as Stored Credentials, Certificate Authority accounts etc these remain per-instance settings, so each instance of the app has it's own set of settings and you will selected the target instance when working with those. 

The hub does not currently have global settings that can be pushed to all managed instances etc (such as a single ACME account, or specific stored credential).

## Other Considerations
## Setting up additional joining keys
 
If you manage instances across different organizations (e.g. if you are an MSP etc), consider creating multiple joining keys to partition by organization. This allows you to revoke hub access for specific groups without affecting unrelated instances.

### 1. Add a Security Principle for Managed Instances

This step may be unnecessary in current versions where it's auto-created.

1. In the hub, navigate to **Security > Users**
2. Click **Add New Security Principle**
3. Configure as follows:
   - **Type**: Application/Service
   - **Title**: "Hub Managed Instance"
   - **Description**: "Principle for Management Hub Instance Joining"
4. After adding, click the **Roles icon** (People+ icon) next to the new security principle's ID
5. Select the `Management Hub Managed Instance` role from Available Roles
6. Click **Save**

### 2. Create an API Key for Joining Instances

1. Navigate to **Settings > Security > API Access**
2. Click **Add API Token**
3. Select **Managed Instances Service Principle**
4. Enter **Instance Joining Key** as the title
5. Select **Management Hub Managed Instance** as the scoped role
   - **Important:** Click **Add/Remove Role Scope** to add it to the scope list
7. Click **Add** to create the new API token
8. Copy the **Client ID** and **Secret** values - you'll need these for instance configuration