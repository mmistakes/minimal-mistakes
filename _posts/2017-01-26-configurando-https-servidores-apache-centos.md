---
title: "Configurando HTTPS en servidores Apache en CentOS"
author: Adan Alvarez
classes: wide
excerpt: "En este post se explica de forma breve como configurar HTTPS en un servidor Apache de forma gratuita gracias a Let’s Encrypt."
categories:
  - Web
tags:
  - Securización
  - Blue Team
---
El cifrado de las comunicaciones es imprescindible para evitar que nadie pueda ver los datos que se envían entre cliente y servidor, especialmente si entre estos datos se envía información sensible como contraseñas.  Por esto, en este post se explica de forma breve como configurar HTTPS en un servidor Apache de forma gratuita gracias a [Let's Encrypt](https://letsencrypt.org/).
{: style="text-align: justify;"}

En primer lugar vamos a ver que es una autoridad de certificación(Certification Authority o CA) y un certificado digital. Una autoridad de certificación es un entidad de confianza que emite y revoca certificados digitales, estos certificados son reconocidos por los navegadores web u otros clientes/servicios y se usan para verificar la identidad del servicio o del recurso consultado.  Estas son un elemento básico en una [infraestructura de clave pública](https://es.wikipedia.org/wiki/Infraestructura_de_clave_p%C3%BAblica) o  PKI ya que aseguran que la clave pública de un usuario es realmente suya.
{: style="text-align: justify;"}

Tras esta introducción vamos a pasar a generar los certificados digitales que después configuraremos en el servidor. Para esto usaremos el cliente recomendado por Let's Encrypt [certbot](https://certbot.eff.org/).
{: style="text-align: justify;"}

Para CentOS , debido a que algunas dependencias de certbot no están disponibles en los repositorios estándar, deberemos habilitar el repositorio EPEL:
{: style="text-align: justify;"}
```
yum install epel-release
```
Descargamos certbot-auto:
```
wget https://dl.eff.org/certbot-auto
```
Damos permisos de ejecución:
```
chmod a+x certbot-auto
```
Solicitamos los certificados, en este ejemplo utilizamos el plugin webroot indicando el directorio root desde el cual se sirven los ficheros de nuestro servidor web (/var/www/html) y solicitamos un certificado para los dominios: dominio.com y www.dominio.com.
{: style="text-align: justify;"}
```
./path/to/certbot-auto certonly --webroot -w /var/www/html/ -d dominio.com -d www.dominio.com
```
Utilizando el plugin webroot no se parará el servidor web y seremos nosotros los encargados de modificar los ficheros para aplicar la configuración y reiniciar el servidor. certbot-auto ofrece una serie de [plugins](https://certbot.eff.org/docs/using.html?highlight=plugins) que son capaces de modificar la configuración y realizar el reinicio de forma automática.
{: style="text-align: justify;"}

Una vez obtenidos los certificados los tendremos que configurar en nuestro servidor web. El servidor Apache deberá tener instalado el módulo mod_ssl. Para instalarlo ejecutamos:
{: style="text-align: justify;"}
```
yum install mod_ssl
```
Procedemos a editar el fichero /etc/httpd/conf.d/ssl.conf para añadir los certificados:
```
SSLCertificateFile /etc/letsencrypt/live/dominio.com/cert.pem

SSLCertificateKeyFile /etc/letsencrypt/live/dominio.com/privkey.pem

SSLCertificateChainFile /etc/letsencrypt/live/dominio.com/chain.pem
```
Además, recomiendo aplicar la siguiente configuración para poder conseguir una cualificación de «A» en el [Test SSL de Qualys](https://www.ssllabs.com/ssltest/)
```
SSLProtocol ALL -SSLv2 -SSLv3

SSLHonorCipherOrder On

SSLCipherSuite ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS
```
Una vez aplicados estos cambios podremos reiniciar el servidor web y tendremos HTTPS funcionando. Si queremos que todo el tráfico hacia nuestra web pase a ser HTTPS  podemos añadir la siguiente regla en el virtualhost que recibe las peticiones HTTP:
{: style="text-align: justify;"}
```
RewriteEngine On
RewriteCond %{HTTPS} !on
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
```
Por último, los certificados de Let's Encrypt tienen una caducidad de 90 días por lo que es interesante automatizar su renovación. Podemos añadir una cron mensual que llame a certbot-auto con los parámetros renew y --quiet:
{: style="text-align: justify;"}
```
./path/to/certbot-auto renew --quiet
```
Y después de esto reiniciar el servidor web para que los cambios surjan efecto.
{: style="text-align: justify;"}

![HTTPS URL](https://donttouchmy.net/wp-content/uploads/2016/06/https.png)

Gracias a Let's Encrypt ya no tenemos escusa para que todos los servidores web utilicen HTTPS.