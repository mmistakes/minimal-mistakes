# frozen_string_literal: true

module Jekyll
  module Algolia
    # A Jekyll::Site subclass that overrides process from the parent class to
    # create JSON records out of rendered documents and push those records to
    # Algolia instead of writing files to disk.
    class Site < Jekyll::Site
      # We expose a way to reset the collection, as it will be needed in the
      # tests
      attr_writer :collections

      attr_reader :original_site_files

      # Public: Overwriting the parent method
      #
      # This will prepare the website, gathering all files, excluding the one we
      # don't need to index, then render them (converting to HTML), the finally
      # calling `push` to push to Algolia
      def process
        # Default Jekyll preflight
        reset
        read
        generate

        # Removing all files that won't be indexed, so we don't waste time
        # rendering them
        keep_only_indexable_files

        # Starting the rendering progress bar
        init_rendering_progress_bar

        # Converting them to HTML
        render

        # Pushing them Algolia
        push
      end

      # Public: Return the number of pages/documents to index
      def indexable_item_count
        count = @pages.length
        @collections.each_value { |collection| count += collection.docs.length }
        count
      end

      # Public: Init the rendering progress bar, incrementing it for each
      # rendered item
      #
      # This uses Jekyll post_render hooks, listening to both pages and
      # documents
      def init_rendering_progress_bar
        progress_bar = ProgressBar.create(
          total: indexable_item_count,
          format: 'Rendering to HTML (%j%%) |%B|'
        )
        Jekyll::Hooks.register [:pages, :documents], :post_render do
          progress_bar.increment
        end
      end

      # Public: Filtering a list of items to only keep the one that are
      # indexable.
      #
      # items - List of Pages/Documents
      #
      # Note: It also sets the layout to nil, to further speed up the rendering
      def indexable_list(items)
        new_list = []
        items.each do |item|
          next unless FileBrowser.indexable?(item)

          item.data = {} if item.data.nil?
          item.data['layout'] = nil
          new_list << item
        end
        new_list
      end

      # Public: Removing non-indexable Pages, Posts and Documents from the
      # internals
      def keep_only_indexable_files
        @original_site_files = {
          pages: @pages,
          collections: @collections,
          static_files: @static_files
        }

        @pages = indexable_list(@pages)

        # Applying to each collections
        @collections.each_value do |collection|
          collection.docs = indexable_list(collection.docs)
        end

        # Remove all static files
        @static_files = []
      end

      # Public: Extract records from every file and index them
      def push
        records = []
        files = []
        progress_bar = ProgressBar.create(
          total: indexable_item_count,
          format: 'Extracting records (%j%%) |%B|'
        )
        each_site_file do |file|
          # Even if we cleared the list of documents/pages beforehand, some
          # files might still sneak up to this point (like static files added to
          # a collection directory), so we check again if they can really be
          # indexed.
          next unless FileBrowser.indexable?(file)

          path = FileBrowser.relative_path(file.path)

          Logger.verbose("I:Extracting records from #{path}")
          file_records = Extractor.run(file)

          files << file
          records += file_records

          progress_bar.increment
        end

        # Applying the user hook on the whole list of records
        records = Hooks.apply_all(records, self)

        # Shrinking records to force them to fit under the max record size
        # limit, or displaying an error message if not possible
        max_record_size = Configurator.algolia('max_record_size')
        # We take into account the objectID that will be added in the form of:
        # "objectID": "16cd998991cc40d92402b0b4e6c55e8a"
        object_id_attribute_length = 46
        max_record_size -= object_id_attribute_length
        records.map! do |record|
          Shrinker.fit_to_size(record, max_record_size)
        end

        # Adding a unique objectID to each record
        records.map! do |record|
          Extractor.add_unique_object_id(record)
        end

        Logger.verbose("I:Found #{files.length} files")

        Indexer.run(records)
      end
    end
  end
end
