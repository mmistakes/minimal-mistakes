---
title: "Writeup – DEF CON CTF Qualifier 2018 – You Already Know and sbva"
author: Adan Alvarez
classes: wide
excerpt: "Este fin de semana se ha realizado el CTF de cualificación para el DEF CON CTF 2018, uno de los ctf más famosos. En esta entrada se detallará la solución de dos retos sencillos. You already know y sbva, ambos retos web se pueden resolver de forma sencilla utilizando burp."
categories:
  - Web 
tags:
  - Burp
  - CTF
  - Bruteforce
---
Este fin de semana se ha realizado el [CTF de cualificación para el DEF CON CTF 2018](https://scoreboard.oooverflow.io/), uno de los ctf más famosos. En esta entrada se detallará la solución de dos retos sencillos. You already know y sbva, ambos retos web se pueden resolver de forma sencilla utilizando [burp](https://portswigger.net/burp).
{: style="text-align: justify;"}

You Already Know
----------------

Al hacer clic en el reto obteníamos el siguiente mensaje:
{: style="text-align: justify;"}

[![DEF CON CTF](https://donttouchmy.net/wp-content/uploads/2018/05/youalreadyknown-300x221.png)](https://donttouchmy.net/wp-content/uploads/2018/05/youalreadyknown.png)
{: style="text-align: justify;"}

Esto significa que de alguna manera se nos había enviado la flag y que debía estar en nuestra posesión. Arrancamos burp para ver el tráfico que se envía y se recibe al hacer clic en el reto. La respuesta es un json en el cuál tenemos como comentario la flag del reto:
{: style="text-align: justify;"}

[![DEF CON CTF](https://donttouchmy.net/wp-content/uploads/2018/05/jsonflag-300x129.png)](https://donttouchmy.net/wp-content/uploads/2018/05/jsonflag.png)

sbva
----

En este reto se nos daba una URL que daba acceso a un login y los datos de acceso del administrador, indicando que tienen una protección extra y que pese a tener los datos de administrador no podríamos entrar:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/05/sbva-300x210.png)](https://donttouchmy.net/wp-content/uploads/2018/05/sbva.png)

Efectivamente al acceder a la web podemos observar un formulario web:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/05/login-300x188.png)](https://donttouchmy.net/wp-content/uploads/2018/05/login.png)

Al acceder con los datos indicados obtenemos un error que nos indica que el navegador es incompatible.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/05/browser_fail-300x75.png)](https://donttouchmy.net/wp-content/uploads/2018/05/browser_fail.png)

En la petición POST únicamente se envía usuario y contraseña, por lo que el navegador utilizado se debe estar obteniendo del campo User-Agent.
{: style="text-align: justify;"}

Por lo tanto, para poder acceder, lo que necesitábamos era utilizar el mismo navegador que el administrador, para esto realizamos un ataque de fuerza bruta en el campo User-Agent.
{: style="text-align: justify;"}

Al iniciar este ataque con varios threads observamos que varias respuestas contenían el mensaje: Incredibly fast admin detected...
{: style="text-align: justify;"}

[![DEF CON CTF](https://donttouchmy.net/wp-content/uploads/2018/05/fast_request-300x142.png)](https://donttouchmy.net/wp-content/uploads/2018/05/fast_request.png)

Por lo que era importante realizar las peticiones sin multi threading.
{: style="text-align: justify;"}

Tras varias peticiones y utilizando el diccionario: <https://github.com/nlf/browser-agents>
{: style="text-align: justify;"}

Se obtiene la flag al enviar la petición con el User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/05/sbva_response-300x246.png)](https://donttouchmy.net/wp-content/uploads/2018/05/sbva_response.png)

DEF CON CTF 2018 tiene fama de ser un CTF muy duro, pero como podemos ver, tenemos retos para todos los niveles.
{: style="text-align: justify;"}

Saludos!