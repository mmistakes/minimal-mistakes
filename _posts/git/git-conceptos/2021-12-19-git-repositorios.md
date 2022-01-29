---
layout: single
title: Git - Repositorios
date: 2021-12-15
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git-repositorios-local
  - git-repositorios-remotos
tags:
  - git-repositorios
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Repositorios

## Repositorios Locales / Trabajo (Working Directory)

* Repositorio para desarrollo

## Repositorios Bare (vacio/simple)

* Este repositorio no tiene un ``repositorio de origen remoto`` predeterminado

  * Cuando se crea este repositorio **Git** asumirá que el ``repositorio bare`` servirá como ``repositorio origin`` para varios ``usuarios remotos`` por lo que no crea el ``origen remoto predeterminado``
  
  * Las **operaciones básicas** de ``git pull`` y ``git push`` **no funcionarán**, ya que ``Git`` asume que sin un **workspace/espacio de trabajo** no tendrás la intención de realizar ningún cambio en el **repositorio bare**

  * Se suele alojar en servidores remotos en Internet

  * Se utilizan apra compartir desarrollos , guardar backups

* Ejemplo

  ``git bare --init``

## Repositorios Remotos

* Se identifica por una **URL** que referencia el ``servidor remoto`` en el que se encuentra el proyecto alojado ( En la mayoría de los casos **GITHUB**)

* Termino : ``remote``

  * Nombre dado al **Repositorio local** el cual apunta a un **Repositorio Remoto**

* Termino : ``origin``

  * Se obtiene de la clonación del **Repositorio Remoto** mediante el comando ``git clone``

  * La **rama master** de **origin** puede referenciarse mediante : ``origin/master``
  
  * **En resumen** : ``origin`` contiene la **URL** la cual hace referencia al ``servidor remoto`` donde esta alojado el proyecto con el que estamos trabajando

    * Por defecto es ``origin`` pero se puede cambiar

* Muestra todos los **|Repositorio Remoto|** que podemos ejecutar el siguiente comando

```bash
git remote  [-v]
# Id.Remoto   URL del Repo.Local a la que apunta 
#             el Repo.Remoto del Proyecto en GITHUB
#                                                  Función a ejecutar
  origin      https://github.com/usuario/PROYECTO (fetch)
#                                                  Función a ejecutar
  origin      https://github.com/usuario/PROYECTO (push)
```

* Define la **URL** con la que sincronizaremos nuestro ``[Repo.Local]`` con el ``|Servidor Remoto|`` para subir los cambios que hagamos desde nuestro **(Directorio de trabajo/Working Directory)**

```bash
git remote add <nombre-remoto>

# Id.Remoto   URL del Repo.Local a la que apunta el Repo.Remoto del Proyecto en GITHUB
  origin      https://github.com/usuario/PROYECTO (fetch)
  origin      https://github.com/usuario/PROYECTO (push)
```

* Borra el ``<remote-nombre>`` del ``|Repositorio Remoto|`` del ``[Repo.Local]``

```bash
git remote remove <nombre-remoto>
git remote remove origin
```
