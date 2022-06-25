---
title: "Adversary Emulation Library publicada por Mitre"
author: Adan Alvarez
classes: wide
excerpt: "A principios de este mes MITRE Engenuity’s Center for Threat-Informed Defense hizo pública una de sus grandes iniciativas en el mundo de la cyberseguridad, la Adversary Emulation Library, una librería pública donde compartirán planes para la simulación de adversarios."
categories:
  - MITRE ATT&CK
tags:
  - Threat Hunting
  - Fin6
  - MITRE ATT&CK
  - Purple Team
  - Adversary Emulation
---
A principios de este mes [MITRE Engenuity's Center for Threat-Informed Defense](https://mitre-engenuity.org/center-for-threat-informed-defense/) hizo pública una de sus grandes iniciativas en el mundo de la cyberseguridad, la Adversary Emulation Library, una librería pública donde compartirán planes para la simulación de adversarios.
{: style="text-align: justify;"}

Podéis acceder a ella mediante el siguiente enlace: <https://github.com/center-for-threat-informed-defense/adversary_emulation_library>
{: style="text-align: justify;"}

Esta nueva contribución por parte de Mitre servirá para ayudar sobre todo a equipos de Red Team y Purple Team a realizar pruebas a las defensas basándose en tácticas, técnicas y procedimientos del mundo real.
{: style="text-align: justify;"}

Cada plan se centrará en un grupo con nombre específico.  Todos ellos tendrán varios ficheros de texto en formato Markdown donde se indicará toda la información disponible como una descripción del grupo, cuáles son sus objetivos, qué tipo de industrias atacan, qué técnicas y malware utilizan etc... Además, toda esta información irá relacionada con [ATT&CK.](https://donttouchmy.net/mitre-attck-defiende-teniendo-en-cuenta-las-tacticas-y-tecnicas-del-adversario/)
{: style="text-align: justify;"}

Para cada grupo también se presentará un diagrama de flujo que dará un sumario a alto nivel del escenario. Estos diagramas mostrarán como los adversarios acceden y todo lo que hacen hasta lograr su objetivo. Este es el ejemplo para FIN6:
{: style="text-align: justify;"}

[![Adversary Emulation Library](https://donttouchmy.net/wp-content/uploads/2020/09/flow-212x300.png)](https://donttouchmy.net/wp-content/uploads/2020/09/flow.png)

Además de esta información, una de las secciones más importantes es la que permitirá replicar los procedimientos seguidos por los atacantes. Dando información tanto para poder reproducir el escenario de forma manual comando a comando o para que podamos automatizarlo mediante, por ejemplo [CALDERA](https://github.com/mitre/caldera).
{: style="text-align: justify;"}

Estos son ejemplos para FIN6:

[![Adversary Emulation Library](https://donttouchmy.net/wp-content/uploads/2020/09/script-300x172.png)](https://donttouchmy.net/wp-content/uploads/2020/09/script.png)

En la captura podemos ver como se indica qué comandos ejecutaron los miembros de FIN6 para poderlos reproducir y además un comando alternativo.
{: style="text-align: justify;"}

Toda esta información se dividirá de la siguiente forma en el repositorio de GitHub:
{: style="text-align: justify;"}

**Carpeta Attack_Layers**: contendrá múltiples imágenes en formato PNG de exportaciones de MITRE ATT&CK Navigator de Software y TTPs que se encontraron en la fase de Threat Intelillence.
{: style="text-align: justify;"}

**Carpeta Emulation_Plan**: contendrá todos los plantes de emulación. Tanto los planes como los scripts se encuentran en este directorio. Además, también encontraremos un diagrama de flujo de operaciones.
{: style="text-align: justify;"}

**Intelligence_Summary.md**: Resumen de inteligencia explicando detalladamente como se realiza el acceso inicial, movimientos laterales, elevación de privilegios, herramientas utilizadas etc. Toda la información además tiene referencias a [MITRE ATT&CK](https://donttouchmy.net/mitre-attck-defiende-teniendo-en-cuenta-las-tacticas-y-tecnicas-del-adversario/)
{: style="text-align: justify;"}

**Operations_Flow.md**: Aquí encontraremos una representación visual del flujo de operaciones y descripciones de cada fase.
{: style="text-align: justify;"}

En estos momentos la Adversary Emulation Library cuenta con información de FIN6, un grupo con las siguientes características:
{: style="text-align: justify;"}

-   Activos desde al menos 2015
-   Tiene una motivación financiera.
-   Objetivos: e-commerce y empresas multinacionales
-   La mayoría de las empresas objetivo ubicadas en Europa y Estados Unidos.
-   El acceso inicial lo obtienen mediante credenciales comprometidas a servicios de acceso remoto y spearphishing.
-   Sus objetivos principales son Puntos de Venta o inyecciones en e-commerce pero últimamente también han desplegado ransomware.
-   Se les atribuye al menos 11 programas únicos.
{: style="text-align: justify;"}

Sin duda, esta aportación por parte de Mitre será de gran ayuda. Os recomendamos que accedáis al [GitHub](https://github.com/center-for-threat-informed-defense/adversary_emulation_library) y comprobéis vosotros mismos toda la información que hay disponible en este. Además, AttackIQ ha lanzado un [curso gratuito](https://academy.attackiq.com/learn/course/intro-to-fin6-emulation-plans/next-steps-final-assessment/final-assessment) para guiarnos en este nuevo repositorio.
{: style="text-align: justify;"}
