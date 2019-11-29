# frozen_string_literal: true

require 'algolia_html_extractor'

module Jekyll
  module Algolia
    # Module to extract records from Jekyll files
    module Extractor
      include Jekyll::Algolia

      # Public: Extract records from the file
      #
      # file - The Jekyll file to process
      def self.run(file)
        # Getting all nodes from the HTML input
        raw_records = extract_raw_records(file.content)
        # Getting file metadata
        shared_metadata = FileBrowser.metadata(file)

        # If no content, we still index the metadata
        raw_records = [shared_metadata] if raw_records.empty?

        # Building the list of records
        records = []
        raw_records.map do |record|
          # We do not need to pass the HTML node element to the final record
          node = record[:node]
          record.delete(:node)

          # Merging each record info with file info
          record = Utils.compact_empty(record.merge(shared_metadata))

          # Apply custom user-defined hooks
          # Users can return `nil` from the hook to signal we should not index
          # such a record
          record = Hooks.apply_each(record, node, Jekyll::Algolia.site)
          next if record.nil?

          records << record
        end

        records
      end

      # Public: Adds a unique :objectID field to the hash, representing the
      # current content of the record
      def self.add_unique_object_id(record)
        record[:objectID] = AlgoliaHTMLExtractor.uuid(record)
        record
      end

      # Public: Extract raw records from the file, including content for each
      # node and its headings
      #
      # content - The HTML content to parse
      def self.extract_raw_records(content)
        records = AlgoliaHTMLExtractor.run(
          content,
          options: {
            css_selector: Configurator.algolia('nodes_to_index'),
            tags_to_exclude: 'script,style,iframe'
          }
        )
        # We remove objectIDs, as the will be added at the very end, after all
        # the hooks and shrinkage
        records.each do |record|
          record.delete(:objectID)
        end

        records
      end
    end
  end
end
