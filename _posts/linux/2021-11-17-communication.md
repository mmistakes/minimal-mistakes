---
layout: single
title: Linux - Comunicación
date: 2021-12-17
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.png
categories:
  - linux
  - linux-manual
tags:
  - linux-comunicación
page_css: 
  - /assets/css/mi-css.css
---

### Transferir archivos

* scp - (Secure Copy Protocol)
  * Protocolo de transferencia de archivos en red que permite la transferencia de archivos fácil y segura entre un host remoto y uno local, o entre dos ubicaciones remotas.
  * Sus funciones de autenticación y cifrado sin requerir servicios de alojamiento de terceros
  * Evitar la exposición de tus datos a rastreadores de paquetes, y de preservar su confidencialidad.
  * Copia segura local-remota , remota-remota mediante acceso remoto SSH
  * Se aplica con más frecuencia en plataformas Unix,
    * Resumen :  
      * Para realizar operaciones de copia
      * Para cifrar la información y autenticar los sistemas remotos.

```bash
scp [OPCION] [usuario@]SRC_HOST:]archivo1 [usuario@] HOST_DESTINO:]archivo2
[other options] # Modificadores agrega el comando SCP
[source username@IP] # Nombre de usuario , IP de la máquina que tiene el archivo. ejemplo root@123.123.123.12
:/ # informa al comando SCP que vas a escribir en el directorio de origen
[directory and file name] # Donde ubicada el archivo, su nombre. /usuarios/ubuntu/Escritorio/archivo.txt
[destination username@IP] # Nombre de usuario, IP de la máquina de destino.
[destination directory] # Directorio de destino donde se guardará el archivo.
```

```bash
scp -p root@162.168.1.1:/media/archivo.txt ubuntu@162.168.1.2:/desktop/destination
```

* sftp - (Secure file copy - Secure File Transfer Protocol)
  * Copia segura local-remota, remota-remota; manipulación de sistemas de archivos remotos
  * Permite operaciones sobre archivos remotos.
  * Intenta ser más independiente que SCP
    * Ejemplo SCP soporta expansión de comodines especificados por el cliente hasta el servidor, mientras que el diseño SFTP evita este problema.  
  * Existen servidores SFTP en la mayoría de las plataformas.
  * SFTP como su protocolo de transferencia de archivos por omisión.
  * Los datos del protocolo SFTP no están protegidos con SSH pero el protocolo de paquetes seguros de SILC se utiliza para encapsular los datos SFTP dentro de los paquetes de SILC para que se la llevara de igual a igual (peer to peer, P2P).
  * SFTP está diseñado para ser un protocolo independiente.
  * SFTP utiliza el puerto 22 de TCP.

```bash

```

* ssh - Secure SHell :Protocolo y programa
  * Función acceso remoto al servidor por medio de un canal seguro en el que la información está cifrada.
  * La conexión a otros dispositivos
  * Permite copiar datos de forma segura (tanto archivos sueltos como simular sesiones FTP cifradas)
  * Gestionar claves RSA para no escribir contraseñas al conectar a los dispositivos y pasar los datos de cualquier otra aplicación por un canal seguro tunelizado mediante SSH
  * Puede redirigir el tráfico del (Sistema de Ventanas X) para poder ejecutar programas gráficos remotamente
  * El puerto **TCP** asignado es el **22**.

```bash
ssh # Transferir archivos
```

```bash
hostname # Ver el nombre 
```

```bash
rsync 
```
