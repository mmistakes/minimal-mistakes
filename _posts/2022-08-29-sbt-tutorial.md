---
title: "An introduction to SBT"
date: 2022-08-29
header:
    image: "/images/blog cover.jpg"
tags: [scala, beginners, sbt]
excerpt: "Introduction to SBT"
---
_This article is written by Yadu. He loves to learn new languages, libraries and technologies whenever he gets time. He also loves writing Scala articles, especially for the new-comers to Scala._


## Introduction
SBT is the most popular build tool in the scala ecosystem. SBT provides very rich DSL to configure the scala project. It is also extensible and supports customised plugins to ehanance the project.

## Installation
There are multiple ways to install the sbt. 
- Manual Installation using the executable depending on the OS
- Using Coursier (https://www.scala-lang.org/download/)

## Basics of SBT
The core of sbt is a file named as _build.sbt_. We can provide the needed configuration options within the build.sbt. 

### Simplest sbt project

Let's look at a simple sbt project. 
First, let's create an empty directory. We can then create an empty file within the directory as build.sbt.
In build.sbt, let's configure the scala version of the project we are going to use:

```
scalaVersion := "2.13.8"
```
Note that, sbt uses a special operator `:=` to assign the value. 

Now, within the same directory, we can just start the sbt session by using the command `sbt`.
If everything is fine, this will load an sbt console successfully. We can execute the command `project` within the sbt console to verify and view the sbt project name.

Now, let's look at the other configuration options in the build.sbt file. 
We can provide a version for the project using the option `version` :
```
version := "1.0"
```
** Note that if any change is made to the build.sbt, we need to exit the existing sbt console and restart it for the changes to take effect. Alternatively, we use the sbt command `reload` to forcefully apply the changes. **

We can set the name of the project using `name` and set an organisation for the project:
```
name := "rockthejvm"
organization := "com.rockthejvm"
```
Once we add a name to the project, the sbt console will use the project name when we start the sbt. If it is not provided, the directory name is used instead.

### Project Structure
A simple standard sbt project follows the below structure (assume that the directory is _simpleProject_):

```
simpleProject
  |-- src
        |--- main/scala
        |--- test/scala
  |-- project
  |-- build.sbt
  ```

The scala code and configurations are placed under _main_ or _test_ subdirectories. The _project_ is an optional directory that contains additional setting files needed for configuring the sbt project. 

### SBT versions
By default, the sbt uses the installed sbt version for the projects. We can explicitly provide a specific version of the sbt. This is generally followed since there might be some breaking changes in the sbt releases and that  might unknowingly affect the entire project. 
We can specify the sbt version for the project by using a file called as _build.properties_ under _project_ directory. We can mention the sbt version in the file as:
```
sbt.version=1.6.1
```
This will ensure that the project will use the sbt version as _1.6.1_ even though your might have installed another version of sbt in your machine.

### Small Scala File and SBT Commands
Now, let's try to add a simple Scala file with main method. We will keep this file under the directory _src/main/scala_ with package as _com.rockthejvm_

```
package com.rockthejvm
object Main {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
  }
}
```
Let's start the sbt console by executing the command _sbt_ at the root of the project.
To compile the project, we can use _compile_ in the command. This will compile all the scala files in the project and creates .class files. These files are kept under the directory _target_. 
** SBT uses a feature called as _Incremented Compilation_  to speed up the compilation. In this way, sbt will compile only the modified files, and re-using the previously compile class files for the unchanged files. **
We can use _clean_ command to remove all the generated class files.

We can run the application by using the command _run_. If we have multiple main classes in the project, sbt will show a prompt to select the main class to run. 
In such case, we can use _runMain_ command by passing the class to run as:
```
runMain com.rockthejvm.Main 
```

SBT also allows to do automatic compilation on any source file change. For that, we can start the compile command prefixed by ~ symbol within the sbt shell:
```
~compile
```
Now, sbt will track the source files and if any change is detected in the files, it will automatically recompile them.

## Adding external Dependenncies
So far, we have created scala files without using any external dependencies. Now, let's look at how we can add additional libraries to our project. We can add the dependencies to out project by adding it to the settings _libraryDependencies_. SBT follows ivy style format to define the dependencies as :
```
libraryDependencies += "com.lihaoyi" %% "fansi" % "0.4.0"
```

The method `+=` appends the provided library to the project dependencies. 
An sbt dependency contains mainly 3 parts separated by % symbol. 
The first part is the groupId of the library. The second part is the library name(artifactId) and the third part is the version of the library to be used. If you notice, you can see that a double percentage symbol (%%) is used between groupId and artifactId. 
Scala is not binary compatible with different versions (such as 2.11, 2.12, 2.13 etc). Hence there are separate releases for each scala libraries for each required versions. %% symbol ensures that sbt uses the same version of library as the project.
That means, sbt will automatically append the scala version of the project before trying to find the library. The above dependency code is equivalent to the following format(note that single % is used, but artifactid contains the scala major version):
```
libraryDependencies += "com.lihaoyi" % "fansi_2.13" % "0.4.0"
``` 

SBT also has triple % symbol (%%%), which is used to resolve ScalaJS libraries.

We can add multiple dependencies together by using ++= and Seq :
```
libraryDependencies ++= Seq(
  "com.lihaoyi" % "fansi_2.13" % "0.4.0"
  //Can add more depencies here.
)
``` 

## Scala files under project directory
SBT allows us to keep supporting files for the build as scala files. This helps to configure most of the required configurations in the known format of scala classes. We can place the scala files under the directory _project_. 
Generally we keep the version info as an object in the scala files and these are accessible directly inside the build.sbt files. This was we can keep and track all the dependencies in a single places and access between multiple parts of the project.

## SBT Console
SBT also can start a REPL session within the project using the command _sbt console_. This will start up a REPL session just like the scala repl. However, sbt console repl will also load all the dependencies jars to the classpath so that we can directly import the classes and use them. 
For example, let's try to use the fansi library in the sbt console. 
We can then start up the sbt session by using _sbt_ command. Then we can use the command _console_ within the sbt session to startup a repl. 
Now, within this repl, we have access to the methods from fansi. Hence we can execute this code:
```
val fansiString = Console.RED + "Let's rock the SBT!" + Console.RESET
```
_Console_ is a class from the fansi library to give color to the string.

In the same way, we can access any of the libraries within the project inside the repl. This is really helpful in trying out small pieces of code within a project easily.

## Running Tests
We normally write unit test cases and places them under the relevant package in the directory _src/test/scala_. Let's add _scalatest_ dependency and write a very simple test
```
libraryDependencies += "org.scalatest" %% "scalatest" % "3.2.13" % Test
```

Note the special identifier _Test_ after the last % symbol. This is a special identifier informing the sbt that this library is needed only for the test cases and accessible under _src/test/scala_ directory. Whenever we make the packaged application from our project, these libraries are not added to the package as they are not needed at the application run time. 
Instead of the identifier _Test_, we can also use the string "test" (wrapped in double quotes). However, this practice is discouraged as it doesnt provide typesafety.

Now that we added the dependency, we can add a test file as:
```
package com.rockthejvm
import org.scalatest.funsuite.AnyFunSuite
class SimpleTest extends AnyFunSuite {
  test("comapare 2 strings ignoring case") {
    val calculatedString = "ROCKtheJVM"
    val expectedString = "rockthejvm"
    assert(calculatedString.toLowerCase == expectedString)
  }
}
```

Now, we can run the tests in the project using the command _sbt test_. This will run all the tests that are available in the project under the _src/test/scala_ path. 

It is also possible to run a subset of tests instead of all. For example, let's try to run only one test file. For this we will first start the sbt session. Then within the session we can run:
```
test:testOnly com.rockthejvm.SimpleTest
```
This will test only the _SimpleTest_ file. Note that we need to provide the full package path to resolve the class correctly.
We can also use a wildcard to make it easy to run the test:
```
test:testOnly *SimpleTest
```
This will run all the classes that ends with _SimpleTest_ within the entire project irrespective of the package.

So far, we started the session and then ran the test. We can do that directly from the terminal by using the command:
```
sbt test 
```
This will start the sbt session and then run the test. However, we need to wrap the arguments after _sbt_ if there are some special characters are involved. For example, to run the test using wildcard, we need to use the command:
```
sbt 'test:testOnly *SimpleTest'
```
We can also use double quotes(") instead of single quotes('). This will ensure that all the arguments are passed to the sbt session at once.

We can compile only the test classes by using the command `test:compile` within sbt session. 

## Advanced configuration in build.sbt
In the previous section, we saw configurations like _name_, _organization_, etc. The values we set there are applicable for the entire project. SBT also let's us to do some configurations per scope. 
For example, by default sbt runs all the tests in parallel. If we somehow want to avoid that and run the tests in sequential way, we can set the config option for that. SBT uses the configuration key _parallelExecution_ for that and it is under the scope of Test. 

So, in build.sbt, we can use the setting as:
```
Test / parallelExecution := false
```
This will set the value to false within the scope of test.

There are many such configurations which are configured using the scope. You can think of this something in the lines of _Test.parallelExecution_.

## Multi Module Project
So far we have used a single module project. SBT allows to create multi-module project. This way, we can clearly separate different modules, but we can aggregate and combine different modules together to make a big project. Let's create a simple multi-module project first. For that, we can create a build.sbt file as below within a new empty directory.

```
ThisBuild / scalaVersion := "2.13.8"
ThisBuild / version := "1.0"
ThisBuild / name := "multi-module"
ThisBuild / organization := "com.rockthejvm"

lazy val module_1 = (project in file("module-1"))
lazy val module_2 = (project in file("module-2"))
```
Now, when we can save this file and hit _sbt_ command in the project directoy. This will import the project based on the build.sbt we created and will also create 2 sub directores as _module-1_ and _module-2_ within the directory. The value provided in _file()_ is used to create the sub module name. 

However, as of now there is no relationship between any of the modules. We can explicitly combine both the sub modules together and link to the parent project by adding a new line as belwo to the build.sbt:
```
lazy val root = (project in file("."))
  .aggregate(util, core)
```

In the same way, we can define dependency between multiple submodules. We can make module-2 to depend on module-1 using dependsOn method:

```
lazy val module_2 = (project in file("module-2")).dependsOn(module_1)
```

We can also provide settings for each sub module differently using the settings method:

```
lazy val module_2 = (project in file("module-2")).settings(
  libraryDependencies += "com.typesafe" % "config" % "1.4.2"
)
```

## Multi-Module Build Best Practises
We need to first identify and get clarity on different modules. Let's assume that we are building an application that contains database access, HTTP services, utilities etc. 
Each of these can be separated as a  module. Then we can combine the different parts if one is dependant on another.

Some of the best practices are:
- single build.sbt file and provide all sub-module information in that sbt file.
- Extract the common settings and keep them at beginning (for example, if we are intending to use same scala version for all sub-modules, it is better to be defined at once as full build settings. This will make it easy to update. The same with settings like org name, version numbers etc.) Use the special method `ThisBuild` to ensure that the setting is applied to the entire project.

```
ThisBuild / organization = "com.rockthejvm"
```
This will apply the same organisation to all the sub-modules in this project.

- Extract the same setting needed across multiple sub-modules into a single variable and apply them in the settings. 
For example, if we need to change the target directory name for some of the modules, we can create a setting and apply to only the relevant modules as:
```
lazy val commonSettings = Seq(
  target := { baseDirectory.value / "target2" }
)
lazy val module_1 = (project in file("module-1"))
  .settings(
    commonSettings,
    // other settings
  )
```

- IN the similar way, extract the common dependency libraries into a single place and re-use. 
```
val commonLibs = Seq(
  "com.typesafe" % "config" % "1.4.2"
)

lazy val module_2 = (project in file("module-2"))
.settings(
  libraryDependencies ++= commonLibs ++ Seq("com.lihaoyi" %% "fansi" % "0.4.0")
)
```

## Executing commands on each Module
Now that we are ready with a multi module project, let's see how we can execute sbt commands module wise. 
On the root of the project, if we execute _sbt_ it will start the sbt session. When we run the compile command, it will compile all the modules.

Once we are inside sbt session, we can switch to a particular sub-module using:
```
project module_2
```
Now, when we compile, only this module will get compiled. But, if this module depends on another module, sbt will compile that module as well.

## Plugins
One of the most important features of SBT is its support for plugins. Plugins helps to extend the sbt with custom features which can be published and shared between multiple teams. 
For handling plugins, a special file called as _plugins.sbt_ is used. This file is kept under that directory _project_. Some of the common usages of plugins are:
 - packaging plugins to create jar, exe and other types
 - static code analysis plugins
 - code generation plugins

 Let's look at an example of _sbt-assembly_ plugin. This plugin helps to create an executable jar file from the sbt project. 

 As a first step, we need to create _plugins.sbt_ and add the plugin definition to it:
 ```
 addSbtPlugin("com.eed3si9n" % "sbt-assembly" % "1.2.0")
 ```
 As next step, we need to enable the required configurations needed for this plugin to work. To run a jar, we need to provide the main class to use. We can do that by providing the mainClass in the settings in build.sbt for required module(sometimes, we need to create jar for a sub module, sometime for the  combined project)

 ```
assembly / mainClass := Some("com.rockthejvm.Module2Main"),
 ```

 Now we can use the sbt command `assembly`. This will create the jar file under the relevabt project's target folder. 
 Similar to `assembly/mainClass` there are many other configurations to customise the jar creation.

 This is just one of the plugins. There are many plugins available which can help to improve the development experience.

 ## Global plugins
 In the previous section, we added the plugin to the project. Sometimes, we might need to add some plugins irrespective of the project. For example, there may be some plugin to publish the apps to an internal repository. This need not be kept in the git repo, instead can be shared across all the repositories. 
 SBT allows to do this using global plugins. 

 Instead of keeping the _plugins.sbt_ within the project, we can create the file in the .sbt path. 
 ```
 $HOME/.sbt/1.0/plugins
 ```
 When sbt starts, it will load all the plugins from the global path. For example, in our previous example, We can remove the plugins.sbt from the _project_ directory and keep it in the above path. On reloading the project, it will still load the plugin, but from the global path instead. 
 You can notice in the sbt statrup logs with some similar logs like:
 ```
 [info] loading global plugins from /Users/username/.sbt/1.0/plugins
 ```

 ## Resolvers
 So far, all the library dependencies and plugins are downloaded from the maven central repsitory. Sometimes, we need to use other thirdparty repository for downloading libraries/plugins. To do that, we can provide resolvers in the _.sbt_ files.
 ```
resolvers += Resolver.url("my-test-repo", url("https://example.org/repo-releases/"))
 ```
Now, apart from maven central, sbt will also look at the provided location for libraries. 
We can also add resolver as the local maven directory. For that, we can use the resolver setting as:
 ```
resolvers += Resolver.mavenLocal 
```
This will look for the dependencies in the `.m2` directory.

Apart from maven, we can also configure other services to resolve the libraries. For example, to use a sonatype repo, we can use:
```
resolvers += Resolver.sonatypeRepo("releases") 
```
We can also provide custom location for the resolvers. For example, we can configure a customised central location for the repositories as:
```
resolvers += Resolver.url("my-company-repo", url("https://mycompany.org/repo-releases/"))
```

Similarly, we can add any number of resolvers. 
But note that as the number of resolvers increases, sbt might take more time to startup as it might need to look at all the configured repositories before failing.

## Custom Tasks
Another poewrfule feature of sbt is the ability to create custom tasks. Apart from the in-built task keys, we  can easily create new ones. For example, we can create a custom task to do some particular operation. 

For exaplaining, let's create a task which will just print some text to console. We can extend this to any complex functionality in the same way. 

For that, we can create a scala file which does the printng logic and keep this file under _project_ directory:
```
object CustomTaskPrinter {
  def print() = {
    println("Rock the SBT custom task is here....")
  }
}

```
Next, we can define a custom task in the build.sbt file as:
```
lazy val printerTask = taskKey[Unit]("Simple custom task")
```
The code `taskKey[Unit]` mentions that the task does an action and just returns with a Unit type.

The custom command will be `printerTask`. 
Now, we can define the logic of the custom task in the build.sbt again:
```
printerTask := {
    CustomTaskPrinter.print()
}
```

After this, we can relaod sbt and execute the command `printerTask`. This will print the simple message we created before into the console.

Now, let's create another task to generate a string uuid value:

```
lazy val uuidStringTask = taskKey[String]("Generate string uuid task")
uuidStringTask := {
    StringTask.strTask()
}
```
We will implement the  StringTask as below:
```
object StringTask {
  def strTask(): String = {
    UUID.randomUUID().toString()
  }
}
```

Now we can use this task within previously created `printerTask` and access the UUID generated in the other  task. Let's modify the printerTask as
```
printerTask := {
    val uuid = uuidStringTask.value
    println("Generated uuid is : "+uuid)
    CustomTaskPrinter.print()
}
```
Note that, we used `uuidStringTas.value`. This value method takes the value from the setting and assign to the val uuid.

Now, when we run the command `printerTask`, it will first generate the UUID and then execute printerTask.

So far, we have created custom tasks. Now, let's look at custom settings. Before that, let's understand the difference  between a task and a setting.
In SBT task is something which executes each time invoked. You can think of it like `def` in scala. 
Whereas, a setting is evaluated at the start of sbt session and after that it is memoised. It is like `val` in scala. 
In the similar way, we can create a setting. The only difference is that instead of `taskKey` we will use `settingKey` to define a setting:
```
lazy val uuidStringSetting = settingKey[String]("Generate string uuid task")
uuidStringSetting := {
    val uuid = StringTask.strTask()
    println("Evaluating settings... "+uuid)
    uuid
}
``` 
Now, to see the difference we can modify our previous printertask as:
```
printerTask := {
    val uuid = uuidStringTask.value
    println("Generated uuid from task:"+uuid)
    val uuidSetting = uuidStringSetting.value
    println("Generated uuid from setting:"+uuidSetting)
    CustomTaskPrinter.print()
}
```

Now, when we execute `printerTask`, notice the generated uuid. From task, each time a new UUID value is generated. But from setting, it will print the same value each time. Also, when you start teh sbt session, immediately we can see the print statement `Evaluating settings...` with the same uuid. 

## Command Alias
Another advaced feature sbt supports is the ability to set aliases. This is similar to the alias we create on unix based OSs. 

```
addCommandAlias("ci", ";clean; compile;test; assembly;")
```

Now, in sbt console, we can execute just `ci`. This will automatically execute the configured commands in the order it is defined in the alias _ci_

## Giter Templates
SBT supports quick project bootstrap using giter(g8) templates. We can just execute the command `sbt new <template>` to create a new project based on the template. 
by default, we can only use the templates available under the official g8 repo. However, we can also point to any custom g8 github path to create the project from that template. 

## Cross Build between different Scala versions
Scala releases are not binary compatible with each other. That means, we need to rebuild a library in all the supported versions for the users to use it. 
Manually doing this is not an easy step. SBT tries to makes this easier by providing a feature sto cross build between different versions.
To support multiple versions, we can provide the settings as:
```
val scala212 = "2.12.16"
val scala213 = "2.13.5"
ThisBuild / scalaVersion := scala212
lazy val crossproject = (project in file("crossproject"))
  .settings(
    crossScalaVersions := List(scala212, scala213),
    // other settings
  )
```

Note that, we have mentioned the default version for this project as Scala 2.12 using `ThisBuild/scalaVersion`. So when we compile, it will use scala 2.12. Since we have given the `crossScalaVersions`, we can ask sbt to compile in all supported versions. 
To do that, we need to add the symbol `+` before sbt command:
```
+ compile
```
When we publish our library, we can use `+ publish` command. This will ensure that all the supported versions of the library are published.

## SBT Advanced Configurations and Options
SBT has many configuration options and argument passing on startup. Let's look at some of the important ones.

### Check SBT Version
To check which version of sbt we are using, we can run the command:
```
sbt --version
```

### View Applied SBT Options
We can view all the applied options to SBT using the debug command. 
```
sbt --debug
```
This will show a list of arguments and options applied to the sbt on startup. This is very useful in identifying if the correct parameters are applied or not.

Or we can use  `sbt -v` which will also provide more information related to passed arguments, but not all debug logs.

### Passing Arguments on SBT Start
We can provide jvm arguments on sbt startup. For example, if we want to increase the heap memory of the sbt process, we can start the sbt with the parameter:
```
sbt -v -J-Xmx3600m
```
### SBT Command Alias With JVM Arguments
We have see before on how to create SBT command aliases. We can create alias with passing jvm arguments. 
However, we need to make sure that `fork := true` is set in build.sbt. This setting will ensure that sbt will start a forked jvm and apply the settings.
Without a fork JVM, the jvm parameters we pass are not considered by the sbt.

Let's see how to do that.
Let's add the below line to build.sbt after adding fork:
```
addCommandAlias(
  "runSpecial",
  "; set ThisBuild/javaOptions += \"-Dport=4567\"; run"
)
```
Then, we will update the Main class to read this property and print it:
```
val portValue = Option(System.getProperty("port"))
println("PORT value from argument is: "+portValue)
```

Next, we need to restart sbt to get these changes to effect. Then run the command `runSpecial`. This will print the passed javaOptions.

If we want to pass multiple javaOptions, we need to use a Seq as:
addCommandAlias(
  "runSpecial",
  "; set ThisBuild/javaOptions ++= Seq(\"-Dport=4567\", \"-Duser=rockthejvm\"); run"
)

Now when we run `runSpecial`, the value for `user` will be None. But when we run `runSpecial2`, it will have the value for `user` as rockthejvm.