---
layout: single
title: Java - Ejecutar comando Java desde la línea de comandos
date: 2022-05-30
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-manual
tags:
  - java-literal
page_css: 
  - /assets/css/mi-css.css
---

## Ejecutar comando Java desde la línea de comandos

* Cuando tenemos que ejecutar programas escritos en **Java** desde la línea de comandos tenemos que ejecutarlos desde la raíz de la lista de paquetes que lo componen

### Ejemplo
  
```java
package conceptos.linea.comandos;

public class CapturaNumero {

 public static void main(String[] args) {
  int x = Integer.valueOf(args[0]);
  System.out.println(x);
 }
}
```

* La **ruta** dentro del **directorio de trabajo** para compilar el programa sería

```java
// usuario@hostname 
//   ↓     ↓           "Ruta Completa de Directorios hasta la fuente del programa" 
//   ↓     ↓            ↓                                                      Comando 
//   ↓     ↓            ↓                                                      ↓    Package/Paquetes del Proyecto
//   ↓     ↓            ↓                                                      ↓    ↓                                1-Argumentos
//   ↓     ↓            ↓                                                      ↓    ↓                                ↓
usuario@torre:/mnt/d/Proyectos_Eclipse/Programacion_Java/ConceptosBasicos/src$ javac conceptos/comandos/CapturaNumero 3
```

* La **ruta** dentro del **directorio de trabajo** para ejecutar el programa sería

```java
// usuario@hostname 
//   ↓     ↓           "Ruta Completa de Directorios hasta la fuente del programa" 
//   ↓     ↓            ↓                                                      Comando 
//   ↓     ↓            ↓                                                      ↓    Package/Paquetes del Proyecto
//   ↓     ↓            ↓                                                      ↓    ↓                                1-Argumentos
//   ↓     ↓            ↓                                                      ↓    ↓                                ↓
usuario@torre:/mnt/d/Proyectos_Eclipse/Programacion_Java/ConceptosBasicos/src$ java conceptos/comandos/CapturaNumero 3
// Salida por consola
3
```
