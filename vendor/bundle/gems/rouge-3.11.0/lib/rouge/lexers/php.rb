# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class PHP < TemplateLexer
      title "PHP"
      desc "The PHP scripting language (php.net)"
      tag 'php'
      aliases 'php', 'php3', 'php4', 'php5'
      filenames '*.php', '*.php[345t]','*.phtml',
                # Support Drupal file extensions, see:
                # https://github.com/gitlabhq/gitlabhq/issues/8900
                '*.module', '*.inc', '*.profile', '*.install', '*.test'
      mimetypes 'text/x-php'

      option :start_inline, 'Whether to start with inline php or require <?php ... ?>. (default: best guess)'
      option :funcnamehighlighting, 'Whether to highlight builtin functions (default: true)'
      option :disabledmodules, 'Disable certain modules from being highlighted as builtins (default: empty)'

      def initialize(*)
        super

        # if truthy, the lexer starts highlighting with php code
        # (no <?php required)
        @start_inline = bool_option(:start_inline) { :guess }
        @funcnamehighlighting = bool_option(:funcnamehighlighting) { true }
        @disabledmodules = list_option(:disabledmodules)
      end

      def self.builtins
        load File.join(__dir__, 'php/builtins.rb')
        self.builtins
      end

      def builtins
        return [] unless @funcnamehighlighting

        @builtins ||= Set.new.tap do |builtins|
          self.class.builtins.each do |mod, fns|
            next if @disabledmodules.include? mod
            builtins.merge(fns)
          end
        end
      end

      # source: http://php.net/manual/en/language.variables.basics.php
      # the given regex is invalid utf8, so... we're using the unicode
      # "Letter" property instead.
      id = /[\p{L}_][\p{L}\p{N}_]*/
      nsid = /#{id}(?:\\#{id})*/

      start do
        case @start_inline
        when true
          push :template
          push :php
        when false
          push :template
        when :guess
          # pass
        end
      end

      def self.keywords
        @keywords ||= Set.new %w(
          and E_PARSE old_function E_ERROR or as E_WARNING parent eval
          PHP_OS break exit case extends PHP_VERSION cfunction FALSE
          print for require continue foreach require_once declare return
          default static do switch die stdClass echo else TRUE elseif
          var empty if xor enddeclare include virtual endfor include_once
          while endforeach global __FILE__ endif list __LINE__ endswitch
          new __sleep endwhile not array __wakeup E_ALL NULL final
          php_user_filter interface implements public private protected
          abstract clone try catch finally throw this use namespace yield
        )
      end

      def self.detect?(text)
        return true if text.shebang?('php')
        return false if /^<\?hh/ =~ text
        return true if /^<\?php/ =~ text
      end

      state :root do
        # some extremely rough heuristics to decide whether to start inline or not
        rule(/\s*(?=<)/m) { delegate parent; push :template }
        rule(/[^$]+(?=<\?(php|=))/) { delegate parent; push :template }

        rule(//) { push :template; push :php }
      end

      state :template do
        rule %r/<\?(php|=)?/, Comment::Preproc, :php
        rule(/.*?(?=<\?)|.*/m) { delegate parent }
      end

      state :php do
        rule %r/\?>/, Comment::Preproc, :pop!
        # heredocs
        rule %r/<<<('?)(#{id})\1\n.*?\n\s*\2;?/im, Str::Heredoc
        rule %r/\s+/, Text
        rule %r/#.*?$/, Comment::Single
        rule %r(//.*?$), Comment::Single
        rule %r(/\*\*(?!/).*?\*/)m, Comment::Doc
        rule %r(/\*.*?\*/)m, Comment::Multiline
        
        rule %r/(->|::)(\s*)(#{id})/ do
          groups Operator, Text, Name::Attribute
        end

        rule %r/[~!%^&*+=\|:.<>\/?@-]+/, Operator
        rule %r/[\[\]{}();,]/, Punctuation
        rule %r/(class|interface|trait)(\s+)(#{nsid})/ do
          groups Keyword::Declaration, Text, Name::Class
        end
        rule %r/(use)(\s+)(function|const|)(\s*)(#{nsid})/ do
          groups Keyword::Namespace, Text, Keyword::Namespace, Text, Name::Namespace
          push :use
        end
        rule %r/(namespace)(\s+)(#{nsid})/ do
          groups Keyword::Namespace, Text, Name::Namespace
        end
        # anonymous functions
        rule %r/(function)(\s*)(?=\()/ do
          groups Keyword, Text
        end

        # named functions
        rule %r/(function)(\s+)(&?)(\s*)/ do
          groups Keyword, Text, Operator, Text
          push :funcname
        end

        rule %r/(const)(\s+)(#{id})/i do
          groups Keyword, Text, Name::Constant
        end

        rule %r/(true|false|null)\b/, Keyword::Constant
        rule %r/\$\{\$+#{id}\}/i, Name::Variable
        rule %r/\$+#{id}/i, Name::Variable

        # may be intercepted for builtin highlighting
        rule %r/\\?#{nsid}/i do |m|
          name = m[0]

          if self.class.keywords.include? name
            token Keyword
          elsif self.builtins.include? name
            token Name::Builtin
          else
            token Name::Other
          end
        end

        rule %r/(\d+\.\d*|\d*\.\d+)(e[+-]?\d+)?/i, Num::Float
        rule %r/\d+e[+-]?\d+/i, Num::Float
        rule %r/0[0-7]+/, Num::Oct
        rule %r/0x[a-f0-9]+/i, Num::Hex
        rule %r/\d+/, Num::Integer
        rule %r/'([^'\\]*(?:\\.[^'\\]*)*)'/, Str::Single
        rule %r/`([^`\\]*(?:\\.[^`\\]*)*)`/, Str::Backtick
        rule %r/"/, Str::Double, :string
      end
      
      state :use do
        rule %r/(\s+)(as)(\s+)(#{id})/ do
          groups Text, Keyword, Text, Name
          :pop!
        end
        rule %r/\\\{/, Operator, :uselist
        rule %r/;/, Punctuation, :pop!
      end
      
      state :uselist do
        rule %r/\s+/, Text
        rule %r/,/, Operator
        rule %r/\}/, Operator, :pop!
        rule %r/(as)(\s+)(#{id})/ do
          groups Keyword, Text, Name
        end
        rule %r/#{id}/, Name::Namespace
      end

      state :funcname do
        rule %r/#{id}/, Name::Function, :pop!
      end

      state :string do
        rule %r/"/, Str::Double, :pop!
        rule %r/[^\\{$"]+/, Str::Double
        rule %r/\\([nrt\"$\\]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})/,
          Str::Escape
        rule %r/\$#{id}(\[\S+\]|->#{id})?/, Name::Variable

        rule %r/\{\$\{/, Str::Interpol, :interp_double
        rule %r/\{(?=\$)/, Str::Interpol, :interp_single
        rule %r/(\{)(\S+)(\})/ do
          groups Str::Interpol, Name::Variable, Str::Interpol
        end

        rule %r/[${\\]+/, Str::Double
      end

      state :interp_double do
        rule %r/\}\}/, Str::Interpol, :pop!
        mixin :php
      end

      state :interp_single do
        rule %r/\}/, Str::Interpol, :pop!
        mixin :php
      end
    end
  end
end
