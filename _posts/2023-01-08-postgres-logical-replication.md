---
title: "Multi-cluster database migration using logical replication"
header: 
  og_image: /images/pg-replication/header.png
tags: [databases, postgres, kubernetes]
excerpt: "Migrating a Postgres database from AWS RDS to k8s with near-zero downtime."
---

Have you ever wanted to migrate a database instance without shuting down the application while the migration is ongoing? This is usually a non-negotiable requirement for mission critical systems that can not afford a long downtime.

I recently migrated one of my team's service database from AWS RDS to an internally maintained _Postgres-as-a-Service_(PaaS) running on Kubernetes with near-zero downtime . I would like to share how I approcached this, looking at the criteria considered before selecting a suitable migration option, things learned along the way and some impact metrics.


#### The Migration Options
When discussing the options to migrate the database, achieving a limited downtime as much as possible was the most important criteria, as the system in question is responsible for updating a critical business values within a short time interval.

Not meeting this criteria could result in inconsistent request fulfillment in our systems which could in turn lead to unfilled orders, poor customer satisfaction, and revenue loss.

The simpler migration option was the “dump and restore” approach which required recreating a complete replica of the schemas, roles and data in the RDS instance. This would work fine, but we couldn’t accommodate the risk of having stale data over the time the restore process was going on which could span for hours based on the size of the database.

The Postgres "dump and restore" is a process of generating a text file with SQL DDL(Data Definition Language) and DML(Data Manipulation Language) commands at a given time using the Postgres utility program - **pg_dump**. These commands will then be run against the new database to recreate the records.

The issue with this approach is that a lot of processes would have been computed within the duration of dumping and restoring the old database, as the system is designed to process article and stock data throughout the entire day. 

The need for a better approach led to using Postgres logical replication. 👏🏽


