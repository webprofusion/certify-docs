module.exports = {
  title: 'Certify The Web Docs',
  tagline: "The worlds most popular solution for Let's Encrypt and ACME Certificate Management on Windows.",
  url: 'https://docs.certifytheweb.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'webprofusion', // Usually your GitHub org/user name.
  projectName: 'certify-docs', // Usually your repo name.
  future: {
    experimental_faster: true,
  },
  themeConfig: {
    algolia: {
      appId: 'YX7T7PF7BX',
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

        { to: 'docs/intro', label: 'Certify Certificate Manager', position: 'left' },
        { to: 'docs/dashboard/', label: 'Certify Dashboard', position: 'left' },
        { to: 'docs/dns/providers/certifydns/', label: 'Certify DNS', position: 'left' },
        { to: 'docs/support', label: 'Support', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'right' },
        {
          href: 'https://community.certifytheweb.com',
          label: 'Community',
          position: 'right',
        },
        {
          label: 'certifytheweb.com',
          href: 'https://certifytheweb.com',
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
              label: 'Certify Certificate Manager',
              to: 'docs/intro',
            },
            {
              label: 'Certify Dashboard',
              to: 'docs/dashboard',
            },
            {
              label: 'Certify DNS',
              to: 'docs/dns/providers/certifydns',
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
            {
              label: 'certifytheweb.com',
              href: 'https://certifytheweb.com',
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
              label: 'X.com',
              href: 'https://x.com/certifytheweb',
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
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false,
          editUrl:
            'https://github.com/webprofusion/certify-docs/edit/master/',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        gtag: {
          trackingID: 'G-RLGYG5TYY5',
          anonymizeIP: true
        },
      },
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};
