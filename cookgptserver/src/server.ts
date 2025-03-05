import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";


// Create the cookgpt server
const server = new McpServer({
    name: "CookGptServer",
    version: "1.0.0"

});


server.tool("isThisHealthy",
    { recipe: z.string() },
    async ({ recipe }) => {
        // Check if the recipe contains 'paneer' or 'vegetable'
        if (recipe.toLowerCase().includes("paneer")) {
            return {
                content: [{ type: "text", text: `It's OK to eat paneer once in a while.` }]
            };
        } else if (recipe.toLowerCase().includes("vegetable")) {
            return {
                content: [{ type: "text", text: `You can eat vegetables as much as you want!` }]
            };
        } else {
            return {
                content: [{ type: "text", text: `This recipe is healthy!` }]
            };
        }
    }
);

server.tool(
    "suggest-substitutes",
    { ingredient: z.string() },
    async ({ ingredient }) => {
        // Define the substitutes with proper types
        const substitutes: { [key: string]: string } = {
            "butter": "margarine or coconut oil",
            "egg": "flaxseed meal or applesauce",
            "milk": "almond milk or coconut milk"
        };

        // Ensure the ingredient exists as a key in the substitutes object
        const substitute = substitutes[ingredient.toLowerCase()];
        return {
            content: [{
                type: "text",
                text: `Alternative for ${ingredient}: ${substitute || "No substitute found."}`
            }]
        };
    }
);


server.resource(
    "ingredient-info",
    new ResourceTemplate("ingredient-info://{name}", { list: undefined }),
    async (uri, { name }) => ({
        contents: [{
            uri: uri.href,
            text: `Information about ${name}: Calories, nutrients, and cooking tips.`
        }]
    })
);


server.prompt(
    "generate-recipe",
    { recipe: z.string() },
    ({ recipe }) => ({
        messages: [{
            role: "user",
            content: {
                type: "text",
                text: `I will generate recipe for :\n\n${recipe}`
            }
        }]
    })
);



// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);