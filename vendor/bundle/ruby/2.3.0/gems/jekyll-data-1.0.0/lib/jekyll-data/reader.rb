# encoding: UTF-8
require "csv"

module JekyllData
  class Reader < Jekyll::Reader
    def initialize(site)
      @site = site
      @theme = site.theme
      @theme_data_files = Dir[File.join(site.theme.root,
        site.config["data_dir"], "**", "*.{yaml,yml,json,csv}")]
    end

    # Read data files within theme-gem.
    #
    # Returns nothing.
    def read
      super
      read_theme_data
    end

    # Read data files within a theme gem and add them to internal data
    #
    # Returns a hash appended with new data
    def read_theme_data
      if @theme.data_path
        #
        # show contents of "<theme>/_data/" dir being read while degugging.
        inspect_theme_data
        theme_data = ThemeDataReader.new(site).read(site.config["data_dir"])
        @site.data = Jekyll::Utils.deep_merge_hashes(theme_data, @site.data)
        #
        # show contents of merged site.data hash while debugging with
        # additional --show-data switch.
        inspect_merged_hash if site.config["show-data"] && site.config["verbose"]
      end
    end

    private

    # Private:
    # (only while debugging)
    #
    # Print a list of data file(s) within the theme-gem
    def inspect_theme_data
      print_clear_line
      Jekyll.logger.debug "Reading:", "Theme Data Files..."
      @theme_data_files.each { |file| Jekyll.logger.debug "", file }
      print_clear_line
      Jekyll.logger.debug "Merging:", "Theme Data Hash..."

      unless site.config["show-data"] && site.config["verbose"]
        Jekyll.logger.debug "", "use --show-data with --verbose to output " \
                                "merged Data Hash.".cyan
        print_clear_line
      end
    end

    # Private:
    # (only while debugging)
    #
    # Print contents of the merged data hash
    def inspect_merged_hash
      Jekyll.logger.debug "Inspecting:", "Site Data >>"

      # the width of generated logger[message]
      @width = 50
      @dashes = "-" * @width

      inspect_hash @site.data
      print_clear_line
    end

    # --------------------------------------------------------------------
    # Private helper methods to inspect data hash and output contents
    # to logger at level debugging.
    # --------------------------------------------------------------------

    # Dissect the (merged) site.data hash and print its contents
    #
    # - Print the key string(s)
    # - Individually analyse the hash[key] values and extract contents
    #   to output.
    def inspect_hash(hash)
      hash.each do |key, value|
        print_key key
        if value.is_a? Hash
          inspect_inner_hash value
        elsif value.is_a? Array
          extract_hashes_and_print value
        else
          print_string value.to_s
        end
      end
    end

    # Analyse deeper hashes and extract contents to output
    def inspect_inner_hash(hash)
      hash.each do |key, value|
        if value.is_a? Array
          print_label key
          extract_hashes_and_print value
        elsif value.is_a? Hash
          print_subkey_and_value key, value
        else
          print_hash key, value
        end
      end
    end

    # If an array of strings, print. Otherwise assume as an
    # array of hashes (sequences) that needs further analysis.
    def extract_hashes_and_print(array)
      array.each do |entry|
        if entry.is_a? String
          print_list entry
        else
          inspect_inner_hash entry
        end
      end
    end

    #

    # --------------------------------------------------------------------
    # Private methods for formatting log messages while debugging
    # --------------------------------------------------------------------

    # Splits a string longer than the value of '@width' into smaller
    # strings and prints each line as a logger[message]
    #
    # string - the long string
    #
    # label - optional text to designate the printed lines.
    def print_long_string(string, label = "")
      strings = string.scan(%r!(.{1,#{@width}})(\s+|\W|\Z)!).map { |s| s.join.strip }
      first_line = strings.first.cyan

      label.empty? ? print_value(first_line) : print(label, first_line)
      strings[1..-1].each { |s| print_value s.cyan }
    end

    # Prints key as logger[topic] and value as [message]
    def print_hash(key, value)
      if value.length > @width
        print_long_string value, "#{key}:"
      else
        print "#{key}:", value.cyan
      end
    end

    def print_list(item)
      if item.length > @width
        print_long_string item, "-"
      else
        print "-", item.cyan
      end
    end

    def print_string(str)
      if str.length > @width
        print_long_string str
      else
        print_value str.inspect
      end
    end

    # Prints the site.data[key] in color
    def print_key(key)
      print_clear_line
      print "Data Key:", " #{key} ".center(@width, "=")
      print_clear_line
    end

    # Prints label, keys and values of mappings
    def print_subkey_and_value(key, value)
      print_label key
      value.each do |subkey, val|
        if val.is_a? Hash
          print_inner_subkey subkey
          inspect_inner_hash val
        elsif val.is_a? Array
          print_inner_subkey subkey
          extract_hashes_and_print val
        elsif val.is_a? String
          print_hash subkey, val
        end
      end
    end

    # Print only logger[message], [topic] = nil
    def print_value(value)
      if value.is_a? Array
        extract_hashes_and_print value
      else
        print "", value
      end
    end

    # Print only logger[topic] appended with a colon
    def print_label(key)
      print_value " #{key} ".center(@width, "-")
    end

    def print_inner_subkey(key)
      print "#{key}:", @dashes
    end

    def print_dashes
      print "", @dashes
    end

    def print_clear_line
      print ""
    end

    # Redefine Jekyll Loggers to have the [topic] indented by 30.
    # (rjust by just 29 to accomodate the additional whitespace added
    # by Jekyll)
    def print(topic, message = "")
      Jekyll.logger.debug topic.rjust(29), message
    end
  end
end
