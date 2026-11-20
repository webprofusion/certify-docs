---
id: restart-service
title: Stop, Start or Restart a Service
sidebar_label: Restart a Service
description: Stop, start or restart a Windows service on the machine running Certify, for example so it picks up a renewed certificate.
---

The *Restart a Service* task stops, starts or restarts a Windows service on the machine running Certify. It is usually added after another deployment task, so the service loads the new certificate. You can also add it as a Pre-Request task, to stop or start a service before the certificate is requested.

This task is for Windows services only. To reload a service on Linux or on a remote server, use the [Run a Program or Script](./run-script.md) task.

## Before you start

The Certify background service user needs permission to stop and start the service. The default Local System account has this.

## Setting up the task

1. Add the *Restart a Service* task under *Tasks* for your managed certificate. Add it after the task that deploys the certificate, so it runs once the files or certificate store have been updated.
2. Under *Task Parameters*, set:
   - **Service** (required): the service to control. The list shows the services installed on the machine running Certify.
   - **Action** (required): *Restart Service* (default), *Stop Service* or *Start Service*.
   - **Max. Wait Time (secs)** (required): how long to wait for the service to stop or start, from 0 to 600 seconds. The default is 20.
3. Save, then run the task with the ▶️ play button to test it.

The service is always on the machine running Certify and is controlled by the background service user, so the task only offers the *Local (as current service user)* target. Older tasks set to use a credential still run as the background service, and log a warning that the credential is not used.

## How it works

- **Restart Service** stops the service if it is running, waits for it to stop, then starts it and waits for it to run. If the service is already stopped, it is started.
- **Stop Service** stops the service and waits for it to stop. If it is already stopped, the task reports *Service already stopped* and succeeds.
- **Start Service** starts the service and waits for it to run.
- If the first attempt to stop or start the service fails because the service is in a state that doesn't allow it, the task waits one second and tries once more.
- If the service doesn't reach the stopped or running state within *Max. Wait Time (secs)*, the task fails.
- When the task is previewed or validated, the service is not changed. The task checks that a service and action are selected and that the wait time is valid. The preview reports what would happen, e.g. *[Preview] Service [W3SVC] would be restarted.*

### The Certify service itself

The task never stops the service that Certify itself is running in, because that would end the task, and the certificate request running it, before either completes. The request would then not be recorded as complete, and would be attempted again the next time the service starts.

If you choose *Restart Service* or *Stop Service* for that service, the task does nothing and completes with a warning instead. Certify Management Hub reloads its HTTPS certificate when the certificate file changes, so it doesn't need a restart.

## Troubleshooting

- **A service name is required** or **An action is required**: select a *Service* and an *Action*.
- **Invalid wait duration specified. An integer value is required**: set *Max. Wait Time (secs)* to a whole number of seconds.
- **Duration specified is outside the supported range**: set *Max. Wait Time (secs)* to 600 or less.
- **The task times out**: the service took longer than *Max. Wait Time (secs)* to stop or start. Increase the wait time, or check the Windows event log for why the service is slow to stop or start.
- **Service ... was not stopped because it hosts this process**: you selected the service Certify runs in. See [The Certify service itself](#the-certify-service-itself).
