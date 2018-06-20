---
title: How to – AddRemove references in Visual Studio Code
categories: 
  - dev
tags:
  - csharp
  - vscode
  - how-to
---

Adding references and nuget packages to projects is a common thing in development. I have already written a blog on [how to add/reomve nuget packages in vs code](http://blog.ajalex.com/2017/09/30/how-to-addremove-nuget-packages-in-vs-code/).

How to - Add reference to another project
-----------------------------------------

Let's see how to add and remove project references using command line in Visual Studio Code. The command is :

```
dotnet add [PROJECT] reference [-f|--framework] <PROJECT_REFERENCES> [-h|--help]
``` 

For example :
```
dotnet add reference ..\ReferenceCheckLibrary\ReferenceCheckLibrary.csproj
```
    

Now the _csproj_ file of the project would look like this :

``` xml
<Project Sdk="Microsoft.NET.Sdk">
    <ItemGroup>
    <ProjectReference Include="..\ReferenceCheckLibrary\ReferenceCheckLibrary.csproj" />
    </ItemGroup>
    <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
    </PropertyGroup>
</Project>
```
    

How to - Remove existing reference from a project
-------------------------------------------------

The command is :
```
dotnet remove [PROJECT] reference [-f|--framework] <PROJECT_REFERENCES> [-h|--help]
```
    

For example :
```
dotnet remove reference ..\ReferenceCheckLibrary\ReferenceCheckLibrary.csproj
```
    

This would reflect in the _csproj_ file of the project. It would look like :

``` xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp2.0</TargetFramework>
    </PropertyGroup>
</Project>
```
    

How to - List all the existing reference of a project
-----------------------------------------------------

The command is :

    dotnet list [<PROJECT>] reference [-h|--help]
    

For example :

    dotnet list reference
    

This command would output :

    Project reference(s)
    --------------------
    ..\ReferenceCheckLibrary\ReferenceCheckLibrary.csproj
    

> References : [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-add-reference)