---
layout: single
title: "Deploying c++17 python wrapped code to pypi"
tags: [development, python]
---
So, you want to deploy a python package to pypi that has been wrapped by pybind11? Me too!

First step, cross-compile your package for the main OS's. Linux, MacOS, and Windows. You may already have a continuous integration (CI) in place for the different platforms, I am going to use  [Dockcross](https://github.com/dockcross/dockcross), which for Linux (manylinux), compiles your code with an old `gcc`, which makes it forward compatible with every modern `gcc` users might have.

Second step, create wheels for python.
I am going to use [scikit-build](https://scikit-build.readthedocs.io/), which is a bridge between the python [setuptools](https://setuptools.readthedocs.io/en/latest/) and c++ build systems, like `CMake`.

Bonus, automatize the process with azure-pipelines and github actions.

Steps:
- Dockcross: Use docker containers to create binaries for all the platforms:
  - Linux: manylinux2014 for c++17 support
  - MacOS: deployment target: 10.9
  - Windows: Visual Studio 2019
- Create python packages and deploy
  - auditwheel
  - pypi

## Dockcross

[Dockcross](https://github.com/dockcross/dockcross)

Basically what we want to ensure compatibility among the many flavours of linux in existance is to compile with the oldest gcc we can. It is ensured by C++ to maintain compatibility with older compilers. But the other way around is not guaranteed, i.e. if we compile with a modern `gcc`, other libraries compiled with older gcc might have problems.
Useful background to understand the problems when deploying c++ [pypa/manylinux-issue#118](https://github.com/pypa/manylinux/issues/118).


```bash
cd ~/Software
git clone https://github.com/dockcross/dockcross; cd dockcross
docker run --rm dockcross/manylinux2014-x64 > ./dockcross-manylinux 
chmod +x ./dockcross-manylinux
cp ./dockcross-manylinux ~/bin
```

Test it:
```bash
cmake --version
./dockcross-manylinux bash -c 'echo hi from dockcross!' 
./dockcross-manylinux cmake --version
dockcross-manylinux cmake --version
```

Create a Dockerfile with all the dependencies of your project. This dockerfile wil change less often than the project itself.
Example: [Dockerfile-dockcross-manylinux2014-base](https://github.com/phcerdan/sgext/Dockerfile-dockcross-manylinux2014-base)
This dockerfile derive from a dockcross image named `manylinux2014` because I need a `c++17` compiler. The older the compiler the better for increasing compatiblity. You can also check `manylinux2010` or older, like `manylinux1`. All these images derive from a `CentOS`, with different `devtoolset` installed. `manylinux2014` has `devtoolset-8` with `gcc8.3` which is has most c++17 features.
The only c++17 feature lacking in `gcc8.3` is the lack of `parallel-stl`, where you can use `stl` algorithms with policies, ranging from single-thread to multi-threading (needs linking with `TBB`), and hopefully in the future we can enjoy `OpenGL` multithreads that would harness the GPU.

To workaround this missing c++17 feature I had to use a CMake feature called `try_compile` to check if the header `<execution>` was found in the system.

`try_compile_execution_header.cpp`
```cpp
#include <execution>
#include <vector>
#include <algorithm>

int main()
{
    const std::vector<int> X(10);
    auto F = X;
    size_t counter = 0;
    auto func = [&counter](const int &a) {
        counter++;
        return a + counter;
    };

    auto policy = std::execution::par_unseq;
    std::transform(policy, std::begin(X), std::end(X), std::begin(F), func);
}
```

And in `CMake`:
```cmake
find_package(TBB QUIET) # For c++17 std::execution::par_unseq
try_compile(_has_parallel_stl
  ${CMAKE_BINARY_DIR}
  ${PROJECT_SOURCE_DIR}/cmake/try_compile_execution_header.cpp
  LINK_LIBRARIES  ${TBB_LIBRARIES}
  )
if(_has_parallel_stl)
  message(STATUS "module generate -- stl header <execution> is available. Using TBB from ${TBB_INCLUDE_DIR}")
else()
  if(${CMAKE_CXX_STANDARD} GREATER_EQUAL 17)
    message(STATUS "module generate -- can optionally use TBB to use parallel algorithms. Provide -DTBB_DIR to enable it.")
  endif()
endif()

...

if(_has_parallel_stl)
  list(APPEND _optional_depends ${TBB_LIBRARIES})
endif()

target_link_libraries(foo_target ${_optional_depends})

if(_has_parallel_stl)
  target_include_directories(foo_target PUBLIC ${TBB_INCLUDE_DIR})
  target_compile_definitions(foo_target PUBLIC -DWITH_PARALLEL_STL)
endif()

```

And I will policies in algorithms only with the compile defitnition `WITH_PARALLEL_STL`.

For example, `std::exclusive_scan` was also missing in gcc8.3, but we can just replace it with a combination of existing algorithms:

```cpp
#ifdef WITH_PARALLEL_STL
    std::exclusive_scan(
            std::execution::par_unseq,
            std::begin(histo_counts),
            std::end(histo_counts),
            cumulative_counts_exclusive.begin(), 0.0);
#else
    std::partial_sum(
            std::begin(histo_counts),
            std::end(histo_counts),
            cumulative_counts_exclusive.begin());
    // Transform the partial sum into a exclusive_scan.
    // Shift container elements to the right, and assign 0 to the first element.
    std::rotate(
        cumulative_counts_exclusive.rbegin(),
        cumulative_counts_exclusive.rbegin() + 1,
        cumulative_counts_exclusive.rend());
    cumulative_counts_exclusive[0] = 0.0;
#endif
```

With `std::transform` was easier, just enclosing the policy in a conditional:
```cpp
    std::transform(
#ifdef WITH_PARALLEL_STL
            std::execution::par_unseq,
#endif
            std::begin(cumulative_counts_exclusive),
            std::end(cumulative_counts_exclusive),
            std::begin(F_optimized), std::begin(S),
            [](const double &M, const double &f) -> double { return M - f; });
```

Having solved these compatibility issues with, here are the Dockerfile's I used and uploaded to Dockerhub:

- [sgext-linux-base](https://hub.docker.com/repository/docker/phcerdan/sgext-linux-base): Build 3rd party dependencies in the manylinux2010 environment.
- [sgext-linux](https://hub.docker.com/repository/docker/phcerdan/sgext-linux): Build SGEXT itself, with testing (no python wrapping).
- [sgext-linux-wheel](https://hub.docker.com/repository/docker/phcerdan/sgext-linux-wheel): Builds with python wrapping, and use auditwheel to collect shared libraries into the wheel.


## Uploading to pypi

Create an account in test-pypi first and add it in `~/.pypirc`. You can also generate tokens, or other security methods.
```
[distutils]
index-servers=
    pypi
    testpypi

[testpypi]
username=user
repository=https://test.pypi.org/legacy/
```
And then, upload all the wheels existing in the folder `/tmp/wheelhouse/` using `twine`. I manually copied the wheels from docker, using `docker cp`, but mounting a shared folder between the image and your host is a better option.

```
python -m twine upload --repository-url https://test.pypi.org/legacy/ /tmp/wheelhouse/*
```

### Links
[Dockcross](https://github.com/dockcross/dockcross)
[auditwheel](https://github.com/pypa/auditwheel)
[scikit-build-docs](https://scikit-build.readthedocs.io/en/latest/generators.html)
[pypa/manylinux-issue#118](https://github.com/pypa/manylinux/issues/118)
[setuptools](https://setuptools.readthedocs.io/en/latest/)
[Dockerhub](https://hub.docker.com/repository/docker/phcerdan/sgext)

