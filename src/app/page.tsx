"use client";

import { useState } from "react";

type Provider = "openai" | "anthropic" | "deepseek";

interface GenerateResponse {
  result?: string;
  error?: string;
}

export default function Home() {
  const [requirement, setRequirement] = useState("");
  const [moduleType, setModuleType] = useState("MM (物料管理)");
  const [complexity, setComplexity] = useState("Medium");
  const [priority, setPriority] = useState("Must Have");
  const [referenceText, setReferenceText] = useState("");
  const [generatedFS, setGeneratedFS] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [provider, setProvider] = useState<Provider>("openai");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4o");

  const providerModels: Record<Provider, string[]> = {
    openai: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
    anthropic: ["claude-sonnet-4-20250514", "claude-haiku-4-20250514"],
    deepseek: ["deepseek-chat"]
  };

  const handleGenerate = async () => {
    if (!requirement.trim()) {
      setError("请输入业务需求");
      return;
    }
    if (!apiKey) {
      setError("请输入 API Key");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requirement,
          moduleType,
          complexity,
          priority,
          referenceText,
          apiKey,
          provider,
          model
        })
      });

      const data: GenerateResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "生成失败");
      }

      setGeneratedFS(data.result || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([generatedFS], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fs_${moduleType.split(" ")[0]}_${complexity}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const templateRequirements: Record<string, string> = {
    "MM - 采购校验": "当采购订单金额超过设定阈值时，在保存前自动触发审批流程",
    "PP - 报工增强": "在生产订单报工时，增加额外的质量检验点验证",
    "PM - 通知升级": "维护通知超过24小时未关闭时，自动升级给值班经理",
    "通用 - 数据同步": "当SAP中的物料主数据变更时，自动同步到外部WMS系统"
  };

  const applyTemplate = (key: string) => {
    setRequirement(templateRequirements[key]);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💠 SAP S/4HANA FS Generator</h1>
          <p className="text-gray-600">智能生成 SAP 功能说明书 (Functional Specification)</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Settings */}
          <aside className="lg:col-span-1 bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">⚙️ API 配置</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI 提供商</label>
                <select
                  value={provider}
                  onChange={(e) => {
                    setProvider(e.target.value as Provider);
                    setModel(providerModels[e.target.value as Provider][0]);
                  }}
                  className="w-full border rounded-md p-2"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic (Claude)</option>
                  <option value="deepseek">DeepSeek</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">模型</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  {providerModels[provider].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="输入 API Key"
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            <hr className="my-6" />

            <h2 className="text-lg font-semibold mb-4">📤 导出选项</h2>
            <p className="text-sm text-gray-600">支持 Markdown、HTML 格式下载</p>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Step 1: Business Requirement */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">📝 1. 输入业务需求</h2>
              <textarea
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="描述你的业务场景...
示例：当采购订单(PO)的总金额超过10万美元时，需要在保存时触发额外的成本中心校验逻辑，并在BAdI中记录审计日志。"
                className="w-full border rounded-md p-3 h-40"
              />

              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">快速模板：</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) applyTemplate(e.target.value);
                  }}
                  defaultValue=""
                  className="border rounded-md p-2 text-sm"
                >
                  <option value="">自定义</option>
                  {Object.keys(templateRequirements).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
            </section>

            {/* Step 2: Core Parameters */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">🔧 2. 核心参数</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">目标 SAP 模块</label>
                  <select
                    value={moduleType}
                    onChange={(e) => setModuleType(e.target.value)}
                    className="w-full border rounded-md p-2"
                  >
                    <option>MM (物料管理)</option>
                    <option>PP (生产计划)</option>
                    <option>PM (工厂维护)</option>
                    <option>通用</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {moduleType === "MM (物料管理)" ? "采购、库存管理、发票校验" :
                     moduleType === "PP (生产计划)" ? "生产订单、物料需求计划" :
                     moduleType === "PM (工厂维护)" ? "设备维护、维护通知、工单" : "跨模块或通用增强需求"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">复杂度</label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {complexity === "Low" ? "影响范围小，1-2个增强点" :
                     complexity === "Medium" ? "中等复杂度，涉及多个表或流程" : "高复杂度，跨模块深度集成"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border rounded-md p-2"
                  >
                    <option>Must Have</option>
                    <option>Should Have</option>
                    <option>Could Have</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Step 3: Reference Document */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">📚 3. 参考文档 (可选)</h2>
              <textarea
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                placeholder="上传参考的 FS 文档内容，AI 将学习其格式和风格..."
                className="w-full border rounded-md p-3 h-24"
              />
            </section>

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {loading ? "🔍 AI 生成中..." : "✨ 生成 FS 文档"}
              </button>
              <button
                onClick={() => {
                  setRequirement("");
                  setReferenceText("");
                  setGeneratedFS("");
                }}
                className="px-6 py-3 border rounded-md hover:bg-gray-100"
              >
                🗑️ 清空
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Result */}
            {generatedFS && (
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">📄 生成结果</h2>
                <div className="prose max-w-none bg-gray-50 rounded-md p-4 whitespace-pre-wrap text-sm">
                  {generatedFS}
                </div>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={downloadMarkdown}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                  >
                    📥 下载 Markdown
                  </button>
                  <button
                    onClick={() => {
                      const html = `<!DOCTYPE html><html><body>${generatedFS.replace(/\n/g, "<br>").replace(/##\s(.+)/g, "<h2>$1</h2>").replace(/###\s(.+)/g, "<h3>$1</h3>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/-\s(.+)/g, "<li>$1</li>")}</body></html>`;
                      const blob = new Blob([html], { type: "text/html" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `fs_${moduleType.split(" ")[0]}_${complexity}.html`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                  >
                    📥 下载 HTML
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          💠 <strong>SAP S/4HANA FS Generator</strong> | Next.js + OpenAI/Anthropic/DeepSeek
        </footer>
      </div>
    </main>
  );
}
