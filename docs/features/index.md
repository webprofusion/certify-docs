---
title: Features Overview for all products
description: Comprehensive overview of all features available across Certify The Web products
displayed_sidebar: null
---

# Features Summary

This is a overview of all major features available across the **Certify The Web** product suite, categorized by functionality and indicating which features are common across products or specific to individual components.

## Certificate Management & Automation

### Core Certificate Features
These fundamental certificate management capabilities are available across all products:

- **Automated ACME Certificate Renewals** - Automatic renewal scheduling with configurable timing
- **Multi-CA Support** - Support for Let's Encrypt, Google Trust Services, ZeroSSL, Buypass, and enterprise CAs
- **Certificate Authority Fallback** - Optional automatic fallback to alternative CAs if the primary fails
- **Wildcard Certificate Support** - Full support for wildcard domains (`*.example.com`)
- **IP Certificates** - Certificate covering IPv4 or IPv6 addresses
- **Multi-Domain Certificates (SAN)** - Single certificate covering multiple domains
- **Certificate Preview** - Preview planned changes before requesting certificates
- **Multi-config Validation** - Configure multiple mixed domain/ip validation methods for one certificate
- **Certificate Revocation** - Manual certificate revocation when needed
- **Configuration Export/Import** - Backup and restore certificate configurations

### Advanced Certificate Options
- **Custom Private Key Types** - RSA and ECDSA key support with configurable key sizes
- **Preferred Certificate Chains** - Specify preferred certificate chains for compatibility
- **Certificate Signing Request (CSR) Control** - Optionally use your own CSR, ideal for when the private key is not controlled by you
- **PFX Password Protection** - Secure certificate files with passwords
- **Staging Mode Support** - Test certificates for development and testing
- **Certificate Comments & Metadata** - Organize certificates with custom descriptions

## Domain Validation Methods

### DNS Validation (dns-01)
- **50+ DNS Provider Integrations** - Built-in support for major DNS providers
- **Certify DNS Service** - Hosted acme-dns compatible service
- **acme-dns support** - Standard CNAME-based delegation
- **Manual DNS Option** - Manual TXT record creation when APIs aren't available
- **Custom DNS Scripting** - Custom scripts for unsupported DNS providers

### HTTP Validation (http-01)
- **Built-in HTTP Challenge Server** - Integrated challenge response server
- **IIS Integration** - Automatic HTTP validation via IIS (Windows)
- **Custom HTTP Challenge Handlers** - Configurable challenge response methods

## Deployment & Integration

### Built-in Deployment Tasks
Comprehensive deployment options for various platforms and services:

