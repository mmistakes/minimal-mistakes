# frozen_string_literal: true

require 'algoliasearch'
require 'yaml'
require 'algolia_html_extractor'

# rubocop:disable Metrics/ModuleLength
module Jekyll
  module Algolia
    # Module to push records to Algolia and configure the index
    module Indexer
      include Jekyll::Algolia

      # Public: Init the module
      def self.init
        ::Algolia.init(
          application_id: Configurator.application_id,
          api_key: Configurator.api_key
        )
        index_name = Configurator.index_name
        @index = ::Algolia::Index.new(index_name)
        index_object_ids_name = Configurator.index_object_ids_name
        @index_object_ids = ::Algolia::Index.new(index_object_ids_name)

        set_user_agent

        self
      end

      # Public: Returns the Algolia index object
      def self.index
        @index
      end

      # Public: Returns the Algolia index used to store object ids
      def self.index_object_ids
        @index_object_ids
      end

      # Public: Check if an index exists
      #
      # index - Index to check
      #
      # Note: there is no API endpoint to do that, so we try to get the settings
      # instead, which will fail if the index does not exist
      def self.index_exist?(index)
        index.get_settings
        true
      rescue StandardError
        false
      end

      # Public: Get the number of records in an index
      #
      # index - Index to check
      #
      # Note: We'll do an empty query search, to match everything, but we'll
      # only return the objectID and one element, to get the shortest response
      # possible. It will still contain the nbHits
      def self.record_count(index)
        index.search(
          '',
          attributesToRetrieve: 'objectID',
          distinct: false,
          hitsPerPage: 1
        )['nbHits']
      rescue StandardError
        0
      end

      # Public: Set the User-Agent to send to the API
      #
      # Every integrations should follow the "YYY Integration" pattern, and
      # every API client should follow the "Algolia for YYY" pattern. Even if
      # each integration version is pinned to a specific API client version, we
      # are explicit in defining it to help debug from the dashboard.
      def self.set_user_agent
        user_agent = [
          "Jekyll Integration (#{VERSION})",
          "Algolia for Ruby (#{::Algolia::VERSION})",
          "Jekyll (#{::Jekyll::VERSION})",
          "Ruby (#{RUBY_VERSION})"
        ].join('; ')

        ::Algolia.set_extra_header('User-Agent', user_agent)
      end

      # Public: Get an array of all object IDs stored in the main index
      #
      # Note: As this will be slow (grabbing them 1000 at a time), we display
      # a progress bar.
      def self.remote_object_ids_from_main_index
        Logger.verbose("I:Inspecting existing records in index #{index.name}")

        list = []

        # As it might take some time, we display a progress bar
        progress_bar = ProgressBar.create(
          total: record_count(index),
          format: 'Inspecting existing records (%j%%) |%B|'
        )
        begin
          index.browse(
            attributesToRetrieve: 'objectID',
            hitsPerPage: 1000
          ) do |hit|
            list << hit['objectID']
            progress_bar.increment
          end
        rescue StandardError
          return []
        end

        list.sort
      end

      # Public: Get an array of all the object ids, stored in a dedicated
      # index
      #
      # Note: This will be very fast. Each record contain 100 object id, so it
      # will fit in one call each time.
      def self.remote_object_ids_from_dedicated_index
        list = []
        begin
          index_object_ids.browse(
            attributesToRetrieve: 'content',
            hitsPerPage: 1000
          ) do |hit|
            list += hit['content']
          end
        rescue StandardError
          return []
        end

        list.sort
      end

      # Public: Returns an array of all the objectIDs in the index
      #
      # Note: We use a dedicated index to store the objectIDs for faster
      # browsing, but if the index does not exist we read the main index.
      def self.remote_object_ids
        Logger.log('I:Getting list of existing records')

        # Main index empty, the list is empty no matter what (we don't use the
        # dedicated index in that case)
        return [] if record_count(index).zero?

        # Fast version, using the dedicated index
        has_object_id_index = index_exist?(index_object_ids)
        return remote_object_ids_from_dedicated_index if has_object_id_index

        # Slow version, browsing the full index
        remote_object_ids_from_main_index
      end

      # Public: Returns an array of the local objectIDs
      #
      # records - Array of all local records
      def self.local_object_ids(records)
        records.map { |record| record[:objectID] }.compact.sort
      end

      # Public: Update records of the index
      #
      # records - All records extracted from Jekyll
      #
      # Note: All operations will be done in one batch, assuring an atomic
      # update
      # Does nothing in dry run mode
      def self.update_records(records)
        # Getting list of objectID in remote and locally
        remote_ids = remote_object_ids
        local_ids = local_object_ids(records)

        # Making a diff, to see what to add and what to delete
        ids_to_delete = remote_ids - local_ids
        ids_to_add = local_ids - remote_ids

        # What changes should we do to the indexes?
        has_records_to_update = !ids_to_delete.empty? || !ids_to_add.empty?
        has_object_id_index = index_exist?(index_object_ids)

        # Stop if nothing to change
        if !has_records_to_update && has_object_id_index
          Logger.log('I:Content is already up to date.')
          return
        end

        # We group all operations into one batch
        operations = []

        # We update records only if there are records to update
        if has_records_to_update
          Logger.log("I:Updating records in index #{index.name}...")
          Logger.log("I:Records to delete: #{ids_to_delete.length}")
          Logger.log("I:Records to add:    #{ids_to_add.length}")

          # Transforming ids into real records to add
          records_by_id = Hash[records.map { |r| [r[:objectID], r] }]
          records_to_add = ids_to_add.map { |id| records_by_id[id] }

          # Deletion operations come first, to avoid hitting an overquota too
          # soon if it can be avoided
          ids_to_delete.each do |object_id|
            operations << {
              action: 'deleteObject', indexName: index.name,
              body: { objectID: object_id }
            }
          end
          # Then we add the new records
          operations += records_to_add.map do |new_record|
            { action: 'addObject', indexName: index.name, body: new_record }
          end
        end

        # We update the dedicated index everytime we update records, but we also
        # create it if it does not exist
        should_update_object_id_index = has_records_to_update ||
                                        !has_object_id_index
        if should_update_object_id_index
          operations << { action: 'clear', indexName: index_object_ids.name }
          local_ids.each_slice(100).each do |ids|
            operations << {
              action: 'addObject', indexName: index_object_ids.name,
              body: { content: ids }
            }
          end
        end

        execute_operations(operations)
      end

      # Public: Execute a serie of operations in a batch
      #
      # operations - Operations to batch
      #
      # Note: Will split the batch in several calls if too big, and will display
      # a progress bar if this happens
      def self.execute_operations(operations)
        return if Configurator.dry_run?
        return if operations.empty?

        # Run the batches in slices if they are too large
        batch_size = Configurator.algolia('indexing_batch_size')
        slices = operations.each_slice(batch_size).to_a

        should_have_progress_bar = (slices.length > 1)
        if should_have_progress_bar
          progress_bar = ProgressBar.create(
            total: slices.length,
            format: 'Updating index (%j%%) |%B|'
          )
        end

        slices.each do |slice|
          begin
            ::Algolia.batch!(slice)

            progress_bar.increment if should_have_progress_bar
          rescue StandardError => e
            ErrorHandler.stop(e, operations: slice)
          end
        end
      end

      # Public: Get a unique settingID for the current settings
      #
      # The settingID is generated as a hash of the current settings. As it will
      # be stored in the userData key of the resulting config, we exclude that
      # key from the hashing.
      def self.local_setting_id
        settings = Configurator.settings
        settings.delete('userData')
        AlgoliaHTMLExtractor.uuid(settings)
      end

      # Public: Get the settings of the remote index
      #
      # In case the index is not accessible, it will return nil
      def self.remote_settings
        index.get_settings
      rescue StandardError
        nil
      end

      # Public: Smart update of the settings of the index
      #
      # This will first compare the settings about to be pushed with the
      # settings already pushed. It will compare userData.settingID for that.
      # If the settingID is the same, we don't push as this won't change
      # anything. We will still check if the remote config seem to have been
      # manually altered though, and warn the user that this is not the
      # preferred way of doing so.
      #
      # If the settingID are not matching, it means our config is different, so
      # we push it, overriding the settingID for next push.
      def self.update_settings
        return if Configurator.settings.empty?

        current_remote_settings = remote_settings || {}
        remote_setting_id = current_remote_settings.dig('userData', 'settingID')

        settings = Configurator.settings
        setting_id = local_setting_id

        are_settings_forced = Configurator.force_settings?

        # The config we're about to push is the same we pushed previously. We
        # won't push again.
        if setting_id == remote_setting_id && !are_settings_forced
          Logger.log('I:Settings are already up to date.')
          # Check if remote config has been changed outside of the plugin, so we
          # can warn users that they should not alter their config from outside
          # of the plugin.
          current_remote_settings.delete('userData')
          changed_keys = Utils.diff_keys(settings, current_remote_settings)
          unless changed_keys.nil?
            warn_of_manual_dashboard_editing(changed_keys)
          end

          return
        end

        # Settings have changed, we push them
        settings['userData'] = {
          'settingID' => setting_id,
          'pluginVersion' => VERSION
        }

        Logger.log("I:Updating settings of index #{index.name}")
        return if Configurator.dry_run?

        set_settings(settings)
      end

      # Public: Set new settings to an index
      #
      # Will dispatch to the error handler if it fails
      # rubocop:disable Naming/AccessorMethodName
      def self.set_settings(settings)
        index.set_settings!(settings)
      rescue StandardError => e
        ErrorHandler.stop(e, settings: settings)
      end
      # rubocop:enable Naming/AccessorMethodName

      # Public: Warn users that they have some settings manually configured in
      # their dashboard
      #
      # When users change some settings in their dashboard, those settings might
      # get overwritten by the plugin. We can't prevent that, but we can warn
      # them when we detect they changed something.
      def self.warn_of_manual_dashboard_editing(changed_keys)
        # Transform the hash into readable YAML
        yaml_lines = changed_keys
                     .to_yaml(indentation: 2)
                     .split("\n")[1..-1]
        yaml_lines.map! do |line|
          line = line.gsub(/^ */) { |spaces| ' ' * spaces.length }
          line = line.gsub('- ', '  - ')
          "W:    #{line}"
        end
        Logger.known_message(
          'settings_manually_edited',
          settings: yaml_lines.join("\n"),
          index_name: Configurator.index_name
        )
      end

      # Public: Push all records to Algolia and configure the index
      #
      # records - Records to push
      def self.run(records)
        init

        # Indexing zero record is surely a misconfiguration
        if records.length.zero?
          files_to_exclude = Configurator.algolia('files_to_exclude').join(', ')
          Logger.known_message(
            'no_records_found',
            'files_to_exclude' => files_to_exclude,
            'nodes_to_index' => Configurator.algolia('nodes_to_index')
          )
          exit 1
        end

        update_settings
        update_records(records)

        Logger.log('I:✔ Indexing complete')
      end
    end
  end
end
# rubocop:enable Metrics/ModuleLength
