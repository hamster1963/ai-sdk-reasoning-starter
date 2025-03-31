import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'
import { Messages } from './messages'

export default function UserMessages() {
  const { messages, status, data } = useChat({
    id: 'primary',
    onError: () => {
      toast.error('An error occurred, please try again!')
    },
  })

  // 获取最后一个消息的状态
  const fetchStatus =
    data && data.length > 0
      ? typeof data[data.length - 1] === 'object' &&
        data[data.length - 1] !== null
        ? (data[data.length - 1] as { status?: string })?.status || 'unknown'
        : 'unknown'
      : 'unknown'

  return (
    <>
      {messages.length > 0 ? (
        <Messages
          messages={messages}
          status={status}
          fetchStatus={fetchStatus}
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
