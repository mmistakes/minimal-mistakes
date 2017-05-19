---
layout: single
title: "Accessing the jupyter notebook of a dev server from local machine"
tags: [sysadmin, tensorflow, jupyter, notebook, ssh]
date: 2017-05-19 23:59:59
---

Execute the jupyter notebook in your server, and in your local machine create a ssh tunnel between 8888 ports.

```
ssh -N -f -L localhost:8888:localhost:8888 user@server.address
```


