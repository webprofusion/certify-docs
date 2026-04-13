
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
            label: 'Operate & Automate',
            collapsible: true,
            collapsed: true,
            items: [
              'deployment/tasks_intro',
              'script-hooks',
              'commandline',
              'csv-import',
              'guides/import-export',
              {
                type: 'doc',
                id: 'guides/apache-nginx',
                label: 'Apache, nginx, and other web servers'
              },
              'guides/architecture/load-balancing',
              'guides/auto-update'
            ]
          },
          {
            type: 'category',
            label: 'Troubleshooting & Support',
            collapsible: true,
            collapsed: true,
            items: [
              'guides/troubleshooting',
              'guides/maintenance',
              'guides/licensing',
              'faq',
              'support'

            ]
          },
          {
            type: 'category',
            label: 'Common Concepts',
            collapsible: true,
            collapsed: true,
            items: [
              'features/index',
              'guides/certificates',
              'guides/certificate-authorities',
              'http-validation',
              'dns/validation',
              'backgroundservice',
              'guides/ssl-windows',
              'guides/best-practices',
              'guides/security',
              'guides/tools',
              'guides/csr',
              'guides/architecture/step-ca',
              'features/certificate-advanced',
              'features/data-stores',
              'features/stir-shaken'
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
              collapsed: true,
              label: 'Installation',
              items: [
                'hub/installation/index',
                'hub/installation/containers',
                'hub/installation/windows',
                'hub/installation/linux',
                'hub/installation/service',
              ],
            },

            'hub/guides/request-certificate',
            'hub/known-issues'
          ]
        },
        {
          type: 'category',
          label: 'Operations',
          collapsible: true,
          collapsed: true,
          items: [
            'hub/concepts/architecture',
            'hub/concepts/management-models',
            'hub/guides/certificate-operations',
            'hub/guides/request-and-deploy-certificates',
            'hub/guides/certificate-subscriptions',
            'hub/guides/certificate-authorities-and-credentials',
            'hub/guides/hub-settings-overview',
            'hub/guides/security-and-access',
            'hub/guides/import-export-and-migration',
            'hub/guides/day-2-operations',
            'hub/guides/managedchallenges',
            'hub/guides/acme-server',
            'hub/guides/ccm',
            'hub/guides/agent',
            'hub/guides/oidc',
            'hub/hub-roadmap'
          ]
        },
        {
          type: 'category',
          label: 'Troubleshooting & Support',
          collapsible: true,
          collapsed: true,
          items: [
            'guides/troubleshooting',
            'guides/maintenance',
            'guides/licensing',
            'faq',
            'support'
          ]
        },
        {
          type: 'category',
          label: 'Common Concepts',
          collapsible: true,
          collapsed: true,
          items: [
            'features/index',
            'guides/certificates',
            'guides/certificate-authorities',
            'http-validation',
            'dns/validation',
            'deployment/tasks_intro',
            'script-hooks',
            {
              type: 'doc',
              id: 'guides/apache-nginx',
              label: 'Apache, nginx, and other web servers'
            },
            'guides/import-export',
            'features/data-stores',
            'features/certificate-advanced',
            'features/stir-shaken',
            'guides/security'
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
          collapsed: true,
          items: [
            'renewals',
            'guides/troubleshooting'
          ]
        },
        {
          type: 'category',
          label: 'Support',
          collapsible: true,
          collapsed: true,
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
          label: 'Common Tasks',
          collapsible: true,
          collapsed: true,
          items: [
            'dns/providers/acme-dns',
            'dns/providers/scripting',
            'guides/troubleshooting'
          ]
        },
        {
          type: 'category',
          label: 'Support',
          collapsible: true,
          collapsed: true,
          items: [
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
          label: 'Start Here',
          items: [
            'faq',
            'support'
          ]
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          collapsible: true,
          collapsed: true,
          items: [
            'guides/troubleshooting',
            'guides/maintenance'
          ]
        },
        {
          type: 'category',
          label: 'Licensing',
          collapsible: true,
          collapsed: true,
          items: [
            'guides/licensing'
          ]
        },
        {
          type: 'category',
          label: 'Knowledge Base',
          collapsible: true,
          collapsed: true,
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
          collapsed: true,
          items: [
            'deployment/tasks_intro',
            {
              type: 'category',
              label: 'Deployment Task Guides',
              collapsible: true,
              collapsed: true,
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
          collapsed: true,
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
          collapsed: true,
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
          collapsed: true,
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
          collapsed: true,
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

