#!/usr/bin/env ruby
# Purpose: A simple script to identify SEO problems in jekyll blog posts
# License: http://github.com/bhardin/jekyll-seo/license.txt

require 'optparse'
require 'nokogiri'

heading = [];
title = [];
url = [];
content = [];
meta_description = [];
temp = [];

options = {}

optparse = OptionParser.new do|opts|
	# Set a banner, displayed at the top of the help screen.
	opts.banner = "Usage: ./jekyll-seo -k keywords FILE"

	# Define the options, and what they do
	options[:verbose] = false
		opts.on( '-v', '--verbose', 'Output more information' ) do
		options[:verbose] = true
	end

	options[:keyword] = nil
		opts.on( '-k', '--keyword KEYWORD', 'keyword your post should be optimized for' ) do|keyword|
		options[:keyword] = keyword
	end

	options[:post] = nil
		opts.on( '-p', '--post FILE', 'post to be analyzed' ) do|post|
		options[:post] = post
	end

	opts.on( '-h', '--help', 'Display this screen' ) do
		puts opts
		exit
	end
end

optparse.parse!

puts "Being verbose" if options[:verbose]
if options[:verbose]
	puts "keyword: #{options[:keyword]}" if options[:keyword]
	#puts "analyzing post: #{options[:post]}" if options[:post]
end

if options[:post]
	f = options[:post]

	puts "Analyzing Post: #{f}..."
	post = Nokogiri::HTML(open(f))

	# Search for keyword in heading
	post.css('h1').each do |this|
		if options[:verbose]
			puts "heading found"
			puts "heading: #{this}"
		end

		heading = this.to_s.scan(/#{options[:keyword]}/i)

		if options[:verbose]
			puts "heading-found: #{title}"
		end
	end

	# Search for keyword in title
	post.css('title').each do |this|
		if options[:verbose]
			puts "title found"
			puts "title: #{this}"
		end

		title = this.to_s.scan(/#{options[:keyword]}/i)

		if options[:verbose]
			puts "title-found: #{title}"
		end
	end

	# Search for keyword in body
	post.css('body').each do |this|
		if options[:verbose]
			puts "content found"
			#puts "content: #{this}"
		end

		content = this.to_s.scan(/#{options[:keyword]}/i)
	end

	# Search for keyword in Meta Description
	post.css('meta').each do |this|
		if this.attribute("name").to_s == "description"
			if options[:verbose]
				puts "Meta Description found"
				puts "Meta Description: #{this.attribute('content')}"
			end

			meta_description = this.attribute("content").to_s.scan(/#{options[:keyword]}/i)
		end
	end

	puts ""
	puts "Article Heading: #{not heading.empty?} (#{heading.count})"
	puts "Page title: #{not title.empty?} (#{title.count})"
	# puts "Page URL: Yes (1)"
	puts "Content: #{not content.empty?} (#{content.count})"
	puts "Meta description: #{not meta_description.empty?} (#{meta_description.count})"
	
else
	puts "No post given to analyze. Try with -h"
end



#You have not used your keyword / keyphrase in any subheading (such as an H2) in your copy.
#No images appear in this page, consider adding some as appropriate.
#The meta description is under 120 characters, however up to 156 characters are available. The available space is shorter than the usual 155 characters because Google will also include the publication date in the snippet.
#The page title contains keyword / phrase, but it does not appear at the beginning; try and move it to the beginning.
#The keyword / phrase does not appear in the URL for this page. If you decide to rename the URL be sure to check the old URL 301 redirects to the new one!
#The copy scores 68.9 in the Flesch Reading Ease test, which is considered OK to read.
#This page has 14 outbound link(s).
#The keyword density is 1.74%, which is great, the keyword was found 15 times.
#The meta description contains the primary keyword / phrase.
#There are 890 words contained in the body copy, this is greater than the 300 word recommended minimum.
#The page title is more than 40 characters and less than the recommended 70 character limit.
#The keyword appears in the first paragraph of the copy.