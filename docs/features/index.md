---
title: Features
description: Choose a Certify The Web product and explore its certificate management, validation, deployment, and monitoring capabilities.
displayed_sidebar: commonDocsSidebar
---

# Product Feature Summary 

Certify The Web products request, deploy, and renew TLS certificates. The right product depends on where certificates are managed and whether you need to coordinate more than one server.

## Our Products

### Certify Certificate Manager

Use Certificate Manager for a Windows server or desktop. It provides the desktop UI and background service, manages IIS bindings and the Windows Certificate Store, and can run deployment tasks after a certificate is renewed.

### Certify Management Hub

Use Management Hub when certificates, credentials, or teams need to be managed centrally. It adds a web UI and API, role-based access, managed DNS challenges, and coordination for Certificate Manager and Management Agent instances.

### Certify Management Agent

Use Management Agent for headless Linux and macOS systems. It can manage certificates directly and monitor renewals from compatible third-party ACME clients.

### Certify Dashboard

Use Certify Dashboard for hosted monitoring of renewal activity and failures across your certificate estate.

## Request and Renew Certificates

Certify supports ACME certificate authorities including Let's Encrypt, Google Trust Services, ZeroSSL, Actalis, and private or enterprise CAs. Managed certificates can include multiple domain names, wildcard names, and eligible IP addresses.

Before requesting a certificate you can use the preview to inspect the planned validation and deployment. Renewal checks run automatically through the relevant background service. Where required, configure a staging CA, fallback CA, key type, preferred chain, or your own custom certificate signing request.

See [certificate requests and deployment](../certificate-process.md), [certificate authorities](../guides/certificate-authorities.md), and [renewal behavior](../renewals.md).

## Validate Domain Ownership

Use HTTP validation when the certificate authority can reach the target host over the web. Certificate Manager can use IIS or its built-in challenge server.

Use DNS validation for wildcard certificates, hosts without inbound HTTP access, or environments where DNS is the appropriate control point. Built-in providers cover common DNS services. You can also delegate records with Certify DNS and acme-dns, create TXT records manually, or run a custom DNS script. The Hub can manage DNS challenges centrally.

Read [HTTP validation](../http-validation.md) and [DNS validation](../dns/validation.md).

## Deploy Certificates

Deployment tasks can install a certificate in the Windows Certificate Store, manage IIS bindings, and export PEM or PFX/PKCS#12 files. Built-in tasks cover Apache, nginx, Tomcat, Exchange, ADFS, RDP, Azure App Service, Azure Key Vault, HashiCorp Vault, and IIS Centralized Certificate Store.

For services outside those tasks, use PowerShell or Bash scripts, webhooks, SSH/SFTP, or UNC shares. Windows deployments can update private-key permissions and restart dependent services.

Browse [deployment tasks](../deployment/tasks_intro.md), [Apache and nginx deployment](../guides/apache-nginx.md), and [IIS Centralized Certificate Store](../deployment/tasks/ccs.md).

## Administration and Monitoring

Management Hub provides centralized administration for multiple instances, including role-based access, API access. It can run on Windows, Linux, macOS, containers, Kubernetes, and OpenShift. Choose SQLite for a single instance, or SQL Server or PostgreSQL for larger deployments.

Certificate status, expiry, and renewal failures are visible where certificates are managed. Hub and Certify Dashboard aggregate this information across instances and provide notifications and renewal history. Hub and Management Agent can also monitor Certbot, acme.sh, win-acme, simple-acme, and Posh-ACME.

Credentials are encrypted at rest. Certificate Manager uses Windows DPAPI or .net key based encryption; Hub adds role-based access controls and scoped API authentication. The products support ACME V2 (RFC 8555 and supported extension and draft extensions like ARI, dns-persist-01) and standard PEM, PFX, and PKCS#12 certificate formats.

For telecommunications deployments, Certificate Manager and Hub support STIR/SHAKEN certificate workflows, including authority tokens. Certificate configurations can be imported, exported, and migrated between instances.

See [Hub installation options](../hub/installation/index.md), [Hub architecture](../hub/concepts/architecture.md), and the [Trust Center](../trust-center/index.mdx).

## Getting Started

- [Install Certify Certificate Manager](../guides/installation.md)
- [Install Management Hub](../hub/installation/index.md)
- [Set up Certify Dashboard](../dashboard/index.md)
- [Browse deployment tasks](../deployment/tasks_intro.md)
