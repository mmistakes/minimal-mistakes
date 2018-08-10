APP_SERVICE_NAME="jekyll_taherbs"

.PHONY: build
build:
	docker-compose -f docker-compose.yml build -d

.PHONY: start
start:
	docker-compose -f docker-compose.yml up

.PHONY: stop
stop:
	docker-compose -f docker-compose.yml down

.PHONY: log
log:
	docker logs $(APP_SERVICE_NAME)

.PHONY: refresh
refresh:
	docker exec -u 0 -it $(APP_SERVICE_NAME) jekyll build
		
.PHONY: ssh
ssh:
	docker exec -u 0 -it $(APP_SERVICE_NAME) sh