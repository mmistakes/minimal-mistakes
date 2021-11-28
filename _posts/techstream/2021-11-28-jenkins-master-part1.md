---
title: "Jenkins Master Docker - PART1"
date: 2021-11-28
tags: [Devops, Jenkins, Docker]
category: Tech
excerpt: "Jenkins Master + Nginx Docker - PART1"
search: true
toc: true
toc_label: "Table of contents"
toc_sticky: true
---

{% assign path_to_post_images = "images/posts/techstream/2021-11-28-jenkins-master-part1" %}

## Jenkins master with docker and docker-compose

Jenkins is one of the most popular CI/CD tools which allow automating workflows and processes.
In this post, we will describe how to deploy Jenkins in a local server using docker and docker-compose.
Implementation Jenkins through docker allows:

* Jenkins configuration files live inside the container rather than the host machine.
* Docker instances are easier to manage and repeatable if you are interested in running Jenkins on multiple platforms.
* You can easily create and destroy the Jenkins server and persist Jenkins data through volumes so we don't need to re-run the Jenkins setup.

By default, Jenkins comes with its own built-in Winstone web server listening on port 8080, which is convenient for getting started. But in production systems, Jenkins should be secured by setting SSL to protect passwords and sensitive data transmitted through the web.

### Prerequisites:

* docker
* docker-compose

### Architecture

<div style="text-align:center"><img src="{{ site.url }}{{ site.baseurl }}/{{path_to_post_images}}/arch_jenkins_docker_compose.png" /></div>

### Setting up Jenkins Master + Nginx Docker/Docker-compose

#### Project file structure

```
|-- docker-compose.yml # Jenkins Master + Nginx docker-compose file
`-- nginx
    |-- certs # Nginx private key and certificate
    |   |-- jenkins.crt
    |   `-- jenkins.key
    `-- conf.d
        `-- jenkins.conf # Nginx configuration file
```

#### Nginx configuration

Let's start by creating an Nginx configuration as a reverse proxy to direct client requests to Jenkins:

```
# jenkins.conf
server {
  listen 80;
  server_name hostname.example.com;
  server_tokens off;
  return 301 https://$host:443$request_uri;
}

server {
  listen      443 ssl http2;    # Listen on port 443 for IPv4 requests

  server_name     hostname.example.com;

  ssl_certificate /etc/ssl/jenkins.crt;
  ssl_certificate_key /etc/ssl/jenkins.key;

  access_log      /var/log/nginx/jenkins/access.log;
  error_log       /var/log/nginx/jenkins/error.log;

  server_tokens off;

  location / {
    proxy_set_header        Host $host;
    proxy_set_header        X-Real-IP $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header        X-Forwarded-Proto $scheme;

    proxy_pass          http://jenkins_master:8080;
    proxy_read_timeout  90;
    # Fix the “It appears that your reverse proxy set up is broken" error.
    proxy_redirect      http://jenkins_master:8080 https://<hostname.example.com>;

    # Required for new HTTP-based CLI
    proxy_http_version 1.1;
    proxy_request_buffering off;
    proxy_buffering off;
    add_header 'X-SSH-Endpoint' '<hostname.example.com>:50000' always;
  }
}
```
**NOTE:** You will need to replace `<hostname.example.com>` with your server DNS name.
Place the `jenkins.conf` under `nginx\conf.d`

The next step will be to generate an SSL certificate and a private key.
You can generate a self-signed certificate and key using the command below:
```
openssl req -newkey rsa:2048 -keyout jenkins.key -x509 -days 365 -out jenkins.crt
```
Else you can provide your SSL certificate or generate one using [letsencrypt](https://letsencrypt.org/getting-started/)
Place the `jenkins.key` and `jenkins.crt` files under `nginx\certs`

#### Docker-compose set up
The bellow docker-compose file will:
* Pull the latest **official** Docker containers of Jenkins master and Nginx.
* Set up a base configuration for both containers.
* Mount volumes in a way that will persist data.
* Expose the correct containers ports.
* Set jenkins master time zone.

```
version: '3.7'
services:
  jenkins_master:
    user: root
    image: jenkins/jenkins:lts
    pull_policy: always
    container_name: jenkins-server
    volumes:
      - ./jenkins_home:/var/jenkins_home
      - ./jenkins_log:/var/log/jenkins
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/local/bin/docker:/usr/local/bin/docker
    ports:
      - 50000:50000
      - 50022:50022
    expose:
      - 8080
    environment:
      JAVA_OPTS: "-Djenkins.install.runSetupWizard=false -Djava.awt.headless=true"
      TZ: "Canada/Eastern"
    networks:
      - jenkins_nw
    restart: unless-stopped
  nginx:
    image: "nginx:latest"
    ports:
      - 80:80
      - 443:443
    container_name: nginx-proxy
    volumes:
      - ./nginx/certs:/etc/ssl
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx_log:/var/log/nginx/jenkins
      - /var/run/docker.sock:/tmp/docker.sock:ro
    networks:
      - jenkins_nw
    depends_on:
      - jenkins_master
    restart: unless-stopped

networks:
  jenkins_nw:
    driver: bridge
```

#### Run the containers
To start your jenkins master and nginx containers run the command:
```
docker-compose up
```

#### Github Repo
You can find the project repository [here](https://github.com/taherbs/Jenkins-Master).

Questions and comments are welcome. Please share, if this helped you.
