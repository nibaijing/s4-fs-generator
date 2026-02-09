// Type declarations for the FS Generator

declare module "@/lib/api-client" {
  export type Provider = 'openai' | 'anthropic' | 'deepseek';
  export type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo';
  export type AnthropicModel = 'claude-sonnet-4-20250514' | 'claude-haiku-4-20250514';
  export type DeepSeekModel = 'deepseek-chat';
  export type SupportedModel = OpenAIModel | AnthropicModel | DeepSeekModel;

  export interface APIConfig {
    provider: Provider;
    apiKey: string;
    model: SupportedModel;
    baseUrl?: string;
  }

  export interface GenerateOptions {
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
  }

  export interface BaseAPIClient {
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
  }

  export class OpenAIClientWrapper implements BaseAPIClient {
    constructor(config: APIConfig);
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
  }

  export class AnthropicClientWrapper implements BaseAPIClient {
    constructor(config: APIConfig);
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
  }

  export class DeepSeekClientWrapper implements BaseAPIClient {
    constructor(config: APIConfig);
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
  }

  export class APIClientFactory {
    static createClient(config: APIConfig): BaseAPIClient;
    static validateConfig(config: APIConfig): { valid: boolean; error?: string };
  }

  export const DEFAULT_SYSTEM_PROMPT: string;
}

declare module "@/lib/prompts" {
  export interface PromptVariables {
    requirement: string;
    complexity: string;
    referenceText: string;
  }

  export const MM_PROMPT: string;
  export const PP_PROMPT: string;
  export const PM_PROMPT: string;
  export const COMMON_PROMPT: string;
  export const MODULE_MAP: Record<string, string>;

  export function getPromptTemplate(moduleType: string): string;
  export function formatPrompt(template: string, variables: PromptVariables): string;
  export function getModuleDescription(moduleType: string): string;
  export function getComplexityDescription(complexity: string): string;
}
