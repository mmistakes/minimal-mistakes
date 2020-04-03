---
title: Getting started with Google Cloud
tags:
  - cloud-computing
  - google-cloud
  - twitter
excerpt: I've learned a bit about Google Cloud by tinkering on it to run a little job, this post outlines the steps and an overview of the platform.
---

This post is a bit of a walkthrough of my setting up and using Google Cloud tools for a little job consisting in streaming tweets continuously to build a dynamically updated dataset, stored in the cloud itself. There was no particular necessity to use cloud resources for me to achieve this other than the convenience of having a remote server, but was a good way to get acquainted with Google Cloud and start using it. The choice of Google Cloud is purely due to the fact that I use AWS at work and I wanted to check differences, and get a bit of a feel of something else.

## Some considerations on AWS vs. Google Cloud

The GC UI is much more user friendly than AWS's one, in my opinion, and has a nicer look. I quite like the drag-and-drop interface in the main dashboard and the cleanliness of the design. You can in fact customise a dashboard with monitoring information of the tools you're using, and adminy things like billing. Soon as you sign up, you are run through an onboarding process, plus there is tutorials about each item/tool you want to start practicing, and they're very friendly and useful. It's pretty much Google style to keep things quite on the playful side. I also find the documentation very accessible and clear.

Google Cloud saw its first release in 2011, while AWS's first appearance dates back to 2006, it is clear that Google is trying to compete in a market which is *probably* dominated by Amazon. However, there are starting to appear differences in some of tools offered and use cases targeted which are likely to differentiate these two platforms more and more in time. Note that we're not forgetting that there are other cloud providers around!

### Correspondence AWS-GC

GC has mapped their tools to the AWS corresponding ones into this very handy [page](https://cloud.google.com/free/docs/map-aws-google-cloud-platform). Specifically for this project, I'm going to use Cloud Storage (the equivalent of AWS S3) as the place where I stream tweets to and keep them, and Compute Engine (the equivalent of AWS EC2) to get a machine running the job. Initially, I was planning to use a cloud function (the equivalent of an AWS lambda function) but with a bit of disappointment I've discovered it only supports Javascript at the moment and my job is written in Python.

### The SDK

As said, I'm going to use Python so I've downloaded their [SDK](https://googlecloudplatform.github.io/google-cloud-python/latest/), which at a first sight seems quite better, or at least better documented, than the AWS one ([boto](http://boto3.readthedocs.io/en/latest/index.html)). Boto is quite confusing in my opinion, if you want to achieve even a simple task (say connecting to a bucket to put/download files there) there can be different ways of doing it, and the docs do not help much if you're not very seasoned at using it. Might be a coincidence, but a [blog post](https://martinapugliese.github.io/_posts/2016-07-31-interacting-with-a-dynamodb-via-boto3/) I have here about using boto for talking to a DynamoDB is by far the one which received the highest number of hits, and keeps counting.

## Goal and settings

My goal is to dynamically stream in some Tweets from the Twitter API and store them.
I could easily get away with using a cron job running on my laptop, and store them locally, but thought I'd better use the cloud for even such a simple thing as it gave me the good excuse to try it. Eventually what I resorted to is a cron job but on a GC machine. It's a simple thing really.

### Starting up

I've opened an account tied to my Google email, headed to the GC page and started tinkering around. Again, they give you tutorials for everything and the way the tools are presented, with drag-and-drop cards is very nice. The way it works is Google provides a free trial period of up to 12 months and $300 credit, whichever you exhaust first. Every tool is obviously priced differently depending on the compute/performance requested, but there is an ["Always Free"](https://cloud.google.com/free/docs/always-free-usage-limits) possibility: you'll never be charged if you stay inside the limits even after the expiration of the trial. Besides, they say they'll ask you confirmation you want to go on before actually charging you in case you exceed them, so it's all really promising. The "Always Free" limit is quite restrictive as you can imagine, but still allows you to have an f1 machine (the smallest, is really tiny) and some 5GB storage (and other little stuff as well); the machine you can use and keep it running for free as you're given a monthly allowance of hours which correspond to a continuous usage for the month. For my little project here, this should be more than sufficient.

### The machine: Google Cloud Engine

I've spun up an f1 micro with Ubuntu 16.04, which is the one you get for totally free usage each month. It's very small, but should do for this purpose. About the authentication to access GC services, head to the [docs](https://cloud.google.com/storage/docs/authentication).

The machine comes with Python3.5 but I'm on 3.6 on the laptop so to avoid dependencies nightmares I thought I'd better upgrade there. The way I've done it was to just install Python3.6 and all libs needed directly on the machine itself; the other way (cleaner but a bit overkill for the sake of this project) would have been to set up a Docker container.

So what I've done is:

1. Updating the archives and install Python3.6 on Ubuntu 16.04, following [here](https://askubuntu.com/questions/4983/what-are-ppas-and-how-do-i-use-them)
2. Installing `pip` for Python3.6, following [here](https://askubuntu.com/questions/889535/how-to-install-pip-for-python-3-6-on-ubuntu-16-10)

At that point you just `pip install` all needed dependencies. Note that to install the `google-cloud` Python SDK you need to pre-install `python3.6-dev` (which contains header files for building python extensions) and `build-essential` (which contains the compilers) with an `apt install` on the machine as it would complain otherwise due to the failed installation of `psutil`.

As for environment variables, we need to connect to the Twitter API so everything related to API access needs to be set.

### The storage: Google Storage

Google Storage is the equivalent of AWS S3 in GC. It's a storage system where you can organise your files in partitions, read and write. I'm using it to store tweets so I've created a bucket and I can access it and write a tweet as a JSON file I downloaded locally as:

```py
from google.cloud import storage

client = storage.Client()
bucket = client.get_bucket('my-bucket')

blob = bucket.blob(tweet_id + '.json')
blob.upload_from_file(open(tweet_id + '.json', 'rb'),
                           content_type='application/json')

```

Note that a `blob` is an object in the bucket. All very simple.

## To conclude

Finding GC quite easy to use, you are guided through setups and the documentation is very well written and comprehensive. I hope they'll soon add support for Python in the serverless functions and my guess is that they will. I will certainly try more and more of their services, especially for data works purposes.
