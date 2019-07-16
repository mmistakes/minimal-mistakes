# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class JSON < RegexLexer
      title 'JSON'
      desc "JavaScript Object Notation (json.org)"
      tag 'json'
      filenames '*.json', 'Pipfile.lock'
      mimetypes 'application/json', 'application/vnd.api+json',
                'application/hal+json', 'application/problem+json',
                'application/schema+json'

      state :root do
        rule %r/\s+/m, Text::Whitespace
        rule %r/"/, Str::Double, :string
        rule %r/(?:true|false|null)\b/, Keyword::Constant
        rule %r/[{},:\[\]]/, Punctuation
        rule %r/-?(?:0|[1-9]\d*)\.\d+(?:e[+-]?\d+)?/i, Num::Float
        rule %r/-?(?:0|[1-9]\d*)(?:e[+-]?\d+)?/i, Num::Integer
      end

      state :string do
        rule %r/[^\\"]+/, Str::Double
        rule %r/\\./, Str::Escape
        rule %r/"/, Str::Double, :pop!
      end
    end
  end
end
