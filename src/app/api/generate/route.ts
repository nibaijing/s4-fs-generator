import { NextRequest, NextResponse } from "next/server";
import {
  APIClientFactory,
  DEFAULT_SYSTEM_PROMPT,
  getPromptTemplate,
  formatPrompt,
} from "@/lib/api-client";
import type { Provider, SupportedModel, APIConfig } from "@/lib/api-client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      requirement,
      moduleType,
      complexity,
      referenceText,
      apiKey,
      provider,
      model,
    } = body as {
      requirement: string;
      moduleType: string;
      complexity: string;
      referenceText?: string;
      apiKey: string;
      provider: Provider;
      model: SupportedModel;
    };

    // Validate request
    if (!requirement?.trim()) {
      return NextResponse.json(
        { error: "请输入业务需求" },
        { status: 400 }
      );
    }

    if (!apiKey?.trim()) {
      return NextResponse.json(
        { error: "请输入 API Key" },
        { status: 400 }
      );
    }

    if (!provider) {
      return NextResponse.json(
        { error: "请选择 AI 提供商" },
        { status: 400 }
      );
    }

    // Build API config
    const config: APIConfig = {
      provider,
      apiKey: apiKey.trim(),
      model: model || getDefaultModel(provider),
    };

    // Validate config
    const validation = APIClientFactory.validateConfig(config);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Create API client
    const client = APIClientFactory.createClient(config);

    // Build prompt using module-specific template
    const promptTemplate = getPromptTemplate(moduleType);
    const prompt = formatPrompt(promptTemplate, {
      requirement: requirement.trim(),
      complexity,
      referenceText: referenceText?.trim() || "",
    });

    // Generate FS document
    const generatedFS = await client.generate(prompt, {
      maxTokens: 4000,
      temperature: 0.7,
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
    });

    // Add metadata header
    const fsWithMetadata = addMetadata(generatedFS, requirement.trim(), moduleType, complexity);

    return NextResponse.json({ result: fsWithMetadata });
  } catch (error) {
    console.error("Generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "生成失败";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function getDefaultModel(provider: Provider): SupportedModel {
  const defaults: Record<Provider, SupportedModel> = {
    openai: "gpt-4o",
    anthropic: "claude-sonnet-4-20250514",
    deepseek: "deepseek-chat",
  };
  return defaults[provider];
}

function addMetadata(content: string, requirement: string, moduleType: string, complexity: string): string {
  const date = new Date().toISOString().replace("T", " ").substring(0, 19);
  
  const metadata = `---
# SAP S/4HANA 功能说明书 (FS)
**生成时间**: ${date}
**模块**: ${moduleType}
**复杂度**: ${complexity}

---

${content}`;
  
  return metadata;
}
