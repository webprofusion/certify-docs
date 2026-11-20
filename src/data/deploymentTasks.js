/**
 * Catalogue of built-in deployment tasks, grouped for browsing.
 *
 * Used by both the task directory on the Deployment Tasks page
 * (src/components/DeploymentTaskDirectory) and the sidebar (sidebars.js),
 * so a new task only needs adding here (plus its doc page).
 *
 * icon: file name (without .svg) in static/img/task-icons. A new icon also
 * needs a sidebar rule in src/css/custom.css (.task-icon--<icon>).
 * Brand icons come from the CC0 "logos" (Gil Barbara) and Simple Icons sets
 * and the MIT Devicon set, via Iconify; generic icons are drawn for this site.
 * flags: automatic (built-in deployment, not an added task), hub (requires Certify Management Hub), preview (not yet in a
 * released version), experimental, deprecated.
 */
const deploymentTaskGroups = [
  {
    key: 'web-servers',
    label: 'Web and application servers',
    tasks: [
      { id: 'deployment/tasks/iis', name: 'IIS', icon: 'windows', description: 'Applied automatically: stores the certificate and adds or updates matching IIS site bindings.', flags: ['automatic'] },
      { id: 'deployment/tasks/apache', name: 'Apache', icon: 'apache', description: 'PEM certificate, key and chain files for Apache httpd, locally or over SSH.' },
      { id: 'deployment/tasks/nginx', name: 'nginx', icon: 'nginx', description: 'PEM certificate, key and chain files for nginx, locally or over SSH.' },
      { id: 'deployment/tasks/tomcat', name: 'Apache Tomcat', icon: 'tomcat', description: 'A PKCS#12 key store for Tomcat, locally or over SSH.' },
      { id: 'deployment/tasks/ccs', name: 'IIS Centralized Certificate Store', icon: 'windows', description: 'PFX files named for IIS CCS, on a local path or network share.' }
    ]
  },
  {
    key: 'windows',
    label: 'Microsoft Windows services',
    tasks: [
      { id: 'deployment/tasks/exchange', name: 'Microsoft Exchange', icon: 'exchange', description: 'Apply the certificate to Exchange 2013 or later services (IIS, SMTP, IMAP, POP).' },
      { id: 'deployment/tasks/adfs', name: 'ADFS', icon: 'windows', description: 'Apply the certificate to local Active Directory Federation Services.' },
      { id: 'deployment/tasks/rdp-gateway', name: 'RDP Gateway', icon: 'windows', description: 'Apply the certificate to the Remote Desktop Gateway service.' },
      { id: 'deployment/tasks/rdp-listener', name: 'RDP Listener', icon: 'windows', description: 'Apply the certificate to the Remote Desktop (Terminal Services) listener.' },
      { id: 'deployment/tasks/remote-access', name: 'Remote Access (RAS)', icon: 'windows', description: 'Apply the certificate to DirectAccess, SSTP VPN and other RAS services.' },
      { id: 'deployment/tasks/certificate-store', name: 'Certificate Store', icon: 'windows', description: 'Store the certificate in a local machine certificate store with a custom name.' },
      { id: 'deployment/tasks/set-key-permissions', name: 'Certificate Key Permissions', icon: 'windows', description: 'Grant an account read or full control access to the certificate private key.' },
      { id: 'deployment/tasks/update-port-binding', name: 'Port Binding', icon: 'windows', description: 'Update an IP:port certificate binding with netsh.' }
    ]
  },
  {
    key: 'vaults',
    label: 'Secrets vaults',
    tasks: [
      { id: 'deployment/tasks/azure-key-vault', name: 'Azure Key Vault', icon: 'azure', description: 'Store the certificate in Azure Key Vault, including sovereign clouds.' },
      { id: 'deployment/tasks/aws-secrets-manager', name: 'AWS Secrets Manager', icon: 'secret-key', description: 'Store the certificate, key and chain as a JSON secret in AWS Secrets Manager.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/google-secret-manager', name: 'Google Cloud Secret Manager', icon: 'secret-key', description: 'Store the certificate, key and chain as a JSON secret in Google Cloud Secret Manager.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/cyberark-conjur', name: 'CyberArk Conjur', icon: 'secret-key', description: 'Store the certificate, key and chain in CyberArk Conjur variables.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/hashicorp-vault', name: 'HashiCorp Vault', icon: 'hashicorp-vault', description: 'Store the certificate and key as secrets in HashiCorp Vault.' },
      { id: 'deployment/tasks/doppler', name: 'Doppler', icon: 'secret-key', description: 'Store the certificate and key as secrets in a Doppler project.' }
    ]
  },
  {
    key: 'cloud',
    label: 'Cloud services',
    tasks: [
      { id: 'deployment/tasks/aws-certificate-manager', name: 'AWS Certificate Manager', icon: 'aws-certificate-manager', description: 'Import to ACM for load balancers, CloudFront and API Gateway.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/google-certificate-manager', name: 'Google Cloud Certificate Manager', icon: 'load-balancer', description: 'Update a self-managed certificate used by Google Cloud load balancers.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/kubernetes-secret', name: 'Kubernetes TLS Secret', icon: 'secret-key', description: 'Store the certificate as a TLS secret for ingress controllers and pods, and restart workloads.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/task-azure-app-service', name: 'Azure App Service', icon: 'azure', description: 'Apply the certificate to an Azure web app or function app.', flags: ['deprecated'] }
    ]
  },
  {
    key: 'load-balancers',
    label: 'Load balancers and application delivery',
    tasks: [
      { id: 'deployment/tasks/f5-bigip', name: 'F5 BIG-IP', icon: 'f5', description: 'Add or update a named certificate and key used by client SSL profiles.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/netscaler', name: 'NetScaler ADC', icon: 'load-balancer', description: 'Add or update a certificate-key pair bound to virtual servers.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/kemp-loadmaster', name: 'Kemp LoadMaster', icon: 'progress', description: 'Add or replace a named certificate used by Virtual Services.', flags: ['hub', 'preview'] }
    ]
  },
  {
    key: 'firewalls',
    label: 'Firewalls and VPN gateways',
    tasks: [
      { id: 'deployment/tasks/fortigate', name: 'FortiGate', icon: 'fortinet', description: 'Import to FortiOS and move admin, SSL VPN and VIP settings to it.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/palo-alto', name: 'Palo Alto Networks', icon: 'palo-alto', description: 'Replace a named certificate on a PAN-OS firewall and commit.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/sonicwall', name: 'SonicWall', icon: 'firewall', description: 'Import to SonicOS 7 and switch HTTPS management and SSL VPN to it.', flags: ['hub', 'preview'] },
      { id: 'deployment/tasks/cisco-fmc', name: 'Cisco Secure Firewall', icon: 'cisco', description: 'Replace a PKCS12 enrollment on FMC and reinstall it on FTD devices.', flags: ['hub', 'preview'] }
    ]
  },
  {
    key: 'files',
    label: 'Certificate files',
    tasks: [
      { id: 'deployment/tasks/export-certificate', name: 'Export Certificate', icon: 'file-export', description: 'Write the certificate as PFX or PEM to a local, network or SSH path.' },
      { id: 'deployment/tasks/generic-server', name: 'Generic Server', icon: 'server', description: 'PEM certificate, key and chain files for any other server software.' }
    ]
  },
  {
    key: 'automation',
    label: 'Scripts, webhooks and services',
    tasks: [
      { id: 'deployment/tasks/powershell', name: 'PowerShell Script', icon: 'powershell', description: 'Run your own PowerShell script before or after the certificate request.' },
      { id: 'deployment/tasks/run-script', name: 'Run a Program or Script', icon: 'terminal', description: 'Run a program, batch file or shell script, locally or over SSH.' },
      { id: 'deployment/tasks/webhook', name: 'Webhook', icon: 'webhook', description: 'Call a URL with the request result, using a template body.' },
      { id: 'deployment/tasks/restart-service', name: 'Restart a Service', icon: 'service-restart', description: 'Stop, start or restart a Windows service so it loads the new certificate.' },
      { id: 'deployment/tasks/wait', name: 'Wait', icon: 'wait', description: 'Pause for a number of seconds between other tasks.' }
    ]
  }
];

export const taskFlagLabels = {
  automatic: { label: 'Automatic', title: 'Runs by default on every request, without adding a task' },
  hub: { label: 'Management Hub', title: 'Requires Certify Management Hub' },
  preview: { label: 'Preview', title: 'Not yet in a released version' },
  experimental: { label: 'Experimental', title: 'Marked as experimental in the app' },
  deprecated: { label: 'Deprecated', title: 'Still available, but no longer recommended' }
};

export default deploymentTaskGroups;
