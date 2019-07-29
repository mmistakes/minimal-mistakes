---
title: Adding New Color Schemes to Windows Terminal
excerpt: "Utilize the iTerm2 Color Schemes in Windows Terminal."
tags:
- PowerShell
- Windows Terminal
classes: wide

image: /assets/graycomputernotepad.jpg
thumbnail: /assets/graycomputernotepad.jpg
header:
  teaser: /assets/graycomputernotepad.jpg

---

# Windows Terminal

I've been having a lot of fun with the new [Windows Terminal](https://github.com/microsoft/terminal). One issue that I found is that I couldn't find an appropriate color scheme to go with my background. I tried using the [ColorTool](https://github.com/Microsoft/Terminal/tree/master/src/tools/ColorTool), but that wasn't working for me.

In this post we are going to look at the Windows Terminal settings file and see how we can interact with it. From there, we will write a script that will download all of the color schemes that we want and add them to our settings file for us.

## Settings

The Windows Terminal settings are stored in a file called `profiles.json`. You can open up this file in your default editor by pressing `ctrl + ,` while in the Windows Terminal. You could also click the drop down arrow in the top-right and click on settings yourself, but I don't recommend using your mouse.

JSON files are commonly used to store settings. PowerShell is well equipped to interact with them using `ConvertFrom-Json`. Windows Terminal stores the `profiles.json` file at `C:\Users\$Env:Username\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState\profiles.json`.

### Acessing profiles.json from PowerShell

```powershell
$profilePath = "C:\Users\$Env:Username\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\RoamingState\profiles.json"

$profile = Get-Content $ProfilePath | ConvertFrom-Json

$profile | Get-Member -MemberType NoteProperty
```

### Updating profiles.json from PowerShell
`$profile` now contains an object representing the `profiles.json` file. As an example, we can change the theme of Windows Terminal by changing the `requestedTheme` property inside of `globals`.

```powershell
# Display the global properties
$profile.globals

# Update the requestedTheme to dark mode
$profile.globals.requestedTheme = 'dark'

# update the profiles.json file with the updated object
$profile |
 ConvertTo-Json |
 Set-Content -Path $profilePath
```

The Windows Terminal default theme is now dark, which should be much better.

### Color Schemes

In the `profile.json` file there is a section dedicated to schemes. A color scheme determines the color of the text that is displayed in the Terminal.

#### View Your Color Schemes

By default there are only 6 schemes that come with Windows Terminal. You can select between, Ubuntu, UbuntuLegit, Campbell, Solarized Dark, Solarized Light.

```powershelll
# View your currently configured color schemes
$profile.schemes.name
```

#### Update your Color Scheme

Color schemes are applied to each of your profiles. We are going to update the color scheme for the profile that launches powershell.

```powershell
# Display all profiles
$profile.profiles


$powershellExes = @('powershell.exe' , 'pwsh.exe')

# Grab first powershell profile and update the colorScheme
($profile.profiles |
 Where-object commandline -in $powershellExes |
 Select-Object -First 1).colorScheme = 'UbuntuLegit'

# Save the results
$profile |
 ConvertTo-Json |
 Set-Content -Path $profilePath
```

#### Get New Color Schemes

I'm not happy that it only ships with 5 schemes. Fortunately, there is a project on GitHub that has exactly what we want. If we look at the [iTerm2-Color-Schemes Repository](https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal) we can get a listing of color schemes that are meant to be added to the Windows Terminal.

We are able to add the contents of any of the `JSON` files to the schemes section of our `profile.json` file and then you can refer to the new theme in the colorScheme property of a profile.

That sounds like too much work for me. I'm pretty greedy and enjoy anything that is free so I'd like to script out this so I can just use PowerShell to do the hard work for me. Who wants to spend their time updating `JSON` files. Yuck!

#### Get-WtTheme

This function will return all of the themes from the repository. This will make it easy to update the `profile.json` with all of the themes.

```powershell
Function Get-WtTheme {
    <#
    .Description
    Returns themes from
    https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/windowsterminal/3024%20Day.json
    .Parameter Url
    Url to the iTerm2 project.
    .Parameter Theme
    Specify the name of the theme that you want returned. All themes are returned by default
    .Example
    PS> Get-WtTheme
    Returns all available themes
    .Example
    PS> Get-WtTheme -Filter 'atom.json'
    Retrieves the atom.json theme.
    .Link
    https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/windowsterminal/3024%20Day.json
    .Link link to blogpost
    #>
    [cmdletbinding()]
    param(
        [string]
        $Theme = '*',

[string]
        $Url = 'https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal'
    )

    $page = Invoke-WebRequest $Url -UseBasicParsing

    $links = $page.Links | Where-Object title -like "$Theme.json"

    Write-Verbose "$($links.count) links found matching $Theme"

    foreach ($link in $links) {
        # Use the raw url so raw results can be returned and output
        $base = 'https://raw.githubusercontent.com'
        $href = $link.href

        $rawUrl = $base + $href
        $rawUrl = $rawUrl.replace('/blob', '')

        Invoke-RestMethod $RawUrl
    }
}

```

Now we can combine all the code snippets above and we will have a nice little script to add all of the schemes to the profile. For bonus points, we will also throw in a `Set-WtScheme` that will update the scheme for a given profile. It will determine the available parameters by looking at your current `profile.json`

### Completed Gist

The gist is the final product. Just copy and paste into your terminal and run it. I opted to avoid writing this as a script or a module because I want it to be copy/pastable from the blog post. I hope that this saves you some time.

<script src="https://gist.github.com/AndrewPla/5c302e91af5448c89a65bfab364249d8.js"></script>
