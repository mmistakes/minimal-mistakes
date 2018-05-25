# frozen_string_literal: true

module JekyllFeed
  class Generator < Jekyll::Generator
    safe true
    priority :lowest

    # Main plugin action, called by Jekyll-core
    def generate(site)
      @site = site
      return if file_exists?(feed_path)
      @site.pages << content_for_file(feed_path, feed_source_path)
    end

    private

    # Matches all whitespace that follows
    #   1. A '>', which closes an XML tag or
    #   2. A '}', which closes a Liquid tag
    # We will strip all of this whitespace to minify the template
    MINIFY_REGEX = %r!(?<=>|})\s+!

    # Path to feed from config, or feed.xml for default
    def feed_path
      if @site.config["feed"] && @site.config["feed"]["path"]
        @site.config["feed"]["path"]
      else
        "feed.xml"
      end
    end

    # Path to feed.xml template file
    def feed_source_path
      File.expand_path "feed.xml", __dir__
    end

    # Checks if a file already exists in the site source
    def file_exists?(file_path)
      if @site.respond_to?(:in_source_dir)
        File.exist? @site.in_source_dir(file_path)
      else
        File.exist? Jekyll.sanitized_path(@site.source, file_path)
      end
    end

    # Generates contents for a file
    def content_for_file(file_path, file_source_path)
      file = PageWithoutAFile.new(@site, __dir__, "", file_path)
      file.content = File.read(file_source_path).gsub(MINIFY_REGEX, "")
      file.data["layout"] = nil
      file.data["sitemap"] = false
      file.data["xsl"] = file_exists?("feed.xslt.xml")
      file.output
      file
    end
  end
end
