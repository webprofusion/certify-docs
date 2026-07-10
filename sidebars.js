
const createDeploymentTaskGuidesCategory = () => ({
  type: 'category',
  label: 'Deployment Task Guides',
  collapsible: true,
  collapsed: false,
  items: [
    { type: 'ref', id: 'deployment/tasks/ccs' },
    { type: 'ref', id: 'deployment/tasks/apache' },
    { type: 'ref', id: 'deployment/tasks/nginx' },
    { type: 'ref', id: 'deployment/tasks/tomcat' },
    { type: 'ref', id: 'deployment/tasks/exchange' },
    { type: 'ref', id: 'deployment/tasks/task-azure-app-service' }
  ]
});

const createCommonConceptsCategory = () => ({
  type: 'category',
  label: 'Common Concepts',
  collapsible: true,
  collapsed: false,
  items: [
    { type: 'ref', id: 'features/index' },
    { type: 'ref', id: 'guides/certificates' },
    { type: 'ref', id: 'guides/certificate-authorities' },
    { type: 'ref', id: 'http-validation' },
    { type: 'ref', id: 'dns/validation' }
  ]
});

const createCommonTaskGuidesCategory = () => ({
  type: 'category',
  label: 'Task-Oriented Guides',
  collapsible: true,
  collapsed: false,
  items: [
    { type: 'ref', id: 'certificate-process', label: 'Request your first certificate' },
    { type: 'ref', id: 'dns/validation', label: 'Set up DNS validation' },
    { type: 'ref', id: 'deployment/tasks_intro', label: 'Deploy certificates to services' },
    { type: 'ref', id: 'renewals', label: 'Monitor renewals and alerts' },
    { type: 'ref', id: 'guides/troubleshooting', label: 'Troubleshoot failures' }
  ]
});

const createHubTaskGuidesCategory = () => ({
  type: 'category',
  label: 'Task-Oriented Guides',
  collapsible: true,
  collapsed: false,
  items: [
    { type: 'doc', id: 'hub/guides/request-certificate', label: 'Request your first Hub-managed certificate' },
    { type: 'doc', id: 'hub/guides/request-and-deploy-certificates', label: 'Request and deploy certificates' },
    { type: 'doc', id: 'hub/guides/managed-instances', label: 'Manage connected instances' },
    { type: 'doc', id: 'hub/guides/security-and-access', label: 'Configure security and access' },
    { type: 'doc', id: 'hub/guides/operations', label: 'Run operations' }
  ]
});

