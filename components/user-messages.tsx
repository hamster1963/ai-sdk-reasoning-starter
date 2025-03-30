import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'
import { Messages } from './messages'

export default function UserMessages() {
  const { messages, status } = useChat({
    id: 'primary',
    onError: () => {
      toast.error('An error occurred, please try again!')
    },
  })

  return (
    <>
      {messages.length > 0 ? (
        <Messages messages={messages} status={status} />
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
