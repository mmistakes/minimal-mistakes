---
layout: post
title: "Membuat Virtual Machine di FreeBSD dengan bhyve dan vm-bhyve"
date: 2016-03-22 07:00:00
categories: sysadmin
---

Sejak FreeBSD 10.0-RELEASE, hypervisor bhyve (lisensi BSD) sudah menjadi bagian dari _base system_. Hypervisor adalah aplikasi yang bisa membuat dan menjalankan _virtual machine_ atau yang biasa disebut _guest_ di dalam sebuah sistem operasi. _Guest_ yang didukung oleh bhyve cukup banyak, termasuk FreeBSD, OpenBSD, dan banyak distribusi Linux. Saat ini bhyve hanya mendukung konsol serial dan tidak bisa menampilkan konsol grafik. Bhyve membutuhkan prosesor baru yang mendukung Intel Extended Page Tables (EPT) atau AMD Rapid Virtualization Indexing (RVI), yang dikenal juga sebagai Nested Page Tables (NPT). Untuk Linux atau FreeBSD _guest_ dengan vCPU (virtualCPU) membutuhkan dukungan VMX _unrestricted mode_ (UG). Cara termudah untuk mengecek dukungan prosesor untuk bhyve adalah dengan menjalankan #dmesg# atau melihat isi _/var/run/dmesg.boot_ untuk fitur #POPCNT# di baris #Features2# dan #EPT# dan #UG# di baris #VT-x#. Panduan yang cukup lengkap untuk menggunakan bhyve dapat diakses di [halaman ini](https://www.freebsd.org/doc/handbook/virtualization-host-bhyve.html)

### VM-BHYVE

