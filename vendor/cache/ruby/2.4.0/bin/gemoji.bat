@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"C:\Ruby24-x64\bin\ruby.exe" "C:/Users/Matthew/Documents/GitHub/matthewcrews.github.io/vendor/cache/ruby/2.4.0/bin/gemoji" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
@"C:\Ruby24-x64\bin\ruby.exe" "%~dpn0" %*
