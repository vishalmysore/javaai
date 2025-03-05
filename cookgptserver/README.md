# cookgptserver MCP Server

A Model Context Protocol server

This is a TypeScript-based MCP server that implements a simple recipe suggestion system. It demonstrates core MCP concepts by providing:

- Resources representing ingredient information with URIs and metadata
- Tools for checking recipe healthiness and suggesting substitutes
- Prompts for generating recipes

## Features

### Resources
- Access ingredient information via `ingredient-info://` URIs
- Each ingredient has details about calories, nutrients, and cooking tips
- Plain text mime type for simple content access

### Tools
- `isThisHealthy` - Check if a recipe is healthy
  - Takes a recipe as a required parameter
  - Provides health suggestions based on ingredients like paneer and vegetables
- `suggest-substitutes` - Suggest substitutes for ingredients
  - Takes an ingredient as a required parameter
  - Provides alternative ingredients

### Prompts
- `generate-recipe` - Generate a recipe
  - Takes a recipe as a required parameter
  - Returns a structured prompt for recipe generation

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "cookgptserver": {
      "command": "/path/to/cookgptserver/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
