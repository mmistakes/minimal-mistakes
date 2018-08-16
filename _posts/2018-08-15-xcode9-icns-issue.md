---
title:  "Xcode 9: issue of generating icns file"
date:   2018-08-15 10:57:07 +0800
---

During developing of my new app [Pica](http://pica.strikingly.com/){:target="_blank"}, I find some apps' icns files do not contains all format as I presume, even those apps update in recent days.

For example, [Colorcast](https://colorcast-app.com/){:target="_blank"}, [MetaImage](https://neededapps.com/metaimage/){:target="_blank"}, [Pixelmator Pro](https://www.pixelmator.com/pro/){:target="_blank"}.
 
I contact their developers and they do not expect such issue and have no idea.

After some test, I find the reason behind it. Here are my steps:

1. Create a new project in Xcode 8 and Xcode 9 respectively. Name the first one as project1, the second one project2.
2. Drag 10 icon png files (resolutions are `16 x 16`, `32 x 32`, `128 x 128`, `256 x 256`, `512 x 512`, and their @2x version) into Assets.xcassets->AppIcon. Arrange them by resolution properly.
	
	<figure class="half">
	<a href="https://user-images.githubusercontent.com/55504/44130159-acfc7e88-a07e-11e8-868f-60f07e5228ed.png"><img src="https://user-images.githubusercontent.com/55504/44130159-acfc7e88-a07e-11e8-868f-60f07e5228ed.png"></a>
	<figcaption>Xcode's app icon setting.</figcaption>
	</figure>

3. Run the projects.
	
	project1.app's bundle only contains an icns file, no Assets.car. And the icns file contains all 10 formats added in step 2.
	
	project2.app's bundle contains an icns file and Assets.car. And the icns file contains **only 4** formats added in step 2. They are `16 x 16`, `32 x 32`, `128 x 128`, `256 x 256`. The Assets.car contains all 10 formats above, and some other files named like "ZZPackedAsset-1.0.0-gamut". (I'm using a tool named [Asset Catalog Tinkerer](https://github.com/insidegui/AssetCatalogTinkerer){:target="_blank"} to open .car files).

	<figure class="half">
	<a href="https://user-images.githubusercontent.com/55504/44184789-393d4e80-a143-11e8-9d99-fa088f304e71.png"><img src="https://user-images.githubusercontent.com/55504/44184789-393d4e80-a143-11e8-9d99-fa088f304e71.png"></a>
	<figcaption>AppIcon.icns in Preview.app</figcaption>
	</figure>
	
	<figure class="half">
	<a href="https://user-images.githubusercontent.com/55504/44184107-794f0200-a140-11e8-957a-c2d78b275be0.png"><img src="https://user-images.githubusercontent.com/55504/44184107-794f0200-a140-11e8-957a-c2d78b275be0.png"></a>
	<figcaption>Assets.car in Asset Catalog Inkerer.app</figcaption>
	</figure>

4. Quit all Xcode. Use Xcode 9 to open project1, clean and run. Now the app bundle contains wrong icns file and Assets.car.

I can't use Xcode 8 to open project2, an error shows "Failed to load project at '/xxx/yyy/zzz.xcodeproj', incompatible project version.".

<figure class="half">
<a href="https://user-images.githubusercontent.com/55504/44315231-a0fddd00-a454-11e8-8849-222b65cbd7c5.png"><img src="https://user-images.githubusercontent.com/55504/44315231-a0fddd00-a454-11e8-8849-222b65cbd7c5.png"></a>
<figcaption>Xcode 8 can not open Xcode 9 project.</figcaption>
</figure>


It is clear that Xcode 9 has bug in processing app's icon. It can not generate correct icns file and it includes icon's raw png file into assets package, which is unnecessary.

But, even the bug exists, user can hardly notice it, because he can see the right result at any used places of the app icon, Finder(zoom in to view max-size icon), Launchpad, Activity Monitor.

PS, I use Xcode 8.3.3, Xcode 9.4.1. Then I test Xcode 10 beta 6, the bug still exists.

The test projects are [here](https://github.com/cool8jay/xcode9-icns-issue){:target="_blank"}.