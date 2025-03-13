import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";

import {
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ListToolsRequestSchema,
    ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {setupHandlers} from "./pethandler.js";

// Create the cookgpt server
const server = new Server(
    {
        name: "petstoreserver",
        version: "1.0.0",
    },
    {
        capabilities: {
            resources: {},
        },
    }
);





setupHandlers(server);

const transport = new StdioServerTransport();
await server.connect(transport);