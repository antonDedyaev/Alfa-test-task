install:
	npm ci

start:
	npm start

build:
	npm run build

serve:
	serve -s build

lint:
	npx eslint .