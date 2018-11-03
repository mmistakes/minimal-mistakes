---
title: A very shallow overview of YOLO and Darknet
tags:
  - neural-networks
  - machine-learning
  - deep-learning
  - object-detection
excerpt: Looking at YOLO and Darknet as neural network frameworks for object detection
---

Classifying whether an image is that of a cat or a dog is one problem, detecting the cats and the dogs in your image and their locations is a different problem. While the first problem can be solved by using neural networks as classifiers, effectively determining which class an image belongs to, amongst a selection, the second problem is quite different and requires a different approach.
YOLO is a powerful neural net that does exactly that: it will tell you what is in your image giving the bounding box around the detected objects.

This is a quite fancy area of neural networks today, and there is a variety of algorithms that can tackle these types of tasks, each with its peculiarities and performances, we will focus on YOLO. This post describes it at a very (very) high level and shows how to use it when it is pre-trained to detect some things. It is basically a collection of the basic blocks you may want to run through when approaching these topics.

## How it works - the gist of YOLO

YOLO, "You Look Only Once", is a neural network capable of detecting what is in an image and where stuff is, in one pass. It gives the bounding boxes around the detected objects, and it can detect multiple objects at a time, see this sample image (low resolution, sorry).

<figure class="align-center" style="width: 400px">
  <img src="{{ site.url }}/images/yolo-predictions.png">
  <figcaption>YOLO telling you to eat your fruit.</figcaption>
</figure>

The major innovation YOLO brought when it came about was the fact that it is capable of performing the detections in one go, which is why it is quite fast and performant. It works by performing a regression - it predicts the bounding boxes and the class probabilities for each, doing so with a single network pass (hence the name). Other approaches usually employ a pipeline of tasks, like passing on the image some classifier(s) to detect stuff in different locations and/or utilising some other added methodologies. YOLO looks at the image once.

### YOLO v1

The first YOLO version came about May 2016 and sets the core of the algorithm, the following versions are improvements that fix some drawbacks. The paper is very legible and quite enjoyable actually, if you have some familiarity with neural networks and deep learning I'd really recommend reading it to understand how the model works.

In short, YOLO is a network "inspired by" [GoogleNet](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/43022.pdf). It has 24 convolutional layers working as feature extractors and 2 dense layers for doing the predictions. The architecture it works upon is called Darknet, a neural network framework created by the first author of the YOLO paper.

The algorithm works off by dividing an image into a grid of cells; for each cell bounding boxes and their confidence scores are predicted, alongside class probabilities. The confidence is given in terms of an IOU (*intersection over union*), metric, which is basically measuring how much a detected object overlaps with the ground truth as a fraction of the total area spanned by the two together (the union). More on this on the excellent [pyimagesearch](https://www.pyimagesearch.com/2016/11/07/intersection-over-union-iou-for-object-detection/). The loss the algorithm minimises takes into account the predictions of locations of the bounding boxes, their sizes, the confidence scores for said predictions and the predicted classes.

The authors also trained a "fast YOLO" version, which only has 9 convolutional layers.

### YOLO v2

YOLOv2 (December 2016) improves on some of the shortcomings of the first version, namely the fact that it is not very good at detecting objects that are very near and tends to do a few mistakes in localisation.

YOLOv2 introduces a few new things: mainly *anchor boxes* (pre-determined sets of boxes such that the network moves from predicting the bounding boxes to predicting the offsets from these) and the use of features that are more fine grained so smaller objects can be predicted better. Further, YOLOv2 generalises better over image size as it uses a mechanism where every now and then the images are resized, randomly.

The anchor boxes to start with, when you train the network, is what you may want to change to your specific dataset for training - the way to do it, used in the paper, is to run a k-means clustering job on the training set, using the IOU as a similarity metric, to determine good choices.

### YOLO v3

YOLOv3 came about April 2018 and it adds further small improvements, included the fact that bounding boxes get predicted at different scales. The underlying meaty part of the network, Darknet, is expanded in this version to have 53 convolutional layers

## Darknet

Darknet is a framework to train neural networks, it is open source and written in C/CUDA and serves as the basis for YOLO. The original repository, by J Redmon (also first author of the YOLO paper), can be found [here](https://github.com/pjreddie/darknet). Have a look at his [website](https://pjreddie.com/darknet/) as well. Darknet is used as the framework for training YOLO, meaning it sets the architecture of the network.

Clone the repo locally and you have it. To compile it, run a `make`. But first, if you intend to use the GPU capability you need to edit the **Makefile** in the first two lines, where you tell it to compile for GPU usage with CUDA drivers.

### Pre-trained weights and configuration

The repo comes shipped with multiple configuration files for training on different architectures. You can use it immediately for detection by downloading some pre-trained weights people have created and shared for public good. Given that YOLOv3 is the most recent update, you may want to fetch its weights: the website reports a model trained on the [COCO dataset](http://cocodataset.org/#home), with the 80 classes specified in [this list](https://github.com/pjreddie/darknet/blob/master/data/coco.names). Get these weights as

```
wget https://pjreddie.com/media/files/yolov3.weights
```

The repo also comes equipped with some images you can try to run the model on. Also, there's other trained models for other datasets around.

### Running it to detect

The signature command to run detection for a trained model is (from within the folder)

```
./darknet detector test <cfg data file> <cfg file> <weights> <img>
```

The configuration data file is (see some of them are present in the repo under the `cfg/` folder and with a `.data` ending) specifies the metadata needed to run the model, like the list of class names and where to store weights, as well as what data to use for evaluation. The configuration file (also in the same folder in the repo) is the meat of the architecture instead. It will tell you all about the specifics of each layer.

As an example, to run it with the COCO weights, on one of the images shipped in (example from the website), and assuming the weights have been stored at root level:

```
./darknet detector test cfg/coco.data cfg/yolov3.cfg yolov3.weights data/dog.jpg
```

This will create a `predictions.png` image at root level with the bounding boxes of what has been detected, and will print the class probabilities to stdout.

## Other projects for YOLO

A few other interesting projects that extend Darknet/YOLO to other frameworks have been created or are in development:

* Darknet has been ported into Tensorflow as [Darkflow](https://github.com/thtrieu/darkflow)
* OpenCV has added APIs for YOLO, see [here](https://docs.opencv.org/3.4.2/da/d9d/tutorial_dnn_yolo.html)
* YOLO (v2, as of now) has also been ported to Keras as [YAD2K](https://github.com/allanzelener/YAD2K)

## References

The material mentioned, collated here just to repeat ourselves, as these are all quite good reads.

* [The original YOLO paper](https://arxiv.org/abs/1506.02640)
* [The YOLOv2 paper](https://arxiv.org/abs/1612.08242)
* [The YOLOv3 paper](https://arxiv.org/abs/1804.02767)
* [The GoogleNet paper](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/43022.pdf)
* [pyimagesearch on the IOU](https://www.pyimagesearch.com/2016/11/07/intersection-over-union-iou-for-object-detection/)
* The [structure](http://ethereon.github.io/netscope/#/gist/d08a41711e48cf111e330827b1279c31) of the YOLO v2 network
* [The darknet project](https://github.com/pjreddie/darknet)
* [The official website of Darknet/YOLO](https://pjreddie.com/darknet/yolo/)
* A [post](https://hackernoon.com/understanding-yolo-f5a74bbc7967) about the YOLO paper, introducing its concepts, if you prefer having a higher-level overview/summary
* This [repo](https://github.com/AlexeyAB/darknet) is darknet with added support for Linux and Windows
* A [tutorial](https://www.arunponnusamy.com/yolo-object-detection-opencv-python.html) about using YOLO from opencv
