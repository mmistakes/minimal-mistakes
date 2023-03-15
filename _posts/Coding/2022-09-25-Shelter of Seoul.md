---
layout: single
title:  "Python Study 5"
categories: Coding
tag: [python, coding]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


## Find and add shelters in Seoul, South Korea



```python
import pandas as pd
```


```python
# From "https://data.seoul.go.kr/" I can find the locations of shelters. and I tried to put their locations on the map
```


```python
file = './data/shelterOfSeoul.csv'
#raw = pd.read_csv(file)
# Got Error "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xb0 in position 1: invalid start byte"
# We need to change our decoding way
raw = pd.read_csv(file, encoding = 'cp949')
raw
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>고유번호</th>
      <th>대피소명칭</th>
      <th>소재지</th>
      <th>최대수용인원</th>
      <th>현재수용인원</th>
      <th>현재운영여부</th>
      <th>전화번호</th>
      <th>행정동코드</th>
      <th>행정동명칭</th>
      <th>대피단계</th>
      <th>비고</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>혜화초등학교</td>
      <td>혜화동 13-1 (혜화로 32)</td>
      <td>450</td>
      <td>0</td>
      <td>N</td>
      <td>763-0606</td>
      <td>11110650</td>
      <td>혜화동</td>
      <td></td>
      <td></td>
      <td>126.999891</td>
      <td>37.589128</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>새샘교회</td>
      <td>홍제동 20-4</td>
      <td>100</td>
      <td>0</td>
      <td>N</td>
      <td>720-7040</td>
      <td>11410655</td>
      <td>홍제2동</td>
      <td></td>
      <td></td>
      <td>126.950484</td>
      <td>37.583660</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>한강중앙교회</td>
      <td>포은로2가길 66(합정동)</td>
      <td>130</td>
      <td>0</td>
      <td>N</td>
      <td>337-6629</td>
      <td>11440680</td>
      <td>합정동</td>
      <td></td>
      <td></td>
      <td>126.910028</td>
      <td>37.549343</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5</td>
      <td>서울성산초등학교</td>
      <td>양화로3길 94(합정동)</td>
      <td>200</td>
      <td>0</td>
      <td>N</td>
      <td>324-1407</td>
      <td>11440680</td>
      <td>합정동</td>
      <td></td>
      <td></td>
      <td>126.910666</td>
      <td>37.553495</td>
    </tr>
    <tr>
      <th>4</th>
      <td>6</td>
      <td>상도1동경로당</td>
      <td>상도동 159-282</td>
      <td>20</td>
      <td>0</td>
      <td>N</td>
      <td>010-8011-7330</td>
      <td>11590530</td>
      <td>상도1동</td>
      <td></td>
      <td></td>
      <td>126.948269</td>
      <td>37.500395</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>689</th>
      <td>690</td>
      <td>홍제3동주민센터</td>
      <td>홍제동 7-13</td>
      <td>30</td>
      <td>0</td>
      <td>N</td>
      <td>330-8420</td>
      <td>11410640</td>
      <td>홍제3동</td>
      <td></td>
      <td></td>
      <td>126.949711</td>
      <td>37.593764</td>
    </tr>
    <tr>
      <th>690</th>
      <td>691</td>
      <td>원광종합복지관</td>
      <td>신내1동 572-2</td>
      <td>3472</td>
      <td>0</td>
      <td>N</td>
      <td>438-4011</td>
      <td>11260680</td>
      <td>신내1동</td>
      <td></td>
      <td></td>
      <td>127.095956</td>
      <td>37.604360</td>
    </tr>
    <tr>
      <th>691</th>
      <td>692</td>
      <td>원묵초등학교</td>
      <td>묵1동 11(숙선옹주로 109)</td>
      <td>880</td>
      <td>0</td>
      <td>N</td>
      <td>3421-2102</td>
      <td>11260620</td>
      <td>묵1동</td>
      <td></td>
      <td></td>
      <td>127.086290</td>
      <td>37.617983</td>
    </tr>
    <tr>
      <th>692</th>
      <td>693</td>
      <td>중원초등학교</td>
      <td>중계2동 502(노원구 섬밭길 316)</td>
      <td>490</td>
      <td>0</td>
      <td>N</td>
      <td>971-4771</td>
      <td>11350625</td>
      <td>중계2.3동</td>
      <td></td>
      <td></td>
      <td>127.062806</td>
      <td>37.643853</td>
    </tr>
    <tr>
      <th>693</th>
      <td>694</td>
      <td>암사3동 주민센터</td>
      <td>강동구 암사동 414-2</td>
      <td>0</td>
      <td>0</td>
      <td>N</td>
      <td>442-2582</td>
      <td>11740590</td>
      <td>암사3동</td>
      <td></td>
      <td></td>
      <td>127.140775</td>
      <td>37.554998</td>
    </tr>
  </tbody>
</table>
<p>694 rows × 13 columns</p>
</div>



```python
raw.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>고유번호</th>
      <th>대피소명칭</th>
      <th>소재지</th>
      <th>최대수용인원</th>
      <th>현재수용인원</th>
      <th>현재운영여부</th>
      <th>전화번호</th>
      <th>행정동코드</th>
      <th>행정동명칭</th>
      <th>대피단계</th>
      <th>비고</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>혜화초등학교</td>
      <td>혜화동 13-1 (혜화로 32)</td>
      <td>450</td>
      <td>0</td>
      <td>N</td>
      <td>763-0606</td>
      <td>11110650</td>
      <td>혜화동</td>
      <td></td>
      <td></td>
      <td>126.999891</td>
      <td>37.589128</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>새샘교회</td>
      <td>홍제동 20-4</td>
      <td>100</td>
      <td>0</td>
      <td>N</td>
      <td>720-7040</td>
      <td>11410655</td>
      <td>홍제2동</td>
      <td></td>
      <td></td>
      <td>126.950484</td>
      <td>37.583660</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>한강중앙교회</td>
      <td>포은로2가길 66(합정동)</td>
      <td>130</td>
      <td>0</td>
      <td>N</td>
      <td>337-6629</td>
      <td>11440680</td>
      <td>합정동</td>
      <td></td>
      <td></td>
      <td>126.910028</td>
      <td>37.549343</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5</td>
      <td>서울성산초등학교</td>
      <td>양화로3길 94(합정동)</td>
      <td>200</td>
      <td>0</td>
      <td>N</td>
      <td>324-1407</td>
      <td>11440680</td>
      <td>합정동</td>
      <td></td>
      <td></td>
      <td>126.910666</td>
      <td>37.553495</td>
    </tr>
    <tr>
      <th>4</th>
      <td>6</td>
      <td>상도1동경로당</td>
      <td>상도동 159-282</td>
      <td>20</td>
      <td>0</td>
      <td>N</td>
      <td>010-8011-7330</td>
      <td>11590530</td>
      <td>상도1동</td>
      <td></td>
      <td></td>
      <td>126.948269</td>
      <td>37.500395</td>
    </tr>
  </tbody>
</table>
</div>



```python
raw.info()
```

<pre>
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 694 entries, 0 to 693
Data columns (total 13 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   고유번호    694 non-null    int64  
 1   대피소명칭   694 non-null    object 
 2   소재지     694 non-null    object 
 3   최대수용인원  694 non-null    int64  
 4   현재수용인원  694 non-null    int64  
 5   현재운영여부  694 non-null    object 
 6   전화번호    694 non-null    object 
 7   행정동코드   694 non-null    int64  
 8   행정동명칭   694 non-null    object 
 9   대피단계    694 non-null    object 
 10  비고      694 non-null    object 
 11  경도      694 non-null    float64
 12  위도      694 non-null    float64
dtypes: float64(2), int64(4), object(7)
memory usage: 70.6+ KB
</pre>

```python
# If the index number is 0, then I will print those data (latitude)
i = 0
lat = raw.loc[i, '위도']
long = raw.loc[i, '경도']
print(lat, long)
```

<pre>
37.5891283 126.9998906
</pre>

```python
raw.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>고유번호</th>
      <th>대피소명칭</th>
      <th>소재지</th>
      <th>최대수용인원</th>
      <th>현재수용인원</th>
      <th>현재운영여부</th>
      <th>전화번호</th>
      <th>행정동코드</th>
      <th>행정동명칭</th>
      <th>대피단계</th>
      <th>비고</th>
      <th>경도</th>
      <th>위도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
      <td>혜화초등학교</td>
      <td>혜화동 13-1 (혜화로 32)</td>
      <td>450</td>
      <td>0</td>
      <td>N</td>
      <td>763-0606</td>
      <td>11110650</td>
      <td>혜화동</td>
      <td></td>
      <td></td>
      <td>126.999891</td>
      <td>37.589128</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>새샘교회</td>
      <td>홍제동 20-4</td>
      <td>100</td>
      <td>0</td>
      <td>N</td>
      <td>720-7040</td>
      <td>11410655</td>
      <td>홍제2동</td>
      <td></td>
      <td></td>
      <td>126.950484</td>
      <td>37.583660</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4</td>
      <td>한강중앙교회</td>
      <td>포은로2가길 66(합정동)</td>
      <td>130</td>
      <td>0</td>
      <td>N</td>
      <td>337-6629</td>
      <td>11440680</td>
      <td>합정동</td>
      <td></td>
      <td></td>
      <td>126.910028</td>
      <td>37.549343</td>
    </tr>
    <tr>
      <th>3</th>
      <td>5</td>
      <td>서울성산초등학교</td>
      <td>양화로3길 94(합정동)</td>
      <td>200</td>
      <td>0</td>
      <td>N</td>
      <td>324-1407</td>
      <td>11440680</td>
      <td>합정동</td>
      <td></td>
      <td></td>
      <td>126.910666</td>
      <td>37.553495</td>
    </tr>
    <tr>
      <th>4</th>
      <td>6</td>
      <td>상도1동경로당</td>
      <td>상도동 159-282</td>
      <td>20</td>
      <td>0</td>
      <td>N</td>
      <td>010-8011-7330</td>
      <td>11590530</td>
      <td>상도1동</td>
      <td></td>
      <td></td>
      <td>126.948269</td>
      <td>37.500395</td>
    </tr>
  </tbody>
</table>
</div>



```python
# Print the latitude, longtitude, and name of the shelter of index number
i = 10
lat = raw.loc[i, '위도']
long = raw.loc[i, '경도']
name = raw.loc[i, '대피소명칭']
print(lat, long, name)
```

<pre>
37.4866976 126.9576162 봉천종합사회복지관
</pre>

```python
# Using for loop
#for i in range(len(raw)):
#    lat = raw.loc[i, '위도']
#    long = raw.loc[i, '경도']
#    name = raw.loc[i, '대피소명칭']
    #print(i, lat, long, name)
    # Too many data... 
    #here is sample
for i in range(5):
    lat = raw.loc[i , '위도']
    long = raw.loc[i , '경도']
    name = raw.loc[i, '대피소명칭']
    print(i, lat, long, name)
```

<pre>
0 37.5891283 126.9998906 혜화초등학교
1 37.5836603 126.9504844 새샘교회
2 37.5493434 126.9100281 한강중앙교회
3 37.5534953 126.9106658 서울성산초등학교
4 37.5003954 126.9482686 상도1동경로당
</pre>

```python
! pip install install folium
```

<pre>
Requirement already satisfied: install in c:\users\hoon7\anaconda3\lib\site-packages (1.3.5)
Requirement already satisfied: folium in c:\users\hoon7\anaconda3\lib\site-packages (0.12.1.post1)
Requirement already satisfied: branca>=0.3.0 in c:\users\hoon7\anaconda3\lib\site-packages (from folium) (0.5.0)
Requirement already satisfied: jinja2>=2.9 in c:\users\hoon7\anaconda3\lib\site-packages (from folium) (2.11.3)
Requirement already satisfied: requests in c:\users\hoon7\anaconda3\lib\site-packages (from folium) (2.26.0)
Requirement already satisfied: numpy in c:\users\hoon7\anaconda3\lib\site-packages (from folium) (1.20.3)
Requirement already satisfied: MarkupSafe>=0.23 in c:\users\hoon7\anaconda3\lib\site-packages (from jinja2>=2.9->folium) (1.1.1)
Requirement already satisfied: charset-normalizer~=2.0.0 in c:\users\hoon7\anaconda3\lib\site-packages (from requests->folium) (2.0.4)
Requirement already satisfied: idna<4,>=2.5 in c:\users\hoon7\anaconda3\lib\site-packages (from requests->folium) (3.2)
Requirement already satisfied: urllib3<1.27,>=1.21.1 in c:\users\hoon7\anaconda3\lib\site-packages (from requests->folium) (1.26.7)
Requirement already satisfied: certifi>=2017.4.17 in c:\users\hoon7\anaconda3\lib\site-packages (from requests->folium) (2021.10.8)
</pre>

```python
# Open the map and add markers where the shelters are
# The default location is Seoul Station 
import folium
m = folium.Map(location = [37.5536067, 126.9674308],
              zoom_start = 12)
# Shelter's location
for i in range(len(raw)):
    lat = raw.loc[i, '위도']
    long = raw.loc[i, '경도']
    name = raw.loc[i, '대피소명칭']
    folium.Marker([lat, long], tooltip = name).add_to(m)
m
```

<div style="width:100%;"><div style="position:relative;width:100%;height:0;padding-bottom:60%;"><span style="color:#565656">Make this Notebook Trusted to load map: File -> Trust Notebook</span><iframe srcdoc="&lt;!DOCTYPE html&gt;
&lt;head&gt;    
    &lt;meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=UTF-8&quot; /&gt;
    
        &lt;script&gt;
            L_NO_TOUCH = false;
            L_DISABLE_3D = false;
        &lt;/script&gt;
    
    &lt;style&gt;html, body {width: 100%;height: 100%;margin: 0;padding: 0;}&lt;/style&gt;
    &lt;style&gt;#map {position:absolute;top:0;bottom:0;right:0;left:0;}&lt;/style&gt;
    &lt;script src=&quot;https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://code.jquery.com/jquery-1.12.4.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js&quot;&gt;&lt;/script&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/gh/python-visualization/folium/folium/templates/leaflet.awesome.rotate.min.css&quot;/&gt;
    
            &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,
                initial-scale=1.0, maximum-scale=1.0, user-scalable=no&quot; /&gt;
            &lt;style&gt;
                #map_fefa21ac91cc04c5af5f80204b46cb0d {
                    position: relative;
                    width: 100.0%;
                    height: 100.0%;
                    left: 0.0%;
                    top: 0.0%;
                }
            &lt;/style&gt;
        
&lt;/head&gt;
&lt;body&gt;    
    
            &lt;div class=&quot;folium-map&quot; id=&quot;map_fefa21ac91cc04c5af5f80204b46cb0d&quot; &gt;&lt;/div&gt;
        
&lt;/body&gt;
&lt;script&gt;    
    
            var map_fefa21ac91cc04c5af5f80204b46cb0d = L.map(
                &quot;map_fefa21ac91cc04c5af5f80204b46cb0d&quot;,
                {
                    center: [37.5536067, 126.9674308],
                    crs: L.CRS.EPSG3857,
                    zoom: 12,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );

            

        
    
            var tile_layer_44c3c6b2ee56c89afe7adfb68a7e7810 = L.tileLayer(
                &quot;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&quot;,
                {&quot;attribution&quot;: &quot;Data by \u0026copy; \u003ca href=\&quot;http://openstreetmap.org\&quot;\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\&quot;http://www.openstreetmap.org/copyright\&quot;\u003eODbL\u003c/a\u003e.&quot;, &quot;detectRetina&quot;: false, &quot;maxNativeZoom&quot;: 18, &quot;maxZoom&quot;: 18, &quot;minZoom&quot;: 0, &quot;noWrap&quot;: false, &quot;opacity&quot;: 1, &quot;subdomains&quot;: &quot;abc&quot;, &quot;tms&quot;: false}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            var marker_8db7778e1bc4854526b9b2b3aa6fb90c = L.marker(
                [37.5891283, 126.9998906],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8db7778e1bc4854526b9b2b3aa6fb90c.bindTooltip(
                `&lt;div&gt;
                     혜화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cecc15666c38d41d320463fec3032d3c = L.marker(
                [37.5836603, 126.9504844],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cecc15666c38d41d320463fec3032d3c.bindTooltip(
                `&lt;div&gt;
                     새샘교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b2ed7ee8b492c541170a19db9022d3a8 = L.marker(
                [37.5493434, 126.9100281],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b2ed7ee8b492c541170a19db9022d3a8.bindTooltip(
                `&lt;div&gt;
                     한강중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa6bdf9a9a26d2615d53b155b577bae3 = L.marker(
                [37.5534953, 126.9106658],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_aa6bdf9a9a26d2615d53b155b577bae3.bindTooltip(
                `&lt;div&gt;
                     서울성산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b4a077037d962fb565cbecc79da805cc = L.marker(
                [37.5003954, 126.9482686],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b4a077037d962fb565cbecc79da805cc.bindTooltip(
                `&lt;div&gt;
                     상도1동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b5709378f3fd5f752ceaeeb238c402a = L.marker(
                [37.4997347, 126.9374323],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6b5709378f3fd5f752ceaeeb238c402a.bindTooltip(
                `&lt;div&gt;
                     상도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6e05ab8de7ca1d39e58fe390d06f105e = L.marker(
                [37.5100544, 126.9536402],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6e05ab8de7ca1d39e58fe390d06f105e.bindTooltip(
                `&lt;div&gt;
                     본동초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd5677e0074287c8921214c9973a02d1 = L.marker(
                [37.5365343, 126.9650202],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bd5677e0074287c8921214c9973a02d1.bindTooltip(
                `&lt;div&gt;
                     남정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3991d9a9eb4b0cadd74b6cabdeadeff8 = L.marker(
                [37.5884354, 126.9217785],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3991d9a9eb4b0cadd74b6cabdeadeff8.bindTooltip(
                `&lt;div&gt;
                     응암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_724e97c358c1bf828a8cb30502292f8b = L.marker(
                [37.5030252, 126.9625144],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_724e97c358c1bf828a8cb30502292f8b.bindTooltip(
                `&lt;div&gt;
                     제일감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7912a755db6c277571b34683b4d1c06a = L.marker(
                [37.4866976, 126.9576162],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7912a755db6c277571b34683b4d1c06a.bindTooltip(
                `&lt;div&gt;
                     봉천종합사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b86b27b77b6ec062e1f12f5bbb054c1 = L.marker(
                [37.5232077, 126.9368097],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8b86b27b77b6ec062e1f12f5bbb054c1.bindTooltip(
                `&lt;div&gt;
                     여의도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8398a16e048ce87ce4d1061de8aef296 = L.marker(
                [37.4830902, 126.9787764],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8398a16e048ce87ce4d1061de8aef296.bindTooltip(
                `&lt;div&gt;
                     사당1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b7dad50fb363d38166532449a81aabf8 = L.marker(
                [37.5283727, 126.9537102],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b7dad50fb363d38166532449a81aabf8.bindTooltip(
                `&lt;div&gt;
                     서부성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_08e6a7ccf65e1b244ae26bf466d2b80d = L.marker(
                [37.4811316, 126.9901108],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_08e6a7ccf65e1b244ae26bf466d2b80d.bindTooltip(
                `&lt;div&gt;
                     서울 이수 중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6753c0c6dddc30e19262fcf9291da984 = L.marker(
                [37.5459029, 126.9535807],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6753c0c6dddc30e19262fcf9291da984.bindTooltip(
                `&lt;div&gt;
                     서울공덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_74df85c715f3ddc4b820be4576be7252 = L.marker(
                [37.4937422, 126.9440685],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_74df85c715f3ddc4b820be4576be7252.bindTooltip(
                `&lt;div&gt;
                     국사봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_852a82d19280e6ee598fcaec9ba3de79 = L.marker(
                [37.4910611, 126.9553258],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_852a82d19280e6ee598fcaec9ba3de79.bindTooltip(
                `&lt;div&gt;
                     봉현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a2318b0445c6845e67d73395658cc022 = L.marker(
                [37.5911343, 127.0021399],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a2318b0445c6845e67d73395658cc022.bindTooltip(
                `&lt;div&gt;
                     천주교 외방선교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a2eafb1e35bafecf592b3bb74e8d4e5 = L.marker(
                [37.5484412, 127.0628283],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8a2eafb1e35bafecf592b3bb74e8d4e5.bindTooltip(
                `&lt;div&gt;
                     성동세무서
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_84a278c40a0bcd35be94c26553a662a5 = L.marker(
                [37.5147612, 127.1130378],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_84a278c40a0bcd35be94c26553a662a5.bindTooltip(
                `&lt;div&gt;
                     방이중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_17e097846851535a6dd2f7588c66de34 = L.marker(
                [37.4998298, 127.1079155],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_17e097846851535a6dd2f7588c66de34.bindTooltip(
                `&lt;div&gt;
                     가락초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0457c902c588c2c3bbbcde910265fd89 = L.marker(
                [37.5444065, 127.0629919],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0457c902c588c2c3bbbcde910265fd89.bindTooltip(
                `&lt;div&gt;
                     성수초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_52dcce224baa9d832d3273dc81bac3f8 = L.marker(
                [37.5159073, 127.0878144],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_52dcce224baa9d832d3273dc81bac3f8.bindTooltip(
                `&lt;div&gt;
                     잠신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f0d879d8e78b2c71c9d7b59e937d96c7 = L.marker(
                [37.484888, 127.0934544],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f0d879d8e78b2c71c9d7b59e937d96c7.bindTooltip(
                `&lt;div&gt;
                     태화기독교종합 사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_af01a337ab72d9e1175333da9aaf0fe2 = L.marker(
                [37.5172332, 127.099344],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_af01a337ab72d9e1175333da9aaf0fe2.bindTooltip(
                `&lt;div&gt;
                     잠실중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_66c91be76c6ced62926d3759ab9b376f = L.marker(
                [37.6198317, 127.0055226],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_66c91be76c6ced62926d3759ab9b376f.bindTooltip(
                `&lt;div&gt;
                     정릉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_12f5b0d89ba3c540fab5be508adf4966 = L.marker(
                [37.5303512, 127.0853523],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_12f5b0d89ba3c540fab5be508adf4966.bindTooltip(
                `&lt;div&gt;
                     광양중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6f65e7448b73cfb8f7c5e497849a60e1 = L.marker(
                [37.5778498, 127.0244276],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6f65e7448b73cfb8f7c5e497849a60e1.bindTooltip(
                `&lt;div&gt;
                     대광고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b4c7bbdf7c6657b11c508b637c4c7d04 = L.marker(
                [37.6403265, 127.0229092],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b4c7bbdf7c6657b11c508b637c4c7d04.bindTooltip(
                `&lt;div&gt;
                     성실교회교육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bbebba627a0aee5e4ca69f734405c4b1 = L.marker(
                [37.4891812, 127.1112013],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bbebba627a0aee5e4ca69f734405c4b1.bindTooltip(
                `&lt;div&gt;
                     가원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2465bf1445580a906ce3225e5790e3ec = L.marker(
                [37.6708916, 127.0457558],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2465bf1445580a906ce3225e5790e3ec.bindTooltip(
                `&lt;div&gt;
                     도봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ff6218b9b0fb234a079aae2f82600ef8 = L.marker(
                [37.6564809, 127.0284014],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ff6218b9b0fb234a079aae2f82600ef8.bindTooltip(
                `&lt;div&gt;
                     쌍문4동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bdf1dfb1bf10448ee7b9ad6a7ad4bb2f = L.marker(
                [37.4797843, 126.9856123],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bdf1dfb1bf10448ee7b9ad6a7ad4bb2f.bindTooltip(
                `&lt;div&gt;
                     방배2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ea143a5a0ba4f9689e41f6e9ae5d2bbf = L.marker(
                [37.497947, 127.1394478],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ea143a5a0ba4f9689e41f6e9ae5d2bbf.bindTooltip(
                `&lt;div&gt;
                     보인고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d20a9470d25bde24a283d8412c6eb0b6 = L.marker(
                [37.4868368, 127.0704134],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d20a9470d25bde24a283d8412c6eb0b6.bindTooltip(
                `&lt;div&gt;
                     개포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_66146560c38bcb353c7f86fc9a2d32a3 = L.marker(
                [37.4955053, 127.1526489],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_66146560c38bcb353c7f86fc9a2d32a3.bindTooltip(
                `&lt;div&gt;
                     마천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_927141185a2762efda6f3d8d981adae2 = L.marker(
                [37.6621603, 127.0278544],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_927141185a2762efda6f3d8d981adae2.bindTooltip(
                `&lt;div&gt;
                     학마을다사랑센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_79e07c5bb5e129bc26358e388b60e486 = L.marker(
                [37.5197002, 127.134857],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_79e07c5bb5e129bc26358e388b60e486.bindTooltip(
                `&lt;div&gt;
                     보성중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a4963ada3805ed9e33108ec57fbc5b8 = L.marker(
                [37.538511, 127.1448722],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8a4963ada3805ed9e33108ec57fbc5b8.bindTooltip(
                `&lt;div&gt;
                     길동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_232c2bc931ea65bf3ba3e6eb14ad77d9 = L.marker(
                [37.587503, 127.0224721],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_232c2bc931ea65bf3ba3e6eb14ad77d9.bindTooltip(
                `&lt;div&gt;
                     안암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0c0f8af5983c8419f7aa762c5727bc4d = L.marker(
                [37.6140774, 127.0436751],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0c0f8af5983c8419f7aa762c5727bc4d.bindTooltip(
                `&lt;div&gt;
                     장위1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a752a17d6d540329410db43a602dbf52 = L.marker(
                [37.6488034, 127.046758],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a752a17d6d540329410db43a602dbf52.bindTooltip(
                `&lt;div&gt;
                     창일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_049d48f2e65978035238dc36482e714b = L.marker(
                [37.4991267, 127.1001476],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_049d48f2e65978035238dc36482e714b.bindTooltip(
                `&lt;div&gt;
                     남현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_da2a6ba582a636271e66a5e221564343 = L.marker(
                [37.5023094, 127.1130719],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_da2a6ba582a636271e66a5e221564343.bindTooltip(
                `&lt;div&gt;
                     잠실여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ded304b43f305dded2b80e18e6e02d82 = L.marker(
                [37.5544231, 127.1420279],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ded304b43f305dded2b80e18e6e02d82.bindTooltip(
                `&lt;div&gt;
                     명일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd1c25d4c97f7d3a60613ceed92345c7 = L.marker(
                [37.4885099, 126.8500846],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bd1c25d4c97f7d3a60613ceed92345c7.bindTooltip(
                `&lt;div&gt;
                     개웅초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_05b4c79bc51a594880ce51625c858a8d = L.marker(
                [37.515637, 126.8894872],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_05b4c79bc51a594880ce51625c858a8d.bindTooltip(
                `&lt;div&gt;
                     성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_84bd3a651355bd9aff7749a8a826701b = L.marker(
                [37.6205029, 127.0688592],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_84bd3a651355bd9aff7749a8a826701b.bindTooltip(
                `&lt;div&gt;
                     한천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb9fed34be6263d267c76b8c2a88128a = L.marker(
                [37.4853903, 126.8838479],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_eb9fed34be6263d267c76b8c2a88128a.bindTooltip(
                `&lt;div&gt;
                     영일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4233c1f8302665ebe5c6b932612a89a2 = L.marker(
                [37.5321157, 126.8477954],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4233c1f8302665ebe5c6b932612a89a2.bindTooltip(
                `&lt;div&gt;
                     화곡 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3a0404638a1bf843aaf4eaa51e17e95c = L.marker(
                [37.4983265, 126.9134649],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3a0404638a1bf843aaf4eaa51e17e95c.bindTooltip(
                `&lt;div&gt;
                     대길초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a09baab9ddf61c0fdb58b5eeab80c7c5 = L.marker(
                [37.6323901, 127.0660794],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a09baab9ddf61c0fdb58b5eeab80c7c5.bindTooltip(
                `&lt;div&gt;
                     중현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cf1afe41f5e026d0ab2e7ab49ce4f7aa = L.marker(
                [37.5162167, 126.8440456],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cf1afe41f5e026d0ab2e7ab49ce4f7aa.bindTooltip(
                `&lt;div&gt;
                     신남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b3d624ad134ad6021d719901bac800a = L.marker(
                [37.5605231, 127.1643758],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6b3d624ad134ad6021d719901bac800a.bindTooltip(
                `&lt;div&gt;
                     고덕2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a0d88295fea6d0ee1810d4bb8f05b903 = L.marker(
                [37.5154717, 126.9140858],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a0d88295fea6d0ee1810d4bb8f05b903.bindTooltip(
                `&lt;div&gt;
                     영원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6a4787f1394222c8d58b85b78aafbf02 = L.marker(
                [37.5745659, 126.8185847],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6a4787f1394222c8d58b85b78aafbf02.bindTooltip(
                `&lt;div&gt;
                     우정 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c467544915faf8a323ad1f5a50592240 = L.marker(
                [37.493891, 126.8314824],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c467544915faf8a323ad1f5a50592240.bindTooltip(
                `&lt;div&gt;
                     수궁동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_28b3dac0344da83bc04ca08e4ff5b1a1 = L.marker(
                [37.495209, 126.8352071],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_28b3dac0344da83bc04ca08e4ff5b1a1.bindTooltip(
                `&lt;div&gt;
                     연세중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3e5d1a199337dbdaa9d76a683d66d4e6 = L.marker(
                [37.5015627, 126.9090253],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3e5d1a199337dbdaa9d76a683d66d4e6.bindTooltip(
                `&lt;div&gt;
                     천주교살레시오회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_079f361eda6316ff0dbda38ed0bd5969 = L.marker(
                [37.554995, 126.87129],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_079f361eda6316ff0dbda38ed0bd5969.bindTooltip(
                `&lt;div&gt;
                     염경초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_acdb82b9cd0db68eef9479e13651f81c = L.marker(
                [37.5031007, 126.9308448],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_acdb82b9cd0db68eef9479e13651f81c.bindTooltip(
                `&lt;div&gt;
                     강현중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68cd902d62b11e9f69df8bfc644b74c3 = L.marker(
                [37.6577443, 127.0732997],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_68cd902d62b11e9f69df8bfc644b74c3.bindTooltip(
                `&lt;div&gt;
                     중계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fba8823585fdf26e884a715515ef4977 = L.marker(
                [37.4881908, 126.8820542],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fba8823585fdf26e884a715515ef4977.bindTooltip(
                `&lt;div&gt;
                     서울남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b4d53a34a06c3484966157b33b679420 = L.marker(
                [37.5840138, 126.9868971],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b4d53a34a06c3484966157b33b679420.bindTooltip(
                `&lt;div&gt;
                     중앙고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_39e6b6e81e23fec47bf0e7cdef824815 = L.marker(
                [37.505164, 127.1408978],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_39e6b6e81e23fec47bf0e7cdef824815.bindTooltip(
                `&lt;div&gt;
                     거여초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c096001139b303629742f9888f96df77 = L.marker(
                [37.5050993, 126.8490857],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c096001139b303629742f9888f96df77.bindTooltip(
                `&lt;div&gt;
                     세곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cf0d65789df8c537c55ba4e48a2752ec = L.marker(
                [37.5798578, 126.8153271],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cf0d65789df8c537c55ba4e48a2752ec.bindTooltip(
                `&lt;div&gt;
                     치현 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_581524db0a501cb889554bcc8d809b07 = L.marker(
                [37.4893503, 126.894405],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_581524db0a501cb889554bcc8d809b07.bindTooltip(
                `&lt;div&gt;
                     영서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2869f6a57e123649de70f3853775ed39 = L.marker(
                [37.5688553, 127.035735],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2869f6a57e123649de70f3853775ed39.bindTooltip(
                `&lt;div&gt;
                     동명초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_95208a5105e16f629a360861f125e34f = L.marker(
                [37.4940691, 126.9098472],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_95208a5105e16f629a360861f125e34f.bindTooltip(
                `&lt;div&gt;
                     대림감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_992c151cd105cdbb68a3fda4d6133d46 = L.marker(
                [37.5100825, 126.9179782],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_992c151cd105cdbb68a3fda4d6133d46.bindTooltip(
                `&lt;div&gt;
                     영신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1b91f58788a824c056258d947afeda6e = L.marker(
                [37.5006962, 126.8958089],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1b91f58788a824c056258d947afeda6e.bindTooltip(
                `&lt;div&gt;
                     신영초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d1ccb76a6522e3a9a4cfb835a554ed81 = L.marker(
                [37.5373363, 126.870293],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d1ccb76a6522e3a9a4cfb835a554ed81.bindTooltip(
                `&lt;div&gt;
                     정목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6ba0554fc45f9b6db10c7bc8c6df9747 = L.marker(
                [37.534974, 126.9532015],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6ba0554fc45f9b6db10c7bc8c6df9747.bindTooltip(
                `&lt;div&gt;
                     성심여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b97881d2ebff40f769f9100160c4ded4 = L.marker(
                [37.5515947, 126.9451277],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b97881d2ebff40f769f9100160c4ded4.bindTooltip(
                `&lt;div&gt;
                     숭문중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ad7c892f7bb0800af15347b01c720a04 = L.marker(
                [37.5003529, 126.9440991],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ad7c892f7bb0800af15347b01c720a04.bindTooltip(
                `&lt;div&gt;
                     신상도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4edc100d3b7aeae85a336cd9f3781574 = L.marker(
                [37.538875, 126.9577723],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4edc100d3b7aeae85a336cd9f3781574.bindTooltip(
                `&lt;div&gt;
                     도원동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bc973c21e80c1a3f75040bfa36e7bc84 = L.marker(
                [37.5084712, 126.9656204],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bc973c21e80c1a3f75040bfa36e7bc84.bindTooltip(
                `&lt;div&gt;
                     흑석초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8c83b7b388c9adec09fa59e00ae68001 = L.marker(
                [37.4853098, 126.9424573],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8c83b7b388c9adec09fa59e00ae68001.bindTooltip(
                `&lt;div&gt;
                     은천동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_140a23ececa007d27e6cbe561c688500 = L.marker(
                [37.552715, 127.0199849],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_140a23ececa007d27e6cbe561c688500.bindTooltip(
                `&lt;div&gt;
                     금호초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_486385152fc579ebd91e761dccd08420 = L.marker(
                [37.548769, 126.9436862],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_486385152fc579ebd91e761dccd08420.bindTooltip(
                `&lt;div&gt;
                     용강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a412ca753bb8a0f6505c6959ffcf8ce7 = L.marker(
                [37.5811339, 126.9714765],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a412ca753bb8a0f6505c6959ffcf8ce7.bindTooltip(
                `&lt;div&gt;
                     자교교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_db046128da3eaa7b90e54e0491d24088 = L.marker(
                [37.574225, 126.9646777],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_db046128da3eaa7b90e54e0491d24088.bindTooltip(
                `&lt;div&gt;
                     종로문화체육센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1d716efade766afba97edac0ba96b086 = L.marker(
                [37.5762443, 127.0144101],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1d716efade766afba97edac0ba96b086.bindTooltip(
                `&lt;div&gt;
                     창신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4d9a0858db0e0a726e5a0684fe48b331 = L.marker(
                [37.5362084, 126.9881882],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4d9a0858db0e0a726e5a0684fe48b331.bindTooltip(
                `&lt;div&gt;
                     이태원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_45adfacb0e6e2ca56677cd53591f600d = L.marker(
                [37.5777101, 126.9076339],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_45adfacb0e6e2ca56677cd53591f600d.bindTooltip(
                `&lt;div&gt;
                     북가좌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_24495b5aebe9adc9047e28fd4e696651 = L.marker(
                [37.6030314, 127.0142433],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_24495b5aebe9adc9047e28fd4e696651.bindTooltip(
                `&lt;div&gt;
                     정릉교회(교육관)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7e5da2a0393ec0b02dafa7b4038d6ff5 = L.marker(
                [37.587081, 126.9716546],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7e5da2a0393ec0b02dafa7b4038d6ff5.bindTooltip(
                `&lt;div&gt;
                     경복고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9507c27efa50e56fa9d293d6b4670a88 = L.marker(
                [37.605569, 126.968525],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9507c27efa50e56fa9d293d6b4670a88.bindTooltip(
                `&lt;div&gt;
                     서울예술고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_04e876a55f1487640a34024f502bb755 = L.marker(
                [37.5527927, 126.9160894],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_04e876a55f1487640a34024f502bb755.bindTooltip(
                `&lt;div&gt;
                     서현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a6a66efb9ded8859ccc52920c7b2920a = L.marker(
                [37.5238286, 126.9039522],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a6a66efb9ded8859ccc52920c7b2920a.bindTooltip(
                `&lt;div&gt;
                     영중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c401c11302dcc4dcc1b1d66c0f6a848a = L.marker(
                [37.5332365, 126.8929147],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c401c11302dcc4dcc1b1d66c0f6a848a.bindTooltip(
                `&lt;div&gt;
                     선유정보문화도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ba75db2da84fd758cdad8695069eaf17 = L.marker(
                [37.5766667, 127.0060369],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ba75db2da84fd758cdad8695069eaf17.bindTooltip(
                `&lt;div&gt;
                     종로노인종합복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4840af9fab4c26d96bc3ac130c657d81 = L.marker(
                [37.5814717, 127.0341328],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4840af9fab4c26d96bc3ac130c657d81.bindTooltip(
                `&lt;div&gt;
                     성일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_59872726664f0c4e7ea07d85adfe4183 = L.marker(
                [37.541192, 127.0816776],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_59872726664f0c4e7ea07d85adfe4183.bindTooltip(
                `&lt;div&gt;
                     건국대학교부속중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dde704f71427ee95145f7e62a5152bff = L.marker(
                [37.5784972, 127.0576385],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_dde704f71427ee95145f7e62a5152bff.bindTooltip(
                `&lt;div&gt;
                     전농2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5072252d37ed4819ea694c55075bc347 = L.marker(
                [37.588003, 127.0510851],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5072252d37ed4819ea694c55075bc347.bindTooltip(
                `&lt;div&gt;
                     청량중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8aef256354ff5a13fbcd4a43e97f90b6 = L.marker(
                [37.4955666, 127.0564098],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8aef256354ff5a13fbcd4a43e97f90b6.bindTooltip(
                `&lt;div&gt;
                     단대부고체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0466b070463f6bef7dfea4a8f133758d = L.marker(
                [37.491659, 127.14209],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0466b070463f6bef7dfea4a8f133758d.bindTooltip(
                `&lt;div&gt;
                     송파공업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cc2a4b5d81db211976fb71f175fee6a5 = L.marker(
                [37.5450331, 127.1368227],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cc2a4b5d81db211976fb71f175fee6a5.bindTooltip(
                `&lt;div&gt;
                     천호1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c019e0c63bb4bb28b46532432be3a634 = L.marker(
                [37.5233225, 127.0238994],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c019e0c63bb4bb28b46532432be3a634.bindTooltip(
                `&lt;div&gt;
                     신구초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5f0c1c11163c5587ec51e8b0f8dc24ea = L.marker(
                [37.5671689, 126.908768],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5f0c1c11163c5587ec51e8b0f8dc24ea.bindTooltip(
                `&lt;div&gt;
                     샛터경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_98f4a07651ee9e76d2d959abe47e28fd = L.marker(
                [37.592814, 127.0967718],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_98f4a07651ee9e76d2d959abe47e28fd.bindTooltip(
                `&lt;div&gt;
                     혜원여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ce9f6d175d3dba39a2ee67a9999baab5 = L.marker(
                [37.6046427, 127.0140313],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ce9f6d175d3dba39a2ee67a9999baab5.bindTooltip(
                `&lt;div&gt;
                     숭덕초등학교(교사동)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed5d4e0c56df3adfe70481aaa5ec1d8b = L.marker(
                [37.5473127, 126.9768736],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ed5d4e0c56df3adfe70481aaa5ec1d8b.bindTooltip(
                `&lt;div&gt;
                     삼광초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36020294b5753abed0aa4ee701f563a4 = L.marker(
                [37.5333499, 127.1419656],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_36020294b5753abed0aa4ee701f563a4.bindTooltip(
                `&lt;div&gt;
                     둔촌2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b98f796004fafdbff6dfd4c72ef5ce0 = L.marker(
                [37.5978229, 127.065512],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6b98f796004fafdbff6dfd4c72ef5ce0.bindTooltip(
                `&lt;div&gt;
                     이문1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f3fd42b54ff0d7351201cdce0775e479 = L.marker(
                [37.5112094, 127.0459862],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f3fd42b54ff0d7351201cdce0775e479.bindTooltip(
                `&lt;div&gt;
                     삼성2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d5216019d3c4d97e6319b98929b6330 = L.marker(
                [37.5044359, 127.0755624],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6d5216019d3c4d97e6319b98929b6330.bindTooltip(
                `&lt;div&gt;
                     아주중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9727d7aedc3022a1c01b50841c28f8d1 = L.marker(
                [37.5732279, 127.0859972],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9727d7aedc3022a1c01b50841c28f8d1.bindTooltip(
                `&lt;div&gt;
                     중랑청소년수련관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_084fe22ba6c8d50cdedfa9275ba6945b = L.marker(
                [37.5658372, 127.0892944],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_084fe22ba6c8d50cdedfa9275ba6945b.bindTooltip(
                `&lt;div&gt;
                     용곡중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4f7b5b1de91287a2c36055d8038213cb = L.marker(
                [37.5770708, 127.0882851],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4f7b5b1de91287a2c36055d8038213cb.bindTooltip(
                `&lt;div&gt;
                     면남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e78503dd908d97c554993dcc487afb85 = L.marker(
                [37.6324049, 127.0360585],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e78503dd908d97c554993dcc487afb85.bindTooltip(
                `&lt;div&gt;
                     번동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bc3305e14fb79f8a96dff7c850b3b710 = L.marker(
                [37.5010971, 127.1502793],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bc3305e14fb79f8a96dff7c850b3b710.bindTooltip(
                `&lt;div&gt;
                     남천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_20d1a0c5b486e0cfda1c8339ababb744 = L.marker(
                [37.571937, 127.0511789],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_20d1a0c5b486e0cfda1c8339ababb744.bindTooltip(
                `&lt;div&gt;
                     답십리1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fc338639d5e9b16066243f28344fcace = L.marker(
                [37.6100265, 127.046097],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fc338639d5e9b16066243f28344fcace.bindTooltip(
                `&lt;div&gt;
                     월곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_26c3bcaa46f4d1ed6b485dfb9a1832c5 = L.marker(
                [37.4932558, 127.0567995],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_26c3bcaa46f4d1ed6b485dfb9a1832c5.bindTooltip(
                `&lt;div&gt;
                     대치1문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_107a394508c0e5826603a03fb6516c7a = L.marker(
                [37.4910227, 127.1016166],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_107a394508c0e5826603a03fb6516c7a.bindTooltip(
                `&lt;div&gt;
                     수서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9ed4a1dd5f774a58664482269ee0c27a = L.marker(
                [37.5515224, 126.8758771],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9ed4a1dd5f774a58664482269ee0c27a.bindTooltip(
                `&lt;div&gt;
                     염창강변 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_652a490c999a56688f760edf701d80d7 = L.marker(
                [37.5063495, 126.8568307],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_652a490c999a56688f760edf701d80d7.bindTooltip(
                `&lt;div&gt;
                     덕의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7bf2402498e9a635f8c1bcb7143b6cd0 = L.marker(
                [37.4892126, 126.9141494],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7bf2402498e9a635f8c1bcb7143b6cd0.bindTooltip(
                `&lt;div&gt;
                     문창초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7470279da6379a7f9215feb20af37ded = L.marker(
                [37.5404771, 126.8283968],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7470279da6379a7f9215feb20af37ded.bindTooltip(
                `&lt;div&gt;
                     신월중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2314682fdccbd90762b46927738a6c49 = L.marker(
                [37.5491882, 126.8460525],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2314682fdccbd90762b46927738a6c49.bindTooltip(
                `&lt;div&gt;
                     우장초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5fe0a947f5b3b7526f12c2ade9585293 = L.marker(
                [37.5101332, 126.8601557],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5fe0a947f5b3b7526f12c2ade9585293.bindTooltip(
                `&lt;div&gt;
                     계남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f51830f1a03f2997c8d0164edb7a720b = L.marker(
                [37.5304363, 126.8421456],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f51830f1a03f2997c8d0164edb7a720b.bindTooltip(
                `&lt;div&gt;
                     예촌 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b109e9cdceeaa4e72f9b9d389d44ddb9 = L.marker(
                [37.4683134, 126.8941597],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b109e9cdceeaa4e72f9b9d389d44ddb9.bindTooltip(
                `&lt;div&gt;
                     가산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c0b3ef6a96a0220a86f2e09943add2f3 = L.marker(
                [37.5248657, 126.8981321],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c0b3ef6a96a0220a86f2e09943add2f3.bindTooltip(
                `&lt;div&gt;
                     당산천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e23c396f7a9526167e246ddfffd47713 = L.marker(
                [37.5016163, 126.9222769],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e23c396f7a9526167e246ddfffd47713.bindTooltip(
                `&lt;div&gt;
                     서울공업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_13e4243939c03c57880632592167fffd = L.marker(
                [37.5160437, 126.8336364],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_13e4243939c03c57880632592167fffd.bindTooltip(
                `&lt;div&gt;
                     강월초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_90d3a881d6a237de98d30f74616f4c6b = L.marker(
                [37.5127692, 126.8743889],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_90d3a881d6a237de98d30f74616f4c6b.bindTooltip(
                `&lt;div&gt;
                     신목고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e4afe9e6a7cb49a91ae6e418e6bb99f = L.marker(
                [37.5367069, 126.8545682],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0e4afe9e6a7cb49a91ae6e418e6bb99f.bindTooltip(
                `&lt;div&gt;
                     신곡 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c9ddfac7a56bf04f860a1df48110f90a = L.marker(
                [37.5268479, 126.9076599],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c9ddfac7a56bf04f860a1df48110f90a.bindTooltip(
                `&lt;div&gt;
                     영동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_16923c3bc0dcc902134c744de03b1600 = L.marker(
                [37.5383352, 126.8234956],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_16923c3bc0dcc902134c744de03b1600.bindTooltip(
                `&lt;div&gt;
                     양원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3495901ffc01eb73d4f680538c0786b8 = L.marker(
                [37.5311117, 126.8594439],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3495901ffc01eb73d4f680538c0786b8.bindTooltip(
                `&lt;div&gt;
                     화친 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_86a7aafa17b6671674b7cbc417ba6c35 = L.marker(
                [37.5556716, 126.8359438],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_86a7aafa17b6671674b7cbc417ba6c35.bindTooltip(
                `&lt;div&gt;
                     가곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e954590a9f575bdf51cabf0fe02d640e = L.marker(
                [37.5347151, 126.9021023],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e954590a9f575bdf51cabf0fe02d640e.bindTooltip(
                `&lt;div&gt;
                     당산2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4f49d0b45951fe3b3e4a3b6dc3b59fa1 = L.marker(
                [37.6100943, 127.066135],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4f49d0b45951fe3b3e4a3b6dc3b59fa1.bindTooltip(
                `&lt;div&gt;
                     석관고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_42cfefcec0fc36482dedba0cf1856020 = L.marker(
                [37.6524153, 127.068871],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_42cfefcec0fc36482dedba0cf1856020.bindTooltip(
                `&lt;div&gt;
                     상계중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9f0f79a6e2a3ce1a97ec3c8c60d77861 = L.marker(
                [37.5084786, 126.9341598],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9f0f79a6e2a3ce1a97ec3c8c60d77861.bindTooltip(
                `&lt;div&gt;
                     영등포고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7d54eb45db4ea102627138ed4d44a81c = L.marker(
                [37.5470114, 127.1369688],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7d54eb45db4ea102627138ed4d44a81c.bindTooltip(
                `&lt;div&gt;
                     천호초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6675143b59d3878d92872ff210bb13d4 = L.marker(
                [37.5359049, 126.8660078],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6675143b59d3878d92872ff210bb13d4.bindTooltip(
                `&lt;div&gt;
                     영도중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d79e2f6bd7f3b873f4ad0f90cc13d965 = L.marker(
                [37.5009264, 126.8572476],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d79e2f6bd7f3b873f4ad0f90cc13d965.bindTooltip(
                `&lt;div&gt;
                     고척초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cdfb117ba55a6bfd78af7132c6bb0269 = L.marker(
                [37.5481433, 126.8687039],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cdfb117ba55a6bfd78af7132c6bb0269.bindTooltip(
                `&lt;div&gt;
                     양동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cd11b9ca8b39612fd5a2d38acdcb4826 = L.marker(
                [37.5085173, 126.9065702],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cd11b9ca8b39612fd5a2d38acdcb4826.bindTooltip(
                `&lt;div&gt;
                     신길3동구립경로동
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_acabb143ce18e2bb603750db1749e082 = L.marker(
                [37.5226361, 126.8453788],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_acabb143ce18e2bb603750db1749e082.bindTooltip(
                `&lt;div&gt;
                     한민교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccbe4a3f0676970f8ee40d1dd98a27d5 = L.marker(
                [37.6019774, 126.9043788],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ccbe4a3f0676970f8ee40d1dd98a27d5.bindTooltip(
                `&lt;div&gt;
                     덕산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3c14163c317859d50097fa3d44ca0d9a = L.marker(
                [37.4782029, 126.8963861],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3c14163c317859d50097fa3d44ca0d9a.bindTooltip(
                `&lt;div&gt;
                     가산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bdcadb5e9281276cc652a4f8ebeb81e7 = L.marker(
                [37.4995867, 126.8892791],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bdcadb5e9281276cc652a4f8ebeb81e7.bindTooltip(
                `&lt;div&gt;
                     신구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_17c7a1f95d98156b61b6a7931dccd036 = L.marker(
                [37.5264535, 126.8604868],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_17c7a1f95d98156b61b6a7931dccd036.bindTooltip(
                `&lt;div&gt;
                     신정사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3b58690fbc34d69502dc9ee6820128db = L.marker(
                [37.5644753, 127.0835198],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3b58690fbc34d69502dc9ee6820128db.bindTooltip(
                `&lt;div&gt;
                     대원고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_59229d8896db1f1fed93da48322355c7 = L.marker(
                [37.6660552, 127.029165],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_59229d8896db1f1fed93da48322355c7.bindTooltip(
                `&lt;div&gt;
                     서울신방학초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_251f0f2a97cff703e0b739869f2a31f8 = L.marker(
                [37.4998265, 127.0578055],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_251f0f2a97cff703e0b739869f2a31f8.bindTooltip(
                `&lt;div&gt;
                     대치4문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b0f15a545a7dfed3cf80babe36459e92 = L.marker(
                [37.5485021, 127.1011402],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b0f15a545a7dfed3cf80babe36459e92.bindTooltip(
                `&lt;div&gt;
                     서울광장초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b3dea35141899e9dbc6af6946c3b4342 = L.marker(
                [37.5920562, 127.0998384],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b3dea35141899e9dbc6af6946c3b4342.bindTooltip(
                `&lt;div&gt;
                     면일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5fb6af9524c47ed17133119399a27129 = L.marker(
                [37.5073633, 127.1111866],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5fb6af9524c47ed17133119399a27129.bindTooltip(
                `&lt;div&gt;
                     송파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_44f8e85dbcb64add57fd0d0fc6a027cb = L.marker(
                [37.5428856, 127.0792352],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_44f8e85dbcb64add57fd0d0fc6a027cb.bindTooltip(
                `&lt;div&gt;
                     구의중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f6c7149f3fc2ac1bdf0993bcc3cd513 = L.marker(
                [37.6583129, 127.0219836],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3f6c7149f3fc2ac1bdf0993bcc3cd513.bindTooltip(
                `&lt;div&gt;
                     서울초당초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2018a57154c183502aa17c5e245c9e0d = L.marker(
                [37.6656656, 127.0314118],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2018a57154c183502aa17c5e245c9e0d.bindTooltip(
                `&lt;div&gt;
                     방학중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_90ca6d231c0e09e7664232b33d096932 = L.marker(
                [37.5450598, 127.0983593],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_90ca6d231c0e09e7664232b33d096932.bindTooltip(
                `&lt;div&gt;
                     양진중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3585888333a6826be7d7ef6cfa90bc14 = L.marker(
                [37.5572727, 127.0332743],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3585888333a6826be7d7ef6cfa90bc14.bindTooltip(
                `&lt;div&gt;
                     무학여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f2d4a2c69423bc211d5589c9e9494678 = L.marker(
                [37.5508795, 127.0879836],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f2d4a2c69423bc211d5589c9e9494678.bindTooltip(
                `&lt;div&gt;
                     선화예술고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9b3a467757377e6d17ce29259b841698 = L.marker(
                [37.5280392, 127.0437328],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9b3a467757377e6d17ce29259b841698.bindTooltip(
                `&lt;div&gt;
                     청담고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_88d9e0011c687b50427b11d9d69b115b = L.marker(
                [37.4872623, 126.8371987],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_88d9e0011c687b50427b11d9d69b115b.bindTooltip(
                `&lt;div&gt;
                     오남중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ea8192590d0da7cc52ec22750ab9b226 = L.marker(
                [37.5112156, 126.9409405],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ea8192590d0da7cc52ec22750ab9b226.bindTooltip(
                `&lt;div&gt;
                     노량진초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccdeccf1754b090d12726d6dffd4a7ce = L.marker(
                [37.5377434, 126.8959355],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ccdeccf1754b090d12726d6dffd4a7ce.bindTooltip(
                `&lt;div&gt;
                     양평2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65df2e6de9edf3e02a08582ccfe990fa = L.marker(
                [37.631742, 127.0113905],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_65df2e6de9edf3e02a08582ccfe990fa.bindTooltip(
                `&lt;div&gt;
                     유현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e5950f4e1c84ea57b4b35227c3b5fd9 = L.marker(
                [37.5017232, 127.0927534],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0e5950f4e1c84ea57b4b35227c3b5fd9.bindTooltip(
                `&lt;div&gt;
                     삼전초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65f8340a337918f9637bc320b162f35c = L.marker(
                [37.65265, 127.0183509],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_65f8340a337918f9637bc320b162f35c.bindTooltip(
                `&lt;div&gt;
                     효문고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_40be4ff0580204bff99cf39faf45c797 = L.marker(
                [37.5293434, 127.0850088],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_40be4ff0580204bff99cf39faf45c797.bindTooltip(
                `&lt;div&gt;
                     광양고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9df4b09476c8ddb855ffed8a02fe9c46 = L.marker(
                [37.534161, 127.1251979],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9df4b09476c8ddb855ffed8a02fe9c46.bindTooltip(
                `&lt;div&gt;
                     성내동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ffad2dccea4ac04f74c6b4f771fe988f = L.marker(
                [37.6418513, 127.0692587],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ffad2dccea4ac04f74c6b4f771fe988f.bindTooltip(
                `&lt;div&gt;
                     용동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_85f284a0452a8325909b80420aa64a15 = L.marker(
                [37.5527209, 127.1465021],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_85f284a0452a8325909b80420aa64a15.bindTooltip(
                `&lt;div&gt;
                     고명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5933cdca59f2ce856ab0859592c0b74e = L.marker(
                [37.4549744, 126.9049492],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5933cdca59f2ce856ab0859592c0b74e.bindTooltip(
                `&lt;div&gt;
                     시흥초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d3d9a736f2796e060ae2f829dcfa1b90 = L.marker(
                [37.5243318, 126.8480042],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d3d9a736f2796e060ae2f829dcfa1b90.bindTooltip(
                `&lt;div&gt;
                     양강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb55758a92c9ea5384422c0ebc620e18 = L.marker(
                [37.5173028, 126.890644],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bb55758a92c9ea5384422c0ebc620e18.bindTooltip(
                `&lt;div&gt;
                     문래동 성당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1cc02d3c12d64bd53db8bf7541ddd02b = L.marker(
                [37.5080706, 126.9069114],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1cc02d3c12d64bd53db8bf7541ddd02b.bindTooltip(
                `&lt;div&gt;
                     도림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1816ba24f87db2b073bd88d13c67209f = L.marker(
                [37.529648, 126.8407685],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1816ba24f87db2b073bd88d13c67209f.bindTooltip(
                `&lt;div&gt;
                     곰달래 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9813a71790815745a6a588a85acaa675 = L.marker(
                [37.5001732, 126.8892826],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9813a71790815745a6a588a85acaa675.bindTooltip(
                `&lt;div&gt;
                     구로5동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a92967a61a25e8b75ea5475fda3d5e75 = L.marker(
                [37.556548, 127.0346801],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a92967a61a25e8b75ea5475fda3d5e75.bindTooltip(
                `&lt;div&gt;
                     행당초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b092c92dec8a05b0f569ba894c2643c3 = L.marker(
                [37.5229564, 126.9348694],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b092c92dec8a05b0f569ba894c2643c3.bindTooltip(
                `&lt;div&gt;
                     여의도여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7a122e8a11f041b8c92a9b6367a54091 = L.marker(
                [37.4898178, 127.076323],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7a122e8a11f041b8c92a9b6367a54091.bindTooltip(
                `&lt;div&gt;
                     일원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_94665d6e92995c7a84311dd513138741 = L.marker(
                [37.5356176, 126.9725709],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_94665d6e92995c7a84311dd513138741.bindTooltip(
                `&lt;div&gt;
                     용산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0256013dabc208bf46aefaab5954d0c2 = L.marker(
                [37.5171806, 126.8726046],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0256013dabc208bf46aefaab5954d0c2.bindTooltip(
                `&lt;div&gt;
                     신목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_15a123ec20932ae87ee308c8119c48f8 = L.marker(
                [37.5135132, 126.873753],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_15a123ec20932ae87ee308c8119c48f8.bindTooltip(
                `&lt;div&gt;
                     목일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c0dfa857e0ad6ed66b3613d741c12fab = L.marker(
                [37.4805822, 127.0618915],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c0dfa857e0ad6ed66b3613d741c12fab.bindTooltip(
                `&lt;div&gt;
                     개포중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dde50b8a4dfb64d9f9c81d7bce35cd00 = L.marker(
                [37.5479846, 126.9482633],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_dde50b8a4dfb64d9f9c81d7bce35cd00.bindTooltip(
                `&lt;div&gt;
                     서울여자고등학교 (체
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_125576dc283bd19e2d2e15c9edf60493 = L.marker(
                [37.5869435, 127.0626316],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_125576dc283bd19e2d2e15c9edf60493.bindTooltip(
                `&lt;div&gt;
                     휘경중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_60b457ae3126a23df4bd5d28d8dff8c8 = L.marker(
                [37.5195144, 126.895944],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_60b457ae3126a23df4bd5d28d8dff8c8.bindTooltip(
                `&lt;div&gt;
                     양화중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6e3bdb7a2a38d9460312a15cb1bdba24 = L.marker(
                [37.5202512, 127.1108977],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6e3bdb7a2a38d9460312a15cb1bdba24.bindTooltip(
                `&lt;div&gt;
                     잠실초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ece6bf02cd88d5a9ad92d8788dec9aab = L.marker(
                [37.5668755, 126.8160266],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ece6bf02cd88d5a9ad92d8788dec9aab.bindTooltip(
                `&lt;div&gt;
                     일심 경로당2
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd54c8e82f2a1ec14af44bd8c531f5e9 = L.marker(
                [37.5045585, 126.8444526],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bd54c8e82f2a1ec14af44bd8c531f5e9.bindTooltip(
                `&lt;div&gt;
                     매봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_834c60ff88f633e3404b720c84ad2a12 = L.marker(
                [37.5310602, 127.0897244],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_834c60ff88f633e3404b720c84ad2a12.bindTooltip(
                `&lt;div&gt;
                     양남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_546f8fc06c45e8c148ff98b4657fefda = L.marker(
                [37.60333, 127.0942823],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_546f8fc06c45e8c148ff98b4657fefda.bindTooltip(
                `&lt;div&gt;
                     중화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1aecebfc84d42a85b5949cbcf7bf41af = L.marker(
                [37.5677935, 127.0665531],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1aecebfc84d42a85b5949cbcf7bf41af.bindTooltip(
                `&lt;div&gt;
                     장안1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e243f1fb8882eb64a9bc631d678e9a39 = L.marker(
                [37.5585842, 127.1490669],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e243f1fb8882eb64a9bc631d678e9a39.bindTooltip(
                `&lt;div&gt;
                     시영경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a71fcfb3784eee3bae7379ef2a55ea46 = L.marker(
                [37.5462225, 126.8797749],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a71fcfb3784eee3bae7379ef2a55ea46.bindTooltip(
                `&lt;div&gt;
                     구립용왕경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6e0b277270e036ffb26785f84f368df4 = L.marker(
                [37.5876999, 126.9448951],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6e0b277270e036ffb26785f84f368df4.bindTooltip(
                `&lt;div&gt;
                     홍제1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f81221f83af6afbdc512eb455893996e = L.marker(
                [37.5514658, 127.1326698],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f81221f83af6afbdc512eb455893996e.bindTooltip(
                `&lt;div&gt;
                     암사1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5bceda05c8c58b61663fd8daeb6b7693 = L.marker(
                [37.5818448, 126.91075],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5bceda05c8c58b61663fd8daeb6b7693.bindTooltip(
                `&lt;div&gt;
                     충신교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b3408953e5556b2d3e8eebd634a1b0f = L.marker(
                [37.5448609, 126.9139085],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5b3408953e5556b2d3e8eebd634a1b0f.bindTooltip(
                `&lt;div&gt;
                     마리스타교육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_42b010fb8e42ffd0aad009da2d51b2ff = L.marker(
                [37.5099704, 126.9206879],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_42b010fb8e42ffd0aad009da2d51b2ff.bindTooltip(
                `&lt;div&gt;
                     구립창신경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6a155b2cf33f2721bbf6eb75a78a1a62 = L.marker(
                [37.5775087, 126.9669392],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6a155b2cf33f2721bbf6eb75a78a1a62.bindTooltip(
                `&lt;div&gt;
                     매동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_28db51aeb5d375807cf321c150b48849 = L.marker(
                [37.5518833, 126.8550582],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_28db51aeb5d375807cf321c150b48849.bindTooltip(
                `&lt;div&gt;
                     등서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_61d73064dcb88506ffac003d4d284324 = L.marker(
                [37.536006, 126.8507829],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_61d73064dcb88506ffac003d4d284324.bindTooltip(
                `&lt;div&gt;
                     안골 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3ee418fd7703cacd0e4d4f7ff37821d0 = L.marker(
                [37.5258547, 126.8512654],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3ee418fd7703cacd0e4d4f7ff37821d0.bindTooltip(
                `&lt;div&gt;
                     양동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_638bbd5532bec58aa347f7168543b55e = L.marker(
                [37.5803467, 126.9231625],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_638bbd5532bec58aa347f7168543b55e.bindTooltip(
                `&lt;div&gt;
                     명지대방목학술정보관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0ae645fc187f9917ee484f77e2b20c1f = L.marker(
                [37.5927763, 126.9517221],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0ae645fc187f9917ee484f77e2b20c1f.bindTooltip(
                `&lt;div&gt;
                     인왕중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed28ba5fe50112b33b3bbcb6ea25283c = L.marker(
                [37.5516106, 126.8379309],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ed28ba5fe50112b33b3bbcb6ea25283c.bindTooltip(
                `&lt;div&gt;
                     내발산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1064a9a104fc8b28df81cb3aef0e233a = L.marker(
                [37.5821284, 126.9218074],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1064a9a104fc8b28df81cb3aef0e233a.bindTooltip(
                `&lt;div&gt;
                     삼오경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2b4a48b9d265833aea0e907d72fd353c = L.marker(
                [37.5428831, 126.8899568],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2b4a48b9d265833aea0e907d72fd353c.bindTooltip(
                `&lt;div&gt;
                     구립양화경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a4aae9dc443d722d9447039e4258c06f = L.marker(
                [37.5749875, 126.9881341],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a4aae9dc443d722d9447039e4258c06f.bindTooltip(
                `&lt;div&gt;
                     교동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_691348767075f753700087b0b8a369ab = L.marker(
                [37.495335, 127.033256],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_691348767075f753700087b0b8a369ab.bindTooltip(
                `&lt;div&gt;
                     역삼1동문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a8233aa5721a4e5cde4e6b872f8aedb = L.marker(
                [37.5224143, 126.8409982],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8a8233aa5721a4e5cde4e6b872f8aedb.bindTooltip(
                `&lt;div&gt;
                     강서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dd3ef0440c0a2c1d341732061aee0e11 = L.marker(
                [37.5725204, 126.8198968],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_dd3ef0440c0a2c1d341732061aee0e11.bindTooltip(
                `&lt;div&gt;
                     동부 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5e10eea8de0824001c46f8bf9f36a4ed = L.marker(
                [37.526241, 127.1372817],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5e10eea8de0824001c46f8bf9f36a4ed.bindTooltip(
                `&lt;div&gt;
                     둔촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6567aba56942f409378895f6af01bbc7 = L.marker(
                [37.5628192, 127.0888117],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6567aba56942f409378895f6af01bbc7.bindTooltip(
                `&lt;div&gt;
                     대원여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_368f04f7b036d59486f1531e9c1baee9 = L.marker(
                [37.651165, 127.0805707],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_368f04f7b036d59486f1531e9c1baee9.bindTooltip(
                `&lt;div&gt;
                     불암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d5351c8876dcc6164c927c847e118a14 = L.marker(
                [37.5467561, 127.1395344],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d5351c8876dcc6164c927c847e118a14.bindTooltip(
                `&lt;div&gt;
                     천호중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_69254fa2e7bd31350988b08e489d42be = L.marker(
                [37.53151, 127.122673],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_69254fa2e7bd31350988b08e489d42be.bindTooltip(
                `&lt;div&gt;
                     성내초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e3fb3601ff712a1317fa5c366ddf7a9 = L.marker(
                [37.5913201, 127.0876996],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0e3fb3601ff712a1317fa5c366ddf7a9.bindTooltip(
                `&lt;div&gt;
                     면목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0420814c75aa360cc6c677ed99fe22b6 = L.marker(
                [37.5282805, 127.0451616],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0420814c75aa360cc6c677ed99fe22b6.bindTooltip(
                `&lt;div&gt;
                     청담초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56dc747d3a1154c7cc34b8fd9cb39a6c = L.marker(
                [37.6489712, 127.0244052],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_56dc747d3a1154c7cc34b8fd9cb39a6c.bindTooltip(
                `&lt;div&gt;
                     서울쌍문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3e87834387fba6ac28640033959b0a1a = L.marker(
                [37.5895902, 127.0755697],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3e87834387fba6ac28640033959b0a1a.bindTooltip(
                `&lt;div&gt;
                     중랑초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4862d71858b216699cbffed76c0ad6fc = L.marker(
                [37.6193069, 127.0742531],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4862d71858b216699cbffed76c0ad6fc.bindTooltip(
                `&lt;div&gt;
                     공릉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6c013c8d306c4760683f8334c25ae990 = L.marker(
                [37.5649828, 127.1740361],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6c013c8d306c4760683f8334c25ae990.bindTooltip(
                `&lt;div&gt;
                     강일동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2b88747cae321b7ab0cfcacef2eda4d7 = L.marker(
                [37.5590548, 127.1489198],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2b88747cae321b7ab0cfcacef2eda4d7.bindTooltip(
                `&lt;div&gt;
                     고덕1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_848e11b2217dc1e52587a46694c3d95b = L.marker(
                [37.5854269, 127.0863636],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_848e11b2217dc1e52587a46694c3d95b.bindTooltip(
                `&lt;div&gt;
                     면동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1862f85dcfe285b1f1d55b25293341a7 = L.marker(
                [37.5843988, 127.0972465],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1862f85dcfe285b1f1d55b25293341a7.bindTooltip(
                `&lt;div&gt;
                     면목고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e1f985ea5283abbb83186804f40da0f9 = L.marker(
                [37.5190795, 126.8402446],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e1f985ea5283abbb83186804f40da0f9.bindTooltip(
                `&lt;div&gt;
                     한빛사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c90f7326c36c619ef1c24fc01d59bf49 = L.marker(
                [37.601554, 127.0901155],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c90f7326c36c619ef1c24fc01d59bf49.bindTooltip(
                `&lt;div&gt;
                     상봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_164dfebcd4778d59e78456fa3a1caafb = L.marker(
                [37.5095526, 127.1210955],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_164dfebcd4778d59e78456fa3a1caafb.bindTooltip(
                `&lt;div&gt;
                     방산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3b403d604ec7eefd07e3e5b924f3b724 = L.marker(
                [37.4884324, 127.1302549],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3b403d604ec7eefd07e3e5b924f3b724.bindTooltip(
                `&lt;div&gt;
                     문정중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed1ad45977e1d444ea9bfa18c9a7fc4e = L.marker(
                [37.5531674, 126.9090747],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ed1ad45977e1d444ea9bfa18c9a7fc4e.bindTooltip(
                `&lt;div&gt;
                     희우경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_78a1018de5cc4fe5a12ad9a707c51499 = L.marker(
                [37.5516092, 127.1655314],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_78a1018de5cc4fe5a12ad9a707c51499.bindTooltip(
                `&lt;div&gt;
                     상일동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ea29822900b431b5364bdcae1d578254 = L.marker(
                [37.5410007, 127.1500551],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ea29822900b431b5364bdcae1d578254.bindTooltip(
                `&lt;div&gt;
                     신명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_64aaa613b71b9c4ca7733d3ef87a9a21 = L.marker(
                [37.5203992, 126.9107094],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_64aaa613b71b9c4ca7733d3ef87a9a21.bindTooltip(
                `&lt;div&gt;
                     영등포동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8f4c13cec85b9ab19e08af08b9904c16 = L.marker(
                [37.5099053, 126.9118456],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8f4c13cec85b9ab19e08af08b9904c16.bindTooltip(
                `&lt;div&gt;
                     우신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35c9fa911a7e67b80935a01568d10022 = L.marker(
                [37.5476094, 126.8578108],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_35c9fa911a7e67b80935a01568d10022.bindTooltip(
                `&lt;div&gt;
                     등촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f4f6ce6ee1ac7f0e26f07effe18d5037 = L.marker(
                [37.547738, 126.9732429],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f4f6ce6ee1ac7f0e26f07effe18d5037.bindTooltip(
                `&lt;div&gt;
                     용산교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c0b677abb40e9cc22dc17794200d1b0f = L.marker(
                [37.5593457, 126.9517835],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c0b677abb40e9cc22dc17794200d1b0f.bindTooltip(
                `&lt;div&gt;
                     북성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d1fa70f92c39c4a1b34f23c177b2976f = L.marker(
                [37.5572274, 126.960287],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d1fa70f92c39c4a1b34f23c177b2976f.bindTooltip(
                `&lt;div&gt;
                     서울제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb68eaabe371a4ad60816a89dc8a65c2 = L.marker(
                [37.6029767, 127.0403982],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bb68eaabe371a4ad60816a89dc8a65c2.bindTooltip(
                `&lt;div&gt;
                     월곡감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b891fe839a2e27b52ecdf3db354d381b = L.marker(
                [37.592688, 126.9442854],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b891fe839a2e27b52ecdf3db354d381b.bindTooltip(
                `&lt;div&gt;
                     홍제초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_945d9bcc72849856ee2466208d0eb3de = L.marker(
                [37.5688794, 127.0554779],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_945d9bcc72849856ee2466208d0eb3de.bindTooltip(
                `&lt;div&gt;
                     답십리초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2cb42c4e27484328ee399153782bbb3d = L.marker(
                [37.5202766, 126.9764757],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2cb42c4e27484328ee399153782bbb3d.bindTooltip(
                `&lt;div&gt;
                     신용산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1d2602d0f5d6e4f3831c0201d654ce7d = L.marker(
                [37.5466468, 126.859924],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1d2602d0f5d6e4f3831c0201d654ce7d.bindTooltip(
                `&lt;div&gt;
                     능안 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_865b97c5a507138a4120d71071ce0ce2 = L.marker(
                [37.550538, 126.9081484],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_865b97c5a507138a4120d71071ce0ce2.bindTooltip(
                `&lt;div&gt;
                     성산성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d544d9913dc12b310650e14b5ac94154 = L.marker(
                [37.566879, 126.911639],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d544d9913dc12b310650e14b5ac94154.bindTooltip(
                `&lt;div&gt;
                     서울중동초(정보관2층 다목적실)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0a3f3c0147138ce7f1e741e4e5014aaa = L.marker(
                [37.5928368, 126.9120055],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0a3f3c0147138ce7f1e741e4e5014aaa.bindTooltip(
                `&lt;div&gt;
                     신사초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b00045a4b7e50cc5e95c973cf42de092 = L.marker(
                [37.5392322, 127.1462094],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b00045a4b7e50cc5e95c973cf42de092.bindTooltip(
                `&lt;div&gt;
                     길 동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2df07ae4f3f7294e68c9a84b11383cf7 = L.marker(
                [37.5367691, 126.8413967],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2df07ae4f3f7294e68c9a84b11383cf7.bindTooltip(
                `&lt;div&gt;
                     까치산 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c407d8952ca1e1df04f43a63c5eb5a7a = L.marker(
                [37.5301177, 126.8537711],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c407d8952ca1e1df04f43a63c5eb5a7a.bindTooltip(
                `&lt;div&gt;
                     하마터 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ae61ac4e63e0285eea74098ef615135 = L.marker(
                [37.5759837, 126.958142],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4ae61ac4e63e0285eea74098ef615135.bindTooltip(
                `&lt;div&gt;
                     무악동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f355e2dfb91108f5dd8229853c7fd698 = L.marker(
                [37.4895328, 126.9242737],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f355e2dfb91108f5dd8229853c7fd698.bindTooltip(
                `&lt;div&gt;
                     월드비전교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e8ebc152fc6170074dccb3f9422eb105 = L.marker(
                [37.57989, 126.985687],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e8ebc152fc6170074dccb3f9422eb105.bindTooltip(
                `&lt;div&gt;
                     재동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_527e58d4fd2408cb9247c33194356265 = L.marker(
                [37.5404771, 126.9925577],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_527e58d4fd2408cb9247c33194356265.bindTooltip(
                `&lt;div&gt;
                     북부경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c2963bfdbdbeb5e29c4c6f2bf5164baf = L.marker(
                [37.5498184, 127.0868094],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c2963bfdbdbeb5e29c4c6f2bf5164baf.bindTooltip(
                `&lt;div&gt;
                     경복초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_33f3d2a0c4cf4c8039ace2a42f1ca64e = L.marker(
                [37.651461, 127.0166893],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_33f3d2a0c4cf4c8039ace2a42f1ca64e.bindTooltip(
                `&lt;div&gt;
                     덕성여자대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_09ca704b301e37ea357b67355dfcd016 = L.marker(
                [37.6045778, 127.0836716],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_09ca704b301e37ea357b67355dfcd016.bindTooltip(
                `&lt;div&gt;
                     중화고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3492ea9ea28dd60b86e5ae35cc4f9bf2 = L.marker(
                [37.5779753, 127.0477473],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3492ea9ea28dd60b86e5ae35cc4f9bf2.bindTooltip(
                `&lt;div&gt;
                     전농1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f93510dddae245c5f663dca677fc6314 = L.marker(
                [37.6327676, 127.0410585],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f93510dddae245c5f663dca677fc6314.bindTooltip(
                `&lt;div&gt;
                     서울신화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_677bb17a544d0ce5bc39ab2270f7accf = L.marker(
                [37.5830681, 127.0965898],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_677bb17a544d0ce5bc39ab2270f7accf.bindTooltip(
                `&lt;div&gt;
                     면목중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e35522cdb1009b36fd96f70ae85f1877 = L.marker(
                [37.5827189, 127.0167373],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e35522cdb1009b36fd96f70ae85f1877.bindTooltip(
                `&lt;div&gt;
                     동신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5de1c0b790f500a9f779c503f1dc4fed = L.marker(
                [37.5466977, 126.9123948],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5de1c0b790f500a9f779c503f1dc4fed.bindTooltip(
                `&lt;div&gt;
                     양화진경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b6e596574da4950b755eb358a85da43 = L.marker(
                [37.5393765, 127.0048805],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8b6e596574da4950b755eb358a85da43.bindTooltip(
                `&lt;div&gt;
                     한남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_912d755eea8d4e6df718c4a2938d8542 = L.marker(
                [37.536781, 127.13311],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_912d755eea8d4e6df718c4a2938d8542.bindTooltip(
                `&lt;div&gt;
                     동신중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3546c62220f77e900b6fd5428956faef = L.marker(
                [37.5745689, 127.0515154],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3546c62220f77e900b6fd5428956faef.bindTooltip(
                `&lt;div&gt;
                     동대문중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5d2375b44dd5908565d7fa37058cf69a = L.marker(
                [37.4841727, 126.9095481],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5d2375b44dd5908565d7fa37058cf69a.bindTooltip(
                `&lt;div&gt;
                     서울조원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8e720673bcc15e17aac070cb79ab9137 = L.marker(
                [37.5653655, 126.9642416],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8e720673bcc15e17aac070cb79ab9137.bindTooltip(
                `&lt;div&gt;
                     인창중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_02d6860d41e9af209a314a85e53107d6 = L.marker(
                [37.5426007, 127.1207594],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_02d6860d41e9af209a314a85e53107d6.bindTooltip(
                `&lt;div&gt;
                     천호2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_384326954b00995f3a6a24bbe9f197db = L.marker(
                [37.5442532, 127.0985423],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_384326954b00995f3a6a24bbe9f197db.bindTooltip(
                `&lt;div&gt;
                     양진초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5ae32a123610d20419bcae789267bbc5 = L.marker(
                [37.5628448, 126.9091181],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5ae32a123610d20419bcae789267bbc5.bindTooltip(
                `&lt;div&gt;
                     성서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0565fd74118e4731f9b5abef57ac1cff = L.marker(
                [37.4930758, 126.9155706],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0565fd74118e4731f9b5abef57ac1cff.bindTooltip(
                `&lt;div&gt;
                     수도여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d691b4ddcde3eee19ad1a51439c159b2 = L.marker(
                [37.4759283, 126.9606291],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d691b4ddcde3eee19ad1a51439c159b2.bindTooltip(
                `&lt;div&gt;
                     인헌초등학교체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccf727f648efb2f6f4848dd897fafb07 = L.marker(
                [37.5437613, 126.8753459],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ccf727f648efb2f6f4848dd897fafb07.bindTooltip(
                `&lt;div&gt;
                     양화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5717a47809d0d10af862aed1450270ee = L.marker(
                [37.5129485, 126.8982736],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5717a47809d0d10af862aed1450270ee.bindTooltip(
                `&lt;div&gt;
                     영등포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_62394b3e58de081db2418246c474a250 = L.marker(
                [37.4872461, 126.9878564],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_62394b3e58de081db2418246c474a250.bindTooltip(
                `&lt;div&gt;
                     서울 방배 초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6f3e3eb246940616db5d2ab4172d3d6a = L.marker(
                [37.5693319, 126.930827],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6f3e3eb246940616db5d2ab4172d3d6a.bindTooltip(
                `&lt;div&gt;
                     연희동자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b06fe74ca60a0e62f4f630f1a336c9e9 = L.marker(
                [37.5761802, 126.8921946],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b06fe74ca60a0e62f4f630f1a336c9e9.bindTooltip(
                `&lt;div&gt;
                     상암초등학교 (체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9e2fde2784ba843e26fa52d81f539b95 = L.marker(
                [37.5130079, 126.9150892],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9e2fde2784ba843e26fa52d81f539b95.bindTooltip(
                `&lt;div&gt;
                     장훈고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5550cc938f24e96599a466ae5c4ccb6e = L.marker(
                [37.4922269, 126.9070193],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5550cc938f24e96599a466ae5c4ccb6e.bindTooltip(
                `&lt;div&gt;
                     대림중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1da4c2a30f0c45fee1b5156d3103bc2c = L.marker(
                [37.4958165, 126.9223506],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1da4c2a30f0c45fee1b5156d3103bc2c.bindTooltip(
                `&lt;div&gt;
                     문창중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_75209a073ee2ac7fd67de1a30c5fb465 = L.marker(
                [37.543197, 127.077444],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_75209a073ee2ac7fd67de1a30c5fb465.bindTooltip(
                `&lt;div&gt;
                     건국대학교 사범대학
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_26bed8f8326e8d731e6058f46a444b58 = L.marker(
                [37.4736571, 126.9766545],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_26bed8f8326e8d731e6058f46a444b58.bindTooltip(
                `&lt;div&gt;
                     상록보육원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ab75ed4f4cb3b059e761ebc3fc52d5bd = L.marker(
                [37.5457403, 126.8516996],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ab75ed4f4cb3b059e761ebc3fc52d5bd.bindTooltip(
                `&lt;div&gt;
                     봉제 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fdca634993972f24a00e1c37b710585f = L.marker(
                [37.5252916, 126.8900051],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fdca634993972f24a00e1c37b710585f.bindTooltip(
                `&lt;div&gt;
                     영은교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a7b3df4f4f881b9b8c06bfab8aa3d35 = L.marker(
                [37.5105206, 126.9014245],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8a7b3df4f4f881b9b8c06bfab8aa3d35.bindTooltip(
                `&lt;div&gt;
                     도림천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_001d04cf88e8e68035bfa3f6e94e56e1 = L.marker(
                [37.5017643, 126.9054364],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_001d04cf88e8e68035bfa3f6e94e56e1.bindTooltip(
                `&lt;div&gt;
                     구립신길5동제2경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2a51803514e8992f71b9e2a25db9b811 = L.marker(
                [37.5064521, 126.9213962],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2a51803514e8992f71b9e2a25db9b811.bindTooltip(
                `&lt;div&gt;
                     신길7제1구립노인정
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_abd6f4baaa9f2c7ac58a55237be8e78b = L.marker(
                [37.5250013, 126.8973782],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_abd6f4baaa9f2c7ac58a55237be8e78b.bindTooltip(
                `&lt;div&gt;
                     당산1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f1cbeb2ac4cf1914c1068e838e09fe28 = L.marker(
                [37.4797795, 126.9313905],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f1cbeb2ac4cf1914c1068e838e09fe28.bindTooltip(
                `&lt;div&gt;
                     서원동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_705804e9272118fa6de63e22927f11b5 = L.marker(
                [37.5469717, 126.947995],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_705804e9272118fa6de63e22927f11b5.bindTooltip(
                `&lt;div&gt;
                     서울디자인고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a2c78f4b61eda1900f54ea094c2113c2 = L.marker(
                [37.4928824, 127.1230627],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a2c78f4b61eda1900f54ea094c2113c2.bindTooltip(
                `&lt;div&gt;
                     주영광교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_029264f05bc15507cc54e1d997d34c1a = L.marker(
                [37.5793116, 127.0130043],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_029264f05bc15507cc54e1d997d34c1a.bindTooltip(
                `&lt;div&gt;
                     서일정보산업고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a989de07aa46623aa1cdf71185ca0e87 = L.marker(
                [37.5656254, 126.9950263],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a989de07aa46623aa1cdf71185ca0e87.bindTooltip(
                `&lt;div&gt;
                     을지교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_60cea3de3e9e1111402410db9c8a1d1d = L.marker(
                [37.5861335, 127.0393853],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_60cea3de3e9e1111402410db9c8a1d1d.bindTooltip(
                `&lt;div&gt;
                     홍파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f6d8390e4cac7904ffcaf2c2b089e6ff = L.marker(
                [37.481173, 126.9093917],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f6d8390e4cac7904ffcaf2c2b089e6ff.bindTooltip(
                `&lt;div&gt;
                     조원동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_85fa939ddb43069fbea5eba49e1b88b7 = L.marker(
                [37.577914, 126.810894],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_85fa939ddb43069fbea5eba49e1b88b7.bindTooltip(
                `&lt;div&gt;
                     방화6복지관 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1c085b4e534626c9f4cc01a4ae78cae1 = L.marker(
                [37.5247969, 126.8494272],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1c085b4e534626c9f4cc01a4ae78cae1.bindTooltip(
                `&lt;div&gt;
                     양강중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3da7fe45b378420986ccced47a44c674 = L.marker(
                [37.5472562, 127.1528011],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3da7fe45b378420986ccced47a44c674.bindTooltip(
                `&lt;div&gt;
                     대명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65a6f5671b8b79b5124346d557e84ec2 = L.marker(
                [37.520365, 126.8847002],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_65a6f5671b8b79b5124346d557e84ec2.bindTooltip(
                `&lt;div&gt;
                     문래중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b9c16a3def2b9904a338f8829af2f277 = L.marker(
                [37.5250278, 126.8887421],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b9c16a3def2b9904a338f8829af2f277.bindTooltip(
                `&lt;div&gt;
                     양평1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eeed90e3cee690a0c728f79d9aaba322 = L.marker(
                [37.5469102, 126.8229474],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_eeed90e3cee690a0c728f79d9aaba322.bindTooltip(
                `&lt;div&gt;
                     신광명 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b1b2a57579b456779b09dbc3e4bcb394 = L.marker(
                [37.4952572, 126.8925095],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b1b2a57579b456779b09dbc3e4bcb394.bindTooltip(
                `&lt;div&gt;
                     동구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_27277bc1f09cca2c9a1335a1ad9e2da8 = L.marker(
                [37.6110156, 127.0589586],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_27277bc1f09cca2c9a1335a1ad9e2da8.bindTooltip(
                `&lt;div&gt;
                     석관초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_453a3c2ee47418ac8d67a4aebbd0c4d9 = L.marker(
                [37.5331928, 126.8562488],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_453a3c2ee47418ac8d67a4aebbd0c4d9.bindTooltip(
                `&lt;div&gt;
                     골안말 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2fc82c473f6b8d3cfb7522f7848d297e = L.marker(
                [37.5411296, 126.8485221],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2fc82c473f6b8d3cfb7522f7848d297e.bindTooltip(
                `&lt;div&gt;
                     초록동 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2d4af37ea7fe7ec3cd8fc8a92a5fbf5d = L.marker(
                [37.5349407, 126.903985],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2d4af37ea7fe7ec3cd8fc8a92a5fbf5d.bindTooltip(
                `&lt;div&gt;
                     구립당산2동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_db5dd050ecb58d3778b987ed227a91ef = L.marker(
                [37.5937228, 127.0127754],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_db5dd050ecb58d3778b987ed227a91ef.bindTooltip(
                `&lt;div&gt;
                     돈암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b914efaea81241b791c9f073550127e8 = L.marker(
                [37.4716608, 127.0266742],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b914efaea81241b791c9f073550127e8.bindTooltip(
                `&lt;div&gt;
                     양재1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36011246b5338725ab29e353e41caf7a = L.marker(
                [37.5191032, 127.0464651],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_36011246b5338725ab29e353e41caf7a.bindTooltip(
                `&lt;div&gt;
                     청담2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_18cf4f21d14b59139f9a8833d86ff070 = L.marker(
                [37.5820771, 126.930903],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_18cf4f21d14b59139f9a8833d86ff070.bindTooltip(
                `&lt;div&gt;
                     홍연초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f387b1f6775eb0446c4edd355f402640 = L.marker(
                [37.5743163, 126.9599977],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f387b1f6775eb0446c4edd355f402640.bindTooltip(
                `&lt;div&gt;
                     독립문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ea6ba9ee56e88b7ba5a6d81049d90597 = L.marker(
                [37.6446448, 127.0199054],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ea6ba9ee56e88b7ba5a6d81049d90597.bindTooltip(
                `&lt;div&gt;
                     수유2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_084e5c74194831b12bf0fbd80c5cdded = L.marker(
                [37.5462875, 127.1300447],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_084e5c74194831b12bf0fbd80c5cdded.bindTooltip(
                `&lt;div&gt;
                     강동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_08806588ab0c259ef3efb7adb5db89af = L.marker(
                [37.5501539, 127.1305587],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_08806588ab0c259ef3efb7adb5db89af.bindTooltip(
                `&lt;div&gt;
                     신흥교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bf7e526d253acfb59952f9f92308603d = L.marker(
                [37.5553676, 127.1383735],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bf7e526d253acfb59952f9f92308603d.bindTooltip(
                `&lt;div&gt;
                     강일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0cb50e199403ed101a778906a96e907b = L.marker(
                [37.5077695, 126.8805967],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0cb50e199403ed101a778906a96e907b.bindTooltip(
                `&lt;div&gt;
                     신도림동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_743def280090a2a7c7e702c3b2f53cc6 = L.marker(
                [37.4916016, 126.8891664],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_743def280090a2a7c7e702c3b2f53cc6.bindTooltip(
                `&lt;div&gt;
                     구로4동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_67ee44ccf8c47914e4775591c99cedce = L.marker(
                [37.4760768, 126.9420518],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_67ee44ccf8c47914e4775591c99cedce.bindTooltip(
                `&lt;div&gt;
                     서광경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d028f7adbb688fe4a70a32cfa799786 = L.marker(
                [37.6510435, 127.0385877],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6d028f7adbb688fe4a70a32cfa799786.bindTooltip(
                `&lt;div&gt;
                     창동고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e45873ae7b1efcc0241f18b67aca1068 = L.marker(
                [37.6564921, 127.0358902],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e45873ae7b1efcc0241f18b67aca1068.bindTooltip(
                `&lt;div&gt;
                     백운중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f7057b77c2e9420015766f11ebf12cdf = L.marker(
                [37.5898762, 126.9184633],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f7057b77c2e9420015766f11ebf12cdf.bindTooltip(
                `&lt;div&gt;
                     응암감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f8c2580e1926b4b610c29b01de2333a2 = L.marker(
                [37.4789456, 126.9724434],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f8c2580e1926b4b610c29b01de2333a2.bindTooltip(
                `&lt;div&gt;
                     남성중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b07c13009e2ac2ed60c021eb30cf66d = L.marker(
                [37.5235333, 126.9995931],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6b07c13009e2ac2ed60c021eb30cf66d.bindTooltip(
                `&lt;div&gt;
                     오산고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1b728e4280fc8c647dbb0c70c0f9314b = L.marker(
                [37.5430897, 126.9842846],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1b728e4280fc8c647dbb0c70c0f9314b.bindTooltip(
                `&lt;div&gt;
                     보성여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5ce2ea21809cec3b435e542a07426112 = L.marker(
                [37.55457, 126.9150014],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5ce2ea21809cec3b435e542a07426112.bindTooltip(
                `&lt;div&gt;
                     서교감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4114fb9039bce4458959ba40b0eccb4b = L.marker(
                [37.615709, 127.0233496],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4114fb9039bce4458959ba40b0eccb4b.bindTooltip(
                `&lt;div&gt;
                     송천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0af32b0618d84048ec93ab117aa0a19f = L.marker(
                [37.4880655, 126.979165],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0af32b0618d84048ec93ab117aa0a19f.bindTooltip(
                `&lt;div&gt;
                     남일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8252c76b48fd404bb293df0038d71440 = L.marker(
                [37.5766446, 126.9834942],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8252c76b48fd404bb293df0038d71440.bindTooltip(
                `&lt;div&gt;
                     풍문여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca74e5d50d89f9fce508e6b91c308ce4 = L.marker(
                [37.5730679, 127.0030669],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ca74e5d50d89f9fce508e6b91c308ce4.bindTooltip(
                `&lt;div&gt;
                     효제초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9c2630b316ac1bf08baeec6fd636c072 = L.marker(
                [37.5536804, 126.9493416],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9c2630b316ac1bf08baeec6fd636c072.bindTooltip(
                `&lt;div&gt;
                     한서초등학교 (강당)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_157b2d2accb59c9158ef49ff2c6a1019 = L.marker(
                [37.5439769, 127.1225563],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_157b2d2accb59c9158ef49ff2c6a1019.bindTooltip(
                `&lt;div&gt;
                     천호동중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_32f5eec79416a255314b57efb88b4b25 = L.marker(
                [37.4836201, 127.0327209],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_32f5eec79416a255314b57efb88b4b25.bindTooltip(
                `&lt;div&gt;
                     서초구청
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_80520e1078728c681f1afd6940d50bcf = L.marker(
                [37.6036604, 127.0272595],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_80520e1078728c681f1afd6940d50bcf.bindTooltip(
                `&lt;div&gt;
                     영암교회(교회당)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_998ded2f646d1f497185cfe695ad8e5c = L.marker(
                [37.6134771, 127.0364498],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_998ded2f646d1f497185cfe695ad8e5c.bindTooltip(
                `&lt;div&gt;
                     창문여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0417f71de97fec1b4c3826e1e1b498e6 = L.marker(
                [37.4888087, 126.8395008],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0417f71de97fec1b4c3826e1e1b498e6.bindTooltip(
                `&lt;div&gt;
                     오류2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_260536b3782df22798611011375abc0a = L.marker(
                [37.5002418, 126.8281915],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_260536b3782df22798611011375abc0a.bindTooltip(
                `&lt;div&gt;
                     구로여자정보산업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_88d45f0ce1d545c86366e22af1edcf79 = L.marker(
                [37.5636685, 127.0891173],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_88d45f0ce1d545c86366e22af1edcf79.bindTooltip(
                `&lt;div&gt;
                     대원외국어고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_274e0969db18a3bedcc39f107f78d43b = L.marker(
                [37.529664, 127.1455339],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_274e0969db18a3bedcc39f107f78d43b.bindTooltip(
                `&lt;div&gt;
                     선린초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd6f6254409edbb4c0810912532fd50f = L.marker(
                [37.5836674, 126.9041368],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bd6f6254409edbb4c0810912532fd50f.bindTooltip(
                `&lt;div&gt;
                     증산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ed91ffa8463aea43cc5f65ae55703e6 = L.marker(
                [37.524253, 126.8671099],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4ed91ffa8463aea43cc5f65ae55703e6.bindTooltip(
                `&lt;div&gt;
                     서정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e293359bd6e892fba4feee95c045841c = L.marker(
                [37.588561, 126.9699284],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e293359bd6e892fba4feee95c045841c.bindTooltip(
                `&lt;div&gt;
                     경기상업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f1cf1a0e0bddb4cad4d5965eb5c0ba01 = L.marker(
                [37.6088175, 127.0247734],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f1cf1a0e0bddb4cad4d5965eb5c0ba01.bindTooltip(
                `&lt;div&gt;
                     길음 종합사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6c75ca0b07ab0358bf05ae252b5aeefe = L.marker(
                [37.6235791, 127.0121687],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6c75ca0b07ab0358bf05ae252b5aeefe.bindTooltip(
                `&lt;div&gt;
                     미양중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2af3250ca20c2293344d65e9c6ce55c1 = L.marker(
                [37.5479867, 126.9643143],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2af3250ca20c2293344d65e9c6ce55c1.bindTooltip(
                `&lt;div&gt;
                     청파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7f8c52302a23ef61dd4471d9a9fca31d = L.marker(
                [37.5632638, 127.0295628],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7f8c52302a23ef61dd4471d9a9fca31d.bindTooltip(
                `&lt;div&gt;
                     무학초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_de65f2536a081d863d87636490389505 = L.marker(
                [37.5392935, 127.0525395],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_de65f2536a081d863d87636490389505.bindTooltip(
                `&lt;div&gt;
                     성원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a1a554a1f764d66504ca462ef196c4cf = L.marker(
                [37.4741646, 127.0319136],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a1a554a1f764d66504ca462ef196c4cf.bindTooltip(
                `&lt;div&gt;
                     서울양재초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fe9aaf7a01a6ec2f17daf7637c84832f = L.marker(
                [37.5319441, 127.0063888],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fe9aaf7a01a6ec2f17daf7637c84832f.bindTooltip(
                `&lt;div&gt;
                     한남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_043ebc26346c37ee0b5830a65e1fda38 = L.marker(
                [37.4998132, 127.1135969],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_043ebc26346c37ee0b5830a65e1fda38.bindTooltip(
                `&lt;div&gt;
                     중대초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4317039022fd1dc47f9e1cc5647c9e71 = L.marker(
                [37.5813782, 127.0140632],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4317039022fd1dc47f9e1cc5647c9e71.bindTooltip(
                `&lt;div&gt;
                     명신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9444dd62a46a4e05fe017086affcbc1d = L.marker(
                [37.5812088, 126.9179274],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9444dd62a46a4e05fe017086affcbc1d.bindTooltip(
                `&lt;div&gt;
                     은가경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_709eb7b289e4a8f6e099a72bab57faaa = L.marker(
                [37.5324773, 126.9904794],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_709eb7b289e4a8f6e099a72bab57faaa.bindTooltip(
                `&lt;div&gt;
                     종합행정타운
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_635349bde76da5d55d293ff649db9b9b = L.marker(
                [37.5398266, 126.9502984],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_635349bde76da5d55d293ff649db9b9b.bindTooltip(
                `&lt;div&gt;
                     마포삼성@경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e5da70cef7c82d1a2a9614656155764a = L.marker(
                [37.5680782, 126.9630729],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e5da70cef7c82d1a2a9614656155764a.bindTooltip(
                `&lt;div&gt;
                     금화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9929c0611f47b8478c2115fce5a8e7bf = L.marker(
                [37.4923517, 126.981568],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9929c0611f47b8478c2115fce5a8e7bf.bindTooltip(
                `&lt;div&gt;
                     경문고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_246aa7a25febefe5537c972dfec5e691 = L.marker(
                [37.57354, 126.9618444],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_246aa7a25febefe5537c972dfec5e691.bindTooltip(
                `&lt;div&gt;
                     대신고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_14a00ce9cb9632405f776d9718b368c2 = L.marker(
                [37.5779418, 127.0039175],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_14a00ce9cb9632405f776d9718b368c2.bindTooltip(
                `&lt;div&gt;
                     서울사대부속여중
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ec39dac9130a8a59aec690663ace145 = L.marker(
                [37.4981483, 126.8547529],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4ec39dac9130a8a59aec690663ace145.bindTooltip(
                `&lt;div&gt;
                     오류여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cf74e00949ec59b8c57c63f7eaa0e14d = L.marker(
                [37.5517511, 127.1272382],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cf74e00949ec59b8c57c63f7eaa0e14d.bindTooltip(
                `&lt;div&gt;
                     암사2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_966f9edfb10a0d07303be38e6fb0ec2e = L.marker(
                [37.5902589, 127.0793691],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_966f9edfb10a0d07303be38e6fb0ec2e.bindTooltip(
                `&lt;div&gt;
                     중목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ef14c4f65611f03c3254b7a864805efa = L.marker(
                [37.494293, 126.9613115],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ef14c4f65611f03c3254b7a864805efa.bindTooltip(
                `&lt;div&gt;
                     상현중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6106b37ec63a5f92c616d83e77c361a7 = L.marker(
                [37.4761819, 126.915573],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6106b37ec63a5f92c616d83e77c361a7.bindTooltip(
                `&lt;div&gt;
                     미성동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b71ed52c4ec08374f1cb5a31e04512c5 = L.marker(
                [37.5759123, 126.8146251],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b71ed52c4ec08374f1cb5a31e04512c5.bindTooltip(
                `&lt;div&gt;
                     치현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0885e2caa88f4b34da20b3a775fb2b79 = L.marker(
                [37.5367143, 126.8426524],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0885e2caa88f4b34da20b3a775fb2b79.bindTooltip(
                `&lt;div&gt;
                     화원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e47f53f9168db00320b6381a29226a16 = L.marker(
                [37.4856133, 126.9491483],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e47f53f9168db00320b6381a29226a16.bindTooltip(
                `&lt;div&gt;
                     서울신봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3ecba2107dfdc600958b106677722a9c = L.marker(
                [37.4668072, 126.9230311],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3ecba2107dfdc600958b106677722a9c.bindTooltip(
                `&lt;div&gt;
                     난우중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_10cb26387a7598a47537802ae28098f8 = L.marker(
                [37.5510344, 127.0342166],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_10cb26387a7598a47537802ae28098f8.bindTooltip(
                `&lt;div&gt;
                     광희중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f435b7bd244f14eaeff35e0e71c98b43 = L.marker(
                [37.5418073, 126.9677569],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f435b7bd244f14eaeff35e0e71c98b43.bindTooltip(
                `&lt;div&gt;
                     삼일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cc5b40e7546b32faf1c24ab7331cd90d = L.marker(
                [37.5446028, 126.932724],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cc5b40e7546b32faf1c24ab7331cd90d.bindTooltip(
                `&lt;div&gt;
                     영광교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_483d8259081986f0c4b3ada54ad49d9d = L.marker(
                [37.5101591, 126.8971795],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_483d8259081986f0c4b3ada54ad49d9d.bindTooltip(
                `&lt;div&gt;
                     도림교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_240284efbfd21f58b4808da210eff257 = L.marker(
                [37.5184177, 126.8939429],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_240284efbfd21f58b4808da210eff257.bindTooltip(
                `&lt;div&gt;
                     구립문래제1경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cb6a48c01722a20032db222cc7dc9138 = L.marker(
                [37.4991358, 126.9314158],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cb6a48c01722a20032db222cc7dc9138.bindTooltip(
                `&lt;div&gt;
                     상도3동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dbc466e115e3f1ac408257d087ed74cb = L.marker(
                [37.5476373, 126.9159645],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_dbc466e115e3f1ac408257d087ed74cb.bindTooltip(
                `&lt;div&gt;
                     성산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8c19395dc50ee49ba61c1daa2996c6df = L.marker(
                [37.539614, 126.8963895],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8c19395dc50ee49ba61c1daa2996c6df.bindTooltip(
                `&lt;div&gt;
                     당산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0db5ada9a22de7f9e5ca3d1c69d0aafb = L.marker(
                [37.502675, 126.9065507],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0db5ada9a22de7f9e5ca3d1c69d0aafb.bindTooltip(
                `&lt;div&gt;
                     대영초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b68d4f335aee20d7b05d41d9d36ea50 = L.marker(
                [37.5004122, 126.8628141],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5b68d4f335aee20d7b05d41d9d36ea50.bindTooltip(
                `&lt;div&gt;
                     고척1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_26f23d987b68875893487d433cfb74fd = L.marker(
                [37.5157342, 126.9226591],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_26f23d987b68875893487d433cfb74fd.bindTooltip(
                `&lt;div&gt;
                     구립율산경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8caf0e1fa188a8b5b0c2273032911fb2 = L.marker(
                [37.5232656, 126.888191],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8caf0e1fa188a8b5b0c2273032911fb2.bindTooltip(
                `&lt;div&gt;
                     구립양평1동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_18642a38ac9c6789d222dca53d42de52 = L.marker(
                [37.5450991, 126.9270335],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_18642a38ac9c6789d222dca53d42de52.bindTooltip(
                `&lt;div&gt;
                     상수청소년독서실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_416d24bb5270809e276c4710dfe58d4d = L.marker(
                [37.5380081, 126.8475462],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_416d24bb5270809e276c4710dfe58d4d.bindTooltip(
                `&lt;div&gt;
                     약수 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_af33c9142cc0dffb570165e89245c30c = L.marker(
                [37.52548, 126.9034287],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_af33c9142cc0dffb570165e89245c30c.bindTooltip(
                `&lt;div&gt;
                     영등포동 주민자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7473cccdc316c1a7ca1daddeeccb1f60 = L.marker(
                [37.4890451, 127.1292892],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7473cccdc316c1a7ca1daddeeccb1f60.bindTooltip(
                `&lt;div&gt;
                     문정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b518ad64056639e36b52c968a410ac89 = L.marker(
                [37.6071825, 126.9695997],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b518ad64056639e36b52c968a410ac89.bindTooltip(
                `&lt;div&gt;
                     예능교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fd3ca4cc340925049f8513c03430561b = L.marker(
                [37.6009825, 127.0606984],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fd3ca4cc340925049f8513c03430561b.bindTooltip(
                `&lt;div&gt;
                     이문동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4aa1906fcc6435e2490972b7eca414de = L.marker(
                [37.6238104, 127.0123045],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4aa1906fcc6435e2490972b7eca414de.bindTooltip(
                `&lt;div&gt;
                     미양고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_161d75759254aa8929fe1cf035263b46 = L.marker(
                [37.4928281, 126.8993033],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_161d75759254aa8929fe1cf035263b46.bindTooltip(
                `&lt;div&gt;
                     구립대림2동제2경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46d077b98085bb03721e4ddd372f07a2 = L.marker(
                [37.5495336, 127.0739425],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_46d077b98085bb03721e4ddd372f07a2.bindTooltip(
                `&lt;div&gt;
                     세종대학교 군자관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_87e79dff4b3969481a2228dd42002333 = L.marker(
                [37.5947552, 127.0914775],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_87e79dff4b3969481a2228dd42002333.bindTooltip(
                `&lt;div&gt;
                     국일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_298eeb4ac54b2117e6920d436b27674c = L.marker(
                [37.512004, 126.8698309],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_298eeb4ac54b2117e6920d436b27674c.bindTooltip(
                `&lt;div&gt;
                     갈산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_da3497dd6518e8808be414f05e539fe7 = L.marker(
                [37.5291893, 127.1224111],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_da3497dd6518e8808be414f05e539fe7.bindTooltip(
                `&lt;div&gt;
                     강동어린이회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7f1e82c96e885f990324ba1f3127ca1d = L.marker(
                [37.5100593, 126.9054805],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7f1e82c96e885f990324ba1f3127ca1d.bindTooltip(
                `&lt;div&gt;
                     영도교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_287c16dd95eb10fd4815de45ba104d0d = L.marker(
                [37.5671308, 127.0884969],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_287c16dd95eb10fd4815de45ba104d0d.bindTooltip(
                `&lt;div&gt;
                     용곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_53acdd505b3c9622f3cbb7cbc45eb5b1 = L.marker(
                [37.5823401, 127.0965892],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_53acdd505b3c9622f3cbb7cbc45eb5b1.bindTooltip(
                `&lt;div&gt;
                     면중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_93f4507d9df53f2264dd595134ffa16e = L.marker(
                [37.4885999, 126.8950267],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_93f4507d9df53f2264dd595134ffa16e.bindTooltip(
                `&lt;div&gt;
                     영서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a300d9afc7dff24eb9d1386da5b730bc = L.marker(
                [37.4953861, 126.9136334],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a300d9afc7dff24eb9d1386da5b730bc.bindTooltip(
                `&lt;div&gt;
                     대방중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3e0406232263c436193858472212a5af = L.marker(
                [37.6732718, 127.0583984],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3e0406232263c436193858472212a5af.bindTooltip(
                `&lt;div&gt;
                     노원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6781dfdc51c98f297c284c012517982a = L.marker(
                [37.6020634, 127.0643509],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6781dfdc51c98f297c284c012517982a.bindTooltip(
                `&lt;div&gt;
                     이문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3bdc2f1b9427e410bab0da42cc1cafbc = L.marker(
                [37.5473003, 127.1727125],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3bdc2f1b9427e410bab0da42cc1cafbc.bindTooltip(
                `&lt;div&gt;
                     상일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36cdb42cd8fa001822cd24596eb1dc5d = L.marker(
                [37.5377898, 127.1353379],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_36cdb42cd8fa001822cd24596eb1dc5d.bindTooltip(
                `&lt;div&gt;
                     대세빌딩
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2df5f29b5fe8e463c664c0114b0684ad = L.marker(
                [37.5327075, 127.1304647],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2df5f29b5fe8e463c664c0114b0684ad.bindTooltip(
                `&lt;div&gt;
                     한양감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e6a01d2098ffd596324b0c99fb0a557d = L.marker(
                [37.557419, 126.8421586],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e6a01d2098ffd596324b0c99fb0a557d.bindTooltip(
                `&lt;div&gt;
                     원당 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_186a8ead51adc18ec1be128b4a00308c = L.marker(
                [37.5083753, 126.9112427],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_186a8ead51adc18ec1be128b4a00308c.bindTooltip(
                `&lt;div&gt;
                     신길4동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7b2717ef461cb5ab3f19ec52c2d6db3b = L.marker(
                [37.5006655, 126.9257597],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7b2717ef461cb5ab3f19ec52c2d6db3b.bindTooltip(
                `&lt;div&gt;
                     대림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fcb8344ab73fa597d6378f9395a88acf = L.marker(
                [37.5401407, 126.8394751],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fcb8344ab73fa597d6378f9395a88acf.bindTooltip(
                `&lt;div&gt;
                     신월초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a84a9d422ed842638e5ef08968ad113c = L.marker(
                [37.6639745, 127.0475728],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a84a9d422ed842638e5ef08968ad113c.bindTooltip(
                `&lt;div&gt;
                     도봉 문화고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e69b78b83ccc6c5bc861f85cf3d073f = L.marker(
                [37.5429926, 126.8459016],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0e69b78b83ccc6c5bc861f85cf3d073f.bindTooltip(
                `&lt;div&gt;
                     화곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2151f51c729584961af2906e76505850 = L.marker(
                [37.5858134, 126.9692374],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2151f51c729584961af2906e76505850.bindTooltip(
                `&lt;div&gt;
                     청운초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_30f3b624d3b306607f0005b9d344144e = L.marker(
                [37.5756954, 127.0100232],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_30f3b624d3b306607f0005b9d344144e.bindTooltip(
                `&lt;div&gt;
                     창신제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_40c308e496f54637712b2febb2cc36f2 = L.marker(
                [37.6119005, 127.0003236],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_40c308e496f54637712b2febb2cc36f2.bindTooltip(
                `&lt;div&gt;
                     창덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_821630424b759ecf1b06faa9b2353a68 = L.marker(
                [37.4876439, 127.144758],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_821630424b759ecf1b06faa9b2353a68.bindTooltip(
                `&lt;div&gt;
                     거원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_345f424ae68ca663e3a8487418f5e7f1 = L.marker(
                [37.5154848, 126.8539328],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_345f424ae68ca663e3a8487418f5e7f1.bindTooltip(
                `&lt;div&gt;
                     남명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e0be75048f1ce969e56e9954a371abd0 = L.marker(
                [37.5386231, 126.9499885],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e0be75048f1ce969e56e9954a371abd0.bindTooltip(
                `&lt;div&gt;
                     서울마포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6c965b4569324d66e24e46cf08f8b5b1 = L.marker(
                [37.5328602, 127.1333594],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6c965b4569324d66e24e46cf08f8b5b1.bindTooltip(
                `&lt;div&gt;
                     성내도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35282688138d671f450102ae5a16d9ad = L.marker(
                [37.5778373, 127.0156471],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_35282688138d671f450102ae5a16d9ad.bindTooltip(
                `&lt;div&gt;
                     숭인제1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2b97fe373f1eb5cdeb938681cf3bb82c = L.marker(
                [37.5487396, 126.9363646],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2b97fe373f1eb5cdeb938681cf3bb82c.bindTooltip(
                `&lt;div&gt;
                     광성중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb23adfba2612d2590ded30f3d67d04b = L.marker(
                [37.5305307, 126.9241715],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bb23adfba2612d2590ded30f3d67d04b.bindTooltip(
                `&lt;div&gt;
                     여의도순복음교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_abcb5ebc18142f08bc634f33d6e35b1e = L.marker(
                [37.4908348, 126.85656],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_abcb5ebc18142f08bc634f33d6e35b1e.bindTooltip(
                `&lt;div&gt;
                     개봉2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_829d96ddc986349f8c8ce81ad7e3c221 = L.marker(
                [37.5065938, 126.8584369],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_829d96ddc986349f8c8ce81ad7e3c221.bindTooltip(
                `&lt;div&gt;
                     고척2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_74f341a62c3b81634c5fc2bdf526d67e = L.marker(
                [37.5547801, 126.9394337],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_74f341a62c3b81634c5fc2bdf526d67e.bindTooltip(
                `&lt;div&gt;
                     창천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_024d679c87979327f97a888f193848cf = L.marker(
                [37.5319345, 126.8994424],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_024d679c87979327f97a888f193848cf.bindTooltip(
                `&lt;div&gt;
                     당서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_484b944093798bdf2eacbf6791f9d100 = L.marker(
                [37.5952013, 127.0348931],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_484b944093798bdf2eacbf6791f9d100.bindTooltip(
                `&lt;div&gt;
                     숭례초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_825f874e1836d7730a84516ecceb3caa = L.marker(
                [37.5498945, 126.9639151],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_825f874e1836d7730a84516ecceb3caa.bindTooltip(
                `&lt;div&gt;
                     배문중고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_be41da4f3c068ed996a06a64c452e5bf = L.marker(
                [37.5524038, 126.9606038],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_be41da4f3c068ed996a06a64c452e5bf.bindTooltip(
                `&lt;div&gt;
                     서울소의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_96d2ce669e853c2ec7281cdb3f3bc785 = L.marker(
                [37.5484025, 126.9270708],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_96d2ce669e853c2ec7281cdb3f3bc785.bindTooltip(
                `&lt;div&gt;
                     서강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd9c6574651d88fcded2a661e89bfe35 = L.marker(
                [37.4889754, 126.9651091],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bd9c6574651d88fcded2a661e89bfe35.bindTooltip(
                `&lt;div&gt;
                     신남성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6f804a06559d87155e7945d99c39f057 = L.marker(
                [37.4812536, 126.9557108],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6f804a06559d87155e7945d99c39f057.bindTooltip(
                `&lt;div&gt;
                     원당초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6e54913b196e263fb93101823e532184 = L.marker(
                [37.5580149, 126.9480389],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6e54913b196e263fb93101823e532184.bindTooltip(
                `&lt;div&gt;
                     대신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6f79d1e4b597434773630e38688aa514 = L.marker(
                [37.4854435, 126.9757561],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6f79d1e4b597434773630e38688aa514.bindTooltip(
                `&lt;div&gt;
                     사당청소년문화의집
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_296bbbf02166993b3c134e526ace6c20 = L.marker(
                [37.5695395, 126.9167345],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_296bbbf02166993b3c134e526ace6c20.bindTooltip(
                `&lt;div&gt;
                     남가좌1동 분회경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e9ba15428654e03f7ba568a918f3271c = L.marker(
                [37.5938878, 126.9981205],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e9ba15428654e03f7ba568a918f3271c.bindTooltip(
                `&lt;div&gt;
                     성북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5a0eb2df740d74661cdacd4f4ed438b7 = L.marker(
                [37.5475162, 127.1362174],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5a0eb2df740d74661cdacd4f4ed438b7.bindTooltip(
                `&lt;div&gt;
                     천호초등학교 체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_80cbbf7f35bf560bec3a45ef9878ce92 = L.marker(
                [37.5429207, 127.0802659],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_80cbbf7f35bf560bec3a45ef9878ce92.bindTooltip(
                `&lt;div&gt;
                     구의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_27ffae6d7476a2613d61360411f93aa9 = L.marker(
                [37.5802312, 127.0660865],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_27ffae6d7476a2613d61360411f93aa9.bindTooltip(
                `&lt;div&gt;
                     배봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2df84b6f311240b430823dd817efba7c = L.marker(
                [37.5463638, 127.1513797],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2df84b6f311240b430823dd817efba7c.bindTooltip(
                `&lt;div&gt;
                     명일2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2064ac3290409dc5a34a7dd831eb9289 = L.marker(
                [37.5462327, 127.1317431],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2064ac3290409dc5a34a7dd831eb9289.bindTooltip(
                `&lt;div&gt;
                     천호2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_908ab28c2953b2cfc9ed305ee55905fd = L.marker(
                [37.5738977, 127.0729141],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_908ab28c2953b2cfc9ed305ee55905fd.bindTooltip(
                `&lt;div&gt;
                     장평초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8f889edb2651dc66619a1aedcf589a7a = L.marker(
                [37.5929209, 127.0657477],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8f889edb2651dc66619a1aedcf589a7a.bindTooltip(
                `&lt;div&gt;
                     휘경1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e0edf893be7b088977caac1695e5b65b = L.marker(
                [37.6040298, 127.0959992],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e0edf893be7b088977caac1695e5b65b.bindTooltip(
                `&lt;div&gt;
                     원광장애인복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_646378b4483577671da97885d0eaa59a = L.marker(
                [37.6090393, 127.0736452],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_646378b4483577671da97885d0eaa59a.bindTooltip(
                `&lt;div&gt;
                     묵현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4293ae181de34f996f1f054cd011e09f = L.marker(
                [37.5644518, 127.0616104],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4293ae181de34f996f1f054cd011e09f.bindTooltip(
                `&lt;div&gt;
                     군자초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e01e69cb644b0bed01f60e441ce504ad = L.marker(
                [37.5637249, 127.0894857],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e01e69cb644b0bed01f60e441ce504ad.bindTooltip(
                `&lt;div&gt;
                     대원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_846e2c8da327604607fd4f827b1e685a = L.marker(
                [37.5302178, 126.8514521],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_846e2c8da327604607fd4f827b1e685a.bindTooltip(
                `&lt;div&gt;
                     일심 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca1e1526bae0d230375a468593c3c0fd = L.marker(
                [37.5209583, 126.8714642],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ca1e1526bae0d230375a468593c3c0fd.bindTooltip(
                `&lt;div&gt;
                     목동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_38f73ce9b002d5a03bd3a4de33bffe20 = L.marker(
                [37.4677782, 126.941466],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_38f73ce9b002d5a03bd3a4de33bffe20.bindTooltip(
                `&lt;div&gt;
                     서울삼성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ce0609c76c4f35b1513510e7c8ce4d7a = L.marker(
                [37.5771169, 127.0841899],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ce0609c76c4f35b1513510e7c8ce4d7a.bindTooltip(
                `&lt;div&gt;
                     산돌교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ba16890c33b7200a8c0ff6b2833e1b5f = L.marker(
                [37.5880437, 126.9933924],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ba16890c33b7200a8c0ff6b2833e1b5f.bindTooltip(
                `&lt;div&gt;
                     성균관대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_51c07a3f2b37e0bf6971ceef34b0f051 = L.marker(
                [37.5463987, 126.9336747],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_51c07a3f2b37e0bf6971ceef34b0f051.bindTooltip(
                `&lt;div&gt;
                     신수중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d79f31c115c52f807d03b93409585f5c = L.marker(
                [37.4827352, 126.9788914],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d79f31c115c52f807d03b93409585f5c.bindTooltip(
                `&lt;div&gt;
                     남사초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6f84c25e7753ed28f560cf626fadae63 = L.marker(
                [37.5688885, 126.8069612],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6f84c25e7753ed28f560cf626fadae63.bindTooltip(
                `&lt;div&gt;
                     방화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aed62cc8b3ebf9dfcd6abb1133a702f8 = L.marker(
                [37.4969866, 127.0777533],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_aed62cc8b3ebf9dfcd6abb1133a702f8.bindTooltip(
                `&lt;div&gt;
                     대진초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f5a8c1df42fe14d07f624ad5d6937335 = L.marker(
                [37.4814125, 127.0861939],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f5a8c1df42fe14d07f624ad5d6937335.bindTooltip(
                `&lt;div&gt;
                     대모초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7bb4a2e116d3d4af9fd203e7a191b419 = L.marker(
                [37.5435354, 127.0488162],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7bb4a2e116d3d4af9fd203e7a191b419.bindTooltip(
                `&lt;div&gt;
                     경일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_47a6afecb0184c6731e627387c5d43f4 = L.marker(
                [37.5401648, 127.0804549],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_47a6afecb0184c6731e627387c5d43f4.bindTooltip(
                `&lt;div&gt;
                     건국대학교부속고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5d2d10461b583aba391f07dc6b6a5053 = L.marker(
                [37.6599354, 127.0103193],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5d2d10461b583aba391f07dc6b6a5053.bindTooltip(
                `&lt;div&gt;
                     우이제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3b3da06ee0fcc1a8cff2fb54707bf642 = L.marker(
                [37.5625589, 126.9256035],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3b3da06ee0fcc1a8cff2fb54707bf642.bindTooltip(
                `&lt;div&gt;
                     일심교회(12층)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_25b82b83cc7b916b5b5ec867455dbf01 = L.marker(
                [37.5286161, 126.8347999],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_25b82b83cc7b916b5b5ec867455dbf01.bindTooltip(
                `&lt;div&gt;
                     곰달래경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a8dfa615b8a6df73e19f1388af18745b = L.marker(
                [37.4954554, 126.9059717],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a8dfa615b8a6df73e19f1388af18745b.bindTooltip(
                `&lt;div&gt;
                     구립대림1경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6362da2ecab94bb731ce2c928a5571fa = L.marker(
                [37.5095567, 126.8960031],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6362da2ecab94bb731ce2c928a5571fa.bindTooltip(
                `&lt;div&gt;
                     도림동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36ba3ffeb47486a51d92756246df5907 = L.marker(
                [37.6140021, 127.0178188],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_36ba3ffeb47486a51d92756246df5907.bindTooltip(
                `&lt;div&gt;
                     길음초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9147cfc68f7830c179cc72a20da90f7c = L.marker(
                [37.5525268, 127.1689205],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9147cfc68f7830c179cc72a20da90f7c.bindTooltip(
                `&lt;div&gt;
                     고일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9907abf742ffc93f610fdcfe1ecc87b8 = L.marker(
                [37.5592958, 126.9305972],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9907abf742ffc93f610fdcfe1ecc87b8.bindTooltip(
                `&lt;div&gt;
                     서강동주민센터 강당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_39f4196f65c12cc79367fdf2bcd566f2 = L.marker(
                [37.5103395, 126.9451454],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_39f4196f65c12cc79367fdf2bcd566f2.bindTooltip(
                `&lt;div&gt;
                     강남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_272195125be5c35ebd4129345ada5576 = L.marker(
                [37.5651319, 127.034657],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_272195125be5c35ebd4129345ada5576.bindTooltip(
                `&lt;div&gt;
                     한국예술고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65cd01578edbe10f98d71eed9c04f22b = L.marker(
                [37.6058238, 127.0932408],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_65cd01578edbe10f98d71eed9c04f22b.bindTooltip(
                `&lt;div&gt;
                     신현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e41e574ee10ecff7366107dfb2715cf = L.marker(
                [37.5325474, 127.1197653],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0e41e574ee10ecff7366107dfb2715cf.bindTooltip(
                `&lt;div&gt;
                     영파여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dce0f3a70ae494e9b712aa52097e711e = L.marker(
                [37.553557, 127.1575755],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_dce0f3a70ae494e9b712aa52097e711e.bindTooltip(
                `&lt;div&gt;
                     경희대동서신의학병원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_415c00fe1d0e1f4dbdb3032a60155b7d = L.marker(
                [37.5324361, 127.1295584],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_415c00fe1d0e1f4dbdb3032a60155b7d.bindTooltip(
                `&lt;div&gt;
                     성내2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5e0ec8bf2922a6e9704ab78e94358700 = L.marker(
                [37.5717884, 127.0588047],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5e0ec8bf2922a6e9704ab78e94358700.bindTooltip(
                `&lt;div&gt;
                     신답교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa4ed7121a5763c11b9e22b8e683d92c = L.marker(
                [37.5471039, 127.1016146],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_aa4ed7121a5763c11b9e22b8e683d92c.bindTooltip(
                `&lt;div&gt;
                     광장중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cf1618205e2fc22b916c98899f27fab7 = L.marker(
                [37.6579022, 127.0466311],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cf1618205e2fc22b916c98899f27fab7.bindTooltip(
                `&lt;div&gt;
                     서울자운초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7756d989c0ac6ed9280eb4c8b4088ec4 = L.marker(
                [37.6090978, 127.0384271],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7756d989c0ac6ed9280eb4c8b4088ec4.bindTooltip(
                `&lt;div&gt;
                     숭인초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d4be7c3b0e58d064d4daff4e4b92e55a = L.marker(
                [37.5610494, 127.1665402],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d4be7c3b0e58d064d4daff4e4b92e55a.bindTooltip(
                `&lt;div&gt;
                     고덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e9bd3920164a774911a9873b9d461442 = L.marker(
                [37.5583328, 126.9020726],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e9bd3920164a774911a9873b9d461442.bindTooltip(
                `&lt;div&gt;
                     동교초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d7daf2e42ff4800a554c1f357f05e4ef = L.marker(
                [37.5949689, 127.0750076],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d7daf2e42ff4800a554c1f357f05e4ef.bindTooltip(
                `&lt;div&gt;
                     중화2동 문화복지센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4a8e8972c63c8d66cefbe59842090425 = L.marker(
                [37.487349, 126.9025454],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4a8e8972c63c8d66cefbe59842090425.bindTooltip(
                `&lt;div&gt;
                     영림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2a87393527080ba6d3162c35c46c31f6 = L.marker(
                [37.5656918, 126.9187633],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2a87393527080ba6d3162c35c46c31f6.bindTooltip(
                `&lt;div&gt;
                     연서경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d47723072587121aed48f7ab3ac451b1 = L.marker(
                [37.6411204, 127.0715826],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d47723072587121aed48f7ab3ac451b1.bindTooltip(
                `&lt;div&gt;
                     하계중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1fc2e1961318299f69bba2a4736a8cef = L.marker(
                [37.5051409, 126.9027647],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1fc2e1961318299f69bba2a4736a8cef.bindTooltip(
                `&lt;div&gt;
                     성락교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68b39addd18be993ad4a11f5d43efdd8 = L.marker(
                [37.4941903, 126.8739442],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_68b39addd18be993ad4a11f5d43efdd8.bindTooltip(
                `&lt;div&gt;
                     구일고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f64c0892e25db152c2688380366c4f0c = L.marker(
                [37.5908104, 127.0553972],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f64c0892e25db152c2688380366c4f0c.bindTooltip(
                `&lt;div&gt;
                     회기동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_367a7120f065fef2001b8deb5d460bbe = L.marker(
                [37.4887286, 126.9792404],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_367a7120f065fef2001b8deb5d460bbe.bindTooltip(
                `&lt;div&gt;
                     사당2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4339791ac620c921ac50ab767b0d00ff = L.marker(
                [37.4947492, 126.8903454],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4339791ac620c921ac50ab767b0d00ff.bindTooltip(
                `&lt;div&gt;
                     구로중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_980a905bb5f925f5073fe0144cf17fb4 = L.marker(
                [37.5460569, 127.0173401],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_980a905bb5f925f5073fe0144cf17fb4.bindTooltip(
                `&lt;div&gt;
                     금옥초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3900c67046f1233418ffa79f9220d5da = L.marker(
                [37.6036263, 127.1054342],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3900c67046f1233418ffa79f9220d5da.bindTooltip(
                `&lt;div&gt;
                     영란여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b3c9fd3cf1233208e2707a603c9534e = L.marker(
                [37.6087583, 127.0699198],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8b3c9fd3cf1233208e2707a603c9534e.bindTooltip(
                `&lt;div&gt;
                     석계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f3370cc2c673a4a28377165f6c04af52 = L.marker(
                [37.4844111, 126.9756816],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f3370cc2c673a4a28377165f6c04af52.bindTooltip(
                `&lt;div&gt;
                     남성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cee769ba904b32484bc1342d26c0a8a6 = L.marker(
                [37.5252358, 126.9651413],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cee769ba904b32484bc1342d26c0a8a6.bindTooltip(
                `&lt;div&gt;
                     한강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_57d5695e524db30d2c9c991b49f114ed = L.marker(
                [37.5345552, 126.8367024],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_57d5695e524db30d2c9c991b49f114ed.bindTooltip(
                `&lt;div&gt;
                     월정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0f291e934b9baef62cb1372fa59a6d6c = L.marker(
                [37.5134385, 127.1205334],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0f291e934b9baef62cb1372fa59a6d6c.bindTooltip(
                `&lt;div&gt;
                     방이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5e20f175bfcd2de1f0edd07cdfd586ba = L.marker(
                [37.5577254, 126.9335888],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5e20f175bfcd2de1f0edd07cdfd586ba.bindTooltip(
                `&lt;div&gt;
                     창서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0324e715c56143e5da0286975ae5250d = L.marker(
                [37.5121764, 127.0394861],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0324e715c56143e5da0286975ae5250d.bindTooltip(
                `&lt;div&gt;
                     학동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f41201c947c0435090b63ecd1cb4de22 = L.marker(
                [37.5694841, 126.9339245],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f41201c947c0435090b63ecd1cb4de22.bindTooltip(
                `&lt;div&gt;
                     연희초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_358fa074c7e17c49bf9f236dbbd1d51a = L.marker(
                [37.554986, 126.9251698],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_358fa074c7e17c49bf9f236dbbd1d51a.bindTooltip(
                `&lt;div&gt;
                     서교초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8996d536b5d2606d333773b0b8cb625d = L.marker(
                [37.5976555, 127.0759495],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8996d536b5d2606d333773b0b8cb625d.bindTooltip(
                `&lt;div&gt;
                     수산교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_efaa7cdde9cc8bc4b27c916fd4344413 = L.marker(
                [37.5354546, 127.1251253],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_efaa7cdde9cc8bc4b27c916fd4344413.bindTooltip(
                `&lt;div&gt;
                     동안교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7492324f643567346cc2cb59365b2f34 = L.marker(
                [37.5317333, 127.0308305],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7492324f643567346cc2cb59365b2f34.bindTooltip(
                `&lt;div&gt;
                     압구정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_587002cb2b70e59239de58883bd22526 = L.marker(
                [37.6601773, 127.0435392],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_587002cb2b70e59239de58883bd22526.bindTooltip(
                `&lt;div&gt;
                     서울가인초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2f7e498179d9b3432bb36a53c7975a21 = L.marker(
                [37.489575, 126.8384794],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2f7e498179d9b3432bb36a53c7975a21.bindTooltip(
                `&lt;div&gt;
                     오류남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_48baf0727bf8299dab91634004f7d20d = L.marker(
                [37.4813414, 126.8934878],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_48baf0727bf8299dab91634004f7d20d.bindTooltip(
                `&lt;div&gt;
                     가리봉동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5013297bacdbb364a6567fa7f24000e7 = L.marker(
                [37.4628024, 126.9328282],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5013297bacdbb364a6567fa7f24000e7.bindTooltip(
                `&lt;div&gt;
                     신우초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0b0b1c5f3ded8a39cbfc531ed93e0b4c = L.marker(
                [37.5097323, 126.8975167],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0b0b1c5f3ded8a39cbfc531ed93e0b4c.bindTooltip(
                `&lt;div&gt;
                     구립모랫말 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_97e417b6c57ae5aae0327553a06db7ae = L.marker(
                [37.5909504, 127.0014038],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_97e417b6c57ae5aae0327553a06db7ae.bindTooltip(
                `&lt;div&gt;
                     경산중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_efee8f5b483e127a3eb8175f040d4eb6 = L.marker(
                [37.5217447, 126.99233],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_efee8f5b483e127a3eb8175f040d4eb6.bindTooltip(
                `&lt;div&gt;
                     서빙고초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2056f50403996ad1455f055c5054bba4 = L.marker(
                [37.5381508, 126.89628],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2056f50403996ad1455f055c5054bba4.bindTooltip(
                `&lt;div&gt;
                     구립양평4가 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a68919aaba4e30bdc7fc7de0fa72b9a5 = L.marker(
                [37.6669473, 127.0533922],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a68919aaba4e30bdc7fc7de0fa72b9a5.bindTooltip(
                `&lt;div&gt;
                     상경중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3e618fc886a7f6452fb9c766ab99f096 = L.marker(
                [37.5332002, 127.0895409],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3e618fc886a7f6452fb9c766ab99f096.bindTooltip(
                `&lt;div&gt;
                     성동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d74f75b7caa163468e36ebe1585ae8b = L.marker(
                [37.5665944, 127.0709207],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6d74f75b7caa163468e36ebe1585ae8b.bindTooltip(
                `&lt;div&gt;
                     장평중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cf06b9974c2a02e41078679c850aca66 = L.marker(
                [37.6282778, 127.0281832],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cf06b9974c2a02e41078679c850aca66.bindTooltip(
                `&lt;div&gt;
                     신일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9090932353a45d1e7a7bf10281e7b3ad = L.marker(
                [37.5070763, 127.0843785],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9090932353a45d1e7a7bf10281e7b3ad.bindTooltip(
                `&lt;div&gt;
                     서울잠전초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f120fa1cd18598eb412354e9f325dbef = L.marker(
                [37.6028284, 127.076179],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f120fa1cd18598eb412354e9f325dbef.bindTooltip(
                `&lt;div&gt;
                     중화2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f89fa682bcadaa9ac879e569275ddc08 = L.marker(
                [37.5719601, 127.0170331],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f89fa682bcadaa9ac879e569275ddc08.bindTooltip(
                `&lt;div&gt;
                     숭신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4b70254d7c97b13d97cae98d5d7afd50 = L.marker(
                [37.5003451, 127.1197627],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4b70254d7c97b13d97cae98d5d7afd50.bindTooltip(
                `&lt;div&gt;
                     신가초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ec27fc1506a05753842cefc16356240 = L.marker(
                [37.539829, 127.129843],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8ec27fc1506a05753842cefc16356240.bindTooltip(
                `&lt;div&gt;
                     천호3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_799a966f3b743dde1f2f631c321c630a = L.marker(
                [37.5582034, 127.0451217],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_799a966f3b743dde1f2f631c321c630a.bindTooltip(
                `&lt;div&gt;
                     한양사범대
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_610976c39a2496ed2f89999b0dc24e30 = L.marker(
                [37.5319806, 127.0896252],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_610976c39a2496ed2f89999b0dc24e30.bindTooltip(
                `&lt;div&gt;
                     광진중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_900b5caf426c4e51e7d3fb4a26a45004 = L.marker(
                [37.6641576, 127.0318296],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_900b5caf426c4e51e7d3fb4a26a45004.bindTooltip(
                `&lt;div&gt;
                     서울방학초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_96ef4e6bf9c6865622c1276ebdfb8db7 = L.marker(
                [37.4936434, 127.0811545],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_96ef4e6bf9c6865622c1276ebdfb8db7.bindTooltip(
                `&lt;div&gt;
                     중동고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_708490582d56615d7fb5e8770b0d0a2a = L.marker(
                [37.5554822, 127.141504],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_708490582d56615d7fb5e8770b0d0a2a.bindTooltip(
                `&lt;div&gt;
                     강동롯데캐슬경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cf781c9708d08f9e26e93e3acc8b2b02 = L.marker(
                [37.5304747, 127.1224752],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cf781c9708d08f9e26e93e3acc8b2b02.bindTooltip(
                `&lt;div&gt;
                     성내1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_80112a49b77fd73f0c59609ba2cd9cc3 = L.marker(
                [37.5655809, 126.9237706],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_80112a49b77fd73f0c59609ba2cd9cc3.bindTooltip(
                `&lt;div&gt;
                     연동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c562cead37c2499533cdfeb77a503ed1 = L.marker(
                [37.5328907, 126.8526634],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c562cead37c2499533cdfeb77a503ed1.bindTooltip(
                `&lt;div&gt;
                     신정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_da57dc31ed93b44a0b3c8e6e19c1a0d9 = L.marker(
                [37.5389557, 126.8557082],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_da57dc31ed93b44a0b3c8e6e19c1a0d9.bindTooltip(
                `&lt;div&gt;
                     신곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f8aaa6932a651b590b45052ba675d119 = L.marker(
                [37.4595098, 126.8875085],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f8aaa6932a651b590b45052ba675d119.bindTooltip(
                `&lt;div&gt;
                     안천중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_23f14424823309f13451f2b03f640908 = L.marker(
                [37.4722792, 126.9406116],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_23f14424823309f13451f2b03f640908.bindTooltip(
                `&lt;div&gt;
                     서림경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c8d8a5a24a6025565533b2557a58bed6 = L.marker(
                [37.4837549, 127.0464755],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c8d8a5a24a6025565533b2557a58bed6.bindTooltip(
                `&lt;div&gt;
                     도곡2문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_41c97ebe467fb9cfb0cf943680f0e6c1 = L.marker(
                [37.5000383, 126.8510764],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_41c97ebe467fb9cfb0cf943680f0e6c1.bindTooltip(
                `&lt;div&gt;
                     개봉1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6da0862953fb765078b1062796bcb0be = L.marker(
                [37.4860026, 126.8538531],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6da0862953fb765078b1062796bcb0be.bindTooltip(
                `&lt;div&gt;
                     개봉3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0d7461dcbf8f3a796537ef4cfb7def72 = L.marker(
                [37.5228069, 126.8721454],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0d7461dcbf8f3a796537ef4cfb7def72.bindTooltip(
                `&lt;div&gt;
                     목동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9f3569a449d3284332f0e42fa13b2aa8 = L.marker(
                [37.5408474, 126.8343592],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9f3569a449d3284332f0e42fa13b2aa8.bindTooltip(
                `&lt;div&gt;
                     수명 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d29749fd40665faac7e57be39bd06416 = L.marker(
                [37.4966431, 126.9090679],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d29749fd40665faac7e57be39bd06416.bindTooltip(
                `&lt;div&gt;
                     우성3차아파트 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f338f4ca36ef2e5e2299047658f77048 = L.marker(
                [37.5697848, 126.81391],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f338f4ca36ef2e5e2299047658f77048.bindTooltip(
                `&lt;div&gt;
                     방화구립 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eacfd9c860d5832a4354eab30b538f77 = L.marker(
                [37.5799535, 126.9178553],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_eacfd9c860d5832a4354eab30b538f77.bindTooltip(
                `&lt;div&gt;
                     연가초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eab5b6a39691aad35042b2f839ad3563 = L.marker(
                [37.4983656, 126.8424497],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_eab5b6a39691aad35042b2f839ad3563.bindTooltip(
                `&lt;div&gt;
                     오류초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e6b5e402ca1b2b71337b03b25768b5d9 = L.marker(
                [37.4978787, 126.8958527],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e6b5e402ca1b2b71337b03b25768b5d9.bindTooltip(
                `&lt;div&gt;
                     영남중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_809acc0ecba6a0f4997580e9b0e354c3 = L.marker(
                [37.5923035, 127.0559615],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_809acc0ecba6a0f4997580e9b0e354c3.bindTooltip(
                `&lt;div&gt;
                     청량초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a5183f25e871600fe330dcb8a4f1625e = L.marker(
                [37.5646332, 127.0512329],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a5183f25e871600fe330dcb8a4f1625e.bindTooltip(
                `&lt;div&gt;
                     성답교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fad508e1784fd7cc717c06a06b0e4140 = L.marker(
                [37.479212, 126.8944985],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fad508e1784fd7cc717c06a06b0e4140.bindTooltip(
                `&lt;div&gt;
                     연희미용고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a014f1cd81b2e303c334c8a461137280 = L.marker(
                [37.5237687, 126.8616908],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a014f1cd81b2e303c334c8a461137280.bindTooltip(
                `&lt;div&gt;
                     양목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cfc807afdcbf15347cfc2369882585e3 = L.marker(
                [37.4857776, 126.8933053],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cfc807afdcbf15347cfc2369882585e3.bindTooltip(
                `&lt;div&gt;
                     구로3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_094ec83c64399a281d6f0ac4259d4e93 = L.marker(
                [37.5524501, 126.9197762],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_094ec83c64399a281d6f0ac4259d4e93.bindTooltip(
                `&lt;div&gt;
                     서교동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_502b27682f87411c08a5304551e1a852 = L.marker(
                [37.5185604, 126.8935426],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_502b27682f87411c08a5304551e1a852.bindTooltip(
                `&lt;div&gt;
                     문래초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2893837b89e5885d16adc73b418cc1b3 = L.marker(
                [37.521834, 126.8825947],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2893837b89e5885d16adc73b418cc1b3.bindTooltip(
                `&lt;div&gt;
                     관악고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fe28e8469c165545cc93e9bc778442d4 = L.marker(
                [37.4849993, 126.8908446],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fe28e8469c165545cc93e9bc778442d4.bindTooltip(
                `&lt;div&gt;
                     서울구로남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4f1a9a0a39d348b764375b6766e5fb22 = L.marker(
                [37.4987497, 126.901185],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4f1a9a0a39d348b764375b6766e5fb22.bindTooltip(
                `&lt;div&gt;
                     도신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4c3c0cfb713cc708f9605cd7a3c209ed = L.marker(
                [37.5634175, 126.9190284],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4c3c0cfb713cc708f9605cd7a3c209ed.bindTooltip(
                `&lt;div&gt;
                     경성고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_318f5da6be9eabeb3f6a30029343654e = L.marker(
                [37.5398815, 126.8700818],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_318f5da6be9eabeb3f6a30029343654e.bindTooltip(
                `&lt;div&gt;
                     새말경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_88ab043559dd21d591b1f06fcb23e8ce = L.marker(
                [37.568497, 127.0062461],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_88ab043559dd21d591b1f06fcb23e8ce.bindTooltip(
                `&lt;div&gt;
                     중구민회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_18640962535f89f404b89e0edd9c893e = L.marker(
                [37.4622696, 126.9175362],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_18640962535f89f404b89e0edd9c893e.bindTooltip(
                `&lt;div&gt;
                     난향초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aab023300d38ffffa74924289f274318 = L.marker(
                [37.5456165, 126.9428183],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_aab023300d38ffffa74924289f274318.bindTooltip(
                `&lt;div&gt;
                     태영 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd48c650c18a30c3203401ef6861924f = L.marker(
                [37.6388225, 127.0150457],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bd48c650c18a30c3203401ef6861924f.bindTooltip(
                `&lt;div&gt;
                     우이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f323430d2135804147eb2d01a54f564 = L.marker(
                [37.4961983, 127.1432261],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3f323430d2135804147eb2d01a54f564.bindTooltip(
                `&lt;div&gt;
                     영풍초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68d5fd02f68bbd787f487dc26a062663 = L.marker(
                [37.4850743, 127.1279596],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_68d5fd02f68bbd787f487dc26a062663.bindTooltip(
                `&lt;div&gt;
                     문덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1aec729620c1ebc891df4d0535c9fba7 = L.marker(
                [37.5140066, 127.0950468],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1aec729620c1ebc891df4d0535c9fba7.bindTooltip(
                `&lt;div&gt;
                     신천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_87c4ce893dbc7d7af383d7ab4bd2e654 = L.marker(
                [37.5418647, 127.0152648],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_87c4ce893dbc7d7af383d7ab4bd2e654.bindTooltip(
                `&lt;div&gt;
                     옥정초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6bcf653a2173a6d4d3f59c57d060c185 = L.marker(
                [37.6458954, 127.0062436],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6bcf653a2173a6d4d3f59c57d060c185.bindTooltip(
                `&lt;div&gt;
                     강북청소년수련관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7d0bfb68ea1d065c4089b8e254a048b0 = L.marker(
                [37.588121, 127.0562553],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7d0bfb68ea1d065c4089b8e254a048b0.bindTooltip(
                `&lt;div&gt;
                     휘경2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_029ae202557eb908be4cc2cba0ca0b3e = L.marker(
                [37.616224, 127.0154254],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_029ae202557eb908be4cc2cba0ca0b3e.bindTooltip(
                `&lt;div&gt;
                     삼각산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1fc1093f32c0cfd5466460d1ccbdcda2 = L.marker(
                [37.5029317, 127.1045978],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1fc1093f32c0cfd5466460d1ccbdcda2.bindTooltip(
                `&lt;div&gt;
                     석촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c29d3126fba36031380059369569eebf = L.marker(
                [37.4959523, 127.1299459],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c29d3126fba36031380059369569eebf.bindTooltip(
                `&lt;div&gt;
                     송파중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_44e66b5e3ec783f8d2d2c6a6eee86875 = L.marker(
                [37.6033412, 126.9609868],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_44e66b5e3ec783f8d2d2c6a6eee86875.bindTooltip(
                `&lt;div&gt;
                     세검정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_81fb2e18c31b372f2fe6dd0ff02d40f8 = L.marker(
                [37.5001442, 126.8621388],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_81fb2e18c31b372f2fe6dd0ff02d40f8.bindTooltip(
                `&lt;div&gt;
                     고척중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ac13e66b1b94f465acb31bbc9ce48797 = L.marker(
                [37.6309352, 127.0201095],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ac13e66b1b94f465acb31bbc9ce48797.bindTooltip(
                `&lt;div&gt;
                     수유초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_66735d9e0cf7328529212ec40b5880a3 = L.marker(
                [37.5093623, 127.1319795],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_66735d9e0cf7328529212ec40b5880a3.bindTooltip(
                `&lt;div&gt;
                     오금초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_430d529952c6d6ef4f74b4ef3794cb98 = L.marker(
                [37.538643, 126.965921],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_430d529952c6d6ef4f74b4ef3794cb98.bindTooltip(
                `&lt;div&gt;
                     원효1동자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2d662a70694abfc224a720f8e907e1fe = L.marker(
                [37.4974211, 126.9539659],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2d662a70694abfc224a720f8e907e1fe.bindTooltip(
                `&lt;div&gt;
                     고경경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dd349ac6d6e5dabde256af40436d88b0 = L.marker(
                [37.6549766, 127.0260305],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_dd349ac6d6e5dabde256af40436d88b0.bindTooltip(
                `&lt;div&gt;
                     서울동북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0f2c03bb76818c7aec6cbd052bce416b = L.marker(
                [37.5047211, 127.1293523],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_0f2c03bb76818c7aec6cbd052bce416b.bindTooltip(
                `&lt;div&gt;
                     오금고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b374aaf975a881aa6ac32b5bc2d0e742 = L.marker(
                [37.5801672, 126.9083741],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b374aaf975a881aa6ac32b5bc2d0e742.bindTooltip(
                `&lt;div&gt;
                     신가경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7ff2337d17a8b9d2b8787fbab5837cf4 = L.marker(
                [37.5638685, 126.9514498],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7ff2337d17a8b9d2b8787fbab5837cf4.bindTooltip(
                `&lt;div&gt;
                     대한예수교장로회 북아현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_619d4f0cf786f4b035766eb17b6d6eb8 = L.marker(
                [37.5746144, 127.054402],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_619d4f0cf786f4b035766eb17b6d6eb8.bindTooltip(
                `&lt;div&gt;
                     전농초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ef711ac061b0eb8a0c0e1a01fba563b9 = L.marker(
                [37.5577433, 126.9588344],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ef711ac061b0eb8a0c0e1a01fba563b9.bindTooltip(
                `&lt;div&gt;
                     아현감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cddc8c4ff5a02366eb4470a7443a4d6e = L.marker(
                [37.5177426, 126.9877673],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cddc8c4ff5a02366eb4470a7443a4d6e.bindTooltip(
                `&lt;div&gt;
                     신동아(아)관리사무소
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2b3a3ada6dc9446a6d7cc478a7fa7d9d = L.marker(
                [37.4619494, 127.0512045],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2b3a3ada6dc9446a6d7cc478a7fa7d9d.bindTooltip(
                `&lt;div&gt;
                     내곡동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fec84b96e3725d1e48384f6d9d4b5147 = L.marker(
                [37.622368, 127.0836409],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fec84b96e3725d1e48384f6d9d4b5147.bindTooltip(
                `&lt;div&gt;
                     공릉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b41e1a2f5dfd7dbe3c1a4adbc5bf4afe = L.marker(
                [37.5378318, 127.1226778],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b41e1a2f5dfd7dbe3c1a4adbc5bf4afe.bindTooltip(
                `&lt;div&gt;
                     광성교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5cd00f14125373a1e32c6313847ab253 = L.marker(
                [37.6627426, 127.0625315],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5cd00f14125373a1e32c6313847ab253.bindTooltip(
                `&lt;div&gt;
                     상곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f85da37265f334dc94457d944e4e03e6 = L.marker(
                [37.548234, 127.1481451],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f85da37265f334dc94457d944e4e03e6.bindTooltip(
                `&lt;div&gt;
                     명성교회 예루살렘관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9ebbc0fd9a7861143891a4633227b952 = L.marker(
                [37.5361261, 127.1353799],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9ebbc0fd9a7861143891a4633227b952.bindTooltip(
                `&lt;div&gt;
                     강동성심병원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fd35fab79d5bfc8b6ebb5c767cd6eff7 = L.marker(
                [37.5582216, 127.0844446],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fd35fab79d5bfc8b6ebb5c767cd6eff7.bindTooltip(
                `&lt;div&gt;
                     용마초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_869c433684530e19df178173f0018b81 = L.marker(
                [37.5742948, 127.0859627],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_869c433684530e19df178173f0018b81.bindTooltip(
                `&lt;div&gt;
                     용마중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_92ed0273fc6609973a790f699cd433d9 = L.marker(
                [37.5305076, 127.1186391],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_92ed0273fc6609973a790f699cd433d9.bindTooltip(
                `&lt;div&gt;
                     풍납동 천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6708d90a9d874119b78dbdc104b83e9e = L.marker(
                [37.5573111, 127.0235263],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6708d90a9d874119b78dbdc104b83e9e.bindTooltip(
                `&lt;div&gt;
                     금북초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b92fe4567f89e99a44dd3fcbf7784bf = L.marker(
                [37.6496153, 127.0333463],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5b92fe4567f89e99a44dd3fcbf7784bf.bindTooltip(
                `&lt;div&gt;
                     신도봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_023ab93d0607715415363a642c7c0bae = L.marker(
                [37.5426916, 126.9459951],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_023ab93d0607715415363a642c7c0bae.bindTooltip(
                `&lt;div&gt;
                     염리초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b207039558a15477b8dcca01941ac9a = L.marker(
                [37.5334763, 126.9713117],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5b207039558a15477b8dcca01941ac9a.bindTooltip(
                `&lt;div&gt;
                     삼각교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ac776d05a85db5f131eeb5e1dd086b18 = L.marker(
                [37.5761096, 127.0303341],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ac776d05a85db5f131eeb5e1dd086b18.bindTooltip(
                `&lt;div&gt;
                     용신동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_640398018559da865bdd0cc8d679e499 = L.marker(
                [37.6428859, 127.0096097],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_640398018559da865bdd0cc8d679e499.bindTooltip(
                `&lt;div&gt;
                     인수초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1feb87f28ee9a91edca3d44ca4f2507a = L.marker(
                [37.4690573, 127.1069329],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1feb87f28ee9a91edca3d44ca4f2507a.bindTooltip(
                `&lt;div&gt;
                     세곡문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c354658d5300ee4c47a5ed9d8f27e717 = L.marker(
                [37.5420908, 126.9427266],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c354658d5300ee4c47a5ed9d8f27e717.bindTooltip(
                `&lt;div&gt;
                     선민교회(지하1층)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3eafec99018a44d3c1ebef48efeb6ef0 = L.marker(
                [37.5784794, 127.0706106],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3eafec99018a44d3c1ebef48efeb6ef0.bindTooltip(
                `&lt;div&gt;
                     장안2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1e5bff22f6637ac9107dbba20f51ed60 = L.marker(
                [37.6292746, 127.0404438],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1e5bff22f6637ac9107dbba20f51ed60.bindTooltip(
                `&lt;div&gt;
                     번동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_05be155c2e16f5e6905eb7d7969376ee = L.marker(
                [37.5761546, 127.0288143],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_05be155c2e16f5e6905eb7d7969376ee.bindTooltip(
                `&lt;div&gt;
                     용두초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a103cf3611aa7d533a27cd4ccb74bf86 = L.marker(
                [37.537151, 126.9676884],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a103cf3611aa7d533a27cd4ccb74bf86.bindTooltip(
                `&lt;div&gt;
                     용산문화체육센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ff6d11a0f6df7811dd1144b6425a6426 = L.marker(
                [37.5796863, 126.8824442],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ff6d11a0f6df7811dd1144b6425a6426.bindTooltip(
                `&lt;div&gt;
                     상지초등학교(체육관)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5c2ff3d06ed8b4cddff204c1d4f3ef16 = L.marker(
                [37.5497679, 127.1460008],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5c2ff3d06ed8b4cddff204c1d4f3ef16.bindTooltip(
                `&lt;div&gt;
                     명일1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9fd5c4cb5aef586adae5973b73c7a970 = L.marker(
                [37.5205741, 126.8623063],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9fd5c4cb5aef586adae5973b73c7a970.bindTooltip(
                `&lt;div&gt;
                     신서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b84be98012b6a712e9b71b1f5af0312b = L.marker(
                [37.4759632, 127.0531898],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b84be98012b6a712e9b71b1f5af0312b.bindTooltip(
                `&lt;div&gt;
                     포이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6034e680e3e00803b190b554f516f854 = L.marker(
                [37.5340451, 126.860835],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6034e680e3e00803b190b554f516f854.bindTooltip(
                `&lt;div&gt;
                     무지개 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1f2be423b43fab0fa776c85966e7df7d = L.marker(
                [37.5443423, 126.9380392],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1f2be423b43fab0fa776c85966e7df7d.bindTooltip(
                `&lt;div&gt;
                     신석초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b8d5c4b97d76a859a73954f6e68637a6 = L.marker(
                [37.5534721, 127.0991421],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b8d5c4b97d76a859a73954f6e68637a6.bindTooltip(
                `&lt;div&gt;
                     동의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3c34223da1109dc5895885df33bea7b2 = L.marker(
                [37.6054224, 126.9669364],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3c34223da1109dc5895885df33bea7b2.bindTooltip(
                `&lt;div&gt;
                     평창동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_503f06cb99eb56376768062194bb5959 = L.marker(
                [37.5130898, 126.9560632],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_503f06cb99eb56376768062194bb5959.bindTooltip(
                `&lt;div&gt;
                     현장민원실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_798d2b66414cc20f153ae2f36590a50c = L.marker(
                [37.5520498, 126.8332228],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_798d2b66414cc20f153ae2f36590a50c.bindTooltip(
                `&lt;div&gt;
                     발음 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_924b157f719688d9a27ffa39c208dfea = L.marker(
                [37.5024475, 127.1188974],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_924b157f719688d9a27ffa39c208dfea.bindTooltip(
                `&lt;div&gt;
                     가락중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ce319520e9b083d75ececd84259dfa61 = L.marker(
                [37.5198535, 127.0451261],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ce319520e9b083d75ececd84259dfa61.bindTooltip(
                `&lt;div&gt;
                     언북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cfc53a2458e2474c184bc4f09051f542 = L.marker(
                [37.5738682, 126.9352474],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_cfc53a2458e2474c184bc4f09051f542.bindTooltip(
                `&lt;div&gt;
                     연희동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_07e79ff5005aad80a7ef32ea3354e23f = L.marker(
                [37.5564413, 127.157416],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_07e79ff5005aad80a7ef32ea3354e23f.bindTooltip(
                `&lt;div&gt;
                     온조대왕문화체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_173125ffa05e2fe7d244c0ec065528b7 = L.marker(
                [37.4963062, 126.9893434],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_173125ffa05e2fe7d244c0ec065528b7.bindTooltip(
                `&lt;div&gt;
                     서울 서래 초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c9e908a0f080e9a2c9631af53c62bc63 = L.marker(
                [37.6047239, 127.1001116],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c9e908a0f080e9a2c9631af53c62bc63.bindTooltip(
                `&lt;div&gt;
                     신내초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c30f56492cb193c7308944942cfe347e = L.marker(
                [37.5223266, 126.9946441],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c30f56492cb193c7308944942cfe347e.bindTooltip(
                `&lt;div&gt;
                     동빙고교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f32b754b7e92690f8f5164d69246a40d = L.marker(
                [37.499388, 126.9096651],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f32b754b7e92690f8f5164d69246a40d.bindTooltip(
                `&lt;div&gt;
                     신길6동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4b93e6f65c00d224d4c2bd7b2bcc972c = L.marker(
                [37.6162441, 127.0949148],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4b93e6f65c00d224d4c2bd7b2bcc972c.bindTooltip(
                `&lt;div&gt;
                     신내노인요양원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_62f0afb0c7c52260d162a53a2b1ba4c9 = L.marker(
                [37.4913961, 126.8832763],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_62f0afb0c7c52260d162a53a2b1ba4c9.bindTooltip(
                `&lt;div&gt;
                     구로2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b457ab071a76e82e2b311ff07fa0a26 = L.marker(
                [37.4903019, 126.9297162],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5b457ab071a76e82e2b311ff07fa0a26.bindTooltip(
                `&lt;div&gt;
                     서울당곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f7bd069352e514691f17372ff3206d7d = L.marker(
                [37.5485578, 126.8287486],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f7bd069352e514691f17372ff3206d7d.bindTooltip(
                `&lt;div&gt;
                     덕원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_64d3a0494e71dc0dd8549a3c4938e37f = L.marker(
                [37.4896987, 126.8583711],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_64d3a0494e71dc0dd8549a3c4938e37f.bindTooltip(
                `&lt;div&gt;
                     서울개봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_abcc9ee3ac988faac92a1be5cbf3d8dc = L.marker(
                [37.5146754, 126.9093581],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_abcc9ee3ac988faac92a1be5cbf3d8dc.bindTooltip(
                `&lt;div&gt;
                     영등포본동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b4b81aa525434821657e9b3ce6eb9db = L.marker(
                [37.5151499, 126.9194671],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8b4b81aa525434821657e9b3ce6eb9db.bindTooltip(
                `&lt;div&gt;
                     신길교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2d40619369122efef0bf4d53652e405b = L.marker(
                [37.6232225, 127.0462397],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2d40619369122efef0bf4d53652e405b.bindTooltip(
                `&lt;div&gt;
                     오현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_91fd9e4fc1c38c7c187b3eeaaaa0ba6f = L.marker(
                [37.6628528, 127.0681084],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_91fd9e4fc1c38c7c187b3eeaaaa0ba6f.bindTooltip(
                `&lt;div&gt;
                     계상초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_009135eba880d0c185abd0ba7c712122 = L.marker(
                [37.4828229, 126.8506416],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_009135eba880d0c185abd0ba7c712122.bindTooltip(
                `&lt;div&gt;
                     서울개명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_756619848db26c0339dc5fcbe525ec54 = L.marker(
                [37.4936638, 126.8998145],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_756619848db26c0339dc5fcbe525ec54.bindTooltip(
                `&lt;div&gt;
                     대동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c438eb849795c8ea3252c65b97310cfc = L.marker(
                [37.5739006, 126.8078066],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c438eb849795c8ea3252c65b97310cfc.bindTooltip(
                `&lt;div&gt;
                     복종 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c5cd8e8d25ebff51d5fa2aa6da7011b4 = L.marker(
                [37.4972518, 126.8859504],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c5cd8e8d25ebff51d5fa2aa6da7011b4.bindTooltip(
                `&lt;div&gt;
                     구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_062a56ae57d4565d94f473e10c8d69e0 = L.marker(
                [37.6279343, 127.0508453],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_062a56ae57d4565d94f473e10c8d69e0.bindTooltip(
                `&lt;div&gt;
                     월계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fa2c726122e0b7451b4f171de9dd0195 = L.marker(
                [37.6074943, 127.0755131],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_fa2c726122e0b7451b4f171de9dd0195.bindTooltip(
                `&lt;div&gt;
                     신묵초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4fa0a7d824cd6184150ab6fcaf06314f = L.marker(
                [37.5494364, 126.9057654],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4fa0a7d824cd6184150ab6fcaf06314f.bindTooltip(
                `&lt;div&gt;
                     합정동주민센터 (강당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_95db8d8c0484e5e6e8f9c89eb248cc37 = L.marker(
                [37.503779, 126.9406755],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_95db8d8c0484e5e6e8f9c89eb248cc37.bindTooltip(
                `&lt;div&gt;
                     장승중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_053aae8a6430661c2f2b4cec4b70c0c0 = L.marker(
                [37.4810545, 126.8945545],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_053aae8a6430661c2f2b4cec4b70c0c0.bindTooltip(
                `&lt;div&gt;
                     만민중앙선교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6feb6c99e4bb47f6348f0e336597959e = L.marker(
                [37.5186508, 126.9015654],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_6feb6c99e4bb47f6348f0e336597959e.bindTooltip(
                `&lt;div&gt;
                     영남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_30eb1ba3721fdc6bee97cfb7a2059912 = L.marker(
                [37.5176665, 126.9346068],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_30eb1ba3721fdc6bee97cfb7a2059912.bindTooltip(
                `&lt;div&gt;
                     여의동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_461edff289b7922d008cc43280ac9177 = L.marker(
                [37.6526156, 127.0401785],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_461edff289b7922d008cc43280ac9177.bindTooltip(
                `&lt;div&gt;
                     서울창원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3536143241632f316992e5a8454e5dd5 = L.marker(
                [37.5608574, 126.9009887],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3536143241632f316992e5a8454e5dd5.bindTooltip(
                `&lt;div&gt;
                     망원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5d1a919703273f40ac212e60d0fa2cd4 = L.marker(
                [37.5031645, 126.9600263],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5d1a919703273f40ac212e60d0fa2cd4.bindTooltip(
                `&lt;div&gt;
                     은로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d9726d2f66016cc873dfb236b4f8852b = L.marker(
                [37.463921, 127.0516668],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d9726d2f66016cc873dfb236b4f8852b.bindTooltip(
                `&lt;div&gt;
                     서울 언남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_caf7524d5e71b1d81d58a6ada2c7e1c2 = L.marker(
                [37.6042154, 127.0750198],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_caf7524d5e71b1d81d58a6ada2c7e1c2.bindTooltip(
                `&lt;div&gt;
                     한내들어린이집
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65a5d52f44b6573a410ee87a0fba6d40 = L.marker(
                [37.5503821, 127.1038409],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_65a5d52f44b6573a410ee87a0fba6d40.bindTooltip(
                `&lt;div&gt;
                     장로회신학대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bf88deab110cce3c18d6e5b74d69a55e = L.marker(
                [37.6305229, 127.037686],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bf88deab110cce3c18d6e5b74d69a55e.bindTooltip(
                `&lt;div&gt;
                     웰빙스포츠센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_af229a23a1e6426a4bc07e6997e429d1 = L.marker(
                [37.6297145, 127.0687071],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_af229a23a1e6426a4bc07e6997e429d1.bindTooltip(
                `&lt;div&gt;
                     용원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_45805889671cbaa107880d476fdd08f6 = L.marker(
                [37.6640384, 127.0495224],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_45805889671cbaa107880d476fdd08f6.bindTooltip(
                `&lt;div&gt;
                     서울창도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a0ac9c2be6c5d20dd067d33fa2120f54 = L.marker(
                [37.5402148, 126.8768478],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a0ac9c2be6c5d20dd067d33fa2120f54.bindTooltip(
                `&lt;div&gt;
                     월촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1d978771555539efc6177deab0a1e711 = L.marker(
                [37.5043127, 126.896089],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1d978771555539efc6177deab0a1e711.bindTooltip(
                `&lt;div&gt;
                     대림정보문화도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f741f3328a5d5e6340fee9ecb73a5928 = L.marker(
                [37.494139, 126.8259846],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f741f3328a5d5e6340fee9ecb73a5928.bindTooltip(
                `&lt;div&gt;
                     온수초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e05ad5da1dd16d3c1eb7f239c253e0df = L.marker(
                [37.6676601, 127.0596237],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e05ad5da1dd16d3c1eb7f239c253e0df.bindTooltip(
                `&lt;div&gt;
                     상원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e0dd4d1c66fc8bf1106dc4a08c58b04a = L.marker(
                [37.5103943, 126.8436566],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e0dd4d1c66fc8bf1106dc4a08c58b04a.bindTooltip(
                `&lt;div&gt;
                     금옥중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4148e0946cd129f06bc1ee68d52bf28e = L.marker(
                [37.4869806, 127.0370764],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_4148e0946cd129f06bc1ee68d52bf28e.bindTooltip(
                `&lt;div&gt;
                     언주초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a66bb2b1adec335670d093cfdaa8bb7c = L.marker(
                [37.5007582, 126.8980828],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a66bb2b1adec335670d093cfdaa8bb7c.bindTooltip(
                `&lt;div&gt;
                     수정성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_75041c2670bed28b7fd267b894bf9e83 = L.marker(
                [37.5407467, 126.9611083],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_75041c2670bed28b7fd267b894bf9e83.bindTooltip(
                `&lt;div&gt;
                     금양초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_925b27160ad7606a30ecde445580655b = L.marker(
                [37.6432767, 127.0413972],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_925b27160ad7606a30ecde445580655b.bindTooltip(
                `&lt;div&gt;
                     서울창림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_327825f79f5c283edc9a7c2f189b180d = L.marker(
                [37.5062024, 126.953443],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_327825f79f5c283edc9a7c2f189b180d.bindTooltip(
                `&lt;div&gt;
                     강남초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3bd4befa5a7e8edae02d93dd1e823415 = L.marker(
                [37.6209013, 127.0246532],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3bd4befa5a7e8edae02d93dd1e823415.bindTooltip(
                `&lt;div&gt;
                     성암국제무역고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_576db2c6f8ff8292e3cae20ea3da74d6 = L.marker(
                [37.4824203, 126.9649102],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_576db2c6f8ff8292e3cae20ea3da74d6.bindTooltip(
                `&lt;div&gt;
                     동작고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c560f35f136ea92801485b866b2b690 = L.marker(
                [37.493046, 126.8758056],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_7c560f35f136ea92801485b866b2b690.bindTooltip(
                `&lt;div&gt;
                     구로1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3cd2312657e39d43772247baa6fdd4d6 = L.marker(
                [37.4942305, 126.9984975],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3cd2312657e39d43772247baa6fdd4d6.bindTooltip(
                `&lt;div&gt;
                     방배중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_29754946be04c6e9f88ef82975b44de0 = L.marker(
                [37.491599, 127.1228021],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_29754946be04c6e9f88ef82975b44de0.bindTooltip(
                `&lt;div&gt;
                     평화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_887288c9c6893d0da8c78319936f23d6 = L.marker(
                [37.5978567, 126.9491956],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_887288c9c6893d0da8c78319936f23d6.bindTooltip(
                `&lt;div&gt;
                     홍성교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_75ad715d0987d2ef04610e78db5d382a = L.marker(
                [37.5540565, 127.0694957],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_75ad715d0987d2ef04610e78db5d382a.bindTooltip(
                `&lt;div&gt;
                     송원초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8fa68ae00de20d30ae0c6b2dbcf01780 = L.marker(
                [37.5845501, 127.0952576],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8fa68ae00de20d30ae0c6b2dbcf01780.bindTooltip(
                `&lt;div&gt;
                     중화중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_89513c11f98478f1cb577abc2d997dbc = L.marker(
                [37.5075802, 126.9288845],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_89513c11f98478f1cb577abc2d997dbc.bindTooltip(
                `&lt;div&gt;
                     숭의여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5fb0de197bb4b558a2ad7d0213095af6 = L.marker(
                [37.5228929, 126.9964304],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_5fb0de197bb4b558a2ad7d0213095af6.bindTooltip(
                `&lt;div&gt;
                     동빙고할머니경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b7bf5dc461c191f5dd70cc9db360497c = L.marker(
                [37.5554785, 126.962078],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b7bf5dc461c191f5dd70cc9db360497c.bindTooltip(
                `&lt;div&gt;
                     평강교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed74365a90f78a55aa932449c0d0b072 = L.marker(
                [37.5837333, 127.034679],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ed74365a90f78a55aa932449c0d0b072.bindTooltip(
                `&lt;div&gt;
                     제기동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1aad61e7013f4effb85004ce744ac345 = L.marker(
                [37.5406167, 127.138015],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_1aad61e7013f4effb85004ce744ac345.bindTooltip(
                `&lt;div&gt;
                     천동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f75f38bf72a76468d2058fa5c956b29 = L.marker(
                [37.5234889, 127.1367425],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3f75f38bf72a76468d2058fa5c956b29.bindTooltip(
                `&lt;div&gt;
                     둔촌1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3011fb0e1d30789e313d79f242726c0e = L.marker(
                [37.5172677, 127.037204],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_3011fb0e1d30789e313d79f242726c0e.bindTooltip(
                `&lt;div&gt;
                     논현2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a45e5e72e5b0957df8a7e42829921c76 = L.marker(
                [37.536319, 127.1331341],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_a45e5e72e5b0957df8a7e42829921c76.bindTooltip(
                `&lt;div&gt;
                     현강여자정보고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b1842f76d7755a13d58c80ad3b8e46d2 = L.marker(
                [37.5346363, 127.1179289],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_b1842f76d7755a13d58c80ad3b8e46d2.bindTooltip(
                `&lt;div&gt;
                     풍납초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9ad432b2d9ca0d88698544dada07f77b = L.marker(
                [37.5011807, 127.0490386],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_9ad432b2d9ca0d88698544dada07f77b.bindTooltip(
                `&lt;div&gt;
                     도성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e3cba45c388e330e1b17d46117fb5dff = L.marker(
                [37.6170846, 127.0313824],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e3cba45c388e330e1b17d46117fb5dff.bindTooltip(
                `&lt;div&gt;
                     송중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_af66f4bca120827185f03671b79d8e37 = L.marker(
                [37.5862863, 127.0472981],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_af66f4bca120827185f03671b79d8e37.bindTooltip(
                `&lt;div&gt;
                     청량리동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f8e3b45718149a9a387e1fd8308ba55b = L.marker(
                [37.5432392, 126.8414093],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_f8e3b45718149a9a387e1fd8308ba55b.bindTooltip(
                `&lt;div&gt;
                     봉바위 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_15dc81a046bb444d2ff781a54e710af7 = L.marker(
                [37.5159112, 126.8558493],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_15dc81a046bb444d2ff781a54e710af7.bindTooltip(
                `&lt;div&gt;
                     신서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ea2623a177e0397164518983f727e928 = L.marker(
                [37.5541789, 126.8401206],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ea2623a177e0397164518983f727e928.bindTooltip(
                `&lt;div&gt;
                     내발산 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_868f3367f3c50e3ca89422029cf6e785 = L.marker(
                [37.5707334, 126.9064934],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_868f3367f3c50e3ca89422029cf6e785.bindTooltip(
                `&lt;div&gt;
                     낙루경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_75cd0476cd2b5eb74f787e3dd9972095 = L.marker(
                [37.5380327, 126.8385413],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_75cd0476cd2b5eb74f787e3dd9972095.bindTooltip(
                `&lt;div&gt;
                     공원 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_478234957ae092b49dc94c2144104085 = L.marker(
                [37.5443365, 126.9554285],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_478234957ae092b49dc94c2144104085.bindTooltip(
                `&lt;div&gt;
                     신덕교회 대예배실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccdc626544f147080327a31c6a297a4b = L.marker(
                [37.5143539, 127.062504],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_ccdc626544f147080327a31c6a297a4b.bindTooltip(
                `&lt;div&gt;
                     삼성1문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_09282c9f9e1af90c4ee5c1e0ab56399f = L.marker(
                [37.5482075, 127.0383673],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_09282c9f9e1af90c4ee5c1e0ab56399f.bindTooltip(
                `&lt;div&gt;
                     성수중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c4e4c2494476cda94aa01b06288af168 = L.marker(
                [37.5393082, 126.8971258],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c4e4c2494476cda94aa01b06288af168.bindTooltip(
                `&lt;div&gt;
                     한강미디어고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a6d1860280813d483b1846cc86e918c = L.marker(
                [37.6124074, 127.0499837],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_8a6d1860280813d483b1846cc86e918c.bindTooltip(
                `&lt;div&gt;
                     장위초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd1bc6a5b2ec0e4bc0b5fb50aea17b02 = L.marker(
                [37.5260467, 127.1329027],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_bd1bc6a5b2ec0e4bc0b5fb50aea17b02.bindTooltip(
                `&lt;div&gt;
                     성내3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_39d94113559283a81c8be3f6b84000ef = L.marker(
                [37.4806388, 126.9431002],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_39d94113559283a81c8be3f6b84000ef.bindTooltip(
                `&lt;div&gt;
                     관악초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c6c7f853c8faec9840fcef1d873eda27 = L.marker(
                [37.5866443, 127.0123266],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c6c7f853c8faec9840fcef1d873eda27.bindTooltip(
                `&lt;div&gt;
                     삼선초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d5e6388b2d805c9a9aa36578ef4768da = L.marker(
                [37.5439366, 127.1256067],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_d5e6388b2d805c9a9aa36578ef4768da.bindTooltip(
                `&lt;div&gt;
                     해공도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e64222ad900b33dfbe9ddfadb20db5fd = L.marker(
                [37.6507925, 127.0731328],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_e64222ad900b33dfbe9ddfadb20db5fd.bindTooltip(
                `&lt;div&gt;
                     을지초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_87c956e43b099888a3df271f941dad98 = L.marker(
                [37.5501512, 127.0875822],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_87c956e43b099888a3df271f941dad98.bindTooltip(
                `&lt;div&gt;
                     선화예술학교(중학교)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c997c941c1e47c7e217371cc4da92636 = L.marker(
                [37.5937638, 126.9497106],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c997c941c1e47c7e217371cc4da92636.bindTooltip(
                `&lt;div&gt;
                     홍제3동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c25c2866626e60b6986fd660c882916f = L.marker(
                [37.6043596, 127.0959559],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_c25c2866626e60b6986fd660c882916f.bindTooltip(
                `&lt;div&gt;
                     원광종합복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2f45b4b1372a462891490b6fa0202fbf = L.marker(
                [37.6179826, 127.0862899],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_2f45b4b1372a462891490b6fa0202fbf.bindTooltip(
                `&lt;div&gt;
                     원묵초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_756e723d092f346a76dab447a1494b4c = L.marker(
                [37.6438528, 127.0628056],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_756e723d092f346a76dab447a1494b4c.bindTooltip(
                `&lt;div&gt;
                     중원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_351edec2d8e497937c90e3f495ca1d75 = L.marker(
                [37.5549978, 127.140775],
                {}
            ).addTo(map_fefa21ac91cc04c5af5f80204b46cb0d);
        
    
            marker_351edec2d8e497937c90e3f495ca1d75.bindTooltip(
                `&lt;div&gt;
                     암사3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
&lt;/script&gt;" style="position:absolute;width:100%;height:100%;left:0;top:0;border:none !important;" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe></div></div>



```python
# Save the map as html
m.save('./data/Sheltermap.html')
```


```python
# If there are too many markers, it is hard to identify shelters
# I am going to use MarkerCluster
from folium.plugins import MarkerCluster
m = folium.Map(location = [37.5536067, 126.9674308],
              zoom_start = 12)

marker_cluster = MarkerCluster().add_to(m)

# Shelter's location
for i in range(len(raw)):
    lat = raw.loc[i, '위도']
    long = raw.loc[i, '경도']
    name = raw.loc[i, '대피소명칭']
    folium.Marker([lat, long], tooltip = name).add_to(marker_cluster)
m
```

<div style="width:100%;"><div style="position:relative;width:100%;height:0;padding-bottom:60%;"><span style="color:#565656">Make this Notebook Trusted to load map: File -> Trust Notebook</span><iframe srcdoc="&lt;!DOCTYPE html&gt;
&lt;head&gt;    
    &lt;meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=UTF-8&quot; /&gt;
    
        &lt;script&gt;
            L_NO_TOUCH = false;
            L_DISABLE_3D = false;
        &lt;/script&gt;
    
    &lt;style&gt;html, body {width: 100%;height: 100%;margin: 0;padding: 0;}&lt;/style&gt;
    &lt;style&gt;#map {position:absolute;top:0;bottom:0;right:0;left:0;}&lt;/style&gt;
    &lt;script src=&quot;https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://code.jquery.com/jquery-1.12.4.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js&quot;&gt;&lt;/script&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/gh/python-visualization/folium/folium/templates/leaflet.awesome.rotate.min.css&quot;/&gt;
    
            &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,
                initial-scale=1.0, maximum-scale=1.0, user-scalable=no&quot; /&gt;
            &lt;style&gt;
                #map_2a6f36264a0c9252a0bbff30b3e9a18c {
                    position: relative;
                    width: 100.0%;
                    height: 100.0%;
                    left: 0.0%;
                    top: 0.0%;
                }
            &lt;/style&gt;
        
    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.1.0/leaflet.markercluster.js&quot;&gt;&lt;/script&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.1.0/MarkerCluster.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.1.0/MarkerCluster.Default.css&quot;/&gt;
&lt;/head&gt;
&lt;body&gt;    
    
            &lt;div class=&quot;folium-map&quot; id=&quot;map_2a6f36264a0c9252a0bbff30b3e9a18c&quot; &gt;&lt;/div&gt;
        
&lt;/body&gt;
&lt;script&gt;    
    
            var map_2a6f36264a0c9252a0bbff30b3e9a18c = L.map(
                &quot;map_2a6f36264a0c9252a0bbff30b3e9a18c&quot;,
                {
                    center: [37.5536067, 126.9674308],
                    crs: L.CRS.EPSG3857,
                    zoom: 12,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );

            

        
    
            var tile_layer_837890366b9a2e38afbb4afee6290fc0 = L.tileLayer(
                &quot;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&quot;,
                {&quot;attribution&quot;: &quot;Data by \u0026copy; \u003ca href=\&quot;http://openstreetmap.org\&quot;\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\&quot;http://www.openstreetmap.org/copyright\&quot;\u003eODbL\u003c/a\u003e.&quot;, &quot;detectRetina&quot;: false, &quot;maxNativeZoom&quot;: 18, &quot;maxZoom&quot;: 18, &quot;minZoom&quot;: 0, &quot;noWrap&quot;: false, &quot;opacity&quot;: 1, &quot;subdomains&quot;: &quot;abc&quot;, &quot;tms&quot;: false}
            ).addTo(map_2a6f36264a0c9252a0bbff30b3e9a18c);
        
    
            var marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a = L.markerClusterGroup(
                {}
            );
            map_2a6f36264a0c9252a0bbff30b3e9a18c.addLayer(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            var marker_9ed927f4df300a202d6de0c868137696 = L.marker(
                [37.5891283, 126.9998906],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9ed927f4df300a202d6de0c868137696.bindTooltip(
                `&lt;div&gt;
                     혜화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35a4b12f5d352ad4704cb84d09dfa7b3 = L.marker(
                [37.5836603, 126.9504844],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_35a4b12f5d352ad4704cb84d09dfa7b3.bindTooltip(
                `&lt;div&gt;
                     새샘교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_82308958a9aa46592e9977e3c848b538 = L.marker(
                [37.5493434, 126.9100281],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_82308958a9aa46592e9977e3c848b538.bindTooltip(
                `&lt;div&gt;
                     한강중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_29128b8754f756ac15ee0803384dc368 = L.marker(
                [37.5534953, 126.9106658],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_29128b8754f756ac15ee0803384dc368.bindTooltip(
                `&lt;div&gt;
                     서울성산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e0a136ad20ac2d5955f28b0a31c0d094 = L.marker(
                [37.5003954, 126.9482686],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e0a136ad20ac2d5955f28b0a31c0d094.bindTooltip(
                `&lt;div&gt;
                     상도1동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1fe03026471f81ec46ab800c1163d998 = L.marker(
                [37.4997347, 126.9374323],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1fe03026471f81ec46ab800c1163d998.bindTooltip(
                `&lt;div&gt;
                     상도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2bd835f7d0e7918e05bb0118622bc324 = L.marker(
                [37.5100544, 126.9536402],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2bd835f7d0e7918e05bb0118622bc324.bindTooltip(
                `&lt;div&gt;
                     본동초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3aabaada8781b3427969b15a1697fa2c = L.marker(
                [37.5365343, 126.9650202],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3aabaada8781b3427969b15a1697fa2c.bindTooltip(
                `&lt;div&gt;
                     남정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_01753c36a2650e18f5d6b43ca12fb7fc = L.marker(
                [37.5884354, 126.9217785],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_01753c36a2650e18f5d6b43ca12fb7fc.bindTooltip(
                `&lt;div&gt;
                     응암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9d86d07a71203937fe86992cd515b42b = L.marker(
                [37.5030252, 126.9625144],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9d86d07a71203937fe86992cd515b42b.bindTooltip(
                `&lt;div&gt;
                     제일감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e6fa43bbcf351c23d7a222ce5dd5c6b8 = L.marker(
                [37.4866976, 126.9576162],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e6fa43bbcf351c23d7a222ce5dd5c6b8.bindTooltip(
                `&lt;div&gt;
                     봉천종합사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4391f0fbfa34cc63a702f9a81236cdd1 = L.marker(
                [37.5232077, 126.9368097],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4391f0fbfa34cc63a702f9a81236cdd1.bindTooltip(
                `&lt;div&gt;
                     여의도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_445b7c04432a52b8d3a9735934cd79e2 = L.marker(
                [37.4830902, 126.9787764],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_445b7c04432a52b8d3a9735934cd79e2.bindTooltip(
                `&lt;div&gt;
                     사당1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_643dce12f66d83573dffa2b0fa523af0 = L.marker(
                [37.5283727, 126.9537102],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_643dce12f66d83573dffa2b0fa523af0.bindTooltip(
                `&lt;div&gt;
                     서부성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_30f4e4c2ccf3d8d6866b58b24cc25b49 = L.marker(
                [37.4811316, 126.9901108],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_30f4e4c2ccf3d8d6866b58b24cc25b49.bindTooltip(
                `&lt;div&gt;
                     서울 이수 중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_50b3daf68b87ab8ca23c0ac6628095cc = L.marker(
                [37.5459029, 126.9535807],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_50b3daf68b87ab8ca23c0ac6628095cc.bindTooltip(
                `&lt;div&gt;
                     서울공덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56eeb07a1e1e34bd98a6fd604a7a6a13 = L.marker(
                [37.4937422, 126.9440685],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_56eeb07a1e1e34bd98a6fd604a7a6a13.bindTooltip(
                `&lt;div&gt;
                     국사봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e316306db7bf398c8b66cacf32c0feaf = L.marker(
                [37.4910611, 126.9553258],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e316306db7bf398c8b66cacf32c0feaf.bindTooltip(
                `&lt;div&gt;
                     봉현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d13de96c6eda8f92c1ccd89462bb11f0 = L.marker(
                [37.5911343, 127.0021399],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d13de96c6eda8f92c1ccd89462bb11f0.bindTooltip(
                `&lt;div&gt;
                     천주교 외방선교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c364d5aad9c3fed0fd5ccb464db5e187 = L.marker(
                [37.5484412, 127.0628283],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c364d5aad9c3fed0fd5ccb464db5e187.bindTooltip(
                `&lt;div&gt;
                     성동세무서
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1307adf4cb3ed14278121374720c9f7d = L.marker(
                [37.5147612, 127.1130378],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1307adf4cb3ed14278121374720c9f7d.bindTooltip(
                `&lt;div&gt;
                     방이중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ad5b508a88d341aeb55e5b606442bf29 = L.marker(
                [37.4998298, 127.1079155],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ad5b508a88d341aeb55e5b606442bf29.bindTooltip(
                `&lt;div&gt;
                     가락초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9fdf14a37fd5624b9f69eee4779f27c2 = L.marker(
                [37.5444065, 127.0629919],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9fdf14a37fd5624b9f69eee4779f27c2.bindTooltip(
                `&lt;div&gt;
                     성수초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36156922e3cedd67090e4cabfa6effc6 = L.marker(
                [37.5159073, 127.0878144],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_36156922e3cedd67090e4cabfa6effc6.bindTooltip(
                `&lt;div&gt;
                     잠신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_27543d93519016f96b2cb37deef163a7 = L.marker(
                [37.484888, 127.0934544],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_27543d93519016f96b2cb37deef163a7.bindTooltip(
                `&lt;div&gt;
                     태화기독교종합 사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_97e378716e0abc8e75cf9a4a820a762a = L.marker(
                [37.5172332, 127.099344],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_97e378716e0abc8e75cf9a4a820a762a.bindTooltip(
                `&lt;div&gt;
                     잠실중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_95e757be4a2ba30606d22da0f008ec00 = L.marker(
                [37.6198317, 127.0055226],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_95e757be4a2ba30606d22da0f008ec00.bindTooltip(
                `&lt;div&gt;
                     정릉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5e416895c01f4f9003b9638c66cb76b0 = L.marker(
                [37.5303512, 127.0853523],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5e416895c01f4f9003b9638c66cb76b0.bindTooltip(
                `&lt;div&gt;
                     광양중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c532f064a5beebc50a18ec1e0b44849 = L.marker(
                [37.5778498, 127.0244276],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7c532f064a5beebc50a18ec1e0b44849.bindTooltip(
                `&lt;div&gt;
                     대광고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e59638d97d332949c2a05dfefb13f604 = L.marker(
                [37.6403265, 127.0229092],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e59638d97d332949c2a05dfefb13f604.bindTooltip(
                `&lt;div&gt;
                     성실교회교육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_561fbd7f2c53ba6b4fdc5726438d6036 = L.marker(
                [37.4891812, 127.1112013],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_561fbd7f2c53ba6b4fdc5726438d6036.bindTooltip(
                `&lt;div&gt;
                     가원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_31235df26db7dcaf088f90cb8a905d92 = L.marker(
                [37.6708916, 127.0457558],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_31235df26db7dcaf088f90cb8a905d92.bindTooltip(
                `&lt;div&gt;
                     도봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7f8f760fcdb8d6188a955c14d8ea88bc = L.marker(
                [37.6564809, 127.0284014],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7f8f760fcdb8d6188a955c14d8ea88bc.bindTooltip(
                `&lt;div&gt;
                     쌍문4동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0b8a10fcf23d92a3338ffc9635eff5bc = L.marker(
                [37.4797843, 126.9856123],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0b8a10fcf23d92a3338ffc9635eff5bc.bindTooltip(
                `&lt;div&gt;
                     방배2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6becf5d43be67cd174f1422e7266253e = L.marker(
                [37.497947, 127.1394478],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6becf5d43be67cd174f1422e7266253e.bindTooltip(
                `&lt;div&gt;
                     보인고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c78ad68791a91ea3a1a44e7c1e226fc6 = L.marker(
                [37.4868368, 127.0704134],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c78ad68791a91ea3a1a44e7c1e226fc6.bindTooltip(
                `&lt;div&gt;
                     개포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_25eceddeffec2ff1730a1fd7479323cf = L.marker(
                [37.4955053, 127.1526489],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_25eceddeffec2ff1730a1fd7479323cf.bindTooltip(
                `&lt;div&gt;
                     마천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7a6fb704565861a6875bb4052a0c5cb0 = L.marker(
                [37.6621603, 127.0278544],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7a6fb704565861a6875bb4052a0c5cb0.bindTooltip(
                `&lt;div&gt;
                     학마을다사랑센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d1ce1ae7cf0816cf667247415ef6dd5d = L.marker(
                [37.5197002, 127.134857],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d1ce1ae7cf0816cf667247415ef6dd5d.bindTooltip(
                `&lt;div&gt;
                     보성중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d19e36fbe21f7d69be7eae276f20b019 = L.marker(
                [37.538511, 127.1448722],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d19e36fbe21f7d69be7eae276f20b019.bindTooltip(
                `&lt;div&gt;
                     길동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ebd62fd024e9d9bb6d7019476798bf7a = L.marker(
                [37.587503, 127.0224721],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ebd62fd024e9d9bb6d7019476798bf7a.bindTooltip(
                `&lt;div&gt;
                     안암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_47ed64520d62cfd5176bea81814d2f14 = L.marker(
                [37.6140774, 127.0436751],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_47ed64520d62cfd5176bea81814d2f14.bindTooltip(
                `&lt;div&gt;
                     장위1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a79b586bcbe992d6793bf999cd9ad3c8 = L.marker(
                [37.6488034, 127.046758],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a79b586bcbe992d6793bf999cd9ad3c8.bindTooltip(
                `&lt;div&gt;
                     창일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_deec2ce1884cef80a2b83367edb02a76 = L.marker(
                [37.4991267, 127.1001476],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_deec2ce1884cef80a2b83367edb02a76.bindTooltip(
                `&lt;div&gt;
                     남현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68d413540b12261e8b09ca97eec8c755 = L.marker(
                [37.5023094, 127.1130719],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_68d413540b12261e8b09ca97eec8c755.bindTooltip(
                `&lt;div&gt;
                     잠실여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_38c7716adbd96c41e738a4968d00d5e5 = L.marker(
                [37.5544231, 127.1420279],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_38c7716adbd96c41e738a4968d00d5e5.bindTooltip(
                `&lt;div&gt;
                     명일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6f2577cc1775218d3c03e73cb61e3c48 = L.marker(
                [37.4885099, 126.8500846],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6f2577cc1775218d3c03e73cb61e3c48.bindTooltip(
                `&lt;div&gt;
                     개웅초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_459a73ef283884ad9ae7c51d1df66c18 = L.marker(
                [37.515637, 126.8894872],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_459a73ef283884ad9ae7c51d1df66c18.bindTooltip(
                `&lt;div&gt;
                     성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_04657bc10013f550f682fbaa36c47d3f = L.marker(
                [37.6205029, 127.0688592],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_04657bc10013f550f682fbaa36c47d3f.bindTooltip(
                `&lt;div&gt;
                     한천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ddac67b4e52e9afb7b681bae3fad287 = L.marker(
                [37.4853903, 126.8838479],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8ddac67b4e52e9afb7b681bae3fad287.bindTooltip(
                `&lt;div&gt;
                     영일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_216135b3f23828e5e156cfe4964900c6 = L.marker(
                [37.5321157, 126.8477954],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_216135b3f23828e5e156cfe4964900c6.bindTooltip(
                `&lt;div&gt;
                     화곡 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c13b9650d056c7a173f48eb9bf3f0fe7 = L.marker(
                [37.4983265, 126.9134649],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c13b9650d056c7a173f48eb9bf3f0fe7.bindTooltip(
                `&lt;div&gt;
                     대길초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_76809e4c3318cc4481f1190a3ef03758 = L.marker(
                [37.6323901, 127.0660794],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_76809e4c3318cc4481f1190a3ef03758.bindTooltip(
                `&lt;div&gt;
                     중현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa75c477a67aa475d02ba5db75162a8a = L.marker(
                [37.5162167, 126.8440456],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_aa75c477a67aa475d02ba5db75162a8a.bindTooltip(
                `&lt;div&gt;
                     신남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_067edf414bd6f6a3b26ddd84ee9f0783 = L.marker(
                [37.5605231, 127.1643758],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_067edf414bd6f6a3b26ddd84ee9f0783.bindTooltip(
                `&lt;div&gt;
                     고덕2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a3150297045aed377118597bf27d4a24 = L.marker(
                [37.5154717, 126.9140858],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a3150297045aed377118597bf27d4a24.bindTooltip(
                `&lt;div&gt;
                     영원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_19644acd3fe6a501230607281bbf51f5 = L.marker(
                [37.5745659, 126.8185847],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_19644acd3fe6a501230607281bbf51f5.bindTooltip(
                `&lt;div&gt;
                     우정 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bbe99e014276b17d65a05ad3a36f232f = L.marker(
                [37.493891, 126.8314824],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_bbe99e014276b17d65a05ad3a36f232f.bindTooltip(
                `&lt;div&gt;
                     수궁동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5c5faf2f9ffaec2db0f635e7df83ad5f = L.marker(
                [37.495209, 126.8352071],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5c5faf2f9ffaec2db0f635e7df83ad5f.bindTooltip(
                `&lt;div&gt;
                     연세중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b60fb771d15612f5dbd374ad98d2905a = L.marker(
                [37.5015627, 126.9090253],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b60fb771d15612f5dbd374ad98d2905a.bindTooltip(
                `&lt;div&gt;
                     천주교살레시오회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cdd2e3739aa8bb6892d4ac94ddfd53fb = L.marker(
                [37.554995, 126.87129],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cdd2e3739aa8bb6892d4ac94ddfd53fb.bindTooltip(
                `&lt;div&gt;
                     염경초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fd1656a20d7f52886e3860a1ad5c4514 = L.marker(
                [37.5031007, 126.9308448],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fd1656a20d7f52886e3860a1ad5c4514.bindTooltip(
                `&lt;div&gt;
                     강현중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ac4a372a9c1bad550546d4e1326594dc = L.marker(
                [37.6577443, 127.0732997],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ac4a372a9c1bad550546d4e1326594dc.bindTooltip(
                `&lt;div&gt;
                     중계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_33487e52c88e5e18f745b6c16d5a58b3 = L.marker(
                [37.4881908, 126.8820542],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_33487e52c88e5e18f745b6c16d5a58b3.bindTooltip(
                `&lt;div&gt;
                     서울남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b540e14b5f3058f3cee7d125d3efe05 = L.marker(
                [37.5840138, 126.9868971],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8b540e14b5f3058f3cee7d125d3efe05.bindTooltip(
                `&lt;div&gt;
                     중앙고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_baf612013d9c8dbc3924ef5f1b708e1f = L.marker(
                [37.505164, 127.1408978],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_baf612013d9c8dbc3924ef5f1b708e1f.bindTooltip(
                `&lt;div&gt;
                     거여초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7ca40bc6cfd0f1de28f106461b7f80bd = L.marker(
                [37.5050993, 126.8490857],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7ca40bc6cfd0f1de28f106461b7f80bd.bindTooltip(
                `&lt;div&gt;
                     세곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4215b41aa6bcb73f2db4f88ddcc46029 = L.marker(
                [37.5798578, 126.8153271],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4215b41aa6bcb73f2db4f88ddcc46029.bindTooltip(
                `&lt;div&gt;
                     치현 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f1ab9850181cb84f40073d173e16ad2a = L.marker(
                [37.4893503, 126.894405],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f1ab9850181cb84f40073d173e16ad2a.bindTooltip(
                `&lt;div&gt;
                     영서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3fc53c5dc33c4bb1ad38b1ad0f2bb3bb = L.marker(
                [37.5688553, 127.035735],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3fc53c5dc33c4bb1ad38b1ad0f2bb3bb.bindTooltip(
                `&lt;div&gt;
                     동명초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7372925e4d26119d77fb98430ffa39c3 = L.marker(
                [37.4940691, 126.9098472],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7372925e4d26119d77fb98430ffa39c3.bindTooltip(
                `&lt;div&gt;
                     대림감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fe53f05cf0567f96f1bb49c2563656ee = L.marker(
                [37.5100825, 126.9179782],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fe53f05cf0567f96f1bb49c2563656ee.bindTooltip(
                `&lt;div&gt;
                     영신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_78a7afe1f6cd9fb1054dbce069190765 = L.marker(
                [37.5006962, 126.8958089],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_78a7afe1f6cd9fb1054dbce069190765.bindTooltip(
                `&lt;div&gt;
                     신영초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ddd192db99388b9d3a40a1767356b97a = L.marker(
                [37.5373363, 126.870293],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ddd192db99388b9d3a40a1767356b97a.bindTooltip(
                `&lt;div&gt;
                     정목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c7dd461e2378ba329c503e4410ecc394 = L.marker(
                [37.534974, 126.9532015],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c7dd461e2378ba329c503e4410ecc394.bindTooltip(
                `&lt;div&gt;
                     성심여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2a1f9aaeb4a6232369100b4d5636439e = L.marker(
                [37.5515947, 126.9451277],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2a1f9aaeb4a6232369100b4d5636439e.bindTooltip(
                `&lt;div&gt;
                     숭문중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb85d6c2ec456cd1ef0a1c8b5894142d = L.marker(
                [37.5003529, 126.9440991],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eb85d6c2ec456cd1ef0a1c8b5894142d.bindTooltip(
                `&lt;div&gt;
                     신상도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b73cacf3c2a2b2410e9f0a78c44293ea = L.marker(
                [37.538875, 126.9577723],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b73cacf3c2a2b2410e9f0a78c44293ea.bindTooltip(
                `&lt;div&gt;
                     도원동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eff0701b4843c12b437aa6650b41af72 = L.marker(
                [37.5084712, 126.9656204],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eff0701b4843c12b437aa6650b41af72.bindTooltip(
                `&lt;div&gt;
                     흑석초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e4def0df7792b6f81f297e161659593b = L.marker(
                [37.4853098, 126.9424573],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e4def0df7792b6f81f297e161659593b.bindTooltip(
                `&lt;div&gt;
                     은천동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9d92d8c4b0188a267e6deed85c3ea0f1 = L.marker(
                [37.552715, 127.0199849],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9d92d8c4b0188a267e6deed85c3ea0f1.bindTooltip(
                `&lt;div&gt;
                     금호초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d97e3aca6604a9a6425cc3c7389bdc4a = L.marker(
                [37.548769, 126.9436862],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d97e3aca6604a9a6425cc3c7389bdc4a.bindTooltip(
                `&lt;div&gt;
                     용강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_498c9a65f6732fed999ed9a0a99c5951 = L.marker(
                [37.5811339, 126.9714765],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_498c9a65f6732fed999ed9a0a99c5951.bindTooltip(
                `&lt;div&gt;
                     자교교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c2a7ae53c01da38896690df4d7f02c2 = L.marker(
                [37.574225, 126.9646777],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7c2a7ae53c01da38896690df4d7f02c2.bindTooltip(
                `&lt;div&gt;
                     종로문화체육센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_121eebfc2f3f39ca72884ab8fab9e5c5 = L.marker(
                [37.5762443, 127.0144101],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_121eebfc2f3f39ca72884ab8fab9e5c5.bindTooltip(
                `&lt;div&gt;
                     창신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_66430de963023e6d056abc1db3df24ee = L.marker(
                [37.5362084, 126.9881882],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_66430de963023e6d056abc1db3df24ee.bindTooltip(
                `&lt;div&gt;
                     이태원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a804fac00f65e407b3cece69ac7677bc = L.marker(
                [37.5777101, 126.9076339],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a804fac00f65e407b3cece69ac7677bc.bindTooltip(
                `&lt;div&gt;
                     북가좌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3cb434989dda2571abb7ab987a88f043 = L.marker(
                [37.6030314, 127.0142433],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3cb434989dda2571abb7ab987a88f043.bindTooltip(
                `&lt;div&gt;
                     정릉교회(교육관)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5f9c3f921435dd1b50e3edfa7d3d42b3 = L.marker(
                [37.587081, 126.9716546],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5f9c3f921435dd1b50e3edfa7d3d42b3.bindTooltip(
                `&lt;div&gt;
                     경복고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4e19dc7657e33c83c9d58a94539c0233 = L.marker(
                [37.605569, 126.968525],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4e19dc7657e33c83c9d58a94539c0233.bindTooltip(
                `&lt;div&gt;
                     서울예술고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0b8411a6057a5416596a0dfa06ac3189 = L.marker(
                [37.5527927, 126.9160894],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0b8411a6057a5416596a0dfa06ac3189.bindTooltip(
                `&lt;div&gt;
                     서현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_875ebe7cd13602b59cf202a343fe67b8 = L.marker(
                [37.5238286, 126.9039522],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_875ebe7cd13602b59cf202a343fe67b8.bindTooltip(
                `&lt;div&gt;
                     영중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c12a1f6adb99f6962811d7beaaec704 = L.marker(
                [37.5332365, 126.8929147],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7c12a1f6adb99f6962811d7beaaec704.bindTooltip(
                `&lt;div&gt;
                     선유정보문화도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3d8768d50b5ef596d91d751fd180a9e0 = L.marker(
                [37.5766667, 127.0060369],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3d8768d50b5ef596d91d751fd180a9e0.bindTooltip(
                `&lt;div&gt;
                     종로노인종합복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cc82b354655db874fb2c90bd7227014b = L.marker(
                [37.5814717, 127.0341328],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cc82b354655db874fb2c90bd7227014b.bindTooltip(
                `&lt;div&gt;
                     성일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6398848655d3b82ffbe8ccc032d40a29 = L.marker(
                [37.541192, 127.0816776],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6398848655d3b82ffbe8ccc032d40a29.bindTooltip(
                `&lt;div&gt;
                     건국대학교부속중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b98bd81e639dca0c76561c9bf8d16c6a = L.marker(
                [37.5784972, 127.0576385],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b98bd81e639dca0c76561c9bf8d16c6a.bindTooltip(
                `&lt;div&gt;
                     전농2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9db5ec5363c941cd18e6ea6199c07dc9 = L.marker(
                [37.588003, 127.0510851],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9db5ec5363c941cd18e6ea6199c07dc9.bindTooltip(
                `&lt;div&gt;
                     청량중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0019193eb5eda5466c983bb7a8c7faee = L.marker(
                [37.4955666, 127.0564098],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0019193eb5eda5466c983bb7a8c7faee.bindTooltip(
                `&lt;div&gt;
                     단대부고체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_91fa733e4d9d6672922dd96fc334430e = L.marker(
                [37.491659, 127.14209],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_91fa733e4d9d6672922dd96fc334430e.bindTooltip(
                `&lt;div&gt;
                     송파공업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_219c41e98563f60f01abc16bcaf1539e = L.marker(
                [37.5450331, 127.1368227],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_219c41e98563f60f01abc16bcaf1539e.bindTooltip(
                `&lt;div&gt;
                     천호1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a2000b27a1f57b76af9ebee39eb053f4 = L.marker(
                [37.5233225, 127.0238994],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a2000b27a1f57b76af9ebee39eb053f4.bindTooltip(
                `&lt;div&gt;
                     신구초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_86d316d85e28c1a463c0ff031c60f888 = L.marker(
                [37.5671689, 126.908768],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_86d316d85e28c1a463c0ff031c60f888.bindTooltip(
                `&lt;div&gt;
                     샛터경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1b318d43cfbbf66ab8939a361884c0e4 = L.marker(
                [37.592814, 127.0967718],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1b318d43cfbbf66ab8939a361884c0e4.bindTooltip(
                `&lt;div&gt;
                     혜원여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3632269a3457b0b5d425d8db16c982ce = L.marker(
                [37.6046427, 127.0140313],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3632269a3457b0b5d425d8db16c982ce.bindTooltip(
                `&lt;div&gt;
                     숭덕초등학교(교사동)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb2acf8a5f5a35b167559c91cbe176f6 = L.marker(
                [37.5473127, 126.9768736],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_bb2acf8a5f5a35b167559c91cbe176f6.bindTooltip(
                `&lt;div&gt;
                     삼광초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65e5eca458018802f620fa3bc466af5c = L.marker(
                [37.5333499, 127.1419656],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_65e5eca458018802f620fa3bc466af5c.bindTooltip(
                `&lt;div&gt;
                     둔촌2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ff4d5e83e1d4958fc958f515dce11d60 = L.marker(
                [37.5978229, 127.065512],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ff4d5e83e1d4958fc958f515dce11d60.bindTooltip(
                `&lt;div&gt;
                     이문1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cbad423bfd14ae4006b3f041ca5f5f34 = L.marker(
                [37.5112094, 127.0459862],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cbad423bfd14ae4006b3f041ca5f5f34.bindTooltip(
                `&lt;div&gt;
                     삼성2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9814816726a312aae855d61e15b6d071 = L.marker(
                [37.5044359, 127.0755624],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9814816726a312aae855d61e15b6d071.bindTooltip(
                `&lt;div&gt;
                     아주중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2e1e32c83ebe51253acbb37711adfe8c = L.marker(
                [37.5732279, 127.0859972],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2e1e32c83ebe51253acbb37711adfe8c.bindTooltip(
                `&lt;div&gt;
                     중랑청소년수련관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccafcb83686b858da41165c19f70c108 = L.marker(
                [37.5658372, 127.0892944],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ccafcb83686b858da41165c19f70c108.bindTooltip(
                `&lt;div&gt;
                     용곡중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_71ba5a546d6e98dfa881349012228e11 = L.marker(
                [37.5770708, 127.0882851],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_71ba5a546d6e98dfa881349012228e11.bindTooltip(
                `&lt;div&gt;
                     면남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_709497ff38cb405a75f273b31b3b75ce = L.marker(
                [37.6324049, 127.0360585],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_709497ff38cb405a75f273b31b3b75ce.bindTooltip(
                `&lt;div&gt;
                     번동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_78a556b79e92a89c5052f860a554d988 = L.marker(
                [37.5010971, 127.1502793],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_78a556b79e92a89c5052f860a554d988.bindTooltip(
                `&lt;div&gt;
                     남천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_10fb1829408003c2aabc9abbb09f953c = L.marker(
                [37.571937, 127.0511789],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_10fb1829408003c2aabc9abbb09f953c.bindTooltip(
                `&lt;div&gt;
                     답십리1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b384004f99c674203f9fd52aa566e1b3 = L.marker(
                [37.6100265, 127.046097],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b384004f99c674203f9fd52aa566e1b3.bindTooltip(
                `&lt;div&gt;
                     월곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e4a82dbc569aaea62dc62088e1ddc483 = L.marker(
                [37.4932558, 127.0567995],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e4a82dbc569aaea62dc62088e1ddc483.bindTooltip(
                `&lt;div&gt;
                     대치1문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fbb13de3b227f8b36fb3904c33d02520 = L.marker(
                [37.4910227, 127.1016166],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fbb13de3b227f8b36fb3904c33d02520.bindTooltip(
                `&lt;div&gt;
                     수서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5302963107ca8326db83995f71066b30 = L.marker(
                [37.5515224, 126.8758771],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5302963107ca8326db83995f71066b30.bindTooltip(
                `&lt;div&gt;
                     염창강변 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1e70a22f0fa874f9f45878bce7d7d704 = L.marker(
                [37.5063495, 126.8568307],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1e70a22f0fa874f9f45878bce7d7d704.bindTooltip(
                `&lt;div&gt;
                     덕의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d371fbb355c81c36d61a00fb46910065 = L.marker(
                [37.4892126, 126.9141494],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d371fbb355c81c36d61a00fb46910065.bindTooltip(
                `&lt;div&gt;
                     문창초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7f7ca3809dc30987162b71e5728ac2a1 = L.marker(
                [37.5404771, 126.8283968],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7f7ca3809dc30987162b71e5728ac2a1.bindTooltip(
                `&lt;div&gt;
                     신월중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_840ed385b7f64db15fd16add417b7cd5 = L.marker(
                [37.5491882, 126.8460525],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_840ed385b7f64db15fd16add417b7cd5.bindTooltip(
                `&lt;div&gt;
                     우장초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_267018de31be11e35cddc657c69a3334 = L.marker(
                [37.5101332, 126.8601557],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_267018de31be11e35cddc657c69a3334.bindTooltip(
                `&lt;div&gt;
                     계남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_429352f000de1120e53f756f530feae9 = L.marker(
                [37.5304363, 126.8421456],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_429352f000de1120e53f756f530feae9.bindTooltip(
                `&lt;div&gt;
                     예촌 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_24bdd31432ca715085f4d8b3e2da64f7 = L.marker(
                [37.4683134, 126.8941597],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_24bdd31432ca715085f4d8b3e2da64f7.bindTooltip(
                `&lt;div&gt;
                     가산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d110d09668ecba824de56d17dfa4791b = L.marker(
                [37.5248657, 126.8981321],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d110d09668ecba824de56d17dfa4791b.bindTooltip(
                `&lt;div&gt;
                     당산천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e2194228c9f63d2cc9abddcec678132c = L.marker(
                [37.5016163, 126.9222769],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e2194228c9f63d2cc9abddcec678132c.bindTooltip(
                `&lt;div&gt;
                     서울공업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0539eb23da6a30897c36ffbb8ebff156 = L.marker(
                [37.5160437, 126.8336364],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0539eb23da6a30897c36ffbb8ebff156.bindTooltip(
                `&lt;div&gt;
                     강월초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f637174347d27033a5f8a4e21f5ba4d0 = L.marker(
                [37.5127692, 126.8743889],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f637174347d27033a5f8a4e21f5ba4d0.bindTooltip(
                `&lt;div&gt;
                     신목고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_07d0d82a42e988af362d75761ab52402 = L.marker(
                [37.5367069, 126.8545682],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_07d0d82a42e988af362d75761ab52402.bindTooltip(
                `&lt;div&gt;
                     신곡 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1960d8abc6365fb6d8e7687883d5f424 = L.marker(
                [37.5268479, 126.9076599],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1960d8abc6365fb6d8e7687883d5f424.bindTooltip(
                `&lt;div&gt;
                     영동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_13998c59820afdbd6c538c695c1c379f = L.marker(
                [37.5383352, 126.8234956],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_13998c59820afdbd6c538c695c1c379f.bindTooltip(
                `&lt;div&gt;
                     양원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_403f6cb4692ec8eb12428f1bdf50e573 = L.marker(
                [37.5311117, 126.8594439],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_403f6cb4692ec8eb12428f1bdf50e573.bindTooltip(
                `&lt;div&gt;
                     화친 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_08bc7ff71600cc6b771419d1a831b7e8 = L.marker(
                [37.5556716, 126.8359438],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_08bc7ff71600cc6b771419d1a831b7e8.bindTooltip(
                `&lt;div&gt;
                     가곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7ae105afaf3d3ea1e1480d43b58efc75 = L.marker(
                [37.5347151, 126.9021023],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7ae105afaf3d3ea1e1480d43b58efc75.bindTooltip(
                `&lt;div&gt;
                     당산2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eeb5be66a797ade5d5f05676298ac2b4 = L.marker(
                [37.6100943, 127.066135],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eeb5be66a797ade5d5f05676298ac2b4.bindTooltip(
                `&lt;div&gt;
                     석관고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8fc767cc7f174bb21701f4d5ed224315 = L.marker(
                [37.6524153, 127.068871],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8fc767cc7f174bb21701f4d5ed224315.bindTooltip(
                `&lt;div&gt;
                     상계중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46bbbf0791210195f83c849488374577 = L.marker(
                [37.5084786, 126.9341598],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_46bbbf0791210195f83c849488374577.bindTooltip(
                `&lt;div&gt;
                     영등포고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b30b5dd9976f45892f0c9df58ee8612b = L.marker(
                [37.5470114, 127.1369688],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b30b5dd9976f45892f0c9df58ee8612b.bindTooltip(
                `&lt;div&gt;
                     천호초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_49c06dbc6d1353381e17918f5a37fe7b = L.marker(
                [37.5359049, 126.8660078],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_49c06dbc6d1353381e17918f5a37fe7b.bindTooltip(
                `&lt;div&gt;
                     영도중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_37f61ebee5e2474dd5694bcd5a6bba9f = L.marker(
                [37.5009264, 126.8572476],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_37f61ebee5e2474dd5694bcd5a6bba9f.bindTooltip(
                `&lt;div&gt;
                     고척초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e451cb4b5cc18af331880cf7182b983d = L.marker(
                [37.5481433, 126.8687039],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e451cb4b5cc18af331880cf7182b983d.bindTooltip(
                `&lt;div&gt;
                     양동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d3d68429063fda0db1d1f003d69140f9 = L.marker(
                [37.5085173, 126.9065702],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d3d68429063fda0db1d1f003d69140f9.bindTooltip(
                `&lt;div&gt;
                     신길3동구립경로동
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0566b4dc5297c98e0e959b1921e31f25 = L.marker(
                [37.5226361, 126.8453788],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0566b4dc5297c98e0e959b1921e31f25.bindTooltip(
                `&lt;div&gt;
                     한민교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb3b9cd03d4e0629bf6b3cedc65f36c6 = L.marker(
                [37.6019774, 126.9043788],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eb3b9cd03d4e0629bf6b3cedc65f36c6.bindTooltip(
                `&lt;div&gt;
                     덕산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3482b4dcbe68e57377ea852369af476c = L.marker(
                [37.4782029, 126.8963861],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3482b4dcbe68e57377ea852369af476c.bindTooltip(
                `&lt;div&gt;
                     가산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3413b3614735da9b0e6ca78fbe38401d = L.marker(
                [37.4995867, 126.8892791],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3413b3614735da9b0e6ca78fbe38401d.bindTooltip(
                `&lt;div&gt;
                     신구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_94adebc4cb0f81005694dbb8e7fe2ae1 = L.marker(
                [37.5264535, 126.8604868],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_94adebc4cb0f81005694dbb8e7fe2ae1.bindTooltip(
                `&lt;div&gt;
                     신정사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f2af3a372ad15957152e2179ac6420a0 = L.marker(
                [37.5644753, 127.0835198],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f2af3a372ad15957152e2179ac6420a0.bindTooltip(
                `&lt;div&gt;
                     대원고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7973f3f71513153f86e8496b499f3244 = L.marker(
                [37.6660552, 127.029165],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7973f3f71513153f86e8496b499f3244.bindTooltip(
                `&lt;div&gt;
                     서울신방학초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0f1303d94a5b1691508024d53d9cf195 = L.marker(
                [37.4998265, 127.0578055],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0f1303d94a5b1691508024d53d9cf195.bindTooltip(
                `&lt;div&gt;
                     대치4문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a7cd99acb6effbea47a0ab34b620d07c = L.marker(
                [37.5485021, 127.1011402],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a7cd99acb6effbea47a0ab34b620d07c.bindTooltip(
                `&lt;div&gt;
                     서울광장초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a9b2efe4a47eda46eee7d16d4e052a54 = L.marker(
                [37.5920562, 127.0998384],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a9b2efe4a47eda46eee7d16d4e052a54.bindTooltip(
                `&lt;div&gt;
                     면일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b7b21c2475346a228f4fe067db8941ae = L.marker(
                [37.5073633, 127.1111866],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b7b21c2475346a228f4fe067db8941ae.bindTooltip(
                `&lt;div&gt;
                     송파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb4ed8ec64d62e5f6d1ca9585d6e0ea3 = L.marker(
                [37.5428856, 127.0792352],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eb4ed8ec64d62e5f6d1ca9585d6e0ea3.bindTooltip(
                `&lt;div&gt;
                     구의중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_083a839094e2ba55c4a5c82bc6ac1cd6 = L.marker(
                [37.6583129, 127.0219836],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_083a839094e2ba55c4a5c82bc6ac1cd6.bindTooltip(
                `&lt;div&gt;
                     서울초당초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a94833737c8d958bbda15ac23553f1c0 = L.marker(
                [37.6656656, 127.0314118],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a94833737c8d958bbda15ac23553f1c0.bindTooltip(
                `&lt;div&gt;
                     방학중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d4211511cfd10e2cd53550437d29bb8 = L.marker(
                [37.5450598, 127.0983593],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6d4211511cfd10e2cd53550437d29bb8.bindTooltip(
                `&lt;div&gt;
                     양진중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb80dc267e1e59ca481860c758f76361 = L.marker(
                [37.5572727, 127.0332743],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_bb80dc267e1e59ca481860c758f76361.bindTooltip(
                `&lt;div&gt;
                     무학여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6984eff2d322325a18d8d15816199398 = L.marker(
                [37.5508795, 127.0879836],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6984eff2d322325a18d8d15816199398.bindTooltip(
                `&lt;div&gt;
                     선화예술고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa3f32a7f715fc50f79bc184b7283cf8 = L.marker(
                [37.5280392, 127.0437328],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_aa3f32a7f715fc50f79bc184b7283cf8.bindTooltip(
                `&lt;div&gt;
                     청담고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e3d5ff8210fa06b2efd3a1bca3f48ce7 = L.marker(
                [37.4872623, 126.8371987],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e3d5ff8210fa06b2efd3a1bca3f48ce7.bindTooltip(
                `&lt;div&gt;
                     오남중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_236ea051eec690fff62c20e4416cada4 = L.marker(
                [37.5112156, 126.9409405],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_236ea051eec690fff62c20e4416cada4.bindTooltip(
                `&lt;div&gt;
                     노량진초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_96e1d2b04ebf9e66735cfb5f5f4aeb52 = L.marker(
                [37.5377434, 126.8959355],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_96e1d2b04ebf9e66735cfb5f5f4aeb52.bindTooltip(
                `&lt;div&gt;
                     양평2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0ab628dbc00c8f9dd36dba7dc30bd6b2 = L.marker(
                [37.631742, 127.0113905],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0ab628dbc00c8f9dd36dba7dc30bd6b2.bindTooltip(
                `&lt;div&gt;
                     유현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca95ac518dbccd89b842f7aa10bf227a = L.marker(
                [37.5017232, 127.0927534],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ca95ac518dbccd89b842f7aa10bf227a.bindTooltip(
                `&lt;div&gt;
                     삼전초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2269db766153afa2a4183ff3de345bcb = L.marker(
                [37.65265, 127.0183509],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2269db766153afa2a4183ff3de345bcb.bindTooltip(
                `&lt;div&gt;
                     효문고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_61ff146d341a9ca2f35d070e43d714ff = L.marker(
                [37.5293434, 127.0850088],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_61ff146d341a9ca2f35d070e43d714ff.bindTooltip(
                `&lt;div&gt;
                     광양고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_12cf7cc79ea03dd31c34a35da3c70837 = L.marker(
                [37.534161, 127.1251979],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_12cf7cc79ea03dd31c34a35da3c70837.bindTooltip(
                `&lt;div&gt;
                     성내동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e343a6fc8d86a32cf61c3a71e7ecf7d0 = L.marker(
                [37.6418513, 127.0692587],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e343a6fc8d86a32cf61c3a71e7ecf7d0.bindTooltip(
                `&lt;div&gt;
                     용동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e28db17acd3adf417699aeffca19eb00 = L.marker(
                [37.5527209, 127.1465021],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e28db17acd3adf417699aeffca19eb00.bindTooltip(
                `&lt;div&gt;
                     고명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_245d8e8a5a8f0dabc4a4ce452ffe0994 = L.marker(
                [37.4549744, 126.9049492],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_245d8e8a5a8f0dabc4a4ce452ffe0994.bindTooltip(
                `&lt;div&gt;
                     시흥초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56212f33c8cd638843c92cb9104d42af = L.marker(
                [37.5243318, 126.8480042],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_56212f33c8cd638843c92cb9104d42af.bindTooltip(
                `&lt;div&gt;
                     양강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_10b8b5645a78b1836780e057ec39aca9 = L.marker(
                [37.5173028, 126.890644],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_10b8b5645a78b1836780e057ec39aca9.bindTooltip(
                `&lt;div&gt;
                     문래동 성당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_886d5429828ca16fc6234f7810c4c6f5 = L.marker(
                [37.5080706, 126.9069114],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_886d5429828ca16fc6234f7810c4c6f5.bindTooltip(
                `&lt;div&gt;
                     도림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_08d5cd83fb4f846fec0139788e1aa6f3 = L.marker(
                [37.529648, 126.8407685],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_08d5cd83fb4f846fec0139788e1aa6f3.bindTooltip(
                `&lt;div&gt;
                     곰달래 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_521022c73f3c29a24386c82347f3290e = L.marker(
                [37.5001732, 126.8892826],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_521022c73f3c29a24386c82347f3290e.bindTooltip(
                `&lt;div&gt;
                     구로5동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_628c1d0d2a72d9f81284b39fc257dfc8 = L.marker(
                [37.556548, 127.0346801],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_628c1d0d2a72d9f81284b39fc257dfc8.bindTooltip(
                `&lt;div&gt;
                     행당초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b327a94594a142a53499d6dd330ef83 = L.marker(
                [37.5229564, 126.9348694],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5b327a94594a142a53499d6dd330ef83.bindTooltip(
                `&lt;div&gt;
                     여의도여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_975d16f529074f832e5792fda87a58b1 = L.marker(
                [37.4898178, 127.076323],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_975d16f529074f832e5792fda87a58b1.bindTooltip(
                `&lt;div&gt;
                     일원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1ae52e5082a5723028e3b8b69091c71d = L.marker(
                [37.5356176, 126.9725709],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1ae52e5082a5723028e3b8b69091c71d.bindTooltip(
                `&lt;div&gt;
                     용산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_114e6a725cc36e1cf18cc6b4db18b15c = L.marker(
                [37.5171806, 126.8726046],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_114e6a725cc36e1cf18cc6b4db18b15c.bindTooltip(
                `&lt;div&gt;
                     신목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a8b0b48f74ed9b6de137b4fc05284f07 = L.marker(
                [37.5135132, 126.873753],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a8b0b48f74ed9b6de137b4fc05284f07.bindTooltip(
                `&lt;div&gt;
                     목일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7e2403b611722a10268ae4743f7aac19 = L.marker(
                [37.4805822, 127.0618915],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7e2403b611722a10268ae4743f7aac19.bindTooltip(
                `&lt;div&gt;
                     개포중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d274cb99773661b86b7af12960d8f78b = L.marker(
                [37.5479846, 126.9482633],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d274cb99773661b86b7af12960d8f78b.bindTooltip(
                `&lt;div&gt;
                     서울여자고등학교 (체
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_89a5fef0b5b22ab75d52c128ce6f16b8 = L.marker(
                [37.5869435, 127.0626316],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_89a5fef0b5b22ab75d52c128ce6f16b8.bindTooltip(
                `&lt;div&gt;
                     휘경중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_19a8719766fc3b9aab226cb5454125de = L.marker(
                [37.5195144, 126.895944],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_19a8719766fc3b9aab226cb5454125de.bindTooltip(
                `&lt;div&gt;
                     양화중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5d8731cf57e198d9c28a8491792abfd8 = L.marker(
                [37.5202512, 127.1108977],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5d8731cf57e198d9c28a8491792abfd8.bindTooltip(
                `&lt;div&gt;
                     잠실초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e9a113de8b68d4c80cd982529806f3d = L.marker(
                [37.5668755, 126.8160266],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0e9a113de8b68d4c80cd982529806f3d.bindTooltip(
                `&lt;div&gt;
                     일심 경로당2
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d974322c19ad97581c3683d17d07de41 = L.marker(
                [37.5045585, 126.8444526],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d974322c19ad97581c3683d17d07de41.bindTooltip(
                `&lt;div&gt;
                     매봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a9b89117a42749e5f2e525cbd90403d4 = L.marker(
                [37.5310602, 127.0897244],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a9b89117a42749e5f2e525cbd90403d4.bindTooltip(
                `&lt;div&gt;
                     양남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d23654fa6b242b718eda5914b68104b2 = L.marker(
                [37.60333, 127.0942823],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d23654fa6b242b718eda5914b68104b2.bindTooltip(
                `&lt;div&gt;
                     중화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_691b2beb18ee1718425cd87fd1822458 = L.marker(
                [37.5677935, 127.0665531],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_691b2beb18ee1718425cd87fd1822458.bindTooltip(
                `&lt;div&gt;
                     장안1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_11d8c74aef8f1a1ec0b0d979d066d9c2 = L.marker(
                [37.5585842, 127.1490669],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_11d8c74aef8f1a1ec0b0d979d066d9c2.bindTooltip(
                `&lt;div&gt;
                     시영경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_71a51c627a9791a6db847b1272bf6fab = L.marker(
                [37.5462225, 126.8797749],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_71a51c627a9791a6db847b1272bf6fab.bindTooltip(
                `&lt;div&gt;
                     구립용왕경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eda33ac383e62679b8c3c0d8aec26f03 = L.marker(
                [37.5876999, 126.9448951],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eda33ac383e62679b8c3c0d8aec26f03.bindTooltip(
                `&lt;div&gt;
                     홍제1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1c7bb984024cefd68b8c3ae408d83b47 = L.marker(
                [37.5514658, 127.1326698],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1c7bb984024cefd68b8c3ae408d83b47.bindTooltip(
                `&lt;div&gt;
                     암사1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eec19247e1f8c93e16f34d7ca83338b5 = L.marker(
                [37.5818448, 126.91075],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eec19247e1f8c93e16f34d7ca83338b5.bindTooltip(
                `&lt;div&gt;
                     충신교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cbb2574369b8f67ec25abe35dc8064ce = L.marker(
                [37.5448609, 126.9139085],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cbb2574369b8f67ec25abe35dc8064ce.bindTooltip(
                `&lt;div&gt;
                     마리스타교육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_881e7a3a642234818e36ed5e848fe6f8 = L.marker(
                [37.5099704, 126.9206879],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_881e7a3a642234818e36ed5e848fe6f8.bindTooltip(
                `&lt;div&gt;
                     구립창신경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c6f473e33e5b4476c80c26e96702b2a4 = L.marker(
                [37.5775087, 126.9669392],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c6f473e33e5b4476c80c26e96702b2a4.bindTooltip(
                `&lt;div&gt;
                     매동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a0c02d4d03a055ad45b9747e6eb1de6a = L.marker(
                [37.5518833, 126.8550582],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a0c02d4d03a055ad45b9747e6eb1de6a.bindTooltip(
                `&lt;div&gt;
                     등서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_099bb63a96cb3c4f21cfad890fea1286 = L.marker(
                [37.536006, 126.8507829],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_099bb63a96cb3c4f21cfad890fea1286.bindTooltip(
                `&lt;div&gt;
                     안골 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e47fe22391fdcf29d99a58f16a32a457 = L.marker(
                [37.5258547, 126.8512654],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e47fe22391fdcf29d99a58f16a32a457.bindTooltip(
                `&lt;div&gt;
                     양동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2fe72572f8f31215d7f5999a47260e80 = L.marker(
                [37.5803467, 126.9231625],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2fe72572f8f31215d7f5999a47260e80.bindTooltip(
                `&lt;div&gt;
                     명지대방목학술정보관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_820b95820931ca6145df0c3fcb330b3f = L.marker(
                [37.5927763, 126.9517221],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_820b95820931ca6145df0c3fcb330b3f.bindTooltip(
                `&lt;div&gt;
                     인왕중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8f64ca5923956f939581cfbf50608ed3 = L.marker(
                [37.5516106, 126.8379309],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8f64ca5923956f939581cfbf50608ed3.bindTooltip(
                `&lt;div&gt;
                     내발산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_329b01d31d8a93b196af5df6f5657a1b = L.marker(
                [37.5821284, 126.9218074],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_329b01d31d8a93b196af5df6f5657a1b.bindTooltip(
                `&lt;div&gt;
                     삼오경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_24c6a60324befb7aa831f191a1c182a3 = L.marker(
                [37.5428831, 126.8899568],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_24c6a60324befb7aa831f191a1c182a3.bindTooltip(
                `&lt;div&gt;
                     구립양화경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_359d632aadf7ce789ee6f94982412c8a = L.marker(
                [37.5749875, 126.9881341],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_359d632aadf7ce789ee6f94982412c8a.bindTooltip(
                `&lt;div&gt;
                     교동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9c2db36c6f53ccb576e33bf2dd2e0ac5 = L.marker(
                [37.495335, 127.033256],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9c2db36c6f53ccb576e33bf2dd2e0ac5.bindTooltip(
                `&lt;div&gt;
                     역삼1동문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ba07d062889140b968bff174f8597113 = L.marker(
                [37.5224143, 126.8409982],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ba07d062889140b968bff174f8597113.bindTooltip(
                `&lt;div&gt;
                     강서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0018bdb79342c3325dc2e63bc9e28167 = L.marker(
                [37.5725204, 126.8198968],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0018bdb79342c3325dc2e63bc9e28167.bindTooltip(
                `&lt;div&gt;
                     동부 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9c75e384ec812bfb66f9465c20cad1f0 = L.marker(
                [37.526241, 127.1372817],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9c75e384ec812bfb66f9465c20cad1f0.bindTooltip(
                `&lt;div&gt;
                     둔촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ad2c8deb3598a55fb7630f98f441ac11 = L.marker(
                [37.5628192, 127.0888117],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ad2c8deb3598a55fb7630f98f441ac11.bindTooltip(
                `&lt;div&gt;
                     대원여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_42ec6cf6ed4eb101cec3cf38643a9099 = L.marker(
                [37.651165, 127.0805707],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_42ec6cf6ed4eb101cec3cf38643a9099.bindTooltip(
                `&lt;div&gt;
                     불암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c6ac5c52006b5020cdecaa5a4c0ebe3e = L.marker(
                [37.5467561, 127.1395344],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c6ac5c52006b5020cdecaa5a4c0ebe3e.bindTooltip(
                `&lt;div&gt;
                     천호중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b904ac2a375a6c457fe88ff9e323a0be = L.marker(
                [37.53151, 127.122673],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b904ac2a375a6c457fe88ff9e323a0be.bindTooltip(
                `&lt;div&gt;
                     성내초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2280fc62beac4ecfa583b7d8eae916ce = L.marker(
                [37.5913201, 127.0876996],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2280fc62beac4ecfa583b7d8eae916ce.bindTooltip(
                `&lt;div&gt;
                     면목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b9d26229ad39290016ad978b6a67f3d3 = L.marker(
                [37.5282805, 127.0451616],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b9d26229ad39290016ad978b6a67f3d3.bindTooltip(
                `&lt;div&gt;
                     청담초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_34a1967061375297382fa08abdf561ab = L.marker(
                [37.6489712, 127.0244052],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_34a1967061375297382fa08abdf561ab.bindTooltip(
                `&lt;div&gt;
                     서울쌍문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_157fef08dcc55c9a07208ba9569b247e = L.marker(
                [37.5895902, 127.0755697],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_157fef08dcc55c9a07208ba9569b247e.bindTooltip(
                `&lt;div&gt;
                     중랑초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f88f7509f823b9d964c177158bf9422f = L.marker(
                [37.6193069, 127.0742531],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f88f7509f823b9d964c177158bf9422f.bindTooltip(
                `&lt;div&gt;
                     공릉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_75b747f82dcca5328049b3bc1269af72 = L.marker(
                [37.5649828, 127.1740361],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_75b747f82dcca5328049b3bc1269af72.bindTooltip(
                `&lt;div&gt;
                     강일동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4eef5ba11cfe73684027ea935e42671b = L.marker(
                [37.5590548, 127.1489198],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4eef5ba11cfe73684027ea935e42671b.bindTooltip(
                `&lt;div&gt;
                     고덕1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a4e3c5820970c3705555b9006ca0ca0d = L.marker(
                [37.5854269, 127.0863636],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a4e3c5820970c3705555b9006ca0ca0d.bindTooltip(
                `&lt;div&gt;
                     면동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_141bc4c5733d5da64c34b28b4b0c4005 = L.marker(
                [37.5843988, 127.0972465],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_141bc4c5733d5da64c34b28b4b0c4005.bindTooltip(
                `&lt;div&gt;
                     면목고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_88eceb4fb0359697a34ce238fff10f2d = L.marker(
                [37.5190795, 126.8402446],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_88eceb4fb0359697a34ce238fff10f2d.bindTooltip(
                `&lt;div&gt;
                     한빛사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f0053f6345e854e64e66c26a975b401 = L.marker(
                [37.601554, 127.0901155],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3f0053f6345e854e64e66c26a975b401.bindTooltip(
                `&lt;div&gt;
                     상봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_01630c95b2284b750b435cac5dd72dde = L.marker(
                [37.5095526, 127.1210955],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_01630c95b2284b750b435cac5dd72dde.bindTooltip(
                `&lt;div&gt;
                     방산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a561cc55a92c88e3089ee4f3d32491d8 = L.marker(
                [37.4884324, 127.1302549],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a561cc55a92c88e3089ee4f3d32491d8.bindTooltip(
                `&lt;div&gt;
                     문정중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5f19d7dcf99c65689cd8e8635357c045 = L.marker(
                [37.5531674, 126.9090747],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5f19d7dcf99c65689cd8e8635357c045.bindTooltip(
                `&lt;div&gt;
                     희우경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c101fffa8270dd44203e7e3fee170824 = L.marker(
                [37.5516092, 127.1655314],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c101fffa8270dd44203e7e3fee170824.bindTooltip(
                `&lt;div&gt;
                     상일동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_deebb8adfd8157f497d582bd6c432527 = L.marker(
                [37.5410007, 127.1500551],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_deebb8adfd8157f497d582bd6c432527.bindTooltip(
                `&lt;div&gt;
                     신명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_083feb2e102d246350cb6947009c46b7 = L.marker(
                [37.5203992, 126.9107094],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_083feb2e102d246350cb6947009c46b7.bindTooltip(
                `&lt;div&gt;
                     영등포동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_96501e96ab84b1df2a1281fbb4e7b133 = L.marker(
                [37.5099053, 126.9118456],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_96501e96ab84b1df2a1281fbb4e7b133.bindTooltip(
                `&lt;div&gt;
                     우신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ac831170b43ad7261655dea2f111247e = L.marker(
                [37.5476094, 126.8578108],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ac831170b43ad7261655dea2f111247e.bindTooltip(
                `&lt;div&gt;
                     등촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c52a62b10c94a9eb1d3bafc1bcce9c65 = L.marker(
                [37.547738, 126.9732429],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c52a62b10c94a9eb1d3bafc1bcce9c65.bindTooltip(
                `&lt;div&gt;
                     용산교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3154bef8f9724741e02602a7c6b4f50b = L.marker(
                [37.5593457, 126.9517835],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3154bef8f9724741e02602a7c6b4f50b.bindTooltip(
                `&lt;div&gt;
                     북성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_632f41f90dfe84dc50e1b46afdeb0cb7 = L.marker(
                [37.5572274, 126.960287],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_632f41f90dfe84dc50e1b46afdeb0cb7.bindTooltip(
                `&lt;div&gt;
                     서울제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_11a3483c4b2986d4bde8db283d6aefb7 = L.marker(
                [37.6029767, 127.0403982],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_11a3483c4b2986d4bde8db283d6aefb7.bindTooltip(
                `&lt;div&gt;
                     월곡감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5371e25932f084923dae0e40ced8dff7 = L.marker(
                [37.592688, 126.9442854],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5371e25932f084923dae0e40ced8dff7.bindTooltip(
                `&lt;div&gt;
                     홍제초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cdfd22959de7ab9253e60c36e76e61be = L.marker(
                [37.5688794, 127.0554779],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cdfd22959de7ab9253e60c36e76e61be.bindTooltip(
                `&lt;div&gt;
                     답십리초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0823f3a5a824fd51fb520e39be28bbb9 = L.marker(
                [37.5202766, 126.9764757],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0823f3a5a824fd51fb520e39be28bbb9.bindTooltip(
                `&lt;div&gt;
                     신용산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c04f53dfb08bcdb1499f5cc43cb81bc0 = L.marker(
                [37.5466468, 126.859924],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c04f53dfb08bcdb1499f5cc43cb81bc0.bindTooltip(
                `&lt;div&gt;
                     능안 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d84685a6a6f547ad5b0e9232cf2c302 = L.marker(
                [37.550538, 126.9081484],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6d84685a6a6f547ad5b0e9232cf2c302.bindTooltip(
                `&lt;div&gt;
                     성산성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f2b7a5b3fadfd308ac5ecb17a4b4667c = L.marker(
                [37.566879, 126.911639],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f2b7a5b3fadfd308ac5ecb17a4b4667c.bindTooltip(
                `&lt;div&gt;
                     서울중동초(정보관2층 다목적실)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f97d7b4b5f91dc81c0365fee3c59bdd8 = L.marker(
                [37.5928368, 126.9120055],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f97d7b4b5f91dc81c0365fee3c59bdd8.bindTooltip(
                `&lt;div&gt;
                     신사초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_502757ea33e4928299d509ed9805152a = L.marker(
                [37.5392322, 127.1462094],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_502757ea33e4928299d509ed9805152a.bindTooltip(
                `&lt;div&gt;
                     길 동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_797d5593ad1a6e3187a82ee9654a3bde = L.marker(
                [37.5367691, 126.8413967],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_797d5593ad1a6e3187a82ee9654a3bde.bindTooltip(
                `&lt;div&gt;
                     까치산 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3ff298ffbe32805d88f9079aa15f96e8 = L.marker(
                [37.5301177, 126.8537711],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3ff298ffbe32805d88f9079aa15f96e8.bindTooltip(
                `&lt;div&gt;
                     하마터 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d4a00a9756e12235a9d9fdb7bdcc2d63 = L.marker(
                [37.5759837, 126.958142],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d4a00a9756e12235a9d9fdb7bdcc2d63.bindTooltip(
                `&lt;div&gt;
                     무악동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_12bd4c36989b0bb6b94ec32a6fc60e1a = L.marker(
                [37.4895328, 126.9242737],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_12bd4c36989b0bb6b94ec32a6fc60e1a.bindTooltip(
                `&lt;div&gt;
                     월드비전교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5f78bec25f41b8dae8619bea14509ceb = L.marker(
                [37.57989, 126.985687],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5f78bec25f41b8dae8619bea14509ceb.bindTooltip(
                `&lt;div&gt;
                     재동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5539b348f8fbce4804177d8cfbe0b8ee = L.marker(
                [37.5404771, 126.9925577],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5539b348f8fbce4804177d8cfbe0b8ee.bindTooltip(
                `&lt;div&gt;
                     북부경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c8f6c30afb7ff043911bf245ed9a8621 = L.marker(
                [37.5498184, 127.0868094],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c8f6c30afb7ff043911bf245ed9a8621.bindTooltip(
                `&lt;div&gt;
                     경복초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d61919f97cb63bbf08d7389d4e27e538 = L.marker(
                [37.651461, 127.0166893],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d61919f97cb63bbf08d7389d4e27e538.bindTooltip(
                `&lt;div&gt;
                     덕성여자대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e20978f2c6246e19a6dbc62c792c1fa7 = L.marker(
                [37.6045778, 127.0836716],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e20978f2c6246e19a6dbc62c792c1fa7.bindTooltip(
                `&lt;div&gt;
                     중화고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b6650b0e09ee63ef02f13c36c99849e5 = L.marker(
                [37.5779753, 127.0477473],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b6650b0e09ee63ef02f13c36c99849e5.bindTooltip(
                `&lt;div&gt;
                     전농1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_23f398a901ef12dad74d1d76c3640ac1 = L.marker(
                [37.6327676, 127.0410585],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_23f398a901ef12dad74d1d76c3640ac1.bindTooltip(
                `&lt;div&gt;
                     서울신화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_83f9aeee4da84572f4de436347085321 = L.marker(
                [37.5830681, 127.0965898],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_83f9aeee4da84572f4de436347085321.bindTooltip(
                `&lt;div&gt;
                     면목중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2291378c45b248a65526e0047fbdb277 = L.marker(
                [37.5827189, 127.0167373],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2291378c45b248a65526e0047fbdb277.bindTooltip(
                `&lt;div&gt;
                     동신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4c31f1b79c23254bef4707bdb7c6e796 = L.marker(
                [37.5466977, 126.9123948],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4c31f1b79c23254bef4707bdb7c6e796.bindTooltip(
                `&lt;div&gt;
                     양화진경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8d7200011558810fddaa625aa585db94 = L.marker(
                [37.5393765, 127.0048805],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8d7200011558810fddaa625aa585db94.bindTooltip(
                `&lt;div&gt;
                     한남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0f81091a47490f180d1d37549fc73867 = L.marker(
                [37.536781, 127.13311],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0f81091a47490f180d1d37549fc73867.bindTooltip(
                `&lt;div&gt;
                     동신중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bbba88444e5234f8f9509efce9ca0128 = L.marker(
                [37.5745689, 127.0515154],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_bbba88444e5234f8f9509efce9ca0128.bindTooltip(
                `&lt;div&gt;
                     동대문중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f55a6349d585f82f36d3320a2ed9c858 = L.marker(
                [37.4841727, 126.9095481],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f55a6349d585f82f36d3320a2ed9c858.bindTooltip(
                `&lt;div&gt;
                     서울조원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_31273dc31251ff374ab0f0aec5257093 = L.marker(
                [37.5653655, 126.9642416],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_31273dc31251ff374ab0f0aec5257093.bindTooltip(
                `&lt;div&gt;
                     인창중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9bd042ce348df03912a7b388fc158568 = L.marker(
                [37.5426007, 127.1207594],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9bd042ce348df03912a7b388fc158568.bindTooltip(
                `&lt;div&gt;
                     천호2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f79f8c8f2f7d2d28e596595486849c93 = L.marker(
                [37.5442532, 127.0985423],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f79f8c8f2f7d2d28e596595486849c93.bindTooltip(
                `&lt;div&gt;
                     양진초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c140733f1c42944091700085fbb416fc = L.marker(
                [37.5628448, 126.9091181],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c140733f1c42944091700085fbb416fc.bindTooltip(
                `&lt;div&gt;
                     성서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_75c585c28f231b1652a26cc5cefd976f = L.marker(
                [37.4930758, 126.9155706],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_75c585c28f231b1652a26cc5cefd976f.bindTooltip(
                `&lt;div&gt;
                     수도여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_175d4f7d1e8c2360c888221b93f45db9 = L.marker(
                [37.4759283, 126.9606291],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_175d4f7d1e8c2360c888221b93f45db9.bindTooltip(
                `&lt;div&gt;
                     인헌초등학교체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c784a46e975e4aaca7339bdbebd55c92 = L.marker(
                [37.5437613, 126.8753459],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c784a46e975e4aaca7339bdbebd55c92.bindTooltip(
                `&lt;div&gt;
                     양화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7e282d1a2f46f0fc17b19b6dfd1f10ac = L.marker(
                [37.5129485, 126.8982736],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7e282d1a2f46f0fc17b19b6dfd1f10ac.bindTooltip(
                `&lt;div&gt;
                     영등포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1e6675b6930f14050265e9b417a3cfc4 = L.marker(
                [37.4872461, 126.9878564],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1e6675b6930f14050265e9b417a3cfc4.bindTooltip(
                `&lt;div&gt;
                     서울 방배 초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dea28eb125413a73532fedb107716394 = L.marker(
                [37.5693319, 126.930827],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_dea28eb125413a73532fedb107716394.bindTooltip(
                `&lt;div&gt;
                     연희동자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7b7170defec4f26edd203d8c6d6b7cf7 = L.marker(
                [37.5761802, 126.8921946],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7b7170defec4f26edd203d8c6d6b7cf7.bindTooltip(
                `&lt;div&gt;
                     상암초등학교 (체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e533e590987eea60e5e2eac6cd7de3ae = L.marker(
                [37.5130079, 126.9150892],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e533e590987eea60e5e2eac6cd7de3ae.bindTooltip(
                `&lt;div&gt;
                     장훈고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_435d6e45a9e73ae1d9991572413863cb = L.marker(
                [37.4922269, 126.9070193],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_435d6e45a9e73ae1d9991572413863cb.bindTooltip(
                `&lt;div&gt;
                     대림중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5a26e46deea99d9939e5402be8394ea5 = L.marker(
                [37.4958165, 126.9223506],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5a26e46deea99d9939e5402be8394ea5.bindTooltip(
                `&lt;div&gt;
                     문창중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_86c65e03fc2d941a0fb499654df3a4a5 = L.marker(
                [37.543197, 127.077444],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_86c65e03fc2d941a0fb499654df3a4a5.bindTooltip(
                `&lt;div&gt;
                     건국대학교 사범대학
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e87c39b6f384c59e3150de2d4ddfb8a6 = L.marker(
                [37.4736571, 126.9766545],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e87c39b6f384c59e3150de2d4ddfb8a6.bindTooltip(
                `&lt;div&gt;
                     상록보육원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f2635564c434536c30f20bed42aa9bd5 = L.marker(
                [37.5457403, 126.8516996],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f2635564c434536c30f20bed42aa9bd5.bindTooltip(
                `&lt;div&gt;
                     봉제 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccf1b09be21960aeaa27682540d8f8c5 = L.marker(
                [37.5252916, 126.8900051],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ccf1b09be21960aeaa27682540d8f8c5.bindTooltip(
                `&lt;div&gt;
                     영은교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46178a0d3e958525370706723e52b7bd = L.marker(
                [37.5105206, 126.9014245],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_46178a0d3e958525370706723e52b7bd.bindTooltip(
                `&lt;div&gt;
                     도림천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c580e4f0b30485ab65a52c821c147dd9 = L.marker(
                [37.5017643, 126.9054364],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c580e4f0b30485ab65a52c821c147dd9.bindTooltip(
                `&lt;div&gt;
                     구립신길5동제2경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_305d499cf6aee5570f7338355c729152 = L.marker(
                [37.5064521, 126.9213962],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_305d499cf6aee5570f7338355c729152.bindTooltip(
                `&lt;div&gt;
                     신길7제1구립노인정
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6ef6e4a0f39c2c3eab807372a01f2316 = L.marker(
                [37.5250013, 126.8973782],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6ef6e4a0f39c2c3eab807372a01f2316.bindTooltip(
                `&lt;div&gt;
                     당산1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_10d3c03acdfd1d1859da89e8f8623e32 = L.marker(
                [37.4797795, 126.9313905],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_10d3c03acdfd1d1859da89e8f8623e32.bindTooltip(
                `&lt;div&gt;
                     서원동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d4716a8a943ab42aaccc3dc63db6c502 = L.marker(
                [37.5469717, 126.947995],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d4716a8a943ab42aaccc3dc63db6c502.bindTooltip(
                `&lt;div&gt;
                     서울디자인고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_53d9b3cffcd69abaad88ed89d7ccf5e5 = L.marker(
                [37.4928824, 127.1230627],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_53d9b3cffcd69abaad88ed89d7ccf5e5.bindTooltip(
                `&lt;div&gt;
                     주영광교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a66a632f007a923bdf010061c2fdd311 = L.marker(
                [37.5793116, 127.0130043],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a66a632f007a923bdf010061c2fdd311.bindTooltip(
                `&lt;div&gt;
                     서일정보산업고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5ca86469c19bcdbeeb10c27c7706c2a9 = L.marker(
                [37.5656254, 126.9950263],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5ca86469c19bcdbeeb10c27c7706c2a9.bindTooltip(
                `&lt;div&gt;
                     을지교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c61db944ba23d148498be5b79aca3558 = L.marker(
                [37.5861335, 127.0393853],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c61db944ba23d148498be5b79aca3558.bindTooltip(
                `&lt;div&gt;
                     홍파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d7c9e0c0b63764a1457ff4960eed818a = L.marker(
                [37.481173, 126.9093917],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d7c9e0c0b63764a1457ff4960eed818a.bindTooltip(
                `&lt;div&gt;
                     조원동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9371c39a67ff296cecf7748341ec74a1 = L.marker(
                [37.577914, 126.810894],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9371c39a67ff296cecf7748341ec74a1.bindTooltip(
                `&lt;div&gt;
                     방화6복지관 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0c42234f58e1355c8b5e49dc880a2d2d = L.marker(
                [37.5247969, 126.8494272],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0c42234f58e1355c8b5e49dc880a2d2d.bindTooltip(
                `&lt;div&gt;
                     양강중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5c34cd582524f5d8b37a59ade33b1a59 = L.marker(
                [37.5472562, 127.1528011],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5c34cd582524f5d8b37a59ade33b1a59.bindTooltip(
                `&lt;div&gt;
                     대명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e9fe642e7b46497db29975b302a27cd = L.marker(
                [37.520365, 126.8847002],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0e9fe642e7b46497db29975b302a27cd.bindTooltip(
                `&lt;div&gt;
                     문래중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6c1d411d5b2ad465a7950d78f69ae249 = L.marker(
                [37.5250278, 126.8887421],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6c1d411d5b2ad465a7950d78f69ae249.bindTooltip(
                `&lt;div&gt;
                     양평1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bfb261dfb375f55651012c9c3cad29b9 = L.marker(
                [37.5469102, 126.8229474],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_bfb261dfb375f55651012c9c3cad29b9.bindTooltip(
                `&lt;div&gt;
                     신광명 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_32a184cc28f898eb7c546c4a4cd4f1ef = L.marker(
                [37.4952572, 126.8925095],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_32a184cc28f898eb7c546c4a4cd4f1ef.bindTooltip(
                `&lt;div&gt;
                     동구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_61c1144c3722e20fc5341c2531bf8c58 = L.marker(
                [37.6110156, 127.0589586],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_61c1144c3722e20fc5341c2531bf8c58.bindTooltip(
                `&lt;div&gt;
                     석관초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e6b682936ab3bc0427ba2d9d16aafc2f = L.marker(
                [37.5331928, 126.8562488],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e6b682936ab3bc0427ba2d9d16aafc2f.bindTooltip(
                `&lt;div&gt;
                     골안말 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b7a24c9c817526514e2f1be7f80e60f0 = L.marker(
                [37.5411296, 126.8485221],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b7a24c9c817526514e2f1be7f80e60f0.bindTooltip(
                `&lt;div&gt;
                     초록동 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c097706a0824a9980a6f92cabd3e7865 = L.marker(
                [37.5349407, 126.903985],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c097706a0824a9980a6f92cabd3e7865.bindTooltip(
                `&lt;div&gt;
                     구립당산2동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_478d18edee92b4a940011142ed677d62 = L.marker(
                [37.5937228, 127.0127754],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_478d18edee92b4a940011142ed677d62.bindTooltip(
                `&lt;div&gt;
                     돈암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fb60775b2354acb46bf5b1bebd6da583 = L.marker(
                [37.4716608, 127.0266742],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fb60775b2354acb46bf5b1bebd6da583.bindTooltip(
                `&lt;div&gt;
                     양재1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8bcc916ec1996245ca0d28d3b956d79c = L.marker(
                [37.5191032, 127.0464651],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8bcc916ec1996245ca0d28d3b956d79c.bindTooltip(
                `&lt;div&gt;
                     청담2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1acda6479f68af54b3d0801adce2cf23 = L.marker(
                [37.5820771, 126.930903],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1acda6479f68af54b3d0801adce2cf23.bindTooltip(
                `&lt;div&gt;
                     홍연초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_62ee02db59bab2e050277575b56cdd90 = L.marker(
                [37.5743163, 126.9599977],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_62ee02db59bab2e050277575b56cdd90.bindTooltip(
                `&lt;div&gt;
                     독립문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_abf4d83c3e51dc19d5dab0b4c3ea1b8e = L.marker(
                [37.6446448, 127.0199054],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_abf4d83c3e51dc19d5dab0b4c3ea1b8e.bindTooltip(
                `&lt;div&gt;
                     수유2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fee844368f3f7e58d6aaf391746c67c3 = L.marker(
                [37.5462875, 127.1300447],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fee844368f3f7e58d6aaf391746c67c3.bindTooltip(
                `&lt;div&gt;
                     강동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2a7fa31ce79502d884cb01737178b696 = L.marker(
                [37.5501539, 127.1305587],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2a7fa31ce79502d884cb01737178b696.bindTooltip(
                `&lt;div&gt;
                     신흥교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dfc0804b8e37b74f65f26bf6cec0fd2e = L.marker(
                [37.5553676, 127.1383735],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_dfc0804b8e37b74f65f26bf6cec0fd2e.bindTooltip(
                `&lt;div&gt;
                     강일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4fe2edc2ec2056e7f2471f2b592a6f72 = L.marker(
                [37.5077695, 126.8805967],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4fe2edc2ec2056e7f2471f2b592a6f72.bindTooltip(
                `&lt;div&gt;
                     신도림동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c88b12ecff9225ff4fa7c56e3949a9e6 = L.marker(
                [37.4916016, 126.8891664],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c88b12ecff9225ff4fa7c56e3949a9e6.bindTooltip(
                `&lt;div&gt;
                     구로4동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_04e7450389b1d3e5862465ee90698ca6 = L.marker(
                [37.4760768, 126.9420518],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_04e7450389b1d3e5862465ee90698ca6.bindTooltip(
                `&lt;div&gt;
                     서광경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d890e76c4473fd5c74afa0e84f1585d8 = L.marker(
                [37.6510435, 127.0385877],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d890e76c4473fd5c74afa0e84f1585d8.bindTooltip(
                `&lt;div&gt;
                     창동고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fa070b3472dc8a239f4aa905f746e55e = L.marker(
                [37.6564921, 127.0358902],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fa070b3472dc8a239f4aa905f746e55e.bindTooltip(
                `&lt;div&gt;
                     백운중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6c1b2dd52443e3bb385416ad0cb4f4ab = L.marker(
                [37.5898762, 126.9184633],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6c1b2dd52443e3bb385416ad0cb4f4ab.bindTooltip(
                `&lt;div&gt;
                     응암감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_60b4da31d4cd27658165a88e449aadd1 = L.marker(
                [37.4789456, 126.9724434],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_60b4da31d4cd27658165a88e449aadd1.bindTooltip(
                `&lt;div&gt;
                     남성중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b81b766efbd20e9a0077d448d3cdeb72 = L.marker(
                [37.5235333, 126.9995931],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b81b766efbd20e9a0077d448d3cdeb72.bindTooltip(
                `&lt;div&gt;
                     오산고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c29e494682413cb1eadf27d34f90c89 = L.marker(
                [37.5430897, 126.9842846],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7c29e494682413cb1eadf27d34f90c89.bindTooltip(
                `&lt;div&gt;
                     보성여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35750ffdf7f78757ba6effceb7a1c737 = L.marker(
                [37.55457, 126.9150014],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_35750ffdf7f78757ba6effceb7a1c737.bindTooltip(
                `&lt;div&gt;
                     서교감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f53371866c481b0c733db849680d64c6 = L.marker(
                [37.615709, 127.0233496],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f53371866c481b0c733db849680d64c6.bindTooltip(
                `&lt;div&gt;
                     송천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1bc85cb097dfcf856f6d7d3b4620aab3 = L.marker(
                [37.4880655, 126.979165],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1bc85cb097dfcf856f6d7d3b4620aab3.bindTooltip(
                `&lt;div&gt;
                     남일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_13245cb07219c406fd94556b52b927b5 = L.marker(
                [37.5766446, 126.9834942],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_13245cb07219c406fd94556b52b927b5.bindTooltip(
                `&lt;div&gt;
                     풍문여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_44f1bb4e776f5ca72cd405f0fa8da958 = L.marker(
                [37.5730679, 127.0030669],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_44f1bb4e776f5ca72cd405f0fa8da958.bindTooltip(
                `&lt;div&gt;
                     효제초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6fa6c5a5fe4125ec83c33d57e4dad0c7 = L.marker(
                [37.5536804, 126.9493416],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6fa6c5a5fe4125ec83c33d57e4dad0c7.bindTooltip(
                `&lt;div&gt;
                     한서초등학교 (강당)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6dd072eb89e12caf0c2566a8d53fd8d1 = L.marker(
                [37.5439769, 127.1225563],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6dd072eb89e12caf0c2566a8d53fd8d1.bindTooltip(
                `&lt;div&gt;
                     천호동중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8189c40da184bd6636e7d37eaf1275e2 = L.marker(
                [37.4836201, 127.0327209],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8189c40da184bd6636e7d37eaf1275e2.bindTooltip(
                `&lt;div&gt;
                     서초구청
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a9003c1f72f4030b383dda4e76ba160a = L.marker(
                [37.6036604, 127.0272595],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a9003c1f72f4030b383dda4e76ba160a.bindTooltip(
                `&lt;div&gt;
                     영암교회(교회당)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_237266f175af0db7124ea78664c72963 = L.marker(
                [37.6134771, 127.0364498],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_237266f175af0db7124ea78664c72963.bindTooltip(
                `&lt;div&gt;
                     창문여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2ce852aa82d90f79b98a964b374d5e66 = L.marker(
                [37.4888087, 126.8395008],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2ce852aa82d90f79b98a964b374d5e66.bindTooltip(
                `&lt;div&gt;
                     오류2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d9e98bcdbc1a9ab1eb7b0e94766fc18a = L.marker(
                [37.5002418, 126.8281915],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d9e98bcdbc1a9ab1eb7b0e94766fc18a.bindTooltip(
                `&lt;div&gt;
                     구로여자정보산업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cf04fa56b0e7f984b4ba325d9c361719 = L.marker(
                [37.5636685, 127.0891173],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cf04fa56b0e7f984b4ba325d9c361719.bindTooltip(
                `&lt;div&gt;
                     대원외국어고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_253924b63a8d0c89f53128195c1e47dc = L.marker(
                [37.529664, 127.1455339],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_253924b63a8d0c89f53128195c1e47dc.bindTooltip(
                `&lt;div&gt;
                     선린초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4eb4e53b2d5314564ec6ea2719e4b110 = L.marker(
                [37.5836674, 126.9041368],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4eb4e53b2d5314564ec6ea2719e4b110.bindTooltip(
                `&lt;div&gt;
                     증산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b219956667604f1c788b67dc9249ab5 = L.marker(
                [37.524253, 126.8671099],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8b219956667604f1c788b67dc9249ab5.bindTooltip(
                `&lt;div&gt;
                     서정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5d0e867a9771e961af49ee566159ac99 = L.marker(
                [37.588561, 126.9699284],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5d0e867a9771e961af49ee566159ac99.bindTooltip(
                `&lt;div&gt;
                     경기상업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7755731aebc93eadceb70d3bd8770dc8 = L.marker(
                [37.6088175, 127.0247734],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7755731aebc93eadceb70d3bd8770dc8.bindTooltip(
                `&lt;div&gt;
                     길음 종합사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_43bdf28a9474f136ca7b5e5dac9fe44c = L.marker(
                [37.6235791, 127.0121687],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_43bdf28a9474f136ca7b5e5dac9fe44c.bindTooltip(
                `&lt;div&gt;
                     미양중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5e18fbfcf3c6881b2060658f2e02422e = L.marker(
                [37.5479867, 126.9643143],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5e18fbfcf3c6881b2060658f2e02422e.bindTooltip(
                `&lt;div&gt;
                     청파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6dcab9825297340bfa1de97fffc1985a = L.marker(
                [37.5632638, 127.0295628],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6dcab9825297340bfa1de97fffc1985a.bindTooltip(
                `&lt;div&gt;
                     무학초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9f696450044ab326e947465fcfeb3d20 = L.marker(
                [37.5392935, 127.0525395],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9f696450044ab326e947465fcfeb3d20.bindTooltip(
                `&lt;div&gt;
                     성원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35ab6df1c158d6b69885196462717d3a = L.marker(
                [37.4741646, 127.0319136],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_35ab6df1c158d6b69885196462717d3a.bindTooltip(
                `&lt;div&gt;
                     서울양재초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9f547988473bc1416c83f77e9425ffb8 = L.marker(
                [37.5319441, 127.0063888],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9f547988473bc1416c83f77e9425ffb8.bindTooltip(
                `&lt;div&gt;
                     한남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c6ed0ebd3351c750655e05936a3ebbbc = L.marker(
                [37.4998132, 127.1135969],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c6ed0ebd3351c750655e05936a3ebbbc.bindTooltip(
                `&lt;div&gt;
                     중대초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5db2787442d38dd24cc70add4b566f36 = L.marker(
                [37.5813782, 127.0140632],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5db2787442d38dd24cc70add4b566f36.bindTooltip(
                `&lt;div&gt;
                     명신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_673d214fc1a54b811ed783d8f7255f0f = L.marker(
                [37.5812088, 126.9179274],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_673d214fc1a54b811ed783d8f7255f0f.bindTooltip(
                `&lt;div&gt;
                     은가경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed6ea9347a802f05b0c4aee2c4a65f41 = L.marker(
                [37.5324773, 126.9904794],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ed6ea9347a802f05b0c4aee2c4a65f41.bindTooltip(
                `&lt;div&gt;
                     종합행정타운
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a95173b115f6cc651647168249d82a8b = L.marker(
                [37.5398266, 126.9502984],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a95173b115f6cc651647168249d82a8b.bindTooltip(
                `&lt;div&gt;
                     마포삼성@경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_767efa75ec92299be665198f16104873 = L.marker(
                [37.5680782, 126.9630729],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_767efa75ec92299be665198f16104873.bindTooltip(
                `&lt;div&gt;
                     금화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_94cb617b05ec9f6075c6b8a802f76b02 = L.marker(
                [37.4923517, 126.981568],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_94cb617b05ec9f6075c6b8a802f76b02.bindTooltip(
                `&lt;div&gt;
                     경문고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2ca0dd579eb9452daf0dfeb69db1f201 = L.marker(
                [37.57354, 126.9618444],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2ca0dd579eb9452daf0dfeb69db1f201.bindTooltip(
                `&lt;div&gt;
                     대신고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca6f9ab3cfdf4913c84e7f939f9cfa9e = L.marker(
                [37.5779418, 127.0039175],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ca6f9ab3cfdf4913c84e7f939f9cfa9e.bindTooltip(
                `&lt;div&gt;
                     서울사대부속여중
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f86db6a8f21a4287bd4f576c619823ec = L.marker(
                [37.4981483, 126.8547529],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f86db6a8f21a4287bd4f576c619823ec.bindTooltip(
                `&lt;div&gt;
                     오류여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e68f85304db8bda9a80a1e2fa8fa2f4c = L.marker(
                [37.5517511, 127.1272382],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e68f85304db8bda9a80a1e2fa8fa2f4c.bindTooltip(
                `&lt;div&gt;
                     암사2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_599e5265bab22e0d8b435f743e4c116c = L.marker(
                [37.5902589, 127.0793691],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_599e5265bab22e0d8b435f743e4c116c.bindTooltip(
                `&lt;div&gt;
                     중목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_41126eb1350c49911a7ce82ebd4a166e = L.marker(
                [37.494293, 126.9613115],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_41126eb1350c49911a7ce82ebd4a166e.bindTooltip(
                `&lt;div&gt;
                     상현중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2fa0109e40b9893f50d7fbd12a2f9a0b = L.marker(
                [37.4761819, 126.915573],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2fa0109e40b9893f50d7fbd12a2f9a0b.bindTooltip(
                `&lt;div&gt;
                     미성동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_170fd971ac922fdddc1fb4435febf397 = L.marker(
                [37.5759123, 126.8146251],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_170fd971ac922fdddc1fb4435febf397.bindTooltip(
                `&lt;div&gt;
                     치현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_435d4a8d2cbcd8396bbc4bd7812e0df3 = L.marker(
                [37.5367143, 126.8426524],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_435d4a8d2cbcd8396bbc4bd7812e0df3.bindTooltip(
                `&lt;div&gt;
                     화원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eda5c11a4ebdcc030107ae3c92b17171 = L.marker(
                [37.4856133, 126.9491483],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eda5c11a4ebdcc030107ae3c92b17171.bindTooltip(
                `&lt;div&gt;
                     서울신봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e51c38089c45c6e1b5d6aabbc21d40be = L.marker(
                [37.4668072, 126.9230311],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e51c38089c45c6e1b5d6aabbc21d40be.bindTooltip(
                `&lt;div&gt;
                     난우중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aef205a858413c4c2acb8de085c755a5 = L.marker(
                [37.5510344, 127.0342166],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_aef205a858413c4c2acb8de085c755a5.bindTooltip(
                `&lt;div&gt;
                     광희중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0c78440126c52b1fa1d06d92fc0ca0f8 = L.marker(
                [37.5418073, 126.9677569],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0c78440126c52b1fa1d06d92fc0ca0f8.bindTooltip(
                `&lt;div&gt;
                     삼일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ead4a8a834501937da187a156a865b95 = L.marker(
                [37.5446028, 126.932724],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ead4a8a834501937da187a156a865b95.bindTooltip(
                `&lt;div&gt;
                     영광교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1b13041744c481c888808af549d86d7d = L.marker(
                [37.5101591, 126.8971795],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1b13041744c481c888808af549d86d7d.bindTooltip(
                `&lt;div&gt;
                     도림교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0c428fb715fc6a899345a7d155166aea = L.marker(
                [37.5184177, 126.8939429],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0c428fb715fc6a899345a7d155166aea.bindTooltip(
                `&lt;div&gt;
                     구립문래제1경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_abedae541a780e154121a039e536247a = L.marker(
                [37.4991358, 126.9314158],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_abedae541a780e154121a039e536247a.bindTooltip(
                `&lt;div&gt;
                     상도3동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e8ab848b9370362266148998c9f6b692 = L.marker(
                [37.5476373, 126.9159645],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e8ab848b9370362266148998c9f6b692.bindTooltip(
                `&lt;div&gt;
                     성산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_23e0b770b71a26e149e0799dc679a497 = L.marker(
                [37.539614, 126.8963895],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_23e0b770b71a26e149e0799dc679a497.bindTooltip(
                `&lt;div&gt;
                     당산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fba952868fb7690da28093759887d453 = L.marker(
                [37.502675, 126.9065507],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fba952868fb7690da28093759887d453.bindTooltip(
                `&lt;div&gt;
                     대영초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_96259c83e71370033104471ba260bcc2 = L.marker(
                [37.5004122, 126.8628141],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_96259c83e71370033104471ba260bcc2.bindTooltip(
                `&lt;div&gt;
                     고척1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_39182ba9a22daf0f14ec2e50882ff20a = L.marker(
                [37.5157342, 126.9226591],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_39182ba9a22daf0f14ec2e50882ff20a.bindTooltip(
                `&lt;div&gt;
                     구립율산경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_27920576eb977c3ba12124f17b8f4224 = L.marker(
                [37.5232656, 126.888191],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_27920576eb977c3ba12124f17b8f4224.bindTooltip(
                `&lt;div&gt;
                     구립양평1동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_79f08d44c5d33a07f7090112e20f3f0b = L.marker(
                [37.5450991, 126.9270335],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_79f08d44c5d33a07f7090112e20f3f0b.bindTooltip(
                `&lt;div&gt;
                     상수청소년독서실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3608644d7141ee52d4409207a4c4e72f = L.marker(
                [37.5380081, 126.8475462],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3608644d7141ee52d4409207a4c4e72f.bindTooltip(
                `&lt;div&gt;
                     약수 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2b8311377424d071bb6fb0c6a2883359 = L.marker(
                [37.52548, 126.9034287],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2b8311377424d071bb6fb0c6a2883359.bindTooltip(
                `&lt;div&gt;
                     영등포동 주민자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ce245dd8ceeca4f6c1dd7742f96897ad = L.marker(
                [37.4890451, 127.1292892],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ce245dd8ceeca4f6c1dd7742f96897ad.bindTooltip(
                `&lt;div&gt;
                     문정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_12322f2c6f44369a1060fd05a60b5723 = L.marker(
                [37.6071825, 126.9695997],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_12322f2c6f44369a1060fd05a60b5723.bindTooltip(
                `&lt;div&gt;
                     예능교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a379207eb0a5b7bd3c4f535b226243af = L.marker(
                [37.6009825, 127.0606984],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a379207eb0a5b7bd3c4f535b226243af.bindTooltip(
                `&lt;div&gt;
                     이문동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca4eaeaa0f3eca7d6efe35d7012e0493 = L.marker(
                [37.6238104, 127.0123045],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ca4eaeaa0f3eca7d6efe35d7012e0493.bindTooltip(
                `&lt;div&gt;
                     미양고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_210f4145a9feb43cbd445e4dc9b089c0 = L.marker(
                [37.4928281, 126.8993033],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_210f4145a9feb43cbd445e4dc9b089c0.bindTooltip(
                `&lt;div&gt;
                     구립대림2동제2경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_55b1a8af76277c693bc4df26b524fa16 = L.marker(
                [37.5495336, 127.0739425],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_55b1a8af76277c693bc4df26b524fa16.bindTooltip(
                `&lt;div&gt;
                     세종대학교 군자관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_11c202efb3fa0f0f0851caff774c7993 = L.marker(
                [37.5947552, 127.0914775],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_11c202efb3fa0f0f0851caff774c7993.bindTooltip(
                `&lt;div&gt;
                     국일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aef79aa1c34849569969c85a282ea32c = L.marker(
                [37.512004, 126.8698309],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_aef79aa1c34849569969c85a282ea32c.bindTooltip(
                `&lt;div&gt;
                     갈산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7fd1ce78080b085dedf74f182ca06a7e = L.marker(
                [37.5291893, 127.1224111],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7fd1ce78080b085dedf74f182ca06a7e.bindTooltip(
                `&lt;div&gt;
                     강동어린이회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b4a053f2fc969e76d8064c3d848aba3e = L.marker(
                [37.5100593, 126.9054805],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b4a053f2fc969e76d8064c3d848aba3e.bindTooltip(
                `&lt;div&gt;
                     영도교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a0e213a588ca0660f4b2fb9688bed3f8 = L.marker(
                [37.5671308, 127.0884969],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a0e213a588ca0660f4b2fb9688bed3f8.bindTooltip(
                `&lt;div&gt;
                     용곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_02fc046d9160cfcbbaa7f941ced6952a = L.marker(
                [37.5823401, 127.0965892],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_02fc046d9160cfcbbaa7f941ced6952a.bindTooltip(
                `&lt;div&gt;
                     면중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_214b2c33e61b4c7a2d40056b96ed4f2b = L.marker(
                [37.4885999, 126.8950267],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_214b2c33e61b4c7a2d40056b96ed4f2b.bindTooltip(
                `&lt;div&gt;
                     영서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c2132dd0399bb42195449ac4e7bc443c = L.marker(
                [37.4953861, 126.9136334],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c2132dd0399bb42195449ac4e7bc443c.bindTooltip(
                `&lt;div&gt;
                     대방중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1600ec51de926ab5f43d9daf6c5c75c4 = L.marker(
                [37.6732718, 127.0583984],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1600ec51de926ab5f43d9daf6c5c75c4.bindTooltip(
                `&lt;div&gt;
                     노원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ca1ad24e38ca5f8610397b7b2f88f12 = L.marker(
                [37.6020634, 127.0643509],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8ca1ad24e38ca5f8610397b7b2f88f12.bindTooltip(
                `&lt;div&gt;
                     이문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c2330f6d50336bedbf4c709d43675411 = L.marker(
                [37.5473003, 127.1727125],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c2330f6d50336bedbf4c709d43675411.bindTooltip(
                `&lt;div&gt;
                     상일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c21b805bbb6fb3194bfab15728019bfb = L.marker(
                [37.5377898, 127.1353379],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c21b805bbb6fb3194bfab15728019bfb.bindTooltip(
                `&lt;div&gt;
                     대세빌딩
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_06de5ec73c77c760e233d885b7460a29 = L.marker(
                [37.5327075, 127.1304647],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_06de5ec73c77c760e233d885b7460a29.bindTooltip(
                `&lt;div&gt;
                     한양감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7e4232173e8f367e2de3bd9b6d11cbbc = L.marker(
                [37.557419, 126.8421586],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7e4232173e8f367e2de3bd9b6d11cbbc.bindTooltip(
                `&lt;div&gt;
                     원당 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_498699275d01b703c9c34716cb99dfdd = L.marker(
                [37.5083753, 126.9112427],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_498699275d01b703c9c34716cb99dfdd.bindTooltip(
                `&lt;div&gt;
                     신길4동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3625df1405da03e428c9901c02e882ca = L.marker(
                [37.5006655, 126.9257597],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3625df1405da03e428c9901c02e882ca.bindTooltip(
                `&lt;div&gt;
                     대림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_de5b692d0205ff23c0d1aa3fc490929b = L.marker(
                [37.5401407, 126.8394751],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_de5b692d0205ff23c0d1aa3fc490929b.bindTooltip(
                `&lt;div&gt;
                     신월초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6c84d7f2bb79f7a0eb96f7a0e44191ad = L.marker(
                [37.6639745, 127.0475728],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6c84d7f2bb79f7a0eb96f7a0e44191ad.bindTooltip(
                `&lt;div&gt;
                     도봉 문화고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8401c91377823a0e7f2930df8947f536 = L.marker(
                [37.5429926, 126.8459016],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8401c91377823a0e7f2930df8947f536.bindTooltip(
                `&lt;div&gt;
                     화곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0444a6b7877ad80a758ce78c98d61259 = L.marker(
                [37.5858134, 126.9692374],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0444a6b7877ad80a758ce78c98d61259.bindTooltip(
                `&lt;div&gt;
                     청운초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6294a62bd3f1c55f49cd67d11d138db4 = L.marker(
                [37.5756954, 127.0100232],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6294a62bd3f1c55f49cd67d11d138db4.bindTooltip(
                `&lt;div&gt;
                     창신제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c6ee386e3531ed72b3c05f2de311ad3d = L.marker(
                [37.6119005, 127.0003236],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c6ee386e3531ed72b3c05f2de311ad3d.bindTooltip(
                `&lt;div&gt;
                     창덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_41b548a0ea6069608e3687c3190fc62d = L.marker(
                [37.4876439, 127.144758],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_41b548a0ea6069608e3687c3190fc62d.bindTooltip(
                `&lt;div&gt;
                     거원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f1e4ec1dd313a70df92bec7ac7b17a3e = L.marker(
                [37.5154848, 126.8539328],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f1e4ec1dd313a70df92bec7ac7b17a3e.bindTooltip(
                `&lt;div&gt;
                     남명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_304d3f2cb8570af7417f74674866c096 = L.marker(
                [37.5386231, 126.9499885],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_304d3f2cb8570af7417f74674866c096.bindTooltip(
                `&lt;div&gt;
                     서울마포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1a38dfd85ae578590563b15a37b71207 = L.marker(
                [37.5328602, 127.1333594],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1a38dfd85ae578590563b15a37b71207.bindTooltip(
                `&lt;div&gt;
                     성내도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb5c570bcfeddf267122297acd0a85b4 = L.marker(
                [37.5778373, 127.0156471],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eb5c570bcfeddf267122297acd0a85b4.bindTooltip(
                `&lt;div&gt;
                     숭인제1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b8cfc2ecc9c91e58e211f0a73ac645e = L.marker(
                [37.5487396, 126.9363646],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8b8cfc2ecc9c91e58e211f0a73ac645e.bindTooltip(
                `&lt;div&gt;
                     광성중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ce0dbeafc72b53535c573994ab50dcd = L.marker(
                [37.5305307, 126.9241715],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8ce0dbeafc72b53535c573994ab50dcd.bindTooltip(
                `&lt;div&gt;
                     여의도순복음교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8db1b6a4bc671466017691ab88ddc671 = L.marker(
                [37.4908348, 126.85656],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8db1b6a4bc671466017691ab88ddc671.bindTooltip(
                `&lt;div&gt;
                     개봉2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3bf6e2c7e5e13ac15d5190de6f7b55cd = L.marker(
                [37.5065938, 126.8584369],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3bf6e2c7e5e13ac15d5190de6f7b55cd.bindTooltip(
                `&lt;div&gt;
                     고척2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36f3a5303d8641affe09f09f0c1b4c39 = L.marker(
                [37.5547801, 126.9394337],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_36f3a5303d8641affe09f09f0c1b4c39.bindTooltip(
                `&lt;div&gt;
                     창천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_339498d5ade33224d62c4ce9ba20a307 = L.marker(
                [37.5319345, 126.8994424],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_339498d5ade33224d62c4ce9ba20a307.bindTooltip(
                `&lt;div&gt;
                     당서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e3360f30739ddae20a6a3b775c22dec2 = L.marker(
                [37.5952013, 127.0348931],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e3360f30739ddae20a6a3b775c22dec2.bindTooltip(
                `&lt;div&gt;
                     숭례초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d17f0a2641bec9b38d77838d3b75a973 = L.marker(
                [37.5498945, 126.9639151],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d17f0a2641bec9b38d77838d3b75a973.bindTooltip(
                `&lt;div&gt;
                     배문중고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6251b3883a7be233ffa5ca0eb5befe05 = L.marker(
                [37.5524038, 126.9606038],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6251b3883a7be233ffa5ca0eb5befe05.bindTooltip(
                `&lt;div&gt;
                     서울소의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d4240c8512374ec34d97fef63bcba3e1 = L.marker(
                [37.5484025, 126.9270708],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d4240c8512374ec34d97fef63bcba3e1.bindTooltip(
                `&lt;div&gt;
                     서강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b29bbe9045f3842a56d2004013f8a54 = L.marker(
                [37.4889754, 126.9651091],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5b29bbe9045f3842a56d2004013f8a54.bindTooltip(
                `&lt;div&gt;
                     신남성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7024b0304e297944356794d30b4f0d8d = L.marker(
                [37.4812536, 126.9557108],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7024b0304e297944356794d30b4f0d8d.bindTooltip(
                `&lt;div&gt;
                     원당초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a788a2b69ed8ba3a756d3663e6b4d459 = L.marker(
                [37.5580149, 126.9480389],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a788a2b69ed8ba3a756d3663e6b4d459.bindTooltip(
                `&lt;div&gt;
                     대신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7ee0a800c70d0b63e184377f128aacb3 = L.marker(
                [37.4854435, 126.9757561],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7ee0a800c70d0b63e184377f128aacb3.bindTooltip(
                `&lt;div&gt;
                     사당청소년문화의집
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d06a1c4aa09a30863d89f615ae058f1a = L.marker(
                [37.5695395, 126.9167345],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d06a1c4aa09a30863d89f615ae058f1a.bindTooltip(
                `&lt;div&gt;
                     남가좌1동 분회경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5bbda7ba8dc5991ae3e34b0ed584d52c = L.marker(
                [37.5938878, 126.9981205],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5bbda7ba8dc5991ae3e34b0ed584d52c.bindTooltip(
                `&lt;div&gt;
                     성북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_513115575adc053d88a963485aa0c38f = L.marker(
                [37.5475162, 127.1362174],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_513115575adc053d88a963485aa0c38f.bindTooltip(
                `&lt;div&gt;
                     천호초등학교 체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3c2e446d33e16ed4b9f95fba9af09a4b = L.marker(
                [37.5429207, 127.0802659],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3c2e446d33e16ed4b9f95fba9af09a4b.bindTooltip(
                `&lt;div&gt;
                     구의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_13ffa4d01ec1ad5647c1980e9ab90f79 = L.marker(
                [37.5802312, 127.0660865],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_13ffa4d01ec1ad5647c1980e9ab90f79.bindTooltip(
                `&lt;div&gt;
                     배봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0b0c6d9002dc44c59b39e327d00a1b31 = L.marker(
                [37.5463638, 127.1513797],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0b0c6d9002dc44c59b39e327d00a1b31.bindTooltip(
                `&lt;div&gt;
                     명일2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_110a579eb3419b34509e9dd09ba7334b = L.marker(
                [37.5462327, 127.1317431],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_110a579eb3419b34509e9dd09ba7334b.bindTooltip(
                `&lt;div&gt;
                     천호2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b3752a7cb6a7e4c433cfaabbb5132410 = L.marker(
                [37.5738977, 127.0729141],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b3752a7cb6a7e4c433cfaabbb5132410.bindTooltip(
                `&lt;div&gt;
                     장평초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5128af545c92aa15bd1da9c85ef2505c = L.marker(
                [37.5929209, 127.0657477],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5128af545c92aa15bd1da9c85ef2505c.bindTooltip(
                `&lt;div&gt;
                     휘경1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f4e6abe25e3bb55ecea71b97a576fb60 = L.marker(
                [37.6040298, 127.0959992],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f4e6abe25e3bb55ecea71b97a576fb60.bindTooltip(
                `&lt;div&gt;
                     원광장애인복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cd029283b4568efdd702a5c17b5e6d45 = L.marker(
                [37.6090393, 127.0736452],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cd029283b4568efdd702a5c17b5e6d45.bindTooltip(
                `&lt;div&gt;
                     묵현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_43cdcc0ca38849f594e598ed2ceaaad8 = L.marker(
                [37.5644518, 127.0616104],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_43cdcc0ca38849f594e598ed2ceaaad8.bindTooltip(
                `&lt;div&gt;
                     군자초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65e299d75e234b4c8329767cd8f9b8be = L.marker(
                [37.5637249, 127.0894857],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_65e299d75e234b4c8329767cd8f9b8be.bindTooltip(
                `&lt;div&gt;
                     대원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ec6d8dacd5b61ea81667ea619f880e0 = L.marker(
                [37.5302178, 126.8514521],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4ec6d8dacd5b61ea81667ea619f880e0.bindTooltip(
                `&lt;div&gt;
                     일심 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b08cc0b6ba56bdf6deb32198c7e9a01c = L.marker(
                [37.5209583, 126.8714642],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b08cc0b6ba56bdf6deb32198c7e9a01c.bindTooltip(
                `&lt;div&gt;
                     목동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4375b98db2db62380ef6f2be4229e711 = L.marker(
                [37.4677782, 126.941466],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4375b98db2db62380ef6f2be4229e711.bindTooltip(
                `&lt;div&gt;
                     서울삼성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_96990c871a9fdcd44bc56d800b469f91 = L.marker(
                [37.5771169, 127.0841899],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_96990c871a9fdcd44bc56d800b469f91.bindTooltip(
                `&lt;div&gt;
                     산돌교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6ad0fa27fe480bf8f79305cebd35f8f8 = L.marker(
                [37.5880437, 126.9933924],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6ad0fa27fe480bf8f79305cebd35f8f8.bindTooltip(
                `&lt;div&gt;
                     성균관대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d6ed4f2447d13244d4d02de26babba76 = L.marker(
                [37.5463987, 126.9336747],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d6ed4f2447d13244d4d02de26babba76.bindTooltip(
                `&lt;div&gt;
                     신수중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aad45c1b9156cb19050ae6c5a79944e6 = L.marker(
                [37.4827352, 126.9788914],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_aad45c1b9156cb19050ae6c5a79944e6.bindTooltip(
                `&lt;div&gt;
                     남사초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_07586a9001d4b6859453d4da0f556f09 = L.marker(
                [37.5688885, 126.8069612],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_07586a9001d4b6859453d4da0f556f09.bindTooltip(
                `&lt;div&gt;
                     방화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b7b685c86eb7b08534f991347cd9056 = L.marker(
                [37.4969866, 127.0777533],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8b7b685c86eb7b08534f991347cd9056.bindTooltip(
                `&lt;div&gt;
                     대진초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_66c3a9e76eb381b40bf0a4003c4583ba = L.marker(
                [37.4814125, 127.0861939],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_66c3a9e76eb381b40bf0a4003c4583ba.bindTooltip(
                `&lt;div&gt;
                     대모초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_704e716e0b924307f4cdcd3b4fc40dd7 = L.marker(
                [37.5435354, 127.0488162],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_704e716e0b924307f4cdcd3b4fc40dd7.bindTooltip(
                `&lt;div&gt;
                     경일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ff5ad681935b10a363c9144d3467f8ce = L.marker(
                [37.5401648, 127.0804549],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ff5ad681935b10a363c9144d3467f8ce.bindTooltip(
                `&lt;div&gt;
                     건국대학교부속고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dc30b0ec38c7e73762a5bdc1e4d1f569 = L.marker(
                [37.6599354, 127.0103193],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_dc30b0ec38c7e73762a5bdc1e4d1f569.bindTooltip(
                `&lt;div&gt;
                     우이제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2cbb5fc32c5bc439172926663c26f653 = L.marker(
                [37.5625589, 126.9256035],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2cbb5fc32c5bc439172926663c26f653.bindTooltip(
                `&lt;div&gt;
                     일심교회(12층)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_454144435b54918fa4992295c1904707 = L.marker(
                [37.5286161, 126.8347999],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_454144435b54918fa4992295c1904707.bindTooltip(
                `&lt;div&gt;
                     곰달래경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e40cd4548c4f05c4a520b1f81bc8448d = L.marker(
                [37.4954554, 126.9059717],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e40cd4548c4f05c4a520b1f81bc8448d.bindTooltip(
                `&lt;div&gt;
                     구립대림1경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_453a7f3929187947045e570a10d6bbe6 = L.marker(
                [37.5095567, 126.8960031],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_453a7f3929187947045e570a10d6bbe6.bindTooltip(
                `&lt;div&gt;
                     도림동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d64d211cc322e271770f829410a4e31d = L.marker(
                [37.6140021, 127.0178188],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d64d211cc322e271770f829410a4e31d.bindTooltip(
                `&lt;div&gt;
                     길음초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d4366fdb3205db3799ef7e9eee1fe50d = L.marker(
                [37.5525268, 127.1689205],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d4366fdb3205db3799ef7e9eee1fe50d.bindTooltip(
                `&lt;div&gt;
                     고일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_53fb9e53ee93e5f3754af1517bdf275a = L.marker(
                [37.5592958, 126.9305972],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_53fb9e53ee93e5f3754af1517bdf275a.bindTooltip(
                `&lt;div&gt;
                     서강동주민센터 강당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_97bad1c8534ef9569ed41dcfc0263652 = L.marker(
                [37.5103395, 126.9451454],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_97bad1c8534ef9569ed41dcfc0263652.bindTooltip(
                `&lt;div&gt;
                     강남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b2a200575124ed9382e3f43de7bc8b1 = L.marker(
                [37.5651319, 127.034657],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6b2a200575124ed9382e3f43de7bc8b1.bindTooltip(
                `&lt;div&gt;
                     한국예술고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7dedd606699b93b77481800d6868eec5 = L.marker(
                [37.6058238, 127.0932408],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7dedd606699b93b77481800d6868eec5.bindTooltip(
                `&lt;div&gt;
                     신현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e13d476a07b60365f793ac6ead0d2fc1 = L.marker(
                [37.5325474, 127.1197653],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e13d476a07b60365f793ac6ead0d2fc1.bindTooltip(
                `&lt;div&gt;
                     영파여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_717de54725f6227b97b031bf5c7c07ec = L.marker(
                [37.553557, 127.1575755],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_717de54725f6227b97b031bf5c7c07ec.bindTooltip(
                `&lt;div&gt;
                     경희대동서신의학병원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_57dc622a68d4218d6e57f339efefab47 = L.marker(
                [37.5324361, 127.1295584],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_57dc622a68d4218d6e57f339efefab47.bindTooltip(
                `&lt;div&gt;
                     성내2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1f20229bcdf10cf2bdce32b0aa4cbcdc = L.marker(
                [37.5717884, 127.0588047],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1f20229bcdf10cf2bdce32b0aa4cbcdc.bindTooltip(
                `&lt;div&gt;
                     신답교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb048717eff50302857e28f991789523 = L.marker(
                [37.5471039, 127.1016146],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eb048717eff50302857e28f991789523.bindTooltip(
                `&lt;div&gt;
                     광장중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2cb2fcbf851343aa96ca8df664c97a14 = L.marker(
                [37.6579022, 127.0466311],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2cb2fcbf851343aa96ca8df664c97a14.bindTooltip(
                `&lt;div&gt;
                     서울자운초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_878563efc361690dc87789f51159a786 = L.marker(
                [37.6090978, 127.0384271],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_878563efc361690dc87789f51159a786.bindTooltip(
                `&lt;div&gt;
                     숭인초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_21a6513ca7ee096abcd027b03c847542 = L.marker(
                [37.5610494, 127.1665402],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_21a6513ca7ee096abcd027b03c847542.bindTooltip(
                `&lt;div&gt;
                     고덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b289ebb4ffbc750cbb58d8d154a03809 = L.marker(
                [37.5583328, 126.9020726],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b289ebb4ffbc750cbb58d8d154a03809.bindTooltip(
                `&lt;div&gt;
                     동교초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_99ed0268631374ec1bfb7961213662f6 = L.marker(
                [37.5949689, 127.0750076],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_99ed0268631374ec1bfb7961213662f6.bindTooltip(
                `&lt;div&gt;
                     중화2동 문화복지센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e1c095cb2445bbb3b1c766fb8ca228d8 = L.marker(
                [37.487349, 126.9025454],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e1c095cb2445bbb3b1c766fb8ca228d8.bindTooltip(
                `&lt;div&gt;
                     영림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_83400854db45e81387877c1dffa6ca31 = L.marker(
                [37.5656918, 126.9187633],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_83400854db45e81387877c1dffa6ca31.bindTooltip(
                `&lt;div&gt;
                     연서경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f8da20855935e0711f3c7ff726d3f4ef = L.marker(
                [37.6411204, 127.0715826],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f8da20855935e0711f3c7ff726d3f4ef.bindTooltip(
                `&lt;div&gt;
                     하계중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6dc2df74a4d199fec4496cf3ba38f601 = L.marker(
                [37.5051409, 126.9027647],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6dc2df74a4d199fec4496cf3ba38f601.bindTooltip(
                `&lt;div&gt;
                     성락교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0217ad3392eac7bf19116570011120b1 = L.marker(
                [37.4941903, 126.8739442],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0217ad3392eac7bf19116570011120b1.bindTooltip(
                `&lt;div&gt;
                     구일고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b95ac4f55d72e82998521fab4422366 = L.marker(
                [37.5908104, 127.0553972],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6b95ac4f55d72e82998521fab4422366.bindTooltip(
                `&lt;div&gt;
                     회기동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ac936aa2a5de8a961c15861d1e293937 = L.marker(
                [37.4887286, 126.9792404],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ac936aa2a5de8a961c15861d1e293937.bindTooltip(
                `&lt;div&gt;
                     사당2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4601ff83a5027b65a2c76a3ecd375b45 = L.marker(
                [37.4947492, 126.8903454],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4601ff83a5027b65a2c76a3ecd375b45.bindTooltip(
                `&lt;div&gt;
                     구로중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_acb81dc3825f345966ea0d434fcb574b = L.marker(
                [37.5460569, 127.0173401],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_acb81dc3825f345966ea0d434fcb574b.bindTooltip(
                `&lt;div&gt;
                     금옥초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_027ad02f67a6ab2b6a828c6d0cb113a1 = L.marker(
                [37.6036263, 127.1054342],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_027ad02f67a6ab2b6a828c6d0cb113a1.bindTooltip(
                `&lt;div&gt;
                     영란여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_43b360e4d6bbea7a2739d4eba38d8991 = L.marker(
                [37.6087583, 127.0699198],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_43b360e4d6bbea7a2739d4eba38d8991.bindTooltip(
                `&lt;div&gt;
                     석계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c568fd99e8588f547b6a5c62e1df6d25 = L.marker(
                [37.4844111, 126.9756816],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c568fd99e8588f547b6a5c62e1df6d25.bindTooltip(
                `&lt;div&gt;
                     남성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_204471a654fb54ebadd452b6897f44e2 = L.marker(
                [37.5252358, 126.9651413],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_204471a654fb54ebadd452b6897f44e2.bindTooltip(
                `&lt;div&gt;
                     한강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0827a316155ac355864c1e99e03004b6 = L.marker(
                [37.5345552, 126.8367024],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0827a316155ac355864c1e99e03004b6.bindTooltip(
                `&lt;div&gt;
                     월정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6fd8f1b3ba8645e30b49aaca440902cf = L.marker(
                [37.5134385, 127.1205334],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6fd8f1b3ba8645e30b49aaca440902cf.bindTooltip(
                `&lt;div&gt;
                     방이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_03250b73d899e1cdfb9cacfca8ed4535 = L.marker(
                [37.5577254, 126.9335888],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_03250b73d899e1cdfb9cacfca8ed4535.bindTooltip(
                `&lt;div&gt;
                     창서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_57815f352ea992f005da578189a0fc54 = L.marker(
                [37.5121764, 127.0394861],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_57815f352ea992f005da578189a0fc54.bindTooltip(
                `&lt;div&gt;
                     학동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f83c438e44b1b1b4407a3354937b1e2e = L.marker(
                [37.5694841, 126.9339245],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f83c438e44b1b1b4407a3354937b1e2e.bindTooltip(
                `&lt;div&gt;
                     연희초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f389733bd05c744984824e44c0659cff = L.marker(
                [37.554986, 126.9251698],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f389733bd05c744984824e44c0659cff.bindTooltip(
                `&lt;div&gt;
                     서교초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7cb97c65bea20ca2c70b964e5d080f39 = L.marker(
                [37.5976555, 127.0759495],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7cb97c65bea20ca2c70b964e5d080f39.bindTooltip(
                `&lt;div&gt;
                     수산교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3c2343fb2d879db48e57f182061fa382 = L.marker(
                [37.5354546, 127.1251253],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3c2343fb2d879db48e57f182061fa382.bindTooltip(
                `&lt;div&gt;
                     동안교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_45610051250fb0a4c3772ad47766f9d1 = L.marker(
                [37.5317333, 127.0308305],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_45610051250fb0a4c3772ad47766f9d1.bindTooltip(
                `&lt;div&gt;
                     압구정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5d9b5171a05ff01d7b34aaeebe28f83e = L.marker(
                [37.6601773, 127.0435392],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5d9b5171a05ff01d7b34aaeebe28f83e.bindTooltip(
                `&lt;div&gt;
                     서울가인초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_51887e6e449d62602a476693a8eec756 = L.marker(
                [37.489575, 126.8384794],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_51887e6e449d62602a476693a8eec756.bindTooltip(
                `&lt;div&gt;
                     오류남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_241aff4b81f887689fbdfa8b7ca0655c = L.marker(
                [37.4813414, 126.8934878],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_241aff4b81f887689fbdfa8b7ca0655c.bindTooltip(
                `&lt;div&gt;
                     가리봉동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5f40f5d014a32373768f5af85bb99fbb = L.marker(
                [37.4628024, 126.9328282],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5f40f5d014a32373768f5af85bb99fbb.bindTooltip(
                `&lt;div&gt;
                     신우초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3172e117679d8743d11f398250b91e0b = L.marker(
                [37.5097323, 126.8975167],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3172e117679d8743d11f398250b91e0b.bindTooltip(
                `&lt;div&gt;
                     구립모랫말 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e13b4c8919777ecf46bbe1a9f28948ec = L.marker(
                [37.5909504, 127.0014038],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e13b4c8919777ecf46bbe1a9f28948ec.bindTooltip(
                `&lt;div&gt;
                     경산중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_876d93e69ff057ebd11368435db6f91e = L.marker(
                [37.5217447, 126.99233],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_876d93e69ff057ebd11368435db6f91e.bindTooltip(
                `&lt;div&gt;
                     서빙고초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9ddcdd1d3b6ca1561e7e15bad5200e39 = L.marker(
                [37.5381508, 126.89628],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9ddcdd1d3b6ca1561e7e15bad5200e39.bindTooltip(
                `&lt;div&gt;
                     구립양평4가 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_93d75ccc0a4643d19f338658471e4f58 = L.marker(
                [37.6669473, 127.0533922],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_93d75ccc0a4643d19f338658471e4f58.bindTooltip(
                `&lt;div&gt;
                     상경중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_df73ae2a44e68ab39fb0403cba42c1c6 = L.marker(
                [37.5332002, 127.0895409],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_df73ae2a44e68ab39fb0403cba42c1c6.bindTooltip(
                `&lt;div&gt;
                     성동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f9f90f8a9cb7fa8d1ced7ff37ecbc20b = L.marker(
                [37.5665944, 127.0709207],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f9f90f8a9cb7fa8d1ced7ff37ecbc20b.bindTooltip(
                `&lt;div&gt;
                     장평중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35231113b991def8a29fb6608d86f727 = L.marker(
                [37.6282778, 127.0281832],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_35231113b991def8a29fb6608d86f727.bindTooltip(
                `&lt;div&gt;
                     신일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b59e61fdaef188ec4516488e079a1b58 = L.marker(
                [37.5070763, 127.0843785],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b59e61fdaef188ec4516488e079a1b58.bindTooltip(
                `&lt;div&gt;
                     서울잠전초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d15d456c892d2655b306e551ec271f38 = L.marker(
                [37.6028284, 127.076179],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d15d456c892d2655b306e551ec271f38.bindTooltip(
                `&lt;div&gt;
                     중화2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ffe7439753c6b8c2573d987eca2b4ba8 = L.marker(
                [37.5719601, 127.0170331],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ffe7439753c6b8c2573d987eca2b4ba8.bindTooltip(
                `&lt;div&gt;
                     숭신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_18bf487ea9772999263a22e1d047a0a8 = L.marker(
                [37.5003451, 127.1197627],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_18bf487ea9772999263a22e1d047a0a8.bindTooltip(
                `&lt;div&gt;
                     신가초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bec91b36389b994d797962ef1ea583b1 = L.marker(
                [37.539829, 127.129843],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_bec91b36389b994d797962ef1ea583b1.bindTooltip(
                `&lt;div&gt;
                     천호3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f0d40ceadaadb618896d1d701a158ce = L.marker(
                [37.5582034, 127.0451217],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3f0d40ceadaadb618896d1d701a158ce.bindTooltip(
                `&lt;div&gt;
                     한양사범대
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a765745f7930ebd4c50e985e1d4ab9e7 = L.marker(
                [37.5319806, 127.0896252],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a765745f7930ebd4c50e985e1d4ab9e7.bindTooltip(
                `&lt;div&gt;
                     광진중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3c99a01988b90617498778f612cfe702 = L.marker(
                [37.6641576, 127.0318296],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3c99a01988b90617498778f612cfe702.bindTooltip(
                `&lt;div&gt;
                     서울방학초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5fdcf7f78a38827d87016315e966f0c0 = L.marker(
                [37.4936434, 127.0811545],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5fdcf7f78a38827d87016315e966f0c0.bindTooltip(
                `&lt;div&gt;
                     중동고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bea970d9ed9037ae33d9f60767968241 = L.marker(
                [37.5554822, 127.141504],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_bea970d9ed9037ae33d9f60767968241.bindTooltip(
                `&lt;div&gt;
                     강동롯데캐슬경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6576633e40858c512bc8ce9e71caffcf = L.marker(
                [37.5304747, 127.1224752],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6576633e40858c512bc8ce9e71caffcf.bindTooltip(
                `&lt;div&gt;
                     성내1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_95bbf13a79020119919a217e888722b6 = L.marker(
                [37.5655809, 126.9237706],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_95bbf13a79020119919a217e888722b6.bindTooltip(
                `&lt;div&gt;
                     연동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8499731d15b94f274574af5de7da9eb7 = L.marker(
                [37.5328907, 126.8526634],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8499731d15b94f274574af5de7da9eb7.bindTooltip(
                `&lt;div&gt;
                     신정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ec6735dc79d61fa8efb4b18aa54446dd = L.marker(
                [37.5389557, 126.8557082],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ec6735dc79d61fa8efb4b18aa54446dd.bindTooltip(
                `&lt;div&gt;
                     신곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3bf58b2fe0b504c9f0b2b489a0cd0503 = L.marker(
                [37.4595098, 126.8875085],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3bf58b2fe0b504c9f0b2b489a0cd0503.bindTooltip(
                `&lt;div&gt;
                     안천중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_72493a722d227187d48904030d6e2fe7 = L.marker(
                [37.4722792, 126.9406116],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_72493a722d227187d48904030d6e2fe7.bindTooltip(
                `&lt;div&gt;
                     서림경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_26a27bc6b32612bb71fa0313933ff676 = L.marker(
                [37.4837549, 127.0464755],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_26a27bc6b32612bb71fa0313933ff676.bindTooltip(
                `&lt;div&gt;
                     도곡2문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed84d052d0a28beff4eda4dc173b6a04 = L.marker(
                [37.5000383, 126.8510764],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ed84d052d0a28beff4eda4dc173b6a04.bindTooltip(
                `&lt;div&gt;
                     개봉1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35698e6402937cf3a1265f770529f77a = L.marker(
                [37.4860026, 126.8538531],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_35698e6402937cf3a1265f770529f77a.bindTooltip(
                `&lt;div&gt;
                     개봉3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f6040d1201726a1c38bb6f986a21e63b = L.marker(
                [37.5228069, 126.8721454],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f6040d1201726a1c38bb6f986a21e63b.bindTooltip(
                `&lt;div&gt;
                     목동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_627d385ed3236b5a82f706c6fd653db2 = L.marker(
                [37.5408474, 126.8343592],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_627d385ed3236b5a82f706c6fd653db2.bindTooltip(
                `&lt;div&gt;
                     수명 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2a5e7a22e752fe52e6fd304871a0a793 = L.marker(
                [37.4966431, 126.9090679],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2a5e7a22e752fe52e6fd304871a0a793.bindTooltip(
                `&lt;div&gt;
                     우성3차아파트 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ba633d892ba2d6220cd6c10b7367942a = L.marker(
                [37.5697848, 126.81391],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ba633d892ba2d6220cd6c10b7367942a.bindTooltip(
                `&lt;div&gt;
                     방화구립 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca57322fbb153b70a5b62c5688007b07 = L.marker(
                [37.5799535, 126.9178553],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ca57322fbb153b70a5b62c5688007b07.bindTooltip(
                `&lt;div&gt;
                     연가초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_06b3ed7ed4a5308b964d2da0d3bceb9b = L.marker(
                [37.4983656, 126.8424497],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_06b3ed7ed4a5308b964d2da0d3bceb9b.bindTooltip(
                `&lt;div&gt;
                     오류초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8d59598fde17c1deffc2385f70a1e3ff = L.marker(
                [37.4978787, 126.8958527],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8d59598fde17c1deffc2385f70a1e3ff.bindTooltip(
                `&lt;div&gt;
                     영남중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e9cd6656929311d6e46417a4e5bf37da = L.marker(
                [37.5923035, 127.0559615],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e9cd6656929311d6e46417a4e5bf37da.bindTooltip(
                `&lt;div&gt;
                     청량초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f2cb492a681ee35a1e3c74ca86c07401 = L.marker(
                [37.5646332, 127.0512329],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f2cb492a681ee35a1e3c74ca86c07401.bindTooltip(
                `&lt;div&gt;
                     성답교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_30fa9686edb042b9a360e1f18f5094a8 = L.marker(
                [37.479212, 126.8944985],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_30fa9686edb042b9a360e1f18f5094a8.bindTooltip(
                `&lt;div&gt;
                     연희미용고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d97838ba669a796b17fd91c0363aa2c9 = L.marker(
                [37.5237687, 126.8616908],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d97838ba669a796b17fd91c0363aa2c9.bindTooltip(
                `&lt;div&gt;
                     양목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f6bdfdcee626b37f4958af88c887f4e7 = L.marker(
                [37.4857776, 126.8933053],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f6bdfdcee626b37f4958af88c887f4e7.bindTooltip(
                `&lt;div&gt;
                     구로3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a77a67ab0e93ef5ec8f4196185cba06e = L.marker(
                [37.5524501, 126.9197762],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a77a67ab0e93ef5ec8f4196185cba06e.bindTooltip(
                `&lt;div&gt;
                     서교동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56b7674f8168a63c35b6ca83d492e74b = L.marker(
                [37.5185604, 126.8935426],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_56b7674f8168a63c35b6ca83d492e74b.bindTooltip(
                `&lt;div&gt;
                     문래초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a7fe12f769d72cab852c91e290592b13 = L.marker(
                [37.521834, 126.8825947],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a7fe12f769d72cab852c91e290592b13.bindTooltip(
                `&lt;div&gt;
                     관악고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_184f41b9df9fb907896745b2b94eee66 = L.marker(
                [37.4849993, 126.8908446],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_184f41b9df9fb907896745b2b94eee66.bindTooltip(
                `&lt;div&gt;
                     서울구로남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e9fc997d4db39a9877941651da6bf876 = L.marker(
                [37.4987497, 126.901185],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e9fc997d4db39a9877941651da6bf876.bindTooltip(
                `&lt;div&gt;
                     도신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b65525569dd15f5f4fc81eb45119558f = L.marker(
                [37.5634175, 126.9190284],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b65525569dd15f5f4fc81eb45119558f.bindTooltip(
                `&lt;div&gt;
                     경성고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9472f8f38f7a125ec5611edf40b7be3c = L.marker(
                [37.5398815, 126.8700818],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_9472f8f38f7a125ec5611edf40b7be3c.bindTooltip(
                `&lt;div&gt;
                     새말경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_03a016785b86e463f0acea3de717ce84 = L.marker(
                [37.568497, 127.0062461],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_03a016785b86e463f0acea3de717ce84.bindTooltip(
                `&lt;div&gt;
                     중구민회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6fc62d92806e77547eb81ac78f26407a = L.marker(
                [37.4622696, 126.9175362],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6fc62d92806e77547eb81ac78f26407a.bindTooltip(
                `&lt;div&gt;
                     난향초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d2669abc939677364845b71110b53c24 = L.marker(
                [37.5456165, 126.9428183],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d2669abc939677364845b71110b53c24.bindTooltip(
                `&lt;div&gt;
                     태영 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_940d6fa08e9e9d88c8192ac8f0bac2fe = L.marker(
                [37.6388225, 127.0150457],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_940d6fa08e9e9d88c8192ac8f0bac2fe.bindTooltip(
                `&lt;div&gt;
                     우이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0ebb1aa506d546df54e043710047c397 = L.marker(
                [37.4961983, 127.1432261],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0ebb1aa506d546df54e043710047c397.bindTooltip(
                `&lt;div&gt;
                     영풍초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_01ae88406adbade1632bc744eb6fc705 = L.marker(
                [37.4850743, 127.1279596],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_01ae88406adbade1632bc744eb6fc705.bindTooltip(
                `&lt;div&gt;
                     문덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dbae85ea7066061c9b5870ef85255fa3 = L.marker(
                [37.5140066, 127.0950468],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_dbae85ea7066061c9b5870ef85255fa3.bindTooltip(
                `&lt;div&gt;
                     신천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5674018f19d1b890a13cb685177fd4ec = L.marker(
                [37.5418647, 127.0152648],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5674018f19d1b890a13cb685177fd4ec.bindTooltip(
                `&lt;div&gt;
                     옥정초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f67c969b365bd8420e6c5ab9a0872e61 = L.marker(
                [37.6458954, 127.0062436],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f67c969b365bd8420e6c5ab9a0872e61.bindTooltip(
                `&lt;div&gt;
                     강북청소년수련관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5e1ba38671b96bb9ce64086f59194511 = L.marker(
                [37.588121, 127.0562553],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5e1ba38671b96bb9ce64086f59194511.bindTooltip(
                `&lt;div&gt;
                     휘경2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e4ae072c3692e178d10ba24e3b8f3a67 = L.marker(
                [37.616224, 127.0154254],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e4ae072c3692e178d10ba24e3b8f3a67.bindTooltip(
                `&lt;div&gt;
                     삼각산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6cc08c66825e8bf68227869a08e7fc3b = L.marker(
                [37.5029317, 127.1045978],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6cc08c66825e8bf68227869a08e7fc3b.bindTooltip(
                `&lt;div&gt;
                     석촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_364ffe77cdff7017e1a85e3bb2a1a873 = L.marker(
                [37.4959523, 127.1299459],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_364ffe77cdff7017e1a85e3bb2a1a873.bindTooltip(
                `&lt;div&gt;
                     송파중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_49249d5fa3a8a189ca99b4062d861dae = L.marker(
                [37.6033412, 126.9609868],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_49249d5fa3a8a189ca99b4062d861dae.bindTooltip(
                `&lt;div&gt;
                     세검정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7fee90c6f6494eb83c80bd1f8826c569 = L.marker(
                [37.5001442, 126.8621388],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7fee90c6f6494eb83c80bd1f8826c569.bindTooltip(
                `&lt;div&gt;
                     고척중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e9b0d5e113cf30be8d649488ed10ae8c = L.marker(
                [37.6309352, 127.0201095],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e9b0d5e113cf30be8d649488ed10ae8c.bindTooltip(
                `&lt;div&gt;
                     수유초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fb18a46025e83832e79b16bc3b9ff478 = L.marker(
                [37.5093623, 127.1319795],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fb18a46025e83832e79b16bc3b9ff478.bindTooltip(
                `&lt;div&gt;
                     오금초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_05c63257ea0e0805179eff1c52de2041 = L.marker(
                [37.538643, 126.965921],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_05c63257ea0e0805179eff1c52de2041.bindTooltip(
                `&lt;div&gt;
                     원효1동자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56f9d85a0d96961fe0082e29559c294d = L.marker(
                [37.4974211, 126.9539659],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_56f9d85a0d96961fe0082e29559c294d.bindTooltip(
                `&lt;div&gt;
                     고경경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_153b3c263481e2c9ee4cbc4ab953e572 = L.marker(
                [37.6549766, 127.0260305],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_153b3c263481e2c9ee4cbc4ab953e572.bindTooltip(
                `&lt;div&gt;
                     서울동북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c346099192f2212a10dc49cd099e3aeb = L.marker(
                [37.5047211, 127.1293523],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c346099192f2212a10dc49cd099e3aeb.bindTooltip(
                `&lt;div&gt;
                     오금고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68bca2effd294043953c61237ff26994 = L.marker(
                [37.5801672, 126.9083741],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_68bca2effd294043953c61237ff26994.bindTooltip(
                `&lt;div&gt;
                     신가경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f32d563def8cc255b7c3d46a3bc457cc = L.marker(
                [37.5638685, 126.9514498],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f32d563def8cc255b7c3d46a3bc457cc.bindTooltip(
                `&lt;div&gt;
                     대한예수교장로회 북아현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46f3936bf8e0355bd32c43b039cd34ff = L.marker(
                [37.5746144, 127.054402],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_46f3936bf8e0355bd32c43b039cd34ff.bindTooltip(
                `&lt;div&gt;
                     전농초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_28e554c576534eace2c9745f3f03d088 = L.marker(
                [37.5577433, 126.9588344],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_28e554c576534eace2c9745f3f03d088.bindTooltip(
                `&lt;div&gt;
                     아현감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_188c8ebfb832dd4e801d8731601f3d67 = L.marker(
                [37.5177426, 126.9877673],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_188c8ebfb832dd4e801d8731601f3d67.bindTooltip(
                `&lt;div&gt;
                     신동아(아)관리사무소
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fa802118330f2d3c6296d4cf318f740e = L.marker(
                [37.4619494, 127.0512045],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fa802118330f2d3c6296d4cf318f740e.bindTooltip(
                `&lt;div&gt;
                     내곡동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ac0b78e9bcaf9da62412eaa44bccd2ea = L.marker(
                [37.622368, 127.0836409],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ac0b78e9bcaf9da62412eaa44bccd2ea.bindTooltip(
                `&lt;div&gt;
                     공릉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c2068dbea1d19564dd25202fcee76255 = L.marker(
                [37.5378318, 127.1226778],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c2068dbea1d19564dd25202fcee76255.bindTooltip(
                `&lt;div&gt;
                     광성교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a40ff277dcadd5cee32fe1e89c139287 = L.marker(
                [37.6627426, 127.0625315],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a40ff277dcadd5cee32fe1e89c139287.bindTooltip(
                `&lt;div&gt;
                     상곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c52ded3cc887a4f9094c4e97b81d219e = L.marker(
                [37.548234, 127.1481451],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c52ded3cc887a4f9094c4e97b81d219e.bindTooltip(
                `&lt;div&gt;
                     명성교회 예루살렘관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_381506d81d0cd02204485095cf4376af = L.marker(
                [37.5361261, 127.1353799],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_381506d81d0cd02204485095cf4376af.bindTooltip(
                `&lt;div&gt;
                     강동성심병원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a34f3a495def696284e946d60d4d8c29 = L.marker(
                [37.5582216, 127.0844446],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a34f3a495def696284e946d60d4d8c29.bindTooltip(
                `&lt;div&gt;
                     용마초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a0b478851a78ef6ed303d988af93c97 = L.marker(
                [37.5742948, 127.0859627],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8a0b478851a78ef6ed303d988af93c97.bindTooltip(
                `&lt;div&gt;
                     용마중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6e23bdcf27ff8f7fe65074e437add287 = L.marker(
                [37.5305076, 127.1186391],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6e23bdcf27ff8f7fe65074e437add287.bindTooltip(
                `&lt;div&gt;
                     풍납동 천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a5d34b6ea26044900ccacce1a5a74a36 = L.marker(
                [37.5573111, 127.0235263],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a5d34b6ea26044900ccacce1a5a74a36.bindTooltip(
                `&lt;div&gt;
                     금북초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5ad77da6f14ed169d87d60e32382dfde = L.marker(
                [37.6496153, 127.0333463],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5ad77da6f14ed169d87d60e32382dfde.bindTooltip(
                `&lt;div&gt;
                     신도봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_03db0e1bacc9d091d5c7d414f9044cff = L.marker(
                [37.5426916, 126.9459951],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_03db0e1bacc9d091d5c7d414f9044cff.bindTooltip(
                `&lt;div&gt;
                     염리초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f7e2833f29228304bde0857f7ea7092 = L.marker(
                [37.5334763, 126.9713117],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3f7e2833f29228304bde0857f7ea7092.bindTooltip(
                `&lt;div&gt;
                     삼각교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b1d32896c80ba6462051e8c7e9200dc = L.marker(
                [37.5761096, 127.0303341],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5b1d32896c80ba6462051e8c7e9200dc.bindTooltip(
                `&lt;div&gt;
                     용신동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_600a2ef64678d9a68c120ac7d50173a7 = L.marker(
                [37.6428859, 127.0096097],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_600a2ef64678d9a68c120ac7d50173a7.bindTooltip(
                `&lt;div&gt;
                     인수초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_be61c495c8d8cfbb57a2a5888148a959 = L.marker(
                [37.4690573, 127.1069329],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_be61c495c8d8cfbb57a2a5888148a959.bindTooltip(
                `&lt;div&gt;
                     세곡문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dc7e8bea9443739af94df93b48b63910 = L.marker(
                [37.5420908, 126.9427266],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_dc7e8bea9443739af94df93b48b63910.bindTooltip(
                `&lt;div&gt;
                     선민교회(지하1층)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8cf3e9fa5f56888b349b53052b190197 = L.marker(
                [37.5784794, 127.0706106],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8cf3e9fa5f56888b349b53052b190197.bindTooltip(
                `&lt;div&gt;
                     장안2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_55b5c3ceb54bd333847566613ff31454 = L.marker(
                [37.6292746, 127.0404438],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_55b5c3ceb54bd333847566613ff31454.bindTooltip(
                `&lt;div&gt;
                     번동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f91482fb7451a8be6714db6bb10e5a7 = L.marker(
                [37.5761546, 127.0288143],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3f91482fb7451a8be6714db6bb10e5a7.bindTooltip(
                `&lt;div&gt;
                     용두초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_86fa6605e422f9700516772056381f99 = L.marker(
                [37.537151, 126.9676884],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_86fa6605e422f9700516772056381f99.bindTooltip(
                `&lt;div&gt;
                     용산문화체육센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0db5918c2ae9a4237cb4d522a10b0184 = L.marker(
                [37.5796863, 126.8824442],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0db5918c2ae9a4237cb4d522a10b0184.bindTooltip(
                `&lt;div&gt;
                     상지초등학교(체육관)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f0ef8c5685778a5e3b92c93982bc4750 = L.marker(
                [37.5497679, 127.1460008],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f0ef8c5685778a5e3b92c93982bc4750.bindTooltip(
                `&lt;div&gt;
                     명일1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2d42217901d3deaa0b6cac7b0188b3f8 = L.marker(
                [37.5205741, 126.8623063],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2d42217901d3deaa0b6cac7b0188b3f8.bindTooltip(
                `&lt;div&gt;
                     신서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_15c739029890a60a061c623b9ae6ca82 = L.marker(
                [37.4759632, 127.0531898],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_15c739029890a60a061c623b9ae6ca82.bindTooltip(
                `&lt;div&gt;
                     포이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d16b3dc240a69918dd6be693ca2df4e7 = L.marker(
                [37.5340451, 126.860835],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d16b3dc240a69918dd6be693ca2df4e7.bindTooltip(
                `&lt;div&gt;
                     무지개 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_577a31d3f951dbf5c33d2d1321632b8b = L.marker(
                [37.5443423, 126.9380392],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_577a31d3f951dbf5c33d2d1321632b8b.bindTooltip(
                `&lt;div&gt;
                     신석초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8674b4d9dc65f6881c6be78a88516e7e = L.marker(
                [37.5534721, 127.0991421],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8674b4d9dc65f6881c6be78a88516e7e.bindTooltip(
                `&lt;div&gt;
                     동의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1413a50235bd3bd9e67c7f6bf9e03593 = L.marker(
                [37.6054224, 126.9669364],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1413a50235bd3bd9e67c7f6bf9e03593.bindTooltip(
                `&lt;div&gt;
                     평창동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f40a10fd2bafd364732121ccdde5961 = L.marker(
                [37.5130898, 126.9560632],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3f40a10fd2bafd364732121ccdde5961.bindTooltip(
                `&lt;div&gt;
                     현장민원실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ae096366a3b977560b95836f7f0aa9ef = L.marker(
                [37.5520498, 126.8332228],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ae096366a3b977560b95836f7f0aa9ef.bindTooltip(
                `&lt;div&gt;
                     발음 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_304e341264a8f3bee7a7132fb1e1b65f = L.marker(
                [37.5024475, 127.1188974],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_304e341264a8f3bee7a7132fb1e1b65f.bindTooltip(
                `&lt;div&gt;
                     가락중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_34ad3b1c00bcdabebd3083bd02620266 = L.marker(
                [37.5198535, 127.0451261],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_34ad3b1c00bcdabebd3083bd02620266.bindTooltip(
                `&lt;div&gt;
                     언북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0a655b358105ee6e9beaf06cb655d81f = L.marker(
                [37.5738682, 126.9352474],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_0a655b358105ee6e9beaf06cb655d81f.bindTooltip(
                `&lt;div&gt;
                     연희동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56f6417d8a0214e513187a190386b06d = L.marker(
                [37.5564413, 127.157416],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_56f6417d8a0214e513187a190386b06d.bindTooltip(
                `&lt;div&gt;
                     온조대왕문화체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2ab1409ea9f883ce46148c6935a0156c = L.marker(
                [37.4963062, 126.9893434],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2ab1409ea9f883ce46148c6935a0156c.bindTooltip(
                `&lt;div&gt;
                     서울 서래 초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_db782bbce17c7647b41df69a2a2ae62e = L.marker(
                [37.6047239, 127.1001116],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_db782bbce17c7647b41df69a2a2ae62e.bindTooltip(
                `&lt;div&gt;
                     신내초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_96abcc44daba1cc23563db23ddced725 = L.marker(
                [37.5223266, 126.9946441],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_96abcc44daba1cc23563db23ddced725.bindTooltip(
                `&lt;div&gt;
                     동빙고교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_47afa274c58624f2f6441a271bae6c5b = L.marker(
                [37.499388, 126.9096651],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_47afa274c58624f2f6441a271bae6c5b.bindTooltip(
                `&lt;div&gt;
                     신길6동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_242f29260d9ab707348f6f3faea30ade = L.marker(
                [37.6162441, 127.0949148],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_242f29260d9ab707348f6f3faea30ade.bindTooltip(
                `&lt;div&gt;
                     신내노인요양원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_002d789657cf8a7c900cd2bc5af6eeac = L.marker(
                [37.4913961, 126.8832763],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_002d789657cf8a7c900cd2bc5af6eeac.bindTooltip(
                `&lt;div&gt;
                     구로2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ceb1a541027e9d0cf8fa430152d7f84 = L.marker(
                [37.4903019, 126.9297162],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8ceb1a541027e9d0cf8fa430152d7f84.bindTooltip(
                `&lt;div&gt;
                     서울당곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7a9d089b4ae1a7198583b71fa805329e = L.marker(
                [37.5485578, 126.8287486],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7a9d089b4ae1a7198583b71fa805329e.bindTooltip(
                `&lt;div&gt;
                     덕원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_40d77c2e136aa5c819c7012501148673 = L.marker(
                [37.4896987, 126.8583711],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_40d77c2e136aa5c819c7012501148673.bindTooltip(
                `&lt;div&gt;
                     서울개봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5a8aaba7688b1b705973fd50728d187b = L.marker(
                [37.5146754, 126.9093581],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5a8aaba7688b1b705973fd50728d187b.bindTooltip(
                `&lt;div&gt;
                     영등포본동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7cb32a3d26269ce57dc10ab2bf6233ab = L.marker(
                [37.5151499, 126.9194671],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_7cb32a3d26269ce57dc10ab2bf6233ab.bindTooltip(
                `&lt;div&gt;
                     신길교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a06e0bc63c28106ae39c779e8bb2edba = L.marker(
                [37.6232225, 127.0462397],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a06e0bc63c28106ae39c779e8bb2edba.bindTooltip(
                `&lt;div&gt;
                     오현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_480465b3b72f15abb7ca7581851ef927 = L.marker(
                [37.6628528, 127.0681084],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_480465b3b72f15abb7ca7581851ef927.bindTooltip(
                `&lt;div&gt;
                     계상초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8bb4b00bea28648d01569823f1216aea = L.marker(
                [37.4828229, 126.8506416],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_8bb4b00bea28648d01569823f1216aea.bindTooltip(
                `&lt;div&gt;
                     서울개명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_edeabc3b4faa698c51a531315100f7ea = L.marker(
                [37.4936638, 126.8998145],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_edeabc3b4faa698c51a531315100f7ea.bindTooltip(
                `&lt;div&gt;
                     대동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_35b476b66a2d09bfd7b962de79b318a2 = L.marker(
                [37.5739006, 126.8078066],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_35b476b66a2d09bfd7b962de79b318a2.bindTooltip(
                `&lt;div&gt;
                     복종 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b7963362a5666f7150c187e06324ccb0 = L.marker(
                [37.4972518, 126.8859504],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b7963362a5666f7150c187e06324ccb0.bindTooltip(
                `&lt;div&gt;
                     구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c04261aa8076bceed922bcfcef62a222 = L.marker(
                [37.6279343, 127.0508453],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c04261aa8076bceed922bcfcef62a222.bindTooltip(
                `&lt;div&gt;
                     월계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_33d2b415172472dd26f4c4f9b4d4921c = L.marker(
                [37.6074943, 127.0755131],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_33d2b415172472dd26f4c4f9b4d4921c.bindTooltip(
                `&lt;div&gt;
                     신묵초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_780e5a304e19c541daa42973fb9af50c = L.marker(
                [37.5494364, 126.9057654],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_780e5a304e19c541daa42973fb9af50c.bindTooltip(
                `&lt;div&gt;
                     합정동주민센터 (강당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_55adfe4470340c6ce0280d1a51ce8859 = L.marker(
                [37.503779, 126.9406755],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_55adfe4470340c6ce0280d1a51ce8859.bindTooltip(
                `&lt;div&gt;
                     장승중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2200624c9b31456c2e480a4d4c990f1c = L.marker(
                [37.4810545, 126.8945545],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2200624c9b31456c2e480a4d4c990f1c.bindTooltip(
                `&lt;div&gt;
                     만민중앙선교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d9370d55e08c49abac654704ae9c7027 = L.marker(
                [37.5186508, 126.9015654],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d9370d55e08c49abac654704ae9c7027.bindTooltip(
                `&lt;div&gt;
                     영남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_57bd76e0185221c62460b9be97959b8a = L.marker(
                [37.5176665, 126.9346068],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_57bd76e0185221c62460b9be97959b8a.bindTooltip(
                `&lt;div&gt;
                     여의동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5a7c7b5cd3a1671846b25783aada1677 = L.marker(
                [37.6526156, 127.0401785],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5a7c7b5cd3a1671846b25783aada1677.bindTooltip(
                `&lt;div&gt;
                     서울창원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_168b44ad605fe0979d0ad73318ef467d = L.marker(
                [37.5608574, 126.9009887],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_168b44ad605fe0979d0ad73318ef467d.bindTooltip(
                `&lt;div&gt;
                     망원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dc08fa90b0f4fe07c4e10e886301242f = L.marker(
                [37.5031645, 126.9600263],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_dc08fa90b0f4fe07c4e10e886301242f.bindTooltip(
                `&lt;div&gt;
                     은로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb860382ef275a3a2a6cdedeb473f3db = L.marker(
                [37.463921, 127.0516668],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eb860382ef275a3a2a6cdedeb473f3db.bindTooltip(
                `&lt;div&gt;
                     서울 언남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e1f3aa32ac1269c14285d83622fdb19d = L.marker(
                [37.6042154, 127.0750198],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e1f3aa32ac1269c14285d83622fdb19d.bindTooltip(
                `&lt;div&gt;
                     한내들어린이집
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca1a9f582b3993be4c2c3b34b894ccd8 = L.marker(
                [37.5503821, 127.1038409],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ca1a9f582b3993be4c2c3b34b894ccd8.bindTooltip(
                `&lt;div&gt;
                     장로회신학대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4a21a1acb4c4079a4df7a473e9ace3e7 = L.marker(
                [37.6305229, 127.037686],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4a21a1acb4c4079a4df7a473e9ace3e7.bindTooltip(
                `&lt;div&gt;
                     웰빙스포츠센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d71a3719b2eb8c40cf54d8b08eded96d = L.marker(
                [37.6297145, 127.0687071],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d71a3719b2eb8c40cf54d8b08eded96d.bindTooltip(
                `&lt;div&gt;
                     용원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed49fe16a22c406683d354956bef4e32 = L.marker(
                [37.6640384, 127.0495224],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ed49fe16a22c406683d354956bef4e32.bindTooltip(
                `&lt;div&gt;
                     서울창도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e279f4e916f0bb8af7f6ef6051d8ee29 = L.marker(
                [37.5402148, 126.8768478],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e279f4e916f0bb8af7f6ef6051d8ee29.bindTooltip(
                `&lt;div&gt;
                     월촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cb9fca0117b8b7c8a1054906708b0600 = L.marker(
                [37.5043127, 126.896089],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_cb9fca0117b8b7c8a1054906708b0600.bindTooltip(
                `&lt;div&gt;
                     대림정보문화도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_958dfd30bf5cecd23ff9f763b9e2b596 = L.marker(
                [37.494139, 126.8259846],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_958dfd30bf5cecd23ff9f763b9e2b596.bindTooltip(
                `&lt;div&gt;
                     온수초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_44d1c749516a4e89ca4a4e6b76f1fc4a = L.marker(
                [37.6676601, 127.0596237],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_44d1c749516a4e89ca4a4e6b76f1fc4a.bindTooltip(
                `&lt;div&gt;
                     상원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f881ac5ca541cb906567e8a81705d3ab = L.marker(
                [37.5103943, 126.8436566],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_f881ac5ca541cb906567e8a81705d3ab.bindTooltip(
                `&lt;div&gt;
                     금옥중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_89714472c9fef4e318756343d167d125 = L.marker(
                [37.4869806, 127.0370764],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_89714472c9fef4e318756343d167d125.bindTooltip(
                `&lt;div&gt;
                     언주초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c05712facb62c4e62db3f3725aed72e9 = L.marker(
                [37.5007582, 126.8980828],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_c05712facb62c4e62db3f3725aed72e9.bindTooltip(
                `&lt;div&gt;
                     수정성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4b376788f3c86d148b6466db968386f3 = L.marker(
                [37.5407467, 126.9611083],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4b376788f3c86d148b6466db968386f3.bindTooltip(
                `&lt;div&gt;
                     금양초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_992c7aee8cbf1b080b1f1fd945185571 = L.marker(
                [37.6432767, 127.0413972],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_992c7aee8cbf1b080b1f1fd945185571.bindTooltip(
                `&lt;div&gt;
                     서울창림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_99ccd935a36bf3e0e3fad05ac2ce3bd8 = L.marker(
                [37.5062024, 126.953443],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_99ccd935a36bf3e0e3fad05ac2ce3bd8.bindTooltip(
                `&lt;div&gt;
                     강남초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa4a59c31959a4876c88ce4fa968fed2 = L.marker(
                [37.6209013, 127.0246532],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_aa4a59c31959a4876c88ce4fa968fed2.bindTooltip(
                `&lt;div&gt;
                     성암국제무역고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_25cc5f21497de2d77e6c1f7bcece5d2a = L.marker(
                [37.4824203, 126.9649102],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_25cc5f21497de2d77e6c1f7bcece5d2a.bindTooltip(
                `&lt;div&gt;
                     동작고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_046bbabe815523a27a64eaf37708eaa7 = L.marker(
                [37.493046, 126.8758056],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_046bbabe815523a27a64eaf37708eaa7.bindTooltip(
                `&lt;div&gt;
                     구로1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb8ef5da7f01d30a7883fb42f912d347 = L.marker(
                [37.4942305, 126.9984975],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_eb8ef5da7f01d30a7883fb42f912d347.bindTooltip(
                `&lt;div&gt;
                     방배중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_21bc985800b730a7e855c905c8fd229e = L.marker(
                [37.491599, 127.1228021],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_21bc985800b730a7e855c905c8fd229e.bindTooltip(
                `&lt;div&gt;
                     평화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2f331c76f524998ead4eb58b405ed847 = L.marker(
                [37.5978567, 126.9491956],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2f331c76f524998ead4eb58b405ed847.bindTooltip(
                `&lt;div&gt;
                     홍성교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3e714dcf58d90a72c85a79122adaa173 = L.marker(
                [37.5540565, 127.0694957],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3e714dcf58d90a72c85a79122adaa173.bindTooltip(
                `&lt;div&gt;
                     송원초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fa5026b371ab00138f55b54a25ca26cf = L.marker(
                [37.5845501, 127.0952576],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_fa5026b371ab00138f55b54a25ca26cf.bindTooltip(
                `&lt;div&gt;
                     중화중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b8d9271c3ca8361c9f39cc9fb8f1612c = L.marker(
                [37.5075802, 126.9288845],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b8d9271c3ca8361c9f39cc9fb8f1612c.bindTooltip(
                `&lt;div&gt;
                     숭의여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_683e4b13d8615ec324980e0d3e0ae562 = L.marker(
                [37.5228929, 126.9964304],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_683e4b13d8615ec324980e0d3e0ae562.bindTooltip(
                `&lt;div&gt;
                     동빙고할머니경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5acf0bf00c187118c619152fdce0ff7a = L.marker(
                [37.5554785, 126.962078],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_5acf0bf00c187118c619152fdce0ff7a.bindTooltip(
                `&lt;div&gt;
                     평강교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b5304bcf6a615ae12701566c0645096 = L.marker(
                [37.5837333, 127.034679],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6b5304bcf6a615ae12701566c0645096.bindTooltip(
                `&lt;div&gt;
                     제기동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6fc7b893897cc3244bea2f33de5c91c1 = L.marker(
                [37.5406167, 127.138015],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_6fc7b893897cc3244bea2f33de5c91c1.bindTooltip(
                `&lt;div&gt;
                     천동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b22461b690fa388afbdd9f58db182ab7 = L.marker(
                [37.5234889, 127.1367425],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b22461b690fa388afbdd9f58db182ab7.bindTooltip(
                `&lt;div&gt;
                     둔촌1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_08294f43b3e5ab7f8e1e06000baae2c9 = L.marker(
                [37.5172677, 127.037204],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_08294f43b3e5ab7f8e1e06000baae2c9.bindTooltip(
                `&lt;div&gt;
                     논현2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b50299e8412df8cd9a67ee57e11877cb = L.marker(
                [37.536319, 127.1331341],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b50299e8412df8cd9a67ee57e11877cb.bindTooltip(
                `&lt;div&gt;
                     현강여자정보고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1531e2b6681ea3cd5ca7e7887f901c9e = L.marker(
                [37.5346363, 127.1179289],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1531e2b6681ea3cd5ca7e7887f901c9e.bindTooltip(
                `&lt;div&gt;
                     풍납초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d58cb07c68f88e2454cee4b359477fd4 = L.marker(
                [37.5011807, 127.0490386],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_d58cb07c68f88e2454cee4b359477fd4.bindTooltip(
                `&lt;div&gt;
                     도성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4cd320e44cb08def053ffe8853eee2c8 = L.marker(
                [37.6170846, 127.0313824],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4cd320e44cb08def053ffe8853eee2c8.bindTooltip(
                `&lt;div&gt;
                     송중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1007802d02fcfeef889e6255af41e1b8 = L.marker(
                [37.5862863, 127.0472981],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1007802d02fcfeef889e6255af41e1b8.bindTooltip(
                `&lt;div&gt;
                     청량리동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3bf737b135db23f8313afa59aed48121 = L.marker(
                [37.5432392, 126.8414093],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_3bf737b135db23f8313afa59aed48121.bindTooltip(
                `&lt;div&gt;
                     봉바위 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b2bc6d73c5fe928fd6454d28b0940d95 = L.marker(
                [37.5159112, 126.8558493],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b2bc6d73c5fe928fd6454d28b0940d95.bindTooltip(
                `&lt;div&gt;
                     신서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_af8fd6e0196d7c6402cbd1f51f78b77b = L.marker(
                [37.5541789, 126.8401206],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_af8fd6e0196d7c6402cbd1f51f78b77b.bindTooltip(
                `&lt;div&gt;
                     내발산 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_88f6264fd08b249a74e7f01ef6e73ffc = L.marker(
                [37.5707334, 126.9064934],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_88f6264fd08b249a74e7f01ef6e73ffc.bindTooltip(
                `&lt;div&gt;
                     낙루경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_78d66839193430330a077b93fc30e38e = L.marker(
                [37.5380327, 126.8385413],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_78d66839193430330a077b93fc30e38e.bindTooltip(
                `&lt;div&gt;
                     공원 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b2a63b164ea3ded3109a161ea5b73361 = L.marker(
                [37.5443365, 126.9554285],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b2a63b164ea3ded3109a161ea5b73361.bindTooltip(
                `&lt;div&gt;
                     신덕교회 대예배실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a17d2ffd2a0db1cef056fc5bcc5f7162 = L.marker(
                [37.5143539, 127.062504],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_a17d2ffd2a0db1cef056fc5bcc5f7162.bindTooltip(
                `&lt;div&gt;
                     삼성1문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_284d2aa73a65b9b15c944e17862eaf50 = L.marker(
                [37.5482075, 127.0383673],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_284d2aa73a65b9b15c944e17862eaf50.bindTooltip(
                `&lt;div&gt;
                     성수중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_018de0f57281f642c9a94edee18e9bba = L.marker(
                [37.5393082, 126.8971258],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_018de0f57281f642c9a94edee18e9bba.bindTooltip(
                `&lt;div&gt;
                     한강미디어고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2acdad90266ebffec27fb78818acfef3 = L.marker(
                [37.6124074, 127.0499837],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_2acdad90266ebffec27fb78818acfef3.bindTooltip(
                `&lt;div&gt;
                     장위초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ce03a092329b32e0539f9877570ea07 = L.marker(
                [37.5260467, 127.1329027],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_4ce03a092329b32e0539f9877570ea07.bindTooltip(
                `&lt;div&gt;
                     성내3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e948c313d5d90a73ac61f04f18ffdba2 = L.marker(
                [37.4806388, 126.9431002],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_e948c313d5d90a73ac61f04f18ffdba2.bindTooltip(
                `&lt;div&gt;
                     관악초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_77a16554873c12a39ce2879be93c2f00 = L.marker(
                [37.5866443, 127.0123266],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_77a16554873c12a39ce2879be93c2f00.bindTooltip(
                `&lt;div&gt;
                     삼선초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1c19da33105da92bf87a5946409deee2 = L.marker(
                [37.5439366, 127.1256067],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1c19da33105da92bf87a5946409deee2.bindTooltip(
                `&lt;div&gt;
                     해공도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_abe1e994d8e1873ae2852d81f80e4d6e = L.marker(
                [37.6507925, 127.0731328],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_abe1e994d8e1873ae2852d81f80e4d6e.bindTooltip(
                `&lt;div&gt;
                     을지초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ae7969a309cb43c6bd3a8b87e40ae020 = L.marker(
                [37.5501512, 127.0875822],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ae7969a309cb43c6bd3a8b87e40ae020.bindTooltip(
                `&lt;div&gt;
                     선화예술학교(중학교)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_41c3be18bada1e0f1479515204f7148a = L.marker(
                [37.5937638, 126.9497106],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_41c3be18bada1e0f1479515204f7148a.bindTooltip(
                `&lt;div&gt;
                     홍제3동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_80680e2764cf35abaf430a1ca4e79ef7 = L.marker(
                [37.6043596, 127.0959559],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_80680e2764cf35abaf430a1ca4e79ef7.bindTooltip(
                `&lt;div&gt;
                     원광종합복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b1c04469aff56f14a831c457338a2c4c = L.marker(
                [37.6179826, 127.0862899],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_b1c04469aff56f14a831c457338a2c4c.bindTooltip(
                `&lt;div&gt;
                     원묵초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1e8258935876f767e9a3cb65dcfb278f = L.marker(
                [37.6438528, 127.0628056],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_1e8258935876f767e9a3cb65dcfb278f.bindTooltip(
                `&lt;div&gt;
                     중원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca9e41a6d75c11717992c655568ea85c = L.marker(
                [37.5549978, 127.140775],
                {}
            ).addTo(marker_cluster_86a6bd0f65fdb49508e31325e7c8b27a);
        
    
            marker_ca9e41a6d75c11717992c655568ea85c.bindTooltip(
                `&lt;div&gt;
                     암사3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
&lt;/script&gt;" style="position:absolute;width:100%;height:100%;left:0;top:0;border:none !important;" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe></div></div>


## Result



```python
# Add Minimap
from folium.plugins import MiniMap
```


```python
m = folium.Map(location = [37.5536067, 126.9674308],
              zoom_start = 12)

marker_cluster = MarkerCluster().add_to(m)
minimap = MiniMap()
minimap.add_to(m)
# Shelter's location
for i in range(len(raw)):
    lat = raw.loc[i, '위도']
    long = raw.loc[i, '경도']
    name = raw.loc[i, '대피소명칭']
    folium.Marker([lat, long], tooltip = name).add_to(marker_cluster)
m
```

<div style="width:100%;"><div style="position:relative;width:100%;height:0;padding-bottom:60%;"><span style="color:#565656">Make this Notebook Trusted to load map: File -> Trust Notebook</span><iframe srcdoc="&lt;!DOCTYPE html&gt;
&lt;head&gt;    
    &lt;meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=UTF-8&quot; /&gt;
    
        &lt;script&gt;
            L_NO_TOUCH = false;
            L_DISABLE_3D = false;
        &lt;/script&gt;
    
    &lt;style&gt;html, body {width: 100%;height: 100%;margin: 0;padding: 0;}&lt;/style&gt;
    &lt;style&gt;#map {position:absolute;top:0;bottom:0;right:0;left:0;}&lt;/style&gt;
    &lt;script src=&quot;https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://code.jquery.com/jquery-1.12.4.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js&quot;&gt;&lt;/script&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.jsdelivr.net/gh/python-visualization/folium/folium/templates/leaflet.awesome.rotate.min.css&quot;/&gt;
    
            &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,
                initial-scale=1.0, maximum-scale=1.0, user-scalable=no&quot; /&gt;
            &lt;style&gt;
                #map_e24f4ee170d91ed10d8ce55ed21ad5f6 {
                    position: relative;
                    width: 100.0%;
                    height: 100.0%;
                    left: 0.0%;
                    top: 0.0%;
                }
            &lt;/style&gt;
        
    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.1.0/leaflet.markercluster.js&quot;&gt;&lt;/script&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.1.0/MarkerCluster.css&quot;/&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.1.0/MarkerCluster.Default.css&quot;/&gt;
    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet-minimap/3.6.1/Control.MiniMap.js&quot;&gt;&lt;/script&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdnjs.cloudflare.com/ajax/libs/leaflet-minimap/3.6.1/Control.MiniMap.css&quot;/&gt;
&lt;/head&gt;
&lt;body&gt;    
    
            &lt;div class=&quot;folium-map&quot; id=&quot;map_e24f4ee170d91ed10d8ce55ed21ad5f6&quot; &gt;&lt;/div&gt;
        
&lt;/body&gt;
&lt;script&gt;    
    
            var map_e24f4ee170d91ed10d8ce55ed21ad5f6 = L.map(
                &quot;map_e24f4ee170d91ed10d8ce55ed21ad5f6&quot;,
                {
                    center: [37.5536067, 126.9674308],
                    crs: L.CRS.EPSG3857,
                    zoom: 12,
                    zoomControl: true,
                    preferCanvas: false,
                }
            );

            

        
    
            var tile_layer_92ae3662687957b796ead955209c60af = L.tileLayer(
                &quot;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&quot;,
                {&quot;attribution&quot;: &quot;Data by \u0026copy; \u003ca href=\&quot;http://openstreetmap.org\&quot;\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\&quot;http://www.openstreetmap.org/copyright\&quot;\u003eODbL\u003c/a\u003e.&quot;, &quot;detectRetina&quot;: false, &quot;maxNativeZoom&quot;: 18, &quot;maxZoom&quot;: 18, &quot;minZoom&quot;: 0, &quot;noWrap&quot;: false, &quot;opacity&quot;: 1, &quot;subdomains&quot;: &quot;abc&quot;, &quot;tms&quot;: false}
            ).addTo(map_e24f4ee170d91ed10d8ce55ed21ad5f6);
        
    
            var marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56 = L.markerClusterGroup(
                {}
            );
            map_e24f4ee170d91ed10d8ce55ed21ad5f6.addLayer(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            var marker_d02671165e2025aa8ebf2a67157c5e66 = L.marker(
                [37.5891283, 126.9998906],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d02671165e2025aa8ebf2a67157c5e66.bindTooltip(
                `&lt;div&gt;
                     혜화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e1e16700e57951db4cbc2bca7419fc8e = L.marker(
                [37.5836603, 126.9504844],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e1e16700e57951db4cbc2bca7419fc8e.bindTooltip(
                `&lt;div&gt;
                     새샘교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a31c79a6299079508f524843707332da = L.marker(
                [37.5493434, 126.9100281],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a31c79a6299079508f524843707332da.bindTooltip(
                `&lt;div&gt;
                     한강중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2ad800846a4c43f19be84dad2093875a = L.marker(
                [37.5534953, 126.9106658],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2ad800846a4c43f19be84dad2093875a.bindTooltip(
                `&lt;div&gt;
                     서울성산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fed5697d26d65a23671ae2eb8ebb9c4c = L.marker(
                [37.5003954, 126.9482686],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fed5697d26d65a23671ae2eb8ebb9c4c.bindTooltip(
                `&lt;div&gt;
                     상도1동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_18b20e87d5bf4f93e85dd30e3aba21fd = L.marker(
                [37.4997347, 126.9374323],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_18b20e87d5bf4f93e85dd30e3aba21fd.bindTooltip(
                `&lt;div&gt;
                     상도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd96baecc234915e131448d5c035b676 = L.marker(
                [37.5100544, 126.9536402],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bd96baecc234915e131448d5c035b676.bindTooltip(
                `&lt;div&gt;
                     본동초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_028d34181b21e5f13d0a610a13aba945 = L.marker(
                [37.5365343, 126.9650202],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_028d34181b21e5f13d0a610a13aba945.bindTooltip(
                `&lt;div&gt;
                     남정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4e72b6738fdc44c3b7168f38d5eed879 = L.marker(
                [37.5884354, 126.9217785],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4e72b6738fdc44c3b7168f38d5eed879.bindTooltip(
                `&lt;div&gt;
                     응암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_475c93250626d0c332985ded17c5ed6e = L.marker(
                [37.5030252, 126.9625144],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_475c93250626d0c332985ded17c5ed6e.bindTooltip(
                `&lt;div&gt;
                     제일감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0fdf57c3998bfe73ce140a1c962a3488 = L.marker(
                [37.4866976, 126.9576162],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0fdf57c3998bfe73ce140a1c962a3488.bindTooltip(
                `&lt;div&gt;
                     봉천종합사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b1664d1ffb67df4d5120f6f9537e892e = L.marker(
                [37.5232077, 126.9368097],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b1664d1ffb67df4d5120f6f9537e892e.bindTooltip(
                `&lt;div&gt;
                     여의도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_25a5dad89d1c81feea408f7cd716a93f = L.marker(
                [37.4830902, 126.9787764],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_25a5dad89d1c81feea408f7cd716a93f.bindTooltip(
                `&lt;div&gt;
                     사당1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4cf64a8439c6f1791c950f2d475135a1 = L.marker(
                [37.5283727, 126.9537102],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4cf64a8439c6f1791c950f2d475135a1.bindTooltip(
                `&lt;div&gt;
                     서부성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d9b8dacb47ad2f399cdb798b07a1465a = L.marker(
                [37.4811316, 126.9901108],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d9b8dacb47ad2f399cdb798b07a1465a.bindTooltip(
                `&lt;div&gt;
                     서울 이수 중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0e0c83a4967c8105ba68aeecd39f2e72 = L.marker(
                [37.5459029, 126.9535807],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0e0c83a4967c8105ba68aeecd39f2e72.bindTooltip(
                `&lt;div&gt;
                     서울공덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a488dd67cb577d62c74abe030f646cbc = L.marker(
                [37.4937422, 126.9440685],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a488dd67cb577d62c74abe030f646cbc.bindTooltip(
                `&lt;div&gt;
                     국사봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e89e6cc68d55f2dd62e0a530067c5c44 = L.marker(
                [37.4910611, 126.9553258],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e89e6cc68d55f2dd62e0a530067c5c44.bindTooltip(
                `&lt;div&gt;
                     봉현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_72be6adb7217abed81ba6d61e78a1147 = L.marker(
                [37.5911343, 127.0021399],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_72be6adb7217abed81ba6d61e78a1147.bindTooltip(
                `&lt;div&gt;
                     천주교 외방선교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f5a06d46c0ca6bbb970f785bed25e28c = L.marker(
                [37.5484412, 127.0628283],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f5a06d46c0ca6bbb970f785bed25e28c.bindTooltip(
                `&lt;div&gt;
                     성동세무서
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2c06c01cb8606311caacfa26c34d85d0 = L.marker(
                [37.5147612, 127.1130378],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2c06c01cb8606311caacfa26c34d85d0.bindTooltip(
                `&lt;div&gt;
                     방이중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f205289d5771edb7a4d6eafdb8ec4168 = L.marker(
                [37.4998298, 127.1079155],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f205289d5771edb7a4d6eafdb8ec4168.bindTooltip(
                `&lt;div&gt;
                     가락초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f8ab8ff2a3ff4bcbedabe60c48920d0c = L.marker(
                [37.5444065, 127.0629919],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f8ab8ff2a3ff4bcbedabe60c48920d0c.bindTooltip(
                `&lt;div&gt;
                     성수초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0f0cfa8d6b763982a572400ddf333328 = L.marker(
                [37.5159073, 127.0878144],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0f0cfa8d6b763982a572400ddf333328.bindTooltip(
                `&lt;div&gt;
                     잠신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a33df4ce62c565515b87dd7eb9c4ab07 = L.marker(
                [37.484888, 127.0934544],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a33df4ce62c565515b87dd7eb9c4ab07.bindTooltip(
                `&lt;div&gt;
                     태화기독교종합 사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_83d9c3f85009df3df51fe7eed1c5274e = L.marker(
                [37.5172332, 127.099344],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_83d9c3f85009df3df51fe7eed1c5274e.bindTooltip(
                `&lt;div&gt;
                     잠실중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8e4515eb907254a17528bdd5ff985778 = L.marker(
                [37.6198317, 127.0055226],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8e4515eb907254a17528bdd5ff985778.bindTooltip(
                `&lt;div&gt;
                     정릉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_360c8b03f14a1598b648ba29413816e7 = L.marker(
                [37.5303512, 127.0853523],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_360c8b03f14a1598b648ba29413816e7.bindTooltip(
                `&lt;div&gt;
                     광양중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_328b71e8dd954fbf31dfc5206cf9de20 = L.marker(
                [37.5778498, 127.0244276],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_328b71e8dd954fbf31dfc5206cf9de20.bindTooltip(
                `&lt;div&gt;
                     대광고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb65ea84b3ce198b17705a07d0bd0426 = L.marker(
                [37.6403265, 127.0229092],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bb65ea84b3ce198b17705a07d0bd0426.bindTooltip(
                `&lt;div&gt;
                     성실교회교육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0f5b72bc4003a41a7d6672dda4ffca6e = L.marker(
                [37.4891812, 127.1112013],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0f5b72bc4003a41a7d6672dda4ffca6e.bindTooltip(
                `&lt;div&gt;
                     가원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ac791eab3406816fd02b652a32ea9e3b = L.marker(
                [37.6708916, 127.0457558],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ac791eab3406816fd02b652a32ea9e3b.bindTooltip(
                `&lt;div&gt;
                     도봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1f76fe6055b1f18e26c438e3eb2c8ace = L.marker(
                [37.6564809, 127.0284014],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1f76fe6055b1f18e26c438e3eb2c8ace.bindTooltip(
                `&lt;div&gt;
                     쌍문4동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_adc974e6117175f90a77fbcc3540f365 = L.marker(
                [37.4797843, 126.9856123],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_adc974e6117175f90a77fbcc3540f365.bindTooltip(
                `&lt;div&gt;
                     방배2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7a1391ef56f6796b71efbbde7d9a1c32 = L.marker(
                [37.497947, 127.1394478],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7a1391ef56f6796b71efbbde7d9a1c32.bindTooltip(
                `&lt;div&gt;
                     보인고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_63b7e0b64cbd42af21d6513ecfad9574 = L.marker(
                [37.4868368, 127.0704134],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_63b7e0b64cbd42af21d6513ecfad9574.bindTooltip(
                `&lt;div&gt;
                     개포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_87e720cef22a1c224e9c8b39972b00b3 = L.marker(
                [37.4955053, 127.1526489],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_87e720cef22a1c224e9c8b39972b00b3.bindTooltip(
                `&lt;div&gt;
                     마천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_228ba728fd21f0c64dc3fe471573f871 = L.marker(
                [37.6621603, 127.0278544],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_228ba728fd21f0c64dc3fe471573f871.bindTooltip(
                `&lt;div&gt;
                     학마을다사랑센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6f80fe83eddcc9244dcc98ad9497b769 = L.marker(
                [37.5197002, 127.134857],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6f80fe83eddcc9244dcc98ad9497b769.bindTooltip(
                `&lt;div&gt;
                     보성중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8e3ec2868a962264c1e69882222159ed = L.marker(
                [37.538511, 127.1448722],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8e3ec2868a962264c1e69882222159ed.bindTooltip(
                `&lt;div&gt;
                     길동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f59e8d3f9ca2d4e114f116c8fd8759a7 = L.marker(
                [37.587503, 127.0224721],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f59e8d3f9ca2d4e114f116c8fd8759a7.bindTooltip(
                `&lt;div&gt;
                     안암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a8e5162b063e2588513235b040cc2d7a = L.marker(
                [37.6140774, 127.0436751],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a8e5162b063e2588513235b040cc2d7a.bindTooltip(
                `&lt;div&gt;
                     장위1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_93b80f38a60656acb3edb43f96c15aa8 = L.marker(
                [37.6488034, 127.046758],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_93b80f38a60656acb3edb43f96c15aa8.bindTooltip(
                `&lt;div&gt;
                     창일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_85e3531b3cd0867d597a7d5902afba8a = L.marker(
                [37.4991267, 127.1001476],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_85e3531b3cd0867d597a7d5902afba8a.bindTooltip(
                `&lt;div&gt;
                     남현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_58f68d37b12919b9652a766237ebb707 = L.marker(
                [37.5023094, 127.1130719],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_58f68d37b12919b9652a766237ebb707.bindTooltip(
                `&lt;div&gt;
                     잠실여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7a488474d56ad9b1cf95607479f004c0 = L.marker(
                [37.5544231, 127.1420279],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7a488474d56ad9b1cf95607479f004c0.bindTooltip(
                `&lt;div&gt;
                     명일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_22620b6dd37b57d4dd9819752da9bfe2 = L.marker(
                [37.4885099, 126.8500846],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_22620b6dd37b57d4dd9819752da9bfe2.bindTooltip(
                `&lt;div&gt;
                     개웅초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a631a7216c1890c057e4024eecc0a759 = L.marker(
                [37.515637, 126.8894872],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a631a7216c1890c057e4024eecc0a759.bindTooltip(
                `&lt;div&gt;
                     성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_112cd6cc4887f984316ed4fb2156f3e2 = L.marker(
                [37.6205029, 127.0688592],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_112cd6cc4887f984316ed4fb2156f3e2.bindTooltip(
                `&lt;div&gt;
                     한천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e04d3b8c622df7db80dbbc793be33a25 = L.marker(
                [37.4853903, 126.8838479],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e04d3b8c622df7db80dbbc793be33a25.bindTooltip(
                `&lt;div&gt;
                     영일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6e183801064c10f29235fbac1536dc4f = L.marker(
                [37.5321157, 126.8477954],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6e183801064c10f29235fbac1536dc4f.bindTooltip(
                `&lt;div&gt;
                     화곡 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bee8175773256d5669551ade6ed706d0 = L.marker(
                [37.4983265, 126.9134649],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bee8175773256d5669551ade6ed706d0.bindTooltip(
                `&lt;div&gt;
                     대길초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a5e8e90c5f24f6eb4d181046ef931be1 = L.marker(
                [37.6323901, 127.0660794],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a5e8e90c5f24f6eb4d181046ef931be1.bindTooltip(
                `&lt;div&gt;
                     중현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8b91f8f6dfddaedb7f464b6824c81cef = L.marker(
                [37.5162167, 126.8440456],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8b91f8f6dfddaedb7f464b6824c81cef.bindTooltip(
                `&lt;div&gt;
                     신남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_77e09acf4cf2c2efdd16775f7720c4ce = L.marker(
                [37.5605231, 127.1643758],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_77e09acf4cf2c2efdd16775f7720c4ce.bindTooltip(
                `&lt;div&gt;
                     고덕2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_44347ed112bc9b9c9b9486da5d76ed13 = L.marker(
                [37.5154717, 126.9140858],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_44347ed112bc9b9c9b9486da5d76ed13.bindTooltip(
                `&lt;div&gt;
                     영원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6eeed4368627795345a197a105d06ebd = L.marker(
                [37.5745659, 126.8185847],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6eeed4368627795345a197a105d06ebd.bindTooltip(
                `&lt;div&gt;
                     우정 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5f2dbb0fecce0db18b736ebf2bda3f12 = L.marker(
                [37.493891, 126.8314824],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5f2dbb0fecce0db18b736ebf2bda3f12.bindTooltip(
                `&lt;div&gt;
                     수궁동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9ed24f61b252692f74a6221504de0f35 = L.marker(
                [37.495209, 126.8352071],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9ed24f61b252692f74a6221504de0f35.bindTooltip(
                `&lt;div&gt;
                     연세중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e9813e727f8d463045f603dfb59d1429 = L.marker(
                [37.5015627, 126.9090253],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e9813e727f8d463045f603dfb59d1429.bindTooltip(
                `&lt;div&gt;
                     천주교살레시오회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_126b2b3842f4c35c9741794a435055fc = L.marker(
                [37.554995, 126.87129],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_126b2b3842f4c35c9741794a435055fc.bindTooltip(
                `&lt;div&gt;
                     염경초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e12f06b5723451f49d97fa00bd823cb1 = L.marker(
                [37.5031007, 126.9308448],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e12f06b5723451f49d97fa00bd823cb1.bindTooltip(
                `&lt;div&gt;
                     강현중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3fee5d530b78e492c6f88b044bff13cd = L.marker(
                [37.6577443, 127.0732997],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3fee5d530b78e492c6f88b044bff13cd.bindTooltip(
                `&lt;div&gt;
                     중계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3a0058b27964644bfb09187d2d2596c4 = L.marker(
                [37.4881908, 126.8820542],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3a0058b27964644bfb09187d2d2596c4.bindTooltip(
                `&lt;div&gt;
                     서울남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3be03538d42ee032c7d3e7f37edfa065 = L.marker(
                [37.5840138, 126.9868971],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3be03538d42ee032c7d3e7f37edfa065.bindTooltip(
                `&lt;div&gt;
                     중앙고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_365d060816de1610e1b39ca54dfe9129 = L.marker(
                [37.505164, 127.1408978],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_365d060816de1610e1b39ca54dfe9129.bindTooltip(
                `&lt;div&gt;
                     거여초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_45575054b758fd6b98f4eb2dff549c07 = L.marker(
                [37.5050993, 126.8490857],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_45575054b758fd6b98f4eb2dff549c07.bindTooltip(
                `&lt;div&gt;
                     세곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6554e472948916b785fd7bfd47003f0c = L.marker(
                [37.5798578, 126.8153271],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6554e472948916b785fd7bfd47003f0c.bindTooltip(
                `&lt;div&gt;
                     치현 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c4f1802be47eff6ff4f26ed292b1d3b0 = L.marker(
                [37.4893503, 126.894405],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c4f1802be47eff6ff4f26ed292b1d3b0.bindTooltip(
                `&lt;div&gt;
                     영서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_751b99c7e44aad79cb7d72188ffdd820 = L.marker(
                [37.5688553, 127.035735],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_751b99c7e44aad79cb7d72188ffdd820.bindTooltip(
                `&lt;div&gt;
                     동명초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9f1db8eb5693c95e20e92b033a3ac322 = L.marker(
                [37.4940691, 126.9098472],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9f1db8eb5693c95e20e92b033a3ac322.bindTooltip(
                `&lt;div&gt;
                     대림감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f6b6c7259d79961ed4b6f12d621ca8ca = L.marker(
                [37.5100825, 126.9179782],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f6b6c7259d79961ed4b6f12d621ca8ca.bindTooltip(
                `&lt;div&gt;
                     영신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1112a99742ca62331107a727fb243489 = L.marker(
                [37.5006962, 126.8958089],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1112a99742ca62331107a727fb243489.bindTooltip(
                `&lt;div&gt;
                     신영초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_85fe7d029fd87a30f891cd81861836c2 = L.marker(
                [37.5373363, 126.870293],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_85fe7d029fd87a30f891cd81861836c2.bindTooltip(
                `&lt;div&gt;
                     정목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_69a593662044c48cb8bfb926970ea2e6 = L.marker(
                [37.534974, 126.9532015],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_69a593662044c48cb8bfb926970ea2e6.bindTooltip(
                `&lt;div&gt;
                     성심여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7649ac1a79dc7b1752faf501c194d47f = L.marker(
                [37.5515947, 126.9451277],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7649ac1a79dc7b1752faf501c194d47f.bindTooltip(
                `&lt;div&gt;
                     숭문중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9039502f1801abcc7b1a470a0b55bfa2 = L.marker(
                [37.5003529, 126.9440991],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9039502f1801abcc7b1a470a0b55bfa2.bindTooltip(
                `&lt;div&gt;
                     신상도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_861badae82bb9f7273b620ece5f0e265 = L.marker(
                [37.538875, 126.9577723],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_861badae82bb9f7273b620ece5f0e265.bindTooltip(
                `&lt;div&gt;
                     도원동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9b93ab37846c85bd9d7eb7829ad045b3 = L.marker(
                [37.5084712, 126.9656204],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9b93ab37846c85bd9d7eb7829ad045b3.bindTooltip(
                `&lt;div&gt;
                     흑석초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3667323c18b0a8720f229cbe9002eb96 = L.marker(
                [37.4853098, 126.9424573],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3667323c18b0a8720f229cbe9002eb96.bindTooltip(
                `&lt;div&gt;
                     은천동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c953036f9baf37f49ba6e5381fdd1755 = L.marker(
                [37.552715, 127.0199849],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c953036f9baf37f49ba6e5381fdd1755.bindTooltip(
                `&lt;div&gt;
                     금호초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed931e812e10803845f3f0a7a7181b4f = L.marker(
                [37.548769, 126.9436862],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ed931e812e10803845f3f0a7a7181b4f.bindTooltip(
                `&lt;div&gt;
                     용강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d81f394df7c7c83a6fb6fb9e72d8561f = L.marker(
                [37.5811339, 126.9714765],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d81f394df7c7c83a6fb6fb9e72d8561f.bindTooltip(
                `&lt;div&gt;
                     자교교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cff993380c6eae6e4c2d813e1d502fea = L.marker(
                [37.574225, 126.9646777],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_cff993380c6eae6e4c2d813e1d502fea.bindTooltip(
                `&lt;div&gt;
                     종로문화체육센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1a395ca6b8eabbcb3cb5c3623c1eb096 = L.marker(
                [37.5762443, 127.0144101],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1a395ca6b8eabbcb3cb5c3623c1eb096.bindTooltip(
                `&lt;div&gt;
                     창신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_731f1d8a6968d93b0908876e168ff9f8 = L.marker(
                [37.5362084, 126.9881882],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_731f1d8a6968d93b0908876e168ff9f8.bindTooltip(
                `&lt;div&gt;
                     이태원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8718a29dcd6cb0001d449c89332c729c = L.marker(
                [37.5777101, 126.9076339],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8718a29dcd6cb0001d449c89332c729c.bindTooltip(
                `&lt;div&gt;
                     북가좌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a1ebc76f429b305cd37e756f20558924 = L.marker(
                [37.6030314, 127.0142433],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a1ebc76f429b305cd37e756f20558924.bindTooltip(
                `&lt;div&gt;
                     정릉교회(교육관)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46299f15276c71059197ea213be1a14d = L.marker(
                [37.587081, 126.9716546],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_46299f15276c71059197ea213be1a14d.bindTooltip(
                `&lt;div&gt;
                     경복고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a008704debe1ee4fe8a9de0589a3ef34 = L.marker(
                [37.605569, 126.968525],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a008704debe1ee4fe8a9de0589a3ef34.bindTooltip(
                `&lt;div&gt;
                     서울예술고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_45e963ce9aa3bee04a3c8882dd8f9487 = L.marker(
                [37.5527927, 126.9160894],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_45e963ce9aa3bee04a3c8882dd8f9487.bindTooltip(
                `&lt;div&gt;
                     서현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_17e2ebb973d30eb02f274ff8b4eb4a89 = L.marker(
                [37.5238286, 126.9039522],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_17e2ebb973d30eb02f274ff8b4eb4a89.bindTooltip(
                `&lt;div&gt;
                     영중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e59cd059d48d155739b937f9fe8aba95 = L.marker(
                [37.5332365, 126.8929147],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e59cd059d48d155739b937f9fe8aba95.bindTooltip(
                `&lt;div&gt;
                     선유정보문화도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5fa7c08a708d25447a3abf413c778a38 = L.marker(
                [37.5766667, 127.0060369],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5fa7c08a708d25447a3abf413c778a38.bindTooltip(
                `&lt;div&gt;
                     종로노인종합복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_855c0fd86d99748b2d2b99d515873f08 = L.marker(
                [37.5814717, 127.0341328],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_855c0fd86d99748b2d2b99d515873f08.bindTooltip(
                `&lt;div&gt;
                     성일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8389ca8e2e7cfb24df7e409287a75f16 = L.marker(
                [37.541192, 127.0816776],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8389ca8e2e7cfb24df7e409287a75f16.bindTooltip(
                `&lt;div&gt;
                     건국대학교부속중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f14cad8d5865011bf7047ac968cb8284 = L.marker(
                [37.5784972, 127.0576385],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f14cad8d5865011bf7047ac968cb8284.bindTooltip(
                `&lt;div&gt;
                     전농2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7d99a7d1c0d36aea1dfd4000a8caa3e2 = L.marker(
                [37.588003, 127.0510851],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7d99a7d1c0d36aea1dfd4000a8caa3e2.bindTooltip(
                `&lt;div&gt;
                     청량중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5c58c0c9fc771c66cf57fdbfe7c27050 = L.marker(
                [37.4955666, 127.0564098],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5c58c0c9fc771c66cf57fdbfe7c27050.bindTooltip(
                `&lt;div&gt;
                     단대부고체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a8521ea003b4c8440fbd17060ea29f6d = L.marker(
                [37.491659, 127.14209],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a8521ea003b4c8440fbd17060ea29f6d.bindTooltip(
                `&lt;div&gt;
                     송파공업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa73107df5f87ef737313229b6beb716 = L.marker(
                [37.5450331, 127.1368227],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_aa73107df5f87ef737313229b6beb716.bindTooltip(
                `&lt;div&gt;
                     천호1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a181076c6926898163624d4436934d34 = L.marker(
                [37.5233225, 127.0238994],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a181076c6926898163624d4436934d34.bindTooltip(
                `&lt;div&gt;
                     신구초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3ef6233336acc67f51ea642b3abb1faf = L.marker(
                [37.5671689, 126.908768],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3ef6233336acc67f51ea642b3abb1faf.bindTooltip(
                `&lt;div&gt;
                     샛터경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5795264b39b4dda41c5853baadf2e6b7 = L.marker(
                [37.592814, 127.0967718],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5795264b39b4dda41c5853baadf2e6b7.bindTooltip(
                `&lt;div&gt;
                     혜원여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_17e505caba0c1988e7fb15b16b178902 = L.marker(
                [37.6046427, 127.0140313],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_17e505caba0c1988e7fb15b16b178902.bindTooltip(
                `&lt;div&gt;
                     숭덕초등학교(교사동)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_be3ef339243943864f9bfdfe3c43dfec = L.marker(
                [37.5473127, 126.9768736],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_be3ef339243943864f9bfdfe3c43dfec.bindTooltip(
                `&lt;div&gt;
                     삼광초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_60e19dc7564e36610fb09412c9459c49 = L.marker(
                [37.5333499, 127.1419656],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_60e19dc7564e36610fb09412c9459c49.bindTooltip(
                `&lt;div&gt;
                     둔촌2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f9c677d4c9f7df37a803c458ac95c088 = L.marker(
                [37.5978229, 127.065512],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f9c677d4c9f7df37a803c458ac95c088.bindTooltip(
                `&lt;div&gt;
                     이문1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ba500739aeb6b94e08816e18f8514d6d = L.marker(
                [37.5112094, 127.0459862],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ba500739aeb6b94e08816e18f8514d6d.bindTooltip(
                `&lt;div&gt;
                     삼성2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_012b022a7d0f8b9bbdf6b23e72c04479 = L.marker(
                [37.5044359, 127.0755624],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_012b022a7d0f8b9bbdf6b23e72c04479.bindTooltip(
                `&lt;div&gt;
                     아주중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e31dee7050c00c7663e9d5140375d6e4 = L.marker(
                [37.5732279, 127.0859972],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e31dee7050c00c7663e9d5140375d6e4.bindTooltip(
                `&lt;div&gt;
                     중랑청소년수련관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cb495bfbfc2f87370f6970862e3d5ab2 = L.marker(
                [37.5658372, 127.0892944],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_cb495bfbfc2f87370f6970862e3d5ab2.bindTooltip(
                `&lt;div&gt;
                     용곡중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a18174e6343bb0d4047157b6b054278f = L.marker(
                [37.5770708, 127.0882851],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a18174e6343bb0d4047157b6b054278f.bindTooltip(
                `&lt;div&gt;
                     면남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_73a8fdbcca258937651cc6b2f7d37a6b = L.marker(
                [37.6324049, 127.0360585],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_73a8fdbcca258937651cc6b2f7d37a6b.bindTooltip(
                `&lt;div&gt;
                     번동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e056cc8a008d2b0d497cd7b22ec40fa0 = L.marker(
                [37.5010971, 127.1502793],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e056cc8a008d2b0d497cd7b22ec40fa0.bindTooltip(
                `&lt;div&gt;
                     남천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f0b9852b52783bc40fcc99c8e9df959a = L.marker(
                [37.571937, 127.0511789],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f0b9852b52783bc40fcc99c8e9df959a.bindTooltip(
                `&lt;div&gt;
                     답십리1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b05738b490165a42ef0687d1d02f4b27 = L.marker(
                [37.6100265, 127.046097],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b05738b490165a42ef0687d1d02f4b27.bindTooltip(
                `&lt;div&gt;
                     월곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4e49a3fabe2b1d8b816b545eb0d76203 = L.marker(
                [37.4932558, 127.0567995],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4e49a3fabe2b1d8b816b545eb0d76203.bindTooltip(
                `&lt;div&gt;
                     대치1문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1c30bae357c0b3ad1ac664a9ea4bdc20 = L.marker(
                [37.4910227, 127.1016166],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1c30bae357c0b3ad1ac664a9ea4bdc20.bindTooltip(
                `&lt;div&gt;
                     수서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_047beb706c62fce90bc9ed5d4e6385e8 = L.marker(
                [37.5515224, 126.8758771],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_047beb706c62fce90bc9ed5d4e6385e8.bindTooltip(
                `&lt;div&gt;
                     염창강변 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_11d8c9f8d578ddad557f44a467f2e62a = L.marker(
                [37.5063495, 126.8568307],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_11d8c9f8d578ddad557f44a467f2e62a.bindTooltip(
                `&lt;div&gt;
                     덕의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_30adc9d76c0750a1b5173b90b6fc1c3f = L.marker(
                [37.4892126, 126.9141494],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_30adc9d76c0750a1b5173b90b6fc1c3f.bindTooltip(
                `&lt;div&gt;
                     문창초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f038e18e8b96cb05f0248c7e61e90c52 = L.marker(
                [37.5404771, 126.8283968],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f038e18e8b96cb05f0248c7e61e90c52.bindTooltip(
                `&lt;div&gt;
                     신월중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9d2bb237e024cba4d83e22b05035e5ad = L.marker(
                [37.5491882, 126.8460525],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9d2bb237e024cba4d83e22b05035e5ad.bindTooltip(
                `&lt;div&gt;
                     우장초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3ddd4657e66c57889626d857ca1d9cbb = L.marker(
                [37.5101332, 126.8601557],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3ddd4657e66c57889626d857ca1d9cbb.bindTooltip(
                `&lt;div&gt;
                     계남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8da25647232ac8afcdf5b45c9318d957 = L.marker(
                [37.5304363, 126.8421456],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8da25647232ac8afcdf5b45c9318d957.bindTooltip(
                `&lt;div&gt;
                     예촌 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed02e2261ccbdb4aad9b2640c1099869 = L.marker(
                [37.4683134, 126.8941597],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ed02e2261ccbdb4aad9b2640c1099869.bindTooltip(
                `&lt;div&gt;
                     가산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_61485d8bd06918a9294125886ca9c5d7 = L.marker(
                [37.5248657, 126.8981321],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_61485d8bd06918a9294125886ca9c5d7.bindTooltip(
                `&lt;div&gt;
                     당산천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dea58aad70bde417a5df0c5e06e02132 = L.marker(
                [37.5016163, 126.9222769],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dea58aad70bde417a5df0c5e06e02132.bindTooltip(
                `&lt;div&gt;
                     서울공업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d6b975bbcd1253c6e653fd2429f768f0 = L.marker(
                [37.5160437, 126.8336364],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d6b975bbcd1253c6e653fd2429f768f0.bindTooltip(
                `&lt;div&gt;
                     강월초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7d8d0e267a67d2a8434e101a279d3004 = L.marker(
                [37.5127692, 126.8743889],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7d8d0e267a67d2a8434e101a279d3004.bindTooltip(
                `&lt;div&gt;
                     신목고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_18fd547fc3f896cab20bb799f5e7fc5c = L.marker(
                [37.5367069, 126.8545682],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_18fd547fc3f896cab20bb799f5e7fc5c.bindTooltip(
                `&lt;div&gt;
                     신곡 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a0f19e0737402ed24fff0b7bf58cf437 = L.marker(
                [37.5268479, 126.9076599],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a0f19e0737402ed24fff0b7bf58cf437.bindTooltip(
                `&lt;div&gt;
                     영동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0c3c94c1c66dca66828390318de34a18 = L.marker(
                [37.5383352, 126.8234956],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0c3c94c1c66dca66828390318de34a18.bindTooltip(
                `&lt;div&gt;
                     양원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b40ca4d7a7a3d2d5fea04d92fb582803 = L.marker(
                [37.5311117, 126.8594439],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b40ca4d7a7a3d2d5fea04d92fb582803.bindTooltip(
                `&lt;div&gt;
                     화친 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_126e5328cecee7c8db30b6f415686d25 = L.marker(
                [37.5556716, 126.8359438],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_126e5328cecee7c8db30b6f415686d25.bindTooltip(
                `&lt;div&gt;
                     가곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bd6f94d2787fdb20852639fb7c468a1a = L.marker(
                [37.5347151, 126.9021023],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bd6f94d2787fdb20852639fb7c468a1a.bindTooltip(
                `&lt;div&gt;
                     당산2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5cb108cd1c14810bcaf3e1d20d1d6bb1 = L.marker(
                [37.6100943, 127.066135],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5cb108cd1c14810bcaf3e1d20d1d6bb1.bindTooltip(
                `&lt;div&gt;
                     석관고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9189f8133fc0ccf64a9e098d13168fcc = L.marker(
                [37.6524153, 127.068871],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9189f8133fc0ccf64a9e098d13168fcc.bindTooltip(
                `&lt;div&gt;
                     상계중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_864597d168ce2ec1bfe970b875e9644d = L.marker(
                [37.5084786, 126.9341598],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_864597d168ce2ec1bfe970b875e9644d.bindTooltip(
                `&lt;div&gt;
                     영등포고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c482e51039b6edee22089db8da280e9 = L.marker(
                [37.5470114, 127.1369688],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7c482e51039b6edee22089db8da280e9.bindTooltip(
                `&lt;div&gt;
                     천호초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1f67fb6731cad1898b118d6d435f930f = L.marker(
                [37.5359049, 126.8660078],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1f67fb6731cad1898b118d6d435f930f.bindTooltip(
                `&lt;div&gt;
                     영도중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f09c4b3efeca235fe2edc4e5f1850035 = L.marker(
                [37.5009264, 126.8572476],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f09c4b3efeca235fe2edc4e5f1850035.bindTooltip(
                `&lt;div&gt;
                     고척초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a06a9cb38e482062253f1edc7454d526 = L.marker(
                [37.5481433, 126.8687039],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a06a9cb38e482062253f1edc7454d526.bindTooltip(
                `&lt;div&gt;
                     양동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fa501a532473612e4e183d1cfcb57005 = L.marker(
                [37.5085173, 126.9065702],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fa501a532473612e4e183d1cfcb57005.bindTooltip(
                `&lt;div&gt;
                     신길3동구립경로동
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56e9c3d1e4026a4e22a9ef4da58683f7 = L.marker(
                [37.5226361, 126.8453788],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_56e9c3d1e4026a4e22a9ef4da58683f7.bindTooltip(
                `&lt;div&gt;
                     한민교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ff3c8d9535678a63a9801d2bf3e2a99 = L.marker(
                [37.6019774, 126.9043788],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4ff3c8d9535678a63a9801d2bf3e2a99.bindTooltip(
                `&lt;div&gt;
                     덕산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_047f11da86850b5108ed317f82fec95e = L.marker(
                [37.4782029, 126.8963861],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_047f11da86850b5108ed317f82fec95e.bindTooltip(
                `&lt;div&gt;
                     가산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b40fd0ee2e48762eb8dcd1cdb12e8628 = L.marker(
                [37.4995867, 126.8892791],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b40fd0ee2e48762eb8dcd1cdb12e8628.bindTooltip(
                `&lt;div&gt;
                     신구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0c0168fb2bb571d98323b012eb9f13d4 = L.marker(
                [37.5264535, 126.8604868],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0c0168fb2bb571d98323b012eb9f13d4.bindTooltip(
                `&lt;div&gt;
                     신정사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_802a864ed487599948fd900a7418d9f4 = L.marker(
                [37.5644753, 127.0835198],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_802a864ed487599948fd900a7418d9f4.bindTooltip(
                `&lt;div&gt;
                     대원고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_908ee0ff707cae209f3579720cc7e414 = L.marker(
                [37.6660552, 127.029165],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_908ee0ff707cae209f3579720cc7e414.bindTooltip(
                `&lt;div&gt;
                     서울신방학초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_714c5a3b782fc724a38798373593816a = L.marker(
                [37.4998265, 127.0578055],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_714c5a3b782fc724a38798373593816a.bindTooltip(
                `&lt;div&gt;
                     대치4문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d94728f8feae9808cd00a2d08125af1 = L.marker(
                [37.5485021, 127.1011402],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6d94728f8feae9808cd00a2d08125af1.bindTooltip(
                `&lt;div&gt;
                     서울광장초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ffcc7c766fccf91b74271cb2ceb67bbf = L.marker(
                [37.5920562, 127.0998384],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ffcc7c766fccf91b74271cb2ceb67bbf.bindTooltip(
                `&lt;div&gt;
                     면일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_59b1d07cd15ae902cadaac94df3c7a3b = L.marker(
                [37.5073633, 127.1111866],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_59b1d07cd15ae902cadaac94df3c7a3b.bindTooltip(
                `&lt;div&gt;
                     송파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_63b12525561cf6a85b2a999dbbb652a1 = L.marker(
                [37.5428856, 127.0792352],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_63b12525561cf6a85b2a999dbbb652a1.bindTooltip(
                `&lt;div&gt;
                     구의중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_424540533e809e009505605eacc3a139 = L.marker(
                [37.6583129, 127.0219836],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_424540533e809e009505605eacc3a139.bindTooltip(
                `&lt;div&gt;
                     서울초당초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_44e1adfdbd5bda3035fd073e343bc4ba = L.marker(
                [37.6656656, 127.0314118],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_44e1adfdbd5bda3035fd073e343bc4ba.bindTooltip(
                `&lt;div&gt;
                     방학중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cd92ea86586c2c481797defea9e7fab8 = L.marker(
                [37.5450598, 127.0983593],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_cd92ea86586c2c481797defea9e7fab8.bindTooltip(
                `&lt;div&gt;
                     양진중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_073c9ceefa1115d26b3d800d093932e7 = L.marker(
                [37.5572727, 127.0332743],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_073c9ceefa1115d26b3d800d093932e7.bindTooltip(
                `&lt;div&gt;
                     무학여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e7aae1ba82e751848b64e48c95233e04 = L.marker(
                [37.5508795, 127.0879836],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e7aae1ba82e751848b64e48c95233e04.bindTooltip(
                `&lt;div&gt;
                     선화예술고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_799d10dacc2e2ef0a5fe949b0806c013 = L.marker(
                [37.5280392, 127.0437328],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_799d10dacc2e2ef0a5fe949b0806c013.bindTooltip(
                `&lt;div&gt;
                     청담고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8919253283c1a2bd8610f232fc8bbabb = L.marker(
                [37.4872623, 126.8371987],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8919253283c1a2bd8610f232fc8bbabb.bindTooltip(
                `&lt;div&gt;
                     오남중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2798b7a10f0c7fb78ebe561f03d7a951 = L.marker(
                [37.5112156, 126.9409405],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2798b7a10f0c7fb78ebe561f03d7a951.bindTooltip(
                `&lt;div&gt;
                     노량진초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5a0d3b36729bcf69d689656e0be0b1ad = L.marker(
                [37.5377434, 126.8959355],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5a0d3b36729bcf69d689656e0be0b1ad.bindTooltip(
                `&lt;div&gt;
                     양평2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c3098b570b56d7cb82618bc8133d7fef = L.marker(
                [37.631742, 127.0113905],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c3098b570b56d7cb82618bc8133d7fef.bindTooltip(
                `&lt;div&gt;
                     유현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fc9a53b56a9cb3cd13ac7287662fc371 = L.marker(
                [37.5017232, 127.0927534],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fc9a53b56a9cb3cd13ac7287662fc371.bindTooltip(
                `&lt;div&gt;
                     삼전초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_401ea86dc26798f95b8a5efb32e387cb = L.marker(
                [37.65265, 127.0183509],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_401ea86dc26798f95b8a5efb32e387cb.bindTooltip(
                `&lt;div&gt;
                     효문고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_167d611d1fd8e89533e5c31ca5f4d3b5 = L.marker(
                [37.5293434, 127.0850088],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_167d611d1fd8e89533e5c31ca5f4d3b5.bindTooltip(
                `&lt;div&gt;
                     광양고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_40bed9221dd30e29de34010eb7b46402 = L.marker(
                [37.534161, 127.1251979],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_40bed9221dd30e29de34010eb7b46402.bindTooltip(
                `&lt;div&gt;
                     성내동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0cf35e72ab086e94c875f55b2c358a05 = L.marker(
                [37.6418513, 127.0692587],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0cf35e72ab086e94c875f55b2c358a05.bindTooltip(
                `&lt;div&gt;
                     용동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_979d93aff27e98c5a1e8039565ae960b = L.marker(
                [37.5527209, 127.1465021],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_979d93aff27e98c5a1e8039565ae960b.bindTooltip(
                `&lt;div&gt;
                     고명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_06e8efdc70a4b01dcac2f7266a198a19 = L.marker(
                [37.4549744, 126.9049492],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_06e8efdc70a4b01dcac2f7266a198a19.bindTooltip(
                `&lt;div&gt;
                     시흥초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f6497cfd5d1fc0c100ed525900c5b3e = L.marker(
                [37.5243318, 126.8480042],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3f6497cfd5d1fc0c100ed525900c5b3e.bindTooltip(
                `&lt;div&gt;
                     양강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eae09dcc651b11fd764093d3482d5720 = L.marker(
                [37.5173028, 126.890644],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_eae09dcc651b11fd764093d3482d5720.bindTooltip(
                `&lt;div&gt;
                     문래동 성당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_23e21d8549eb63ffeac3a0b5b5895f1d = L.marker(
                [37.5080706, 126.9069114],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_23e21d8549eb63ffeac3a0b5b5895f1d.bindTooltip(
                `&lt;div&gt;
                     도림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8514d3bc81948b6680f2cda0343fbf3c = L.marker(
                [37.529648, 126.8407685],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8514d3bc81948b6680f2cda0343fbf3c.bindTooltip(
                `&lt;div&gt;
                     곰달래 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ec564a3641e7cb5612ae1c83da1054aa = L.marker(
                [37.5001732, 126.8892826],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ec564a3641e7cb5612ae1c83da1054aa.bindTooltip(
                `&lt;div&gt;
                     구로5동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_821840ab750ac826d968de3f9a1b0d8d = L.marker(
                [37.556548, 127.0346801],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_821840ab750ac826d968de3f9a1b0d8d.bindTooltip(
                `&lt;div&gt;
                     행당초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_335c430afd367c68e2dc17d569e83d39 = L.marker(
                [37.5229564, 126.9348694],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_335c430afd367c68e2dc17d569e83d39.bindTooltip(
                `&lt;div&gt;
                     여의도여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_785a97f7a271aa379ddf1403f9a9186a = L.marker(
                [37.4898178, 127.076323],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_785a97f7a271aa379ddf1403f9a9186a.bindTooltip(
                `&lt;div&gt;
                     일원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e71bfd77b6a78b31a41fac4c5749d37a = L.marker(
                [37.5356176, 126.9725709],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e71bfd77b6a78b31a41fac4c5749d37a.bindTooltip(
                `&lt;div&gt;
                     용산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ec10462606f41263687cbc05dc64ae53 = L.marker(
                [37.5171806, 126.8726046],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ec10462606f41263687cbc05dc64ae53.bindTooltip(
                `&lt;div&gt;
                     신목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c0ef85e7d45c136f23c537a7fae56749 = L.marker(
                [37.5135132, 126.873753],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c0ef85e7d45c136f23c537a7fae56749.bindTooltip(
                `&lt;div&gt;
                     목일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f7f768eb58bc88c622b5433659515181 = L.marker(
                [37.4805822, 127.0618915],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f7f768eb58bc88c622b5433659515181.bindTooltip(
                `&lt;div&gt;
                     개포중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_13722a91b5e830bfa93623703bf548cf = L.marker(
                [37.5479846, 126.9482633],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_13722a91b5e830bfa93623703bf548cf.bindTooltip(
                `&lt;div&gt;
                     서울여자고등학교 (체
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_164ac23685b92e795fbf3070dab7fa6f = L.marker(
                [37.5869435, 127.0626316],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_164ac23685b92e795fbf3070dab7fa6f.bindTooltip(
                `&lt;div&gt;
                     휘경중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9c247d9a9ff540f5988ee928e5401426 = L.marker(
                [37.5195144, 126.895944],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9c247d9a9ff540f5988ee928e5401426.bindTooltip(
                `&lt;div&gt;
                     양화중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7ffc5aa828aabecf9c36b13df9b582e5 = L.marker(
                [37.5202512, 127.1108977],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7ffc5aa828aabecf9c36b13df9b582e5.bindTooltip(
                `&lt;div&gt;
                     잠실초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46fc2912069c1ccd29e85afd150b77a5 = L.marker(
                [37.5668755, 126.8160266],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_46fc2912069c1ccd29e85afd150b77a5.bindTooltip(
                `&lt;div&gt;
                     일심 경로당2
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dacd227d373c5c079f0d65782e8fe30c = L.marker(
                [37.5045585, 126.8444526],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dacd227d373c5c079f0d65782e8fe30c.bindTooltip(
                `&lt;div&gt;
                     매봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f1e5983515a6d4b666da581d568b7eb8 = L.marker(
                [37.5310602, 127.0897244],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f1e5983515a6d4b666da581d568b7eb8.bindTooltip(
                `&lt;div&gt;
                     양남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a7b1b99dd3c78e6c71092c43930630e2 = L.marker(
                [37.60333, 127.0942823],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a7b1b99dd3c78e6c71092c43930630e2.bindTooltip(
                `&lt;div&gt;
                     중화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56f2d3bc04476a890485e4e5453cfb7d = L.marker(
                [37.5677935, 127.0665531],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_56f2d3bc04476a890485e4e5453cfb7d.bindTooltip(
                `&lt;div&gt;
                     장안1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a2e144cd8f3c122dc14c0356ea5745ed = L.marker(
                [37.5585842, 127.1490669],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a2e144cd8f3c122dc14c0356ea5745ed.bindTooltip(
                `&lt;div&gt;
                     시영경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e8e1abd18b56a2c400466a3aeed7bf46 = L.marker(
                [37.5462225, 126.8797749],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e8e1abd18b56a2c400466a3aeed7bf46.bindTooltip(
                `&lt;div&gt;
                     구립용왕경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_027a7ea3a5f8efe089eb50fa59cc4fb6 = L.marker(
                [37.5876999, 126.9448951],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_027a7ea3a5f8efe089eb50fa59cc4fb6.bindTooltip(
                `&lt;div&gt;
                     홍제1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ff8fa1a3d699fe82090839cd6d093d60 = L.marker(
                [37.5514658, 127.1326698],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ff8fa1a3d699fe82090839cd6d093d60.bindTooltip(
                `&lt;div&gt;
                     암사1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b3b5325b0e010bbae5cdd6168458ebf = L.marker(
                [37.5818448, 126.91075],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6b3b5325b0e010bbae5cdd6168458ebf.bindTooltip(
                `&lt;div&gt;
                     충신교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e89c2db1f7fb3d78e9b7de6b3f92e6f1 = L.marker(
                [37.5448609, 126.9139085],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e89c2db1f7fb3d78e9b7de6b3f92e6f1.bindTooltip(
                `&lt;div&gt;
                     마리스타교육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4fabc88189efee5f1be2e0106f02b445 = L.marker(
                [37.5099704, 126.9206879],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4fabc88189efee5f1be2e0106f02b445.bindTooltip(
                `&lt;div&gt;
                     구립창신경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1be06dc01cd9c6ccdad412e1c092c55e = L.marker(
                [37.5775087, 126.9669392],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1be06dc01cd9c6ccdad412e1c092c55e.bindTooltip(
                `&lt;div&gt;
                     매동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7391e917091abab541f92d57f946ed8b = L.marker(
                [37.5518833, 126.8550582],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7391e917091abab541f92d57f946ed8b.bindTooltip(
                `&lt;div&gt;
                     등서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c639708ae9925020fc978a3305ec2e6e = L.marker(
                [37.536006, 126.8507829],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c639708ae9925020fc978a3305ec2e6e.bindTooltip(
                `&lt;div&gt;
                     안골 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7fbf70e9049763f7d35855cdceea5a59 = L.marker(
                [37.5258547, 126.8512654],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7fbf70e9049763f7d35855cdceea5a59.bindTooltip(
                `&lt;div&gt;
                     양동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_08803f6b46f958896a9d3476888ef8e7 = L.marker(
                [37.5803467, 126.9231625],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_08803f6b46f958896a9d3476888ef8e7.bindTooltip(
                `&lt;div&gt;
                     명지대방목학술정보관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7382c14d92180354ae45b9b34dce5ab4 = L.marker(
                [37.5927763, 126.9517221],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7382c14d92180354ae45b9b34dce5ab4.bindTooltip(
                `&lt;div&gt;
                     인왕중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a2c5c7ebf93fc27f7e8ae3d1255bf664 = L.marker(
                [37.5516106, 126.8379309],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a2c5c7ebf93fc27f7e8ae3d1255bf664.bindTooltip(
                `&lt;div&gt;
                     내발산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c8b5af2368b592214c845214e1e4c1a3 = L.marker(
                [37.5821284, 126.9218074],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c8b5af2368b592214c845214e1e4c1a3.bindTooltip(
                `&lt;div&gt;
                     삼오경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e4bcc39cfb7775feab20c1559d5ab68c = L.marker(
                [37.5428831, 126.8899568],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e4bcc39cfb7775feab20c1559d5ab68c.bindTooltip(
                `&lt;div&gt;
                     구립양화경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a1b012b65e923a19c5795852c82959dc = L.marker(
                [37.5749875, 126.9881341],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a1b012b65e923a19c5795852c82959dc.bindTooltip(
                `&lt;div&gt;
                     교동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fb99bbe4b1a82661e6764523a2c2ea08 = L.marker(
                [37.495335, 127.033256],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fb99bbe4b1a82661e6764523a2c2ea08.bindTooltip(
                `&lt;div&gt;
                     역삼1동문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0ccd6ff2d43eb7f83355d5bef2c4a855 = L.marker(
                [37.5224143, 126.8409982],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0ccd6ff2d43eb7f83355d5bef2c4a855.bindTooltip(
                `&lt;div&gt;
                     강서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ac647f97f273831d15aa30a900febd5 = L.marker(
                [37.5725204, 126.8198968],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4ac647f97f273831d15aa30a900febd5.bindTooltip(
                `&lt;div&gt;
                     동부 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_982281e2e74c4bd7e10c59712ad4ca89 = L.marker(
                [37.526241, 127.1372817],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_982281e2e74c4bd7e10c59712ad4ca89.bindTooltip(
                `&lt;div&gt;
                     둔촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68a6b7a6bcb8f43c6d26b1effe21eb22 = L.marker(
                [37.5628192, 127.0888117],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_68a6b7a6bcb8f43c6d26b1effe21eb22.bindTooltip(
                `&lt;div&gt;
                     대원여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_60f5dbf7f41c0336801b117d6252bce2 = L.marker(
                [37.651165, 127.0805707],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_60f5dbf7f41c0336801b117d6252bce2.bindTooltip(
                `&lt;div&gt;
                     불암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c38b6013a60896d78990e512cd97690f = L.marker(
                [37.5467561, 127.1395344],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c38b6013a60896d78990e512cd97690f.bindTooltip(
                `&lt;div&gt;
                     천호중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d4f40e8eaea164b489f825bb480d73c0 = L.marker(
                [37.53151, 127.122673],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d4f40e8eaea164b489f825bb480d73c0.bindTooltip(
                `&lt;div&gt;
                     성내초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9a8c8723d086cab3e5ba893efa7b7316 = L.marker(
                [37.5913201, 127.0876996],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9a8c8723d086cab3e5ba893efa7b7316.bindTooltip(
                `&lt;div&gt;
                     면목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_900b57c11328ffaf5a57247fa4836ae5 = L.marker(
                [37.5282805, 127.0451616],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_900b57c11328ffaf5a57247fa4836ae5.bindTooltip(
                `&lt;div&gt;
                     청담초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36a375503c957f8498269397ed1d9755 = L.marker(
                [37.6489712, 127.0244052],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_36a375503c957f8498269397ed1d9755.bindTooltip(
                `&lt;div&gt;
                     서울쌍문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_57030228a28a8a6c29ef3d40ab7cf672 = L.marker(
                [37.5895902, 127.0755697],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_57030228a28a8a6c29ef3d40ab7cf672.bindTooltip(
                `&lt;div&gt;
                     중랑초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ffb845e14bb756d9d948cbd0b0b8747e = L.marker(
                [37.6193069, 127.0742531],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ffb845e14bb756d9d948cbd0b0b8747e.bindTooltip(
                `&lt;div&gt;
                     공릉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68e3e938f070300115ffb26b6921c29b = L.marker(
                [37.5649828, 127.1740361],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_68e3e938f070300115ffb26b6921c29b.bindTooltip(
                `&lt;div&gt;
                     강일동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_31ed9e09f302627c6c26fd0f9338d0b8 = L.marker(
                [37.5590548, 127.1489198],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_31ed9e09f302627c6c26fd0f9338d0b8.bindTooltip(
                `&lt;div&gt;
                     고덕1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_02b0564c9225a6db5b071207ffabc7e3 = L.marker(
                [37.5854269, 127.0863636],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_02b0564c9225a6db5b071207ffabc7e3.bindTooltip(
                `&lt;div&gt;
                     면동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_685dfe683223e5278e97f6708a8e20be = L.marker(
                [37.5843988, 127.0972465],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_685dfe683223e5278e97f6708a8e20be.bindTooltip(
                `&lt;div&gt;
                     면목고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_195017172f0aad65dccbc8658241e581 = L.marker(
                [37.5190795, 126.8402446],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_195017172f0aad65dccbc8658241e581.bindTooltip(
                `&lt;div&gt;
                     한빛사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2848e8e5a5fbf561ebec7c516461359b = L.marker(
                [37.601554, 127.0901155],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2848e8e5a5fbf561ebec7c516461359b.bindTooltip(
                `&lt;div&gt;
                     상봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_395c8bb8b65959ded394961df3c24c59 = L.marker(
                [37.5095526, 127.1210955],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_395c8bb8b65959ded394961df3c24c59.bindTooltip(
                `&lt;div&gt;
                     방산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c78e98a64beb655a2dcfbfaedef2f61 = L.marker(
                [37.4884324, 127.1302549],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7c78e98a64beb655a2dcfbfaedef2f61.bindTooltip(
                `&lt;div&gt;
                     문정중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c5a8196e5b32a8c379c0cc2ca31839d9 = L.marker(
                [37.5531674, 126.9090747],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c5a8196e5b32a8c379c0cc2ca31839d9.bindTooltip(
                `&lt;div&gt;
                     희우경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_795772386309bb4e900944d6e543f181 = L.marker(
                [37.5516092, 127.1655314],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_795772386309bb4e900944d6e543f181.bindTooltip(
                `&lt;div&gt;
                     상일동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_18b7bdcf12036940e883bb1790a7ac5a = L.marker(
                [37.5410007, 127.1500551],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_18b7bdcf12036940e883bb1790a7ac5a.bindTooltip(
                `&lt;div&gt;
                     신명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b279756524a9572b446a2fe01a69577b = L.marker(
                [37.5203992, 126.9107094],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b279756524a9572b446a2fe01a69577b.bindTooltip(
                `&lt;div&gt;
                     영등포동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e5db2354d2772a31ade3b8b10921cb16 = L.marker(
                [37.5099053, 126.9118456],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e5db2354d2772a31ade3b8b10921cb16.bindTooltip(
                `&lt;div&gt;
                     우신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e2f33db67971b6bb71bcba91a8b8588b = L.marker(
                [37.5476094, 126.8578108],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e2f33db67971b6bb71bcba91a8b8588b.bindTooltip(
                `&lt;div&gt;
                     등촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bdf002670444a011fbce81c42b9e65fb = L.marker(
                [37.547738, 126.9732429],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bdf002670444a011fbce81c42b9e65fb.bindTooltip(
                `&lt;div&gt;
                     용산교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a3dbe0c4fae99d3d8ca6ef61b2dba52d = L.marker(
                [37.5593457, 126.9517835],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a3dbe0c4fae99d3d8ca6ef61b2dba52d.bindTooltip(
                `&lt;div&gt;
                     북성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_47662422ae2255bb3a591715602dac56 = L.marker(
                [37.5572274, 126.960287],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_47662422ae2255bb3a591715602dac56.bindTooltip(
                `&lt;div&gt;
                     서울제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_81eba315aa3acd4f5e4586d579d762fa = L.marker(
                [37.6029767, 127.0403982],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_81eba315aa3acd4f5e4586d579d762fa.bindTooltip(
                `&lt;div&gt;
                     월곡감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_87eb0bbce41132544dc9ad60176c07d4 = L.marker(
                [37.592688, 126.9442854],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_87eb0bbce41132544dc9ad60176c07d4.bindTooltip(
                `&lt;div&gt;
                     홍제초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7863af68904d48957d5966f9bc58956b = L.marker(
                [37.5688794, 127.0554779],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7863af68904d48957d5966f9bc58956b.bindTooltip(
                `&lt;div&gt;
                     답십리초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3c1bad2d70e8feee64eaac7f5bb9a954 = L.marker(
                [37.5202766, 126.9764757],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3c1bad2d70e8feee64eaac7f5bb9a954.bindTooltip(
                `&lt;div&gt;
                     신용산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9052bca20c6d7f1f08f0614cb755b0cd = L.marker(
                [37.5466468, 126.859924],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9052bca20c6d7f1f08f0614cb755b0cd.bindTooltip(
                `&lt;div&gt;
                     능안 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_68622b63925bcda2f5c7279df6bb5c5b = L.marker(
                [37.550538, 126.9081484],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_68622b63925bcda2f5c7279df6bb5c5b.bindTooltip(
                `&lt;div&gt;
                     성산성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed4fb32471fc78ff6d683ca45f0ff820 = L.marker(
                [37.566879, 126.911639],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ed4fb32471fc78ff6d683ca45f0ff820.bindTooltip(
                `&lt;div&gt;
                     서울중동초(정보관2층 다목적실)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4e3b2191e677254f55e9b183aca83fbd = L.marker(
                [37.5928368, 126.9120055],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4e3b2191e677254f55e9b183aca83fbd.bindTooltip(
                `&lt;div&gt;
                     신사초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5595e68c5982642549277c6ac9b5d879 = L.marker(
                [37.5392322, 127.1462094],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5595e68c5982642549277c6ac9b5d879.bindTooltip(
                `&lt;div&gt;
                     길 동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6ed26b8cbce740f84698394737fd67c4 = L.marker(
                [37.5367691, 126.8413967],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6ed26b8cbce740f84698394737fd67c4.bindTooltip(
                `&lt;div&gt;
                     까치산 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0a05efb10d7eaff8033f074cf4768f8d = L.marker(
                [37.5301177, 126.8537711],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0a05efb10d7eaff8033f074cf4768f8d.bindTooltip(
                `&lt;div&gt;
                     하마터 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c135e19e57b447d131d41763a99dc237 = L.marker(
                [37.5759837, 126.958142],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c135e19e57b447d131d41763a99dc237.bindTooltip(
                `&lt;div&gt;
                     무악동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5beea8657f32798032534061db7aab85 = L.marker(
                [37.4895328, 126.9242737],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5beea8657f32798032534061db7aab85.bindTooltip(
                `&lt;div&gt;
                     월드비전교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a9999ef6f206e0a976c42f3f29346d2e = L.marker(
                [37.57989, 126.985687],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a9999ef6f206e0a976c42f3f29346d2e.bindTooltip(
                `&lt;div&gt;
                     재동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f74802b3aacda141875046bd880e728e = L.marker(
                [37.5404771, 126.9925577],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f74802b3aacda141875046bd880e728e.bindTooltip(
                `&lt;div&gt;
                     북부경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f1daa9ae68b63615a44b019315eea916 = L.marker(
                [37.5498184, 127.0868094],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f1daa9ae68b63615a44b019315eea916.bindTooltip(
                `&lt;div&gt;
                     경복초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_121a1247b122eddd8a2970ba9cf408dd = L.marker(
                [37.651461, 127.0166893],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_121a1247b122eddd8a2970ba9cf408dd.bindTooltip(
                `&lt;div&gt;
                     덕성여자대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e494fecd386c3406e090fdb39b2a3126 = L.marker(
                [37.6045778, 127.0836716],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e494fecd386c3406e090fdb39b2a3126.bindTooltip(
                `&lt;div&gt;
                     중화고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c94ceb4e4813d1ee3a5c46e3cc7b2e3a = L.marker(
                [37.5779753, 127.0477473],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c94ceb4e4813d1ee3a5c46e3cc7b2e3a.bindTooltip(
                `&lt;div&gt;
                     전농1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2415bbccf16dfd38f0c2e814a7082de7 = L.marker(
                [37.6327676, 127.0410585],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2415bbccf16dfd38f0c2e814a7082de7.bindTooltip(
                `&lt;div&gt;
                     서울신화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c359c0866e4a7ee1a719e490ef88dbe1 = L.marker(
                [37.5830681, 127.0965898],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c359c0866e4a7ee1a719e490ef88dbe1.bindTooltip(
                `&lt;div&gt;
                     면목중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9615f73487ef67045776d765f75b2b7f = L.marker(
                [37.5827189, 127.0167373],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9615f73487ef67045776d765f75b2b7f.bindTooltip(
                `&lt;div&gt;
                     동신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed05234205080112fcbdf69ba94b08ff = L.marker(
                [37.5466977, 126.9123948],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ed05234205080112fcbdf69ba94b08ff.bindTooltip(
                `&lt;div&gt;
                     양화진경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b1b85263d11c17c6d6c21315955a073c = L.marker(
                [37.5393765, 127.0048805],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b1b85263d11c17c6d6c21315955a073c.bindTooltip(
                `&lt;div&gt;
                     한남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccdf8e75fa3314134849067dcbb0dd61 = L.marker(
                [37.536781, 127.13311],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ccdf8e75fa3314134849067dcbb0dd61.bindTooltip(
                `&lt;div&gt;
                     동신중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9234d9ef203d5434366f9a362d0359b4 = L.marker(
                [37.5745689, 127.0515154],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9234d9ef203d5434366f9a362d0359b4.bindTooltip(
                `&lt;div&gt;
                     동대문중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_084eb95879f25680fe084f543d22ee45 = L.marker(
                [37.4841727, 126.9095481],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_084eb95879f25680fe084f543d22ee45.bindTooltip(
                `&lt;div&gt;
                     서울조원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0665b47eea49e1ee6b0e79a8ba152d01 = L.marker(
                [37.5653655, 126.9642416],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0665b47eea49e1ee6b0e79a8ba152d01.bindTooltip(
                `&lt;div&gt;
                     인창중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ebd2d8833db6b8315db602110756bc2b = L.marker(
                [37.5426007, 127.1207594],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ebd2d8833db6b8315db602110756bc2b.bindTooltip(
                `&lt;div&gt;
                     천호2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6cac0bc46c88d4cc543ca670f6bd0d8b = L.marker(
                [37.5442532, 127.0985423],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6cac0bc46c88d4cc543ca670f6bd0d8b.bindTooltip(
                `&lt;div&gt;
                     양진초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_67ea5aa169feac89924b4a1fc6f14dcc = L.marker(
                [37.5628448, 126.9091181],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_67ea5aa169feac89924b4a1fc6f14dcc.bindTooltip(
                `&lt;div&gt;
                     성서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f47fd01814639be10d65c1de14b4aaf3 = L.marker(
                [37.4930758, 126.9155706],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f47fd01814639be10d65c1de14b4aaf3.bindTooltip(
                `&lt;div&gt;
                     수도여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eab186478a36e6ada8681e522966ec4e = L.marker(
                [37.4759283, 126.9606291],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_eab186478a36e6ada8681e522966ec4e.bindTooltip(
                `&lt;div&gt;
                     인헌초등학교체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ea2f0c56083c43ef1e6e3cfc7e6c9894 = L.marker(
                [37.5437613, 126.8753459],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ea2f0c56083c43ef1e6e3cfc7e6c9894.bindTooltip(
                `&lt;div&gt;
                     양화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a06950aa7b9a288f1c6ce95238a2550 = L.marker(
                [37.5129485, 126.8982736],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8a06950aa7b9a288f1c6ce95238a2550.bindTooltip(
                `&lt;div&gt;
                     영등포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7e3436fe6b7a0ccd6d8848c2aec1f085 = L.marker(
                [37.4872461, 126.9878564],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7e3436fe6b7a0ccd6d8848c2aec1f085.bindTooltip(
                `&lt;div&gt;
                     서울 방배 초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fb43b6993f509d5d26e41443622f8eb6 = L.marker(
                [37.5693319, 126.930827],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fb43b6993f509d5d26e41443622f8eb6.bindTooltip(
                `&lt;div&gt;
                     연희동자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5ee6fa6ef2adf533f8225bbd29d1419e = L.marker(
                [37.5761802, 126.8921946],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5ee6fa6ef2adf533f8225bbd29d1419e.bindTooltip(
                `&lt;div&gt;
                     상암초등학교 (체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2acd5dd8ddcf4bdb535e38740a523067 = L.marker(
                [37.5130079, 126.9150892],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2acd5dd8ddcf4bdb535e38740a523067.bindTooltip(
                `&lt;div&gt;
                     장훈고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fbdd1d70f19b59fe51a5d2a3dcb0dea1 = L.marker(
                [37.4922269, 126.9070193],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fbdd1d70f19b59fe51a5d2a3dcb0dea1.bindTooltip(
                `&lt;div&gt;
                     대림중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_484278f679e7757c2158b5a12e55a5b6 = L.marker(
                [37.4958165, 126.9223506],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_484278f679e7757c2158b5a12e55a5b6.bindTooltip(
                `&lt;div&gt;
                     문창중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8cb27f6faefa3200b2ef36727717c60d = L.marker(
                [37.543197, 127.077444],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8cb27f6faefa3200b2ef36727717c60d.bindTooltip(
                `&lt;div&gt;
                     건국대학교 사범대학
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_39deec7f24b11b9386cc84da1fd835d1 = L.marker(
                [37.4736571, 126.9766545],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_39deec7f24b11b9386cc84da1fd835d1.bindTooltip(
                `&lt;div&gt;
                     상록보육원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d02fdebc8151ddbc5b93dfc36975e894 = L.marker(
                [37.5457403, 126.8516996],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d02fdebc8151ddbc5b93dfc36975e894.bindTooltip(
                `&lt;div&gt;
                     봉제 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5b5ec5a1d1d9899984873b9a002bfeb2 = L.marker(
                [37.5252916, 126.8900051],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5b5ec5a1d1d9899984873b9a002bfeb2.bindTooltip(
                `&lt;div&gt;
                     영은교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4e5edad8d2d50aa60c84f4b58603c9b3 = L.marker(
                [37.5105206, 126.9014245],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4e5edad8d2d50aa60c84f4b58603c9b3.bindTooltip(
                `&lt;div&gt;
                     도림천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3053d317276e6ef22ee2330d98eae7d5 = L.marker(
                [37.5017643, 126.9054364],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3053d317276e6ef22ee2330d98eae7d5.bindTooltip(
                `&lt;div&gt;
                     구립신길5동제2경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f1661a4e0fa373573c5b19cde7ab7e43 = L.marker(
                [37.5064521, 126.9213962],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f1661a4e0fa373573c5b19cde7ab7e43.bindTooltip(
                `&lt;div&gt;
                     신길7제1구립노인정
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9450f5e644f6c44770e70b334dc2aee9 = L.marker(
                [37.5250013, 126.8973782],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9450f5e644f6c44770e70b334dc2aee9.bindTooltip(
                `&lt;div&gt;
                     당산1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_47b2627703d08fea845c484376853303 = L.marker(
                [37.4797795, 126.9313905],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_47b2627703d08fea845c484376853303.bindTooltip(
                `&lt;div&gt;
                     서원동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0b79049ec5e40b33af69c7b6c6934436 = L.marker(
                [37.5469717, 126.947995],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0b79049ec5e40b33af69c7b6c6934436.bindTooltip(
                `&lt;div&gt;
                     서울디자인고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5801981c54ed11e8897b4b4d6f97a9f7 = L.marker(
                [37.4928824, 127.1230627],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5801981c54ed11e8897b4b4d6f97a9f7.bindTooltip(
                `&lt;div&gt;
                     주영광교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_100c6c9aad1818aeca897223eb60d0db = L.marker(
                [37.5793116, 127.0130043],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_100c6c9aad1818aeca897223eb60d0db.bindTooltip(
                `&lt;div&gt;
                     서일정보산업고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d4b4140c3771b09b69bd151395e668fd = L.marker(
                [37.5656254, 126.9950263],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d4b4140c3771b09b69bd151395e668fd.bindTooltip(
                `&lt;div&gt;
                     을지교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6e1042397c9120787e162d2f9ec23a21 = L.marker(
                [37.5861335, 127.0393853],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6e1042397c9120787e162d2f9ec23a21.bindTooltip(
                `&lt;div&gt;
                     홍파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d12cc080dd2324da6c044a9feee2d3af = L.marker(
                [37.481173, 126.9093917],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d12cc080dd2324da6c044a9feee2d3af.bindTooltip(
                `&lt;div&gt;
                     조원동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d0cef05a0d2c4895526e9da71ac7cbfb = L.marker(
                [37.577914, 126.810894],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d0cef05a0d2c4895526e9da71ac7cbfb.bindTooltip(
                `&lt;div&gt;
                     방화6복지관 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9b4958c1c97a80088858c1139a0c1df7 = L.marker(
                [37.5247969, 126.8494272],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9b4958c1c97a80088858c1139a0c1df7.bindTooltip(
                `&lt;div&gt;
                     양강중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5828befdbdc54255ea1689a5e222b1cf = L.marker(
                [37.5472562, 127.1528011],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5828befdbdc54255ea1689a5e222b1cf.bindTooltip(
                `&lt;div&gt;
                     대명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4f6a1f462d1683a59f4dd75720eb45b0 = L.marker(
                [37.520365, 126.8847002],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4f6a1f462d1683a59f4dd75720eb45b0.bindTooltip(
                `&lt;div&gt;
                     문래중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_996fd93f1b342bcef314c2570a4c5213 = L.marker(
                [37.5250278, 126.8887421],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_996fd93f1b342bcef314c2570a4c5213.bindTooltip(
                `&lt;div&gt;
                     양평1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c2639ca1a71de11cf11061be19a8895e = L.marker(
                [37.5469102, 126.8229474],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c2639ca1a71de11cf11061be19a8895e.bindTooltip(
                `&lt;div&gt;
                     신광명 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6c929d89cd35ec3d172a742582582497 = L.marker(
                [37.4952572, 126.8925095],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6c929d89cd35ec3d172a742582582497.bindTooltip(
                `&lt;div&gt;
                     동구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a06a712e2a934d25fea49e5366553c98 = L.marker(
                [37.6110156, 127.0589586],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a06a712e2a934d25fea49e5366553c98.bindTooltip(
                `&lt;div&gt;
                     석관초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0d97d1cf5a6bb06f78f9311906f12c71 = L.marker(
                [37.5331928, 126.8562488],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0d97d1cf5a6bb06f78f9311906f12c71.bindTooltip(
                `&lt;div&gt;
                     골안말 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6922d0a0b0a873ffd332a7c53058a537 = L.marker(
                [37.5411296, 126.8485221],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6922d0a0b0a873ffd332a7c53058a537.bindTooltip(
                `&lt;div&gt;
                     초록동 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dbe2f256076cf758283cf7d91ee96768 = L.marker(
                [37.5349407, 126.903985],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dbe2f256076cf758283cf7d91ee96768.bindTooltip(
                `&lt;div&gt;
                     구립당산2동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1dbe5cf7f65948572b013b3c33c7129b = L.marker(
                [37.5937228, 127.0127754],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1dbe5cf7f65948572b013b3c33c7129b.bindTooltip(
                `&lt;div&gt;
                     돈암초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c45b82dbfc6b61b2f85f1ac83b77ef23 = L.marker(
                [37.4716608, 127.0266742],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c45b82dbfc6b61b2f85f1ac83b77ef23.bindTooltip(
                `&lt;div&gt;
                     양재1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2f57b38e4800cc5afca7e5b9c6fb52f2 = L.marker(
                [37.5191032, 127.0464651],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2f57b38e4800cc5afca7e5b9c6fb52f2.bindTooltip(
                `&lt;div&gt;
                     청담2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ff7506feae90a9e93bc2e805aab7354 = L.marker(
                [37.5820771, 126.930903],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8ff7506feae90a9e93bc2e805aab7354.bindTooltip(
                `&lt;div&gt;
                     홍연초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f6bd078118997f2adce28088d328804f = L.marker(
                [37.5743163, 126.9599977],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f6bd078118997f2adce28088d328804f.bindTooltip(
                `&lt;div&gt;
                     독립문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6fbc8f75d3957fca9e32f88849017731 = L.marker(
                [37.6446448, 127.0199054],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6fbc8f75d3957fca9e32f88849017731.bindTooltip(
                `&lt;div&gt;
                     수유2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_16c23c298114e76258c919c77f88a436 = L.marker(
                [37.5462875, 127.1300447],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_16c23c298114e76258c919c77f88a436.bindTooltip(
                `&lt;div&gt;
                     강동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b85479af61c0ed5544fa97a7f49bbe75 = L.marker(
                [37.5501539, 127.1305587],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b85479af61c0ed5544fa97a7f49bbe75.bindTooltip(
                `&lt;div&gt;
                     신흥교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f528c764ee25c8af1001c659cff45fa3 = L.marker(
                [37.5553676, 127.1383735],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f528c764ee25c8af1001c659cff45fa3.bindTooltip(
                `&lt;div&gt;
                     강일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ebc928fc6c431cef6db0650ba52a3858 = L.marker(
                [37.5077695, 126.8805967],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ebc928fc6c431cef6db0650ba52a3858.bindTooltip(
                `&lt;div&gt;
                     신도림동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2ab600048d2ba8edb8d545605344b412 = L.marker(
                [37.4916016, 126.8891664],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2ab600048d2ba8edb8d545605344b412.bindTooltip(
                `&lt;div&gt;
                     구로4동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7b4598012a3a2791067adc33bc4f8ec0 = L.marker(
                [37.4760768, 126.9420518],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7b4598012a3a2791067adc33bc4f8ec0.bindTooltip(
                `&lt;div&gt;
                     서광경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2486986a5f35432ad9d04ba1b2d77043 = L.marker(
                [37.6510435, 127.0385877],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2486986a5f35432ad9d04ba1b2d77043.bindTooltip(
                `&lt;div&gt;
                     창동고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9ffd665216d80308249c6e7422878154 = L.marker(
                [37.6564921, 127.0358902],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9ffd665216d80308249c6e7422878154.bindTooltip(
                `&lt;div&gt;
                     백운중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d57542ef930ebbae3a4f3f50b7f9b862 = L.marker(
                [37.5898762, 126.9184633],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d57542ef930ebbae3a4f3f50b7f9b862.bindTooltip(
                `&lt;div&gt;
                     응암감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_72acaae54654b2869f77a9eea4fff3d0 = L.marker(
                [37.4789456, 126.9724434],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_72acaae54654b2869f77a9eea4fff3d0.bindTooltip(
                `&lt;div&gt;
                     남성중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7454f30f21aa1815e421223fb36bbb6b = L.marker(
                [37.5235333, 126.9995931],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7454f30f21aa1815e421223fb36bbb6b.bindTooltip(
                `&lt;div&gt;
                     오산고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0970b598f7c58ddec694f66c68bcc5f9 = L.marker(
                [37.5430897, 126.9842846],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0970b598f7c58ddec694f66c68bcc5f9.bindTooltip(
                `&lt;div&gt;
                     보성여고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eba38ad42a448a72a0838d701fe60aff = L.marker(
                [37.55457, 126.9150014],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_eba38ad42a448a72a0838d701fe60aff.bindTooltip(
                `&lt;div&gt;
                     서교감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4388d972424ffe306c31e6cd471ad7d8 = L.marker(
                [37.615709, 127.0233496],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4388d972424ffe306c31e6cd471ad7d8.bindTooltip(
                `&lt;div&gt;
                     송천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eedf7f9f6aeae43652466de10c728300 = L.marker(
                [37.4880655, 126.979165],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_eedf7f9f6aeae43652466de10c728300.bindTooltip(
                `&lt;div&gt;
                     남일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3626c3ccdb17b88570e92544690d9c1a = L.marker(
                [37.5766446, 126.9834942],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3626c3ccdb17b88570e92544690d9c1a.bindTooltip(
                `&lt;div&gt;
                     풍문여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fffcee61ce8c6b02b604847597f5a863 = L.marker(
                [37.5730679, 127.0030669],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fffcee61ce8c6b02b604847597f5a863.bindTooltip(
                `&lt;div&gt;
                     효제초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d2a13fc0971051184c5e6f7aab8229f0 = L.marker(
                [37.5536804, 126.9493416],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d2a13fc0971051184c5e6f7aab8229f0.bindTooltip(
                `&lt;div&gt;
                     한서초등학교 (강당)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ff3d8aaad8c6c7c6e3f57c782fff75ed = L.marker(
                [37.5439769, 127.1225563],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ff3d8aaad8c6c7c6e3f57c782fff75ed.bindTooltip(
                `&lt;div&gt;
                     천호동중앙교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_24f8f17efaff50f85abc18b5e8c3b736 = L.marker(
                [37.4836201, 127.0327209],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_24f8f17efaff50f85abc18b5e8c3b736.bindTooltip(
                `&lt;div&gt;
                     서초구청
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e0efcb3e0f2ba972eb1fd1e3df78ad61 = L.marker(
                [37.6036604, 127.0272595],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e0efcb3e0f2ba972eb1fd1e3df78ad61.bindTooltip(
                `&lt;div&gt;
                     영암교회(교회당)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e8f713b524dd7296e57e3164a6d2ed23 = L.marker(
                [37.6134771, 127.0364498],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e8f713b524dd7296e57e3164a6d2ed23.bindTooltip(
                `&lt;div&gt;
                     창문여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_291850d32505fcd53c81cf21a4a4feb6 = L.marker(
                [37.4888087, 126.8395008],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_291850d32505fcd53c81cf21a4a4feb6.bindTooltip(
                `&lt;div&gt;
                     오류2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5cec32d8756cfd000770ee6b26216695 = L.marker(
                [37.5002418, 126.8281915],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5cec32d8756cfd000770ee6b26216695.bindTooltip(
                `&lt;div&gt;
                     구로여자정보산업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1342244d55684f47ac3d7e2517e5430f = L.marker(
                [37.5636685, 127.0891173],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1342244d55684f47ac3d7e2517e5430f.bindTooltip(
                `&lt;div&gt;
                     대원외국어고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1a148288aa08221612fcf4872baefc0f = L.marker(
                [37.529664, 127.1455339],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1a148288aa08221612fcf4872baefc0f.bindTooltip(
                `&lt;div&gt;
                     선린초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b21364b45deb51af5c12632bb21f604f = L.marker(
                [37.5836674, 126.9041368],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b21364b45deb51af5c12632bb21f604f.bindTooltip(
                `&lt;div&gt;
                     증산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_59a60476bb72cd130ce6fb4de1c17414 = L.marker(
                [37.524253, 126.8671099],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_59a60476bb72cd130ce6fb4de1c17414.bindTooltip(
                `&lt;div&gt;
                     서정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_42f6be751f64661fa678bbef6ce067bc = L.marker(
                [37.588561, 126.9699284],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_42f6be751f64661fa678bbef6ce067bc.bindTooltip(
                `&lt;div&gt;
                     경기상업고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_91aacdbcc81288dfa364112fe6dc4dc3 = L.marker(
                [37.6088175, 127.0247734],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_91aacdbcc81288dfa364112fe6dc4dc3.bindTooltip(
                `&lt;div&gt;
                     길음 종합사회복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_88b574f5649e299461025d9f3d55e7aa = L.marker(
                [37.6235791, 127.0121687],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_88b574f5649e299461025d9f3d55e7aa.bindTooltip(
                `&lt;div&gt;
                     미양중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d33283f54e0c2c1470d305802cbe4b7b = L.marker(
                [37.5479867, 126.9643143],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d33283f54e0c2c1470d305802cbe4b7b.bindTooltip(
                `&lt;div&gt;
                     청파초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b6a7ecf7c4bdc5e333ccf519d7c3064c = L.marker(
                [37.5632638, 127.0295628],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b6a7ecf7c4bdc5e333ccf519d7c3064c.bindTooltip(
                `&lt;div&gt;
                     무학초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4612dd2540233b097b8bf54f32332638 = L.marker(
                [37.5392935, 127.0525395],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4612dd2540233b097b8bf54f32332638.bindTooltip(
                `&lt;div&gt;
                     성원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c12f11ceaee73248ca827e291640f652 = L.marker(
                [37.4741646, 127.0319136],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c12f11ceaee73248ca827e291640f652.bindTooltip(
                `&lt;div&gt;
                     서울양재초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8a64a2a7d675c6ff62c3c0aa2f3eddfe = L.marker(
                [37.5319441, 127.0063888],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8a64a2a7d675c6ff62c3c0aa2f3eddfe.bindTooltip(
                `&lt;div&gt;
                     한남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c01c26a7534a5e7da466832ea1ea981c = L.marker(
                [37.4998132, 127.1135969],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c01c26a7534a5e7da466832ea1ea981c.bindTooltip(
                `&lt;div&gt;
                     중대초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f01ba738bc1868a0c6eb6779acf5fdeb = L.marker(
                [37.5813782, 127.0140632],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f01ba738bc1868a0c6eb6779acf5fdeb.bindTooltip(
                `&lt;div&gt;
                     명신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f38c3460f59ad94c928794ca73ae564e = L.marker(
                [37.5812088, 126.9179274],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f38c3460f59ad94c928794ca73ae564e.bindTooltip(
                `&lt;div&gt;
                     은가경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c21efd9565cec6fe30a864ddbbfa6241 = L.marker(
                [37.5324773, 126.9904794],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c21efd9565cec6fe30a864ddbbfa6241.bindTooltip(
                `&lt;div&gt;
                     종합행정타운
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ecd2bccd1c77e0ae554088b06a4dafb2 = L.marker(
                [37.5398266, 126.9502984],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ecd2bccd1c77e0ae554088b06a4dafb2.bindTooltip(
                `&lt;div&gt;
                     마포삼성@경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d0a53b62cd49082aa12ca73c5b127796 = L.marker(
                [37.5680782, 126.9630729],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d0a53b62cd49082aa12ca73c5b127796.bindTooltip(
                `&lt;div&gt;
                     금화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0a2d58221b4706e434538bd7dde5ccba = L.marker(
                [37.4923517, 126.981568],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0a2d58221b4706e434538bd7dde5ccba.bindTooltip(
                `&lt;div&gt;
                     경문고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6195b3d41a678cd4223dd988b18a2c61 = L.marker(
                [37.57354, 126.9618444],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6195b3d41a678cd4223dd988b18a2c61.bindTooltip(
                `&lt;div&gt;
                     대신고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c19565ca5fad769cc101ecd7a7b33f54 = L.marker(
                [37.5779418, 127.0039175],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c19565ca5fad769cc101ecd7a7b33f54.bindTooltip(
                `&lt;div&gt;
                     서울사대부속여중
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_99233fcb51f6e00666e1a7c6d4e7e633 = L.marker(
                [37.4981483, 126.8547529],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_99233fcb51f6e00666e1a7c6d4e7e633.bindTooltip(
                `&lt;div&gt;
                     오류여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1d8e866b28b6fe622afc55c3ae883c52 = L.marker(
                [37.5517511, 127.1272382],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1d8e866b28b6fe622afc55c3ae883c52.bindTooltip(
                `&lt;div&gt;
                     암사2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a6b689b5e2aa3c958e1ffd8e6079d325 = L.marker(
                [37.5902589, 127.0793691],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a6b689b5e2aa3c958e1ffd8e6079d325.bindTooltip(
                `&lt;div&gt;
                     중목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_06984a630b032f08e70a9e85a6c5c1e0 = L.marker(
                [37.494293, 126.9613115],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_06984a630b032f08e70a9e85a6c5c1e0.bindTooltip(
                `&lt;div&gt;
                     상현중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d2e5a187d981d28d9bb7dda7cd08f1da = L.marker(
                [37.4761819, 126.915573],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d2e5a187d981d28d9bb7dda7cd08f1da.bindTooltip(
                `&lt;div&gt;
                     미성동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_36506f8b4d3e87d366b5cfdd3a8652e2 = L.marker(
                [37.5759123, 126.8146251],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_36506f8b4d3e87d366b5cfdd3a8652e2.bindTooltip(
                `&lt;div&gt;
                     치현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fc1384dc3f94d8de48b1016b3f93099f = L.marker(
                [37.5367143, 126.8426524],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fc1384dc3f94d8de48b1016b3f93099f.bindTooltip(
                `&lt;div&gt;
                     화원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_00004e1993f88b5f7d7e528872965159 = L.marker(
                [37.4856133, 126.9491483],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_00004e1993f88b5f7d7e528872965159.bindTooltip(
                `&lt;div&gt;
                     서울신봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_08926e0460208e9739bc0078ad2c6b37 = L.marker(
                [37.4668072, 126.9230311],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_08926e0460208e9739bc0078ad2c6b37.bindTooltip(
                `&lt;div&gt;
                     난우중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3a01de212eff312d216829bffb32ef2c = L.marker(
                [37.5510344, 127.0342166],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3a01de212eff312d216829bffb32ef2c.bindTooltip(
                `&lt;div&gt;
                     광희중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2f8147b9895b6b3539a1e0c137b0737e = L.marker(
                [37.5418073, 126.9677569],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2f8147b9895b6b3539a1e0c137b0737e.bindTooltip(
                `&lt;div&gt;
                     삼일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a119f18597dec6183e8d3289a0c88adc = L.marker(
                [37.5446028, 126.932724],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a119f18597dec6183e8d3289a0c88adc.bindTooltip(
                `&lt;div&gt;
                     영광교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_53785dc3a5ea48b076a284fe24a32a6b = L.marker(
                [37.5101591, 126.8971795],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_53785dc3a5ea48b076a284fe24a32a6b.bindTooltip(
                `&lt;div&gt;
                     도림교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4ca3099c14751d6213519326c1db581a = L.marker(
                [37.5184177, 126.8939429],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4ca3099c14751d6213519326c1db581a.bindTooltip(
                `&lt;div&gt;
                     구립문래제1경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f85bad31903f5dc1be6a678d2fdd389f = L.marker(
                [37.4991358, 126.9314158],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f85bad31903f5dc1be6a678d2fdd389f.bindTooltip(
                `&lt;div&gt;
                     상도3동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dec758364a5872706594bcb7f5fb7316 = L.marker(
                [37.5476373, 126.9159645],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dec758364a5872706594bcb7f5fb7316.bindTooltip(
                `&lt;div&gt;
                     성산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9d675f23cf5c3edda2d7eb9cac6f80e0 = L.marker(
                [37.539614, 126.8963895],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9d675f23cf5c3edda2d7eb9cac6f80e0.bindTooltip(
                `&lt;div&gt;
                     당산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e98c4974b6c4e4b23e8966adcee99823 = L.marker(
                [37.502675, 126.9065507],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e98c4974b6c4e4b23e8966adcee99823.bindTooltip(
                `&lt;div&gt;
                     대영초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9d9f064ed506a0fe3b7c71efde990758 = L.marker(
                [37.5004122, 126.8628141],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9d9f064ed506a0fe3b7c71efde990758.bindTooltip(
                `&lt;div&gt;
                     고척1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dd8ddf4413f555f4966d6e5ddd587706 = L.marker(
                [37.5157342, 126.9226591],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dd8ddf4413f555f4966d6e5ddd587706.bindTooltip(
                `&lt;div&gt;
                     구립율산경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4d8cdce41a307307d09b105038bacd86 = L.marker(
                [37.5232656, 126.888191],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4d8cdce41a307307d09b105038bacd86.bindTooltip(
                `&lt;div&gt;
                     구립양평1동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a30daa5c6521728f4182565b5b1bf4f2 = L.marker(
                [37.5450991, 126.9270335],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a30daa5c6521728f4182565b5b1bf4f2.bindTooltip(
                `&lt;div&gt;
                     상수청소년독서실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5f4c5b63e0a1b26b314912e7f646e760 = L.marker(
                [37.5380081, 126.8475462],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5f4c5b63e0a1b26b314912e7f646e760.bindTooltip(
                `&lt;div&gt;
                     약수 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fed4bd4070db0ec90e497c45823b7a1b = L.marker(
                [37.52548, 126.9034287],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fed4bd4070db0ec90e497c45823b7a1b.bindTooltip(
                `&lt;div&gt;
                     영등포동 주민자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a9b987aff8be975fa1a2843cdf87e17c = L.marker(
                [37.4890451, 127.1292892],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a9b987aff8be975fa1a2843cdf87e17c.bindTooltip(
                `&lt;div&gt;
                     문정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fa21bb305155121fd2b903966b1a2dc7 = L.marker(
                [37.6071825, 126.9695997],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fa21bb305155121fd2b903966b1a2dc7.bindTooltip(
                `&lt;div&gt;
                     예능교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_54b7f0abf3470b411fc3d9a287a372d3 = L.marker(
                [37.6009825, 127.0606984],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_54b7f0abf3470b411fc3d9a287a372d3.bindTooltip(
                `&lt;div&gt;
                     이문동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dcb081934884bc68097331bf0a55df62 = L.marker(
                [37.6238104, 127.0123045],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dcb081934884bc68097331bf0a55df62.bindTooltip(
                `&lt;div&gt;
                     미양고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d3f598b39fa910f185653971037955f9 = L.marker(
                [37.4928281, 126.8993033],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d3f598b39fa910f185653971037955f9.bindTooltip(
                `&lt;div&gt;
                     구립대림2동제2경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_be527d4dfe199e09641e5e6671f59acc = L.marker(
                [37.5495336, 127.0739425],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_be527d4dfe199e09641e5e6671f59acc.bindTooltip(
                `&lt;div&gt;
                     세종대학교 군자관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa5f3b1cadb598b0576f7ed181b4e424 = L.marker(
                [37.5947552, 127.0914775],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_aa5f3b1cadb598b0576f7ed181b4e424.bindTooltip(
                `&lt;div&gt;
                     국일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2ba1bbdc24c22da68f0f4c6b3aff7c7d = L.marker(
                [37.512004, 126.8698309],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2ba1bbdc24c22da68f0f4c6b3aff7c7d.bindTooltip(
                `&lt;div&gt;
                     갈산초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_00b0b7acef07ddb5d9a50d98ab835e12 = L.marker(
                [37.5291893, 127.1224111],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_00b0b7acef07ddb5d9a50d98ab835e12.bindTooltip(
                `&lt;div&gt;
                     강동어린이회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb9ade3f7a7980f9bbc779b2c398b694 = L.marker(
                [37.5100593, 126.9054805],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bb9ade3f7a7980f9bbc779b2c398b694.bindTooltip(
                `&lt;div&gt;
                     영도교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dfec268132314b2f1b140be552a81806 = L.marker(
                [37.5671308, 127.0884969],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dfec268132314b2f1b140be552a81806.bindTooltip(
                `&lt;div&gt;
                     용곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_34e8299c23a9c47f9821b9662fed149a = L.marker(
                [37.5823401, 127.0965892],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_34e8299c23a9c47f9821b9662fed149a.bindTooltip(
                `&lt;div&gt;
                     면중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e7a4b1d9b693f399634b80340809e967 = L.marker(
                [37.4885999, 126.8950267],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e7a4b1d9b693f399634b80340809e967.bindTooltip(
                `&lt;div&gt;
                     영서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e8fbce1ca28d0fddbaa1f2c028a2181f = L.marker(
                [37.4953861, 126.9136334],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e8fbce1ca28d0fddbaa1f2c028a2181f.bindTooltip(
                `&lt;div&gt;
                     대방중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ba89d525deb22f7a2da73694f59dbbce = L.marker(
                [37.6732718, 127.0583984],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ba89d525deb22f7a2da73694f59dbbce.bindTooltip(
                `&lt;div&gt;
                     노원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8e1a59d455428a9169b122d75149a5fa = L.marker(
                [37.6020634, 127.0643509],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8e1a59d455428a9169b122d75149a5fa.bindTooltip(
                `&lt;div&gt;
                     이문초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2f7b0076156fa45afeda9311ce7c8597 = L.marker(
                [37.5473003, 127.1727125],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2f7b0076156fa45afeda9311ce7c8597.bindTooltip(
                `&lt;div&gt;
                     상일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_49e497c4fcd17076860bc20bac813207 = L.marker(
                [37.5377898, 127.1353379],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_49e497c4fcd17076860bc20bac813207.bindTooltip(
                `&lt;div&gt;
                     대세빌딩
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d10c8b4c66fc4c68a835ee6cd9ffb816 = L.marker(
                [37.5327075, 127.1304647],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d10c8b4c66fc4c68a835ee6cd9ffb816.bindTooltip(
                `&lt;div&gt;
                     한양감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0c369f6c4a345519fa0faa97d5d501a4 = L.marker(
                [37.557419, 126.8421586],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0c369f6c4a345519fa0faa97d5d501a4.bindTooltip(
                `&lt;div&gt;
                     원당 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_820081cd1ea0498f0f93d2b515fd2348 = L.marker(
                [37.5083753, 126.9112427],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_820081cd1ea0498f0f93d2b515fd2348.bindTooltip(
                `&lt;div&gt;
                     신길4동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1b702efd198c3d3d2ef408557fa8df9c = L.marker(
                [37.5006655, 126.9257597],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1b702efd198c3d3d2ef408557fa8df9c.bindTooltip(
                `&lt;div&gt;
                     대림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cb85d9af531e4b2b24635a7dba6b1229 = L.marker(
                [37.5401407, 126.8394751],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_cb85d9af531e4b2b24635a7dba6b1229.bindTooltip(
                `&lt;div&gt;
                     신월초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9e489fb80cdf3fe8402f4b0cb3bfe651 = L.marker(
                [37.6639745, 127.0475728],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9e489fb80cdf3fe8402f4b0cb3bfe651.bindTooltip(
                `&lt;div&gt;
                     도봉 문화고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_309b548bd0200c5ef1d33b34da2fb49a = L.marker(
                [37.5429926, 126.8459016],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_309b548bd0200c5ef1d33b34da2fb49a.bindTooltip(
                `&lt;div&gt;
                     화곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4a8fb5c52fd81f8a125d4f95c924fc58 = L.marker(
                [37.5858134, 126.9692374],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4a8fb5c52fd81f8a125d4f95c924fc58.bindTooltip(
                `&lt;div&gt;
                     청운초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e683fc5d97ec5a57478d6f3889508d6c = L.marker(
                [37.5756954, 127.0100232],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e683fc5d97ec5a57478d6f3889508d6c.bindTooltip(
                `&lt;div&gt;
                     창신제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ee91220d822ee52066bfca0249e4045b = L.marker(
                [37.6119005, 127.0003236],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ee91220d822ee52066bfca0249e4045b.bindTooltip(
                `&lt;div&gt;
                     창덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_afbf845fa49c3760f538763655d35644 = L.marker(
                [37.4876439, 127.144758],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_afbf845fa49c3760f538763655d35644.bindTooltip(
                `&lt;div&gt;
                     거원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a317ec72add052d78b636db77b18a68b = L.marker(
                [37.5154848, 126.8539328],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a317ec72add052d78b636db77b18a68b.bindTooltip(
                `&lt;div&gt;
                     남명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a3c854222644c14fef6bd51cbbbee71f = L.marker(
                [37.5386231, 126.9499885],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a3c854222644c14fef6bd51cbbbee71f.bindTooltip(
                `&lt;div&gt;
                     서울마포초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f052a54d9fbc75f373f4e87d4ceb64ee = L.marker(
                [37.5328602, 127.1333594],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f052a54d9fbc75f373f4e87d4ceb64ee.bindTooltip(
                `&lt;div&gt;
                     성내도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_092cfbaed13c3c82c1fb36e77cbe40f9 = L.marker(
                [37.5778373, 127.0156471],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_092cfbaed13c3c82c1fb36e77cbe40f9.bindTooltip(
                `&lt;div&gt;
                     숭인제1동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9227084604b15c6a77961c8550a18bc0 = L.marker(
                [37.5487396, 126.9363646],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9227084604b15c6a77961c8550a18bc0.bindTooltip(
                `&lt;div&gt;
                     광성중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d44fe3b300361bfebd07b27810515332 = L.marker(
                [37.5305307, 126.9241715],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d44fe3b300361bfebd07b27810515332.bindTooltip(
                `&lt;div&gt;
                     여의도순복음교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b8fd7e1c1337a64a27abdb6c444ee7c9 = L.marker(
                [37.4908348, 126.85656],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b8fd7e1c1337a64a27abdb6c444ee7c9.bindTooltip(
                `&lt;div&gt;
                     개봉2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5208bb8674533eb6e3542f9561af100f = L.marker(
                [37.5065938, 126.8584369],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5208bb8674533eb6e3542f9561af100f.bindTooltip(
                `&lt;div&gt;
                     고척2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f272baee6617f873eb36915296fed410 = L.marker(
                [37.5547801, 126.9394337],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f272baee6617f873eb36915296fed410.bindTooltip(
                `&lt;div&gt;
                     창천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3dcd6b4d194de8f0c6cc616042b3622c = L.marker(
                [37.5319345, 126.8994424],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3dcd6b4d194de8f0c6cc616042b3622c.bindTooltip(
                `&lt;div&gt;
                     당서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_49f12729471d7427b94127467602f957 = L.marker(
                [37.5952013, 127.0348931],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_49f12729471d7427b94127467602f957.bindTooltip(
                `&lt;div&gt;
                     숭례초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_93c4844e4790377fe5cde39cf635356c = L.marker(
                [37.5498945, 126.9639151],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_93c4844e4790377fe5cde39cf635356c.bindTooltip(
                `&lt;div&gt;
                     배문중고교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a6bbc43abbe593a1b26fe5beaa0374c3 = L.marker(
                [37.5524038, 126.9606038],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a6bbc43abbe593a1b26fe5beaa0374c3.bindTooltip(
                `&lt;div&gt;
                     서울소의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d8170051f3447db263bfcdc6ab3d1a8d = L.marker(
                [37.5484025, 126.9270708],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d8170051f3447db263bfcdc6ab3d1a8d.bindTooltip(
                `&lt;div&gt;
                     서강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a0ffaca1b5c3394cab39cc573a41dc7a = L.marker(
                [37.4889754, 126.9651091],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a0ffaca1b5c3394cab39cc573a41dc7a.bindTooltip(
                `&lt;div&gt;
                     신남성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fd7110b6f2571cfb5b7782cd866c6971 = L.marker(
                [37.4812536, 126.9557108],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fd7110b6f2571cfb5b7782cd866c6971.bindTooltip(
                `&lt;div&gt;
                     원당초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5e762a805dc3ab9b9e3a9650019ee408 = L.marker(
                [37.5580149, 126.9480389],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5e762a805dc3ab9b9e3a9650019ee408.bindTooltip(
                `&lt;div&gt;
                     대신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3629cfb8dd7bf02259040dc0da8fed35 = L.marker(
                [37.4854435, 126.9757561],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3629cfb8dd7bf02259040dc0da8fed35.bindTooltip(
                `&lt;div&gt;
                     사당청소년문화의집
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d6067a81461e99cc1b0837718fc79eb7 = L.marker(
                [37.5695395, 126.9167345],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d6067a81461e99cc1b0837718fc79eb7.bindTooltip(
                `&lt;div&gt;
                     남가좌1동 분회경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b49f052b0c39d896febd5a749bf53d53 = L.marker(
                [37.5938878, 126.9981205],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b49f052b0c39d896febd5a749bf53d53.bindTooltip(
                `&lt;div&gt;
                     성북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cfc0b4a72ed187ca2d5e3608ae7dd83a = L.marker(
                [37.5475162, 127.1362174],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_cfc0b4a72ed187ca2d5e3608ae7dd83a.bindTooltip(
                `&lt;div&gt;
                     천호초등학교 체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_304aa47da661f0748eccc248e5b6851d = L.marker(
                [37.5429207, 127.0802659],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_304aa47da661f0748eccc248e5b6851d.bindTooltip(
                `&lt;div&gt;
                     구의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_afde53cd653599ea829742f1ffbd5ad7 = L.marker(
                [37.5802312, 127.0660865],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_afde53cd653599ea829742f1ffbd5ad7.bindTooltip(
                `&lt;div&gt;
                     배봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3208a5ac4c502929371fad4d372c0ea1 = L.marker(
                [37.5463638, 127.1513797],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3208a5ac4c502929371fad4d372c0ea1.bindTooltip(
                `&lt;div&gt;
                     명일2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ce7790573b7e74110df70db9f6c467d = L.marker(
                [37.5462327, 127.1317431],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8ce7790573b7e74110df70db9f6c467d.bindTooltip(
                `&lt;div&gt;
                     천호2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_122095590347e1baeba9e5c766effd18 = L.marker(
                [37.5738977, 127.0729141],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_122095590347e1baeba9e5c766effd18.bindTooltip(
                `&lt;div&gt;
                     장평초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8fec6a8e906d13c48977fad9bb17eccd = L.marker(
                [37.5929209, 127.0657477],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8fec6a8e906d13c48977fad9bb17eccd.bindTooltip(
                `&lt;div&gt;
                     휘경1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_617646fe8bd219b47a129d3c2d60e0e1 = L.marker(
                [37.6040298, 127.0959992],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_617646fe8bd219b47a129d3c2d60e0e1.bindTooltip(
                `&lt;div&gt;
                     원광장애인복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_73d531741487ba093d65b8e1084d5d18 = L.marker(
                [37.6090393, 127.0736452],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_73d531741487ba093d65b8e1084d5d18.bindTooltip(
                `&lt;div&gt;
                     묵현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_11d31a9e12d0c87875d6676733989c6b = L.marker(
                [37.5644518, 127.0616104],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_11d31a9e12d0c87875d6676733989c6b.bindTooltip(
                `&lt;div&gt;
                     군자초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_21e45d4d4174b380d4671bd9191de579 = L.marker(
                [37.5637249, 127.0894857],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_21e45d4d4174b380d4671bd9191de579.bindTooltip(
                `&lt;div&gt;
                     대원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f309b5bd3cbd692975f442da042150e0 = L.marker(
                [37.5302178, 126.8514521],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f309b5bd3cbd692975f442da042150e0.bindTooltip(
                `&lt;div&gt;
                     일심 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e562da448bc206f01321039a244aab03 = L.marker(
                [37.5209583, 126.8714642],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e562da448bc206f01321039a244aab03.bindTooltip(
                `&lt;div&gt;
                     목동중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fbcfdff924ca0172b5fca460ea7f58e6 = L.marker(
                [37.4677782, 126.941466],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fbcfdff924ca0172b5fca460ea7f58e6.bindTooltip(
                `&lt;div&gt;
                     서울삼성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0527a739df0dc7a0178e8c97e634b862 = L.marker(
                [37.5771169, 127.0841899],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0527a739df0dc7a0178e8c97e634b862.bindTooltip(
                `&lt;div&gt;
                     산돌교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e2768062110402809d7d300c8c5485a9 = L.marker(
                [37.5880437, 126.9933924],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e2768062110402809d7d300c8c5485a9.bindTooltip(
                `&lt;div&gt;
                     성균관대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fff7a402f623d81f7b3b513d7a94b192 = L.marker(
                [37.5463987, 126.9336747],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fff7a402f623d81f7b3b513d7a94b192.bindTooltip(
                `&lt;div&gt;
                     신수중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7363f853de79f36ca9d4f6aa0a4b8737 = L.marker(
                [37.4827352, 126.9788914],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7363f853de79f36ca9d4f6aa0a4b8737.bindTooltip(
                `&lt;div&gt;
                     남사초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4d2cc1e034976925ad31e74a2d332af7 = L.marker(
                [37.5688885, 126.8069612],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4d2cc1e034976925ad31e74a2d332af7.bindTooltip(
                `&lt;div&gt;
                     방화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b520d98ab8bb91b3b6ef847a22349d89 = L.marker(
                [37.4969866, 127.0777533],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b520d98ab8bb91b3b6ef847a22349d89.bindTooltip(
                `&lt;div&gt;
                     대진초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9233f2bee3d799a04f88ebaaf66ad69f = L.marker(
                [37.4814125, 127.0861939],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9233f2bee3d799a04f88ebaaf66ad69f.bindTooltip(
                `&lt;div&gt;
                     대모초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a4dd9a3c7ab626f36fc462cc69b260b2 = L.marker(
                [37.5435354, 127.0488162],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a4dd9a3c7ab626f36fc462cc69b260b2.bindTooltip(
                `&lt;div&gt;
                     경일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5c9835d41d28063d3bbaf176ebf321c8 = L.marker(
                [37.5401648, 127.0804549],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5c9835d41d28063d3bbaf176ebf321c8.bindTooltip(
                `&lt;div&gt;
                     건국대학교부속고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4723d0498b2ec85c09312fbe4c20b829 = L.marker(
                [37.6599354, 127.0103193],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4723d0498b2ec85c09312fbe4c20b829.bindTooltip(
                `&lt;div&gt;
                     우이제일교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ad6325a46b2e233f2949df01a03adff3 = L.marker(
                [37.5625589, 126.9256035],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ad6325a46b2e233f2949df01a03adff3.bindTooltip(
                `&lt;div&gt;
                     일심교회(12층)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_357175caea5c561a23505d35b97629f2 = L.marker(
                [37.5286161, 126.8347999],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_357175caea5c561a23505d35b97629f2.bindTooltip(
                `&lt;div&gt;
                     곰달래경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c00e0c2428cf3d948b95b7cc028dccc9 = L.marker(
                [37.4954554, 126.9059717],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c00e0c2428cf3d948b95b7cc028dccc9.bindTooltip(
                `&lt;div&gt;
                     구립대림1경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0dec03e5a8086912c62fdc5c82f6ac66 = L.marker(
                [37.5095567, 126.8960031],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0dec03e5a8086912c62fdc5c82f6ac66.bindTooltip(
                `&lt;div&gt;
                     도림동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a4955b93088c7f43a77030e7901d39d6 = L.marker(
                [37.6140021, 127.0178188],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a4955b93088c7f43a77030e7901d39d6.bindTooltip(
                `&lt;div&gt;
                     길음초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ed4460368a257ef10364d47a54d42b28 = L.marker(
                [37.5525268, 127.1689205],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ed4460368a257ef10364d47a54d42b28.bindTooltip(
                `&lt;div&gt;
                     고일초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c5ae3a81098441f282174afe3d9d359a = L.marker(
                [37.5592958, 126.9305972],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c5ae3a81098441f282174afe3d9d359a.bindTooltip(
                `&lt;div&gt;
                     서강동주민센터 강당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e5e2f5138445ac859168fb28800505ba = L.marker(
                [37.5103395, 126.9451454],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e5e2f5138445ac859168fb28800505ba.bindTooltip(
                `&lt;div&gt;
                     강남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_de95e97843939c461e8cce47d9a1d057 = L.marker(
                [37.5651319, 127.034657],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_de95e97843939c461e8cce47d9a1d057.bindTooltip(
                `&lt;div&gt;
                     한국예술고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_652a1512d514e605253f0c148e64f0c2 = L.marker(
                [37.6058238, 127.0932408],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_652a1512d514e605253f0c148e64f0c2.bindTooltip(
                `&lt;div&gt;
                     신현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_164ff0fc76511ba07ed164eda4e7f95e = L.marker(
                [37.5325474, 127.1197653],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_164ff0fc76511ba07ed164eda4e7f95e.bindTooltip(
                `&lt;div&gt;
                     영파여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ddeb92207b4aee0cce40f28fae1389e1 = L.marker(
                [37.553557, 127.1575755],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ddeb92207b4aee0cce40f28fae1389e1.bindTooltip(
                `&lt;div&gt;
                     경희대동서신의학병원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_86a738d34a670836276bfefab39e7c89 = L.marker(
                [37.5324361, 127.1295584],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_86a738d34a670836276bfefab39e7c89.bindTooltip(
                `&lt;div&gt;
                     성내2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_30fd93d5cafa73a1c7ffaf7964c76955 = L.marker(
                [37.5717884, 127.0588047],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_30fd93d5cafa73a1c7ffaf7964c76955.bindTooltip(
                `&lt;div&gt;
                     신답교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_161eea8cc40fe13cd977f0a9e72f5fcb = L.marker(
                [37.5471039, 127.1016146],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_161eea8cc40fe13cd977f0a9e72f5fcb.bindTooltip(
                `&lt;div&gt;
                     광장중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_75e6afe91fa6eef2d37707c66b5612ec = L.marker(
                [37.6579022, 127.0466311],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_75e6afe91fa6eef2d37707c66b5612ec.bindTooltip(
                `&lt;div&gt;
                     서울자운초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_464f440d9dbd59d7f353419f864636cd = L.marker(
                [37.6090978, 127.0384271],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_464f440d9dbd59d7f353419f864636cd.bindTooltip(
                `&lt;div&gt;
                     숭인초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_01223ce543efa8a859fbd98bd8647a7b = L.marker(
                [37.5610494, 127.1665402],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_01223ce543efa8a859fbd98bd8647a7b.bindTooltip(
                `&lt;div&gt;
                     고덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c90eb19d79ea15ca5dde4eeb69a2febc = L.marker(
                [37.5583328, 126.9020726],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c90eb19d79ea15ca5dde4eeb69a2febc.bindTooltip(
                `&lt;div&gt;
                     동교초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8708bdec6ac198ac56b2e98d6d87996d = L.marker(
                [37.5949689, 127.0750076],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8708bdec6ac198ac56b2e98d6d87996d.bindTooltip(
                `&lt;div&gt;
                     중화2동 문화복지센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46f96d7e5a54a530f5a6fb56fe125a0b = L.marker(
                [37.487349, 126.9025454],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_46f96d7e5a54a530f5a6fb56fe125a0b.bindTooltip(
                `&lt;div&gt;
                     영림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_527605c9100035db2d6cec1b57ee26b0 = L.marker(
                [37.5656918, 126.9187633],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_527605c9100035db2d6cec1b57ee26b0.bindTooltip(
                `&lt;div&gt;
                     연서경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_38f0b44026124ce33e43b162e2cb892d = L.marker(
                [37.6411204, 127.0715826],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_38f0b44026124ce33e43b162e2cb892d.bindTooltip(
                `&lt;div&gt;
                     하계중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3388e254ec163cc7495adf0b835d610a = L.marker(
                [37.5051409, 126.9027647],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3388e254ec163cc7495adf0b835d610a.bindTooltip(
                `&lt;div&gt;
                     성락교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1df141606646434847cb8209ebc65de1 = L.marker(
                [37.4941903, 126.8739442],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1df141606646434847cb8209ebc65de1.bindTooltip(
                `&lt;div&gt;
                     구일고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_65a8c0b39dbb9243c7939fccf485ffac = L.marker(
                [37.5908104, 127.0553972],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_65a8c0b39dbb9243c7939fccf485ffac.bindTooltip(
                `&lt;div&gt;
                     회기동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_42a05f5459aed5d8a6a4fa36a969b60a = L.marker(
                [37.4887286, 126.9792404],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_42a05f5459aed5d8a6a4fa36a969b60a.bindTooltip(
                `&lt;div&gt;
                     사당2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d2caee8d4239462f9cf5e5030a162cad = L.marker(
                [37.4947492, 126.8903454],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d2caee8d4239462f9cf5e5030a162cad.bindTooltip(
                `&lt;div&gt;
                     구로중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8099563e19c17782b4445d217ae2aac7 = L.marker(
                [37.5460569, 127.0173401],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8099563e19c17782b4445d217ae2aac7.bindTooltip(
                `&lt;div&gt;
                     금옥초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f54ffbdfe401467ce2d20bb9eacb8ed = L.marker(
                [37.6036263, 127.1054342],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3f54ffbdfe401467ce2d20bb9eacb8ed.bindTooltip(
                `&lt;div&gt;
                     영란여자중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_25ac42e6d9eed4068560dd4f9808e32f = L.marker(
                [37.6087583, 127.0699198],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_25ac42e6d9eed4068560dd4f9808e32f.bindTooltip(
                `&lt;div&gt;
                     석계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9bc1a898f72faeeb3b90fea4cab1dd43 = L.marker(
                [37.4844111, 126.9756816],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9bc1a898f72faeeb3b90fea4cab1dd43.bindTooltip(
                `&lt;div&gt;
                     남성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8d8e6f6cf1ad1bb7bb9fc1b9140f939b = L.marker(
                [37.5252358, 126.9651413],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8d8e6f6cf1ad1bb7bb9fc1b9140f939b.bindTooltip(
                `&lt;div&gt;
                     한강초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca85defc614ac49736bce2355d1337c2 = L.marker(
                [37.5345552, 126.8367024],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ca85defc614ac49736bce2355d1337c2.bindTooltip(
                `&lt;div&gt;
                     월정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c142dfae511eaf612f8b50976a308d16 = L.marker(
                [37.5134385, 127.1205334],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c142dfae511eaf612f8b50976a308d16.bindTooltip(
                `&lt;div&gt;
                     방이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9974ab4ee4acd28fd93549d8f78d03fa = L.marker(
                [37.5577254, 126.9335888],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9974ab4ee4acd28fd93549d8f78d03fa.bindTooltip(
                `&lt;div&gt;
                     창서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3033b634db14f8a89bac2ade7982ae58 = L.marker(
                [37.5121764, 127.0394861],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3033b634db14f8a89bac2ade7982ae58.bindTooltip(
                `&lt;div&gt;
                     학동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9bb61db742c7c893bfe948d48e6a7652 = L.marker(
                [37.5694841, 126.9339245],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9bb61db742c7c893bfe948d48e6a7652.bindTooltip(
                `&lt;div&gt;
                     연희초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0ee897039dcd039630079f69273d3bcc = L.marker(
                [37.554986, 126.9251698],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0ee897039dcd039630079f69273d3bcc.bindTooltip(
                `&lt;div&gt;
                     서교초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c7bf9b6568c30b54686169e149b23dbe = L.marker(
                [37.5976555, 127.0759495],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c7bf9b6568c30b54686169e149b23dbe.bindTooltip(
                `&lt;div&gt;
                     수산교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_50b1ec0a434be9b8126af794b85db2e5 = L.marker(
                [37.5354546, 127.1251253],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_50b1ec0a434be9b8126af794b85db2e5.bindTooltip(
                `&lt;div&gt;
                     동안교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dee8b5460075ee07361ae3f0a61985a2 = L.marker(
                [37.5317333, 127.0308305],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dee8b5460075ee07361ae3f0a61985a2.bindTooltip(
                `&lt;div&gt;
                     압구정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_570f42da030210e0234c15851fee89d9 = L.marker(
                [37.6601773, 127.0435392],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_570f42da030210e0234c15851fee89d9.bindTooltip(
                `&lt;div&gt;
                     서울가인초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5de5f937faac6adb5c4be20d76c0d27a = L.marker(
                [37.489575, 126.8384794],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5de5f937faac6adb5c4be20d76c0d27a.bindTooltip(
                `&lt;div&gt;
                     오류남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9f2b662103c327196a3ecea2df1d7345 = L.marker(
                [37.4813414, 126.8934878],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9f2b662103c327196a3ecea2df1d7345.bindTooltip(
                `&lt;div&gt;
                     가리봉동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_955dc2ad35adf686564f5e446fab2ce2 = L.marker(
                [37.4628024, 126.9328282],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_955dc2ad35adf686564f5e446fab2ce2.bindTooltip(
                `&lt;div&gt;
                     신우초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7d14254690798c282f7a3f30a4b7deae = L.marker(
                [37.5097323, 126.8975167],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7d14254690798c282f7a3f30a4b7deae.bindTooltip(
                `&lt;div&gt;
                     구립모랫말 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4f8dbe337ee13af2aa1669190ef6aabb = L.marker(
                [37.5909504, 127.0014038],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4f8dbe337ee13af2aa1669190ef6aabb.bindTooltip(
                `&lt;div&gt;
                     경산중고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c2a26958b8647eb0df581ccf88a4f093 = L.marker(
                [37.5217447, 126.99233],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c2a26958b8647eb0df581ccf88a4f093.bindTooltip(
                `&lt;div&gt;
                     서빙고초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9333c7a25a5b546fe7d2f93affc47364 = L.marker(
                [37.5381508, 126.89628],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9333c7a25a5b546fe7d2f93affc47364.bindTooltip(
                `&lt;div&gt;
                     구립양평4가 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fc736a44d3d596a6ab19dcc9af73bd96 = L.marker(
                [37.6669473, 127.0533922],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fc736a44d3d596a6ab19dcc9af73bd96.bindTooltip(
                `&lt;div&gt;
                     상경중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0b179a952ec1232861ea5f7249a57866 = L.marker(
                [37.5332002, 127.0895409],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0b179a952ec1232861ea5f7249a57866.bindTooltip(
                `&lt;div&gt;
                     성동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8f749a10b90bdf6606d6d657d3fc5a01 = L.marker(
                [37.5665944, 127.0709207],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8f749a10b90bdf6606d6d657d3fc5a01.bindTooltip(
                `&lt;div&gt;
                     장평중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3f16dd1effa2d3f4e01d4acb30f6db60 = L.marker(
                [37.6282778, 127.0281832],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3f16dd1effa2d3f4e01d4acb30f6db60.bindTooltip(
                `&lt;div&gt;
                     신일중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6fa1493793e6c702c8bd9a1e7ff89616 = L.marker(
                [37.5070763, 127.0843785],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6fa1493793e6c702c8bd9a1e7ff89616.bindTooltip(
                `&lt;div&gt;
                     서울잠전초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_275e8c90fca74a3a0bb125ad7d6e31d6 = L.marker(
                [37.6028284, 127.076179],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_275e8c90fca74a3a0bb125ad7d6e31d6.bindTooltip(
                `&lt;div&gt;
                     중화2동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5972bdccd141fe309dc5b9dbc46a9163 = L.marker(
                [37.5719601, 127.0170331],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5972bdccd141fe309dc5b9dbc46a9163.bindTooltip(
                `&lt;div&gt;
                     숭신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6789d6617ecb14ba332ab382ee6416b3 = L.marker(
                [37.5003451, 127.1197627],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6789d6617ecb14ba332ab382ee6416b3.bindTooltip(
                `&lt;div&gt;
                     신가초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2310e952fac5bce61904f68536ae5cb5 = L.marker(
                [37.539829, 127.129843],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2310e952fac5bce61904f68536ae5cb5.bindTooltip(
                `&lt;div&gt;
                     천호3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e1dbe039e802cfc2e7dbcab2ec645f9e = L.marker(
                [37.5582034, 127.0451217],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e1dbe039e802cfc2e7dbcab2ec645f9e.bindTooltip(
                `&lt;div&gt;
                     한양사범대
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8caa46b8410e333c13d829e222dd421a = L.marker(
                [37.5319806, 127.0896252],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8caa46b8410e333c13d829e222dd421a.bindTooltip(
                `&lt;div&gt;
                     광진중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6accb01b1477eaf5b0b047787f124ad1 = L.marker(
                [37.6641576, 127.0318296],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6accb01b1477eaf5b0b047787f124ad1.bindTooltip(
                `&lt;div&gt;
                     서울방학초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_82b6c069f7022e5c645dd1f72b8e92f0 = L.marker(
                [37.4936434, 127.0811545],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_82b6c069f7022e5c645dd1f72b8e92f0.bindTooltip(
                `&lt;div&gt;
                     중동고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0b230017d5324e6a4becf0ef04ec618c = L.marker(
                [37.5554822, 127.141504],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0b230017d5324e6a4becf0ef04ec618c.bindTooltip(
                `&lt;div&gt;
                     강동롯데캐슬경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dcbd1034522b6ef40a121b3db2c87dd4 = L.marker(
                [37.5304747, 127.1224752],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dcbd1034522b6ef40a121b3db2c87dd4.bindTooltip(
                `&lt;div&gt;
                     성내1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ee5fc8e29abade6e5204280f2f9bcb75 = L.marker(
                [37.5655809, 126.9237706],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ee5fc8e29abade6e5204280f2f9bcb75.bindTooltip(
                `&lt;div&gt;
                     연동경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_77229b27ba7a93667fc45ab936bcd783 = L.marker(
                [37.5328907, 126.8526634],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_77229b27ba7a93667fc45ab936bcd783.bindTooltip(
                `&lt;div&gt;
                     신정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_374c5f8d1cde34002259c6666ad1bfa8 = L.marker(
                [37.5389557, 126.8557082],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_374c5f8d1cde34002259c6666ad1bfa8.bindTooltip(
                `&lt;div&gt;
                     신곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3dfb6fb0814005f5c96dee12c79a219f = L.marker(
                [37.4595098, 126.8875085],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3dfb6fb0814005f5c96dee12c79a219f.bindTooltip(
                `&lt;div&gt;
                     안천중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ae163fca85407996779d876763123c78 = L.marker(
                [37.4722792, 126.9406116],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ae163fca85407996779d876763123c78.bindTooltip(
                `&lt;div&gt;
                     서림경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_325ad67a0c13e730d7cc5aeb27cadaa4 = L.marker(
                [37.4837549, 127.0464755],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_325ad67a0c13e730d7cc5aeb27cadaa4.bindTooltip(
                `&lt;div&gt;
                     도곡2문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8dd196007467f33ebe83408133e9668c = L.marker(
                [37.5000383, 126.8510764],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8dd196007467f33ebe83408133e9668c.bindTooltip(
                `&lt;div&gt;
                     개봉1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b84baecb6d9057863aecf23cd2e0a79a = L.marker(
                [37.4860026, 126.8538531],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b84baecb6d9057863aecf23cd2e0a79a.bindTooltip(
                `&lt;div&gt;
                     개봉3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_51163605a1eb662f262447904b2259ff = L.marker(
                [37.5228069, 126.8721454],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_51163605a1eb662f262447904b2259ff.bindTooltip(
                `&lt;div&gt;
                     목동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_24ca2f9d65cf343145b246081391657e = L.marker(
                [37.5408474, 126.8343592],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_24ca2f9d65cf343145b246081391657e.bindTooltip(
                `&lt;div&gt;
                     수명 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dc7613aa6cde2a27ca749e2cf1b3932d = L.marker(
                [37.4966431, 126.9090679],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dc7613aa6cde2a27ca749e2cf1b3932d.bindTooltip(
                `&lt;div&gt;
                     우성3차아파트 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_219ebf20c809710cb09818950ecb5cfe = L.marker(
                [37.5697848, 126.81391],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_219ebf20c809710cb09818950ecb5cfe.bindTooltip(
                `&lt;div&gt;
                     방화구립 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_534fc92550002112e110cf2de6f00463 = L.marker(
                [37.5799535, 126.9178553],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_534fc92550002112e110cf2de6f00463.bindTooltip(
                `&lt;div&gt;
                     연가초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_db6a575064bf79905389702f31c31460 = L.marker(
                [37.4983656, 126.8424497],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_db6a575064bf79905389702f31c31460.bindTooltip(
                `&lt;div&gt;
                     오류초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6b33fcb0829bf3b3bf5a157fcb80296f = L.marker(
                [37.4978787, 126.8958527],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6b33fcb0829bf3b3bf5a157fcb80296f.bindTooltip(
                `&lt;div&gt;
                     영남중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7aa4a274ff73e65de0126a1db0f11950 = L.marker(
                [37.5923035, 127.0559615],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7aa4a274ff73e65de0126a1db0f11950.bindTooltip(
                `&lt;div&gt;
                     청량초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7c1601f1bff3efa08dee6418fcf23333 = L.marker(
                [37.5646332, 127.0512329],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7c1601f1bff3efa08dee6418fcf23333.bindTooltip(
                `&lt;div&gt;
                     성답교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c9292c803c2267aed7f1990d416b7f38 = L.marker(
                [37.479212, 126.8944985],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c9292c803c2267aed7f1990d416b7f38.bindTooltip(
                `&lt;div&gt;
                     연희미용고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_335897870b88b8e65a022f2a4245c1ac = L.marker(
                [37.5237687, 126.8616908],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_335897870b88b8e65a022f2a4245c1ac.bindTooltip(
                `&lt;div&gt;
                     양목초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_46bcafd83ef246628776f1c3f66eb4cc = L.marker(
                [37.4857776, 126.8933053],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_46bcafd83ef246628776f1c3f66eb4cc.bindTooltip(
                `&lt;div&gt;
                     구로3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8ebf272ea83c1490a763d43436d68314 = L.marker(
                [37.5524501, 126.9197762],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8ebf272ea83c1490a763d43436d68314.bindTooltip(
                `&lt;div&gt;
                     서교동교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9957862fa2da6d75e74c6bd74f915bac = L.marker(
                [37.5185604, 126.8935426],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9957862fa2da6d75e74c6bd74f915bac.bindTooltip(
                `&lt;div&gt;
                     문래초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2dae8977c21df04f80463e78c10dce06 = L.marker(
                [37.521834, 126.8825947],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2dae8977c21df04f80463e78c10dce06.bindTooltip(
                `&lt;div&gt;
                     관악고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d3c8300211e1666120d73d1ad23f14ba = L.marker(
                [37.4849993, 126.8908446],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d3c8300211e1666120d73d1ad23f14ba.bindTooltip(
                `&lt;div&gt;
                     서울구로남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca756376382677d19e3c80b6f621f417 = L.marker(
                [37.4987497, 126.901185],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ca756376382677d19e3c80b6f621f417.bindTooltip(
                `&lt;div&gt;
                     도신초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4d1bbc05da5b84e213d956cf095fc18b = L.marker(
                [37.5634175, 126.9190284],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4d1bbc05da5b84e213d956cf095fc18b.bindTooltip(
                `&lt;div&gt;
                     경성고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_73df59ba8f446922ac4da1709775d05c = L.marker(
                [37.5398815, 126.8700818],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_73df59ba8f446922ac4da1709775d05c.bindTooltip(
                `&lt;div&gt;
                     새말경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8f37e8f60d30633ceef48e6bfff6309a = L.marker(
                [37.568497, 127.0062461],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8f37e8f60d30633ceef48e6bfff6309a.bindTooltip(
                `&lt;div&gt;
                     중구민회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_002abcbd20b6157c0951ceb657f27943 = L.marker(
                [37.4622696, 126.9175362],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_002abcbd20b6157c0951ceb657f27943.bindTooltip(
                `&lt;div&gt;
                     난향초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_aa567926b357e9c7f88478629301fcd4 = L.marker(
                [37.5456165, 126.9428183],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_aa567926b357e9c7f88478629301fcd4.bindTooltip(
                `&lt;div&gt;
                     태영 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_957471a1beaaaea3c96395cedc541e45 = L.marker(
                [37.6388225, 127.0150457],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_957471a1beaaaea3c96395cedc541e45.bindTooltip(
                `&lt;div&gt;
                     우이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_450b71ee97d053b641f188456a33d68d = L.marker(
                [37.4961983, 127.1432261],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_450b71ee97d053b641f188456a33d68d.bindTooltip(
                `&lt;div&gt;
                     영풍초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_baee03fa01bbcc1e730f73c98de316ba = L.marker(
                [37.4850743, 127.1279596],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_baee03fa01bbcc1e730f73c98de316ba.bindTooltip(
                `&lt;div&gt;
                     문덕초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a0ff7a16cd4a0ff8bfcd787ab402a41c = L.marker(
                [37.5140066, 127.0950468],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a0ff7a16cd4a0ff8bfcd787ab402a41c.bindTooltip(
                `&lt;div&gt;
                     신천초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4a02c559d11940c7624cdcc13138b794 = L.marker(
                [37.5418647, 127.0152648],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4a02c559d11940c7624cdcc13138b794.bindTooltip(
                `&lt;div&gt;
                     옥정초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ba04fde8438b7855ba044e4c5707f742 = L.marker(
                [37.6458954, 127.0062436],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ba04fde8438b7855ba044e4c5707f742.bindTooltip(
                `&lt;div&gt;
                     강북청소년수련관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_74bf5b8b9ac2d491c7d2315caf161ccf = L.marker(
                [37.588121, 127.0562553],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_74bf5b8b9ac2d491c7d2315caf161ccf.bindTooltip(
                `&lt;div&gt;
                     휘경2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_61dd898ca2659ef3994c2e2898f00f1e = L.marker(
                [37.616224, 127.0154254],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_61dd898ca2659ef3994c2e2898f00f1e.bindTooltip(
                `&lt;div&gt;
                     삼각산중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9225ae9c779bc65ac75f406876f70ec4 = L.marker(
                [37.5029317, 127.1045978],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9225ae9c779bc65ac75f406876f70ec4.bindTooltip(
                `&lt;div&gt;
                     석촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_81ddc901467604606cb22ff4f7089c9d = L.marker(
                [37.4959523, 127.1299459],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_81ddc901467604606cb22ff4f7089c9d.bindTooltip(
                `&lt;div&gt;
                     송파중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bb55473b1602c8085c467b467f64daf4 = L.marker(
                [37.6033412, 126.9609868],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bb55473b1602c8085c467b467f64daf4.bindTooltip(
                `&lt;div&gt;
                     세검정초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3b5fb805d196aeab9da67f9f5794f14e = L.marker(
                [37.5001442, 126.8621388],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3b5fb805d196aeab9da67f9f5794f14e.bindTooltip(
                `&lt;div&gt;
                     고척중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c741072e081f29b38d09cfd165228d62 = L.marker(
                [37.6309352, 127.0201095],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c741072e081f29b38d09cfd165228d62.bindTooltip(
                `&lt;div&gt;
                     수유초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8e729d019eb2e9cb608dd2bdcdd2d0d2 = L.marker(
                [37.5093623, 127.1319795],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8e729d019eb2e9cb608dd2bdcdd2d0d2.bindTooltip(
                `&lt;div&gt;
                     오금초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_26c234512ab0dbdb73d1cdcf76d27f7c = L.marker(
                [37.538643, 126.965921],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_26c234512ab0dbdb73d1cdcf76d27f7c.bindTooltip(
                `&lt;div&gt;
                     원효1동자치회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3ef06540bce21285bd4588c8d3ed22f8 = L.marker(
                [37.4974211, 126.9539659],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3ef06540bce21285bd4588c8d3ed22f8.bindTooltip(
                `&lt;div&gt;
                     고경경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6a6434a5a61a981c4883bb297c4c8763 = L.marker(
                [37.6549766, 127.0260305],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6a6434a5a61a981c4883bb297c4c8763.bindTooltip(
                `&lt;div&gt;
                     서울동북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_13a0c58db5a1de2a9361c30b5a942740 = L.marker(
                [37.5047211, 127.1293523],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_13a0c58db5a1de2a9361c30b5a942740.bindTooltip(
                `&lt;div&gt;
                     오금고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c05b8406aa0987ab95ddf459293402e9 = L.marker(
                [37.5801672, 126.9083741],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c05b8406aa0987ab95ddf459293402e9.bindTooltip(
                `&lt;div&gt;
                     신가경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_569180c5ec30acaaa63043192f0ab36f = L.marker(
                [37.5638685, 126.9514498],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_569180c5ec30acaaa63043192f0ab36f.bindTooltip(
                `&lt;div&gt;
                     대한예수교장로회 북아현교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9027d007856af7c9281eb93919205eab = L.marker(
                [37.5746144, 127.054402],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9027d007856af7c9281eb93919205eab.bindTooltip(
                `&lt;div&gt;
                     전농초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fb476b582cc82df9af584a0c5f123f8f = L.marker(
                [37.5577433, 126.9588344],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fb476b582cc82df9af584a0c5f123f8f.bindTooltip(
                `&lt;div&gt;
                     아현감리교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_754de4c914a8bb3e5a4fb37f2d4dc32e = L.marker(
                [37.5177426, 126.9877673],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_754de4c914a8bb3e5a4fb37f2d4dc32e.bindTooltip(
                `&lt;div&gt;
                     신동아(아)관리사무소
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c92760d2c2cb8727fbd9f78d8b86f039 = L.marker(
                [37.4619494, 127.0512045],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c92760d2c2cb8727fbd9f78d8b86f039.bindTooltip(
                `&lt;div&gt;
                     내곡동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0bbfe9c1cb00daa5baacedaf5ee497a4 = L.marker(
                [37.622368, 127.0836409],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0bbfe9c1cb00daa5baacedaf5ee497a4.bindTooltip(
                `&lt;div&gt;
                     공릉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e874664305fb3f3883b2c38bb499b616 = L.marker(
                [37.5378318, 127.1226778],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e874664305fb3f3883b2c38bb499b616.bindTooltip(
                `&lt;div&gt;
                     광성교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4624599cba1a005c10b150417028aa29 = L.marker(
                [37.6627426, 127.0625315],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4624599cba1a005c10b150417028aa29.bindTooltip(
                `&lt;div&gt;
                     상곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d149f2995a7852bdb67ed4ba24aed592 = L.marker(
                [37.548234, 127.1481451],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d149f2995a7852bdb67ed4ba24aed592.bindTooltip(
                `&lt;div&gt;
                     명성교회 예루살렘관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5393818cebf49a6cc634acb7611e1d4d = L.marker(
                [37.5361261, 127.1353799],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5393818cebf49a6cc634acb7611e1d4d.bindTooltip(
                `&lt;div&gt;
                     강동성심병원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_082afc5a69adc0bcb8c4cac8d3143330 = L.marker(
                [37.5582216, 127.0844446],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_082afc5a69adc0bcb8c4cac8d3143330.bindTooltip(
                `&lt;div&gt;
                     용마초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a4c7bddd13dd5728a8da34d0a8605e30 = L.marker(
                [37.5742948, 127.0859627],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a4c7bddd13dd5728a8da34d0a8605e30.bindTooltip(
                `&lt;div&gt;
                     용마중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e8b9fea807b478fad57b1f80888ea96f = L.marker(
                [37.5305076, 127.1186391],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e8b9fea807b478fad57b1f80888ea96f.bindTooltip(
                `&lt;div&gt;
                     풍납동 천주교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_74117db0ce66584ef9bf71f6132a28fc = L.marker(
                [37.5573111, 127.0235263],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_74117db0ce66584ef9bf71f6132a28fc.bindTooltip(
                `&lt;div&gt;
                     금북초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_cb735fdc220e003bb9011ab5efb20209 = L.marker(
                [37.6496153, 127.0333463],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_cb735fdc220e003bb9011ab5efb20209.bindTooltip(
                `&lt;div&gt;
                     신도봉중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_23ae77254b1389331dda9c6389411f1f = L.marker(
                [37.5426916, 126.9459951],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_23ae77254b1389331dda9c6389411f1f.bindTooltip(
                `&lt;div&gt;
                     염리초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_159176c61a567610baceff7d622879a0 = L.marker(
                [37.5334763, 126.9713117],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_159176c61a567610baceff7d622879a0.bindTooltip(
                `&lt;div&gt;
                     삼각교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_00910bb93062808bf444159421db67fa = L.marker(
                [37.5761096, 127.0303341],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_00910bb93062808bf444159421db67fa.bindTooltip(
                `&lt;div&gt;
                     용신동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b220b3a70ef51a730f9013bdd70501cd = L.marker(
                [37.6428859, 127.0096097],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b220b3a70ef51a730f9013bdd70501cd.bindTooltip(
                `&lt;div&gt;
                     인수초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_42d44fbb47e0f3181610ebd57ad7cc3f = L.marker(
                [37.4690573, 127.1069329],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_42d44fbb47e0f3181610ebd57ad7cc3f.bindTooltip(
                `&lt;div&gt;
                     세곡문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7cb288452f0151395b74ea0b24cd9972 = L.marker(
                [37.5420908, 126.9427266],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7cb288452f0151395b74ea0b24cd9972.bindTooltip(
                `&lt;div&gt;
                     선민교회(지하1층)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_64c59b8d6e96765978d3b10998bc16a3 = L.marker(
                [37.5784794, 127.0706106],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_64c59b8d6e96765978d3b10998bc16a3.bindTooltip(
                `&lt;div&gt;
                     장안2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_abfb590e8a6610f8338192c6484db52e = L.marker(
                [37.6292746, 127.0404438],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_abfb590e8a6610f8338192c6484db52e.bindTooltip(
                `&lt;div&gt;
                     번동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3c902deec106f57ec181320bf6d8ceb1 = L.marker(
                [37.5761546, 127.0288143],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3c902deec106f57ec181320bf6d8ceb1.bindTooltip(
                `&lt;div&gt;
                     용두초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dc2eba65bee7c54a9e3d87235f0e53c2 = L.marker(
                [37.537151, 126.9676884],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dc2eba65bee7c54a9e3d87235f0e53c2.bindTooltip(
                `&lt;div&gt;
                     용산문화체육센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_95d5f7ca2a230ec85ab7318849104b10 = L.marker(
                [37.5796863, 126.8824442],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_95d5f7ca2a230ec85ab7318849104b10.bindTooltip(
                `&lt;div&gt;
                     상지초등학교(체육관)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b8e2da2586945c514433721082ec9c18 = L.marker(
                [37.5497679, 127.1460008],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b8e2da2586945c514433721082ec9c18.bindTooltip(
                `&lt;div&gt;
                     명일1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8fdb7a4059a490f4f7707ad8c6d8c078 = L.marker(
                [37.5205741, 126.8623063],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8fdb7a4059a490f4f7707ad8c6d8c078.bindTooltip(
                `&lt;div&gt;
                     신서초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_da537c202e2825bdbe4b7e285b4daf1e = L.marker(
                [37.4759632, 127.0531898],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_da537c202e2825bdbe4b7e285b4daf1e.bindTooltip(
                `&lt;div&gt;
                     포이초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_62afe8086549b485373df3e7573969d0 = L.marker(
                [37.5340451, 126.860835],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_62afe8086549b485373df3e7573969d0.bindTooltip(
                `&lt;div&gt;
                     무지개 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccb9ced14b1de16a108cebaf873d5d45 = L.marker(
                [37.5443423, 126.9380392],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ccb9ced14b1de16a108cebaf873d5d45.bindTooltip(
                `&lt;div&gt;
                     신석초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_872cd4a09324617957371c2ec38e9d35 = L.marker(
                [37.5534721, 127.0991421],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_872cd4a09324617957371c2ec38e9d35.bindTooltip(
                `&lt;div&gt;
                     동의초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4a18e2e23309220abe7b6b6e480b15f9 = L.marker(
                [37.6054224, 126.9669364],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4a18e2e23309220abe7b6b6e480b15f9.bindTooltip(
                `&lt;div&gt;
                     평창동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_49b97ebffffe8afd4ac23db67fe75d60 = L.marker(
                [37.5130898, 126.9560632],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_49b97ebffffe8afd4ac23db67fe75d60.bindTooltip(
                `&lt;div&gt;
                     현장민원실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1b94729cca37e4253a6b8f53e387d628 = L.marker(
                [37.5520498, 126.8332228],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1b94729cca37e4253a6b8f53e387d628.bindTooltip(
                `&lt;div&gt;
                     발음 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9bc749ae8d67b315a259036c32a62d1d = L.marker(
                [37.5024475, 127.1188974],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9bc749ae8d67b315a259036c32a62d1d.bindTooltip(
                `&lt;div&gt;
                     가락중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0530bc6c97f2c7c2a3a5a56a7c308f10 = L.marker(
                [37.5198535, 127.0451261],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0530bc6c97f2c7c2a3a5a56a7c308f10.bindTooltip(
                `&lt;div&gt;
                     언북초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0d85a04e589cf3e3a87c703faa24ad22 = L.marker(
                [37.5738682, 126.9352474],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0d85a04e589cf3e3a87c703faa24ad22.bindTooltip(
                `&lt;div&gt;
                     연희동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_bc6ea9cc46e54c208986c3cc11ae09c3 = L.marker(
                [37.5564413, 127.157416],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_bc6ea9cc46e54c208986c3cc11ae09c3.bindTooltip(
                `&lt;div&gt;
                     온조대왕문화체육관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_43f071cd37f11ec3056fc414c10b7368 = L.marker(
                [37.4963062, 126.9893434],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_43f071cd37f11ec3056fc414c10b7368.bindTooltip(
                `&lt;div&gt;
                     서울 서래 초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f393f88cbecae4430dd21335dd260140 = L.marker(
                [37.6047239, 127.1001116],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f393f88cbecae4430dd21335dd260140.bindTooltip(
                `&lt;div&gt;
                     신내초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f2804ef0e416a9439515da1beacf8080 = L.marker(
                [37.5223266, 126.9946441],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f2804ef0e416a9439515da1beacf8080.bindTooltip(
                `&lt;div&gt;
                     동빙고교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_149e3f74543288a45a5edb3e6e570329 = L.marker(
                [37.499388, 126.9096651],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_149e3f74543288a45a5edb3e6e570329.bindTooltip(
                `&lt;div&gt;
                     신길6동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8c05c475b579088ff7aaaaa737c31f28 = L.marker(
                [37.6162441, 127.0949148],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8c05c475b579088ff7aaaaa737c31f28.bindTooltip(
                `&lt;div&gt;
                     신내노인요양원
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1e3bb7e0c49b7ba30e3620c3bdf0f767 = L.marker(
                [37.4913961, 126.8832763],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1e3bb7e0c49b7ba30e3620c3bdf0f767.bindTooltip(
                `&lt;div&gt;
                     구로2동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a52c0747ace787ad58779bab720d313f = L.marker(
                [37.4903019, 126.9297162],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a52c0747ace787ad58779bab720d313f.bindTooltip(
                `&lt;div&gt;
                     서울당곡초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b061e48523696d27f4caf3a52bc0183f = L.marker(
                [37.5485578, 126.8287486],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b061e48523696d27f4caf3a52bc0183f.bindTooltip(
                `&lt;div&gt;
                     덕원중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2b4a6035cc1c4bf7d25d1973558549bb = L.marker(
                [37.4896987, 126.8583711],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2b4a6035cc1c4bf7d25d1973558549bb.bindTooltip(
                `&lt;div&gt;
                     서울개봉초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9374b294d1e2427440e99922936c9f14 = L.marker(
                [37.5146754, 126.9093581],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9374b294d1e2427440e99922936c9f14.bindTooltip(
                `&lt;div&gt;
                     영등포본동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_db1fc44d9ea9b466966604b0ae964720 = L.marker(
                [37.5151499, 126.9194671],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_db1fc44d9ea9b466966604b0ae964720.bindTooltip(
                `&lt;div&gt;
                     신길교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ccdef3d16453b06f001fe73aef6a6695 = L.marker(
                [37.6232225, 127.0462397],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ccdef3d16453b06f001fe73aef6a6695.bindTooltip(
                `&lt;div&gt;
                     오현초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1f814b15ef9f85c8b894799e54f33523 = L.marker(
                [37.6628528, 127.0681084],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1f814b15ef9f85c8b894799e54f33523.bindTooltip(
                `&lt;div&gt;
                     계상초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1508141d1f2c6dc56981e95019bde54a = L.marker(
                [37.4828229, 126.8506416],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1508141d1f2c6dc56981e95019bde54a.bindTooltip(
                `&lt;div&gt;
                     서울개명초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_1acb4190a02418a3bc8bb53510aecba4 = L.marker(
                [37.4936638, 126.8998145],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_1acb4190a02418a3bc8bb53510aecba4.bindTooltip(
                `&lt;div&gt;
                     대동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_397d1d2e4073d739a213fb10e033e576 = L.marker(
                [37.5739006, 126.8078066],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_397d1d2e4073d739a213fb10e033e576.bindTooltip(
                `&lt;div&gt;
                     복종 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_eb6ce7479d991e5d2fed8653b01ee266 = L.marker(
                [37.4972518, 126.8859504],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_eb6ce7479d991e5d2fed8653b01ee266.bindTooltip(
                `&lt;div&gt;
                     구로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3e6eb8e6f545cdcade0e691baf6cdd82 = L.marker(
                [37.6279343, 127.0508453],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3e6eb8e6f545cdcade0e691baf6cdd82.bindTooltip(
                `&lt;div&gt;
                     월계초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7f7866a647aceb25b0a30831b0c0da4e = L.marker(
                [37.6074943, 127.0755131],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7f7866a647aceb25b0a30831b0c0da4e.bindTooltip(
                `&lt;div&gt;
                     신묵초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e3b5d727839882636e9fe7c15c4becb6 = L.marker(
                [37.5494364, 126.9057654],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e3b5d727839882636e9fe7c15c4becb6.bindTooltip(
                `&lt;div&gt;
                     합정동주민센터 (강당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_dacb9d75b9c0973d9ec43b66ff172c55 = L.marker(
                [37.503779, 126.9406755],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_dacb9d75b9c0973d9ec43b66ff172c55.bindTooltip(
                `&lt;div&gt;
                     장승중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e8fb908e5d9b0220a4ede901ba26bad8 = L.marker(
                [37.4810545, 126.8945545],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e8fb908e5d9b0220a4ede901ba26bad8.bindTooltip(
                `&lt;div&gt;
                     만민중앙선교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9b84c244bfca9320769eda8c61ca50ef = L.marker(
                [37.5186508, 126.9015654],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9b84c244bfca9320769eda8c61ca50ef.bindTooltip(
                `&lt;div&gt;
                     영남교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9526bc27402211062367f900165d47c6 = L.marker(
                [37.5176665, 126.9346068],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9526bc27402211062367f900165d47c6.bindTooltip(
                `&lt;div&gt;
                     여의동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6a374fce7ef03b0ef2b534b69cdcab41 = L.marker(
                [37.6526156, 127.0401785],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6a374fce7ef03b0ef2b534b69cdcab41.bindTooltip(
                `&lt;div&gt;
                     서울창원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3463b433377e0eb2b6a8b664b8afee9b = L.marker(
                [37.5608574, 126.9009887],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3463b433377e0eb2b6a8b664b8afee9b.bindTooltip(
                `&lt;div&gt;
                     망원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_547acbe369c503879ffe648ec6ee02f8 = L.marker(
                [37.5031645, 126.9600263],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_547acbe369c503879ffe648ec6ee02f8.bindTooltip(
                `&lt;div&gt;
                     은로초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a066e323753ea26d04112b41526d3986 = L.marker(
                [37.463921, 127.0516668],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a066e323753ea26d04112b41526d3986.bindTooltip(
                `&lt;div&gt;
                     서울 언남초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3d36ae560ecbd0fff83b06298ba7ac50 = L.marker(
                [37.6042154, 127.0750198],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3d36ae560ecbd0fff83b06298ba7ac50.bindTooltip(
                `&lt;div&gt;
                     한내들어린이집
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d83d8ebc9abafa82b626c0b634ab2ab = L.marker(
                [37.5503821, 127.1038409],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6d83d8ebc9abafa82b626c0b634ab2ab.bindTooltip(
                `&lt;div&gt;
                     장로회신학대학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_c1bc59d070657b73b909afde962b6a32 = L.marker(
                [37.6305229, 127.037686],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_c1bc59d070657b73b909afde962b6a32.bindTooltip(
                `&lt;div&gt;
                     웰빙스포츠센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b44f752441f55aaa4c01e080e6b28891 = L.marker(
                [37.6297145, 127.0687071],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b44f752441f55aaa4c01e080e6b28891.bindTooltip(
                `&lt;div&gt;
                     용원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9d0f2bd891e5c1ac73aaa274c9919bab = L.marker(
                [37.6640384, 127.0495224],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9d0f2bd891e5c1ac73aaa274c9919bab.bindTooltip(
                `&lt;div&gt;
                     서울창도초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2275d19ca9700b8c528ccfd624716b76 = L.marker(
                [37.5402148, 126.8768478],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2275d19ca9700b8c528ccfd624716b76.bindTooltip(
                `&lt;div&gt;
                     월촌초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0216e44886a3e884cfae3bf62f66ee42 = L.marker(
                [37.5043127, 126.896089],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0216e44886a3e884cfae3bf62f66ee42.bindTooltip(
                `&lt;div&gt;
                     대림정보문화도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e37dc8a7e57da43d0398bcb3e47615ff = L.marker(
                [37.494139, 126.8259846],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e37dc8a7e57da43d0398bcb3e47615ff.bindTooltip(
                `&lt;div&gt;
                     온수초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ee80966410e3887751c58ec5780f7491 = L.marker(
                [37.6676601, 127.0596237],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ee80966410e3887751c58ec5780f7491.bindTooltip(
                `&lt;div&gt;
                     상원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d339587206fbea9bfb23778f98994a0a = L.marker(
                [37.5103943, 126.8436566],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d339587206fbea9bfb23778f98994a0a.bindTooltip(
                `&lt;div&gt;
                     금옥중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_8c203ee54783eb7c13e6ef88c3dc49af = L.marker(
                [37.4869806, 127.0370764],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_8c203ee54783eb7c13e6ef88c3dc49af.bindTooltip(
                `&lt;div&gt;
                     언주초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_678cca5a65d53d965a8a811978fdfe0d = L.marker(
                [37.5007582, 126.8980828],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_678cca5a65d53d965a8a811978fdfe0d.bindTooltip(
                `&lt;div&gt;
                     수정성결교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_24d0c15c7a204d9ccbe744c9e3b07978 = L.marker(
                [37.5407467, 126.9611083],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_24d0c15c7a204d9ccbe744c9e3b07978.bindTooltip(
                `&lt;div&gt;
                     금양초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b4b9fe9ac20b219f68bf916ca067a0d8 = L.marker(
                [37.6432767, 127.0413972],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b4b9fe9ac20b219f68bf916ca067a0d8.bindTooltip(
                `&lt;div&gt;
                     서울창림초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9b9b62ed87579a2a967ee6d2479f21ae = L.marker(
                [37.5062024, 126.953443],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9b9b62ed87579a2a967ee6d2479f21ae.bindTooltip(
                `&lt;div&gt;
                     강남초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_6d63c7a7b76e1a95615a70d14dc2750b = L.marker(
                [37.6209013, 127.0246532],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_6d63c7a7b76e1a95615a70d14dc2750b.bindTooltip(
                `&lt;div&gt;
                     성암국제무역고
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_937acd77b8d0d2edb89f9a496f1e61f8 = L.marker(
                [37.4824203, 126.9649102],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_937acd77b8d0d2edb89f9a496f1e61f8.bindTooltip(
                `&lt;div&gt;
                     동작고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_d051abba1e0f6045c790eaee134aa60e = L.marker(
                [37.493046, 126.8758056],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_d051abba1e0f6045c790eaee134aa60e.bindTooltip(
                `&lt;div&gt;
                     구로1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_417d11467356467ac23a27e3b9f842cb = L.marker(
                [37.4942305, 126.9984975],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_417d11467356467ac23a27e3b9f842cb.bindTooltip(
                `&lt;div&gt;
                     방배중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f2d69bc932f534cc16abea404aa25af3 = L.marker(
                [37.491599, 127.1228021],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f2d69bc932f534cc16abea404aa25af3.bindTooltip(
                `&lt;div&gt;
                     평화초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f18e81b949e6959b0c91e213df2a452a = L.marker(
                [37.5978567, 126.9491956],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f18e81b949e6959b0c91e213df2a452a.bindTooltip(
                `&lt;div&gt;
                     홍성교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5987e5be013b52db624ffb912f8fc484 = L.marker(
                [37.5540565, 127.0694957],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5987e5be013b52db624ffb912f8fc484.bindTooltip(
                `&lt;div&gt;
                     송원초교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e743e8ad39c1b45245fbe7bbe5cf36cb = L.marker(
                [37.5845501, 127.0952576],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e743e8ad39c1b45245fbe7bbe5cf36cb.bindTooltip(
                `&lt;div&gt;
                     중화중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9fb96203ef774139fce756e9f7191371 = L.marker(
                [37.5075802, 126.9288845],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9fb96203ef774139fce756e9f7191371.bindTooltip(
                `&lt;div&gt;
                     숭의여자고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e0e0fce48305986f7150fdaf2c443124 = L.marker(
                [37.5228929, 126.9964304],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e0e0fce48305986f7150fdaf2c443124.bindTooltip(
                `&lt;div&gt;
                     동빙고할머니경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0176c67ce4c31ec8a017035f2eafcb13 = L.marker(
                [37.5554785, 126.962078],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0176c67ce4c31ec8a017035f2eafcb13.bindTooltip(
                `&lt;div&gt;
                     평강교회
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f435e761a54717a6a1075d0946c3ec53 = L.marker(
                [37.5837333, 127.034679],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f435e761a54717a6a1075d0946c3ec53.bindTooltip(
                `&lt;div&gt;
                     제기동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_354e89517d8329b9847056d89211a18e = L.marker(
                [37.5406167, 127.138015],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_354e89517d8329b9847056d89211a18e.bindTooltip(
                `&lt;div&gt;
                     천동초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9000594333744f7f1e161ab59e6e6352 = L.marker(
                [37.5234889, 127.1367425],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9000594333744f7f1e161ab59e6e6352.bindTooltip(
                `&lt;div&gt;
                     둔촌1동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0ba5df5cb0e21538dbda7e0c3e33f661 = L.marker(
                [37.5172677, 127.037204],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0ba5df5cb0e21538dbda7e0c3e33f661.bindTooltip(
                `&lt;div&gt;
                     논현2문화복지회관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2c222372627cffd8d09b591ee87fb5a8 = L.marker(
                [37.536319, 127.1331341],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2c222372627cffd8d09b591ee87fb5a8.bindTooltip(
                `&lt;div&gt;
                     현강여자정보고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_860466e9dc965d1a0813d2b575b42050 = L.marker(
                [37.5346363, 127.1179289],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_860466e9dc965d1a0813d2b575b42050.bindTooltip(
                `&lt;div&gt;
                     풍납초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5fa10f64604e33f5994d91ae4d46e58f = L.marker(
                [37.5011807, 127.0490386],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5fa10f64604e33f5994d91ae4d46e58f.bindTooltip(
                `&lt;div&gt;
                     도성초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_7fa12fe483e750c13330967bbe407e6f = L.marker(
                [37.6170846, 127.0313824],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_7fa12fe483e750c13330967bbe407e6f.bindTooltip(
                `&lt;div&gt;
                     송중초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_fe0ae9b0e5bb145e2b7cfc7ba1156ffc = L.marker(
                [37.5862863, 127.0472981],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_fe0ae9b0e5bb145e2b7cfc7ba1156ffc.bindTooltip(
                `&lt;div&gt;
                     청량리동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_b713aeef9ade2875095fc7de3f132276 = L.marker(
                [37.5432392, 126.8414093],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_b713aeef9ade2875095fc7de3f132276.bindTooltip(
                `&lt;div&gt;
                     봉바위 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_62b59823455fc20bc47d26491bfcbdbb = L.marker(
                [37.5159112, 126.8558493],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_62b59823455fc20bc47d26491bfcbdbb.bindTooltip(
                `&lt;div&gt;
                     신서중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_ca825a8f04e38c07f7ad63bd0109b368 = L.marker(
                [37.5541789, 126.8401206],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_ca825a8f04e38c07f7ad63bd0109b368.bindTooltip(
                `&lt;div&gt;
                     내발산 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_501ec6ef1733f16910b55a94f4523a63 = L.marker(
                [37.5707334, 126.9064934],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_501ec6ef1733f16910b55a94f4523a63.bindTooltip(
                `&lt;div&gt;
                     낙루경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_5a94f4c265d66d66486beb2689dcb66a = L.marker(
                [37.5380327, 126.8385413],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_5a94f4c265d66d66486beb2689dcb66a.bindTooltip(
                `&lt;div&gt;
                     공원 경로당
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_efc12388b923e7e4a2ccb62bff56a8cd = L.marker(
                [37.5443365, 126.9554285],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_efc12388b923e7e4a2ccb62bff56a8cd.bindTooltip(
                `&lt;div&gt;
                     신덕교회 대예배실
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_0163db7ae0683c6f7f2adf33651cbcb5 = L.marker(
                [37.5143539, 127.062504],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_0163db7ae0683c6f7f2adf33651cbcb5.bindTooltip(
                `&lt;div&gt;
                     삼성1문화센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_232250422a160798d06decf18e9f2668 = L.marker(
                [37.5482075, 127.0383673],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_232250422a160798d06decf18e9f2668.bindTooltip(
                `&lt;div&gt;
                     성수중학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_e6b73af4868bce9c42305868c309c170 = L.marker(
                [37.5393082, 126.8971258],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_e6b73af4868bce9c42305868c309c170.bindTooltip(
                `&lt;div&gt;
                     한강미디어고등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_f39a2362d187030317b2e78bd72e5648 = L.marker(
                [37.6124074, 127.0499837],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_f39a2362d187030317b2e78bd72e5648.bindTooltip(
                `&lt;div&gt;
                     장위초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_297ffc54f2395db1e31b34aeb992dd80 = L.marker(
                [37.5260467, 127.1329027],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_297ffc54f2395db1e31b34aeb992dd80.bindTooltip(
                `&lt;div&gt;
                     성내3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_56736a07d07cf7cc564552ed1718a3cc = L.marker(
                [37.4806388, 126.9431002],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_56736a07d07cf7cc564552ed1718a3cc.bindTooltip(
                `&lt;div&gt;
                     관악초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_74b08d15206c4cbbd0df1963e07c31c5 = L.marker(
                [37.5866443, 127.0123266],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_74b08d15206c4cbbd0df1963e07c31c5.bindTooltip(
                `&lt;div&gt;
                     삼선초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_4650a01d829a1aa71c9b6df715e18d49 = L.marker(
                [37.5439366, 127.1256067],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_4650a01d829a1aa71c9b6df715e18d49.bindTooltip(
                `&lt;div&gt;
                     해공도서관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_25f2c494cafc107dd65f41f9f3f40601 = L.marker(
                [37.6507925, 127.0731328],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_25f2c494cafc107dd65f41f9f3f40601.bindTooltip(
                `&lt;div&gt;
                     을지초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_40a5c76656bf4450e70f2b8fa227ca13 = L.marker(
                [37.5501512, 127.0875822],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_40a5c76656bf4450e70f2b8fa227ca13.bindTooltip(
                `&lt;div&gt;
                     선화예술학교(중학교)
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_9d61541d04d7cdaa48e4331f4e7062b8 = L.marker(
                [37.5937638, 126.9497106],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_9d61541d04d7cdaa48e4331f4e7062b8.bindTooltip(
                `&lt;div&gt;
                     홍제3동주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_a8279111a07c5a6ea1ab857c5e2d0442 = L.marker(
                [37.6043596, 127.0959559],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_a8279111a07c5a6ea1ab857c5e2d0442.bindTooltip(
                `&lt;div&gt;
                     원광종합복지관
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_3d7301ecccc1c4682b574ebbab838cc8 = L.marker(
                [37.6179826, 127.0862899],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_3d7301ecccc1c4682b574ebbab838cc8.bindTooltip(
                `&lt;div&gt;
                     원묵초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_2c8c231187bcf8d1d953ece476173699 = L.marker(
                [37.6438528, 127.0628056],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_2c8c231187bcf8d1d953ece476173699.bindTooltip(
                `&lt;div&gt;
                     중원초등학교
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var marker_82de2bc844b2a0016cb6fa9f1b695413 = L.marker(
                [37.5549978, 127.140775],
                {}
            ).addTo(marker_cluster_7b69e4b4d5e3192df4293d9b3dc0ef56);
        
    
            marker_82de2bc844b2a0016cb6fa9f1b695413.bindTooltip(
                `&lt;div&gt;
                     암사3동 주민센터
                 &lt;/div&gt;`,
                {&quot;sticky&quot;: true}
            );
        
    
            var tile_layer_35b9f085f13ee6ada27d210d481e562c = L.tileLayer(
                &quot;https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png&quot;,
                {&quot;attribution&quot;: &quot;Data by \u0026copy; \u003ca href=\&quot;http://openstreetmap.org\&quot;\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\&quot;http://www.openstreetmap.org/copyright\&quot;\u003eODbL\u003c/a\u003e.&quot;, &quot;detectRetina&quot;: false, &quot;maxNativeZoom&quot;: 18, &quot;maxZoom&quot;: 18, &quot;minZoom&quot;: 0, &quot;noWrap&quot;: false, &quot;opacity&quot;: 1, &quot;subdomains&quot;: &quot;abc&quot;, &quot;tms&quot;: false}
            );
            var mini_map_5d4264460d18de9427fa80be2cfc57f6 = new L.Control.MiniMap(
                tile_layer_35b9f085f13ee6ada27d210d481e562c,
                {&quot;autoToggleDisplay&quot;: false, &quot;centerFixed&quot;: false, &quot;collapsedHeight&quot;: 25, &quot;collapsedWidth&quot;: 25, &quot;height&quot;: 150, &quot;minimized&quot;: false, &quot;position&quot;: &quot;bottomright&quot;, &quot;toggleDisplay&quot;: false, &quot;width&quot;: 150, &quot;zoomAnimation&quot;: false, &quot;zoomLevelOffset&quot;: -5}
            );
            map_e24f4ee170d91ed10d8ce55ed21ad5f6.addControl(mini_map_5d4264460d18de9427fa80be2cfc57f6);
        
&lt;/script&gt;" style="position:absolute;width:100%;height:100%;left:0;top:0;border:none !important;" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe></div></div>

