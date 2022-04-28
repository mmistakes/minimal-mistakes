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

* Colección de **archivos** y **metadatos** asociados que pertenecen a un historial

* Instantáneas de los **commits**
  * Los **commits** son en si mismo **metadatos** adicionales que apuntan a una **instantánea/snapshot** concreta del **grafo del historial** de **commits** del sistema de control de versiones de **Git**

## Repositorios Locales / Trabajo (Working Directory)

* **Repositorio/directorio** donde se desarrolla las distintas versiones del proyecto con el que estamos trabajando

* Cuando se inicia un **repositorio** mediante el comando ``git init`` se genera un directorio oculto llamado ``.git`` el cual contiene una serie de archivos y directorios
  * ``.git`` → Contiene los **metadatos** necesarios para gestionar un **repositorio**

### Estructura del Repositorio Local

```bash
`-- .git → Directorio oculto que contiene la configuración , metadatos y archivos que administran el repositorio a nivel local y global 
  |-- branches → Directorio vació 
  |-- config → Almacena las configuraciones como la ubicación del |Repo.Remoto| al que este repositorio esta vinculado
  |-- description → Muestra el nombre (y la versión) de un repositorio local
  |-- HEAD → Muestra una referencia al commit actual
  |-- hooks → Un directorio que contiene un script que se ejecutan en varias etapas
  |-- applypatch-msg.sample
  |  | |-- commit-msg.sample
  |  | |-- post-update.sample
  |  | |-- pre-applypatch.sample
  |  | |-- pre-commit.sample
  |  | |-- prepare-commit-msg.sample
  |  | |-- pre-push.sample
  |  | |-- pre-rebase.sample
  |  | |-- pre-receive.sample
  |  | `-- update.sample
  |-- info → Contiene un archivo de exclusión que enumera las exclusiones (archivos que no deben ser rastreados) 
  |  | `-- exclude → Misma función que el archivo .gitignore
  |-- objects → Este directorio contiene los archivos indexados de SHA que están siendo rastreados (tracking)
  |  | |-- info
  |  | `-- pack
  `-- refs → Una copia completa del repositorio que muestra todas las referencias del propio repositorio
    |-- heads
    `-- tags

## Repositorios Bare (vació/simple)

* Este repositorio no tiene un ``repositorio de origen remoto`` predeterminado

  * Cuando se crea este repositorio **Git** asumirá que el ``repositorio bare`` servirá como ``repositorio origin`` para varios ``usuarios remotos`` por lo que no crea el ``origen remoto predeterminado``
  
  * Las **operaciones básicas** de ``git pull`` y ``git push`` **no funcionarán**, ya que ``Git`` asume que sin un **workspace/espacio de trabajo** no tendrás la intención de realizar ningún cambio en el **repositorio bare**

  * Se suele alojar en servidores remotos en Internet

  * Se utilizan para compartir desarrollos , guardar backups

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

* Muestra todos los **Repositorio Remoto** que podemos ejecutar el siguiente comando

```bash
git remote  [-v]
# Id.Remoto   URL del Repo.Local a la que apunta 
#             el Repo.Remoto del Proyecto en GITHUB
#                                                  Función a ejecutar
  origin      https://github.com/usuario/PROYECTO (fetch)
#                                                  Función a ejecutar
  origin      https://github.com/usuario/PROYECTO (push)
```

* Define la **URL** con la que sincronizaremos nuestro ``[Repo.Local]`` con el ``Servidor Remoto`` para subir los cambios que hagamos desde nuestro **(Directorio de trabajo/Working Directory)**

```bash
git remote add <nombre-remoto>

# Id.Remoto   URL del Repo.Local a la que apunta el Repo.Remoto del Proyecto en GITHUB
  origin      https://github.com/usuario/PROYECTO (fetch)
  origin      https://github.com/usuario/PROYECTO (push)
```

* Borra el ``<remote-nombre>`` del ``Repositorio Remoto`` del ``[Repo.Local]``

```bash
git remote remove <nombre-remoto>
git remote remove origin
```
