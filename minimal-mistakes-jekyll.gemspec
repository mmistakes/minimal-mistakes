require 'json'

# Caminho absoluto para o arquivo package.json
file_path = '/home/frank/temp/jekyll_env/minimal-mistakes/package.json'

# Verifica se o arquivo existe antes de tentar lê-lo
if File.exist?(file_path)
  package_json = JSON.parse(File.read(file_path))

  # Define a especificação da gem
  Gem::Specification.new do |spec|
    spec.name                    = "minimal-mistakes-jekyll"
    spec.version                 = package_json["version"]
    spec.authors                 = ["Michael Rose", "iBug"]

    spec.summary                 = %q{A flexible two-column Jekyll theme.}
    spec.homepage                = "https://github.com/mmistakes/minimal-mistakes"
    spec.license                 = "MIT"

    spec.metadata["plugin_type"] = "theme"

    spec.files                   = `git ls-files -z`.split("\x0").select do |f|
      f.match(%r{^(assets|_(data|includes|layouts|sass)/|(LICENSE|README|CHANGELOG)((\.(txt|md|markdown)|$)))}i)
    end

    spec.add_runtime_dependency "jekyll", ">= 3.7", "< 5.0"
    spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
    spec.add_runtime_dependency "jekyll-sitemap", "~> 1.3"
    spec.add_runtime_dependency "jekyll-gist", "~> 1.5"
    spec.add_runtime_dependency "jekyll-feed", "~> 0.1"
    spec.add_runtime_dependency "jekyll-include-cache", "~> 0.1"

    spec.add_development_dependency "bundler"
    spec.add_development_dependency "rake", ">= 12.3.3"
  end
else
  puts "Arquivo #{file_path} não encontrado."
end

