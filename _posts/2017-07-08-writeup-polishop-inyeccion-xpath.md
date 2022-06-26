---
title: "Writeup – Polishop (PoliCTF 2017) – Inyección XPath"
author: Adan Alvarez
classes: wide
excerpt: "En esta entrada vamos a detallar el reto web Polishop del CTF PoliCTF 2017, celebrado desde el viernes día 07 de julio hasta el domingo 09 de julio. La parte más importante de esta prueba es una inyección XPath."
categories:
  - Web
tags:
  - CTF
  - Pentest
  - OWASP
---
En esta entrada vamos a detallar el reto web **Polishop** del CTF [PoliCTF 2017](https://ctftime.org/event/425), celebrado desde el viernes día 07 de julio hasta el domingo 09 de julio. La parte más importante de esta prueba es una inyección [XPath](https://www.owasp.org/index.php/XPATH_Injection).
{: style="text-align: justify;"}

Al acceder a la [URL](http://polishop.chall.polictf.it/) nos encontrábamos con una tienda que tenía varios objetos, entre ellos **Poli Flag**.
{: style="text-align: justify;"}

[![Tienda del reto](https://donttouchmy.net/wp-content/uploads/2017/07/tienda-300x281.png)](https://donttouchmy.net/wp-content/uploads/2017/07/tienda.png)

Por lo tanto nuestro objetivo era comprar** Poli Flag**. Si hacíamos clic en comprar nos aparecía un formulario para introducir los datos de la tarjeta de crédito, al rellenar estos y enviar el formulario aparecía el siguiente error: ***«Wrong combination of card number and date expiration, no card found in creditcards.xml*«**
{: style="text-align: justify;"}

Este error nos indicaba que los datos de las tarjetas de crédito los teníamos que obtener de ***creditcards.xml***. Si intentábamos acceder a este fichero mediante la URL  nos aparecía un error **404 Not Found**.
{: style="text-align: justify;"}

En la página inicial de la tienda había un buscador, si interceptábamos la petición hacia el servidor podíamos ver como se enviaba en el parámetro ***name** *lo que queríamos buscar y en el parámetro ***file** *el fichero donde buscar esto. Por lo tanto, se podía utilizar este buscador para extraer la información de *creditcards.xml*
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/07/poliqueryxml-300x60.png)](https://donttouchmy.net/wp-content/uploads/2017/07/poliqueryxml.png)

Modificando directamente el fichero en el campo *file* no se obtenían resultados. Esto es así ya que la consulta estaba preparada para realizarse al campo *name*. Campo que no existía en el fichero *creditcards.xml.*
{: style="text-align: justify;"}

Sabiendo esto, nuestro objetivo ahora era entender cómo se realizaba la búsqueda en el fichero xml y cómo modificarla. Las búsquedas en [XML ](https://www.w3.org/XML/)se realizan mediante **XPath**, XPath permite buscar y seleccionar teniendo en cuenta la estructura jerárquica del XML, por lo tanto probamos si este era el método y si mediante el parámetro *name* se podía modificar la consulta original.
{: style="text-align: justify;"}

Para buscar la inyección en primer lugar probamos qué **caracteres especiales** daban error. Esta prueba nos mostró que el único que producía un error era **«**
{: style="text-align: justify;"}

Conociendo que **«** produce un error, el siguiente paso fue ver si construir una entrada válida en Xpath eliminaba este error y así se confirmaba la inyección, para esto se introdujo ***» or «1»=»1* **y se confirmó la inyección Xpath en el campo *name*.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/07/inyeccionko-300x101.png)](https://donttouchmy.net/wp-content/uploads/2017/07/inyeccionko.png)

[![](https://donttouchmy.net/wp-content/uploads/2017/07/inyeccionok-300x102.png)](https://donttouchmy.net/wp-content/uploads/2017/07/inyeccionok.png)

El buscador de esta web mostraba todo lo que contenía la variable *name*, para hacer este tipo de búsquedas en XPath se debe utilizar la función [contains.](https://developer.mozilla.org/en-US/docs/Web/XPath/Functions/contains) Por lo tanto la consulta que se debía estar utilizando debía ser similar a:
{: style="text-align: justify;"}
```
'//name[contains(.,"$NAME")'
```
Siendo $NAME el punto de inyección XPath  teníamos que conseguir mostrar toda la información posible sin saber la estructura de *creditcards.xml*. Para esto podíamos usar la siguiente consulta:
{: style="text-align: justify;"}
```
'//name[contains(.,"")]|//*[contains(.,"")'
```
Esta consulta añade al resultado de *name,* el resultado de obtener todos los valores de los nodos. Al ejecutar esta inyección sobre *creditcards.xml *nos aparecía el siguiente error: ***«Bad query result: expected items but recieved shop creditcards card circuit number expire_date»**.  *Lo que nos indicaba los nodos del fichero.![inyección XPath](https://donttouchmy.net/wp-content/uploads/2017/07/inyeccioncards-300x126.png "inyección XPath")
{: style="text-align: justify;"}

Al probar la consulta contra todos los nodos, al llegar a **card,** nos aparecía la información de todas las tarjetas.[![inyección XPath](https://donttouchmy.net/wp-content/uploads/2017/07/inyeccioncardsok-300x98.png "inyección XPath")](https://donttouchmy.net/wp-content/uploads/2017/07/inyeccioncardsok.png)
{: style="text-align: justify;"}

Con esta información, ya se podía volver a la compra e introducir los datos de la tarjeta. Tras introducir estos se nos preguntaba por el **PIN** de la tarjeta, información que no aparecía en este XML.
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/07/pin-1-300x174.png)](https://donttouchmy.net/wp-content/uploads/2017/07/pin-1.png)

Como el PIN de las tarjetas es de 4 dígitos y no había ningún [**captcha** ](https://es.wikipedia.org/wiki/Captcha)en el formulario decidimos hacer **fuerza bruta** a este utilizando [Burp](https://portswigger.net/burp/). Tras varios minutos enviando peticiones el servidor respondió con la **flag** de este reto
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2017/07/bruteforce-300x183.png)](https://donttouchmy.net/wp-content/uploads/2017/07/bruteforce.png)