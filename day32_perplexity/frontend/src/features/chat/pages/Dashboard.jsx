/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'


const Dashboard = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  const handleSubmitMessage = (event) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) {
      return
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId,chats)
  }

  return (
    <main className='flex h-screen w-full overflow-hidden bg-[#08090d] text-white'>

      {/* Sidebar */}
      <aside className='hidden h-full w-60 shrink-0 flex-col border-r border-white/4 bg-[#08090d] px-2 py-4 md:flex'>
        <h1 className='mb-4 bg-linear-to-r from-white to-white/40 bg-clip-text px-2 text-3xl font-bold tracking-tight text-transparent'>
          Vandru AI
        </h1>

        <div className='space-y-0.5'>
          {Object.values(chats).map((chat, index) => (
            <button
              onClick={() => { openChat(chat.id) }}
              key={index}
              type='button'
              className='group flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-all hover:bg-white/4'
            >
              <span className='h-1 w-1 shrink-0 rounded-full bg-white/20 transition-colors group-hover:bg-cyan-400/70' />
              <span className='truncate text-md text-white/40 transition-colors group-hover:text-white/75'>{chat.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <section className='relative flex h-full flex-1 flex-col overflow-hidden'>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto px-6 py-5 pb-28 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.06)_transparent]'>
          <div className='mx-auto flex max-w-2xl flex-col gap-2'>
            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'user' ? (
                  <div className='max-w-[65%] rounded-2xl rounded-br-sm bg-white/6 px-4 py-2.5 text-sm leading-relaxed text-white/90 ring-1 ring-inset ring-white/[0.07]'>
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div className='w-full py-1 text-sm leading-relaxed text-white/65'>
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                        ul: ({ children }) => <ul className='mb-2 list-disc pl-4 space-y-0.5'>{children}</ul>,
                        ol: ({ children }) => <ol className='mb-2 list-decimal pl-4 space-y-0.5'>{children}</ol>,
                        code: ({ children }) => <code className='rounded-md bg-cyan-400/8 px-1.5 py-0.5 font-mono text-[0.8em] text-cyan-300/80 ring-1 ring-cyan-400/10'>{children}</code>,
                        pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-white/3 p-3.5 font-mono text-xs text-white/50 ring-1 ring-white/5'>{children}</pre>
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <footer className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#08090d] via-[#08090d]/80 to-transparent px-6 pb-5 pt-10'>
          <form
            onSubmit={handleSubmitMessage}
            className='mx-auto flex max-w-2xl items-center gap-3 rounded-2xl bg-[#13141a] px-4 py-3 ring-1 ring-white/[0.07] transition-all focus-within:ring-cyan-500/25 focus-within:shadow-[0_0_30px_rgba(6,182,212,0.06)]'
          >
            <input
              type='text'
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder='Ask anything...'
              className='flex-1 bg-transparent text-sm text-white/90 outline-none placeholder:text-white/20 md:text-base'
            />
            <button
              type='submit'
              disabled={!chatInput.trim()}
              className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/90 text-[#08090d] shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(6,182,212,0.5)] disabled:cursor-not-allowed disabled:bg-white/6 disabled:text-white/20 disabled:shadow-none'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                <line x1='12' y1='19' x2='12' y2='5' />
                <polyline points='5 12 12 5 19 12' />
              </svg>
            </button>
          </form>
        </footer>

      </section>
    </main>
  )
}

export default Dashboard