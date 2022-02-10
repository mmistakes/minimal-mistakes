---
layout: single
title: 에러해결- GPU 할당 에러
categories: 딥러닝에러
tag: pytorch, numpy
typora-root-url: ../
---

RuntimeError: Input type (torch.FloatTensor) and weight type (torch.cuda.FloatTensor) should be the same

RuntimeError: Tensor for argument #2 'mat1' is on CPU, but expected it to be GPU(while checking arguments for addmm)

딥러닝 학습중에 이러한 에러가 주로 마주하곤 한다. 
하지만 이 문제는 실질적으론 같은 원인에서 발생하는것인데 그 이유는 gpu에 할당하지 않았기 때문이다. 

자신의 데이터가 cpu에서 gpu로 옮겨 지지 않았기 때문에 이러한 에러가 발생한다. 

결과적으로는 gpu로 할당해주어야 하고 이는 데이터를 처리하는 코드부분에서 .to('cuda') 를 붙여줌으로써 해결 가능하다.


'''
x,y = x.to('cuda'), y.to('cuda')
'''