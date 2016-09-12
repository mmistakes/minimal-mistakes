#--------------------------------------------------
# machine.rb
#
# Represents each virtual machine and the
# associated machine configurations and the
# virtual machine provisioner settings.
#--------------------------------------------------
require_relative "shared.rb"

class Machine

  ## Class methods

  # Recursively, convert hash keys from string keys
  # to symbol keys. Returns the newly transformed
  # object.
  def Machine.key_to_sym(value)
    if value.is_a?(Array) then
      value.map {|v| Machine.key_to_sym(v)}
    elsif value.is_a?(Hash) then
      value.inject({}) {|memo, (k, v)| memo[k.to_sym] = Machine.key_to_sym(v); memo}
    else
      value
    end
  end

  # Resolves each include with its included properties and fields
  # from its includes with its derived values.
  def Machine.resolve_includes(includes)
    dependency = Dependency.new
    includes.each do |n, m|
      dependency.add(n, if m.has_key?(:includes) then m[:includes] else [] end)
    end
    dependency.resolve.each do |m|
      inc = includes[m]
      if inc.has_key?(:includes) then
        b = {}
        b[:merged] = []
        dependency.resolve.reverse.each do |n|
          next unless inc[:includes].include?(n.to_s)
          next if n == m or b[:merged].include?(n)
          i = includes[n]
          b = b.deep_merge(i)
          b[:merged].push(n)
        end
        b = b.deep_merge(includes[m])
        b.delete(:includes)
        includes[m] = b
      end
    end
    return includes
  end

  # Resolves each machine with its inherited properties and fields
  # from its inherited machines with its derived values.
  def Machine.resolve_dependency(machines, includes)
    mach_dep = Dependency.new
    incl_dep = Dependency.new
    machines.each {|n, m| mach_dep.add(n, if m.has_key?(:inherit) then [m[:inherit]] else [] end)}
    includes.each {|n, m| incl_dep.add(n, if m.has_key?(:includes) then m[:includes] else [] end)}
    mach_dep.resolve.each do |m|
      mach = machines[m]
      b = if mach.has_key?(:inherit) then machines[mach[:inherit].to_sym] else {} end
      if mach.has_key?(:includes) then
        incl_dep.resolve.reverse.each do |n|
          next unless mach[:includes].include?(n.to_s)
          next if b.has_key?(:merged) and b[:merged].include?(n)
          b = b.deep_merge(includes[n])
        end
        mach.delete(:includes)
      end
      machines[m] = b.deep_merge(mach)
    end
    return machines
  end

  # Creates the machine objects with the given settings
  # Returns an array of machine objects.
  def Machine.create_machines(settings)
    machines = []
    settings = Machine.key_to_sym(settings)
    unless settings.nil? then
      settings[:machines].each {|n, m| m[:name] = n.to_s}
      settings[:machines].each {|n, m| m[:abstract] = false unless m.has_key?(:abstract)}
      settings[:mixins] = Machine.resolve_includes(settings[:mixins])
      Machine.resolve_dependency(settings[:machines], settings[:mixins]).each do |name, machine|
        next if machine[:abstract] # abstract machine, skip
        machine[:primary] = machine[:name] == settings[:primary]
        machine[:autostart] = (not settings.has_key?(:autostart) or settings[:autostart]) unless machine.has_key?(:autostart)
        machines.push(Machine.new(machine, settings))
      end
    end
    return machines
  end

  # Configures the machines with the given settings
  # Vagrant configuration object.
  def Machine.configure(config, settings)
    Machine.create_machines(settings).each {|m| m.config_vm(config)}
  end

  ## Instance methods

  attr_accessor :name
  attr_accessor :machine
  attr_accessor :settings

  # Constructs a new Machine instance with the
  # given machine data and provisioning settings.
  def initialize(machine, settings)
    @name     = "#{ENV['VAGRANT_PROJECT_NAME'] ||= settings[:project]}--#{machine[:name]}"
    @machine  = machine
    @settings = settings
  end

  # Configures a Vagrant machine with the given
  # Vagrant configuration object.
  def config_vm(config)
    config.vm.define @machine[:name], primary: @machine[:primary], autostart: @machine[:autostart] do |cnf|
      @config = cnf # For access within other methods.
      ['box', 'ssh', 'providers', 'network', 'synced_folders', 'provision'].each do |key|
        self.send("config_#{key}")
      end
    end
  end

  # Configures supported fields for base box
  # for which the machine will be based on and
  # inherit from.
  def config_box()
    [:box, :box_url, :box_version].each do |k|
      @config.vm.send("#{k.to_s}=", @machine[k]) if @machine.has_key?(k)
    end
  end

  # Configures the SSH properties for how
  # Vagrant will access your machine over SSH.
  def config_ssh()
    if @machine.has_key?(:ssh) then
      [:username, :password, :shell, :private_key_path, :insert_key].each do |k|
        @config.ssh.send("#{k.to_s}=", @machine[:ssh][k]) if @machine[:ssh].has_key?(k)
      end
    end
  end

  ## Provider Configurations

  # Configures the machine for each specified provider.
  # Current supported providers: virtualbox, vmware_fusion,
  # vmware_workstation and parallels.
  def config_providers()
    if @machine.has_key?(:providers) then
      @machine[:providers].each do |name, config|
        config[:name] ||= @name
        @config.vm.provider name do |vm|
          case name
            when :virtualbox then config_virtualbox(vm, config)
            when :vmware_fusion, :vmware_workstation then config_vmware(vm, config)
            when :parallels then config_parallels(vm, config)
            else raise "Unrecognized provider: #{name.to_s}"
          end
        end
      end
    end
  end

  # Configures the machine for the virtualbox provider.
  def config_virtualbox(vb, config)
    config.each do |key, value|
      case key
        when :name, :gui, :linked_clone, :cpus, :memory then vb.send("#{key.to_s}=", value)
        when :customize then value.each {|k, v| vb.customize(['modifyvm', :id, "--#{k.to_s}", v]) }
        when :vbmanage  then value.each {|v| vb.customize(v.map {|arg| if arg == ':id' then :id else arg end}) }
        else raise "Bad Virtualbox '#{key.to_s}' configuration."
      end
    end
  end

  # Configures the machine for the vmware provider.
  def config_vmware(vmware, config)
    config.each do |k, v|
      vmware.vmx[case k
        when :name   then 'displayName'
        when :memory then 'memsize'
        when :cpus   then 'numvcpus'
        when :ostype then 'guestOS'
        else k.to_s
      end] = (case k
        when k == :ostype then v.gsub(/_/, '-')
        else v
      end)
    end
  end

  # Configures the machine for the parallels provider.
  def config_parallels(para, config)
    config.each do |k, v|
      para.send("#{k.to_s}=", v)
    end
  end

  ## Network Configurations

  # Configures the various metworks the machine
  # should be able to connect to.
  def config_network()
    if @machine.has_key?(:networks) then
      @machine[:networks].each do |net|
        @config.vm.network net[:kind], (case net.delete(:kind)
          when 'forwarded_port'  then config_net_fwport(net)
          when 'private_network' then config_net_private(net)
          when 'public_network'  then config_net_public(net)
        end)
      end
    end
  end

  # Configures the port forwarding for the machine.
  def config_net_fwport(net)
    return net
  end

  # Configures the private network for the machine.
  def config_net_private(net)
    if net[:ip] == 'dynamic' then
      net.delete(:ip)
      net[:type] = 'dhcp'
    end
    return net
  end

  # Configures the public network for the machine.
  def config_net_public(net)
    net.delete(:ip) if net[:ip] == 'dynamic'
    return net
  end

  # Configures synced folders that enable Vagrant to sync a folder
  # on the host machine to the guest machine, allowing you to
  # continue working on your project's files on your host machine,
  # but use the resources in the guest machine to compile or run
  # your project.
  def config_synced_folders()
    if @machine.has_key?(:synced_folders) then
      @machine[:synced_folders].each do |sf|
        sfopts = {}
        [:id, :type, :create, :group, :owner, :mount_options].each do |key|
          sfopts[key] = sf[key] if sf.has_key?(key)
        end
        if sf.has_key?(:type) then
          case sf[:type]
            when 'rsync' then
              [:args, :auto, :exclude, :chown, :rsync_path, :verbose].each do |key|
                sfopts["rsync__#{key.to_s}".to_sym] = sf[key] if sf.has_key?(key)
              end
            else raise "Unrecognized synced folder type '#{sf[:type]}'."
          end
        end
        @config.vm.synced_folder sf[:host], sf[:guest], sfopts
      end
    end
  end

  # Configures and executes the specified provisioning
  # rules and routines that specialize the machine.
  # Current provisioner supported: file, shell
  def config_provision()
    if @machine.has_key?(:provisions) then
      @machine[:provisions].each do |config|
        kind = config.delete(:kind)
        config[:run] = 'once' unless config.has_key?(:run)
        case kind
          when 'shell' then # do nothing
          when 'file'  then
            next unless File.exists?(config[:source])
            if config.has_key?(:target) and not config.has_key?(:destination) then
              config[:destination] = config.delete(:target) + '/' + File.basename(config[:source])
            end
          else raise "Unrecognized provision '#{kind}'."
        end
        @config.vm.provision config[:name], type: kind, run: config[:run] do |p|
          case kind
            when 'file'  then config_provision_file(p, config)
            when 'shell' then config_provision_shell(p, config)
          end
        end
      end
    end
  end

  # Configures file provisioning with the given configs
  def config_provision_file(p, config)
    [:source, :destination].each do |key|
      p.send("#{key.to_s}=", config[key]) if config.has_key?(key)
    end
  end

  # Configures shell provisioning with the given configs
  def config_provision_shell(p, config)
    [:inline, :path, :privileged, :args, :env, :upload_path, :binary].each do |key|
      p.send("#{key.to_s}=", config[key]) if config.has_key?(key)
    end
  end

end # Machine
