---
title: Use Azure Key Vault as TDE with Azure PaaS Services
date: 2020-02-20 16:12
author: nicold
comments: false
tags: [Azure, Azure-key-vault, CosmosDb, SQL, SQL-Azure, MySQL, Cassandra, MongoDB, Gremlin, Azure-TableStorage, Etcd]
---

For one of my customers I have had the need to collect if and how Azure Key Vault can be used for Transparent Data Encryption. The result is the following table, quite generic, and IMHO useful also elsewhere. The bottom line is Azure key Vault is ready and valuable when you have an ecosystem based on Azure. Outside Azure, integration is possible but requires a bit more work.  

# Azure Key Vault
*Azure Key Vault is a tool for securely storing and accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. A vault is a logical group of secrets.*

Azure Key Vault on <a href="https://docs.microsoft.com/en-us/azure/key-vault/" target="_blank">Microsoft Docs</a>

# Transparent Data Encryption
*Transparent Data Encryption (often abbreviated to TDE) is a technology employed by Microsoft, IBM and Oracle to encrypt database files. TDE offers encryption at file level. TDE solves the problem of protecting data at rest, encrypting databases both on the hard drive and consequently on backup media. It does not protect data in transit nor data in use. Enterprises typically employ TDE to solve compliance issues such as PCI DSS which require the protection of data at rest.*


*Microsoft offers TDE as part of its Microsoft SQL Server 2008, 2008 R2, 2012, 2014 and 2016.TDE is only supported on the Evaluation, Developer, Enterprise and Datacenter editions of Microsoft SQL Server. SQL TDE is supported by hardware security modules from Thales e-Security, Townsend Security and SafeNet, Inc.*


*IBM offers TDE as part of Db2 as of version 10.5 fixpack 5.It is also supported in cloud versions of the product by default, Db2 on Cloud and Db2 Warehouse on Cloud.*


*Oracle requires the Oracle Advanced Security option for Oracle 10g and 11g to enable TDE.[citation needed] Oracle TDE addresses encryption requirements associated with public and private privacy and security mandates such as PCI and California SB 1386. Oracle Advanced Security TDE column encryption was introduced in Oracle Database 10g Release 2. Oracle Advanced Security TDE tablespace encryption and support for hardware security modules (HSMs) were introduced with Oracle Database 11gR1. Keys for TDE can be stored in an HSM to manage keys across servers, protect keys with hardware, and introduce a separation of duties.* 

More on <a href="https://en.wikipedia.org/wiki/Transparent_data_encryption" target="_blank">Wikipedia</a>


| Platform | Integration with Azure Key Vault | 
|----------|----------|
|**SQL Server** | The SQL Server Connector for Microsoft Azure Key Vault enables SQL Server encryption to use the Azure Key Vault service as an Extensible Key Management (EKM) provider to protect SQL Server encryption keys. <br/><br/> - <a href="https://docs.microsoft.com/en-us/sql/relational-databases/security/encryption/extensible-key-management-using-azure-key-vault-sql-server?view=sql-server-ver15" target="_blank">https://docs.microsoft.com/en-us/sql/relational-databases/security/encryption/extensible-key-management-using-azure-key-vault-sql-server?view=sql-server-ver15</a> <br/><br/> -  <a href="https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sql/virtual-machines-windows-ps-sql-keyvault" target="_blank">https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sql/virtual-machines-windows-ps-sql-keyvault</a> |
| **SQL Azure** | For Azure SQL Database and Azure SQL Data Warehouse, the TDE protector is set at the logical server level and is inherited by all encrypted databases associated with that server. For Azure SQL Managed Instance, the TDE protector is set at the instance level and is inherited by all encrypted databases on that instance. The term server refers both to SQL Database logical server and managed instance throughout this document, unless stated differently.<br/><br/> - <a href="https://docs.microsoft.com/en-us/azure/sql-database/transparent-data-encryption-byok-azure-sql" target="_blank">https://docs.microsoft.com/en-us/azure/sql-database/transparent-data-encryption-byok-azure-sql</a>|
| **Cosmos DB**<br/><br/>-&nbsp;CassandraAPI<br/>-&nbsp;MongoDB API<br/>-&nbsp;GremlinAPI<br/> -&nbsp;AzureTableAPI<br/>- EtcdAPI| Azure Cosmos DB is Microsoft's globally distributed, multi-model database service. You can elastically scale throughput and storage, and take advantage of fast, single-digit-millisecond data access using your favorite API including SQL, MongoDB, Cassandra, Tables, or Gremlin.<br/><br/> - <a href="https://docs.microsoft.com/en-us/azure/cosmos-db/introduction" target="_blank">https://docs.microsoft.com/en-us/azure/cosmos-db/introduction</a> <br/><br/> Data stored in your Azure Cosmos account is automatically and seamlessly encrypted. You can optionally choose to add a second layer of encryption with your own keys, managed via Azure Key Vault. <br/><br/> -<a href="https://docs.microsoft.com/en-us/azure/cosmos-db/how-to-setup-cmk" target="_blank">https://docs.microsoft.com/en-us/azure/cosmos-db/how-to-setup-cmk</a> <br/>|
| **MySQL**| For Azure Database for MySQL, the data encryption is set at the server-level. With this form of data encryption, the key is used to in the encryption of the Database Encryption Key (DEK), which is a customer-managed asymmetric key stored in a customer-owned and customer-managed Azure Key Vault (AKV), a cloud-based external key management system. <br/><br/> - <a href="https://docs.microsoft.com/en-us/azure/mysql/concepts-data-encryption-mysql" target="_blank">https://docs.microsoft.com/en-us/azure/mysql/concepts-data-encryption-mysql</a> |
| **postgres SQL**| For Azure Database for PostgreSQL Single server, the data encryption is set at the server-level. With this form of data encryption, the key is used to in the encryption of the Database Encryption Key (DEK), which is a customer-managed asymmetric key stored in a customer-owned and customer-managed Azure Key Vault (AKV), a cloud-based external key management system. <br/><br/>- <a href="https://docs.microsoft.com/en-us/azure/postgresql/concepts-data-encryption-postgresql" target="_blank">https://docs.microsoft.com/en-us/azure/postgresql/concepts-data-encryption-postgresql</a> |