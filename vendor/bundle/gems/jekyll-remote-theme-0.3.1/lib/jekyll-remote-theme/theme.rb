# frozen_string_literal: true

module Jekyll
  module RemoteTheme
    class Theme < Jekyll::Theme
      OWNER_REGEX = %r!(?<owner>[a-z0-9\-]+)!i
      NAME_REGEX  = %r!(?<name>[a-z0-9\._\-]+)!i
      REF_REGEX   = %r!@(?<ref>[a-z0-9\._\-]+)!i # May be a branch, tag, or commit
      THEME_REGEX = %r!\A#{OWNER_REGEX}/#{NAME_REGEX}(?:#{REF_REGEX})?\z!i

      # Initializes a new Jekyll::RemoteTheme::Theme
      #
      # raw_theme can be in the form of:
      #
      # 1. owner/theme-name - a GitHub owner + theme-name string
      # 2. owner/theme-name@git_ref - a GitHub owner + theme-name + Git ref string
      def initialize(raw_theme)
        @raw_theme = raw_theme.to_s.downcase.strip
        super(@raw_theme)
      end

      def name
        theme_parts[:name]
      end

      def owner
        theme_parts[:owner]
      end

      def name_with_owner
        [owner, name].join("/")
      end
      alias_method :nwo, :name_with_owner

      def valid?
        theme_parts && name && owner
      end

      def git_ref
        theme_parts[:ref] || "master"
      end

      def root
        @root ||= File.realpath Dir.mktmpdir(TEMP_PREFIX)
      end

      def inspect
        "#<Jekyll::RemoteTheme::Theme owner=\"#{owner}\" name=\"#{name}\"" \
        " ref=\"#{git_ref}\" root=\"#{root}\">"
      end

      private

      def theme_parts
        @theme_parts ||= @raw_theme.match(THEME_REGEX)
      end

      def gemspec
        @gemspec ||= MockGemspec.new(self)
      end
    end
  end
end
