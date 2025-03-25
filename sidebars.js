
export default {

  docSidebar: [
    [
      {
        type: 'category',
        label: 'Certify Certificate Manager',
        items: [
          {
            type: 'category',
            label: 'Introduction',
            items: [
              'intro',
              'guides/installation',
              'certificate-process',
              'renewals'
            ]
          },
          {
            type: 'category',
            label: 'Guides',
            items: [
              {
                type: 'category',
                collapsible: true,
                collapsed: true,
                label: 'Background Information',
                items: [
                  'guides/certificates',
                  'guides/certificate-authorities',
                  'http-validation',
                  'dns/validation',
                  'guides/best-practices',
                  'backgroundservice',
                  'guides/ssl-windows',
                  'guides/troubleshooting'
                ],
              },
              {
                type: 'category',
                collapsible: true,
                collapsed: true,
                label: 'Advanced Deployment',
                items: [
                  'deployment/tasks_intro',
                  'script-hooks',
                  {
                    type: 'doc',
                    id: 'guides/apache-nginx',
                    label: 'Apache, nginx etc'
                  },
                  'guides/architecture/load-balancing',
                  'guides/import-export',
                  'features/data-stores'
                ],
              },
              {
                type: 'category',
                collapsible: true,
                collapsed: true,
                label: 'Other Advanced Options',
                items: [
                  'features/certificate-advanced',
                  'commandline',
                  'csv-import',
                  'features/stir-shaken'
                ]
              },
            ]
          },
          {
            type: 'category',
            label: 'Support',
            items: [
              'guides/licensing',
              'faq',
              'support'

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
          label: 'Introduction',
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
                'hub/installation/windows'
              ],
            },
            'hub/known-issues',
            'hub/guides/ccm'
          ]
        },
        {
          type: 'category',
          label: 'Managed Challenges',
          items: [
            'hub/managedchallenges',
          ]
        },
        {
          type: 'category',
          label: 'Guides',
          items: [
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: 'Background Information',
              items: [
                'guides/certificates',
                'guides/certificate-authorities',
                'http-validation',
                'dns/validation'
              ],
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: 'Advanced Deployment',
              items: [
                'deployment/tasks_intro',
                'script-hooks',
                {
                  type: 'doc',
                  id: 'guides/apache-nginx',
                  label: 'Apache, nginx etc'
                },
                'guides/import-export',
                'features/data-stores'
              ],
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: 'Other Advanced Options',
              items: [
                'features/certificate-advanced',
                'features/stir-shaken'
              ]
            },
          ]
        },
        {
          type: 'category',
          label: 'Support',
          items: [
            'faq',
            'support'

          ]
        }
      ]
    }],
  dashboardSidebar: [
    {
      type: 'html',
      value: '<h4 style="margin-bottom:0">Certify Dashbaord</h4>',
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'dashboard/index',
      ]
    },
    {
      type: 'category',
      label: 'Support',
      items: [
        'support'
      ]
    }
  ],
 certifyDnsSidebar: [
    {
      type: 'html',
      value: '<h4 style="margin-bottom:0">Certify DNS</h4>',
      defaultStyle: true,
    },
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'dns/providers/certifydns',
      ]
    },
    {
      type: 'category',
      label: 'Support',
      items: [
        'support'
      ]
    }
  ]
};

