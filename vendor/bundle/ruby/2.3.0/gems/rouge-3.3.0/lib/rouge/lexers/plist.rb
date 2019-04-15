# frozen_string_literal: true

module Rouge
  module Lexers
    class Plist < RegexLexer
      desc 'plist'
      tag 'plist'
      aliases 'plist'
      filenames *%w(*.plist *.pbxproj)

      mimetypes 'text/x-plist', 'application/x-plist'

      state :whitespace do
        rule /\s+/, Text::Whitespace
      end

      state :root do
        rule %r{//.*$}, Comment
        rule %r{/\*.+?\*/}m, Comment
        mixin :whitespace
        rule /{/, Punctuation, :dictionary
        rule /\(/, Punctuation, :array
        rule /"([^"\\]|\\.)*"/, Literal::String::Double
        rule /'([^'\\]|\\.)*'/, Literal::String::Single
        rule /</, Punctuation, :data
        rule %r{[\w_$/:.-]+}, Literal
      end

      state :dictionary do
        mixin :root
        rule /[=;]/, Punctuation
        rule /}/, Punctuation, :pop!
      end

      state :array do
        mixin :root
        rule /[,]/, Punctuation
        rule /\)/, Punctuation, :pop!
      end

      state :data do
        rule /[\h\s]+/, Literal::Number::Hex
        rule />/, Punctuation, :pop!
      end
    end
  end
end
