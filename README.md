# SAP S/4HANA FS Generator (Next.js Version)

AI-powered Functional Specification Generator for SAP S/4HANA - Refactored for Vercel deployment.

## ✨ Features

- **Multi-module Support**: MM, PP, PM, and General
- **AI Providers**: OpenAI, Anthropic (Claude), DeepSeek
- **Reference Learning**: Learn from your existing FS documents
- **Export**: Markdown and HTML download
- **Vercel Ready**: Zero config deployment

## 🚀 Quick Start

### Local Development

```bash
cd s4-fs-generator-next
npm install
npm run dev
```

Visit http://localhost:3000

### Vercel Deployment

1. Push to GitHub
2. Import in Vercel
3. Add environment variables:
   - `AI_PROVIDER` (openai/anthropic/deepseek)
   - `OPENAI_API_KEY` (or ANTHROPIC_API_KEY / DEEPSEEK_API_KEY)
   - `OPENAI_MODEL` (default: gpt-4o)
4. Deploy

## 📁 Structure

```
s4-fs-generator-next/
├── src/app/
│   ├── api/generate/route.ts  # API endpoint
│   ├── page.tsx               # Main UI
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── public/                    # Static assets
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI SDK
