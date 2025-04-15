"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([["8174"],{9359:function(e,n,t){t.r(n),t.d(n,{default:()=>u,frontMatter:()=>i,metadata:()=>r,assets:()=>c,toc:()=>l,contentTitle:()=>d});var r=JSON.parse('{"id":"dns/providers/awsroute53","title":"AWS Route53 DNS","description":"Setup your AWS Route53 DNS API credentials","source":"@site/docs/dns/providers/awsroute53.md","sourceDirName":"dns/providers","slug":"/dns/providers/awsroute53","permalink":"/docs/dns/providers/awsroute53","draft":false,"unlisted":false,"editUrl":"https://github.com/webprofusion/certify-docs/edit/master/docs/dns/providers/awsroute53.md","tags":[],"version":"current","frontMatter":{"id":"awsroute53","title":"AWS Route53 DNS"}}'),s=t("5893"),o=t("65");let i={id:"awsroute53",title:"AWS Route53 DNS"},d=void 0,c={},l=[{value:"Setup your AWS Route53 DNS API credentials",id:"setup-your-aws-route53-dns-api-credentials",level:2},{value:"Add New Stored Credential",id:"add-new-stored-credential",level:2}];function a(e){let n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"setup-your-aws-route53-dns-api-credentials",children:"Setup your AWS Route53 DNS API credentials"}),"\n",(0,s.jsx)(n.p,{children:"To use the AWS Route53 DNS API, you need to setup your API key and authentication secret:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Sign in to your AWS IAM console: ",(0,s.jsx)(n.a,{href:"https://console.aws.amazon.com/iam/home",children:"https://console.aws.amazon.com/iam/home"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Add a new user (e.g. 'certifydnsadmin')"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Enable Programmatic access,"}),"\n",(0,s.jsx)(n.li,{children:"Create a user Group if you don't already has a group."}),"\n",(0,s.jsxs)(n.li,{children:["You can either allow all permissions:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Allow AmazonRoute53FullAccess for the group."}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Or restrict permission to the following actions:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["route53",":ListHostedZones",", route53",":GetHostedZone",", route53",":ListResourceRecordSets",", route53",":ChangeResourceRecordSets",", route53",":GetChange"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Here is an example JSON policy:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Sid": "VisualEditor0",\n      "Effect": "Allow",\n      "Action": [\n        "route53:GetChange",\n        "route53:GetHostedZone",\n        "route53:ListHostedZones",\n        "route53:ChangeResourceRecordSets",\n        "route53:ListResourceRecordSets"\n      ],\n      "Resource": "*"\n    }\n  ]\n}\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Under your new user details:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Select Security Credentials > Create Access Key"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Copy down your Access Key and Secret Access Key. You cannot recover the same secret after it has been displayed once."}),"\n",(0,s.jsx)(n.h2,{id:"add-new-stored-credential",children:"Add New Stored Credential"}),"\n",(0,s.jsx)(n.p,{children:"Now add a new Stored Credential in Certify, choosing AWS Route53 DNS as the provider type, enter: - Your Access Key - Your Secret Key - Select Save."}),"\n",(0,s.jsx)(n.p,{children:"When you use this credential for a Managed Certificate you will also require your ZoneId for the specific hosted zone you are modifying."})]})}function u(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},65:function(e,n,t){t.d(n,{Z:function(){return d},a:function(){return i}});var r=t(7294);let s={},o=r.createContext(s);function i(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);