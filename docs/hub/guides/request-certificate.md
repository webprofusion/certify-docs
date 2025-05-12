# Requesting a Certificate

:::info Before We Start - What is a Target Instance?

Unique to *Certify Management Hub*, each managed certificate configuration and settings can either be set up on the *Management Hub* server (the default *Target Instance*) or on an instance of *Certify Certificate Manager* which has joined the hub. All managed certificates and settings can be configured via the one Management Hub user interface. The instance which will store the request configuration and perform the certificate request is called the **Target Instance**

:::


# Configure a certificate authority
A Certificate Authority is an entity which issues certificates (public or private). Before you can request a certificate you may need to configure a Certificate Authority (ACME) account on your target instance (where the certificate order will take place). To do so using the hub, go to *Settings* > *Certificate Authorities*, confirm your Target Instance selection and select *Add*. 

- [Let's Encrypt](https://letsencrypt.org) is the default CA. You can optionally enter an email address for contact about certificate renewal issues, then agree to the CAs terms and conditions and click OK. Note that omitting an email address will also prevent automated failure notifications provided by the certifytheweb.com API.

- For some CAs you can optionally select "Use Staging" to only create a test account which creates test (not publicly trusted) certificates. If you select this option you also need to indicate that you will use Staging in your certificate settings later.

# Requesting your first certificate

Ordering a certificate from a CA requires specifying which identifiers (domains) you want to include and proving you control those identifiers.

To add a new managed certificate:
1. select *Certificates* > *New*
    - the *Target Instance* will default to the management hub server, but you can optionally select a target *Certify Certificate Manager* instance (the instance must have already joined the hub). 
2. Provide a descriptive title for your certificate (for your own reference) and add the set of domains you want to include.
3. On the *Authorization* tab, configure how to prove domain control by adding one or more challenge-response configurations. If your domain points to the same server as the *Target Instance* then that instance can provide HTTP domain validation responses. Otherwise, select dns-01 as the challenge type and configure an appropriate DNS validation method.
4. You can then select "Test" to perform a basic check of your authorization configuration, then select Request Certificate to begin your certificate order with the CA.

:::info 

Note: If you want to create a test certificate using a CA’s Staging environment, select *Certificate > Advanced > Certificate Authority*, choose your CA, and check *Use Staging Mode*.

:::

Once your certificate request is working, you can decide how to use the certificate: either use it on the same server as the Management Hub, or export it for use elsewhere using a deployment task under Tasks.

You can also use the hub API from any other machine to pull the latest version of the certificate.