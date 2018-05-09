/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    
    const currentYear = new Date().getFullYear();

    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
        
          <div>
            <h5>Community</h5>
           
            <a
              href="https://community.certifytheweb.com"
              target="_blank"
              rel="noreferrer noopener">
             Discuss
            </a>
            
            <a
              href="https://twitter.com/certifytheweb/"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>

             <a href="https://github.com/webprofusion/certify">GitHub</a>
         
          </div>
          <div>
            <h5>Help</h5>
            <a href="https://certifytheweb.com/">Website</a>
         
            <a href="https://certifytheweb.com/docs">Support</a>

            <a href="https://github.com/webprofusion/certify/issues">Issues</a>
          </div>
        </section>

        <a
          href="https://code.facebook.com/projects/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/oss_logo.png'}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
