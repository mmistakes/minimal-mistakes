---
layout: single
title: "RobotPath"
categories: "Algorithm"

tag: ["BFS", "재귀"]

sidebar:
  nav: "sidebar_main"
tagline: " "
header:
  overlay_image: /assets/images/DSCF3606.JPG
  overlay_filter: 0.5
---

## 문제

세로와 가로의 길이가 각각 M, N인 방의 지도가 2차원 배열로 주어졌을 때, `1`은 장애물을 의미하고 `0` 이동이 가능한 통로를 의미합니다. 로봇은 지도 위를 일분에 한 칸씩 상하좌우로 이동할 수 있습니다. 로봇의 위치와 목표 지점이 함께 주어질 경우, 로봇이 목표 지점까지 도달하는 데 걸리는 최소 시간을 리턴해야 합니다.

## 입력

### 인자 1 : room

- 배열을 요소로 갖는 배열
- `room.length`는 M
- `room[i]`는 `number` 타입을 요소로 갖는 배열
- `room[i].length`는 N
- `room[i][j]`는 세로로 i, 가로로 j인 지점의 정보를 의미
- `room[i][j]`는 0 또는 1

### 인자 2 : src

- `number` 타입을 요소로 갖는 배열
- `src.length`는 2
- `src[i]`는 0 이상의 정수
- `src`의 요소는 차례대로 좌표평면 위의 y좌표, x좌표

### 인자 3 : dst

- `number` 타입을 요소로 갖는 배열
- `dst.length`는 2
- `dst[i]`는 0 이상의 정수
- `dst`의 요소는 차례대로 좌표평면 위의 y좌표, x좌표

## 출력

- `number` 타입을 리턴해야 합니다.

## 주의사항

- M, N은 20 이하의 자연수입니다.
- `src`, `dst`는 항상 로봇이 지나갈 수 있는 통로입니다.
- `src`에서 `dst`로 가는 경로가 항상 존재합니다.

## 입출력 예시

```javascript
let room = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 0],
];
let src = [4, 2];
let dst = [2, 2];
let output = robotPath(room, src, dst);
console.log(output); // --> 8
```

## 풀이 :

```javascript
const robotPath = function (room, src, dst) {
  const aux = (M, N, candi, step) => {
    // 현재 위치
    const [row, col] = candi;

    // 배열의 범위를 벗어난 경우
    if (row < 0 || row >= M || col < 0 || col >= N) return;

    if (room[row][col] === 0 || room[row][col] > step) {
      room[row][col] = step;
    } else {
      // 장애물(1)이거나 이미 최소 시간(1)으로 통과가 가능한 경우
      return;
    }

    // dfs로 4가지 방향에 대해 탐색을 한다.
    // 완전탐색을 해야하므로 bfs나 dfs가 큰 차이가 없다.
    // bfs의 경우 목적지에 도착하는 경우 탐색을 중단해도 되므로,
    // 약간 더 효율적이다.
    aux(M, N, [row - 1, col], step + 1); // 상
    aux(M, N, [row + 1, col], step + 1); // 하
    aux(M, N, [row, col - 1], step + 1); // 좌
    aux(M, N, [row, col + 1], step + 1); // 우

    // 재귀함수가 실행될때 마다 각 방향으로 모든 경우의 수를 확보한다.
    // 매 걸음마다 소요된 걸음수를 좌표에 표시하면서 걸어가는 방식이고
    // 만약 같은 칸에 도착했을때 더 현재 발걸음 수보다 더 적은 숫자면 거기서 턴을 종료한다
    // 왜냐면 다른 방법에서 더 짧게 도착한 경우가 있기 때문이다.
  };

  // 로봇이 서 있는 위치를 1로 초기화하면 (다시 방문하지 않기 위해서),
  // 바로 옆 통로는 2가 된다.
  // 계산이 완료된 후에 최종값에 1을 빼주면 된다.
  aux(room.length, room[0].length, src, 1);

  const [r, c] = dst;
  return room[r][c] - 1;
};
```
