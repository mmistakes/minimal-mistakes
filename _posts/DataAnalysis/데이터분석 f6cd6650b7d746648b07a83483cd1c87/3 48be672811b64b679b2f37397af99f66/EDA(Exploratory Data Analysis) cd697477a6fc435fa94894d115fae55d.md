# EDA(Exploratory Data Analysis)

## 0. 앤스컴 콰르텟

![Untitled](EDA(Exploratory%20Data%20Analysis)%20cd697477a6fc435fa94894d115fae55d/Untitled.png)

<aside>
💡 **앤스컴 콰르텟**(Anscombe's quartet)

기술통계량은 유사하지만 분포나 그래프는 매우 다른 4개의 데이터셋이다. 각 데이터셋은 11개의 (x, y) 좌표로 이루어진다. 1973년, 통계학자인 프란시스 앤스컴(Francis Anscombe)이 데이터 분석 전 1) 시각화의 중요성과 2) 특이치 및 주영향관측값(influential observation)의 영향을 보여주기 위해 만들었다.

</aside>

[앤스컴 콰르텟 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EC%95%A4%EC%8A%A4%EC%BB%B4_%EC%BD%B0%EB%A5%B4%ED%85%9F)

## 1. EDA(Exploratory Data Analysis) 란?

<aside>
📖  **탐색적 데이터 분석(EDA: Exploratory Data Analysis)**

원 데이터(Raw data)를 가지고 유연하게 데이터를 탐색하고, 데이터의 특징과 구조로부터 얻은 정보를 바탕으로 통계모형을 만드는 분석방법. 주로 빅데이터 분석에 사용된다. 

모델링에 앞서 데이터를 다양한 각도에서 관찰하고 이해하는 과정
그래프나 통계적인 방법으로 자료를 직관적으로 살펴본다

</aside>

