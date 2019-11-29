# frozen_string_literal: true

require 'algolia_html_extractor'
require 'pathname'
require 'time'

module Jekyll
  module Algolia
    # Module to get information about Jekyll file. Jekyll handles posts, pages,
    # collection, etc. They each need specific processing, so knowing which kind
    # of file we're working on will help.
    #
    # We also do not index all files. This module will help in defining which
    # files should be indexed and which should not.
    module FileBrowser
      include Jekyll::Algolia

      # Public: Return the absolute path of a Jekyll file
      #
      # file - The Jekyll file to inspect
      def self.absolute_path(filepath)
        pathname = Pathname.new(filepath)
        return pathname.cleanpath.to_s if pathname.absolute?

        File.expand_path(File.join(Configurator.get('source'), filepath))
      end

      # Public: Return the path of a Jekyll file relative to the Jekyll source
      #
      # file - The Jekyll file to inspect
      def self.relative_path(filepath)
        pathname = Pathname.new(filepath)
        config_source = Configurator.get('source') || ''
        jekyll_source = Pathname.new(File.expand_path(config_source))

        # Removing any starting ./
        if pathname.relative?
          fullpath = File.expand_path(File.join(jekyll_source, pathname))
          return fullpath.gsub(%r{^#{jekyll_source}/}, '')
        end

        pathname.relative_path_from(jekyll_source).cleanpath.to_s
      end

      # Public: Check if the file should be indexed
      #
      # file - The Jekyll file
      #
      # There are many reasons a file should not be indexed. We need to exclude
      # all the static assets, only keep the actual content.
      def self.indexable?(file)
        return false if static_file?(file)
        return false if is_404?(file)
        return false if redirect?(file)
        return false unless allowed_extension?(file)
        return false if excluded_from_config?(file)
        return false if excluded_from_hook?(file)

        true
      end

      # Public: Check if the specified file is a static Jekyll asset
      #
      # file - The Jekyll file
      #
      # We don't index static assets (js, css, images)
      def self.static_file?(file)
        file.is_a?(Jekyll::StaticFile)
      end

      # Public: Check if the file is a 404 error page
      #
      # file - The Jekyll file
      #
      # 404 pages are not Jekyll defaults but a convention adopted by GitHub
      # pages. We don't want to index those.
      # Source: https://help.github.com/articles/creating-a-custom-404-page-for-your-github-pages-site/
      #
      def self.is_404?(file)
        ['404.md', '404.html'].include?(File.basename(file.path))
      end

      # Public: Check if the file is redirect page
      #
      # file - The Jekyll file
      #
      # Plugins like jekyll-redirect-from add dynamic pages that only contain
      # an HTML meta refresh. We need to exclude those files from indexing.
      # https://github.com/jekyll/jekyll-redirect-from
      def self.redirect?(file)
        # When using redirect_from, jekyll-redirect-from creates a page named
        # `redirect.html`
        return true if file.respond_to?(:name) && file.name == 'redirect.html'
        # When using redirect_to, it sets the layout to `redirect`
        if file.respond_to?(:data) && file.data['layout'] == 'redirect'
          return true
        end

        false
      end

      # Public: Check if the file has one of the allowed extensions
      #
      # file - The Jekyll file
      #
      # Jekyll can transform markdown files to HTML by default. With plugins, it
      # can convert many more file formats. By default we'll only index markdown
      # and raw HTML files but this list can be extended using the
      # `extensions_to_index` config option.
      def self.allowed_extension?(file)
        extensions = Configurator.extensions_to_index
        extname = File.extname(file.path)[1..-1]
        extensions.include?(extname)
      end

      # Public: Check if the file has been excluded by `files_to_exclude`
      #
      # file - The Jekyll file
      def self.excluded_from_config?(file)
        excluded_patterns = Configurator.algolia('files_to_exclude')
        jekyll_source = Configurator.get('source')
        path = absolute_path(file.path)

        excluded_patterns.each do |pattern|
          pattern = File.expand_path(File.join(jekyll_source, pattern))
          return true if File.fnmatch(pattern, path, File::FNM_PATHNAME)
        end
        false
      end

      # Public: Check if the file has been excluded by running a custom user
      # hook
      #
      # file - The Jekyll file
      def self.excluded_from_hook?(file)
        Hooks.should_be_excluded?(file.path)
      end

      # Public: Return a hash of all the file metadata
      #
      # file - The Jekyll file
      #
      # It contains both the raw metadata extracted from the front-matter, as
      # well as more specific fields like the collection name, date timestamp,
      # slug, type and url
      def self.metadata(file)
        raw_data = raw_data(file)
        specific_data = {
          collection: collection(file),
          tags: tags(file),
          categories: categories(file),
          date: date(file),
          excerpt_html: excerpt_html(file),
          excerpt_text: excerpt_text(file),
          slug: slug(file),
          type: type(file),
          url: url(file)
        }

        metadata = Utils.compact_empty(raw_data.merge(specific_data))

        metadata
      end

      # Public: Return a hash of all the raw data, as defined in the
      # front-matter and including default values
      #
      # file - The Jekyll file
      #
      # Any custom data passed to the front-matter will be returned by this
      # method. It ignores any key where we have a better, custom, getter.

      # Note that even if you define tags and categories in a collection item,
      # it will not be included in the data. It's always an empty array.
      def self.raw_data(file)
        data = file.data.clone

        # Remove all keys where we have a specific getter
        data.each_key do |key|
          data.delete(key) if respond_to?(key)
        end
        data.delete('excerpt')

        # Delete other keys added by Jekyll that are not in the front-matter and
        # not needed for search
        data.delete('draft')
        data.delete('ext')

        # Convert all values to a version that can be serialized to JSON
        data = Utils.jsonify(data)

        # Convert all keys to symbols
        data = Utils.keys_to_symbols(data)

        data
      end

      # Public: Get the type of the document (page, post, collection, etc)
      #
      # file - The Jekyll file
      #
      # Pages are simple html and markdown documents in the tree
      # Elements from a collection are called Documents
      # Posts are a custom kind of Documents
      def self.type(file)
        type = file.class.name.split('::')[-1].downcase

        type = 'post' if type == 'document' && file.collection.label == 'posts'

        type
      end

      # Public: Returns the url of the file, starting from the root
      #
      # file - The Jekyll file
      def self.url(file)
        file.url
      end

      # Public: Returns the list of tags of a file, defaults to an empty array
      #
      # file - The Jekyll file
      def self.tags(file)
        file.data['tags'] || []
      end

      # Public: Returns the list of tags of a file, defaults to an empty array
      #
      # file - The Jekyll file
      def self.categories(file)
        file.data['categories'] || []
      end

      # Public: Returns a timestamp of the file date
      #
      # file - The Jekyll file
      #
      # Posts have their date coming from the filepath, or the front-matter.
      # Pages and other collection items can only have a date set in
      # front-matter.
      def self.date(file)
        # Collections get their date from .date, while pages read it from .data.
        # Jekyll by default will set the date of collection to the current date,
        # but we monkey-patched that so it returns nil for collection items
        date = if file.respond_to?(:date)
                 file.date
               else
                 file.data['date']
               end

        return nil if date.nil?

        # If date is a string, we try to parse it
        if date.is_a? String
          begin
            date = Time.parse(date)
          rescue StandardError
            return nil
          end
        end

        date.to_time.to_i
      end

      # Public: Returns the raw excerpt of a file, directly as returned by
      # Jekyll. Swallow any error that could occur when reading.
      #
      # file - The Jekyll file
      #
      # This might throw an exception if the excerpt is invalid. We also
      # silence all logger output as Jekyll is quite verbose and will display
      # the potential Liquid error in the terminal, even if we catch the actual
      # error.
      def self.excerpt_raw(file)
        Logger.silent do
          return file.data['excerpt'].to_s.strip
        end
      rescue StandardError
        nil
      end

      # Public: Return true if the Jekyll default excerpt should be used for
      # this file
      #
      # file - The Jekyll file
      #
      # Most of the time, we'll use our own excerpt (the first matching
      # element), but in some cases, we'll fallback to Jekyll's default excerpt
      # if it seems to be what the user wants
      def self.use_default_excerpt?(file)
        # Only posts can have excerpt
        return false unless type(file) == 'post'

        # User defined their own separator in the config
        custom_separator = file.excerpt_separator.to_s.strip
        return false if custom_separator.empty?

        # This specific post contains this separator
        file.content.include?(custom_separator)
      end

      # Public: Returns the HTML version of the excerpt
      #
      # file - The Jekyll file
      def self.excerpt_html(file)
        # If it's a post with a custom separator for the excerpt, we honor it
        return excerpt_raw(file) if use_default_excerpt?(file)

        # Otherwise we take the first matching node
        html = file.content
        selector = Configurator.algolia('nodes_to_index')
        first_node = Nokogiri::HTML(html).css(selector).first
        return nil if first_node.nil?

        first_node.to_s
      end

      # Public: Returns the text version of the excerpt
      #
      # file - The Jekyll file
      #
      # Only collections (including posts) have an excerpt. Pages don't.
      def self.excerpt_text(file)
        html = excerpt_html(file)
        Utils.html_to_text(html)
      end

      # Public: Returns the slug of the file
      #
      # file - The Jekyll file
      #
      # Slugs can be automatically extracted from collections, but for other
      # files, we have to create them from the basename
      def self.slug(file)
        # We get the real slug from the file data if available
        return file.data['slug'] if file.data.key?('slug')

        # We create it ourselves from the filepath otherwise
        File.basename(file.path, File.extname(file.path)).downcase
      end

      # Public: Returns the name of the collection
      #
      # file - The Jekyll file
      #
      # Only collection documents can have a collection name. Pages don't. Posts
      # are purposefully excluded from it as well even if they are technically
      # part of a collection
      def self.collection(file)
        return nil unless file.respond_to?(:collection)

        collection_name = file.collection.label

        # Posts are a special kind of collection, but it's an implementation
        # detail from my POV, so I'll exclude them
        return nil if collection_name == 'posts'

        collection_name
      end
    end
  end
end
