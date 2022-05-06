---
layout: single
title: Java - Argumentos & Parámetros
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

* Se refiere a todos los **valores/datos** que se envían a la **cabecera/declaración/definición** de un **método/programa/elemento** que esperan los **parámetros** por recibir y que le indiquemos desde fuera del **método/programa/elemento**  , sea desde una **línea de comandos** de una terminar de **Windows** o **Linux** , la ejecución de un programa cualquiera , la invocación de un **método** o la llamada al **método** desde otros **métodos**.

### Parámetros

```java
// Parámetro define que datos necesita el procedimiento para realizar las operaciones
//                    1º Parámetro     
//                          ↓          2º Parámetro     
//                          ↓               ↓        3º Parámetro     
//                          ↓               ↓             ↓        4º Parámetro     
//                          ↓               ↓             ↓               ↓          5º Parámetro     
//                          ↓               ↓             ↓               ↓                ↓
//                          ↓               ↓             ↓               ↓                ↓
public void setCoche(int marchas , int cilindrada , int puertas , String modelo , String matricula){
  this.marchas = marchas;
  this.cilindrada = cilindrada;
  this.puertas = puertas;
  this.modelo = modelo;
  this.matricula = matricula;
}
```

### Argumentos

```java
// Invocación del método setCoche
// Argumento que le pasamos al método
// 
//       1-Argumento
//       ↓
//       ↓   2-Argumento
//       ↓   ↓
//       ↓   ↓   3-Argumento
//       ↓   ↓   ↓
//       ↓   ↓   ↓        4-Argumento
//       ↓   ↓   ↓        ↓                              5-Argumento
//       ↓   ↓   ↓        ↓                              ↓
//       ↓   ↓   ↓        ↓                              ↓
//       ↓   ↓   ↓        ↓                              ↓
//       ↓   ↓   ↓        ↓                              ↓
setCoche(5 ,12 , 3 , "Ferrari 500 TRC de Scaglietti" , "96961" );
```
