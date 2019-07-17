# frozen_string_literal: true

module GitHubPages
  # The github-pages gem will automatically disable every plugin that is not in
  # the whitelist of plugins allowed by GitHub. This includes any plugin defined
  # in the `_plugins` folder as well.
  #
  # Users of the jekyll-algolia plugin will use custom plugins in _plugins to
  # define custom hooks to modify the indexing. If they happen to have the
  # github-pages gem installed at the same time, those hooks will never be
  # executed.
  #
  # The GitHub Pages gem prevent access to custom plugins by doing two things:
  # - forcing safe mode
  # - loading custom plugins from a random dir
  #
  # We cancel those by disabling safe mode and forcing back plugins to be read
  # from ./_plugins.
  #
  # This file will only be loaded when running `jekyll algolia`, so it won't
  # interfere with the regular usage of `jekyll build`
  class Configuration
    class << self
      def set!(site)
        config = effective_config(site.config)
        config['safe'] = false
        config['plugins_dir'] = '_plugins'
        site.config = config
      end
    end
  end
end
