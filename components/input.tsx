'use client'

import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'

interface InputProps {
  input: string
  setInput: (value: string) => void
  selectedModelId: string
  isGeneratingResponse: boolean
  isReasoningEnabled: boolean
  isSearchEnabled: boolean
}

export function Input({
  input,
  setInput,
  selectedModelId,
  isGeneratingResponse,
  isReasoningEnabled,
  isSearchEnabled = false,
}: InputProps) {
  const { append, setData } = useChat({
    id: 'primary',
    body: {
      selectedModelId: selectedModelId,
      isReasoningEnabled: isReasoningEnabled,
      isSearchEnabled: isSearchEnabled,
    },
    onError: () => {
      toast.error('An error occurred, please try again!')
    },
  })

  return (
    <textarea
      className="mx-2 my-1 mb-12 min-h-12 w-full resize-none bg-transparent text-sm outline-none placeholder:font-light placeholder:text-neutral-300 placeholder:text-sm dark:placeholder:text-neutral-500"
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

          setData(undefined)
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
