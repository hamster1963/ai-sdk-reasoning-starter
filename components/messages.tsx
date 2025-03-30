'use client'

import type { UseChatHelpers } from '@ai-sdk/react'
import type { UIMessage } from 'ai'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { ChevronDownIcon, ChevronUpIcon } from './icons'
import { markdownComponents } from './markdown-components'
import ShinyText from './shiny-text'

interface ReasoningPart {
  type: 'reasoning'
  reasoning: string
  details: Array<{ type: 'text'; text: string }>
}

interface ReasoningMessagePartProps {
  part: ReasoningPart
  isReasoning: boolean
}

export function ReasoningMessagePart({
  part,
  isReasoning,
}: ReasoningMessagePartProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      marginTop: '1rem',
      marginBottom: 0,
    },
  }

  useEffect(() => {
    if (!isReasoning) {
      setIsExpanded(false)
    }
  }, [isReasoning])

  return (
    <div className="flex flex-col">
      {isReasoning ? (
        <div className="flex flex-row items-center gap-2">
          <ShinyText
            text="Reasoning"
            disabled={false}
            speed={2}
            className="font-light text-sm"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
          className="flex cursor-pointer flex-row items-center gap-2"
        >
          <p className="font-light text-[#54545494] text-sm transition-colors hover:text-black/80 dark:text-[#b5b5b5a4] dark:hover:text-white/80">
            Reasoned for a few seconds
          </p>
          {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </button>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="reasoning"
            className="flex flex-col gap-4 border-l pl-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {part.details.map((detail, detailIndex) =>
              detail.type === 'text' ? (
                <Markdown
                  key={`${detailIndex}-${detail.text}`}
                  components={markdownComponents}
                >
                  {detail.text}
                </Markdown>
              ) : (
                '<redacted>'
              )
            )}

            {/* <Markdown components={markdownComponents}>{reasoning}</Markdown> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface TextMessagePartProps {
  text: string
}

export function TextMessagePart({ text }: TextMessagePartProps) {
  return <Markdown components={markdownComponents}>{text}</Markdown>
}

interface MessagesProps {
  messages: Array<UIMessage>
  status: UseChatHelpers['status']
}

export function Messages({ messages, status }: MessagesProps) {
  const messagesRef = useRef<HTMLDivElement>(null)
  const messagesLength = useMemo(() => messages.length, [messages])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messagesLength])

  return (
    <div
      className="flex w-full flex-col items-center gap-4 overflow-y-scroll"
      ref={messagesRef}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'flex w-full flex-col gap-4 first-of-type:mt-16 last-of-type:mb-12'
          )}
        >
          <div
            className={cn('flex flex-col gap-2', {
              'ml-auto w-fit rounded-lg bg-zinc-100 px-2 py-1 dark:bg-zinc-800':
                message.role === 'user',
              '': message.role === 'assistant',
            })}
          >
            {message.parts.map((part, partIndex) => {
              if (part.type === 'text' && message.role !== 'user') {
                return (
                  <TextMessagePart
                    key={`${message.id}-${partIndex}`} // 确保唯一 key
                    text={part.text}
                  />
                )
              }

              if (part.type === 'text' && message.role === 'user') {
                return (
                  <div
                    key={`${message.id}-${partIndex}`}
                    className="flex flex-col gap-4 font-light text-sm"
                  >
                    {part.text}
                  </div>
                )
              }

              if (part.type === 'reasoning') {
                return (
                  <ReasoningMessagePart
                    key={`${message.id}-${partIndex}`}
                    // @ts-expect-error export ReasoningUIPart
                    part={part}
                    isReasoning={
                      status === 'streaming' &&
                      partIndex === message.parts.length - 1
                    }
                  />
                )
              }
            })}
          </div>
        </div>
      ))}

      {status === 'submitted' && (
        <ShinyText
          text="Connecting..."
          disabled={false}
          speed={2}
          className="mb-12 w-full font-light text-sm"
        />
      )}
    </div>
  )
}
