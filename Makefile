RUSTKYLL_VERSION ?= v0.4.6
RUSTKYLL_ASSET ?= rustkyll-linux-amd64
RUSTKYLL_INSTALL_DIR ?= .bin
RUSTKYLL ?= $(RUSTKYLL_INSTALL_DIR)/rustkyll

.PHONY: help install serve build clean graph

help: ## Show this help message
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

install: ## Install the rustkyll binary into .bin
	mkdir -p $(RUSTKYLL_INSTALL_DIR)
	curl -fsSL -o $(RUSTKYLL) https://github.com/alexeygrigorev/rustkyll/releases/download/$(RUSTKYLL_VERSION)/$(RUSTKYLL_ASSET)
	chmod +x $(RUSTKYLL)

serve: ## Start the development server (http://localhost:4000)
	$(RUSTKYLL) serve --no-watch

build: ## Build the site for production
	$(RUSTKYLL) build

graph: ## Re-render the contribution calendar from _data/gh-history.json
	python3 scripts/gen-contrib-graph.py

clean: ## Remove generated site and caches
	rm -rf _site .rustkyll-manifest.json
