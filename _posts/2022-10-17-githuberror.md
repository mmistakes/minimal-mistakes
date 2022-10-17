---
layout: single
title: "블로그 로컬호스트를 만들며 겪은 에러"
---
깃허브 블로그에 첫글을 쓰는것까지는 쉬웠지만 로컬호스트를 연결하는데서 정말 많은 시간이 걸렸다.
지금보면 간단한거같은데 당시에는 정말 많이 헤맸다.
거의 다 해결한거같지만 앞으로의 과정을 써볼까 한다.



## rbenv 설치 에러
ruby 가상환경을 설치하고 모든 문제가 풀리는 줄알았다.

~~~
sj@gimsujeong-ui-MacBookPro ~ % rbenv versions
  system
* 2.7.6 (set by /Users/sj/.rbenv/version)
~~~

Ruby gem으로 bundler를 설치하기위해
`gem install bundler` 를 치자 또 에러가 났다.

~~~
ERROR:  While executing gem ... (NoMethodError)
    undefined method `invoke_with_build_args' for nil:NilClass
~~~

2.7.6버전으로 사요아겠다고 했으나 계속해서 시스템 루비가 사용되는거같았다. 
혹시 몰라 3.1.2 버전을 설치했으나 결과는 같았고 

`rbenv global 3.1.2(ruby버전)`을 입력후에
`rbenv rehash` 로 갱신해주면서 해결됐다.
~~~
sj@gimsujeong-ui-MacBookPro ~ % rbenv versions
  system
* 2.7.6 (set by /Users/sj/.rbenv/version)
  3.1.2
sj@gimsujeong-ui-MacBookPro ~ % rbenv global 3.1.2
sj@gimsujeong-ui-MacBookPro ~ % rbenv rehash 
sj@gimsujeong-ui-MacBookPro ~ % rbenv versions
  system
  2.7.6
* 3.1.2 (set by /Users/sj/.rbenv/version)
sj@gimsujeong-ui-MacBookPro ~ % 
~~~

다시 `gem install bundler`를 입력하자 잘 설치되었다.
~~~
sj@gimsujeong-ui-MacBookPro ~ % gem install bundler
Fetching bundler-2.3.22.gem
Successfully installed bundler-2.3.22
Parsing documentation for bundler-2.3.22
Installing ri documentation for bundler-2.3.22
Done installing documentation for bundler after 0 seconds
1 gem installed
~~~
 
설치 후에 `open ~/.zshrc`를 입력해서 나온 창에 

`export PATH={$Home}/.rbenv/bin:$PATH && \
eval "$(rbenv init -)"`를 입력해야했는데 
설명의 사진과 달라서 맨아래에 입력했다.



~~~
_conda_setup="$('/Users/sj/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/sj/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/sj/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/sj/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
export PATH=/opt/homebrew/bin:$PATH
export PATH=/opt/homebrew/bin:/opt/homebrew/bin:/Users/sj/opt/anaconda3/bin:/Users/sj/opt/anaconda3/condabin:/Library/Frameworks/Python.framework/Versions/3.10/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
export PATH={$Home}/.rbenv/bin:$PATH && \
eval "$(rbenv init -)"
~~~

## jekyll 설치 에러
1. `gem install jekyll` 를 입력하여 jekyll를 설치.

~~~
sj@gimsujeong-ui-MacBookPro ~ % gem install jekyll
Successfully installed jekyll-4.2.2
Parsing documentation for jekyll-4.2.2
Done installing documentation for jekyll after 0 seconds
1 gem installed
sj@gimsujeong-ui-MacBookPro ~ % 
~~~


2. github 지정 디렉토리에 `bundler install`입력한다.
~~~
sj@gimsujeong-ui-MacBookPro Kimsu10.github.io % bundler install
~~~

위에는 내가 지정한 경로이다.

~~~
Fetching gem metadata from https://rubygems.org/............
Resolving dependencies...
Using rake 13.0.6
Using public_suffix 5.0.0
Using bundler 2.3.22
Using colorator 1.1.0
Using concurrent-ruby 1.1.10
Using eventmachine 1.2.7
Using http_parser.rb 0.8.0
Using mercenary 0.4.0
Using rouge 3.30.0
Using forwardable-extended 2.6.0
Using rb-fsevent 0.11.2
Using liquid 4.0.3
Using rexml 3.2.5
Fetching faraday-net_http 3.0.0
Using i18n 1.12.0
Using ffi 1.15.5
Using ruby2_keywords 0.0.5
Using unicode-display_width 1.8.0
Using addressable 2.8.1
Using sassc 2.4.0
Fetching jekyll-paginate 1.1.0
Using terminal-table 2.0.0
Using em-websocket 0.5.3
Using jekyll-sass-converter 2.2.0
Using rb-inotify 0.10.1
Using safe_yaml 1.0.5
Using kramdown 2.4.0
Using listen 3.7.1
Using kramdown-parser-gfm 1.1.0
Using pathutil 0.16.2
Using jekyll-watch 2.2.1
Using jekyll 4.2.2
Fetching jekyll-sitemap 1.4.0
Fetching jekyll-feed 0.16.0
Fetching jekyll-include-cache 0.2.1
Installing jekyll-include-cache 0.2.1
Installing faraday-net_http 3.0.0
Installing jekyll-paginate 1.1.0
Installing jekyll-feed 0.16.0
Installing jekyll-sitemap 1.4.0
Fetching faraday 2.5.2
Installing faraday 2.5.2
Fetching sawyer 0.9.2
Installing sawyer 0.9.2
Fetching octokit 4.25.1
Installing octokit 4.25.1
Fetching jekyll-gist 1.5.0
Installing jekyll-gist 1.5.0
Using minimal-mistakes-jekyll 4.24.0 from source at `.`
Bundle complete! 3 Gemfile dependencies, 40 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
sj@gimsujeong-ui-MacBookPro Kimsu10.github.io %
~~~

여기까지는 성공해서 매우 설렜다.
3. `bundle exec jekyll serve`을 입력.
~~~
sj@gimsujeong-ui-MacBookPro Kimsu10.github.io % bundle exec jekyll serve 
Configuration file: /Users/sj/Desktop/Kimsu10.github.io/_config.yml
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
            Source: /Users/sj/Desktop/Kimsu10.github.io
       Destination: /Users/sj/Desktop/Kimsu10.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.879 seconds.
 Auto-regeneration: enabled for '/Users/sj/Desktop/Kimsu10.github.io'
                    ------------------------------------------------
      Jekyll 4.2.2   Please append `--trace` to the `serve` command 
                     for any additional information or backtrace. 
                    ------------------------------------------------
/Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve/servlet.rb:3:in `require': cannot load such file -- webrick (LoadError)
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve/servlet.rb:3:in `<top (required)>'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve.rb:179:in `require_relative'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve.rb:179:in `setup'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve.rb:100:in `process'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/command.rb:91:in `block in process_with_graceful_fail'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/command.rb:91:in `each'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/command.rb:91:in `process_with_graceful_fail'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve.rb:86:in `block (2 levels) in init_with_program'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/mercenary-0.4.0/lib/mercenary/command.rb:221:in `block in execute'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/mercenary-0.4.0/lib/mercenary/command.rb:221:in `each'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/mercenary-0.4.0/lib/mercenary/command.rb:221:in `execute'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/mercenary-0.4.0/lib/mercenary/program.rb:44:in `go'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/mercenary-0.4.0/lib/mercenary.rb:21:in `program'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/exe/jekyll:15:in `<top (required)>'
	from /Users/sj/.rbenv/versions/3.1.2/bin/jekyll:25:in `load'
	from /Users/sj/.rbenv/versions/3.1.2/bin/jekyll:25:in `<top (required)>'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/cli/exec.rb:58:in `load'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/cli/exec.rb:58:in `kernel_load'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/cli/exec.rb:23:in `run'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/cli.rb:486:in `exec'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/vendor/thor/lib/thor/command.rb:27:in `run'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/vendor/thor/lib/thor/invocation.rb:127:in `invoke_command'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/vendor/thor/lib/thor.rb:392:in `dispatch'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/cli.rb:31:in `dispatch'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/vendor/thor/lib/thor/base.rb:485:in `start'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/cli.rb:25:in `start'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/exe/bundle:48:in `block in <top (required)>'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/lib/bundler/friendly_errors.rb:120:in `with_friendly_errors'
	from /Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/bundler-2.3.22/exe/bundle:36:in `<top (required)>'
	from /Users/sj/.rbenv/versions/3.1.2/bin/bundle:25:in `load'
	from /Users/sj/.rbenv/versions/3.1.2/bin/bundle:25:in `<main>'
sj@gimsujeong-ui-MacBookPro Kimsu10.github.io % 
~~~

......실패...
~~~
 Jekyll 4.2.2   Please append `--trace` to the `serve` command 
                     for any additional information or backtrace.
                     ...
/Users/sj/.rbenv/versions/3.1.2/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2/lib/jekyll/commands/serve/servlet.rb:3:in `require': cannot load such file -- webrick (LoadError)
~~~

