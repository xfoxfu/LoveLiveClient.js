install:
	node_modules/.bin/typings install -so
compile:
	node_modules/.bin/tsc
test:
	node_modules/.bin/mocha
.DEFAULT: install compile
.PHONY: install compile test
