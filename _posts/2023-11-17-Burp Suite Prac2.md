<span style="font-size: 18px;">**Burp Suite를 이용해 Segfault 워게임을 풀어보겠습니다.**</span>

<span style="font-size: 18px;">**Burp Suite prac 2**</span>
![이미지](/assets/burpsuite_prac2.png)

<span style="font-size: 18px;">링크에 들어가보겠습니다.</span>
![이미지](/assets/look_inside.png)

<span style="font-size: 18px;">Look inside 정보가 있습니다.</span>
<span style="font-size: 18px;">소스코드를 확인해보겠습니다.</span>
![이미지](/assets/sourcecode3.png)

<span style="font-size: 18px;">한글이 꺠져있으므로 텍스트 인코딩을 복구해주겠습니다.</span>
![이미지](/assets/sourcecode4.png)

<span style="font-size: 18px;">먼저 a.html 문서를 확인하겠습니다.</span>
![이미지](/assets/a.html.png)

<span style="font-size: 18px;">별 소득이 없으므로 이번엔 b.html 문서를 확인하겠습니다.</span>
![이미지](/assets/b.html.png)

<span style="font-size: 18px;">a.html 문서와 비슷해보입니다.</span>
<span style="font-size: 18px;">a.html 문서와 b.html 문서를 comparer로 비교해보겠습니다. </span>
![이미지](/assets/comparer.png)

<span style="font-size: 18px;">두 문서 사이에 flag가 숨겨져 있었습니다.</span>
