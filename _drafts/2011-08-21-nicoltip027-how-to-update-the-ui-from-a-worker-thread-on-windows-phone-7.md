---
layout: post
title: NicolTIP#027- How to update the UI from a worker thread on Windows Phone 7?
date: 2011-08-21 06:01
author: nicold
comments: true
categories: [NicolTIP, Threading, Uncategorized, Windows Phone 7]
---
<p>Use “Deployment.Current.Dispatcher.BeginInvoke”. </p>  <p>sample:</p>  <div class="csharpcode">   <pre class="alt">Deployment.Current.Dispatcher.BeginInvoke(<span class="kwrd">delegate</span>()</pre>

  <pre>{</pre>

  <pre class="alt">        LoadingBar = Visibility.Collapsed;</pre>

  <pre>});</pre>
</div>

