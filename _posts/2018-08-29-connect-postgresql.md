---
title: C++ using libpq
key: 20180829
tags: c++ casting libpq qt
---

Qt Gui 환경을 통해 C++ 언어에서 libpq 를 사용하고 이를 이용해 DB 에 연결하는 예제를 구성한다.
C++ 이 빌드나 여러면에서 복잡하고 짜증날 요소가 많다. 하지만 꾹 참고 끝까지 버텨야 된다. 시작이 어렵지 시작이 가능하면 나머진 그렇게 어렵지 않다. 마음을 고요하게 유지하고 서두르지 않는다. 오늘 안된다면 내일이 있다.

<!--more-->

**참조 링크**
- [libpq를 이용한 C프로그래밍](http://yeobi27.tistory.com/entry/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-libpq%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-C%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-DB%EC%97%B0%EB%8F%99)

**읽기 전에**
- libpq

# Qt 환경

## 헤더 등록

헤더 경로를 컴파일러에게 알려주어야 하는데 Qt Creator 에서 어떻게 설정하는지 궁금하다.

아래의 절차에 따라서 외부 라이브러리를 등록할 수 있다.



## 라이브러리 등록

윈도우 환경에서는 DLL 을 사용해야 하는데 Qt Creator 에서 DLL 등록을 어떻게 하는지 궁금하다.

**사실 등록이라는 표현보다는 경로를 잡아주거나 실행 위치에 DLL 을 복사한다거나의 행위라고 말하는것이 좋을 듯하다.**

아래의 경로를 보면 libpq-example-1.exe 파일을 실행시키기 위해 Qt 관련 dll 및 참조하는 libpq.dll 파일을 복사하였다. 분명 이러한 복사를 자동으로 수행하도록 Qt Project 파일에서 정의가 가능할 것으로 생각 되지만 아직은 현재의 수준에 그쳐 있다.

![Alt][img10]

위의 조치를 취한 뒤에 실행한 결과 정상적으로 동작하는 것을 확인할 수 있었다.

## 삽질

libpq 를 Qt 에서 사용하기 위해 삽질 중

### libpq.lib 임포트하기

윈도우 환경에서 libpq.lib 를 사용하려고 한다.

- [libpq-fe.h 임포트](https://stackoverflow.com/questions/15822893/add-libpq-fe-h-to-qt-existing-project)

- [3rd Party Libraries](http://doc.qt.io/qt-5/third-party-libraries.html)

### Qt 3rd Party

Qt 에서 제공하는 3rd Party 추가 가이드를 따라해 보면서 3rd 파티 추가시 필요한 요건이 무엇인지를 파악한다.


### libpqxx 빌드

libpqxx 라는 것이 있다. 이를 빌드하고 3rd Party로 넣어 보자. 그리고 모든 환경을 Mingw-w64-x86_64-gcc 로 통일한다. Mingw 를 통해 가능함을 보이고 MSVC 로 넘어간다.

- [libpqxx](http://pqxx.org/development/libpqxx/)
- [Build libpqxx on msys2 mingw-64bit](https://hectorhon.blogspot.com/2018/05/building-libpqxx-on-msys2-mingw-64-bit.html)

> "Build libpqxx on msys2 mingw-64bit" 내용은 상당히 중요하다. Makefile 에서 수정이 필요한 내용을 언급해 준다.

### Qt in mingw-w64

**참조 링크**
- [Qt Wiki - MinGW 64bit, 중요](https://wiki.qt.io/MinGW-64-bit)

Qt 를 MSYS2 의 Mingw64 환경에서 toolchain 을 빌드 (혹은 pre-compiled toochain 을 설치, 현재 진행하고 있는 방법임)하고 이 toolchain 을 통해서 개발하여, 빌드 환경을 통합하고 안정적인 Gui 개발을 한다.

MSYS2 를 적절히 설치하고 업데이트 하였다면 아래의 명령을 입력하여 설치한다.

```
pacman -S mingw-w64-i686-qt-creator mingw-w64-x86_64-qt-creator
```

참고로 설치에 엄청난 시간이 소요된다.

![Alt][img11]

### MSVC 에서는 빌드할 수 없는가?

빌드가 제일 짜증났어요 ㅡㅡ;

### Qt in Mingw-w64-x86_64-gcc

Qt 의 개발 환경을 설치하다보면 Mingw-x86 만 있는 것을 확인할 수 있다. 왜 그런걸까? 언뜻 이해가 되지 않는다.

**Mingw 는 공식적으로 64비트를 지원하지 않는다**
{:.info}

### MSYS2 설치하기

다운로드 경로: https://www.msys2.org/

MSYS2 다운로드: ![Alt][img1]

### Postgresql 을 직접 빌드하려는 이유

Postgresql 을 설치한 뒤에 Include Path 및 Library Path 를 설정하였으나 매번 실패를 거듭하였다. 따라서, 소스 레벨 컴파일을 하고자 아래와 같은 시도를 하게되었다.

#### Mingw-w64-x86_64-gcc 설치

MSYS2 에는 Mingw 64-bit, Mingw 32-bit, MSYS2 MSYS 가 있다. 우리는 MSYS2 Mingw 64-bit 쉘을 통해서 아래의 작업을 수행한다.

유투브(Youtube)에서는 pacman --needed -S git mingw-w64-86_64-gcc base-devel 명령어를 사용하였지만 통하지 않음을 확인하여 명령어 구문을 조금 고쳤다.
{:.info}

```
To install/update git, gcc, and base-devel:
pacman -S git mingw-w64-x86_64-gcc

To clone the git repository locally:
git clone git://git.postgresql.org/git/postgresql.git source

cd source
rel=REL9_5_0
git checkout $rel

cd ../build
mkdir $rel
cd $rel

source={path-to-source}
dist={path-to-output}

$source/configure --host=x86_64-w64-mingw32 --prefix=$dist && make && make install
```

#### MSYS2 build Postgresql

- [Building postgresql with msys2 and mingw under window](https://www.cybertec-postgresql.com/en/building-postgresql-with-msys2-and-mingw-under-windows/)
- [flex install](http://docs.zephyrproject.org/1.8.0/getting_started/installation_win.html)
- [Issue 1829 -  conflicting types for ‘base_yylex’](https://github.com/pipelinedb/pipelinedb/issues/1829)

위의 링크를 참조하게되면 절차는 매우 간략하다. 그러나 무엇이 문제인지는 아직 모르겠음

Issue 1829 를 확인하면 flex 버전 문제임을 밝히고 있다. 따라서 flex 버전을 맞추어 설치가 필요하다.
flex 의 버전을 선택하여 설치하는 방법은 'flex install' 링크를 참조하라. msys repo 에서 다운받아서 설치하는 명령어를 제공한다.

```
pacman -S bison
pacman -R flex
pacman -U http://repo.msys2.org/msys/x86_64/flex-2.6.0-1-x86_64.pkg.tar.xz
```

**github  확인 내용:**
> @yannick so we took some time using your Docker image (thanks!) to take a closer look at what's going on here. The same error is produced when building vanilla PG 9.5.3, which is the version of PG that PipelineDB is currently based on. Note that the latest PG 10 builds just fine on Arch Linux, and thus so will PipelineDB 1.0.0.

>The only apparently relevant difference we were able to see between our build environment and the Arch Linux build environment provided is the flex version. Looking through the headers, any flex version greater than 2.6.0 can cause quite a lot of differences between #defines, resulting in a fairly different parser build.

>I don't have much experience with AL but it didn't seem very straightforward to install a specific version of flex. I think that a good first step towards finally resolving this would be to run flex version 2.6.0. If you can update the Dockerfile to do this we'd be happy to keep looking into it.

#### MSYS2 Build Postgresql 최종

MSYS2, x86_64-w64-mingw32 환경에서 Postgresql 9.5.0 의 빌드를 성공하였다.

따라서 해당 과정을 정확히 기입하여 다시는 고생하지 않도록 한다.

1) MSYS2 설치

MSYS2 공식 사이트에서 설치파일을 다운 받는다. (MSYS2 업데이트는 홈페이지 참조)

MSYS2 Mingw64 를 실행시킨다.

```
pacman -S mingw-w64-x86_64-gcc #
pacman -S git # git 설치
git clone git://git.postgresql.org/git/postgresql.git source
cd source # 다운로드한 소스 폴더 내부 진입
rel=REL9_5_0 # 환경변수 선언
git checkout $rel # checkout 부분은 버전 정보를 낮추는 것으로 생각된다.

# install flex 2.6.0, bison 설치
pacman -S bison
pacman -U http://repo.msys2.org/msys/x86_64/flex-2.6.0-1-x86_64.pkg.tar.xz
# CAUTION: flex 버전이 다를 경우 에러가 발생하므로 주의가 필요하다.
```

Source 폴더에서 빌드 시작
```
./configure --host=x86_64-w64-mingw32 --prefix=/c/pgsql/ && make && make install
```

빌드 후 --prefix 옵션으로 지정한 경로에 실행파일이 생성된 것을 확인 가능

/c/pgsql/ 디렉터리 구조:

![Alt][img2]

/c/pgsql/bin 디렉터리 내용: 바이너리 파일이 정상적으로 생성됨을 확인 가능
![Alt][img3]

Qt Creator > Add Library:

![Alt][img5]

Add Library Step 2:

![Alt][img6]

Add Library Step 3: Specify libpq.a file as a library file

![Alt][img7]

Add Library Step 4:

![Alt][img8]

Add Library Step 5: Qt Creator generate a configuration which're used by a compiler.

![Alt][img9]

Finally We can see the qt configuration which will be applied in compile & build step

![Alt][img4]

<!-- Image References at the end of the last part of document -->

[img1]: /assets/images/2018-08-29-connect-postgresql/MSYS2-installer-download.png
[img2]: /assets/images/2018-08-29-connect-postgresql/after-building-successfully-pgsql-directory-structure.png
[img3]: /assets/images/2018-08-29-connect-postgresql/pgsql-binary-directory.png
[img4]: /assets/images/2018-08-29-connect-postgresql/add-lib-1.png
[img5]: /assets/images/2018-08-29-connect-postgresql/add-lib-2.png
[img6]: /assets/images/2018-08-29-connect-postgresql/add-lib-3.png
[img7]: /assets/images/2018-08-29-connect-postgresql/add-lib-4.png
[img8]: /assets/images/2018-08-29-connect-postgresql/add-lib-5.png
[img9]: /assets/images/2018-08-29-connect-postgresql/add-lib-6.png
[img10]: /assets/images/2018-08-29-connect-postgresql/copying-libpq_dll-to-debug-folder.png
[img11]: /assets/images/2018-08-29-connect-postgresql/MinGw-w64-Msys2-Qt5_11_1.png

---

If you like the post, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
