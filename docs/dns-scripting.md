---
id: dns-scripting
title: DNS Scripting
---

To provide your own script to update DNS you need to create (or source) a Windows (CMD) batch file which expects the following sequence of arguments and update a corresponding TXT record in your DNS zone:
- Target Domain (e.g. `example.com`)
- Record Name (e.g. `_acme-challenge.example.com`)
- Record Value (e.g. `ABCBD123456789`)
- Zone Id (e.g. `OptionalZoneId`, this is often useful to match the specific zone to update)

e.g. given a script at *C:\customscripts\UpdateDNS.bat*, this will be executed as:
 ```
C:\customscripts\UpdateDNS.bat example.com _acme-challenge.example.com ABCBD123456789 OptionalZoneId
```
Important Notes: 

- Your script will run as the background service user (local system), not as your account.
- You should assume the working directory of the process will not be the same as the script. 
- When an 'apex domain' like `example.com` is included in the certificate request for a wildcard (e.g. `*.example.com`) both TXT records will have the same name but different values, so updates need to add to the TXT record values. For this reason it's also a good idea to provide a (well tested!) delete script to clean up the TXT record once the request has completed, otherwise your TXT record values will grow with every validation attempt.


## Calling a Python or node script
To use a Python script (or similarly Node etc) start with a .bat file which can then forward all the arguments as required to your script using `%*` (or you could pass specific arguments if you needed). Note also the fully qualified path to the python exe (or node) as your script will run as local system (using the apps background service) and the path environment variable settings may be different:

```bat
REM This script would be called with the parameters <target domain> <record name> <record value> <zone id (optionally)>

REM this example then calls a custom python script forwarding all the arguments

c:\python27\python.exe create_dns_txt_example.py %*
```

In the following Pythong example the args are available in the `sys.argv` list. This example passes that list to a function called `main` and logs some example stuff (`create_dns_txt_example.py` logging to `dns_create_test.log`).

Your real script would use your DNS providers API or a library such as Apache libcloud.

```python
# Example

import sys
import os
import getopt
import logging

# TODO: added module for DNS updates (libcloud etc)


def main(argv):

    # init logging etc
    logging.basicConfig(filename='dns_create_test.log',
                        filemode='a', level=logging.INFO)

    logging.info("Example Python DNS helper.")

   # TODO: setup your DNS provider (apache libcloud etc)

   # TODO: add/append the txt record

    logging.info("args: " + " ".join(sys.argv))

    logging.info(
        "If this script did anything it would create a TXT record called " + sys.argv[2]
        + " with the value " + sys.argv[3]
        + " you could optionally use the domain ("+sys.argv[1]+") "
        + " or zoneId ("+sys.argv[4]+") in your python script")


#########################################
if __name__ == "__main__":
    main(sys.argv)

```
When the script runs that app will call the .bat file like:
```
ExampleDNSCreatePython.bat mydomain.com _acme-challenge.mydomain.com ABCD1234 myoptionalZoneId
```
Which in turn (based on the above example .bat) will call the python script as :
```
python create_dns_txt_basic.py.bat mydomain.com _acme-challenge.mydomain.com ABCD1234 myoptionalZoneId
```