- Garbage in, Garbage out
    
    ![- 출처 : [https://www.google.com/search?q=juice&newwindow=1&sxsrf=AOaemvLSZ4mAvq7fGoQKghSRn-GJVzyNug:1636338909234&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjwzqq73Yf0AhVWE4gKHcMRDq4Q_AUoAnoECAIQBA&biw=1706&bih=1174&dpr=0.75#imgrc=IppwuC4WRO452M](https://www.google.com/search?q=juice&newwindow=1&sxsrf=AOaemvLSZ4mAvq7fGoQKghSRn-GJVzyNug:1636338909234&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjwzqq73Yf0AhVWE4gKHcMRDq4Q_AUoAnoECAIQBA&biw=1706&bih=1174&dpr=0.75#imgrc=IppwuC4WRO452M)](EDA(Exploratory%20Data%20Analysis)%20cd697477a6fc435fa94894d115fae55d/Untitled%201.png)
    
    - 출처 : [https://www.google.com/search?q=juice&newwindow=1&sxsrf=AOaemvLSZ4mAvq7fGoQKghSRn-GJVzyNug:1636338909234&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjwzqq73Yf0AhVWE4gKHcMRDq4Q_AUoAnoECAIQBA&biw=1706&bih=1174&dpr=0.75#imgrc=IppwuC4WRO452M](https://www.google.com/search?q=juice&newwindow=1&sxsrf=AOaemvLSZ4mAvq7fGoQKghSRn-GJVzyNug:1636338909234&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjwzqq73Yf0AhVWE4gKHcMRDq4Q_AUoAnoECAIQBA&biw=1706&bih=1174&dpr=0.75#imgrc=IppwuC4WRO452M)
    

![Untitled](EDA(Exploratory%20Data%20Analysis)%20cd697477a6fc435fa94894d115fae55d/Untitled%202.png)

- 출처 : [https://brunch.co.kr/@data/10](https://brunch.co.kr/@data/10)

## 2. CDA와 EDA

- **전체 흐름 Flow**
    
    <aside>
    📖 **확증적 데이터 분석(CDA: Confirmatory Data Analysis)**
    가설을 설정한 후, 수집한 데이터로 가설을 평가하고 추정하는 전통적인 분석
    
    **탐색적 데이터 분석(EDA: Exploratory Data Analysis)**
    
    원 데이터(Raw data)를 가지고 유연하게 데이터를 탐색하고, 데이터의 특징과 구조로부터 얻은 정보를 바탕으로 통계모형을 만드는 분석방법. 주로 빅데이터 분석에 사용된다. 
    
    </aside>
    
    ![Untitled](EDA(Exploratory%20Data%20Analysis)%20cd697477a6fc435fa94894d115fae55d/Untitled%203.png)
    
    - 출처 : [https://www.insilicogen.com/blog/361](https://www.insilicogen.com/blog/361)
    - 확증적 데이터 분석은 '**추론통계***'로, 탐색적 데이터 분석은 '**기술통계***'로 볼 수 있다.
    - 추론통계와 기술통계
        
        <aside>
        📖 **추론통계**
        수집한 데이터를 이용하여 추론 예측하는 통계 기법으로 신뢰구간 추정, 유의성 검정 기법 등을 이용
        
        **기술통계** 
        수집한 데이터를 요약 묘사 설명하는 통계 기법으로 데이터의 대표값, 분포 등을 이용함
        
        </aside>
        
        - 그렇다면, 빅데이터에 유용한 통계방법론은?
        
    
- EDA 프로세스
    - **1. Top-down vs Bottom-up**
        - **처음으로 무언가 살펴볼 때는 Bottom-up**
        - 의미있는 것을 파악해 **추가로 얻어낸 정보를 토대로 Top-down 으로 검증**
    - **2. 잘라보기, 달리보기, 내려다보기, 올려다보기**
        - 기존에 도출한 데이터의 현실성 및 분석에서 활용한 모델의 적정성 체크
        - 실세계에서 활용한 뒤 추가적으로 정보를 얻을 수 있다.
        - 과정을 통해 시도해보지 않은 차원들 간 조합이나 특정 차원을 특정 값으로 고정해 보면서 인사이트를 고도화하고 확장할 수 있다.
            
            ex. 카드소비패턴 데이터를 분석한다고 가정하는 경우
            
            - 잘라보기(Slice)
                - 전체 데이터의 패턴을 탐색한 다음 일정 기준에 따라 데이터를 쪼개 보는 것
                ex. 전체 카드 소비 패턴 데이터 중 남성, 여성의 소비 패턴 데이터
            - 달리보기(Dice)
                - 차원들을 기준으로 잘라내어 서로 다른 관점의 단면들을 살펴보는 것
                ex. 위 데이터를 20대, 30대, 40대로 연령별로 나누어 비교 분석하는 경우
            - 내려다보기(Zoom Down)
                - 현재 바라보는 관점에서 하위 계층으로 기준을 세분화해 보는 것
                ex. 성별 기준 연령별 소비 패턴 데이터
            - 올려다보기(Zoom Out)
                - 그 반대로 현재보다 상위 계층에 관점에서 보는 것
                ex. 전체 카드 데이터의 소비 패턴 데이터
                
    - 3. EDA시 고려해야 할 점
        - 같은 데이터 안에서 차원과 측정값을 서로 맞바꾸면 다른 통찰을 찾아낼 가능성이 있다.
        - 현실 세계에서의 거의 대부분 데이터는 시간과 공간 관점의 연결고리를 기본으로 갖고 있다. 이 부분이 빠져있다면 보완ㅠㅏ여 활용할 여지를 생각해보아야 한다.
        - 상관관계 / 인과관계
            - 인과관계가 있는데 상관관계가 없을 수도 있다. 
            그래서 상관관계를 살펴보는 데서 탐색을 시작해야 한다.
        - 이상치 (산점도와 같은 관계 시각화 도구로 확인한다)
        - 3차원으로 된 시각화는 원근감으로 인한 인지적 오차가 생기는 문제점이 있고, 
        가려서 잘 보이지 않는 부분이 생길 수도 있다.
        - 빅데이터는 단순한 선형 구조의 방식으로 설명하기에는 한계가 있기 때문에 최근 주목받는 것이 데이터시각화이다.
        - 사람의 눈은 습관적으로 상단 왼쪽부터 하단 오른쪽 귀퉁이로 훑어내려간다.
        
        ![Untitled](EDA(Exploratory%20Data%20Analysis)%20cd697477a6fc435fa94894d115fae55d/Untitled%204.png)