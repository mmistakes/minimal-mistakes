# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class Liquid < RegexLexer
      title "Liquid"
      desc 'Liquid is a templating engine for Ruby (liquidmarkup.org)'
      tag 'liquid'
      filenames '*.liquid'

      state :root do
        rule %r/[^\{]+/, Text

        rule %r/(\{%)(\s*)/ do
          groups Punctuation, Text::Whitespace
          push :tag_or_block
        end

        rule %r/(\{\{)(\s*)/ do
          groups Punctuation, Text::Whitespace
          push :output
        end

        rule %r/\{/, Text
      end

      state :tag_or_block do
        # builtin logic blocks
        rule %r/(if|unless|elsif|case)(?=\s+)/, Keyword::Reserved, :condition

        rule %r/(when)(\s+)/ do
          groups Keyword::Reserved, Text::Whitespace
          push :when
        end

        rule %r/(else)(\s*)(%\})/ do
          groups Keyword::Reserved, Text::Whitespace, Punctuation
          pop!
        end

        # other builtin blocks
        rule %r/(capture)(\s+)([^\s%]+)(\s*)(%\})/ do
          groups Name::Tag, Text::Whitespace, Name::Attribute, Text::Whitespace, Punctuation
          pop!
        end

        rule %r/(comment)(\s*)(%\})/ do
          groups Name::Tag, Text::Whitespace, Punctuation
          push :comment
        end

        rule %r/(raw)(\s*)(%\})/ do
          groups Name::Tag, Text::Whitespace, Punctuation
          push :raw
        end

        rule %r/assign/, Name::Tag, :assign
        rule %r/include/, Name::Tag, :include

        # end of block
        rule %r/(end(?:case|unless|if))(\s*)(%\})/ do
          groups Keyword::Reserved, Text::Whitespace, Punctuation
          pop!
        end

        rule %r/(end(?:[^\s%]+))(\s*)(%\})/ do
          groups Name::Tag, Text::Whitespace, Punctuation
          pop!
        end

        # builtin tags
        rule %r/(cycle)(\s+)(([^\s:]*)(:))?(\s*)/ do |m|
          token Name::Tag, m[1]
          token Text::Whitespace, m[2]

          if m[4] =~ /'[^']*'/
            token Str::Single, m[4]
          elsif m[4] =~ /"[^"]*"/
            token Str::Double, m[4]
          else
            token Name::Attribute, m[4]
          end

          token Punctuation, m[5]
          token Text::Whitespace, m[6]

          push :variable_tag_markup
        end

        # iteration
        rule %r/
          (for)(\s+)
          ([\w-]+)(\s+)
          (in)(\s+)
          (
            (?: [^\s,\|'"] | (?:"[^"]*"|'[^']*') )+
          )(\s*)
        /x do |m|
          groups Name::Tag, Text::Whitespace, Name::Variable, Text::Whitespace,
                 Keyword::Reserved, Text::Whitespace

          token_class = case m[7]
                        when %r/'[^']*'/ then Str::Single
                        when %r/"[^"]*"/ then Str::Double
                        else
                          Name::Variable
                        end
          token token_class, m[7]
          token Text::Whitespace, m[8]
          push :tag_markup
        end

        # other tags or blocks
        rule %r/([^\s%]+)(\s*)/ do
          groups Name::Tag, Text::Whitespace
          push :tag_markup
        end
      end

      state :output do
        mixin :whitespace
        mixin :generic

        rule %r/\}\}/, Punctuation, :pop!
        rule %r/\|/, Punctuation, :filters
      end

      state :filters do
        mixin :whitespace

        rule(/\}\}/) { token Punctuation; reset_stack }

        rule %r/([^\s\|:]+)(:?)(\s*)/ do
          groups Name::Function, Punctuation, Text::Whitespace
          push :filter_markup
        end
      end

      state :filter_markup do
        rule %r/\|/, Punctuation, :pop!

        mixin :end_of_tag
        mixin :end_of_block
        mixin :default_param_markup
      end

      state :condition do
        mixin :end_of_block
        mixin :whitespace

        rule %r/([=!><]=?)/, Operator

        rule %r/\b(?:(!)|(not\b))/ do
          groups Operator, Operator::Word
        end

        rule %r/(contains)/, Operator::Word

        mixin :generic
        mixin :whitespace
      end

      state :when do
        mixin :end_of_block
        mixin :whitespace
        mixin :generic
      end

      state :operator do
        rule %r/(\s*)((?:=|!|>|<)=?)(\s*)/ do
          groups Text::Whitespace, Operator, Text::Whitespace
          pop!
        end

        rule %r/(\s*)(\bcontains\b)(\s*)/ do
          groups Text::Whitespace, Operator::Word, Text::Whitespace
          pop!
        end
      end

      state :end_of_tag do
        rule(/\}\}/) { token Punctuation; reset_stack }
      end

      state :end_of_block do
        rule(/%\}/) { token Punctuation; reset_stack }
      end

      # states for unknown markup
      state :param_markup do
        mixin :whitespace
        mixin :string

        rule %r/([^\s=:]+)(\s*)(=|:)/ do
          groups Name::Attribute, Text::Whitespace, Operator
        end

        rule %r/(\{\{)(\s*)([^\s\}])(\s*)(\}\})/ do
          groups Punctuation, Text::Whitespace, Text, Text::Whitespace, Punctuation
        end

        mixin :number
        mixin :keyword

        rule %r/,/, Punctuation
      end

      state :default_param_markup do
        mixin :param_markup
        rule %r/./, Text
      end

      state :variable_param_markup do
        mixin :param_markup
        mixin :variable
        rule %r/./, Text
      end

      state :tag_markup do
        mixin :end_of_block
        mixin :default_param_markup
      end

      state :variable_tag_markup do
        mixin :end_of_block
        mixin :variable_param_markup
      end

      # states for different values types
      state :keyword do
        rule %r/\b(false|true)\b/, Keyword::Constant
      end

      state :variable do
        rule %r/\.(?=\w)/, Punctuation
        rule %r/[a-zA-Z_]\w*\??/, Name::Variable
      end

      state :string do
        rule %r/'[^']*'/, Str::Single
        rule %r/"[^"]*"/, Str::Double
      end

      state :number do
        rule %r/\d+\.\d+/, Num::Float
        rule %r/\d+/, Num::Integer
      end

      state :array_index do
        rule %r/\[/, Punctuation
        rule %r/\]/, Punctuation
      end

      state :generic do
        mixin :array_index
        mixin :keyword
        mixin :string
        mixin :variable
        mixin :number
      end

      state :whitespace do
        rule %r/[ \t]+/, Text::Whitespace
      end

      state :comment do
        rule %r/(\{%)(\s*)(endcomment)(\s*)(%\})/ do
          groups Punctuation, Text::Whitespace, Name::Tag, Text::Whitespace, Punctuation
          reset_stack
        end

        rule %r/./, Comment
      end

      state :raw do
        rule %r/[^\{]+/, Text

        rule %r/(\{%)(\s*)(endraw)(\s*)(%\})/ do
          groups Punctuation, Text::Whitespace, Name::Tag, Text::Whitespace, Punctuation
          reset_stack
        end

        rule %r/\{/, Text
      end

      state :assign do
        mixin :whitespace
        mixin :end_of_block

        rule %r/(\s*)(=)(\s*)/ do
          groups Text::Whitespace, Operator, Text::Whitespace
        end

        rule %r/\|/, Punctuation, :filters

        mixin :generic
      end

      state :include do
        mixin :whitespace

        rule %r/([^\.]+)(\.)(html|liquid)/ do
          groups Name::Attribute, Punctuation, Name::Attribute
        end

        mixin :variable_tag_markup
      end
    end
  end
end
