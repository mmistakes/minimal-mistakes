---
title: "Installing Python"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
categories:
  - Linux
tags:
  - Raspberry PI
  - Unix
  - Python
---
The objective of this tutorial is to install Python and run it with virtual environment.


- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Install PIP](#install-pip)
- [Create VirtualEnv (optional)](#create-virtualenv)

### Prerequisites

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)

### Installation

Usually Python is already installed with the Raspbian image.

Check install:

```bash
python --version
```
Otherwise you can install it 
```bash
apt-get update
apt-get install build-essential python-dev
```

### Install PIP

PIP is a package management system used to install and manage some packages written in Python.

```bash
wget https://bootstrap.pypa.io/get-pip.py
```

```bash
python get-pip.py
```

See more [here](https://pip.pypa.io/en/latest/installing)

### Create VirtualEnv (optional)

A Virtual Environment is useful to keep the dependencies required by different projects. 

Note: virtualenv includes PIP

#### Installation

```bash
sudo pip install virtualenv
```
##### Create a workspace directory for the Python version.
Example:
```bash
mkdir -p ~/workspace/venv2.7
```
#### Create virtualenv links with Python interpreter of your choice.
Example:
```bash
virtualenv -p /usr/bin/python2.7 ~/workspace/venv2.7/
```
#### Start the virtual environment.
```bash
source ~/workspace/venv2.7/bin/activate
```
You can now install all packages you need into your isolated environment.
Example:
```bash
pip install requests
```

See more [here](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

