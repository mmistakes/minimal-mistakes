---
layout : single
title : Spring RedirectAttributes
categories: Spring
tags: [SPRING]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### Spring RedirectAttributes

~~~java
package com.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class SampleController4 {
	
	private static final Logger Logger = LoggerFactory.getLogger(SampleController4.class);
	
	@RequestMapping("doE")
	public String doE(RedirectAttributes rttr) {
	
		// RedirectAttributes 인터페이스
		// 중간작업. 대표적인 작업 : DB연동(회원가입, 회원삭제, 회원수정)을 마치고,
		// 다른주소로 이동시, 파라미터를 제공하는 목적으로 사용
		
		Logger.info("doE called...");
		
		// 이동할 주소에 제공할 파라미터 정보. msg객체에 hello 데이터 넣음
		rttr.addAttribute("msg", "hello");
		
		// 다른주소로 이동하는 구문. "redirect:주소" 구문 사용할 경우에는 메서드 리턴타입이 String이어야 한다
		return "redirect:/doF";
	}
	
	@RequestMapping("doF")
	public void doF(String msg) {
		Logger.info("doF called..." + msg);
	}
	
	@RequestMapping("doG")
	public String doG(RedirectAttributes rttr) {
		
		// doH매핑주소에 호출되는 메서드의 파라미터로 참조가 된다
		rttr.addAttribute("name", "홍길동");
		rttr.addAttribute("age", 100);
		
		return "redirect:/doH";
	}
	
	@RequestMapping("doH")
	public void doH(String name, int age) {
		
		Logger.info("이름은?" + name);
		Logger.info("나이는?" + age);
	}
	
}
~~~

