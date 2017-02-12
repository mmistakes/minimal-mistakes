---
title: "Interacting with DHT22 Sensor"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
categories:
  - Raspberry
tags:
  - Raspberry PI
  - DHT22
  - Electronic
  - Python
  - Linux
---
The objective of this tutorial is to develop a program interacting with DHT22 Sensor.


- [Prerequisites](#prerequisites)
- [Electronic wiring](#electronic-wiring)
- [Install Adafruit](#install-adafruit)
- [Get Series of data](#get-series-of-data)


### Prerequisites

- Components < 70 EUR:

| Component        | Site           | Price  |
| ------------- |:-------------:| -----:|
| Raspberry PI 3   | [Farnell](https://www.farnell.com) | 37.69 EUR |
| Power supply Micro USB 5V 2500mA   | [Amazon](https://www.amazon.com) | 8.99 EUR |
| Micro SD Card (16 Go class 10)  | [Amazon](https://www.amazon.com) | 9.99 EUR |
| DHT22 Sensor     | [ebay](www.ebay.com)      |   5.60 EUR |
| Breadboard | [ebay](www.ebay.com)      |    3.30 EUR |
| 10 x Cables male/female | [ebay](www.ebay.com)      |   1.00 EUR |
| 10 x Cables male/male | [ebay](www.ebay.com)      |    1.00 EUR |
| 10 x Resistors 10k | [ebay](www.ebay.com)      |    1.10 EUR |
| Total: |      |    68.67 EUR |

Note: This is an example as a guide. You can buy all components in others sites
and maybe with better prices.

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Install Python]({{ site.url }}{{ site.baseurl }}/linux/install-python)

### Electronic wiring

{% include figure image_path="/assets/images/schema_dht22.png" alt="DHT22 Overview" caption="DHT22 Overview" %}


### Install Adafruit

Adafruit is a Python library to read the DHT series of humidity and temperature sensors on a Raspberry Pi.

#### Download the latest version
```bash
wget https://github.com/adafruit/Adafruit_Python_DHT/archive/master.zip
```
#### Unzip the package
```bash
unzip master.zip
```
#### Installation
```bash
cd Adafruit_Python_DHT-master/
sudo python setup.py install
```
See more [here](https://github.com/adafruit/Adafruit_Python_DHT)

or with a virtual env

```bash
virtualenv -p /usr/bin/python2.7 ~/workspace/venv2.7/
source ~/workspace/venv2.7/bin/activate
pip install adafruit_python_dht
```

See how to create a virtual environment [here]({{ site.url }}{{ site.baseurl }}/linux/install-python#create-virtualenv)

### Get Series of data

Get Series of Temperature and Humdity from DHT22

#### Create new script
```bash
touch getDHT22Series.py
```
#### Edit and add this code below

```bash
vim getDHT22Series.py
```

```python
#!/usr/bin/python
import Adafruit_DHT

def getData_func():
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4)
    if humidity is not None and temperature is not None:
        print('Temperature={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
        return  { '@type':'DHT22', 'temperature': temperature, 'humidity': humidity }
    else:
        print('Failed to get reading. Try again!')
        return

if __name__ == "__main__": getData_func()
```

See source [here](https://github.com/jluccisano/raspberry-scripts/blob/master/scripts/dht22.py)

#### Execute the code

```bash
python getDHT22Series.py
```

Output: 
```text
Temperature=23.8*C  Humidity=36.3%
```






