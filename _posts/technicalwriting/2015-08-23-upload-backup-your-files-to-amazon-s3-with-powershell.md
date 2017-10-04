---
title: "Upload/Backup your files to Amazon S3 with Powershell"
excerpt: &excerpt "A beginning-to-end walkthrough of how to upload your 
files to Amazon’s Simple Storage Service (S3) using PowerShell."
modified: 2017-09-24
category: technicalwriting
author_profile: false
related: false
share: false
image: 
  teaser: 
  thumb: 
show_category_list: false
show_tag_list: false
fullwidth: true
featured: 
---

_Before reading..._

-   _Target Audience:_ This article is written for developers with beginner to 
    intermediate experience. They are familiar with the tenets of software 
    development and PowerShell. They are new to Amazon Web Services (AWS) and the 
    Simple Storage Service (S3). 
-   _Scenario:_ Assuming the developer is new to AWS, the document uses a
    conversational tone to take them through an end-to-end scenario. It 
    gets them started with the various Amazon Web Services and provides step-by-step 
    details for authoring the PowerShell script. 
-   _Sources:_ I wrote 100% of the content, including samples and PowerShell 
    code, without an editor providing input. The information was derived from 
    various Amazon documentation, pulled together to be a cohesive set of 
    end-to-end instructions. 

_...and here's the sample._

---

The ability to script important tasks allows IT professionals 
to be efficient and effective in their tasks. Backing up important files 
to the cloud or triggering the upload of new files to your site are critical 
functions that can be scripted to improve efficiency and make the processes 
resilient.

