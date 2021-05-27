---
title: "Explainable Question Answering System (EQUAS) demo system"
excerpt: "Explainable Question Answering System one shot detector demo modality software."
tags: # Select from this set
  - Computer Vision
  - Visual Question Answering (VQA)
  - Human-Machine Teaming
  - Explanation Framework
   
submission_details:
  resources: # List any resources associated with the contribution. Not all sections are required
    papers:
      - https://openaccess.thecvf.com/content_cvpr_2017/papers/Bau_Network_Dissection_Quantifying_CVPR_2017_paper.pdf
    software:
      - https://github.com/alexmontesdeoca-raytheon/xaitk.bbn.equas
    demos:
      - https://www.equas.net/#/oneshotdemo?modality=component
    data:
      - https://www.robots.ox.ac.uk/~vgg/data/fgvc-aircraft/
   
  # Optional information describing artifact
  version: 2.0
  size: 987MB
  license: https://opensource.org/licenses/MIT
   
  authors:
    - Jeffrey E. Miller
    - Joshua S. Fashing 
    - David Bau 
    - Alex Montes de oca 
    - Kerry M Moffitt  
    - William Ferguson
  organizations:
    - Raytheon BBN Technologies 
    - MIT
  point_of_contact:
    name: Alex Montes de oca
    email: alex.montesdeoca@raytheon.com
---
   
## Overview
EQUAS demo on the one shot detector context using human editable explanations (saliency heat-maps emphasizing or deemphasizing image features).

## Intended Use
This contribution is a software application to demo XAI capabilities, specifically the creation and manipulation of ML explanations in the context of a one shot detector. The intended use of this contribution is to be deployed as a demo or for reuse of its constituent interface and backend parts to support the development of other systems.

This contribution's domain is AI explanation presentation and manipulation in the context of a one shot detector/classifier system.

## Model/Data
A VGG16 pre-trained model was used and trained with an aircraft image data set (see Data) with 10 held out classes used to create/test one shot detectors based on a single class image. Inputs are (224,224) RGB images with the aircraft class as the output.

## Limitations
The system allows for the creation of one shot detectors by creating and manipulating "aspects", where aspects are saliency maps on the target image. There is a limit to how many aspects can be created which is enforced by the application due to possible memory constraints when evaluating the one shot detector.

Additional external classifier files are needed to run this application on aircraft data (see Software). These files were uploaded [here](https://data.kitware.com/#authorized_upload/60a2bdad2fa25629b94c8fc3/qC94saJxjrxf8WqtQg5R1uB02Sy5Nm7aSDjzudVY4dRXEzKA8dboWY6MMFRvhX6q) (due to large file size) and need to be added to the `\evaluation_dataset` folder before starting the application.

## References
```tex
@inproceedings{bau2017network,
  title={Network dissection: Quantifying interpretability of deep visual representations},
  author={Bau, David and Zhou, Bolei and Khosla, Aditya and Oliva, Aude and Torralba, Antonio},
  booktitle={Proceedings of the IEEE conference on computer vision and pattern recognition},
  pages={6541--6549},
  year={2017}
}
```