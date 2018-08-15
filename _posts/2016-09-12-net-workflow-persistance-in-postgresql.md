---
title: ".NET Workflow persistance in PostgreSQL"
description: ""
category: 
tags: [.NET Workflow]
---


Let's say you have a long running .NET workflow and for whatever reason you can't use SQL Server for persistence.

As an option you can persist your workflow and instance data to [PostgreSQL](https://www.postgresql.org/) or even XML. PostgreSQL is great because it's fully ACID compliant and is free.

### How do I persist a .NET workflow to PostgreSQL?

1. Implement the `System.Runtime.DurableInstancing.InstanceStore` abstract class.
2. Initialize a Workflow application or Workflow Host with the PostgresInstanceStore implementation.
3. Invoke persistance using any of the implicit [.NET workflow persistance points](https://msdn.microsoft.com/en-us/library/dd489420(v=vs.110).aspx).

A PostgreSQL instance store port of the [XMLInstanceStore](https://msdn.microsoft.com/en-us/library/ee829481(v=vs.110).aspx) is available [here on github](https://github.com/mziyabo/Postgresql.WorkflowPersistanceProviders).

Microsoft having open sourced their code, an implementation of the `SqlWorkflowInstanceStore` can be viewed on the Microsoft [reference source site](http://referencesource.microsoft.com/#System.Activities.DurableInstancing).

The XMLInstanceStore example is simple and has fewer tables or relational workflow data to persist compared to the SqlWorkflowInstanceStore implementation which makes the port we provide here slightly less detailed.

Going forward however the github repo provided here will copy the patterns employed in the SqlWorklfowInstanceStore. For example, the SqlWorkflowInstanceStore uses an Asynchronous Programming Model/APM when invoking [Instance Persistance Commands](https://msdn.microsoft.com/en-us/library/system.runtime.durableinstancing.instancepersistencecommand(v=vs.110).aspx) like `SaveWorkflowCommand`. The XMLInstanceStore example executes commands synchronously only.


Given that you simply want a sample on getting persistance to work you can definitely check this out and maybe even contribute.
