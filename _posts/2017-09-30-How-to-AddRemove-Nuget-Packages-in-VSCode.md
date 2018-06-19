---
title:  How to - AddRemove Nuget Packages in VS Code
categories: 
  - dev
tags:
  - c#
  - vscode
---

Those who have used Visual Studio, would know how easy it is to add a Nuget package or a reference to a project. But, this has not been the case with VS Code. VS Code follows a command line first behavior. Although someone could argue that there is a plugin for all sort of tasks. But, I say, using command line is fun.

How to - Add Nuget packages
---------------------------

The command to add nuget package is :

```
dotnet add [PROJECT] package <PACKAGE_NAME> [-h|--help] [-v|--version] [-f|--framework] [-n|--no-restore] [-s|--source] [--package-directory]
``` 

A simple example to add the nuget package would be :

```
dotnet add package NewtonSoft.Json
```

This adds the nuget package, with the latest version to the current project. Now the _csproj_ file of your project will look something like this :

``` xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
    </PropertyGroup>
    <ItemGroup>
    <PackageReference Include="NewtonSoft.Json" Version="10.0.3" />
    </ItemGroup>
</Project>
```
    

How to - Add a Nuget package from a local folder
------------------------------------------------

If you have a nuget package on your local machine, you can do the following

```
dotnet add package log4net -s C:\log4net-2.0.8-src\log4net-2.0.8
``` 

This adds the nuget package available in the specified folder. This will have a similar output on the _csproj_ file of the project as mentioned above.

How to - Remove a Nuget package from a project
----------------------------------------------

You can remove an already added nuget package using the following command :

```
dotnet remove [PROJECT] package <PACKAGE_NAME> [-h|--help]
```    

For example :

```
dotnet remove package log4net
```    

This removes the log4net reference from the current project. This will reflect in the _csproj_ file of the project as well.

``` xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
    </PropertyGroup>
</Project>
``` 

> References : [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-add-package)