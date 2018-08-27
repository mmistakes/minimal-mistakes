Contributing to open source is something that I really enjoy doing and want to do more of. I have been using the [PowerShell Framework](https://psframework.org) while developing modules lately (check it out!) and realized that despite having a website and a copy of all of the commands', running Get-Help with the -Online switch wasn't taking me to the online help for that command. Looks like a slight oversight, but this is a great opportunity to contribute back to a project that I use frequently. Also, it should be noted that the project is maintained by [Fred](https://twitter.com/FredWeinmann) and he's awesome.

## What's a HelpUri

The HelpUri is an argument inside CmdletBinding that points to the address of the online version of the help topic that describes that function. The command must have a HelpUri in order to use the -Online switch of Get-Help.

```powershell
[CmdletBinding(HelpUri ='https://psframework.org/documentation/commands/PSFramework/Register-PSFConfigValidation')]
# Read more about CmdletBinding
Help about_Functions_CmdletBindingAttribute
```

## The Plan

We need to add this helpuri to a bunch of functions. There are about 60 commands that we have to update so let's get some PowerShell assistance. I also want to make something that I can reuse later. This is PowerShell so let's make a tool!

- Grab all of the Function files and loop through them
- Grab the Current CmdletBinding from the file
- Generate an appropriate new CmdletBinding that contains a proper HelpUri
- Display to Out-GridView -Passthru so we can give it a visual check and note any entries with issues.
- Proceed with replacing the old CmdletBinding in the File with the New one
- Submit the Pull Request

## The Result

You can grab the current version of the file from my [Github](https://github.com/AndrewPla/PowerShell-Toolery-and-Foolery/blob/master/Update-CmdletBinding.ps1)

```powershell
[cmdletbinding()]
param
(
	$baseUrl = 'https://psframework.org/documentation/commands/PSFramework/',
	
	$Path = 'C:\Repos\PowershellFrameworkCollective\psframework\PSFramework\functions'
)
$Files = Get-ChildItem $Path -Recurse -filter '*.ps1'

# Generate all the info for all functions
$Results = foreach ($File in $Files) {
	$CommandName = $File.basename
	$CommandUrl = $baseUrl + $CommandName
	$HelpUri = "[CmdletBinding(HelpUri = '$CommandUrl')]"
	$NewHelpUri = ", HelpUri = '$CommandUrl')"
	
	#region Grab the current Cmdletbinding
	$Content = Get-Content $File.FullName
	$cmdletbinding = ($Content | Select-String -Pattern 'cmdletbinding' | Out-String).trim()
	$CmdletBinding = $CmdletBinding.tostring()
	#endregion Grab the current Cmdletbinding
	
	#region Create the New CmdletBinding
	if ($cmdletbinding -like '*=*') {
		$NewCmdletBinding = $CmdletBinding.replace(')', "$NewHelpUri")
	}
	else {
		$NewCmdletBinding = $CmdletBinding.replace('[CmdletBinding()]', "$HelpUri")
	}
	#endregion Create the New CmdletBinding
	[pscustomobject]@{
		CommandName	     = $CommandName
		CmdletBinding    = $cmdletbinding
		NewCmdletBinding = $NewCmdletBinding
		FileName		 = $File.FullName
	}
}

# Display the output and manually select what to do and what not to do
$Results | Out-GridView -PassThru | ForEach-Object -Process {
	$content = [System.IO.File]::ReadAllText($_.filename).Replace($_.CmdletBinding, $_.newcmdletbinding)
	$Result = [System.IO.File]::WriteAllText($_.filename, $content)
	
	[pscustomobject]@{
		CommandName = $_.commandName
		CmdletBinding = $_.cmdletbinding
		NewCmdletBinding = $_.newcmdletbinding
	}
}
```

## Testing
After running that and updating all of the commands now we need to make sure that it doesn't happen again. In the PSFramework project is already a pester test file for the Help so we just need to add an additional check for a valid HelpUri.

```powershell
if (($command.HelpUri -notlike $HelpUri) -and ($ExportedCommands -contains $commandName)) {
			# Each exported command needs a helpuri that points to the proper url.
			It "should contain a proper helpuri" {
				$Command.HelpUri | Should Be $HelpUri
			}
			$testhelperrors += 1
		}
```