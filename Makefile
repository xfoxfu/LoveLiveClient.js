install:
	$(shell npm bin)/typings install -so
compile:
	$(shell npm bin)/typings install -so
test:
	$(shell npm bin)/typings install -so
.DEFAULT: install compile
.PHONY: install compile test
