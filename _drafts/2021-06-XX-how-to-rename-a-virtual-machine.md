---
title: NICOLTIPxxx How to rename a virtual machine
date: 2021-05-05 10:00
author: nicold
comments: false
tags: [Azure, Virtual Machine, IaaS, Powershell]
---




```powershell
#Set variables
$resourceGroup="nicoldomain-azure"

$oldvmName="azsrv01-2"
$newvmName="azSrv01"

#Get the details of the VM
$originalVM = Get-AzVM -ResourceGroupName $resourceGroup -Name $oldvmName

#Remove the original VM
Remove-AzVM -ResourceGroupName $resourceGroup -Name $oldvmName

#Create the basic configuration for the replacement VM
$newVM = New-AzVMConfig -VMName $newvmName -VMSize $originalVM.HardwareProfile.VmSize
Set-AzVMOSDisk -VM $newVM -CreateOption Attach -ManagedDiskId $originalVM.StorageProfile.OsDisk.ManagedDisk.Id -Name $originalVM.StorageProfile.OsDisk.Name -Windows

#Add Data Disks
foreach ($disk in $originalVM.StorageProfile.DataDisks) {
Add-AzVMDataDisk-VM $newVM `
-Name$disk.Name `
-ManagedDiskId $disk.ManagedDisk.Id `
-Caching$disk.Caching `
-Lun$disk.Lun `
-DiskSizeInGB $disk.DiskSizeGB `
-CreateOption Attach
    }

#Add NICs
foreach ($nic in $originalVM.NetworkProfile.NetworkInterfaces) {
Add-AzVMNetworkInterface `
-VM $newVM `
-Id $nic.Id
    }
                
                
#Recreate the VM
New-AzVM -ResourceGroupName $resourceGroup -Location $originalVM.Location -VM $newVM-DisableBginfoExtension
```
