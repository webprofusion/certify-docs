"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4695],{5912:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var i=n(4848),o=n(8453);const r={id:"nginx",title:"Deployment Task - Deploy to nginx"},s=void 0,a={id:"deployment/tasks/nginx",title:"Deployment Task - Deploy to nginx",description:"The Deploy to Nginx task will export your certificate and the components you choose as a set of PEM format files.",source:"@site/docs/deployment/tasks/nginx.md",sourceDirName:"deployment/tasks",slug:"/deployment/tasks/nginx",permalink:"/docs/deployment/tasks/nginx",draft:!1,unlisted:!1,editUrl:"https://github.com/webprofusion/certify-docs/edit/master/docs/deployment/tasks/nginx.md",tags:[],version:"current",frontMatter:{id:"nginx",title:"Deployment Task - Deploy to nginx"}},l={},c=[{value:"Task Parameters",id:"task-parameters",level:2},{value:"Authentication",id:"authentication",level:3},{value:"File Paths",id:"file-paths",level:3},{value:"Output filepath for key",id:"output-filepath-for-key",level:4},{value:"Output filepath for full chain",id:"output-filepath-for-full-chain",level:4},{value:"Nginx Config",id:"nginx-config",level:2},{value:"Restarting nginx",id:"restarting-nginx",level:3},{value:"CA Preferred Chain",id:"ca-preferred-chain",level:3}];function h(e){const t={code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.em,{children:"Deploy to Nginx"})," task will export your certificate and the components you choose as a set of PEM format files."]}),"\n",(0,i.jsxs)(t.p,{children:["To use a certificate with your web server, the service you are targeting needs to know the certificate for your domain (",(0,i.jsx)(t.strong,{children:"Leaf or End-Entity Certificate"}),"), intermediate certificates from your CA (if any) and the ",(0,i.jsx)(t.strong,{children:"Private Key"})," that corresponds to the public key in the certificate. The app can produce the files you need but currently it does not automatically configure nginx to use them."]}),"\n",(0,i.jsx)(t.h2,{id:"task-parameters",children:"Task Parameters"}),"\n",(0,i.jsx)(t.h3,{id:"authentication",children:"Authentication"}),"\n",(0,i.jsxs)(t.p,{children:["This option lets you specify credentials if you are deploying to a remote server. If you are just deploying to the local machine leave this option set to ",(0,i.jsx)(t.em,{children:"Local"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"To deploy to a remote server via SSH you can select the SSH option and provide/select the credentials to use."}),"\n",(0,i.jsx)(t.h3,{id:"file-paths",children:"File Paths"}),"\n",(0,i.jsxs)(t.p,{children:["You can decide which output files you want and where they should be written to. The file paths should be ",(0,i.jsx)(t.em,{children:"full filenames"}),", not just directories. Typically the actual filename doesn't matter and you can name them according your own preferences, the file extension is also not important and conventions can vary. The most important thing is for your nginx config to point to the correct files:"]}),"\n",(0,i.jsx)(t.h4,{id:"output-filepath-for-key",children:"Output filepath for key"}),"\n",(0,i.jsxs)(t.p,{children:["This is the output file for the ",(0,i.jsx)(t.strong,{children:"Private Key"}),". This file should be kept secure and not shared with anyone."]}),"\n",(0,i.jsxs)(t.p,{children:["Example: ",(0,i.jsx)(t.code,{children:"C:\\nginx\\certs\\mysite\\privkey.pem"})]}),"\n",(0,i.jsx)(t.h4,{id:"output-filepath-for-full-chain",children:"Output filepath for full chain"}),"\n",(0,i.jsxs)(t.p,{children:["The full path to the file where the certificate ",(0,i.jsx)(t.strong,{children:"Full Chain"})," (your leaf certificate and any intermediate certificates) will be exported to."]}),"\n",(0,i.jsxs)(t.p,{children:["Example: ",(0,i.jsx)(t.code,{children:"C:\\nginx\\certs\\mysite\\fullchain.pem"})]}),"\n",(0,i.jsx)(t.h2,{id:"nginx-config",children:"Nginx Config"}),"\n",(0,i.jsxs)(t.p,{children:["In a typical nginx config you would only need to specify the ",(0,i.jsx)(t.strong,{children:"Full Chain"})," and the ",(0,i.jsx)(t.strong,{children:"Private Key"})," only. You then point to these files in your config:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["Point ",(0,i.jsx)(t.em,{children:"ssl_certificate_key"})," at your ",(0,i.jsx)(t.strong,{children:"Private Key"})," file"]}),"\n",(0,i.jsxs)(t.li,{children:["Point ",(0,i.jsx)(t.em,{children:"ssl_certificate"})," at your ",(0,i.jsx)(t.strong,{children:"Full Chain"})," file"]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"restarting-nginx",children:"Restarting nginx"}),"\n",(0,i.jsxs)(t.p,{children:['For your changes to take effect you will need to restart Nginx. You can do this by adding a *Stop, Start or Restart a Service" task after your ',(0,i.jsx)(t.em,{children:"Deploy to nginx"})," task."]}),"\n",(0,i.jsx)(t.h3,{id:"ca-preferred-chain",children:"CA Preferred Chain"}),"\n",(0,i.jsxs)(t.p,{children:["Some CAs offer alternative certificate chains for compatibility. Let's Encrypt offers both a ",(0,i.jsx)(t.em,{children:"DST Root CA X3"})," chain (expired) and a newer ",(0,i.jsx)(t.em,{children:"ISRG Root X1"})," chain. ",(0,i.jsx)(t.em,{children:"Certify Certificate Manager"})," v6.x onwards defaults to the newer chain. If you need to use the older chain (e.g. for old Android compatibility) you can do so by setting the ",(0,i.jsx)(t.em,{children:"Preferred Chain"})," option under ",(0,i.jsx)(t.em,{children:"Certificate > Advanced > Certificate Authority - Preferred Chain"})," to ",(0,i.jsx)(t.em,{children:"DST Root CA X3"})," and re-requesting your certificate."]})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>a});var i=n(6540);const o={},r=i.createContext(o);function s(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);