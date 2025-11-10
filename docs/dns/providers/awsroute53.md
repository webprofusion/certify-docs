---
id: awsroute53
title: AWS Route53 DNS
---

## Setup your AWS Route53 DNS API credentials

To use the AWS Route53 DNS API, you need to setup your API key and authentication secret:

- Sign in to your AWS IAM console: https://console.aws.amazon.com/iam/home

- Add a new user (e.g. 'certifydnsadmin')
  - Enable Programmatic access,
  - Create a user Group if you don't already has a group.
  - You can either allow all permissions:
    - Allow AmazonRoute53FullAccess for the group.
  - Or restrict permission to the following actions:
    - route53:ListHostedZones, route53:ListHostedZonesByName, route53:GetHostedZone, route53:ListResourceRecordSets, route53:ChangeResourceRecordSets, route53:GetChange

Here is an example JSON policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListZonesAndGetZone",
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones",
        "route53:ListHostedZonesByName",
        "route53:GetHostedZone"
      ],
      "Resource": "*"
    },
    {
      "Sid": "AllowListRecordSetsInAllZones",
      "Effect": "Allow",
      "Action": "route53:ListResourceRecordSets",
      "Resource": "arn:aws:route53:::hostedzone/*"
    },
    {
      "Sid": "AllowAcmeTxtChangesOnly",
      "Effect": "Allow",
      "Action": "route53:ChangeResourceRecordSets",
      "Resource": "arn:aws:route53:::hostedzone/*",
      "Condition": {
        "ForAllValues:StringLike": {
          "route53:ChangeResourceRecordSetsNormalizedRecordNames": [
            "_acme-challenge*.*"
          ]
        },
        "ForAllValues:StringEquals": {
          "route53:ChangeResourceRecordSetsRecordTypes": [
            "TXT"
          ],
          "route53:ChangeResourceRecordSetsActions": [
            "CREATE",
            "UPSERT",
            "DELETE"
          ]
        }
      }
    },
    {
      "Sid": "AllowGetChangeStatus",
      "Effect": "Allow",
      "Action": "route53:GetChange",
      "Resource": "arn:aws:route53:::change/*"
    }
  ]
}
```

- Under your new user details:
  - Select Security Credentials > Create Access Key

Copy down your Access Key and Secret Access Key. You cannot recover the same secret after it has been displayed once.

## Add New Stored Credential

Now add a new Stored Credential in Certify, choosing AWS Route53 DNS as the provider type, enter: - Your Access Key - Your Secret Key - Select Save.

When you use this credential for a Managed Certificate you will also require your ZoneId for the specific hosted zone you are modifying.
