---
layout: post
title:  "How to build filebeat on windows 10"
subtitle: "Let's dance with golang"
author: "코마"
date:   2019-06-23 00:00:00 +0900
categories: [ "golang", "build", "filebeat"]
excerpt_separator: <!--more-->
---

Hello again, This is CoMa (Code-Machina). Today, I introduce How to build filebeat on windows 10. This is quite easy, and quick. Just Follow me. 😺

<!--more-->

# What is A filebeat?

Filebeat is a log shippper maintained by elastic group. You can download it freely from github.com/elastic/beats. Why should you build it? 

Because it will let you give yourself a ability to make a own your *beat. Now let's get to the point.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 수평형 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7572151683104561"
     data-ad-slot="5543667305"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## Goal

- Build Filebeat.

## Pre-requisite

- TDM-GCC
- go
- mage

## Step1. Install Mage

Install Mage. Just follow the below code snippets.

```CMD
go get -u -d github.com/magefile/mage
cd %GOPATH%/src/github.com/magefile/mage
go run bootstrap.go
```

## step2. Install tdm-gcc-x64

Follow the below link, and then install it on your windows 10.

- [tdm-gcc Home : Download Page](http://tdm-gcc.tdragon.net/download)

## step3. Clonning beats Repo

Clone beats repo using git

```CMD
REM Windows Commands
mkdir %GOPATH%/src/github.com/elastic
git clone https://github.com/elastic/beats %GOPATH%/src/github.com/elastic/beats
```

## step4. Set Windows Environment Variables

Maybe you tried to install serveral gcc packages from other sources. But only when you build your code, you need tdm-gcc compiler.
So, just change an order of `%PATH%`.

```cmd
set PATH=C:\TDM-GCC-64\bin\;%PATH%
where gcc
C:\TDM-GCC-64\bin\gcc.exe
....
(생략)
```

## step5. Build filebeat 

Finally, You can build filebeat.

```cmd
REM filebeat 경로로 이동
cd %gopath%\src\github.com\elastic\beats\filebeat
REM filebeat 빌드
make.bat build
REM filebeat 실행 파일 생성 체크
dir filebeat.exe
```

# Refs.

- [Beat Dev Guide](https://www.elastic.co/guide/en/beats/devguide/current/beats-contributing.html#setting-up-dev-environment)
- [github.com : mage](https://github.com/magefile/mage)



