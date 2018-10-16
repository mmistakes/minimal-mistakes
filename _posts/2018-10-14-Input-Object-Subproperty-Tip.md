---
classes: wide
title: Input Object Subproperty Tip - Get the value without accepting the whole object!
---

I was recently working on the [TOPdeskPS](https://github.com/andrewpla/topdeskps) module and came across the need to access a subproperty of an object that was being input.

```powershell
[pscustomobject]@{
    Property1 = 'value'
    Property2 = ([pscustomobject]@{
         Subproperty1 = 'value2'}
         )}
```

Using the sample above, we need to access BOTH Property1 and Property2. We could accept a pscustomboject as input, but I'd prefer allowing to use to specify their own value for Subproperty1 or Property1 if they want to override the value that would be in the incoming object.

This is a representation of the actual object that I was working with.

```powershell
[pscustomobject]@{
        AssetId = 'ABCD-1234'
        locations = ([pscustomobject]@{
            linkId = 'DEFG-5678'
            branch = 'branchName'
        })
}
```

In our above sample I need both the AssetId and the linkId from the incoming object. I ended up using ValuefromPipelinebyPropertyName and utilizing a parameter alias so I could capture the 'Locations' property from the incoming object. Inside my function I then refer to the LinkId by using $Linkid.LinkId

Now let's create a function that allows us to view this in action. Run this function in your console so we can access it

```powershell
function Get-InputSubproperty{
    param (
        [Parameter(ValuefromPipelinebyPropertyName)]
        $AssetId,

        [Parameter(Valuefrompipelinebypropertyname)]
        # we set an alias so that we can capture the parent property of our LinkId, locations.
        [Alias('locations')]
        $LinkId
    )
    process {
        [pscustomobject]@{
            AssetId = $AssetId
            # We need to access the property inside $LinkId.
            # We captured the parent property, Locations, from the input object so we need to refer to the linkId inside the object.
            LinkId = $LinkId.linkid
        }
    }
}
```

Now let's try accessing the subproperty

```powershell
    [pscustomobject]@{
        AssetId = 'ABCD-1234'
        locations = ([pscustomobject]@{
            linkId = 'DEFG-5678'
            branch = 'branchName'
        })
} | Get-InputSubproperty
```
As you can see, we are able to easily access the linkId with nice pipeline support.

This is the body of the code that I ended up with.

```powershell

    [CmdletBinding(HelpUri = 'https://andrewpla.github.io/TOPdeskPS/commands/TOPdeskPS/Remove-TdAssetAssignment',
        SupportsShouldProcess = $true)]
    param
    (
        [Parameter(Mandatory = $true,
            ValueFromPipelineByPropertyName = $true)]
        # locations alias to capture the parent property of the linkid
        [Alias('locations')]
        $LinkId,

        [Parameter(Mandatory = $true,
            ValueFromPipelineByPropertyName = $true)]
        [system.string]
        $AssetId
    )
    process {
        $uri = (Get-TdUrl) + "/tas/api/assetmgmt/assets/$AssetId/assignments/$($LinkId.linkId)"
        if (-not (Test-PSFShouldProcess -PSCmdlet $PSCmdlet -Target $AssetId -Action "Removing asset assignment $($LinkId.linkId).")) {
            return
        }
        Invoke-TdMethod -Method 'Delete' -Uri $uri
    }

```

# Closing Thoughts

If you work with API's and haven't tried using PowerShell to do so then I highly recommend you give it a shot. I'm always so pleased with how easy it is to make great tools with PowerShell that provide great value.

I thought this was a pretty clever workaround. Thanks to [Chris Gardner](https://twitter.com/halbaradkenafin) for the idea. I highly recommend that you join the PowerShell slack community if you haven't already. You can use [Discord](https://j.mp/psdiscord), [Slack](https://j.mp/psdiscord), or IRC.
