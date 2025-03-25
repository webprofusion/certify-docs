---
title: Using with Certify Certificate Manager
---

# Summary
To use Certify Management Hub with existing installations of *Certify Certificate Manager* (CCM) you need to configure each instance to *join* the hub.

- Setup a Joining API key in the hub
- Configure CCM to join the hub (via UI or command line)
- Verify that the joining has completed in the hub UI.

## Before joining the hub

### Consider Security
The management hub will have complete control over the Certify Certificate Manager instance settings, including the ability to specify deployment tasks which may include locally executed code (PowerShell etc). 

**Do not join a hub you don't control or trust.**

### Ensure Unique Instance IDs

When CCM is installed and InstanceID value is generated and stored in `C:\ProgramData\certify\appsettings.json` (on Windows).

If you have previously used a VM clone to create a new instance of *Certify Certificate Manager* you need to ensure two instance do not shared the same Instance ID. Otherwise the instances will appear to be the same one and their communication with the hub will conflict, one instance may receive edits intended for the other instance etc.

 Instance IDs are required to be valid (unique) GUID values, if in doubt, delete your `appsettings.json` (or the instanceID field) and restart the Certify background service to the app create one for you.

## Set up an API key for instances to join the hub

### Add a security principle to represent managed instances
If not already present you'll need to start by adding a new security principle to represent managed instances. This is so that an API key can then be created and assigned to that security principle. This is likely to have already have been auto created in current versions of the system.

In the hub, under Security > Users, add a new Security Principle, select Application/Service as the principle type, set the Title to "Hub Managed Instance"

Description as "Principle for Management Hub Instance Joining" or similar, so you know what it's for.

Once added, select the Roles icon (People+ icon) shown next to the ID of the new security principle. Click on the `Management Hub Managed Instance` role from  Available Roles to assign it, then Save.

If you are managing instances across different organizations (for instance, your are an Managed Service Provider) you may wish to use multiple joining keys to partition by organizations, so that groups of instances can have their hub access removed without affecting other unrelated instances.

### Add an API key for joining instances

Go to Settings > Security > API Access, select Add API Token, select *Managed Instances Service Principle*, enter *Instance Joining Key* as the title, select *Management Hub Managed Instance* as the scoped role, important: remember to select Add/Remove Role Scope to add it to the scope list. Then select Add and the new API token will be created. Copy the **Client ID** and **Secret** values as they are required for API access.

## Joining the hub
In *Certify Certificate Manager*, under Settings > Management Hub, set the Management Hub API URL, Client ID and Client Secret, then select Join. The app will attempt to join the management hub and if successful the instance will appear on the Instances list of the Management Hub UI.

To join the hub from the command line:
`certify hub join <url of mgmt hub API> <client id> <client secret>`