In this document, you’ll learn how to upload files to Amazon 
[Simple Storage Service](http://aws.amazon.com/s3/) (S3) using [PowerShell](https://microsoft.com/powershell). 
You’ll create an Amazon Web Services (AWS) 
account that will allow you to manage AWS users and groups via Identity and 
Access Management (IAM) as well as work with S3 buckets and folders. After 
installing the AWS Tools for Windows PowerShell, you’ll configure 
the prerequisites for connecting to AWS via PowerShell. And finally, you’ll 
use PowerShell to recursively iterate through directories to 
upload files to S3.

If you’re _new to Amazon S3 and need to start from scratch_, this is a 
**beginning-to-end walkthrough** of how to upload your files to Amazon 
Simple Storage Service (S3) using PowerShell.

A breakdown of the process (detailed steps are further below):

1.  [Create an Amazon account to access Amazon Web Services (AWS)](#1-create-an-amazon-root-account)

    a.  You can try most of the AWS services for [free for a year](http://aws.amazon.com/free/).

2.  [Create a user and group via Amazon Identity and Access Management (IAM) 
    to perform the backup/upload](#2-create-a-user-and-group)

3.  [Create a bucket in Amazon Simple Storage Service (S3) to hold your files](#3-create-a-bucket-in-s3)  

4.  [Install AWS Tools for Windows PowerShell, which contains the modules 
    needed to access AWS](#4-install-aws-tools-for-windows-powershell)  

5.  [Open PowerShell and configure prerequisite settings](#5-open-powershell-and-configure-prerequisite-settings)  

6.  [Write a PowerShell script that copies files from your local computer to 
    the Amazon S3 bucket you previously created](#6-powershell-script-to-uploadbackup-files-to-amazon-s3)  

    a.  The script will use the credentials of the backup user created.  

    b.  The script will be a PowerShell framework script to get you started.  

**This tutorial will get you up and running with Amazon 
Simple Storage Service (S3) and a PowerShell script that uploads 
files.** Once this framework script is in place, you can add to the 
logic making it as specific or complex as necessary for your situation.


## 1. Create an Amazon root account ##

Amazon has made this simple. Navigate to 
[Amazon AWS](http://aws.amazon.com/) and select "Create a Free Account." 
Follow the steps outlined.

If you already have an account with Amazon for consumer purchases, you can 
use this for a single logon identity. I recommend using
[Multi-Factor Authentication](http://aws.amazon.com/iam/details/mfa/) 
with your AWS Root account to provide an additional layer of security.

To kick the tires on AWS without hitting your pocket book, select the 
[free for a year](http://aws.amazon.com/free/) option and get some 
experience under your belt. 


## 2. Create a user and group ##

To access the AWS services, create a group and user account via 
IAM. Keep these guidelines in mind:

-   Follow [IAM’s Best Practices](http://docs.aws.amazon.com/IAM/latest/UserGuide/IAMBestPractices.html) 
    for user and group management 
-   Create a group to backup/upload files with the appropriate permissions 
-   Create a user for accessing S3 during the backup/upload from PowerShell 

You can find detailed instructions for how to create an account and group in the video titled 
_"Getting Started with AWS Identity and Access Management"_ at IAM’s 
[Getting Started](http://aws.amazon.com/iam/getting-started/). The following is a synopsis.

1.  Login to AWS Management Console with your Root account or an 
    Administrator account (if you created a separate one) 
    -   Navigate to [Amazon AWS](http://aws.amazon.com/) -> select **My Account** 
        in the top right -> select **AWS Management Console** from the drop-down list 
2.  Create a group with access to S3 buckets called _S3BackupOperators_  
    -   Set permissions for this group to **AmazonS3FullAccess** so that members 
        have the necessary access and permissions to perform backups/uploads. 
3.  Create a user for accessing the S3 buckets called _backupOperator_ 
    -   Add this user to the _S3BackupOperators_ group, 
        from which they will inherit the permissions they need to 
        write files to the S3 buckets. 
4.  Generate Access Keys for the user
    -   In order to access the Amazon S3 buckets via PowerShell, your IAM user 
        (_backupOperator_) will need both an **Access Key ID** and a **Secret 
        Access Key** (to specify in the PowerShell script for authentication). 
    -   To create an access key, log into the AWS Management Console and: 
        1.  Select **Users** 
        2.  Select the user name previously created 
        3.  Scroll down and select **Create Access Key** 
        4.  Be sure to write down or save the Access Keys created 


## 3. Create a bucket in S3 ##

You will need an Amazon S3 bucket to hold your files, which is analogous 
to a directory/folder on your local computer. More information can be found 
at [Working with Amazon S3 Buckets](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html). 

Follow the instructions at [Create a Bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) 
and name it something relevant, such as Backups. 

_Note: Because the AmazonS3FullAccess policy was applied to the S3BackupOperators 
group, members of that group have add/delete permissions to your S3 buckets. 
If you would like to further restrict access for that group to only the Backups 
bucket, review the documentation at 
[Managing Access Permissions to Your Amazon S3 Resources](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html)_.


## 4. Install AWS Tools for Windows PowerShell ##

Amazon has written a PowerShell module that allows you to interact with 
Amazon Web Services remotely via PowerShell scripts. Download 
[AWS Tools for Windows PowerShell](http://aws.amazon.com/powershell/) 
to your Windows PC and follow the installation instructions.

For further details, read [Setting up the AWS Tools for Windows PowerShell](http://docs.aws.amazon.com/powershell/latest/userguide/pstools-getting-set-up.html).

_Note: You will need to enable script execution each time you open the 
PowerShell prompt, which requires administrator privileges. How to do 
this is detailed further below._


## 5. Open PowerShell and configure prerequisite settings ##

There are a few caveats for using PowerShell with AWS. 

### Select which PowerShell prompt to use ###

There are two PowerShell prompts you can use with slightly different requirements 
to get started.

1.  _Windows PowerShell_ that comes with Windows by default
2.  _Windows PowerShell **for AWS**_, which is installed with 
    [AWS Tools for Windows PowerShell](http://aws.amazon.com/powershell/) 

For both PowerShell prompts, you will need to enable script execution, as 
outlined in [Setting up the AWS Tools for Windows PowerShell](http://docs.aws.amazon.com/powershell/latest/userguide/pstools-getting-set-up.html). 
Be sure to open the prompt as an administrator then run `Set-ExecutionPolicy 
RemoteSigned`.

[![Enable script execution for PowerShell](/images/tw_BackupToS3WithPowershell_SetScriptPolicy.jpg "Enable script execution for PowerShell"){: .align-center }](/images/tw_BackupToS3WithPowershell_SetScriptPolicy.jpg)

### Import AWSPowerShell module ###

You might need to import the AWSPowerShell modele, depending on which 
PowerShell prompt you use.

When using the _Windows PowerShell **for AWS**_ prompt, the AWSPowerShell 
module is automatically imported and the `Initialize-AWSDefaults` cmdlet run 
for you, allowing you to begin working with the AWS PowerShell Cmdlets 
immediately.

When using the default _Windows PowerShell_ prompt, you will need to manually 
import the AWSPowerShell module and run the `Initialize-AWSDefaultscmdlet` using 
the following commands.

```powershell
PS C:\> Import-Module “C:\Program Files (x86)\AWS Tools\PowerShell\AWSPowerShell\AWSPowerShell.psd1”
PS C:\> Initialize-AWSDefaults
```

[![Import the AWSPowerShell module](/images/tw_BackupToS3WithPowershell_ImportModule.jpg "Import the AWSPowerShell module"){: .align-center }](/images/tw_BackupToS3WithPowershell_ImportModule.jpg)

## 6. PowerShell script to upload/backup files to Amazon S3 ##

The previous steps prepared you to copy files from your computer to 
Amazon S3 using PowerShell.

The full script will be shown at the end of this document. Meanwhile, 
let’s step through the sections of the script.

### 6.A. Set constant variables ###

First, set the constant variables that will be used in the script.

| Variable | Description | Value (Example) |
| --- | --- | --- |
| `$accessKeyID` | The **Access Key ID** for the _backupOperator_ user | `EXAMPLEDXLAW52MZCGIA` |
| `$secretAccessKey` | The **Secret Access Key** for the _backupOperator_ user | `examplekfLK2c8NCFjlhhjxvYBxJwPkli1HosK4F` |
| `$config` | AmazonS3Config object to hold configuration options, such as **RegionEndpoint** and **ServiceURL** | These depend on your AWS account settings. In this example, the account uses the **US-WEST-2** region endpoint. <br> `RegionEndpoint = us-west-2` <br> `ServiceURL = https://s3-us-west-2.amazonaws.com/` |

_Note: To find out which Region your account is using, login to the AWS 
Management Console and note the Region specified in the URL. The following example 
uses **US-WEST-2**: [https://us-west-2.console.aws.amazon.com/console/home?nc2=h_m_mc&region=us-west-2#](https://us-west-2.console.aws.amazon.com/console/home?nc2=h_m_mc&region=us-west-2#)_

Commands to set the user’s Key variables (using the Access Keys 
previously generated) and to instantiate the AmazonS3Config object to hold 
the `RegionEndpoint` and `ServiceURL` values:

```powershell
$accessKeyID=”EXAMPLEDXLAW52MZCGIA”
$secretAccessKey=”examplekfLK2c8NCFjlhhjxvYBxJwPkli1HosK4F”
$config=New-Object Amazon.S3.AmazonS3Config
$config.RegionEndpoint=[Amazon.RegionEndpoint]::”us-west-2″
$config.ServiceURL = “https://s3-us-west-2.amazonaws.com/“
```

### 6.B. Create AmazonS3Client object ###

In this step, you will instantiate an AmazonS3Client object. It will use 
the permissions and access keys granted to the _backupOperator_ 
user, based on the variables created in the previous step. The AmazonS3Client 
object also requires the previously created AmazonS3Config object to interact 
with your Amazon S3 buckets.

Instantiate the AmazonS3Client object:

```powershell
$client=[Amazon.AWSClientFactory]::CreateAmazonS3Client($accessKeyID,$secretAccessKey,$config)
```

### 6.C. Upload/backup files via PowerShell ###

With PowerShell, you have several options for uploading 
your files.

-   Copy specific files from a single folder or multiple directories. 
-   Copy all files in a directory without including subdirectories. 
-   Copy a directory and its subdirectories, by iterating through 
    the subdirectories with PowerShell. 

#### Copy specific files ####

To copy specific files, use the following commands.

```powershell
Write-S3Object -BucketName Backups -File “C:\Documents\Business\FinancialReports.xlsx” -Key “/Documents/Business/FinancialReports.xlsx”

Write-S3Object -BucketName Backups -File “C:\Pictures\Business Logos\logo.jpg” -Key “/Pictures/Business Logos/logo.jpg”
```

_Note: See the [Write-S3Object](http://docs.aws.amazon.com/powershell/latest/reference/items/Write-S3Object.html) 
Cmdlet documentation for more information._

#### Copy all files in a directory ####

To copy all the files in a directory, use the following command.

```powershell
Write-S3Object -BucketName Backups -Folder “C:\Pictures\Family” -KeyPrefix “/Pictures/Family”
```

_Note: See the [Write-S3Object](http://docs.aws.amazon.com/powershell/latest/reference/items/Write-S3Object.html) 
Cmdlet documentation for more information._

#### Copy a directory and subdirectories ####

To copy a directory and the subdirectories, use the following function to iterate 
through the subdirectories recursively.

```powershell
function RecurseFolders([string]$path) {

  $fc = New-Object -com Scripting.FileSystemObject
  $folder = $fc.GetFolder($path)

  # Iterate through subfolders
  foreach ($i in $folder.SubFolders) {
    $thisFolder = $i.Path

    # Transform the local directory path to notation compatible with S3 Buckets and Folders
    # 1. Trim off the drive letter and colon from the start of the Path
    $s3Path = $thisFolder.ToString()
    $s3Path = $s3Path.SubString(2)
    # 2. Replace back-slashes with forward-slashes
    # Escape the back-slash special character with a back-slash so that it reads it literally, like so: "\\"
    $s3Path = $s3Path -replace "\\", "/"

    # Upload directory to S3
    Write-S3Object -BucketName Backups -Folder $thisFolder -KeyPrefix $s3Path
  }

  # If subfolders exist in the current folder, then iterate through them too
  foreach ($i in $folder.subfolders) {
    RecurseFolders($i.path)
  }
}
```

### 6.D. Full PowerShell script ###

The following is a full PowerShell script that will backup/upload a directory 
(including all subdirectories) from your local computer to an 
Amazon S3 Bucket.

```powershell
# Constants
$sourceDrive = "C:\"
$sourceFolder = "ImportantFiles"
$sourcePath = $sourceDrive + $sourceFolder
$s3Bucket = "Backups"
$s3Folder = "Archive"

# Constants – Amazon S3 Credentials
$accessKeyID="EXAMPLEDXLAW52MZCGIA"
$secretAccessKey="examplekfLK2c8NCFjlhhjxvYBxJwPkli1HosK4F"

# Constants – Amazon S3 Configuration
$config=New-Object Amazon.S3.AmazonS3Config
$config.RegionEndpoint=[Amazon.RegionEndpoint]::"us-west-2"
$config.ServiceURL = "https://s3-us-west-2.amazonaws.com/"

# Instantiate the AmazonS3Client object
$client=[Amazon.AWSClientFactory]::CreateAmazonS3Client($accessKeyID,$secretAccessKey,$config)

# FUNCTION – Iterate through subfolders and upload files to S3
function RecurseFolders([string]$path) {
  $fc = New-Object -com Scripting.FileSystemObject
  $folder = $fc.GetFolder($path)
  foreach ($i in $folder.SubFolders) {
    $thisFolder = $i.Path

    # Transform the local directory path to notation compatible with S3 Buckets and Folders
    # 1. Trim off the drive letter and colon from the start of the Path
    $s3Path = $thisFolder.ToString()
    $s3Path = $s3Path.SubString(2)
    # 2. Replace back-slashes with forward-slashes
    # Escape the back-slash special character with a back-slash so that it reads it literally, like so: "\\"
    $s3Path = $s3Path -replace "\\", "/"
    $s3Path = "/" + $s3Folder + $s3Path

    # Upload directory to S3
    Write-S3Object -BucketName $s3Bucket -Folder $thisFolder -KeyPrefix $s3Path
  }

  # If subfolders exist in the current folder, then iterate through them too
  foreach ($i in $folder.subfolders) {
    RecurseFolders($i.path)
  }
}

# Upload root directory files to S3
$s3Path = "/" + $s3Folder + "/" + $sourceFolder
Write-S3Object -BucketName $s3Bucket -Folder $sourcePath -KeyPrefix $s3Path

# Upload subdirectories to S3
RecurseFolders($sourcePath)
```

## Summary ##

As stated in the beginning of this article, **_the purpose of this tutorial is to get you up and running from scratch with Amazon Simple Storage Service (S3) and a PowerShell script that uploads files._**

Through this process you:

1.  Created an Amazon AWS account 
2.  Learned how to create and manage AWS users and groups via IAM 
3.  Learned how to manage permissions for a group, scoping them based on their role 
4.  Created a S3 bucket and configured permissions through an IAM group 
5.  Experienced how to configure AWS Tools for Windows PowerShell 
6.  Discovered the prerequisites for connecting to AWS via PowerShell 
7.  Learned how to use the Write-S3Object cmdlet to upload files to S3 buckets 
8.  Saw how to iterate through folders and subfolders recursively with PowerShell 
9.  Saw how to change the local folder path format to work with S3 folder format

With this framework in place, you can expand the script to do a number 
of other things. Such as run once per day with a scheduled task (automate to 
improve efficiency), delete old folders/files from S3 as they’re no longer 
used (reducing your S3 storage cost), or only upload new/changed files to S3 
(reducing your data transfer cost).

## Resources ##

-   [Amazon Web Services](http://aws.amazon.com/) (AWS)
-   Identity and Access Management (IAM):
    -   [Getting Started](http://aws.amazon.com/iam/getting-started/)
    -   [IAM’s Best Practices](http://docs.aws.amazon.com/IAM/latest/UserGuide/IAMBestPractices.html)
    -   [Root Account Credentials vs. IAM User Credentials](http://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html)
    -   [User Guide for Identity and Access Management](http://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) (IAM)
-   AWS PowerShell:
    -   [AWS Tools for Windows PowerShell](http://aws.amazon.com/powershell/)
    -   [Setting up the AWS Tools for Windows PowerShell](http://docs.aws.amazon.com/powershell/latest/userguide/pstools-getting-set-up.html)
    -   [Write-S3Object](http://docs.aws.amazon.com/powershell/latest/reference/items/Write-S3Object.html) Cmdlet
-   Amazon S3:
    -   [Create a Bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)
    -   [Working with Amazon S3 Buckets](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)
    -   [Managing Access Permissions to Your Amazon S3 Resources](https://docs.aws.amazon.com/AmazonS3/latest/dev/s3-access-control.html)
    -   [AmazonS3Config](http://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/T_Amazon_S3_AmazonS3Config.htm) Object
    -   [AmazonS3Client](http://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/T_Amazon_S3_AmazonS3Client.htm) Object
    -   [Getting Started with Amazon Simple Storage Service (S3)](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html)
