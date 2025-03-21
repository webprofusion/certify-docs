---
title: Introducing Certify Management Hub
description: Simplify and streamline your SSL/TLS certificate management with Certify Management Hub.
slug: introducing-management-hub
authors: webprofusion-chrisc
tags: [certify, news, management-hub]
image: https://certifytheweb.com/images/management/summary.png
hide_table_of_contents: false
---

We are thrilled to announce **Certify Management Hub**, our upcoming tool designed to simplify and streamline SSL/TLS certificate management. This centralized UI and API solution allows you to manage all your certificates from a single interface, making centralized renewal optional. Whether you're managing certificates for a small business or a large enterprise, the Management Hub provides the tools you need to keep your certificates up-to-date and secure.

If you'd like to explore the alpha version, we are preparing new [documentation for Certify Management Hub](/docs/hub/).

![Certify Management Hub](https://certifytheweb.com/images/management/summary.png)

The first alpha version will be released at the end of March 2025. Beta phases will follow, incorporating user feedback, with the first stable release expected later in the year.
<!-- truncate -->

## What is Certify Management Hub?

*Certify Management Hub* offers a unified view of all your managed certificates across your organization—or even across multiple organizations. Key capabilities include:
- Optional centralized certificate renewal or delegation of renewals to individual *Certify Certificate Manager* instances and compatible agents.
- All the standard [features](https://certifytheweb.com/home/features) of *Certify Certificate Manager* for ACME certificate renewals and deployment tasks.
- Integration with existing *Certify Certificate Manager* installations, enabling users to manage certificates across hundreds of servers while maintaining local renewal processes.

## Key Features

### Centralized Management
Manage all your certificates in one place, eliminating the need to log into multiple systems. While certificates can be centrally managed, you can also retain control over renewals on individual servers, particularly for HTTP domain-validated certificates. The hub serves as a reporting and administration tool for added convenience.

### Automated Renewals
Say goodbye to expired certificates. The Management Hub automates its own renewals and provides visibility into the renewal process across multiple *Certify Certificate Manager* instances, ensuring your certificates remain valid and up-to-date.

### Detailed Reporting
Access comprehensive reports on certificate status, including upcoming expirations and renewal logs. This helps you stay informed and avoid potential issues.

### Managed (DNS) Challenges
Optionally centralize DNS challenge configurations and allow compatible ACME clients to use the Management Hub API for DNS validation updates. This eliminates the need to distribute sensitive DNS API credentials across multiple servers.

## Installation Options
*Certify Management Hub* is self-hosted and can be installed on Windows Server, Linux, macOS, or container environments such as Docker, Kubernetes, and IBM/RedHat OpenShift.

## Simple Upgrade for Certify Certificate Manager Users

Upgrading to *Certify Management Hub* is straightforward for existing *Certify Certificate Manager* users. Update your app to version 7 or later, then configure the app with the Management Hub URL and joining key.

## Join the Beta

We are inviting beta testers for *Certify Management Hub*. If you're interested, please contact us via email at `support at certifytheweb.com`. Your feedback and feature requests will help us refine the product to better meet your needs.

## Pricing
Pricing for *Certify Management Hub* will be announced soon. Rest assured, it will be highly cost-effective compared to existing "enterprise" solutions. For reference, you can review our [current product pricing](/docs/guides/licensing).

## Conclusion

*Certify Management Hub* is designed to make certificate management simple, efficient, and secure. We are excited to bring this tool to our users and look forward to your feedback. Stay tuned for updates and new features as we continue to enhance the Management Hub.

Thank you for your continued support!
