---
layout: single
title: Linux - Comunicación
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
 - linux-comunicación
page_css:
 - /assets/css/mi-css.css
---

### Transferir archivos

### scp

* Protocolo de seguridad - (Secure Copy Protocol)

* Protocolo de transferencia de archivos en red que permite la transferencia de archivos fácil y segura entre un host remoto y uno local, o entre dos ubicaciones remotas.
* Sus funciones de autenticación y cifrado sin requerir servicios de alojamiento de terceros
* Evitar la exposición de tus datos a rastreadores de paquetes, y preservar su confidencialidad.
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

### sftp

* (Secure file copy - Secure File Transfer Protocol)

* Copia segura local-remota, remota-remota; manipulación de sistemas de archivos remotos
* Permite operaciones sobre archivos remotos.
* Intenta ser más independiente que SCP
  * Ejemplo SCP soporta expansión de comodines especificados por el cliente hasta el servidor, mientras que el diseño SFTP evita este problema.
* Existen servidores SFTP en la mayoría de las plataformas.
* SFTP como su protocolo de transferencia de archivos por omisión.
* Los datos del protocolo SFTP no están protegidos con SSH pero el protocolo de paquetes seguros de SILC se utiliza  para encapsular los datos SFTP dentro de los paquetes de SILC para que se la llevará de igual a igual (peer to peer, P2P).
* SFTP está diseñado para ser un protocolo independiente.
* SFTP utiliza el puerto 22 de TCP.

```bash
sftp user@server_ipaddress
sftp user@remotehost_domainname
```

### ssh

* Secure SHell : Protocolo administración remota para controlar servidores remotos a través de Internet mediante mecanismo de autenticación

#### Contiene

* Autentificación en un servidor remoto
* Transferir entradas desde el **cliente** al **host** y transferir la salida de vuelta al **cliente**
* Posee encriptado en las comunicaciones hacia y desde el **servidor remoto**
* Función acceso remoto al servidor por medio de un canal seguro en el que la información está cifrada.
* La conexión a otros dispositivos
* Permite copiar datos de forma segura (tanto archivos sueltos como simular sesiones **FTP cifradas**)
* Gestionar **claves RSA** para no escribir contraseñas al conectar a los dispositivos y pasar los datos de cualquier otra aplicación por un canal seguro tunelizado mediante **SSH**
* Puede **redirigir** el tráfico para poder ejecutar programas gráficos de forma remota
* El puerto **TCP** asignado es el **22**.
  
#### Comando SSH tiene 3 partes

* ``ssh {user}@{host}``  
  * **ssh** → Comando para establecer y cifrar comunicaciones
  * **{user}** → Nombre del usuario que deseas acceder
    * Ejemplo : root , user , usuario , ubuntu , pepito
  * **{host}** → Nombre del equipo o sistema remoto al que quieres conectarte
    * Ejemplo :  www.midominio.com

![Alt diagrama-ssh](/assets/images/linux/ssh/ssh-eje-1.jpg)

##### Conectar al host como usuario

```bash
ssh user@host 
```

##### Conectar al host mediante un puerto especifico

```bash
ssh -p port user@host
```

##### Añadir su 'clave-key' al host para que el usuario habilite una entrada (keyed-sin llave) o sin contraseña (passwordless-login)

```bash
ssh-copy-id user@host
```

##### Crear claves RSA asociadas a su dirección de correo:

```bash
ssh-keygen -t rsa -C <your_email@hostname.domain>
```

#### Técnicas de Criptografía

* Para realizar comunicaciones seguras el **protocolo SSH** tiene un cifrado seguro para transferir información entre el **host** y el **cliente**

#### Criptografía de Clave Simétrica **(Symmetric-key algorithm)** / criptografía de clave secreta **(Secret key cryptography)**

* Cifrados que utiliza una clave secreta tanto para el cifrado como descifrado de un mensaje, tanto **cliente** como **host**

* Cifrado simetrico **(clave compartida-shared key)** o cifrado secreto compartido , solo hay una clave que utiliza o a veces un par donde una clave se puede calcular la otra clave

  * Se utiliza para cifrar toda la comunicación durante una sesión **SSH**

  * **Cliente** como **Servidor** derivan la clave secreta utilizando el metodo acordado y la clave resultante nunca se releva a terceros

  * Proceso de creación de una clave simetrica se realiza mediante **algoritmo de intercambio de claves**

  * La clave nunca se transmite entre cliente y el host , los 2 equipos comparten datos públicos y los manipulan para calcular de forma independiente la clave secreta

    * Si otra máquina captura los datos públicamente compartidos , no será capaz de calcular la clave porque el algoritmo de intercambio de la clave no se sabra cual fue

  * El **token secreto** es especifico para cada sesión **SSH** , se genera antes de la autenticación del cliente

  * Generada la clave , todo los paquetes se mueven entre 2 máquinas deben ser cifrados por la clave privada incluyendo la contraseña escrita en la terminal del usuario

    * Cifrados simétricos
      * **AES** - (Advanced Encryption Standard)
      * **CAST128** - También llamado CAST5
      * **Twofish** - Sucesor de Blowfish

  * Antes de establecer conexión segura **(SSH)** , **cliente** y el **host** deciden que tipo de cifrado usar que se usará como el **cifrado bidireccional**

    * Ejemplo : 2 maquinas del sistema operativo **Linux** se comunican entre sí a través de **SSH** utilizando **AES-128-CTR** como cifrado predeterminado

#### Criptografía de Clave Asimétrica

* Utiliza dos claves separadas para el cifrado y el descifrado , se conocen como la clave pública (public key) y la clave privada (private key). estas 2 claves juntas forman un par de claves pública-privada conocidas como **(public -private key pair)**

* Clave pública se distribuye abiertamente, se comparte por todos los clientes y está vinculada con la clave privada

* Clave privada no se puede calcular matemáticamente desde la clave pública.
  
  * La relación entre las dos claves es compleja: un mensaje cifrado por la clave pública de una máquina, sólo puede ser descifrado por la misma clave privada de la máquina.
  
    * Esta relación unidireccional significa que la clave pública no puede descifrar sus propios mensajes ni descifrar nada cifrado por la clave privada.

    * La clave privada debe permanecer privada para que la conexión sea asegura, ningún cliente externo debe conocerla, es el único componente capaz de descifrar mensajes que fueron cifrados usando su propia clave pública. Por lo tanto, cualquier la capacidad de descifrar mensajes firmados públicamente debe poseer la clave privada correspondiente para descifrarlos.

    * Cifrado asimétrico no se utiliza para cifrar toda la sesión SSH. sólo se utiliza durante el algoritmo de intercambio de claves de cifrado simétrico.

    * Antes de iniciar una conexión segura, ambas partes generan pares de claves públicas-privadas temporales y comparten sus respectivas claves privadas para producir la clave secreta compartida.

    * Establecida la comunicación simétrica segura, el servidor utiliza la clave pública de los clientes para generarla,  transmitirla al cliente para su autenticación.

    * Si el cliente descifra el mensaje, significa que contiene la **clave privada** para la conexión y así puede establecer la sesión mediante el protocolo **SSH**.

#### Hashing - Criptografía Unidireccional

* Utilizada en **(Secure Shell Connections)**

* La función de **hash unidireccionales** a diferencia de las anteriores no esta destinada a ser descifradas

* Generan un valor de **longitud fija** para cada entrada que no muestra que pueda explotarse lo que lo hace imposibles de revertir

#### rsync

* Ofrece transmisión eficiente de datos incrementados, también opera con datos comprimidos y cifrados

```bash
rsync # 
```
