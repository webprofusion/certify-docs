---
title: Manage Certificates in the Hub
description: Use the Hub certificate summary, browse, in-progress, and target-instance views to manage certificate lifecycle and understand health state at a glance.
---

# Manage Certificates in the Hub

## Certificate Views

Under **Certificates**, the Hub UI has four main views:

- **Summary**
- **New**
- **Browse All**
- **In Progress**

## Summary

Use **Summary** for the overall operating view:

- how many managed certificates exist
- how many are healthy, warning, paused, or error state
- whether any activity is in progress
- whether joined instances are connected and reporting
- how many certificates use each certificate authority (CA) and each key type

Select a CA or key type to open **Browse All** filtered to those certificates.

## Browse All

Use **Browse All** to locate and review specific certificates. Along with each certificate's instance, identifiers, tags and dates, the list shows its CA, key type and issuer.

To hide columns you don't need, choose the columns button next to **Refresh** and clear them. Your choice is remembered in your browser.

Browse All includes filters for:

- **Instance**
- **Tags**
- **Status**
- **CA**
- **Key Type**
- **Keyword**

Common uses:

- find all certificates on one target instance
- find certificates by application or environment tags
- review only items in warning or error state
- find the certificates issued by one CA, for example before moving them to another CA
- find certificates using a key type you are phasing out, such as RSA 2048
- search by title or identifier

### CA, key type and issuer

The CA shown is the CA last used for the certificate: the CA which issued its current certificate, or, if there is no certificate yet, the CA of its most recent attempt. Certificates from external certificate managers such as Certbot have no CA here. Custom CAs are shown by the title they have on their instance. The Hub reads these each time the instance reports its certificates, so for a short time after the Hub starts a custom CA may be shown by its id.

The key type is read from the current certificate itself, so it is accurate even where the instance default key type applied. A joined instance records this once it is updated to a version which supports it, for its existing certificates when the service next starts. Until then the Hub shows the key type configured for the certificate, which is blank where the instance default applies. These certificates are counted as **Unknown**.

The issuer is also read from the current certificate, and names the CA certificate which signed it, for example **R11 (Let's Encrypt)**. This differs from the CA: the CA is the service you ordered from, and the issuer is the intermediate certificate it signed with, which a CA changes from time to time. Like the key type, it is recorded once the instance is updated.

## In Progress

Use **In Progress** for active requests and tests.

Common uses:

- you have just requested or tested a certificate
- another admin is actively working on requests
- you want to confirm whether the system is waiting on validation or deployment

The right-hand progress panel shows the same lifecycle at a shorter time scale. **In Progress** provides the page-level view.

## Health States

Summary groups certificates into states such as:

- **Healthy**
- **Warning**
- **Error**
- **Paused**

General meaning:

- **Healthy**: renewal state is acceptable.
- **Warning**: review is needed soon.
- **Error**: the renewal path needs attention.
- **Paused**: the certificate is intentionally not being processed.

Use **Browse All** and the certificate detail pages to investigate warning and error states.

## Target Instance Selection

The **Target Instance** selector appears in toolbars and edit forms because certificates and related settings are stored and executed on the selected instance.

When reviewing certificate operations, confirm:

- which instance owns the certificate definition
- which instance performs the renewal
- which instance will run any deployment tasks


Missing settings often indicate the wrong target instance.

## Administration Flow

1. Start on **Summary** to spot issues or recent activity.
2. Use **Browse All** to narrow to the relevant instance, tag, or status.
3. Open the certificate and review its configuration.
4. Use **Test** before changing a production renewal path.
5. Use **In Progress** or the progress panel to watch the active run.

## Tags

Use tags to group certificates by:

- environment
- application
- business owner
- team
- customer or tenant

This improves filtering and review in **Browse All**.

## Common Questions

### Why is a certificate not showing where I expect?

Check the target instance and any active filters.

### Why does a request show as in progress but nothing seems to happen?

Check the progress panel, then review:

- certificate authorization configuration
- CA account availability on the target instance
- instance connectivity
- known issues

### Why does a certificate show a warning or error?

Review certificate details, request progress, and any deployment or challenge errors.

## Read Next

- [Request and deploy certificates](request-and-deploy-certificates.md)
- [Certificate Authorities and stored credentials](certificate-authorities-and-credentials.md)
- [Hub operations](operations.md)
