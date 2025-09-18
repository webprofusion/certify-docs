---
id: licensing
title: Licensing
---


## About Licensing
Certify The Web is a range of commercial products related to automated certificate management and this documentation covers licensing for the following:

- Certify Certificate Manager (Windows app)
- Certify Management Agent (Linux, macOS etc)
- Certify Management Hub

A free community edition is available for download and evaluation but commercial users and funded organizations are expected to license the products by purchasing one or more license keys.

:::note

We have separate licensing for our [Certify DNS](../dns/providers/certifydns.md) managed dns challenge service which is **not** covered by the licensing below.

:::

You can purchase a license key which will then enable you to activate the app on one or more machines (depending on your license type). You can purchase multiple license keys to fit different sized organizations and each instance can manage an unlimited number of certificates through your choice of Certificate Authority.

You can review and manage your license keys and activated instances via your certifytheweb.com profile under License Keys. 

There are two main methods of licensing:
- License Bundles
- Cloud Managed Licenses

*We do not offer special licensing terms for any type of organization.*

## License Bundles
For the *Certify Certificate Manager* app you can currently purchase the following license bundles:

| Type          | Renewal Frequency | Max Activated Instances| Price         |
|---------------|-------------------|-------------------|---------------|
| Starter       | 12 Months         | 1                 | $59 USD       | 
| Professional  | 12 Months         | 3                 | $149 USD      | 
| Power Pro     | 12 Months         | 25                | $649 USD      | 
| Enterprise    | 12 Months         | 100               | $1999 USD     |

From 1st November 2023 we have moved to a 12 month renewal cycle for all license tiers and revised pricing, this will apply to new licenses, **existing renewals will remain on the previous pricing/terms until after 1st Nov 2025**. Pricing for Power Pro and Enterprise tiers last revised 1st October 2024.

- These give you 1 license key (per bundle purchased) which can be used up to the given number of installs.
- *Certify Management Hub* requires a Power Pro, Enterprise or Cloud Managed license and is not included in Starter or Professional bundles.
- License tier names are an arbitrary label and are not related to the size/nature of your organization, they are just our name for the license bundle.

- These license bundles can be purchased using a credit card (via Stripe) or via PayPal. 

- **POs/Proforma Invoicing etc are not supported due to the manual processing involved. See Cloud Licensing instead or you can also get a link to send to someone else to complete payment on behalf of your account.**

- If you specifically need to purchase through a reseller please provide your preferred reseller a link to this page with your enquiry. See *Licensing through Resellers* below.

- Notifications are sent when your license key is about to expire. To stop receiving notifications about an expiring or expired license key, sign into your certifytheweb.com profile and choose `Cancel Now` from the License keys tab.

## Cloud Managed Licenses
An alternative to purchasing a license bundle is to have a flexible license that's managed via a cloud subscription. 

The benefits of a cloud managed license are:
- **Billing is entirely integrated into your organization's existing cloud provider subscription.**
- You have one product license key which you can apply to multiple installs.
- You can increase or decrease the number of installs required at any time. 
- Your organization is only billed (by the cloud provider) for the number of installs you have set in your cloud subscription (pro rata per month).

Cloud subscription pricing varies by provider. The *number of licensed installs* set on your subscription is referred to by cloud providers as *Seats* or *Users*.

:::note

Note: If you license (for example) 10 installs but only actually install 9 you will be billed for 10. You can review your currently activated installs on your certifytheweb.com profile under License Keys. You cannot have a greater number of active installs than licensed installs.

:::

We currently use Microsoft Azure marketplace for our subscriptions. *This is only a convenient billing mechanism and does not require you to have servers hosted with Azure.*

To get started with cloud managed licensing via Microsoft Azure billing you can use any of the following links to create your subscription: 

