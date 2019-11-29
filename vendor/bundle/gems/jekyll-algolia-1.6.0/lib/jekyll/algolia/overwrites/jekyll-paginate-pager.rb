# frozen_string_literal: true

module Jekyll
  module Paginate
    # Disable pagination from jekyll-paginate
    #
    # This plugin will create pages that contain a list of all items to
    # paginate. Those pages won't contain any interesting data to be indexed
    # (as it will be duplicated content of the real pages), but will still
    # take time to generate.
    #
    # By monkey-patching the plugin, we force it to be disabled
    # https://github.com/jekyll/jekyll-paginate/blob/master/lib/jekyll-paginate/pager.rb#L22
    class Pager
      def self.pagination_enabled?(_site)
        false
      end
    end
  end
end
