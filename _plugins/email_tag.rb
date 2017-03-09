module Jekyll
  class EmailTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text.strip
    end

    def render(context)
      "<a><i class='fa fa-envelope'>&nbsp;</i>#{@text.sub('@', '(ät)')}</a>"
    end
  end
end

Liquid::Template.register_tag('email', Jekyll::EmailTag)
