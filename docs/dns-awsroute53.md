---
id: dns-awsroute53
title: AWS Route53 DNS
---

## Setup your AWS Route53 DNS API credentials
To use the AWS Route53 DNS API, you need to setup your API key and authentication secret: 

- Sign in to your AWS IAM console: https://console.aws.amazon.com/iam/home

- Add a new user (e.g. 'certifydnsadmin')
    - Enable Programmatic access, 
    - Create a user Group if you don't already has a group.
    - Allow AmazonRoute53FullAccess for the group.
- Under your new user details:
    - Select Security Credentials > Create Access Key

Copy down your Access Key and Secret Access Key. You cannot recover the same secret after it has been displayed once.

You also need your domain's ZoneId, so browse to your Route53 hosted zone: https://console.aws.amazon.com/route53/home

In the list of hosted zones in the Route53 Dashboard you will see you ZoneId. Copy this down as well.

## Add New Stored Credential
Now add a new Stored Credential in Certify, choosing AWS Route53 DNS as the provider type, enter:
    - Your Access Key
    - Your Secret Key
    - Select Save.

When you use this credential for a Managed Certificate you will also require your ZoneId for the specific hosted zone you are modifying.
