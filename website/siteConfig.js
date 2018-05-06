/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

const siteConfig = {
  title: 'Certify The Web - Docs' /* title for your website */,
  tagline: 'Documentation for Certify SSL Manager and related Certify The Web services.',
  url: 'https://certifytheweb.com' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',
  editUrl: "https://github.com/webprofusion/certify-docs/edit/master/docs/",
  // Used for publishing and more
  projectName: 'certify-docs',
  organizationName: 'webprofusion',
  cname:'docs.certifytheweb.com',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'intro', label: 'Getting Started'},
    {doc: 'faq', label: 'FAQ'},
    /*{page: 'help', label: 'Help'},*/
    /*{blog: true, label: 'Blog'},*/
  ],
  disableHeaderTitle: false,
  // If you have users set above, you add it here:

  /* path to images for header/footer */
  headerIcon: 'img/icon.svg',
  footerIcon: 'img/icon.svg',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#3cb33c',
    secondaryColor: '#000000',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Webprofusion Pty Ltd',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/favicon.png',
  twitterImage: 'img/favicon.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
