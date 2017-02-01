require 'psych'
require 'rspec'

BASE_PATH = File.join(File.dirname(__FILE__), "..")

class Posts
  def files
    Dir.glob(File.join(BASE_PATH, "_posts", "*"))
  end

  def posts
    @posts ||= [].tap do |p|
      files.each do |path|
         p << Post.new(path)
      end
    end
  end

  def valid?
    posts.all?(&:valid?)
  end

  class Post
    attr_accessor :path, :front_matter
    def initialize(path)
      @path = path
      @front_matter = load
      raise "Invalid post: #{File.basename(path)}" unless valid?
    end

    def load
      Psych.safe_load(File.open(path))
    end

    def valid?
      front_matter.has_key?('disqus_id')
    end
  end
end

describe Posts do
  let(:posts){Posts.new}

  describe 'base_path' do
    it 'should be a directory' do
      expect(File.directory?(BASE_PATH)).to eq(true)
    end
    it 'should contain _config.yml' do
      expect(Dir.entries(BASE_PATH)).to include('_config.yml')
    end
  end

  describe 'files' do
    it 'should contain markdown files' do
      expect(posts.files.all?{ |file| /\.md$/.match(file) }).to eq(true)
    end
    it 'should contain dates in names' do
      expect{ posts.files.all?{ |file| Date.parse(file) } }.to_not raise_error
    end
  end

  describe 'valid?' do
    it 'should be valid' do
      expect(posts.valid?).to eq(true)
    end
  end

end
