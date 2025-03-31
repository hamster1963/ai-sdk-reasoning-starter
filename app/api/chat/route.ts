import { type modelID, myProvider } from '@/lib/models'
import { type Message, createDataStreamResponse, streamText } from 'ai'
import type { NextRequest } from 'next/server'
import { ExampleFetch } from './example-fetch'

export async function POST(request: NextRequest) {
  const {
    messages,
    selectedModelId,
    isSearchEnabled,
  }: {
    messages: Array<Message>
    selectedModelId: modelID
    isReasoningEnabled: boolean
    isSearchEnabled: boolean
  } = await request.json()

  return createDataStreamResponse({
    execute: async (dataStream) => {
      if (isSearchEnabled) {
        dataStream.writeData({
          type: 'fetch',
          status: 'pending',
        })
        // Simulate a delay for the example fetch
        await new Promise((resolve) => {
          setTimeout(() => {
            dataStream.writeMessageAnnotation(ExampleFetch)
            dataStream.writeData({
              type: 'fetch',
              status: 'Searching: example.com',
            })
            resolve(true)
          }, 2000)
        })
      }
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
