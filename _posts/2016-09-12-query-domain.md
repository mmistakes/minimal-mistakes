---
title:  "子域名查谟"
categories: 
  - Ruby
tags:
  - ruby
---

调用了ilinks,360的查询接口
```ruby

#!/usr/bin/env ruby
#encoding:utf-8

require 'colorize'
require 'Nokogiri'
require 'open-uri'
require 'net/http'

if ARGV.size < 1
	puts "[Error] Usage: #{__FILE__}  url".red
	exit(-1)
end



class DomainQuery

	@@domains = []	

	def getUrl(url)
		option = {'Accept'=>'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 
                'Accept-Charset'=>'GB2312,utf-8;q=0.7,*;q=0.7', 
                'Accept-Language'=>'zh-cn,zh;q=0.5', 
                'Cache-Control'=>'max-age=0', 
                'Connection'=>'keep-alive', 
                'Keep-Alive'=>'115',
		'User-Agent'=>'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
		'Referer'=>'https://www.baidu.com/',
		}
		uri = URI.parse(url)
		http = Net::HTTP.new(uri.host,uri.port)
		http.get(uri.request_uri,option)
	end

	def ilinks(domain)
		url = "http://i.links.cn/subdomain/?b2=1&b3=1&b4=1&domain=#{domain}"
		key = 0
		Nokogiri.parse(getUrl(url).body).css(".divkuang .row").each{|v| @@domains << v.css(".domain a").text}	
	end

	def webscan360(domain)
		url = "http://webscan.360.cn/sub/index/?url="+domain
		Nokogiri.parse(getUrl(url).body).css("#sub_conlist dd").each{|v| @@domains << v.css("strong").text}
	end

	def run(domain)
		ilinks(domain)
		webscan360(domain)
		@@domains.map!{|v| v = v.split("//")[1] if v.include?"http://";v}
		(@@domains.uniq!)-[""]
	end

end

p DomainQuery.new.run(ARGV[0])



```
