---
layout: single

---


# One

Another day, another blogging engine.

This is a test post to see what it's like to write posts in markdown, via the github editor, for github pages.

I'm trying to change a single setting at a time so I can see what effect it has on the site on github. The documentation is great but there's a lot to learn. The first real page will be either a tutorial showing what I did to get the sit up and running or a Unity3d walkthrough.

I've got a lot of transcribed text already done for the Unity tutorial but it'll need to be massaged into markdown shape and have a few helpful images added. 

Got to try and make things look nice :)

```ruby

module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      self.data['tag'] = tag
      tag_title_prefix = site.config['tag_title_prefix'] || 'Tagged: '
      tag_title_suffix = site.config['tag_title_suffix'] || '&#8211;'
      self.data['title'] = "#{tag_title_prefix}#{tag}"
      self.data['description'] = "An archive of posts tagged #{tag}."
    end
  end
end

```
### Test Post - Please Ignore


![Found this on my PC](/images/be0e732c-b3a3-4e0e-8e68-a1ed3c6ebc6c.jpg)
