---
title: "Writeup – The Vault (SwampCTF 2018) – Crack SHA256"
author: Adan Alvarez
classes: wide
excerpt: "¡Volvemos con los retos de CTFs! El reto que se detalla en esta entrada es un reto web del CTF SwampCTF 2018, celebrado durante los días 29,30 y 31 de marzo. Este se resuelve crackaenado un hash SHA256."
categories:
  - Web
  - Herramientas
tags:
  - CTF
  - Bruteforce
---
¡Volvemos con los retos de CTFs! El reto que se detalla en esta entrada es un reto web del CTF SwampCTF 2018, celebrado durante los días 29,30 y 31 de marzo. Este se resuelve crackaenado un hash SHA256.
{: style="text-align: justify;"}

Al acceder a la URL nos aparecía la siguiente pantalla:

[![SwampCTF ](https://donttouchmy.net/wp-content/uploads/2018/03/web-300x242.png "SwampCTF ")](https://donttouchmy.net/wp-content/uploads/2018/03/web.png)

Si introducimos dos caracteres en los campos para probar el formulario recibimos el siguiente mensaje:

[![SwampCTF ](https://donttouchmy.net/wp-content/uploads/2018/03/invalid-300x85.png "SwampCTF ")](https://donttouchmy.net/wp-content/uploads/2018/03/invalid.png)

Si realizamos la misma petición pero con burp como proxy para poder capturar la respuesta el resultado es el siguiente:

[![SwampCTF ](https://donttouchmy.net/wp-content/uploads/2018/03/erroruser-300x132.png "SwampCTF ")](https://donttouchmy.net/wp-content/uploads/2018/03/erroruser.png)

Este error es más claro, nos indica que el usuario no existe. Por lo tanto, lo primero que necesitamos es un usuario válido. Probamos con el usuario DUNGEON_MASTER ya que según la web es el único con acceso: «only DUNGEON_MASTER may enter the vault». Probamos esto y efectivamente la respuesta es diferente:
{: style="text-align: justify;"}

[![SwampCTF ](https://donttouchmy.net/wp-content/uploads/2018/03/hashsha256web-300x131.png "SwampCTF ")](https://donttouchmy.net/wp-content/uploads/2018/03/hashsha256web.png)

La respuesta indica que el hash XXX no es igual al real_hash XXX. El primer hash es el hash SHA256 de nuestro password y el segundo debe ser el hash SHA256 del password que necesitamos.
{: style="text-align: justify;"}

Sabiendo el hash SHA256 del password que necesitamos probaremos a realizar un ataque de fuerza bruta mediante [hashcat](https://hashcat.net/hashcat/), una herramienta de recuperación de passwords que podéis ver en nuestra sección [herramientas](https://donttouchmy.net/herramientas/)
{: style="text-align: justify;"}

En nuestro caso decidimos utilizar el diccionario rockyou que podéis localizar en el GitHub de [SecLists](https://github.com/danielmiessler/SecLists)
{: style="text-align: justify;"}

[![SwampCTF ](https://donttouchmy.net/wp-content/uploads/2018/03/hashcat-300x11.png "SwampCTF ")](https://donttouchmy.net/wp-content/uploads/2018/03/hashcat.png)

Lanzamos hashcat con las siguientes opciones:
{: style="text-align: justify;"}

**-m 1400**  indicamos que es un hash tipo SHA256, en la [wiki de hashcat](https://hashcat.net/wiki/doku.php?id=example_hashes) podéis ver ejemplos de cada hash y su código en hashcat

**-a** **0** modo Straight para usar un diccionario y reglas

**hash.txt** fichero donde estará nuestro hash

**rockyou.txt** diccionario a utilizar

**rules\best63.rules** reglas que utilizará hashcat para crear nuevas contraseñas a partir de las contraseñas del diccionario

Tras lanzar el comando, en pocos segundos obtenemos el password:
{: style="text-align: justify;"}

[![SwampCTF ](https://donttouchmy.net/wp-content/uploads/2018/03/hash-300x18.png "SwampCTF ")](https://donttouchmy.net/wp-content/uploads/2018/03/hash.png)

Introducimos la contraseña obtenida en la web de SwampCTF y nos aparecerá la flag !
{: style="text-align: justify;"}

[![SwampCTF ](https://donttouchmy.net/wp-content/uploads/2018/03/fflag-300x87.png "SwampCTF ")](https://donttouchmy.net/wp-content/uploads/2018/03/fflag.png)