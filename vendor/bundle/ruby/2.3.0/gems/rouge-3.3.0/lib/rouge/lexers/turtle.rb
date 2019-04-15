# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class Turtle < RegexLexer
      title "Turtle/TriG"
      desc "Terse RDF Triple Language, TriG"
      tag 'turtle'
      filenames *%w(*.ttl *.trig)
      mimetypes *%w(
        text/turtle
        application/trig
      )

      state :root do
        rule /@base\b/, Keyword::Declaration
        rule /@prefix\b/, Keyword::Declaration
        rule /true\b/, Keyword::Constant
        rule /false\b/, Keyword::Constant

        rule /""".*?"""/m, Literal::String
        rule /"([^"\\]|\\.)*"/, Literal::String
        rule /'''.*?'''/m, Literal::String
        rule /'([^'\\]|\\.)*'/, Literal::String

        rule /#.*$/, Comment::Single

        rule /@[^\s,.; ]+/, Name::Attribute

        rule /[+-]?[0-9]+\.[0-9]*E[+-]?[0-9]+/, Literal::Number::Float
        rule /[+-]?\.[0-9]+E[+-]?[0-9]+/, Literal::Number::Float
        rule /[+-]?[0-9]+E[+-]?[0-9]+/, Literal::Number::Float

        rule /[+-]?[0-9]*\.[0-9]+?/, Literal::Number::Float

        rule /[+-]?[0-9]+/, Literal::Number::Integer

        rule /\./, Punctuation
        rule /,/, Punctuation
        rule /;/, Punctuation
        rule /\(/, Punctuation
        rule /\)/, Punctuation
        rule /\{/, Punctuation
        rule /\}/, Punctuation
        rule /\[/, Punctuation
        rule /\]/, Punctuation
        rule /\^\^/, Punctuation

        rule /<[^>]*>/, Name::Label

        rule /base\b/i, Keyword::Declaration
        rule /prefix\b/i, Keyword::Declaration
        rule /GRAPH\b/, Keyword
        rule /a\b/, Keyword

        rule /\s+/, Text::Whitespace

        rule /[^:;<>#\@"\(\).\[\]\{\} ]+:/, Name::Namespace
        rule /[^:;<>#\@"\(\).\[\]\{\} ]+/, Name
      end
    end
  end
end
