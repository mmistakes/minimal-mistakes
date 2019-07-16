# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class VimL < RegexLexer
      title "VimL"
      desc "VimL, the scripting language for the Vim editor (vim.org)"
      tag 'viml'
      aliases 'vim', 'vimscript', 'ex'
      filenames '*.vim', '*.vba', '.vimrc', '.exrc', '.gvimrc',
                '_vimrc', '_exrc', '_gvimrc' # _ names for windows

      mimetypes 'text/x-vim'

      def self.keywords
        load File.join(__dir__, 'viml/keywords.rb')
        self.keywords
      end

      state :root do
        rule %r/^(\s*)(".*?)$/ do
          groups Text, Comment
        end

        rule %r/^\s*\\/, Str::Escape

        rule %r/[ \t]+/, Text

        # TODO: regexes can have other delimiters
        rule %r(/(\\\\|\\/|[^\n/])*/), Str::Regex
        rule %r("(\\\\|\\"|[^\n"])*"), Str::Double
        rule %r('(\\\\|\\'|[^\n'])*'), Str::Single

        # if it's not a string, it's a comment.
        rule %r/(?<=\s)"[^-:.%#=*].*?$/, Comment

        rule %r/-?\d+/, Num
        rule %r/#[0-9a-f]{6}/i, Num::Hex
        rule %r/^:/, Punctuation
        rule %r/[():<>+=!\[\]{}\|,~.-]/, Punctuation
        rule %r/\b(let|if|else|endif|elseif|fun|function|endfunction)\b/,
          Keyword

        rule %r/\b(NONE|bold|italic|underline|dark|light)\b/, Name::Builtin

        rule %r/[absg]:\w+\b/, Name::Variable
        rule %r/\b\w+\b/ do |m|
          name = m[0]
          keywords = self.class.keywords

          if mapping_contains?(keywords[:command], name)
            token Keyword
          elsif mapping_contains?(keywords[:option], name)
            token Name::Builtin
          elsif mapping_contains?(keywords[:auto], name)
            token Name::Builtin
          else
            token Text
          end
        end

        # no errors in VimL!
        rule %r/./m, Text
      end

      def mapping_contains?(mapping, word)
        shortest, longest = find_likely_mapping(mapping, word)

        shortest and word.start_with?(shortest) and
        longest and longest.start_with?(word)
      end

      # binary search through the mappings to find the one that's likely
      # to actually work.
      def find_likely_mapping(mapping, word)
        min = 0
        max = mapping.size

        until max == min
          mid = (max + min) / 2

          cmp, _ = mapping[mid]

          case word <=> cmp
          when 1
            # too low
            min = mid + 1
          when -1
            # too high
            max = mid
          when 0
            # just right, abort!
            return mapping[mid]
          end
        end

        mapping[max - 1]
      end
    end
  end
end
