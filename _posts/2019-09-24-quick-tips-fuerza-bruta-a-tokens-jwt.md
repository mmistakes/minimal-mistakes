---
title: "Quick Tips – Fuerza bruta a tokens JWT"
author: Adan Alvarez
classes: wide
excerpt: "El uso de JSON Web Tokens (JWT) se ha extendido mucho debído a la facilidad que nos ofrecen para identificar y asignar privilegios."
categories:
  - Quick Tips
  - Web
tags:
  - JWT
  - Fuerza bruta
  - hashcat
  - Pentest
  - Red Team
---
El uso de JSON Web Tokens (JWT) se ha extendido mucho debído a la facilidad que nos ofrecen para identificar y asignar privilegios.
{: style="text-align: justify;"}

Los tokens están compuestos por 3 partes. La cabecera, el contenido y la firma.
{: style="text-align: justify;"}

En la cabecera veremos el algoritmo utilizado para la firma, en el contenido la identificación, los permisos y normalmente un timestamp y por último la firma que puede ser generada mediante un secreto o utilizando clave privada/pública.
{: style="text-align: justify;"}

[![jwt](https://donttouchmy.net/wp-content/uploads/2019/09/jwt-300x168.jpg)](https://donttouchmy.net/wp-content/uploads/2019/09/jwt.jpg)

En el caso de localizar un JWT durante un pentest, es importante verificar que el token es robusto. Por lo tanto, si descubrimos un token que utiliza un secreto en la firma deberemos realizar un ataque de fuera bruta para comprobar que el secreto no puede ser descubierto. De serlo, seríamos capaces de generar nuestros propios tokens, comprometiendo de este modo la seguridad del sitio que utilice estos tokens.
{: style="text-align: justify;"}

Para relizar fuerza bruta a tokens JWT podemos utilizar [hashcat](https://donttouchmy.net/herramientas/) de la siguiente manera:
{: style="text-align: justify;"}
```
.\hashcat64.exe -m 16500 -a 0 .\jwt.txt .\rockyou.txt -r .\kamaji34K.rule.txt
```
Con el parámetro -m indicaremos que es un token JWT, con el parámetro -a indicaremos que el tipo de ataque es Straight, después en el fichero jwt.txt tendremos nuestro token JWT y utilizaremos como diccionario [rockyou](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Leaked-Databases/rockyou.txt.tar.gz) y las reglas [kamaji34K](https://github.com/kaonashi-passwords/Kaonashi/blob/master/rules/kamaji34K.rule) presentadas en [rootedcon](https://es.slideshare.net/rootedcon/pablo-caro-jaime-snchez-i-know-your-p4w0rd-and-if-i-dont-i-will-guess-it-rooted2019).
{: style="text-align: justify;"}

Además de esta verificación es importante verificar que:

-   El algoritmo NONE no puede ser utilizado.
-   Los tokens no pueden ser robados.
-   Es posible para un usuario invalidar el token.
-   En el payload no se almacena información sensible.
-   El token no es guardado de forma insegura en el navegador.