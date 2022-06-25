---
title: "OSCP – Mi experiencia y consejos"
author: Adan Alvarez
classes: wide
excerpt: "El blog ha tenido poca actividad durante esto últimos meses debido a que he estado trabajando en la certificación Offensive Security Certified Professional (OSCP) de Offensive Security."
categories:
  - Certificaciones
tags:
  - Red Team
  - Pentest
  - OSCP
---
El blog ha tenido poca actividad durante esto últimos meses debido a que he estado trabajando en la certificación Offensive Security Certified Professional (OSCP) de [Offensive Security](https://www.offensive-security.com/).
{: style="text-align: justify;"}

Por lo tanto, en esta entrada explicaré mi experiencia e intentaré dejar algunos consejos para aquellos que estáis tratando de obtener esta certificación o tengáis pensado obtenerla en un futuro. De todos modos, como esta entrada podréis encontrar cientos en Internet ya que no está permitido entrar en detalle de la certificación.
{: style="text-align: justify;"}

Para los que no conozcáis esta certificación, esta es muy práctica y pretende ser una introducción al pentesting. Pese a que es una introducción al pentesting, esto no quiere decir que sea una certificación fácil.  Para esta certificación tendremos que realizar el curso oficial: «[Penetration Testing Training with Kali Linux»](https://www.offensive-security.com/information-security-training/penetration-testing-training-kali-linux/)  En este se nos proporcionarán materiales para aprender, entre otras cosas, como realizar [escaneos, buffer overflows, ataques web, escalada de privilegios etc..](https://www.offensive-security.com/documentation/penetration-testing-with-kali.pdf)
{: style="text-align: justify;"}

Lo mas importante de este curso es que va acompañado de acceso a un laboratorio en el cuál podremos practicar todo lo aprendido y así preparar el examen.
{: style="text-align: justify;"}

Esta es una muy buena certificación que te permite aprender mucho pero requiere mucha dedicación, especialmente si no se tienen conocimientos previos. El laboratorio no está guiado, es decir, si no sabes como continuar con una máquina lo que debes hacer es «Try harder» y esta es la razón por la que se acaba aprendiendo mucho pero por la que también se requiere de una dedicación muy alta.
{: style="text-align: justify;"}

[![OSCP try harder](https://donttouchmy.net/wp-content/uploads/2019/08/offsec-say-tryharder-798x284-300x107.png)](https://donttouchmy.net/wp-content/uploads/2019/08/offsec-say-tryharder-798x284.png)

Los que estéis pensando en esta certificación para aprender sobre pentesting, tenéis que tener en cuenta que vais a necesitar de muchas horas diarias de práctica y de investigación pues pese a que el curso tiene buenos materiales, estos solo nos dan la base para que nosotros sigamos investigando más técnicas y mejorándolas.
{: style="text-align: justify;"}

Es muy importante que vayamos tomando nuestras notas según avanzamos en el laboratorio y sobre todo, no estresarnos si en el laboratorio no avanzamos tan bien como creíamos. Durante esta certificación es fácil estresarse y pensar que no vamos a poder conseguirla pero lo importante es la constancia. Con constancia es posible pasar esta certificación.
{: style="text-align: justify;"}

Hay muchos recursos en Internet que nos ayudarán en pentesting en general y en esta certificación. Entre ellos recomiendo los siguientes:
{: style="text-align: justify;"}

Automatización de escaneos: <https://github.com/21y4d/nmapAutomator>

Escalada de privilegios:

-   Windows: <http://www.fuzzysecurity.com/tutorials/16.html> y <https://www.absolomb.com/2018-01-26-Windows-Privilege-Escalation-Guide/> y script para máquinas sin powershell: Powerless: <https://github.com/M4ximuss/Powerless>

-   Linux: <https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation>/, script para enumerar: <https://github.com/rebootuser/LinEnum/blob/master/LinEnum.sh>

Buffer Overflow: Descargar máquina de: <https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/> práctica: <https://www.vortex.id.au/2017/05/pwkoscp-stack-buffer-overflow-practice/>

Posiblemente el mejor repositorio de recursos para el OSCP: <https://github.com/rewardone/OSCPRepo>

Además de estos recursos, es interesante leer soluciones a retos [CTF ](https://donttouchmy.net/tag/ctf/)y para poder practicar sin acceso al laboratorio recomiendo [Hack The Box](http://www.hackthebox.eu/). En [Internet](https://www.reddit.com/r/oscp/comments/alf4nf/oscp_like_boxes_on_hack_the_box_credit_tj_null_on/) podremos encontrar qué máquinas de Hack The Box son similares a las que podemos encontrar en el laboratorio.

Espero que estos pequeños consejos sean de utilidad.