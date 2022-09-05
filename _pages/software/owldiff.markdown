---
layout: single
title: OWLDiff
permalink: /software/owldiff
lang: en
lang-ref: owldiff
author_profile: true
classes: wide
---

OWLDiff is a project aiming at providing diff/merge functionality for OWL ontologies. It can be used as a

- standalone application
- version control system diff tool
- plugin for the NeON toolkit
- plugin for Protege - see [here](https://protegewiki.stanford.edu/wiki/OWLDiff)

The OWLDiff provides the following features:

- support for OWL 2 ontologies,
- Inference markup and explanations between the ontologies,
- Fully semantical CEX diff for EL ontologies,
- various visualization options - plain axiom list/asserted frame/classified frame view,
- various syntax options - Manchester syntax vs. Description Logics syntax

The project is available at [GitHub](https://github.com/kbss-cvut/owldiff).

## Downloads

Earlier downloads are available from the [SourceForge download page](http://sourceforge.net/projects/owldiff/files/).

Available versions :

- 0.1.5: [Protege 4.1 plugin](http://sourceforge.net/projects/owldiff/files/owldiff/0.1.5/cz.cvut.kbss.owldiff.protege.jar/download)
- 0.1.4: [standalone](https://sourceforge.net/projects/owldiff/files/owldiff/0.1.4/owldiff-standalone-0.1.4.zip/download), [Protege 4.1 plugin](http://downloads.sourceforge.net/project/owldiff/owldiff/0.1.4/cz.cvut.kbss.owldiff.protege.jar)
- [0.1.3](https://sourceforge.net/projects/owldiff/files/owldiff/0.1.3/owldiff-0.1.3-bin.zip/download)
- [0.1.1](http://sourceforge.net/project/showfiles.php?group_id=231165&package_id=280238&release_id=616842)

### NeON toolkit plugin

Available is only version 0.1.2:

- sources (Maven) - TODO
- sources (Eclipse) - TODO

## Screenshots

{% include figure image_path="/assets/images/owldiff/owldiff2.png" alt="OWLDiff screenshot" %}

## Documentation

### Introduction
OWLDiff is a project for comparing and merging of two ongologies. It aims to help managing and updating ontologies,
which are often modified by several sides, and merging of concurrent updates is necessary. Usually, as for case of textual source codes,
a versioning system is used for similar purpose: when multiple people update the same file, one of them performs a merge,
using a diff utility, which allows him to view the changes in the file, select the changes which are to be included in the result,
merge the files, and commit the resulting file.

OWLDiff serves the same purpose for ontologies, as diff does for textual files. It takes two ontologies as arguments;
let us call them the original and the update. Then it uses the Pellet reasoner to check, if the two ontologies are semantically equivalent.
If not, it shows the differences graphically in two trees, one for each ontology. User can select differing items in either tree,
which is to be updated in the resulting merged ontology.

### Installation Instructions

1. Unzip the downloaded distribution to your preferred location.
2. To run standalone application type
`java -jar owldiff.jar {F1} {F2}`

where {F1},{F2} are two files to compare, or use the convenience script owldiff on Linux platform.
3. To run subversion diff on linux platform type
`svn diff --diff-cmd ./svn-owldiff {R}`

It performs the diff between local copy of {R} and repository HEAD. (of course, you can use also other 'svn diff' options).

### User Guide

#### Introduction
This user guide describes the usage of the main features of OWLdiff.

#### Startup
The OWLDiff is started with two parameters, which are locations of ontologies to be compared.

`java -jar swutils.jar [ontology-old.owl] [ontology-update.owl]`

After the program starts, the diff algorithm is performed and window, showing the differences, is opened.

{% include figure image_path="/assets/images/owldiff/owldiff-main.png" alt="OWLDiff home" %}

1. Left pane - Overview of axioms of the old ontology.
2. Right pane - Overview of axioms of the new ontology.
3. Main menu - here you can adjust type of view, switch off reasoner and select different ontologies
4. __Select all/Deselect All__ - allows you to select/deselect all axioms, which are different
5. Merge - performs merge on loaded ontologies with respect to selected axioms to be deleted/removed CEX - Shows differences based on results of the CEX algorithm.
6. Axiom properties - shows the role of each axioms
   1. Inferred - this axioms is not presented in the ontology, but can be inferred. The axioms, which were used for inferring are shown.
   2. Axiom is in both ontologies
   3. Axiom has no connection to other ontology

#### Settings
In the settings, you can select the different representation of axioms or switch off Pellet reasoner.

1. Show common axioms - If selected, all axioms from the ontology are shown(even the common axioms)
2. Show class hierarchy - If selected, classes/properties are organised based on subclass axioms
3. Use pellet classification - If selected, the Pellet reasoner is used for finding differential axioms. It leads to less(or equal) set of differential axioms, because some of the axioms can be inferred even if not presented in the ontology.
4. Manchester syntax - axioms are shown in more human-readable [Manchester syntax](http://www.w3.org/2007/OWL/wiki/ManchesterSyntax)
5. Description logic - classical description logic syntax [more...](http://en.wikipedia.org/wiki/Description_logic)

#### Selecting axioms
Axioms for merge can be selected by highlighting each axiom with double-click, or by clicking on select/deselect all axioms button
above each ontology view.

Selecting axioms in original and update ontology has different meaning:

1. Original - Axioms selected here will be removed from the ontology(assuming they should be removed, because they are not contained in the update)
2. Update - These axioms are to be added to the merged ontology

{% include figure image_path="/assets/images/owldiff/owldiff-merge.png" alt="OWLDiff merge view" %}

By clicking the merge button, a window showing the operations to be performed is opened.

#### Merge window

In the left pane, there are axioms to be deleted from the original ontology and in the right pane, there are axioms,
which will be added from update ontology.
By default, the merged ontology is saved to the location of the original ontology(assuming we performed update to that one)
and the original ontology is lost. By clicking the change button, the location of the resulting ontology can be changed to merge into another file.
After clicking OK button, the new ontology is created from the common axioms and the axioms selected from the update ontology
and saved to the specified file.

After merging the ontology, new diff is performed on the selected files to show if there are any remaining differences in the ontologies.

### Algorithms
The system incorporates two algorithms described in following chapters to find differences between two ontologies.
The first one is a simple way how to find missing, added or modified axioms, but cannot reveal complex dependencies.
The other, CEX, is more complicated, can find deep impacts of modified axioms (differences that cannot be seen in class hierarchies),
but supports only EL description logics.

##### Basic Ontology Comparison
This algorithm compares only axioms. It generates 4 axiom lists, to represent a few types of ontology differences:
origRest, updateRest, inferred, possiblyRemove. The process is divided into two steps.

The first step is the syntactic diff. The algorithm first adds all the axioms contained in the update ontology but not in the original ontology
into the updateRest list, then the axioms contained in the original ontology but not in the update ontology into the origRest list.

The other step is based upon entailments. It uses the lists origRest and updateRest from the previous step.
It takes all axioms from the updateRest list, and checks if the axioms can be entailed from the original ontology; if yes,
it puts them into the possiblyRemove list - list of axioms, that may be redundant in the update ontology (with respect to original ontology).
Then it takes all axioms from the origRest list, and checks if the axioms can be entailed from the update ontology;
if yes, it puts them into the inferred list - list of axioms, that are covered by the update ontology, and thus are not lost when omitted.

##### CEX: Logical Diff
This is a more complicated algorithm, finding complex effects of axiom modifications, but only able to work on EL description logics.
It is based on the paper: Konev, B., Walther, D., and Wolter, F.: The logical difference problem for description logic terminologies,
online at [http://www.csc.liv.ac.uk/~frank/publ/publ.html](http://www.csc.liv.ac.uk/~frank/publ/publ.html).

The EL description logics allows following constructs:

- Concept
- Axioms: concept inclusion, concept equality
- No concept name can occur on the left side of an axiom more than once
The algorithm uses a signature , which is a union of a set of concept and a set of roles.

The algorithm returns in polynomial time two sets of concepts:
{% include figure image_path="/assets/images/owldiff/diffr.png" alt="Right side result" %}
{% include figure image_path="/assets/images/owldiff/diffl.png" alt="Left side result" %}



The two sets represent differences between two ontologies, even when the differences cannot be observed in class hierarchies.
The algorithm uses various auxiliary sets, and is rather complicated; it is beyond scope of this document, for details please see the paper by Konev et al.

Following image shows how a sample output of CEX algorithm looks like. This is an example used in the paper Konev et al.,
giving the same results as in the paper.

{% include figure image_path="/assets/images/owldiff/owldiff-cex.png" alt="OWLDiff CEX result view" %}

## Publications

- Petr Křemen, Marek Šmíd, Zdeněk Kouba. [OWLDiff: A Practical Tool for Comparison and Merge of OWL Ontologies](http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6059822). In Database and Expert Systems Applications (DEXA), International Workshop on, pp. 229-233, 2011 22nd International Workshop on Database and Expert Systems Applications, 2011
