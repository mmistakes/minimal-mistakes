---
layout: single
title: Linux - Buscadores de archivos - File Browsers
date: 2021-12-18
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
  - linux-buscadores
page_css: 
  - /assets/css/mi-css.css
---

## Buscadores - Searching

### apropos

* Buscar páginas man para un tema determinado

```bash
apropos ssh
git-shell (1)        - Restricted login shell for Git-only SSH access
rcp (1)              - OpenSSH secure file copy
rlogin (1)           - OpenSSH remote login client
rsh (1)              - OpenSSH remote login client
scp (1)              - OpenSSH secure file copy
sftp (1)             - OpenSSH secure file transfer
slogin (1)           - OpenSSH remote login client
ssh (1)              - OpenSSH remote login client
ssh-add (1)          - adds private key identities to the OpenSSH authentication agent
ssh-agent (1)        - OpenSSH authentication agent
ssh-argv0 (1)        - replaces the old ssh command-name as hostname handling
ssh-copy-id (1)      - use locally available keys to authorise logins on a remote machine
ssh-keygen (1)       - OpenSSH authentication key utility
ssh-keyscan (1)      - gather SSH public keys from servers
ssh-keysign (8)      - OpenSSH helper for host-based authentication
ssh-pkcs11-helper (8) - OpenSSH helper for PKCS#11 support
ssh-sk-helper (8)    - OpenSSH helper for FIDO authenticator support
ssh_config (5)       - OpenSSH client configuration file
```

### find

* Búsqueda de nombres de archivos en el árbol de directorios

```bash
find . -name archivo.txt # Busque el archivo.txt en el directorio actual

find /home -name archivo.txt # Busca todos los archivos bajo el directorio /home con el nombre archivo.txt

find / -type d -name <Directorio> # Busca todos los directorios con el nombre que le indiquemos en el <Directorio> 

find / -type f ! -perm 777 # Encontrar archivos con el permiso 777

find . -type f -name archivo.java # Busca en el directorio actual el archivo llamado <archivo> con la extensión java

find . -type f -name "*.extension" # Busca en el directorio actual todos los archivo con la extensión definida

find . -type f -perm 0777 -print # Busca todos los archivos con permiso 777 (permisos de usuario , grupo , otros)

find / -type f ! -perm 777 # Busca todos los archivos con permiso distintos a 777

find ~ -atime -4 # Busca todos los archivos con acceso '~' en los últimos 4 días

find ~ -mtime -4 # Busca todos los archivos modificados '~' en los últimos 4 días

find ~/docs -name '*.tex' | xargs grep -n 'archive' # Identificar un subconjunto de archivos terminados '*.tex' dentro algún directorio (~/docs) y todos subdirectorios y busca dentro este subconjunto de archivos para una cadena indicada entre comillas

find ./progs ./tex -ctime -75 -type f # Todos los archivos bajo ./progs y ./tex que han sido creados, modificados o cuyo estado ha cambiado en los últimos 75 días

find ./progs ./tex -ctime -75 -type f \ 
-o -path ./progs/corejsf -prune \ # Lo mismo, pero excluyendo dos subdirectorios
-o -path ./progs/jeda/build -prune

find ./progs ./tex -ctime -75 -type f \
-o -path ./progs/corejsf -prune \
-o -path ./progs/jeda/build -prune \ # Lo mismo, pero además agrupando los archivos como backup.tar
| xargs tar cvf backup.tar
```

### grep

* Buscar palabras específicas en los archivos de texto

```bash
grep [opciones] [expresiones regulares] [archivos]
```

### Ejemplo - Buscar un patrón dentro de archivo

```bash
grep [patrón] [archivos]
```

### Ejemplo - Buscar recursivamente un patrón dentro de archivo

```bash
grep -r [patrón] [archivos]
```

### Ejemplo - Buscar desde el patrón en la salida del comando

```bash
command | grep patrón
```

#### [Expresiones Regulares] - BRE

```bash
^ # Coincidir comienzo de la línea (caracter/expresión regular)
$ # Coincidir al final de la linea
. # Coincidir algún caracter excepto una nueva línea (Sin datos de línea)
[] # Coincidir con un sólo rango de caracteres dentro de los corchetes
\ # Si hay ^ dentro del [] coincidira con cualquier caracter
* # Coincide con el carácter anterior o subexpresión cero , uno , o + veces 
  #  Ejemplo 0*42 → 42, 042 , 0042 , 00042 
\1 # Referencia de 1-9 coinciden con el texto exacto del grupo correspondiente | (a)\1 → aa
\{m,n\} # Coinciden con los elementos anteriores al menos 'm' y no más veces de 'n' veces
\|foo \|bar # Coincide con 'foo' o 'bar'
\? # Abreviatura de {0,1} → ob?scuro (existe/no existe la 'b')  
   #                       → obscuro / oscuro  
\+ # Abreviatura de {1,} → coincide con el carácter anterior o con la subexpresión
\n # Coincide con la nueva línea  
\t # Coincide con el tabulador  
\w # Coincide alguna palabra constituyente \w   
\<\> # Coincide la cadena solo al comienzo y al final de la palabra
\b # \bcat\b → Coincidencias sin espacios 
   # \B → \B cat \B → Coincidencia con espacios   
```

#### [Expresiones Regulares Extendidas] - ERE

```bash
^ # Coincide comienzo de la línea (caracter/expresión regular)
$ # Coincidir al final de la linea
| # Expresión regular alternativa
. # Coincidir algún caracter excepto una nueva línea (Sin datos de línea)
[...] # Coincide con cualquier caracter listado dentro de los corchetes
      # Caracter establecido → Añadir ^ dentro de los corchetes hace lo mismo que BRE
      # Caracter establecido → Añadir $ dentro de los corchetes hace lo mismo que BRE
(...) # Sintaxis de grupo para formar palabras , bucarlas , filtrar resultados
      # Ofrece varias alternativas dentro del () separadas por ,
      # Usar con * o \DIGIT → remplazar o sustituir 
        # ejemplo : (p|m)adre → padre o madre
        #         : (des)amor → amor o desamor
        #         : H(a|ae|ä)ndel → Haendel | Handel | Händel
\| # Alteración entre 'foo' | 'bar' en las coincidencias (elige uno u otro)
* # Coincide con el carácter anterior o subexpresión cero , uno , o + veces 
+ # Coincide con el carácter una , o + veces del caracter precedido 
? # Coincide 0 o 1 vez más
\ # Cita el siguente caracter si no es alfanúmerico
{m,n} # Coincide con el caracter anterior o subexpresión entre m y n veces
      # m o n puede ser omitidos , {m} significa exactamente m
```

### locate

* Buscar archivos basados en nombres parciales

```bash
locate [OPTION] PATTERN...
```

#### Ejemplos basicos

```bash
locate <archivo> # Busca todas las instancias del archivo
locate *.md # Busca todos los archivos terminados con la extension .md
locate -n 10 *.md # Busca los 10 primeros archivos terminados con la extension .md
locate -c 10 *.md # Busca y cuenta las coincidencias
locate -e *.json # Busca y muestra los archivos que existen en el momento de ejecutar este comando
locate --regex -i "(\|.extension|\.extension)" # Busca todos los archivos dentro del sistema ignorando mayusculas o minusculas
```

### whereis

* Localiza los binarios , source y paginas de manual para un comando

```bash
whereis ls # ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz
```

### strings

* Extraer todo el texto de un archivo

```bash
strings # Extraer todos los textos de un archivo dentro del directorio de trabajo
strings archivo.txt # Muestra todo el contenido si existe dentro del directorio donde se invoco
```
