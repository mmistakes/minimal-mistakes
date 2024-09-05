---
layout: post
title:  "VR/AR/게임제작기초"
---

# 2023년도 2학기

좌표계 - 원점과 x,y,z축

전역공간 (월드 공간)
  ㄴ게임 월드의 중심이라는 절대 기준이 존재하는 공간 
     ㄴ 전역 좌표계

오브젝트 공간( 오브젝트 좌표계)
	ㄴ 자신을 중심으로 x,y,z
	ㄴ 기즈모를 가지고 있을때만 사용

지역공간
	ㄴ 부모 오브젝트가 존재하지 않으면, 지역 좌표계와 전역 좌표계가 일치하기땜ㄴ에

부모, 자식간에서 부모의 크기를 늘려주면 거리도 함께 멀어진다.



두 벡터가 90도 민안일때 A*b>0 a*b<0
법선 벡터 : 평면에 수직인 벡터 (입사각,반사각)
axB =c 
BxA = -c 둘이 다르다 

방향벡터 : 길이가 1인 벡터
	ㄴ 대문자 소문자 구분(14)
	뒹 변수가 오는 건 소문자, Vetor3뒤에 오는 문자는 대문자
크기는 피타고라스의 정의로 구함
	ㄴ magnitude;
normalized하는 이유 : 방향 벡터로 동일한 방향만큼으로 만들기 위해(루트3을곱합)	ㄴ 정규화
Vector3 a = new Vector3(0, 0, 1);
Vector3 b = new Vector3(1, 0, 0);
float c = Vector3.Dot(a, b);
c는 0이다
Vector3 d = Vector3.Cross(a, b);
d값은 : y축 (0,1,0)

짐벌락 : 90를 돌렸을때 나타는 현상
	ㄴ 이 이후 축 두개가 겹쳐진다
쿼터니언의 자세한 값은 복잡하기 때문에 유니티가 보여주지 않는다.


게임 설계하기
1단계 : 화면에 높일 오브젝트 모두 나열하기
2단계 : 오브젝트를 움직일 수 있는 컨트롤러 스크립트를 정하기
3단계 : 오브젝트를 자동으로 생성할 수 있도록 제너레이터 스크립트 정하기
4단계 : UI를 갱신할 수 있도록 감독 스크립트를 준비하기
5단계 : 스크립트를 만드는 흐름을 생각하기

컨트롤러 스크립트 -> 제너레이터 스크립트 -> 감독 스크립트

감독을 만드는 방법
1) 감독 스크립트 작성
2) 빈 오브젝트 생성
3) 빈 오브젝트에 감독 스크립트 적용

룰렛 회전시키기
if(Input.GetMouseButtonDown(0)){
	this.rotspeed =10;
}

transtorm.Rotate(0,0,this.rotSpeed);

this.rotSpeed *= 0.96f;

상속과 재사용
	ㄴ 게임 엔진의 코드를 '재사용(상속)'하므로 생산성이 올라감
상속에만 의존 하여 게임을 개발할 때 발생하는 문제
	ㄴ 오히려 코드를 재사용하기 힘든 경우
	ㄴ 프로그래머에게 의존해야 함


컴포넌트 패턴
	ㄴ 미리 만들어진 부품을 조립하여 완성된 오브젝트를 만드는 방식
컴포넌트 장점
	ㄴ 유연한 재사용이 가능함
	ㄴ 기획자의 프로그래머 의존도가 낮아짐
	ㄴ 독립성 덕분에 기능 추가와 삭제가 쉬움
게임 오브젝트는 단순한 빈 껍데기
컴포넌트는 스스로 동작하는 독립적인 부품
컴포넌트 구조에서 broadcasting(전체방송)을 이용해 컴포넌트의 특정 기능을 간접적으로 실행할 수 있음
	ㄴ Monobegaivor

