---
id: known-issues
title: Known Issues
---
## Management Hub

:::info
We will note issues that are commonly encountered here, and remove them as they are resolved.
:::

### Hub host operating system affects available functionality
If you will be commonly running PowerShell etc and interacting with Windows Server using Windows Authentication you should host the Management Hub on a Windows Server install. The hub *can* be used in containers (or hosted directly on Linux) but with reduced compatibility for Windows specific things like Windows Impersonation credentials. If PowerShell and Windows networking/shares etc will matter to you, you should host your instance on Windows.

### Hub and CCM/Agent Versions
We recommend updating agents/ccm instances to the latest version corresponding to the hub when possible, although not strictly required for some minor updates.

### Hub HTTPS
If you configure https for the hub service we currently recommend a monthly scheduled restart of the service to catch certificate renewals for the service. .NET has a built in cert rotation feature (on change) but we have found that to be unreliable in current versions. In the future we will likely implement our own cert selector strategy if the issue is not resolve in .NET itself.

### User Interface

#### Errors when trying to login
The UI needs to know the URL of the API it should talk to. This is configured by default to `https://localhost:44361` or `http://localhost:8080` when running from docker. The setting is changed for all users by editing wwwroot/appsettings.json or you can temporarily change the URL in the login page by clicking the Settings gear icon and setting the correct URL for your installation.

If the problem occurs with a new docker container, follow the above and set the url to the required host and port e.g. `http://localhost:8080`

#### Loading time over slow connections
The web app uses WebAssembly (WASM) and has a large application payload on initial load. Subsequent loads use cached resources.

### Containers
#### Data not persisted using containers
The app will store settings in a combination of json files and SQLite DB files under `/usr/share/certify`. We will eventually offer the option to store some configuration in external databases such as postgres but the app does need to store some basic settings on file storage. In Docker etc this is achieved by mounting `/usr/share/certify` to persistent storage. You can override the app data path used by setting the `CERTIFY_APPDATA_PATH` environment variable to a preferred path. This path must be writeable by the non-root container user.

Multiple instances of the Certify Agent or Management Hub service reading and writing the same SQLite database storage are not supported, so deployments should only ever have one active container. Continuous backups and snapshots of your volume are *essential* for production environments because SQLite file based databases can fail.

Note: We do not provide general support for how to use different container technology and you will likely need to know more about your choice of container deployment technology than we do, if you are using containers at all. Certify Management Hub is our first product that supports deployment to containers, so we expect growing pains.

