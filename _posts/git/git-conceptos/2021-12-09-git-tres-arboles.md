---
layout: single
title: Git - Tres Arboles
date: 2021-12-09
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-tres arboles
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Los 3 Arboles

Git administra el contenido del **[Repositorio]** con 3 árboles diferentes

> Árbol → Colección de archivos

### Arboles

1. **(Working Directory/Workspace)** → SandBox : Fase de prueba donde creamos , modificados archivos que no han sido todavía {Tracked/Rastreados}

2. **{Index/Staging Area}** → Fase donde los archivos esperan convertirse en el próximo commit

3. **[HEAD]** → **[Repositorio Local]** - Contiene la última **instantánea/commit**, el cual se convertirá en el próximo padre

* * *

#### [HEAD]

> Almacena contenido dentro del directorio .git/

* Puntero de referencia de bifurcación actual y puntero al último commit realizado en la rama en la que estemos posicionado
  * [HEAD] → Será posiblemente el próximo commit que se genere con los cambios en los archivos del [Repositorio].
  * Resumen : [HEAD] → como instantánea/snapshot de tu último commit

#### {Index/Staging Area}

> Almacena contenido dentro del directorio .git/

* Son los archivos modificados de la fase **{Tracked/Rastreada}** o los creados desde la fase del **(Working Directory/Workspace)** que serán propuestos para ser fusionados en el [Repositorio] mediante ``git commit``  

* Git agrega al **{Index/Staging Area}** todos los archivos que fueron creados o revisados por última vez en el **(Working Directory/Workspace)** y que se añadieron mediante ``git add <archivo>``
  
  * A continuación reemplaza esos nuevos archivos con nuevas versiones de ellos o añade los nuevos mediante ``git commit`` para que se conviertan en el **próximo commit** a fusionar al [Repositorio] ejecutando ``git push``

* Técnicamente **{Index/Staging Area}** no es una estructura de árbol; se implementa como un ``manifiesto aplanado → flattened manifest``
  
> Según Wikipedia : Manifiesto = Metadata de un grupo de archivos adjuntos que forman parte de un conjunto o unidad coherente

#### (Working Directory / Workspace)

Tiene 2 funciones :

* Lugar donde se descomprime los archivos descargados del **Repositorio Remoto** para editarlos o modificarlos

* Espacio donde se almacenan los archivos creados que se van a añadir al proyecto del **[Repo.local]**

  * Se asemeja a una especie de **(SandBox / Caja de Pruebas)** donde puedes realizar pruebas de código o cambios en los archivos antes de enviarlos al **{Index / Staging Area}** y al **[HEAD]** con el historial de **commits**
