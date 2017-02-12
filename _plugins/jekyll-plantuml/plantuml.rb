# Title: PlantUML Code Blocks for Jekyll
# Author: YJ Park (yjpark@gmail.com)
# https://github.com/yjpark/jekyll-plantuml
# Description: Integrate PlantUML into Jekyll and Octopress.
#
# Syntax:
# {% plantuml %}
# plantuml code
# {% endplantuml %}
#
require 'open3'
require 'fileutils'

module Jekyll

  class PlantUMLBlock < Liquid::Block
    attr_reader :config

    def render(context)
      site = context.registers[:site]
      self.config = site.config['plantuml']

      tmproot = File.expand_path(tmp_folder)
      folder = "/images/plantuml/"
      create_tmp_folder(tmproot, folder)

      code = @nodelist.join + background_color
      filename = Digest::MD5.hexdigest(code) + ".png"
      filepath = tmproot + folder + filename
      if !File.exist?(filepath)
        plantuml_jar = File.expand_path(plantuml_jar_path)
        cmd = "java -Djava.awt.headless=true -jar " + plantuml_jar + dot_cmd + " -pipe > " + filepath
        result, status = Open3.capture2e(cmd, :stdin_data=>code)
        Jekyll.logger.debug(filepath + " -->\t" + status.inspect() + "\t" + result)
      end

      site.static_files << Jekyll::StaticFile.new(site, tmproot, folder, filename)

      source = "<img src='" + folder + filename + "'>"
    end

    private

    def config=(cfg)
      @config = cfg || Jekyll.logger.abort_with("Missing 'plantuml' configurations.")
    end

    def background_color
      config['background_color'].nil? ? '' : " skinparam backgroundColor " + config['background_color']
    end

    def plantuml_jar_path
      config['plantuml_jar'] || Jekyll.logger.abort_with("Missing configuration 'plantuml.plantuml_jar'.")
    end

    def tmp_folder
      config['tmp_folder'] || Jekyll.logger.abort_with("Missing configuration 'plantuml.tmp_folder'.")
    end

    def dot_cmd
      @dot_cmd ||= begin
        dotpath = File.expand_path(config['dot_exe'] || '__NULL__')
        if File.exist?(dotpath)
          Jekyll.logger.info("PlantUML: Use graphviz dot: " + dotpath)
          " -graphvizdot " + dotpath
        else
          Jekyll.logger.info("PlantUML: Assume graphviz dot is in PATH.")
          ''
        end
      end
    end

    def create_tmp_folder(tmproot, folder)
      folderpath = tmproot + folder
      if !File.exist?(folderpath)
        FileUtils::mkdir_p folderpath
        Jekyll.logger.info("Create PlantUML image folder: " + folderpath)
      end
    end

  end # PlantUMLBlock
end

Liquid::Template.register_tag('plantuml', Jekyll::PlantUMLBlock)