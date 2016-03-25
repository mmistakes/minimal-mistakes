---
layout: post
title: "Puppet Master-Agent Installation on FreeBSD"
date: 2014-08-25 07:00:00
categories: sysadmin
---

[Puppet](http://puppetlabs.com/) is a software which can automate configuration and management of machines and software running on them. This tool has great benefits for system administrator because it helps sysadmin to be the dream of every sysadmin, **a lazy sysadmin**. Puppet has great support for many operating system. Unfortunately its installation on my favourite OS, FreeBSD, is not so smooth. An introduction of Puppet installation which I found in BSD Magazine January 2012 edition is a starting point but I have to make some modification due to some of deprecated configurations. So, here I want to show you how to install and configure the basic of Puppet in FreeBSD in its master-agent scenario.
##Let's start...
###Puppet benefits:
1. automated server installation
2. mass deployment of changes to servers
3. maintain server state consistency

###Puppet scenario:
0. FreeBSD (master)
1. FreeBSD (agent)

###FreeBSD initial:
update ports

    # portsnap fetch extract
    # portsnap fetch update

install portmaster via ports

	# cd /usr/ports/ports-mgmt/portmaster
    # make install clean
    # rehash
    
switch to pkgng

	# portmaster -dB ports-mgmt/pkg

convert package database to new pkgng format

	# pkg2ng
use pkgng by default

	# echo 'WITH_PKGNG=yes' >> /etc/make.conf

define new repository for pkgng

	# mkdir -p /usr/local/etc/pkg/repos
	# cat << 'EOF' > /usr/local/etc/pkg/repos/FreeBSD.conf
		FreeBSD: {
	    	url: "http://pkg.FreeBSD.orf/${ABI}/latest",
	        mirror_type: "srv",
		    enabled: true
	    }
		EOF
	# pkg update

test pkgng

	# pkg install sl
    # sl

---
###Puppet master initial:
**IMPORTANT**: Puppet requires FQDN hostname
install from ports

	# cd /usr/ports/sysutils/puppet
    # make install clean

generate puppet configuration file

	# puppet master --genconfig > /usr/local/etc/puppet/puppet.conf

copy auth.conf-dist to auth.conf

    # cp /usr/local/etc/puppet/auth.conf-dist /usr/local/etc/puppet/auth.conf

some "red" warnings when run `puppet help`

    Warning: Setting manifestdir is deprecated. See http://links.puppetlabs.com/env-settings-deprecations
       (at /usr/local/lib/ruby/site_ruby/1.9/puppet/settings.rb:1095:in `block in issue_deprecations')
    Warning: Setting manifest is deprecated in puppet.conf. See http://links.puppetlabs.com/env-settings-deprecations
       (at /usr/local/lib/ruby/site_ruby/1.9/puppet/settings.rb:1095:in `block in issue_deprecations')
    Warning: Setting modulepath is deprecated in puppet.conf. See http://links.puppetlabs.com/env-settings-deprecations
       (at /usr/local/lib/ruby/site_ruby/1.9/puppet/settings.rb:1095:in `block in issue_deprecations')
    Warning: Setting templatedir is deprecated. See http://links.puppetlabs.com/env-settings-deprecations
       (at /usr/local/lib/ruby/site_ruby/1.9/puppet/settings.rb:1095:in `block in issue_deprecations')
       
skeleton files creation

	# mkdir -p /usr/local/etc/puppet/files
    # mkdir -p /usr/local/etc/puppet/manifests
    # touch /usr/local/etc/puppet/fileserver.conf
    # touch /usr/local/etc/puppet/files/sudoers
    # touch /usr/local/etc/puppet/manifests/site.pp
    # touch /usr/local/etc/puppet/environments/production/environment.conf
    # touch /usr/local/etc/puppet/environments/production/manifests/site.pp
    
edit **puppet.conf**

    [main]
        environmentpath = /usr/local/etc/puppet/environments
    [master]    
        #manifestdir = /usr/local/etc/puppet/manifests
        #manifest = /usr/local/etc/puppet/manifests/site.pp
        #modulepath = /usr/local/etc/puppet/modules:/usr/share/puppet/modules
        #templatedir = /var/puppet/templates
        pluginsource = puppet://puppetmaster.domain/plugins
        pluginfactsource = puppet://puppetmaster.domain/pluginfacts
        
edit **fileserver.conf**

    [files]
        path /usr/local/etc/puppet/files
        allow *.domain
        
edit **environments/production/environment.conf**

    modulepath = /usr/local/etc/puppet/modules:/usr/share/puppet/modules
    manifest = /usr/local/etc/puppet/environments/production/manifests/site.pp
    ### EXPERIMENTAL ###
    #config_version = get_environment_commit.sh
    #environment_timeout = 5s
    
edit **environments/production/manifests/site.pp**

	class sudoers {
            file { "/usr/local/etc/sudoers":
                    ensure  => file,
                    owner   => root,
                    group   => wheel,
                    mode    => 440,
                    source  => "puppet://puppetmaster.domain/files/sudoers",
            }
    }

	node 'puppetclient.domain' {
            include sudoers
    }
    
start puppet master

	# echo 'puppetmaster_enable="YES"' >> /etc/rc.conf
    # /usr/local/etc/rc.d/puppetmaster start
    
sign the certificate when agent initiate a certificate signing session
	
    # puppet cert --list --all
    # puppet cert --sign puppetagent.domain

edit **files/sudoers**

	root	ALL=(ALL)	ALL

update puppet agents using `kick`

	# puppet kick puppetagent.domain

---
###Puppet agent initial:
**IMPORTANT**: Puppet requires FQDN hostname
install from ports
	
    # cd /usr/ports/sysutils/puppet
    # make install clean
    
configure hostname

	# hostname puppetagent.domain

create and edit new **auth.conf**

	path /run
    method save
    allow puppetmaster.domain
    
initiate a certificate signing session from agent to master and wait to be signed and automatically closed

	# puppet agent -v --server puppetmaster.domain --waitforcert 60 --test
    
enable puppet agent on **rc.conf**

	# echo 'puppet_enable="YES"' >> /etc/rc.conf
    # echo 'puppet_flags="-v --listen --server puppetmaster.domain"' >> /etc/rc.conf

start puppet agent

	# /usr/local/etc/rc.d/puppet start

inspect **/usr/local/etc/sudoers** after puppet master kicked some changes

	# less /usr/local/etc/sudoers

---
###Puppet problems:
cannot connect to https://forge.puppetlabs.com

    security/ca_root_nss port needed to be installed with ETCSYMLINK turned on

puppet kick and --listen flag is deprecated
	
    still can't find good configuration for using sysutils/mcollective-puppet-agent as alternative

---
References:
http://www.iceflatline.com/2013/02/how-to-use-portmaster-to-update-ports/
http://www.fitzdsl.net/2013/11/utiliser-pkgng-sous-freebsd-avec-puppet/
https://mebsd.com/make-build-your-freebsd-word/pkgng-first-look-at-freebsds-new-package-manager.html
https://forums.freebsd.org/viewtopic.php?&t=36732
http://www.6tech.org/2013/01/how-to-install-puppet-open-source-on-centos-6-3/
https://github.com/puppetlabs-operations/puppet-freebsd
