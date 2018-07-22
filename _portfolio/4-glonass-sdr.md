---
title: "Glonass SDR"
excerpt: "Software Defined Radio for GLONASS system."
toc: true
toc_sticky: true
header:
  image: /assets/images/glonas-sdr.png
  teaser: assets/images/glonas-sdr.png
sidebar:
  - title: "Role"
    image: /assets/images/glonas-sdr.png
    image_alt: "logo"
    text: "Software Developer"
  - title: "Responsibilities"
    text: "Implementation of Acquisition and Tracking blocks of the GLONASS version of GNSS-SDR"
acquisition_gallery:
  - url: https://i.imgur.com/EtiPlN9.png
    image_path: https://i.imgur.com/EtiPlN9.png
    alt: "Plot of the acquisition with real signal for the satellite 11."
  - url: https://i.imgur.com/AM2ZRzG.png
    image_path: https://i.imgur.com/AM2ZRzG.png
    alt: "Plot of the acquisition with real signal for the satellite 12."
tracking_gallery:
  - url: https://i.imgur.com/TBRmXNE.png
    image_path: https://i.imgur.com/TBRmXNE.png
    alt: "Glonass tracking for the SV 11."
  - url: https://i.imgur.com/vjIbqYV.png
    image_path: https://i.imgur.com/vjIbqYV.png
    alt: "Glonass tracking for the SV 11 with zoom."
tracking_aided_gallery:
  - url: https://i.imgur.com/f35jpsI.png
    image_path: https://i.imgur.com/f35jpsI.png
    alt: "Output from Carrier-Aided loop."
  - url: https://i.imgur.com/EZf8Zj9.png
    image_path: https://i.imgur.com/EZf8Zj9.png
    alt: "Output from Carrier-Aided loop with zoom."
---

## Project Goal

  The main goal of this project is to provide a fully functional implementation of a GNSS receiver working with GLONASS L1 SP signals, delivering RINEX files and an on-the-fly navigation solution. In order to achieve it the *acquisition* and *tracking* blocks were implemented in GNSS-SDR. The following picture shows a generic software GNSS receiver.

<figure class="align-center">
  <img src="https://i.imgur.com/2mEN0DY.png" alt="">
  <figcaption>Generic software GNSS receiver [1].</figcaption>
</figure>


## Introduction
  The GNSS-SDR project is an open source GNSS software-defined receiver. It is currently working with GPS and Galileo systems. In order to enhance performance and availability an addition was proposed: add Glonass system into the receiver, the Russian counterpart of GPS and Galileo.

  The GNSS-SDR can be a testbed for the GNSS community, given that it already has a lot of features implemented, as configurables signal sources and several signal processing algorithms. This saves time and development effort allowing developers and researchers easily adding new feature and making any kind of tests.

  This report documents the implementation of the first modules for a Glonass SDR. The GNSS-SDR has five main blocks that goes processing the incoming signal, computing the position of the satellites and estimating the position of the receiver. The first two blocks, Acquisition and Tracking are the subjects of this report.


## Glonass Signal Model
  The Glonass constellation has 24 satellites distributed in 3 rough circular orbital planes [2]. These satellites use frequency–division multiple access (FDMA) signal structure, transmitting in two bands: 
  
  * <p><span id="l1_glonass_band">...</span></p>
  * <p><span id="l2_glonass_band">...</span></p>
<script>
katex.render("L_1 = 1602 + K * 0.5625 MHz", l1_glonass_band);
katex.render("L_2 = 1246 + K * 0.4375 MHz", l2_glonass_band);
</script>

  Where K = [-7;6] is the channel number. In the L1 band, two signals are transmitted: a standard precision and an obfuscated high precision signal. The FDMA system allows the satellites to send same PRN code using the BPSK modulation. The below picture shows the spectra of GLONASS signals in L1.

<figure class="align-center">
  <img src="/assets/images/GLONASS_Sig_Plan_Fig_2.png">
  <figcaption>Spectra of GLONASS signals in L1. Source: <a href="https://gssc.esa.int/navipedia/index.php/GLONASS_Signal_Plan">Navipedia</a></figcaption>
</figure>

