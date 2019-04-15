# -*- encoding: utf-8 -*-
# stub: nokogiri 1.10.2 ruby lib
# stub: ext/nokogiri/extconf.rb

Gem::Specification.new do |s|
  s.name = "nokogiri"
  s.version = "1.10.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Aaron Patterson", "Mike Dalessio", "Yoko Harada", "Tim Elliott", "Akinori MUSHA", "John Shahid", "Lars Kanis"]
  s.date = "2019-03-25"
  s.description = "Nokogiri (\u{92f8}) is an HTML, XML, SAX, and Reader parser.  Among\nNokogiri's many features is the ability to search documents via XPath\nor CSS3 selectors."
  s.email = ["aaronp@rubyforge.org", "mike.dalessio@gmail.com", "yokolet@gmail.com", "tle@holymonkey.com", "knu@idaemons.org", "jvshahid@gmail.com", "lars@greiz-reinsdorf.de"]
  s.executables = ["nokogiri"]
  s.extensions = ["ext/nokogiri/extconf.rb"]
  s.extra_rdoc_files = ["LICENSE-DEPENDENCIES.md", "LICENSE.md", "README.md", "ext/nokogiri/html_document.c", "ext/nokogiri/html_element_description.c", "ext/nokogiri/html_entity_lookup.c", "ext/nokogiri/html_sax_parser_context.c", "ext/nokogiri/html_sax_push_parser.c", "ext/nokogiri/nokogiri.c", "ext/nokogiri/xml_attr.c", "ext/nokogiri/xml_attribute_decl.c", "ext/nokogiri/xml_cdata.c", "ext/nokogiri/xml_comment.c", "ext/nokogiri/xml_document.c", "ext/nokogiri/xml_document_fragment.c", "ext/nokogiri/xml_dtd.c", "ext/nokogiri/xml_element_content.c", "ext/nokogiri/xml_element_decl.c", "ext/nokogiri/xml_encoding_handler.c", "ext/nokogiri/xml_entity_decl.c", "ext/nokogiri/xml_entity_reference.c", "ext/nokogiri/xml_io.c", "ext/nokogiri/xml_libxml2_hacks.c", "ext/nokogiri/xml_namespace.c", "ext/nokogiri/xml_node.c", "ext/nokogiri/xml_node_set.c", "ext/nokogiri/xml_processing_instruction.c", "ext/nokogiri/xml_reader.c", "ext/nokogiri/xml_relax_ng.c", "ext/nokogiri/xml_sax_parser.c", "ext/nokogiri/xml_sax_parser_context.c", "ext/nokogiri/xml_sax_push_parser.c", "ext/nokogiri/xml_schema.c", "ext/nokogiri/xml_syntax_error.c", "ext/nokogiri/xml_text.c", "ext/nokogiri/xml_xpath_context.c", "ext/nokogiri/xslt_stylesheet.c"]
  s.files = ["LICENSE-DEPENDENCIES.md", "LICENSE.md", "README.md", "bin/nokogiri", "ext/nokogiri/extconf.rb", "ext/nokogiri/html_document.c", "ext/nokogiri/html_element_description.c", "ext/nokogiri/html_entity_lookup.c", "ext/nokogiri/html_sax_parser_context.c", "ext/nokogiri/html_sax_push_parser.c", "ext/nokogiri/nokogiri.c", "ext/nokogiri/xml_attr.c", "ext/nokogiri/xml_attribute_decl.c", "ext/nokogiri/xml_cdata.c", "ext/nokogiri/xml_comment.c", "ext/nokogiri/xml_document.c", "ext/nokogiri/xml_document_fragment.c", "ext/nokogiri/xml_dtd.c", "ext/nokogiri/xml_element_content.c", "ext/nokogiri/xml_element_decl.c", "ext/nokogiri/xml_encoding_handler.c", "ext/nokogiri/xml_entity_decl.c", "ext/nokogiri/xml_entity_reference.c", "ext/nokogiri/xml_io.c", "ext/nokogiri/xml_libxml2_hacks.c", "ext/nokogiri/xml_namespace.c", "ext/nokogiri/xml_node.c", "ext/nokogiri/xml_node_set.c", "ext/nokogiri/xml_processing_instruction.c", "ext/nokogiri/xml_reader.c", "ext/nokogiri/xml_relax_ng.c", "ext/nokogiri/xml_sax_parser.c", "ext/nokogiri/xml_sax_parser_context.c", "ext/nokogiri/xml_sax_push_parser.c", "ext/nokogiri/xml_schema.c", "ext/nokogiri/xml_syntax_error.c", "ext/nokogiri/xml_text.c", "ext/nokogiri/xml_xpath_context.c", "ext/nokogiri/xslt_stylesheet.c"]
  s.licenses = ["MIT"]
  s.rdoc_options = ["--main", "README.md"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0")
  s.rubygems_version = "2.5.2.1"
  s.summary = "Nokogiri (\u{92f8}) is an HTML, XML, SAX, and Reader parser"

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<mini_portile2>, ["~> 2.4.0"])
      s.add_development_dependency(%q<concourse>, ["~> 0.24"])
      s.add_development_dependency(%q<hoe-bundler>, ["~> 1.2"])
      s.add_development_dependency(%q<hoe-debugging>, ["~> 2.0"])
      s.add_development_dependency(%q<hoe-gemspec>, ["~> 1.0"])
      s.add_development_dependency(%q<hoe-git>, ["~> 1.6"])
      s.add_development_dependency(%q<minitest>, ["~> 5.8"])
      s.add_development_dependency(%q<racc>, ["~> 1.4.14"])
      s.add_development_dependency(%q<rake>, ["~> 12.0"])
      s.add_development_dependency(%q<rake-compiler>, ["~> 1.0.3"])
      s.add_development_dependency(%q<rake-compiler-dock>, ["~> 0.7.0"])
      s.add_development_dependency(%q<rexical>, ["~> 1.0.5"])
      s.add_development_dependency(%q<simplecov>, ["~> 0.16"])
      s.add_development_dependency(%q<rdoc>, ["< 7", ">= 4.0"])
      s.add_development_dependency(%q<hoe>, ["~> 3.17"])
    else
      s.add_dependency(%q<mini_portile2>, ["~> 2.4.0"])
      s.add_dependency(%q<concourse>, ["~> 0.24"])
      s.add_dependency(%q<hoe-bundler>, ["~> 1.2"])
      s.add_dependency(%q<hoe-debugging>, ["~> 2.0"])
      s.add_dependency(%q<hoe-gemspec>, ["~> 1.0"])
      s.add_dependency(%q<hoe-git>, ["~> 1.6"])
      s.add_dependency(%q<minitest>, ["~> 5.8"])
      s.add_dependency(%q<racc>, ["~> 1.4.14"])
      s.add_dependency(%q<rake>, ["~> 12.0"])
      s.add_dependency(%q<rake-compiler>, ["~> 1.0.3"])
      s.add_dependency(%q<rake-compiler-dock>, ["~> 0.7.0"])
      s.add_dependency(%q<rexical>, ["~> 1.0.5"])
      s.add_dependency(%q<simplecov>, ["~> 0.16"])
      s.add_dependency(%q<rdoc>, ["< 7", ">= 4.0"])
      s.add_dependency(%q<hoe>, ["~> 3.17"])
    end
  else
    s.add_dependency(%q<mini_portile2>, ["~> 2.4.0"])
    s.add_dependency(%q<concourse>, ["~> 0.24"])
    s.add_dependency(%q<hoe-bundler>, ["~> 1.2"])
    s.add_dependency(%q<hoe-debugging>, ["~> 2.0"])
    s.add_dependency(%q<hoe-gemspec>, ["~> 1.0"])
    s.add_dependency(%q<hoe-git>, ["~> 1.6"])
    s.add_dependency(%q<minitest>, ["~> 5.8"])
    s.add_dependency(%q<racc>, ["~> 1.4.14"])
    s.add_dependency(%q<rake>, ["~> 12.0"])
    s.add_dependency(%q<rake-compiler>, ["~> 1.0.3"])
    s.add_dependency(%q<rake-compiler-dock>, ["~> 0.7.0"])
    s.add_dependency(%q<rexical>, ["~> 1.0.5"])
    s.add_dependency(%q<simplecov>, ["~> 0.16"])
    s.add_dependency(%q<rdoc>, ["< 7", ">= 4.0"])
    s.add_dependency(%q<hoe>, ["~> 3.17"])
  end
end
