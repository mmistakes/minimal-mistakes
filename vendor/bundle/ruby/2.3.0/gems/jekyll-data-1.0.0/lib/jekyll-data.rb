require "jekyll"
require "jekyll-data/version"

module JekyllData
  autoload :Reader,             "jekyll-data/reader"
  autoload :ThemedSiteDrop,     "jekyll-data/themed_site_drop"
  autoload :ThemeDataReader,    "jekyll-data/theme_data_reader"
  autoload :ThemeConfiguration, "jekyll-data/theme_configuration"
end

# Monkey-patches
require_relative "jekyll/build_options"
require_relative "jekyll/data_path"
require_relative "jekyll/theme_drop"

# ----------------------------------------------------------------------------
# Modify the current site instance if it uses a gem-based theme else have this
# plugin disabled.
#
# if a '_config.yml' is present at the root of theme-gem, it is evaluated and
# the extracted hash data is incorprated into the site's config hash.
# ----------------------------------------------------------------------------
Jekyll::Hooks.register :site, :after_reset do |site|
  if site.theme
    file = site.in_theme_dir("_config.yml")
    JekyllData::ThemeConfiguration.reconfigure(site) if File.exist?(file)
  else
    Jekyll.logger.abort_with(
      "JekyllData:",
      "Error! This plugin only works with gem-based jekyll-themes. " \
      "Please disable this plugin to proceed."
    )
  end
end

# ---------------------------------------------------------------------------
# Replace Jekyll::Reader with a subclass JekyllData::Reader only if the
# site uses a gem-based theme.
#
# If a _config.yml exists at the root of the theme-gem, output its path.
# Placed here inorder to avoid outputting the path after every regeneration.
# ---------------------------------------------------------------------------
Jekyll::Hooks.register :site, :after_init do |site|
  if site.theme
    file = site.in_theme_dir("_config.yml")
    Jekyll.logger.info "Theme Config file:", file if File.exist?(file)
    site.reader = JekyllData::Reader.new(site)
  end
end
