---
title: Managed ACME Service
---

## Scope

The Hub API can provide an ACME service *(experimental)* that proxies certificate orders to real certificate authorities and performs domain validation on behalf of the calling ACME client.

An ACME client can use the Hub ACME directory URL and rely on the Hub to complete matching challenge responses through a pre-configured managed challenge.

If the client supports External Account Binding (EAB), EAB can be used to identify and authorize it.

## Example

If you control a domain like `projectbids.co.uk` and want to create a certificate for `internal-app.projectbids.co.uk` from another device, that device may have an ACME client but cannot answer ACME HTTP or DNS challenges itself. In that case, the Hub can be used to:
- Configure a Managed Challenge so the hub knows how to update the target domain's DNS zone.
- Set up EAB credentials for your ACME client to identify itself to the hub, and authorize it to use the required Managed Challenge.
- Configure your ACME client to use the Hub ACME API, providing the EAB credentials to identify itself to the hub during ACME account creation.
- Configure a new certificate in your ACME client with a domain/identifier matching the Managed Challenge.

## Managed Challenge

Configure a [Managed Challenge](./managedchallenges.md) for the target domain.

## EAB Credentials
- Under Settings > Users, create an application security principal to represent your ACME client (e.g., *Example ACME Client on firewall-01*). Assign the role *Managed ACME Consumer*.
- Under API Access, select Add API Token. Provide a descriptive title (e.g., *Example ACME EAB Credentials*), select the security principal you created, and scope the token to the *Managed ACME Consumer* role.
- Select *View as EAB* against the credential, then copy the displayed values for use in your ACME client during initial ACME account creation.

## ACME Client Configuration

In the ACME client:
- Configure the client to use the `<your Hub API URL>/acme/directory` ACME service and provide the EAB credentials you have created.
- The ACME client will register a new account against the ACME service.
- You can then order a new certificate for identifiers matching your Managed Challenge that you configured in the hub.

## Limitations

- This method of "proxying" ACME orders is non-standard and may not work with every ACME client. It relies on ACME clients allowing authorizations to be instantly valid, but the order itself taking some time to process.
- The choice of actual ACME CA used for the real certificate order depends on the hub's default CA selection. The client cannot indicate a preference; in the future, this may be possible using ACME profiles.
- The temporary hub-managed certificate created for the order will be discarded as soon as the client downloads the final certificate. It will not participate in ACME ARI, etc., and automated renewal will depend on the client.
- ACME EAB support is required for account creation.