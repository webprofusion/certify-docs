"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5681],{6077:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>n,metadata:()=>a,toc:()=>h});var r=i(4848),s=i(8453);const n={id:"kb-202109-letsencrypt",title:"Let's Encrypt DST Root CA X3 expiry Sept 30th 2021"},o="Summary",a={id:"kb/kb-202109-letsencrypt",title:"Let's Encrypt DST Root CA X3 expiry Sept 30th 2021",description:'Certificate trust mainly relies on the "root" issuing certificate (and intermediate certificates) being trusted by your computer.',source:"@site/docs/kb/202109-letsencrypt.md",sourceDirName:"kb",slug:"/kb/kb-202109-letsencrypt",permalink:"/docs/kb/kb-202109-letsencrypt",draft:!1,unlisted:!1,editUrl:"https://github.com/webprofusion/certify-docs/edit/master/docs/kb/202109-letsencrypt.md",tags:[],version:"current",sidebarPosition:202109,frontMatter:{id:"kb-202109-letsencrypt",title:"Let's Encrypt DST Root CA X3 expiry Sept 30th 2021"}},c={},h=[{value:"Servers",id:"servers",level:2},{value:"Certify The Web - <em>Certify Certificate Manager</em> renewal failures",id:"certify-the-web---certify-certificate-manager-renewal-failures",level:3},{value:"Servers with problems after expiry",id:"servers-with-problems-after-expiry",level:3},{value:"Server fixes and how to switch chain before (or after) expiry",id:"server-fixes-and-how-to-switch-chain-before-or-after-expiry",level:3},{value:"<strong>Chain 1 (modern)</strong> : (your cert) &gt; R3 &gt; ISRG Root X1",id:"chain-1-modern--your-cert--r3--isrg-root-x1",level:4},{value:"<strong>Chain 2 (legacy)</strong> : (your cert) &gt; R3 &gt; ISRG Root X1 &gt; DST Root CA X3",id:"chain-2-legacy--your-cert--r3--isrg-root-x1--dst-root-ca-x3",level:4},{value:"Switching to Chain 1 (modern)",id:"switching-to-chain-1-modern",level:3},{value:"Switching to Chain 2 (legacy)",id:"switching-to-chain-2-legacy",level:3},{value:"Non-IIS servers (Apache, nginx etc on Windows or Linux)",id:"non-iis-servers-apache-nginx-etc-on-windows-or-linux",level:2},{value:"Clients (browsers etc)",id:"clients-browsers-etc",level:2},{value:"Windows PCs",id:"windows-pcs",level:3},{value:"macOS, iOS etc",id:"macos-ios-etc",level:3},{value:"Java based systems etc",id:"java-based-systems-etc",level:2},{value:"Azure (Application Gateway)",id:"azure-application-gateway",level:2},{value:"Other considerations",id:"other-considerations",level:2},{value:"Export Tasks",id:"export-tasks",level:3},{value:"Renewals fail if ISRG Root X1 not installed",id:"renewals-fail-if-isrg-root-x1-not-installed",level:3},{value:"Further Troubleshooting",id:"further-troubleshooting",level:2},{value:"Useful Information",id:"useful-information",level:2},{value:"Chain Checking",id:"chain-checking",level:3},{value:"Further Reading",id:"further-reading",level:3}];function l(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",mdxAdmonitionTitle:"mdxAdmonitionTitle",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"summary",children:"Summary"})}),"\n",(0,r.jsx)(t.p,{children:'Certificate trust mainly relies on the "root" issuing certificate (and intermediate certificates) being trusted by your computer.'}),"\n",(0,r.jsx)(t.p,{children:'The root certificate issues an Intermediate certificate which in turn is used to issue general certificates such as the ones for your website. This is called a "Chain" of trust. Your certificate (called a Leaf or end-entity certificate) will be validated by following this chain.'}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsxs)(t.em,{children:["From Sept 30th 2021 Let's Encrypts previous root certificate ",(0,r.jsx)(t.em,{children:"DST Root CA X3"})," (and it's R3 intermediate) will expire. It has been replaced by their ",(0,r.jsx)(t.em,{children:"ISRG Root X1"})," certificate (and replacement R3 intermediate)."]})}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"In most cases, your systems will automatically switch over to the next trusted chain they can find."})})}),"\n",(0,r.jsxs)(t.admonition,{type:"success",children:[(0,r.jsxs)(t.mdxAdmonitionTitle,{children:["Lean More About ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})]}),(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," is the most popular desktop UI for ACME certificate management and includes commercial support via email to our helpdesk. Find out more at  ",(0,r.jsx)(t.a,{href:"https://certifytheweb.com",children:"https://certifytheweb.com"})]}),(0,r.jsx)(t.p,{children:"The guidance in this article is aimed at all Windows users with Let's Encrypt related issues, for any ACME client."})]}),"\n",(0,r.jsx)(t.h1,{id:"possible-issues",children:"Possible issues"}),"\n",(0,r.jsxs)(t.p,{children:["The version of the ",(0,r.jsx)(t.em,{children:"R3"})," intermediate signing certificate which chains to ",(0,r.jsx)(t.em,{children:"DST Root CA X3"})," expired ",(0,r.jsx)(t.strong,{children:"September 29 19:21:40 2021 GMT."})]}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.em,{children:"DST Root CA X3"})," root certificate expired ",(0,r.jsx)(t.strong,{children:"September 30 14:01:15 2021 GMT"}),"."]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"In some cases, the expiry of the root (and its related expiring R3 intermediate certificate) may causes certificates to be considered untrusted or invalid. To fix this you need to make your server use (serve) the correct chain."}),"\n",(0,r.jsx)(t.li,{children:"In other cases, the issue may be with the client computer."}),"\n",(0,r.jsxs)(t.li,{children:["Some app renewals will fail with ",(0,r.jsx)(t.em,{children:"too many certificates (5) already issued for this exact set of domains in the last 168 hours"}),". See solution below."]}),"\n",(0,r.jsx)(t.li,{children:"If you have clients complaining about some android devices not working with their websites, you may need to migrate to a different Certificate Authority (see below)."}),"\n"]}),"\n",(0,r.jsxs)(t.admonition,{title:"CA Migration Recommended On Windows if you need to support old devices",type:"warning",children:[(0,r.jsxs)(t.p,{children:["In testing we have confirmed that when ",(0,r.jsx)(t.code,{children:"DST Root CA X3"})," expires, although Windows can initially serve the legacy chain intended for Android compatibility, it will revert to the modern chain automatically when it notices ",(0,r.jsx)(t.code,{children:"DST Root CA X3"})," has expired, if ",(0,r.jsx)(t.code,{children:"ISRG Root X1 (self signed)"})," is also present in the trust store. A ",(0,r.jsx)(t.a,{href:"#switching-to-chain-2-legacy",children:"workaround is available"})]}),(0,r.jsxs)(t.p,{children:["This means Windows services like IIS generally will not continue to serve content to older operating systems which don't trust ",(0,r.jsx)(t.code,{children:"ISRG Root X1"}),". If you require legacy support without workarounds, you should change ",(0,r.jsx)(t.a,{href:"/docs/guides/certificate-authorities",children:"Certificate Authority"}),"."]})]}),"\n",(0,r.jsx)(t.h1,{id:"solutions",children:"Solutions"}),"\n",(0,r.jsx)(t.h2,{id:"servers",children:"Servers"}),"\n",(0,r.jsxs)(t.p,{children:["The following solutions mainly apply to Windows servers running IIS or other windows based services which use the windows trust store. Unless otherwise noted they are not specific to using ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"}),". Apache, nginx etc have their own trust mechanisms :"]}),"\n",(0,r.jsxs)(t.h3,{id:"certify-the-web---certify-certificate-manager-renewal-failures",children:["Certify The Web - ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," renewal failures"]}),"\n",(0,r.jsxs)(t.p,{children:["If you are using ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," and see the error ** Error creating new order :: too many certificates (5) already issued for this exact set of domains in the last 168 hours** ensure you have installed the latest version of ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," and wait 1 week for the error to clear."]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"As your server has repeatedly attempted to order a certificate and failed you will need to wait 1 week for the Let's Encrypt rate limit to reset for this certificate"}),", then renewals will automatically resume as normal, as long as you now have the ISRG Root X1 certificate installed. Root certificate updates are a normal part of automatic windows updates, so you should ideally review why your server is not receiving these."]}),"\n",(0,r.jsxs)(t.p,{children:["Alternatively you could change Certificate Authority if this is an urgent renewal, ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," supports several public certificate authorities: ",(0,r.jsx)(t.a,{href:"https://docs.certifytheweb.com/docs/guides/certificate-authorities",children:"https://docs.certifytheweb.com/docs/guides/certificate-authorities"})]}),"\n",(0,r.jsx)(t.h3,{id:"servers-with-problems-after-expiry",children:"Servers with problems after expiry"}),"\n",(0,r.jsxs)(t.admonition,{title:"Check Your Chain",type:"tip",children:[(0,r.jsxs)(t.p,{children:["1 - To diagnose a chain issue for your server, scan one of your webservers domains with a ",(0,r.jsx)(t.a,{href:"#chain-checking",children:"chain checker"})]}),(0,r.jsx)(t.p,{children:"2 - If your chain contains the expired R3 after it's expiry, reboot your server to clear cached chains."}),(0,r.jsxs)(t.p,{children:["3 - If the chain issue persists, re-request your certificate in the app to force a binding refresh or choose ",(0,r.jsx)(t.code,{children:"Certificate > Advanced > Actions > Re-apply Certificate To Bindings"}),"."]})]}),"\n",(0,r.jsx)(t.h3,{id:"server-fixes-and-how-to-switch-chain-before-or-after-expiry",children:"Server fixes and how to switch chain before (or after) expiry"}),"\n",(0,r.jsx)(t.p,{children:"We recommend the following steps to initially correct your servers certificate chain:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsxs)(t.li,{children:["Install the latest version of ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," from ",(0,r.jsx)(t.a,{href:"https://certifytheweb.com",children:"https://certifytheweb.com"})," or use the in-app update process. Even if you are not using this app currently, the upgrade will automatically fix common trust store issues (and it can then be uninstalled if not being used)."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:"Reboot your server"})," (this forces windows to re-evaluate the served certificate chains). You may be able to avoid this reboot by using ",(0,r.jsx)(t.code,{children:"iisreset /restart"})," to just restart IIS."]}),"\n",(0,r.jsxs)(t.li,{children:["Check your certificate chain with a ",(0,r.jsx)(t.a,{href:"#chain-checking",children:"chain checker"})]}),"\n",(0,r.jsx)(t.li,{children:"In some cases you may need to refresh your IIS bindings, the easiest method is to click 'Request Certificate' to change certificate and update bindings."}),"\n"]}),"\n",(0,r.jsxs)(t.admonition,{title:"Valid Chains",type:"tip",children:[(0,r.jsx)(t.p,{children:"The default chain served by Windows (depending on the state of your server trust store) will be either:"}),(0,r.jsxs)(t.h4,{id:"chain-1-modern--your-cert--r3--isrg-root-x1",children:[(0,r.jsx)(t.strong,{children:"Chain 1 (modern)"})," : (your cert) > R3 > ISRG Root X1"]}),(0,r.jsx)(t.p,{children:"This chain is supported by current operating systems"}),(0,r.jsxs)(t.h4,{id:"chain-2-legacy--your-cert--r3--isrg-root-x1--dst-root-ca-x3",children:[(0,r.jsx)(t.strong,{children:"Chain 2 (legacy)"})," : (your cert) > R3 > ISRG Root X1 > DST Root CA X3"]}),(0,r.jsxs)(t.p,{children:["This chain is ideal if you need broader compatibility with older operating systems, including Android 7.1 and lower. This chain is ",(0,r.jsx)(t.a,{href:"#switching-to-chain-2-legacy",children:"difficult to support on Windows"})]})]}),"\n",(0,r.jsxs)(t.p,{children:["For IIS etc, you can only serve one of these chains per Windows server (machine), not a combination per site etc. The default trust store maintenance in the app will provide the ",(0,r.jsx)(t.em,{children:"modern"})," chain. If you need the legacy chain you may still need import the cross signed ISRG Root X1 (see ",(0,r.jsx)(t.em,{children:"Switching to Chain 2"}),", below) unless it was already installed."]}),"\n",(0,r.jsx)(t.admonition,{title:"If your chain is still: (your cert) > R3 > DST Root CA X3",type:"danger",children:(0,r.jsxs)(t.p,{children:["If you still see this old chain after the DST Root CA X3 expiry (after updating ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," and after rebooting), then you need to resolve this urgently. At a minimum you must ensure ISRG Root X1 (Self signed) is installed under your machine Trusted Certification Authorities using certlm.msc and remove the R3 issued by DST Root CA X3 from Intermediate Certification Authorities. See the ",(0,r.jsx)(t.a,{href:"#further-troubleshooting",children:"further troubleshooting"})," section below."]})}),"\n",(0,r.jsx)(t.h3,{id:"switching-to-chain-1-modern",children:"Switching to Chain 1 (modern)"}),"\n",(0,r.jsxs)(t.p,{children:["If you are serving the ",(0,r.jsx)(t.em,{children:"ISRG Root X1 > DST Root CA X3 (self signed)"})," chain and want to switch to just the ",(0,r.jsx)(t.em,{children:"ISRG Root X1"})," chain:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"remove the cross signed version of the ISRG Root X1 (issued by DST Root CA X3) from your machine trust store."}),"\n",(0,r.jsx)(t.li,{children:"You may need to reboot to see the effect."}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"switching-to-chain-2-legacy",children:"Switching to Chain 2 (legacy)"}),"\n",(0,r.jsxs)(t.p,{children:["If you require compatibility with old versions of Android and other devices that don't know about ",(0,r.jsx)(t.em,{children:"ISRG Root X1"}),", you need to serve ",(0,r.jsx)(t.strong,{children:"Chain 2"}),"."]}),"\n",(0,r.jsxs)(t.admonition,{title:"Caution - Workaround",type:"warning",children:[(0,r.jsxs)(t.p,{children:["A previously proposed workaround was to move ",(0,r.jsx)(t.code,{children:"ISRG Root X1 (self signed)"})," to the ",(0,r.jsx)(t.code,{children:"Untrusted"})," store in order to serve the legacy ",(0,r.jsx)(t.code,{children:"DST Root CA X3"})," chain. This has unintended side effects (your server cannot validate https connections against services such as the Let's Encrypt API)."]}),(0,r.jsxs)(t.p,{children:["Servers which do not yet trust ",(0,r.jsx)(t.code,{children:"ISRG Root X1 (self signed)"})," will be serving the legacy chain but will automatically switch when their trust store updates."]}),(0,r.jsx)(t.p,{children:"Instead, if you require this chain for compatibility, either use a proxy (Caddy, nginx, Apache) in front of IIS and use the proxy to terminate TLS."}),(0,r.jsx)(t.p,{children:"If no other solution works or for any other reason you cannot update client trusts stores etc or require other broader compatibility, you may need to consider moving your certificate to a new Certificate Authority."})]}),"\n",(0,r.jsx)(t.h2,{id:"non-iis-servers-apache-nginx-etc-on-windows-or-linux",children:"Non-IIS servers (Apache, nginx etc on Windows or Linux)"}),"\n",(0,r.jsxs)(t.p,{children:["Verify that your service is configured to use your certificate, with it's private key ",(0,r.jsx)(t.em,{children:"and"})," it's ",(0,r.jsx)(t.strong,{children:"chain"}),". These services will work without pointing to a chain file but in the case of the expired R3 your clients will try to resolve the R3 themselves (because you haven't given it to them) and they may then resolve it to the old (expired) one."]}),"\n",(0,r.jsxs)(t.p,{children:["We have seen reports of issues with old iOS versions when using IIS as a front end reverse proxied to node (for NextJS etc). This is an unrelated issue to do with http headers: ",(0,r.jsx)(t.a,{href:"https://stackoverflow.com/questions/71037910/safari-10-fails-to-load-https-with-node-js-iisnode-spams-requests",children:"https://stackoverflow.com/questions/71037910/safari-10-fails-to-load-https-with-node-js-iisnode-spams-requests"})]}),"\n",(0,r.jsx)(t.h2,{id:"clients-browsers-etc",children:"Clients (browsers etc)"}),"\n",(0,r.jsx)(t.p,{children:"If your site is working for most devices but not for some, the problem is with their trust store (their list of trusted root certificate)."}),"\n",(0,r.jsx)(t.h3,{id:"windows-pcs",children:"Windows PCs"}),"\n",(0,r.jsxs)(t.p,{children:["On windows PCs, simply browsing to a website using Chrome, Edge etc with updated the client trust store with the required certificates. Browsing to ",(0,r.jsx)(t.a,{href:"https://valid-isrgrootx1.letsencrypt.org/",children:"https://valid-isrgrootx1.letsencrypt.org/"})," will prompt Windows to include ",(0,r.jsx)(t.em,{children:"ISRG Root X1"})," in its trust store automatically."]}),"\n",(0,r.jsx)(t.p,{children:"For Windows (with an outdated trust store) you can manually install ISRG Root X1:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Browse to ",(0,r.jsx)(t.a,{href:"http://x1.i.lencr.org/",children:"http://x1.i.lencr.org/"}),' in order to download the .cer file for ISRG Root X1 (your browser may warn about the file type and you may need to click "Keep" to save the file).']}),"\n",(0,r.jsx)(t.li,{children:'Open the file, click "Install Certificate..", Choose "Install to Trusted Root Certificate Store" option, Next, Finish'}),"\n",(0,r.jsx)(t.li,{children:"Reboot"}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"You should then find out why your Windows install is not updating certificate authorities automatically (the default behaviour)."}),"\n",(0,r.jsx)(t.h3,{id:"macos-ios-etc",children:"macOS, iOS etc"}),"\n",(0,r.jsxs)(t.p,{children:["Some operating systems hold onto the expired ",(0,r.jsx)(t.code,{children:"R3 > DST Root CA X3"})," chain even if your server is no longer using it. Try a restart of the affected client device."]}),"\n",(0,r.jsx)(t.p,{children:"For older macOS not updated by Apple:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Download the ISRG Root X1 certificate file from ",(0,r.jsx)(t.a,{href:"http://x1.i.lencr.org/",children:"http://x1.i.lencr.org/"})]}),"\n",(0,r.jsx)(t.li,{children:"Open the Keychain Access app and drag that file into the System folder of that app."}),"\n",(0,r.jsx)(t.li,{children:'Find the ISRG Root X1 certificate in System and double click on it, open the Trust menu and change "Use System Defaults" to "Always Trust", then close that and enter your password to confirm the change (if prompted).'}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"java-based-systems-etc",children:"Java based systems etc"}),"\n",(0,r.jsx)(t.p,{children:"Some applications maintain their own trust store. You may need to add the newer ISRG Root X1 certificate into your systems trusts store. Any system that can't be updated needs to see the legacy chain or you need to switch CA."}),"\n",(0,r.jsxs)(t.p,{children:["e.g. for Java you might use: ",(0,r.jsx)(t.code,{children:"keytool -import -alias isrgrootx1 -keystore $JAVA_HOME/jre/lib/security/cacerts -trustcacerts -file isrgrootx1.cer"})," (",(0,r.jsx)(t.a,{href:"https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190/258",children:"credit"}),")"]}),"\n",(0,r.jsx)(t.h2,{id:"azure-application-gateway",children:"Azure (Application Gateway)"}),"\n",(0,r.jsxs)(t.p,{children:["Ensure that the HTTP settings for back-end hosts are updated with the latest Trusted Root Certificate. Download ",(0,r.jsx)(t.a,{href:"https://letsencrypt.org/certs/isrgrootx1.pem",children:"https://letsencrypt.org/certs/isrgrootx1.pem"})," (same as .cer file) and upload via the Azure Portal or via PowerShell. See ",(0,r.jsx)(t.a,{href:"https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-backend-health-troubleshooting",children:"Application Gateway Troubleshooting"})," for further details."]}),"\n",(0,r.jsx)(t.h2,{id:"other-considerations",children:"Other considerations"}),"\n",(0,r.jsx)(t.h3,{id:"export-tasks",children:"Export Tasks"}),"\n",(0,r.jsxs)(t.p,{children:['If you use Certify The Web to export certificates to pem files etc (for Apache or other servers), the chain you get in the export will correspond with the chain your server is currently building. The "Preferred Issuer" setting for the certificate authority will have ',(0,r.jsx)(t.em,{children:"no effect"}),", because Windows is overriding the chain."]}),"\n",(0,r.jsx)(t.h3,{id:"renewals-fail-if-isrg-root-x1-not-installed",children:"Renewals fail if ISRG Root X1 not installed"}),"\n",(0,r.jsxs)(t.p,{children:["If your server does not have ISRG Root X1 installed, ",(0,r.jsx)(t.em,{children:"Certify Certificate Manager"})," will fail to build your certificate when it renews. The certificate order with Let's Encrypt will succeed but the actual build and install of the PFX file will fail. ",(0,r.jsx)(t.strong,{children:"You must update to the latest version"})," or at least install the ISRG Root X1 certificate if your renewals are failing for this reason. Otherwise, you will hit the Let's Encrypt rate limit for duplicate certificate orders and your certificate will not fully renew."]}),"\n",(0,r.jsx)(t.h2,{id:"further-troubleshooting",children:"Further Troubleshooting"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["A registry method to delete the old R3 is ",(0,r.jsx)(t.a,{href:"https://gist.github.com/skusiak/83db2ba2fc1804b89151db01e97bbbec",children:"documented here"})]}),"\n",(0,r.jsxs)(t.li,{children:["If your expired chain keeps coming back, move (or install) the expired ",(0,r.jsx)(t.code,{children:"R3 issued by DST Root CA X3"})," into the Untrusted store using ",(0,r.jsx)(t.code,{children:"certlm.msc"})," (Manage Computer Certificates)."]}),"\n",(0,r.jsxs)(t.li,{children:["Further information and troubleshooting steps are here: ",(0,r.jsx)(t.a,{href:"https://community.certifytheweb.com/t/upcoming-expiry-of-dst-root-ca-x3-and-r3-intermediate-for-lets-encrypt/1480",children:"https://community.certifytheweb.com/t/upcoming-expiry-of-dst-root-ca-x3-and-r3-intermediate-for-lets-encrypt/1480"})]}),"\n"]}),"\n",(0,r.jsx)(t.admonition,{title:"Licensed Users can contact Certify The Web support",type:"tip",children:(0,r.jsxs)(t.p,{children:["While the problem itself relates to and is controlled by Windows and Let's Encrypt, licensed users can contact Certify The Web support via ",(0,r.jsx)(t.code,{children:"support at certifytheweb.com"})," if they have further related questions and issues they need advice with. We are in the AEST (Australia) Time Zone. A higher than normal volume of support tickets are expected immediately up to, during and after the root expiry so please expect delays and perform as much of your own troubleshooting and research as you can."]})}),"\n",(0,r.jsx)(t.h2,{id:"useful-information",children:"Useful Information"}),"\n",(0,r.jsxs)(t.p,{children:["Visit the Let's Encrypt support community for more information about the root expiry and chain changes: ",(0,r.jsx)(t.a,{href:"https://community.letsencrypt.org/t/production-chain-changes/150739/4",children:"https://community.letsencrypt.org/t/production-chain-changes/150739/4"})]}),"\n",(0,r.jsx)(t.h3,{id:"chain-checking",children:"Chain Checking"}),"\n",(0,r.jsx)(t.p,{children:"Other ways to check and diagnose chain issues:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Chain Checker by Certify The Web: ",(0,r.jsx)(t.a,{href:"https://chainchecker.certifytheweb.com/",children:"https://chainchecker.certifytheweb.com/"})," provides useful diagnostics for Let's Encrypt chains."]}),"\n",(0,r.jsxs)(t.li,{children:["Qualsys SSL Server Test: ",(0,r.jsx)(t.a,{href:"https://www.ssllabs.com/ssltest/",children:"https://www.ssllabs.com/ssltest/"})," is useful for full diagnostics of your certificate chain."]}),"\n",(0,r.jsxs)(t.li,{children:["Namecheap SSL Checker: ",(0,r.jsx)(t.a,{href:"https://decoder.link/sslchecker/",children:"https://decoder.link/sslchecker/"})]}),"\n",(0,r.jsxs)(t.li,{children:["OpenSSL: ",(0,r.jsx)(t.code,{children:"openssl s_client -connect your.domain.com:443 -servername  your.domain.com"})]}),"\n"]}),"\n",(0,r.jsx)(t.h3,{id:"further-reading",children:"Further Reading"}),"\n",(0,r.jsxs)(t.p,{children:["The Windows certificate chaining engine: ",(0,r.jsx)(t.a,{href:"https://social.technet.microsoft.com/wiki/contents/articles/3147.pki-certificate-chaining-engine-cce.aspx",children:"https://social.technet.microsoft.com/wiki/contents/articles/3147.pki-certificate-chaining-engine-cce.aspx"})]})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>o,x:()=>a});var r=i(6540);const s={},n=r.createContext(s);function o(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(n.Provider,{value:t},e.children)}}}]);