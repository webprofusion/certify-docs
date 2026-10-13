---
title: Hub CLI
description: Use the certify-hub command line tool to call the Certify Management Hub API from scripts and tools, signed in or with an API token, and to recover access to a Hub on the Hub machine itself.
---

# Hub CLI

`certify-hub` is a command line tool for Certify Management Hub, available in Hub releases after v7.3.0. It has two uses:

- **Calling the Hub API** from scripts, CI pipelines and other tools, authenticated as a signed in user or with an [API token](security-and-access.md#api-access). This works from any machine which can reach the Hub.
- **Break-glass administration** on the Hub machine itself, such as resetting the admin password when nobody can sign in. These `admin` commands need no Hub sign in, they rely on the operating system account running them instead.

It is a single self contained file with no other dependencies.

## Installing

The CLI is installed with the Hub:

- **Windows:** `certify-hub.exe` in the Hub install folder, e.g. `C:\Program Files\CertifyManagementHub\certify-hub.exe`
- **Linux:** `/opt/certify-hub/dist/certify-hub`, linked as `certify-hub` on the path
- **Containers:** `certify-hub` on the path inside the Hub image

To use it from another machine, download the separate `certify-hub-cli` archive for that platform (Windows x64, Linux x64/arm64, macOS x64/arm64) from the same location as the Hub downloads and extract the single `certify-hub` file.

Run `certify-hub --help`, or `--help` after any command, to see the available commands and options.

## Signing in or using an API token

Every API command needs to know which Hub to talk to, and usually how to authenticate.

### Interactive use: sign in

```bash
certify-hub login --url https://hub.example.com:9696 --username admin
certify-hub status
```

`login` asks for the password and saves the session in a profile, so later commands only need the command itself. The password can also be given with `-p <password>`, or piped in with `--password-stdin`, which avoids leaving it in the shell history and process list. Use `--profile <name>` to keep sessions for more than one Hub, and `certify-hub logout` to forget one.

The session renews itself while you use it, but ends when the Hub service restarts, after which you sign in again. Hubs configured for single sign on only (with password sign in turned off) do not accept `login`, use an API token instead.

On Windows the saved session is encrypted for your Windows account. On Linux and macOS it is saved in `~/.config/certify-hub/` with permissions allowing only your account to read it.

### Scripts and automation: API tokens

Create an API token under **Settings > Security > API Access** for a security principal with only the roles the script needs, then give the client id and secret to the CLI with environment variables:

```bash
export CERTIFY_HUB_URL=https://hub.example.com:9696
export CERTIFY_HUB_CLIENT_ID=<client id>
export CERTIFY_HUB_CLIENT_SECRET=<client secret>

certify-hub cert list -o json
```

The secret can also be piped in with `--client-id <id> --client-secret-stdin`. Avoid `--client-secret <secret>` on shared machines, because command lines are visible to other users. An API token is used in preference to a saved sign in, and the secret is never saved.

| Setting | Option | Environment variable |
| --- | --- | --- |
| Hub URL | `--url` | `CERTIFY_HUB_URL` |
| API token client id | `--client-id` | `CERTIFY_HUB_CLIENT_ID` |
| API token secret | `--client-secret`, `--client-secret-stdin` | `CERTIFY_HUB_CLIENT_SECRET` |
| Trust a private CA | `--ca-cert <file>` | `CERTIFY_HUB_CA_CERT` |
| Skip TLS certificate validation | `--insecure` | `CERTIFY_HUB_INSECURE=true` |
| Profile folder | | `CERTIFY_HUB_CONFIG_DIR` |

### TLS certificates

The CLI sends passwords and API secrets to the Hub, so it checks the Hub's TLS certificate is trusted by the machine it runs on. If your Hub uses a certificate from a private CA, pass that CA's certificate with `--ca-cert ca.pem` (PEM or DER). `--insecure` turns certificate validation off entirely and should only be used for testing.

## Calling the Hub API

`certify-hub api` can call any Hub API operation. It reads the list of operations from the Hub itself, so it always matches the version of the Hub it is talking to.

```bash
# list operations, optionally filtered
certify-hub api list --filter certificate

# call an operation by its id, with parameters and an optional JSON body
certify-hub api call GetHubManagedItems -p keyword=example.com
certify-hub api call AddManagedCertificate --body @new-certificate.json

# or call a path directly
certify-hub api get /api/v1/system/version
```

- `-p name=value` sets a parameter. Parameters which are part of the operation's path fill in the path, the rest are sent in the query string. Repeat `-p` for each parameter, or for each value of an array parameter.
- `--body` takes JSON as text, `@file` to read a file, or `-` to read stdin.
- Where an operation id is used by more than one area of the API, `api list` shows it as `Area.OperationId`, which `api call` also accepts.
- Responses are written to stdout exactly as the Hub returns them (JSON), so they can be piped to tools such as `jq`. Messages and errors go to stderr.

Operations under `/api/` (`api list --doc v1-public`) are intended for integrations. Operations under `/internal/` are what the Hub UI uses and may change between Hub versions, so check scripts which use them after upgrading.

### Shortcuts

| Command | Does |
| --- | --- |
| `certify-hub cert list [--instance <id>] [--keyword <text>]` | List managed certificates across instances |
| `certify-hub cert renew <instance id> <certificate id>` | Start a certificate request now. It runs on the instance, follow its progress in the Hub |
| `certify-hub instance list` | List managed instances and their connection status |

These show a table by default, or the Hub's JSON with `-o json`.

### Exit codes

| Code | Meaning |
| --- | --- |
| 0 | Success |
| 1 | The request failed, was refused, or the Hub could not be reached |
| 2 | The command line was incomplete or invalid |
| 3 | Not signed in, the session expired, or the credentials were rejected |

## Break-glass administration

The `admin` commands recover access to a Hub, for example when the only administrator has forgotten their password or the single sign on provider is down. They talk to the Hub service directly over a local channel which only exists on the Hub machine:

- **Windows:** run from an elevated prompt (**Run as administrator**). The Hub's named pipe only admits local administrators, and refuses connections from other machines.
- **Linux:** run as root, e.g. `sudo certify-hub admin ...`. The Hub's socket (`/run/certify-hub/admin.sock`) only admits root and the Hub's service account.
- **Containers:** `docker exec <container> certify-hub admin ...`

| Command | Does |
| --- | --- |
| `certify-hub admin principals list` | List users and other security principals, showing which are administrators |
| `certify-hub admin password-reset <user>` | Give a user a new, generated password |
| `certify-hub admin grant-admin <user>` | Give a user the Administrator role |
| `certify-hub admin create-admin <username>` | Add a new administrator with a generated password, e.g. when all administrators have been removed |
| `certify-hub admin enable-password-login` | Turn username and password sign in back on, when single sign on is unavailable |

`<user>` is a username or a security principal id. Passwords are generated by the Hub and shown once: the new password is written to stdout on its own, so a script can capture it. Sign in with it and change it straight away.

`password-reset` and `grant-admin` ask for confirmation, use `--yes` to skip that in scripts. Each of these actions is recorded in the Hub log and in the Hub's activity history, with the operating system account which ran it.

```bash
# Linux example: reset the default admin's password
sudo certify-hub admin password-reset admin
```

If the CLI reports that the local admin channel was not found, check the Hub service is running on this machine. The Hub's **System Status** shows whether the channel started. It is not available when the Hub runs on Windows under an account other than LocalSystem without elevation, and can be turned off by setting the environment variable `CERTIFY_HUB_LOCAL_ADMIN=false` for the Hub service.

## Read Next

- [Security and Access](security-and-access.md)
- [OIDC configuration](oidc.md)
- [Hub Operations](operations.md)
