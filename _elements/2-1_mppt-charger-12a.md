---
title: "MPPT charger (12A)"
excerpt: "Flexible battery charge controller for solar panels or bicycle generators."
permalink: /elements/mppt-charger-12a/
---

After a few prototypes using Arduino boards and AVR 8-bit microcontrollers, the current version of the charge controller is based on 32-bit STM32 ARM MCU. This change was necessary in order to be able to implement a CANopen stack.

![Charge controller PCB](/images/mppt-charger-12a_v0.5.jpg)

The prototype has been tested with currents up to 10A so far. Further tests are currently ongoing (as of 08/2016).

## Features

- 12A MPPT charger
- 55V max PV input
- 12V or 24V battery output
- 32bit ARM MCU (STM32F072)
- CAN communication interface with CANopen standard RJ45 jacks
- Expandable via Olimex Universal Extension Connector (UEXT) featuring I2C, Serial and SPI interface (e.g. used for display, WIFI communication, etc.)
- Built-in protection:
  - Overvoltage
  - Undervoltage
  - Overcurrent
  - PV short circuit
  - PV reverse polarity (for max. module open circuit voltage of around 40V)
  - Battery reverse polarity (destructive, fuse is blown)

## Development

The charge controller is under active development and you are welcome to participate.

Visit the [GitHub page](https://github.com/LibreSolar/MPPT-Charger-12A "12A MPPT Solar Charge Controller") for schematics and board layout.
