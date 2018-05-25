module Rouge
  module Lexers
    class Diff < RegexLexer
      title 'diff'
      desc 'Lexes unified diffs or patches'

      tag 'diff'
      aliases 'patch', 'udiff'
      filenames '*.diff', '*.patch'
      mimetypes 'text/x-diff', 'text/x-patch'

      def self.detect?(text)
        return true if text.start_with?('Index: ')
        return true if text =~ %r(\Adiff[^\n]*?\ba/[^\n]*\bb/)
        return true if text =~ /(---|[+][+][+]).*?\n(---|[+][+][+])/
      end

      state :root do
        rule(/^ .*$\n?/, Text)
        rule(/^---$\n?/, Text)
        rule(/^\+.*$\n?/, Generic::Inserted)
        rule(/^-+.*$\n?/, Generic::Deleted)
        rule(/^!.*$\n?/, Generic::Strong)
        rule(/^@.*$\n?/, Generic::Subheading)
        rule(/^([Ii]ndex|diff).*$\n?/, Generic::Heading)
        rule(/^=.*$\n?/, Generic::Heading)
        rule(/.*$\n?/, Text)
      end
    end
  end
end