Vm-bhyve adalah aplikasi yang dibuat oleh Matt Churchyard dan diletakkan di
repositori [Githubnya](https://github.com/churchers/vm-bhyve). Aplikasi ini
dapat digunakan untuk manajemen _guest_ yang lebih mudah menggunakan hypervisor
bhyve. Beberapa fitur yang ada di aplikasi ini adalah

* Dukungan untuk _guest_ FreeBSD/NetBSD/OpenBSD/Linux

* Perintah sederhana untuk membuat, menjalankan dan menghentikan _guest_
  (__create__, __start__, __stop__),

* Konfigurasi file sederhana,

* Switch virtual yang mendukung NAT dan VLAN

* Dukungan untuk _filesystem_ ZFS

* Konfigurasi otomatis _serial device_ untuk mengakses konsol _guest_

* Integrasi dengan __rc.d__ _startup/shutdown_

#### Instalasi VM-BHYVE

_Clone_ repositori dari halaman GitHub

    # git clone https://github.com/churchers/vm-bhyve.git

Untuk menjalankan _guest_ selain FreeBSD, instal __grub2-bhyve__

    # pkg install grub2-bhyve

Untuk memberikan layanan DHCP ketika menggunakan switch dengan mode NAT, instal
__dnsmasq__

    # pkg install dnsmasq

#### Konfigurasi VM-BHYVE

Vm-bhyve membutuhkan sebuah direktori untuk menyimpan semua _virtual machines_
dan konfigurasi vm-bhyve. Direktori tersebut dapat berupa ZFS _mountpoint_ atau
direktori biasa.

Jika menggunakan ZFS, buat sebuah _mountpoint_ untuk vm-bhyve

    # zfs create pool/vm

Setelah itu ubah file __/etc/rc.conf__

    vm_enable="YES"
    vm_dir="zfs:pool/vm"

Jika menggunakan direktori biasa, buat direktori tersebut

    # mkdir /somepath/vm

Setelah itu ubah file __/etc/rc.conf__

    vm_enable="YES"
    vm_dir="/somepath/vm"

Inisialisasi konfigurasi vm-bhyve dan _kernel modules_ yang dibutuhkan

    # vm init

Perintah ini cukup dijalankan sekali saja dan untuk seterusnya akan dijalankan
oleh __rc.d__ script.

#### Template Virtual Machine

Vm-bhyve menggunakan _template_ ketika membuat sebuah _guest_ atau _virtual
machine_. Semua template disimpan di direktori *vm_dir/.templates/*. Contoh
template dapat diperoleh dari direktori */usr/local/share/examples/vm-bhyve/*.

    # cp /usr/local/share/examples/vm-bhyve/* /somepath/vm/.templates/

Kita dapat mendefinisikan sendiri template yang kita inginkan. Untuk mengetahui
format template yang dibutuhkan dapat membaca sample-templates/config.sample
untuk mengetahui opsi-opsi yang ada di dalam template deskripsi dari
fungsi-fungsinya.

#### Switch Virtual

Ketika sebuah _guest_ dijalankan maka secara otomatis _guest_ tersebut akan
terkoneksi dengan switch virtual yang dicantumkan di dalam file konfigurasi.
Secara _default_ semua template sampel akan terkoneksi dengan switch bernama
'public'.

Switch bisa dibuat dengan perintah berikut ini

    # vm switch create <switchname>

Mode bridge bisa langsung dijalankan dengan menambahkan _physical interface_ ke
switch virtual

    # vm switch add <switchname> <physicalinterface>

Jika hanya menginginkan mode NAT, jangan menambahkan _physical interface_ ke
switch virtual, cukup aktifkan mode NAT

    # vm switch nat <switchname> on

Secara otomatis mode NAT akan membuat sebuah jaringan privat pada switch dan
mengarahkan semua trafik melalui _default gateway_. Untuk mengaktifkan NAT
diperlukan __PF__ yang diaktifkan di file __/etc/rc.conf__

Untuk mengaktifkan vlan, cukup dengan memberikan nomor vlan yang diinginkan

    # vm switch vlan <switchname> <vlannumber>

Untuk menon-aktifkan vlan, cukup dengan memberikan angka 0 sebagai nomor vlan

    # vm switch vlan <switchname> 0

Konfigurasi switch yang sudah ada dapat dilihat menggunakan perintah

    # vm switch list

#### Membuat Guest/Virtual Machine

Untuk membuat _guest/virtual machine_ cukup jalankan perintah

    # vm create <guestname>
    # vm create -t <templatename> -s <disksize> <guestname>

Contoh pertama menggunakan template __default.conf__ dan akan membuat _disk
image_ sebesar 20GB. Sedangkan contoh kedua menggunakan template
_<templatename>.conf_ dan akan membuat _disk image_ sebesar <disksize> dalam
GB.

Instalasi _guest/virtual machine_ membutuhkan file ISO instalasi sistem operasi
yang akan diinstal, _download_ file ISO contoh perintah sebagai berikut untuk
sistem operasi FreeBSD.

    # vm iso ftp://ftp.freebsd.org/pub/FreeBSD/releases/ISO-IMAGES/10.1/FreeBSD-10.1-RELEASE-amd64-disc1.iso

Untuk memulai instalasi, jalankan perintah berikut

    # vm install <guestname> FreeBSD-10.1-RELEASE-amd64-disc1.iso
    # vm console <guestname>

Setelah instalasi selesai, __reboot__ _guest_ dari konsol dan _guest_ akan
melakukan _booting_ ke sistem operasi yang telah diinstal (dengan asumsi
instalasi berhasil). Konsol menggunakan perintah __cu__ dan untuk kembali ke
_host_ gunakan kombinasi __~+Ctrl-D__.

Perintah-perintah berikut menjalankan dan menghentikan _guest/virtual machine_

    # vm start <guestname>
    # vm stop <guestname>

Konfigurasi dasar dan keadaan setiap _guest/virtual machine_ dapat dilihat
dengan perintah berikut

    # vm list

Untuk menghentikan seluruh _guest/virtual machine_ secara bersamaan gunakan
perintah

    # vm stopall

Agar _guest/virtual machine_ berjalan secara otomatis ketika _host_ melakukan
_booting_, tambahkan baris berikut ke dalam file __/etc/rc.conf__

    vm_list="vm1 vm2"
    vm_delay="5"

*vm_delay* adalah variabel yang mengatur selang waktu dijalankannya setiap
_guest/virtual machine_. Terdapat juga perintah untuk mengubah konfigurasi
_guest/virtual machine_ menggunakan _default text editor_ dengan perintah
berikut

    # vm configure <guestname>

### Instalasi CentOS Guest dengan Instalasi melalui VNC

CentOS adalah sistem operasi GNU/Linux sehingga membutuhkan instalasi
__grub2-bhyve__ agar dapat dijalankan sebagai _guest_ di hypervisor bhyve.
Ketika melakukan instalasi _guest/virtual machine_ dengan sistem operasi
CentOS, proses instalasi yang didukung ketika menggunakan konsol hanya proses
instalasi berbasis teks yang tidak memberikan pilihan konfigurasi yang lengkap.
Sebagai alternatif, dapat dilakukan instalasi berbasis grafis menggunakan VNC 
yang diakses melalui jaringan. Metode ini membutuhkan instalasi dilakukan 
dengan _guest/virtual machine_ terkoneksi switch dengan mode bridge dan kita
dapat mengakses jaringan _host_

Instalasi seperti biasa

    # vm create -t centos -s <disksize> <guestname>
    # vm iso http://buaya.klas.or.id/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1511.iso
    # vm install <guestname> CentOS-7-x86_64-Minimal-1511.iso
    #  vm console <guestname>

Proses instalasi akan masuk ke sesi instalasi CentOS berbasis teks. Pada tahap
ini lakukan konfigurasi jaringan atau _network_ (Opsi nomor 7) sehingga _guest/virtual
machine_ terkoneksi dengan jaringan host pada saat proses instalasi. 

Sebelum terkoneksi

	Host name: localhost.localdomain

	 1)  Set host name
	 2)  Configure device eth0
	  Please make your choice from above ['q' to quit | 'c' to continue |
	  'r' to refresh]: c
	================================================================================
	================================================================================
	Installation

	 1) [x] Language settings                 2) [!] Timezone settings
	        (English (United States))                (Timezone is not set.)
	 3) [x] Installation source               4) [!] Software selection
	        (Local media)                            (Minimal Install)
	 5) [!] Installation Destination          6) [x] Kdump
	        (No disks selected)                      (Kdump is enabled)
	 7) [ ] Network configuration             8) [!] Root password
	        (Not connected)                          (Password is not set.)
	 9) [!] User creation
	        (No user will be created)
	  Please make your choice from above ['q' to quit | 'b' to begin installation |
	  'r' to refresh]: 7
	[anaconda] 1:main* 2:shell  3:log  4:storage-lo> Switch tab: Alt+Tab | Help: F1 

Setelah terkoneksi 

	Host name: localhost.localdomain

	 1)  Set host name
	 2)  Configure device eth0
	  Please make your choice from above ['q' to quit | 'c' to continue |
	  'r' to refresh]: c
	================================================================================
	================================================================================
	Installation

	 1) [x] Language settings                 2) [!] Timezone settings
    	    (English (United States))                (Timezone is not set.)
	 3) [x] Installation source               4) [x] Software selection
    	    (Local media)                            (Minimal Install)
	 5) [!] Installation Destination          6) [x] Kdump
    	    (No disks selected)                      (Kdump is enabled)
	 7) [x] Network configuration             8) [!] Root password
    	    (Wired (eth0) connected)                 (Password is not set.)
	 9) [!] User creation
	        (No user will be created)
	  Please make your choice from above ['q' to quit | 'b' to begin installation |
	  'r' to refresh]: 
	[anaconda] 1:main* 2:shell  3:log  4:storage-lo> Switch tab: Alt+Tab | Help: F1 

Kemudian pindah ke tab nomor 2:shell dengan kombinasi __Ctrl-B+2__ dan jalankan perintah

	[anaconda root@localhost ~]# anaconda --vnc
	Starting installer, one moment...
	anaconda 21.48.22.56-1 for CentOS 7 started.
	 * installation log files are stored in /tmp during the installation
	 * shell is available on TTY2
	 * when reporting a bug add logs from /tmp as separate text/plain attachments
	15:35:19 Starting VNC...
	15:35:21 The VNC server is now running.
	15:35:21 

	WARNING!!! VNC server running with NO PASSWORD!
	You can use the vncpassword=<password> boot option
	if you would like to secure the server.


	15:35:21 Please manually connect your vnc client to <your-guest-ip>:1 to begin the install.

	15:35:21 Attempting to start vncconfig





	[anaconda] 1:main- 2:shell* 3:log  4:storage-lo> Switch tab: Alt+Tab | Help: F1 

Akses instalasi grafis menggunakan VNC client dengan alamat <your-guest-ip> port 1 
tanpa menggunakan password. Jika ingin menggunakan password maka jalankan perintah berikut ini

	[anaconda root@localhost ~]# anaconda --vnc --vncpassword password

Untuk menjalankan VNC server dengan password akses 'password'. Berikut ini
adalah instalasi _guest/virtual machine_ dengan sistem operasi CentOS melalui
VNC.
![CentOS-VNC-BHYVE](/images/centos-vnc-bhyve.png)
