---
redirect_to: "https://netfoundry.io/docs/platform/api-guides/"
permalink: /guides/python/
redirect_from:
  - /v2/guides/python/
title: "Python Guide"
sidebar:
    nav: v2guides
toc: true
classes: wide
---

The Python module `netfoundry` is a general-purpose library and thin wrapper for the NetFoundry platform API.

## Help

Free-tier subscribers can always ask for help with the Python module in [Community](https://community.netfoundry.io) or [GitHub](https://github.com/netfoundry/python-netfoundry/issues). Learn more [about contacting support](/help/).

## Install

Installing the Python3 module is easy with `pip`.

[Python Package Index module](https://pypi.org/project/netfoundry/)
: Python3 interface to the NetFoundry API

```bash
pip install netfoundry
```

## Docker

A container image with the latest Python module already installed: `netfoundry/python:latest`

## `nfctl demo`

The [NetFoundry CLI](/guides/cli) `nfctl` is an example of an application using the `netfoundry` Python module. The CLI has a built-in demo you can [run and read here](https://github.com/netfoundry/python-netfoundry/blob/main/netfoundry/ctl.py).

```bash
# or find the installed source file for demo.py under FILE heading of the built-in doc
nfctl demo
```

There's [a separate article here](./guide-demo.md) dedicated to this demo.
