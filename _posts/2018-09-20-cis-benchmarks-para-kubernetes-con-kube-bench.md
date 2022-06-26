---
title: "CIS Benchmarks para Kubernetes con kube-bench"
author: Jose M
classes: wide
excerpt: "CIS Benchmarks son estándares de seguridad para diferentes sistemas, realizadas por el Center for Internet Security, y que tienen como objetivo hardenizar nuestros Sistemas Operativos. El cumplimiento de estos estándares son comunes en entornos que tienen que cumplir PCI-DSS, GDPR o son de uso gubernamental así que si nos preocupa la seguridad, siempre acertaremos si cumplimos los  CIS Benchmarks."
categories:
  - Herramientas
tags:
  - Kubernetes
  - CIS Benchmark
  - Cumplimiento normativo
  - Containers
---
CIS Benchmarks son estándares de seguridad para diferentes sistemas, realizadas por el [Center for Internet Security](https://en.wikipedia.org/wiki/Center_for_Internet_Security), y que tienen como objetivo *hardenizar *nuestros Sistemas Operativos. El cumplimiento de estos estándares son comunes en entornos que tienen que cumplir PCI-DSS, GDPR o son de uso gubernamental así que si nos preocupa la seguridad, siempre acertaremos si cumplimos los  CIS Benchmarks.
{: style="text-align: justify;"}

Para verificar las reglas de CIS Benchmark vamos a utilizar[ kube-bench](https://github.com/aquasecurity/kube-bench) que es una herramienta de [Aqua](https://www.aquasec.com/) que nos va automatizar todo el proceso de validación de reglas CIS Benchmark para Kubernetes.
{: style="text-align: justify;"}

Validar Workers
---------------

Para validar los nodos podemos levantar un POD que automáticamente nos compruebe cada una de las reglas.
{: style="text-align: justify;"}

```
kubectl run --rm -i -t kube-bench-node --image=aquasec/kube-bench:latest --restart=Never --overrides="{ \"apiVersion\": \"v1\", \"spec\": { \"hostPID\": true } }" -- node --version 1.8
```

Donde --version es la versión de Kubernetes que utilizamos. De momento sólo está hasta la 1.8.

Como curiosidad, en la parte de --override veréis que se le pasa `{ \"hostPID\": true } `esto lo que hace es que el *container* se ejecute con el PID del host para que tenga permisos para hacer los checks en el host.
{: style="text-align: justify;"}

Validar Master
--------------

Para validar el Master, en la documentación de Aqua se indica que debemos ejecutar un *container* en el nodo respectivo. Si permitimos que nuestro nodo *master *ejecute *container*, podemos utilizar *kubectl*.
{: style="text-align: justify;"}

```
kubectl run --rm -i -t kube-bench-master --image=aquasec/kube-bench:latest --restart=Never --overrides="{ \"apiVersion\": \"v1\", \"spec\": { \"hostPID\": true, \"nodeSelector\": { \"kubernetes.io/role\": \"master\" }, \"tolerations\": [ { \"key\": \"node-role.kubernetes.io/master\", \"operator\": \"Exists\", \"effect\": \"NoSchedule\" } ] } }" -- master --version 1.8
```

Si no permitimos ejecución de PODs en el nodo *master*, entonces podemos ejecutar directamente el *container* en el *docker *del nodo *master*.
{: style="text-align: justify;"}

```
docker run --pid=host -t aquasec/kube-bench:latest master
```

Aquí vemos el comando y las salida.
{: style="text-align: justify;"}

[![kube-bench](https://donttouchmy.net/wp-content/uploads/2018/09/Screen-Shot-2018-09-12-at-08.06.23.png)](https://donttouchmy.net/wp-content/uploads/2018/09/Screen-Shot-2018-09-12-at-08.06.23.png)

Más info en https://github.com/aquasecurity/kube-bench

Saludos!