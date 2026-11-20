---
id: aws-certificate-manager
title: Deploy to AWS Certificate Manager
sidebar_label: AWS Certificate Manager
description: Import the certificate to AWS Certificate Manager (ACM), keeping the same ARN on each renewal.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to AWS Certificate Manager* task imports the certificate to AWS Certificate Manager (ACM), so you can use it with AWS services such as Elastic Load Balancing, Amazon CloudFront and Amazon API Gateway.

The first deployment imports the certificate as a new ACM certificate. Renewals re-import the certificate under the same ARN, so the AWS resources that use it pick up each renewal. You select the certificate on those resources once.

## Before you start

In AWS:

- Create an IAM user for Certify with an access key, or use an existing one. The task can also use the access key to assume an IAM role, for example in another AWS account.
- Give the user (or the role) these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "acm:ListCertificates",
        "acm:ListTagsForCertificate",
        "acm:DescribeCertificate",
        "acm:ImportCertificate",
        "acm:AddTagsToCertificate"
      ],
      "Resource": "*"
    }
  ]
}
```

- Decide which region to import the certificate to. ACM certificates can only be used in their own region. CloudFront only uses certificates in US East (N. Virginia), `us-east-1`.

## Setting up the task

1. Add the *Deploy to AWS Certificate Manager* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: an *AWS Access Key* credential. Select *New* to add one, with the *Access Key ID* and *Secret Access Key*. To assume an IAM role, also enable *Assume IAM role* and set the *Role ARN*, plus the *External ID* if the role's trust policy requires one. The role needs the permissions above, and the user needs `sts:AssumeRole` permission for the role.
   - **AWS Region**: the region code, e.g. `eu-west-1`.
   - **Certificate ARN** (optional): to replace a certificate you already imported to ACM, its ARN. The region comes from the ARN, so you can leave *AWS Region* blank. Leave this blank to import a new certificate.
   - **ACM Endpoint** (optional): a custom ACM endpoint URL, such as a VPC endpoint without private DNS or a FIPS endpoint (e.g. `https://acm-fips.us-east-1.amazonaws.com`). Leave blank to use the standard endpoint for the region.
3. Save, then run the task with the ▶️ play button.
4. On the first deployment, the task log shows the ARN of the new ACM certificate. Select the certificate where it should be used, for example on a load balancer HTTPS listener or a CloudFront distribution. Later renewals re-import it automatically.

## How it works

- The certificate, its private key and intermediate certificates are imported in PEM format.
- A new certificate is tagged `certify:managed-certificate-id`, with the ID of the managed certificate as the value. Renewals look for the imported certificate with this tag, among those for the same domain names, and re-import it.
- If you set the *Certificate ARN*, the task re-imports that certificate instead.
- Re-importing keeps the ARN, so the resources using the certificate don't need to change. ACM doesn't keep the previous certificate.
- If ACM already has this certificate, the task changes nothing.
- When the task is previewed or validated, it connects to ACM and reports which certificate deploying would re-import, or that it would import a new one, without changing anything. This catches wrong credentials, permissions or regions before a renewal depends on them.

## Limitations

- ACM can't change the key type or size of a certificate when it's re-imported. If you change the key type of the managed certificate (for example from RSA 2048 to EC P-256), the task fails before importing anything. Either change the key type back, or import the certificate as a new ACM certificate and move your resources to it. To import a new one, set a new *Certificate ARN*, or remove the `certify:managed-certificate-id` tag from the existing certificate.
- ACM supports RSA keys from 1024 to 4096 bits and EC P-256, P-384 and P-521 keys. Some AWS services support fewer key types. CloudFront doesn't support EC P-384 or P-521.
- ACM doesn't let a re-imported certificate drop a key usage or extended key usage that the previous one had. The exceptions are the TLS client authentication extended key usage, and key encipherment on EC certificates. If the new certificate drops another one, ACM rejects the import and the task reports ACM's error.

## Troubleshooting

- **Access denied, check the Access Key ID and Secret Access Key**: the access key is wrong, inactive or deleted.
- **Access denied, the IAM user or role needs ... permissions**: add the permissions above to the IAM user, or to the role if you use *Assume IAM role*.
- **There is no certificate arn:aws:acm:...**: check the *Certificate ARN*, and that the access key (or role) is in the same AWS account as the certificate.
- **Was issued by AWS, not imported**: certificates that ACM issued can't be replaced by importing a certificate. Use the ARN of an imported certificate, or leave *Certificate ARN* blank to import a new one.
- **Could not connect to ACM**: check the region, the *ACM Endpoint* if you set one, and that Certify can reach the ACM endpoint over HTTPS, including through any proxy.
