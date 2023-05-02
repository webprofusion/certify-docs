---
id: data-stores
title: Data Stores
---

By default Certify The Web uses a set of SQLite file based databases to store configuration for managed certificates and stored credentials. SQLite is a good choice for most users as it is easy to setup and does not require any additional software to be installed. However, if you have a large number of managed certificates you may wish to use an alternative database such as Microsoft SQL Server or PostgreSQL in v6.0 onwards of the app.

## Supported databases
For a database to be supported we need to supply a set of compatible data store providers and the choice of database server must support complex JSON data storage and querying. 

Currently supported database types include:
- MS SQL Server (2016+)
- PostgreSQL (9.5+)
- SQLite

If you decide to use a database other than SQLite you will need to install the database server software and create a database for Certify The Web to use. **We do not provide support for database server installation or configuration**. You must ensure your database installation is backed up and maintained.

In all cases you need to setup the initial database schema, users and permissions. You will also need to maintain the necessary database schema updates as new versions of Certify The Web are released.

In all cases is you choose to use alternative data store we cannot provide support for any aspects of the database server installation or configuration or troubleshooting. You should only adopt database servers you are comfortable with and have the necessary skills to maintain.

High latency or potentially unreliable connections such as remotely hosted cloud databases are not recommended or supported.

### Microsoft SQL Server
Read more about how to use SQL Server as a data store: [SQL Server Data Store Getting Started](https://github.com/webprofusion/certify-plugins/tree/development/src/DataStores/SQLServer)

A typical connection string to an SQL Server database might look like the following. Note that `TrustServerCertificate=true` is required for the default self-signed certificates used by SQL Server:
`Server=(local)\SERVERNAME;Database=certify;User Id=certify_app;Password=certify_app_pwd;TrustServerCertificate=true;`

Note that SQL Express is not recommended if the database instance is used by other processes such as another web application as artificial query governor constraints can cause connection or query errors. 

### PostgreSQL
Read more about how to use SQL Server as a data store: [PostgreSQL  Data Store Getting Started](https://github.com/webprofusion/certify-plugins/tree/development/src/DataStores/Postgres)

A typical connection string to a PostgreSQL database might look like this:
`Server=127.0.0.1;Port=5432;Database=certify;User Id=certify_app;Password=certify_app_pwd;`

### Migrating data to your new data store
- First setup your database for your data store along with the necessary users and permissions.
- Enable the Data Store UI under Settings > UI Settings > Experimental Features. Close and re-open the app.
- Under Settings > General Settings > Data Store, select Manage Data Stores
- Select *Add Data Store*, enter a name for your new database connection, select the server type and enter the connection string.
- Click *Test Connection* to ensure the connection is working. You can find out how to specify .Net connection strings for your database server type by searching https://www.connectionstrings.com
- If you are copying data from your existing database to your new data store, select the Migrate Data option and select the source data store (SQLite) and target (your new data store). Click *Copy Data to Target* to copy data from your existing data store to your new data store. This may take some time depending on the number of managed certificates you have.
- Once completed, you can switch over to your new data store. To do so, click the database icon next to your new data store name in the list, the UI will then prompt you to confirm the switch.

Note: stored credentials are encrypted to the machine account that created them. Copying them to a database does not make them readable by other machines.