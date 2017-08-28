---
title: "Electronic part"
related: true
header:
  overlay_image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/anthony-rossbach-59486.jpg
categories:
  - Automation
tags:
  - Electronic
  - Hidraulic
  
---

- [Electronic part](#electronic-part)


### Prerequisites

{% include figure image_path="/assets/images/schema_sprinkler.png" alt="Sprinkler Overview" caption="Sprinkler Overview" %}

- Components < ? EUR:

Electronic components

| Component        | Site           | Price  |
| ------------- |:-------------:| -----:|
| Raspberry PI 3   | [Farnell](https://www.farnell.com) | 37.69 EUR |
| Power supply Micro USB 5V 2500mA   | [Amazon](https://www.amazon.com) | 8.99 EUR |
| Micro SD Card (16 Go class 10)  | [Amazon](https://www.amazon.com) | 9.99 EUR |
| Relay card module AC/DC 5V  4 channels | [Ebay](https://www.ebay.com) | 8.00 EUR |
| multi conducteur 7 brins cable 15m | [Technic-achat](https://www.technic-achat.fr) | 31.32 EUR |
| 10 x Cables male/female | [ebay](www.ebay.com)      |   1.00 EUR |
| 10 x Cables male/male | [ebay](www.ebay.com)      |    1.00 EUR |
| Total: |      |    97.99 EUR |

- [Set up a Raspberry PI 3]({{ site.url }}{{ site.baseurl }}/raspberry/setup-raspberry)
- [Install Python]({{ site.url }}{{ site.baseurl }}/linux/install-python)



12. Connect relay with Raspberry PI (Control electronics)

- Each relay are supplied in 3.3V via Raspberry PI.
 
Tools:
- 1 Raspberry

13. Control valves with Raspberry PI

{% include figure image_path="/assets/images/sprinkler/electronic_part.jpg" alt="Electronic part" caption="Electronic part" %}

- Prerequisites

Setup raspberry 
install python
git


```python
#!/usr/bin/python
import RPi.GPIO as GPIO
import argparse
import sys

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

# GPIO/BOARD | Relay IN | Rotors | Zone
# 22/15	     | R2 IN2   | 1      | B
# 18/12	     | R1 IN2   | 2      | A
# 24/18	     | R1 IN3   | 3      | D
# 17/11	     | R1 IN4   | 4      | C
# 27/13	     | R2 IN1   | 5      | E

class RelayControl(object):

	def set(self):
		parser = argparse.ArgumentParser(
		    description='Set relay state high=1 or low=0')

		parser.add_argument('--relay', help='Set relay 1/2/3/4/5 or *', required=False)
		parser.add_argument('--state',help='Set state high=1 or low=0', required=False)

		args = parser.parse_args(sys.argv[2:])

		if args.relay:
			print 'Set relay=%(0)s to state=%(1)s' % { '0' : args.relay, '1' : args.state }
			GPIO.setup(self.relayIO[args.relay], GPIO.OUT)
			GPIO.output(self.relayIO[args.relay], int(args.state))       
			GPIO.cleanup()
		else:
			print 'Set all relay to state=%s' % args.state
			self.setAll(args.state)
			
	def toggle(self):
		parser = argparse.ArgumentParser(
		    description='Toggle relay value')

		parser.add_argument('--relay', help='Set relay 1/2/3/4/5', required=False)

		args = parser.parse_args(sys.argv[2:])
		print 'Toggle relay=%s' % args.relay

		GPIO.setup(self.relayIO[args.relay], GPIO.OUT)
		GPIO.output(self.relayIO[args.relay], not GPIO.input(self.relayIO[args.relay]))
		GPIO.cleanup()

	def get(self):
		parser = argparse.ArgumentParser(
		    description='Set relay state high=1 or low=0')

		parser.add_argument('--relay', help='Set relay 1/2/3/4/5 or *', required=False)

		args = parser.parse_args(sys.argv[2:])

		if args.relay:
			print 'Get relay=%s' % args.relay
			GPIO.setup(self.relayIO[args.relay], GPIO.OUT)
			print 'state=' + str(GPIO.input(int(self.relayIO[args.relay])))
			GPIO.cleanup()
		else:
			print 'Get all relay state'
			print 'states=' + str(self.getAll())

	def getAll(self):
		chan_list = []
		state_list = []
		for relay in self.relayIO:
			chan_list.append(self.relayIO[relay])
		GPIO.setup(chan_list, GPIO.OUT)
		for relay in self.relayIO:
			state_list.append(GPIO.input(int(self.relayIO[relay])))
		GPIO.cleanup()
		return state_list

	def setAll(self, state):
		chan_list = []
		for relay in self.relayIO:
			chan_list.append(self.relayIO[relay])
		GPIO.setup(chan_list, GPIO.OUT)
		GPIO.output(chan_list, int(state))
		GPIO.cleanup()

	def __init__(self):
		
		self.relayIO = { "1": 15, "2": 12, "3": 18, "4": 11, "5": 13}
		
		parser = argparse.ArgumentParser(
		    description='Relay control',
		    usage='''relay <command> [<args>]
		The most commonly used relay commands are:
		   set     Set relay value high or low
		   get     Get relay value high or low
		   toggle  Toggle relay value
		''')
		parser.add_argument('command', help='Subcommand to run')
		# parse_args defaults to [1:] for args, but you need to
		# exclude the rest of the args too, or validation will fail
		args = parser.parse_args(sys.argv[1:2])
		if not hasattr(self, args.command):
		    print 'Unrecognized command'
		    parser.print_help()
		    exit(1)
		# use dispatch pattern to invoke method with same name
		getattr(self, args.command)()
	
if __name__ == '__main__':
    RelayControl()
```

Get state of each valve

```python
python relay_control.py get
```

Get state of specific valve

```python
python relay_control.py get --relay 1
```

Set state of specific valve

```python
python relay_control.py set --relay 1 --state 1
```

Set state of each valve

```python
python relay_control.py set --state 1
```

Toggle state of specific valve

```python
python relay_control.py toggle --relay 1
```

14. Display

Tools:
- Display
- Electrical box


15. Set up electrical box

- Replace power outlet by circuit breaker.

Tools:
- circuit breaker Din rail

16. Create multi-plateform IHM with Kivy


### Install Kivy

```bash
pip install Cython==0.23
pip install kivy
pip install pygame
python sprinkler-control.py
```
see more [here](https://kivy.org/docs/installation/installation-linux.html#installation-linux)

https://kivy.org/docs/guide/basic.html



