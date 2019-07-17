require File.expand_path(File.dirname(__FILE__) + '/spec_helper')

describe VerEx do

  describe '#capture' do

    describe 'by name' do

      let(:matcher) do
        VerEx.new do
          find 'scored '
          begin_capture 'goals'
          word
          end_capture
        end
      end

      it 'Successfully captures goals by name' do
        matcher.match('Jerry scored 5 goals!')['goals'].should == '5'
      end

      context 'with a block' do

        let(:matcher) do
          VerEx.new do
            find 'scored '
            capture('goals') { word }
          end
        end

        it 'Successfully captures player by index' do
          matcher.match('Jerry scored 5 goals!')['goals'].should == '5'
        end
      end

    end

    describe 'without name' do

      let(:matcher) do
        VerEx.new do
          start_of_line
          begin_capture
          word
          end_capture
        end
      end

      it 'Successfully captures player by index' do
        matcher.match('Jerry scored 5 goals!')[1].should == 'Jerry'
      end

      context 'with a block' do
        let(:matcher) do
          VerEx.new do
            start_of_line
            capture { word }
          end
        end

        it 'Successfully captures player by index' do
          matcher.match('Jerry scored 5 goals!')[1].should == 'Jerry'
        end
      end
    end

  end

  describe '#find' do

    let(:matcher) do
      VerEx.new do
        find 'lions'
      end
    end

    it 'should correctly build find regex' do
      matcher.source.should == '(?:lions)'
    end

    it 'should correctly match find' do
      matcher.match('lions').should be_true
    end

    it 'should match part of a string with find' do
      matcher.match('lions, tigers, and bears, oh my!').should be_true
    end

    it 'should only match the `find` part of a string' do
      matcher.match('lions, tigers, and bears, oh my!')[0].should == 'lions'
    end
  end

  describe '#alternatively' do

    describe 'matches a link' do

      let(:matcher) do
        VerEx.new do
          find 'http://'
          alternatively
          find 'ftp://'
        end
      end

      it 'matches ftp://' do
        matcher.match('ftp://ftp.google.com/').should be_true
      end

      it 'matches http://' do
        matcher.match('http://www.google.com').should be_true
      end
    end
  end

  describe '#anything' do

    let(:matcher) do
      VerEx.new do
        anything
      end
    end

    it 'matches anything' do
      matcher.match('The quick brown fox jumps over the lazy dog.').should be_true
    end
  end

  describe '#any_of' do

    let(:matcher) do
      VerEx.new do
        any_of 'aeiou'
      end
    end

    it 'finds a vowel' do
      matcher.match('fox').should be_true
    end
  end

  describe '#multiple' do

    it 'matches 1111' do
      matcher = VerEx.new do
        multiple '1'
      end

      matcher.match('111111111').should be_true
    end

    it 'matches multiple +s' do
      matcher = VerEx.new do
        multiple '+'
      end

      matcher.match('++++').should be_true
    end

    it 'captures multiple successfully' do
      matcher = VerEx.new do
        capture('mult') { multiple '+' }
      end

      matcher.match('+++++')['mult'].should == '+++++'
    end
  end

  describe '#line_break' do

    let(:multiline) do
      %Q{
        I'm a multiline
        string.
      }
    end

    it 'fails without line break' do
      matcher = VerEx.new do
        line_break
      end

      matcher.match('hello world').should be_false
    end

    it 'works as line_break' do
      matcher = VerEx.new do
        line_break
      end

      matcher.match(multiline).should be_true
    end

    it 'works as br' do
      matcher = VerEx.new do
        br
      end

      matcher.match(multiline).should be_true
    end
  end

  describe '#range' do

    it 'works with a range of numbers' do
      matcher = VerEx.new do
        range '0', '9'
      end

      matcher.match('5').should be_true
    end

    it 'works with a range of letters' do
      matcher = VerEx.new do
        range 'A', 'Z'
      end

      matcher.match('Q').should be_true
    end
  end

  describe '#one_or_more' do
    it 'works with one word' do
	  matcher = VerEx.new do
		  one_or_more{ word }
	  end

	  matcher.match('hello').should be_true
	end

    it 'works with multiple words separated with whitespace' do
	  matcher = VerEx.new do
		  one_or_more{ 
			  word 
			  zero_or_more{ whitespace }
		  }
	  end

	  matcher.match('this is sparta')[0].should == "this is sparta"
	end

    it 'works with multiple words separated with whitespace' do
	  matcher = VerEx.new do
		  one_or_more{ 
			  word 
			  zero_or_more{ whitespace }
		  }
	  end

	  matcher.match('111 333 777')[0].should == "111 333 777"
	end
  end

  describe '#zero_or_more' do
	it 'works with zero things' do
	  matcher = VerEx.new do
		  zero_or_more{ 
			  word 
		  }
	  end
	  matcher.match('<><>').should be_true 
	end

	it 'works with multiple things' do
	  matcher = VerEx.new do
		  zero_or_more{ 
			  word 
			  zero_or_more{ whitespace }
		  }
	  end
	  matcher.match('eye of the tiger')[0].should == "eye of the tiger" 
	end
  end
  
  describe '#letter' do

    it 'works with a single alphanumeric' do
      matcher = VerEx.new do
        start_of_line
        letter
        end_of_line
      end
      matcher.match('a').should be_true
      matcher.match('A').should be_true
      matcher.match('0').should be_true
      matcher.match('_').should be_true
    end
    
    it 'fails with a non-alphanumeric' do
      matcher = VerEx.new do
        start_of_line
        letter
        end_of_line
      end
      matcher.match('!').should be_false
      matcher.match('/').should be_false
      matcher.match('(').should be_false
    end
    
    it 'fails with multiple alphanumerics' do
      matcher = VerEx.new do
        start_of_line
        letter
        end_of_line
      end
      matcher.match('abc').should be_false
    end
  end
  
    describe '#word' do

    it 'works with a single alphanumeric' do
      matcher = VerEx.new do
        start_of_line
        word
        end_of_line
      end
      matcher.match('a').should be_true
      matcher.match('A').should be_true
      matcher.match('0').should be_true
      matcher.match('_').should be_true
    end
    
    it 'fails with a non-alphanumeric' do
      matcher = VerEx.new do
        start_of_line
        word
        end_of_line
      end
      matcher.match('!').should be_false
      matcher.match('/').should be_false
      matcher.match('(').should be_false
    end
    
    it 'works with multiple alphanumerics' do
      matcher = VerEx.new do
        start_of_line
        word
        end_of_line
      end
      matcher.match('abc').should be_true
    end
  end

  describe 'URL Regex Test' do

    let(:matcher) do
      VerEx.new do
        start_of_line
        find 'http'
        maybe 's'
        find '://'
        maybe 'www.'
        anything_but ' '
        end_of_line
      end
    end

    it 'successfully builds regex for matching URLs' do
      matcher.source.should == '^(?:http)(?:s)?(?:://)(?:www\\.)?(?:[^\\ ]*)$'
    end

    it 'matches regular http URL' do
      matcher.match('http://google.com').should be_true
    end

    it 'matches https URL' do
      matcher.match('https://google.com').should be_true
    end

    it 'matches a URL with www' do
      matcher.match('https://www.google.com').should be_true
    end

    it 'fails to match when URL has a space' do
      matcher.match('http://goo gle.com').should be_false
    end

    it 'fails to match with htp:// is malformed' do
      matcher.match('htp://google.com').should be_false
    end
  end
end
