# frozen_string_literal: true

require 'progressbar'
require 'ostruct'

module Jekyll
  module Algolia
    # Module to push records to Algolia and configure the index
    module ProgressBar
      include Jekyll::Algolia

      def self.should_be_silenced?
        Configurator.verbose?
      end

      def self.create(options)
        if should_be_silenced?
          fake_bar = OpenStruct.new
          fake_bar.increment = nil
          return fake_bar
        end

        ::ProgressBar.create(options)
      end
    end
  end
end
