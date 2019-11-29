# frozen_string_literal: true

module Jekyll
  module Algolia
    # Single source of truth for access to configuration variables
    module Configurator
      include Jekyll::Algolia

      @config = {}

      # Algolia default values
      ALGOLIA_DEFAULTS = {
        'extensions_to_index' => nil,
        'files_to_exclude' => nil,
        'nodes_to_index' => 'p',
        'indexing_batch_size' => 1000,
        'max_record_size' => 10_000,
        'settings' => {
          # Searchable attributes
          'searchableAttributes' => %w[
            title
            headings
            unordered(content)
            collection,categories,tags
          ],
          # Custom Ranking
          'customRanking' => [
            'desc(date)',
            'desc(custom_ranking.heading)',
            'asc(custom_ranking.position)'
          ],
          'unretrievableAttributes' => [
            'custom_ranking'
          ],
          # Highlight
          'attributesToHighlight' => %w[
            title
            headings
            content
            html
            collection
            categories
            tags
          ],
          'highlightPreTag' => '<em class="ais-Highlight">',
          'highlightPostTag' => '</em>',
          # Snippet
          'attributesToSnippet' => %w[
            content:55
          ],
          'snippetEllipsisText' => '…',
          # Distinct
          'distinct' => true,
          'attributeForDistinct' => 'url',
          # Faceting
          'attributesForFaceting' => %w[
            type
            searchable(collection)
            searchable(categories)
            searchable(tags)
            searchable(title)
          ]
        }
      }.freeze

      # Public: Init the configurator with the Jekyll config
      #
      # config - The config passed by the `jekyll algolia` command. Default to
      # the default Jekyll config
      def self.init(config = nil)
        # Use the default Jekyll configuration if none specified. Silence the
        # warning about no config set
        Logger.silent { config = Jekyll.configuration } if config.nil?

        @config = config

        @config = disable_other_plugins(@config)

        self
      end

      # Public: Access to the global configuration object
      #
      # This is a method around @config so we can mock it in the tests
      def self.config
        @config
      end

      # Public: Get the value of a specific Jekyll configuration option
      #
      # key - Key to read
      #
      # Returns the value of this configuration option, nil otherwise
      def self.get(key)
        config[key]
      end

      # Public: Get the value of a specific Algolia configuration option, or
      # revert to the default value otherwise
      #
      # key - Algolia key to read
      #
      # Returns the value of this option, or the default value
      def self.algolia(key)
        config = get('algolia') || {}
        value = config[key].nil? ? ALGOLIA_DEFAULTS[key] : config[key]

        # No value found but we have a method to define the default value
        if value.nil? && respond_to?("default_#{key}")
          value = send("default_#{key}")
        end

        value
      end

      # Public: Return the application id
      #
      # Will first try to read the ENV variable, and fallback to the one
      # configured in Jekyll config
      def self.application_id
        ENV['ALGOLIA_APPLICATION_ID'] || algolia('application_id')
      end

      # Public: Return the api key
      #
      # Will first try to read the ENV variable. Will otherwise try to read the
      # _algolia_api_key file in the Jekyll folder
      def self.api_key
        # Alway taking the ENV variable first
        return ENV['ALGOLIA_API_KEY'] if ENV['ALGOLIA_API_KEY']

        # Reading from file on disk otherwise
        source_dir = get('source')
        if source_dir
          api_key_file = File.join(source_dir, '_algolia_api_key')
          if File.exist?(api_key_file) && File.size(api_key_file).positive?
            return File.open(api_key_file).read.strip
          end
        end

        nil
      end

      # Public: Return the index name
      #
      # Will first try to read the ENV variable, and fallback to the one
      # configured in Jekyll config
      def self.index_name
        ENV['ALGOLIA_INDEX_NAME'] || algolia('index_name')
      end

      # Public: Return the name of the index used to store the object ids
      def self.index_object_ids_name
        "#{index_name}_object_ids"
      end

      # Public: Get the index settings
      #
      # This will be a merge of default settings and the one defined in the
      # _config.yml file
      def self.settings
        return {} if algolia('settings') == false

        user_settings = algolia('settings') || {}
        ALGOLIA_DEFAULTS['settings'].merge(user_settings)
      end

      # Public: Check that all credentials are set
      #
      # Returns true if everything is ok, false otherwise. Will display helpful
      # error messages for each missing credential
      def self.assert_valid_credentials
        checks = %w[application_id index_name api_key]
        checks.each do |check|
          if send(check.to_sym).nil?
            Logger.known_message("missing_#{check}")
            return false
          end
        end

        true
      end

      # Public: Setting a default values to index only html and markdown files
      #
      # Markdown files can have many different extensions. We keep the one
      # defined in the Jekyll config
      def self.default_extensions_to_index
        markdown_ext = get('markdown_ext') || ''
        ['html'] + markdown_ext.split(',')
      end

      # Public: Setting a default value to ignore index.html/index.md files in
      # the root
      #
      # Chances are high that the main page is not worthy of indexing (it can be
      # the list of the most recent posts or some landing page without much
      # content). We ignore it by default.
      #
      # User can still add it by manually specifying a `files_to_exclude` to an
      # empty array
      def self.default_files_to_exclude
        extensions_to_index.map do |extension|
          "index.#{extension}"
        end
      end

      # Public: Returns true if the command is run in verbose mode
      #
      # When set to true, more logs will be displayed
      def self.verbose?
        value = get('verbose')
        return true if value == true

        false
      end

      # Public: Returns true if the command is run in verbose mode
      #
      # When set to true, no indexing operations will be sent to the API
      def self.dry_run?
        value = get('dry_run')
        return true if value == true

        false
      end

      # Public: Returns true if the command should always update the settings
      #
      # When set to true, the index settings will always be updated, no matter
      # if they've been modified or not
      def self.force_settings?
        value = get('force_settings')
        return true if value == true

        false
      end

      # Public: Returns a list of extensions to index
      #
      # Will use default values or read the algolia.extensions_to_index key.
      # Accepts both an array or a comma-separated list
      def self.extensions_to_index
        extensions = algolia('extensions_to_index')
        return [] if extensions.nil?

        extensions = extensions.split(',') if extensions.is_a? String
        extensions
      end

      # Public: Disable features from other Jekyll plugins that might interfere
      # with the indexing
      # Note that if other jekyll plugins are defined as part of the
      # :jekyll_plugins group in the Gemfile, we might be able to override them
      # using .load_overwrites in jekyll-algolia.rb.
      # If they are simply required in Gemfile, then we might need to revert
      # their values to nil values from here
      def self.disable_other_plugins(config)
        # Disable archive pages from jekyll-archives
        config.delete('jekyll-archives')

        # Disable pagination from jekyll-paginate
        config.delete('paginate')

        # Disable pagination for jekyll-paginate-v2
        config['pagination'] = {} unless config['pagination'].is_a?(Hash)
        config['pagination']['enabled'] = false

        # Disable autopages for jekyll-paginate-v2
        config['autopages'] = {} unless config['autopages'].is_a?(Hash)
        config['autopages']['enabled'] = false

        # Disable tags from jekyll-tagging
        config.delete('tag_page_dir')
        config.delete('tag_page_layout')

        config
      end

      # Public: Check for any deprecated config option and warn the user
      def self.warn_of_deprecated_options
        # indexing_mode is no longer used
        return if algolia('indexing_mode').nil?

        # rubocop:disable Metrics/LineLength
        Logger.log('I:')
        Logger.log('W:[jekyll-algolia] You are using the algolia.indexing_mode option which has been deprecated in v1.1')
        Logger.log('I:    Indexing is now always using an atomic diff algorithm.')
        Logger.log('I:    This option is no longer necessary, you can remove it from your _config.yml')
        Logger.log('I:')
        # rubocop:enable Metrics/LineLength
      end
    end
  end
end
