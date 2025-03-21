---
title: Introducing Certify Management Hub
description: Introducing Certify Management Hub
slug: introducing-management-hub
authors: webprofusion-chrisc
tags: [certify, news, management-hub]
image: https://certifytheweb.com/images/management/summary.png
hide_table_of_contents: false
---

We are excited to introduce our upcoming tool designed to simplify and streamline your certificate management process. **Certify Management Hub** is a centralized UI and API that allows you to manage all your SSL/TLS certificates from a single interface, making centralized renewal optional. Whether you are handling certificates for a small business or a large enterprise, the Management Hub provides the tools you need to ensure your certificates are always up-to-date.

If you'd like to try out the alpha version, we are in the process of putting together new [documentation for Certify Management Hub](../docs/hub/)

![Certify Management Hub](https://certifytheweb.com/images/management/summary.png)

We will be releasing our first alpha version at the end of March 2025 and the subsequent beta phases will continue for a few months while we respond to user feedback, with our first stable release expected later in the year.
<!-- truncate -->

## What is Certify Management Hub?

*Certify Management Hub* provides a single view of all of your managed certificates across your organization, or even across multiple organizations. 
- You can optionally centrally renew certificates or delegate certificate renewals to individual *Certify Certificate Manager* instances and compatible agents. 
- The management hub has all of the standard [features](https://certifytheweb.com/home/features) of our existing *Certify Certificate Manager* for ACME certificate renewals and deployment tasks.
- Existing *Certify Certificate Manager* users (i.e. on Windows) can use the management hub to see and manage certificates across hundreds of servers, while actual certificate renewals can continue to take place directly on the target servers as usual.

## Key Features

### Centralized Management
With the *Certify Management Hub*, you can view and manage all your certificates in one place. This eliminates the need to log into multiple systems and simplifies the management process. You don't however have to keep all your certificates in one place, so certificate renewal (in particular HTTP domain validated renewals) can stay under the control of the servers that use a particular cert, with the hub optionally just used for reporting and convenient administration.

### Automated Renewals
Never worry about expired certificates again. The Management Hub automates it's own renewals and provides visibility of the renewal process across multiple Certify Certificate Manager instances, ensuring that your certificates are always valid and up-to-date.

### Detailed Reporting
Get detailed reports on the status of your certificates, including upcoming expirations (realistically though, the point is not having to worry about expiration at all) and renewal logs. This helps you stay on top of your certificate management and avoid any potential issues.

### Managed (DNS) Challenges
Optionally centralize the configuration of DNS challenges and let compatible ACME clients use the management hub API to request DNS validation updates on their behalf. This removes the need to distribute sensitive DNS API credentials over many servers.

## Installation Options
*Certify Management Hub* is self-hosted and can be installed on your choice of Windows Server, Linux, macOS or container environments including Docker, Kubernetes and IBM/RedHat OpenShift.

## Simple Upgrade for Certify Certificate Manager users

Getting started with the *Certify Management Hub* is easy if you are an existing *Certify Certificate Manager* user. Update your app version to the latest release that supports *Certify Management Hub* (v7 onwards), then tell the app the URL of the Management Hub and joining key.

## Join the Beta

We are currently accepting beta testers for the *Certify Management Hub*. If you are interested in participating, please let us know via email at `support at certifytheweb.com`. Your feedback and feature requests will help us refine the product and ensure it meets your needs.

## Pricing
We have not yet announce pricing for *Certify Management Hub* however compared to some existing "enterprise" solutions we can comfortably say our pricing will be extremely cost effective in comparison. You can see examples of our [current product pricing](../docs/guides/licensing.md) for reference. 

## Conclusion

The *Certify Management Hub* is designed to make certificate management simple, efficient, and secure. We are excited to bring this new tool to our users and look forward to your feedback. Stay tuned for more updates and features as we continue to develop and improve the Management Hub.

Thank you for your continued support!
