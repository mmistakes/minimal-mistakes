---
layout: single
title: Linux - Tratamiento De Texto 
date: 2021-12-19
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-manual
tags:
  - linux-tratamiento-de-texto
page_css: 
  - /assets/css/mi-css.css
---

## Comandos - Tratamiento de textos

### awk / gawk

* awk y gawk son lo mismo : GNU + awk → gawk
* Lenguaje de procesamiento de patrones y tratamiento de textos
  * Lenguaje de análisis semántico

```bash
awk [options] program file ...
gawk [ POSIX or GNU style options ] -f program-file [ -- ] file ...
gawk [ POSIX or GNU style options ] [ -- ] program-text file ...
```

#### Opciones

* -F fs # --field-separator (Separador de patrones)
  * Se usa para la separación de entrada de patrones (El valor de la fs predefinido por la variable)
  * Para especificar un separador de archivos.
  * Utilice fs para el separador del campo de entrada (el valor de la variable predefinida fs).

* -f file
  * Para especificar un archivo que contenga un script awk (archivo-programa)
  * Lee el código fuente del programa **awk** desde el archivo program-file, en lugar de hacerlo desde el primer argumento de la línea de comandos.  
  * Se pueden utilizar varias opciones **-f** (o **--file**)
  * Los archivos leídos con **-f** son tratados como si comenzaran con una declaración implícita **@nombre-espacio** "awk".

* -v var=value
  * Para declarar una variable.

* Procesar archivos e imprimir resultados utilizando **awk**.
* Para definir un script **awk** utilizamos llaves rodeadas por unas **comillas simples** como se muestra a continuación:

```bash
awk '{print " Bienvenido a un ejemplo básico de awk "}'
Hola # Escribir cualquier cosa + pulsar Intro → Ejecuta el comando de arriba
  Bienvenido a un ejemplo básico de awk # Se ejecuta automáticamente el comando print  
```

> Para terminar el programa, presiona Ctrl+D

* Procesar archivos de texto.
  * Asignar variables a cada campo de los datos encontrado:

```bash
$0 # Para toda la línea.
$1 # Para el primer campo o espacio/separado dentro del archivo.
$2 # Para el segundo campo o espacio/separado dentro del archivo.
$n # Para el campo enésimo campo o espacio/separado dentro del archivo.
```

Los caracteres de espacio en blanco como el espacio o la tabulación es el separador por defecto entre los campos en el **awk**

```bash
awk '{print $1}' mi-archivo
```

```bash
~/Documents/pruebas$ cat archivo.txt
Esto es una prueba 
Esto es una segunda prueba
Esto es una tercera prueba
Esto es una cuarta prueba
```

```bash
awk '{print $1}' archivo.txt
Esto # Solo coge la 1º columna de la 1º línea y la muestra por pantalla porque el texto esta separado por espacios
Esto # Solo coge la 2º columna de la 1º línea y la muestra por pantalla porque el texto esta separado por espacios
Esto # Solo coge la 3º columna de la 1º línea y la muestra por pantalla porque el texto esta separado por espacios
Esto # Solo coge la 4º columna de la 1º línea y la muestra por pantalla porque el texto esta separado por espacios
```

* El separador de los archivos ademas de los espacios y la tabulación, puedes especificarlo utilizando la opción ``-F``

```bash
awk -F: '{print $1}' /etc/passwd
root
daemon
bin
sys
sync
games
man
lp
mail
news
proxy
```

#### Utilizando Múltiples Comandos

```bash
echo "Hola Amigo" | awk '{$2="Compañero"; print $0}'
Hola Compañero # Cambio el 2º parametro de 'Amigo' por 'Compañero'
```

### cut

* Eliminar secciones de cada línea de archivos

```bash
 cut option... [file]...
```

Las opciones que tiene ``cut`` si usa un delimitador, una posición de ``byte`` o un ``carácter`` para cortar las partes seleccionadas de las líneas:

```bash
-f (--fields=LIST) # Selecciona por un campo especifico , un campo establecido o un rango de campos (Esta es la opción más común).
-b (--bytes=LIST) # Selecciona por un byte especifico , establece bytes o rangos de bytes
-c (--characters=LIST) # Selecciona por un caracter especifico , un establecido caracter o un rango  
```

#### Ejemplo

```bash
cat test.txt  # Archivo original
# Si hay un espacio de separación 'cut' lo detectará como una sola columna 
245:789 4567    M:4540  Admin   01:10:1980 # Cuando hay "un solo espacio" lo ve como una columna
535:763 4987    M:3476  Sales   11:04:1978 # Más de "dos espacios" lo considera una columna independiente
```

```bash
cut test.txt -f 1,3 # Seleccionamos los campos que queremos cortar y mostrar
245:789 4567    Admin 
535:763 4987    Sales
```

### sort

* Ordenar y fusionar archivos

```bash
sort [option]... [file]...
sort [option]... --files0-from=F
```

#### Ejemplo

