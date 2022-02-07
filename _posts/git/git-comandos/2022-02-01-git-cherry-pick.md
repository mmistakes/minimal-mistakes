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

* Este comando se utiliza para copiar un commit especifico de una rama especifica mediante su identificador hash SHA-1

```bash
git cherry-pick <codigo-hash-SHA-1>
```

* Estoy en la rama 'rama-x' y quiero copiar un commit especifico de la rama 'master'

  * Para ello me situó en la rama 'rama-x' mediante

```bash
git checkout rama-x
```

* Busco el commit que me interesa dentro de la rama 'master' ejecutando el comando

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

* Ahora ejecuto el comando que copia el commit y le paso por parametro el ``commit`` que quiero copiar y se aloja en otra rama

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
git log --all --online --graph --decorate
```

* Nos mostrará el siguiente **grafo de commits** mostrando la creación de un **nuevo commit** extraído de otra **rama** y añadido a la rama actual ``rama-x`` con la que estamos trabajando

```bash
* 5598930 (HEAD -> rama-x) 1-Archive # Rama a la que le añadimos un archivo de la rama 'master'  
| * b0e63ad (origin/master, origin/HEAD, master) 1-Archive # Rama a la que le hemos extraído el contenido
|/  
* 1096247 Readme & License
```
