#--------------------------------------------------
# config.rb
#
# Loads configuration files.
# Resolves the dependencies for each configuration
# file, includes list. Merges the configuration
# files into one configuration.
#--------------------------------------------------

require_relative "shared.rb"

class Config

  # Returns the project's name, to be used as the
  # virtual machine name prefix. Automatically detects the
  # project name from a given list of configuration files.
  def Config.project_name(project_configs = [])
    name = File.basename(Dir.pwd)
    project_configs.each do |path_key|
      path, delim, key = path_key.rpartition("#")
      key = 'name' if key.empty?
      if path.end_with?('.yml') and File.exists?(path) then
        data = YAML::load(File.read(path))
      elsif path.end_with?('.json') and File.exists?(path) then
        data = JSON.parse(File.read(path))
      else
        next
      end
      if data != nil and data.is_a? Hash and data.has_key?(key) then
        key_value = data[key]
        if key_value != nil and key_value.is_a? String and not key_value.empty? then
          name = key_value
          break
        end
      end
    end
    return name
  end

  # Resolves the given path for the configuration file.
  def Config.resolve_path(path)
    if path.end_with?('.yml') and File.exists?(path) then
      File.expand_path(path)
    elsif path.end_with?('.json') and File.exists?(path) then
      File.expand_path(path)
    elsif path.end_with?('.yml.erb') and File.exists?(path) then
      File.expand_path(path)
    elsif path.end_with?('.json.erb') and File.exists?(path) then
      File.expand_path(path)
    elsif File.exists?("#{path}.yml") then
      File.expand_path("#{path}.yml")
    elsif File.exists?("#{path}.json") then
      File.expand_path("#{path}.json")
    else
      raise "Cannot resolve #{path}.yml or #{path}.json."
    end
  end

  # Loads and parses the configuration file at the given path.
  def Config.load(path)
    if path.end_with?('.yml') and File.exists?(path) then
      YAML::load(File.read(path))
    elsif path.end_with?('.json') and File.exists?(path) then
      JSON.parse(File.read(path))
    elsif path.end_with?('.yml.erb') and File.exists?(path) then
      YAML::load(File.read(path).template({ENV: ENV}))
    elsif path.end_with?('.json.erb') and File.exists?(path) then
      JSON.parse(File.read(path).template({ENV: ENV}))
    else
      raise "Cannot resolve #{path}.yml or #{path}.json."
    end
  end

  # Loads and parses the given list of configuration
  # files. Sets the given hash file paths map to file contents.
  # Returns the merge order of the files.
  def Config.batch_load(includes, configs, cwd)
    loads = []
    includes.map {|inc| Config.resolve_path("#{cwd}/#{inc}")}.each do |inc|
      next if configs.has_key?(inc)
      configs[inc] = config = Config.load(inc)
      if config.has_key?('includes') then
        loads = loads + Config.batch_load(config.delete('includes'), configs, File.dirname(inc))
      end
      loads.push(inc)
    end
    return loads
  end

  # Given a array of configuration source paths,
  # returns the merged configuration hash.
  def Config.resolve_dependencies(includes)
    resolved = {}
    Config.batch_load(includes, configs = {}, Dir.pwd).each do |inc|
      resolved = resolved.deep_merge(configs[inc])
    end
    return resolved
  end

end # Config
