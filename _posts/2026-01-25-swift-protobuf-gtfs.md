---
layout: post
published: true
title: "Parsing Real-Time Transit Data in Swift with Protobuf"
date: 2026-01-25 14:53:00 +0530
image: '/images/posts/swift-protobuf-gtfs/featured.jpg'
description: "A complete guide to integrating GTFS-Realtime feeds into your iOS app using Google's Protocol Buffers and Swift."
excerpt: "Moving beyond static schedules: Learn how to fetch and decode live bus positions using SwiftProtobuf and GTFS-Realtime."
seo_title: "SwiftProtobuf and GTFS-Realtime Tutorial"
seo_description: "Learn how to parse binary Protocol Buffer files in Swift to display real-time transit data in your iOS applications."
categories:
  - iOS
tags:
  - Swift
  - GTFS-Realtime
  - Protocol Buffers
  - iOS Development
---
<p align="center" style="font-size: 0.85rem;">
Photo by <a href="https://unsplash.com/@yeh_che_wei?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">YEH CHE WEI</a> on <a href="https://unsplash.com/photos/white-and-red-bus-on-road-during-daytime-ClLaUHbGsro?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</p>

## The Challenge

If you are building a transit app, static schedules (GTFS) are only half the battle. Users expect live updates: "Is my bus late?" or "Where is it on the map right now?" Most modern transit agencies publish this data using **GTFS-Realtime**. However, unlike the JSON APIs we are used to in iOS development, these feeds often use **Protocol Buffers** (`.pb` files). If you try to read a `.pb` file like a JSON string, you will get gibberish. This guide walks through the specific tooling and code required to decode these binary files in Swift.

---

## What are Protocol Buffers?

Before writing code, it helps to understand the format.

*   **Protocol Buffers (Protobuf):** A binary format developed by Google. It is significantly smaller and faster to parse than JSON, which is crucial when sending live telemetry for hundreds of vehicles over mobile networks.
*   **The `.proto` File:** Since the data is binary, we need a "blueprint" to understand it. This is a schema file that describes the data structure.
*   **The Code Generator:** We use a tool to read the `.proto` blueprint and auto-generate a Swift file. This allows us to work with type-safe structs like `FeedMessage` or `VehiclePosition` instead of raw bytes.

---

## Step 1: Install the Code Generation Tools

To generate the necessary Swift code, you need the Protocol Buffer compiler and the Swift plugin. We will use Homebrew for this.

Open your Terminal and run:

```bash
brew install protobuf
brew install swift-protobuf
```

This installs `protoc` (the core compiler) and `protoc-gen-swift` (the Swift plugin).

---

## Step 2: Generate the Swift Schema

For this example, let's assume we need to fetch real-time transit data for Zootopia. We need the standard GTFS-Realtime schema to decode their data.

1.  **Download the Schema:** Get the official `gtfs-realtime.proto` file from the [Google Developers site](https://developers.google.com/transit/gtfs-realtime/gtfs-realtime-proto). Save it to your project's root folder.
2.  **Run the Compiler:** Navigate to your project folder in Terminal and run:

```bash
protoc --swift_out=. gtfs-realtime.proto
```

3.  **Add to Xcode:** You will see a new file named `gtfs-realtime.pb.swift` in your folder. Drag this into your Xcode project navigator.

> **Note:** This generated file is large and complex. You don't need to edit it; simply add it to your project so your app understands the data structure.

---

## Step 3: Add the SwiftProtobuf Library

The generated code relies on Apple's official Protobuf library to function.

1.  Open Xcode.
2.  Go to **File > Add Packages...**
3.  Search for: `https://github.com/apple/swift-protobuf`
4.  Add the package to your app target.

---

## Step 4: Fetch and Decode the Data

Now we can write the code to fetch live data for example, live vehicle positions from Zootopia. We'll create a simple `TransitFetcher` class. Note how we use `TransitRealtime_FeedMessage` (which comes from the file we generated in Step 2) to decode the binary data.

```swift
import Foundation
import SwiftProtobuf

class TransitFetcher {
    // Endpoint for Zootopia's transit system
    let transitUrl = URL(string: "https://api.zootopia.com/realtime/vehicle_positions.pb")!
    
    func fetchVehicles() {
        let task = URLSession.shared.dataTask(with: transitUrl) { data, _, error in
            guard let data = data, error == nil else { return }
            
            do {
                // 1. Decode the binary data using the generated struct
                let feed = try TransitRealtime_FeedMessage(serializedData: data)
                
                // 2. Iterate through the entities
                for entity in feed.entity where entity.hasVehicle {
                    let bus = entity.vehicle
                    print("Bus #\(bus.vehicle.id) is at: \(bus.position.latitude), \(bus.position.longitude)")
                }
            } catch {
                print("Protobuf decoding error: \(error)")
            }
        }
        task.resume()
    }
}
```

### How it works:
1.  **Network Request:** We download the raw data just like any other API call.
2.  **`serializedData`:** We pass the raw `Data` object into the `TransitRealtime_FeedMessage` initializer.
3.  **Type Safety:** The library handles the complex binary parsing, giving us standard Swift properties (`.latitude`, `.vehicle.id`) to work with immediately.

---

## Final Takeaway

Working with GTFS-Realtime might seem intimidating because of the binary format, but the workflow is standardized:

> **Install** `protoc` and the Swift plugin  
> **Generate** the `.swift` file from the standard `.proto` blueprint  
> **Import** the `SwiftProtobuf` package  
> **Decode** the data using the generated structs

Once this pipeline is set up, you can easily expand your app to handle trip updates (delays) and service alerts using the exact same logic.

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@areaswiftyone?sub_confirmation=1) & follow me on [X(Twitter)](https://x.com/areaswiftyone). Leave a comment if you have any questions. 

Share this article if you found it useful !