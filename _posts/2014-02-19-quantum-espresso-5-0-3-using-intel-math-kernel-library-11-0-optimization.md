---
layout: post
title: "Quantum Espresso 5.0.3 Using Intel Math Kernel Library 11.0 Optimization"
date: 2014-02-19 07:00:00
categories: computational material
---

[Quantum Espresso](http://www.quantum-espresso.org/) is a software for electronic-structure calculations and materials modeling at the nanoscale. The installation of Quantum Espresso is quite easy because it includes external libraries which it needs. But we are encouraged to install Quantum Espresso using our own machine optimized external libraries such as [Basic Linear Algebra Subprograms (BLAS)](http://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms), [Linear Algebra Package (LAPACK)](http://en.wikipedia.org/wiki/LAPACK), [Scalable LAPACK (SCALAPACK)](http://en.wikipedia.org/wiki/ScaLAPACK), and [Fastest Fourier Transform in the West (FFTW)](http://en.wikipedia.org/wiki/FFTW).
###External Libraries
There are several repositories or development teams which provide external libraries. For example is [Netlib](http://netlib.org/) which provides [BLAS](http://netlib.org/blas/), [LAPACK](http://netlib.org/lapack/), and [SCALAPACK](http://netlib.org/scalapack/). But, for machines with Intel processor, maybe the best external libraries out there is [Intel® Math Kernel Library](http://software.intel.com/en-us/intel-mkl) which has a non-commercial version as standalone or included in Intel® Parallel Studio XE 2013 for Linux that can be downloaded in [Intel Non-Commercial Software Development](http://software.intel.com/en-us/non-commercial-software-development). Intel® Math Kernel Library provides BLAS, LAPACK, SCALAPACK, and even FFTW interfaces.
###Getting Started
My test machine is Supermicro X9DRD-7LN4F which has Intel(R) Xeon(R) CPU E5-2660 0 @ 2.20GHz with 8 cores and 16 threads and 64 GB RAM. For compilers I will be using Intel compilers which is included in Intel® Parallel Studio XE 2013 for Linux and OpenMPI for parallelization.
####Installing Intel® Parallel Studio XE 2013 for Linux

	$ tar zxvf sources/parallel_studio_xe_2013_sp1_update1.tgz
    $ ./parallel_studio_xe_2013_sp1_update1/install.sh
#

    Please make your selection by entering an option.
    Root access is recommended for evaluation.
    
    1. Run as a root for system wide access for all users [default]
    2. Run using sudo privileges and password for system wide access for all users
    3. Run as current user to limit access to user level
    
    h. Help
    q. Quit
    
    Please type a selection [1]: 3
#

    Step 1 of 7 | Welcome
    --------------------------------------------------------------------------------
    Welcome to the Intel(R) Parallel Studio XE 2013 SP1 Update 1 for Linux*
    installation program.
    
    
    --------------------------------------------------------------------------------
    You will complete the steps below during this installation:
    Step 1 : Welcome
    Step 2 : License agreement
    Step 3 : Activation
    Step 4 : Intel(R) Software Improvement Program
    Step 5 : Options
    Step 6 : Installation
    Step 7 : Complete
    
    --------------------------------------------------------------------------------
    Press "Enter" key to continue or "q" to quit: [Enter]
#

    Step 1 of 7 | Welcome > Missing Optional Prerequisite(s)
    --------------------------------------------------------------------------------
    There are one or more optional unresolved issues. It is highly recommended to
    resolve them all before you continue the installation. You can fix them without
    exiting from the installation and re-check. Or you can quit from the
    installation, fix them and run the installation again.
    --------------------------------------------------------------------------------
    Missing optional prerequisites
    -- Intel(R) Fortran Composer XE 2013 SP1 Update 1 for Linux*: Unsupported OS
    -- Intel(R) C++ Composer XE 2013 SP1 Update 1 for Linux*: Unsupported OS
    -- Power analysis is not enabled.
    --------------------------------------------------------------------------------
    1. Skip missing optional prerequisites [default]
    2. Show the detailed info about issue(s)
    3. Re-check the prerequisites
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 1
#

    --------------------------------------------------------------------------------
    Do you agree to be bound by the terms and conditions of this license agreement?
    Type 'accept' to continue or 'decline' to go back to the previous menu: accept
#

    Step 3 of 7 | Activation
    --------------------------------------------------------------------------------
    If you have purchased this product and have the serial number and a connection
    to the internet you can choose to activate the product at this time. Activation
    is a secure and anonymous one-time process that verifies your software licensing
    rights to use the product. Alternatively, you can choose to evaluate the product
    or defer activation by choosing the evaluate option. Evaluation software will
    time out in about one month. Also you can use license file, license manager, or
    remote activation if the system you are installing on does not have internet
    access activation options.
    --------------------------------------------------------------------------------
    1. Use existing license [default]
    2. I want to activate my product using a serial number
    3. I want to evaluate my product or activate later
    4. I want to activate either remotely, or by using a license file, or by using a license manager
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 1
#

    Step 4 of 7 | Intel(R) Software Improvement Program
    --------------------------------------------------------------------------------
    Help improve your experience with Intel(R) software
    Participate in the design of future Intel software. Select 'Yes' to give us permission to learn about how you use your Intel software and we will do the rest.
        - No personally identifiable information is collected
        - There are no additional follow-up emails by opting in
        - You can stop participating at any time
    
        Learn more about the Intel(R) Software Improvement Program
        http://software.intel.com/en-us/articles/software-improvement-program
    
    With your permission, Intel may automatically receive anonymous information about how you use your current and future Intel(R) Software Development Products.
    --------------------------------------------------------------------------------
    1. Yes, I am willing to participate and improve Intel software. (Recommended)
    2. No, I don't want to participate in the Intel(R) Software Improvement Program
    at this time.
    
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection: 2
#

    Step 5 of 7 | Options > Pre-install Summary
    --------------------------------------------------------------------------------
    Install location:
        /home/pras/intel/parallel_studio_xe_2013
    
    Component(s) selected:
        Intel(R) VTune(TM) Amplifier XE 2013 Update 13                         544MB
            Command line interface
            Sampling Driver kit
            Power Driver kit
            Graphical user interface
    
        Intel(R) Inspector XE 2013 Update 8                                    296MB
            Command line interface
            Graphical user interface
    
        Intel(R) Advisor XE 2013 Update 5                                      470MB
            Command line interface
            Graphical user interface
    
        Intel(R) Fortran Compiler XE 14.0 Update 1                             612MB
            Intel Fortran Compiler XE
    
        Intel(R) C++ Compiler XE 14.0 Update 1                                 580MB
            Intel C++ Compiler XE
    
        Intel(R) Debugger 13.0                                                 533MB
            Intel Debugger
    
        Intel(R) Math Kernel Library 11.1 Update 1                             2.0GB
            Intel MKL core libraries
            Intel(R) Xeon Phi(TM) coprocessor support
            Fortran 95 interfaces for BLAS and LAPACK
            GNU* Compiler Collection support
    
        Intel(R) Integrated Performance Primitives 8.0 Update 1                2.8GB
            Intel IPP single-threaded libraries
    
        Intel(R) Threading Building Blocks 4.2 Update 1                        127MB
            Intel TBB
    
        GNU* GDB 7.5                                                           170MB
            GNU* GDB 7.5 on Intel(R) 64 (Provided under GNU General Public License
    v3)
            GDB Eclipse* Integration on Intel(R) 64 (Provided under Eclipse Public
    License v.1.0)
    
    Install Space Required:     7.1GB
    
    Driver parameters:
        Sampling driver install type: Driver kit files will be installed only
        Power driver install type: Driver kit files will be installed only
        Drivers will be accessible to everyone on this system. To restrict access, select Customize Installation > Change advanced options > Driver is accessible to and set group access.
    
    
    1. Start installation Now [default]
    2. Customize installation
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 2
#

    Step 5 of 7 | Options > Architecture selection
    --------------------------------------------------------------------------------
    Select the architecture(s) where your applications will run. If unsure, accept the default options below or see
    http://software.intel.com/en-us/articles/about-target-architecture-selection-during-installation for more information.
    
    Target Architecture(s) of your applications:
    --------------------------------------------------------------------------------
    1. [x]    IA-32
    2. [x]    Intel(R) 64
    
    3. Finish architecture selection [default]
    
    Note: This system is an Intel(R) 64 architecture system.
    Your application may be built to run on either IA-32 or Intel(R) 64
    architectures.
    
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [3]: 3
#

    Step 5 of 7 | Options
    --------------------------------------------------------------------------------
    You are now ready to begin installation. You can use all default installation
    settings by simply choosing the "Start installation Now" option or you can
    customize these settings by selecting any of the change options given below
    first. You can view a summary of the settings by selecting "Show pre-install
    summary".
    --------------------------------------------------------------------------------
    1. Start installation Now [default]
    
    2. Change install directory      [ /home/pras/intel/parallel_studio_xe_2013 ]
    3. Change components to install  [ Custom ]
    4. Show pre-install summary
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 3
#

    Step 5 of 7 | Options > Component selection
    --------------------------------------------------------------------------------
    Select the component you wish to install. When you have completed your changes,
    select option 1 to continue with the installation.
    --------------------------------------------------------------------------------
    1. Finish component selection [default]
    
    2. Intel(R) VTune(TM) Amplifier XE 2013 Update 13 [All]
    3. Intel(R) Inspector XE 2013 Update 8 [All]
    4. Intel(R) Advisor XE 2013 Update 5 [All]
    5. Intel(R) Fortran Compiler XE 14.0 Update 1 [All]
    6. Intel(R) C++ Compiler XE 14.0 Update 1 [All]
    7. Intel(R) Debugger 13.0 [All]
    8. Intel(R) Math Kernel Library 11.1 Update 1 [Custom]
    9. Intel(R) Integrated Performance Primitives 8.0 Update 1 [Custom]
    10. Intel(R) Threading Building Blocks 4.2 Update 1 [All]
    11. GNU* GDB 7.5 [Custom]
    
    Install Space Required:     7.1GB
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 8
#

    Step 5 of 7 | Options > Component selection
    --------------------------------------------------------------------------------
    You may choose not to install some components of this product. Optional
    components are shown with an option number of the left. Entering that number
    will select/unselect that component for installation. When you have completed
    your changes, select option 1 to return to previous menu.
    --------------------------------------------------------------------------------
    1. Finish component selection [default]
    
    2. [x] Intel(R) Math Kernel Library 11.1 Update 1
    3.     [x] Intel MKL core libraries
    4.     [x] Intel(R) Xeon Phi(TM) coprocessor support
    5.     [x] Fortran 95 interfaces for BLAS and LAPACK
    6.     [x] GNU* Compiler Collection support
    7.     [ ] PGI* compiler support
    8.     [ ] SP2DP interface for Intel(R) 64
    9.     [ ] Cluster support
    
    Install Space Required:     2.0GB
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 2
#

    Step 5 of 7 | Options > Component selection
    --------------------------------------------------------------------------------
    You may choose not to install some components of this product. Optional
    components are shown with an option number of the left. Entering that number
    will select/unselect that component for installation. When you have completed
    your changes, select option 1 to return to previous menu.
    --------------------------------------------------------------------------------
    1. Finish component selection [default]
    
    2. [ ] Intel(R) Math Kernel Library 11.1 Update 1
    3.     [ ] Intel MKL core libraries
    4.     [ ] Intel(R) Xeon Phi(TM) coprocessor support
    5.     [ ] Fortran 95 interfaces for BLAS and LAPACK
    6.     [ ] GNU* Compiler Collection support
    7.     [ ] PGI* compiler support
    8.     [ ] SP2DP interface for Intel(R) 64
    9.     [ ] Cluster support
    
    Install Space Required:       0MB
    For successful functioning of the selected components, selection of additional
    components will be changed.
    
    Intel(R) Xeon Phi(TM) coprocessor support
    Fortran 95 interfaces for BLAS and LAPACK
    GNU* Compiler Collection support
    
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 2
#

    Step 5 of 7 | Options > Component selection
    --------------------------------------------------------------------------------
    You may choose not to install some components of this product. Optional
    components are shown with an option number of the left. Entering that number
    will select/unselect that component for installation. When you have completed
    your changes, select option 1 to return to previous menu.
    --------------------------------------------------------------------------------
    1. Finish component selection [default]
    
    2. [x] Intel(R) Math Kernel Library 11.1 Update 1
    3.     [x] Intel MKL core libraries
    4.     [x] Intel(R) Xeon Phi(TM) coprocessor support
    5.     [x] Fortran 95 interfaces for BLAS and LAPACK
    6.     [x] GNU* Compiler Collection support
    7.     [x] PGI* compiler support
    8.     [x] SP2DP interface for Intel(R) 64
    9.     [x] Cluster support
    
    Install Space Required:     2.1GB
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 1
#

    Step 5 of 7 | Options > Component selection
    --------------------------------------------------------------------------------
    Select the component you wish to install. When you have completed your changes,
    select option 1 to continue with the installation.
    --------------------------------------------------------------------------------
    1. Finish component selection [default]
    
    2. Intel(R) VTune(TM) Amplifier XE 2013 Update 13 [All]
    3. Intel(R) Inspector XE 2013 Update 8 [All]
    4. Intel(R) Advisor XE 2013 Update 5 [All]
    5. Intel(R) Fortran Compiler XE 14.0 Update 1 [All]
    6. Intel(R) C++ Compiler XE 14.0 Update 1 [All]
    7. Intel(R) Debugger 13.0 [All]
    8. Intel(R) Math Kernel Library 11.1 Update 1 [All]
    9. Intel(R) Integrated Performance Primitives 8.0 Update 1 [Custom]
    10. Intel(R) Threading Building Blocks 4.2 Update 1 [All]
    11. GNU* GDB 7.5 [Custom]
    
    Install Space Required:     7.2GB
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 1
#

    Step 5 of 7 | Options
    --------------------------------------------------------------------------------
    You are now ready to begin installation. You can use all default installation
    settings by simply choosing the "Start installation Now" option or you can
    customize these settings by selecting any of the change options given below
    first. You can view a summary of the settings by selecting "Show pre-install
    summary".
    --------------------------------------------------------------------------------
    1. Start installation Now [default]
    
    2. Change install directory      [ /home/pras/intel/parallel_studio_xe_2013 ]
    3. Change components to install  [ Custom ]
    4. Show pre-install summary
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 1
#

    Installation of Open Source Components
    --------------------------------------------------------------------------------
    Open source components provided under GNU General Public License v3 or Eclipse
    Public License v.1.0 will be installed.
    
    Includes:
        GNU* GDB 7.5 (Provided under GNU General Public License v3)
        GDB Eclipse* Integration (Provided under Eclipse Public License v.1.0)
    
    For further details, please refer to the product Release Notes.
    --------------------------------------------------------------------------------
    1. Continue the installation [default]
    
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 1
#

    Step 5 of 7 | Options > Missing Optional Prerequisite(s)
    --------------------------------------------------------------------------------
    There are one or more optional unresolved issues. It is highly recommended to
    resolve them all before you continue the installation. You can fix them without
    exiting from the installation and re-check. Or you can quit from the
    installation, fix them and run the installation again.
    --------------------------------------------------------------------------------
    Missing optional prerequisites
    -- No compatible Java* Runtime Environment (JRE) found
    -- 32-bit libraries not found
    --------------------------------------------------------------------------------
    1. Skip missing optional prerequisites [default]
    2. Show the detailed info about issue(s)
    3. Re-check the prerequisites
    
    h. Help
    b. Back to the previous menu
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [1]: 1
#

    Step 6 of 7 | Installation
    --------------------------------------------------------------------------------
    Each component will be installed individually. If you cancel the installation,
    some components might remain on your system. This installation may take several
    minutes, depending on your system and the options you selected.
    --------------------------------------------------------------------------------
    Installing Command line interface component... done
    --------------------------------------------------------------------------------
    Installing Sampling Driver kit component... done
    --------------------------------------------------------------------------------
    Installing Power Driver kit component... done
    --------------------------------------------------------------------------------
    Installing Graphical user interface component... done
    --------------------------------------------------------------------------------
    Installing Command line interface component... done
    --------------------------------------------------------------------------------
    Installing Graphical user interface component... done
    --------------------------------------------------------------------------------
    Installing Command line interface component... done
    --------------------------------------------------------------------------------
    Installing Graphical user interface component... done
    --------------------------------------------------------------------------------
    Installing Intel Fortran Compiler XE for IA-32 component... done
    --------------------------------------------------------------------------------
    Installing Intel Fortran Compiler XE for Intel(R) 64 component... done
    --------------------------------------------------------------------------------
    Installing Intel C++ Compiler XE for IA-32 component... done
    --------------------------------------------------------------------------------
    Installing Intel C++ Compiler XE for Intel(R) 64 component... done
    --------------------------------------------------------------------------------
    Installing Intel Debugger for IA-32 component... done
    --------------------------------------------------------------------------------
    Installing Intel Debugger for Intel(R) 64 component... done
    --------------------------------------------------------------------------------
    Installing Intel MKL core libraries for Intel(R) 64 component... done
    --------------------------------------------------------------------------------
    Installing Intel(R) Xeon Phi(TM) coprocessor support component... done
    --------------------------------------------------------------------------------
    Installing Fortran 95 interfaces for BLAS and LAPACK for Intel(R) 64
    component... done
    --------------------------------------------------------------------------------
    Installing GNU* Compiler Collection support for Intel(R) 64 component... done
    --------------------------------------------------------------------------------
    Installing Intel MKL core libraries for IA-32 component... done
    --------------------------------------------------------------------------------
    Installing Fortran 95 interfaces for BLAS and LAPACK for IA-32 component... done
    --------------------------------------------------------------------------------
    Installing GNU* Compiler Collection support for IA-32 component... done
    --------------------------------------------------------------------------------
    Installing Intel IPP single-threaded libraries for IA-32 component... done
    --------------------------------------------------------------------------------
    Installing Intel IPP single-threaded libraries for Intel(R) 64 component... done
    --------------------------------------------------------------------------------
    Installing Intel TBB component... done
    --------------------------------------------------------------------------------
    Installing GNU* GDB 7.5 on Intel(R) 64 (Provided under GNU General Public
    License v3) component... done
    --------------------------------------------------------------------------------
    Installing GDB Eclipse* Integration on Intel(R) 64 (Provided under Eclipse
    Public License v.1.0) component... done
    --------------------------------------------------------------------------------
    Finalizing product configuration...
    --------------------------------------------------------------------------------
    Preparing driver configuration scripts... done
    --------------------------------------------------------------------------------
    Press "Enter" key to continue
    [Enter]
#

    Step 7 of 7 | Complete
    --------------------------------------------------------------------------------
    Thank you for installing and for using the Intel(R) Parallel Studio XE 2013 SP1
    Update 1 for Linux*.
    
    Support services start from the time you install or activate your product. If
    you have not already done so, please create your support account now to take
    full advantage of your product purchase.
    
    Your support account gives you access to free product updates and upgrades as
    well as interactive technical support at Intel(R) Premier Support.
    
    To create your support account, please visit the Intel(R) Software Development
    Products Registration Center web site
    https://registrationcenter.intel.com/RegCenter/registerexpress.aspx?media=GPZ
    --------------------------------------------------------------------------------
    q. Quit
    --------------------------------------------------------------------------------
    Please type a selection or press "Enter" to accept default choice [q]: q
#

    
    $ vi ~/.bashrc
    
    # .bashrc
    
    # Source global definitions
    if [ -f /etc/bashrc ]; then
            . /etc/bashrc
    fi
    
    # User specific aliases and functions
    export PATH=/home/<user>/intel/bin:$PATH
    export LD_LIBRARY_PATH=/home/<user>/intel/lib/intel64:/home/<user>/intel/mkl/lib/intel64:$LD_LIBRARY_PATH
    
#

    $ export PATH=/home/<user>/intel/bin:$PATH
    $ export LD_LIBRARY_PATH=/home/<user>/intel/lib/intel64:/home/<user>/intel/mkl/lib/intel64:$LD_LIBRARY_PATH
    
####Installing OpenMPI

    $ tar zxvf sources/openmpi-1.6.5.tar.tar.gz
    $ cd openmpi-1.6.5/
    $ ./configure --prefix=/home/<user>/openmpi-install CC=icc FC=ifort F77=ifort CXX=icpc 2>&1 | tee c.txt
    $ make all install 2>&1 | tee m.txt
#

    $ vi ~/.bashrc
    
    # .bashrc
    
    # Source global definitions
    if [ -f /etc/bashrc ]; then
            . /etc/bashrc
    fi
    
    # User specific aliases and functions
    export PATH=/home/<user>/openmpi-install/bin:/home/<user>/intel/bin:$PATH
    export LD_LIBRARY_PATH=/home/<user>/openmpi-install/lib:/home/<user>/intel/lib/intel64:/home/<user>/intel/mkl/lib/intel64:$LD_LIBRARY_PATH
    
#

    $ export PATH=/home/<user>/openmpi-install/bin:$PATH
    $ export LD_LIBRARY_PATH=/home/<user>/openmpi-install/lib:$LD_LIBRARY_PATH
    
####Compiling Intel MKL FFTW Interface

    $ cd ~/intel/mkl/interfaces/fftw3x_cdft/
    $ make libintel64 compiler=intel mpi=openmpi INSTALL_DIR=/home/<user>/fftw3x_cdft-install 2>&1 | tee m.txt
    
####Installing Quantum Espresso 5.0.3
    
    $ cd ~/sources/
    $ tar zxvf espresso-5.0.2.tar.gz
    $ mv -v espresso-5.0.2 ~/espresso-5.0.2-mkl
    $ cd ~
    $ cp -v ~/espresso-5.0.2/archive/* ~/espresso-5.0.2-mkl/archive/
    $ cp -v ~/espresso-5.0.2/pseudo/* ~/espresso-5.0.2-mkl/pseudo/
    $ cp -v ~/sources/espresso-5.0.2-5.0.3.diff ~/espresso-5.0.2-mkl/
    $ cd ~/espresso-5.0.2-mkl/
    $ tar zxvf ~/sources/PHonon-5.0.2.tar.gz
    $ patch -p1 < espresso-5.0.2-5.0.3.diff
    $ ./configure --enable-parallel --with-scalapack CXX=icpc SCALAPACK_LIBS="-lmkl_scalapack_lp64 -lmkl_blacs_openmpi_lp64" BLAS_LIBS="-L/home/<user>/intel/mkl/lib/intel64 -lmkl_intel_lp64 -lmkl_sequential -lmkl_core" LAPACK_LIBS="-L/home/<user>/intel/mkl/lib/intel64 -lmkl_lapack95_lp64" MPI_LIBS="-L/home/<user>/intel/mkl/lib/intel64 -lmkl_blacs_openmpi_lp64" FFT_LIBS="-L/home/<user>/fftw3x_cdft-install -lfftw3x_cdft_lp64" FCFLAGS="-O2 -xavx" CFLAGS="-O2 -xavx" FFLAGS="-O2 -xavx" 2>&1 | tee c.txt
    $ make all 2>&1 | tee m.txt
    $ cd PW/tests
    $ ./check.pw.j
    
If you do not have previous Quantum Espresso installation, don't worry, the installer and test program will automatically download required files for you. When you compare between Quantum Espresso installation with internal libraries and Quantum Espresso with Intel MKL libraries, you can expect 25% speed up. Good luck!
