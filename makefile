COMPOSE_FILE_PATH := -f docker/docker-compose.yml

build:
	@docker-compose $(COMPOSE_FILE_PATH) build --no-cache

start:
	@docker-compose $(COMPOSE_FILE_PATH) up -d
	@make -s logs

stop:
	@docker-compose $(COMPOSE_FILE_PATH) stop

clean:
	@docker-compose $(COMPOSE_FILE_PATH) down

logs:
	@docker-compose $(COMPOSE_FILE_PATH) logs -f api
