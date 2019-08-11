---
layout: post
title:  "XXE 인젝션 방어 (.NET)"
subtitle: "How to prevent XXE Injection"
author: "코마"
date:   2019-07-28 00:00:00 +0900
categories: [ "XXE", "web hacking", "Nodejs"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 XXE (XML eXternal Entity) 인젝션의 위험을 평가하고 이를 예방하는 방법에 대해 알아보겠습니다.😺

<!--more-->

## XXE 인젝션이란

XML 입력(input)을 파싱하는 어플리케이션에 대한 공격입니다. 이는 CWE-661 에서 언급되는 이슈이기도 합니다. 이 위협은 unstrusted XML에 대한 입력이 잘못 구성된 XML 파서에 의해서 처리되면서 외부 객체에 대한 참조를 포함하는 경우를 의미합니다.

{% include advertisements.html %}

## 위험 평가

XXE 인젝션 위협은 기밀 데이터의 노출, DoS, SSRF(Server Side Request Forgery), 포트 스캐닝 등의 위험 발생 가능성이 있습니다. 즉, 취약한 Parser 가 위치한 머신(machine)의 관점에 따라서 영향도가 다릅니다.

{% include advertisements.html %}

## 조치 방안

XXE 를 예방하기 위한 방법은 DTDs (External Entities) 를 비활성화 하는 것입니다. 만약, 파서에 따라 다르겟지만, DTD 를 완전히 비활성화 하는 것이 불가능하다면, external entities 와 external document type 선언을 반드시 비활성화 해야 합니다. 이를 비활성화 하는 방법은 사용하는 파서에 따라 다릅니다.

이번 글에서는 아래의 세가지 Parser 에서 조치하는 방법을 코드 레벨로 알려드리고자 합니다.

1. XmlDocument (~ 4.5.1)
2. XmlTextReader (~ 4.5.1)
3. XPathNavigator ( ~ 4.5.1)

{% include advertisements.html %}

## .NET XML 파서

이 장에서는 .NET XML 파서에 대해서 취약 여부를 알아보도록 하겠습니다. 안타깝게도 `XmlDocument`, `XmlTextReader`, `XPathNavigator` 를 4.5.2 버전 이전을 쓰고 있다면 주의가 필요합니다. 그리고 안전한 Parser 를 사용한다고 할지라도 다른 Parser 를 같이 쓰는 경우 유의할 필요가 있습니다.

| XML Parser            | 기본적으로 안전한가? |
|-----------------------|------------------|
| LINQ to XML           | Yes              |
| XmlDictionaryReader   | Yes              |
| XmlDocument           |                  |
| ...prior to 4.5.2     | No               |
| ...in versions 4.5.2+ | Yes              |
| XmlNodeReader         | Yes              |
| XmlReader             | Yes              |
| XmlTextReader         |                  |
| ...prior to 4.5.2     | No               |
| ...in versions 4.5.2+ | Yes              |
| XPathNavigator        |                  |
| ...prior to 4.5.2     | No               |
| ...in versions 4.5.2+ | Yes              |
| XslCompiledTransform  | Yes              |

{% include advertisements.html %}

## XmlDocument 안전하게 사용하기

위에서 XmlDocument 는 4.5.2 이전 버전에서 취약하다고 합니다. 그렇다면 어떻게 안전하게 사용할까요?
정답은 `xmlDoc.XmlResolver = null` 코드입니다. DTDs 를 비활성화하기 위해 반드시 `null` 을 할당해 주어야 합니다.

```csharp
static void LoadXML()
 {
   string xxePayload = "<!DOCTYPE doc [<!ENTITY win SYSTEM 'file:///C:/Users/testdata2.txt'>]>" 
                     + "<doc>&win;</doc>";
   string xml = "<?xml version='1.0' ?>" + xxePayload;

   XmlDocument xmlDoc = new XmlDocument();
   // Setting this to NULL disables DTDs - Its NOT null by default.
   xmlDoc.XmlResolver = null;
   xmlDoc.LoadXml(xml);
   Console.WriteLine(xmlDoc.InnerText);
   Console.ReadLine();
 }
```

### DTDs 를 반드시 사용한다면

DTD 를 꼭 사용해야 겠다면 XmlUrlResolver 를 상속하여 GetEntity 메서드를 Override 할 필요가 있습니다. 그리고 아래의 세가지 케이스로 나누어 안전한 구현을 해야 합니다.

1. Timeout 설정
2. 데이터 크기 제한
3. LocalHost Entity Resolution 기능 차단

그렇다면, 위에서 정의한 LoadXML static 메서드에서 xmlDoc.XmlResolver 에 할당할 새로운 클래스의 틀을 만들어 보겠습니다.

```csharp
class XmlSafeResolver : XmlUrlResolver
{
    public override object GetEntity(Uri absoluteUri, string role, 
        Type ofObjectToReturn)
    {

    }
}
```

그리고 기본 구현을 아래와 같이 한다고 해봅시다.

```csharp
public override object GetEntity(Uri absoluteUri, string role, 
    Type ofObjectToReturn)
{
    System.Net.WebRequest request = WebRequest.Create(absoluteUri);
    System.Net.WebResponse response = request.GetResponse();
    return response.GetResponseStream();
}
```

### 구현 1. Timeout 설정

타임 아웃 설정의 포인트는 아래의 두가지 입니다.

1. System.Net.WebRequest 에 대한 Timeout
2. System.IO.Stream 에 대한 Timeout

```csharp
private const int TIMEOUT = 10000;  // 10 초

public override object GetEntity(Uri absoluteUri, string role, 
   Type ofObjectToReturn)
{
    System.Net.WebRequest request = WebRequest.Create(absoluteUri);
    request.Timeout = TIMEOUT; // 타임아웃 상수 할당

    System.Net.WebResponse response = request.GetResponse();
    if (response == null) // 예외 처리
        throw new XmlException("Could not resolve external entity");

    Stream responseStream = response.GetResponseStream();
    if (responseStream == null) // 예외 처리
        throw new XmlException("Could not resolve external entity");
    responseStream.ReadTimeout = TIMEOUT; // 타임아웃 상수 할당
    return responseStream;
}
```

### 구현 2. 데이터 크기 제한 코드 추가

MomeoryStream 클래스트를 통해서 ResponseStream 을 받아오는 과정에 데이터 크기를 제한합니다.
즉, Buffer 크기와 최대 Response 크기를 정의해야겠죠.

새로운 상수로 `BUFFER_SIZE`, `MAX_RESPONSE_SIZE` 를 정의합니다. 각각 1KB, 1MB 로 정의합니다. 즉, Stream으로부터 읽어오는 데이터의 단위는 1KB 씩 처리하고 총 크기는 1MB 로 제한을 걸어두는 것입니다. 보통 C에서 코딩할 때 사용하는 스타일이죠.

```csharp
/* 지면을 위해 Skip */
private const int BUFFER_SIZE = 1024;                // 1 KB
private const int MAX_RESPONSE_SIZE = 1024 * 1024;   // 1 MB
public override object GetEntity(Uri absoluteUri, string role,
   Type ofObjectToReturn)
{
    /* 지면을 위해 Skip */
    MemoryStream copyStream = new MemoryStream();
    byte[] buffer = new byte[BUFFER_SIZE];
    int bytesRead = 0;
    int totalBytesRead = 0;
    do
    {
        bytesRead = responseStream.Read(buffer, 0, buffer.Length);
        totalBytesRead += bytesRead;
        if (totalBytesRead > MAX_RESPONSE_SIZE)
            throw new XmlException("Could not resolve external entity");
        copyStream.Write(buffer, 0, bytesRead);
    } while (bytesRead > 0);

    copyStream.Seek(0, SeekOrigin.Begin);
    return copyStream;
```

### 구현 2-1. 클래스 지향 방식

`구현 2`의 코드는 조금 지저분 합니다. 우리는 OOP 를 지향하는 .NET 언어를 리뷰하고 있으니 Stream 객체를 override 해보도록 하겠습니다.

```csharp
class LimitedStream : Stream
{
  private Stream stream = null;
  private int limit = 0;
  private int totalBytesRead = 0;

  public LimitedStream(Stream stream, int limit)
  {
    this.stream = stream;
    this.limit = limit;
  }

  public override int Read(byte[] buffer, int offset, int count)
  {
    int bytesRead = this.stream.Read(buffer, offset, count);
    checked { this.totalBytesRead += bytesRead; }
    if (this.totalBytesRead > this.limit)
      throw new IOException("Limit exceeded");
    return bytesRead;
  }
  // 지면을 위해 생략  
}
```

코드가 훨씬 깔끔해 졌습니다. 가독성도 매우 높아졌군요.

```csharp
public override object GetEntity(Uri absoluteUri, string role,
   Type ofObjectToReturn)
{
  /* 지면을 위해 Skip */
  return new LimitedStream(responseStream, MAX_RESPONSE_SIZE);
}
```

### 구현 3. 민감 정보 노출 방지

XXE 는 서버 자원에 대한 노출 또한 가능하다고 언급하였습니다. 즉, 외부 리소스를 참조할 때, LoopBack 주소 여부를 확인해야 합니다. 이것은 아주 간단하죠.

.NET 의 `Uri` 클래스는 IsLoopback 이라는 프로퍼티를 제공합니다. 오버라이드 하는 메소드의 초입에 이를 기재해 줍니다.
아래의 코드는 공격자가 `file:///C:/Users/code-machina/VerySensitiveFile` 을 참조하는 것을 방지해 둡니다.

```csharp
public override object GetEntity(Uri absoluteUri, string role,
    Type ofObjectToReturn)
{
    if (absoluteUri.IsLoopback)
        return null;
    // 지면을 위해 생략
}
```

## XmlTextReader 안전하게 사용하기

이런 XmlTextReader 또한 안전하지 않기는 마찬가지 입니다. 4.0 버전 이전과 4.0 버전 이후 두가지 버전으로 나누어 안전한 코딩을 살펴보도록 하겠습니다.

핵심은 DTDs 를 비활성화 하는 ProhibitDtd 속성을 true 로 설정하는 것입니다.

### 닷넷 4.0 이전 버전

4.0 이전 버전의 경우 아래와 같이 코드를 작성해 주세요.

```csharp
XmlTextReader reader = new XmlTextReader(stream);
// NEEDED because the default is FALSE!!
reader.ProhibitDtd = true;  
```

### 닷넷 4.0 - 4.5 버전

4.0 이후 버전은 DtdProcessing 속성을 변경해야 합니다.

```csharp
XmlTextReader reader = new XmlTextReader(stream);
reader.DtdProcessing = DtdProcessing.Prohibit;
```

## XPathNavigator 안전하게 사용하기

XPathNavigator 를 사용할 때, IXPathNavigable 인터페이스를 구현하는 XmlDocument 를 사용하는 코드 패턴으로 인해 안전하지 않습니다. 따라서, 안전한 파서인 XmlReader 를 이용해서 구현해야 합니다. 그리고 XPathDocument 를 생성하면 문제될 것이 없습니다.

```csharp
XmlReader reader = XmlReader.Create("example.xml");
XPathDocument doc = new XPathDocument(reader);
XPathNavigator nav = doc.CreateNavigator();
string xml = nav.InnerXml.ToString();
```

## 결론

지금까지 닷넷(.NET) 환경에서 XXE Injection 을 예방하는 방법을 알아보았습니다. 닷넷 4.5.2 버전 이전을 사용하는 경우 이 글을 꼭 유심히 살펴서 외부의 위협으로 부터 데이터를 안전하게 보호하도록 하면 저 코마는 매우 기쁠 것 같습니다.

최근들어 많은 해킹 사고가 발생하고 있습니다. 저 코마는 이러한 사고가 더이상 발생하지 않기를 바라며 개발자 분들이 안심하고 개발에 몰두할 수 있도록 최선을 다하겠습니다.

다음 장에서는 Java 버전의 안전한 코딩 방법에 대해 알아보겠습니다.

읽어주셔서 감사합니다. 더욱 발전하는 **코마**가 되겠습니다.

## 참고

아래의 링크는 이글을 작성할 때 참고한 글입니다. 영문에 익숙하시다면 꼭 읽어주시길 바랍니다.

- [Bryan Sullivan : XML Denial of Service Attacks and Defenses, Nov 2009](https://msdn.microsoft.com/en-us/magazine/ee335713.aspx)
- [OWASP : XXE Injection Prevention Cheatsheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.md)
