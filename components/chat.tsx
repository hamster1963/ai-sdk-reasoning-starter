'use client'

import { useChat } from '@ai-sdk/react'

import cn from 'classnames'
import { toast } from 'sonner'
import { Messages } from './messages'
import UserControl from './user-control'

export function Chat() {
  const { messages, status } = useChat({
    id: 'primary',
    onError: () => {
      toast.error('An error occurred, please try again!')
    },
  })

  return (
    <div
      className={cn(
        'flex h-dvh w-full max-w-3xl flex-col items-center px-4 pt-8 pb-4 md:px-0',
        {
          'justify-between': messages.length > 0,
          'justify-center gap-4': messages.length === 0,
        }
      )}
    >
      {messages.length > 0 ? (
        <Messages messages={messages} status={status} />
      ) : (
        <div className="flex w-full flex-col gap-0.5 text-xl sm:text-2xl">
          <div className="flex flex-row items-center gap-2">
            <div>Welcome to the AI SDK Preview.</div>
          </div>
          <div className="text-zinc-400 dark:text-zinc-500">
            What would you like me to think about today?
          </div>
        </div>
      )}

      <UserControl />
    </div>
  )
}
