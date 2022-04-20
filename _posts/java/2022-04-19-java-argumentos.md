---
layout: single
title: Java - Super
date: 2022-04-19
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-argumentos
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Palabra clave - Argumentos

* Se refiere a todos los **valores/datos** que se encuentra en la **cabecera/declaración/definición** de un **método/programa/elemento** a la espera de recibir los **parámetros** que le indiquemos desde fuera del **método/programa/elemento** en cuestión , sea desde una **línea de comandos** de una terminar , la ejecución de un programa cualquiera , la invocación de un método o la llamada al método desde otros métodos.

```java
//                    1º Argumentos     
//                          ↓          2º Argumentos     
//                          ↓               ↓        3º Argumentos     
//                          ↓               ↓             ↓        4º Argumentos     
//                          ↓               ↓             ↓               ↓          5º Argumentos     
//                          ↓               ↓             ↓               ↓                ↓
//                          ↓               ↓             ↓               ↓                ↓
public void setCoche(int marchas , int cilindrada , int puertas , String modelo , String matricula){
  this.marchas = marchas;
  this.cilindrada = cilindrada;
  this.puertas = puertas;
  this.modelo = modelo;
  this.matricula = matricula;
}

// Invocación del método setCoche
// Parámetros que le pasamos al método
// 
//       1-Parámetro
//       ↓
//       ↓   2-Parámetro
//       ↓   ↓
//       ↓   ↓   3-Parámetro
//       ↓   ↓   ↓
//       ↓   ↓   ↓        4-Parámetro
//       ↓   ↓   ↓        ↓                              5-Parámetro
//       ↓   ↓   ↓        ↓                              ↓
//       ↓   ↓   ↓        ↓                              ↓
//       ↓   ↓   ↓        ↓                              ↓
//       ↓   ↓   ↓        ↓                              ↓
setCoche(5 ,12 , 3 , "Ferrari 500 TRC de Scaglietti" , "96961" );
```
