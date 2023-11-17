![이미지](/assets/blog1.jpg)

## GET method란

-HTTP에서 GET method는 리소스를 요청하는 데 사용되는 method 중 하나
-서버로 부터 정보를 요청하는데 사용
-GET을 통한 요청은 URL 주소 끝에 파라미터로 포함되어 전송
예시: https://namu.wiki/w/Normaltic%20Place==?from=%EB%85%B8%EB%A7%90%ED%8B%B1==
-URL의 끝에 ?를 붙이고, 여러 매개변수 간에는 &로 구분

GET method로 로그인 페이지 구현

html코드
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </head>
  <body>
    <h1>Login Page</h1>
    <form action="login_test.php" *method="get"*>
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name="username" aria-describedby="usernameHelp">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password">
            <div id="passwordHelp" class="form-text">Do not share your password with anyone else.</div>
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </body>
</html>
```
php코드
```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $username = $_GET['username'];
    $password = $_GET['password'];

    if ($username == 'admin' && $password == 'password') {
        echo "로그인 성공!";
    } else {
        echo "로그인 실패!";
    }
}
?>
```

로그인을 해보면
![이미지](/assets/login_test_get.png)
보이는 것처럼 url에 username과 password가 그대로 노출된다.

*즉 GET은 URL에 데이터를 노출시키기 때문에 ==보안==에 취약할 수 있다.*

***
##POST method란
