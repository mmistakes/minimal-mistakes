---
layout: single
title: Detached Head
date: 2022-03-12
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-detached 
  - git-head 
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---
 
## Detached Head

* Se trata de una **rama** que se crea sobre un **commit** que no tiene un nombre de **rama** apuntándole
  
```bash
git checkout <numero-commit>
# Ejemplo
git checkout fa680ad2
```

* Se realiza el comando ``checkout`` sobre el ``SHA-1`` del ``commit en cuestión``

* Se suele hacer para inspeccionar los **ficheros** en un punto del **historial de commits** del **[Repositorio Local]** y poder crear una nueva rama a partir de ese **commit** al que hemos accedido
  * En cierto modo simbólico se ha creado una **rama sin nombre**

* En cualquier momento podemos **crear** una **rama** en este punto mediante el siguiente comando

```bash
git checkout -b <nombre-rama-a-generar>
```
