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

## Browse All

Use **Browse All** to locate and review specific certificates.

Browse All includes filters for:

- **Instance**
- **Tags**
- **Status**
- **Keyword**

Common uses:

- find all certificates on one target instance
- find certificates by application or environment tags
- review only items in warning or error state
- search by title or identifier

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
- [Day-2 Hub operations](day-2-operations.md)
