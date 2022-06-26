---
title: "Writeup – The Vault (SwampCTF 2018) – Crack SHA256"
author: Adan Alvarez
classes: wide
excerpt: "El pasado día 23 de noviembre se celebró en laSalle Barcelona el XI OWASP Spain Chapter Meeting. Un evento de seguridad gratuito y abierto que se celebra desde 2006 y cuenta con grandes profesionales del sector."
categories:
  - Conferencias
tags:
  - OWASP
  - IoT
  - Aplicaciones móviles
  - AST
---
El pasado día 23 de noviembre se celebró en laSalle Barcelona el [XI OWASP Spain Chapter Meeting](https://www.owasp.org/index.php/Spain/Chapter_Meeting). Un evento de seguridad gratuito y abierto que se celebra desde 2006 y cuenta con grandes profesionales del sector.
{: style="text-align: justify;"}

La mañana comenzó con una bienvenida y una introducción a las jornadas por parte de los organizadores.

Tras esto comenzaron las conferencias:

#### Atacando aplicaciones NodeJS

[![SeguridadNodeJS](https://donttouchmy.net/wp-content/uploads/2017/12/68747470733a2f2f6e6f64656a732e6f72672f7374617469632f696d616765732f6c6f676f732f6e6f64656a732e706e67-300x161.png)](https://donttouchmy.net/wp-content/uploads/2017/12/68747470733a2f2f6e6f64656a732e6f72672f7374617469632f696d616765732f6c6f676f732f6e6f64656a732e706e67.png)

Michael Hidalgo Fallas nos explicó como NodeJS  ha sido adoptado por los gigantes de la tecnología debido a su eficiencia, ya que es asíncrono y basado en eventos.
{: style="text-align: justify;"}

Pese a su potencia NodeJS tiene los mismos problemas de seguridad que el resto de lenguajes de programación y está afectado por las vulnerabilidades del [top 10 de OWASP](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf).
{: style="text-align: justify;"}

En muchos casos NodeJS trata con bases de datos NoSQL y por los tanto nos encontramos, cuando no se realiza una correcta sanitización de las entradas de datos, con inyecciones de código NoSQL.
{: style="text-align: justify;"}

Si tenemos una consulta NoSQL como la siguiente:
```
db.accounts.find({username: username, password: password});
```
Podemos introducir en el campo password:
```
{$gt: ""}
```
En MongoDB $gt selecciona todos los documentos donde el valor es más grande que el valor especificado, en este caso vacío, por lo que devolverá siempre true.
{: style="text-align: justify;"}

Además, como se trata de código js del lado de servidor,  cuando se utilizan las funciones eval(), setTimeout(), setInterval(), Function() para procesar entradas del usuario, pueden ser utilizadas para ejecutar código en el servidor.
{: style="text-align: justify;"}

Por ejemplo, si el usuario es capaz de enviar while(1) a la función eval(), el servidor utilizará el 100% de la CPU.  Si en lugar de while(1) se enviara:
```
res.end(require('fs').readdirSync('.').toString())
```
El atacante podría leer los archivos del directorio actual.
{: style="text-align: justify;"}

Igualmente,  encontramos problemas que no están relacionados con el top 10 de OWASP, en este caso se encuentran en el uso del gestor de paquetes de NodeJS [NPM](https://www.npmjs.com/).
{: style="text-align: justify;"}

El uso de NPM crea una gran dependencia del código en terceros y esto genera en algunos [casos problemas](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/), ya que si un tercero desea eliminar un paquete, esto ocasionará que muchos otros dejen de funcionar.
{: style="text-align: justify;"}

NPM ha llevado a la reutilización del código a su máximo esplendor ya que podemos encontrar paquetes con tan sólo 3 líneas de código. Esto está siendo utilizado por los atacantes para [añadir código malicioso](https://www.csoonline.com/article/3214624/security/malicious-code-in-the-node-js-npm-registry-shakes-open-source-trust-model.html), creando paquetes con nombres muy similares (typosquatting) para que sean instalados por error por los desarrolladores.
{: style="text-align: justify;"}

De todos modos, se están añadiendo controles para evitar que estos paquetes acaben en NPM. También existe [NSP](https://github.com/nodesecurity/nsp), una herramienta de línea de comando que nos ayuda a mantener nuestras aplicaciones NodeJS seguras auditando nuestras dependencias y mostrándonos las dependencias con vulnerabilidades.
{: style="text-align: justify;"}

#### Superficie de ataque en un dispositivo IoT según OWASP Internet of Things Project

[![](https://donttouchmy.net/wp-content/uploads/2017/12/Internet-of-Things-IoT-300x169.jpg)](https://donttouchmy.net/wp-content/uploads/2017/12/Internet-of-Things-IoT.jpg)

En esta charla [Miguel Ángel Arroyo Moreno](http://www.twitter.com/miguel_arroyo76) nos habló sobre la metodología a utilizar para evaluar dispositivos IoT.
{: style="text-align: justify;"}

En la actualidad, cada vez son más los dispositivos conectados a Internet, desde cámaras IPs, televisiones, neveras a consoladores o condones inteligentes.
{: style="text-align: justify;"}

Los dispositivos conectados a Internet ya están aquí y parece que la seguridad en ellos, en muchos casos, brilla por su ausencia.
{: style="text-align: justify;"}

Cuando hablamos de IoT y de su seguridad, lo primero que pensamos es en ir a [Shodan](https://www.shodan.io/) a buscar un dispositivo y ver si tiene claves por defecto o algún problema de seguridad en la autenticación.
{: style="text-align: justify;"}

El problema es que eso es solo uno de los posibles escenarios de ataque y para poder realizar una correcta evaluación, debemos tenerlos todos en cuenta.
{: style="text-align: justify;"}

Dentro de OWASP, existe un proyecto centrado en la seguridad de este tipo de dispositivos. [OWASP IoT](https://www.owasp.org/index.php/OWASP_Internet_of_Things_Project) En el cual se nos explican las diferentes áreas de ataque:

-   Ecosystem
-   Device Memory
-   Device Physical Interfaces
-   Device Web Interface
-   Device Firmware
-   Device Network Services
-   Administrative Interface
-   Local Data Storage
-   Cloud Web Interface
-   Third-party Backend APIs
-   Update Mechanism
-   Mobile Application
-   Vendor Backend APIs
-   Ecosystem Communication
-   Network Traffic
-   Authentication/Authorization
-   Privacy
-   Hardware

#### Protection and Verification of Business Logic Flaws

[Roberto Velasco Sarasola](http://www.twitter.com/hdivroberto) nos habló en esta conferencia sobre Business Logic Flaws.

Los problemas de seguridad según Roberto los podemos organizarnos en 2 tipos: security bugs o bugs de sintaxis y Business Logic Flaws, conocidos también como Design Flaws. El primer tipo de riesgo está basado en bugs de programación que pueden ser detectados, en la mayoría de los casos, mediante herramientas AST (Application Security Testing) de forma automática. A pesar de esta ventaja, el resto de los problemas que podemos englobar dentro de la categoría de Business Logic Flaws que representan según Roberto aproximadamente el otro 50% del problema, no pueden ser detectados por las soluciones AST.
{: style="text-align: justify;"}

Actualmente nos encontramos que para mitigar la ausencia de herramientas AST se utilizan WAF que mediante aprendizaje intentan parar este tipo de ataques, el problema es que estos generan una gran cantidad de falsos positivos, especialmente si se lanzan nuevas funcionalidades o cambios en la aplicación.
{: style="text-align: justify;"}

Esto provoca que estos problema solo se puedan analizar de forma manual y esto choca con un gran problema, el time to market. Este cada vez debe ser mas pequeño y no puede depender de una revisión manual.
{: style="text-align: justify;"}

Dentro de los Business Logic Flaws encontramos ataques que:

**Manipulan el contrato**: Se añaden, modifican o eliminan campos de la petición.

**Abusan del contrato**: Respetan la petición pero hacen un uso malicioso de esta, rompiendo los flujos de tiempo para romper la lógica.

Para estos ataques Roberto nos presentó la herramienta [Hdiv](https://github.com/hdiv/hdiv).

Hdiv es una solución que se integra en la propia aplicación desde el momento del desarrollo y nos ayuda a proteger la aplicación de los ataques contra la lógica de negocio añadiendo un filtro a las peticiones.
{: style="text-align: justify;"}

Si tenemos por ejemplo una aplicación con un desplegable, si el usuario cambia uno de los valores y los envía, Hdiv bloqueará la petición al recibir un valor que no estaba dentro de los valores a escoger.
{: style="text-align: justify;"}

Este filtro no será 100% efectivo ya que las cajas de text libre y los ataques relacionados con estados de tiempo serán difíciles de parar, pero por esto Hdiv nos ofrece un plugin para burp que ayudará a los pentesters a detectar aquellos campos y peticiones que Hdiv no puede asegurar.
{: style="text-align: justify;"}

#### Protección de la Identidad Digital

![](https://educainternet.es/pictures/9718.jpeg)

En esta presentación [Selva Orejón](https://twitter.com/selvaorejon) realizó una presentación diferente al resto, nos alejamos de las vulnerabilidades web para hablar sobre nuestra identidad digital y su importancia.
{: style="text-align: justify;"}

Comenzamos con una simple pregunta, ¿cuántos de nosotros hemos buscado en Internet por nuestra matrícula?

Si lo hiciéramos, posiblemente,  descubriríamos mucha información que no sabíamos que estaba publicada, igual que si buscamos por nuestra foto o nuestro nombre.
{: style="text-align: justify;"}

Tenemos que estar concienciados de la información que publicamos y no solo debemos estarlo nosotros, también nuestros familiares y nuestros amigos.
{: style="text-align: justify;"}

Si no lo estamos, podremos acabar dañando nuestra reputación personal y  profesional y la reputación de la organización para la cual trabajamos.

En esta presentación se nombraron algunas herramientas como [carrot2](http://search.carrot2.org/stable/search) o [stalkface](https://stalkface.com/) para buscar qué tenemos disponible en la red o [Virtualsim](http://www.virtualsimapp.com/index.php) para crear números de teléfonos y no utilizar nuestro número privado. También se nombraron [mention](https://mention.com/es/) o las alertas de Google para detectar contenido que nos pueda interesar.
{: style="text-align: justify;"}

#### Utilización de Telegram por parte de Daesh

[![telegram](https://donttouchmy.net/wp-content/uploads/2017/12/telegram-300x214.jpg)](https://donttouchmy.net/wp-content/uploads/2017/12/telegram.jpg)

En esta presentación, también alejada de las vulnerabilidades web, Carlos Seisdedos, nos dió a conocer algunas de las causas que han motivado el uso de Telegram por parte de organizaciones yihadistas.
{: style="text-align: justify;"}

En primer lugar, Ciberyihadismo y yihadismo se diferencian por los medios que utilizan para crear el terror.

Actualmente se conocen tres ramas dentro del Ciberyihadismo:
{: style="text-align: justify;"}

**United ciber calipahte:**  Es la unión de diferentes grupos de ciberterroristas yihadistas y publican, en la mayoría de casos, defaces y hacking de bajo nivel. Su objetivo es hacer daño a empresas para salir en los medios de comunicación. Es común ver defaces de páginas webs irrelevantes ya que para poder formar parte de ellos piden que sus miembros presenten 3 webs hackeadas por ellos.\
**Agencias oficiales de DAESH:** Son los encargados oficiales de la publicidad y quieren hacer ver  lo bien que se vive en el califato y mostrar ataques terroristas. Su principal objetivo es que la gente que vea estos vídeos acabe uniéndose a ellos.\
**Fanboys:** Debido a la falta de capacidad, estos grupos ciberterroristas no pueden tener una jerarquía directa controlada por células terroristas. Por lo tanto, se forman grupos de personas afines que por su cuenta difunden el contenido de los canales oficiales del DAESH.
{: style="text-align: justify;"}

En la actualidad, Facebook, Twitter y Youtube están utilizando IA para deshabilitar y eliminar cuentas con contenido yihadista. En cambio, esto es más difícil de realizar con Telegram debido al uso de alias por parte de los usuarios.
{: style="text-align: justify;"}

Telegram cuenta con funciones de canales, grupos y supergrupos y se utilizan backups de los canales para evitar perder contenido. Cuando se crea un canal, se crean varios de backup que reciben la información pero no están públicos, cuando el canal principal es cerrado, se activa uno de los canales de backup y se informa de esto a los usuarios por otros canales. Estos nuevos grupos pueden estar abiertos solo por un tiempo o por invitación.
{: style="text-align: justify;"}

Existen multitud de canales y grupos con todo tipo de contenido, religiosos, cánticos, grupos solo para chicas, grupos con códigos para activar Telegram, grupos para aprender ingles, grupos con información de cómo crear terror , fabricación de explosivos etc...
{: style="text-align: justify;"}

Además, se difunde mucha información falsa e información creada por las agencias oficiales con el objetivo de reclutar más gente y de llamar a la acción a los llamados lobos solitarios.
{: style="text-align: justify;"}

#### Experiencias en pentest de Aplicaciones móviles bancarias usando OWASP MASVS

[![](https://donttouchmy.net/wp-content/uploads/2017/12/mobile-security-300x225.jpg)](https://donttouchmy.net/wp-content/uploads/2017/12/mobile-security.jpg)

Tras las dos conferencias no relacionadas con seguridad en el software, volvemos al software, en este caso a la seguridad en aplicaciones móviles. Luis Alberto Solís nos explicó su experiencia en el pentest de diversas aplicaciones móviles bancarias utilizando OWASP [Mobile Application Security Verification Standard](https://github.com/OWASP/owasp-masvs).
{: style="text-align: justify;"}

El MASVS define dos niveles estrictos de verificación de seguridad (L1 y L2), así como un nivel flexible con un conjunto de requisitos para proteger nuestra aplicación contra ingeniería inversa (MASVS-R).
{: style="text-align: justify;"}

![Capas MASVS](https://github.com/OWASP/owasp-masvs/raw/master/Document/images/masvs-levels-new.jpg)

**MASVS-L1**: Seguridad estándar

Una aplicación móvil que logra MASVS-L1 se adhiere a las mejores prácticas de seguridad de aplicaciones móviles. Cumple con los requisitos básicos en términos de calidad de código, manejo de datos confidenciales e interacción con el entorno móvil.
{: style="text-align: justify;"}

**MASVS-L2**: defensa en profundidad

Presenta controles de seguridad avanzados que van más allá de los requisitos estándar. Para cumplir con L2, debe existir un modelo de amenaza y la seguridad debe ser una parte integral de la arquitectura y el diseño de la aplicación.
{: style="text-align: justify;"}

**MASVS-R**: Resistencia contra ingeniería inversa y manipulación

La aplicación cuenta con seguridad de última generación y también es resistente a ataques específicos y claramente definidos del lado del cliente, como alteración, modding o ingeniería inversa para extraer código o datos confidenciales. Dicha aplicación aprovecha las características de seguridad del hardware o las técnicas de protección de software suficientemente fuertes y verificables.
{: style="text-align: justify;"}

MASVS cuenta con 8 requerimientos:

-   V1: Architecture, Design and Threat Modeling Requirements
-   V2: Data Storage and Privacy Requirements
-   V3: Cryptography Requirements
-   V4: Authentication and Session Management Requirements
-   V5: Network Communication Requirements
-   V6: Environmental Interaction Requirements
-   V7: Code Quality and Build Setting Requirements
-   V8: Resiliency Against Reverse Engineering Requirements

En cada uno de los requerimientos encontramos diversos controles según el nivel que queramos cumplir, hasta un total de 74 controles. La [Mobile App Security Checklist](https://www.owasp.org/images/6/6f/Mobile_App_Security_Checklist_0.9.2.xlsx) nos proporciona un documento excel con un checklist de cada uno de estos controles que nos será útil en casos de auditorias a aplicaciones móviles.
{: style="text-align: justify;"}

Para poder realizar la verificación de cada uno de estos controles OWASP ofrece la [OWASP Mobile Security Testing Guide](https://github.com/OWASP/owasp-mstg). Que es un manual que nos explicará con herramientas como probar aplicaciones móviles y hacer ingeniería inversa.
{: style="text-align: justify;"}

Durante la presentación se vieron varias pruebas con [herramientas](https://donttouchmy.net/herramientas/) como [FRIDA](https://www.frida.re/) y se nos explicó como siguiendo esta guía se localizaron varios problemas en las aplicaciones bancarias de grandes bancos.
{: style="text-align: justify;"}

#### Internet of Things, Smart Cities y otras vulnerabilidades

[![PrivacidadIoT](https://donttouchmy.net/wp-content/uploads/2017/12/PP63826-300x214.png)](https://donttouchmy.net/wp-content/uploads/2017/12/PP63826.png)

Para acabar la jornada, [Luis Enrique Benítez](https://www.linkedin.com/in/luisbenitezj), nos habló de nuevo sobre seguridad en dispositivos IoT.
{: style="text-align: justify;"}

Como en la presentación de Miguel Ángel Arroyo, volvemos a ver como IoT está por todos lados y además cuando esto sale a la ciudad a gran escala pasamos de llamarlo Internet of Things a Smart Cities.
{: style="text-align: justify;"}

El problema al que nos enfrentamos es que todos los fabricantes de cualquier tipo de objeto parecen querer sacar sus productos conectados a Internet. Podemos ver cepillos eléctricos, lavadoras, coches, juguetes infantiles o juguetes para adultos que se conectan a Internet y los fabricantes no siempre tienen la seguridad como uno de sus factores prioritarios. Pero además ya no solo hablamos de seguridad, hablamos de nuestra privacidad.
{: style="text-align: justify;"}

A día de hoy, no es extraño tener una Smart TV en casa, si se analiza el tráfico saliente de la Smart TV se puede comprobar como en mucho casos, cada 5 segundos, se envía información sobre el orden de los canales, que canal estamos visualizando, cuales son nuestros favoritos etc... en resumen, nos están vigilando.
{: style="text-align: justify;"}

En muchos casos, estos dispositivos no pueden ser configurados. Por lo tanto, no podemos añadir un proxy para analizar el tráfico entre el dispositivo y el servidor.  La solución que nos propone Luis es la compra de un dispositivo [MikroTik](https://mikrotik.com/).
{: style="text-align: justify;"}

Con un MikroTik, podemos configurar una regla de firewall para que todo el tráfico del dispositivo se envíe a nuestro equipo donde tendremos un proxy como Burp trabajando en modo invisible. Así seremos capaces de interceptar todo el tráfico sin que el dispositivo lo detecte.
{: style="text-align: justify;"}

La conclusión de Luis tras analizar varios dispositivos es que no hay concienciación, si se reportan fallos la gente se enfada en lugar de corregirlos, y no hay privacidad, todos estos dispositivos recogen toda la información posible sobre el usuario y la envían a sus compañías.
{: style="text-align: justify;"}

Con esta última conferencia se dio fin a una gran jornada de seguridad que entre otras cosas, nos volvió a enseñar el gran aporte de OWASP al mundo de la seguridad informática.
{: style="text-align: justify;"}
