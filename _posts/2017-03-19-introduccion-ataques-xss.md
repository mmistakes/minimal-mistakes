---
title: "Introducción a los ataques Cross-Site Scripting XSS"
author: Adan Alvarez
classes: wide
excerpt: "Introducción a los ataques Cross-Site Scripting (XSS) con el objetivo de entender como funcionan, que peligros comportan y como aplicar las medidas necesarias para evitarlos."
categories:
  - Web
tags:
  - Pentest
  - OWASP
---
En esta serie de artículos vamos a realizar una introducción a los ataques Cross-Site Scripting (XSS) con el objetivo de entender como funcionan, que peligros comportan y como aplicar las medidas necesarias para evitarlos.
{: style="text-align: justify;"}

Los ataques de tipo Cross-Site Scripting son un tipo de inyección. En esta el atacante utiliza las entradas de datos de un sitio web para inyectar scripts maliciosos (normalmente JavaScript) que después se ejecutarán en el navegador de otros usuarios, es decir, en las víctimas de este ataque.
{: style="text-align: justify;"}

Tipos de XSS
------------

Podemos diferenciar los ataques XSS según si son o no persistentes y según donde se utilizan los datos no confiables. A continuación vemos un cuadro resumen ofrecido por [OWASP](https://www.owasp.org/) de los tipos de XSS:
{: style="text-align: justify;"}

![Cuadro resumen tipos de ataques XSS](https://owasp.org/www-community/assets/images/Server-XSS_vs_Client-XSS_Chart.png)

Tras esto pasamos a detallar como funcionan los ataques en los cuales los datos no confiables se utilizan en el servidor:
{: style="text-align: justify;"}

**Stored Server XSS:** La vulnerabilidad se encuentra en el código del servidor y consiste en lo siguiente: En esta el atacante enviará una petición al servidor, este la almacenará y la mostrará a otros usuarios. La petición del atacante contendrá un script que se enviará también a los usuarios que visiten la página que contiene la vulnerabilidad haciendo que este script sea procesado y ejecutado en el navegador de estos.
{: style="text-align: justify;"}

Veamos un ejemplo utilizando la web vulnerable [WebGoat](https://www.owasp.org/index.php/Category:OWASP_WebGoat_Project):

En este ejemplo tendremos que el atacante será un trabajador llamado Tom que tiene acceso a modificar sus datos de usuario. La víctima será Jerry, de recursos humanos, que tiene acceso a ver el perfil de todos los empleados.
{: style="text-align: justify;"}

Tom accede a su perfil y modifica sus datos introduciendo código JavaScript:

[![XSS](https://donttouchmy.net/wp-content/uploads/2017/01/xss1-1-300x203.png)](https://donttouchmy.net/wp-content/uploads/2017/01/xss1-1.png)

Cuando Jerry acceda a ver el perfil de Tom, el servidor enviará en el contenido el script inyectado por Tom y este se ejecutará en el navegador de Jerry:
{: style="text-align: justify;"}

[![Stored XSS Fase 2](https://donttouchmy.net/wp-content/uploads/2017/01/xss2-300x257.png)](https://donttouchmy.net/wp-content/uploads/2017/01/xss2.png)    [![Stored XSS Fase 3](https://donttouchmy.net/wp-content/uploads/2017/01/xss3-300x217.png)](https://donttouchmy.net/wp-content/uploads/2017/01/xss3.png)

Si analizamos el código HTML podremos ver el script introducido por Tom:

[![Stored XSS Código HTML](https://donttouchmy.net/wp-content/uploads/2017/01/xss4-300x158.png)](https://donttouchmy.net/wp-content/uploads/2017/01/xss4.png)

**Reflected Server XSS:** En este tipo de XSS la vulnerabilidad también se encuentra en el código del servidor pero a diferencia del Stored Server XSS el código solo se ejecutará al enviar la petición y no para todas las personas que visiten una página. Es decir, el servidor creará la página añadiendo una entrada enviada en esa petición, esa entrada será la que contendrá el script que se ejecutará en el navegador. Por lo tanto, para ejecutar este código deberemos enviar el script en la petición.
{: style="text-align: justify;"}

Veamos de nuevo un ejemplo utilizando la web vulnerable [WebGoat](https://www.owasp.org/index.php/Category:OWASP_WebGoat_Project):
{: style="text-align: justify;"}

En este ejemplo tendremos de nuevo al atacante Tom que desea ejecutar código JavaScript en el navegador de Jerry.
{: style="text-align: justify;"}

Tom descubre que hay una vulnerabilidad XSS en el buscador de empleados, al introducir un script este se ejecuta en el navegador:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/01/2xss1-300x235.png)](https://donttouchmy.net/wp-content/uploads/2017/01/2xss1.png)

Se inyecta el script
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/01/2xss2-300x230.png)](https://donttouchmy.net/wp-content/uploads/2017/01/2xss2.png)

Verifica que el script introducido se ejecuta
{: style="text-align: justify;"}

Por lo tanto Tom envía a Jerry un correo con un enlace a la web, este enlace contiene como parámetro el código JavaScript a ejecutar. Jerry verá el enlace y confiará en el ya que es a una web conocida, al hacer clic el código JavaScript introducido como parámetro se ejecutará en el navegador de Jerry:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/01/2xss3-1-300x171.png)](https://donttouchmy.net/wp-content/uploads/2017/01/2xss3-1.png)