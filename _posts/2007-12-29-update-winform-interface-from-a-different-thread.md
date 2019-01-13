---
title: Update WinForm interface from a different thread
tags: [c#, Threading, Windows Form]
---
<p>Well, this is a typical issue when you have a thread that works (i.e. a Workflow) and a UI that needs to be updated.</p> <p>Let assume that you have a WinFom and you need to update its windows Title from another thread. The other thread needs to call "UpdateTitle" public method of current Form instance. If you write the following code:</p><pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> MainForm : Form
{
   ...
   
   <span class="kwrd">void</span> UpdateTitle(<span class="kwrd">string</span> newTitle)
   {
      <span class="kwrd">this</span>.Text = newTitle;         
   }

   ...
}</pre>
<style type="text/css">.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }
</style>

<p>
<p><span class="kwrd">UpdateTitle will work only if you call the method from the UI thread.</span></p>
<p>In order to make this call thread safe, I found two ways, choose the one that fits your needs:-)</p>
<p>&nbsp;</p>
<h1>Method ONE: Using a delegate</h1>
<p>&nbsp;</p><pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> MainForm : Form
{
   ...
   
   <span class="kwrd">private</span> <span class="kwrd">delegate</span> <span class="kwrd">void</span> UpdateTitleDelegate(<span class="kwrd">string</span> s);
   <span class="kwrd">void</span> UpdateTitle(<span class="kwrd">string</span> newTitle)
   {
   <span class="kwrd">if</span> (<span class="kwrd">this</span>.InvokeRequired)             
      <span class="kwrd">this</span>.Invoke(<span class="kwrd">new</span> UpdateTitleDelegate                 
         (<span class="kwrd">this</span>.UpdateTitle), newTitle);         
   <span class="kwrd">else</span>         
      {             
      <span class="kwrd">this</span>.Text = newTitle;         
      }
   }

   ...
}</pre><pre class="csharpcode">&nbsp;</pre>
<style type="text/css">
.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }</style>

<style type="text/css">
.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }</style>

<style type="text/css">
.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }</style>

<h1>Method TWO: using MethodInvoker</h1><pre class="csharpcode"><span class="kwrd"></span>&nbsp;</pre><pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> MainForm : Form
{
   ...
      
   <span class="kwrd">void</span> UpdateTitle(<span class="kwrd">string</span> newTitle)
   {
   <span class="kwrd">if</span> (<span class="kwrd">this</span>.InvokeRequired)             
      <span class="kwrd">this</span>.Invoke(<span class="kwrd">new</span> MethodInvoker(<span class="kwrd">delegate</span>()
      {
      <span class="kwrd">this</span>.Text = newTitle;    
      }));
   <span class="kwrd">else</span>         
      {             
      <span class="kwrd">this</span>.Text = newTitle;         
      }
   }
   ...
}
</pre>
<p>For more information have a look to <a href="http://msdn2.microsoft.com/en-us/library/system.windows.forms.control.invokerequired.aspx" target="_blank">Control.InvokeRequired</a> property on MSDN.</p>
