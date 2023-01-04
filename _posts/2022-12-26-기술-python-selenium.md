---
title: "Selenium 사용해보기 -일차"
categories:
  - python
  - Selenium

tags: [Selenium]
toc : true
comments: true
---

# Selenium 튜토리얼

## 개발 환경 설치 
```python

from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
from selenium.webdriver.support.wait import WebDriverWait

chrome_options = webdriver.ChromeOptions()
settings = {"recentDestinations": [{"id": "Save as PDF", "origin": "local", "account": ""}], "selectedDestinationId": "Save as PDF", "version": 2}
prefs = {'printing.print_preview_sticky_settings.appState': json.dumps(settings)}
chrome_options.add_experimental_option('prefs', prefs)
chrome_options.add_argument('--kiosk-printing')
driver = webdriver.Chrome(r"chromedriver.exe", options=chrome_options)


#driver = webdriver.Chrome('/usr/local/bin/chromedriver')
driver.implicitly_wait(2)
#driver.get('https://www.doc88.com/p-9445720479282.html?s=rel&id=1')
driver.get('https://www.doc88.com/p-1167826886712.html')


driver.implicitly_wait(2)

#driver.find_element('.surplus-btn').click()
driver.find_element(By.ID,"continueButton").click()


time.sleep(3)

last_height = driver.execute_script("return document.body.scrollHeight")

y = 0
for timer in range(0,1500):
    driver.execute_script("window.scrollTo(0, "+str(y)+")")
    y += 2000  
    time.sleep(1)

driver.execute_script('window.print();')
time.sleep(100000)
driver.close()
```