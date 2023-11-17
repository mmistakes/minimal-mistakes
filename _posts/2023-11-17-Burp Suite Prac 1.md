<span style="font-size: 18px;">**Burp Suite를 이용해 Segfault 워게임을 풀어보겠습니다.**</span>

<span style="font-size: 18px;">**Burp Suite prac 1**</span>
![이미지](/assets/burpsuite_prac1.png)

<span style="font-size: 18px;">링크를 클릭해 들어가 보겠습니다.</span>
![이미지](/assets/no_date.png)

<span style="font-size: 18px;">정보가 없으므로 소스코드를 통해 확인해보겠습니다.</span>
![이미지](/assets/sourcecode1.png)

<span style="background-color:#fff5b1; font-size: 18px;">"header User-Agent에 segfaultDevice 라고 넣어서 보내보세요!" 라는 주석이 달려있습니다.</span>

<span style="background-color:#fff5b1; font-size: 18px;">Burp Suite로 링크를 다시 열어 Intercept를 하겠습니다.</span>
![이미지](/assets/intercept_prac1.png)

<span style="background-color:#fff5b1; font-size: 18px;">User-Agent헤더에 segfaultDevice를 넣어서 Forward 시키겠습니다.</span>
![이미지](/assets/prac1_result.png)

<span style="background-color:#fff5b1; font-size: 18px;">아까와는 다른 페이지가 나왔습니다.</span>

<span style="font-size: 18px;">소스코드를 확인해보겠습니다.</span>
![이미지](/assets/sourcecode2.png)

<span style="font-size: 18px;">Flag를 얻었습니다.</span>

