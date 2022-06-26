---
title: "Quick Tips – Kali Linux en Docker"
author: Jose M
classes: wide
excerpt: "Uso de Kali linux con Docker"
categories:
  - Quick Tips 
tags:
  - Containers
  - Kali
  - Pentest
---
Arrancamos y descargamos la [imagen](https://hub.docker.com/r/kalilinux/kali-linux-docker/) de Kali Linux oficial.
```
$ docker run -t -i --name kalibase kalilinux/kali-linux-docker
```
Actualizamos repositorio e instalamos las herramientas que queramos para nuestra imagen.
```
root@7714e6042869:/# apt-get update && apt-get install vim nmap
root@7714e6042869:/# exit
```
Una vez instaladas, salimos con CTRL + D y hacemos el *commit *de nuestra imagen en local.
```
$ docker commit -m "vim nmap" kalibase kali:slim
```
Ahora tenemos la imagen oficial actualizada y con nuestras herramientas preferidas. Podéis instalar las que queráis. Esto es sólo un ejemplo.

Ahora, a jugar!

# Crear y acceder al *container* asignando un nombre (Primera vez)
```
$ docker run -t -i -h kalidock --name kali kali:slim
```

# Iniciar *container* creado y acceder mediante el nombre
```
$ docker start kali -a
```

# Consultar el estado de nuestros *containers*
```
$ docker ps -a
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
434d35d8eb23 kali:slim "bash" 2 hours ago Exited (130) 7 seconds ago kali
```
# Actualizar recursos de nuestro *container*
```
$ docker update --memory 1g --cpus 2 --memory-swap 2g kali
```
# Para salir del container sin pararlo presiona [CTRL]+[P]+[Q]

Saludos!