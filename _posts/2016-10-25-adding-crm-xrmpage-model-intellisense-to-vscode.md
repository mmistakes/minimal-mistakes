---
title: "Adding Dynamics CRM xrm object model intellisense to VSCode"
description: ""
category: 
tags: [Microsoft Dynamics CRM, JavaScript]
---


Microsoft CRMs [xrm object model](https://msdn.microsoft.com/en-us/library/gg328474.aspx) allows developers to build client-side extensions using ECMAScript and HTML. The tooling for this has leant on [Visual Studio](https://visualstudio.com) proper since inception however. 

Using [TypeScript](https://www.typescriptlang.org) declaration files used to describe JavaScript APIs much like C#/Java Interfaces it is possible to add intellisense for the xrm object model to [VSCode](https://code.visualstudio.com). Visual Studio Code is a lightweight, fast and cross-platform code editor from Microsoft that supports multiple languages, [git](https://git-scm.com) and custom extensions.

In this post we'll use the `xrm` declaration files contributed to the [Definitely Typed](http://definitelytyped.org) repository by [David Berry](https://github.com/6ix4our/), [Matt Ngan](https://github.com/mattngan/), [Markus Mauch](https://github.com/markusmauch/) and [Daryl LaBar](https://github.com/daryllabar). You can read more on TypeScript declaration files [here](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com).
- Optional: [Node Package Manager](https://www.npmjs.com).

### Adding the xrm library intellisense to Visual Studio Code using NPM

1. Create an empty project folder and then open the folder in VSCode following `File>Open Folder..` and then clicking `Select Folder`.
2. Open the terminal window in VSCode by following `View>Integrated Terminal`.
3. Install the [TypeScript Definition Manager](http://tsdpm.org), `typings` globally which provides access to TypeScript declaration files e.g. xrm and angular etc.
    {% highlight shell %}
    npm install typings --global{% endhighlight %}
4. Download the XRM declaration files to the by typing the following into the terminal:
    {% highlight shell %}
    typings install dt~xrm --global --save{% endhighlight %}
The above will add a typings folder and an xrm folder nested in it. Inside the xrm folder is where our declaration folder is placed.

5. Create your JavaScript file `File>New File`. Ensure that you change the Language in the editor to JavaScript. To do this type `Ctrl+K M` and select JavaScript from the list that appears.
6. Add the reference path to your declaration file at the top of your JavaScript file.
7. Start writing your CRM application extension code. Et voila Intellisense!
   ![XRM.page Intellisense in Visual Studio Code](/assets/XRM_intellisense.png)

Full credit to David Berry and company because they have also added Help messages on most of the functions and as well.

If you don't want to install [node](https://nodejs.org) which comes with `npm` you have to manually download the declaration files from the [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) git repository and place them in your project folder. The declaration files have a `.d.ts` extension.