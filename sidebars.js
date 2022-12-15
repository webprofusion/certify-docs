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
            'guides/architecture/load-balancing',
            'guides/import-export'
          ],
        },
        {
          type: 'category',
          collapsible: true,
          label: 'General',
          items: ["guides/csr"],
        },
      ]
    },
    {
      type: 'category',
      label: 'Useful Info',
      items: [
        "guides/best-practices",
        "guides/ssl-windows",
        "commandline",
        "csv-import",
        "backgroundservice"

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