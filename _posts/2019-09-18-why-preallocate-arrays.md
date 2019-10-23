---
title: "Why prellocate arrays?"
excerpt_separator: "<!--more-->"
date: 2019-09-18T12:48:00+10:00
categories:
  - Best practice
tags:
  - preallocate
  - loops
  - memory
  - perfomance
---
Have you ever recieved a code analyser warning from Matlab telling you that the size of variable appears to change during each iteration of a for/while loop and that you should consider preallocating it? We all have.

But why is it important and why is Matlab highlighting it to you?

<!--more-->

Firstly, we need to understand how Matlab allocates memory. Unlike other languages such as C, Matlab handles memory allocation for you. It does this by using information about your variables such as data type and size.

```matlab
a = 1:10; 
b = a * 2; 
```

In creating variable `a`, matlab allocates the necessary memory to store 10 elements of type double. Then in creating variable `b`, matlab allocates the additional memory required to store another 10 elements of type double.

Say we now want to create an array, and then append a value to the end of it. Matlab has to reallocate some memory to cater for the additional element of the array.

```matlab
c = 1:100;
c(end + 1) = 1;
```

Why is that a problem?

Well it turns out that matlab requires [contiguous memory][1] for storing the information in an array. These are blocks of memory that are side by side. When we ask matlab to increase the size of an array it checks if the current location can cater for the additional element. If it cannot then it must find a completely new place in the memory that can. This can take some time; consider trying to park a bus in a busy car park. It is generally possible, but it takes some time to find a suitable space.

This problem is amplified when we try and grow an array in a for/while loop. As the array grows, matlab must continuosly find larger and larger gaps in the memory to store the array in.

```matlab
for ii = 1:10000000
    d(ii) = ii;
end
```

For small array sizes, growing an array in matlab is fine. There are many suitable locations in the memory. The larger the array becomes, fewer suitable locations exist and the more frequently matlab must move the memory around.

To solve this, we can **preallocate the memory**. Almost always, we already know what size an array will end up, but matlab does not. We can generate an array of the required size and type up front, and modify the data in it rather than growing it incrementally.

```matlab
e = zeros(10000000, 1);
for ii = 1:10000000
	e(ii) = ii;
end
```

In this example, preallocation reduces the run time of this code from 1.2 seconds to 0.05 seconds. Thats 20x faster!

The same concept applies to other data types such as cells, strings, chars, etc.

Stop ignoring those code analyser warnings and start preallocating!

[1]: https://techdifferences.com/difference-between-contiguous-and-non-contiguous-memory-allocation.html
