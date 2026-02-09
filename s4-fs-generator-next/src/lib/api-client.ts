/**
 * AI API Client Module
 * Supports OpenAI, Anthropic, and DeepSeek providers
 */

import OpenAI from 'openai';

// Provider types
export type Provider = 'openai' | 'anthropic' | 'deepseek';

// Model types for each provider
export type OpenAIModel = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo';
export type AnthropicModel = 'claude-sonnet-4-20250514' | 'claude-haiku-4-20250514';
export type DeepSeekModel = 'deepseek-chat';
export type SupportedModel = OpenAIModel | AnthropicModel | DeepSeekModel;

// Configuration interfaces
export interface APIConfig {
  provider: Provider;
  apiKey: string;
  model: SupportedModel;
  baseUrl?: string;
}

// Base client interface
export interface BaseAPIClient {
  generate(prompt: string, options?: GenerateOptions): Promise<string>;
}

export interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

// OpenAI Client Wrapper
export class OpenAIClientWrapper implements BaseAPIClient {
  private client: OpenAI;
  private model: OpenAIModel;

  constructor(config: APIConfig) {
    this.model = config.model as OpenAIModel;
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    });
  }

  async generate(prompt: string, options?: GenerateOptions): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: options?.systemPrompt || '你是一位资深的 SAP 顾问，擅长编写功能说明书。',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: options?.maxTokens || 4000,
        temperature: options?.temperature || 0.7,
      });

      return response.choices[0]?.message?.content || '生成失败';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API 调用失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }
}

// Anthropic Client Wrapper
export class AnthropicClientWrapper implements BaseAPIClient {
  private apiKey: string;
  private model: AnthropicModel;

  constructor(config: APIConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model as AnthropicModel;
  }

  async generate(prompt: string, options?: GenerateOptions): Promise<string> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: options?.maxTokens || 4000,
          temperature: options?.temperature || 0.7,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Anthropic API 错误: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0]?.text || '生成失败';
    } catch (error) {
      console.error('Anthropic API Error:', error);
      throw new Error(
        `Anthropic API 调用失败: ${error instanceof Error ? error.message : '未知错误'}`
      );
    }
  }

// DeepSeek Client Wrapper
export class DeepSeekClientWrapper implements BaseAPIClient {
  private apiKey: string;
  private model: DeepSeekModel;

  constructor(config: APIConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model as DeepSeekModel;
  }

  async generate(prompt: string, options?: GenerateOptions): Promise<string> {
    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: options?.systemPrompt || '你是一位资深的 SAP 顾问，擅长编写功能说明书。',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: options?.maxTokens || 4000,
          temperature: options?.temperature || 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `DeepSeek API 错误: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '生成失败';
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      throw new Error(
        `DeepSeek API 调用失败: ${error instanceof Error ? error.message : '未知错误'}`
      );
    }
  }

// API Client Factory
export class APIClientFactory {
  static createClient(config: APIConfig): BaseAPIClient {
    switch (config.provider) {
      case 'openai':
        return new OpenAIClientWrapper(config);
      case 'anthropic':
        return new AnthropicClientWrapper(config);
      case 'deepseek':
        return new DeepSeekClientWrapper(config);
      default:
        throw new Error(`不支持的 AI 提供商: ${config.provider}`);
    }
  }

  static validateConfig(config: APIConfig): { valid: boolean; error?: string } {
    if (!config.apiKey?.trim()) {
      return { valid: false, error: 'API Key 不能为空' };
    }

    if (!config.provider) {
      return { valid: false, error: '请选择 AI 提供商' };
    }

    if (!config.model) {
      return { valid: false, error: '请选择模型' };
    }

    return { valid: true };
  }
}

// Default system prompt
export const DEFAULT_SYSTEM_PROMPT = `你是 SAP S/4HANA 功能说明书 (Functional Specification) 专家。
请根据用户输入的业务需求，生成结构化的 FS 文档，包含：
1. 文档信息（标题、版本、日期）
2. 业务背景与目标
3. 需求描述
4. 功能范围与边界
5. 业务流程图（文字描述）
6. 详细功能描述
7. 数据字典（关键表字段）
8. 权限与安全
9. 测试要点
10. 风险与假设

请使用专业的 SAP 顾问语言，输出完整的 Markdown 格式文档。`;
