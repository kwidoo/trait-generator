#!Make
include .env
export $(shell sed 's/=.*//' .env)

add:
	docker exec -it trait /bin/sh -c "cd /app && ${PACKET_MANAGER} $(MAKECMDGOALS)"

build:
	docker exec -it trait /bin/sh -c "cd /app && yarn build"
