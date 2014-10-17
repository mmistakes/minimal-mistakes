require 'json'

module EmojiForJekyll

  class EmojiGenerator < Jekyll::Generator
    def generate(site)
      if site.config.has_key?("emoji") and !site.config["emoji"]
        return
      end

      if site.config.has_key?("emoji-additional-keys")
        additional_keys = site.config["emoji-additional-keys"]
      else
        additional_keys = []
      end

      get_master_whitelist

      get_images_path(site)

      site.pages.each { |p| substitute(p, additional_keys) }

      site.posts.each { |p| substitute(p, additional_keys) }
    end

    private
    def get_master_whitelist
      # @master_whitelist is an array of all supported emojis
      @master_whitelist = JSON.parse(IO.readlines(File.expand_path("emoji.json", File.dirname(__FILE__))).join)
    end

    def get_images_path(site)
      @images_path = {}
      if site.config["emoji-images-path"]

        images_path = site.config["emoji-images-path"]
        images_dir  = File.join(site.source, images_path)
        Dir.foreach(images_dir) do |image_filename|
          if /^(?<tag>.*)\.(?:png|jpg|jpeg|gif)/ =~ image_filename
            @master_whitelist << tag
            @images_path[tag] = File.join("/", images_path, image_filename)
          end
        end

      end
      @master_whitelist.sort!
    end

    def substitute(obj, additional_keys)
      if obj.data.has_key?("emoji") and !obj.data["emoji"]
        return
      end

      whitelist = obj.data.has_key?("emoji-whitelist") ? obj.data["emoji-whitelist"] : false
      blacklist = obj.data.has_key?("emoji-blacklist") ? obj.data["emoji-blacklist"] : false

      # When both the whitelist and blacklist are defined, whitelist will be prioritized
      blacklist = whitelist ? false : blacklist

      filter = Proc.new do |key|
        (whitelist and whitelist.include?($1)) or
        (blacklist and !blacklist.include?($1)) or
        (!whitelist and !blacklist) and
        @master_whitelist.bsearch { |i| i >= key } == key
      end

      obj.content.gsub!(/:([\w\+\-]+):/) do |s|
        convert($1, filter)
      end

      additional_keys.each do |key|
        if obj.data.has_key?(key)
          obj.data[key].gsub!(/:([\w\+\-]+):/) do |s|
            convert($1, filter)
          end
        end
      end
    end

    # convert takes in the key to the emoji to be converted and an optional block
    # If block is provided, conversion will be done only if this block evaluates to true.
    def convert(key, block = nil)
      if block.nil? or block.call(key)
        img_tag(key)
      else
        ":#{key}:"
      end
    end

    def img_tag(name)
      # if there is an image in the custom images path
      if @images_path[name]
        img_src = @images_path[name]
      else # otherwise use fallback CDN
        img_src = "https://github.global.ssl.fastly.net/images/icons/emoji/#{name}.png"
      end

      "<img class='emoji' title='#{name}' alt='#{name}' src='#{img_src}' height='20' width='20' align='absmiddle' >"
    end
  end
end
