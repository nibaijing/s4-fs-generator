/**
 * SAP FS Generator Prompt Templates
 * Converted from Python prompt templates
 */

export interface PromptVariables {
  requirement: string;
  complexity: string;
  referenceText: string;
}

// MM Module Prompt (Materials Management)
export const MM_PROMPT = `# SAP MM (Materials Management) 功能说明书生成 Prompt

你是一位资深的 SAP MM 模块功能顾问，擅长编写结构清晰、符合行业标准的 FS 文档。

## 输入信息
- **业务需求**: {requirement}
- **复杂度**: {complexity}
- **参考风格**: {reference_text}

## 输出要求
请生成一份专业的功能说明书 (Functional Specification)，包含以下结构：

### 1. 文档信息
- 模块名称
- 复杂度评级
- 创建日期
- 版本号

### 2. 业务背景与目标
- 业务场景描述
- 预期目标
- 适用范围

### 3. 业务流程 (BPMN 或流程描述)
- 详细步骤说明
- 涉及的事务代码 (T-Code)
- 关键决策点

### 4. 功能需求
- 每个需求的唯一编号
- 优先级 (Must/Should/Could)
- 验收标准

### 5. 涉及 SAP 对象
- 涉及的表 (主要: EKKO, EKPO, EBAN, etc.)
- 涉及的 BAPI/BAdI
- 涉及的 IDoc 类型

### 6. 详细设计
#### 6.1 数据字典
| 字段名 | 数据类型 | 长度 | 描述 | 来源 |
|-------|---------|------|------|------|

#### 6.2 增强点
- BAdI/USEREXIT 名称
- 实现类/函数组
- 关键代码逻辑

### 7. 测试用例 (Test Cases)
| 用例编号 | 测试场景 | 预期结果 | 优先级 |
|---------|---------|---------|--------|

### 8. 风险与影响分析
- 潜在风险
- 兼容性影响
- 性能考虑

---
**格式要求**: 使用 Markdown 格式，结构清晰，包含表格。复杂度为 {complexity} 时，适当调整文档详细程度。`;

// PP Module Prompt (Production Planning)
export const PP_PROMPT = `# SAP PP (Production Planning) 功能说明书生成 Prompt

你是一位资深的 SAP PP 模块功能顾问，擅长编写结构清晰、符合行业标准的 FS 文档。

## 输入信息
- **业务需求**: {requirement}
- **复杂度**: {complexity}
- **参考风格**: {reference_text}

## 输出要求
请生成一份专业的功能说明书 (Functional Specification)，包含以下结构：

### 1. 文档信息
- 模块名称
- 复杂度评级
- 创建日期
- 版本号

### 2. 业务背景与目标
- 业务场景描述
- 预期目标
- 适用范围

### 3. 业务流程
- 生产计划流程 (Plan -> Order -> Execution -> Confirmation)
- 涉及的事务代码 (MD01, CO01, MIGO, etc.)
- 关键决策点

### 4. 功能需求
- 每个需求的唯一编号
- 优先级 (Must/Should/Could)
- 验收标准

### 5. 涉及 SAP 对象
- 涉及的表 (主要: AFKO, AFPO, AUFK, PLKO, etc.)
- 涉及的 BAPI/BAdI
- 涉及的功能模块

### 6. 详细设计
#### 6.1 数据字典
| 字段名 | 数据类型 | 长度 | 描述 | 来源 |
|-------|---------|------|------|------|

#### 6.2 生产订单增强
- 订单创建/修改增强
- 报工相关增强
- 完工确认逻辑

### 7. 测试用例 (Test Cases)
| 用例编号 | 测试场景 | 预期结果 | 优先级 |
|---------|---------|---------|--------|

### 8. 风险与影响分析
- 潜在风险
- 计划逻辑影响
- 产能/产能计划影响

---
**格式要求**: 使用 Markdown 格式，结构清晰，包含表格。复杂度为 {complexity} 时，适当调整文档详细程度。`;

