---
layout: post
title: A logging solution for Windows Phone 8 / Windows 8 app developers
date: 2013-01-25 01:53
author: nicold
comments: true
categories: [app, c#, logging, moder UI, Uncategorized, Windows 8, Windows Phone 7, Windows Phone 8, xaml]
---
<p>I have developed various applications, on both Windows Phone 7 and Windows Phone 8, and many times, I needed to analyze a log related to a strange behavior of one of my apps for a specific user.</p>  <p>Often, it was not a crash but I needed to understand what the user did in order to obtain a specific thing. </p>  <p>The ideal solution, for me, was to be able to read the logging information that, I always put in my code/application, and that I usually read via Visual Studio. </p>  <p>Yes, I’m a big fan of the “DebugWrite()” method :-)… </p>  <p>However, this is impossible on any mobile phone but mine, developer unlocked and connected via USB to my laptop, so, I needed to look for a feasible alternative to this.</p>  <p>Therefore, I have written this logging micro-library, “portable”, that address this problem, logging both:</p>  <ol>   <li>On standard System.Diagnostic.Debug listener</li> </ol>  <ol>   <li>On a string array in memory, where it keeps the last “n” lines you write</li> </ol>  <p>The library is static so, it is easily usable by all components in a project. Furthermore, the library allows you serialize/de-serialize the content of the array on a local storage.</p>  <p>you can find it on MSDN code: <a title="http://code.msdn.microsoft.com/A-logging-solution-for-c407d880" href="http://code.msdn.microsoft.com/A-logging-solution-for-c407d880">http://code.msdn.microsoft.com/A-logging-solution-for-c407d880</a></p>
