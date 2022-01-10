---
layout: single
title: Linux - Usuarios
date: 2022-01-10
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
  - linux-usuario
page_css: 
  - /assets/css/mi-css.css
---

## Usuarios

### id

* Comando para mostrar UID/GID/GROUP y demás permisos del usuario actual dentro del sistema **UNIX/Linux** en el que se este trabajando

#### Ejemplo

```bash
id # uid=1001(sysadmin) gid=1001(sysadmin) groups=1001(sysadmin),4(adm),27(sudo)
```

### who / finger

* Muestran los usuarios registrados dentro del sistema

#### Ejemplo - who

```bash
who  
rad20    :0           2022-01-10 10:21 (:0)
rad20    pts/1        2022-01-10 10:21 (tmux(2784).%2)
rad20    pts/2        2022-01-10 10:21 (tmux(2784).%1)
rad20    pts/3        2022-01-10 10:21 (tmux(2784).%3)
rad20    pts/4        2022-01-10 10:21 (tmux(2784).%4)
```

#### Ejemplo - finger

```bash
finger
Login     Name       Tty      Idle  Login Time   Office     Office Phone
rad20     rad 20    *:0             Jan 10 10:21 (:0)
rad20     rad 20     pts/1    1:11  Jan 10 10:21 (tmux(2784).%2)
rad20     rad 20     pts/2      11  Jan 10 10:21 (tmux(2784).%1)
rad20     rad 20     pts/3    1:11  Jan 10 10:21 (tmux(2784).%3)
rad20     rad 20     pts/4    1:11  Jan 10 10:21 (tmux(2784).%4)
```

### w

* Muestra quién esta registrado

```bash
w 
```

### Ejemplo - Uso de w

```bash
w # Ejecuto el comando
10:44:12 up 25 days, 13:51,  1 user,  load average: 0.27, 0.52, 0.64           
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT             
sysadmin pts/0                     10:27    1.00s  0.06s  0.00s w 
```
