---
id: tomcat
title: Apache Tomcat
---

Specific configuration of Apache Tomcat for individual requirements is outside of the scope of this documentation however the following is a suggested (working) configuration process for a default install of Tomcat 9.0:

## Enable SSL on your Tomcat connector

Edit `conf/server.xml`, locate the connector with `SSLHostConfig`, uncomment and edit as required. See also https://tomcat.apache.org/tomcat-9.0-doc/ssl-howto.html#Edit_the_Tomcat_Configuration_File

Example:

```
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
               maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
            <Certificate
               certificateKeystoreFile="conf/certs/test.pfx"
               certificateKeystoreType="pkcs12"
               certificateKeystorePassword=""
               sslProtocol="TLS"
               type="RSA" />
        </SSLHostConfig>
    </Connector>

```

## Add a 'Deploy to Tomcat' Deployment Task

In your Managed Certificate, under Tasks, add a new `Deploy to Tomcat` deployment task, providing the destination path for your PFX file.

When the deployment task is next executed the certificate will be exported as a PFX file to this location.

## Add a 'Stop, Start or Restart a Service..' Deployment Task

Then, add a task to Restart the Apache Tomcat service.

As certificate renewals happen as required (at any time), you may wish to set the Task Trigger to be Manual so that the service restart can happen either during a maintenance window or as a scheduled task.