**Web Servers & Load Balancers:**
- IIS (Auto-deployment with binding management)
- Apache HTTP Server (PEM format export)
- nginx (PEM format export)
- Apache Tomcat (PKCS#12 keystore)

**Microsoft Services:**
- Microsoft Exchange (IMAP, SMTP, IIS, POP services)
- Active Directory Federation Services (ADFS)
- Remote Desktop Services (RDP Gateway, RDP Listener)
- Routing and Remote Access Service (RAS)
- IIS Centralized Certificate Store (CCS)

**Cloud & Container Platforms:**
- Azure App Service
- Azure Key Vault
- HashiCorp Vault (with namespace support)
- AWS services (via export tasks)

**Security & Secrets Management:**
- Local Windows Certificate Store
- Doppler secrets storage
- Various secrets vault integrations

### Custom Deployment Options
- **PowerShell Script Execution** - Custom PowerShell scripts with parameter passing (cross platform)
- **Bash Script Support** - Linux/macOS script execution
- **Webhook Integration** - HTTP webhooks with customizable payloads
- **SSH/SFTP Deployment** - Remote file deployment over secure connections
- **UNC Share Deployment** - Network share certificate distribution (Windows)
- **Service Management** - Start/stop/restart services after deployment (Windows)
- **Permission Management** - Set certificate key permissions (Windows)

## User Interfaces & Management

### Desktop Application (CCM - Windows)
- **Rich Desktop UI** - Full-featured Windows desktop application
- **Real-time Status Monitoring** - Live renewal status and progress tracking
- **Certificate Store Integration** - Direct Windows certificate store management
- **IIS Management** - Visual IIS site and binding management

### Web-Based Management (Management Hub)
- **Cross-Platform Web UI** - Browser-based interface for all platforms
- **Multi-User Access** - Role-based user management and permissions
- **Centralized Management** - Manage certificates across multiple instances
- **API Access** - RESTful API for automation and integration

### Command Line Interface
- **Full CLI Support** - Complete command-line interface for automation
- **Scripting Integration** - PowerShell and bash scripting support
- **Automated Deployment** - Unattended installation and configuration
- **Bulk Operations** - Mass certificate management operations

## Monitoring & Reporting

### Status & Health Monitoring
- **Real-time Status Dashboard** - Live certificate status overview
- **Renewal Failure Detection** - Automatic failure notification system
- **Certificate Expiry Monitoring** - Proactive expiration warnings
- **Detailed Logging** - Comprehensive activity and error logging

### Hosted Dashboard Service
- **Centralized Reporting** - Cloud-based certificate monitoring
- **Multi-Server Aggregation** - Monitor hundreds of servers from one dashboard
- **Failure Analysis** - Detailed failure messages and troubleshooting
- **Email Notifications** - Automated renewal failure notifications
- **Historical Reporting** - Certificate renewal history and trends

### External ACME Client Monitoring
*Hub & Agent Only:*
- **Certbot Integration** - Monitor existing Certbot renewals
- **acme.sh Support** - Track renewals from acme.sh installations
- **win-acme and simple-acme** - Monitor Windows ACME client renewals
- **Posh-ACME Integration** - PowerShell ACME module monitoring

## Infrastructure & Deployment

### Platform Support
**Common Across Products:**
- Windows Server (2016+)
- Windows Desktop (Windows 10+)

**Hub & Agent Only:**
- Linux (Ubuntu, CentOS, RHEL, Debian, Alpine)
- macOS (Intel & Apple Silicon)
- Docker containers
- Kubernetes
- Red Hat/IBM OpenShift

### Data Storage Options
- **SQLite** (Default) - File-based database for single instances
- **Microsoft SQL Server** - Enterprise database support (2016+)
- **PostgreSQL** - Open-source database support (9.5+)
- **Database Migration Tools** - Migrate between database types

### Scalability & Performance
- **Multi-Instance Management** - Manage hundreds of certificate instances
- **Distributed Architecture** - Scale across multiple servers
- **Background Processing** - Non-blocking certificate operations
- **Batch Operations** - Efficient bulk certificate management

## Security & Compliance

### Security Features
- **Encrypted Credential Storage** - DPAPI encryption for stored credentials (Windows)
- **Role-Based Access Control** - Granular user permissions (Hub)
- **API Security** - Token-based authentication for scoped API access

### Compliance & Standards
- **ACME Protocol Compliance** - Comprehensive RFC 8555 ACME support, plus draft features.
- **Industry Standard Formats** - PEM, PFX, PKCS#12 certificate formats

## Specialized Features

### STIR/SHAKEN Certificates
*CCM & Hub:*
- **Telecommunications Certificate Support** - Specialized certificates for telecom providers
- **Authority Token Management** - SPC token and CRL handling


### Import/Export
- **Bulk Certificate Management** - Import/export certificate configurations
- **Migration Tools** - Migrate certificates between instances
- **Backup & Restore** - Complete configuration backup capabilities

## Product-Specific Features

### Certify Certificate Manager (CCM) 
- **Desktop UI** - Windows desktop application and background service

### Management Hub
- **Web-Based Interface** - Cross-platform browser access
- **Multi-User Management** - Role-based user accounts
- **Instance Management** - Control multiple CCM instances
- **Container Support** - Docker and Kubernetes deployment
- **Managed DNS Challenges** - Centralized DNS challenge handling
- **Managed ACME API Server** - Act as ACME server for other clients

### Management Agent
- **Headless Operation** - No UI required for Linux/macOS
- **External Client Monitoring** - Monitor third-party ACME clients
- **Cross-Platform Service** - systemd/launchd service integration

### Dashboard Service
- **Hosted Monitoring** - Cloud-based renewal monitoring

---

## Getting Started

To get started with any of these features:

- **Certify Certificate Manager**: [Installation Guide](../guides/installation.md)
- **Management Hub**: [Hub Installation](../hub/installation/index.md)
- **Dashboard Service**: [Dashboard Setup](../dashboard/index.md)

For specific feature documentation, see the individual guides.
