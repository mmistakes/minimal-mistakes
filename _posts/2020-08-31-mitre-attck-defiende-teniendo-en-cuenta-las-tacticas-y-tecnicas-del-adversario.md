---
title: "MITRE ATT&CK, defiende teniendo en cuenta las tácticas y técnicas del adversario"
author: Adan Alvarez
classes: wide
excerpt: "En esta entrada vamos a hablar de una de las bases de conocimiento más importantes que tenemos disponible a día de hoy, MITRE ATT&CK."
categories:
  - MITRE ATT&CK
tags:
  - Red Team
  - Purple Team
  - MITRE ATT&CK
  - Blue Team
---
En esta entrada vamos a hablar de una de las bases de conocimiento más importantes que tenemos disponible a día de hoy, MITRE ATT&CK.
{: style="text-align: justify;"}

MITRE ATT&CK es una base de conocimiento [accesible a nivel mundial](https://attack.mitre.org/) de tácticas y técnicas usadas por adversarios basadas en observaciones del mundo real.
{: style="text-align: justify;"}

Esta base de conocimientos es de gran utilidad tanto para equipos de defensa (blue team) como para equipos de ataque (red team) y es además muy útil para mejorar la colaboración entre estos.
{: style="text-align: justify;"}

El enfoque actual utilizado por muchas empresas para hacer frente a los ciberataques es insuficiente. En la mayoría de casos nos encontramos con empresas que utilizan un sistema antivirus en conjunto con un firewall y alguna herramienta adicional que suelen basarse únicamente en el uso de IOCs (Indicators of Compromise). Los IOC son útiles para detectar y neutralizar amenazas conocidas basadas en firmas simples que buscan un evento en concreto o la repetición del mismo. Estos IOCs, aun necesarios son los encargados de detectar las cosas más comunes, pero no los ataques más complejos. Por ejemplo, ha quedado demostrado en muchos ataques que un atacante con motivación puede evitar las defensas clásicas, por ejemplo, utilizando software legítimo para perpetrar el ataque.
{: style="text-align: justify;"}

Es por esta razón que MITRE ATT&CK está ganando un gran papel en la industria de la ciberseguridad ya que nos ayuda a no trabajar solo con IOCs sino con TTPs (Tactics, Techniques, and Procedures)
{: style="text-align: justify;"}

Los TTPs son descriptivos y caracterizan como un adversario se comporta. Estos no se basan en un único ejemplo específico sino que son el resultado de una observación del comportamiento de diversos adversarios en diversos ataques. Por ejemplo, una táctica de los usuarios puede ser obtener persistencia tras comprometer una red y esto puede realizarse, por ejemplo, mediante la técnica de creación de un trabajo programado (Scheduled job). Es por esto que los TTPs dan muy buenos resultados, ya que al basarse en el comportamiento de los atacantes es muy difícil para estos modificar su forma de trabajar. Esto es lo contrario que sucede con los IOCs que se basan en Hashes, IPs, Nombre de dominio etc... que son fáciles de cambiar. La pirámide del dolor de los APT describe muy bien esto:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2020/08/apt-pyramid-of-pain-300x221.png)](https://donttouchmy.net/wp-content/uploads/2020/08/apt-pyramid-of-pain.png)

En la parte inferior tenemos los elementos más fáciles de cambiar y en lo más alto de la pirámide tenemos lo más difícil de cambiar, que son las tácticas, técnicas y los procedimientos.
{: style="text-align: justify;"}

Una vez hemos visto la importancia y la utilidad de MITRE ATT&CK veamos la matriz para empresas (ATT&CK Matrix for Enterprise). Esta cubre tanto entornos Windows, macOS, Linux y plataformas Cloud.
{: style="text-align: justify;"}

La matriz se divide en 12 columnas. Cada una de las columnas es para una táctica:
{: style="text-align: justify;"}

[![MITRE ATT&CK tácticas](https://donttouchmy.net/wp-content/uploads/2020/08/tacticas1-300x114.png)](https://donttouchmy.net/wp-content/uploads/2020/08/tacticas1.png)

En cada una de las columnas tenemos varias técnicas:
{: style="text-align: justify;"}

[![MITRE ATT&CK técnicas](https://donttouchmy.net/wp-content/uploads/2020/08/tecnicas2-300x114.png)](https://donttouchmy.net/wp-content/uploads/2020/08/tecnicas2.png)

Y en alguna de las técnicas, desde hace poco, tenemos subtécnicas:
{: style="text-align: justify;"}

[![MITRE ATT&CK subtécnicas](https://donttouchmy.net/wp-content/uploads/2020/08/subtecnicas1.png)](https://donttouchmy.net/wp-content/uploads/2020/08/subtecnicas1.png)

Si accedemos a cada una de las técnicas podremos obtener información muy valiosa sobre cada una de ellas como: mitigaciones, formas de detectarla, fuentes de datos útiles, adversarios que han utilizado esta técnica y referencias externas.
{: style="text-align: justify;"}

[![MITRE ATT&CK descripción técnica](https://donttouchmy.net/wp-content/uploads/2020/08/tecnicas3-300x170.png)](https://donttouchmy.net/wp-content/uploads/2020/08/tecnicas3.png)

La matriz, como podréis observar, contiene muchísimas técnicas pero aún así siguen siendo muchas menos que los cientos de miles de IOCs que tenemos a día de hoy. Es importante familiarizarse con cada una de ellas para entender mejor a los posibles adversarios y además presuponer siempre que nuestra infraestructura puede ser comprometida para trabajar en una detección eficaz.
{: style="text-align: justify;"}

En próximas entradas seguiremos profundizando en MITRE ATT&CK y trabajaremos en ejemplos concretos.
{: style="text-align: justify;"}
