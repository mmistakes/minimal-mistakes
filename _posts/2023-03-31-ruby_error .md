오류 해결 내용 

ruby no such file or directory,

이건 루비 설치하면 됌







An error occurred while installing eventmachine (1.2.7), and Bundler cannot continue.

fatal: destination path '/Users/user-name/.rbenv' already exists and is not an empty directory. 





ruby 해결방법 rbenv 설치방법 : 

https://github.com/rbenv/rbenv#how-rbenv-hooks-into-your-shell







이 오류는 이미 "/Users/local/.rbenv" 디렉토리가 존재하며 비어 있지 않기 때문에 Git clone 명령어를 실행할 수 없음을 나타냅니다.

이를 해결하기 위해서는 두 가지 옵션이 있습니다.

1. 이미 존재하는 디렉토리를 삭제하고 새로운 디렉토리를 만드는 방법입니다. 이 방법은 해당 디렉토리 안에 이미 있는 파일을 모두 삭제할 수 있습니다.

   ```
   bashCopy code
   rm -rf /Users/local/.rbenv
   git clone <repository-url>
   ```

2. 이미 존재하는 디렉토리에 새로운 파일을 추가하는 방법입니다. 이 방법은 기존 파일을 유지하면서 새로운 파일을 추가할 수 있습니다.

   ```
   javascriptCopy code
   git clone <repository-url> /Users/local/.rbenv/new-folder
   ```

위의 두 가지 방법 중에서 선택하여 적절한 방법을 선택하시면 됩니다.