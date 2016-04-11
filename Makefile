install:
	$(shell npm bin)/typings install -so
compile:
	$(shell npm bin)/typings install -so
	$(shell npm bin)/tsc
test:
	$(shell npm bin)/typings install -so
.DEFAULT: install compile
.PHONY: install compile test
