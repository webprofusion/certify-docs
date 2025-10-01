# Using Centralized Certificate Store (CCS) on Windows

IIS on Windows has a feature called *Centralized Certificate Store* (CCS) which lets IIS load the latest certificates it needs from a local path or network share. This is useful when you need to share certificates across multiple IIS web servers, or if you want to centralize renewals on one server and copy the certs to other servers.

An advantage with this approach is that the IIS binding configurations themselves are not updated, which avoids application recycling/reloads which can happen when the IIS `applicationhost.config` is touched by the Web Administration library which updates IIS certificate bindings.
 
 ## Basic Guide to Configuring IIS CCS
 
 ### Prerequisites
- A supported version of Windows Server
- IIS 8.0 or later with CCS feature installed
- Network share accessible by all IIS servers as UNC path e.g. `\\server01\certificates\`
- Proper permissions on certificate store location
 
### Step-by-Step Configuration

1. **Install CCS Feature**
   - Use the Windows Server feature administration UI to enable the CCS feature for IIS.
 
2. **Create Network Share**
   - Create a shared folder on a server
   - Grant read permissions to IIS application pool identities
   - Grant read/write to the machine or account which will be renewing/writing the certificate. When using the machine identity you may prefer to create a security group and add the machine to that group.

3. **Configure CCS via IIS Manager**
   - Open IIS Manager
   - Select server node
   - Double-click "Centralized Certificates"
   - Enable feature and specify UNC path
   - Provide credentials for accessing the share

   Alternatively configure via PowerShell:
     ```powershell
     Set-IISCentralCertProvider -CertStoreLocation "\\server\certificates" 
                                -UserName "domain\user" 
                                -Password "password" 
                                -Enabled $true
     ```
  
4. **Certificate Conventions**
   - Certificates must be named using the FQDN (e.g., `www.example.com.pfx`). The Certify *Deploy to CCS* task will take care of naming the files correctly.
   - Private key password should be consistent across certificates. To set a certificate password in Certify use *Certificate > Advanced > Signing & Security > Password*. The password takes effect when you next renew the certificate and the certificate PFX file is rebuilt.

5. **Configure the Managed Certificate to export to the CCS store location**
  
   - On your existing managed certificate:
     - Set a PFX password under Certificate > Advanced > Signing & Security > Password.
     - Set *Deployment Mode* on the *Deployment* tab to *No Deployment* or *Store Only*. This is to avoid attempting to update the IIS bindings outside of CCS.
     - Under *Tasks > Deployment Tasks*, add a *Deploy to CCS task*, configure the output share path. The task will decide the output filename naming scheme depending on the domains etc.
     - Run your renewal to generate your new PFX and export it to your share path. If all credentials were correct you will find the PFX file has been exported to the share path ready for use.

6. **Binding Configuration**
   - When creating HTTPS bindings in IIS, select "Use Centralized Certificate Store" and specify the Hostname. As normal you should avoid specifying IP address bindings and instead use "All Unassigned" and enable SNI.
   - If you have previously been using directly updated HTTPS bindings edit or recreate the HTTPS binding in IIS. In Certify, set Deployment Mode to *No Deployment* or *Store Only*, otherwise it will try to update the IIS binding.
 
### Security Considerations
- Use a dedicated service account with minimal required permissions to access the share.
- Implement proper network security for certificate store access

### Known Issues
- If the IIS UI cannot read the private key of a certificate the UI will show an exclamation mark, however this is normal as IIS itself should still be able to access the key, unless the PFX password is mismatched.

### Troubleshooting
- Verify network connectivity to certificate store
- Check event logs for CCS-related errors
- Validate service account permissions
- Confirm certificate naming matches hostname in bindings
