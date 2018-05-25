# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Kotlin < RegexLexer
      # https://kotlinlang.org/docs/reference/grammar.html

      title "Kotlin"
      desc "Kotlin Programming Language (http://kotlinlang.org)"

      tag 'kotlin'
      filenames '*.kt'
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

      id = %r'(#{name}|`#{name}`)'

      state :root do
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
        rule %r'\b(companion)(\s+)(object)\b' do
          groups Keyword, Text, Keyword
        end
        rule %r'\b(class|data\s+class|interface|object)(\s+)' do
          groups Keyword::Declaration, Text
          push :class
        end
        rule %r'\b(package|import)(\s+)' do
          groups Keyword, Text
          push :package
        end
        rule %r'\b(val|var)(\s+)' do
          groups Keyword::Declaration, Text
          push :property
        end
        rule %r/\bfun\b/, Keyword
        rule /\b(?:#{keywords.join('|')})\b/, Keyword
        rule id, Name
      end

      state :package do
        rule /\S+/, Name::Namespace, :pop!
      end

      state :class do
        rule id, Name::Class, :pop!
      end

      state :property do
        rule id, Name::Property, :pop!
      end
    end
  end
end
