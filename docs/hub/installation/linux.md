---
id: linux
title: Install for Linux
---

## Certify Management Hub

If you just want to try out the Management Hub and easy way to do that is to use [docker or other container tool](containers.md). However if you want to install the Management Hub (or Management Agent) directly you can do that as well.

#### Scripted Install
The following commands:
- Download the latest version, ensuring any old download and old install files are removed if present
- Extract the downloaded archive to the temporary ./certify-hub-install path
- Runs the install script to install under /opt/certify-hub, and sets up the hub as a systemd service called `certify-hub`, running as user `certify`.

```
rm ./certify-mgmthub-linux-x64-latest.tar.gz -f
wget https://downloads.certifytheweb.com/beta/latest/certify-mgmthub-linux-x64-latest.tar.gz 
rm -rf ./certify-hub-install && mkdir -p ./certify-hub-install
tar -xf certify-mgmthub-linux-x64-latest.tar.gz -C ./certify-hub-install
sudo ./certify-hub-install/scripts/install-hub.sh
```

Note: for arm64, replace `x64` with `arm64` in the above instructions.

This will configure/update a systemd service called `certify-hub` running as user `certify`, with the main installed files under `/opt/certify-hub`. Settings will be stored under `/usr/share/certify`, by default the UI will be available at `http://localhost:8080`

To then clean up the temporary install files:
```
rm -rf ./certify-hub*
```

##### Manual Install
Alternatively, manually update and configure your install to your own preferences, you will need to run the executable `<install location>/Certify.HubService` to run the service and the user for the process will need to write to `/usr/share/certify`.

### Post Install Steps
The default configuration will make the service and UI available at `http://localhost:8080`, with the default username `admin` and default password `changeme!`.

To use the service with https you can either [configure the service to use https](service.md) or reverse proxy the service from a webserver of your choice (Caddy, IIS, nginx, Apache etc and administer https on those as normal).

:::note
Do not install the Hub service where you also want to use Certify Certificate Manager (or Certify Management Agent) as they will share the same settings/databases via different services which could create confusion or conflicts and is not a supported configuration. 
:::

Suggested Configuration for multi-user access:
- Create an internal DNS hostname for the service e.g. certify-hub.yourowndomain.com and point it at the internal IP of your server hosting the hub.
- [Configure the service to use https](service.md)
- Setup individual user accounts under Settings > Security > Users, and assign the roles required for each user (e.g. Administrator).

### Service Administration

When the service is installed using systemd the following commands can be useful:

|Task|Command|
|---|---|
|Restart the Service | `sudo systemctl restart certify-hub` |
|Check systemd log | `journalctl -u certify-hub` |
|Follow current log | `journalctl -u certify-hub -f` |

## Certify Management Agent

[Certify Management Agent](../guides/agent.md) is a version of the *Certify Certificate Manager* service which can run "headless" (with no UI).

- Download the latest version, ensuring any old download and old install files are removed if present
- Extract the downloaded archive to the temporary ./certify-agent-install path
- Runs the install script to install under /opt/certify-agent, and sets up the agent as a systemd service running as user `certify`.

```
rm ./certify-agent-linux-x64-latest.tar.gz -f
wget https://downloads.certifytheweb.com/beta/latest/certify-agent-linux-x64-latest.tar.gz -O 
rm -rf ./certify-agent-install && mkdir -p ./certify-agent-install
tar -xf certify-agent-linux-x64-latest.tar.gz -C ./certify-agent-install
sudo ./certify-agent-install/scripts/install-agent.sh
```

To then clean up the temporary install files:
```
rm -rf ./certify-agent*
```

By default the agent will install to `/opt/certify-agent` as a systemd service called `certify-agent` running as user `certify` with config stored at `/usr/share/certify`.