---
title: "Writeup – Bloody Feedback (VolgaCTF 2017 Quals) – Injección SQL"
author: Adan Alvarez
classes: wide
excerpt: "El reto que se detalla en esta entrada es un reto web de 100 puntos del CTF VolgaCTF 2017 Quals, celebrado desde el viernes día 24 de marzo hasta el domingo 26 de marzo. Este se resuelve mendiante una injección SQL."
categories:
  - Web
tags:
  - CTF
  - Pentest
  - OWASP
---
El reto que se detalla en esta entrada es un reto web de 100 puntos del CTF VolgaCTF 2017 Quals, celebrado desde el viernes día 24 de marzo hasta el domingo 26 de marzo. Este se resuelve mendiante una injección SQL.
{: style="text-align: justify;"}

Al entrar en la web podíamos ver un formulario para enviar feedback en la Home y un apartado Top messages donde aparecían los mensajes de feedback introducidos por los usuarios.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli10-300x183.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli10.png)

Al introducir una entrada de feedback, se generaba un código, al hacer clic en este código aparecía una pantalla donde se indicaba que el estado del mensaje era no procesado:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli11-300x92.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli11.png)

Los campos Name y Message permitían carácteres especiales y al hacer el envío no aparecía ningún error, el campo email tenía una validación en el navegador la cual no permitía introducir carácteres especiales.  Por lo tanto, enviamos una petición correcta desde el navegador y hacemos uso de la herramienta [BurpSuite](https://portswigger.net/burp/) para interceptar la petición, enviarla al repeater y modificar el valor del campo email para enviar un ' y así ver si tenemos algún error:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli4-300x224.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli4.png)

Vemos que al introducir ' nos aparece un error SQL. Por lo tanto, ya sabemos en que campo tenemos que realizar la injección SQL. Si analizamos el error vemos como aparece: el código que luego nos aprecerá por pantalla, los valores introducidos y como último valor un «not processed» que es el mensaje que aparecía al introducir el código. Con esto podemos ver que estamos antes una injección SQL en un comando insert. Esta injección la tenemos en el penultimo dato añadido, justo antes del «not processed» que aparece por pantalla así que tenemos que ver si es posible añadir una consulta SQL y que el valor de esa consulta se nos muestre por pantalla. Para esto realizamos un simple select 1 de esta manera:
{: style="text-align: justify;"}
```
 ',(select%201));--
```
Con el objetivo de tener una query como la siguiente:
{: style="text-align: justify;"}
```
INSERT INTO table_name (a,b,c,d,e) VALUES ('códido','nombre','mensaje','**',(select%201));--**','not processed');
```
[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli5-300x226.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli5.png)

e introducimos el código que nos devuelve en el HTML para ver el resultado.

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli6-300x148.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli6.png)

Con esto confirmamos que podemos hacer queries en la base de datos, el siguiente paso será ver las tablas de la base de datos, como estamos antes una injección SQL en un insert solo podremos obtener datos de 1 en 1. Por esto, utilizaremos limit 1 y offset para ir descubriendo las tablas.
{: style="text-align: justify;"}

Con la siguiente query:
```
SELECT table_name FROM information_schema.tables limit 1 offset 1
```
vemos que tenemos una tabla con nombre s3cret_tabl3, por lo que esta deberá ser la tabla donde está la flag.\
[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli7-300x154.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli7.png)

el siguiente paso será buscar la columna, de la misma forma que para las tablas utilizamos limit y offset para buscar y vemos con la siguiente query:
{: style="text-align: justify;"}
```
SELECT column_name FROM information_schema.columns limit 1 offset 6
```
la columna s3cr3tc0lumn que debería ser la columna donde está la flag.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli12-300x147.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli12.png)

Por último hacemos la siguiente query:
```
SELECT table_schema FROM information_schema.columns limit 1 offset 6
```
para ver la Base de datos

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli9-300x151.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli9.png)

Con estos datos y utilizando de nuevo limit y offset vamos recorriendo la tabla s3cret_tabl3 y mostrando los valores de s3cr3etc0lumn  hasta que en la query con offset 4:
```
SELECT s3cr3etc0lumn FROM public.s3cret_tabl3 limit 1 offset 4
```
obtenemos la flag

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli2-300x191.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli2.png)

[![](https://donttouchmy.net/wp-content/uploads/2017/03/sqli3-300x147.png)](https://donttouchmy.net/wp-content/uploads/2017/03/sqli3.png)