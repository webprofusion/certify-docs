---
id: webhook
title: Call a Webhook
sidebar_label: Webhook
description: Send an HTTP GET or POST request to a URL of your choice with details of the certificate request.
---

The *Webhook* task sends an HTTP request to a URL you choose, with details of the latest certificate request. Use it to notify another system, such as a chat channel, a monitoring service or your own API, when a certificate is renewed or a renewal fails.

For more complex integrations, such as APIs that need custom headers or authentication, use the [Run a PowerShell Script](./powershell.md) task instead.

## Setting up the task

1. Add the *Webhook* task under *Tasks* for your managed certificate. You can add it as a Pre-Request task or as a Deployment task.
2. Set the task's *Trigger* to choose when the webhook is called, e.g. *Run On Success*, *Run On Error* or *Run On Success or On Error*.
3. Under *Task Parameters*, set:
   - **Webhook URL** (required): the full URL to call, e.g. `https://hooks.example.com/certify`. You can include [template variables](#template-variables) in the URL.
   - **Http Method** (required): *GET* or *POST* (default).
   - **Content Type**: the `Content-Type` header for a POST request. Defaults to `application/json`.
   - **Content Body**: the body template for a POST request, which can use [template variables](#template-variables). If you leave it blank, the [default body](#default-body) is sent.
4. Save, then run the task with the ▶️ play button to test it.

## Template variables

You can use variables in the *Webhook URL* and the *Content Body*. Write a variable as `$` followed by its name, e.g. `$PrimaryDomain`. Names are not case sensitive.

For example:

```json
{
  "Success": "$Success",
  "PrimaryDomain": "$PrimaryDomain",
  "SANs": "$SubjectAlternativeNames"
}
```

These are the most useful variables:

| Variable | Value |
| --- | --- |
| `$Success` | `true`, unless the last request for the certificate failed, then `false`. |
| `$PrimaryDomain` | The primary domain of the certificate. |
| `$SubjectAlternativeNames` | All the domains on the certificate, separated by commas. |
| `$SubjectIPAddresses` | The IP addresses on the certificate, separated by spaces. |
| `$ChallengeType` | The challenge type of the first challenge configured for the certificate, e.g. `http-01` or `dns-01`. |
| `$WebsiteRootPath` | The website root path used for HTTP challenges. |
| `$PreferredChain` | The preferred CA chain, if set. |
| `$AcmeProfile` | The ACME profile, if set. |
| `$PreferredExpiryDays` | The preferred certificate lifetime in days, if set. |
| `$CSRKeyAlg` | The key algorithm used for the certificate signing request. |
| `$BindingIPAddress`, `$BindingPort`, `$BindingUseSNI` | The IIS binding settings for the certificate. |
| `$IncludeCN` | Whether the certificate subject includes a common name. |
| `$DeploymentSiteOption`, `$DeploymentBindingOption`, `$DeploymentTargetType` | The auto deployment settings for the certificate. |

Other certificate request settings can't be used. In particular, the custom private key, custom CSR, scripts and webhook settings are never sent. Yes/no settings are written as `True` or `False`, while `$Success` is written in lower case.

How values are written:

- In the *Webhook URL*, values are URL encoded.
- In the *Content Body*, each `\` in a value is doubled (`\\`), so Windows paths stay valid inside JSON strings. Other characters, such as `"`, are not escaped.
- A variable name runs until the first character that isn't a letter, digit or `_`, so `$PrimaryDomain/` and `$PrimaryDomain` at the very end of the URL or body are both replaced. For example, `https://example.com/hook?domain=$PrimaryDomain&ok=$Success`.
- A name that isn't a known variable is left in the text as written.

### Default body

If *Content Body* is blank, this body is sent:

```json
{
  "Success": "$Success",
  "PrimaryDomain": "$PrimaryDomain",
  "SANs": "$SubjectAlternativeNames",
  "ChallengeType": "$ChallengeType"
}
```

## How it works

- The task replaces the template variables in the URL, then sends the request.
  - For *GET*, only the URL is sent.
  - For *POST*, the body template is filled in and sent with the *Content Type* you set, encoded as UTF-8.
- The request is sent from the machine running Certify, with a Certify `User-Agent` header.
- The task succeeds if the server responds with a success (2xx) status code, and fails otherwise. The task message shows the URL, whether the response status was a success code, and the status code, e.g. `Webhook invoked: Url: ..., Success: False, StatusCode: 404`.
- If the request can't be sent at all (for example the host can't be reached), the task fails with *Webhook call failed* and the error.
- When the task is previewed or validated, no request is sent. The task checks the URL is a valid absolute URL and that the HTTP method is *GET* or *POST*. The preview reports the method and URL it would call.

## Troubleshooting

- **The webhook url must be a valid url**: enter a full URL including the scheme, e.g. `https://`.
- **The webhook HTTP method must be selected** or **must be GET or POST**: choose *GET* or *POST* in *Http Method*.
- **Webhook call failed**: the request could not be sent. Check the URL, DNS and any firewall or proxy between Certify and the webhook server.
- **Success: False** and the task fails: the server responded with an error status code. Check the *StatusCode* and the requirements of the receiving service, e.g. the *Content Type* and body format it expects.
- **A variable appears unchanged in the request**: check its spelling, and that it is one of the [template variables](#template-variables) listed above.
