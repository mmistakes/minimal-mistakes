---
title:  "Efficient random access of Fasta data with Pyfaidx and pbgzip"
date:   2017-12-05
categories:
  - posts
tags:
  - Python
  - compression
  - Pbgzip
  - Pyfaidx
header:
  teaser: "assets/images/greyson-joralemon-299735.jpg"

---


There are often times in bioinfromatics when I find myself needing to sample
large fasta files randomly. RefSeq is currently about 250GB compressed; this
is not the sort of file you want your scripts making multiple passes through.

[Shirley et al.](https://peerj.com/preprints/970/) published a pre-print in
2015 announcing a the python package Pyfaidx.  The idea behind the package is to
index fasta files in the faidx format used by Samtools, thereby allowing for
random seek-based access to the file. They have continued to maintain the package
and I've found it to be fast and pretty straightforward to use.


**Pyfaidx**

* Github: [https://github.com/mdshw5/pyfaidx](https://github.com/mdshw5/pyfaidx)
* PyPi: [https://pypi.python.org/pypi/pyfaidx](https://pypi.python.org/pypi/pyfaidx)
* Anaconda: [https://anaconda.org/bioconda/pyfaidx](https://anaconda.org/bioconda/pyfaidx)
{: .notice--info}

## Getting started
In its most basic usage you create a Pyfaidx fasta object:

```python
import pyfaidx

genes = pyfaidx.Fasta('tests/data/genes.fasta')
```

The file you import needs to have consistent length sequence lines or else
Pyfaidx cannot index it. If you need to fix your file I'd recommend
[Refomat from bbtools](https://jgi.doe.gov/data-and-tools/bbtools/bb-tools-user-guide/reformat-guide/).

By default Pyfaidx keeps the sequence name but throws away the description. You can
retain the description by adding ```read_long_names=True```, but this option
only works with uncompressed input data.

## Attributes

The Pyfaidx fasta object is a dictionary-like object with some caveats. I say
dictionary-like because the api is a bit different, for instance to access an
record  we would need to put in an index range ```genes['NM_001282543.1'][:]```
rather than ```genes['NM_001282543.1']```. I would expect to use coordinates
only for the ```.seq``` attribute but it is a minor thing to remember.

It supports:
* Access by key
* Slicing of sequences
* Filtering based on keys
* Common operations like reverse / complement
* Support for Fasta Variants (which I did not test)
* A command line interface in addition to the python package

## More random access
By default Pyfaidx returns keys in the order they were stored in the dictionary.
While this is not in any particular order if will return the same order with
each call  if you need pseudorandom sampling you can simply randomize the
keys and call the records.

```python
import random
import pyfaidx

def shuffle_keys(fastaobj):
    """take the Pyfaidx file and return a shuffled list of the keys"""
    keylist = []
    for key in fastaobj.keys():
        keylist.append(key)
    kls = random.shuffle(keylist)
    return keylist

genes = pyfaidx.Fasta('tests/data/genes.fasta')

rand_keys = shuffle_keys(genes)

for key in rand_keys:
    print(gene[key][:])
```

## Performance
For benchmarking data is available in the
[preprint](https://peerj.com/preprints/970/). I found it to be fast enough
with access speeds that were comparable to sequential access or Biopython SeqIO
in-memory access, but without consuming memory. If you need to use the library
for sequential access there is also  an option to read ahead into a
buffer: ```genes = pyfaidx.Fasta('tests/data/genes.fasta', number=10000)```.

## Reading compressed data
If you are working with fastas large enough to warrant Pyfaidx chances are you
don't want to unzip those files, plus gzipped files can be processed more
quickly for IO bound processes. Pyfaidx can read
[blocked gzip format](https://blastedbio.blogspot.com/2011/11/bgzf-blocked-bigger-better-gzip.html)
used by Samtools but if can take a long time to convert a large fasta to .bfgz
format. Fortunately this can be done more quickly with pbgzip.

## Parallel blocked format gzip (pbgzip)

[Pbgzip](https://github.com/nh13/pbgzip)  is a multithreaded implementation of
bgzip. It compresses files in a fraction of the time required for the
non-parallel version. using pbgzip is simple.

```bash
gzip -d -c sequences.fasta.gz | pbgzip -c -t [number_of_threads] -6 > sequences.fasta.bfgz
```

Be sure to save a thread for gzip when you specify '-t' for pbgzip. Now you have
a  file compatible with Pyfaidx. you can delete your original file too since
.bfgz can be read by gzip.
