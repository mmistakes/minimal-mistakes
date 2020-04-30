---
title: How I managed to install OpenCV3 with Python3 bindings on a macOS
tags:
  - python
  - opencv
  - macOS
  - installs
excerpt: "Installing OpenCV3 with Python3 bindings on macOS, the ultimate guide"
---

I am on macOS Sierra 10.12.5 and I am trying to upgrade my OpenCV2 to OpenCV3 as I want to take advantage of the new things in the library due to some Computer Vision work I'm doing. I want to use the Python bindings and ideally have both those for Python2 and for Python3. Currently got OpenCV 2.4.11 with Python2.7 bindings.

My Python installation is the one obtained with Homebrew, not the Mac default one so I'm gonna use that for the task. And the task proved to be a rather annoying challenge indeed. This post is just my little way to give back to the community of wonderful people around who write tutorials, guides and share issues when they try to do these things. I want to hug you all. The post collects all pf the procedure I've followed after several failures, multiple attempts, temporary desires to give up.

First I uninstall OpenCV to make sure no conflicts arise during the process, you never know and for these things it's typically better to do a clean installation.

I find the always excellent Pyimagesearch has a guide on exactly this process, which means it's a known painful process that of installing these sorts of things on Macs. The guide is [here](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/).

So, following guide, I run

`brew tap homebrew/science`

`brew install opencv3 --with-contrib --with-python3 --HEAD`


* `--with-contrib` is meant to install a repository where additional openCV things are, so good to have
*  `--with-python3` is meant to install the bindings for Python3, those for Python2 are automagically installed instead
*  `--HEAD` is for pulling the current Github branch rather than the tagged release one

As for the `--HEAD` part, the guide affirms that this is needed "to avoid the QTKit error that plagues macOS Sierra systems with the current tagged OpenCV 3 releases" and points you to [details](http://www.pyimagesearch.com/2016/11/28/macos-install-opencv-3-and-python-2-7/). These details explain that this has to do with the QTKIT library and a deprecation problem. [QTKIT](https://developer.apple.com/documentation/qtkit) is an Apple thing for media. Turns out though (see later), that I don't really have this problem.

Anyway, the command above fails with

```
Installing opencv3 from homebrew/science
Installing dependencies for homebrew/science/opencv3: numpy
Error: Directory not empty - (/usr/local/Cellar/numpy/1.13.1, /usr/local/Cellar/numpy/1.13.1.tmp)
```

Note that the build cannot build both Python2.7 and Python3 bindings at the same time, so still following the great [Pyimagesearch](http://www.pyimagesearch.com/2017/05/15/resolving-macos-opencv-homebrew-install-errors/) I have been commenting some lines with `brew edit opencv3`:

```
#if build.with?("python3") && build.with?("python")
#  # Opencv3 Does not support building both Python 2 and 3 versions
#  odie "opencv3: Does not support building both Python 2 and 3 wrappers"
#end
```

The Cellar is the place Homebrew installs stuff and then symlinks (or you have to) to where it is actually supposed to be found by Python, see [this explanation](http://rkulla.blogspot.co.uk/2014/03/the-path-to-homebrew.html). It looks like it's trying to install Numpy as a dependency and complains that it finds non-empty directories. I got Numpy already, on Python3, so really not sure what this is about.

So just for trying things out, I decide to install OpenCV3 without the Python3 bindings, as

```
brew install opencv3 --with-contrib --HEAD
```

which leads itself to the following error:

```
Installing opencv3 from homebrew/science
Cloning https://github.com/opencv/opencv.git
Updating /Users/martina/Library/Caches/Homebrew/opencv3--git
Checking out branch master
Cloning https://github.com/opencv/opencv_contrib.git
Updating /Users/martina/Library/Caches/Homebrew/opencv3--contrib--git
Checking out branch master
Error: No such file or directory - /private/tmp/opencv3-20170714-55298-snr5jb/3rdparty/ippicv/downloader.cmake
```

And I got lost again. Looks like it's not able to compile/make the branch version for some reason (lacks a file). Just for keeping trying things out, I remove the `--HEAD` flag as well.

```
brew install opencv3 --with-contrib
```

This works!!! I am about to throw a party but then I remember I am not in possession of the highly sought-after Python3 bindings, so have to hold off for now.

Now still following the guide I need to have the bindings where they should be so Python can find them, so I run

```
echo /usr/local/opt/opencv3/lib/python2.7/site-packages >> /usr/local/lib/python2.7/site-packages/opencv3.pth
```

which creates this `.pht` file telling Python to look for additional packages in the right place. After this, running `import cv2` from Python2.7 works and I'm half happy. I got to where I was before, plus I have the updated OpenCV.

Now I'm feeling brave, I really want to go past that annoying Numpy blocker, and what I decide to do is (I guess `.tmp` must be some non-important temporary folder...)

`rm -r /usr/local/Cellar/numpy/1.13.1.tmp/`

and then

`brew install opencv3 --with-contrib --with-python3`

which works!! This is the ultimate command to run to complete installation.

Again now, and still following guide, have to symlink the Python3 bindings as well. But first have to get rid of the fact that there is a file with a "wrong" name:

`mv /usr/local/opt/opencv3/lib/python3.6/site-packages/cv2.cpython-35m-darwin.so /usr/local/opt/opencv3/lib/python3.6/site-packages/cv2.so`

then

`echo /usr/local/opt/opencv3/lib/python3.5/site-packages >> /usr/local/lib/python3.5/site-packages/opencv3.pth`

And now I'm really done.
