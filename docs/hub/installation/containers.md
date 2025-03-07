---
id: containers
title: Docker and other containers - Installation & Upgrades
---
### Docker 
:::info

Using [docker](https://docker.com/) is a way to quickly try out *Certify Management Hub* on any OS. This runs the hub services in a virtualized *container* from an app *image* file. Upgrades just involve getting ("pulling") the latest image and recreating the container with that. Be sure to setup a data volume to retain your settings between upgrades.

:::

A key thing to know about running apps in docker is that the container should be considered temporary (to be recreated later), so data should not be stored only within the container itself. To host the app in docker properly, you need to specify a persistent data volume to store configuration data (which hy default is under `/usr/share/certify`).

#### Quick Start using Docker Compose
Save this file as `docker-compose.yaml`

```yaml
name: certify-management-hub
services:
  certify-hubservice:
    image: docker.io/certifytheweb/management-hub:latest
    hostname: certify-hubservice
    ports:
      - "8080:8080"
    volumes:
      - certifydata:/usr/share/certify/
volumes:
  certifydata:
```

Then from the same path, run `docker compose up -d` to start the container.

#### Quick Start directly with Docker Run
Alternatively, to quickly try it out without using docker compose:

`docker run -v /local/path/to/data:/usr/share/certify -p HOST_PORT:8080 docker.io/certifytheweb/management-hub:latest` 

e.g. `docker run -v C:\temp\certifydata -p HOST_PORT:8080 docker.io/certifytheweb/management-hub:latest`

### Other common container environments

For simplest setup you can fetch the combined Certify Management Hub image from:

Docker Hub: https://hub.docker.com/repository/docker/certifytheweb/management-hub

GitHub Packages: https://github.com/certifytheweb?tab=packages

#### OpenShift
Add Storage > persistent volume claim certifydata with mount path `/usr/share/certifydata`, see also `CERTIFY_APP_DATA` below.

## Certify Agent
Certify Agent is a version of the *Certify Certificate Manager* service which can run "headless" (with no UI) on many different platforms.

### Docker Example

To run an instance of the agent and point it to your management hub:

`docker run ghcr.io/certifytheweb/certify-agent:latest -v <your data path>:/usr/share/certify -e CERTIFY_MANAGEMENT_HUB=https://<your hub API>/api/internal/managementhub`

Where `your data path` is a path on your host machine where you will store settings, e.g. `/Users/macos/certifydata` or `C:\CertifyData` - you can make these paths anything you like depending on your requirements. The key thing is that when you update the container you will run it with the same path in order to use the same settings again.


## Environment Variables

`CERTIFY_APP_DATA` : Specify an alternative path to store core service settings.

`CERTIFY_MANAGEMENT_HUB` : Specify the management hub API URL when working with multiple containers e.g. `http://certify-api:8080/api/internal/managementhub`

`CERTIFY_SERVICE_HOST` : Specify the backend agent host when working with multiple containers.

`CERTIFY_SERVICE_PORT`: Specify the backend agent port when working with multiple containers.