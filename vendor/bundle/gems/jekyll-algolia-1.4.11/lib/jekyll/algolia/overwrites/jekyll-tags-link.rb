# frozen_string_literal: true

# The default `link` tag allow to link to a specific page, using its relative
# path. Because we might not be indexing the destination of the link, we might
# not have the representation of the page in our data. If that happens, the
# `link` tag fails.
#
# To fix that we'll overwrite the default `link` tag to loop over a backup copy
# of the original files (before we clean it for indexing)
#
# https://github.com/algolia/jekyll-algolia/issues/62
class JekyllAlgoliaLink < Jekyll::Tags::Link
  def render(context)
    original_files = context.registers[:site].original_site_files

    original_files[:pages].each do |page|
      return page.url if page.relative_path == @relative_path
    end

    original_files[:collections].each_value do |collection|
      collection.docs.each do |item|
        return item.url if item.relative_path == @relative_path
      end
    end

    original_files[:static_files].each do |asset|
      return asset.url if asset.relative_path == @relative_path
      return asset.url if asset.relative_path == "/#{@relative_path}"
    end

    '/'
  end
end
