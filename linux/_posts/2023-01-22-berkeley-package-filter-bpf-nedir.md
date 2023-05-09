---
title: "BPF Nedir?"
classes: wide
---

## BPF Nedir?

BPF'nin açılımı Berkeley Packet Filter'dır. 1992 yılında ilk olarak network paketlerini yakalama aracı olarak özellikle firewall uygulamalarında kullanılmak için ortaya çıkmış olmasına rağmen 2014 Yılında Linux Çekirdeğine eklenmesiyle BPF genel amaçlı bir çalıştırma motoruna evrilmiştir ve bir çok şey için kullanıma müsait hale gelmiştir, bunların arasında gelişmiş performans analizi araçlarının yaratılması da sayılabilir.

Bpf çok fazla şey yapabildiği için açıklamak güç olsa da çekirdek ve uygulamaların çalışırken mini programlar çalıştırmak gibi düşünülebilir. Bu noktada Javascript örneğini verebiliriz Javascriptin web tarayıcılarda mini programlar çalıştırarak web tabanlı uygulamalara izin vermesi gibi BPF de çekirdeğin sistem üzerinde mini programlar çalıştırmasına izin verir. Bu da çekirdeği çekirdek geliştiricisi olmayan kişiler için tamamen programlanabilir yapar bu sayede geliştiriciler gerçek dünyadaki problemleri çözmek için Linux sistemlerini kişiselleştirebilirler ve daha iyi kontrol edebilirler.

BPF komut seti, depolama objeleri ve yardımcı fonksiyonlardan oluşan esnek ve etkili bir teknolojidir. BPF'in sanal komut seti özelliğinden dolayı ona bir sanal makine desek yanlış olmaz. Bu komutlar Linu çekirdek BPF runtime'ıyla çalışır, bunun içinde bir yorumlayıcı (Interpreter) ve JIT compiler bulunur ve BPF komutlarını çalıştırılabilir native komutlara çevirir.

Güvenlik için BPF komutları ilk olarak bir doğrulayıcıdan geçmelidir, bu sayede BPF programının Linux çekirdeğini çökertmeyeceğinden veya bozmayacağından emin olunur.

BPF'nin üç ana kullanım amacı ağ yapıları, gözlemleme(takip) ve güvenliktir. 


BPF emirlerini direk olarak kodlamak çok sıkıcı ve zor bir işlem o yüzden daha üst seviye programlama dilleriyle programlamamıza olanak sağlayan frontend araçları geliştirilmiştir. Bunlardan En bilinenleri BCC ve bpftrace'dir.

<!--more-->

### BCC (BPF Compiler Collection)

BPF için ilk geliştirilen üst seviye tracing çerçevesidir, Çekirdek BPF kodu için C programlama ortamı, kullanıcı seviyesi arayüz geliştirmesi için ise Python,Lua ve C++ dillerine destek verir. BCC deposu performans analizi ve problem çözmek için kullanılabilecek 70 adet BPF aracı içerir. Sisteminize BCC yükleyerek bu araçları kod yazmadan kullanabilirsiniz. 

### Bpftrace

Bpftrace ise özel bir amaca hizmet eden yeni bir front end aracıdır, bcc'de olduğu gibi araçlarla birlikte gelir. BCC ve bpftrace birbirinin yerine kullanılabilir ancak bpftrace daha çok tek satırda işi halleden kısa scriptler için kullanılırken BCC daha karmaşık scriptler ve daemonlar hazırlamak için daha uygundur ve diğer kütüphaneleri de kullanabilir. Örnek olarak bir çok Python BCC  aracı Python'un argparse kütüphanesini komut satırından kontrol edilebilmesi amacıyla kullanmaktadır.

iki proje de Linux Vakfının IO Visor adlı projesinin github sayfasında barındırılmaktadır şu linklerden ulaşılabilir:

https://github.com/iovisor/bcc

https://github.com/iovisor/bpftrace

