---
title: "Optimizar los ejercicios de Red Team con VECTR"
author: Adan Alvarez
classes: wide
excerpt: "En la entrada ATT&CK para AWS hablamos sobre ATT&CK Navigator y adjuntamos un Google Sheet para poder hacer seguimiento sobre nuestro estado de madurez. En esta entrada veremos como dar un paso más utilizando VECTR."
categories:
  - Herramientas
tags:
  - vectr
  - Red team
  - MITRE ATT&CK
  - Purple Team
---
En la entrada [ATT&CK para AWS](https://donttouchmy.net/attck-para-aws/) hablamos sobre ATT&CK Navigator y adjuntamos un Google Sheet para poder hacer seguimiento sobre nuestro estado de madurez. En esta entrada veremos como dar un paso más utilizando [VECTR](https://vectr.io/).
{: style="text-align: justify;"}

VECTR es una herramienta gratuita que facilita el seguimiento de las actividades de Red Team para medir las capacidades de detección y prevención en diferentes escenarios de ataque.
{: style="text-align: justify;"}

Para instalarla en un servidor CentOS son necesarias las siguientes dependencias:
{: style="text-align: justify;"}
```
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.reposudo yum install docker-ce git unzip wget\
sudo systemctl enable docker.service\
sudo systemctl start docker.service\
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose\
sudo chmod +x /usr/local/bin/docker-compose\
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
Tras instalar las dependencias descargamos la herramienta de GitHub y la descomprimiremos:
{: style="text-align: justify;"}
```
mkdir -p /opt/vectr\
cd /opt/vectr\
wget https://github.com/SecurityRiskAdvisors/VECTR/releases/download/ce-5.7.0/sra-vectr-runtime-5.7.0-ce.zip -O /opt/vectr\
unzip sra-vectr-runtime-5.7.0-ce.zip
```
Tras descomprimirla accedemos a la carpeta y editamos el fichero .env
{: style="text-align: justify;"}

En este deberemos modificar:
{: style="text-align: justify;"}
```
VECTR_HOSTNAME: URL con la que accederemos a la herramienta
VECTR_PORT: Puerto de escucha
VECTR_DATA_KEY: Clave de cifrado de la base de datos Mongo
CAS_ENCRYPT_PASSWORD: Clave de cifrado de la base de datos CAS
MONGO_INITDB_ROOT_PASSWORD: Contraseña root de la base de datos Mongo
COMPOSE_PROJECT_NAME: Nombre que tendrán los contenedores
```
Una vez modificados esos valores, guardamos el fichero y estamos listos para mediante docker-compose arrancar la herramienta:
{: style="text-align: justify;"}
```
docker-compose up -d
```
Tras esto, podemos acceder mediante navegador al hostname y puerto configurados.
{: style="text-align: justify;"}

Las credenciales por defecto son: admin / 11_ThisIsTheFirstPassword_11

VECTR nos permite crear «Assessments» utilizando templates como puede ser el de MITRE ATT&CK:
{: style="text-align: justify;"}

[![](https://donttouchmy.net/wp-content/uploads/2020/09/assesment-300x109.png)](https://donttouchmy.net/wp-content/uploads/2020/09/assesment.png)

Si seleccionamos Atomic Read Team (MITRE ATT&CK). Se nos añadirán múltiples campañas y sus casos:
{: style="text-align: justify;"}

-   ![VECTR](https://donttouchmy.net/wp-content/uploads/2020/09/TestCases.png)

Si en nuestra evaluación no queremos añadir todas las tácticas podemos deseleccionarlas y dejar solo las que nos aporten valor.
{: style="text-align: justify;"}

Tras confirmar las tácticas y crear la evaluación tendremos el siguiente cuadro de mandos en el cual podremos ver el progreso y resultados a alto nivel de cada una de las tácticas:
{: style="text-align: justify;"}

![VECTR](https://donttouchmy.net/wp-content/uploads/2020/09/dashboard-1.png)

Si accedemos a una de ellas, por ejemplo Movimiento Lateral (Lateral Movement), veremos lo siguiente:
{: style="text-align: justify;"}

![VECTR](https://donttouchmy.net/wp-content/uploads/2020/09/LAteral-Movement-1-1024x493.png)

Podremos observar una serie de técnicas ya creadas y además podremos añadir nuevas. Cada una de las técnicas cuenta con información detallada de las acciones realizadas por el Red Team y qué resultados se obtuvieron por parte del Blue Team.
{: style="text-align: justify;"}

![VECTR](https://donttouchmy.net/wp-content/uploads/2020/09/tecjnique-1-1024x544.png)

Según avance el ejercicio iremos marcando cada tarea como iniciada, pausada, completada y añadiendo información sobre los resultados de cada una de las técnicas utilizadas.
{: style="text-align: justify;"}

Esto nos permitirá realizar un seguimiento de todas las acciones realizadas, poderlas replicar fácilmente y saber cuál es nuestra madurez en detección.
{: style="text-align: justify;"}

VECTR también cuenta con un apartado de reportes muy completo. Entre ellos podremos ver un reporte a alto nivel indicando el número de pruebas realizadas, cuantas fueron detectadas, cuantas fueron bloqueadas y cuantas no se detectaron:
{: style="text-align: justify;"}

![VECTR](https://donttouchmy.net/wp-content/uploads/2020/09/report-1-1024x429.png)

Además de este resumen a alto nivel y otros tipos de reporte disponibles podemos exportar el resultado a la matriz de ATT&CK:
{: style="text-align: justify;"}

![VECTR](https://donttouchmy.net/wp-content/uploads/2020/09/mitre2-1024x525.png)

Esto reporte nos dará nuestro nivel de madurez en cada una de las técnicas. Además, podremos configurar los filtros de tal manera que solo se muestren las técnicas que afectan a nuestra infraestructura, linux, windows, cloud o la combinación deseada.
{: style="text-align: justify;"}

Como podéis ver, VECTR es una herramienta muy potente y que puede ser de gran ayuda para mejorar nuestros ejercicios de Red Team / Purple Team. Sobre todo, para documentar estos, tener una visión de qué áreas necesitan mejora y además tener un histórico que nos permita ver nuestra progresión en el tiempo.
{: style="text-align: justify;"}
