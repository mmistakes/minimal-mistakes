---
layout: single
title: Git - Cherry-pick
date: 2022-02-01
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-cherry-pick
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git Cherry-pick

* Este comando se utiliza para copiar un **commit especifico** de una **rama** mediante su identificador hash **SHA-1** , comparar los datos entre este seleccionado **commit** y el **commit** en el que nos encontramos , fusionarlos y en caso de producirse conflictos en la unión de ambos **commits** , resolveros y fusionarlos generando un nuevo **commit** o deshaciendo todas esta acciones como si no se hubiera ejecutando ningún comando

* Para aplicar este comando no deben existir cambios en los ficheros del **(Directorio de Trabajo / Working Directory)** o en el **{Staging Area / Index / Staged}**

* Aplicar los cambios realizados en el **commit** indicando la **rama** y creando un **nuevo commit**

```bash
git cherry-pick <codigo-hash-SHA-1>
```

* Estoy en la rama **rama-x** y quiero copiar un **commit especifico** de la **rama master**

  * Para ello me situó en la **rama-x** mediante

```bash
git checkout rama-x
```

* Busco el **commit** que me interesa dentro de la rama **master** ejecutando el comando

```bash
git log --all --oneline --graph --decorate
# El comando me muestra estos datos
# ------------------
# Este es el commit 
# que tengo que copiar
#   ↓
* b0e63ad (origin/master, origin/HEAD, master) 1-Archive
|  
|  
* 1096247 Readme & License
```

* Ahora ejecuto el comando que copia el **commit** y le paso por **parámetro** el **commit** que quiero copiar y se aloja en otra rama

```bash
git cherry-pick b0e63ad
[rama-x 5598930] 1-Archive
 Author: Usuario <usuario@gmail.es>
 Date: Tue Feb 14 19:23:10 2017 +0100
 1 file changed, 17 insertions(+)
 create mode 100644 1-Archive
```

* Si ejecutamos el comando

```bash
git log --all --online --graph
```

* Nos mostrará el siguiente **grafo de commits** mostrando la creación de un **nuevo commit** extraído de otra **rama** y añadido a la rama actual ``rama-x`` con la que estamos trabajando

```bash
* 5598930 (HEAD -> rama-x) 1-Archive # Rama a la que le añadimos un archivo de la rama 'master'  
| * b0e63ad (origin/master, origin/HEAD, master) 1-Archive # Rama a la que le hemos extraído el contenido
|/  
* 1096247 Readme & License
```

* Si aparecen conflictos, no se realiza el nuevo **commit** con la fusión de ambos **commits** y tendremos que resolver los **conflictos** mediante los siguientes comandos

* Saltarse los conflictos y generar el **commits** con ellos dentro del archivo

```bash
git cherry-pick <commit> --skip
```

* Eliminar los **conflictos** y restaurar los archivos como estaban antes de ejecutar el comando **cherry-pick**

```bash
git cherry-pick <commit> --abort
```
