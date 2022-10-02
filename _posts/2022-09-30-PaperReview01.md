---
title:  "[논문 리뷰] Optimum support structure generation for additive manufacturing using unit cell structures and support removal constraint"
excerpt: ""

categories:
  - Blog
tags:
  - [Paper review, Additive manufacturing, 3D printing, Support generation algorithm, ]

toc: true
toc_sticky: true
 
date: 2022-09-30
last_modified_at: 2022-09-30
---


<H1> Optimum support structure generation for additive manufacturing using unit cell structures and support removal constraint </H1>
>  위 논문은 적층제조(3D printing의 학술 용어) 중 제품의 돌출 형상(overhang structure) 또는 불안정한 형상의 안정적인 출력을 위해 사용하는 서포트 구조(support structure)의 최적화를 위한 기존 알고리즘을 개선한 저자들의 방법을 소개하는 논문이다.  [*Procedia Manufacturing* 5 (2016): 1043-1059.]



<H2> 1. Introduction </H2>

  적층제조(Additive manufacturing, AM) 기술은 일반적인 제조 공법(주조, 밀링, 절삭 등)으로 구현하기 어려운 복잡한 형상을 구현하는 기술로 많은 산업들(생산 단가로 인해 prototyping에 주로 사용됨)과 연구 분야에서 그 다양한 활용성에 주목을 받고 있는 실정이다. 

 최근의 몇몇 연구들은 제품의 품질을 향상시키기 위해 공정조건(process parameters: 적층제조 시에 제품을 생산하는 데, 적용되는 조건들을 의미함. 한 레이어의 두께, 제조 방향, 서포트 구조 등)의 최적화 연구를 진행하고 있으며, 그중에서 서포트 구조는 적층제조 공정에서 중요한 요소 중 하나로 고려되고 있다.

 저자는 적층제조 공정으로 생산되는 제품의 형상이 복잡하기 때문에, 서포트 구조를 사용했을 때 제작 시간과 비용이 증가하며 서포트 구조가 맞닿는 제품의 표면 조도가 떨어지는 등의 문제를 제기하며 해당 논문의 novelty를 주장하고 있다. 따라서, 그들은 상기 언급한 서포트 구조의 문제점들을 해결한 본인들의 서포트 구조 생성 알고리즘(Dijkstra's shortest algorithm과 space filling cellular structures를 합쳐서 사용)을 통해 부피를 최소화하는 동시에 후처리(제거)에 용이한 서포트 구조를 생성할 수 있다고 주장한다.

 해당 논문은 4개의 부분으로 나뉜다: Literature review, methodology, results and conclusions.



<H2> 2. Literature review </H2>

 해당 파트에서는 서포트 구조에 관련된 선행 연구들에 대해 소개하고 있다.

 서포트  최소화를 위한 생성 알고리즘에는 Chalasani et al. (1995)이 발표한 ray casting approach를 사용한 서포트 구조 최소화 수치 알고리즘, Huang et al. (2009)이 발표한 FDM (Fused deposition modelling, 우리가 흔히 3D 프린터라고 하면 대부분 FDM 기법의 프린터를 의미한다. 주로 플라스틱[PLA, ABS] 계열의 필라멘트를 높은 온도로 녹여 노즐을 통해 제품을 제작하는 방식이다.) 기법의 서포트 최소화를 위한 sloping wall approach (부피를 30%까지 줄였으나 접촉 면적 최소화를 고려하지 않음), Strano et al. (2013)이 제안한 서포트 생성 수학 방정식, Calignano (2014)의 접촉 면적을 줄이기 위한 teethed 서포트 구조의 사용, Hussein et al. (2013)의 서포트 생성을 위한 다양한 lattice 구조물 (volume fraction 또한 다양하게) 사용한 사례들이 있다.

 서포트 구조 최소화를 위한 최적 build orientation에 대한 연구로는 Allen and Dutta (1994)의 convex hull based approach, Paul and Anand (2014)의 voxel method (서포트의 부피를 계산)와 최적화 함수 개발, 그리고 서포트 구조를 최소화하기 위한 설계/제작 과정에 대한 다양한 연구들이 진행되었다. 또한, Leary et al. (2014)의 서포트 구조가 불필요한 최적 구조 설계 방안 개발 (복잡한 형상에는 적용 어려움), Yang et al. (2003)의 multi-oriented deposition method in FDM 등의 연구가 수행되었다.

 서포트 구조의 accessibility에 대한 연구는 Samant et al. (2015)의 octree based methodology, Chen & Woo (1989)의 visibility maps, Kang & Suh (1997)의 binary spherical maps, Kweon and Medeiros (1998)의 visibility maps for representation of directions 등의 사례가 있으나 거의 연구가 수행되지 않아 저자들은 해당 부분에 초점을 둔 것으로 생각된다.



<H2>3. Methodology </H2>

 저자들이 개발한 서포트 구조 생성 알고리즘은 Fig. 1과 같다.

![image](https://user-images.githubusercontent.com/74092405/193224559-4114d2b3-fe4c-4c4e-a28c-0dce1fab52b2.png)

**1.** 모델링한 CAD 파일을 STL로 변환

**2.** STL 파일을 Voxel화

**3.** 제품과 서포트 구조가 맞닿는 접촉면을 설정

**4.** Dijkstra's algorithm을 적용하여 인접 행렬(Adjacency matrix) 생성

**5.** 인접한 단위 cell voxel들을 정사각형(혹은 직사각형) grid로 분할

**6.** 분할한 grid들을 single target unit cell voxels을 사용하여 지지하도록 설정

**7.** Target unit cell voxels에 대한 직선의 서포트를 생성

**8.** 지지되지 않은 인접 unit cell voxels을 위한 서포트를 Dijkstra's shortest path algorithm을 활용하여 생성 

 무슨 이야기인지 아직은 모르겠다. 세부적으로 살펴보자.



<H3> 3.1. Unit cells voxels used for support generation</H3>

 해당 논문에서 사용된 unit cells voxels은 Fig. 2.의 다양한 volume fraction을 가진 truncated octahedron (잘린 8면체)과 12면체이다.

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224634-ec4b6b9d-b9b1-47d6-8197-60273d977e20.png"></p>

 저자들에 따르면, 상기에 소개된 두 개의 입면체는 다양한 방향들에 대한 서포트 생성에 대한 유연성(적용하기 쉽다는 의미)이 뛰어나다고 한다. Chua et al. (2003), Sudardamji et al. (2010), Roberts & Garboczi (2002), and Babaee et al. (2012)의 선행 연구들에서 그 제조 가능성과 기계적 성능이 입증됐다고 한다.  



<H3> 3.2. Division of 3D part space into unit cell voxelized space</H3>

 적층 제조를 하기 위해 설계된 CAD 도면에 대한 서포트 생성 알고리즘을 적용하기 전에 unit cellular structure들로 구성된 voxel화된 공간으로 제품이 차지한 공간을 분할하는 과정을 거친다. 이때, 분할된 unit cell voxelized space가 최소 경로 알고리즘을 적용하는 데 사용된다. 이를 위해, Matlab algorithm (Adam, 2010)으로 설계된 제품과 substrate (baseplate라고도 부르며, 3D 프린팅 공정 중에 제품이 적층되는 공간을 의미한다.)를 cubic voxels의 배열로 분할한다.

 이 과정에서 설계된 CAD 모델이 STL 형식으로 변환되고, voxelization algorithm의 입력으로 사용된다. 이를 통해 (Nx * Ny * Nz) 크기의 grids와 , (Nx, Ny, Nz) 수 만큼의 voxel들이 생성된다. 이때, 각각의 grid가 갖는 값은 아래와 같은 의미를 가진다.
 
$$
1:제품을\ 포함하는\ cubic\ voxel을\ 의미함. \\
0:빈\ 공간의\ 3차원\ grid를\ 포함하는\ cubic\ voxel을 의미함.
$$

 변환된 cubic voxel grid를 octahedral voxel grid로 변환하는 알고리즘은 Fig. 3.와 같다.

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224669-47834a58-b190-43c3-9143-c9a67e9a4fe8.png"></p>

각각의 cubic voxel은 하나하나씩 octahedral과의 일치성을 확인한 후에, octahedral과 cubic voxel grid로 변환된다. 먼저, 모든 voxel grid를 truncated octahedral voxel로 적용한 뒤, 주변(인접한)의 8개의 octahedral voxels의 값을 비교하여 모든 점이 1이면 "Part voxel"로 인식하고, 모든 점이 0이면 빈 공간(void) voxel로 인식한다. 이 과정에서 표면의 점들을 생성되고, point in polygon (PIP) 검증이 수행하여 part voxel을 결정하는 역할을 한다.

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224718-d55ca0de-0f40-494d-bec6-ea19efb54b43.png"></p>

 상기 과정을 수행하여 Nx * Ny * Nz 크기의 octahedral voxel들의 정보를 갖는 행렬과 (Nx-1) * (Ny-1) * (Nz-1) 크기의 인접한 octahedral voxel들의 정보를 담은 행렬이 생성된다. 이를 통해 cubic voxelized된 3차원 공간이 truncated octahedron으로 변환되며, rhombic dodecahedron voxel 공간도 유사한 방식으로 변환됨을 알 수 있다. 



<H3>3.3. Minimum overhang angle criteria</H3>

 Cellular voxle들을 사용하여 3차원 part 공간을 voxel화한 뒤, minimum angle criteria (최소 각도 표준)을 통해 part에서 서포트가 필요한 STL 파일의 면들을 구별하는 작업을 진행한다. 저자들에 따르면  Daniel Thomas (2009)는 모든 돌출 표면들은 수평면과 45˚이상의 각도를 가져야 서포트 구조가 필요하고, Cloots et al. (2013)은 35˚ 이상이면 서포트 구조가 필요하다고 보고했다. 저자들은 45˚를 임계값(threshold)으로 설정하여 STL 파일의 모든 면들 중에 수평면과 45˚ 이상인 면들에 대해 서포트 구조가 필요한 면으로 지정했다.

 지정된 면들은 이후에 Fig. 5.처럼 점들로 이산화 (discretized)되어 support voxel들로 지정된다. 이산화된 support voxel들은 interface unit cell voxel들과 맞닿아 있기 때문에 2로 값을 할당해준다. 즉, "2"값은 서포트가 필요한 voxel들을 의미한다.


<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224762-33724fe6-bf39-4525-a1c7-fdf5cb93ae08.png"></p>



<H3> 3.4. Adjacency matrix generation for Dijkstra's algorithm</h3>

 Dijkstra's shortest path grapth search 기반 알고리즘이 3차원 단위 cell voxel space를 탐색하는 사용되고, interface unit cell voxel들과 substrate/part unit cell voxel사이를 최소로 서포팅하는 경로를 생성하여 서포트 생성 알고리즘의 입력이 되는 인접 행렬을 생성한다. Dijkstra's algorithm은 한 개의 단위 cell voxel node에서 인접한 node를 경유하는 비용에 대한 정보를 담은 그래프 행렬을 사용한다. 해당 알고리즘은 초기의 단위 cell voxel에서 마지막 단위 cell node voxel까지 경유하는 비용을 최소화하는 최적화 문제를 풀고, 이를 통해 전체 cellular voxel space에 대한 인접 행렬 (Adjacency matrix)가 정의된다. 인접 행렬의 크기는 N x N 이 되고, 이때, N값을 식 (1)과 같다.

$$
N = (N_x \times N_y \times N_z)+(N_x-1)\times (N_y-1)\times (N_z-1)\cdots\cdots (1)
$$

인접 행렬은 3차원 단위 cell voxel grid의 각각의 voxel에서 인접한 voxel까지 순회하는 비용을 할당하는데, truncated octahedron은 14개의 인접한 단위 cell voxel들을 가지고, rhombic dodecahedron은 12개를 갖는다. 인접한 단위 cell에 부여하는 비용은 Table 1.과 같은데, 단위 cell part voxel에 서포트가 생기는 것을 방지하기 위해 비용을 높게 설정하였다고 한다. 따라서, Dijkstra's 알고리즘을 사용하여 인접 행렬이 생성된다.

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224868-07ffa161-4a5f-45a2-83d3-03e018542519.png"></p>

> **Dijikstra's shortest path algorithm**
>
>  Dijkstra's shortest path algorithm은 특정 지점(A)에서 목표 지점(G)까지의 최단 경로를 찾는 알고리즘으로, 모든 경로에는 해당 경로를 지날 때 필요로 하는 비용(cost)이 있고, 총 비용을 최소화하면서 목표 지점에 도달하게 하는 것이 해당 알고리즘의 목표이다.
>
>  예를 들어, 아래 그림에서 A에서 C로 가는 경로가 있다고 하면,  C에서 가장 A로 가는 경로 중 가장 비용이 싼 vertex(점)은 B 또는 E이다. 하지만, B의 경우 A로 가기 위해서 C-B-D-A의 경로를 지나는데 필요한 총 비용은 5+2+1 = 8인 반면에 E를 통해 A로 갈 경우, C-E-D-A의 경로를 지나는데 필요한 총 비용은 5+1+1 = 7로 가장 작다. 따라서, C에서 A로 가는 최단 거리는 C-E-D-A가 된다.
>
>
> <p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224918-febe7903-8091-4a52-adb0-3f03c4660d66.png"></p>
> 

<H3> 3.5. Support generation

#### 3.5.1. Interface unit cell voxel division

 Part와 직접 맞닿는 interface (서포트 구조과 Part와 맞닿는 부분) unit cell voxel들을 식별한 후에 해당 voxel들은  3 x 3 grid로 분할되는데, 분할된  interface unit cell voxel들은 z방향으로 감지된다.  Fig. 6.는 3 x 3 grid unit cell voxel들이 분할되는 과정을 묘사하는데, 처음의 3 x 3 grid (Fig. 6a.)는 4개의 unit cell voxel로 지지되고, 2 x 2 grid (Fig. 6b.)는 1개의 unit cell voxel로 지지된다(Fig. 6c.). 이때, 해당 single voxel을 **"target unit cell voxel"** 이라고 지칭하고, 행렬에 저장된다.  즉, unit cell voxel의 수가 9개에서 1개로 감소하게 된다. 모든 3 x 3 grid에서 해당 방법이 가능하지는 않는데, 그럴 때에는 2 x 2 grid의 가능성을 탐색하고 상기 방법과 유사하게 진행한다(Fig. 7.). 

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224962-58da5727-8c1f-4d99-9cf0-c578db749f02.png"></p>

 Fig. 8.은 3차원 voxel grid에서 서로 다른 종류의 unit cell들의 용어를 나열하고 있다. Interface unit cell voxel들을 3 x 3 grid 또는 2 x 2 grid로 분할한 뒤에는 남은 unit cell voxel들은 지지되지 않는 것(unsupported)으로 남는다. 해당 unit cell voxel들은 3 x 1이나 1 x 3 크기의 retangular grid로 분할되고, 중앙의 voxel들이 target unit cell voxel matrix에 저장된다.  (해당 과정을 거친 후에도 여전히 분류되지 않은 interface unit cell voxel들이 남아있을지도 모르지만, 이들에 대한 서포트는 서포트 생성 후반 과정에서 생성된다.)  모든 unit cell voxel들의 값은 '3'으로  부여되고, target unit cell voxel의 경우는 '5'의 값을 할당한다.


<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193224998-85509d8c-a876-444e-9b19-ef53cce2c009.png"></p>

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225020-08b2573b-1e81-428e-9862-fa58d3d4d444.png"></p>


#### 3.5.2. Support generation for target unit cell voxels

 서포트 생성 알고리즘 (support generation algorithm)을 '5'의 값이 부여된 모든 target unit cell voxel들에 대해서 실행하여, part나 substrate unit cell voxel 바로 아래에 서포트가 생겼는지 확인한다. 그 후에 '1'의 값이 할당된 unit cell voxel들을 식별하고, 이들을 'supporting unit cell voxel'로 정의한다. 그리고 target과 supporting unit cell voxel 사이에 unit cell support voxel들을 생성하고 '4'의 값을 할당한다 (Table 2.).  


<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225038-a33dd357-f15a-4beb-9e6e-0adaf40280b7.png"></p>

#### 3.5.3. Support generation for unsupported unit cell interface voxels

 Target unit cell voxel들에 대한 support를 생성한 후에, '2'의 값이 할당된 unsupported interface unit cell voxel (어떠한 형태의 grid로도 분할될 수 없는 voxel들을 의미)에 대한 support를 탐색하고, 해당 voxel들에 대한 support를 생성한다. 우선 '2'의 값이 할당된 voxel들을 탐색하고, 하나의 matrix안에 저장한 후 supporting unit cell voxel (1과 4의 값을 가진 녀석들)들 중에서 선택된 unsupported unit cell interface voxel과 가장 가까운 녀석을 선택하여 support 생성을 진행한다. 해당 과정은 Fig. 9.와 같고, 이때도 Dijkstra's shortest path algorithm을 사용하여 시작 노드를 unsupported interface unit cell voxel (2값)에서 최종 노드인 support unit cell voxel(1 또는 4의 값)로 가는 최소 경로(비용을 최소로 하는)를 계산하여 인접 행렬을 생성한다. 이때, 최소 경로 안에 있는 unit cell voxel들에 다시 '4'의 값을 할당한다. Fig. 10.과 Fig. 11.은 그 예시를 보여주고 있다.


<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225069-f09a3818-f29c-4ab2-826d-a5875485ddca.png"></p>

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225089-371e8e72-9d86-4be1-98f8-ecb783c15464.png"></p>

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225104-95841f19-0d5b-4fe0-872b-722d55b0119c.png"></p>  
  

#### 3.5.4. Building the support in a CAD environment

 3.5.1. ~ 3.5.3. 과정을 거쳐서 supporting unit cell voxel들의 중심 점을 output으로 하는 matrix가 생성되고, support로 생성된 unit cell voxel들을 CAD 모델에 통합한다. 저자들은 NX open API interface를 사용하여 CAD 모델에 support 구조들을 통합하였다. 

### 3.6. Support structure generation using accessibility constraint

 Support voxel들을 생성한 후에, 공정 후에 support structure들의 제거가 용이함을 평가가 수행되어야 하는데, 해당 과정은 support generation step에서 추가적인 accessibility constraint를 통해 진행할 수 있다. 이는 part 바깥의 6개의 직교 방향들과  support들의 accessibility (접근성)을 확인함으로써 이루어지는데, Fig. 12-14.가 그 예시다.

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225139-53e30115-391a-4375-8c65-61032bfb0e53.png"></p> 

  
#### Support accessibility evaluation

 Support accessibility 계산을 위한 알고리즘은 Fig. 15.와 같다.

 Voxel support structure들과 voxelized part geometry를 불러온 뒤, i = 0부터 support voxel 수보다 작을 때까지 6개의 표준 직교 방향으로 voxel 순회를 진행하고, 그 과정에서 support voxel을 표시한다. (part voxel에 의해 6개의 방향 중 어느 곳에도 막히지 않을 때까지 순회하면서 접근가능하다고 표시)

  
<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225169-91069f6d-ab36-4347-b7f0-d5a0ae0da279.png" height = "400px"></p>


 해당 알고리즘을 수행한 뒤, not accessible한 모든 unit cell support voxel들을 삭제하고, 해당 voxel들의 순회 비용을 인접 행렬에 갱신한다. 모든 inaccessible unit cell voxel들은 높은 순회 비용을 가지기 때문에 support가 생성되는 것을 방지할 수 있다. 



 #### Overhang filter

 Support를 생성한 후에 support에 의해 overhang 구조들이 생성되어 식별될 수도 있는데, 저자들은 허용치를 5mm로 설정하여 해당 값보다 크면, 이전에 수행했던 support generation algorithm을 반복하여 해당 overhang에 대해 support를 생성하도록 알고리즘을 설정했다고 한다. 또한, 무한 루프를 방지하기 위해 해당 필터는 x-y 평면과의 거리 (R)과 z 방향 거리 (Z)를 계산하여 R <= Z일 때만 support를 생성하도록 하였다. 



## 4. Results

 #### 4.1. Calculation of solid support volume, total sintered area and contact area of the part

 ##### Total sintered area:

 저자들은 cubic voxel based method를 사용하여 total sintered area를 계산하였고, cubic voxel size는 0.1mm (=layer thickness)로 설정하였다. NX에서 support를 생성한 후, STL 파일로 추출하여 MATLAB의 voxelized algorithm 사용을 위한 입력(input)으로 넣어주었으며, total sintered area는 식 (2)로 계산된다.

$$
Total \ sintered\  area = n \times (area\ of \ voxel \ face)\cdots \cdots (2) \\
n = the\ total\ number\ of\ voxels,\ area\ of \ voxel \ face = 0.1 \times 0.1
$$

##### Total support volume calculation for solid supports:

 Total support volume의 경우 Paul and Anand (2014)가 제안한 알고리즘을 적용하여 계산을 진행했는데, 먼저 substrate위의 part가 담긴 STL 파일과 solid support를 cubic voxel을 이용해 voxelized하고, voxel grid안에서 z 방향(수직)으로 voxel 순회하여 모든 갇혀있는 빈 cubic voxel들(part voxel들 사이 또는 part와 substrate 사이에 갇혀 있는 voxel들을 의미한다.)을 저장한다. 그리고 저장된 voxel들을 part에 대한 solid support로 간주하여 그 부피를 계산한다. (3)

$$
Total\ support\ volume = Total\ no.\ of\ trapped\ voxels\times Volume\ of\ each\ voxel \cdots\cdots(3)
$$

##### Support contact area:

 Support가 접촉한 영역은 모든 interface unit cell voxel들의 접촉면의 영역의 합으로 식 (4)와 같이 계산한다.

$$
 Support\ contact\ area = ni\times area\ of\ interface\ voxel\ face\cdots \cdots (4)
$$

#### 4.2. ~ 4.4. Test Case 1 ~ 3

 해당 파트에서는 저자들이 여러 개의 geometry들에 대해 앞에서 언급한 알고리즘을 적용한 예시들을 설명하고 있다. 적용한 부품들은 각각 industry bracket (Fig. 16-19.), a turbine part (Fig. 20.), accessibility constraint를 적용한 예시(Fig. 21-22.)들이며, solid truncated octahedron (or rhombic dodecahedron)에서부터 hollow (정공: 내부에 구멍을 뚫어 경량화한 모델) shape을 적용한 결과들을 비교하여, Support volume, support contace area, total sintering area의 감소량의 감소량을 Table 4-9까지 나열하고 있다.  

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225279-c551fd82-5a22-49f7-9fca-e41afbf4be83.png"></p>

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225318-24a49fe6-40de-4348-801f-2531c276ab9b.png"></p>

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225338-4238cd9d-3323-48e2-9a71-1f3442ccd898.png"></p>

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225359-2f309ce8-049f-4052-bae2-4093cd680a15.png"></p>

<p align = "center"><img src="https://user-images.githubusercontent.com/74092405/193225381-0f1728cf-eab5-4e07-8660-c11440230f87.png"></p>


 이를 통해, 저자들은 Interface unit cell voxel들을 hollow cellular unit cell로 대체함으로써 support contact area를 줄이는 동시에 표면의 품질도 향상시킬 수 있고, 제품 생산 시 구조적 특징에 의해 부품에 가해지는 응력도 최소화할 수 있다고 보고했다.  Test case 3의 경우에는, accessibility constraint를 적용함으로써 inaccessible voxel들을 제거하면서 동일한 부품을 생산하여 재료의 사용량을 줄일 수 있음을 보였다.



## 5. Conclusion

 저자들은 해당 연구를 통해 **solid와 hollow한 cellular structure (truncated octahedron, rhombic dodecahedron)들을 support 형상**으로 사용함으로써 support generation 기술에 대한 새로운 접근법을 소개했다. 이를 위해, **Dijkstra's shortest path algorithm**이 사용되었고, ANSYS를 통해 응력 해석을 수행하여 해당 방법의 성능을 검증했다. 또한, support의 accessibility를 고려한 최적 support 생성할 수 있는 방안을 제시하였다.



 본 논문을 읽고, 몇 가지 생각이 든다.

**1.** Support 생성 시에 accessibility를 고려한다고 했는데, 정확히 이게 어떤 의미인지 잘 모르겠다. 

**2.** Dijkstra's shortest path algorithm 외에 다른 알고리즘이 있는지?

**3.** 논문에서는 실제 실험을 진행하지 않은 것 같은데, 시뮬레이션 값과 실제 결과물은 얼마나 차이가 나는지?



## Refereces

**1.** Vaidya, Rohan, and Sam Anand. "Optimum support structure generation for additive manufacturing using unit cell structures and support removal constraint." *Procedia Manufacturing* 5 (2016): 1043-1059.

**2.** "Dijksta's shortest path algorithm", Youtube, https://www.youtube.com/watch?v=pVfj6mxhdMw



