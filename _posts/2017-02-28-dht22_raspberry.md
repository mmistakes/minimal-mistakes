---
title: "DHT22"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---

### Prerequisites

- Set up a Raspberry PI 3 [here](2017-01-14-setup_raspberry.md)

### Install python 

Python is already installed with the Raspbian image

```bash
python --version
```
otherwise you can install it 
```bash
apt-get install python
```

### Install PIP

```bash
wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py
```

### Create VirtualEnv (optional)

```bash
sudo mkdir -p ~/workspace/venv2.7
sudo virtualenv -p /usr/bin/python2.7 ~/workspace/venv2.7/
source ~/workspace/venv2.7/bin/activate
//install all packets needed
sudo pip install requests
```

### Install RPi.GPIO

```bash
pip install RPi.GPIO
```

#### Test GPIO 

- Interact with GPIO [here](2017-02-28-test_gpio.md)


### Install Adafruit

```bash
wget https://github.com/adafruit/Adafruit_Python_DHT/archive/master.zip
unzip master.zip
cd Adafruit_Python_DHT-master/
sudo apt-get update
sudo apt-get install build-essential python-dev
sudo python setup.py install

```

### Get Temperature and Humdity from DHT22

Show source: https://github.com/jluccisano/raspberry-scripts/blob/master/scripts/dht22.py

```python
import Adafruit_DHT

def getData_func():
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4)
    if humidity is not None and temperature is not None:
        print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
        return  { 'temperature': temperature, 'humidity': humidity }
    else:
        print('Failed to get reading. Try again!')
        return

if __name__ == "__main__": getData_func()
```

Output: 
```

```

### Publish data to RabbitMQ

Show source: https://github.com/jluccisano/raspberry-scripts/blob/master/scripts/publisher.py


### Create Service

See this thread:
http://www.diegoacuna.me/how-to-run-a-script-as-a-service-in-raspberry-pi-raspbian-jessie/


sudo chmod u+x /opt/dht22/send.py 
sudo ln -s /opt/dht22/send.py /usr/bin/dht22
sudo systemctl daemon-reload



sudo systemctl daemon-reload
sudo chmod +x /opt/dht22/dht22.py
sudo systemctl enable dht22.service
sudo systemctl start dht22.service
sudo systemctl status dht22.service
sudo systemctl stop dht22.service
tail -f /var/log/dht22/send.log



sudo chmod u+x /opt/dht22/send.py 
sudo ln -s /opt/dht22/send.py /usr/bin/dht22
sudo systemctl daemon-reload

http://www.diegoacuna.me/how-to-run-a-script-as-a-service-in-raspberry-pi-raspbian-jessie/
 
sudo systemctl daemon-reload
sudo chmod +x /opt/dht22/dht22.py
sudo systemctl enable dht22.service
sudo systemctl start dht22.service
sudo systemctl status dht22.service
sudo systemctl stop dht22.service
tail -f /var/log/dht22/send.log
http://rstoyanchev.github.io/s2gx2013-websocket-browser-apps-with-spring/#65

