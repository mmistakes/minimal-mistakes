---
layout: page
title: About me
tags: [about, me, profile, skills, ppinera]
modified: 2014-10-11T20:53:07.573882-04:00
comments: true
image:
  feature: sample-image-2.jpg
  credit: WeGraphics
  creditlink: http://wegraphics.net/downloads/free-ultimate-blurred-background-pack/
---
I'm Pedro Piñera Buendía, Electronic & Communication Engineer and Mobile Developer currently working on Redbooth. I've been working with mobile technologies from 2010 when I started developing apps for iOS, since then I've relesed applications such as **Solare** to help people to protect them from the sun, **yonkiPOPS**, an app that offers film recommendations to the users, **Movi time** to let you know about the cinemas in your area and their schedules, ...

The summer of 2013 I joined **Redbooth** as iOS Developer and I've been improving my skills there focusing in aspects like API interactions, integrations, data persistence or view management amongst other. I've been helping the Redbooth **Android** team too and I learnt then the fundamentals of Android development. Moreover I've learnt about **Ruby** implementing some libraries and controllers with it.

During these years I've worked in different Open Source projects in different languages. All of them are published in Github with their respective documentation, tests, an support through issues.

## Skills

**Mobile**
- Setup project with an scalable structure and connect it with a **CI environment** (like travis, jenkings, wercker)
- Interaction with **Web APIs** *(through client entities that handle remote request)*
- **Local persistence** on databases, local app storage, ... *(experience with CoreData and Realm)*
- **CocoaPods/Gradle** experience to setup different build configurations and integration with libraries/frameworks
- Experience with **Unit Testing** on both iOS and Android *(using native Frameworks or ruby-like syntax wrappers like Kiwi, Specta, ...)*
- **Strong layout experience** using Autolayouts in case of iOS and building layouts from scratch on Android. *In favour of coding Autolayout constraints*
- **Mobile Architectures** for scalable and modular apps
- **Release processes** using versioning tools *(using milestones, releases, tags and branches to keep a clear vision of the release process and have everything coordinated and perfectly integrated)*

**Other Skills**
- Experience in **Ruby**, developed small gems wich different purposes.
- **Javascript**: A bit of experience in Javascript, patterns and frameworks such as BackboneJS, JQuery, Underscore. Moreover I have experience using CoffeeScript as a Javascript language wrapper.

**Played With**
- Node, Gulp, Vagrant, Nginx, Jekyll, Octopress.
- Regular Expressions.
- AngularJS, Ionic Framework.
- Android Annotations, Loopj Async HTTP, Android TV Layout building.

## Work experience

### Personal Projects
I've worked on different apps since I started as a mobile developer like Solare and Yonkipops amongst others but currently they are no longer mantained because I'm currently focused on my current project, 8fit and other Open Source libraries that I'm maintaining simultaneusly

### Redbooth
I started with Redbooth in 2013 and I joined the iOS team to work remotely (I was finishing the University) as a Freelance. During the that year I was working for Redbooth I improved my knowledge on areas like data persistance, API interactions, Core Data, mobile architectures, Objective-C patterns, and had the opportunity to deal with XMPP helping the company to build its own chat client integrated into the company's solution. Moreover I had the opportunity to develop for the Android team too which for me was a good chance to dive into the Android development. I've been improving my Android background since them and although it's not at the level of the iOS one it's pretty one.

### 8fit
Ending 2014 I left Redbooth to join 8fit, founded by Pablo Villalba, which founded the company I was working with. He had started a new project that year and I got so motivated with it that I couldn't say no. On that new job position I assumed the role of mobile lead managing both, iOS and Android projects and supporting the web-app solution to offer the best mobile experience as possible. I'm covering with 8fit things like In-App-Purchase payments, Android Expansion Packs, Mobile-Web patterns, Healthkit and GoogleFit integrations, and I'm even learning Javascript and doing some stuff on the frontend side.

## Open Source projects

