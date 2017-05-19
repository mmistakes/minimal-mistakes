---
layout: single
title: "Installing TensorFlow in remote Ubuntu 16.04 via ssh"
tags: [sysadmin, tensorflow, AI, cuda]
---

I will basically follow the [TensorFlow instructions for Ubuntu 16.04](https://www.tensorflow.org/install/install_linux). I do want to use GPU, and I am doing it via ssh (maybe useful if you are doing the same in a server in the cloud, AWS p2 , or similar)

I will use a virtualenv with python, python2 is the default in Ubuntu.

```virtualenv --system-site-packages ~/tensorflow```

This creates an environment that allow us to install stuff without interfering with the rest of the system, to activate it, run: `source ~/tensorflow/bin/activate`, and the shell name changes to something like: `(tensorflow) user@remote-Ubuntu `.

Now, install tensorflow in your virtualenv: `pip install --upgrade tensorflow-gpu`

tensorflow requires cuda 8.0 at the time of writting, but cuda in ubuntu is 7.5.
Go to [nvidia cuda developer page](https://developer.nvidia.com/cuda-downloads), and select your platform, in this case:

```
Operating System: Linux
Architecture: x86_64
Distro: Ubuntu
Version: 16.04
Installer Type: deb(network)
```

Instead of downloaded the file in my computer, I right clicked in the `Download (2.6 Kb)` link, and save the url.
Then in the server, use `cd ~/tensorflow; wget 'copied link'`. If you have downloaded the link in your personal computer, you can also send the files to the server with `scp ~/Downloads/cuda-repo-ubuntu1604_8.0.61-1_amd64.deb user@server_address ~/tensorflow/`

In any case, go where you have the `.deb` file and install it:

```
sudo dpkg -i cuda-repo-ubuntu1604_8.0.61-1_amd64.deb
sudo apt-get update
sudo apt-get install cuda
```

We are done installing cuda-8.0, now we have to install the cuda functions for AI [cudnn](https://developer.nvidia.com/cudnn). To download them you have to register first as a cuda developer. Do it, and select the linux `tar.gz` files.
Do the same, send them to the server copying the link or with `scp`, I have done: `cd ~/tensorflow; tar -xf cudnn-8.0-linux-x64-v5.1.tgz`, creating a `~/tensorflow/cuda/` folder with `include` and `lib` folders.

Now we have to put this files somewhere in the `$PATH` and `$LD_LIBRARY_PATH` for the OS to find them. I am going to do a little hack, I am going to create simlinks in `/usr/local/cuda-8.0` where the rest of cuda files exist.

```
cd /usr/local/cuda-8.0
sudo ln -s ~/tensorflow/cuda/include/* ./include/
sudo ln -s ~/tensorflow/cuda/lib64/* ./lib/
```

This works because `/usr/local/cuda` wich is a simlink to the latest cuda, in our case `cuda-8.0` is configured to be exported in `/etc/ld.so.conf.d/cuda.conf`. Check that it works.
Because the simlink has changed from `7.5` to `8.0` run `ldconfig`, or restart your server if you are able to  with `sudo reboot`.

Now we will try to validate the installation. Create a file: `~/tensorflow/hello_tensor.py` from the [simple example:](https://www.tensorflow.org/install/install_linux#ValidateYourInstallation)

```python
import tensorflow as tf
hello = tf.constant('Hello, TensorFlow!')
sess = tf.Session()
print(sess.run(hello))
```

Test it! and remember to activate your virtualenv:

```
source ~/tensorflow/bin/activate
python ~/tensorflow/hello_tensor.py
```

The output in my case was:

```
2017-05-19 16:46:02.752622: W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE4.1 instructions, but these are available on your machine and could speed up CPU computations.
2017-05-19 16:46:02.752660: W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE4.2 instructions, but these are available on your machine and could speed up CPU computations.
2017-05-19 16:46:02.752669: W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use AVX instructions, but these are available on your machine and could speed up CPU computations.
2017-05-19 16:46:02.849520: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:901] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2017-05-19 16:46:02.849850: I tensorflow/core/common_runtime/gpu/gpu_device.cc:887] Found device 0 with properties: 
name: Quadro K4000
major: 3 minor: 0 memoryClockRate (GHz) 0.8105
pciBusID 0000:05:00.0
Total memory: 2.95GiB
Free memory: 2.84GiB
2017-05-19 16:46:02.849876: I tensorflow/core/common_runtime/gpu/gpu_device.cc:908] DMA: 0 
2017-05-19 16:46:02.849884: I tensorflow/core/common_runtime/gpu/gpu_device.cc:918] 0:   Y 
2017-05-19 16:46:02.849900: I tensorflow/core/common_runtime/gpu/gpu_device.cc:977] Creating TensorFlow device (/gpu:0) -> (device: 0, name: Quadro K4000, pci bus id: 0000:05:00.0)
Hello tensorflow!
```

I have an OK card in the server, I am not sure what is the bare minimum `cuda` capabilities that you need, in my case, the `Quadro K4000` has `3.0` capabilities.

Hope this is useful, enjoy playing with AI stuff, I will!


Note: Installing tensorflow from source will be nice for working directly in `c++`, but I am not comfortable installing `bazel`, the google build system, just for this.
Hopefully somebody will publish a `cmake` workaround to avoid it.
