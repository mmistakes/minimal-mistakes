---
layout: single
title: "intersection.ts"
categories: "FrontEnd"
tag: [TypeScript]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
---

### intersection

```jsx
/**
 * Intersection Types: &
 */
type Student = {
  name: string,
  score: number,
};

type Worker = {
  empolyeeId: number,
  work: () => void,
};

function internWork(person: Student & Worker) {
  console.log(person.name, person.empolyeeId, person.work());
}

internWork({
  name: "ellie",
  score: 1,
  empolyeeId: 123,
  work: () => {},
});
```

intersection은 &와 비슷하다.
Student의 타입이있는데 이름과 점수가 있다고 가정해보자.
Worker라는 타입이 있고 id와 일을하는 함수도 있다.
학생과 일하는사람 두가지의 타입이있다.
인턴이 일하는 함수가 있는데 이 사람은 학생이기도 하면서 일을하는 사람이기도 합니다. 이 사람은 모든 것들에 다 접근할수 있게됩니다.
그러므로 호출할때 모든 데이터를 전달해야합니다.
다양한 타입을 한번에 묶어서 사용할 수 있습니다.
