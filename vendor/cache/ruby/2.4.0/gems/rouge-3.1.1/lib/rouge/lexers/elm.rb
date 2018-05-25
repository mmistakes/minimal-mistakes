# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Elm < RegexLexer
      title "Elm"
      desc "The Elm programming language (http://elm-lang.org/)"

      tag 'elm'
      filenames '*.elm'
      mimetypes 'text/x-elm'

      # Keywords are logically grouped by lines
      keywords = %w(
        module exposing port
        import as
        type alias
        if then else
        case of
        let in
      )

      state :root do
        # Whitespaces
        rule /\s+/m, Text
        # Single line comments
        rule /--.*/, Comment::Single
        # Multiline comments
        rule /{-/, Comment::Multiline, :multiline_comment

        # Keywords
        rule /\b(#{keywords.join('|')})\b/, Keyword

        # Variable or a function
        rule /[a-z][\w]*/, Name
        # Underscore is a name for a variable, when it won't be used later
        rule /_/, Name
        # Type
        rule /[A-Z][\w]*/, Keyword::Type        

        # Two symbol operators: -> :: // .. && || ++ |> <| << >> == /= <= >=
        rule /(->|::|\/\/|\.\.|&&|\|\||\+\+|\|>|<\||>>|<<|==|\/=|<=|>=)/, Operator
        # One symbol operators: + - / * % = < > ^ | !
        rule /[+-\/*%=<>^\|!]/, Operator
        # Lambda operator
        rule /\\/, Operator
        # Not standard Elm operators, but these symbols can be used for custom inflix operators. We need to highlight them as operators as well.
        rule /[@\#$&~?]/, Operator

        # Single, double quotes, and triple double quotes
        rule /"""/, Str, :multiline_string
        rule /'(\\.|.)'/, Str::Char        
        rule /"/, Str, :double_quote

        # Numbers
        rule /0x[\da-f]+/i, Num::Hex
        rule /\d+e[+-]?\d+/i, Num::Float
        rule /\d+\.\d+(e[+-]?\d+)?/i, Num::Float
        rule /\d+/, Num::Integer

        # Punctuation: [ ] ( ) , ; ` { } :
        rule /[\[\](),;`{}:]/, Punctuation
      end

      # Multiline and nested commenting
      state :multiline_comment do
        rule /-}/, Comment::Multiline, :pop!
        rule /{-/, Comment::Multiline, :multiline_comment
        rule /[^-{}]+/, Comment::Multiline
        rule /[-{}]/, Comment::Multiline
      end

      # Double quotes
      state :double_quote do
        rule /[^\\"]+/, Str::Double
        rule /\\"/, Str::Escape
        rule /"/, Str::Double, :pop!
      end

      # Multiple line string with tripple double quotes, e.g. """ multi """
      state :multiline_string do
        rule /\s*"""/, Str, :pop!
        rule /.*/, Str
        rule /\s*/, Str
      end

    end
  end
end
