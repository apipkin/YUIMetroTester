# -- Constants -----------------------------------------------------------------

# Path to the "lib" directory of a Handlebars.js git checkout.
HANDLEBARS_LIB = $(PWD)/../../../handlebars.js/lib

# Path to which YUI Handlebars source files should be written.
OUTPUT_DIR = $(PWD)/js

# Comment to prepend to the imported source files.
PREPEND_COMMENT = /* THIS FILE IS GENERATED BY A BUILD SCRIPT - DO NOT EDIT! */\n

# Files that make up the handlebars-base module.
BASE_FILES = \
	$(HANDLEBARS_LIB)/handlebars/base.js \
	$(HANDLEBARS_LIB)/handlebars/utils.js \
	$(HANDLEBARS_LIB)/handlebars/runtime.js

# Files that make up the handlebars-compiler module.
COMPILER_FILES = \
	$(HANDLEBARS_LIB)/handlebars/compiler/parser.js \
	$(HANDLEBARS_LIB)/handlebars/compiler/base.js \
	$(HANDLEBARS_LIB)/handlebars/compiler/ast.js \
	$(HANDLEBARS_LIB)/handlebars/compiler/compiler.js

# -- Targets -------------------------------------------------------------------

BASE_TARGETS = $(addprefix $(OUTPUT_DIR)/handlebars-, $(notdir $(BASE_FILES)))
COMPILER_TARGETS = $(addprefix $(OUTPUT_DIR)/handlebars-compiler-, $(notdir $(COMPILER_FILES)))

# target: all - Default target.
all: import

# target: clean - Removes imported source files.
clean:
	rm -f $(BASE_TARGETS) $(COMPILER_TARGETS)

# target: import - Imports Handlebars.js source files from a separate repo.
import: import-base import-compiler

# target: import-base - Imports the source files that make up handlebars-base.
import-base: $(BASE_TARGETS)

# target: import-compiler - Imports the source files that make up handlebars-compiler.
import-compiler: $(COMPILER_TARGETS)

# target: help - Displays help.
help:
	@egrep "^# target:" Makefile

$(OUTPUT_DIR)/handlebars-%.js: $(HANDLEBARS_LIB)/handlebars/%.js
	@echo "$(notdir $@)"
	@echo "$(PREPEND_COMMENT)" > $@
	@sed -n '/^\/\/ BEGIN(BROWSER)$$/,/^\/\/ END(BROWSER)$$/p' $< >> $@

$(OUTPUT_DIR)/handlebars-compiler-%.js: $(HANDLEBARS_LIB)/handlebars/compiler/%.js
	@echo "$(notdir $@)"
	@echo "$(PREPEND_COMMENT)" > $@
	@sed -n '/^\/\/ BEGIN(BROWSER)$$/,/^\/\/ END(BROWSER)$$/p' $< >> $@
