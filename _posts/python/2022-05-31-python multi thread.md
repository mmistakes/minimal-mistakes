---
title:  "multi threading"
excerpt: " python을 활용한 multi threading 구현"

categories:
  - Python
tags:
  - [Python, thread, multi, threading, list, dictionary, sort, queue]

toc: true
toc_sticky: true

breadcrumbs: true
 
date: 2022-05-31
last_modified_at: 2022-05-31
---

## 목적

파이썬은 인터프리터 언어로서 기본적으로 싱글 쓰레드에서 순차적으로 동작한다. 따라서 병렬처리를 하기 위해서는 별도의 모듈을 사용하여 구현해야 한다
해당 모듈로 threading 모듈을 이용한 쓰레드 구현 활용 및 모든 코어를 활용해 프로그램의 성능을 높이기 위한 멀티스레딩을 알아보겠다.


## workflow

multi threading 이용
11단,12단 구하기
multi threading 시 return 값 반환을 위해서 queue 를 사용.

- 병렬 처리할 부분을 함수(11단,12단)로 만든다.
- 각 스레드에게 함수와 분할된 작업을 건내준다.
- 각 스레드가 처리한 결과를 모은다.
- 처리결과를 정렬해준다.(thread의 실행순서에 따라 원소 순서가 달라질수 있기 때문에.)



## 구현
json data를 이용하여 서버와 클라이언트 단에서 send & receive 를 진행하는 뼈대에 기존만들었던 함수들을 걷어내고 간단히 11단,12단 구구단을 구하는 함수를 넣어 멀티스레딩을 구현 해 보겠다.

```
## define
stpe_lists = [1,2,3,4,5,6,7,8,9]
threads = []
q = queue.Queue()

def calulate(path_list, idx, x, y, queue):
    """
    11단, 12단 계산
    """
    coord_x_result = path_list * x
    coord_y_result = path_list * y

    result_list = [idx, coord_x_result, coord_y_result]
    ## queue에 값 넣기
    queue.put(result_list)


if __name__ == "__main__":
    
    ## 새로운 스레드 생성 / 실행 후 스레드 리스트에 추가
    for idx, step_list in enumerate(stpe_lists):
        coord_x= 11
        coord_y= 12
        t = threading.Thread(target=calulate, args=(step_list, idx+1,coord_x, coord_y, q))
        t.start()
        threads.append(t)

    ## 메인 스레드는 각 스레드의 작업이 모두 끝날 때까지 대기
    for t in threads:
        t.join()

    ## queue를 list형태로 바꾸기
    result = list(q.queue)
    #print (result)  #[[1, 11, 12], [2, 22, 24], [3, 33, 36], [4, 44, 48], [5, 55, 60], [6, 66, 72], [7, 77, 84], [8, 88, 96], [9, 99, 108]]

    ## sorted threading
    for i in range(len(result)):
        result_dict["index"] = result[i][0]
        result_dict["step_11"]=result[i][1]
        result_dict["step_12"]=result[i][2]

        ## list에 dictionary형태 붙이기
        dictionary_cp = result_dict.copy()
        cp_list.append(dictionary_cp)

    ## list에서 dictionary 형태 정렬하기
    idx_sorted_list = sorted(cp_list, key=itemgetter('index'))

    point={"idx_sorted_list":idx_sorted_list}
    
    ## json 형태로 return  
    return jsonify(point)


```

python에서 각 thread는 target으로 주어진 함수를 실행한다.
그리고 해당 함수의 매개변수는 args를 통해 넘겨준다. 그리고 메인 스레드는 각 스레드의 작업이 모두 끝난 후 queue에 쌓은 값들을 list로 변형하여 출력한다.
주의할 점은 스레드의 실행 순서에 따라 results 리스트의 원소 순서가 달라질 수 있다는 것이다.

- append() 함수는 Thread-safe 하기 때문에 따로 동시성 제어를 할 필요가 없다.

- threading.Thread(): 스레드를 새로 생성한다.

- Thread.start(): 해당 스레드가 target으로 넘겨받은 함수를 병렬로 실행한다.

- Thread.join(): 해당 스레드(새로 생성된 스레드)의 실행이 끝날 때까지 join() 함수를 호출한 스레드(메인 스레드)는 대기한다.

- sorted(cp_list, key=itemgetter('index')) : key값이 index를 기준으로 오름차순으로 정렬.

- 큐 : FIFO(First In First Out) 구조

![image](https://user-images.githubusercontent.com/46878973/171134098-7c9e630a-e74c-49bc-a97b-bb46fa33029d.png)


---

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
 

