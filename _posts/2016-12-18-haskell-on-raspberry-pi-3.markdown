---
layout: post
title: Haskell on Raspberry Pi 3
modified: 2017-03-24T14:36:18+01:00
categories: haskell
excerpt: Installing Haskell and Stack on Raspberry Pi 3 is not painless but easier than you think.
tags: [haskell, stack, rapsberry-pi, ghc, arm, armv7, ghci, haskell-stack, raspberry]
date: 2016-12-18T14:36:18+01:00
comments: true
---

My [girlfriend](https://gotatiana.com/) gave me from Christmas a [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
which packs a 1.2GHz [ARM Cortex-A53](https://en.wikipedia.org/wiki/ARM_Cortex-A53)
CPU and 1024MB of RAM.

This is a wonderful gift for someone that likes to tinker like myself and I was
immediately very enthusiastic about it. Being passionate about [Haskell](https://www.haskell.org/)
I decided that the first thing to do was to get it running on my new toy.

So here is my guide to get __Haskell running on the Raspberry Pi__.

{% include _toc.html %}

# Installing the OS

To get the OS on my Raspberry Pi I formatted my microSD card and got [NOOBS](https://www.raspberrypi.org/downloads/noobs/)
on it. From there I booted and via the on screen OS selector I installed
__raspbian lite__. At the time of writing the version of raspbian is __Jessie__.

Once the os is installed you can login on console with the default credentials:

```
username: pi
password: raspberry
```

# Updating packages

Once you have installed the OS and are able to log in it's time to update the list
of packages.

To do so run:

```
$ sudo apt-get update
```

# [Installing Stack](#installing-stack)

I prefer to use [Stack](https://www.haskellstack.org/) to manage my Haskell installation
so the first step is to get a version of stack for the Raspberry Pi.

At the time of writing Stack is not available on Raspbian via apt-get so I tried to fall
back to the [generic linux option](https://docs.haskellstack.org/en/stable/install_and_upgrade/#linux).

The `get-stack.sh` from [https://get.haskellstack.org/](https://get.haskellstack.org/)
has been [just updated](https://github.com/commercialhaskell/stack/pull/2857)
to download the correct binary on ARM too. So just run

```
$ curl -sSL https://get.haskellstack.org/ | sh # As of 24/03/2017 this stopped working see below
```

__Update__:
as of March 24th 2017 the script at [https://get.haskellstack.org/](https://get.haskellstack.org/)
is broken again because the binary of Stack 1.4 for ARM is missing from https://www.stackage.org/stack/

You can still get the Stack binary for version 1.3.2 [here](https://github.com/commercialhaskell/stack/releases/download/v1.3.2/stack-1.3.2-linux-arm.tar.gz)
and place it at `$USR_LOCAL_BIN/stack` in your system.

Once Stack is installed you can proceed with the Install LLVM step.

# Install LLVM

Note: I actually did this AFTER the next step. I got errors about LLVM missing
while installing ghc (it did succeed however). So I believe this step must be done
first.

At this point before you do anything you need to install LLVM (3.7 at the moment of writing)
and make some symbolic links to get things to fall into place correctly.

Run

```
$ sudo apt-get install llvm-3.7
$ ln -s /usr/bin/opt-3.7 /usr/bin/opt
$ ln -s /usr/bin/llc-3.7 /usr/bin/llc
```

# Install ghc & ghci

After installing LLVM you can now install `ghc` and `ghci` by running

```
$ stack update && stack setup
```

# Working around bugs

Now, if you were to stop here you Haskell code on the Raspberry Pi would still
not compile with `stack build`.

At the moment of writing there is an [unfortunate bug](https://github.com/commercialhaskell/stack/issues/2708)
with `ghc-options` that prevents `-opta-march=armv7-a` from being passed on to ghc.

There are two ways to solve the problem. Either wrap ghc in a script or modify
the settings file.

Choose the one that works best for you.

## Wrapping ghc in a script

In this solution we will be [wrapping ghc in a shell script](https://github.com/commercialhaskell/stack/issues/2708#issuecomment-257066662).

```
$ rm ~/.stack/programs/arm-linux/ghc-8.0.1/bin/ghc
$ cat > ~/.stack/programs/arm-linux/ghc-8.0.1/bin/ghc-arm-wrapper.sh << 'END'
#!/bin/sh

ghc-8.0.1 -opta-march=armv7-a $@
END

$ ln ~/.stack/programs/arm-linux/ghc-8.0.1/bin/ghc-arm-wrapper.sh ~/.stack/programs/arm-linux/ghc-8.0.1/bin/ghc
```

## Editing ghc settings

In this solution [suggested on Reddit](https://www.reddit.com/r/haskell/comments/5j0u36/getting_haskell_and_stack_on_a_rapsberry_pi_3/dbcfg3d/)
we well be adding `-mcpu=cortex-a7` to the ghc settings file.

```
$ vi ~/.stack/programs/arm-linux/ghc-8.0.1/lib/ghc-8.0.1/settings
...
 ("C compiler flags", " -marm -fno-stack-protector -mcpu=cortex-a7"),
...
```

# RTS options

My project did build at this point with `stack build`, but when I run the binary
I got the following error:

```
$ hello-exe
hello-exe: unknown RTS option: -N
...
```

To solve this I edited my project's `.cabal` file and removed
`-rtsopts -with-rtsopts=-N` from `ghc-options`

# TL;DR

__Update__: as of March 24th 2017 this script won't work. See the section on
[Installing Stack](#installing-stack)

Apart from removing RTS options form your cabal file (if needed) this should
get you going:

<script src="https://gist.github.com/blender/7c4c6e7224e622ee078e5b3320ac951d.js"></script>
