# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class Hcl < RegexLexer
      tag 'hcl'

      title 'Hashicorp Configuration Language'
      desc 'Hashicorp Configuration Language, used by Terraform and other Hashicorp tools'

      state :multiline_comment do
        rule %r([*]/), Comment::Multiline, :pop!
        rule %r([^*/]+), Comment::Multiline
        rule %r([*/]), Comment::Multiline
      end

      state :comments_and_whitespace do
        rule /\s+/, Text
        rule %r(//.*?$), Comment::Single
        rule %r(#.*?$), Comment::Single
        rule %r(/[*]), Comment::Multiline, :multiline_comment
      end

      state :primitives do
        rule /[0-9][0-9]*\.[0-9]+([eE][0-9]+)?[fd]?([kKmMgG]b?)?/, Num::Float
        rule /[0-9]+([kKmMgG]b?)?/, Num::Integer

        rule /"/, Str::Double, :dq
        rule /'/, Str::Single, :sq
        rule /(<<-?)(\s*)(\'?)(\\?)(\w+)(\3)/ do |m|
          groups Operator, Text, Str::Heredoc, Str::Heredoc, Name::Constant, Str::Heredoc
          @heredocstr = Regexp.escape(m[5])
          push :heredoc
        end
      end

      def self.keywords
        @keywords ||= Set.new %w()
      end

      def self.declarations
        @declarations ||= Set.new %w()
      end

      def self.reserved
        @reserved ||= Set.new %w()
      end

      def self.constants
        @constants ||= Set.new %w(true false null)
      end

      def self.builtins
        @builtins ||= %w()
      end

      id = /[$a-z_][a-z0-9_]*/io

      state :root do
        mixin :comments_and_whitespace
        mixin :primitives

        rule /\{/ do
          token Punctuation
          push :hash
        end
        rule /\[/ do
          token Punctuation
          push :array
        end

        rule id do |m|
          if self.class.keywords.include? m[0]
            token Keyword
            push :composite
          elsif self.class.declarations.include? m[0]
            token Keyword::Declaration
            push :composite
          elsif self.class.reserved.include? m[0]
            token Keyword::Reserved
          elsif self.class.constants.include? m[0]
            token Keyword::Constant
          elsif self.class.builtins.include? m[0]
            token Name::Builtin
          else
            token Name::Other
            push :composite
          end
        end
      end

      state :composite do
        mixin :comments_and_whitespace

        rule /[{]/ do
          token Punctuation
          pop!
          push :hash
        end

        rule /[\[]/ do
          token Punctuation
          pop!
          push :array
        end

        mixin :root

        rule //, Text, :pop!
      end

      state :hash do
        mixin :comments_and_whitespace

        rule /\=/, Punctuation
        rule /\}/, Punctuation, :pop!

        mixin :root
      end

      state :array do
        mixin :comments_and_whitespace

        rule /,/, Punctuation
        rule /\]/, Punctuation, :pop!

        mixin :root
      end

      state :dq do
        rule /[^\\"]+/, Str::Double
        rule /\\"/, Str::Escape
        rule /"/, Str::Double, :pop!
      end

      state :sq do
        rule /[^\\']+/, Str::Single
        rule /\\'/, Str::Escape
        rule /'/, Str::Single, :pop!
      end

      state :heredoc do
        rule /\n/, Str::Heredoc, :heredoc_nl
        rule /[^$\n]+/, Str::Heredoc
        rule /[$]/, Str::Heredoc
      end

      state :heredoc_nl do
        rule /\s*(\w+)\s*\n/ do |m|
          if m[1] == @heredocstr
            token Name::Constant
            pop! 2
          else
            token Str::Heredoc
          end
        end

        rule(//) { pop! }
      end
    end
  end
end
