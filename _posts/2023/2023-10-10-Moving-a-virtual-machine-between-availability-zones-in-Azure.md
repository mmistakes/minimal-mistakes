---
title: Moving a virtual machine between availability zones in Azure
date: 2023-10-10 10:00
tags: [Azure, networking, azure virtual machine, region, availability zone]
excerpt: "In this blog post, I show how to handle some typical virtual machine move operations on Azure."
header:
  overlay_image: https://live.staticflickr.com/65535/53108920034_a57d98fb9e_b.jpg
  caption: "Photo credit: [**nicola since 1972**](https://www.flickr.com/photos/15216811@N06/53108920034)"
---

In this blog post, I show how to handle 2 typical virtual machine move operations on Azure.

# Move a VM from "no infrasstructure redundancy" to a specific Availability Zone

This scenario is supported by the Azure portal. Let's start from a VM with the following characteristics:

* Name: `machine-01`
* Linux
* OS disk LRS 30Gb

to move this VM to a specific Availability Zone, from Azure portal go to:

* `machine-01` > availability + scaling > Availability Zones > get Started
* select Target Availability Zone > `Zone 1`
  
in this migration:

* A new virtual machine is created
* New NIC is created along with the zonal VM
* you can optionally change target virtual network and subnet
* VM will be stopped during the process to avoid data loss. There will be a brief downtime of few minutes and copy of VM(s) will be created in the target zone
* the machine created will be in another resource group

at the end of the moving process, you can safetly delete the source machine.

# Move a VM from an availability zone to another

This is unsupported.

Transform a VM from "availability zone xx" to "no infrastructure redundancy" is also not supported.

If you need to change availability zone to a VM you can follow these steps:

* Turn-off source VM
* Create a full snapshot (ZRS) of the OS disk
* Create a managed disk from the snapshot, in the availability zone target
* Select the OS disk created, and select [create VM] from the disk


More information:
* Availiability Zones: https://learn.microsoft.com/en-gb/azure/reliability/availability-zones-overview?tabs=azure-cli
* https://learn.microsoft.com/en-us/azure/virtual-machines/attach-os-disk?tabs=portal
