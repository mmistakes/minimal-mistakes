---
title: NicolTIP#031- How to count number of lines of code in a c# project via powershell?
tags: [NicolTIP, powershell, Visual Studio]
---
<p><code><i>(dir -include *.cs -recurse | select-string &quot;^(\s*)//&quot; -notMatch | select-string &quot;^(\s*)$&quot; -notMatch).Count</i></code></p>
