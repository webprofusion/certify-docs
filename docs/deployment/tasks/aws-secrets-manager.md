---
id: aws-secrets-manager
title: Deploy to AWS Secrets Manager
sidebar_label: AWS Secrets Manager
description: Store the certificate, private key and chain as a JSON secret in AWS Secrets Manager, updated on each renewal.
---

:::info Preview
This task is not in a released version of Certify yet.
:::

:::note
This task requires [Certify Management Hub](../../hub/index.md). It runs on the Hub itself, or on an instance [joined to the Hub](../../hub/guides/ccm.md#hub-join). On a standalone instance, the task editor shows a banner saying so, and the task fails if it runs.
:::

The *Deploy to AWS Secrets Manager* task stores the certificate and its private key as a secret in AWS Secrets Manager. Use it for applications that load their own certificate, for example on Amazon ECS, AWS Lambda or EC2, and read it from Secrets Manager. For AWS services that use ACM certificates, such as load balancers and CloudFront, use [Deploy to AWS Certificate Manager](aws-certificate-manager.md) instead.

The first deployment creates the secret, unless it already exists. Each renewal becomes the secret's current value, so applications reading the secret get the renewed certificate the next time they read it.

## Before you start

In AWS:

- Create an IAM user for Certify with an access key, or use an existing one. The task can also use the access key to assume an IAM role, for example in another AWS account.
- Give the user (or the role) these permissions. You can limit `Resource` to the secrets Certify writes, e.g. `arn:aws:secretsmanager:eu-west-1:123456789012:secret:prod/*`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:DescribeSecret",
        "secretsmanager:CreateSecret",
        "secretsmanager:PutSecretValue",
        "secretsmanager:TagResource",
        "secretsmanager:UpdateSecretVersionStage"
      ],
      "Resource": "*"
    }
  ]
}
```

- If the secret is encrypted with a customer managed KMS key, the user (or role) also needs `kms:GenerateDataKey` and `kms:Decrypt` on that key. The AWS managed key (`aws/secretsmanager`) needs no extra permissions.
- Certify doesn't need `secretsmanager:GetSecretValue`, as it never reads the secret's value back.

## Setting up the task

1. Add the *Deploy to AWS Secrets Manager* task under *Tasks* for your managed certificate.
2. Under *Task Parameters*, set:
   - **Credentials**: an *AWS Access Key* credential. Select *New* to add one, with the *Access Key ID* and *Secret Access Key*. To assume an IAM role, also enable *Assume IAM role* and set the *Role ARN*, plus the *External ID* if the role's trust policy requires one. The role needs the permissions above, and the user needs `sts:AssumeRole` permission for the role.
   - **AWS Region**: the region code, e.g. `eu-west-1`.
   - **Secret Name or ARN**: the name of the secret, e.g. `prod/www.example.com/tls`. If there's no secret with this name, the task creates it. To use an existing secret, you can give its ARN instead, and leave *AWS Region* blank, as the region comes from the ARN.
   - **KMS Key** (optional): the ID, ARN or alias of a KMS key to encrypt the secret with, e.g. `alias/certificates`. It's only used when the task creates the secret. Leave blank to use the AWS managed key.
   - **Include PFX** (optional): also store the certificate as a PFX (PKCS#12) file. See [Secret format](#secret-format).
   - **Secrets Manager Endpoint** (optional): a custom endpoint URL, such as a VPC endpoint without private DNS or a FIPS endpoint (e.g. `https://secretsmanager-fips.us-east-1.amazonaws.com`). Leave blank to use the standard endpoint for the region.
3. Save, then run the task with the ▶️ play button.

## Secret format

The secret value is a JSON object:

| Field | Contents |
| --- | --- |
| `certificate` | The certificate, in PEM format |
| `private_key` | The private key, in unencrypted PKCS#8 PEM format (`BEGIN PRIVATE KEY`) |
| `chain` | The intermediate certificates, in PEM format. The root certificate is not included. |
| `fullchain` | The certificate followed by the intermediate certificates, as most web servers expect |
| `pfx` | Only with *Include PFX*: the PFX file, base64 encoded. It has the managed certificate's PFX password, if one is set. |

Amazon ECS can pass a single field to a container, for example `arn:aws:secretsmanager:eu-west-1:123456789012:secret:prod/www.example.com/tls-AbCdEf:fullchain::`.

## How it works

- If the secret doesn't exist, the task creates it, tagged `certify:managed-certificate-id` with the ID of the managed certificate as the value.
- If it exists, the task adds the certificate as a new version of the secret and makes it the current value (`AWSCURRENT`). The previous value stays available as `AWSPREVIOUS`. The task doesn't change the tags, KMS key or other settings of an existing secret.
- The version ID is worked out from the secret value. If the secret already holds this certificate, the task changes nothing. If it holds this certificate as an older version, because something else changed the secret since, the task makes that version current again.
- When the task is previewed or validated, it connects to Secrets Manager and reports whether deploying would create the secret, add a new version, or change nothing, without changing anything. This catches wrong credentials, permissions or regions before a renewal depends on them.

## Limitations

- Each managed certificate needs its own secret. The task won't write to a secret tagged for a different managed certificate.
- The task can't write to a replica secret. Deploy to the secret in its primary region, and Secrets Manager updates the replicas.
- Don't turn on rotation for the secret. A rotation function would replace the certificate, and the task warns if rotation is on.
- Applications that cache the secret, or only read it at startup, get the renewed certificate the next time they read it, for example when they restart.

## Troubleshooting

- **Access denied, check the Access Key ID and Secret Access Key**: the access key is wrong, inactive or deleted.
- **Access denied, the IAM user or role needs ... permissions**: add the permissions above to the IAM user, or to the role if you use *Assume IAM role*. If the message mentions KMS, give the user (or role) access to the secret's KMS key.
- **There is no secret arn:aws:secretsmanager:...**: check the ARN, and that the access key (or role) is in the same AWS account as the secret. To have the task create the secret, give its name instead of an ARN.
- **Holds the certificate of a different managed certificate**: the secret's `certify:managed-certificate-id` tag names another managed certificate. Use a different secret name.
- **Is scheduled for deletion**: restore the secret in the AWS console, or use a different secret name.
- **Could not connect to Secrets Manager**: check the region, the *Secrets Manager Endpoint* if you set one, and that Certify can reach the Secrets Manager endpoint over HTTPS, including through any proxy.
