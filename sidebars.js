const sidebars = {
  docSiderbar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        "intro",
        "guides/installation",
        "certificate-process",
        "renewals"
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
       
        {
          type: 'category',
          collapsible: true,
          label: 'Background Information',
          items: [
            "guides/certificate-authorities",
            "guides/certificates",
            "http-validation",
            "dns/validation"
          ],
        },
        {
          type: 'category',
          collapsible: true,
          label: 'Advanced Deployment',
          items: [
            "deployment/tasks_intro",
            "script-hooks",
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
          label: 'Other Advanced Options',
          items: [
            "features/certificate-advanced",
            "commandline",
            "csv-import",
            'features/stir-shaken'
        ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Useful Info',
      items: [
        "guides/best-practices",
        "guides/ssl-windows",
        "backgroundservice",
        'guides/troubleshooting'

      ]
    },
    {
      type: 'category',
      label: 'Support',
      items: [
        "guides/licensing",
        "faq",
        "support"

      ]
    }
  ]
};

module.exports = sidebars;