#--------------------------------------------------
# dependency.rb
#
# Implements a data structure and algorithm for
# sorting a collection of dependencies, via
# topological sort.
#--------------------------------------------------

class Dependency

  def initialize
    @depends = {}
  end

  # Add a label with its dependencies
  # If the label already exists, appends the
  # newly given dependencies to the existing
  # dependencies.
  def add(label, depends = [])
    subj = label.to_sym
    depends = depends.map {|d| d.to_sym}
    if @depends.has_key?(subj) then
      @depends[subj] = @depends[subj] + depends
    else
      @depends[subj] = depends
    end
  end

  # Determines if all labels have dependencies
  # that all exist in the dependency tree.
  def verify
    @depends.keys.each do |k|
      @depends[k].each do |e|
        unless @depends.has_key?(e) then
          raise "bad dependencies: '#{e}' referred by '#{k}'"
        end
      end
    end
  end

  # Sort the labels based on topological ordering;
  # all dependencies first. Returns array of labels
  # topological sorted order.
  def resolve
    resolved = []
    keys = @depends.keys
    self.verify
    until keys.empty? do
      count = keys.count
      keys.delete_if do |k|
        r = @depends[k].all? {|n| resolved.include?(n)}
        resolved.push(k) if r
        next r
      end
      if count == keys.count then
        raise "unable to resolve dependencies: #{keys}"
      end
    end
    return resolved
  end

end # Dependency
