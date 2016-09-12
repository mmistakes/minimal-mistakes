#--------------------------------------------------
# deep_merge.rb
#
# Extends the Hash class with deep_merge function.
# Merges the hash with the given other hash's fields
# and values. Returns merged hash with other's
# properties, fields and values.
#--------------------------------------------------

class Hash
  def deep_merge(other)
    Marshal.load(Marshal.dump(self.merge(other) do |key, oldval, newval|
      if oldval.is_a? Hash then
        oldval.deep_merge(newval)
      elsif oldval.is_a? Array then
        oldval + newval
      else
        newval
      end
    end))
  end
end # Hash
