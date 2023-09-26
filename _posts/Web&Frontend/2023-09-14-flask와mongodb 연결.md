---
title: "flask와 mongodb 연결 used ajax"
escerpt: ""

categories:
  - Frontend
tags:
  - [Web, Frontend, flask, mongodb, ajax]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2023-09-14
last_modified_at: 2023-09-14

comments: true


---


# AJAX란?
- Asynchronous Javascript And XML, Ajax는 빠르게 동작하는 동적인 웹 페이지를 만들기 위한 개발 기법.
- 클라이언트가 서버쪽으로 데이터를 요청하는 방식
- 비동기식
- Ajax는 웹페이지 전체를 다시 로딩하지 않고도, 웹페이지의 일부만 갱신가능
- Ajax 이용시, 백그라운드 영역에서 서버와 통신하여, 그 결과를 웹페이지의 일부분에만 표시할수 있음.

![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/e68b13ab-5a17-44a5-a834-f8628dcefa77)
![image](https://github.com/OC-JSPark/oc-jspark.github.io/assets/46878973/74b710ec-6970-4120-b222-6125d0353dac)


# serverside 만들기
- POST : 데이터 저장
- GET  : 데이터조회

```
(app.py)

from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient
client= MongoClient("mongodb://localhost",27017)  

db = client.test_search

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/test', methods=['GET'])
def test_get():
    search_list = list(db.searchdb.find({}, {'_id': False}))
    return jsonify({'search': search_list})


@app.route('/test', methods=['POST'])
def test_post():
    search_name = request.form['search_name']
    doc = {'search_name': search_name}
    db.searchdb.insert_one(doc)
    return jsonify({'msg': '저장 완료'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5003, debug=True)
```

# client 만들기
- ajax이용
```
(index.html)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Flask ajax 연습</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script>
        $(document).ready(function () {
            show_get();
        });

        function show_get() {
            // show_get() 이 실행되면 /test 의 url 위치로 가서 test_get()함수를 호출한다.
            // test_get()함수는 fruit에 있는 모든 데이터를 가져와 리턴한다. 

            $.ajax({
                type: "GET",
                url: "/test",
                data: {},
                success: function (response) {
                    let rows = response['search']
                    for(let i=0; i<rows.length; i++) {
                        let search = rows[i]['search_name']

                        let temp_html = `<li>${search}</li>` /* 추가할 html */

                        $('#search_list').append(temp_html)  /* id가 fruit_list인 태그 안에 추가 */

                    }


                }
            })
        }
        // saved data
        function show_post() {
            let search = $('#search').val() /* 입력값 가져오기 */
            
            // POST 요청들어오면 ajax는 url경로로 data를 해당형식으로 보낸다.
            // 그 후 전송된 data 값은 app.py에서 url경로의 route를 실행시킨다.
            // 해당 함수내에서 request.form["search_name"] 으로 value를 저장시킨다.
            
            $.ajax({                        
                type: "POST",
                url: "/test",
                data: {search_name : search},
                success: function (response) {
                    console.log(response)
                    window.location.reload()
                }
            })
        }

    </script>
    <style>
        html {
            width: 500px;
            margin: 20px;
        }
    </style>
</head>
<body>
    <h1>검색!!!!</h1>
    <hr>
    <div class="input-group mb-3" id="input">
        <input type="text" class="form-control" placeholder="검색키워드를 입력해주세요" aria-label="검색키워드"
               aria-describedby="button-addon2" id="search">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="show_post()">Go</button>
    </div>
    <ul id="search_list">
    </ul>
</body>
</html>
```


[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}