# Title: Simple Code Blocks for Jekyll
# Author: Brandon Mathis http://brandonmathis.com
# Description: Write codeblocks with semantic HTML5 <figure> and <figcaption> elements and optional syntax highlighting — all with a simple, intuitive interface.
#
# Syntax:
# {% codeblock [title] [url] [link text] %}
# code snippet
# {% endcodeblock %}
#
# For syntax highlighting, put a file extension somewhere in the title. examples:
# {% codeblock file.sh %}
# code snippet
# {% endcodeblock %}
#
# {% codeblock Time to be Awesome! (awesome.rb) %}
# code snippet
# {% endcodeblock %}
#
# Example:
#
# {% codeblock Got pain? painreleif.sh http://site.com/painreleief.sh Download it! %}
# $ rm -rf ~/PAIN
# {% endcodeblock %}
#
# Output:
#
# <figure class='code'>
# <figcaption><span>Got pain? painrelief.sh</span> <a href="http://site.com/painrelief.sh">Download it!</a>
# <div class="highlight"><pre><code class="sh">
# -- nicely escaped highlighted code --
# </code></pre></div>
# </figure>
#
# Example 2 (no syntax highlighting):
#
# {% codeblock %}
# <sarcasm>Ooooh, sarcasm... How original!</sarcasm>
# {% endcodeblock %}
#
# <figure class='code'>
# <pre><code>&lt;sarcasm> Ooooh, sarcasm... How original!&lt;/sarcasm></code></pre>
# </figure>
#
require './_plugins/pygments_code'
require './_plugins/raw'

module Jekyll

  class CodeBlock < Liquid::Block
    CaptionUrlTitle = /(\S[\S\s]*)\s+(https?:\/\/\S+|\/\S+)\s*(.+)?/i
    Caption = /(\S[\S\s]*)/
    def initialize(tag_name, markup, tokens)
      @title = nil
      @caption = nil
      @filetype = nil
      @highlight = true
      if markup =~ /\s*lang:(\S+)/i
        @filetype = $1
        markup = markup.sub(/\s*lang:(\S+)/i,'')
      end
      if markup =~ CaptionUrlTitle
        @file = $1
        @caption = "<figcaption><span>#{$1}</span><a href='#{$2}'>#{$3 || 'link'}</a></figcaption>"
      elsif markup =~ Caption
        @file = $1
        @caption = "<figcaption><span>#{$1}</span></figcaption>\n"
      end
      if @file =~ /\S[\S\s]*\w+\.(\w+)/ && @filetype.nil?
        @filetype = $1
      end
      super
    end

    def render(context)
      output = super
      code = super
      source = "<figure class='code'>"
      source += @caption if @caption
      if @filetype
        source += "#{HighlightCode::highlight(code, @filetype)}</figure>"
      else
        source += "#{HighlightCode::tableize_code(code.lstrip.rstrip.gsub(/</,'&lt;'))}</figure>"
      end
      source = TemplateWrapper::safe_wrap(source)
      source = context['pygments_prefix'] + source if context['pygments_prefix']
      source = source + context['pygments_suffix'] if context['pygments_suffix']
      source
    end
  end
end

Liquid::Template.register_tag('codeblock', Jekyll::CodeBlock)
