---
title: 'Helmi Software Update'
date: 2024-04-23
permalink: /_posts/2024-04-23-Helmi-SW-update/
header:
  teaser: /assets/images/update.png
published: true
layout: single
tags:
  - Helmi
  - maintenance
---

*New versions of qiskit-iqm and cirq-iqm for Helmi are available! Here is a list of changes*

# Software Package changes

The IQM adapter packages has been updated. 

| Package        | Previous version | New Version   |
|----------------|------------------|---------------|
| iqm-client     | 12.5             | >=16.0 < 17.0 |
| iqm-cortex-cli | 4.3              | >=5.8 < 6.0   |
| qiskit-iqm     | 9.0              | >=12.0 < 13.0 |
| cirq-iqm       | 11.9             | >=13.0 < 14.0 |

As a result you will be able to use `qiskit~=0.45.1` and `cirq-core[contrib] ~= 1.2` which provide some significant changes. 

The new software comes with interesting updates:

- [Cuda quantum jobs can be run](https://nvidia.github.io/cuda-quantum/latest/using/backends/hardware.html#iqm).
- Configurable max_circuit has been implemented to allow users control the number of circuits included in a batch. For the description of the property see [here](https://iqm-finland.github.io/qiskit-on-iqm/api/iqm.qiskit_iqm.iqm_provider.IQMBackend.html#iqm.qiskit_iqm.iqm_provider.IQMBackend.max_circuits).
- A fake backend with noise model has been added called `FakeApollo` available though Qiskit. See [here](https://iqm-finland.github.io/qiskit-on-iqm/user_guide.html#noisy-simulation-of-quantum-circuit-execution) for more information.
- Qiskit_iqm and Cirq_iqm packages have been moved to iqm namespace. This means there is a slight change with how the packages are imported. See how to import them [here](https://iqm-finland.github.io/qiskit-on-iqm/user_guide.html#running-a-quantum-circuit-on-an-iqm-quantum-computer).
- You can get the latest figures of merit using this helpful [script](https://github.com/FiQCI/helmi-examples/blob/main/scripts/get_calibration_data.py)

## Submitting with Qiskit
You can submit jobs using Qiskit by first loading the module into your current environment with

```bash
module use /appl/local/quantum/modulefiles
```

```bash
module load helmi_qiskit
```

You need to set the provider (the interface that connects to Helmi) and backend. The `helmi_qiskit` module automatically sets the `HELMI_CORTEX_URL` which is the endpoint to reach Helmi. To run jobs, specify the `HELMI_CORTEX_URL` and set the provider to `IQMProvider`. Jobs can then be submitted using a batch script with `sbatch` or interactively with `srun`. [More details here](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/). 

## Submitting with Cirq
You can submit jobs using Cirq by first loading the module into your current environment with

```bash
module use /appl/local/quantum/modulefiles
```

```bash
module load helmi_cirq
```
You need to set the provider(the interface that connects to Helmi) and backend. The `helmi_cirq` module automatically sets the `HELMI_CORTEX_URL` which is the endpoint to reach Helmi. To run jobs, specify the `HELMI_CORTEX_URL` and set the provider to `IQMSampler`. Jobs can then be submitted using a batch script with `sbatch` or interactively with `srun`. [More details here](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/). 


## Give feedback!

Feedback is greatly appreciated! You can send feedback directly to [fiqci-feedback@postit.csc.fi](mailto:fiqci-feedback@postit.csc.fi).
