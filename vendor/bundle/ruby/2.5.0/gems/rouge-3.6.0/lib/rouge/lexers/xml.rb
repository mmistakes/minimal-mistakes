# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class XML < RegexLexer
      title "XML"
      desc %q(<desc for="this-lexer">XML</desc>)
      tag 'xml'
      filenames '*.xml', '*.xsl', '*.rss', '*.xslt', '*.xsd', '*.wsdl', '*.svg',
                '*.plist'
      mimetypes 'text/xml', 'application/xml', 'image/svg+xml',
                'application/rss+xml', 'application/atom+xml'

      def self.detect?(text)
        return false if text.doctype?(/html/)
        return true if text =~ /\A<\?xml\b/
        return true if text.doctype?
      end

      state :root do
        rule %r/[^<&]+/, Text
        rule %r/&\S*?;/, Name::Entity
        rule %r/<!\[CDATA\[.*?\]\]\>/, Comment::Preproc
        rule %r/<!--/, Comment, :comment
        rule %r/<\?.*?\?>/, Comment::Preproc
        rule %r/<![^>]*>/, Comment::Preproc

        # open tags
        rule %r(<\s*[\w:.-]+)m, Name::Tag, :tag

        # self-closing tags
        rule %r(<\s*/\s*[\w:.-]+\s*>)m, Name::Tag
      end

      state :comment do
        rule %r/[^-]+/m, Comment
        rule %r/-->/, Comment, :pop!
        rule %r/-/, Comment
      end

      state :tag do
        rule %r/\s+/m, Text
        rule %r/[\w.:-]+\s*=/m, Name::Attribute, :attr
        rule %r(/?\s*>), Name::Tag, :pop!
      end

      state :attr do
        rule %r/\s+/m, Text
        rule %r/".*?"|'.*?'|[^\s>]+/m, Str, :pop!
      end
    end
  end
end
