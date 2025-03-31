import { type modelID, myProvider } from '@/lib/models'
import { type Message, createDataStreamResponse, streamText } from 'ai'
import type { NextRequest } from 'next/server'
import { ExampleFetch } from './example-fetch'

export async function POST(request: NextRequest) {
  const {
    messages,
    selectedModelId,
  }: {
    messages: Array<Message>
    selectedModelId: modelID
    isReasoningEnabled: boolean
  } = await request.json()

  return createDataStreamResponse({
    execute: (dataStream) => {
      // dataStream.writeMessageAnnotation(ExampleFetch)
      const result = streamText({
        system: 'you are a friendly assistant.',
        model: myProvider.languageModel(selectedModelId),
        messages,
      })
      result.mergeIntoDataStream(dataStream, {
        sendReasoning: true,
      })
    },
    onError: (error) => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error)
    },
  })
}