webrick을 로드 하지 못했다고한다.

## Jekyll 4.2.0 Please append --trace to the serve command for any additional information or backtrace....cannot load such file -- webrick(loadError)

4.`bundle add webrick` 입력.
 ruby 3.0.0 부터 webrick이 기본으로 포함된 gem에서 빠졌기 때문에 `bundle add webrick` 으로 webrick을 추가해주어야 했다.

 
~~~
sj@gimsujeong-ui-MacBookPro Kimsu10.github.io % bundle add webrick
Fetching gem metadata from https://rubygems.org/...........
Resolving dependencies...
Fetching gem metadata from https://rubygems.org/...........
Resolving dependencies...
Using rake 13.0.6
Using public_suffix 5.0.0
Using bundler 2.3.22
Using colorator 1.1.0
Using rb-fsevent 0.11.2
Using concurrent-ruby 1.1.10
Using rexml 3.2.5
Using liquid 4.0.3
Using rouge 3.30.0
Using safe_yaml 1.0.5
Using unicode-display_width 1.8.0
Using jekyll-paginate 1.1.0
Using webrick 1.7.0
Using addressable 2.8.1
Using ruby2_keywords 0.0.5
Using i18n 1.12.0
Using kramdown 2.4.0
Using terminal-table 2.0.0
Using ffi 1.15.5
Using forwardable-extended 2.6.0
Using eventmachine 1.2.7
Using mercenary 0.4.0
Using http_parser.rb 0.8.0
Using faraday-net_http 3.0.0
Using sassc 2.4.0
Using rb-inotify 0.10.1
Using faraday 2.5.2
Using jekyll-sass-converter 2.2.0
Using pathutil 0.16.2
Using sawyer 0.9.2
Using listen 3.7.1
Using kramdown-parser-gfm 1.1.0
Using octokit 4.25.1
Using jekyll-watch 2.2.1
Using em-websocket 0.5.3
Using jekyll-gist 1.5.0
Using jekyll 4.2.2
Using jekyll-feed 0.16.0
Using jekyll-include-cache 0.2.1
Using jekyll-sitemap 1.4.0
Using minimal-mistakes-jekyll 4.24.0 from source at `.`
sj@gimsujeong-ui-MacBookPro Kimsu10.github.io % 

