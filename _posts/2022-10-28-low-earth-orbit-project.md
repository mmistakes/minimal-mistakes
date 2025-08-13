---
layout: post
title: "Low Earth Orbit Active Satellites Project"
category: data-engineering

---

This project involved building a web application to track active satellites in Low Earth Orbit (LEO). The application visualizes the real-time positions of satellites, providing an interactive dashboard for users.

The core of the project is a data pipeline built with Python and Google Cloud Platform. The pipeline performs the following steps:
1.  **Data Extraction:** Satellite data is fetched from CelesTrak, a public source for satellite orbital data.
2.  **Data Transformation:** The raw data is cleaned and processed using the Pandas library. Satellites are filtered to include only those in LEO, based on their orbital parameters. The data is also enriched with information about the satellite's purpose (e.g., communications, weather, navigation).
3.  **Data Loading:** The processed data is stored in a Google Cloud Storage bucket.

The data pipeline is automated using Google Cloud services. A Google Cloud Function, written in Python, contains the ETL logic. This function is triggered daily by a Google Cloud Scheduler cron job, ensuring the satellite data is always up-to-date.

The front-end of the application is a web-based dashboard built with Dash and Plotly, which provides interactive visualizations of the satellite orbits. The entire application is deployed on Google App Engine, making it accessible to a public audience.

[Repository](https://github.com/0ladayo/Low-Earth-Orbit-Satellites-Project)
[Medium Post](https://medium.com/codex/building-a-web-application-for-active-low-earth-orbit-satellites-74fcafb16df)
[Dashboard](https://leo-satellite-overview-project.nw.r.appspot.com/)

Tools:
<i class="fab fa-python"></i> Python,
<i class="fas fa-cloud"></i> GCP.