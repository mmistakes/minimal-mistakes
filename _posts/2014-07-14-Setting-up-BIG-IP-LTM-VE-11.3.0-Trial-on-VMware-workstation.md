---
title: "Setting Up Big Ip Ltm Ve 11.3.0 Trial On Vmware Workstation"
classes: wide
categories:
  - F5
tags:
  - f5
  - bigip
  - ltm
---

F5 now offers a  [90-Day BIG-IP LTM VE Trial](https://www.f5.com/trial/big-ip-ltm-virtual-edition.php) based on version 11.3.0. Though the specifications indicate that the supported hypervisors are ‘VMware ESXi 5.1 and 5.5, vCloud Director 5.1’, the VE works on VMware workstation.

This post aims at setting up the Bigip VE on VMware workstation, licensing, and initial configuration.

_1.) Getting license keys & downloading the VE image:_ Go to [http://www.f5.com/trial](http://www.f5.com/trial) and click on [90-Day BIG-IP LTM VE Trial](https://www.f5.com/trial/big-ip-ltm-virtual-edition.php), register / login and click on ‘Generate Registration Key’. Select the required quantity of registration keys (max 4, each key valid for 90 days), and click email registration keys. The key(s) will be delivered to your registered email address. Next, click on ‘Download the Trial’ and select ‘BIGIP-11.3.0.39.0-scsi.ova’ (Image fileset for VMware ESX/i Server v4.0-5.1) and optionally (‘BIGIP-11.3.0.39.0-scsi.ova.md5’)

_2.) Loading the .ova file in vmware workstation:_ In workstation, go to File &gt; Open, Browse the BIGIP-11.3.0.39.0-scsi.ova file, and click import.

The VE comes default with four network adapters mapped to the bigip as follows  
Network adapter 1 -&gt; mgmt interface  
Network adapter 2 -&gt; interface 1.1  
Network adapter 3 -&gt; interface 1.2  
Network adapter 4 -&gt; interface 1.3  
The mgmt interface is used for Out of Band (OOB) access of the bigip, and the interfaces 1.1, 1.2, 1.3 are used for application traffic.

_3. Changing Network Adapter settings:_ VMware workstation has virtual networks defined as vmnet0, vmnet1, and so on. Each vmnet can be viewed as a virtual-switch to which the guest’s adapters can be mapped. The vmnet type can be one of the following  
Bridged: Allows a guest vm to communicate with external networks through the host’s physical interfaces (Ethernet, Wifi).  
Nat: Allows a guest vm to communicate with external networks through the host’s physical interfaces, however, the outgoing traffic is natted to host’s physical interface ip address.  
Host-only: Allows communication between the host and the guest vm or between two guest vms.  
By default, all the four bigip network adapters’ type is ‘bridged’. The type of the first adapter (bigip mgmt interface) should be changed to ‘host-only’, and one among the rest to ‘bridged’. This allows host computer to access the guest bigip’s mgmt interface internally, and hosts on the external network to access the VIPs defined on the bigip when the application traffic interfaces are used in a vlan.

Following is a representation of the virtual-network-editor (virtual-switch) in vmware.

_4.) Defining subnets for communication:_ Open the ‘Virtual Network Editor’ (In workstation &gt; Click Edit &gt; Select ‘Virtual Network Editor’ and configure the vmnet virtual adapters with appropriate subnets. Each vmnet adapter has  dhcp config, which is used to allocate dynamic ip addresses in the subnet associated with the vmnet adapter.

_5.) BIG-IP Initial Configuration:_ Power on the bigip and login (credentials: root / default), through the vmware bigip console. Type ‘config’ to access the ‘Configuration Utility’. Enter the mgmt ip address, netmask & default gateway details from the subnet associated with the mgmt interface.

Access the bigip using the configured management ip address either from the gui (https://

&lt;mgmt-ip

&gt;) (credentials: admin / admin) or through cli (ssh)(credentials: root/default).  
Note: Bigip allows only secure connections (https, ssh) to manage the device.

_6. Licensing the Bigip:_ The bigip has to be licensed to use any features. Login to the bigip gui and use the gui ‘Setup Utility’ to license the device. Click License &gt; Activate. Enter the Base Registration Key, select the activation method as ‘Manual’, and click Next.

Copy the Dossier (from step 1) from gui, goto the F5 licensing server (step 2),  paste the dossier in the F5 licensing site, copy the license from the site and paste in the license section in the gui (step 3), click Next.

The bigip will activate the modules associated with the license (only LTM module in this trial edition). In the next page, configure the hostname, timezone and update the root and admin account passwords (can be set to root/default and admin/admin).

[![vmw-09](https://chaitraio.files.wordpress.com/2015/10/vmw-09.png?w=300&h=159)](https://chaitraio.files.wordpress.com/2015/10/vmw-09.png)[  
](https://packetlogic.files.wordpress.com/2014/07/screenshot-6.png)  
Log back in after the password change and either click Finished to complete the wizard or click Next to continue configuring rest of the settings.

This completes the initial setup of Bigip LTM VE.