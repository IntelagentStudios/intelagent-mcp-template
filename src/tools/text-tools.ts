import type { ToolDefinition } from '@intelagent/mcp-shared';
import type { TextService } from '../services/text-service.js';

/**
 * Define your MCP tools here.
 *
 * Each tool has a name, description, inputSchema (JSON Schema), and a handler.
 * The handler receives parsed arguments and returns the result — the framework
 * handles serialisation and error formatting.
 */
export function textTools(service: TextService): ToolDefinition[] {
  return [
    {
      name: 'reverse_string',
      description: 'Reverse a string. Returns the original text, reversed text, and character count.',
      inputSchema: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'The text to reverse' },
        },
        required: ['text'],
      },
      handler: async (args) => {
        return service.reverseString({ text: args.text as string });
      },
    },
    {
      name: 'word_count',
      description: 'Count words and characters in a string. Optionally count unique words.',
      inputSchema: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'The text to analyse' },
          unique: { type: 'boolean', description: 'Count unique words only (default: false)' },
        },
        required: ['text'],
      },
      handler: async (args) => {
        return service.wordCount({
          text: args.text as string,
          unique: args.unique as boolean | undefined,
        });
      },
    },
  ];
}
