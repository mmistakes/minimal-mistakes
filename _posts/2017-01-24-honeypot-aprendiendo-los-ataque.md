---
title: "Honeypot, aprendiendo de los ataques"
author: Adan Alvarez
classes: wide
excerpt: "HoneyPy es un honeypot de baja interacción escrito en Python y mantenido por foospidy que es fácil de poner en funcionamiento, nos permite extender sus funcionalidades mediante el uso de plugins y también aplicar configuraciones personalizadas."
categories:
  - Herramientas
tags:
  - Securización
  - Blue Team
---
[HoneyPy](https://github.com/foospidy/HoneyPy) es un honeypot de baja interacción escrito en Python y mantenido por [foospidy](https://github.com/foospidy) que es fácil de poner en funcionamiento, nos permite extender sus funcionalidades mediante el uso de plugins y también aplicar configuraciones personalizadas.
{: style="text-align: justify;"}

En primer lugar describiremos que es un honeypot. Un honeypot  es un sistema que tiene como objetivo recibir ataques para aprender de estos. Este simulará servicios que parecerán legítimos de cara al atacante pero que no tienen una utilidad real.
{: style="text-align: justify;"}

[![Esquema funcionamiento honeypot](https://donttouchmy.net/wp-content/uploads/2017/01/esquemahoneypot-300x234.png)](https://donttouchmy.net/wp-content/uploads/2017/01/esquemahoneypot.png)

La puesta en marcha de un sistema honeypot nos permitirá aprender de los ataques que recibimos. Además, podemos extraer información de este honeypot para realizar bloqueos con un nivel prácticamente nulo de falsos positivos, añadiendo así una capa de seguridad.
{: style="text-align: justify;"}

A continuación procedo a detallar como realizar la instalación de HoneyPy en un servidor CenOS versión 6.
{: style="text-align: justify;"}

Uno de los requisitos de HoneyPy es [twisted](https://wiki.python.org/moin/Twisted-Examples), un framework de red para la [programación dirigida por eventos](https://es.wikipedia.org/wiki/Programaci%C3%B3n_dirigida_por_eventos),  en una versión superior a la 13.1 ya que utiliza la función twisted.internet.endpoints.connectProtocol. Esta librería a su vez requiere de una versión de Python superior o igual a la 2.7, que no es la que se encontrará en los repositorios de CentOS ya que este lleva instalada la versión de Python 2.6.
{: style="text-align: justify;"}

Esta versión de Python no puede ser remplazada de forma sencilla ya que es usada de forma interna por el sistema operativo, por lo tanto la solución más sencilla será utilizar [The Software Collections Repository](https://wiki.centos.org/AdditionalResources/Repositories/SCL)
{: style="text-align: justify;"}

Para realizar la instalación primero actualizaremos yum:
{: style="text-align: justify;"}
```
sudo yum update
```
Y después procederemos a instalar el repositorio:
{: style="text-align: justify;"}
```
sudo yum install centos-release-scl
```
Una vez instalado el repositorio podremos instalar la versión 2.7 de python:
{: style="text-align: justify;"}
```
sudo yum install python27
```
Con la versión 2.7 de Python instalada, la podremos usar llamando a otra shell en bash con python 2.7 habilitado:
{: style="text-align: justify;"}
```
scl enable python27 bash
```
Para utilizar HoneyPy deberemos descargar el código desde el repositorio oficial de [GitHub ](https://github.com/foospidy/HoneyPy)e instalar las dependencias indicadas en el fichero requirements.txt que se encuentra en la raíz del repositorio descargado.
{: style="text-align: justify;"}
```
yum install pip

pip install requests

pip install twisted
```
Una vez instaladas las dependencias podremos hacer uso de HoneyPy  en modo consola con el comando:
{: style="text-align: justify;"}
```
python Honey.py
```
o en modo daemon con el comando:
```
python Honey.py -d &
```
Con esto tendremos nuestro honeypot funcionando con la configuración por defecto. 
{: style="text-align: justify;"}
