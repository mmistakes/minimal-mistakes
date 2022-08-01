---
layout: single
title: Linux - Administración Procesos
date: 2022-01-06
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
  - linux-administración procesos
page_css: 
  - /assets/css/mi-css.css
---

### Muestra los procesos actuales

```bash
ps
```

### Muestra todos los procesos en ejecución mediante una interfaz básica

```bash
top
```

### Muestra todos los procesos en ejecución mediante una interfaz mejorada

```bash
htop
```

### Mata una proceso mediante identificador 'pid' el cual podemos ver en la 1º columna cuando ejecutamos 'top'

```bash
kill pid
```

### Mata todos los procesos nombrados como proc*

```bash
killall proc* # Permite usar comodines
```

### Se utiliza para reanudar un trabajo que fue detenido en segundo plano o fondo

```bash
bg
```

### Trae el proceso más reciente al primer plano

```bash
fg  
```

### Trae el proceso nombrado al primer plano

```bash
fg n  
```
