---
title: "ATT&CK para AWS"
author: Adan Alvarez
classes: wide
excerpt: "En esta entrada vamos a ver como la matriz de MITRE ATT&CK para AWS puede ayudarnos a representar mejor nuestra capacidad de detección."
categories:
  - AWS
tags:
  - Red Team
  - MITRE ATT&CK
---
En esta entrada vamos a ver como la matriz de MITRE ATT&CK para AWS puede ayudarnos a representar mejor nuestra capacidad de detección.
{: style="text-align: justify;"}

Como también pasa en las infraestructuras clásicas, la prevención está muy bien y es fundamental pero la detección se ha convertido en algo esencial. Hemos asumido ya que tenemos que orientar nuestra defensa no solo a prevenir sino a detectar y además debemos presuponer que nuestra infraestructura en un momento u otro será comprometida.
{: style="text-align: justify;"}

Es por esto que teniendo en mente este foco de detección uno de los frameworks que más nos pueden ayudar a decidir qué tenemos que detectar, como vimos en la pasada entrada [MITRE ATT&CK, defiende teniendo en cuenta las tácticas y técnicas del adversario](https://donttouchmy.net/mitre-attck-defiende-teniendo-en-cuenta-las-tacticas-y-tecnicas-del-adversario/), es [MITRE ATT&CK](https://attack.mitre.org/).
{: style="text-align: justify;"}

Como MITRE ATT&CK se basa en observaciones reales podemos usar esta matriz para evaluar nuestra seguridad actual. Esto lo podemos hacer asignando un nivel de madurez a cada una de las técnicas y verificando para cada una de ellas en que nivel de madurez se encuentra nuestra infraestructura. [John Hubbard](https://twitter.com/SecHubb) presentó en el SANS Summit los siguientes niveles de madurez:
{: style="text-align: justify;"}

1\. No hay detección\
2\. Registrado localmente\
3\. Registrado centralmente\
4\. Registro enriquecido / correlacionado\
5\. Reporte / Visualización\
6\. Experimental / Detección funcional\
7\. Detección de alta fidelidad

Podemos asignar un color a cada uno de estos niveles y usar ATT&CK Navigator para colorear cada una de las técnicas y obtener una visión global de nuestro estado actual.
{: style="text-align: justify;"}

[![ATT&CK para AWS](https://donttouchmy.net/wp-content/uploads/2020/08/attack-navigator-300x116.png)](https://donttouchmy.net/wp-content/uploads/2020/08/attack-navigator.png)

Conforme mejoremos podremos ir cambiando los niveles de madurez y lograremos observar de forma sencilla como nuestro esfuerzo tiene recompensa. Dentro de lo posible se recomienda la automatización de algunas de las pruebas para poder verificar más fácilmente nuestro estado de madurez.
{: style="text-align: justify;"}

El uso de esta matriz coloreada con nuestro nivel de madurez es una manera fácil de poder presentar a otros equipos nuestro estado actual y nuestra evolución.
{: style="text-align: justify;"}

Por último, si trabajar con ATT&CK Navigator no os es del todo cómodo hemos creado el siguiente Google Sheet que nos permite seleccionar nuestro estado de madurez para cada una de las técnicas y la matriz principal se coloreará de forma automática:
{: style="text-align: justify;"}

<https://docs.google.com/spreadsheets/d/1h9G0Jc4u8TnMPTmS22rtTjqsd0Td7CwYYE-6le1QXiw>

La versión del enlace está en modo solo lectura, para poder editarlo es necesario realizar una copia (Archivo -- Hacer una copia)
{: style="text-align: justify;"}

Esperamos que os sea de utilidad y en próximas entradas seguiremos trabajando con MITRE ATT&CK y con AWS.
{: style="text-align: justify;"}
