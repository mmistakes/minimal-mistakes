# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    load_lexer 'json.rb'

    class JSONDOC < JSON
      desc "JavaScript Object Notation with extenstions for documentation"
      tag 'json-doc'

      prepend :root do
        rule %r/([$\w]+)(\s*)(:)/ do
          groups Name::Attribute, Text, Punctuation
        end

        rule %r(/[*].*?[*]/), Comment

        rule %r(//.*?$), Comment::Single
        rule %r/(\.\.\.)/, Comment::Single
      end
    end
  end
end