- [Microsoft Azure SaaS Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/webprofusionptyltd1588924351007.certifytheweb-standard-cloudlicense?tab=Overview)
- [Microsoft App Source](https://appsource.microsoft.com/en-us/product/web-apps/webprofusionptyltd1588924351007.certifytheweb-standard-cloudlicense)
- [Azure Portal](https://portal.azure.com/#create/webprofusionptyltd1588924351007.certifytheweb-standard-cloudlicense/preview)

Cloud Managed License pricing via Azure is **$4.99 USD per install per month**.

If you would like us to support a different cloud provider marketplace for licensing, please contact `support at certifytheweb.com`.

## Upgrading and Downgrading License Keys
If you are using a license bundle, you can downgrade your license bundle through the License Keys tab of your certifytheweb.com account when your license is about to expire (or has already expired). 
If you currently have a license key and want to renew your license at a lower tier, you can choose the `Downgrade Now` option. 

To upgrade to a new license tier you can either purchase a new license key of the required type and move each install to the new key (About > Deactivate Install, then About > Enter Key..) or alternatively contact `support at certifytheweb.com` to discuss upgrade options for an existing license key.

## Licensing through Resellers etc
Any organization can purchase a license then assign it to another account while retaining control of the license key renewal. You do not need to contact us to ask to become a reseller. To get started, sign into https://dash.certifytheweb.com and purchase the license type you require, then select *Assign License* and enter the email address of the organization. They will then be sent an invite link to accept the assigned license and they will not see the original invoice.

Note to all resellers: We *do not* offer discounted pricing for resellers, you are welcome to apply whatever pricing markup your service normally incurs but this is between you and your customer. We only offer electronic license purchases via our https://dash.certifytheweb.com and we do not accept POs or other manual invoicing. If you absolutely require information (forms etc) not listed on this page then we most likely do not provide it and your customer is welcome to engage with us directly.

**Guidance for customers with reseller assigned licenses:**
- Your license assignment link will be emailed to you. Follow the instructions to sign in (or create an account) on https://dash.certifytheweb.com and follow the "accept the license assignment" link in your email. 
- Once accepted, the new license will appear on your License Keys page.

## Company Information
*Certify The Web* is a suite of products including the *Certify Certificate Manager* application and the *Certify DNS* service provided by **Webprofusion Pty Ltd (https://webprofusion.com)**.

We are a small business based in Western Australia, established in 2017. If you need to add our vendor details to your system please use the following:

- Name: Webprofusion Pty Ltd ATF The Webprofusion Trust 
- Address: Unit 9A, 151 Herdsman Parade, Wembley, WA 6014, Australia
- ABN: 44617880583
- DUNS Number: 744563927

We are a small business with no tax presence outside of Australia. We do not currently provide:
- International ISO accreditation numbers etc.
- US W9 forms and other international tax exemption forms
- External audit reports

The source code for our main product Certify Certificate Manager is available for review at https://github.com/webprofusion/certify

## Terms of Service
Our services, licenses and products are subject to our [Terms and Conditions](terms.md).

## Frequently Asked Licensing Questions

Q: If I deactivate the license (About > Deactivate Install), will my certificate continue to work?

A: Yes, the app will revert to the Community Edition feature set. Existing certificate renewals will continue as normal, it's just that adding new managed certificates on that install will be subject to the limits of the community edition.

---

Q: How do I transfer the license to another machine?

A: On the old machine, use About > Deactivate Install, or deactivate the install via the certifytheweb.com license keys tab. On the new machine enter the license under About > Enter Key.

---
Q: My payment method has changed, how do I change it on our subscription

A: We do not retain payment information and license bundle renewals are manual, not automatic, so there is nothing to change.

---
Q: If I don't need my license anymore but I keep getting an email to renew it, how do I cancel?

A: Sign into certifytheweb.com and on the License Keys tab choose Cancel Now next to your license key.

---
Q: I don't recognize this purchase and I want to dispute the payment

A: Contact us to discuss via email `support at certifytheweb.com` before filing a dispute with your credit card company, as once your payment is disputed we may no longer provide services to you. You should dispute payments if you think someone has used your credit card without your permission, however this is *extremely* rare and much more commonly people just forget they bought the software license key, or someone on your team made the purchase. Disputes cost us a fee plus the original payment, but if you do dispute a payment we will generally just refund it and cancel your licenses. Repeated disputes will result in a complete ban on purchases from us. We reserve the right to refund your purchases and cancel license keys/services at any time.