~~~

5. 다시 `bundle exec jekyll serve` 입력.

~~~
sj@gimsujeong-ui-MacBookPro Kimsu10.github.io % bundle exec jekyll serve
Configuration file: /Users/sj/Desktop/Kimsu10.github.io/_config.yml
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
            Source: /Users/sj/Desktop/Kimsu10.github.io
       Destination: /Users/sj/Desktop/Kimsu10.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.609 seconds.
 Auto-regeneration: enabled for '/Users/sj/Desktop/Kimsu10.github.io'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.

~~~

드디어 내가 그렇게도 보고싶어 했던 숫자들이 떴다!!
`localhost:4000`으로 접속해보았고 
![](https://velog.velcdn.com/images/kimsu10/post/461c5022-f5e4-43b7-bebe-85d409844e8d/image.png)
정상적으로 실행되는것을 확인하였다.
<br/>

---


## 느낀점

루비에서 발생한 오류만 해결하면 다 해결된다고 생각했으나 결국 이글에 쓰인 에러 해결하는데만 하루를 바쳤다.
처음에는 brew설치부터 시작해서 에러가 났고, 루비 가상버전도 안만들어졌다.
설치방법대로해도 에러가 계속 발생했는데 M1칩셋을 사용해서였거나 위치 경로를 잘못 잡거나 일정버전이상에서 따로설치해야 하는것들이 있어서였다.
꼬리에 꼬리를 무는 에러들에도 어떻게든 깃허브 블로그를 쓰고싶어 매달렸다. 
4일간은 정말 brew설치빼고는 아무것도 안되서 '포기할까..' 수없이 생각했다.
계속 생각하다보니 5일차에서는 찾아봤던 자료들 중 몇가지가 계속 생각났고 6일차인 오늘 목표를 달성했다.
 
이번에 가장 크게 느낀점이 포기하지 않고 계속하면 결국 해내는구나다.
현재 해냈다는 뿌듯함이 정말 기분좋다.

이제 첫 발을 뗀정도이지만 터미널 창에서 쓰는 리눅스 명령어도 꽤 익숙해졌고, 
여기 적지않은 많은 에러들을 해결하려 구글링하면서 구글링 실력도 좀 늘은것 같다.

근데 포스팅이 되었다는데 글이 안떠서 이걸 해결하는데 또 고생헀다.
