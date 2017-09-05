---
Layout: post
title: BSOD all over the place
Author_profile: true
Tags: 'WinDB, BSOD'
published: true
date: '2017-03-15'
---
So back in December 2015 we introduced a new model of laptops into our park. The problem was that most of the laptops experienced a BSOD at least 2 or 3 times a week. Usually this happend when they had used a docking-station.

## Description of user complaints

- External keyboard sometimes works, sometimes it doesn't. Usually a reboot fixes the issue <span style="color:red">(driver issue?)</span>
- Shutdown and startup is really slow and sometimes takes up to 10 minutes. (hibernation or completely shutdown makes no difference according to the user).<span style="color:red">(driver issue?)</span>
- Laptop gets bluescreens during ussage. This issue appears during docking or during the use of VPN (in combination with 4G)
- Wireless mouse doesn't want to work when connected via the docking station
- ...

> sidenote:
We had had this issue before, but we always solved the issue by changing the laptop's powersettings from 'saving' to 'performance'. 

## Analysis (part I)

So at first i did a basic assessment  with bluescreenviewer (nirsoft).
I used the DMP-files of the user that had the problem to worst. This particular user had BSOD's from the get-go and had 9 crashes in 18 days.

8 out of 9 of those BSOD's gave the following BugCheck:

> BugCheck 9F, {3, 8a2ee030, 82f459e0, 8a38c740} Caused by  USBHUB.SYS