### iOS
- **PPiAwesomeButton:** UIButton category with new methods to setup a button with text + FontAwesome Icon. Open App. [Link](https://github.com/pepibumur/PPiAwesomeButton)
- **PPiFlatSegmentedControl:** PPiFlatSegmentedControl is an UI Control developed avoiding original UISegmentedControl to get interesting features related with the flat design. For better appearance you can add Font Awesome library to your project and use their icons into the Segmented Control. [Link](https://github.com/pepibumur/PPiFlatSegmentedControl)
- **MagicMP:** I noticed that the new MultiPeer framework introduced in iOS 7 was segmented in two main components and still using delegates. The framework has an abstraction layer in viewController format to explore nearby users, or advertiser devices, but.. What if we don't want to implement the module using viewControllers? Here's where MagicMP appears, it unifies both components in an easy way, with blocks and a singleton class, use whenever you want without depending on a ViewController. [Link](https://github.com/pepibumur/MagicMP)
- **PPiShowtime-Google-iOS-Library:** Get showtimes from any City thanks to Google Showtime. I discovered there was no option to access to this information so I decided to parse the information directly from their Website. As iOS Developer I thought it would be useful to release a Objective-C class to get/parse this information for all developers. I called it PPiShowtime. [Link](https://github.com/pepibumur/PPiShowtime-Google-iOS-Library)
- **SugarRecord:** SugarRecord is a management library to make it easier work with CoreData and REALM. Thanks to SugarRecord you'll be able to start working with CoreData/REALM with just a few lines of code. [Link](https://github.com/SugarRecord/SugarRecord)

### Android
- **EditTextMentions:** EditText subclass with mentions detection (like Facebook or Twitter). https://github.com/pepibumur/EditTextMentions.
- **Emojize:** Emojize is a Java library to convert keyboard emojis to chearsheet. [Link](https://github.com/pepibumur/emojize)

### Python
- **Pushpy:** Pushpy is a push notification server based on Python. It's composed by a users database to store users token ( and more information that the server owner wants ), a web interface with Google Login to send notifications using a web platform. The Google emails accounts allowed to send notifications are stored in another database. [Link](https://github.com/pepibumur/PushPy)

## Applications released
- **Solare:** Solare is an application to help people to protect their skin from ultraviolet light. It alerts when the levels are higher than the expected ones, the protection level that you should use of sun protector and everything is based in your location with real time information. [Link](https://itunes.apple.com/es/app/solare/id533472988?mt=8)
- **YonkiPOPS Mobile:** yonkiPOPS is a great tool for alls movie lovers who wants to have a powerfull pocket tool. With this application you can seek information from any movie, to see the billboard of your nearest theaters and buy the tickets. All without leaving the application. [Link](https://itunes.apple.com/en/app/yonkipops-mobile/id550995249?mt=8)
- **Movi Time:** Movi is a simple tool to find theaters near your position and know instantly billboard, schedules, and practical information for the film. [Link](https://itunes.apple.com/en/app/movi/id576948547?mt=8)
- **iPremio:** Application to check if your Christmas Lottery is prized. [Link](https://itunes.apple.com/en/app/ipremio-loteria-de-navidad/id584583645?mt=8)

## Talks and posts
- **En busca de la arquitectura perfecta: VIPER (iOS):** Talk about the VIPER architecture applied to iOS application. I explain there the transition between using a monolytic architecture using MVC with elements too coupled to that new architecture where every component manages only one kind of operation.  [Link](http://2014.codemotion.es/en/agenda.html?recommended=#day2/en-busca-de-la-arquitectura-perfecta-viper-ios
- **Hybrid mobile applications for a fast development - 8fit:** Talk about the steps we followed on 8fit to have a mobile web-app solution for our platform with a real mobile experience. [Link](https://speakerdeck.com/pepibumur/hybrid-mobile-applications-for-a-fast-development) https://www.youtube.com/watch?v=5pf_GBR0dTs
- **Swift and Objective-C playing together:** Start using Swift in your Objective-C projects. Avoid some headaches with these useful tips and advices for the communication layer between your Objective-C code base and your future Swift implementations [Link](https://speakerdeck.com/pepibumur/swift-and-objective-c-playing-together)

*Most of my posts were in the old website. I'll be publishing new ones soon*
 
<a markdown="0" href="{{ site.url }}/assets/others/english_cv.pdf" class="btn">Get my CV</a>

<!-- http://technicalpickles.com/posts/using-markdown-in-vim/ -->
