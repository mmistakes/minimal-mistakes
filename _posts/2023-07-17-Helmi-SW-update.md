---
title: 'Helmi Software Update'
date: 2023-07-17
permalink: /_posts/2023-07-17-Helmi-SW-update/
header:
  teaser: /assets/images/access-icon.png
published: true
layout: single
tags:
  - helmi
  - maintenance
---

*Helmi software was updated! Here is a list of changes!*

# Software Package changes

The IQM adapter packages will be updated. 

| Package        | Previous version | New Version   |
|----------------|------------------|---------------|
| iqm-client     | 2.2              | >=12.5 < 13.0 |
| iqm-cortex-cli | -                | >=3.1 < 4.0   |
| qiskit-iqm     | 2.0              | >=8.3 < 9.0   |
| cirq-iqm       | 4.1              | >=11.9 < 12.0 |

As a result you will be able to use `qiskit~=0.42.1` and `cirq~=1.1.0` which provide some significant changes. 

The new software allows for additional new changes:

- Job initialization time should now be reduced.
- [Job metadata can be queried](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/#job-metadata).
- [Readout Heralding](https://arxiv.org/abs/1202.5541) has been implemented to filter out state preparation errors. It can be used by setting it in the [backend options](https://iqm-finland.github.io/qiskit-on-iqm/user_guide.html#running-a-quantum-circuit-on-an-iqm-quantum-computer). For the description of the option see [here](https://iqm-finland.github.io/iqm-client/api/iqm.iqm_client.iqm_client.HeraldingMode.html).
- A fake backend with noise model has been added called `FakeAdonis`. See [here](https://iqm-finland.github.io/qiskit-on-iqm/user_guide.html#noisy-simulation-of-quantum-circuit-execution) for more information. Only available through Qiskit!
- [Batched job submission and parameterized circuits](https://iqm-finland.github.io/qiskit-on-iqm/user_guide.html#more-advanced-examples).
- You can get the latest figures of merit using this helpful [script](https://github.com/FiQCI/helmi-examples/blob/main/scripts/get_calibration_data.py)

## Submitting with Qiskit
You can submit jobs using Qiskit by first loading the module into your current environment with 
```bash
module load helmi_qiskit
```
You need to set the provider (the interface that connects to Helmi) and backend. The `helmi_qiskit` module automatically sets the `HELMI_CORTEX_URL` which is the endpoint to reach Helmi. To run jobs, specify the `HELMI_CORTEX_URL` and set the provider to `IQMProvider`. Jobs can then be submitted using a batch script with `sbatch` or interactively with `srun`. [More details here](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/). 

## Submitting with Cirq
You can submit jobs using Cirq by first loading the module into your current environment with 
```bash
module load helmi_cirq
```
You need to set the provider(the interface that connects to Helmi) and backend. The `helmi_cirq` module automatically sets the `HELMI_CORTEX_URL` which is the endpoint to reach Helmi. To run jobs, specify the `HELMI_CORTEX_URL` and set the provider to `IQMSampler`. Jobs can then be submitted using a batch script with `sbatch` or interactively with `srun`. [More details here](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/). 

## Using External Libraries
The update comes with a pre-made Python environment which is loaded with the `helmi_qiskit` or `helmi_cirq` modules. If you wish to install extra Python libraries you can do so with the `python -m pip install --user package` command. You can also create a custom Python environment by loading the `helmi_standard` module and using a [container wrapper](https://docs.lumi-supercomputer.eu/software/installing/container-wrapper/). If you wish to use your own environment the correct server url is: `https://qc.vtt.fi/cocos` which is only accessible through the `q_fiqci` partition. 


## Give feedback!

Feedback is greatly appreciated! You can send feedback directly to [fiqci-feedback@postit.csc.fi](mailto:fiqci-feedback@postit.csc.fi).