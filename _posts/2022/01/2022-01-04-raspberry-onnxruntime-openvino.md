---
layout: single
title: "ONNXRuntime inference works well on Raspberry Pi 4 with Intel NCS2: step by step setup with OpenVINO Execution Provider"
author: [ptak-bartosz]
modified: 2022-01-04
tags: [edge-ai, myriad]
category: [article]
teaser: "/assets/images/posts/2022/01/term.webp"
---

<p align="center">
    <img src="/assets/images/posts/2022/01/rasp-head.webp" height="300px" />
</p>

## OpenVINOExecutionProvider

[The recent post](../jetson-onnxruntime-tensorrt/) describes and compares TensoRT and ONNXRuntime with TensoRTProvider. At this time, the article is focused on a less powerful device: Raspberry Pi 4, which is powered by Intel Neural Computer Stick 2 (NCS2), a VPU that allows neural network inference.

The below illustrates how to set up and configure the software to use ONNXRuntime together with OpenVINOExecutionProvider on this device.

## CMake > 1.18

First, we need to install one of the dependencies - `CMake > 1.18`. Unfortunately, in the `apt-get` repository, newer versions are not available, and we have to build from source:

```bash
wget "https://cmake.org/files/v3.18/cmake-3.18.0.zip"
unzip cmake-3.18.0.zip
cd cmake-3.18.0/
sudo ./bootstrap
sudo make
sudo make install
cmake --version
```

## OpenVINO

Next, we need a backend for our Intel Neural Compute Stick 2, so we install OpenVINO according to the [producer's instructions on Raspbian* OS](https://docs.openvino.ai/latest/openvino_docs_install_guides_installing_openvino_raspbian.html#install-the-openvino-toolkit-for-raspbian-os-package).

```bash
# download OpenVINO and extract it.
wget "https://storage.openvinotoolkit.org/repositories/openvino/packages/2021.4.2/l_openvino_toolkit_runtime_raspbian_p_2021.4.752.tgz"
sudo mkdir -p /opt/intel/openvino_2021
sudo tar -xf  l_openvino_toolkit_runtime_raspbian_p_2021.4.752.tgz --strip 1 -C /opt/intel/openvino_2021

# link library activation.
source /opt/intel/openvino_2021/bin/setupvars.sh
echo "source /opt/intel/openvino_2021/bin/setupvars.sh" >> ~/.bashrc

# add openvino access to usb
sudo usermod -a -G users "$(whoami)"
sh /opt/intel/openvino_2021/install_dependencies/install_NCS_udev_rules.sh
```

## ONNXRuntime

The final step is to build ONNXRuntime from sources for system requirements and kind of processor (in this case, it's linux_armv7l). The result is a python library ready to install and utilize.

```bash
# clone the repository and build onnxruntimme (for me it took about 2.5 hours)
git clone -b v1.10.0 --recurse-submodules https://github.com/microsoft/onnxruntime.git
cd onnxruntime/
./build.sh --update --build --build_shared_lib --arm --config Release --use_openmp --use_openvino MYRIAD_FP16 --parallel --enable_pybind --build_wheel  --cmake_extra_defines CMAKE_INSTALL_PREFIX=/usr

# install onnxruntime on system
cd ./build/Linux/Release
sudo make install

# add onnxruntime to python3
cd ./build/Linux/Release/dist/
pip3 install onnxruntime_openvino-1.10.0-cp37-cp37m-linux_armv7l.whl
```

## The sample of usage

```python
import onnxruntime as ort

providers = [
    (
        'OpenVINOExecutionProvider',
        {
            'device_type': 'MYRIAD_FP16',
            'enable_vpu_fast_compile': False,
            'num_of_threads': 1,
            'use_compiled_network': False,
        },
    )
]

ort_sess = ort.InferenceSession('model.onnx', providers=providers)
in_names = [inp.name for inp in ort_sess.get_inputs()]
out_name = [output.name for output in ort_sess.get_outputs()]

some_data_output = ort_sess.run(out_name, {in_names[0]: some_data_input})
```

## Benchmark

Here's a bit of comparison of the performance of popular networks for classification and segmentation on a MYRIAD and CPU device. Measurements were made for batch size = 1 and with quantization to FP16.

| FPS (batch=1,FP16) 	| ONNXRUNTIME CPU 	| ONNXRUNTIME MYRIAD 	|
|--------------------	|:---------------:	|:------------------:	|
| Resnet-18          	|       3,57      	|        38,63       	|
| Resnet-34          	|       1,95      	|        23,08       	|
| Resnet-50          	|       1,61      	|        16,74       	|
| Unet_resnet18      	|       1,57      	|        14,32       	|
| Unet_resnet34      	|       1,09      	|        11,43       	|
| Unet_resnet50      	|       0,79      	|        7,67        	|

<img src="/assets/images/posts/2022/01/rasp.webp" height="400px" />
