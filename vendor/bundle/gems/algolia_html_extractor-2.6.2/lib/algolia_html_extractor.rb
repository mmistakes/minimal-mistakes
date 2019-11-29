# frozen_string_literal: true

require 'nokogiri'
require 'digest/md5'

# Extract content from an HTML page in the form of items with associated
# headings data
module AlgoliaHTMLExtractor
  # Extractor options, applying default options when none set
  def self.default_options(options)
    default_options = {
      css_selector: 'p',
      heading_selector: 'h1,h2,h3,h4,h5,h6',
      tags_to_exclude: ''
    }
    default_options.merge(options)
  end

  # Getting a list of HTML nodes from an input and a CSS selector
  def self.css(input, selector)
    Nokogiri::HTML(input).css(selector)
  end

  def self.run(input, options: {})
    options = default_options(options)
    heading_selector = options[:heading_selector]
    css_selector = options[:css_selector]
    tags_to_exclude = options[:tags_to_exclude]

    items = []
    current_hierarchy = {
      lvl0: nil,
      lvl1: nil,
      lvl2: nil,
      lvl3: nil,
      lvl4: nil,
      lvl5: nil
    }
    current_position = 0 # Position of the DOM node in the tree
    current_lvl = nil # Current closest headings level
    current_anchor = nil # Current closest anchor

    # We select all nodes that match either the headings or the elements to
    # extract. This will allow us to loop over it in order it appears in the DOM
    css(input, "#{heading_selector},#{css_selector}").each do |node|
      # If it's a heading, we update our current hierarchy
      if node.matches?(heading_selector)
        # Which level heading is it?
        current_lvl = extract_tag_name(node).gsub(/^h/, '').to_i - 1
        # Update this level, and set all the following ones to nil
        current_hierarchy["lvl#{current_lvl}".to_sym] = extract_text(node)
        (current_lvl + 1..6).each do |lvl|
          current_hierarchy["lvl#{lvl}".to_sym] = nil
        end
        # Update the anchor, if the new heading has one
        new_anchor = extract_anchor(node)
        current_anchor = new_anchor if new_anchor
      end

      # Stop if node is not to be extracted
      next unless node.matches?(css_selector)

      # Removing excluded child from the node
      node.search(tags_to_exclude).each(&:remove) unless tags_to_exclude.empty?

      # Stop if node is empty
      content = extract_text(node)
      next if content.empty?

      item = {
        html: extract_html(node),
        content: content,
        headings: current_hierarchy.values.compact,
        anchor: current_anchor,
        node: node,
        custom_ranking: {
          position: current_position,
          heading: heading_weight(current_lvl)
        }
      }
      item[:objectID] = uuid(item)
      items << item

      current_position += 1
    end

    items
  end

  # Returns the outer HTML of a given node
  #
  # eg.
  # <p>foo</p> => <p>foo</p>
  def self.extract_html(node)
    node.to_s.strip
  end

  # Returns the inner HTML of a given node
  #
  # eg.
  # <p>foo</p> => foo
  def self.extract_text(node)
    node.content
  end

  # Returns the tag name of a given node
  #
  # eg
  # <p>foo</p> => p
  def self.extract_tag_name(node)
    node.name.downcase
  end

  # Returns the anchor to the node
  #
  # eg.
  # <h1 name="anchor">Foo</h1> => anchor
  # <h1 id="anchor">Foo</h1> => anchor
  # <h1><a name="anchor">Foo</a></h1> => anchor
  def self.extract_anchor(node)
    anchor = node.attr('name') || node.attr('id') || nil
    return anchor unless anchor.nil?

    # No anchor found directly in the header, search on children
    subelement = node.css('[name],[id]')
    return extract_anchor(subelement[0]) unless subelement.empty?

    nil
  end

  ##
  # Generate a unique identifier for the item
  def self.uuid(item)
    # We don't use the objectID as part of the hash algorithm

    item.delete(:objectID)
    # We first get all the keys of the object, sorted alphabetically...
    ordered_keys = item.keys.sort

    # ...then we build a huge array of "key=value" pairs...
    ordered_array = ordered_keys.map do |key|
      value = item[key]
      # We apply the method recursively on other hashes
      value = uuid(value) if value.is_a?(Hash)
      "#{key}=#{value}"
    end

    # ...then we build a unique md5 hash of it
    Digest::MD5.hexdigest(ordered_array.join(','))
  end

  ##
  # Get a relative numeric value of the importance of the heading
  # 100 for top level, then -10 per heading
  def self.heading_weight(heading_level)
    weight = 100
    return weight if heading_level.nil?

    weight - ((heading_level + 1) * 10)
  end
end
