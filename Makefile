TARGET_USERNAME = bob
TARGET_GROUPNAME = bob
HOMEDIR = /home/$(TARGET_USERNAME)
UID = $(shell id -u)
GID = $(shell id -g)

ADD_USER_GROUP_COMMAND = \
    groupadd -f -g $(GID) $(TARGET_GROUPNAME) && \
    useradd -u $(UID) -g $(TARGET_GROUPNAME) $(TARGET_USERNAME) && \
    mkdir -p $(HOMEDIR) &&

AUTHORIZE_TARGET_USER_COMMAND = chown -R $(TARGET_USERNAME):$(TARGET_GROUPNAME) $(HOMEDIR) &&
START_AS = sudo -E -u $(TARGET_USERNAME) HOME=$(HOMEDIR)

CUSTOM_CMD = $(ADD_USER_GROUP_COMMAND) $(AUTHORIZE_TARGET_USER_COMMAND) $(START_AS)

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := build install update stop state bash jkbuild bundle remove jkserve
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
  # use the rest as arguments for the command
  COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  COMMAND_ARGS := $(subst :,\:,$(COMMAND_ARGS))
  # ...and turn them into do-nothing targets
  $(eval $(COMMAND_ARGS):;@:)
endif

step=--------------------------------
project=Blog YPEREIRAREIS
projectCompose=blog-ypereirareis
compose = docker-compose -p $(projectCompose)

all: help
help:
	@echo "Jekyll Management Makefile"

build: remove
	@echo "$(step) Building images docker $(step)"
	@$(compose) build  $(COMMAND_ARGS)

install: remove build jkbuild jkserve

bundle:
	@echo "$(step) Bundler $(step)"
	@$(compose) run --rm web bash -ci '\
                $(CUSTOM_CMD) bundle install --path vendor/bundle && \
                    $(START_AS) bundle check && \
                    $(START_AS) bundle update'

jkbuild:
	@echo "$(step) Jekyll build $(step)"
	@$(compose) run --rm web bash -ci '\
		$(CUSTOM_CMD) bundle exec jekyll build $(COMMAND_ARGS)'

jkserve:
	@echo "$(step) Jekyll Serve $(step)"
	@$(compose) up -d web

start: jkbuild jkserve
	@echo "$(step) Jekyll UP $(step)"
	@$(compose) up -d web

stop:
	@echo "$(step) Stopping $(project) $(step)"
	@$(compose) stop

state:
	@echo "$(step) Etat $(project) $(step)"
	@$(compose) ps

remove: stop
	@echo "$(step) Remove $(project) $(step)"
	@$(compose) rm --force

bash:
	@echo "$(step) Bash $(project) $(step)"
	@$(compose) run --rm web bash

nginx-proxy:
	@echo "Removing NGINX REVERSE PROXY"
	@$(shell docker rm -f reverseproxy > /dev/null 2> /dev/null || true)
	@echo "Starting NGINX REVERSE PROXY"
	@$(shell docker run -d --name reverseproxy -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock jwilder/nginx-proxy > /dev/null 2> /dev/null || true)
