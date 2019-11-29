# -*- coding: utf-8 -*- #
# frozen_string_literal: true

module Rouge
  module Lexers
    class OpenTypeFeatureFile < RegexLexer
      title "OpenType Feature File"
      desc "Feature specifications for an OpenType font (adobe-type-tools.github.io/afdko)"
      tag 'opentype_feature_file'
      aliases 'fea', 'opentype', 'opentypefeature'
      filenames '*.fea'

      def self.keywords
        @keywords ||= %w(
          Ascender Attach CapHeight CaretOffset CodePageRange Descender FontRevision FSType
          GlyphClassDef HorizAxis.BaseScriptList HorizAxis.BaseTagList HorizAxis.MinMax
          IgnoreBaseGlyphs IgnoreLigatures IgnoreMarks LigatureCaretByDev LigatureCaretByIndex
          LigatureCaretByPos LineGap MarkAttachClass MarkAttachmentType NULL Panose RightToLeft
          TypoAscender TypoDescender TypoLineGap UnicodeRange UseMarkFilteringSet Vendor
          VertAdvanceY VertAxis.BaseScriptList VertAxis.BaseTagList VertAxis.MinMax VertOriginY
          VertTypoAscender VertTypoDescender VertTypoLineGap WeightClass WidthClass XHeight

          anchorDef anchor anonymous anon by contour cursive device enumerate enum
          exclude_dflt featureNames feature from ignore include_dflt include languagesystem
          language lookupflag lookup markClass mark nameid name parameters position pos required
          reversesub rsub script sizemenuname substitute subtable sub table useExtension
          valueRecordDef winAscent winDescent
        )
      end


      identifier = %r/[a-z_][a-z0-9\/_]*/i

      state :root do
        rule %r/\s+/m, Text::Whitespace
        rule %r/#.*$/, Comment

        # feature <tag>
        rule %r/(anonymous|anon|feature|lookup|table)((?:\s)+)/ do
          groups Keyword, Text
          push :featurename
        end
        # } <tag> ;
        rule %r/(\})((?:\s)*)/ do
          groups Punctuation, Text
          push :featurename
        end
        # solve include( ../path)
        rule %r/(include)/i, Keyword, :includepath

        rule %r/[\-\[\]\/(){},.:;=%*<>']/, Punctuation

        rule %r/`.*?/, Str::Backtick
        rule %r/\"/, Str, :dqs

        # classes, start with @<nameOfClass>
        rule %r/@#{identifier}/, Name::Class

        # using negative lookbehind so we don't match property names
        rule %r/(?<!\.)#{identifier}/ do |m|
          if self.class.keywords.include? m[0]
            token Keyword
          else
            token Name
          end
        end

        rule identifier, Name
        rule %r/-?\d+/, Num::Integer
      end

      state :featurename do
        rule identifier, Name::Function, :pop!
      end

      state :includepath do
        rule %r/\s+/, Text::Whitespace
        rule %r/\)/, Punctuation, :pop!
        rule %r/\(/, Punctuation
        rule %r/[a-z0-9\/_.]*/i, Str
      end

      state :strings do
        rule %r/(\([a-z0-9_]+\))?[-#0 +]*([0-9]+|[*])?(\.([0-9]+|[*]))?/i, Str
      end

      state :strings_double do
        rule %r/[^\\"%\n]+/, Str
        mixin :strings
      end

      state :escape do
        rule %r(\\
          ( [\\abfnrtv"']
          | \n
          | N{[a-zA-z][a-zA-Z ]+[a-zA-Z]}
          | u[a-fA-F0-9]{4}
          | U[a-fA-F0-9]{8}
          | x[a-fA-F0-9]{2}
          | [0-7]{1,3}
          )
        )x, Str::Escape
      end

      state :dqs do
        rule %r/"/, Str, :pop!
        mixin :escape
        mixin :strings_double
      end

    end
  end
end
