---
id: containers
title: Install for Docker and container platforms
---
### Docker 
:::info

Using [docker](https://docker.com/) to quickly try out *Certify Management Hub* on any OS. This runs the hub services in a virtualized *container* from an app *image* file. Upgrades just involve getting ("pulling") the latest image and recreating the container with that. Be sure to setup a data volume to retain your settings between upgrades.

:::

A key thing to know about running apps in docker is that the container should be considered temporary (to be recreated later), so data should not be stored only within the container itself. To host the app in docker properly, you need to specify a persistent data volume to store configuration data (which by default is under `/usr/share/certify`).

#### Quick Start using Docker Compose (recommended)
Save this file as `docker-compose.yaml`

```yaml
name: certify-management-hub
services:
  certify-hubservice:
    image: docker.io/certifytheweb/management-hub:latest
    ports:
      - "8080:8080"
    volumes:
      - certifydata:/usr/share/certify/
    restart: unless-stopped
volumes:
  certifydata:
```

Then from the same path, run `docker compose up -d` to start/restart the container. 

##### Upgrading

Using the latest version with docker compose is quick and easy:
- Fetch the latest update with `docker pull certifytheweb/management-hub:latest` 
- then restart your container (from the path where your above `docker-compose.yaml` is kept): `docker compose up -d`

#### Quick Start directly with Docker Run
Alternatively, to quickly try it out without using docker compose:

`docker run --name certify-management-hub -d -v /local/path/to/data:/usr/share/certify -p HOST_PORT:8080 --restart unless-stopped docker.io/certifytheweb/management-hub:latest` 

e.g. `docker run --name certify-management-hub -d -v C:\temp\certifydata -p 8080:8080 --restart unless-stopped docker.io/certifytheweb/management-hub:latest`

##### Upgrading

- Fetch the latest update with `docker pull certifytheweb/management-hub:latest` then recreate your container.

### Other common container environments

For simplest setup you can fetch the combined Certify Management Hub image from:

- Docker Hub: https://hub.docker.com/r/certifytheweb/management-hub
- GitHub Packages: https://github.com/certifytheweb?tab=packages

#### OpenShift
Add Storage > persistent volume claim `certifydata` with mount path `/usr/share/certifydata`, see also `CERTIFY_APP_DATA` below.

## Certify Management Agent
[Certify Management Agent](../guides/agent.md) is a version of the *Certify Certificate Manager* service which can run "headless" (with no UI) on many different platforms.

- Docker Hub: https://hub.docker.com/r/certifytheweb/certify-agent
- GitHub Packages: https://github.com/certifytheweb?tab=packages

### Docker Example

To run an instance of the agent and point it to your management hub, with a preset joining secret:

```
docker run docker.io/certifytheweb/certify-agent:latest -v <your data path>:/usr/share/certify -e CERTIFY_MANAGEMENT_HUB=https://<your hub API> -e CERTIFY_MANAGEMENT_HUB_CLIENT_ID= "managedinstance_sp_01" -e CERTIFY_MANAGEMENT_HUB_CLIENT_SECRET= "<your client secret>" -e CERTIFY_MANAGEMENT_HUB_AUTOJOIN= "true"
```
  
Where `your data path` is a path on your host machine where you will store settings, e.g. `/Users/macos/certifydata` or `C:\CertifyData` - you can make these paths anything you like depending on your requirements. The key thing is that when you update the container you will run it with the same path in order to use the same settings again.

## Environment Variables

You can optionally specify environment variables to modify the default config:

`CERTIFY_MANAGEMENT_HUB` : Specify the management hub API URL when working with multiple containers e.g. `http://certify-api:8080`

`CERTIFY_MANAGEMENT_HUB_CLIENT_ID` : Specify the management hub joining secret Client ID

`CERTIFY_MANAGEMENT_HUB_CLIENT_SECRET` : Specify the management hub joining secret

`CERTIFY_MANAGEMENT_HUB_AUTOJOIN` : Set to `"true"` to tell the instance to automatically attempt to join the specified hub


`CERTIFY_ADMIN_DEFAULTUSERNAME` : Override the initial default `admin` username. Only has an effect on initial setup.

`CERTIFY_ADMIN_DEFAULTPWD`: Override the initial default admin password of `changeme!`. Only has an effect on initial setup.

`CERTIFY_APP_DATA` : Specify an alternative path to store core service settings.

`CERTIFY_SERVICE_HOST` : Specify the backend agent host when working with multiple containers.

`CERTIFY_SERVICE_PORT`: Specify the backend agent port when working with multiple containers.