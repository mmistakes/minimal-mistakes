---
title: "¿Confías tu seguridad al XSS auditor de Chrome?"
author: Adan Alvarez
classes: wide
excerpt: "En esta entrada vamos a ver por qué no podemos confiar la seguridad de nuestra web al XSS auditor de Chrome"
categories:
  - Web
tags:
  - XSS
  - Chrome
  - OWASP
---
En esta entrada vamos a ver por qué no podemos confiar la seguridad de nuestra web al XSS auditor de Chrome.
{: style="text-align: justify;"}

Hace un tiempo ya realizamos una [introducción a los ataques Cross-Site Scripting XSS](https://donttouchmy.net/introduccion-ataques-xss/). En estos el atacante utiliza las entradas de datos de un sitio web para inyectar scripts maliciosos (normalmente JavaScript) que después se ejecutarán en el navegador de otros usuarios.
{: style="text-align: justify;"}

Como estos ataques se basan en la entrada de datos en un sitio web, Chrome, entre otros navegadores, tiene un mecanismo de seguridad para evitarlos. El problema es que este mecanismo de seguridad tiene varios problemas según el tipo de XSS al que se enfrente.
{: style="text-align: justify;"}

El auditor de Chrome se ejecuta durante la fase de análisis del HTML e intenta encontrar reflejos de la solicitud en el cuerpo de la respuesta. Por lo tanto, en ningún caso podrá mitigar los ataques XSS almacenados, ya que la inyección no tiene porque producirse en la misma petición, o DOM, ya que la página en sí (la respuesta HTTP) no cambia, pero el código del lado del cliente contenido en la página se ejecuta de forma diferente debido a las modificaciones maliciosas que se han producido en el DOM.
{: style="text-align: justify;"}

En el caso de encontrar una posible reflexión, el auditor de Chrome puede ignorar el script malicioso, o puede bloquear la página para que esta no cargue y por el contrario aparezca una página de error ERR_BLOCKED_BY_XSS_AUDITOR.
{: style="text-align: justify;"}

Veamos un ejemplo. Tenemos la web de ejemplo: [https://test-xss.000webhostapp.com](https://test-xss.000webhostapp.com/) en la cual, si introducimos el parámetro name, este aparece reflejado:
{: style="text-align: justify;"}

<https://test-xss.000webhostapp.com/?name=donttouchmynet>

Si analizamos el código vemos lo siguiente:
{: style="text-align: justify;"}
```
<script>document.write("donttouchmynet")</script>
```
Vemos que el contenido aparece reflejado dentro de un script. Así que, para realizar un ataque XSS reflejo, bastaría con cerrar el script actual con </script> y añadir nuestro propio script:
{: style="text-align: justify;"}
```
<script>document.write("</script><script>alert("donttouchmynet")</script>")</script>
```
Así que la URL sería:
{: style="text-align: justify;"}

[https://test-xss.000webhostapp.com/?name=</script><script>alert(«donttouchmynet»)</script>](https://test-xss.000webhostapp.com/?name=%3C/script%3E%3Cscript%3Ealert(%22donttouchmynet%22)%3C/script%3E)

Si intentamos acceder a la URL con Chrome veremos que el XSS auditor nos bloquea la petición. Esto sucede ya que detecta que la ejecución de código es debido a un script enviado previamente desde la URL.
{: style="text-align: justify;"}

[![Cross-site scripting auditor de Chrome](https://donttouchmy.net/wp-content/uploads/2018/06/xssblock-300x171.png)](https://donttouchmy.net/wp-content/uploads/2018/06/xssblock.png)

Pero, ¿Qué sucede si en lugar de cargar nuestro propio script nos aprovechamos del script actual ?
{: style="text-align: justify;"}

El punto de inyección, como hemos visto, es un script. Por lo tanto, podemos ejecutar código Javascript directamente. Para esto primero debemos cerrar las comillas, después el paréntesis y finalizar la línea con un punto y coma. Después de cerrar la línea, podemos escribir el código Javascript que deseemos. Una vez finalizado nuestro código añadimos // para comentar el código restante:
{: style="text-align: justify;"}
```
<script>document.write("");alert("donttouchmynet")//")</script>
```
Así que la URL sería:
{: style="text-align: justify;"}

[https://test-xss.000webhostapp.com/?name=«);alert(«donttouchmynet»)//](https://test-xss.000webhostapp.com/?name=%22);alert(%22donttouchmynet%22)//)

Con esto podemos ver que el código se ejecuta y el XSS auditor no puede bloquearlo.
{: style="text-align: justify;"}

[![Cross-site scripting bloqueado](https://donttouchmy.net/wp-content/uploads/2018/06/xss-300x86.png)](https://donttouchmy.net/wp-content/uploads/2018/06/xss.png)

Esto es debído a que para ejecutar nuestro código nos apoyamos del código ya existente en la web y el auditor de Chrome no puede detectar la inyección.
{: style="text-align: justify;"}

Con esta demostración podemos ver que, el auditor XSS, además de no poder detectar ataques XSS almacenados y DOM, tampoco los podrá detectar en caso de que el punto de inyección sea un script.
{: style="text-align: justify;"}

En el caso de que el punto de inyección no sea un script, será más difícil poder evitar el auditor XSS, pero no imposible como ya han demostrado en varias ocasiones en [brutelogic](https://brutelogic.com.br/blog/chrome-xss-auditor-svg-bypass/).
{: style="text-align: justify;"}

Por todo esto, en ningún caso podemos confiar en el auditor de Chrome como medida de protección de nuestra web.
{: style="text-align: justify;"}

Si queremos proteger nuestra web frente a ataques cross-site scripting, recomendamos seguir la [guía de prevención de OWASP](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)
{: style="text-align: justify;"}

Saludos!