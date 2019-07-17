verbal_expressions
=====================
[![Build Status](https://travis-ci.org/ryan-endacott/verbal_expressions.png)](https://travis-ci.org/ryan-endacott/verbal_expressions)
[![Gem Version](https://badge.fury.io/rb/verbal_expressions.png)](http://badge.fury.io/rb/verbal_expressions)
## Ruby Regular Expressions made easy
VerbalExpressions is a Ruby library that helps to construct difficult regular expressions - ported from the awesome JavaScript [VerbalExpressions](https://github.com/jehna/VerbalExpressions).

## How to get started

Just install with `gem install verbal_expressions`, then require the library and you're good to go!
```ruby
require 'verbal_expressions'
```

## Examples

Here's a couple of simple examples to give an idea of how VerbalExpressions works:

### Testing if we have a valid URL

```ruby
# Create an example of how to test for correctly formed URLs
tester = VerEx.new do
  start_of_line
  find 'http'
  maybe 's'
  find '://'
  maybe 'www.'
  anything_but ' '
  end_of_line
end

# Create an example URL
test_url = "https://www.google.com"

# Use it just like a regular Ruby regex:
puts 'Hooray!  It works!' if tester.match(test_url)
puts 'This works too!' if tester =~ test_url

# Print the generated regex:
puts tester.source # => /^(http)(s)?(\:\/\/)(www\.)?([^\ ]*)$/
```

### Replacing strings

```ruby
# Create a test string
replace_me = "Replace bird with a duck"

# Create an expression that seeks for word "bird"
expression = VerEx.new { find 'bird' }

# Execute the expression like a normal Regexp object
result = replace_me.gsub( expression, "duck" );

puts result # Outputs "Replace duck with a duck"
```

### Regex Capturing

```ruby
# Grab the number of goals

tester = VerEx.new do
  find 'scored '
  begin_capture 'goals' # Can be named or unnamed
  word
  end_capture
end

match = tester.match('Jerry scored 5 goals!')
puts match['goals'] # => 5

# Alternative capture syntax

tester = VerEx.new do
  find 'scored '
  capture('goals') { word }
end
```

## API documentation

I haven't added much documentation to this repo yet, but you can find the documentation for the original JavaScript repo on their [wiki](https://github.com/jehna/VerbalExpressions/wiki).  Most of the methods have been ported as of v0.1.0 of the JavaScript repo.  Just be sure to use the syntax explained above rather than the dot notation :)

## Contributions
Clone the repo and fork!
Pull requests are warmly welcomed!

## Issues
 - I haven't yet ported the modifier code because Ruby Regexp handles modifiers a little differently.
 - Because `or` is reserved in Ruby, `or` is currently aliased to `alternatively`.  Unfortunately, `then` is also reserved, so you must use `find` instead.  I'm very open to better name ideas :)

## Thanks!
Thank you to @jehna for coming up with the awesome original idea!



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ryan-endacott/verbal_expressions/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

