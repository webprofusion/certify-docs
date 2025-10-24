# Configuring and using OpenID Connect (OIDC)

The hub can be configured to allow users to sign in by authenticating against an external OIDC provider such as Azure Entra.

## Configure an OIDC provider

You can add the configuration for a new OIDC provider under Settings > Security > OpenID Connect (OIDC).

You will need to provide:
- **Provider Name** for display on the sign in screen
- **Authority URL** e.g. `https://login.microsoftonline.com/<your tenant id>`
- **Client ID**
- **Client Secret**
- **Redirect URI**: `<your hub UI url>/authentication/login-callback`
- **OpenID Scopes**, at a minimum `openid`
- **Response Type**: `code`
- **Response Mode**: `form_post`

## Signing In

Once an OIDC provider is configured, any user can try to sign in using that provider. A stub account will then be created within the system with no roles assigned. The administrator can then assign hub roles to that account. When the user signs back in they will have the assigned roles and feature access.


# Example - Azure Entra

## Configure OIDC Application in Azure Entra
Use Azure portal to create a new app registration:
- App registrations > New Registration
    - Name e.g.: Certify Management Hub (Production)
    - Select account scope, generally Accounts in this organization directory only
    - Redirect URI:
        - Select "Web" as the platform type
        - `https://<your hub UI url>/authentication/login-callback`
- Under *Certificates & secrets* configure a new Client secret, note the Applicaiton ID and Client Secret values. Secretes expire, so keep this in mind if auth fails in the future.

## Setup OIDC provider in Certify Management Hub

- Navigate to *Settings > Security > OpenID Connect (OIDC)*
- Select *Add OIDC Provider*
    - General > Set a name for the provider, users will see this on the Sign In page and use it to select the provider as an option.
    - Configuration :
        - Authority URL which includes your tenant ID e.g. https://login.microsoftonline.com/abcd123-768f-4006-8891-0c85aecd9fd9
        - Client ID (Application ID) and Client Secret, this is used to authenticate the confirmation code passed back by Entra after it has authenticated a user.
        - Redirect URI, which is the page on the hub to redirect to once Entra has completed its auth, the host/port of the URL varies depending on your hub configuration e.g. `https://hub.yourcompany.com:8443/authentication/login-callback`
        - Scopes: `openid profile email` - these determine what info is accessible about the user
    - Advanced:
        - Response Type: *code* (default, so that a code will be passed back to the Redirect URI as part of the query string)
        - Response Mode: *form_post* (default).

## Sign In with your OIDC Provider
- Reload the Hub UI and select the OIDC provider to sign in with, complete sign in as normal
- Initially your account will have no roles:
    - Sign out of the hub and Sign In as Admin, assign a role to your account under Settings > Security > [Your new account] (people +) > e.g. Hub View (which has read only permissions), Administrator or Certificate Manager, then sign out.
    - Finally, sign in via the OIDC provider again.

