---
id: 40
title: Idiom for generics on static methods
date: 2014-05-08T09:21:40+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=40
permalink: /idiom-for-generics-on-static-methods/
categories:
  - Uncategorized
---
I always forget this idiom:
[sourcecode language="java"]
    public static <T> Collection<T> getFirstN(int numRecs, Collection<T> records) {
        List<T> rtn = new ArrayList<T>(numRecs);
        if (records == null || numRecs <= 0) {
            return rtn;
        }
        int i=0;
        for (T obj : records) {
            rtn.add(obj);
            if (i++ >= numRecs)
                break;
        }
        return rtn;
    }
[/sourcecode]