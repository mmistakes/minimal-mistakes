---
layout: post
title: "Symfony 3 upgrade fixer and deprecation detector"
excerpt: "To upgrade a Symfony project to Symfony 3, some people built different tools to help us"
tags: [Symfony, upgrade, fixer, deprecation, deprecator, detector, Symfony3, Symfony 3, docker, tools, php]
image: symfony.png
comments: true
---

If you want to upgrade your Symfony project to Symfony 3, you must check many different points.
There is a page in the Symfony documentation that explains how to
[upgrade a major version](http://symfony.com/doc/current/cookbook/upgrade/major_version.html).

![Symfony](/images/posts/symfony.png)

There are 3 steps to follow to succeed:

* Make your Code Deprecation Free
* Update to the New Major Version via Composer
* Update your Code to Work with the New Version

## Docker

I rencently built two docker images to give you more power to do your upgrades:

* [Symfony Upgrade Fixer with Docker](https://github.com/ypereirareis/docker-symfony-upgrade-fixer)
* [Symfony Deprecation Detector Docker](https://github.com/ypereirareis/docker-symfony-deprecation-detector)

## Tools

To help us to do upgrades, there are two tools we can use:

* [Symfony Upgrade Fixer](https://github.com/umpirsky/Symfony-Upgrade-Fixer)

Analyzes your Symfony project and tries to make it compatible with the new version of Symfony framework.

| Name  | Description |
| ----  | ----------- |
| form_configure_options | The method AbstractType::setDefaultOptions(OptionsResolverInterface $resolver) have been renamed to AbstractType::configureOptions(OptionsResolver $resolver). |
| form_events | The events PRE_BIND, BIND and POST_BIND were renamed to PRE_SUBMIT, SUBMIT and POST_SUBMIT. |
| form_getname_to_getblockprefix | The method FormTypeInterface::getName() was deprecated, you should now implement FormTypeInterface::getBlockPrefix() instead. |
| form_option_names | Options precision and virtual was renamed to scale and inherit_data. |
| form_parent_type | Returning type instances from FormTypeInterface::getParent() is deprecated, return the fully-qualified class name of the parent type class instead. |
| form_type_names | Instead of referencing types by name, you should reference them by their fully-qualified class name (FQCN) instead. |
| get_request | The getRequest method of the base controller class was removed, request object is injected in the action method instead. |
| inherit_data_aware_iterator | The class VirtualFormAwareIterator was renamed to InheritDataAwareIterator. |
| progress_bar | ProgressHelper has been removed in favor of ProgressBar. |
| property_access | Renamed PropertyAccess::getPropertyAccessor to PropertyAccess::createPropertyAccessor. |


* [Symfony Deprecation Detector](https://github.com/sensiolabs-de/deprecation-detector)

The SensioLabs DeprecationDetector runs a static code analysis against your project's source code to find usages
of deprecated methods, classes and interfaces. For Symfony2 projects, it also detects usages of deprecated services.
It identifies the use of deprecated code thanks to the @deprecated annotation.

## More...

* [http://symfony.com/blog/paving-the-way-for-symfony-3-with-the-deprecation-detector-tool](http://symfony.com/blog/paving-the-way-for-symfony-3-with-the-deprecation-detector-tool)

_Symfony 3 will be released at the end of November 2015.
Learning from our own history, the transition from Symfony 2 to 3 will be much more pleasant than the transition from symfony 1 to 2
that happened in July 2011._


* [https://knpuniversity.com/screencast/symfony3-upgrade/deprecation-fixing-tools](https://knpuniversity.com/screencast/symfony3-upgrade/deprecation-fixing-tools)

_Ideally, your outside bundles are no longer triggering deprecated warnings.
Now it's time to update our code for Symfony 3. This means finding deprecation warnings,
fixing them everywhere you can think of, and, well, repeating!
It's pretty simple, but sometimes the true source of a deprecation can be tricky to find._


* [https://www.theodo.fr/blog/2015/12/symfony-3-0-is-out/](https://www.theodo.fr/blog/2015/12/symfony-3-0-is-out/)

_First of all, PHP 5.5 is the new required version to run Symfony 3.0.
Check that your servers are running 5.5 or newer PHP versions, if not consider upgrading PHP._