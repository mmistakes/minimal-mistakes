---
title: Understanding how User and Application settings are managed via Visual Studio 2005/2008
tags: [visualStudio, Settings]
---
<p>When you write a .NET application, to manage configuration settings is often required. These configuration settings can have a &quot;user&quot; or &quot;application&quot; scope.</p>  <p>User settings can be different for each user will use the application, instead application parameter is fixed and defined for the entire machine.</p>  <p>Visual Studio 2005 (and 2008 as well) allows, adding a &quot;settings&quot; item to the solution/project to manage easily this kind of settings.</p>  <p>To create a settings item you can use the context menu on a project and select &quot;new item&quot;-&gt;&quot;Settings File&quot;.</p>  <p>Visual Studio generates a class derived from System.Configuration.ApplicationSettingsBase, and a &quot;app.config&quot; file that contains an XML where you can find default values for all settings you'll define.</p>  <p>As shown below, from Visual Studio, is trivial add a setting using the visual interface:</p>  <p><a href="https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_msdn/nicold/WindowsLiveWriter/System.C.ApplicationSettingsBasebehaviur_7FDC/image_2.png" original-url="http://blogs.msdn.com/blogfiles/nicold/WindowsLiveWriter/System.C.ApplicationSettingsBasebehaviur_7FDC/image_2.png"><img style="border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px; border-right-width: 0px" height="318" alt="image" src="https://msdnshared.blob.core.windows.net/media/TNBlogsFS/BlogFileStorage/blogs_msdn/nicold/WindowsLiveWriter/System.C.ApplicationSettingsBasebehaviur_7FDC/image_thumb.png" original-url="http://blogs.msdn.com/blogfiles/nicold/WindowsLiveWriter/System.C.ApplicationSettingsBasebehaviur_7FDC/image_thumb.png" width="544" border="0" /></a> </p>  <p>In this case I added an &quot;Age&quot; setting of integer type with default value of 35.</p>  <p>Each time I add a setting, Visual Studio does 2 operations:</p>  <p>(1) it modifies *.designer.cs file related to my settings adding:</p>  <div class="csharpcode">   <pre class="alt"><span class="lnum"> 1: </span>[global::System.Configuration.UserScopedSettingAttribute()] </pre>

  <pre><span class="lnum"> 2: </span>[global::System.Diagnostics.DebuggerNonUserCodeAttribute()] </pre>

  <pre class="alt"><strong><span class="lnum"> 3: </span>[global::System.Configuration.DefaultSettingValueAttribute(<span class="str">&quot;35&quot;</span>)] </strong></pre>

  <pre><span class="lnum"> 4: </span><span class="kwrd">public</span> <span class="kwrd">int</span> Age { </pre>

  <pre class="alt"><span class="lnum"> 5: </span> get { </pre>

  <pre><span class="lnum"> 6: </span> <span class="kwrd">return</span> ((<span class="kwrd">int</span>)(<span class="kwrd">this</span>[<span class="str">&quot;Age&quot;</span>])); </pre>

  <pre class="alt"><span class="lnum"> 7: </span> } </pre>

  <pre><span class="lnum"> 8: </span> set { </pre>

  <pre class="alt"><span class="lnum"> 9: </span> <span class="kwrd">this</span>[<span class="str">&quot;Age&quot;</span>] = <span class="kwrd">value</span>; </pre>

  <pre><span class="lnum"> 10: </span> } </pre>

  <pre class="alt"><span class="lnum"> 11: </span> }</pre>
</div>
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

<p>(2) It modifies app.config file adding:</p>

<div class="csharpcode">
  <pre class="alt"><span class="lnum"> 1: </span><span class="kwrd">&lt;</span><span class="html">ConsoleApplication1.NicolSettings</span><span class="kwrd">&gt;</span> </pre>

  <pre><span class="lnum"> 2: </span> <span class="kwrd">&lt;</span><span class="html">setting</span> <span class="attr">name</span><span class="kwrd">=&quot;Age&quot;</span> <span class="attr">serializeAs</span><span class="kwrd">=&quot;String&quot;</span><span class="kwrd">&gt;</span> </pre>

  <pre class="alt"><span class="lnum"><strong> 3:</strong> </span> <strong> <span class="kwrd">&lt;</span><span class="html">value</span><span class="kwrd">&gt;</span>35<span class="kwrd">&lt;/</span><span class="html">value</span><span class="kwrd">&gt;</span> </strong></pre>

  <pre><span class="lnum"> 4: </span> <span class="kwrd">&lt;/</span><span class="html">setting</span><span class="kwrd">&gt;</span> </pre>

  <pre class="alt"><span class="lnum"> 5: </span><span class="kwrd">&lt;/</span><span class="html">ConsoleApplication1.NicolSettings</span><span class="kwrd">&gt;</span> </pre>
</div>
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

<p>As you can seem the default value (<strong>35</strong>) is present in both class and .config files. Is this redundant? No! infact in this way the .exe or the .dll generated file already contains his default settings and can word without the external (global) configuration file.</p>

<p>This means that:</p>

<ul>
  <li>If I run the application without the corresponding .config file in his directory, the settings class will use the default setting provided inside the code </li>

  <li>If I run the application with the .config file present in his directory, the application will use the value provided in the XML </li>
</ul>

<p>So the usefullnes of .config file is clear where there is the requirement to override one of default value hard-coded in the application with a new applicatin wide setting.</p>

<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:85f90f7c-3a83-4c18-a0d6-e5a2f3660f81" style="padding-right: 0px; display: inline; padding-left: 0px; padding-bottom: 0px; margin: 0px; padding-top: 0px">Technorati Tag: 
		<a href="http://technorati.com/tags/VisualStudio/" rel="tag">VisualStudio</a>
		, 
		<a href="http://technorati.com/tags/Settings/" rel="tag">Settings</a>
		</div>
