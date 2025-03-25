---
title: Using with Certify Certificate Manager
---

## Summary

Joining your existing *Certify Certificate Manager* (CCM) instance to a Management Hub allows you to control the instance settings as if you were working in the conventional desktop app, without having to remote into the desktop of each instance.

To use Certify Management Hub with existing installations you need to:

1. Set up a Joining API key in the hub
2. Configure CCM to join the hub (via UI or command line)
3. Verify that the joining has completed in the hub UI

## Before Joining the Hub

### Security Considerations

:::warning Important

The management hub will have complete control over the Certify Certificate Manager instance settings, including the ability to specify deployment tasks which may include locally executed code (PowerShell etc).

 **Do not join a hub you don't control or trust.**

 :::

### Ensure Unique Instance IDs

When CCM is installed, an InstanceID value is generated and stored in appsettings.json (on Windows).

**Important:** If you have previously used a VM clone to create a new instance of CCM:
- You must ensure two instances do not share the same Instance ID
- Duplicate IDs will cause instances to appear as one, and their communication with the hub will conflict
- One instance may receive edits intended for the other

Instance IDs must be valid (unique) GUID values. If in doubt:
1. Delete your `appsettings.json` file (or just the instanceID field)
2. Restart the Certify background service to let the app create a new one

## Setting Up the Hub for Instance Management

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

**Note for MSPs:** If you manage instances across different organizations, consider creating multiple joining keys to partition by organization. This allows you to revoke hub access for specific groups without affecting unrelated instances.

### 2. Create an API Key for Joining Instances

1. Navigate to **Settings > Security > API Access**
2. Click **Add API Token**
3. Select **Managed Instances Service Principle**
4. Enter **Instance Joining Key** as the title
5. Select **Management Hub Managed Instance** as the scoped role
6. **Important:** Click **Add/Remove Role Scope** to add it to the scope list
7. Click **Add** to create the new API token
8. Copy the **Client ID** and **Secret** values - you'll need these for instance configuration

## Joining the Hub

### Method 1: Using the CCM User Interface

1. In *Certify Certificate Manager*, go to **Settings > Management Hub**
2. Enter the following:
   - Management Hub API URL
   - Client ID
   - Client Secret
3. Click **Join**
4. The app will attempt to join the management hub
5. If successful, the instance will appear in the **Instances** list of the Management Hub UI

### Method 2: Using the Command Line

Run the following command:

```
certify hub join <url of mgmt hub API> <client id> <client secret>
```

## Verification

After joining, confirm that your instance appears in the Management Hub UI's **Instances** list.