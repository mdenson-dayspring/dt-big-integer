# Simple makefile to run tests.

test:
	./node_modules/.bin/mocha --reporter spec

.PHONY: test
