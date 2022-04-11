---
layout: single
title: "Node Express Simple CRUD"
categories: BackEnd
tag: [total, node, express, db]
---

## 01. Read

```jsx
const sendPosts = (req, res) => {
  res.json({
    products: [
      {
        id: 1,
        title: "node",
        description: "node.js is awesome",
      },
      {
        id: 2,
        title: "express",
        description: "express is a server-side framework for node.js",
      },
    ],
  });
};

module.exports = { sendPosts }; // routing.js 에서 사용하기 위해 모듈로 내보낸다.
```

`res.json()` 으로 요청한 곳으로 데이터를 반환한다. `Express` 를 사용해서 응답 타입을 `json` 으로 보낼 때 `JSON.stringify` 함수를 사용하지 않아도 된다.

## 02. Create

```jsx
// server.js

app.post("/products", createProduct); // add routing
```

생성함수 API 를 `server.js` 에서 `routing` 해준다.

생성할 때는 요청하는곳에서 받은 데이터를 기반으로 생성하기 때문에 `POST` 방식으로 `body`에 파라미터를 받는다.

```jsx
// postings.js

const createProduct = (req, res) => {
  const products = [];
  console.log("Request body: ", req.body);
  const { title, description } = req.body;
  const product = {
    title: title,
    description: description,
  };

  products.push(product);
  res.json({ data: products });
};

module.exports = { sendPosts, createProduct };
```

임의에 `products` 배열을 생성하고 요청받은 파라미터를 콘솔로 찍어본다.

`product` 객체에 파라미터를 추가하고 배열에 담고 `json` 타입으로 반환한다.

`module.exports` 를 사용해야 `server.js`에서 해당 함수를 참조할 수 있다.

## 03.Update

```jsx
// server.js

app.post("/products", createProduct);
app.put("/products", updatePost); // add routing
```

수정함수 `API` 를 `server.js` 에서 `routing` 해준다.

수정요청은 `app.put()` 함수를 사용한다. 삭제요청은 `app.delete()` 함수가 따로 있다.

`app.post()` 함수로도 수정/삭제를 할 수 있지만 `put, del` 을 사용하는 이유를 정확히 기술적으로는 모르겠지만, 아마 문법적으로 맞추기 위해서 사용하는 이유도 있지 않을까 싶다.

```jsx
// posings.js

const updatePost = (req, res) => {
  const products = [
    {
      id: 1,
      title: "node",
      description: "node.js is awesome",
    },
    {
      id: 2,
      title: "express",
      description: "express is a server-side framework for node.js",
    },
  ];
  const { id } = req.body;
  const posting = postings.filter((posting) => posting.id === id);
  posting.title = "new title";

  res.json({ data: products });
};

module.exports = { sendPosts, createPost, updatePost };
```

기존에 있는 데이터가 `products 배열` 이라고 가정하고 요청하는 클라이언트에서 수정하고자 하는 데이터의 `id` 를 파라미터에 담아서보낸다.

고유키인 `id` 프로퍼티로 데이터를 찾아야만 정확하게 찾을 수 있다.

받은 `id` 값으로 Javascript 의 `filter 함수`를 사용하여 반환한 값을 `res.json()` 로 응답해준다.

## 04. Delete

```jsx
app.post("/products", createProduct);
app.put("/products", updatePost);
app.delete("/products", deletePost); // add routing
```

```jsx
const deletePost = (req, res) => {
  const postings = [
    {
      id: 1,
      title: "node",
      description: "node.js is awesome",
    },
    {
      id: 2,
      title: "express",
      description: "express is a server-side framework for node.js",
    },
  ];
  const { id } = req.body;

  for (let i = 0; i < postings.length; i++) {
    const posting = postings[i];
    if (posting.id === id) {
      delete posting[i];
    }
  }
  return res.json({ data: postings });
};

module.exports = { sendPosts, createPost, updatePost, deletePost };
```

`update` 방식처럼 고유키값으로 함수를 실행하여 반환한 값을 `json` 타입으로 클라이언트에 응답 해준다.
