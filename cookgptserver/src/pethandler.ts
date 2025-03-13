import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";

import {
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
    ListResourceTemplatesRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

export const setupHandlers = (server: Server): void => {
    // List available resources
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
        return {
            resources: [
                {
                    uri: "pet://ListPets",
                    name: "List of Pets",
                    description: "Available pet breeds: Dogs, Cats, Fish, etc.",
                    mimeType: "text/plain",
                },
                {
                    uri: "inventory://items",
                    name: "Pet Store Inventory",
                    description: "List of available pet supplies and accessories.",
                    mimeType: "text/plain",
                },
                {
                    uri: "food://types",
                    name: "Pet Food Options",
                    description: "Different types of pet food available in the store.",
                    mimeType: "text/plain",
                },
                {
                    uri: "care://tips",
                    name: "Pet Care Tips",
                    description: "Guidelines for taking care of pets.",
                    mimeType: "text/plain",
                },
            ],
        };
    });

    server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
        resourceTemplates: [
            {
                uriTemplate: 'dog://{breed}',
                name: 'Details of the Dog Breed',
                description: 'Real-time data on the dog breed',
                mimeType: 'application/json',
            },
            {
                uriTemplate: 'cat://{breed}',
                name: 'Details of the Cat Breed',
                description: 'Real-time data on different cat breeds',
                mimeType: 'application/json',
            },
            {
                uriTemplate: 'fish://{species}',
                name: 'Details of Fish Species',
                description: 'Real-time data on different fish species',
                mimeType: "application/json",
            },
            {
                uriTemplate: 'inventory://{item}',
                name: 'Inventory Details',
                description: 'Availability and stock details of pet products',
                mimeType: "application/json",
            },
            {
                uriTemplate: 'food://{type}',
                name: 'Pet Food Details',
                description: 'Nutritional information and types of pet food',
                mimeType: "application/json",
            },
            {
                uriTemplate: 'care://{service}',
                name: 'Pet Care Services',
                description: 'Available grooming, veterinary, and pet care services',
                mimeType: "application/json",
            },
        ],
    }));

    // Return resource content when clients request it
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        if (request.params.uri === "pet://ListPets") {
            return {
                contents: [
                    {
                        uri: "pet://ListPets",
                        name: "List of Available Pets",
                        text: "We have a variety of pets: Doberman, German Shepherd, Poodle, Persian Cat, Siamese Cat, Goldfish, Betta Fish, etc.",
                    },
                ],
            };
        }

        if (request.params.uri === "food://types") {
            return {
                contents: [
                    {
                        uri: "food://types",
                        name: "Pet Food Options",
                        text: "We offer dry food, wet food, raw diets, and special dietary foods for pets like dogs, cats, and fish.",
                    },
                ],
            };
        }

        if (request.params.uri === "care://services") {
            return {
                contents: [
                    {
                        uri: "care://services",
                        name: "Pet Care Services",
                        text: "Our pet store offers grooming, veterinary check-ups, training, and boarding services.",
                    },
                ],
            };
        }

        const petExp = /^(dog|cat|fish):\/\/(.+)$/;
        const petMatch = request.params.uri.match(petExp);
        if (petMatch) {
            const petType = petMatch[1];
            const breedOrSpecies = decodeURIComponent(petMatch[2]);
            return {
                contents: [
                    {
                        uri: request.params.uri,
                        name: `Details of ${petType} - ${breedOrSpecies}`,
                        text: `Hello, ${breedOrSpecies}, this ${petType} breed/species is available in our store.`,
                    },
                ],
            };
        }

        return { contents: [] };
    });
};
