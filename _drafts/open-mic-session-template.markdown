---
title:  "Title of the open mic session"
driveId: 1kTtGdCpnt3ROwvLGr4c-8-crPf-uPGcs/preview -- this is example, generate it from G drive
categories: [Open Mic Session, Open Mic]
---

First paragraph is always excerpt. It shall contain something like: On Friday 13th May at 10:30 an open Mic session took place. The topic was \"Jobs to be Done\". Video and presentation included.

Then you may include video by using following code:

{% include googleDrivePlayer.html id=page.driveId %}

driveId in the front matter must be changed to the actual one. You can get it by opening a video in google drive, click three dots in upper right corner, then open in new window, then again three dots in upper right corner and click embed item. driveId is the last two parts of src attribute, e.g. \'1kTtGdCpnt3ROwvLGr4c-8-crPf-uPGcs/preview\'. Make sure, that everyone with link has access to trhe video, otherwise it won't work. Don't worry if it does not work for the first time, it takes quite a lot of time to process by google drive, so just wait.

In the rest of the text, describe what was the presentation about, include some figures and you may also add some further reading. Links are done as follows.

Further reading:
* [Link text](https://linkadre.ss)
