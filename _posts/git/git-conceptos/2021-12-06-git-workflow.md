---
layout: single
title: Git - Workflow
date: 2021-12-06
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-workflow
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git Workflow

* Una versión concreta de un archivo esta en el **[Repo.Local / Directorio GIT]** y se considera **[Committed/Confirmado]** mediante el comando ``git commit -m "Mensaje"``

* Si este archivo ha sufrido cambios desde que se obtuvo del **[Repo.Local / Directorio GIT]** pero ha sido añadida al **{Staging Area / INDEX}** , significa que este archivo esta **{Staged}** o **Preparado** y la espera de ser **[Committed/Confirmado]** para guardar los cambios en el **[Repo.Local / Directorio GIT]** y enviados al **Repositorio Remoto**

* Si ese archivo ha sufrido cambios desde que se obtuvo una copia del **[Repo.Local / Directorio GIT]** pero **{No Se Ha Preparado / UnStaged }** esos cambios están en modo **{Modified / Modificado}** a la espera de ser agregados mediante el comando ``git add <archive>``
