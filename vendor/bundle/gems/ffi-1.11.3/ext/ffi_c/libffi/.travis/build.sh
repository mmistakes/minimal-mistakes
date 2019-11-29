#!/bin/bash

set -x

if [ -z ${QEMU_CPU+x} ]; then
    export SET_QEMU_CPU=
else
    export SET_QEMU_CPU="-e QEMU_CPU=${QEMU_CPU}"
fi

# Default to podman where available, docker otherwise.
# Override by setting the DOCKER environment variable.
if test -z "$DOCKER"; then
  which podman > /dev/null 2>&1
  if [ $? != 0 ]; then
    export DOCKER=docker
  else
    export DOCKER=podman
  fi
fi

function build_cfarm()
{
    curl -u ${CFARM_AUTH} https://cfarm-test-libffi-libffi.apps.home.labdroid.net/test?host=${HOST}\&commit=${TRAVIS_COMMIT}
}

function build_linux()
{
    ./autogen.sh
    ./configure ${HOST+--host=$HOST} ${CONFIGURE_OPTIONS}
    make
    make dist
    make check RUNTESTFLAGS="-a $RUNTESTFLAGS"
    EXITCODE=$?

    gzip -c -9 */testsuite/libffi.log > libffi.log.gz
    echo ================================================================
    echo The logs are too long for travis to handle, so we compress and
    echo uuencode them.  Download, decode and uncompress if you need to
    echo read them.  For example, if you select and save this text
    echo as libffi.uu, run: 'cat libffi.uu | uudecode | gzip -d | less'.
    echo ================================================================
    uuencode libffi.log.gz -
    echo ================================================================
    echo ================================================================

    exit $EXITCODE
}

function build_foreign_linux()
{
    ${DOCKER} run --rm -t -i -v `pwd`:/opt ${SET_QEMU_CPU} -e LIBFFI_TEST_OPTIMIZATION="${LIBFFI_TEST_OPTIMIZATION}" $2 bash -c /opt/.travis/build-in-container.sh
    exit $?
}

function build_cross_linux()
{
    ${DOCKER} run --rm -t -i -v `pwd`:/opt ${SET_QEMU_CPU} -e HOST="${HOST}" -e CC="${HOST}-gcc-8 ${GCC_OPTIONS}" -e CXX="${HOST}-g++-8 ${GCC_OPTIONS}" -e LIBFFI_TEST_OPTIMIZATION="${LIBFFI_TEST_OPTIMIZATION}" moxielogic/cross-ci-build-container:latest bash -c /opt/.travis/build-in-container.sh
    exit $?
}

function build_ios()
{
    which python
# export PYTHON_BIN=/usr/local/bin/python
    ./generate-darwin-source-and-headers.py --only-ios
    xcodebuild -showsdks
    xcodebuild -project libffi.xcodeproj -target "libffi-iOS" -configuration Release -sdk iphoneos11.4
    exit $?
}

function build_macosx()
{
    which python
# export PYTHON_BIN=/usr/local/bin/python
    ./generate-darwin-source-and-headers.py --only-osx
    xcodebuild -showsdks
    xcodebuild -project libffi.xcodeproj -target "libffi-Mac" -configuration Release -sdk macosx10.13
    exit $?
}

case "$HOST" in
    arm-apple-darwin*)
	./autogen.sh
	build_ios
	;;
    x86_64-apple-darwin*)
	./autogen.sh
	build_macosx
	;;
    arm32v7-linux-gnu)
	./autogen.sh
        build_foreign_linux arm moxielogic/arm32v7-ci-build-container:latest 
	;;
    aarch64-linux-gnu| powerpc64le-unknown-linux-gnu | mips64el-linux-gnu | sparc64-linux-gnu)
        build_cfarm
	;;
    m68k-linux-gnu )
	./autogen.sh
	GCC_OPTIONS=-mcpu=547x build_cross_linux
	;;
    alpha-linux-gnu | sh4-linux-gnu | s390x-linux-gnu )
	./autogen.sh
	build_cross_linux
	;;
    *)
	./autogen.sh
	build_linux
	;;
esac
