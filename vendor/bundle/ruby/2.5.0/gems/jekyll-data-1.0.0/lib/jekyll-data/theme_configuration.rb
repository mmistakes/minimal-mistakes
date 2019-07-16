# encoding: UTF-8

module JekyllData
  class ThemeConfiguration < Jekyll::Configuration
    class << self
      # Public: Establish a new site.config hash by reading an optional config
      #         file within the theme-gem and appending the resulting hash to
      #         existing site.config filling in keys not already defined.
      #
      # site: current Jekyll::Site instance.
      #
      # Returns a config Hash to be used by an 'after_reset' hook.
      def reconfigure(site)
        default_hash = Jekyll::Configuration::DEFAULTS
        theme_config = ThemeConfiguration.new(site).read_theme_config

        # Merge with existing site.config and strip any remaining defaults
        config = Jekyll::Utils.deep_merge_hashes(
          theme_config, site.config
        ).reject { |key, value| value == default_hash[key] }

        # Merge DEFAULTS < _config.yml in theme-gem < config file(s) from source
        # and redefine site.config
        site.config = Jekyll::Configuration.from(
          Jekyll::Utils.deep_merge_hashes(theme_config, config)
        )
      end
    end

    #

    def initialize(site)
      @site = site
    end

    # Public: Read the '_config.yml' file within the theme-gem.
    #         Additionally validates that the extracted config data and the
    #         the 'value' of '<site.theme.name> key', when present, is a Hash.
    #
    # Returns a Configuration Hash
    def read_theme_config
      file = @site.in_theme_dir("_config.yml")
      theme_name = @site.theme.name

      config = safe_load_file(file)

      check_config_is_hash!(config, file)
      validate_config_hash config[theme_name] unless config[theme_name].nil?

      config
    end

    private

    # Validate the <site.theme.name> key's value to be accessed via the `theme`
    # namespace.
    def validate_config_hash(value)
      unless value.is_a? Hash
        Jekyll.logger.abort_with "JekyllData:", "Theme Configuration should be a " \
            "Hash of key:value pairs or mappings. But got #{value.class} instead."
      end
    end
  end
end
