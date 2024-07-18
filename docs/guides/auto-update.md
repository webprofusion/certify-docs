---
id: auto-update
title: Automatic App Updates
---

It is essential to regularly update the *Certify Certificate Manager* app as important changes may be included which affect continuity of the certificate renewals or other essential certificate maintenance. By default app updates will be offered (if available) when you open the UI and you should generally update at the earliest convenience. Users have commonly requested an Auto Update mechanism and so this has now been provided as a script which can be scheduled.

Alternative methods include performing app updates using windows management tools (such as WSUS), using the [Chocolatey](https://community.chocolatey.org/packages/certifytheweb) command line update tool or manually updating.

# Auto Updating (Beta)

*Certify Certificate Manager* bundles a PowerShell script you can schedule using Windows Task Scheduler called `C:\Program Files\CertifyTheWeb\Scripts\AutoUpdate\AutoUpdate.ps1`. This script will attempt to download and install the latest stable version of the application, if a newer version is available.

You can scheduled this task to run (as an Administrator or user in the Administrators group) using:

- Windows Task Scheduler > Create Basic Task..
- Name: `Certify The Web - Auto Update`, Next..
- Daily (or weekly), Next, (optionally schedule for a regular maintenance window time)> Next..
- Start a program.., Next..
- Program,/script `powershell`, Add arguments (modify as required) `-ExecutionPolicy Bypass -File "C:\Program Files\CertifyTheWeb\Scripts\AutoUpdate\AutoUpdate.ps1" -Days 7`. You may want to consider not bypassing execution policy and the Days parameter means how many days after an update do you consider it 'Stable', the default is 7 days.
- Choose "Open Properties dialog for this task when I click Finish", then select `Run whether user is logged on or not`, `Run with highest privileges`.

# Known Issues

By default the `AutoUpdate.ps1` script itself will be in-use when the update runs, preventing the script itself from being updated. To workaround this, the `AutoUpdate.ps1` script will be distributed as `_AutoUpdate.ps1`, and the Certify background service will then move this file when possible.

# Auto Update Risks

There are significant security risks associated with automatically running third party scripts, especially as an Administrator account. You should especially never install a version of the app which is not digitally signed by `Webprofusion Pty Ltd`. You should not allow any other processes to modify the AutoUpdate.ps1 script as this is a vector for privilege escalation.

You should consider such risks before adopting this method for updating.
