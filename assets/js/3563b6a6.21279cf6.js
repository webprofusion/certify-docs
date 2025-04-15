"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["8921"],{7135:function(e,t,n){n.r(t),n.d(t,{default:()=>h,frontMatter:()=>s,metadata:()=>i,assets:()=>l,toc:()=>c,contentTitle:()=>a});var i=JSON.parse('{"id":"guides/import-export","title":"Import & Export","description":"Migration from one instance to another","source":"@site/docs/guides/import-export.md","sourceDirName":"guides","slug":"/guides/import-export","permalink":"/docs/guides/import-export","draft":false,"unlisted":false,"editUrl":"https://github.com/webprofusion/certify-docs/edit/master/docs/guides/import-export.md","tags":[],"version":"current","frontMatter":{"id":"import-export","title":"Import & Export"},"sidebar":"hubDocSidebar","previous":{"title":"Apache, nginx etc","permalink":"/docs/guides/apache-nginx"},"next":{"title":"Data Stores","permalink":"/docs/features/data-stores"}}'),o=n("5893"),r=n("65");let s={id:"import-export",title:"Import & Export"},a=void 0,l={},c=[{value:"Migration from one instance to another",id:"migration-from-one-instance-to-another",level:2},{value:"Export your configuration",id:"export-your-configuration",level:2},{value:"Import to new instance",id:"import-to-new-instance",level:2},{value:"Check and correct the migration",id:"check-and-correct-the-migration",level:2}];function d(e){let t={admonition:"admonition",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{id:"migration-from-one-instance-to-another",children:"Migration from one instance to another"}),"\n",(0,o.jsx)(t.admonition,{title:"Consider starting with new configuration",type:"tip",children:(0,o.jsx)(t.p,{children:"If you don't have a lot of managed certificates setup then the easiest method is to recreate them on the new server. If using http validation your domain DNS must be updated to point to the new server first."})}),"\n",(0,o.jsxs)(t.p,{children:["The app includes a basic import/export tool to help with large scale migration from an old server to a new server. This will attempt to create a single bundle of configuration and apply it to a new instance of the app. This feature should be used with caution and you should not assume that migrated settings will result in a completely working migration - ",(0,o.jsx)(t.strong,{children:"testing your migration is absolutely essential"}),"."]}),"\n",(0,o.jsx)(t.p,{children:"The settings for your managed certificates will include the managed certificate (renewal) settings, encrypted stored credentials and the certificate files themselves. In addition to these settings a migration will perform deployment to IIS and you can optionally run any deployment tasks."}),"\n",(0,o.jsx)(t.h2,{id:"export-your-configuration",children:"Export your configuration"}),"\n",(0,o.jsx)(t.p,{children:"To use this feature, start by creating your export file:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"Under Settings > Import & Export, set a password for your export, click Export and save the file."}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"import-to-new-instance",children:"Import to new instance"}),"\n",(0,o.jsx)(t.admonition,{type:"warning",children:(0,o.jsx)(t.p,{children:"For IIS, if your existing managed certificates use the Single Site mode you will need the IIS Site IDs to match between your old server and your new server for your target sites. Failure to do so will result in managed certificate that don't deploy to the matching IIS site. You can mitigate this by using the Auto mode for deployment instead of Single Site mode."})}),"\n",(0,o.jsx)(t.p,{children:"To perform your import:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsx)(t.li,{children:"On your new instance (or ideally a test system) follow the same steps above but choose Import > Preview Import.., then proceed with the import."}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"check-and-correct-the-migration",children:"Check and correct the migration"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"Review your managed certificates settings"}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:'Look at the Preview tab to ensure that the next renewal will update the correct IIS websites (specifically there should be Binding updates shown under the "3. Deployment" section.'}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"If the app can no longer match the certificate to the correct website you need to correct that for renewals to work in the future. Typically the deployment mode under the Deployment tab should just be set to Auto, if it's still set to Single Site (the old default) then it will try to match on the previously known IIS Site ID which is possibly different on your new instance."}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"You should then review your IIS settings to ensure the correct https bindings have been added/updated with a certificate for each site."}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"Perform a test renewal of one of your managed certificates using Request Certificate, this will test that your configuration is generally working for renewals."}),"\n"]}),"\n"]})]})}function h(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},65:function(e,t,n){n.d(t,{Z:function(){return a},a:function(){return s}});var i=n(7294);let o={},r=i.createContext(o);function s(e){let t=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);