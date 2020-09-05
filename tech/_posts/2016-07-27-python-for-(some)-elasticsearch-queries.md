---
title: "Python for (some) Elasticsearch queries"
tags:
  - python
  - database
  - elasticsearch
  - coding
categories: tech
excerpt: Using Python for querying Elasticsearch
---

This post will be a quick round of the most common ES queries to be run via the low-level Python client [Elasticsearch](https://elasticsearch-py.readthedocs.io/en/master/).

Assuming you have an Elasticsearch cluster somewhere, either locally or remotely, you'd use the client to connect to it as (here we are grabbing the remote URL via environment variable and passing it to the constructor, if we don't pass anything it will connect to a local instance):

```py
from elasticsearch import Elasticsearch
from os import environ

ES_cluster_URL = environ['ES_CLUSTER_URL']

es_client = Elasticsearch()                  # local
es_client = Elasticsearch([ES_cluster_URL])  # remote
```

and then you'd build the prototypical query body as

```py
body = {
    "from": 10,                       # get docs from the number 10
    "size": 100,                      # get 100 docs (default = 10)
    "fields": ["wanted_field"],       # get only wanted fields
    "query": {                        # the query
        "term": {
        }
    },
    "sort": {                         # to sort
        "date_field": {
            "order": "desc"
        }
    }
}
```

while running the query as

```py
r = es_client.search(index='myindex',
                     doc_type='mytype',
                     body=body)
```

By exploring the structure of r you'd find what you need (the structure of what you get back will change based on the type of query you run).

Let's see how to do some specific/commonplace queries by tweaking the body object.

# A [term](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/query-dsl-term-query.html) query

You run a term query when you want to retrieve all documents matching a field conditions.

```
body = {
    "query": {
        "term": {
            "your_field": "needed_value"
         }
     },
}
```

# A [range](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/query-dsl-range-query.html) query

```py
body = {
    "query": {
        "range": {
            "date_field": {
                "gte": start_date,
                "lt": final_date
            }
        }
    }
}
```

Here, `start_date` and `final_date` are datetime objects, `gt` and `lt` mean "greater than" and "less than" respectively and the "e" will signify that the interval is closed.

# A [bool](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/query-dsl-bool-query.html) query

To perform an AND, you need to run a so-called bool query, which can be used for all sorts of logical queries, but here I give the prototype of an AND.

```py
body = {
    "query": {
        "bool": {
            "must": [
                {
                    "term": {
                        "field1": "value1"
                    }
                },
                {
                    "term": {
                        "field2": "value2"
                    }
                }
            ]
        }
    }
}
```

Here we're asking for all documents where `field1` matches "value1" AND `field2` matches "value2". In a similar way, we could use a `must_not` keyword to mean that we want documents who do not match a given value. There are also other types of keywords one can use depending on the use case.

# [Aggregating data](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/search-aggregations.html)

Many are the situations where you need to aggregate the documents on a field. A prototype to obtain this would be (we are aggregating on field called `my_field`):

```py
body = {
    "size": 0,
    "aggs": {
        "my_field_agg": {
            "terms": {
                "size": 100,
                "field": "my_field"
            }
        }
    }
}
```

The parameter `size` in the aggregation has to be tweaked to make sure the returned `sum_other_doc_count` in r is 0, otherwise it means not all documents have been aggregated.

All this I've reported in a [Gist](https://gist.github.com/martinapugliese/6b903d799fec7b9a8eff22aeea804d6a) here.
