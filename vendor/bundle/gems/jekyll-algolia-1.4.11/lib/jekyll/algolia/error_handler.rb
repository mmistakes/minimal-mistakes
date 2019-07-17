# frozen_string_literal: true

require 'verbal_expressions'
require 'filesize'
require 'cgi'

module Jekyll
  module Algolia
    # Catch API errors and display messages
    module ErrorHandler
      include Jekyll::Algolia

      # Public: Stop the execution of the plugin and display if possible
      # a human-readable error message
      #
      # error - The caught error
      # context - A hash of values that will be passed from where the error
      # happened to the display
      def self.stop(error, context = {})
        Logger.verbose("E:[jekyll-algolia] Raw error: #{error}")

        identified_error = identify(error, context)

        if identified_error == false
          Logger.log('E:[jekyll-algolia] Error:')
          Logger.log("E:#{error}")
        else
          Logger.known_message(
            identified_error[:name],
            identified_error[:details]
          )
        end

        exit 1
      end

      # Public: Will identify the error and return its internal name
      #
      # error - The caught error
      # context - A hash of additional information that can be passed from the
      # code intercepting the user
      #
      # It will parse in order all potential known issues until it finds one
      # that matches. Returns false if no match, or a hash of :name and :details
      # further identifying the issue.
      def self.identify(error, context = {})
        known_errors = %w[
          unknown_application_id
          invalid_credentials
          record_too_big_api
          too_many_records
          unknown_setting
          invalid_index_name
        ]

        # Checking the errors against our known list
        known_errors.each do |potential_error|
          error_check = send("#{potential_error}?", error, context)
          next if error_check == false

          return {
            name: potential_error,
            details: error_check
          }
        end
        false
      end

      # Public: Parses an Algolia error message into a hash of its content
      #
      # message - The raw message as returned by the API
      #
      # Returns a hash of all parts of the message, to be more easily consumed
      # by our error matchers
      def self.error_hash(message)
        message = message.delete("\n")

        # Ex: Cannot PUT to https://appid.algolia.net/1/indexes/index_name/settings:
        # {"message":"Invalid Application-ID or API key","status":403} (403)
        regex = VerEx.new do
          find 'Cannot '
          capture('verb') { word }
          find ' to '
          capture('scheme') { word }
          find '://'
          capture('application_id') { word }
          anything_but '/'
          find '/'
          capture('api_version') { digit }
          find '/'
          capture('api_section') { word }
          find '/'
          capture('index_name') do
            anything_but('/')
          end
          find '/'
          capture do
            capture('api_action') { word }
            maybe '?'
            capture('query_parameters') do
              anything_but(':')
            end
          end
          find ': '
          capture('json') do
            find '{'
            anything_but('}')
            find '}'
          end
          find ' ('
          capture('http_error') { word }
          find ')'
        end

        matches = regex.match(message)
        return false unless matches

        # Convert matches to a hash
        hash = {}
        matches.names.each do |name|
          hash[name] = matches[name]
        end

        hash['api_version'] = hash['api_version'].to_i
        hash['http_error'] = hash['http_error'].to_i

        # Merging the JSON key directly in the answer
        hash = hash.merge(JSON.parse(hash['json']))
        hash.delete('json')
        # Merging the query parameters in the answer
        CGI.parse(hash['query_parameters']).each do |key, values|
          hash[key] = values[0]
        end
        hash.delete('query_parameters')

        hash
      end

      # Public: Check if the application id is available
      #
      # _context - Not used
      #
      # If the call to the cluster fails, chances are that the application ID
      # is invalid. As we cannot actually contact the server, the error is raw
      # and does not follow our error spec
      def self.unknown_application_id?(error, _context = {})
        message = error.message
        return false if message !~ /^Cannot reach any host/

        matches = /.*\((.*)\.algolia.net.*/.match(message)

        # The API will browse on APP_ID-dsn, but push/delete on APP_ID only
        # We need to catch both potential errors
        app_id = matches[1].gsub(/-dsn$/, '')

        { 'application_id' => app_id }
      end

      # Public: Check if the credentials are working
      #
      # _context - Not used
      #
      # Application ID and API key submitted don't match any credentials known
      def self.invalid_credentials?(error, _context = {})
        details = error_hash(error.message)
        return false if details == false

        if details['message'] != 'Invalid Application-ID or API key'
          return false
        end

        {
          'application_id' => details['application_id'],
          'index_name' => Configurator.index_name,
          'index_object_ids_name' => Configurator.index_object_ids_name
        }
      end

      # Public: Check if the sent records are not too big
      #
      # context[:records] - list of records sent in the batch
      #
      # One of the sent record is too big and has been rejected by the API. This
      # should not happen as we proactively check for record size before pushing
      # them. If it still happens it means that the value set in max_record_size
      # is not matching the value in the plan.
      def self.record_too_big_api?(error, _context = {})
        details = error_hash(error.message)
        return false if details == false

        message = details['message']
        return false if message !~ /^Record .* is too big .*/

        record_size, = /.*size=(.*) bytes.*/.match(message).captures
        record_size_readable = Filesize.from("#{record_size}B").to_s('Kb')
        max_record_size = Configurator.algolia('max_record_size')

        {
          'record_size' => record_size_readable,
          'max_record_size' => max_record_size
        }
      end

      # Public: Check if one of the index settings is invalid
      #
      # context[:settings] - The settings passed to update the index
      #
      # The API will block any call that tries to update a setting value that is
      # not available. We'll tell the user which one so they can fix their
      # issue.
      def self.unknown_setting?(error, context = {})
        details = error_hash(error.message)
        return false if details == false

        message = details['message']
        return false if message !~ /^Invalid object attributes.*/

        # Getting the unknown setting name
        regex = /^Invalid object attributes: (.*) near line.*/
        setting_name, = regex.match(message).captures
        setting_value = context[:settings][setting_name]

        {
          'setting_name' => setting_name,
          'setting_value' => setting_value
        }
      end

      # Public: Check if the index name is invalid
      #
      # Some characters are forbidden in index names
      def self.invalid_index_name?(error, _context = {})
        details = error_hash(error.message)
        return false if details == false

        message = details['message']
        return false if message !~ /^indexName is not valid.*/

        {
          'index_name' => Configurator.index_name
        }
      end

      # Public: Check if the application has too many records
      #
      # We're trying to push too many records and it goes over quota
      def self.too_many_records?(error, _context = {})
        details = error_hash(error.message)
        return false if details == false

        message = details['message']
        return false if message !~ /^Record quota exceeded.*/

        {}
      end
    end
  end
end
