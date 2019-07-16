# -*- coding: utf-8 -*- #
# frozen_string_literal: true

# stdlib
require 'pathname'

# The containing module for Rouge
module Rouge
  class << self
    def reload!
      Object.send :remove_const, :Rouge
      load __FILE__
    end

    # Highlight some text with a given lexer and formatter.
    #
    # @example
    #   Rouge.highlight('@foo = 1', 'ruby', 'html')
    #   Rouge.highlight('var foo = 1;', 'js', 'terminal256')
    #
    #   # streaming - chunks become available as they are lexed
    #   Rouge.highlight(large_string, 'ruby', 'html') do |chunk|
    #     $stdout.print chunk
    #   end
    def highlight(text, lexer, formatter, &b)
      lexer = Lexer.find(lexer) unless lexer.respond_to? :lex
      raise "unknown lexer #{lexer}" unless lexer

      formatter = Formatter.find(formatter) unless formatter.respond_to? :format
      raise "unknown formatter #{formatter}" unless formatter

      formatter.format(lexer.lex(text), &b)
    end
  end
end

# mimic Kernel#require_relative API
def load_relative(path)
  load File.join(__dir__, "#{path}.rb")
end

def lexer_dir(path = '')
  File.join(__dir__, 'rouge', 'lexers', path)
end

load_relative 'rouge/version'
load_relative 'rouge/util'
load_relative 'rouge/text_analyzer'
load_relative 'rouge/token'

load_relative 'rouge/lexer'
load_relative 'rouge/regex_lexer'
load_relative 'rouge/template_lexer'

Dir.glob(lexer_dir('*rb')).each { |f| Rouge::Lexers.load_lexer(f.sub(lexer_dir, '')) }

load_relative 'rouge/guesser'
load_relative 'rouge/guessers/util'
load_relative 'rouge/guessers/glob_mapping'
load_relative 'rouge/guessers/modeline'
load_relative 'rouge/guessers/filename'
load_relative 'rouge/guessers/mimetype'
load_relative 'rouge/guessers/source'
load_relative 'rouge/guessers/disambiguation'

load_relative 'rouge/formatter'
load_relative 'rouge/formatters/html'
load_relative 'rouge/formatters/html_table'
load_relative 'rouge/formatters/html_pygments'
load_relative 'rouge/formatters/html_legacy'
load_relative 'rouge/formatters/html_linewise'
load_relative 'rouge/formatters/html_line_table'
load_relative 'rouge/formatters/html_inline'
load_relative 'rouge/formatters/terminal256'
load_relative 'rouge/formatters/tex'
load_relative 'rouge/formatters/null'

load_relative 'rouge/theme'
load_relative 'rouge/tex_theme_renderer'
load_relative 'rouge/themes/thankful_eyes'
load_relative 'rouge/themes/colorful'
load_relative 'rouge/themes/base16'
load_relative 'rouge/themes/github'
load_relative 'rouge/themes/igor_pro'
load_relative 'rouge/themes/monokai'
load_relative 'rouge/themes/molokai'
load_relative 'rouge/themes/monokai_sublime'
load_relative 'rouge/themes/gruvbox'
load_relative 'rouge/themes/tulip'
load_relative 'rouge/themes/pastie'
load_relative 'rouge/themes/bw'
load_relative 'rouge/themes/magritte'
