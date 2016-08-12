---
title: "Communication subsystem"
excerpt: "Planned CANopen based communication sub-system"
permalink: /elements/communication/
---

The different components of the renewable energy system should form a "smart" and self-managing system, which ensures safe operation of all components through communication.

Currently, the communication protocol is not yet fixed. However, EnergyBus is a very promising candidate.

## Requirements for the communication protocol

- Plug and play (high-level protocol needed)
  - Only advanced features should require previous configuration
- Master-less (distributed system)
- Advanced energy management features
  - Multiple sources and sinks
  - Prioritization of nodes (e.g solar has higher priority than diesel generator, fridge has lower priority than laptop)
- Cheap and reliable
- Remote firmware flashing
- Possible candidates:
  - CAN and CANopen/EnergyBus
  - RS485 and proprietary protocol (Modbus not capable of master-less communication)
  - TCP/IP via Ethernet or WiFi (expensive!)
  - Cheap low-power radio (e.g. NRF24L01+, RFM12, BLE)
    - Problem: How to identify plug and socket?
