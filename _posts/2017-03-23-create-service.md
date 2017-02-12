---
title: "Create a service"
excerpt_separator: "Create a service"
related: true
categories:
  - tuto
tags:
  - Raspberry PI
  - Unix
---
### Create a service on Raspbian

- [Prerequisites](#prerequisites)
- [Create service](#create-service)
- [Useful commands](#useful-commands)

#### Prerequisites

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/tuto/setup-raspberry)

### Create Service

a) Create new service

```bash
sudo vim /lib/systemd/system/myservice.service
```

b) Edit parameters

```text
[Unit]
Description=MyService
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/bin/python /opt/script.py
Restart=on-abort

[Install]
WantedBy=multi-user.target
```

c) Enable execution permission of your service

```bash
sudo chmod 644 /lib/systemd/system/myservice.service
```
d) Enable execution permission of your script

```bash
sudo chmod u+x /opt/script.py 
```
e) Create symbolic link 
```bash
sudo ln -s /opt/script.py /usr/bin/myservice
```
f) Reload daemon 
```bash
sudo systemctl daemon-reload
```
g) Enable the service
```bash
sudo systemctl enable myservice.service
```
h) Start the service
```bash
sudo systemctl start myservice.service
```
i) Check status
```bash
sudo systemctl status myservice.service
```

##### Useful commands

- Stop the service
```bash
sudo systemctl stop myservice.service
```

See more [here](http://www.diegoacuna.me/how-to-run-a-script-as-a-service-in-raspberry-pi-raspbian-jessie/)





 
