---
title: Managed ACME Service
---

## Summary
The Hub API can provide a simple ACME service which proxies certificate orders to real Certificate Authorities and takes care of the domain validation on behalf of the calling ACME client. 

This means you can point any ACME client client at the Hub ACME directory URL, ask it to complete HTTP domain validation (or none at all) and the hub will transparently order the corresponding certificate and complete domain validation on the clients behalf using a matching pre-configured a Managed Challenge. 

If your ACME client support External Account Binding (EAB) this can be used to identify and authorize the client, if EAB is not supported you can optionally enable a unique ACME URL for each client.

### Example

If you control a domain "projectbids.co.uk" and wanted to create a certificate "internal-app.projectbids.co.uk" from another device, that device has an ACME client but can't answer ACME http/dns challenges itself, you could instead use the hub to:
- Configure a Managed Challenge which can update the target domain DNS.
- Setup EAB credentials for your ACME client to use to identify itself to the hub and authorized it to use the required managed challenge.
- Configure your ACME client to use the hub ACME API, providing the EAB credentials to identify itself to the hub during ACME account creation
- Configure a new certificate in your ACME client with a domain/identifier matching the managed challenge.

## Setup your Managed Challenge

Configure a [managed challenge](./managedchallenges.md) in the hub to answer challenges for your target domain. 

### Creating EAB Credentials
- Under Settings > Users, create an application security principal to represent your ACME client e.g. *Example ACME Client on firewall-01*. Assign the role *Managed ACME Consumer*
- Under API Access, select Add API Token. Provide a descriptive title e.g. *Example ACME EAB Credentials*, select the security principle you created, select/scope the token to the *Managed ACME Consumer* role. 
- Select *View as EAB* against the credential, copy the displayed values for use in your ACME client during initial ACME account creation.

### Setup your ACME client

In your ACME client of choice (on any device that can communicate with the hub API), configure the client to use the `<your hub api url>/acme/directory` ACME service and provide the EAB credentials you have created. The ACME client will register a new account against the ACME service, you can then order a new certificate for identifiers matching your managed challenge that was configured in the hub.