객체지향의 핵심
	ㄴ 사람이 현실 세상을 보는 방식에 가깝게 프로그램을 완성하는 것
	ㄴ 클래스(묘사할 대상과 관련된 코드(변수와 메서드 등)를 묶는 틀
오브젝트
	ㄴ 물건의 설계도인 클래스와 달리 실제로 존재하는 물건(실체)
인스턴스화
	ㄴ 클래스라는 틀로 오브젝트를 찍어내 실체화 하는 것
	ㄴ 생성된 오브젝트 : 인스턴스 	

머티리얼
	ㄴ 유니티에서 게임 오브젝트의 컬러를 결정함
	ㄴ  셰이더와 텍스처가 합쳐진 에셋


점프시키기
Rigidbody myRigidbody;
myRigidbody =  GetComponent<Rigidbody>();
myRigidbody.addForce(0, 500, 0);


마우스 이동시키기
Vector2 startPos;
float speed = 0;
void Update(){
	if(Input.GetMouseButtonDown(0)){
		this.startPos = Input.mousePosition;
	else if(Input.GetMouseButtonUp(0)){
		Vector2 endPos = Input.mousePosition;
		float swipeLength = endPos.x - startPos.x;
		
		this.speed = swipeLength / 500.0f;
	}
	transtorm.Translate(this.speed, 0,0);
	this.speed *= 0.98f;


텍스트 연동
GameObject car;
GameObject flag;
GameObject distance;
void Start(){
	this.car = GameObject.Find("car");
	this.flag = GameObject.Find("flag");
	this.distance = GameObject.Find("Distance");
	//자신 이외의 오브젝트 컴포넌트에 접근하는 방법	
	1. Find 메서드로 오브젝트 찾기
	2. GetComponent 메서드로 오브젝트 컴포넌트 얻기
	3. 컴포넌트가 가진 데이터에 접근

void Update(){
	float length = this.flag.transform.position.x 
				- this.car.transform.position.x;
	if(length>0)	
		this.distance.GetComponent<Text>().text = "~~";
	else
		this.distance.GetComponent<Text>().text = "GG";


오디오 연동
AudioSource audio;
void Start(){
	audio = GetComponent<AudioSource>();
}
if(this.speed>0)
	audio.Play();

재시작
public void Restart(){
	transform.position = new Vector3(-7, -3.7f, 0);
}

한 칸씩 이동하기
if(Input.GetKeyDown(KeyCode.LeftArrow))
	transform.Translate(-1, 0, 0);
if(Input.GetKeyDown(KeyCode.RightArrow))
	transform.Translate(1, 0, 0);


화살 떨어지기 and 제거
void Updata(){
	transform.Translate(0, -0.1f, 0);//프레임마다 등속으로 낙하
	if(transform.position.y <-5.0f)//화면 밖으로나가면 옵젝소멸
		Destroy(gameObject);
}

간단한 충돌 판정
	ㄴ 원의 중심 좌표와 반지름을 알면 충돌을 간단히 판별 가능
	ㄴ 두 오브젝트의 중심 사이의 거리
	ㄴ d > r1 + r2	==> 충돌하지 않음
	ㄴ d  <  r1 + r2  ==> 충돌
GamObject player;

void Start()
	this.player = GameObject.Find("player");
void Update(){
	Vector2 p1 = transform.position;	//화살의 중심좌표
	Vector2 p2 = this.player.transform.position;//플레이어
	Vector2 dir = p1 - p2;
	float d = dir.magnitude;
	float r1 = 0.5f;	//화살의 반지름
	float r2 = 1.0f;	//플레이어의 반지름
	
	if(d < r1 + r2)
		Destroy(gameObject); // 충돌인 경우 화살을 소멸
}


화살 제너레이터
	ㄴ 프리팹 : 설계도, 같은 오브젝트를 많이 만들고 싶을때 주로 사용
	ㄴ 프리팹만고치면 수정이 완료
public GameObject arrowPrefab; // 드래그엔 드롭으로만 설정 가능
float spac =1.0f;		ㄴ 때문에 public 으로 해야함
float delta = 0;
void Update(){
	this.delta += Time.deltaTime;
	if(this.delta > this.span){
	   this.delta = 0;
	   GameObject go = Instantiate(arrowPrefab) as GamObject
	     int px = Random.Range(-6, 7);
	   go.transform.position = new Vector3(px, 7, 0);


UI HP감독 스크립트
using UnityEngine.UI //UI를 사용하기 위해 필요
GamObject hpGauge; // 우측 상단에 놓아던 hp게이지를 가르킬 포인터
void Start()
	this.gpGauge = GameObject.Find("hpGauge");
public void DevreaseHP()
	this.hpGauge.getComponent<Image>().fillAmount -= 0.1f;

----> GameObject director = GameObject.Find("GameDirector");
	director.GetComponent<GameDirector>().DecreaseHP();
//자신 이외의 오브젝트 컴포넌트에 접근하는 방법
	1) Find 메서드로 오브젝트 찾기
	2) GetComponent 메서드로 오브젝트 컴포넌트 얻기


-닷지


Rigidbody playerRigidbody;	//이동에 사용할 리지드바디 컴포넌트
public float speed = 8;		//이동속도
void Start(){
	playerRigidbody = GetComponent<Rigidbody>();
}
void Update(){
	float xInput = Input.GetAxis("Horizontal");
	float zInput = Input.GetAxis("Vertical");
	
	float xSpeed = xInput * speed;
	float zSpeed = zInput * speed;
	
	Vector3 newVelocity = new Vector3(xSpeed, 0f, zSpeed);
	playerRigidbody.velocity = newVelocity;

public void Die(){
	gmaobject.SetActive(flase);
}

GetAxis() 메서드
	ㄴ 어떤 축 에 대한 입력 값을 숫자로 반환하는 메서드
	ㄴ 축의 이름(Horizontal, Vertical)을 입력 인자로 받음
	ㄴ 입력 키 커스터마이제이션을 구현하기 위해 축 입력 이름에 대응하는 버튼을 변경해도 코드는 수정할 필요가 없음
	ㄴ 값이 왜 true or flase가 아니라 숫자인가?
		ㄴ 조이스틱같은 경우



