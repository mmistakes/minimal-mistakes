require 'mkmf'
require 'rbconfig'

def generate_makefile
  create_makefile("wdm_ext")
end

def generate_dummy_makefile
  File.open("Makefile", "w") do |f|
    f.puts dummy_makefile('wdm_ext').join
  end
end

def windows?
  RbConfig::CONFIG['host_os'] =~ /mswin|mingw|cygwin/
end

if windows? and
   have_library("kernel32") and
   have_header("windows.h") and
   have_header("ruby.h")    and
   have_const('HAVE_RUBY_ENCODING_H')
then
   have_func('rb_thread_call_without_gvl')
   generate_makefile()
else
  generate_dummy_makefile() 
end
