/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { useChat } from '../hooks/useChat'
import Chats from '../components/Chats'
import { toggleTheme } from '../theme.slice'

const Dashboard = () => {
  const chat = useChat()
  const dispatch = useDispatch()

  const [chatInput, setChatInput] = useState('')
  const [activeTab, setActiveTab] = useState('search')
  const [isLoading, setIsLoading] = useState(false)

  const theme = useSelector((state) => state.theme.mode)

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
    if (isLoading && currentMessages.length > sentCountRef.current) {
      setIsLoading(false)
    }
  }, [currentMessages])

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    sentCountRef.current = currentMessages.length + 1
    chat.handleSendMessage({ message: chatInput, chatId: currentChatId })

    setChatInput('')
    setIsLoading(true)
  }

  return (
    <main
      className="flex h-screen"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)'
      }}
    >

      {/* SIDEBAR */}
      <aside
        className="w-64 px-4 py-5 flex flex-col"
        style={{ borderRight: '1px solid var(--border)' }}
      >

        <h1 className="text-2xl font-bold mb-6 tracking-tight">
          Search
        </h1>

        {/* NAV */}
        <div className="flex flex-col gap-1">
          <button onClick={() => setActiveTab('search')} className="px-3 py-2 rounded-lg text-sm text-left hover:bg-black/5">
            🔍 Search
          </button>
          <button onClick={() => setActiveTab('chats')} className="px-3 py-2 rounded-lg text-sm text-left hover:bg-black/5">
            💬 Chats
          </button>
          <button onClick={() => setActiveTab('search')} className="px-3 py-2 text-sm rounded-lg text-left hover:bg-black/5">
            ➕ New Chat
          </button>
        </div>

        {/* RECENT */}
        <div className="mt-6">
          <p className="text-sm font-semibold opacity-70 mb-3 tracking-wide">
            RECENT
          </p>

          <div className="flex flex-col gap-1">
            {Object.values(chats).slice(0, 8).map((c, i) => {
              const isActive = currentChatId === c.id

              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 rounded-lg transition group"
                  style={{
                    backgroundColor: isActive ? 'var(--card)' : 'transparent',
                    opacity: isActive ? 1 : 0.85
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'var(--card)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >

                  {/* TITLE */}
                  <button
                    onClick={() => {
                      chat.handleOpenChat(c.id, chats)
                      setActiveTab('search')
                    }}
                    className="text-left text-sm font-medium truncate flex-1"
                  >
                    {c.title}
                  </button>

                  {/* DELETE ICON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      chat.handleDeleteChat(c.id)
                    }}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition text-sm hover:text-red-500"
                  >
                    🗑️
                  </button>

                </div>
              )
            })}
          </div>

          <button
            onClick={() => setActiveTab('chats')}
            className="text-sm text-cyan-500 mt-3"
          >
            VIEW ALL
          </button>
        </div>

        {/* THEME */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="mt-auto text-sm opacity-70 hover:opacity-100"
        >
          {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </aside>

      {/* MAIN */}
      <section className="flex-1 relative">

        {activeTab === 'chats' ? (
          <Chats setActiveTab={setActiveTab} />
        ) : (
          <>
            {!hasMessages ? (
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-6xl opacity-80 mb-10">perplexity</h1>

                <form
                  onSubmit={handleSubmitMessage}
                  className="flex w-full max-w-3xl px-5 py-4 rounded-3xl"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                    placeholder="Ask anything..."
                  />
                </form>
              </div>
            ) : (
              <>
                <div className="p-6 pb-32 overflow-y-auto h-full no-scrollbar">
                  <div className="w-full max-w-5xl mx-auto px-4 space-y-6">

                    {currentMessages.map((msg, i) => (
                      <div key={i}>
                        {msg.role === 'user' ? (
                          <div className="text-right">
                            <div
                              className="inline-block px-4 py-2 rounded-xl"
                              style={{ backgroundColor: 'var(--card)' }}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ) : (
                          <div className="text-base leading-8 max-w-4xl">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    ))}

                    <div ref={bottomRef} />
                  </div>
                </div>

                <div className="absolute bottom-0 w-full p-6">
                  <form
                    onSubmit={handleSubmitMessage}
                    className="max-w-3xl mx-auto flex px-5 py-4 rounded-3xl"
                    style={{ backgroundColor: 'var(--card)' }}
                  >
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none"
                      placeholder="Ask anything..."
                    />
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default Dashboard