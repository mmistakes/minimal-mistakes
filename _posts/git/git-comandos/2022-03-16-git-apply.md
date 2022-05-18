---
layout: single
title: Git - Apply
date: 2022-03-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-apply
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## GIT Apply

* Este comando se usa para aplicar parches dentro de nuestro **(Working Directory / Directorio de Trabajo)** mediante los archivos que hayamos creado con la salida por ejemplo de los comandos ``git diff`` y ``git format-patch`` que hayamos ido ejecutado durante el desarrollo de los archivos del proyecto

* Ejemplo

Después de realizar ciertos cambios en un archivo , generamos un parche de esas modificaciones mediante el comando ``git diff`` y nos mostrará las diferencias con respecto al archivo que teníamos antes

```bash
git diff <archivo> > cambios-realizado.path
```

> En cierto modo hemos generaremos una especie de copia de seguridad sobre el archivo que hemos modificado guardado esos cambios dentro de él

Pero por el motivo que sea deshacemos todos los cambios que realizamos anteriormente mediante el comando ``git restore``

```bash
``git restore <archivo>``
```

Ahora el archivo esta igual que al principio y sin ningún cambio realizado

```bash
git apply < cambios-realizados.path
```

Todos los cambios que hicimos anteriormente y que se almacenaron dentro del archivo ``cambios-realizados.path`` se han vuelto a restablecer sobre el mismo archivo y podremos añadirlos con ``git add <archivo>`` y confirmarlos mediante ``git commit`` para guardarlos en el **Repositorio Remoto**
