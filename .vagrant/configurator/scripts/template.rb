#--------------------------------------------------
# template.rb
#--------------------------------------------------

require "erb"

class ERBContext
  def initialize(hash)
    hash.each_pair do |key, value|
      instance_variable_set('@' + key.to_s, value)
    end
  end

  def get_binding
    binding
  end
end

class String
  def template(assigns = {})
    ERB.new(self).result(ERBContext.new(assigns).get_binding)
  end
end
