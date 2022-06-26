---
title: "Extensión Autorize, buscando problemas de control de acceso"
author: Adan Alvarez
classes: wide
excerpt: "Cuando se analiza la seguridad de una aplicación web, uno de los puntos más importantes a revisar es como funciona la autorizacion y el control de acceso. Esto es vital para detectar problemas de autorización y autenticación también llamados problemas de pérdida de control de acceso. Vulnerabilidad que encontramos en el número 5 del TOP 10 de OWASP. En esta entrada veremos como con Burp podemos realizar esta verificación de forma sencilla con la extensión Autorize."
categories:
  - Web
tags:
  - Burp
  - Red Team
  - Pentest
  - Reverse Shell
  - OWASP
---
Cuando se analiza la seguridad de una aplicación web, uno de los puntos más importantes a revisar es como funciona la autorizacion y el control de acceso. Esto es vital para detectar problemas de autorización y autenticación también llamados problemas de [pérdida de control de acceso](https://www.owasp.org/index.php/Broken_Access_Control). Vulnerabilidad que encontramos en el número 5 del [TOP 10 de OWASP](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf). En esta entrada veremos como con [Burp](https://portswigger.net/burp) podemos realizar esta verificación de forma sencilla con la extensión [Autorize](https://portswigger.net/bappstore/f9bbac8c4acf4aefa4d7dc92a991af2f).
{: style="text-align: justify;"}

### Instalación

Para utilizar esta extensión deberemos tener descargado el standalone de Jython que podremos descargar de: <http://www.jython.org/downloads.html>
{: style="text-align: justify;"}

Una vez descargado vamos a *Extender -- Options* y en Python Environment seleccionamos el fichero JAR descargado.
{: style="text-align: justify;"}

Tras esto vamos a la pestaña *BApp Store*, seleccionamos Autorize y clicamos en *Install* para instalar la extensión:
{: style="text-align: justify;"}

[![extensión autorize](https://donttouchmy.net/wp-content/uploads/2018/10/install-300x172.png)](https://donttouchmy.net/wp-content/uploads/2018/10/install.png)

Una vez realizada la instalación nos aparecerá una pestaña nueva llamada Autorize:
{: style="text-align: justify;"}

[![extensión autorize](https://donttouchmy.net/wp-content/uploads/2018/10/Autorize-300x174.png)](https://donttouchmy.net/wp-content/uploads/2018/10/Autorize.png)

### Configuración

Para este tipo de pruebas necesitamos al menos dos usuarios. Si la aplicación tiene usuarios administradores y/o usuarios con más privilegios será interesante tener diferentes usuarios con diferentes permisos. Así podremos verificar que los usuarios con menos permisos no pueden acceder ni modificar la información de los usuarios con mayores privilegios.
{: style="text-align: justify;"}

Una vez tenemos los usuarios  debemos acceder a la aplicación con el perfil con menos privilegios. Después de acceder obtendremos una cookie de sesión. En la mayoría de los casos es trivial saber cuál es la cookie de sesión ya que se entrega justo después de introducir nuestros datos de acceso y suele tener un nombre como JSESSIONID (Java EE), PHPSESSID (PHP) o ASPSESSIONID (Microsoft ASP). Si la cookie no es ninguna de estas, lo que podemos hacer para verificar cuál es la cookie de sesión es realizar la misma petición eliminando de una en una las cookies, con esto podremos ver que al eliminar la cookie de sesión no veremos los mismos datos. Si eliminamos todas las cookies y seguimos viendo datos sensibles, posiblemente tenemos un problema de autenticación.
{: style="text-align: justify;"}

Una vez tenemos la cookie de sesión de un usuario, la configuramos en la extensión Autorize:

[![](https://donttouchmy.net/wp-content/uploads/2018/10/cookie-300x174.png)](https://donttouchmy.net/wp-content/uploads/2018/10/cookie.png)

Adicionalmente podemos configurar en los apartados Enforcement Detector y Detector Unauthenticated los mensajes con los que responde el servidor si el usuario es incorrecto (Enforcement Detector) o el mensaje si no estas autenticado (Detector Unauthenticated). Por ejemplo:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/10/enforcement-300x163.png)](https://donttouchmy.net/wp-content/uploads/2018/10/enforcement.png)

### Utilización

Una vez hemos configurado la extensión hacemos clic en el botón Autorize is off para que cambie a Autorize is on:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/10/autorize_on-300x97.png)](https://donttouchmy.net/wp-content/uploads/2018/10/autorize_on.png)

En este momento comenzamos a navegar por la aplicación con un usuario con más privilegios. Burp enviará dos peticiones por cada petición realizada, una con la cookie con menos privilegios y otra sin cookie. Con esto podremos comparar las respuestas de la web y ver si tenemos problemas de autorización y autenticación:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2018/10/navegar-300x138.png)](https://donttouchmy.net/wp-content/uploads/2018/10/navegar.png)

Esto lo podremos ver mediante los mensajes Enforced! y Bypassed! que muestra la extensión Autorize, las peticiones marcadas como Bypassed deberemos revisarlas para ver si contienen información sensible. De ser así, significará que un usuario con menos privilegios puede acceder a esta información. Incluso una persona sin tener una sesión podría acceder a esta información.
{: style="text-align: justify;"}

Un saludo!