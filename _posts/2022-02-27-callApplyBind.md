---
layout: single
title: "call, apply, bind 메소드 정리"
categories: [JavaScript]
tag: [JS]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# call

- call 메소드는 모든 함수에서 사용할 수 있으며, this를 특정값으로 지정할 수 있습니다.

- call 의 첫번째 매개변수는 this로 사용할 값이고 매개변수가 더 있으면 그 매개변수를 호출하는 함수로 전달됩니다.

  ```js
  const mike = {
      name: "Mike",
  };
  
  const tom = {
      name: "Tom",
  };
  
  function showThisName() {
      console.log(this.name); //여기서 this는 window를 가리킴
  }
  
  showThisName();
  showThisName.call(mike); // Mike
  showThisName.call(tom); // Tom
  
  function upDate(birthYear, occupation) {
      this.birthYear = birthYear;
      this.occupation = occupation;
  }
  
  upDate.call(mike, 1999, "singer");
  console.log(mike); // {name: "Mike", birthYear: 1999, occupation:"singer"}
  
  
  ```

  

# apply

- apply는 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 같습니다.

- call은 일반적인 함수와 마찬가지로 매개변수를 직접받지만, apply는 매개변수를 배열로 받습니다.

- apply는 배열요소를 함수 매개변수로 사용할 때 유용합니다.

  ```js
  const mike = {
      name: "Mike",
  };
  
  const tom = {
      name: "Tom",
  };
  
  function showThisName() {
      console.log(this.name); //여기서 this는 window를 가리킴
  }
  
  showThisName();
  showThisName.call(mike); // Mike
  showThisName.call(tom); // Tom
  
  function upDate(birthYear, occupation) {
      this.birthYear = birthYear;
      this.occupation = occupation;
  }
  
  upDate.apply(mike, [1999, "singer"]);
  console.log(mike); // {name: "Mike", birthYear: 1999, occupation:"singer"}
  ```

  ```js
  const nums = [3, 10, 1, 6, 4];
  const minNum = Math.min(...nums);
  const maxNum = Math.max(...nums);
  
  console.log(minNum); // 1 
  console.log(maxNum); // 10
  
  const minNum = Math.min.apply(null, nums);
  // = Math.min.apply(null, [3, 10, 1, 6, 4]);
  
  const maxNum = Math.max.apply(null, ...nums);
  // = Math.max.call(null, 3, 10, 1, 6, 4)
  
  console.log(minNum); // 1
  console.log(maxNum); // 10
  ```

  ###  *call과 apply의 차이점은 apply는 array를 갖는다.*



# bind

- 함수의 this 값을 영구히 바꿀 수 있습니다.

  ```js
  const mike = {
      name: "Mike",
  };
  
  function update(birthYear, occupation) {
      this.birthYear = birthYear;
      this.occupation = occupation;
  }
  
  const updateMike = update.bind(mike); 
  
  updateMike(1980, 'police');
  console.log(mike); // {name: "Mike", birthYear: 1980, occupation:"police"}
  
  const user = {
      name: "Mike",
      showName: function () {
          console.log(`hello, ${this.name}`);
      },
  };
  user.showName(); // hello, Mike
  
  let fn = user.showName;
  fn(); // hello,
  fn.call(user); // hello, Mike
  fn.apply(user); // hello, Mike
  
  let bindFn = fn.bind(user);
  bindFn(); // hello, Mike
  ```

  
