import { ModelList, type modelID } from '@/lib/models'
import {
  IsReasoningEnabled,
  IsSearchEnabled,
  SelectedModelId,
} from '@/lib/nusq'
import { useChat } from '@ai-sdk/react'
import { parseAsBoolean, parseAsStringLiteral, useQueryState } from 'nuqs'
import { toast } from 'sonner'
import { Messages } from './messages'

export default function UserMessages() {
  const [selectedModelId] = useQueryState<modelID>(
    SelectedModelId,
    parseAsStringLiteral(ModelList).withDefault('medical-70B')
  )
  const [isReasoningEnabled] = useQueryState<boolean>(
    IsReasoningEnabled,
    parseAsBoolean.withDefault(true)
  )
  const [isSearchEnabled] = useQueryState<boolean>(
    IsSearchEnabled,
    parseAsBoolean.withDefault(false)
  )

  const { messages, status, data, reload, setMessages } = useChat({
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

  // 获取最后一个消息的状态
  const fetchStatus =
    data && data.length > 0
      ? typeof data[data.length - 1] === 'object' &&
        data[data.length - 1] !== null
        ? (data[data.length - 1] as { status?: string })?.status || undefined
        : undefined
      : undefined

  return (
    <>
      {messages.length > 0 ? (
        <Messages
          messages={messages}
          status={status}
          fetchStatus={fetchStatus}
          reload={reload}
          setMessages={setMessages}
        />
      ) : (
        <div className="flex w-full flex-col gap-0.5 text-xl sm:text-2xl">
          <div className="flex flex-row items-center gap-2">
            <div>Welcome👋</div>
          </div>
          <div className="text-neutral-400 dark:text-neutral-500">
            What would you like me to think about today?
          </div>
        </div>
      )}
    </>
  )
}
