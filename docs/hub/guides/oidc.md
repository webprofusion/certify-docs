# OpenID Connect (OIDC)

The Hub can authenticate users through an external OIDC provider such as Azure Entra.

## Provider Configuration

Add a provider under Settings > Security > OpenID Connect (OIDC).

Required values:
- **Provider Name** for display on the sign in screen
- **Authority URL** e.g. `https://login.microsoftonline.com/<your tenant id>`
- **Client ID**
- **Client Secret**
- **Redirect URI**: `<your hub UI url>/authentication/login-callback`
- **OpenID Scopes**, at a minimum `openid`
- **Response Type**: `code`
- **Response Mode**: `form_post`

## Sign-In Flow

After a provider is configured, a user can sign in through that provider. The first sign-in creates a local account with no roles. An administrator then assigns Hub roles, and the user signs in again with the new permissions.


## Disabling Username and Password Sign In

Once OIDC sign in is working you can make it the only way in, so that built in username/password credentials cannot be used to bypass your identity provider.

Edit `hubservice.json` (`C:\ProgramData\certify\hubservice.json` or `/usr/share/certify/hubservice.json`) and set `enablePasswordLogin` to `false`:

```json
  "AuthSettings": {
    "enablePasswordLogin": false
  }
```

With this set:

- The Hub API rejects all requests to the username/password login endpoint.
- The Hub UI sign in page detects this when it checks the configured providers, and shows only the single sign on buttons.

The setting is applied exactly as configured and is not re-enabled automatically when no OIDC provider is available, so **configure and test at least one working OIDC provider before you disable password sign in**. If you do lock yourself out, set the value back to `true` (or remove the section) and restart the `Certify Management Hub` service.

## Azure Entra Example

### Azure Entra Application

Create an app registration in the Azure portal:
- App registrations > New Registration
    - Name e.g.: Certify Management Hub (Production)
    - Select account scope, generally Accounts in this organization directory only
    - Redirect URI:
        - Select "Web" as the platform type
        - `https://<your hub UI url>/authentication/login-callback`
    - Note the *Application ID* for use later.
- Under *Certificates & secrets*
    - configure a new Client secret, note Client Secret value. Secrets expire, so keep this in mind if auth fails in the future.

### Hub Provider Configuration

- Navigate to *Settings > Security > OpenID Connect (OIDC)*
- Select *Add OIDC Provider*
    - General > Set a name for the provider, users will see this on the Sign In page and use it to select the provider as an option.
    - Configuration :
        - Authority URL which includes your tenant ID e.g. https://login.microsoftonline.com/abcd123-768f-4006-8891-0c85aecd9fd9 (note: don't include the /oauth2/v2.0/... suffix from a typical API call).
        - Client ID (Application ID) and Client Secret, this is used to authenticate the confirmation code passed back by Entra after it has authenticated a user.
        - Redirect URI, which is the page on the hub to redirect to once Entra has completed its auth, the host/port of the URL varies depending on your hub configuration e.g. `https://hub.yourcompany.com:8443/authentication/login-callback`
        - Scopes: `openid profile email` - these determine what info is accessible about the user
    - Advanced:
        - Response Type: *code* (default, so that a code will be passed back to the Redirect URI as part of the query string)
        - Response Mode: *form_post* (default).

### First Sign-In
- Reload the Hub UI and select the OIDC provider to sign in with, complete sign in as normal
- Initially your account will have no roles:
    - Sign out of the hub and Sign In as Admin, assign a role to your account under Settings > Security > [Your new account] (people +) > e.g. Hub View (which has read only permissions), Administrator or Certificate Manager, then sign out.
    - Finally, sign in via the OIDC provider again.

