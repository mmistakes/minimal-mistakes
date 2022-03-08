# [React] Mock Data

프론트엔드 개발을 하다보면 UI 구성에 필요한 데이터가 필요하다. 대부분 데이터는 서버에서 받아오는데 백앤드에서 아직 데이터를 가공하지 못하였다면, **임의의 데이터를 만들어 api 호출 형식으로 불러오는 데이터이다.**

**mock data의 장점으론** 백엔드와 미리 데이터의 형태(스키마)를 맞춰보면서 개발을 진행하며 추후 api 연결과정에서 공수가 훨씬 줄어든다.



---



### 01. mock data 활용

#### 01-1. mock data 생성

목 데이터는 백엔드 api를 모방하기 때문에 실제 백엔드 api의 응답값 형태인 json 파일로 진행한다.

```json
//fileName.json
[
  {
    "id": 1,
    "userName": "wecode",
    "content": "Welcome to world best coding bootcamp!",
    "isLiked": true
  },
  {
    "id": 2,
    "userName": "joonsikyang",
    "content": "Hi there.",
    "isLiked": false
  },
  {
    "id": 3,
    "userName": "jayPark",
    "content": "Hey.",
    "isLiked": false
  }
]
```

react에선 public 폴더에 data 폴더를 생성 후 json 파일을 넣어준다.

해당 파일은 http://localhost:3000/data/fileName.json 주소를 입력하면 확인할 수 있다.



#### 01-2. mock data 호출

호출은 js파일에서 진행한다.

```js
import React, { useState, useEffect } from 'react';
import Comment from './Comment/Comment';
import './CommentList.scss';

function CommentList() {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data/fileName.json', {
      method: 'GET' // GET method는 기본값이라서 생략가능. 
    })
      .then(res => res.json())
      .then(data => {
        setCommentList(data);
      });
  },[])

  return (
    <div className="commentList">
      <h1>Main Page</h1>
      <ul>
        {commentList.map(comment => {
          return (
            <Comment
              key={comment.id}
              name={comment.userName}
              comment={comment.content}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default CommentList;
```

js에서 http 요청을 보낼땐 `fetch` 함수를 사용한다.

useEffect 훅을 사용하여 컴포넌트가 렌더링 된 후 데이터를 요청한다.

setCommentList 함수를 사용하여 commentList state를 응답 받은 값으로 변경한다.
