# encoding: UTF-8

module Jekyll
  module Drops
    class UnifiedPayloadDrop < Drop
      def site
        @site_drop ||= JekyllData::ThemedSiteDrop.new(@obj)
      end

      # Register a namespace to easily call subkeys under <theme-name> key
      # in the _config.yml within a theme-gem via its bundled templates.
      #   e.g. with this drop, theme-specific variables usually called like
      #        {{ site.minima.date_format }} can be shortened to simply
      #        {{ theme.date_format }}.
      def theme
        @theme_drop ||= site[site.theme.name]
      end
    end
  end
end
