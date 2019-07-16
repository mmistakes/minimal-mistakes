# frozen_string_literal: true

module Rouge
  module Lexers
    load_lexer 'javascript.rb'

    class JSX < Javascript
      title 'JSX'
      desc 'React JSX (https://facebook.github.io/react/)'
      tag 'jsx'
      aliases 'jsx', 'react'
      filenames '*.jsx'

      mimetypes 'text/x-jsx', 'application/x-jsx'

      id = Javascript.id_regex

      def start_embed!
        @embed ||= JSX.new(options)
        @embed.reset!
        @embed.push(:expr_start)
        push :jsx_embed_root
      end

      def tag_token(name)
        name[0] =~ /\p{Lower}/ ? Name::Tag : Name::Class
      end

      start { @html = HTML.new(options) }

      state :jsx_tags do
        rule %r/</, Punctuation, :jsx_element
      end

      state :jsx_internal do
        rule %r(</) do
          token Punctuation
          goto :jsx_end_tag
        end

        rule %r/{/ do
          token Str::Interpol
          start_embed!
        end

        rule %r/[^<>{]+/ do
          delegate @html
        end

        mixin :jsx_tags
      end

      prepend :expr_start do
        mixin :jsx_tags
      end

      state :jsx_tag do
        mixin :comments_and_whitespace
        rule %r/#{id}/ do |m|
          token tag_token(m[0])
        end

        rule %r/[.]/, Punctuation
      end

      state :jsx_end_tag do
        mixin :jsx_tag
        rule %r/>/, Punctuation, :pop!
      end

      state :jsx_element do
        rule %r/#{id}=/, Name::Attribute, :jsx_attribute
        mixin :jsx_tag
        rule %r/>/ do token Punctuation; goto :jsx_internal end
        rule %r(/>), Punctuation, :pop!
      end

      state :jsx_attribute do
        rule %r/"(\\[\\"]|[^"])*"/, Str::Double, :pop!
        rule %r/'(\\[\\']|[^'])*'/, Str::Single, :pop!
        rule %r/{/ do
          token Str::Interpol
          pop!
          start_embed!
        end
      end

      state :jsx_embed_root do
        rule %r/[.][.][.]/, Punctuation
        rule %r/}/, Str::Interpol, :pop!
        mixin :jsx_embed
      end

      state :jsx_embed do
        rule %r/{/ do delegate @embed; push :jsx_embed end
        rule %r/}/ do delegate @embed; pop! end
        rule %r/[^{}]+/ do
          delegate @embed
        end
      end
    end
  end
end

