begin
  require 'wdm_ext'
rescue LoadError
  raise LoadError.new(<<-EOS)
    Can't load WDM!
    
    WDM is not supported on your system. For a cross-platform alternative,
    we recommend using Listen: http://github.com/guard/listen
  EOS
end