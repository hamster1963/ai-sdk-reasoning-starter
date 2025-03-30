'use client'

import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'

interface InputProps {
  input: string
  setInput: (value: string) => void
  selectedModelId: string
  isGeneratingResponse: boolean
  isReasoningEnabled: boolean
}

export function Input({
  input,
  setInput,
  selectedModelId,
  isGeneratingResponse,
  isReasoningEnabled,
}: InputProps) {
  const { append } = useChat({
    id: 'primary',
    body: {
      selectedModelId: selectedModelId,
      isReasoningEnabled: isReasoningEnabled,
    },
    onError: () => {
      toast.error('An error occurred, please try again!')
    },
  })

  return (
    <textarea
      className="mx-2 my-1 mb-12 min-h-12 w-full resize-none bg-transparent text-sm outline-none placeholder:font-light placeholder:text-sm placeholder:text-zinc-300"
      placeholder="Send a message"
      value={input}
      onChange={(event) => {
        setInput(event.currentTarget.value)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()

          if (input === '') {
            return
          }

          if (isGeneratingResponse) {
            toast.error('Please wait for the model to finish its response!')

            return
          }

          append({
            role: 'user',
            content: input,
            createdAt: new Date(),
          })
          setInput('')
        }
      }}
    />
  )
}
