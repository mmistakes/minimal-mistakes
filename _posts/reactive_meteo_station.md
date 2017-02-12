POST

Write Raspbian Image into SD Card
How to retrieve, your Raspberry PI 
Set a static IP Address
Enable WIFI wlan0
Install python packages
Write first python script
Get temperature and humidity from DHT22

Install Docker
Install Portainer.io
Install RabbitMQ
Push temperature and humidity to RabbitMQ

Create java AMQP client
Consume temperature and humidity from Queue
Deploy on Docker

Push data to browser client vi Websockets (STOMP)
Create reactive client to consume data from Browser
  - Install ReactJS
  - Create RxJs consume socket
  - Create Temperature Widget with D3Js
  - Deploy on docker
  
  - Consume/Aggregate data into database
  - Create a complete reactive dashboard

Final Result
  










sudo mkdir -p ~/workspace/venv2.7
sudo virtualenv -p /usr/bin/python2.7 ~/workspace/venv2.7/
source ~/workspace/venv2.7/bin/activate
//install all packets
sudo pip install requests





https://www.raspberrypi.org/documentation/installation/installing-images/mac.md

diskutil list http://michaelcrump.net/the-magical-command-to-get-sdcard-formatted-for-fat32/ 

sudo diskutil eraseDisk FAT32 RASPBIAN MBRFormat /dev/disk1 
diskutil unmountDisk /dev/disk1 sudo dd bs=1m if=/Users/Lucci/Downloads/2016-11-25-raspbian-jessie.img of=/dev/rdkisk1 
sudo diskutil eject /dev/rdisk1

nmap -sn 192.168.0.0/24 boot touch ssh ssh -Y pi@192.168.0.20 sudo gem update -n /usr/local/bin --system sudo gem install -n /usr/local/bin jekyll bundler

wget https://bootstrap.pypa.io/get-pip.py python get-pip.py pip install RPi.GPIO

https://github.com/adafruit/Adafruit_Python_DHT wget https://github.com/adafruit/Adafruit_Python_DHT/archive/master.zip unzip master.zip cd Adafruit_Python_DHT-master/ sudo apt-get update sudo apt-get install build-essential python-dev sudo python setup.py install

sudo docker pull rabbitmq sudo docker logs some-rabbit sudo docker run -d --hostname my-rabbit --name some-rabbit2 -p 8080:15672 rabbitmq:3-management http://192.95.25.173:8080/

bundle exec jekyll serve

pip install pyyaml