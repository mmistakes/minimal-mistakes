---
categories:
  - utils
title: Installing Synergy to share Windows and Linux
---

I haven't used Synergy in...years, but it was mostly reliable when I did use it last.

# Configuration:
- HP 840 G1, 16GB i5, Windows 7 Enterprise as server 
- HP Compaq 8200 Elite SFF Linux, 16GB i7, Mint 18.3 Sylvia MATE 64-bit

# Install on Windows
- Start with a Windows server as the "Server" where the kbd/mouse will be used
- To test it, download a version (1.8.8) from [forked Synergy repo]
- Install msi file
- App will launch, set it up as a server, don't bother to install Bonjour
- Create a map with the hostname of the new machine on the screen setup page
- click "Start" button
- Note ip address (e.g. `ipconfig`)

# Install on Linux
- run `sudo apt-get install synergy`
- Launch synergy: `synergy&`
- Select "Client" option
- Enter Server's IP address
- Click "Start"

Once these steps are done, you should see handshaking between the servers in the console. 
When you get a connection message, the windows go away on both hosts.

Test that the mouse and keyboard work by hitting the edge of the screen, if so you're done!

Notes:
* copy/paste between systems doesn't seem to work, I haven't tried to troubleshoot it
* Error message in Linux window `The program 'Synergy' uses the Apple Bonjour compatibility layer of Avahi.`, I haven't tried to troubleshoot it
* As noted above, bonjour not installed on windows. This will probably cause a problem with auto-discovery and auto-configuration.
Entering IP address manually worked fine. Systems with a changing DHCP assignment may not work as well.

[forked Synergy repo]: https://github.com/brahma-dev/synergy-stable-builds/releases
