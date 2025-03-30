import { DefaultModelID, type modelID, models } from '@/lib/models'
import { useChat } from '@ai-sdk/react'
import { LightBulbIcon } from '@heroicons/react/24/outline'
import cn from 'classnames'
import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from './input'

import { Footnote } from './footnote'
import { ArrowUpIcon, ChevronDownIcon, StopIcon } from './icons'

export default function UserControl() {
  const [input, setInput] = useState<string>('')
  const [selectedModelId, setSelectedModelId] =
    useState<modelID>(DefaultModelID)
  const [isReasoningEnabled, setIsReasoningEnabled] = useState<boolean>(true)

  const { append, status, stop } = useChat({
    id: 'primary',
    body: {
      selectedModelId: selectedModelId,
      isReasoningEnabled: isReasoningEnabled,
    },
    onError: () => {
      toast.error('An error occurred, please try again!')
    },
  })

  const isGeneratingResponse = ['streaming', 'submitted'].includes(status)

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative flex w-full flex-col gap-1 rounded-2xl border-[1px] border-zinc-200/60 bg-zinc-100 p-3 shadow-lg shadow-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-none">
        <Input
          input={input}
          setInput={setInput}
          selectedModelId={selectedModelId}
          isGeneratingResponse={isGeneratingResponse}
          isReasoningEnabled={isReasoningEnabled}
        />

        <div className="absolute bottom-2.5 left-2.5">
          <button
            disabled={true}
            type="button"
            className={cn(
              'relative flex w-fit cursor-pointer flex-row items-center gap-2 rounded-full p-2 text-xs transition-colors disabled:opacity-50',
              {
                'text-green-700 ': isReasoningEnabled,
              }
            )}
            onClick={() => {
              setIsReasoningEnabled(!isReasoningEnabled)
            }}
          >
            <LightBulbIcon className={cn('size-4')} />
            <div>Reasoning</div>
          </button>
        </div>

        <div className="absolute right-2.5 bottom-2.5 flex flex-row gap-2">
          <div className="relative flex w-fit cursor-pointer flex-row items-center gap-0.5 rounded-lg p-1.5 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <div className="flex items-center justify-center px-1 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="pr-1">{models[selectedModelId]}</span>
              <ChevronDownIcon />
            </div>

            <select
              className="absolute left-0 w-full cursor-pointer p-1 opacity-0"
              value={selectedModelId}
              onChange={(event) => {
                if (!event.target.value.includes('deepseek-r1')) {
                  setIsReasoningEnabled(false)
                } else {
                  setIsReasoningEnabled(true)
                }
                setSelectedModelId(event.target.value as modelID)
              }}
            >
              {Object.entries(models).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={cn(
              'mt-0.5 flex size-6 flex-row items-center justify-center rounded-full bg-zinc-900 p-1.5 text-zinc-100 transition-all hover:scale-105 hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300',
              {
                'dark:bg-zinc-200 dark:text-zinc-500':
                  isGeneratingResponse || input === '',
              }
            )}
            onClick={() => {
              if (input === '') {
                return
              }

              if (isGeneratingResponse) {
                stop()
              } else {
                append({
                  role: 'user',
                  content: input,
                  createdAt: new Date(),
                })
              }

              setInput('')
            }}
          >
            {isGeneratingResponse ? <StopIcon /> : <ArrowUpIcon />}
          </button>
        </div>
      </div>
      <Footnote />
    </div>
  )
}