```bash
cat abecedario-hexa.txt
a-97 
b-98 
c-99 
d-100 
e-101 
f-102 
g-103 
h-104 
i-105 
j-106 
k-107 
l-108 
m-109 
n-110 
o-111 
p-112 
q-113 
r-114 
s-115 
t-116 
u-117 
v-118 
w-119 
x-120 
y-121 
z-122 
```

```bash
sort -rn abecedario-hexa.txt 
```

### sed

* (Stream Editor)
  * Permite realizar muchas funciones en archivos como buscar, reemplazar, insertar o eliminar.
  * Principalmente reemplazar el texto en un archivo

```sed [option]... {script-only-if-no-other-script} [input-file]...```

```bash
sort abecedario.txt
```

#### Ejemplo

```bash
cat fichero.txt
"Voy a cambiar esta parte del archivo,
que es la parte que me interesa"
```

```bash
sed 's/esta parte/ESTA PARTE/' fichero.txt
"Voy a cambiar esta parte del archivo,
que es la parte que me interesa"
```

Salida :

```bash
"Voy a cambiar ESTA PARTE del archivo, 
que es la parte que me interesa"
```

### dos2unix / mac2unix / unix2dos

* dos2unix - Convertidor de archivos de texto de formato DOS a Unix y viceversa

* mac2unix - Convertidor de archivos de texto de formato Mac a Unix y viceversa

* unix2dos - Convertidor de archivos de texto de formato Unix a DOS y viceversa

```bash
dos2unix a.txt b.txt # Convierte y reemplaza a.txt
dos2unix -o a.txt b.txt # Convierte y reemplaza b.txt.
# Convierte a.txt del formato de Mac a Unix.
dos2unix -c mac a.txt 
mac2unix a.txt
# Convierte a.txt del formato de Unix a Mac.
unix2dos -c mac a.txt
unix2mac a.txt
# Convierte a.txt y escribe la salida a e.txt, manteniendo la fecha de e.txt igual a la de a.txt.
dos2unix -k -n a.txt e.txt
```

### tr

* Para convertir y eliminar caracteres
  * Puedes usarlo para convertir **mayúsculas** a **minúsculas**, juntar caracteres repetidos y borrar caracteres.
  * Requiere dos conjuntos de caracteres para las transformaciones y también se puede usar con otros comandos usando **tuberías** Unix para comandos avanzados.

```bash
tr # Convertir (redefine o elimina) caracteres 
tr [options] "set1" "set2" # Donde los set son un grupo de caracteres. 
                           # Utiliza secuencias interpretadas, enumeró algunas de ellas

NNN -> carácter con valor octal NNN (1 a 3 dígitos octales)
\ -> barra invertida
n -> nueva línea
r -> return / volver 
t -> pestaña horizontal
[:alnum:] -> todas las letras y dígitos
[:alpha:] -> todas las letras
[:blank:] -> todos los espacios en blanco horizontales
[:cntrl:] -> todos los caracteres de control
[:digit:] -> todos los dígitos
[:lower:] -> todas las letras minúsculas
[:upper:] -> todas las letras mayúsculas
```

#### Sintaxis básica

-c , -C , --complement -> Complementa el conjunto de caracteres en ‘set1'

-d , --delete -> Elimina los caracteres en set1.

-s , --squeeze-repeats -> Reemplace cada secuencia de entrada de un carácter repetido que se enumera en set1 con
una sola aparición de ese carácter

#### Opciones

```bash
echo "something to translate" | tr "set1" "set2"
```

```bash
tr "set1" "set2" < file-to-translate
```

```bash
tr "set1" "set2" < file-to-translate > file-output
```

#### Ejemplo

* Convertir minúsculas a mayúsculas

```bash
echo "ejemplo de cambiar las minusculas por mayusculas" | tr [:lower:] [:upper:]
EJEMPLO DE CAMBIAR LAS MINUSCULAS POR MAYUSCULAS

tr "a-z" "A-Z" < ejemplo-letras.txt # Cambia el tamaño de las letras a mayusculas pero no lo almacena
EJEMPLO DE CAMBIAR LAS MINUSCULAS POR MAYUSCULAS
tr "a-z" "A-Z" < ejemplo-letras.txt > archivo-almacenar.txt # Para almacenar el contenido en un archivo
```

```bash
tr -d ',' <archivo-1> archivo-2 # Ejemplo de sintaxis para eliminar caracteres
cat ejemplo-letras.txt  | tr -d "came?" # Le indicamos al comando que muestre el archivo y elimine todos los caracteres entre comillas dobles
jplo d bir ls inusuls por yusuls # Salida del comando eliminado todos los caracteres indicando entre comillas
```

### vi

* Clásico editor de texto

```bash
vi # Abre el programa
```

```bash
:q # Para salir del editor
:!q # Para salir forzosamente del editor
:wq # Para guardar y salir forzosamente del editor
:!wq # Para guardar y salir forzosamente del editor
```
