---
title: "기술 MFC CString to string"
categories:
  - 기술
  - C++
  - MFC

tags: [C++ ,MFC]
toc : true
comments: true
---

```C++
    CString cStr = L"String";    
    CT2CA convertedString(cStr);
    std::string str = std::string(convertedString);
```
또는

```C++
    CString cStr = L"String";    
    std::string str = std::string(CT2CA(cStr));
```

반대로 stirng to CString

```C++
string stdstr = "string";
CStirng cStr = stdstr.c_str();
```

# 참고 

1. https://bbicw.tistory.com/37
2. https://rubber-tree.tistory.com/21