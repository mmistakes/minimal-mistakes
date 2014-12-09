# Title: Simple Video tag for Jekyll
# Author: Brandon Mathis http://brandonmathis.com
# Description: Easily output MPEG4 HTML5 video with a flash backup.
#
# Syntax {% video url/to/video [width height] [url/to/poster] %}
#
# Example:
# {% video http://site.com/video.mp4 720 480 http://site.com/poster-frame.jpg %}
#
# Output:
# <video width='720' height='480' preload='none' controls poster='http://site.com/poster-frame.jpg'>
#   <source src='http://site.com/video.mp4' type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"'/>
# </video>
#

module Jekyll

  class VideoTag < Liquid::Tag
    @video = nil
    @poster = ''
    @height = ''
    @width = ''

    def initialize(tag_name, markup, tokens)
      if markup =~ /(https?:\S+)(\s+(https?:\S+))?(\s+(https?:\S+))?(\s+(\d+)\s(\d+))?(\s+(https?:\S+))?/i
        @video  = [$1, $3, $5].compact
        @width  = $7
        @height = $8
        @poster = $10
      end
      super
    end

    def render(context)
      output = super
      type = {
        'mp4' => "type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"'",
        'ogv' => "type='video/ogg; codecs=theora, vorbis'",
        'webm' => "type='video/webm; codecs=vp8, vorbis'"
      }
      if @video.size > 0
        video =  "<video width='#{@width}' height='#{@height}' preload='none' controls poster='#{@poster}'>"
        @video.each do |v|
          t = v.match(/([^\.]+)$/)[1]
          video += "<source src='#{v}' #{type[t]}>"
        end
        video += "</video>"
      else
        "Error processing input, expected syntax: {% video url/to/video [url/to/video] [url/to/video] [width height] [url/to/poster] %}"
      end
    end
  end
end

Liquid::Template.register_tag('video', Jekyll::VideoTag)

