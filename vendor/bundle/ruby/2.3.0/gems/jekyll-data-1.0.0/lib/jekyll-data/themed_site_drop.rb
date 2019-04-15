# encoding: UTF-8

module JekyllData
  class ThemedSiteDrop < Jekyll::Drops::SiteDrop
    extend Forwardable

    mutable false

    def_delegator  :@obj, :site_data, :data
    def_delegators :@obj, :theme

    private
    def_delegator :@obj, :config, :fallback_data
  end
end
