install:
	typings install -so
compile:
	typings install -so
	tsc
test:
	typings install -so
.DEFAULT: install compile
.PHONY: install compile test
