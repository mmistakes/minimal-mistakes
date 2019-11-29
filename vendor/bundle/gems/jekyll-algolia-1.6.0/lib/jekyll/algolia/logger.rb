# frozen_string_literal: true

module Jekyll
  module Algolia
    # Display helpful error messages
    module Logger
      # Public: Silence all Jekyll log output in this block
      # Usage:
      #   Logger.silence do
      #     # whatever Jekyll code here
      #   end
      #
      # This is especially useful when Jekyll is too talkative about what is
      # loggued. It works by redefining Jekyll.logger.write to a noop
      # temporarily and re-attributing the original method once finished.
      def self.silent
        initial_method = Jekyll.logger.method(:write)
        Utils.monkey_patch(Jekyll.logger, :write, proc { |*args| })
        begin
          yield
        ensure
          Utils.monkey_patch(Jekyll.logger, :write, initial_method)
        end
      end

      # Public: Displays a log line
      #
      # line - Line to display. Expected to be of the following format:
      #   "X:Your content"
      # Where X is either I, W or E for marking respectively an info, warning or
      # error display
      def self.log(input)
        type, content = /^(I|W|E):(.*)/m.match(input).captures
        logger_mapping = {
          'E' => :error,
          'I' => :info,
          'W' => :warn
        }

        # Display by chunk of 80-characters lines
        lines = Utils.split_lines(content, 80)
        lines.each do |line|
          Jekyll.logger.send(logger_mapping[type], line)
        end
      end

      # Public: Only display a log line if verbose mode is enabled
      #
      # line - The line to display, following the same format as .log
      def self.verbose(line)
        return unless Configurator.verbose?

        log(line)
      end

      # Public: Write the specified content to a file in the source directory
      #
      # filename - the file basename
      # content - the actual content of the file
      def self.write_to_file(filename, content)
        filepath = File.join(Configurator.get('source'), filename)
        File.write(filepath, content)
        filepath
      end

      # Public: Displays a helpful error message for one of the knows errors
      #
      # message_id: A string identifying a know message
      # metadata: Hash of variables that can be used in the final text
      #
      # It will read files in ./errors/*.txt with the matching error and
      # display them using Jekyll internal logger.
      def self.known_message(message_id, metadata = {})
        file = File.expand_path(
          File.join(
            __dir__, '../..', 'errors', "#{message_id}.txt"
          )
        )

        # Convert all variables
        content = File.open(file).read
        metadata.each do |key, value|
          content = content.gsub("{#{key}}", value.to_s)
        end

        # Display each line differently
        lines = content.each_line.map(&:chomp)
        lines.each do |line|
          log(line)
        end
      end
    end
  end
end
