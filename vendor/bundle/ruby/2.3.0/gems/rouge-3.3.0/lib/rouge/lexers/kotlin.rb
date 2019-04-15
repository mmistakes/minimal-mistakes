# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class Kotlin < RegexLexer
      # https://kotlinlang.org/docs/reference/grammar.html

      title "Kotlin"
      desc "Kotlin Programming Language (http://kotlinlang.org)"

      tag 'kotlin'
      filenames '*.kt', '*.kts'
      mimetypes 'text/x-kotlin'

      keywords = %w(
        abstract annotation as break by catch class companion const
        constructor continue crossinline do dynamic else enum
        external false final finally for fun get if import in infix
        inline inner interface internal is lateinit noinline null
        object open operator out override package private protected
        public reified return sealed set super tailrec this throw
        true try typealias typeof val var vararg when where while
        yield
      )

      name = %r'@?[_\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Nl}][\p{Lu}\p{Ll}\p{Lt}\p{Lm}\p{Nl}\p{Nd}\p{Pc}\p{Cf}\p{Mn}\p{Mc}]*'
      name_backtick = %r'#{name}|`#{name}`'

      id = %r'(#{name_backtick})'

      state :root do
        rule %r'(\))(\s*)(:)(\s+)(#{name_backtick})(<)' do
          groups Punctuation, Text, Punctuation, Text, Name::Class, Punctuation
          push :generic_parameters
        end
        rule %r'(\))(\s*)(:)(\s+)(#{name_backtick})' do
          groups Punctuation, Text, Punctuation, Text, Name::Class
        end
        rule %r'\b(companion)(\s+)(object)\b' do
          groups Keyword, Text, Keyword
        end
        rule %r'\b(class|data\s+class|interface|object)(\s+)' do
          groups Keyword::Declaration, Text
          push :class
        end
        rule %r'\b(fun)(\s+)' do
          groups Keyword, Text
          push :function
        end
        rule %r'(#{name_backtick})(:)(\s+)(#{name_backtick})(<)' do
          groups Name::Variable, Punctuation, Text, Name::Class, Punctuation
          push :generic_parameters
        end
        rule %r'(#{name_backtick})(:)(\s+)(#{name_backtick})' do
          groups Name::Variable, Punctuation, Text, Name::Class
        end
        rule %r'\b(package|import)(\s+)' do
          groups Keyword, Text
          push :package
        end
        rule %r'\b(val|var)(\s+)(\()' do
          groups Keyword::Declaration, Text, Punctuation
          push :destructure
        end
        rule %r'\b(val|var)(\s+)' do
          groups Keyword::Declaration, Text
          push :property
        end
        rule %r/\bfun\b/, Keyword
        rule /\b(?:#{keywords.join('|')})\b/, Keyword
        rule %r'^\s*\[.*?\]', Name::Attribute
        rule %r'[^\S\n]+', Text
        rule %r'\\\n', Text # line continuation
        rule %r'//.*?$', Comment::Single
        rule %r'/[*].*?[*]/'m, Comment::Multiline
        rule %r'\n', Text
        rule %r'::|!!|\?[:.]', Operator
        rule %r"(\.\.)", Operator
        rule %r'[~!%^&*()+=|\[\]:;,.<>/?-]', Punctuation
        rule %r'[{}]', Punctuation
        rule %r'@"(""|[^"])*"'m, Str
        rule %r'""".*?"""'m, Str
        rule %r'"(\\\\|\\"|[^"\n])*["\n]'m, Str
        rule %r"'\\.'|'[^\\]'", Str::Char
        rule %r"[0-9](\.[0-9]+)?([eE][+-][0-9]+)?[flFL]?|0[xX][0-9a-fA-F]+[Ll]?", Num
        rule /@#{id}/, Name::Decorator
        rule id, Name
      end

      state :package do
        rule /\S+/, Name::Namespace, :pop!
      end

      state :class do
        rule id, Name::Class, :pop!
      end

      state :function do
        rule %r'(<)', Punctuation, :generic_parameters
        rule %r'(\s+)', Text
        rule %r'(#{name_backtick})(\.)' do
          groups Name::Class, Punctuation
        end
        rule id, Name::Function, :pop!
      end

      state :generic_parameters do
        rule id, Name::Class
        rule %r'(,)', Punctuation
        rule %r'(\s+)', Text
        rule %r'(>)', Punctuation, :pop!
      end

      state :property do
        rule id, Name::Property, :pop!
      end

      state :destructure do
        rule %r'(,)', Punctuation
        rule %r'(\))', Punctuation, :pop!
        rule %r'(\s+)', Text
        rule id, Name::Property
      end
    end
  end
end
