
export default {

  docSiderbar: [
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
};

