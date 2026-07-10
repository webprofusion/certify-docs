
export default {

  docSidebar: [
    [
      {
        type: 'category',
        label: 'Certify Certificate Manager',
        items: [
          {
            type: 'category',
            label: 'Start Here',
            items: [
              'intro',
              'guides/installation',
              'certificate-process',
              'renewals'
            ]
          },
          {
            type: 'category',
            label: 'Automation & Deployment',
            collapsible: true,
            collapsed: false,
            items: [
                { type: 'ref', id: 'deployment/tasks_intro' },
                { type: 'ref', id: 'script-hooks' },
              'guides/powershell-support',
              'commandline',
              'csv-import',
                { type: 'ref', id: 'guides/import-export' },
              {
                  type: 'ref',
                id: 'guides/apache-nginx',
                label: 'Apache, nginx, and other web servers'
              },
                { type: 'ref', id: 'guides/architecture/load-balancing' },
                { type: 'ref', id: 'guides/auto-update' }
            ]
          },
          {
            type: 'category',
            label: 'Troubleshooting & Support',
            collapsible: true,
            collapsed: false,
            items: [
                { type: 'ref', id: 'guides/troubleshooting' },
                { type: 'ref', id: 'guides/maintenance' },
                { type: 'ref', id: 'faq' },
                { type: 'ref', id: 'guides/licensing' },
                { type: 'ref', id: 'support' }
            ]
          }
        ]
      }
    ]
  ],

  hubDocSidebar: [
    {
      type: 'category',
      label: 'Certify Management Hub',
      items: [
        {
          type: 'category',
          label: 'Start Here',
          items: [
            'hub/hub',
            {
              type: 'category',
              collapsible: true,
              collapsed: false,
              label: 'Installation',
              items: [
                'hub/installation/index',
                'hub/installation/containers',
                'hub/installation/windows',
                'hub/installation/linux',
                'hub/installation/service',
              ],
            },
            'hub/guides/request-certificate'
          ]
        },
        {
          type: 'category',
          label: 'Core Workflows',
          collapsible: true,
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'Architecture & Concepts',
              collapsible: true,
              collapsed: false,
              items: [
                'hub/concepts/architecture',
                'hub/concepts/management-models'
              ]
            },
            'hub/guides/certificate-operations',
            'hub/guides/request-and-deploy-certificates',
            'hub/guides/certificate-subscriptions',
            'hub/guides/certificate-authorities-and-credentials'
          ]
        },
        {
          type: 'category',
          label: 'Automation & Deployment',
          collapsible: true,
          collapsed: false,
          items: [
            {type:'ref',id:'deployment/tasks_intro'},
            { type: 'ref', id: 'script-hooks' },
            { type: 'ref', id: 'guides/import-export' },
            {
              type: 'ref',
              id: 'guides/apache-nginx',
              label: 'Apache, nginx, and other web servers'
            },
            { type: 'ref', id: 'guides/architecture/load-balancing' },
            { type: 'ref', id: 'guides/auto-update' }
          ]
        },
        {
          type: 'category',
          label: 'Administration & Security',
          collapsible: true,
          collapsed: false,
          items: [
            'hub/guides/hub-settings-overview',
            'hub/guides/security-and-access',
            'hub/guides/import-export-and-migration',
            'hub/guides/day-2-operations'
          ]
        },
        {
          type: 'category',
          label: 'Integrations',
          collapsible: true,
          collapsed: false,
          items: [
            'hub/guides/managedchallenges',
            'hub/guides/acme-server',
            'hub/guides/ccm',
            'hub/guides/agent',
            'hub/guides/oidc'
          ]
        },
        {
          type: 'category',
          label: 'Resources & Support',
          collapsible: true,
          collapsed: false,
          items: [
            'hub/hub-roadmap',
            'hub/known-issues',
            { type: 'ref', id: 'guides/troubleshooting' },
            { type: 'ref', id: 'guides/maintenance' },
            { type: 'ref', id: 'faq' },
            { type: 'ref', id: 'guides/licensing' },
            { type: 'ref', id: 'support' }
          ]
        }
      ]
    }],
  dashboardSidebar: [
    {
      type: 'category',
      label: 'Certify Dashboard',
      items: [
        {
          type: 'category',
          label: 'Start Here',
          items: [
            'dashboard/index',
          ]
        },
        {
          type: 'category',
          label: 'Common Tasks',
          collapsible: true,
          collapsed: false,
          items: [
            'renewals',
            'guides/troubleshooting'
          ]
        },
        {
          type: 'category',
          label: 'Support',
          collapsible: true,
          collapsed: false,
          items: [
            'guides/licensing',
            'support'
          ]
        }
      ]
    }

  ],
  certifyDnsSidebar: [
    {
      type: 'category',
      label: 'Certify DNS',
      items: [
        {
          type: 'category',
          label: 'Start Here',
          items: [
            'dns/providers/certifydns',
            'dns/validation'
          ]
        },
        {
          type: 'category',
          label: 'DNS Providers & Integration',
          collapsible: true,
          collapsed: false,
          items: [
            'dns/providers/acme-dns',
            'dns/providers/scripting'
          ]
        },
        {
          type: 'category',
          label: 'Support',
          collapsible: true,
          collapsed: false,
          items: [
            'guides/troubleshooting',
            'guides/licensing',
            'support'
          ]
        }
      ]
    }

  ],
  helpSupportSidebar: [
    {
      type: 'category',
      label: 'Help & Support',
      items: [
        {
          type: 'category',
          label: 'Quick Help',
          items: [
            'faq',
            'support',
            'guides/licensing'
          ]
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          collapsible: true,
          collapsed: false,
          items: [
            'guides/troubleshooting',
            'guides/maintenance'
          ]
        },
        {
          type: 'category',
          label: 'Knowledge Base',
          collapsible: true,
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'kb/kb-202601-letsencrypt',
              label: 'Let\'s Encrypt YE/YR roots on Windows'
            },
            {
              type: 'doc',
              id: 'kb/kb-202109-letsencrypt',
              label: 'Let\'s Encrypt DST Root CA X3 expiry'
            }
          ]
        }
      ]
    }
  ],
  commonDocsSidebar: [
    {
      /* This (last place) sidebar is used for common documentation shared between Certify Certificate Manager and Certify Management Hub, this avoid the wrong product being displayed in breadcrumbs */
      type: 'category',
      label: 'Common Concepts',
      items: [
        {
          type: 'category',
          label: 'Start Here',
          items: [
            'features/index',
            'guides/certificates',
            'guides/certificate-authorities',
            'http-validation',
            'dns/validation',
          ]
        },
        {
          type: 'category',
          label: 'Automation & Deployment',
          collapsible: true,
          collapsed: false,
          items: [
            'deployment/tasks_intro',
            {
              type: 'category',
              label: 'Deployment Task Guides',
              collapsible: true,
              collapsed: false,
              items: [
                'deployment/tasks/ccs',
                'deployment/tasks/apache',
                'deployment/tasks/nginx',
                'deployment/tasks/tomcat',
                'deployment/tasks/exchange',
                'deployment/tasks/task-azure-app-service'
              ]
            },
            'script-hooks',
            {
              type: 'doc',
              id: 'guides/apache-nginx',
              label: 'Apache, nginx, and other web servers'
            },
            'guides/import-export',
            'guides/architecture/load-balancing',
            'guides/architecture/step-ca',
            'features/data-stores'
          ]
        },
        {
          type: 'category',
          label: 'Operations & Maintenance',
          collapsible: true,
          collapsed: false,
          items: [
            'renewals',
            'backgroundservice',
            'guides/maintenance',
            'guides/troubleshooting',
            'guides/auto-update',
            'guides/security',
            'guides/tools'
          ]
        },
        {
          type: 'category',
          label: 'Advanced Certificate Options',
          collapsible: true,
          collapsed: false,
          items: [
            'guides/csr',
            'features/certificate-advanced',
            'features/stir-shaken'
          ]
        },
        {
          type: 'category',
          label: 'Product Help',
          collapsible: true,
          collapsed: false,
          items: [
            'faq',
            'guides/licensing',
            'support'
          ]
        },
        {
          type: 'category',
          label: 'Knowledge Base',
          collapsible: true,
          collapsed: false,
          items: [
            {
              type: 'doc',
              id: 'kb/kb-202601-letsencrypt',
              label: 'Let\'s Encrypt YE/YR roots on Windows'
            },
            {
              type: 'doc',
              id: 'kb/kb-202109-letsencrypt',
              label: 'Let\'s Encrypt DST Root CA X3 expiry'
            }
          ]
        }
      ]
    }],
};

