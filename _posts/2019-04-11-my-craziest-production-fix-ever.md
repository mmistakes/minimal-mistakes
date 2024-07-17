---
title: My Craziest Production Fix Ever!
tags:
  - c
  - trading-floor
  - war-story
  - hacks
---

I used to work on a trading floor for the short term bond/repo desk some time ago at a small buy-side firm.
My job was to create and maintain command-line and GUI applications written in C (_definitely_ some time ago).
There was a bug in an application that was caused by a problem in a string.
Fixing the string in the source code would have required a code edit and a recompile. 
This would have taken at minimum a half-hour, where time really is money and the fix was needed *right now*.

Because the users needed the fix as soon as possible, I reviewed 
with the head of the desk and responsible development manager 
the half-hour option, as well as a more expedient option. 

Since we could contain the risk by making a copy of the executable, and because it was used only by this trading desk, 
the expedient solution was chosen.

Emacs is well known to safely binary files because it doesn't add characters (e.g. trailing newline, word-wrapping, etc.),
I brought up the executable in Emacs; the fix only required substituting a smaller string for the existing one.
I searched for the string in the file (`C-x C-f`) and made the change. `nul` characters were added at the end of the new string, 
making sure that I had the exact same number of characters including the original trailing `nul`. 

After making sure that the file was the same size, I crossed my fingers while saving the file (`C-x C-s`) over the original one and had one
of the traders restart the application.  (Other traders already running the app weren't affected because the original version was still at
the same inode.)

The app started fine and the bug was fixed, so the other traders restarted theirs and had no problems either. 
Because I fixed this problem in about 5 minutes I was hero for a day and became known as a go-to guy for problems.

(original as bullet points 3/10/17)
