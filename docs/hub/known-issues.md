---
id: known-issues
title: Known Issues
---
## Management Hub

:::info
As we move development of *Certify Management Hub* towards a full release we will note issues that are commonly encountered here, and remove them as they are resolved.
:::

### User Interface

#### Errors when trying to login
The UI needs to know the URL of the API it should talk to. This is configured by default to `https://localhost:44361` or `http://localhost:8080` when running from docker. The setting is changed for all users by editing wwwroot/appsettings.json or you can temporarily change the URL in the login page by clicking the Settings gear icon and setting the correct URL for your installation.

If the problem occurs with a new docker container, follow the above and set the url to the require host and port e.g. `http://localhost:8080`

#### Refreshing a page returns a blank page
If using the combined hub service container image or serving the UI via the same service as the API, some app UI routing does not work (e.,g. reloading or bookmarking in-app URL routes). 

Pages that show data that might change will generally update themselves periodically (summary page, instances, charts etc) or in some cases when the underlying data changes and a message from the hub is streamed back the the UI. In some cases you may need to reload the app from the app root URL to see the latest information while the app is still under development.

#### When managed certificates change, the info doesn't update in the UI
Normally, when the system changes managed certificate or updates it status the change should be streamed back to the UI via SignalR. This streaming functionality is currently a work in progress and most items now update automatically.

#### Loading time over slow connections
The web app uses WebAssembly (WASM) and has a large application payload on initial load. Subsequent loads used cached resources.


### Deployment Tasks
The remote option (for SSH etc) is not currently enabled.

### Containers
#### Data not persisted using containers
The app will store settings in a combination of json files and SQLite DB files under `/usr/share/certify`. We will eventually offer the option to store some configuration in external databases such as postgres but the app does need to store some basic settings on file storage. In Docker etc this is achieved by mounting `/usr/share/certify` to persistant storage. You can override the app data path used by setting the `CERTIFY_APPDATA_PATH` environment variable to a preferred path. This path must be writeable by the non-root container user.

Multiple instances of the Certify Agent or Management Hub service reading and writing the same SQLite database storage is not currently supported, so deployments should only ever have one active container. Continous backups/snapshots etc of your volume are *essential* for production environments because SQLite file based databases can, and do, fail.

Note: We do not provide general support for how to use different container technology and you will likely need to know more about your choice of container deployment technology than we do, if you are using containers at all. Certify Management Hub is our first product that supports deployment to containers, so we expect growing pains.


