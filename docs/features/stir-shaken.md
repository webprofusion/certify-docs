---
id: stir-shaken
title: STIR/SHAKEN Certificates
---

STIR/SHAKEN is a telephony standard for caller ID authentication. It is used to help prevent caller ID spoofing. *Certify The Web* v6.0 onwards supports requesting STIR/SHAKEN certificates from any CA which supports the Authority Token extensions for ACME (and TNAuthList identifiers), such as [Martini Security](https://www.martinisecurity.com/)  which are a built in CA, or you can manually add a new CA. 

## Setup your ACME account and SPC token with the CA

In Certify The Web:
- For first use, register an ACME account (on a new install selecting New Certificate will also prompt you to do the same):
	- Under Settings > Certificate Authorities, add an account for the CA (e.g. Martini Security (STIR/SHAKEN)).
        - Select *Add Account*
		- Select the Certificate Authority from the dropdown list.
		- Enter your account email address to register with the CA for important notifications.
		- Agree to the CA terms and conditions.
		- Under the Advanced tab:
            - Select *Use Staging (Test) Mode* if this account is against a staging/test acme services. 
            - Enter your EAB Key ID and Key. 
            - It's also possible to import account details if you have previously registered against the CA with a different client app.
		- Select "Register Contact" to complete the ACME account registration
	- **Click the account details to copy the details to the clipboard and paste into a text editor for reference.**
- **Acquire your SPC code token using the ACME account thumbprint** (copied from the step above).

## How to request a STIR/SHAKEN certificate:
- Select *New Certificate*
	- On the Certificate > Identifiers tab, select Add Authority Tokens.
	- Browse to spc json file or supply token and crl details. Click *Add* to add the token to the Authority Token List.
	- Under Certificate > Advanced, Certificate Authority, select the CA account (e.g. Martini Security) and check "Use Staging Mode" if using the CAs testing URL.
	- Click Request Certificate to order the new certificate.


Once you have your new certificate you can deploy it using a deployment task or custom script, or distribute it as required. See the [Tasks](../deployment/tasks_intro.md) feature for more information. Certificates will automatically renew according to your preferences configured under Settings.