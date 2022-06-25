---
title: "Quick Tips – Fuerza bruta con Brutespray"
author: Adan Alvarez
classes: wide
excerpt: "Uno de los pasos fundamentales al realizar un test de intrusión es verificar si los servicios protegidos con contraseña utilizan contraseñas débiles. Cuando esta prueba se debe realizar en una red grande y con muchos servicios esto puede convertirse en un trabajo complicado. Por esto queremos presentar en este post Brutespray, una herramienta que nos ayudará con esta tarea."
categories:
  - Quick Tips
  - Herramientas
tags:
  - Red Team
  - Pentest
  - Brutespray
---
Uno de los pasos fundamentales al realizar un test de intrusión es verificar si los servicios protegidos con contraseña utilizan contraseñas débiles. Cuando esta prueba se debe realizar en una red grande y con muchos servicios esto puede convertirse en un trabajo complicado. Por esto queremos presentar en este post Brutespray, una herramienta que nos ayudará con esta tarea.
{: style="text-align: justify;"}

Brutespray es una herramienta escrita en python por  Shane Young/@x90skysn3k y Jacob Robles/@shellfail. Esta automatiza ataques de fuerza bruta a diferentes servicios utilizando medusa. Este ataque probará diferentes usuarios y contraseñas y nos indicará si alguna de las combinaciones es correcta.
{: style="text-align: justify;"}

### Instalación

Para poder ejecutar Brutespray deberemos descargarlo de su [GIT](https://github.com/x90skysn3k/brutespray) e instalar las dependencias:
{: style="text-align: justify;"}
```
git clone https://github.com/x90skysn3k/brutespray\
cd brutespray\
pip install -r requirements.txt
```
Para distribuciones como Kali o Arch podemos instalarlo directamente desde los repositorios:
{: style="text-align: justify;"}

Arch:
```
pacman -S brutespray
```
Kali:
```
apt-get install brutespray
```
### Ejecución

Brutespray tomará como entrada los datos de salida de nmap.
{: style="text-align: justify;"}

Podemos lanzar brutespray de la siguiente manera:
{: style="text-align: justify;"}
```
python brutespray.py --file /path/nmap.xml
```
[![Brutespray](https://donttouchmy.net/wp-content/uploads/2019/01/brutespraySuccess-300x60.jpg)](https://donttouchmy.net/wp-content/uploads/2019/01/brutespraySuccess.jpg)

Por defecto, Brutespray utilizará listas de usuarios y contraseñas particulares para cada servicio. Podemos indicar nuestras propias listas mediante los parámetros -U y -P:
{: style="text-align: justify;"}
```
python brutespray.py --file /path/nmap.xml -U /path/usuarios.txt -P /path/contraseñas.txt
```
Para redes con muchos servicios, es recomendable utilizar las opciones THREADS y HOSTS. Threads indicará cuantos threads de medusa utilizará y Hosts el número de equipos en paralelo que se probarán. Por ejemplo:
{: style="text-align: justify;"}
```
python brutespray.py --file /path/nmap.xml --threads 5 --hosts 5
```
Pese a que esta herramienta es utilizada frecuentemente por equipos de ataque, es una herramienta muy útil también para que los equipos de defensa verifiquen de forma periódica que no existen servicios con contraseñas débiles. Incluso para verificar si una cuenta que conocíamos ha sido borrada completamente de todos los servicios. Esto es de vital importancia ya que los errores de configuración son una de las causas principales que permiten a un atacante lograr acceso a un sistema.
{: style="text-align: justify;"}

En nuestra sección de [herramientas](https://donttouchmy.net/herramientas/) podréis ver más herramientas útiles tanto para equipos de defensa como para equipos de ataque.
{: style="text-align: justify;"}
