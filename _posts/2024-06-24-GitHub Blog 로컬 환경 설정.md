[Jekyll on Windows](https://jekyllrb.com/docs/installation/windows/) 참고

![RubyInstaller실행](../images/2024-06-24-GitHub%20Blog%20로컬%20환경%20설정/image.png)

rubyinstaller-devkit-3.3.3-1-x64.exe 실행 후 
다음 화면에서 3번 선택하여 인스톨

![alt text](../images/2024-06-24-GitHub%20Blog%20로컬%20환경%20설정/image-1.png)

Github Blog 폴더에서 PowerShell 실행 후 다음 명령어 실행

```powershell
PS D:\workspace_github\xxxxxxxxxx.github.io> gem install jekyll

PS D:\workspace_github\xxxxxxxxxx.github.io> gem install bundler

```

jekyll 로컬 실행
```powershell
PS D:\workspace_github\xxxxxxxxxx.github.io> bundle exec jekyll serve
...
Warning: 1 repetitive deprecation warnings omitted.
Run in verbose mode to see all warnings.
                    done in 1.366 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'D:/workspace_github/smsj1010.github.io'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

아래와 같은 오류 발생 시
```powershell
PS D:\workspace_github\xxxxxxxxxx.github.io> bundle exec jekyll serve

[!] There was an error while loading `minimal-mistakes-jekyll.gemspec`: No such file or directory @ rb_sysopen - package.json. Bundler cannot continue.
 #  from D:/workspace_github/xxxxxxxxxx.github.io/_site/minimal-mistakes-jekyll.gemspec:3
 #  -------------------------------------------
 #    spec.add_development_dependency "rake", ">= 12.3.3"
 >  end
 #  require "json"
 #  -------------------------------------------

```

Gemfile 에 다음 추가

```
source "https://rubygems.org"
gemspecs                        # gemspec를 gemspecs 로 변경
gem "minimal-mistakes-jekyll"   # 추가
```

bundle install 실행 후 jekyll 로컬 실행
```powershell
PS D:\workspace_github\xxxxxxxxxx.github.io> bundle install
```
