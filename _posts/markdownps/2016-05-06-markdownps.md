---
date: 2016-05-06 14:41:31
title: markdownps
tags:
- PowerShell
- MarkdownPS
excerpt: PowerShell module to render markdown

---



[MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/) is a PowerShell module that wraps the **markdown** syntax into PowerShell cmdlets.

Initially I ran into the [PSMarkdown](https://www.powershellgallery.com/packages/PSMarkdown) for which [ishu3101](https://github.com/ishu3101) had developed a cmdlet that renders a table in markdown syntax. This was very useful and I decided that I needed more functionality provided by cmdlets to render other aspects of markdown. After discussing with [ishu3101](https://github.com/ishu3101) I pushed a head and created a module of my own. The `New-MDTable` cmdlet's code is inspired by the `ConvertTo-Markdown` by [ishu3101](https://github.com/ishu3101) but I enhanced it with column alignment. 

This is my first open source projects in GitHub, so I took the opportunity to educate myself a bit about it. The [MarkdownPS](https://github.com/Sarafian/MarkdownPS) repository is integrated with visual studio services and I also use [Pester](https://github.com/pester/Pester) to unit test each cmdlet. Overall, it was a good experience while picking up PowerShell knowledge along. Integrating Pester from Visual Studio Services is a bit tricky because VSS runs on PowerShell 4 and the Pester is available with PowerShell v5. The solution is available in [code](https://github.com/Sarafian/MarkdownPS/tree/master/Pester).

## Rendering headers

```powershell
New-MDHeader "Headings"
New-MDHeader "The second largest heading" -Level 2
"The smallest heading"|New-MDHeader  -Level 6
```

renders

```markdown
# Headings

## The second largest heading

###### The smallest heading
```

> # Headings
> 
> ## The second largest heading
> 
> ###### The smallest heading

## Paragraphs

```powershell
$lines=@(
    "Paragraphs are separated by empty lines. Within a paragraph it's possible to have a line break,"
    "simply press <return> for a new line."
)
New-MDParagraph -Lines $lines
$lines=@(
    "For example,"
    "like this."
)
New-MDParagraph -Lines $lines
``` 

renders

```markdown
Paragraphs are separated by empty lines. Within a paragraph it's possible to have a line break,
simply press <return> for a new line.

For example,
like this.
```

> Paragraphs are separated by empty lines. Within a paragraph it's possible to have a line break,
> simply press <return> for a new line.
> 
> For example,
> like this.

## Bold, Italic and StrikeThrough
```powershell
New-MDCharacterStyle -Text "Italic characters" -Style Italic
New-MDCharacterStyle -Text "bold characters" -Style Bold
New-MDCharacterStyle -Text "strikethrough text" -Style StrikeThrough
"All Styles" | New-MDCharacterStyle -Style Bold| New-MDCharacterStyle -Style Italic | New-MDCharacterStyle -Style StrikeThrough
```
renders
```markdownps
*Italic characters*

**bold characters**

~~strikethrough text~~

~~***All Styles***~~
```

> *Italic characters*
> 
> **bold characters**
> 
> ~~strikethrough text~~
> 
> ~~***All Styles***~~

## Lists
```powershell
$lines=@(
    "George Washington",
    "John Adams",
    "Thomas Jefferson"
)
New-MDList -Lines $lines -Style Unordered

$lines=@(
    "James Madison",
    "James Monroe",
    "John Quincy Adams"
)
New-MDList -Lines $lines -Style Ordered


New-MDList -Lines "Make my changes" -Style Ordered -NoNewLine
New-MDList -Lines @("Fix bug","Improve formatting") -Level 2 -Style Ordered -NoNewLine
New-MDList -Lines "Make the headings bigger" -Level 3 -Style Unordered -NoNewLine
New-MDList -Lines "Push my commits to GitHub" -Style Ordered -NoNewLine
New-MDList -Lines "Open a pull request" -Style Ordered -NoNewLine
New-MDList -Lines @("Describe my changes","Mention all the members of my team") -Level 2 -Style Ordered -NoNewLine
New-MDList -Lines "Ask for feedback" -Level 3 -Style Unordered

```
renders
```markdown
- George Washington
- John Adams
- Thomas Jefferson


1. James Madison
2. James Monroe
3. John Quincy Adams


1. Make my changes

   1. Fix bug
   2. Improve formatting

    - Make the headings bigger

1. Push my commits to GitHub

1. Open a pull request

   1. Describe my changes
   2. Mention all the members of my team

    - Ask for feedback
```
> - George Washington
> - John Adams
> - Thomas Jefferson
> 
> 
> 1. James Madison
> 2. James Monroe
> 3. John Quincy Adams
> 
> 
> 1. Make my changes
> 
>    1. Fix bug
>    2. Improve formatting
> 
>     - Make the headings bigger
> 
> 1. Push my commits to GitHub
> 
> 1. Open a pull request
> 
>    1. Describe my changes
>    2. Mention all the members of my team
> 
>     - Ask for feedback

## Links
```powershell
"This is "+(New-MDLink -Text "an example" -Link "http://www.example.com/")+" inline link."
New-MDParagraph

(New-MDLink -Text "This link" -Link "http://www.example.com/" -Title "Title")+" has a title attribute."
```
renders
```markdown
This is [an example](http://www.example.com/) inline link.

[This link](http://www.example.com/ "Title") has a title attribute.
```

> This is [an example](http://www.example.com/) inline link.
> 
> [This link](http://www.example.com/ "Title") has a title attribute.

## Images
```powershell
New-MDImage -Source "/img/main//welcome.jpg" -AltText "Alt text"
New-MDParagraph
New-MDImage -Source "/img/main//welcome.jpg" -AltText "Alt text" -Title "Optional title attribute"
```
renders
```markdown
![Alt text](/img/main//welcome.jpg)

![Alt text](/img/main//welcome.jpg "Optional title attribute")
```

> ![Alt text](/img/main//welcome.jpg)
> 
> ![Alt text](/img/main//welcome.jpg "Optional title attribute")


## Quote
```markdown
New-MDParagraph -Lines "In the words of Abraham Lincoln:"
$lines=@(
    "Pardon my French"
)
New-MDQuote -Lines $lines

New-MDParagraph -Lines "Multi line quote"
$lines=@(
    "Line 1"
    "Line 2"
)
New-MDQuote -Lines $lines
```

renders
```markdown
Multi line quote

> Line 1
>
> Line 2
```
> Multi line quote
> 
> > Line 1
> >
> > Line 2


## Code fences
```powershell
"Use "+(New-MDInlineCode -Text "git status") + "to list all new or modified files that haven't yet been committed."

New-MDParagraph -Lines "Some basic Git commands are:"
$lines=@(
    "git status",
    "git add",
    "git commit"
)
New-MDCode -Lines $lines

$lines=@(
    '<?xml version="1.0" encoding="UTF-8"?>'
    "<node />"
)
New-MDCode -Lines $lines -Style "xml"
```
renders

```markdown
Use \`git status\`to list all new or modified files that haven't yet been committed.
Some basic Git commands are:

```
    git status
    git add
    git commit
```

```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <node />
```

```

> Use `git status`to list all new or modified files that haven't yet been committed.
> Some basic Git commands are:
> 
> ```
>     git status
>     git add
>     git commit
> ```
> 
> ```xml
>     <?xml version="1.0" encoding="UTF-8"?>
>     <node />
> ```

## Tables
```markdown
New-MDHeader "Tables"
New-MDParagraph -Lines "Without aligned columns"
Get-Command -Module MarkdownPS |Select-Object Name,CommandType,Version | New-MDTable
New-MDParagraph -Lines "With aligned columns"
Get-Command -Module MarkdownPS | New-MDTable -Columns ([ordered]@{Name="left";CommandType="center";Version="right"})
```
renders
```markdown
Without aligned columns


| Name                 | CommandType          | Version              |
| -------------------- | -------------------- | -------------------- |
| New-MDCharacterStyle | Function             |                      |
| New-MDCode           | Function             |                      |
| New-MDHeader         | Function             |                      |
| New-MDImage          | Function             |                      |
| New-MDInlineCode     | Function             |                      |
| New-MDLink           | Function             |                      |
| New-MDList           | Function             |                      |
| New-MDParagraph      | Function             |                      |
| New-MDQuote          | Function             |                      |
| New-MDTable          | Function             |                      |

With aligned columns


| Name                 | CommandType          | Version              |
| -------------------- |:--------------------:| --------------------:|
| New-MDCharacterStyle | Function             |                      |
| New-MDCode           | Function             |                      |
| New-MDHeader         | Function             |                      |
| New-MDImage          | Function             |                      |
| New-MDInlineCode     | Function             |                      |
| New-MDLink           | Function             |                      |
| New-MDList           | Function             |                      |
| New-MDParagraph      | Function             |                      |
| New-MDQuote          | Function             |                      |
| New-MDTable          | Function             |                      |
```
> Without aligned columns
> 
> | Name                 | CommandType          | Version              |
> | -------------------- | -------------------- | -------------------- |
> | New-MDCharacterStyle | Function             |                      |
> | New-MDCode           | Function             |                      |
> | New-MDHeader         | Function             |                      |
> | New-MDImage          | Function             |                      |
> | New-MDInlineCode     | Function             |                      |
> | New-MDLink           | Function             |                      |
> | New-MDList           | Function             |                      |
> | New-MDParagraph      | Function             |                      |
> | New-MDQuote          | Function             |                      |
> | New-MDTable          | Function             |                      |
> 
> With aligned columns
> 
> | Name                 | CommandType          | Version              |
> | -------------------- |:--------------------:| --------------------:|
> | New-MDCharacterStyle | Function             |                      |
> | New-MDCode           | Function             |                      |
> | New-MDHeader         | Function             |                      |
> | New-MDImage          | Function             |                      |
> | New-MDInlineCode     | Function             |                      |
> | New-MDLink           | Function             |                      |
> | New-MDList           | Function             |                      |
> | New-MDParagraph      | Function             |                      |
> | New-MDQuote          | Function             |                      |
> | New-MDTable          | Function             |                      |

