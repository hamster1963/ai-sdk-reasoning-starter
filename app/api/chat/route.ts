import { type modelID, myProvider } from '@/lib/models'
import { type Message, streamText } from 'ai'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const {
    messages,
    selectedModelId,
  }: {
    messages: Array<Message>
    selectedModelId: modelID
    isReasoningEnabled: boolean
  } = await request.json()

  const stream = streamText({
    system: 'you are a friendly assistant.',
    model: myProvider.languageModel(selectedModelId),
    messages,
  })

  return stream.toDataStreamResponse({
    sendReasoning: true,
    getErrorMessage: () => {
      return 'An error occurred, please try again!'
    },
  })
}
