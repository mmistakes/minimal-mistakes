---
layout: post
title: A Trip
categories: [blog, travel]
tags: [hot, summer]
---

**17.03 버전만 가능하다고 하는데.....** 실제로 실행해 보니 잘 되지 않는다..


```
root@DESKTOP-VJENG7S:code-machina.github.io# sudo docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.6.0
OpenJDK 64-Bit Server VM warning: Option UseConcMarkSweepGC was deprecated in version 9.0 and will likely be removed in a future release.
Exception in thread "main" org.elasticsearch.bootstrap.BootstrapException: java.nio.file.FileSystemException: /usr/share/elasticsearch/config/elasticsearch.keystore: Operation not permitted
Likely root cause: java.nio.file.FileSystemException: /usr/share/elasticsearch/config/elasticsearch.keystore: Operation not permitted
        at java.base/sun.nio.fs.UnixException.translateToIOException(UnixException.java:100)
        at java.base/sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:111)
        at java.base/sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:116)
        at java.base/sun.nio.fs.UnixFileAttributeViews$Posix.setMode(UnixFileAttributeViews.java:254)
        at java.base/sun.nio.fs.UnixFileAttributeViews$Posix.setPermissions(UnixFileAttributeViews.java:276)
        at org.elasticsearch.common.settings.KeyStoreWrapper.save(KeyStoreWrapper.java:509)
        at org.elasticsearch.bootstrap.Bootstrap.loadSecureSettings(Bootstrap.java:238)
        at org.elasticsearch.bootstrap.Bootstrap.init(Bootstrap.java:295)
        at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:159)
        at org.elasticsearch.bootstrap.Elasticsearch.execute(Elasticsearch.java:150)
        at org.elasticsearch.cli.EnvironmentAwareCommand.execute(EnvironmentAwareCommand.java:86)
        at org.elasticsearch.cli.Command.mainWithoutErrorHandling(Command.java:124)
        at org.elasticsearch.cli.Command.main(Command.java:90)
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:116)
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:93)
Refer to the log for complete error details.
```

```bash
sudo su

wget 
https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/docker-ce_17.03.3~ce-0~ubuntu-xenial_amd64.deb

dpkg -i docker-ce_17.03.3~ce-0~ubuntu-xenial_amd64.deb

apt-get -f -y install

sudo usermod -aG docker $USER

sudo apt-mark hold docker-ce

sudo service docker start

sudo service docker start
```

- [원본 클리앙](https://www.clien.net/service/board/cm_nas/12671058)