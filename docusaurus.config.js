module.exports = {
  title: 'Certify The Web Docs',
  tagline: 'Getting started with Certify',
  url: 'https://docs.certifytheweb.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'webprofusion', // Usually your GitHub org/user name.
  projectName: 'certify-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Certify The Web - Docs',
      logo: {
        alt: 'Certify The Web Logo',
        src: 'img/logo.svg',
      },
      links: [
        {to: 'docs/intro', label: 'Getting Started', position: 'left'},
        {
          label: 'Requesting a Certificate',
          to: 'docs/certificate-process',
        },
        {to: 'docs/faq', label: 'FAQ', position: 'left'},
        {
          href: 'https://certifytheweb.com',
          label: 'Home',
          position: 'right',
        },
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
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/webprofusion/certify-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
