/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'


const Skeleton = () => (
  <div className='flex justify-start'>
    <div className='w-full space-y-2 py-1'>
      <div className='h-3 w-3/4 animate-pulse rounded-full bg-white/6' />
      <div className='h-3 w-full animate-pulse rounded-full bg-white/6' />
      <div className='h-3 w-5/6 animate-pulse rounded-full bg-white/6' />
      <div className='h-3 w-2/3 animate-pulse rounded-full bg-white/6' />
    </div>
  </div>
)


const Dashboard = () => {
  const chat = useChat()
  const [ chatInput, setChatInput ] = useState('')
  const [ sidebarOpen, setSidebarOpen ] = useState(true)
  const [ isLoading, setIsLoading ] = useState(false)
  const bottomRef = useRef(null)
  const sentCountRef = useRef(0)
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  const currentMessages = chats[currentChatId]?.messages ?? []
  const hasMessages = currentMessages.length > 0

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    // stop skeleton when message count grows beyond what user sent
    if (isLoading && currentMessages.length > sentCountRef.current) {
      setIsLoading(false)
    }
  }, [currentMessages])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    sentCountRef.current = currentMessages.length + 1
    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
    setIsLoading(true)
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  const InputBar = (
    <form
      onSubmit={handleSubmitMessage}
      className='flex w-full items-center gap-3 rounded-2xl bg-[#13141a] px-4 py-3 ring-1 ring-white/[0.07] transition-all focus-within:ring-cyan-500/25 focus-within:shadow-[0_0_30px_rgba(6,182,212,0.06)]'
    >
      <input
        type='text'
        value={chatInput}
        onChange={(event) => setChatInput(event.target.value)}
        placeholder='Ask anything...'
        className='flex-1 bg-transparent text-sm text-white/90 outline-none placeholder:text-white/25 md:text-base'
      />
      <button
        type='submit'
        disabled={!chatInput.trim() || isLoading}
        className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/90 text-[#08090d] shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(6,182,212,0.5)] disabled:cursor-not-allowed disabled:bg-white/6 disabled:text-white/20 disabled:shadow-none'
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
          <line x1='12' y1='19' x2='12' y2='5'/>
          <polyline points='5 12 12 5 19 12'/>
        </svg>
      </button>
    </form>
  )

  return (
    <main className='flex h-screen w-full overflow-hidden bg-[#040405] text-white'>

      {/* Sidebar */}
      <aside className={`hidden h-full shrink-0 flex-col border-r border-white/4 bg-[#040405] py-4 transition-all duration-300 md:flex ${sidebarOpen ? 'w-60 px-2' : 'w-14 px-2 items-center'}`}>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='mb-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/5 hover:text-white/70'
        >
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
            {sidebarOpen ? (
              <><path d='M18 6L6 18'/><path d='M6 6l12 12'/></>
            ) : (
              <><line x1='3' y1='6' x2='21' y2='6'/><line x1='3' y1='12' x2='21' y2='12'/><line x1='3' y1='18' x2='21' y2='18'/></>
            )}
          </svg>
        </button>

        {sidebarOpen ? (
          <>
            <h1 className='mb-4 bg-linear-to-r from-white to-white/40 bg-clip-text px-2 text-3xl font-bold tracking-tight text-transparent'>
              Vandru AI
            </h1>

            <button
              onClick={() => chat.handleOpenChat(null, chats)}
              type='button'
              className='mb-4 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-white/50 ring-1 ring-white/[0.07] transition-all hover:bg-white/4 hover:text-white/80 hover:ring-white/12'
            >
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
                <line x1='12' y1='5' x2='12' y2='19'/><line x1='5' y1='12' x2='19' y2='12'/>
              </svg>
              New chat
            </button>

            <p className='mb-1.5 px-2.5 text-[0.6rem] font-semibold uppercase tracking-widest text-white/20'>History</p>

            <div className='flex flex-col gap-0.5 overflow-y-auto [scrollbar-width:none]'>
              {Object.values(chats).map((c, index) => (
                <div
                  key={index}
                  className='group flex w-full items-center gap-1 rounded-lg px-2.5 py-1.5 transition-all hover:bg-white/4'
                >
                  <span className='h-1 w-1 shrink-0 rounded-full bg-white/20 transition-colors group-hover:bg-cyan-400/70' />
                  <button
                    onClick={() => { openChat(c.id) }}
                    type='button'
                    className='flex-1 truncate text-left text-sm text-white/40 transition-colors group-hover:text-white/75'
                  >
                    {c.title}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); chat.handleDeleteChat(c.id) }}
                    type='button'
                    className='ml-auto hidden shrink-0 rounded-md p-1 text-white/20 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:flex'
                  >
                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                      <polyline points='3 6 5 6 21 6'/><path d='M19 6l-1 14H6L5 6'/><path d='M10 11v6'/><path d='M14 11v6'/><path d='M9 6V4h6v2'/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <button
            onClick={() => chat.handleOpenChat(null, chats)}
            type='button'
            title='New chat'
            className='flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-white/5 hover:text-white/70'
          >
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
              <line x1='12' y1='5' x2='12' y2='19'/><line x1='5' y1='12' x2='19' y2='12'/>
            </svg>
          </button>
        )}
      </aside>

      {/* Main */}
      <section className='relative flex h-full flex-1 flex-col overflow-hidden'>

        {!hasMessages && !isLoading ? (
          /* ── Empty / centered state ── */
          <div className='flex flex-1 flex-col items-center justify-center px-6'>
            <h2 className='mb-1 text-3xl font-semibold tracking-tight text-white/90'>What's on your mind?</h2>
            <p className='mb-8 text-sm text-white/30'>Ask me anything — I'm here to help.</p>
            <div className='w-full max-w-2xl'>{InputBar}</div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className='flex-1 overflow-y-auto px-6 py-5 pb-28 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.06)_transparent]'>
              <div className='mx-auto flex max-w-2xl flex-col gap-4'>

                {currentMessages.map((message) => (
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

                {/* Skeleton while waiting for AI */}
                {isLoading && <Skeleton />}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input pinned bottom */}
            <footer className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#020203] via-[#040405]/80 to-transparent px-6 pb-5 pt-10'>
              <div className='mx-auto max-w-2xl'>{InputBar}</div>
            </footer>
          </>
        )}

      </section>
    </main>
  )
}

export default Dashboard