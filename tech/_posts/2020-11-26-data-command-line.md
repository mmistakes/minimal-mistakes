---
title: Some basic tips on using the command line for data work
tags:
  - command line
  - data
categories: tech
excerpt: A list of easy command line commands to facilitate data work
---

I've been challenging myself to write down *the most common* command line commands I use day to day to work with data.
This post is about the list I came up with, it does not have any pretence to be exhaustive nor general/agreed by everyone. In fact, I don't even think these are really *all* of the most common commands I use - I may have forgotten several.

Also, the commands I'm listing here are quite basics ones, they're likely amongst the most common commands used overall, but that's also why I use them all the time so I thought I'd share anyway - this can help people who are maybe at the start of their data science journey, or just work as a little cheatsheet. Note that J Janssens has written a <a href="#references">fantastic book</a> about using the command line for data science.

Note that these commands will refer to a Unix system.


# Explore what's in directories, and how much it occupies

You're somewhere and you don't know where?

* `pwd` (print work directory) is your friend
* you can `cd` (change directory) to go somewhere
* `ls` (list) will show you what's in there, `ls -la` will show you in long listing (`-l`) and including hidden files `-a`
* `du` (disk usage) will show you the occupancy of said material, flag `-h` will do that in human-readable form

# Manipulate things

* `mv` (move) is to move files and directories (you need a `-r` flag in that case), it's also used for renaming
* `rm` will remove files (with flag `-r` will remove a directory)
* `cp` (copy) will copy data (files/directories)

# Simple stats on a file, or counting what's in a directory

`wc` (word count) is great, it will allow you to count lines of a file as well as (as per the name) the tokens in it.

* `wc -l` is for when you quickly need to know how many lines are there in a file, it's very useful e.g. for a CSV when running Python to do this or opening the file in an editor would be overkill
* `wc -w` will count the tokens (words) instead, where the separators used to determine what's a word are spaces, tabs and newlines

There are other useful options to `wc`. I often use it in conjunction with `ls` to count the number of files in a folder, as  

```
ls <directory_name> | wc -l
```

Note that the pipe (`|`) is what lets you concatenate commands such that you create a nested structure for instructions: in this case the output of `ls`, which is the list of files in my folder, gets fed to `wc` so that (given the use of the flag) lines are counts, and the overall result is the count of items in the folder.

# Various utilities

* `history` will show you the last (how many?) commands you've used - very useful
* `man <command>` will show you the command manual, I often skip overlook myself and go directly for googling, but it's a good practice instead (and will possibly reinforce your memory more...)
* `grep` is used to fetch strings


# Monitor running programs

If I've run a Jupyter in the background (or anything else), I can fetch it easily.

* `pgrep jupyter` - this will search by pattern (in this case "jupyter"), looking for all running jobs matching what I wrote, and will return me the PID (process ID)
* `kill <PID>` allows me to kill the job, note that `kill -9` will run the signal KILL (SIGKILL), which will force kill it - there are other signals
* `killall` is extreme, it'll kill all processes

# Compressing data

I work with various machines and often need to move data from one to the other - if it's a directory and it's rather big I prefer to ZIP it up beforehand, using command `zip`. Then I unzip with `unzip`. Easy. But because I can never remember the syntax of these, I make great use of `history` to recall this, like `history | grep zip`, which will show all places in the history I wrote something contaning "zip". Anyway, the syntaxes for my most common use cases are:

* `zip -r <zipped_filename>  <folder_to_zip>`
* `unzip <filename_to_unzip> -d <unzipped_folder_to_create>`

# Quickly look at a file

When I have a CSV and I don't know the header (so I don't know the columns), a quick way is to `head` the file (again, to avoid having to call Python to do this, or to open it in a text editor) - `head` will show the first lines (you can also ask for a certain number of them). The polar opposite is `tail` - it shows the ending lines.

# Using text editors from the terminal

What's your favourite text editor?

You can call them from the terminal of course, but more often then not when I need to quickly inspect the content of a file, or do some little edits (the king example is the bash profile) I use `nano` to open it directly from the terminal. `vim` is another one.


# References
1. J Janssens, [Data Science at the Command Line](https://www.datascienceatthecommandline.com/1e/), a wonderful O'Reilly book - note that as of now there is a second edition coming up
