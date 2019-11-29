# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    load_lexer 'c.rb'

    class ObjectiveC < C
      tag 'objective_c'
      title "Objective-C"
      desc 'an extension of C commonly used to write Apple software'
      aliases 'objc', 'obj-c', 'obj_c', 'objectivec'
      filenames '*.m', '*.h'

      mimetypes 'text/x-objective_c', 'application/x-objective_c'

      def self.at_keywords
        @at_keywords ||= %w(
          selector private protected public encode synchronized try
          throw catch finally end property synthesize dynamic optional
          interface implementation import
        )
      end

      def self.at_builtins
        @at_builtins ||= %w(true false YES NO)
      end

      def self.builtins
        @builtins ||= %w(YES NO nil)
      end

      id = /[a-z$_][a-z0-9$_]*/i

      prepend :statements do
        rule %r/@"/, Str, :string
        rule %r/@'(\\[0-7]{1,3}|\\x[a-fA-F0-9]{1,2}|\\.|[^\\'\n]')/,
          Str::Char
        rule %r/@(\d+[.]\d*|[.]\d+|\d+)e[+-]?\d+l?/i,
          Num::Float
        rule %r/@(\d+[.]\d*|[.]\d+|\d+f)f?/i, Num::Float
        rule %r/@0x\h+[lL]?/, Num::Hex
        rule %r/@0[0-7]+l?/i, Num::Oct
        rule %r/@\d+l?/, Num::Integer
        rule %r/\bin\b/, Keyword

        rule %r/@(?:interface|implementation)\b/, Keyword, :classname
        rule %r/@(?:class|protocol)\b/, Keyword, :forward_classname

        rule %r/@([[:alnum:]]+)/ do |m|
          if self.class.at_keywords.include? m[1]
            token Keyword
          elsif self.class.at_builtins.include? m[1]
            token Name::Builtin
          else
            token Error
          end
        end

        rule %r/[?]/, Punctuation, :ternary
        rule %r/\[/,  Punctuation, :message
        rule %r/@\[/, Punctuation, :array_literal
        rule %r/@\{/, Punctuation, :dictionary_literal
      end

      state :ternary do
        rule %r/:/, Punctuation, :pop!
        mixin :statements
      end

      state :message_shared do
        rule %r/\]/, Punctuation, :pop!
        rule %r/\{/, Punctuation, :pop!
        rule %r/;/, Error

        mixin :statements
      end

      state :message do
        rule %r/(#{id})(\s*)(:)/ do
          groups(Name::Function, Text, Punctuation)
          goto :message_with_args
        end

        rule %r/(#{id})(\s*)(\])/ do
          groups(Name::Function, Text, Punctuation)
          pop!
        end

        mixin :message_shared
      end

      state :message_with_args do
        rule %r/\{/, Punctuation, :function
        rule %r/(#{id})(\s*)(:)/ do
          groups(Name::Function, Text, Punctuation)
          pop!
        end

        mixin :message_shared
      end

      state :array_literal do
        rule %r/]/, Punctuation, :pop!
        rule %r/,/, Punctuation
        mixin :statements
      end

      state :dictionary_literal do
        rule %r/}/, Punctuation, :pop!
        rule %r/,/, Punctuation
        mixin :statements
      end

      state :classname do
        mixin :whitespace

        rule %r/(#{id})(\s*)(:)(\s*)(#{id})/ do
          groups(Name::Class, Text,
                 Punctuation, Text,
                 Name::Class)
          pop!
        end

        rule %r/(#{id})(\s*)([(])(\s*)(#{id})(\s*)([)])/ do
          groups(Name::Class, Text,
                 Punctuation, Text,
                 Name::Label, Text,
                 Punctuation)
          pop!
        end

        rule id, Name::Class, :pop!
      end

      state :forward_classname do
        mixin :whitespace

        rule %r/(#{id})(\s*)(,)(\s*)/ do
          groups(Name::Class, Text, Punctuation, Text)
          push
        end

        rule %r/(#{id})(\s*)(;?)/ do
          groups(Name::Class, Text, Punctuation)
          pop!
        end
      end

      prepend :root do
        rule %r(
          ([-+])(\s*)
          ([(].*?[)])?(\s*)
          (?=#{id}:?)
        )ix do |m|
          token Keyword, m[1]
          token Text, m[2]
          recurse(m[3]) if m[3]
          token Text, m[4]
          push :method_definition
        end
      end

      state :method_definition do
        rule %r/,/, Punctuation
        rule %r/[.][.][.]/, Punctuation
        rule %r/([(].*?[)])(#{id})/ do |m|
          recurse m[1]; token Name::Variable, m[2]
        end

        rule %r/(#{id})(\s*)(:)/m do
          groups(Name::Function, Text, Punctuation)
        end

        rule %r/;/, Punctuation, :pop!

        rule %r/{/ do
          token Punctuation
          goto :function
        end

        mixin :inline_whitespace
        rule %r(//.*?\n), Comment::Single
        rule %r/\s+/m, Text

        rule(//) { pop! }
      end
    end
  end
end
