---
layout: single
title: "4 - Web MVC Framework Basic"
categories: PZM기반_실무중심_백엔드_부트캠프(프리트레이닝)
tags: [mybatis, mvc]
---

## 18> 등록폼 Controller만들기

### 1. 버튼 추가

- src/main/webapp/WEB-INF/views/list.jsp

  ```html
  <button class="btn btn-sm btn-primary" onclick="goRegister()">등록</button>
  ```

  ```js
  function goRegister() {
        location.href = "/MF01/registerGet";
  }
  ```

### 2. controller 만들기

- src/main/java/com/example/controller/BookRegisterGetController.java

  ```java
  @WebServlet("/registerGet")
  public class BookRegisterGetController extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      final RequestDispatcher rd = req.getRequestDispatcher("/WEB-INF/views/register.jsp");
      rd.forward(req, resp);
    }
    
  }
  ```

### 3. view 만들기

- src/main/webapp/WEB-INF/views/register.jsp

  ```html
  <div class="container">
    <h2>Web Database Programming</h2>
    <div class="card">
      <div class="card-header">등록 화면</div>
      <div class="card-body">
        <form action="/MF01/registerPost" method="post">
          <div class="form-group">
            <label for="title">제목:</label>
            <input type="text" class="form-control" placeholder="Enter title" id="title" name="title">
          </div>
          <div class="form-group">
            <label for="price">가격:</label>
            <input type="text" class="form-control" placeholder="Enter price" id="price" name="price">
          </div>
          <div class="form-group">
            <label for="author">저자:</label>
            <input type="text" class="form-control" placeholder="Enter author" id="author" name="author">
          </div>
          <div class="form-group">
            <label for="page">페이지수:</label>
            <input type="text" class="form-control" placeholder="Enter page" id="page" name="page">
          </div>
          <button type="submit" class="btn btn-primary">등록</button>
          <button type="reset" class="btn btn-info">취소</button>
        </form>
      </div>
      <div class="card-footer">인프런 마프1탄</div>
    </div>
  </div>
  ```
