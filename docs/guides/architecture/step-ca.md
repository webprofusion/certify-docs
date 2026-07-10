---
id: step-ca
title: Using step-ca with Certify Products
---

# Using step-ca with Certify Products

step-ca is a certificate authority product from smallstep which can be used to issue certificates internally within your organization. It is a good choice if you want to run your own certificate authority and have full control over the certificates you issue.

step-ca can be configured to support the ACME protocol for certificate orders: https://smallstep.com/docs/step-ca/acme-basics/

You can use step-ca with both *Certify Certificate Manager* and *Certify Management Hub* managed instances by configuring the same ACME endpoint and account credentials.

# Example step-ca setup using docker

Start step-ca in docker:

`docker run -it -v step:/home/step   -p 9000:9000  -e "DOCKER_STEPCA_INIT_NAME=Smallstep"   -e "DOCKER_STEPCA_INIT_DNS_NAMES=localhost,$(hostname -f)" -e "DOCKER_STEPCA_INIT_REMOTE_MANAGEMENT=true" smallstep/step-ca`

Note the admin username and password shown in the docker terminal.

Start an ACME provisioner:
`step ca provisioner add acme --type ACME`