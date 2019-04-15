# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class Nix < RegexLexer
      title 'Nix'
      desc 'The Nix expression language (https://nixos.org/nix/manual/#ch-expression-language)'
      tag 'nix'
      aliases 'nixos'
      filenames '*.nix'

      state :whitespaces do
        rule /^\s*\n\s*$/m, Text
        rule /\s+/, Text
      end

      state :comment do
        rule /#.*$/, Comment
        rule /\/\*/, Comment, :multiline_comment
      end

      state :multiline_comment do
        rule /\*\//, Comment, :pop!
        rule /./, Comment
      end

      state :number do
        rule /[0-9]/, Num::Integer
      end

      state :null do
        rule /(null)/, Keyword::Constant
      end

      state :boolean do
        rule /(true|false)/, Keyword::Constant
      end

      state :binding do
        rule /[a-zA-Z_][a-zA-Z0-9-]*/, Name::Variable
      end

      state :path do
        word = "[a-zA-Z0-9\._-]+"
        section = "(\/#{word})"
        prefix = "[a-z\+]+:\/\/"
        root = /#{section}+/.source
        tilde = /~#{section}+/.source
        basic = /#{word}(\/#{word})+/.source
        url = /#{prefix}(\/?#{basic})/.source
        rule /(#{root}|#{tilde}|#{basic}|#{url})/, Str::Other
      end

      state :string do
        rule /"/, Str::Double, :double_quoted_string
        rule /''/, Str::Double, :indented_string
      end

      state :string_content do
        rule /\\./, Str::Escape
        rule /\$\$/, Str::Escape
        rule /\${/, Str::Interpol, :string_interpolated_arg
      end

      state :indented_string_content do
        rule /'''/, Str::Escape
        rule /''\$/, Str::Escape
        rule /\$\$/, Str::Escape
        rule /''\\./, Str::Escape
        rule /\${/, Str::Interpol, :string_interpolated_arg
      end

      state :string_interpolated_arg do
        mixin :expression
        rule /}/, Str::Interpol, :pop!
      end

      state :indented_string do
        mixin :indented_string_content
        rule /''/, Str::Double, :pop!
        rule /./, Str::Double
      end

      state :double_quoted_string do
        mixin :string_content
        rule /"/, Str::Double, :pop!
        rule /./, Str::Double
      end

      state :operator do
        rule /(\.|\?|\+\+|\+|!=|!|\/\/|\=\=|&&|\|\||->|\/|\*|-|<|>|<=|=>)/, Operator
      end

      state :assignment do
        rule /(=)/, Operator
        rule /(@)/, Operator
      end

      state :accessor do
        rule /(\$)/, Punctuation
      end

      state :delimiter do
        rule /(;|,|:)/, Punctuation
      end

      state :atom_content do
        mixin :expression
        rule /\)/, Punctuation, :pop!
      end

      state :atom do
        rule /\(/, Punctuation, :atom_content
      end

      state :list do
        rule /\[/, Punctuation, :list_content
      end

      state :list_content do
        rule /\]/, Punctuation, :pop!
        mixin :expression
      end

      state :set do
        rule /{/, Punctuation, :set_content
      end

      state :set_content do
        rule /}/, Punctuation, :pop!
        mixin :expression
      end
      
      state :expression do
        mixin :ignore
        mixin :comment
        mixin :boolean
        mixin :null
        mixin :number
        mixin :path
        mixin :string
        mixin :keywords
        mixin :operator
        mixin :accessor
        mixin :assignment
        mixin :delimiter
        mixin :binding
        mixin :atom
        mixin :set
        mixin :list
      end

      state :keywords do
        mixin :keywords_namespace
        mixin :keywords_declaration
        mixin :keywords_conditional
        mixin :keywords_reserved
        mixin :keywords_builtin
      end

      state :keywords_namespace do
        keywords = %w(with in inherit)
        rule /(?:#{keywords.join('|')})\b/, Keyword::Namespace
      end

      state :keywords_declaration do
        keywords = %w(let)
        rule /(?:#{keywords.join('|')})\b/, Keyword::Declaration
      end

      state :keywords_conditional do
        keywords = %w(if then else)
        rule /(?:#{keywords.join('|')})\b/, Keyword
      end

      state :keywords_reserved do
        keywords = %w(rec assert map)
        rule /(?:#{keywords.join('|')})\b/, Keyword::Reserved
      end

      state :keywords_builtin do
        keywords = %w(
          abort
          baseNameOf
          builtins
          derivation
          fetchTarball
          import
          isNull
          removeAttrs
          throw
          toString
        )
        rule /(?:#{keywords.join('|')})\b/, Keyword::Reserved
      end

      state :ignore do
        mixin :whitespaces
      end

      state :root do
        mixin :ignore
        mixin :expression
      end

      start do
      end
    end
  end
end
