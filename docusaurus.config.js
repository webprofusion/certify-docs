module.exports = {
  title: 'Certify The Web Docs',
  tagline: "The GUI for Let's Encrypt and ACME Certificate Management on Windows!",
  url: 'https://docs.certifytheweb.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'webprofusion', // Usually your GitHub org/user name.
  projectName: 'certify-docs', // Usually your repo name.
  themeConfig: {
    algolia: {
      appId:'YX7T7PF7BX',
      apiKey: '95033d5e9d8856ce3e628103f123b748',
      indexName: 'certifytheweb'
    },
   
    navbar: {
      title: 'Certify The Web - Docs',
      logo: {
        alt: 'Certify The Web Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: 'docs/intro', label: 'Getting Started', position: 'left'},
        {
          label: 'Requesting a Certificate',
          to: 'docs/certificate-process',
        },
        {to: 'docs/faq', label: 'FAQ', position: 'left'},
        {to: 'docs/support', label: 'Support', position: 'left'},
        {
          href: 'https://community.certifytheweb.com',
          label: 'Community',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/intro',
            },
            {
              label: 'Requesting a Certificate',
              to: 'docs/certificate-process',
            },
            {
              label: 'FAQ',
              to: 'docs/faq',
            },
            {
              label: 'Support',
              to: 'docs/support',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussions',
              href: 'https://community.certifytheweb.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/webprofusion/certify',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/webprofusion/certify',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/certifytheweb',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Webprofusion Pty Ltd. Docs Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve('./sidebars.json'),
          sidebarCollapsible: false,
          editUrl:
            'https://github.com/webprofusion/certify-docs/edit/master/',
        },
        theme: {
          defaultDarkMode: false,
          customCss: [require.resolve('./src/css/custom.css')],
        },
        gtag: {
          trackingID: 'G-RLGYG5TYY5',
          anonymizeIP: true
        },
      },
    ],
  ],
};
