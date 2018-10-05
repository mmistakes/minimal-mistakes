---
title: How to configure Metricbeats in Windows
key: 20181005
tags: beats Metricbeat ELK windows
excerpt: "Windows 환경에서 Metricbeat 을 설정하기"
---

# Summaries

Windows 환경에서 Metricbeat 를 구성하는 과정을 간략히 설명한다.

---
<!--More-->

# Metricbeat Example configuration

참조의 `Metricbeat module Windows Sample` 를 참조

```
metricbeat.modules:
- module: windows
  metricsets: ["perfmon"]
  enabled: true
  period: 10s
  perfmon.ignore_non_existent_counters: true
  perfmon.counters:
  #  - instance_label: processor.name
  #    instance_name: total
  #    measurement_label: processor.time.total.pct
  #    query: '\Processor Information(_Total)\% Processor Time'

- module: windows
  metricsets: ["service"]
  enabled: true
  period: 60s
```

# 참조
- [Metricbeat module Windows Sample][1]
  - Metricbeat 모듈 설정 샘플(본문 첨부 참조)

<!-- References Link -->

<!--
This is a sample code to write down reference link in markdown document.
[1]: https://docs.docker.com/compose/django/ "compose django"
-->
[1]: https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-windows.html "metricbeat module windows"

<!-- End of Documents -->

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