const createCommonSupportItems = () => ([
  { type: 'ref', id: 'guides/troubleshooting' },
  { type: 'ref', id: 'faq' },
  { type: 'ref', id: 'guides/licensing' },
  { type: 'ref', id: 'support' }
]);

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
              { type: 'ref', id: 'renewals' },
            ]
          },
          {
            type: 'category',
            label: 'Concepts & Core Workflows',
            collapsible: true,
            collapsed: false,
            items: [
              createCommonTaskGuidesCategory(),
              createCommonConceptsCategory(),
              'commandline'
            ]
          },
          {
            type: 'category',
            label: 'Automation & Deployment',
            collapsible: true,
            collapsed: false,
            items: [
              { type: 'ref', id: 'deployment/tasks_intro' },
              createDeploymentTaskGuidesCategory(),
              { type: 'ref', id: 'script-hooks' },
              'guides/powershell-support',
              { type: 'ref', id: 'guides/import-export' },
              {
                type: 'ref',
                id: 'guides/apache-nginx',
                label: 'Apache, nginx, and other web servers'
              },
              { type: 'ref', id: 'guides/architecture/load-balancing' },
              { type: 'ref', id: 'guides/architecture/step-ca' },
              { type: 'ref', id: 'features/data-stores' },
              'csv-import'
            ]
          },
          {
            type: 'category',
            label: 'Operations & Maintenance',
            collapsible: true,
            collapsed: false,
            items: [
              { type: 'ref', id: 'backgroundservice' },
              { type: 'ref', id: 'guides/maintenance' },
              { type: 'ref', id: 'guides/auto-update' },
              { type: 'ref', id: 'guides/security' },
              { type: 'ref', id: 'guides/tools' }
            ]
          },
          {
            type: 'category',
            label: 'Advanced Certificate Topics',
            collapsible: true,
            collapsed: false,
            items: [
              { type: 'ref', id: 'guides/csr' },
              { type: 'ref', id: 'features/certificate-advanced' },
              { type: 'ref', id: 'features/stir-shaken' }
            ]
          },
          {
            type: 'category',
            label: 'Support & Appendix',
            collapsible: true,
            collapsed: false,
            items: [
              ...createCommonSupportItems()
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
          ]
        },
        {
          type: 'category',
          label: 'Concepts & Core Workflows',
          collapsible: true,
          collapsed: false,
          items: [
            createHubTaskGuidesCategory(),
            'hub/concepts/architecture',
            'hub/concepts/management-models',
            createCommonConceptsCategory(),
            'hub/guides/request-certificate',
            'hub/guides/managed-instances',
            'hub/guides/certificate-operations',
            { type: 'ref', id: 'renewals' },
            'hub/guides/request-and-deploy-certificates',
            'hub/guides/certificate-subscriptions',
            'hub/guides/certificate-authorities-and-credentials',
            { type: 'ref', id: 'guides/csr' }
          ]
        },
        {
          type: 'category',
          label: 'Automation & Deployment',
          collapsible: true,
          collapsed: false,
          items: [
            'hub/guides/managedchallenges',
            'hub/guides/acme-server',
            'hub/guides/ccm',
            'hub/guides/agent',
            { type: 'ref', id: 'guides/powershell-support' },
            { type: 'ref', id: 'deployment/tasks_intro' },
            createDeploymentTaskGuidesCategory(),
            { type: 'ref', id: 'script-hooks' },
            { type: 'ref', id: 'guides/import-export' },
            {
              type: 'ref',
              id: 'guides/apache-nginx',
              label: 'Apache, nginx, and other web servers'
            },
            { type: 'ref', id: 'guides/architecture/load-balancing' },
            { type: 'ref', id: 'guides/architecture/step-ca' },
            { type: 'ref', id: 'guides/auto-update' },
            { type: 'ref', id: 'features/data-stores' }
          ]
        },
        {
          type: 'category',
          label: 'Operations & Maintenance',
          collapsible: true,
          collapsed: false,
          items: [
            'hub/guides/hub-settings-overview',
            'hub/guides/security-and-access',
            'hub/guides/operations'
          ]
        },
        {
          type: 'category',
          label: 'Advanced Integrations',
          collapsible: true,
          collapsed: false,
          items: [
            'hub/guides/import-export-and-migration',
            'hub/guides/oidc'
          ]
        },
        {
          type: 'category',
          label: 'Support & Appendix',
          collapsible: true,
          collapsed: false,
          items: [
            'hub/hub-roadmap',
            'hub/known-issues',
            { type: 'ref', id: 'guides/maintenance' },
            { type: 'ref', id: 'guides/tools' },
            ...createCommonSupportItems()
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
            { type: 'ref', id: 'renewals' },
            { type: 'ref', id: 'guides/troubleshooting' }
          ]
        },
        {
          type: 'category',
          label: 'Support',
          collapsible: true,
          collapsed: false,
          items: [
            { type: 'ref', id: 'guides/licensing' },
            { type: 'ref', id: 'support' }
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
            { type: 'ref', id: 'faq' },
            { type: 'ref', id: 'support' },
            { type: 'ref', id: 'guides/licensing' }
          ]
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          collapsible: true,
          collapsed: false,
          items: [
            { type: 'ref', id: 'guides/troubleshooting' },
            { type: 'ref', id: 'guides/maintenance' }
          ]
        },
        {
          type: 'category',
          label: 'Knowledge Base',
          collapsible: true,
          collapsed: false,
          items: [
            {
              type: 'ref',
              id: 'kb/kb-202601-letsencrypt',
              label: 'Let\'s Encrypt YE/YR roots on Windows'
            },
            {
              type: 'ref',
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
      /* This sidebar is used for common documentation shared between Certify Certificate Manager and Certify Management Hub */
      type: 'category',
      label: 'Common Concepts',
      items: [
        createCommonConceptsCategory(),
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
            'guides/powershell-support',
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
        }
      ]
    }
  ],
};
