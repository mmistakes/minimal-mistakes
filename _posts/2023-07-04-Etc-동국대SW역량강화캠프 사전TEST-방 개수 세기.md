---
published: true
title: '2023-07-04-Etc-동국대SW역량강화캠프 사전TEST-방 개수 세기'
categories:
  - Etc
tags:
  - Etc
toc: true
toc_sticky: true
toc_label: 'Etc'
---

**문제**  
윌리는 부자가 돼서 이번에 큰 집으로 이사를 가게 되었다.  
윌리의 집은 무지 커서, 한번에 둘러보기도 어려울 정도이다.  
윌리의 집은 N×M의 크기로, 빈 공간과 벽으로 나타낼 수 있다.  
윌리는 빈 공간에서 다른 빈공간으로 상하좌우로 이동할 수 있다.

<br>

윌리는 이 집에서 방이 몇 개 있는지가 궁금해서, 이 집의 설계도를 당신에게 넘겼다.  
하나의 공간에서, 다른 공간으로 이동할 수 있다면 두 공간은 같은 방이고, 아니라면 다른 방이다.  
윌리의 집에서 방의 개수를 세어주자.

<br>

**입력**  
첫번째 줄에는 방의 크기를 나타내는 두 정수 N, M이 주어진다.  
다음 N개의 줄에는 방의 정보가 주어진다. #으로 주어지는 칸은 벽, .으로 주어지는 칸은 빈칸이다.

<br>

**출력**  
방의 개수를 출력한다.

<br>

**예제 1 입력**

```
5 8
########
#..#...#
####.#.#
#..#...#
########
```

<br>

**예제 1 출력**

```
3
```

---

<br>

> **Source**

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.Scanner;
public class main{
    public static void main(String[] args) throws IOException{
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();
        char[][] map = new char[n][m];
        for (int i = 0; i < n; i++) {
            map[i] = sc.next().toCharArray();
        }

        boolean[][] visited = new boolean[n][m];

        int count = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (!visited[i][j] && map[i][j] == '.') {
                    count++;
                    dfs(i, j, visited, map);
                }
            }
        }

        System.out.println(count);
    }

    public static void dfs(int x, int y, boolean[][] visited, char[][] map) {
        visited[x][y] = true;

		int dx[] = {-1, 0 , 1, 0};
		int dy[] = {0, -1, 0, 1};

        for(int i = 0; i < 4; i++){
			int nx = x + dx[i];
			int ny = y + dy[i];

			if (nx >= 0 && nx < map.length && ny >= 0 && ny < map[0].length && !visited[nx][ny] && map[nx][ny] == '.') {
				dfs(nx, ny, visited, map);
			}
        }
    }
}
```
