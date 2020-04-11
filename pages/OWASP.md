---
layout: page
title: OWASP
permalink: /OWASP/
---

https://owasp.org/

## OWASP(Open Web Application Security Project)

OWASP(The Open Web Application Security Project)는 오픈소스 웹 애플리케이션 보안 프로젝트이다. 주로 웹에 관한 정보노출, 악성 파일 및 스크립트, 보안 취약점 등을 연구하며, 10대 웹 애플리케이션의 취약점 (OWASP TOP 10)을 발표했다.

OWASP Top 10은 웹 애플리케이션 취약점 중에서 빈도가 많이 발생하고, 보안상 영향을 크게 줄 수 있는 것들 10가지를 선정하여 2004년, 2007년, 2010년, 2013년, 2017년을 기준으로 발표되었고, 문서가 공개되었다.


## Top 10 Web Application Security Risks(2017) [[owasp 2017 Top 10](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_Top_10.html)]

1. [**Injection(인젝션)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A1-Injection). SQL, OS, XXE(Xml eXternal Entity), LDAP 인젝션 취약점은 신뢰할 수 없는 데이터가 명령어나 쿼리문의 일부분으로써, 인터프리터로 보내질 때 발생한다. 공격자의 악의적인 데이터는 예상하지 못하는 명령을 실행하거나 적절한 권한 없이 데이터에 접근하도록 인터프리터를 속일 수 있다.
2. [**Broken Authentication(취약한 인증)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A2-Broken_Authentication). 인증과 세션 관리와 관련된 애플리케이션 기능은 정확하게 구현되어 있지 않아서, 공격자가 패스워드, 키 또는 세션 토큰을 해킹하거나 다른 구현 취약점을 공격하여 다른 사용자 계정을 일시적 또는 영구적으로 탈취하는 것을 허용한다
3. [**Sensitive Data Exposure(민감 데이터 노출)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A3-Sensitive_Data_Exposure). 많은 웹 애플리케이션들이 신용카드, 개인 식별 정보 및 인증 정보와 같은 중요한 데이터를 제대로 보호하지 않는다. 공격자는 신용카드 사기, 신분 도용 또는 다른 범죄를 수행하는 등 약하게 보호된 데이터를 훔치거나 변경할 수 있다. 중요 데이터가 저장 또는 전송 중이거나 브라우저와 교환하는 경우 특별히 주의하여야 하며, 암호화와 같은 보호조치를 취해야 한다.
4. [**XML External Entities (XXE)(XML 외부 개체(XXE))**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A4-XML_External_Entities_(XXE)). 오래되고 설정이 엉망인 많은 XML 프로세서들은 XML 문서 내에서 외부 개체 참조를 평가한다. 외부 개체는 파일 URI 처리기, 내부 파일 공유, 내부 포트 스캔, 원격 코드 실행과 서비스 거부공격을 사용하여 내부 파일을 공개하는데 사용할 수 있다.
5. [**Broken Access Control(취약한 접근 통제)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A5-Broken_Access_Control). 취약한 접근 제어는 인증된 사용자가 수행할 수 있는 것에 대한 제한이 제대로 적용되지 않는 것을 의미한다. 공격자는 이러한 취약점을 악용하여 사용자의 계정 액세스, 중요한 파일 보기, 사용자의 데이터 수정, 액세스 권한 변경 등과 같은 권한 없는 기능, 또는 데이터에 액세스할 수 있다.
6. [**Security Misconfiguration(잘못된 보안 구성)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A6-Security_Misconfiguration).훌륭한 보안은 애플리케이션, 프레임워크, 애플리케이션 서버, 웹 서버, 데이터베이스 서버 및 플랫폼에 대해 보안 설정이 정의되고 적용되어 있다. 기본으로 제공되는 값은 종종 안전하지 않기 때문에 보안 설정은 정의, 구현 및 유지되어야 한다. 또한 소프트웨어는 최신의 상태로 유지해야 한다.
7. [**Cross-Site Scripting XSS(크로스 사이트 스크립팅)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A7-Cross-Site_Scripting_(XSS)). XSS 취약점은 애플리케이션이 신뢰할 수 없는 데이터를 가져와 적절한 검증이나 제한 없이 웹 브라우저로 보낼 때 발생한다. XSS는 공격자가 피해자의 브라우저에 스크립트를 실행하여 사용자 세션 탈취, 웹 사이트 변조, 악의적인 사이트로 이동할 수 있다.
8. [**Insecure Deserialization(안전하지 않은 역직렬화)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A8-Insecure_Deserialization).안전하지 않은 역직렬화는 종종 원격 코드 실행으로 이어집니다. 역직렬화 취약점이 원격 코드실행 결과를 가져오지 않더라도 이는 권한 상승 공격, 주입 공격과 재생 공격을 포함한 다양한 공격 수행에 사용될 수 있다.
9. [**Using Components with Known Vulnerabilities(알려진 취약점이 있는 구성요소 사용)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A9-Using_Components_with_Known_Vulnerabilities). 컴포넌트, 라이브러리, 프레임워크 및 다른 소프트웨어 모듈은 대부분 항상 전체 권한으로 실행된다. 이러한 취약한 컴포넌트를 악용하여 공격하는 경우 심각한 데이터 손실이 발생하거나 서버가 장악된다. 알려진 취약점이 있는 컴포넌트를 사용하는 애플리케이션은 애플리케이션 방어 체계를 손상하거나, 공격 가능한 범위를 활성화하는 등의 영향을 미친다.
10. [**Insufficient Logging & Monitoring(불충분한 로깅 및 모니터링)**](/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A10-Insufficient_Logging%252526Monitoring). 불충분한 로깅과 모니터링은 사고 대응의 비효율적인 통합 또는 누락과 함께 공격자들이 시스템을 더 공격하고, 지속성을 유지하며, 더 많은 시스템을 중심으로 공격할 수 있도록 만들고, 데이터를 변조, 추출 또는 파괴할 수 있다. 대부분의 침해 사례에서 침해를 탐지하는 시간이 200일이 넘게 걸리는 것을 보여주고, 이는 일반적으로 내부 프로세스와 모니터링보다 외부기관이 탐지한다.