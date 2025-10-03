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