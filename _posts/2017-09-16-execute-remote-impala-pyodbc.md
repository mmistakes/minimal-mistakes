---
title:  "Execute remote Impala queries using `pyodbc`"
header:
  image: /assets/images/data-engineering.jpg
  teaser: assets/images/2017-09-16-execute-remote-impala-pyodbc/impala-logo.png
excerpt: "Execute Impala queries remotely in Python and get result set into a pandas `DataFrame`"
categories:
  - data-science
---

I love using Python for data science. The language is simple and elegant, and a huge scientific ecosystem - [SciPy](https://www.scipy.org/) - written in Cython has been aggressively evolving in the past several years. In fact, I dare say Python is my favorite programming language, beating Scala by only a small margin. For data science, my favorite programming environment is [Jupyter Notebook](http://jupyter.org/), an elegant and powerful web application that allows blending live code with explanatory text, tables, images and other visualizations.

I also love using [Impala](https://impala.incubator.apache.org/). With Impala, unlike with [Hive](https://hive.apache.org/), I don't have to wait for several minutes to simply get the maximum value in a field. What I don't love, however, is using `impala-shell` to execute Impala queries on the command line. Although there are several tools such as [DbVisualizer](https://www.dbvis.com/) that allow connecting to Impala via JDBC and viewing results in a user-friendly tabular format, they restrict data processing to SQL, and SQL is usually not the language of choice for serious wrangling or analysis of Big Data.

In this post, I discuss how to connect to a remote Impala daemon and execute queries using `pyodbc`, and convert the results into a `pandas` `DataFrame` for analysis. I use Jupyter Notebook, but you can use your favorite IDE.

First, you need to download the [Cloudera Impala ODBC Driver](https://www.cloudera.com/downloads/connectors/impala/odbc/2-5-39.html) and set up an ODBC data source that points to your Impala daemon. I'm not going to go into the details of the setup here; you can find detailed information in the [Cloudera ODBC Driver documentation](https://www.cloudera.com/documentation/other/connectors/impala-odbc/latest.html).

Once you have the ODBC source set up and tested, it's time to connect and start writing queries! The code below shows a minimal example of how a simple query can be executed remotely, and how the results can be fetched into a `pandas` `DataFrame`.

**Note:** Certain configuration settings may differ in your environment; modify code accordingly. This example uses username and password authentication with SSL and self-signed certificates.
{: .notice--warning}

{% highlight python linenos %}
import pandas
import pyodbc

def as_pandas_DataFrame(cursor);
    names = [metadata[0] for metadata in cursor.description]
    return pandas.DataFrame([dict(zip(names, row)) for row in cursor], columns=names)

# Configuration settings for the ODBC connection
cfg = {'DSN': '<DSN_name>', 'host': '<remote_impala_daemon>',
        'port': '<port_number_impala_daemon>',
        'username': '<username>', 'password': '<password>'}

conn_string = 'DSN=%s; Host=%s, Port=%d, Database=default; AuthMech=3;
                UseSASL=1; UID=%s; PWD=%s; SSL=1;
                AllowSelfSignedServerCert=1' % \
                (cfg['DSN'], cfg['host'], cfg['port'],
                cfg['username'], cfg['password'])

# Create connection
conn = pyodbc.connect(conn_string, autocommit=True)

# Get cursor to interact with the SQL engine
cursor = conn.cursor()

# Execute queries like so:
cursor.execute("SHOW DATABASES")

# Convert result set into pandas DataFrame
df = as_pandas_DataFrame(cursor)

# Remember to always close your connection once done, otherwise unexpected behavior may result!
conn.close()

{% endhighlight %}

There you go! Now you can easily fetch data from your Hadoop cluster into a pandas `DataFrame` and play with the data using your favorite Python library!


[data-engineering-category]: {{ "/categories/#data-engineering" | absolute_url }}
