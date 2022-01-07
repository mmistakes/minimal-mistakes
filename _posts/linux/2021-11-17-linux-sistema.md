---
layout: single
title: Linux - Información del Sistema
date: 2021-12-17
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-manual
tags:
  - linux-sistema
page_css: 
  - /assets/css/mi-css.css
---

## Comandos de sistema

### Ver caracteristicas del sistema GNU/Linux que se esta utilizando

```bash
cat /etc/*release

DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=20.04
DISTRIB_CODENAME=focal
DISTRIB_DESCRIPTION="Ubuntu 20.04.3 LTS"
NAME="Ubuntu"
VERSION="20.04.3 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.3 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
```

### Información CPU

```bash
cat /proc/cpuinfo
```

### Información Memoria

```bash
cat /proc/memoinfo
```



### Versión de la distribución de GNU/Linux que se esta utilizando

```bash
lsb_release -a

No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.3 LTS
Release:        20.04
Codename:       focal
```

### Información del Kernel

```bash
uname -a
Linux ubuntu 5.11.0-44-generic #48~20.04.2-Ubuntu SMP Tue Dec 14 15:36:44 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
```

```bash
uname -r
5.11.0-43-generic
```

### Muestra el uso del espacio en disco

```bash
df
```

### Muestra memoria y espacio 'swap'

```bash
free
```

### Muestra las posibles rutas donde se ubica la app/software/comando que ejecutemos

```bash
whereis <app/sw/comando>
```

### Muestra cual app/software/comando se ejecutara

```bash
which <app/sw/comando>
```

