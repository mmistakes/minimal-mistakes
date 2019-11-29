#!/bin/bash
set -x

if [[ $TRAVIS_OS_NAME != 'linux' ]]; then
  brew update > brew-update.log 2>&1
  # fix an issue with libtool on travis by reinstalling it
  brew uninstall libtool;
  brew install libtool dejagnu;
else
  sudo apt-get clean # clear the cache
  sudo apt-get update
  case $HOST in
      aarch64-linux-gnu | powerpc64le-unknown-linux-gnu | mips64el-linux-gnu | sparc64-linux-gnu)
          ;;	  
      alpha-linux-gnu | arm32v7-linux-gnu | m68k-linux-gnu | sh4-linux-gnu | s390x-linux-gnu )
	  sudo apt-get install qemu-user-static
	  ;;
      hppa-linux-gnu )
	  sudo apt-get install -y qemu-user-static g++-5-hppa-linux-gnu
	  ;;
      i386-pc-linux-gnu)
	  sudo apt-get install gcc-multilib g++-multilib;
	  ;;
      moxie-elf)
	  echo 'deb https://repos.moxielogic.org:7114/MoxieLogic moxiedev main' | sudo tee -a /etc/apt/sources.list
	  sudo apt-get clean # clear the cache
	  sudo apt-get update ## -qq
	  sudo apt-get update
	  sudo apt-get install -y --allow-unauthenticated moxielogic-moxie-elf-gcc moxielogic-moxie-elf-gcc-c++ moxielogic-moxie-elf-gcc-libstdc++ moxielogic-moxie-elf-gdb-sim
	  ;;
      i686-w64-mingw32)
	  sudo apt-get install gcc-mingw-w64-i686 binutils-mingw-w64-i686 wine;
	  ;;
  esac
  case $HOST in
      arm32v7-linux-gnu | aarch64-linux-gnu | ppc64le-linux-gnu | s390x-linux-gnu)
          # don't install host tools
          ;;
      *)
	  sudo apt-get install dejagnu texinfo sharutils
	  ;;
  esac
fi
