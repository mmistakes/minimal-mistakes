# frozen_string_literal: true

require 'json'
module Jekyll
  module Algolia
    # Module to shrink a record so it fits in the plan quotas
    module Shrinker
      include Jekyll::Algolia

      # Public: Get the byte size of the object once converted to JSON
      # - record: The record to estimate
      def self.size(record)
        record.to_json.bytesize
      end

      # Public: Attempt to reduce the size of the record by reducing the size of
      # the less needed attributes
      #
      # - raw_record: The record to attempt to reduce
      # - max_size: The max size to achieve in bytes
      #
      # The excerpts are the attributes most subject to being reduced. We'll go
      # as far as removing them if there is no other choice.
      def self.fit_to_size(raw_record, max_size)
        return raw_record if size(raw_record) <= max_size

        # No excerpt, we can't shrink it
        if !raw_record.key?(:excerpt_html) || !raw_record.key?(:excerpt_text)
          return stop_with_error(raw_record)
        end

        record = raw_record.clone

        # We replace the HTML excerpt with the textual one
        record[:excerpt_html] = record[:excerpt_text]
        return record if size(record) <= max_size

        # We half the excerpts
        excerpt_words = record[:excerpt_text].split(/\s+/)
        shortened_excerpt = excerpt_words[0...excerpt_words.size / 2].join(' ')
        record[:excerpt_text] = shortened_excerpt
        record[:excerpt_html] = shortened_excerpt
        return record if size(record) <= max_size

        # We remove the excerpts completely
        record.delete(:excerpt_text)
        record.delete(:excerpt_html)
        return record if size(record) <= max_size

        # Still too big, we fail
        stop_with_error(record)
      end

      # Public: Stop the current indexing process and display details about the
      # record that is too big to be pushed
      #
      # - record: The record causing the error
      #
      # This will display an error message and log the wrong record in a file in
      # the source directory
      def self.stop_with_error(record)
        record_size = size(record)
        record_size_readable = Filesize.from("#{record_size}B").to_s('Kb')
        max_record_size = Configurator.algolia('max_record_size')
        max_record_size_readable = Filesize
                                   .from("#{max_record_size}B").to_s('Kb')

        probable_wrong_keys = readable_largest_record_keys(record)

        # Writing the full record to disk for inspection
        record_log_path = Logger.write_to_file(
          'jekyll-algolia-record-too-big.log',
          JSON.pretty_generate(record)
        )

        details = {
          'object_title' => record[:title],
          'object_url' => record[:url],
          'probable_wrong_keys' => probable_wrong_keys,
          'record_log_path' => record_log_path,
          'nodes_to_index' => Configurator.algolia('nodes_to_index'),
          'record_size' => record_size_readable,
          'max_record_size' => max_record_size_readable
        }

        Logger.known_message('record_too_big', details)

        stop_process
      end

      # Public: Returns a string explaining which attributes are the largest in
      # the record
      #
      # record - The record hash to analyze
      def self.readable_largest_record_keys(record)
        keys = Hash[record.map { |key, value| [key, value.to_s.length] }]
        largest_keys = keys.sort_by { |_, value| value }.reverse[0..2]
        output = []
        largest_keys.each do |key, size|
          size = Filesize.from("#{size} B").to_s('Kb')
          output << "#{key} (#{size})"
        end
        output.join(', ')
      end

      # Public: Stop the current process
      def self.stop_process
        exit 1
      end
    end
  end
end
