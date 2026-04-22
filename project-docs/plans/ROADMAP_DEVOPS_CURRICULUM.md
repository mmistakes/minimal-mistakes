# DevOps Curriculum Roadmap

## Snapshot

- 검토 기준일: 2026-04-22
- 목적: `development` 아래 `devops` 허브 후보와 관련 연재 구조를 보관한다.
- 현재 상태: Docker 01~05와 Git 01~08 KOR/ENG 포스트를 `_posts/`에 반영했다. Docker 01~05는 2026-04-21부터 2026-04-25까지 주제 기준 하루 간격으로 발행하고, 같은 주제의 KOR/ENG 번역 쌍은 동일 날짜에 발행한다. Git 글은 2026-05-01부터 2026-05-16까지 예약 발행 일정으로 두었으므로, 2026-04-22 기준 일반 Jekyll build에서는 2026-04-23 이후 글이 future post로 skip된다. 다만 `_data/section_topics.yml`과 `_pages/`에는 아직 `devops` 허브 메타데이터를 추가하지 않았다.
- 권장 구조: `section: development`, `topic_key: devops`
- 권장 순서: `Docker -> Git -> Jenkins -> K8S`
- 별도 분리 주제: `cloud`는 이 로드맵에 섞지 않고 추후 별도 계획으로 다룬다.

## Scope

- 포함: Docker 기초, Git 기본 사용법과 협업 흐름, Jenkins 설치와 운영, Jenkinsfile 작성, Kubernetes 설치와 manifest 작성, PV/PVC, 온프렘 보완 요소
- 제외: cloud provider 일반론, 특정 CSP별 운영 세부 사항
- 메모: 온프렘 운영 주제는 Kubernetes 본편과 분리 가능한 번외 모듈로 둔다.

## Proposed Sequence

### Docker

1. Docker 01. 컨테이너와 VM은 무엇이 다른가
2. Docker 02. 이미지, 레이어, 태그, digest를 어떻게 이해해야 하는가
3. Docker 03. Dockerfile 기본 문법과 build context를 어떻게 이해해야 하는가
4. Docker 04. 이미지 빌드가 느려지는 이유와 캐시가 깨지는 지점
5. Docker 05. 레지스트리 푸시와 배포용 이미지 관리 기준

### Git

6. Git 01. Git은 무엇을 기록하고 무엇을 기록하지 않는가
7. Git 02. `status`, `diff`, `add`, `commit`, `log`로 변경 흐름 이해하기
8. Git 03. branch와 merge는 언제 어떻게 써야 하는가
9. Git 04. remote, `fetch`, `pull`, `push`를 분리해서 이해하기
10. Git 05. conflict를 재현하고 해결하는 기본 절차
11. Git 06. rebase, squash, force push를 조심해서 다뤄야 하는 이유
12. Git 07. tag와 release로 Docker 이미지 버전과 배포 이력 연결하기
13. Git 08. PR/MR 기반 협업 흐름과 리뷰 기준

### Jenkins

14. Jenkins 01. Jenkins는 무엇이고 왜 아직도 많이 쓰이는가
15. Jenkins 02. Jenkins 설치와 초기 설정
16. Jenkins 03. 플러그인, credentials, tools를 어떻게 관리해야 하는가
17. Jenkins 04. Freestyle Job과 Pipeline은 무엇이 다른가
18. Jenkins 05. Declarative Pipeline 입문
19. Jenkins 06. Jenkinsfile 기본 문법 `agent`, `stages`, `steps`, `post`
20. Jenkins 07. Jenkinsfile 실전 `environment`, `parameters`, `when`
21. Jenkins 08. Jenkins에서 Docker 이미지 빌드와 레지스트리 푸시
22. Jenkins 09. Jenkins 운영에서 자주 만나는 장애와 원인 분리
23. Jenkins 10. Jenkins에서 Kubernetes 배포로 연결할 때 경계는 어디에 두는가

### K8S

24. K8S 01. Kubernetes는 무엇을 해결하고 무엇은 해결하지 않는가
25. K8S 02. `Pod`, `Deployment`, `ReplicaSet`, `Service`를 운영 흐름으로 이해하기
26. K8S 03. 온프렘 기준 Kubernetes 설치 전략과 `kubeadm` 선택 이유
27. K8S 04. control plane 설치와 기본 점검
28. K8S 05. worker join, CNI 구성, 클러스터 기본 확인
29. K8S 06. 첫 manifest 작성 `Pod`, `Deployment`, `Service`
30. K8S 07. 실무형 manifest 작성 `ConfigMap`, `Secret`, `Ingress`
31. K8S 08. `requests`, `limits`, probe를 왜 같이 봐야 하는가
32. K8S 09. PV, PVC, StorageClass를 어떻게 이해해야 하는가
33. K8S 10. 온프렘 번외 `MetalLB`, `OpenEBS`는 언제 필요한가

## Planning Notes

- Docker는 이후 CI/CD와 Kubernetes 배포를 이해하기 위한 이미지와 레지스트리 기초로 다룬다.
- Git은 Jenkins로 넘어가기 전에 다룬다. branch, tag, PR/MR, Jenkinsfile 위치 같은 개념이 파이프라인 설명의 전제가 되기 때문이다.
- Jenkins 파트는 Git과 Docker 흐름을 자동화하는 방향으로 설치부터 Jenkinsfile까지 단계적으로 쌓는다.
- Kubernetes 파트는 설치 글만 이어 가지 않고 manifest, 운영 설정, storage까지 확장한다.
- `MetalLB`, `OpenEBS`는 Kubernetes 기본 개념과 섞이지 않도록 번외 주제로 분리한다.
- 후속 Jenkins/K8S 글도 각 글마다 `검증 기준일`, `테스트 환경`, `테스트 버전`, `직접 재현한 결과`, `한계와 예외`를 채운다.

## Update Triggers

- 허브 이름이 `devops`가 아닌 다른 이름으로 바뀐 경우
- 연재 순서가 `Docker -> Git -> Jenkins -> K8S`에서 달라진 경우
- `cloud`를 다시 본편에 포함하기로 결정한 경우
- 일부 주제를 삭제하거나 세분화해 편 수가 달라진 경우
