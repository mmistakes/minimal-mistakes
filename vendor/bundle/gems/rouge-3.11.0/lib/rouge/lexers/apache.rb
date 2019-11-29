# frozen_string_literal: true

require 'yaml'

module Rouge
  module Lexers
    class Apache < RegexLexer
      title "Apache"
      desc 'configuration files for Apache web server'
      tag 'apache'
      mimetypes 'text/x-httpd-conf', 'text/x-apache-conf'
      filenames '.htaccess', 'httpd.conf'

      class << self
        attr_reader :keywords
      end
      # Load Apache keywords from separate YML file
      @keywords = ::YAML.load_file(File.join(__dir__, 'apache/keywords.yml')).tap do |h|
        h.each do |k,v|
          h[k] = Set.new v
        end
      end

      def name_for_token(token, kwtype, tktype)
        if self.class.keywords[kwtype].include? token
          tktype
        else
          Text
        end
      end

      state :whitespace do
        rule %r/\#.*/, Comment
        rule %r/\s+/m, Text
      end

      state :root do
        mixin :whitespace

        rule %r/(<\/?)(\w+)/ do |m|
          groups Punctuation, name_for_token(m[2].downcase, :sections, Name::Label)
          push :section
        end

        rule %r/\w+/ do |m|
          token name_for_token(m[0].downcase, :directives, Name::Class)
          push :directive
        end
      end

      state :section do
        # Match section arguments
        rule %r/([^>]+)?(>(?:\r\n?|\n)?)/ do
          groups Literal::String::Regex, Punctuation
          pop!
        end

        mixin :whitespace
      end

      state :directive do
        # Match value literals and other directive arguments
        rule %r/\r\n?|\n/, Text, :pop!

        mixin :whitespace

        rule %r/\S+/ do |m|
          token name_for_token(m[0], :values, Literal::String::Symbol)
        end
      end
    end
  end
end
