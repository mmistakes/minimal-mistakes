---
layout: post
title: "Doctrine automatic table prefix"
description: "Always prefix your tables with a prefix to avoid naming conflicts. You can do this automatically with doctrine."
tags: [doctrine, table, tables, prefix, prefixes, automatic, automatically, bundles, bundle, subscriber, service, symfony]
image: symfony.png
modified: "2016-02-18"
comments: true
---

Prefixing table names automatically thanks to Doctrine can be very useful to avoid naming conflicts
when using third party bundles or libraries. So I advise you to always prefix your tables by the name of your project for instance.

![Symfony](/images/posts/symfony.png)

# Symfony/Doctrine subscriber

It's **important** to note that I use [JMSDiExtraBundle](https://github.com/schmittjoh/JMSDiExtraBundle) here
to define my subscriber as a service.

{% highlight php %}
<?php

namespace AdminBundle\Subscriber;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LoadClassMetadataEventArgs;
use Doctrine\ORM\Mapping\ClassMetadataInfo;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * Class TablePrefixSubscriber.
 *
 * @DI\Service("project.subscriber.table_prefix")
 * @DI\Tag("doctrine.event_subscriber")
 */
class TablePrefixSubscriber implements EventSubscriber
{
    const TABLE_PREFIX = 'YOUR_PREFIX_';

    /**
     * @return array
     */
    public function getSubscribedEvents()
    {
        return ['loadClassMetadata'];
    }

    /**
     * @param LoadClassMetadataEventArgs $args
     */
    public function loadClassMetadata(LoadClassMetadataEventArgs $args)
    {
        $classMetadata = $args->getClassMetadata();
        if ($classMetadata->isInheritanceTypeSingleTable() && !$classMetadata->isRootEntity()) {
            // if we are in an inheritance hierarchy, only apply this once
            return;
        }

        $classMetadata->setTableName(self::TABLE_PREFIX.$classMetadata->getTableName());

        foreach ($classMetadata->getAssociationMappings() as $fieldName => $mapping) {
            if ($mapping['type'] == ClassMetadataInfo::MANY_TO_MANY) {
                if (!empty($classMetadata->associationMappings[$fieldName]['joinTable'])) {
                    $mappedTableName = $classMetadata->associationMappings[$fieldName]['joinTable']['name'];
                    $classMetadata->associationMappings[$fieldName]['joinTable']['name'] = self::TABLE_PREFIX.$mappedTableName;
                }
            }
        }
    }
}
{% endhighlight %}






