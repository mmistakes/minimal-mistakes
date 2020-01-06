---
title: "Solving PicoCTF 2019: General Skills using PowerShell"
excerpt: "Learn how to solve the PicoCTF 2019 challenges using PowerShell when possible."
tags:
- PowerShell
- CTF
classes: wide
toc: true
---

# PicoCTF 2019 General Skills

I was listening to one of my favorite podcasts, [Darknet Diaries](https://darknetdiaries.com/), and this episode was about CTFs and one Team's journey to become Def Con champions.  Jack Rhysider recommends that people who are interested in getting into CTFs should checkout Carnegie Mellon's PicoCTF. I enjoy learning and taking the advice of people who I want to emulate so I decided to do a writeup on PicoCTF 2019 using PowerShell. PicoCTF has been out for a while and the competition aspect of it is over. Fortunately the environment and challenges are available all year long.

## 2warm

#### Problem
Can you convert the number 42 (base 10) to binary (base 2)?

#### Solution

```
[Convert]::ToString(42,2)
101010
```
picoCTF{101010}

## Lets Warm Up

### Problem
If I told you a word started with 0x70 in hexadecimal, what would it start with in ASCII?

### Solution
```
[char]([convert]::ToInt16(70,16))
p
```
picoCTF{p}

## Warmed Up

### Problem
What is 0x3D (base 16) in decimal (base 10).

### Solution

```
[Convert]::ToString(0x3D, 10)
61
```
picoCTF{61}

## Bases

### Problem

What does this bDNhcm5fdGgzX3IwcDM1 mean? I think it has something to do with bases.

### Solution

```
[System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String("bDNhcm5fdGgzX3IwcDM1"))
l3arn_th3_r0p35
```

picoCTF{l3arn_th3_r0p35}

## First Grep

### Problem

Can you find the flag in file? This would be really tedious to look through manually, something tells me there is a better way. You can also find the file in /problems/first-grep_3_2e09f586a51352180a37e25913f5e5d9 on the shell server.

### Solution

```powershell
(Get-Content ./file) | Select-String -Pattern picoctf
picoCTF{grep_is_good_to_find_things_205b65d7}
```

picoCTF{grep_is_good_to_find_things_205b65d7}

## Resources

### Problem

We put together a bunch of resources to help you out on our website! If you go over there, you might even find a flag! https://picoctf.com/resources

### Solution

Read the page and you will discover the flag. It isn't hidden.

## strings it

### Problem

Can you find the flag in file without running it? You can also find the file in /problems/strings-it_5_1fd17da9526a76a4fffce289dee10fbb on the shell server.

### Solution

We can solve this one without requiring strings, we just need a bit of regex.

```powershell
Get-Content .\strings | Select-String -Pattern 'picoCTF{\w{0,30}}' | % {$_.matches.value}
picoCTF{5tRIng5_1T_dd210c06}
```

## what's a net cat?

### Problem

Using netcat (nc) is going to be pretty important. Can you connect to 2019shell1.picoctf.com at port 32225 to get the flag?

### Solution

```
nc 2019shell1.picoctf.com 32225
You're on your way to becoming the net cat master
picoCTF{nEtCat_Mast3ry_b1d25ece}
```

## Based

### Problem

To get truly 1337, you must understand different data encodings, such as hexadecimal or binary. Can you get the flag from this program to prove you are on the way to becoming 1337? Connect with nc 2019shell1.picoctf.com 44303.

### Solution

Things are starting to get interesting! This next challenge is going to require us to convert a some numbers into words. The instructions tell us to use netcat to connect, upon connecting it asks us to convert the provided numbers into a string and return it. We are going to have some fun with this one and write up a solution that uses PowerShell and can be run cross platform.

There are some modules available that we could use, but I want to just write up a quick script that contains all that we need. This is a great chance to get our hands dirty which I find is the best way that to learn. We could've probably written a script that would copy/paste values for us, but I think that doing something that we can run that will solve this for us will be more fun.

<script src="https://gist.github.com/AndrewPla/62ccf308ed5d3050fff34b50fa7e52b9.js"></script>

## First Grep: Part II

### Problem

Can you find the flag in /problems/first-grep--part-ii_3_b4bf3244c2886de1566a28c1b5a465ae/files on the shell server? Remember to use grep.

### Solution

We can connect to the shell server using `ssh 2019shell1.picoctf.com`
I am going to use PowerShell to parse these files and find the flag, but first I need to grab the files with `scp`.

Download the files
```
Scp -r Androopie@2019shell1.picoctf.com:/problems/first-grep--part-ii_3_b4bf3244c2886de1566a28c1b5a465ae/files c:\delete
 ```

Loop through all files and return any lines that contain picoCTF
```powershell
Get-ChildItem -File -Recurse | ForEach-Object {
     (Get-Content $_.FullName ) -like '*picoctf{*'}

picoCTF{grep_r_to_find_this_3675d798}
```

## Plumbing

### Problem

Sometimes you need to handle process data outside of a file. Can you find a way to keep the output from this program and search for the flag? Connect to 2019shell1.picoctf.com 57911.

### Solution

```
nc 2019shell1.picoctf.com 57911 | Where {$_ -like 'pico*'}

picoCTF{digital_plumb3r_931b2271}
```

## What's the Difference

### Problem

Can you spot the difference? kitters cattos. They are also available at /problems/whats-the-difference_0_00862749a2aeb45993f36cc9cf98a47a on the shell server

### Solution

Download the file on Windows

```
Scp -r Androopie@2019shell1.picoctf.com:/problems/whats-the-difference_0_00862749a2aeb45993f36cc9cf98a47a c:\delete
```
I was originally using `Compare-Object`, but it didn't return the full answer.

```powershell
$cattosPath = '.\cattos.jpg'
$cattosBytes = [System.IO.File]::ReadAllBytes($cattosPath)

$kittersPath = '.\kitters.jpg'
$kittersBytes = [System.IO.File]::ReadAllBytes($kittersPath)

$differences = Compare-Object $cattosBytes $kittersBytes

[system.text.encoding]::Default.GetString($differences.inputobject)
```

```
picoCTth3y3_a5_dff3r3t_4s_bu773r_4nd_j311y_asljfdsalkfslkflkjdsfdszmz10548}
```

We can tell by the output that we are close to getting the flag, but we are clearly missing characters. The format of our answer should be picoCTF{answerHere}

Instead of making use of Compare-Object we will need to perform the comparison ourselves.

```powershell
$cattosPath = '.\ cattos.jpg'
$cattosBytes = [System.IO.File]::ReadAllBytes($cattosPath)

$kittersPath = '.\kitters.jpg'
$kittersBytes = [System.IO.File]::ReadAllBytes($kittersPath)

$i = 0
$output = do {
    if ($cattosBytes[$i] -ne $kittersBytes[$i] ) {
        $byte = $cattosBytes[$i]
        [system.text.encoding]::Default.GetString($byte)
    }
    $i++
}
until ($i -gt $kittersBytes.Length)

# put the output on one line.
$output -join ''

```

```
picoCTF{th3yr3_a5_d1ff3r3nt_4s_bu773r_4nd_j311y_aslkjfdsalkfslkflkjdsfdszmz10548}
```

## where-is-the-file

### Problem

I've used a super secret mind trick to hide this file. Maybe something lies in /problems/where-is-the-file_0_cc140a3ba634658b98122a1954c1316a.

### Solution

```
# connect using SSH
 ssh Androopie@2019shell1.picoctf.com

cd /problems/where-is-the-file_0_cc140a3ba634658b98122a1954c1316a.

ls -a

cat .cant_see_me

picoCTF{w3ll_that_d1dnt_w0RK_b2dab472}
```

## flag_shop

### Problem

There's a flag shop selling stuff, can you buy a flag? Source. Connect with nc 2019shell1.picoctf.com 63894.

### Solution

The following is a selection of the source code for the flag shop.

```c
 if(auction_choice == 1){
                printf("These knockoff Flags cost 900 each, enter desired quantity\n");
                int number_flags = 0;
                fflush(stdin);
                scanf("%d", &number_flags);
                if(number_flags > 0){
                    int total_cost = 0;
                    total_cost = 900*number_flags;
                    printf("\nThe final cost is: %d\n", total_cost);
                    if(total_cost <= account_balance){
                        account_balance = account_balance - total_cost;
                        printf("\nYour current balance after transaction: %d\n\n", account_balance);
                    }
                    else{
                        printf("Not enough funds to complete purchase\n");
                    }
                }
            }
```

The line that interests me the most is ```total_cost = 900*number_flags;```. If we cause the total cost to get high enough we can overflow the integer.

If we enter a huge number for number_flags we can overflow the integer. We will use the number 55555555.

```
PS >nc 2019shell1.picoctf.com 63894
Welcome to the flag exchange
We sell flags

1. Check Account Balance

2. Buy Flags

3. Exit

 Enter a menu selection
2


Currently for sale
1. Defintely not the flag Flag
2. 1337 Flag
1


These knockoff Flags cost 900 each, enter desired quantity
55555555

The final cost is: -1539608052

Your current balance after transaction: 1539609152

Welcome to the flag exchange
We sell flags

1. Check Account Balance

2. Buy Flags

3. Exit

 Enter a menu selection

2
Currently for sale
1. Defintely not the flag Flag
2. 1337 Flag
2
1337 flags cost 100000 dollars, and we only have 1 in stock
Enter 1 to buy one1
YOUR FLAG IS: picoCTF{m0n3y_bag5_818a7f84}
Welcome to the flag exchange
We sell flags

1. Check Account Balance

2. Buy Flags

3. Exit

 Enter a menu selection
```

picoCTF{m0n3y_bag5_818a7f84}

## Mus1c

### Problem

I wrote you a song. Put it in the picoCTF{} flag format

### Solution


The hint for this question says "Do you think you can master rockstar?"

Rockstar is a programming language. The lyrics.txt file contains lyrics such as:

```
Pico's a CTFFFFFFF
my mind is waitin
It's waitin

Put my mind of Pico into This
my flag is not found
put This into my flag
put my flag into Pico
```

`get-content .\lyrics.txt | Set-Clipboard`

We can paste this code into https://codewithrockstar.com/online in order to run our code.
The script returns a series of numbers. We can create an array to store all of the numbers returned from the Rockstar program.

```
$lyrics = @(114
114
114
111
99
107
110
114
110
48
49
49
51
114)
```

Next, we need to convert these decimal values into Hexadecimal

```
$lyrics | % {"0x$([system.string]::format('{0:X}',$_))"}
0x72
0x72
0x72
0x6F
0x63
0x6B
0x6E
0x72
0x6E
0x30
0x31
0x31
0x33
0x72
```

Building on the last result, we can use the pipeline to convert hex into characters and join the array together using `-join ''`

```
($lyrics |
Foreach-Object { "0x$([system.string]::format('{0:X}',$_))" } |
Foreach-Object { [char][byte]"$_"} ) -join ''

rrrocknrn0113r
```

picoCTF{rrrocknrn0113r}

## 1_wanna_b3_a_r0ck5tar

### Problem

I wrote you another song. Put the flag in the picoCTF{} flag format.

### Solution

This is another txt file containing a Rockstar song. Running the code in returns no output.

It sounds like it's time to RTFM a bit to understand what this code is actually doing. Read along here: https://codewithrockstar.com/docs

"Simple variables are valid identifiers that are not language keywords. A simple variable name must contain only letters, and cannot contain spaces. Note that Rockstar does not allow numbers or underscores in variable names - remember the golden rule of Rockstar syntax: if you can’t sing it, you can’t have it. Simple variables are case-insensitive."

Every line that contains 'is' is a variable assignment. It also looks like Shout and Scream are ways that output is printed. Browsing through the code we can copy/paste all of the print statements and display the program output.

```
Tommy is rockin guitar
Shout Tommy!
Music is amazing sensation
Jamming is awesome presence
Scream Music!
Scream Jamming!
Tommy is playing rock
Scream Tommy!
They are dazzled audiences
Shout it!
Rock is electric heaven
Scream it!
Tommy is jukebox god
Say it!
```


Copying/Pasting the previous code to https://codewithrockstar.com/online returns more decimal values that we will need to convert to hex and then ASCII characters. This is the same process as the last step, so we can have some fun and use a one liner.

```
(@(66,79,78,74,79,86,73) | % {[char][byte]"0x$([string]::format('{0:X}',$_))" }) -join ''
BONJOVI
```

picoCTF{BONJOVI}

## Conclusion

This was a fun experience. Thanks to Carnegie Mellon for putting together a fun CTF. I've only completed the general skills challenges so far, but look forward to attempting the other ones from a PowerShell perspective. I look forward to doing more posts like this in the future.