![](http://www.brendangregg.com/Perf/bcc_tracing_tools.png "Tools")



### Debian 10'a BCC Ve Bpftrace Yüklenmesi

BCC ve Bpftrace debian depolarında bulunmaktadır apt paket yöneticisiyle yüklenebilirler.

Bcc için :

```
sudo apt-get install bpfcc-tools linux-headers-$(uname -r)
```

Bpftrace için:

```
apt install bpftrace
```


## Bazı Gözlemleme Araçları


### BCC Araçları

Tüm araçları sonuna '-bpfcc' ekleyip root kullanıcısı olarak çalıştırabilirsiniz.
örnek : biosnoop-bpfcc

***biosnoop***

Disk girdi-çıktılarını takip ederek satır satır sürelerini ve gecikmelerini verir disklerle ilgili takip yapmak gerektiğinde yararlı olabilecek bir araç.


```
biosnoop-bpfcc

TIME(s)     COMM           PID    DISK    T SECTOR     BYTES   LAT(ms)
0.000004    supervise      1950   xvda1   W 13092560   4096       0.74
0.000178    supervise      1950   xvda1   W 13092432   4096       0.61
0.001469    supervise      1956   xvda1   W 13092440   4096       1.24
0.001588    supervise      1956   xvda1   W 13115128   4096       1.09
1.022346    supervise      1950   xvda1   W 13115272   4096       0.98
1.022568    supervise      1950   xvda1   W 13188496   4096       0.93
1.023534    supervise      1956   xvda1   W 13188520   4096       0.79
1.023585    supervise      1956   xvda1   W 13189512   4096       0.60
2.003920    xfsaild/md0    456    xvdc    W 62901512   8192       0.23
2.003931    xfsaild/md0    456    xvdb    W 62901513   512        0.25
2.004034    xfsaild/md0    456    xvdb    W 62901520   8192       0.35
2.004042    xfsaild/md0    456    xvdb    W 63542016   4096       0.36
2.004204    kworker/0:3    26040  xvdb    W 41950344   65536      0.34

```


***ext4slower***

Yavaş ext4 dosya sistemi işlemlerini takip ederek gecikmelerini, işlemi gerçekleştiren process'in ID'sini ve zamanını gösterir.

```
extslower-bpfcc


06:35:01 cron           16464  R 1249    0          16.05 common-auth
06:35:01 cron           16463  R 1249    0          16.04 common-auth
06:35:01 cron           16465  R 1249    0          16.03 common-auth
06:35:01 cron           16465  R 4096    0          10.62 login.defs
```

***filelife***

Yaratıldıktan sonra çok kısa bir süre içinde silinen dosyaları takip edip ekrana yazar.


```
filelife-bpfcc

TIME     PID    COMM             AGE(s)  FILE
05:57:59 8556   gcc              0.04    ccCB5EDe.s
05:57:59 8560   rm               0.02    .entry_64.o.d
05:57:59 8563   gcc              0.02    cc5UFHXf.s
```

***dbslower***

MySQL veya Postgresql serverımıza yapılan veritabanı sorgularının arasından 1 msden daha uzun sürenlerini ekrana yazdırır. 


```
dbslower-bpfcc

TIME(s)        PID          MS QUERY
1.421264       25776  2002.183 call getproduct(97)
3.572617       25776  2001.381 call getproduct(97)
5.661411       25776  2001.867 call getproduct(97)
7.748296       25776  2001.329 call getproduct(97)
```


***tcptop***

O an yapılan tcp bağlantılarını kaynak ip ve hedef ip ve boyutuyla birlikte gösterir.

Kullanımı :
```tcptop-bpfcc -R```

```
tcptop-bpfcc -R

PID    COMM         LADDR                 RADDR                  RX_KB  TX_KB
17287  17287        100.66.3.172:22       100.127.69.165:57585       3      1
17286  sshd         100.66.3.172:22       100.127.69.165:57585       0      1
14374  sshd         100.66.3.172:22       100.127.69.165:25219       0      0

```



daha fazlası :

https://github.com/iovisor/bcc

---

### Bazı Örnek Bpftrace Araçları

**Bitesize.bt**

Sistemdeki disklerde gerçekleşen girdi çıktı boyutlarını processlere göre histogram biçiminde gösterir.

***bashreadline.bt**

Sistem genelinde kullanıcı farketmeksizin bash'e girilen komutları canlı olarak saati/dakikasıyla ve PID ile birlikte görmemizi sağlar.

**pidpersec.bt**

Sistemde arkaplanda açılan yeni processlerin sayısını bize gösterir.

**syscount.bt**

Sisteme yapılan syscalls'ları sayar ve bu çağrıları en çok yapan 10 işlemi process id'leriyle birlikte ekrana basar.

Daha fazlası için : https://github.com/iovisor/bpftrace#tools



----

**Tek Satırlık Bpftrace komutları**


```
# Process'in açtığı dosyaları görmek
bpftrace -e 'tracepoint:syscalls:sys_enter_open { printf("%s %s\n", comm, str(args->filename)); }'

# Programa göre Syscall sayısını görmek
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @[comm] = count(); }'

# Process'e göre byteları okumak
bpftrace -e 'tracepoint:syscalls:sys_exit_read /args->ret/ { @[comm] = sum(args->ret); }'

# Syscall oranlarını görmek
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @ = count(); } interval:s:1 { print(@); clear(@); }'

# Process'e göre disk boyutunu izlemek
bpftrace -e 'tracepoint:block:block_rq_issue { printf("%d %s %d\n", pid, comm, args->bytes); }'

# Process'e göre page faultları görmek
bpftrace -e 'software:faults:1 { @[comm] = count(); }'

# Açık dosyalar root cgroup-v2 processlerine göre görmek
bpftrace -e 'tracepoint:syscalls:sys_enter_openat /cgroup == cgroupid("/sys/fs/cgroup/unified/mycg")/ { printf("%s\n", str(args->filename)); }'

```

![](https://raw.githubusercontent.com/iovisor/bpftrace/master/images/bpftrace_probes_2018.png)


Daha fazla tek satırlık bpftrace komutu için : https://github.com/iovisor/bpftrace/blob/master/docs/tutorial_one_liners.md


## Kaynaklar

- Gregg,Brendan "BPF Performance Tools" - Linux System and Application Observability (2005)
- https://www.kernel.org/doc/html/latest/bpf/index.html
- https://github.com/iovisor/bcc
- https://github.com/iovisor/bpftrace
