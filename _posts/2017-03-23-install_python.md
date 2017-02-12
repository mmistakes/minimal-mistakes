---
title: "Installing Python"
excerpt_separator: "Installing Python"
related: true
header:
  image: /assets/images/jordan-ladikos-62738.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
categories:
  - computer
tags:
  - Raspberry PI
  - Unix
  - Python
---
### Installing Python on Raspberry PI 3

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Install PIP](#install-pip)
- [Create VirtualEnv](#create-virtualenv)

#### Prerequisites

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/automation/setup_raspberry.md)

#### Installation

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

#### Install PIP

PIP is a package management system used to install and manage some packages written in Python.

```bash
wget https://bootstrap.pypa.io/get-pip.py
```

```bash
python get-pip.py
```

See more [here](https://pip.pypa.io/en/latest/installing)

#### Create VirtualEnv (optional)

A Virtual Environment is useful to keep the dependencies required by different projects. 

Note: virtualenv includes PIP

##### a) Installation

```bash
sudo pip install virtualenv
```
##### b) Create a workspace directory for the Python version.
Example:
```bash
mkdir -p ~/workspace/venv2.7
```
##### c) Create virtualenv links with Python interpreter of your choice.
Example:
```bash
virtualenv -p /usr/bin/python2.7 ~/workspace/venv2.7/
```
##### d) Start the virtual environment.
```bash
source ~/workspace/venv2.7/bin/activate
```
You can now install all packages you need into your isolated environment.
Example:
```bash
pip install requests
```

See more [here](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

