---
layout: post
title: 드림핵 session basic"
---

# 문제
![image](https://user-images.githubusercontent.com/86642180/160350015-4e41e9b1-78bd-4bd1-9680-0a4f68f7f32a.png)

<br>

문제에서 제공해주는 파이썬 코드  
```
#!/usr/bin/python3
from flask import Flask, request, render_template, make_response, redirect, url_for

app = Flask(__name__)

try:
    FLAG = open('./flag.txt', 'r').read()
except:
    FLAG = '[**FLAG**]'

users = {
    'guest': 'guest',
    'user': 'user1234',
    'admin': FLAG
}

session_storage = {
}


@app.route('/')
def index():
    session_id = request.cookies.get('sessionid', None)
    try:
        username = session_storage[session_id]
    except KeyError:
        return render_template('index.html')

    return render_template('index.html', text=f'Hello {username}, {"flag is " + FLAG if username == "admin" else "you are not admin"}')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        try:
            pw = users[username]
        except:
            return '<script>alert("not found user");history.go(-1);</script>'
        if pw == password:
            resp = make_response(redirect(url_for('index')) )
            session_id = os.urandom(32).hex()
            session_storage[session_id] = username
            resp.set_cookie('sessionid', session_id)
            return resp 
        return '<script>alert("wrong password");history.go(-1);</script>'


@app.route('/admin')
def admin():
    return session_storage


if __name__ == '__main__':
    import os
    session_storage[os.urandom(32).hex()] = 'admin'
    print(session_storage)
    app.run(host='0.0.0.0', port=8000)

```
<br>
코드 상단을 보면 `admin : FLAG`로 되어있다.  
즉 FLAG를 찾아서 사이트에서 admin으로 로그인 하면 되는 문제  

# 풀이
일단 사이트에 들어가서 guest로 로그인한다  
로그인 세션이 쿠키 인증 방식이기 때문에  
크롬 개발자 도구에서 쿠키를 변조하면 flag를 찾을 수 있다  

<br>

![image](https://user-images.githubusercontent.com/86642180/160359615-2d59c258-c46b-43a0-91ce-cdf98353baf6.png)
guest를 admin으로 변경 뒤 새로고침을 하면 FLAG 값을 얻을 수 있다

<br>

![image](https://user-images.githubusercontent.com/86642180/160361597-18b2861d-051b-4dc5-ac92-5e40bf997be0.png)

