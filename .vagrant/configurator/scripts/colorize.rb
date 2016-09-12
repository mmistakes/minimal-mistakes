#--------------------------------------------------
# colorize.rb
#
# Colorization of output strings in the terminal.
#
# http://stackoverflow.com/a/11482430
# http://stackoverflow.com/a/16363159
#--------------------------------------------------

class String
  def colorize(color_code)
    "\e[#{color_code}m#{self}\e[0m"
  end

  def black;          colorize(30) end
  def red;            colorize(31) end
  def green;          colorize(32) end
  def brown;          colorize(33) end
  def blue;           colorize(34) end
  def magenta;        colorize(35) end
  def cyan;           colorize(36) end
  def gray;           colorize(37) end

  def bg_black;       colorize(40) end
  def bg_red;         colorize(41) end
  def bg_green;       colorize(42) end
  def bg_brown;       colorize(43) end
  def bg_blue;        colorize(44) end
  def bg_magenta;     colorize(45) end
  def bg_cyan;        colorize(46) end
  def bg_gray;        colorize(47) end

  def bold;           colorize(1) end
  def italic;         colorize(3) end
  def underline;      colorize(4) end
  def blink;          colorize(5) end
  def reverse_color;  colorize(7) end
end
