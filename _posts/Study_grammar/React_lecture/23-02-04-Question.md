---
layout: single
title: "질문"
categories: lecture_Q
tag: [React, code, conception, Question]
---

#  Question_ React

### 1. props_children 형태



![image-20230206233743802](../../Img/image-20230206233743802.png)

저게 왜 컴포넌트인교..?



![image-20230206234943790](../../Img/image-20230206234943790.png)

왜 밑의 부분의 compo-style 적용이 풀리나요

​	





거꾸로하면 되지않을까요..?

왜 안되죠..

```react
import React from "react";
import "App.css";

const App = () => {
  const testArr = ["감자", "고구마", "오이", "가지", "옥수수"];

  return (
    <div className="app-style">
      {/* filter로 조건가공 */}

      {testArr
        .map((item) => {
          return <div className="compo-style">{item}</div>;
        })
        .filter((item) => {
          return item !== <div className="compo-style">오이</div>;
        })}
    </div>
  );
};

export default App;



========================================================================================================================================
    .app-style {
  padding: 100px;
  display: flex;
  gap: 12px;
}
.compo-style {
  width: 100px;
  height: 100px;
  border: 1px solid royalblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

