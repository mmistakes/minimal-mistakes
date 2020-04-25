---
title: "Interacting with a DynamoDB via boto3"
#tags:
#  - python
#  - boto3
#  - query
#  - database
#  - dynamodb
#  - aws
excerpt: Python for querying a DynamoDB in AWS with boto3
---

[Boto3](http://boto3.readthedocs.io/en/latest/) is the Python SDK to interact with the [Amazon Web Services](https://aws.amazon.com). DynamoDB are databases inside AWS in a noSQL format, and boto3 contains methods/classes to deal with them. This post assumes the AWS CLI (the tool to set access/authorization to the cloud) has been set, it can be easily done via terminal.

I've written this [Gist](https://gist.github.com/martinapugliese/cae86eb68f5aab59e87332725935fd5f) for the methods outlined here.

I find boto3's docs a bit convoluted and more than once I had to go retrieve the part describing exactly how to perform this or that action. So what did I decide to do about this? When I figure how to do something I write some small wrappers around boto3's methods/objects so I can easily run them instead as they save me from the hassle of having to retrieve information from the docs once again.

This post outlines some operations on DynamoDB databases, run through boto3.

Let us assume you have a certain table in DynamoDB. We'll start by importing the relevant stuff and by initialising the resource for the DynamoDB:

```py
from boto3 import resource
from boto3.dynamodb.conditions import Key

# The boto3 dynamoDB resource
dynamodb_resource = resource('dynamodb')
```

You'd call your table as

```py
table = dynamodb_resource.Table(table_name)
```

where `table_name` is just the string specifying the name of your table in DynamoDB. Easy peasy!

Because certain operations can be expensive on DynamoDBs and there isn't really any way to run aggregations (differently from MongoDB which has a full aggregation framework), you might want to start knowing a bit about your table. Specifically, scan operations are as slow as the number of items in your table dictates, as they have to walk the table. It's typically useful to know the size, the number of items, what is the field covering the role of a primary key, and so on. So, I've collected all relevant attributes in a convenient dict as

```py
def get_table_metadata(table_name):
    """
    Get some metadata about chosen table.
    """
    table = dynamodb_resource.Table(table_name)

    return {
        'num_items': table.item_count,
        'primary_key_name': table.key_schema[0],
        'status': table.table_status,
        'bytes_size': table.table_size_bytes,
        'global_secondary_indices': table.global_secondary_indexes
    }
```

Say for instance you have hundreds of thousands of items in table, then a scan might not be a great idea. At least you know beforehand!

Now, a GET, a PUT and a DELETE can be performed as:

```py
def read_table_item(table_name, pk_name, pk_value):
    """
    Return item read by primary key.
    """
    table = dynamodb_resource.Table(table_name)
    response = table.get_item(Key={pk_name: pk_value})

    return response


def add_item(table_name, col_dict):
    """
    Add one item (row) to table. col_dict is a dictionary {col_name: value}.
    """
    table = dynamodb_resource.Table(table_name)
    response = table.put_item(Item=col_dict)

    return response


def delete_item(table_name, pk_name, pk_value):
    """
    Delete an item (row) in table from its primary key.
    """
    table = dynamodb_resource.Table(table_name)
    response = table.delete_item(Key={pk_name: pk_value})

    return
```

The two main operations you can run to retrieve items from a DynamoDB table are query and scan. The AWS docs explain that while a query is useful to search for items via primary key, a scan walks the full table, but filters can be applied. The basic way to achieve this in boto3 is via the query and scan APIs:

```py
def scan_table(table_name, filter_key=None, filter_value=None):
    """
    Perform a scan operation on table.
    Can specify filter_key (col name) and its value to be filtered.
    """
    table = dynamodb_resource.Table(table_name)

    if filter_key and filter_value:
        filtering_exp = Key(filter_key).eq(filter_value)
        response = table.scan(FilterExpression=filtering_exp)
    else:
        response = table.scan()

    return response


def query_table(table_name, filter_key=None, filter_value=None):
    """
    Perform a query operation on the table.
    Can specify filter_key (col name) and its value to be filtered.
    """
    table = dynamodb_resource.Table(table_name)

    if filter_key and filter_value:
        filtering_exp = Key(filter_key).eq(filter_value)
        response = table.query(KeyConditionExpression=filtering_exp)
    else:
        response = table.query()

    return response
```

The actual items of the table will be in the 'Items' key of the response dictionary.

The issue here is that results in a DynamoDB table are paginated hence it is not guaranteed that this scan will be able to grab all the data in table, which is yet another reason to keep track of how many items there are and how many you end up with at the end when scanning.

In order to scan the table page by page, we need to play a bit around the parameter leading us to the next page in a loop, until we have seen the full table. So you can do a loop as in:

```py
def scan_table_allpages(table_name, filter_key=None, filter_value=None):
    """
    Perform a scan operation on table.
    Can specify filter_key (col name) and its value to be filtered.
    This gets all pages of results. Returns list of items.
    """
    table = dynamodb_resource.Table(table_name)

    if filter_key and filter_value:
        filtering_exp = Key(filter_key).eq(filter_value)
        response = table.scan(FilterExpression=filtering_exp)
    else:
        response = table.scan()

    items = response['Items']
    while True:
        print len(response['Items'])
        if response.get('LastEvaluatedKey'):
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            items += response['Items']
        else:
            break

    return items
```

Happy dynamoying!
