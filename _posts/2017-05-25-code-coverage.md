---
layout: single
title: "Enabling code coverage in an external ITK module with gcov"
tags: [c++, cmake, gcov, coverage, testing]
---

This post explains how to run code coverage using `gcov` in an external or remote module of ITK. It only has some specific of ITK, so it can be useful for using gcov for other projects.

First, change the compile flags to report code coverage. I am only interested in running it for my module, if you want to run it for all your project, just append `COVERAGE_FLAGS` to `CMAKE_CXX_FLAGS`, and all your targets will compile with those flags.

In my case, I will modify the compile flags of the test driver of the module.

```cmake
# in test/CMakeFiles.txt. External Module:(${ITK_SRC}/Modules/Remote/IsotropicWavelets)
CreateTestDriver(IsotropicWavelets "${Libraries}" "${IsotropicWaveletsTests}")

#Add coverage compile options
set(COVERAGE_FLAGS "-g -O0 -coverage -fprofile-arcs -ftest-coverage")
set_target_properties(IsotropicWaveletsTestDriver
  PROPERTIES COMPILE_FLAGS "${CMAKE_CXX_FLAGS} ${COVERAGE_FLAGS}"
               LINK_FLAGS "-fprofile-arcs"
                 )

```

Compile:

```
cd ${ITK_BUILD}/Modules/Remote/IsotropicWavelets; make -j5
```

Coverage files `.gcno` will be generated in the same folder than the object files `cxx.o`. Check it: `ls test/CMakeFiles/IsotropicWaveletsTestDriver.dir/ | grep gcno`

Now run your test:

I have a little bash script to run itk tests, if I want to change the test to run I just have to change the `CTEST_ARGS` variable, for example: `export CTEST_ARGS='-R FrequencyBandPass -V'`.

```bash
export CTEST_ARGS='-L IsotropicWavelet'
build_dir=~/Software/ITK/build/
function test(){make test -C $build_dir ARGS=$CTEST_ARGS}
```

To run all the test of my module, I `export CTEST_ARGS='-L IsotropicWavelet'` and call `test` anywhere in the terminal. This will generate `.gcda` files **ONLY** if all the test exit succesfully (no errors, no uncaught exceptions).

To visualize the data stored in those `.gcda` we can use `lcov` and `genhtml` to generate beatiful html reports, I am following these two posts:
[C++ code coverage profiling with GCC/GCOV](http://bobah.net/book/export/html/2) and the post [C++ Code Coverage Analysis with CMake and Jenkins](https://torbjoernk.github.io/article/2014/08/21/c++-code-coverage-analysis-with-cmake-and-jenkins/).

In `arch-linux`, `lcov` is in the [AUR](https://aur.archlinux.org/packages/lcov/).

```bash
export COVERAGE_PREFIX="$HOME/Software/ITK/build/Modules/Remote/IsotropicWavelets/test/CMakeFiles/IsotropicWaveletsTestDriver.dir"
```

You can use: `lcov --directory $COVERAGE_PREFIX --zerocounters` to clean the coverage data before a new run of your tests.

When the data is up-to-date, use:

```
lcov --directory $COVERAGE_PREFIX --capture --output-file $COVERAGE_PREFIX/app.info
```

This will parse all `.gcda` files in the directory.

Now use `genhtml`:

```bash
genhtml --output-directory $COVERAGE_PREFIX/coverage \
        --demangle-cpp --num-spaces 2 --sort \
        --title "Coverage" \
        --function-coverage --branch-coverage --legend \
        $COVERAGE_PREFIX/app.info
```

Then use your favourite browser to open the html report:

```
firefox $COVERAGE_PREFIX/coverage/index.html
```

![lcov-screenshot]({{ site.url }}/assets/images/2017-05-25-lcov.png)

Well, it seems I have some work to do!

I have put these functions in a bash script `coverage.sh`:

```bash
#!/bin/bash
# GCOV_PREFIX and GCOV_PREFIX_STRIP are env variables for lcov to change where .gcda files are generated http://bobah.net/book/export/html/2
export COVERAGE_PREFIX="$HOME/Software/ITK/build/Modules/Remote/IsotropicWavelets/test/CMakeFiles/IsotropicWaveletsTestDriver.dir"

function lcovclean(){
    lcov --directory $COVERAGE_PREFIX --zerocounters
}

function lcovrun(){
    lcov --directory $COVERAGE_PREFIX --capture --output-file $COVERAGE_PREFIX/app.info
}

function lcovgen(){
    genhtml --output-directory $COVERAGE_PREFIX/coverage \
            --demangle-cpp --num-spaces 2 --sort \
            --title "Coverage" \
            --function-coverage --branch-coverage --legend \
            $COVERAGE_PREFIX/app.info
}

function lcovopen(){
    firefox $COVERAGE_PREFIX/coverage/index.html &
}

function cleantest(){
    lcovclean && test
}

function dolcov(){
    lcovrun && lcovgen && lcovopen
}

function lcovall(){
    cleantest && dolcov
}
```

