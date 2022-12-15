---
id: import-export
title: Import & Export
---

## Migration from one instance to another

:::tip Consider starting with new configuration

If you don't have a lot of managed certificates setup then the easiest method is to recreate them on the new server. If using http validation your domain DNS must be updated to point to the new server first.

:::


The app includes a (beta) import/export tool to help with large scale migration from an old server to a new server. This will attempt to create a single bundle of configuration and apply it to a new instance of Certify The Web. This feature should be used with caution and you should not assume that migrated settings will result in a completely working migration - testing your migration is absolutely essential.

The settings for your managed certificates will include the managed certificate (renewal) settings, encrypted stored credentials and the certificate files themselves. In addition to these settings a migration will perform deployment to IIS and you can optionally run any deployment tasks.


## Export your configuration

To use this feature, start by creating your export file: 
- Under Settings > UI Settings > Experimental Features, enable Import/Export Migration Tool
- You should then see a new Import & Export tab under Settings. If not, close and re-open the app.
- Under Import & Export, choose Import & Export, set a password for your export, click Export and save the file.

## Import to new instance
To perform your import:
- On your new instance (or ideally a test system) follow the same steps above but choose Import > Preview Import.., then proceed with the import.

## Check and correct the migration
- Review your managed certificates settings
- Look at the Preview tab to ensure that the next renewal will update the correct IIS websites (specifically there should be Binding updates shown under the "3. Deployment" section. 
- If the app can no longer match the certificate to the correct website you need to correct that for renewals to work in the future. Typically the deployment mode under the Deployment tab should just be set to Auto, if it's still set to Single Site (the old default) then it will try to match on the previously known IIS Site ID which is possibly different on your new instance.

- You should then review your IIS settings to ensure the correct https bindings have been added/updated with a certificate for each site.
- Perform a test renewal of one of your managed certificates using Request Certificate, this will test that your configuration is generally working for renewals.

