---
id: wait
title: Wait For N Seconds
sidebar_label: Wait
description: Pause for a set number of seconds before the next task runs.
---

The *Wait For N Seconds..* task pauses for the number of seconds you choose, then the next task runs. Use it when a step needs time to take effect before the next task, for example to let a service finish starting, or to let a file copy reach another server.

## Setting up the task

1. Add the *Wait For N Seconds..* task under *Tasks* for your managed certificate, between the tasks you want to pause between. You can add it as a Pre-Request task or as a Deployment task.
2. Under *Task Parameters*, set **Wait Time (seconds)** (required): the number of seconds to wait, from 0 to 600. The default is 20.
3. Save.

## How it works

- The task waits for the set number of seconds, then completes. It doesn't change anything.
- When the task is previewed or validated, it doesn't wait. The task checks the wait time is a whole number from 0 to 600.

## Troubleshooting

- **Invalid duration specified. An integer value is required**: set *Wait Time (seconds)* to a whole number of seconds.
- **Duration specified is outside the supported range. Max wait duration is 600**: set *Wait Time (seconds)* to 600 or less. To wait longer, add another *Wait For N Seconds..* task after the first.
