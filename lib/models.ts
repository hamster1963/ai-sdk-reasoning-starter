import {
  customProvider,
  defaultSettingsMiddleware,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai'

import { createDeepSeek } from '@ai-sdk/deepseek'
import { createOpenAI } from '@ai-sdk/openai'

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_URL,
})

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_URL,
  compatibility: 'compatible',
})

const copilot = createOpenAI({
  apiKey: process.env.COPILOT_API_KEY,
  baseURL: process.env.COPILOT_API_URL,
  compatibility: 'compatible',
})

// custom provider with different model settings:
export const myProvider = customProvider({
  languageModels: {
    'deepseek-r1': wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: 'think',
      }),
      model: deepseek('deepseek-ai/DeepSeek-R1'),
    }),
    'deepseek-r1-7B': wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: 'think',
      }),
      model: deepseek('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'),
    }),
    'medical-70B': wrapLanguageModel({
      middleware: defaultSettingsMiddleware({
        settings: {
          temperature: 1,
        },
      }),
      model: openai('model_medical_20250122'),
    }),
    'gpt-4o': wrapLanguageModel({
      middleware: defaultSettingsMiddleware({
        settings: {
          temperature: 0.8,
        },
      }),
      model: copilot('gpt-4o'),
    }),
  },
})

export type modelID = Parameters<(typeof myProvider)['languageModel']>['0']
export const DefaultModelID = 'medical-70B'

export const models: Record<modelID, string> = {
  'deepseek-r1': 'DeepSeek-R1',
  'deepseek-r1-7B': 'DeepSeek-R1 Distill Qwen 7B',
  'medical-70B': 'Medical-70B',
  'gpt-4o': 'GPT-4o',
}
