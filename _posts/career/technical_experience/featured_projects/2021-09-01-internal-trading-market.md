---
title: "Internal Trading Market"
permalink: /categories/career/technical_experience/internal_trading_market
layout: single
author_profile: false
categories:
  - technical_experience
sidebar:
  nav: "technical_experience"
tag:
  - technical_experience
  - devops
  - tech
  - personal
  - python
  - C++
  - C
  - market_data
  - trading
  - fix
  - itch
  - outch
header:
  overlay_image: "/assets/images/categories/career/technical_experience/featured_projects/internal_trading_market.jpg"
  teaser: "/assets/images/categories/career/technical_experience/featured_projects/internal_trading_market.jpg"
---

# Objective

As a member of the **high-frequency trading** (HFT) desk, I was a part of the internal trading market or the _internal liquidity provider (ILP)_ project that allowed external clients to route orders to the HFT desk. The order of operation was as follows:

1.  The desk would provide market data that external clients would subscribe to.
2.  If the desk had the best bid or offer (compared to the rest of the market), the clients would then route an order to the desk.
3.  The order would arrive internally, and the order would be executed if the desk still had the best price.
4.  If the internal bid/offer was no longer the national best bid and/or offer ([NBBO](https://www.investopedia.com/terms/n/nbbo.asp "https://www.investopedia.com/terms/n/nbbo.asp")), the order would be routed to the market with the best price.

I was the **technical lead** on this project, and my role was to create the internal and external infrastructure, as well as ensuring compliance from an execution perspective. Compliance is **critical** when setting up an internal market. [Investopedia](https://www.investopedia.com/terms/n/nbbo.asp "https://www.investopedia.com/terms/n/nbbo.asp") says it best:

_The Securities Exchange Commission's (SEC)_ [_Regulation NMS_](https://www.investopedia.com/terms/r/regulation-nms.asp "https://www.investopedia.com/terms/r/regulation-nms.asp") _requires brokers to trade at the best available ask and bid price when buying and selling securities for customers and guarantee at least the NBBO quoted price to its customers at the time of a trade._

# Infrastructure

The infrastructure for this project was interesting and unique. Until this point, all the trading applications I had configured and set up had been from the perspective of the trader sending and receiving data from the markets. For the project, the roles were reversed: we were the market and our external clients were the traders.

Some of the applications within the infrastructure I was responsible for creating, maintaining, and optimizing were:

- Market Data Handlers
- Smart Order Routers (SORs)
- Order Entry Application
- The Execution Engine

# NBBO Validation

Once the infrastructure was up and we started testing, the critical component was compliance. We had to ensure to all of our trades were executed at the **NBBO**. If not, the desk would be in the same amount of trouble as NYSE would if they broke the rules. To ensure our trading platform’s logic was compliant with the SEC, I developed a script to review every trade. The responsibilities of the script were as follows:

1.  Loop through every single trade that occurred.
2.  Review the details of the trade, primarily the timestamps that the order was received, routed, and executed.
3.  Compare the price of the instrument traded against every [protected US market](https://www.sec.gov/fast-answers/divisionsmarketregmrexchangesshtml.html "https://www.sec.gov/fast-answers/divisionsmarketregmrexchangesshtml.html").
    1.  A **Pandas** data frame was created to compare the prices of each market, including the internal market.
4.  Raise any anomalies within the routing/execution logic based on the conditions provided by the compliance team.
5.  Leverage trade data to create KPIs and present them to the traders so they may improve their strategies.

## Market Data

I learned a great deal about market data through this project. Not only did I have to work with the market data handlers for each protected market, but I had to work with the NYSE and NASDAQ [tapes](https://www.investopedia.com/terms/c/consolidatedtape.asp "https://www.investopedia.com/terms/c/consolidatedtape.asp"). Some of the concepts I learned intimately were:

- [Lot sizes](https://www.investopedia.com/terms/l/lot.asp "https://www.investopedia.com/terms/l/lot.asp")
- [Order Books](https://www.investopedia.com/terms/o/order-book.asp "https://www.investopedia.com/terms/o/order-book.asp")
- Multi-Level Feeds
- [Crossed Markets](https://www.investopedia.com/terms/c/crossedmarket.asp "https://www.investopedia.com/terms/c/crossedmarket.asp")
- Specific Network Protocols: [FIX](https://www.fixtrading.org/what-is-fix/ "https://www.fixtrading.org/what-is-fix/"), [ITCH](https://rstudio-pubs-static.s3.amazonaws.com/388237_0f95ded0b8ad4026b8d43997323fccb7.html#:~:text=ITCH%20is%20the%20outbound%20protocol,trades%2C%20circuit%20breakers%2C%20etc.&text=The%20ITCH%20protocol%20allows%20NASDAQ%20to%20distribute%20financial%20information%20to%20market%20participants. "https://rstudio-pubs-static.s3.amazonaws.com/388237_0f95ded0b8ad4026b8d43997323fccb7.html#:~:text=ITCH%20is%20the%20outbound%20protocol,trades%2C%20circuit%20breakers%2C%20etc.&text=The%20ITCH%20protocol%20allows%20NASDAQ%20to%20distribute%20financial%20information%20to%20market%20participants."), [XDP](https://www.nyse.com/publicdocs/nyse/data/XDP_Integrated_Feed_Client_Specification_v2.3a.pdf "https://www.nyse.com/publicdocs/nyse/data/XDP_Integrated_Feed_Client_Specification_v2.3a.pdf"), etc.

Comparing market data and creating a snapshot of the NBBO is tricky, to say the least. It requires attention to detail and an in-depth understanding of trading systems. When comparing market data from a compliance perspective it gets even trickier as compliance has a hard set of conditions that must be met. This project opened my eyes to the complexity of market data, and as an avid fan of complex problems, I look forward to creating simple solutions when working with market data again.

## Smart Order Routing

The Smart Order Router was another trading application I learned at a deep level. While the concept of a SOR is standard, everyone has their own implementation. For the ILP project, the implementation of the SOR was internally unique. Some of my responsibilities and learning points for this project were:

- Understanding how the decision-making occurred.
- Testing and re-configuring the SOR for special use cases.
- Understanding and resolving complex race conditions.
- Programmatically analyze the decisions of the SOR within my compliance script. I compared several metrics from the market data and the SOR to ensure the platform was performing as intended.
- Highlighting key performance metrics, functional metrics, and behaviors to developers and providing them with systematic solutions.

The decision-making and complexity of the SOR made me a keen student of it. The intertwined nature of market data and the SOR allowed me to understand each component individually as well as the union between them. The SOR is a critical component in any trading system, in the future, I hope to contribute code to improve performance and functionality.

## Python

The compliance script was written entirely in Python. This script helped me learn critical features, libraries, and implementations, such as:

- Working with time-series data using **Pandas**.
- Using **NumPy** for data processing and computation.
- Generating reports and injecting data into internal APIs.
- Interacting with databases uses the **MySQL** library.

Prior to this project, I would have considered myself a decent programmer. After working on this complex project, I learned many new features and developed new skills. Not only did I learn to work with new libraries, but my general understanding of Python and programming grew immeasurably.
