



I have this problem too,I fix it through the error message:

"W: Target Packages (main/binary-amd64/Packages) is configured multiple
times in /etc/apt/sources.list:2 and /etc/apt/sources.list:5".
you can sudo vim /etc/apt/sources.list.

then locate the second line, use # comment out the line.

save the file, and sudo apt-get update,the problem will be solved.
