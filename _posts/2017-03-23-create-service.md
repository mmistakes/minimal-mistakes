---
title: "Create a service"
related: true
header:
  overlay_color: "#000"
  overlay_filter: "0"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
categories:
  - Linux
tags:
  - Raspberry PI
  - Unix
---
The objective of this tutorial is to create a system service in order to run a standalone program on background.


- [Prerequisites](#prerequisites)
- [Create service](#create-service)
- [Useful commands](#useful-commands)

#### Prerequisites

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)

### Create Service

a. Create new service

```bash
sudo vim /lib/systemd/system/myservice.service
```

b. Edit parameters

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

c. Enable execution permission of your service

```bash
sudo chmod 644 /lib/systemd/system/myservice.service
```
d. Enable execution permission of your script

```bash
sudo chmod u+x /opt/script.py 
```
e. Create symbolic link 
```bash
sudo ln -s /opt/script.py /usr/bin/myservice
```
f. Reload daemon 
```bash
sudo systemctl daemon-reload
```
g. Enable the service
```bash
sudo systemctl enable myservice.service
```
h. Start the service
```bash
sudo systemctl start myservice.service
```
i. Check status
```bash
sudo systemctl status myservice.service
```

##### Useful commands

- Stop the service
```bash
sudo systemctl stop myservice.service
```

See more [here](http://www.diegoacuna.me/how-to-run-a-script-as-a-service-in-raspberry-pi-raspbian-jessie/)





 
