---
title: Data Stores
description: Configure the database each Hub-managed instance stores its configuration in, apply schema migrations, migrate data between stores, and switch the active data store safely.
---

# Data Stores

Every instance the Hub manages stores its own configuration - managed certificates, stored credentials, and other configuration items - in a **data store**. By default this is a set of SQLite database files held under the instance's app data path. The Hub can also point an instance at PostgreSQL or SQL Server, migrate its existing data into that database, and switch it over.

Manage this from **Settings > System > Data Stores**.

## Scope

Data store settings are **per instance**, not Hub-wide. The **Target Instance** selector at the top of Settings decides which instance you are configuring:

- the Hub's own integrated instance
- a joined *Certify Certificate Manager* instance
- a joined *Certify Management Agent* instance

Each instance has its own list of data store connections and its own active default. Changing the store for one instance does not affect any other.

## Supported Data Stores

| Provider | Notes |
| --- | --- |
| **SQLite** | The default. No configuration required, no managed schema migrations, stored under the instance app data path. |
| **PostgreSQL** | 9.5+, including Postgres-compatible databases. See the [Postgres data store provider readme](https://github.com/webprofusion/certify-plugins/tree/development/src/DataStores/Postgres). |
| **SQL Server** | 2016+. See the [SQL Server data store provider readme](https://github.com/webprofusion/certify-plugins/tree/development/src/DataStores/SQLServer). |

SQLite remains a good choice for most deployments. Consider an external database when you have a large number of managed certificates, or when your organisation requires configuration to live in a managed database platform.

:::warning
We do not provide support for database server installation, configuration, tuning, or troubleshooting. Only adopt an external database you already have the skills to run and back up. High latency or unreliable connections, such as remotely hosted cloud databases, are not recommended or supported.
:::

## What Stays on Local Storage

Moving to an external database does **not** make the instance stateless. The following remain on the app data path and still need to be persisted and backed up:

- `datastores.json`, the list of data store connections (connection details are encrypted at rest)
- core service settings, including which data store is currently the default
- data protection keys used to encrypt stored credential secrets on Linux and in containers

In containers this means the app data volume still matters. See [Hub operations](operations.md) for backup guidance, and the installation docs for the correct paths on [Windows](../installation/windows.md) and [Linux](../installation/linux.md).

## Before You Start

For an external database:

1. Create an empty database, for example `certify`.
2. Create a login or role for the service to use at runtime. It only needs to read and write data - it does not need to own or create tables.
3. Have the connection details ready. See [connectionstrings.com](https://www.connectionstrings.com) for .NET connection string formats.

Typical connection strings:

*SQL Server:*
```
Server=(local)\SERVERNAME;Database=certify;User Id=certify_app;Password=certify_app_pwd;TrustServerCertificate=true;
```

*Postgres:*
```
Server=127.0.0.1;Port=5432;Database=certify;User Id=certify_app;Password=certify_app_pwd;
```

`TrustServerCertificate=true` is required for the default self-signed certificates used by SQL Server.

## Add a Data Store Connection

1. Select the **Target Instance** you are configuring.
2. Go to **Settings > System > Data Stores** and choose **Add Connection**.
3. Enter a **Title**, choose the **Provider**, and enter the **Connection Configuration**. The connection id is generated for you and cannot be changed.
4. Choose **Test Connection & Schema**.
5. Resolve anything the test reports, then choose **Save Connection**.

A connection can only be saved once a test has shown it to work, so an instance is never pointed at a store it cannot reach.

Once saved, the connection details are held encrypted by the service and are never sent back to the browser. Editing an existing connection shows them masked - use **Replace Connection Details** to enter a new connection string, or save without replacing them to leave the stored details as they are.

### Reading the Test Result

| Result | Meaning |
| --- | --- |
| **Data Store Connection OK** | Connected successfully and the schema is up to date. |
| **Schema Migration Required** | The database is empty or out of date. Reported as a warning if these credentials can apply the changes, or an error if they cannot. |
| **Optional Schema Upgrade Available** | The store works as it is, and a structural upgrade is available. Never an error. |
| **Data Store Connection Failed** | The database could not be reached at all. Check connectivity, the connection string, and permissions. |
| **Data Store Init Failed** | The database was reachable but the store could not be opened. Usually schema or permission related. |

Each result lists the individual migration steps it refers to.

## Schema Migrations

The schema for PostgreSQL and SQL Server is created and upgraded by the app, if the conencting user has schema modification permissions, otherwise you either need to add a connection that has the necessary permissions and apply the schema, or run migration DDL by hand.

Migrations come in two kinds:

- **Required** steps, such as adding a column or an index, or moving rows out of the legacy credential table. These are additive. The service applies them when it connects *if* the runtime credentials have schema modification rights.
- **Optional** steps, which are structural changes to an existing table. These are **never** applied automatically. Test reports them, and they are applied only when you choose to apply them.

Because of this split, upgrading the Hub does not force a database upgrade. An existing store keeps working, and Test reports "Connection OK" plus a note that an optional upgrade is available.

### Applying Migrations From the Hub

If the connection's credentials can modify the schema, the connection dialog offers **Apply Migrations** (or **Apply Optional Upgrade** where only an optional step is pending). It lists the pending changes and applies them, creating the tables from scratch if the database is empty. It is safe to run repeatedly - steps already applied are skipped.

### When the Runtime Credentials Cannot Modify the Schema

Where the runtime role is restricted to reading and writing data, apply migrations one of two ways:

1. **Using a temporary admin connection.** Add a second data store connection pointing at the same database, using credentials which own or can create the tables. Run **Apply Migrations** on that connection, then remove it. The runtime connection continues to use the restricted role. Remember to grant that role data rights on any newly created table.
2. **Using the scripts.** The `schema-upgrade.sql` script in the provider repository performs the same migrations and is idempotent. Hand it to your DBA.

To stop the service applying even the required migrations on connect, leaving every schema change to you, set the environment variable `CERTIFY_DISABLE_AUTO_SCHEMA_MIGRATION=true`. Outstanding migrations are then logged and reported in the UI instead of being applied.

## Migrate Data to a New Store

**Migrate** copies managed certificates, stored credentials, and other configuration items from a source data store to a destination data store, for the selected instance.

1. Add and test the destination connection first, and apply any schema migrations it reports.
2. Choose **Migrate**, select the **Source** (usually the current default) and the **Destination**, then confirm.
3. Review the **Last Operation Result** panel. It reports how many managed certificates, credentials, and configuration items were copied, and warns about any item it could not copy.

Points to be aware of:

- The destination is **not** cleared first. Items are inserted or updated, so an item already present in the destination with the same id is overwritten.
- Migration copies data only. It does not switch the instance over - do that as a separate step.
- Migration does not delete anything from the source, so the original store remains available as a fallback.
- Copying can take some time with a large number of managed certificates.

:::warning
Stored credential secrets are encrypted by the service account and machine that created them. Copying them into another database does not make them readable from a different host or service account. If the instance identity changes as part of the move, expect to re-enter stored credentials afterwards.
:::

## Switch the Active Data Store

Set the destination as the default once its data is in place:

- from the connection dialog, choose **Set as Default Data Store** and save, or
- add the connection with that option selected

The connection is tested before the switch happens, so a store which cannot be reached will not become the default.

:::tip
Restart the service for that instance after switching the default data store, so that every component re-opens against the new store. Until it restarts, some parts of the service may still be reading from the previous store.
:::

Afterwards:

- confirm the banner at the top of the Data Stores tab names the store you expect
- check **Settings > System > Status** for data store health
- keep the previous connection in place until you are satisfied with the new store

The connection currently in use cannot be removed. Switch to a different default first, then remove the old connection.

## Sharing One Database Between Instances

While not our default recommendation, several instances can share a single external database instance. Every row is scoped by the instance id, so an instance only ever reads, writes, and deletes its own rows. Care should be taken if you have ever cloned an instance (e.g. test and production) as two may have the same id and conflicts may result in data loss.

A shared database needs the **composite primary key** optional migration, because the same item id can legitimately exist for more than one instance. Without it, the second instance to store an item with an id already present fails with a duplicate key error. Apply the optional upgrade before joining a second instance to the same database. Applying it rewrites the primary key index and briefly locks the table, so prefer a maintenance window on a large table.

A single-instance database does not need this migration and keeps working without it.

:::warning
This applies to external databases only. Multiple services reading and writing the same SQLite database files are not supported.
:::

## When the Data Store Is Unavailable

If an instance cannot open its data store at startup, the service starts in **degraded mode** rather than failing outright. Certificate management functionality is disabled until the connection is restored, and the failure is reported in **Settings > System > Status** and in the service log.

If this happens:

1. Check **System > Status** and the service log for the reported reason.
2. Confirm the database server is reachable and accepting connections from the instance.
3. Confirm the credentials are still valid and hold the necessary data rights.
4. Check whether a required schema migration is outstanding.
5. Restart the service once the underlying problem is fixed.

## Read Next

- [Hub settings overview](hub-settings-overview.md)
- [Hub operations](operations.md)
- [Import, export, and migration](import-export-and-migration.md)
- [Data stores in Certify Certificate Manager](../../features/data-stores.md)