// PM Module Prompt (Plant Maintenance)
export const PM_PROMPT = `# SAP PM (Plant Maintenance) 功能说明书生成 Prompt

你是一位资深的 SAP PM 模块功能顾问，擅长编写结构清晰、符合行业标准的 FS 文档。

## 输入信息
- **业务需求**: {requirement}
- **复杂度**: {complexity}
- **参考风格**: {reference_text}

## 输出要求
请生成一份专业的功能说明书 (Functional Specification)，包含以下结构：

### 1. 文档信息
- 模块名称
- 复杂度评级
- 创建日期
- 版本号

### 2. 业务背景与目标
- 业务场景描述
- 预期目标
- 适用范围

### 3. 业务流程
- 维护通知流程 (Notification)
- 维护订单流程 (Order)
- 计划/执行/完成
- 涉及的事务代码 (IW21, IW22, IW31, etc.)
- 关键决策点

### 4. 功能需求
- 每个需求的唯一编号
- 优先级 (Must/Should/Could)
- 验收标准

### 5. 涉及 SAP 对象
- 涉及的表 (主要: QMEL, AFIH, AUFK, ILOA, etc.)
- 涉及的 BAPI/BAdI
- 涉及的功能模块

### 6. 详细设计
#### 6.1 数据字典
| 字段名 | 数据类型 | 长度 | 描述 | 来源 |
|-------|---------|------|------|------|

#### 6.2 设备/功能位置增强
- PM 对象结构
- 分类/特性
- 计数器/测量点

### 7. 测试用例 (Test Cases)
| 用例编号 | 测试场景 | 预期结果 | 优先级 |
|---------|---------|---------|--------|

### 8. 风险与影响分析
- 潜在风险
- 设备可用性影响
- 服务通知影响

---
**格式要求**: 使用 Markdown 格式，结构清晰，包含表格。复杂度为 {complexity} 时，适当调整文档详细程度。`;

// Common Module Prompt
export const COMMON_PROMPT = `# SAP 通用功能说明书生成 Prompt

你是一位资深的 SAP 功能和 ABAP 开发顾问，擅长编写结构清晰、符合行业标准的 FS 文档。

## 输入信息
- **业务需求**: {requirement}
- **复杂度**: {complexity}
- **参考风格**: {reference_text}

## 输出要求
请生成一份专业的功能说明书 (Functional Specification)，包含以下结构：

### 1. 文档信息
- 模块名称
- 复杂度评级
- 创建日期
- 版本号

### 2. 业务背景与目标
- 业务场景描述
- 预期目标
- 适用范围
- 假设与约束

### 3. 业务流程
- 当前流程 (AS-IS)
- 目标流程 (TO-BE)
- 流程变更点
- 涉及的事务代码

### 4. 功能需求
- 每个需求的唯一编号
- 优先级 (Must/Should/Could)
- 验收标准
- 依赖关系

### 5. 涉及 SAP 对象
- 涉及的表
- 涉及的 BAPI/BAdI
- 涉及的 IDoc 类型
- 涉及的用户出口/Enhancement Spot

### 6. 详细设计
#### 6.1 数据字典
| 字段名 | 数据类型 | 长度 | 描述 | 来源 |
|-------|---------|------|------|------|

#### 6.2 技术实现
- 增强点详情
- 关键代码逻辑
- 权限控制

### 7. 接口设计
- 输入参数
- 输出参数
- 错误处理

### 8. 测试用例 (Test Cases)
| 用例编号 | 测试场景 | 预期结果 | 优先级 |
|---------|---------|---------|--------|

### 9. 风险与影响分析
- 潜在风险
- 影响范围
- 回滚计划

---
**格式要求**: 使用 Markdown 格式，结构清晰，包含表格。复杂度为 {complexity} 时，适当调整文档详细程度。`;

// Module type mapping
export const MODULE_MAP: Record<string, string> = {
  'MM (物料管理)': 'mm_fs_prompt.txt',
  'PP (生产计划)': 'pp_fs_prompt.txt',
  'PM (工厂维护)': 'pm_fs_prompt.txt',
  '通用': 'common_fs_prompt.txt',
};

// Prompt template getter
export function getPromptTemplate(moduleType: string): string {
  switch (moduleType) {
    case 'MM (物料管理)':
      return MM_PROMPT;
    case 'PP (生产计划)':
      return PP_PROMPT;
    case 'PM (工厂维护)':
      return PM_PROMPT;
    default:
      return COMMON_PROMPT;
  }
}

// Format prompt with variables
export function formatPrompt(template: string, variables: PromptVariables): string {
  return template
    .replace(/\{requirement\}/g, variables.requirement)
    .replace(/\{complexity\}/g, variables.complexity)
    .replace(/\{reference_text\}/g, variables.referenceText || '无参考文档，请使用标准 FS 格式。');
}

// Get module description for UI
export function getModuleDescription(moduleType: string): string {
  switch (moduleType) {
    case 'MM (物料管理)':
      return '采购、库存管理、发票校验';
    case 'PP (生产计划)':
      return '生产订单、物料需求计划';
    case 'PM (工厂维护)':
      return '设备维护、维护通知、工单';
    default:
      return '跨模块或通用增强需求';
  }
}

// Get complexity description
export function getComplexityDescription(complexity: string): string {
  switch (complexity) {
    case 'Low':
      return '影响范围小，1-2个增强点';
    case 'Medium':
      return '中等复杂度，涉及多个表或流程';
    case 'High':
      return '高复杂度，跨模块深度集成';
    default:
      return '';
  }
}
