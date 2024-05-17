---
title: "4 Nice Ways to Read Files in Scala"
date: 2020-04-30
header:
  image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [scala, io]
excerpt: "Learn to read files in Scala like a boss and compare it to other styles in other languages. We write a simple API which looks almost as easy as Python's read()."
---
One of the hurdles many learners of JVM languages face is: how do I read a goddamn file? And then you have your face blasted with DataInputStreams, FileReaders, buffered this, buffered that, channels or whatever.

In this article I'd like the make things clean and simple, and share code snippets that you can use directly. This is for Scala programmers of all levels and is concerned with reading _text_ files. We'll deal with binary files another time. Assume you have a file path and you want to read some text data from it:

```scala
val filePath = "hating/javas/file/reading/abstractions"
```

## Version 1: the Java way

One of Scala's most powerful features is that, being based on the JVM, allows hassle-free interoperation with Java standard libraries. However, we won't do anything here that involves allocating buffers ourselves. The plain old Scanner will do. A Scanner is a stateful object that allows reading characters or lines directly:

```scala
val file = new File(filePath)
val reader = new Scanner(file)
while (reader.hasNextLine) {
    val line = reader.nextLine()
    // do something with it
    println(line)
}
```

However, this is stateful and employs the abhorrent <a href="https://rockthejvm.com/blog/scala-loops">while loops</a>. Although this could be way uglier, we can do better.

## Version 2: Java-style, friendlier, with cheats

Use a widely used library called Apache Commons and add this to your build.sbt file:

```scala
libraryDependencies += "commons-io" % "commons-io" % "2.6"
```

After that, reading a file should be a piece of cake. Import first:

```scala
import org.apache.commons.io.FileUtils
```

and then:

```scala
val fileContents = FileUtils.readLines(file) // a list of lines that you can now process freely
```

This returns a Java list of lines that you can now process as you see fit. It's much better, because you can now operate with values and expressions rather than <a href="https://rockthejvm.com/blog/variables">variables and instructions</a>. However, still not enough as this is a Java collection, which doesn't have the necessary niceties that play with Scala so well.

## Version 3: the Scala way

No importing some external library. Use a reader called Source:

```scala
import scala.io.Source
```

which comes pre-bundled with Scala. Then, one line:

```scala
val scalaFileContents = Source.fromFile(file).getLines()
```

This now returns an Iterator of the lines in the file. This time, this is a Scala collection, which you can apply map, flatMap, filter, toList, mkString and all the niceties we're used to. The best part is that this iterator is not fully loaded in memory, so unlike version 2, you can read the file slowly rather than load everything in memory and then disposing of the contents.

## Version 4: like a boss

Why can't Scala read a damn file like Python? Just "open" and then "read". Rolling sleeves, and we can:

```scala
def open(path: String) = new File(path)

implicit class RichFile(file: File) {
    def read() = Source.fromFile(file).getLines()
}
```

So we defined a method to obtain a File object by opening the file at the given path. Then we're bringing the big guns and we're enhancing the File type with an implicit class. So when we call read() on a File object, normally the code wouldn't compile, but the compiler will be nice and will wrap the File object into a new instance of RichFile. So we can now say

```scala
val readLikeABoss = open(filePath).read()
```

## Epilogue

In the JVM world - Java in particular, but including Scala - we're still far away from having simple, elegant, intuitive and friendly standard APIs, especially for beginners who just need to read a simple file.