### Dataset
  The algorithms used in this work were tested against simulated and real signals. The simulated data was firstly generated using a signal simulator built in Matlab. Another simulator was built for unit tests using the gnss-sdr signal generator that was expanded to generate Glonass L1 CA signal. The real signal was captured with NT 1065 front end. The total time recorded was of 63 seconds. The capture was made at University of Colorado Boulder with antenna on position `40.007986, -105.262706` on August 31 2016. Mr. [Damian Miralles](https://github.com/dmiralles2009/) shared this file with the author. For the sake of this report, only the results for real signal will be shown.

## Acquisition
  There are several blocks in GNSS-SDR software that process the signal retrieved from a front end until the data come through to calculation of the position of receiver. The first block is Acquisition, the purpose of this block is find all the satellites that are visible to the front end’s antenna and discover in which Doppler frequency shift and Code Delay are these satellite signals.

<figure class="align-center">
  <img src="https://i.imgur.com/v9jpwgp.png">
  <figcaption>PCPS Algorithm [2].</figcaption>
</figure>

  The algorithm used in this work was the Parallel Code Phase Search (PCPS) due to it’s advantage of using Fourier Transform to search parallely the Code Delay. The GNSS-SDR already uses this algorithm to acquire GPS and Galileo signals. This implementation was extended to deal with FDMA system, which is the system used by GLONASS satellites. Unit-tests were written for GLONASS PCPS Acquisition following the testing pattern already set by the Mentors.

  The output for this algorithm is a 2D grid and its dimensions are doppler frequency and code delay. If a satellite is visible a significant peak is presented as in Figure below. If a satellite is not visible there will be no significant peak, just noise. To distinguish between them a threshold must be set.

<figure class="align-center">
  <img src="https://i.imgur.com/UBX8fii.png">
  <figcaption>Expected output from PCPS Algorithm [3].</figcaption>
</figure>
<figure class="align-center">
  <img src="https://i.imgur.com/rEeEOQ8.png">
  <figcaption>Output from PCPS Algorithm for a not visible satellite [2].</figcaption>
</figure>

### Results
  As described in dataset section, a real signal was captured on August 31 2016. Gpredict program can tell that several satellites were visible on this date. For the sake of this report, only two satellites were picked, SV’s 11 and 12. The Figures below show the acquisition plot for each one of these satellites.

{% include gallery id="acquisition_gallery" class="full" caption="Plot of the acquisition with real signal for the satellite 11 and 12." %}

These acquisitions were made with 125 Hz of Doppler step. The X axis is the acquired Doppler shift and Y axis is the Code Delay.

## Tracking
  The Acquisition output is a rough estimation of the Doppler Shift and Code Delay that the satellites signals are suffering. To retrieve the navigation data from those signals, the Doppler and Code Delay estimations must be better refined and tracked. This is the purpose of the tracking block. For that, two filters for tracking each one of the properties, doppler and code delay, were implemented. 

<figure class="align-center">
  <img src="https://i.imgur.com/0SLAbZC.png">
  <figcaption>Navigation data being retrieved [2].</figcaption>
</figure>

  The carrier filter implemented is a Costas loop that it's a Phase Locked Loop insensitive to bit transitions. The discriminator of this filter tries to keep all the energy of the signal in the in-phase arm. The PRN code is tracked with a Delay Locked Loop. The idea behind the DLL is to correlate the input signal with three replicas of the code with a spacing of half chip, this replicas are called Early, Prompt and Late.

<figure class="align-center">
  <img src="https://i.imgur.com/41xsk6v.png">
  <figcaption>Carrier wave tracking loop [2].</figcaption>
</figure>
<figure class="align-center">
  <img src="https://i.imgur.com/I7k9w98.png">
  <figcaption>PRN Code tracking loop [2].</figcaption>
</figure>

  For the Doppler, a PLL Costas loop was implemented, furthermore, for the Code Delay, a DLL was implemented. A Carrier-Aided track was also implemented. In this tracking, the Doppler loop aids the code loop reducing the noise in the code loop measurements. As done for the acquisition, unit-tests were also written for the tracking.

  The discriminator used in PLL Costas is the two quadrant arctan and the discriminator used in DLL Noncoherent Early minus Late envelope normalized discriminator.

<figure class="align-center">
  <img src="https://i.imgur.com/HtVH6gQ.png">
  <figcaption>Carrier-Aided tracking loop [4].</figcaption>
</figure>

### Results
  After a successful acquisition, the tracking has began. Both tracking filters must lock the signal and track. The figure below shows the output from no aided loop. In Correlation Results, the Prompt correlators are the highest values showing both carrier and code being tracked and locked.

{% include gallery id="tracking_gallery" class="full" caption="Glonass tracking for the SV 11." %}

  Zooming the bits of the navigation message, the raw data can be see.

  Similar figures can be seen for the carrier-aided loop. The main difference between them is the PLL discriminator that is less noisy.

{% include gallery id="tracking_aided_gallery" class="full" caption="Carrier-aided tracking for the SV 11." %}


<!-- ## Road Map -->
  <!-- The first step was building a signal simulator for GLONASS L1 SP signals in Matlab, a controlled environment that could be testbed for implementations. The first block of a generic software receiver is the Acquisition. It's purpose is to identify all the visible satellites to the user. With that in mind, a first implementation of an acquisition algorithm was also made in Matlab. The Parallel Code Phase Search (PCPS) was the acquisition algorithm chosen. This algorithm was tested and validated with the signal simulator previously built. The GNSS-SDR already uses this algorithm to acquire GPS and Galileo signals. This implementation was extended to deal with FDMA system, which is the system used by GLONASS satellites. Unit-tests were written for GLONASS PCPS Acquisition following the testing pattern already set by the Mentors. -->

  <!-- The Acquisition output is a rough estimation of the Doppler Shift and Code Delay that the satellites signals are suffering. To retrieve the navigation data from those signals, the Doppler and Code Delay estimations must be refined. This is the purpose of the tracking block. For that, two filters for tracking each one of the properties, doppler and code delay, were implemented. For the Doppler, a PLL Costas loop was implemented, futhermore, for the Code Delay, a DLL was implemented. A Carrier-Aided track was also implemented. In this tracking, the Doppler loop aids the code loop reducing the noise in the code loop measurements. As done for the acquisition, unit-tests were also written for the tracking. -->


## The Story so Far
  Here is the breakdown of our major milestones:

  - [4f9a6d0](https://github.com/gnss-sdr/gnss-sdr/commit/4f9a6d0e88aa56486bde318737671bb76eb75796) Add pcps acquisition adapter for glonass l1 ca signal.
  - [b333bb2](https://github.com/gnss-sdr/gnss-sdr/commit/b333bb2c78fd811689cf2726eab14af70a77cff7) Add Glonass L1 C/A channel to the block factory.
  - [6307ac2](https://github.com/gnss-sdr/gnss-sdr/commit/6307ac288095172d549d517f91bebec255001a59) Add FDMA protocol to pcps algorithm.
  - [442656a](https://github.com/gnss-sdr/gnss-sdr/commit/442656ad869bbff51c47b3ca218209755ed3b37c) Add unit-test for glonass pcps acquisition.
  - [22da2ad](https://github.com/gnss-sdr/gnss-sdr/commit/22da2ad606a280e328bb178858cce6cbdc9a20a2) Add adapter for Glonass L1 C/A tracking.
  - [b69f203](https://github.com/gnss-sdr/gnss-sdr/commit/b69f20396743e88fc94b4686e614313f083c8752) Add gnuradio block for glonass tracking.
  - [c2e04a2](https://github.com/gnss-sdr/gnss-sdr/commit/c2e04a23c6610d230d7fdc824c59533e1520f8f0) Add Glonass Tracking block to block factory.
  - [d95419d](https://github.com/gnss-sdr/gnss-sdr/commit/d95419d6703c07cdec90ca94b1d27c31b627ac53) Add Glonass C Aid track adapter.
  - [8763689](https://github.com/gnss-sdr/gnss-sdr/commit/8763689cb09f60c301c5bc1670d4f77517ff3c75) Add Glonass C Aid tracking block to the block factory.
  - [d3038dd](https://github.com/gnss-sdr/gnss-sdr/commit/d3038dd162dbd7018d6eb1f9c6dc00f696af005f) Add unit test for new tracking blocks.

  *A [pull request](https://github.com/gnss-sdr/gnss-sdr/pull/63) was made but due to some issues in automatically merge, the code was manually merged into another branch.*


## Future Work

  In order to the GNSS-SDR work properly with GLONASS L1 SP signals the navigation data must be decoded, which implies calculating the observables and computing the PVT solution. The last two blocks were already implemented in GNSS-SDR by the Mentors for GPS and Galileo, these blocks work with several GNSS systems including GLONASS. Mr. Damian Miralles implemented a telemetry decoder for Glonass navigation bits and the RINEX printer.

  For future work, acquisition, tracking and telemetry block must be tested together with a real signal. This work only tested the first two blocks together. In the current GNSS-SDR implementation, two satellites that are in the same FDMA channel can be acquired simultaneously. This occurs because satellites in opposite points of an orbital plane transmit signal in equal frequencies. This issue can cause a channel which has lost a satellite beginning to track another satellite with the same ID, or even the same satellite under a different ID.


## Acknowledgements

  I would like to thank my mentors that guided me through this work, providing me support and feedback. I would also like to acknowledge them for the well documented and clear software provided. That clearness saved me tremendous amounts of time on my implementations. I have obtained massive experience towards signal processing and software testing with the present work.

  A huge thank to Mr. Damian Miralles that provided me a file with real GLONASS signal, only with this I was able to test my work with real noisy input. And I am glad that it worked!

  Last but not least, I would like to thank Google for providing me such experience. This work gave me the opportunity to explore deeper the community of open source software and to realize it's true potential about spreading and sharing knowledge with the whole world. 

## Bibliography

[1] K. Borre, Software-defined GPS and Galileo receiver: a single-frequency approach. Boston: Birkhhäuser, 2007.

[2] GLONASS ICD, 1998. Technical report. v.4.0.

[3] B. Hofmann-Wellenhof, H. Lichtenegger, and E. Wasle, GNSS--global navigation satellite systems GPS, GLONASS, Galileo, and more. Wien: Springer, 2008.

[4] E. D. Kaplan and C. Hegarty, Understanding GPS: principles and applications. Norwood: Artech House, 2006.
