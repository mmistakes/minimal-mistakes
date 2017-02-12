---
title: "DHT22"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---

### Prerequisites

- see setup_raspberry.md

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

### Create Service

