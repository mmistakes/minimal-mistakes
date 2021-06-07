---
title: "Introduction to Linux Command Line"
related: true
categories:
  - Linux
tags:
  - linux
  - commandline
---

Whenever it comes to some serious stuff like using a cluster or open-source software like OpenFOAM people are faced with famous Linux commandline. It was scarry at the first sight but later on when you get used with him, he will be your best friend.

Here some basic commands that it as good start point

When you open a terminal you might be only see a blinking cursor

If you type pwd, this will give you your current working directory's absolute path

Here my current terminal output

```shell
pwd
/home/kursayurt
```

Now I know that I am on my home directory. I want to know which files or directories inside this directory. Simply typing ls is gives you that ones

```shell
ls
 Blog
 Desktop
 Documents
 Downloads
 hello.cpp
 Pictures
 Project
 Public
 Templates
 TUM
 Videos
 yd
```

As you see here is a _hello.cpp_ file and some other directories are around here

Lets go to my Desktop directory using cd command

```shell
cd Desktop
pwd
/home/kursatyurt/Desktop
```

Now as you see I am changed the current directory to my Desktop

```shell
ls
Ch8Sub.pdf               worksheet2.pdf
cfdlab-lecture-notes.pdf
ws-navier-stokes.pdf
```

There is pdf files around. If I want to open one of them I can simply open them using xdg-open command which is open any type of file using default software defined by system

```shell
xdg-open woorksheet2.pdf
```

To go back we can type

```shell
cd ..
pwd
/home/kursatyurt
```

This take us one directory back.

Now if I want to copy a file from my Desktop to Home directory, I can follow this thing.

```shell
cp ./Desktop/worksheet2.pdf .
```

Here _cp_ command takes two arguments first one is source and the second one is destination

_./_ denotes from current directory by this way we can espace from writing absolute path. Also in the second argument _._ means here.

If we want to move a folder or file we use _mv_ command which is similar to _cp_, one important thing about copy is you cannot copy folder using _cp_ command alone you need to give recursive flag _-r_

```shell
cp -r /source/directory /destination/directory
```

By this way one can copy a folder.

In order to create a new directory we are using mkdir command

```shell
mkdir directoryname
```

This creates a new directory under our current directory as like any other linux command we can do operation other than our current directory giving absolute path

```shell
mkdir /absolute/path/to/directory
```

Now take a look to removing files/directories. An important thing about removing is that this operation is irreversible, there is no Trash Bin that deleted files from commandline goes.

Lets first look into deleting files

```shell
rm FileName
```

Removing directories are requires a recursive operation

```shell
rm -r DirectoryName
```

One other important thing is of course when you are doing an operation or running a program you might want to cancel that process. For this purpouse _[Control]+c_ is used.