USBHUB.SYS is a driver by microsoft
[https://msdn.microsoft.com/en-us/library/windows/hardware/ff538820(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/windows/hardware/ff538820(v=vs.85).aspx)

Googling on the different bugcheck's (all very similar) led me to different possible solutions. One was to disable USB Selective Suspense. 
At first this seemed to help but that was only temporarily. 

We kept getting the same calls and the dump-files always referred to usbhub.sys.
So i downloaded the _Intel(R)USB3.0eXtensibleHostControllerDriver_ from the HP website. This solution seemed to work on our test-group and so after a few weeks we deployed it to all impacted laptops. Sadly, the problem only seemed solved, because users got the same problem yet again.

## Analysis (part II)

So this time i got into WinDB. **I had never used this before** so it was a bit daunting at first. Reading a lot of posts on the internet and watching videos on Youtube, i slowly found my way through the basic commands. **I am nowhere near being "at home" in WinDB, but i did scratch the surface, learned a lot and found what i was looking for.**

So basically i started of with the simplest of commands being:

>!analyze -v

this gave me

	DRIVER_POWER_STATE_FAILURE (9f)
	A driver has failed to complete a power IRP within a specific time.
	Arguments:
	Arg1: 00000004, The power transition timed out waiting to synchronize with the Pnp
		subsystem.
	Arg2: 00000258, Timeout in seconds.
	Arg3: 85f6da70, The thread currently holding on to the Pnp lock.
	Arg4: 83362a24, nt!TRIAGE_9F_PNP on Win7 and higher

	BIOS_VENDOR:  Hewlett-Packard
	BIOS_VERSION:  L77 Ver. 01.22
	BASEBOARD_MANUFACTURER:  Hewlett-Packard
	BUGCHECK_P1: 4
	BUGCHECK_P2: 258
	BUGCHECK_P3: ffffffff85f6da70
	BUGCHECK_P4: ffffffff83362a24
	DRVPOWERSTATE_SUBCODE:  4
	DRIVER_OBJECT: 892cce48
	IMAGE_NAME:  usbehci.sys
	DEBUG_FLR_IMAGE_TIMESTAMP:  52954745
	MODULE_NAME: usbehci
	FAULTING_MODULE: 9425e000 usbehci
	
	STACK_TEXT:  
	8dd9f5c0 832b78ad 85f6da70 00000000 807c7120 nt!KiSwapContext+0x26
	8dd9f5f8 832b670b 85f6db30 85f6da70 8dd9f6c0 nt!KiSwapThread+0x266
	8dd9f620 832aff6f 85f6da70 85f6db30 00000000 nt!KiCommitThreadWait+0x1df
	....

	FAILURE_BUCKET_ID:  0x9F_4_IMAGE_usbehci.sys
	BUCKET_ID:  0x9F_4_IMAGE_usbehci.sys
	PRIMARY_PROBLEM_CLASS:  0x9F_4_IMAGE_usbehci.sys
	TARGET_TIME:  2016-02-15T13:11:04.000Z

<mark> Please note that i trimmed a lot out so that this blog-post remains as readable as it can be.</mark>

The most important is that we can see its about anr IRP problem. 
Next up we want to check the last active thread with the command:
> !thread

	0: kd> !thread
	GetPointerFromAddress: unable to read from 833a5850
	THREAD 85f6da70  Cid 0004.0048  Teb: 00000000 Win32Thread: 00000000 WAIT: (Executive) KernelMode Non-Alertable
		8dd9f6c0  NotificationEvent
	IRP List:
		8a6b15c0: (0006,01d8) Flags: 00060000  Mdl: 00000000
	Not impersonating
	GetUlongFromAddress: unable to read from 83364510
	Owning Process            85ed8cf0       Image:         System
	Attached Process          N/A            Image:         N/A
	ffdf0000: Unable to get shared data
	Wait Start TickCount      1214434      
	Context Switch Count      1297           IdealProcessor: 0  NoStackSwap
	ReadMemory error: Cannot get nt!KeMaximumIncrement value.
	UserTime                  00:00:00.000
	KernelTime                00:00:00.000
	Win32 Start Address nt!ExpWorkerThread (0x832b6bae)
	Stack Init 8dd9fed0 Current 8dd9f5a8 Base 8dda0000 Limit 8dd9d000 Call 0
	Priority 15 BasePriority 12 UnusualBoost 0 ForegroundBoost 0 IoPriority 2 PagePriority 5
	ChildEBP RetAddr  Args to Child              
	8dd9f5c0 832b78ad 85f6da70 00000000 807c7120 nt!KiSwapContext+0x26 (FPO: [Uses EBP] [0,0,4])
	8dd9f5f8 832b670b 85f6db30 85f6da70 8dd9f6c0 nt!KiSwapThread+0x266
	8dd9f620 832aff6f 85f6da70 85f6db30 00000000 nt!KiCommitThreadWait+0x1df
	8dd9f698 9a0066f1 8dd9f6c0 00000000 00000000 nt!KeWaitForSingleObject+0x393
	8dd9f6e0 9a00df0d 8a61a028 8dd9f708 8b24a138 usbhub!UsbhSyncSendCommand+0x1ac (FPO: [Non-Fpo])
	8dd9f714 9a015577 8a61a028 8dd9f748 8b24a138 usbhub!UsbhGetDescriptor+0x5f (FPO: [Non-Fpo])
	8dd9f74c 9a01658a 8a61a028 8dd9f770 c0000000 usbhub!UsbhGetHubConfigurationDescriptor+0x5b (FPO: [Non-Fpo])
	8dd9f778 9a01792b 8a61a028 00000000 00000000 usbhub!UsbhConfigureUsbHub+0x4d (FPO: [Non-Fpo])
	8dd9f7a0 9a0152c0 8a61a028 8a61a5d8 9a0344c0 usbhub!UsbhInitialize+0x143 (FPO: [Non-Fpo])
	....
	
So we can see that usbhub is very active and we can see the IRP-list itself:

	IRP List:
			8a6b15c0: (0006,01d8) Flags: 00060000  Mdl: 00000000

So we take this further with the following comamnd:
	
	0: kd> !irp 8a6b15c0
	Irp is active with 6 stacks 6 is current (= 0x8a6b16e4)
	 No Mdl: No System Buffer: Thread 85f6da70:  Irp stack trace.  
	     cmd  flg cl Device   File     Completion-Context
	...
	...
				Args: 00000000 00000000 00000000 00000000
	>[IRP_MJ_INTERNAL_DEVICE_CONTROL(f), N/A(0)]
		    0  1 896b1028 00000000 00000000-00000000    pending
		       \Driver\usbehci
				Args: 8b24a518 00000000 00220003 00000000


<mark>></mark> [IRP_MJ_INTERNAL_DEVICE_CONTROL(f), N/A(0)]

Noticed the <mark>></mark> at the beginning of the line? This marks the active frame.
**So we are where things went south.**

So from there we open the !devobj 896b1028 
	
	Device object (896b1028) is for:
	InfoMask field not found for _OBJECT_HEADER at 896b1010
	\Driver\usbehci DriverObject 892cce48
	Current Irp 00000000 RefCount 0 Type 0000002a Flags 00003040
	DevExt 896b10e0 DevObjExt 896b1fe0 DevNode 893c0e78 
	ExtensionFlags (0x00000800)  DOE_DEFAULT_SD_PRESENT
	Characteristics (0x00000100)  FILE_DEVICE_SECURE_OPEN
	AttachedDevice (Upper) 89436c98 \Driver\ACPI
	Device queue is not busy.
	
So for the final step, we open op the devnode.

	0: kd> !devnode 893c0e78
	DevNode 0x893c0e78 for PDO 0x896b1028
	  Parent 0x86e07b58   Sibling 0000000000   Child 0x8a559b90   
	  InterfaceType 0  Bus Number 0
	  InstancePath is "USB\ROOT_HUB20\4&3862bb7c&0"
	  ServiceName is "usbhub"
	  State = Unknown State (0x0)
	  Previous State = Unknown State (0x0)
	  Flags (0000000000)  

So now we have the failing device. But in this state, we still don't know what that device might be.
So we'll query the WMI for this.

With Powershell we run the following command:

```powershell

Get-WmiObject -ComputerName l08w000 -Class Win32_PnPEntity -Namespace "root\CIMV2" -Filter "PNPDeviceID like '%62b%'"

```
This will show us that USB Root Hub is at fault.
Link that to the fact that in the stack we saw a lot of **ushbub!** and the faulting module was said to be usbehci we are now sure we have our root cause.

![wmi]({{site.baseurl}}/assets/images/bsodallovertheplace/a.png)

## Analysis (part III)

This is analysis based on one computer. The next thing i did was to look for a way to do a analysis on a larger scale.
I came across this powershell script: [https://github.com/Wintellect/WintellectPowerShell](https://github.com/Wintellect/WintellectPowerShell)

With some modification i then ran the following command 

```powershell

Get-ChildItem -Path C:\junkfolder -Filter *.dmp -Recurse | Get-DumpAnalysis -DebuggingScript C:\junkfolder\AnalysisModsAndVersion.txt

```
This script basically analyzed all scripts for me with the commands i wanted (basic !analyze -v in this case) and saved each analysis in a text file.

I then used a tool called AgentRansack to search the textfiles on the text "caused by". I copied the results in Excel where i had to do some work to get a readable output. After that i threw everything into a pivot-table:

![pivot]({{site.baseurl}}/assets/images/bsodallovertheplace/b.png)

So we had a total of 183 BSOD's spread over 15 laptops. Most of them were caused by USBHUB.SYS & USBEHCI.SYS.

## Solution

So after all the debugging i did earlier, i came to think that the laptops were delivered by HP with Windows 8.
We stage them with Windows 7. I had a look at an off-domain computer that had Windows 10 installed and the USBHUB.SYS & USBEHCI.SYS were a lot younger. Therefore, i decided to copy both files to a USB-drive and then copy them on the device that had the issues.

It was a bit risky but the worst that could happen was a restaging of the device so i figured, why not?

I am happy i made that gamble, it fixed the issue and even two years later, those users had no more BSOD's.

