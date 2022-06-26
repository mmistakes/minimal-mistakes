---
title: "Ingeniería social: Phishing con Gophish"
author: Adan Alvarez
classes: wide
excerpt: "Gophish es una herramienta para lanzar campañas de phishing de forma sencilla. Nos permite crear un correo de phishing y una página web dónde pedir credenciales."
categories:
  - Herramientas
tags:
  - Phishing
  - Red Team
---
El phishing, dentro de los ataques de ingeniería social, es uno de los ataques más utilizados a día de hoy cuando se intenta comprometer la seguridad de una empresa. De nada sirve tener todos los sistemas actualizados, un gran equipo de seguridad y gastar miles de euros en seguridad si los empleados de una empresa no están concienciados y son capaces de facilitar sus datos de acceso a un atacante.
{: style="text-align: justify;"}

La concienciación en seguridad es un aspecto fundamental y es por esto que existen herramientas para ayudar a los equipos de seguridad a concienciar a los empleados, una de estas es [Gophish](https://getgophish.com/).
{: style="text-align: justify;"}

Gophish es una [herramienta](https://donttouchmy.net/herramientas/) para lanzar campañas de phishing de forma sencilla. Nos permite crear un correo de phishing y una página web dónde pedir credenciales. Tras la campaña se obtienen resultados detallados de los usuarios que:
{: style="text-align: justify;"}

-   Abren el correo
-   Hacen clic en el enlace
-   Introducen sus datos

Para que el correo no sea marcado como spam y la campaña de phishing sea lo más parecida posible a un ataque de phishing avanzado, será importante realizar una correcta configuración del servidor de correo activando [SPF, DKIM y DMARC](https://help.sendinblue.com/hc/es/articles/209577385--Para-que-sirven-los-protocolos-SPF-DKIM-y-DMARC-) además de una correcta configuración de la web activando SSL y añadiendo los certificados correctos.
{: style="text-align: justify;"}

Así que desde [Donttouchmy.net](https://donttouchmy.net/) recomendamos utilizar una máquina Ubuntu recién instalada y el script [Postfix-Server-Setup](https://github.com/n0pe-sled/Postfix-Server-Setup), en el cual hemos colaborado, para realizar la instalación de forma rápida y fácil.
{: style="text-align: justify;"}

En primer lugar clonamos el repositorios desde GitHub
```
git clone https://github.com/n0pe-sled/Postfix-Server-Setup
```
Tras esto ejecutamos el script:
```
./ServerSetup.sh
```
y nos aparecerán una serie de opciones. Si hemos escogido una instalación Ubuntu seleccionamos la opción 3 para preconfigurar  el servidor. Esta opción realizará las siguientes acciones:
{: style="text-align: justify;"}

-   Actualizará los repositorios
-   Instalará dependencias
-   Desabilitará nfs-common y rpcbind
-   Deshabilitará IPv6
-   Cambiará el nombre del host
-   **Reiniciará el sistema**.

[![phishing - Opcion 3 GoPhish](https://donttouchmy.net/wp-content/uploads/2017/10/opcion3-300x83.png "Opcion3GoPhish")](https://donttouchmy.net/wp-content/uploads/2017/10/opcion3.png)

Una vez tenemos el sistema preparado podemos configurar SSL utilizando la opción 4.  Esta opción configurará un certificado SSL para nuestro dominio utilizando [Let's Encrypt](https://letsencrypt.org/).
{: style="text-align: justify;"}

[![Phishihg - Opción 4 Gophish](https://donttouchmy.net/wp-content/uploads/2017/10/opcion4-300x106.png)](https://donttouchmy.net/wp-content/uploads/2017/10/opcion4.png)

Tras esto podremos instalar el servidor de correo con la opción 5 y Gophish con la opción 8.  Esta opción finalizará con la configuración del certificado SSL para nuestro servidor de Gophish
{: style="text-align: justify;"}

[![Phishing - Opción 8 Gophish](https://donttouchmy.net/wp-content/uploads/2017/10/opcion8-300x37.png)](https://donttouchmy.net/wp-content/uploads/2017/10/opcion8.png)

Tras instalar Gophish podremos acceder al administrador de Gophish mediante un navegador. El servidor de Gophish estará a la escucha en https://nuestrodominio:3333 y podremos acceder con las credenciales por defecto admin/gophish
{: style="text-align: justify;"}

[![Gophish interfaz web](https://donttouchmy.net/wp-content/uploads/2017/10/GoPhish_Web-300x234.png)](https://donttouchmy.net/wp-content/uploads/2017/10/GoPhish_Web.png)

Podéis encontrar la documentación de Gophish en [GitBook](https://www.gitbook.com/book/gophish/user-guide/details). Además, si no contáis con un dominio podéis adquirir uno de forma gratuita en: [Freenom](http://www.freenom.com/es/index.html?lang=es)
{: style="text-align: justify;"}
