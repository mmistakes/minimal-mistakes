# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class Python < RegexLexer
      title "Python"
      desc "The Python programming language (python.org)"
      tag 'python'
      aliases 'py'
      filenames '*.py', '*.pyw', '*.sc', 'SConstruct', 'SConscript', '*.tac'
      mimetypes 'text/x-python', 'application/x-python'

      def self.detect?(text)
        return true if text.shebang?(/pythonw?(?:[23](?:\.\d+)?)?/)
      end

      def self.keywords
        @keywords ||= %w(
          assert break continue del elif else except exec
          finally for global if lambda pass print raise
          return try while yield as with from import yield
          async await nonlocal
        )
      end

      def self.builtins
        @builtins ||= %w(
          __import__ abs all any apply ascii basestring bin bool buffer
          bytearray bytes callable chr classmethod cmp coerce compile
          complex delattr dict dir divmod enumerate eval execfile exit
          file filter float format frozenset getattr globals hasattr hash hex id
          input int intern isinstance issubclass iter len list locals
          long map max memoryview min next object oct open ord pow property range
          raw_input reduce reload repr reversed round set setattr slice
          sorted staticmethod str sum super tuple type unichr unicode
          vars xrange zip
        )
      end

      def self.builtins_pseudo
        @builtins_pseudo ||= %w(self None Ellipsis NotImplemented False True)
      end

      def self.exceptions
        @exceptions ||= %w(
          ArithmeticError AssertionError AttributeError
          BaseException BlockingIOError BrokenPipeError BufferError
          BytesWarning ChildProcessError ConnectionAbortedError
          ConnectionError ConnectionRefusedError ConnectionResetError
          DeprecationWarning EOFError EnvironmentError
          Exception FileExistsError FileNotFoundError
          FloatingPointError FutureWarning GeneratorExit IOError
          ImportError ImportWarning IndentationError IndexError
          InterruptedError IsADirectoryError KeyError KeyboardInterrupt
          LookupError MemoryError ModuleNotFoundError NameError
          NotADirectoryError NotImplemented NotImplementedError OSError
          OverflowError OverflowWarning PendingDeprecationWarning
          ProcessLookupError RecursionError ReferenceError ResourceWarning
          RuntimeError RuntimeWarning StandardError StopAsyncIteration
          StopIteration SyntaxError SyntaxWarning SystemError SystemExit
          TabError TimeoutError TypeError UnboundLocalError UnicodeDecodeError
          UnicodeEncodeError UnicodeError UnicodeTranslateError
          UnicodeWarning UserWarning ValueError VMSError Warning
          WindowsError ZeroDivisionError
        )
      end

      identifier =        /[a-z_][a-z0-9_]*/i
      dotted_identifier = /[a-z_.][a-z0-9_.]*/i
      state :root do
        rule %r/\n+/m, Text
        rule %r/^(:)(\s*)([ru]{,2}""".*?""")/mi do
          groups Punctuation, Text, Str::Doc
        end

        rule %r/[^\S\n]+/, Text
        rule %r(#(.*)?\n?), Comment::Single
        rule %r/[\[\]{}:(),;]/, Punctuation
        rule %r/\\\n/, Text
        rule %r/\\/, Text

        rule %r/(in|is|and|or|not)\b/, Operator::Word
        rule %r/(<<|>>|\/\/|\*\*)=?/, Operator
        rule %r/[-~+\/*%=<>&^|@]=?|!=/, Operator
        rule %r/\.(?![0-9])/, Operator  # so it doesn't match float literals

        rule %r/(from)((?:\\\s|\s)+)(#{dotted_identifier})((?:\\\s|\s)+)(import)/ do
          groups Keyword::Namespace,
                 Text,
                 Name::Namespace,
                 Text,
                 Keyword::Namespace
        end

        rule %r/(import)(\s+)(#{dotted_identifier})/ do
          groups Keyword::Namespace, Text, Name::Namespace
        end

        rule %r/(def)((?:\s|\\\s)+)/ do
          groups Keyword, Text
          push :funcname
        end

        rule %r/(class)((?:\s|\\\s)+)/ do
          groups Keyword, Text
          push :classname
        end

        # TODO: not in python 3
        rule %r/`.*?`/, Str::Backtick
        rule %r/(?:r|ur|ru)"""/i, Str, :raw_tdqs
        rule %r/(?:r|ur|ru)'''/i, Str, :raw_tsqs
        rule %r/(?:r|ur|ru)"/i,   Str, :raw_dqs
        rule %r/(?:r|ur|ru)'/i,   Str, :raw_sqs
        rule %r/u?"""/i,          Str, :tdqs
        rule %r/u?'''/i,          Str, :tsqs
        rule %r/u?"/i,            Str, :dqs
        rule %r/u?'/i,            Str, :sqs

        rule %r/@#{dotted_identifier}/i, Name::Decorator

        # using negative lookbehind so we don't match property names
        rule %r/(?<!\.)#{identifier}/ do |m|
          if self.class.keywords.include? m[0]
            token Keyword
          elsif self.class.exceptions.include? m[0]
            token Name::Builtin
          elsif self.class.builtins.include? m[0]
            token Name::Builtin
          elsif self.class.builtins_pseudo.include? m[0]
            token Name::Builtin::Pseudo
          else
            token Name
          end
        end

        rule identifier, Name

        digits = /[0-9](_?[0-9])*/
        decimal = /((#{digits})?\.#{digits}|#{digits}\.)/
        exponent = /e[+-]?#{digits}/i
        rule %r/#{decimal}(#{exponent})?j?/i, Num::Float
        rule %r/#{digits}#{exponent}j?/i, Num::Float
        rule %r/#{digits}j/i, Num::Float

        rule %r/0b(_?[0-1])+/i, Num::Bin
        rule %r/0o(_?[0-7])+/i, Num::Oct
        rule %r/0x(_?[a-f0-9])+/i, Num::Hex
        rule %r/\d+L/, Num::Integer::Long
        rule %r/([1-9](_?[0-9])*|0(_?0)*)/, Num::Integer
      end

      state :funcname do
        rule identifier, Name::Function, :pop!
      end

      state :classname do
        rule identifier, Name::Class, :pop!
      end

      state :raise do
        rule %r/from\b/, Keyword
        rule %r/raise\b/, Keyword
        rule %r/yield\b/, Keyword
        rule %r/\n/, Text, :pop!
        rule %r/;/, Punctuation, :pop!
        mixin :root
      end

      state :yield do
        mixin :raise
      end

      state :strings do
        rule %r/%(\([a-z0-9_]+\))?[-#0 +]*([0-9]+|[*])?(\.([0-9]+|[*]))?/i, Str::Interpol
      end

      state :strings_double do
        rule %r/[^\\"%\n]+/, Str
        mixin :strings
      end

      state :strings_single do
        rule %r/[^\\'%\n]+/, Str
        mixin :strings
      end

      state :nl do
        rule %r/\n/, Str
      end

      state :escape do
        rule %r(\\
          ( [\\abfnrtv"']
          | \n
          | N{[a-zA-Z][a-zA-Z ]+[a-zA-Z]}
          | u[a-fA-F0-9]{4}
          | U[a-fA-F0-9]{8}
          | x[a-fA-F0-9]{2}
          | [0-7]{1,3}
          )
        )x, Str::Escape
      end

      state :raw_escape do
        rule %r/\\./, Str
      end

      state :dqs do
        rule %r/"/, Str, :pop!
        mixin :escape
        mixin :strings_double
      end

      state :sqs do
        rule %r/'/, Str, :pop!
        mixin :escape
        mixin :strings_single
      end

      state :tdqs do
        rule %r/"""/, Str, :pop!
        rule %r/"/, Str
        mixin :escape
        mixin :strings_double
        mixin :nl
      end

      state :tsqs do
        rule %r/'''/, Str, :pop!
        rule %r/'/, Str
        mixin :escape
        mixin :strings_single
        mixin :nl
      end

      %w(tdqs tsqs dqs sqs).each do |qtype|
        state :"raw_#{qtype}" do
          mixin :raw_escape
          mixin :"#{qtype}"
        end
      end

    end
  end
end