#### What is Logical Replication?
Logical replication is the method of reproducing data objects and changes from one datasource to another using the Publish and Subscribe model. The source database (known as the publisher) publishes data changes to the destination database (known as the subscriber). The data changes are read from the publisher’s [Write Ahead Log (WAL)](https://www.postgresql.org/docs/current/wal-intro.html), transformed and filtered according to the publication specification. The data is then continuously transferred and applied to the subscriber in a correct transactional order.


#### Migration Steps (Source=RDS, Destination=k8s)

<u>DB Version</u>: Postgres v13  
<u>DB Size</u>: >700GB

<u>Step 0</u> - Initial state of the source and target databases. The k8s instance has no data at this point except the same schema as RDS.

![Step 0](/images/pg-replication/p0.svg)

T0: Time before initiating logical replication  
S0: RDS database volume usage


<u>Step 1</u> - Initial snapshot sent from RDS to k8s. This brings the target database volume to almost the same as the source.

![Step 1](/images/pg-replication/p1.svg)

T1: Time after initiating logical replication  
S1: Database volume usage on both ends


<u>Step 2</u> - Synchronized communication between RDS and k8s

![Step 2](/images/pg-replication/p2.svg)

T2: Time after initiating logical replication  
S2: Database volume usage on both ends


<u>Step 3</u> - Application server communication switched over to k8s

![Step 3](/images/pg-replication/p3.svg)

T3: Time after the two databases are in-sync and logical replication removed  
S3: Database volume usage after replication removed


#####  Technical Steps
1. Extract a schema dump from the RDS instance using `pg_dump --schema-only` command. This ensures that the two databases have the same table structures as schema differences would lead to replication conflicts.

2. Remove all indexes created in the destination database as performing replication with indexes takes a longer time. _(Think about multiple condition statements on Gigabytes of data)_. Remember to store the index DDL statements as they would be recreated later.

3. Enable logical replication in RDS by changing the `wal_level to logical`.  
    a. This is done by either creating a new parameter group or editing the existing parameter group of the running instance.  
    b. Change `rds.logical_replication` from `0` to `1`.  
    c. Change `shared_preload_libraries` from `pg_stat_statement` to `pglogical`.  
    d. Reboot the RDS instance (This took less than 1 minute).

4. Enable logical replication in k8s by updating the postgresql.conf file.
```shell
archive_mode=off
max_wal_senders=0
max_wal_size=50GB
wal_level=minimal
```
5. Create publication in RDS.  
```sql
CREATE PUBLICATION <rds_publication_name> FOR TABLE <table1>, <table2>;
-- OR
-- CREATE PUBLICATION <rds_publication_name> FOR ALL TABLES;
```

6. Create subscription for k8s
```sql
CREATE SUBSCRIPTION <k8s_subscription_name>
CONNECTION 'host=<rds_vpce_link> port=<rds_port_number> password=<rds_password> user=<rds_username> dbname=<rds_instance_name>'
PUBLICATION <rds_publication_name>;
```

7. Logical replication in progress (⏰ Waiting time ⏰).
In this phase, an initial snapshot of RDS tables specified in the publication is copied to the k8s. After the copy process is done, the subscribed tables are brought to a **_synchronized_** state in which data changes are streamed to k8s using logical replication. This update is a synchronous transaction i.e the WAL records must be committed before a success acknowledgement is sent.

8. Recreate the indexes in k8s **after** the two databases are synchronized. This is required **before** doing the switchover in order to maintain the index consistency.

9. Get the last values of sequences in RDS, and update the sequences in k8s.  
One of the [restrictions of Postgres’ logical replication](https://www.postgresql.org/docs/current/logical-replication-restrictions.html) is that the sequence data is not replicated. This means that the last values of sequences on RDS and k8s will be different, which will lead to conflicts when writes are enabled in k8s. The way to overcome this is to ensure that sequences in k8s either match or exceed their counterparts in RDS.  
<br>
The `last_value` of the sequences in k8s is increased by 5000 and higher, especially for tables with frequent writes before doing a switchover.  
<br>
The only downside here is that we would have a gap in rows for tables with integer sequences.  
  a. Get a list of sequences using `\ds`.  
  <br>
  b. Get the last values of each sequence in RDS.
  ```sql
  SELECT last_value from <rds_sequence_name>;
  ```
  c. Update the sequence in k8s.
  ```sql
  ALTER SEQUENCE <k8s_sequence_name> RESTART <rds_last_value+5000>;
  ```

10. Do a switchover of database connection in the application pointing to the new k8s instance - moving reads and writes to k8s.

11. Undo all configuration changes made to RDS and k8s after the success criteria are met.  
<u>Success Criteria</u>  
  a. Check that the tables have the same row counts in RDS and k8s (k8s rows >= RDS rows).
  b. Check that read and write updates are done correctly after traffic switch.  
  c. Ensure that new writes on k8s have no sequence conflicts.  
  d. Ensure zero application and database alerts🚨 after migration.  

12. Drop the publication in RDS and subscription in k8s.  
```sql
-- Delete publication (RDS)
DROP PUBLICATION <rds_publication_name>;
-- Delete subscription(k8s)
DROP SUBSCRIPTION <k8s_subscription_name>;
```

#### Monitoring
It is important to have adequate monitoring in place before and during the migration to ensure data consistencies and the availability of the systems.

1. Setting up alerts for memory, CPU, IOPS, and disk size usage.
2. Having checks for database connection before and after the switchover.
3. Regular data checks between the two instances during the replication and after the switchover.


#### Observations and Things to Look out for
1. Setting up VPC endpoints for a Multi-AZ enabled instance can be tricky when performing a reboot with failover.
2. The WAL size increased on both RDS and Kubernetes during the process.
3. The RDS volume usage increased during the replication and dropped afterwards. Hence, having a sufficient buffer in RDS volume size would be advisable to prevent disk space related errors.
4. Auto-vacuuming of tables in Kubernetes led to an increase in IOPs usage. Increasing the IOPs capacity during the migration, and scaling down afterwards would be suggested.
5. Having the same table schemas for the source and target is compulsory, as different schemas would lead to replication conflicts.


## Conclusion
Migrating the database from RDS to k8s saw the monthly database operations cost reduce by 79%.

Using the logical replication approach helped us achieve the data migration with little downtime ensuring uninterrupted business operations and zero issues raised by stakeholders. I learnt more about the Postgres database internals like WALs, indexes, publication and subscription.

You can check out the [Postgres Official Documentation](https://www.postgresql.org/docs/current/logical-replication.html) if you are interested in more details.
