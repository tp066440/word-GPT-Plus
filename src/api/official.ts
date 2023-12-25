import OpenAI, { ClientOptions } from 'openai'
import { availableModels } from '@/utils/constant'
import { Ref } from 'vue'
import { useUserStore } from '@/store/authStore'

function setConfig (apiKey: string, basePath?: string): ClientOptions {
  const config = { apiKey, basePath, dangerouslyAllowBrowser: true }
  return config
}

async function createChatCompletionStream (
  config: ClientOptions,
  messages: any[],
  result: Ref<string>,
  historyDialog: Ref<any[]>,
  errorIssue: Ref<boolean>,
  loading: Ref<boolean>,
  maxTokens?: number,
  temperature?: number,
  model?: string
): Promise<void> {
  const openai = new OpenAI(config)
  if (Object.keys(availableModels).includes(model ?? '')) {
    model = availableModels[model ?? '']
  }
  const requestConfig = {
    model: model ?? 'gpt-3.5-turbo',
    messages,
    temperature: temperature ?? 0.7,
    max_tokens: maxTokens ?? 800
  }
  let response
  try {
    response = await openai.chat.completions.create(requestConfig)
    result.value = response.choices[0].message?.content?.replace(/\\n/g, '\n') ?? ''
    historyDialog.value.push({
      role: 'assistant',
      content: result.value
    })
    const tokens = response?.usage?.total_tokens || 0
    if (tokens) {
      const store = useUserStore()
      store.syncBalance(tokens)
    }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      result.value = error.message
      errorIssue.value = true
      console.error(error.message)
    } else {
      result.value = String(error)
      errorIssue.value = true
      console.error(error)
    }
  }
  loading.value = false
}

export default {
  setConfig,
  createChatCompletionStream
}
