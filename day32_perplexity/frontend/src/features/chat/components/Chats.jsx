import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Chats = ({ setActiveTab }) => {
  const chat = useChat()
  const chats = useSelector((state) => state.chat.chats)

  const [search, setSearch] = useState('')

  const filtered = Object.values(chats).filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className="p-6"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)'
      }}
    >

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-4">Chats</h1>

      {/* SEARCH */}
      <input
        placeholder="Search your chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 rounded-xl outline-none"
        style={{
          backgroundColor: 'var(--card)',
          color: 'var(--text)',
          border: '1px solid var(--border)'
        }}
      />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((chatItem) => (
          <div
            key={chatItem.id}
            onClick={() => {
              chat.handleOpenChat(chatItem.id, chats)
              setActiveTab('search')
            }}
            className="cursor-pointer rounded-2xl p-4 transition"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)'
            }}
          >
            {/* DATE */}
            <p className="text-xs opacity-60 mb-2">
              {new Date(chatItem.lastUpdated).toLocaleString()}
            </p>

            {/* TITLE */}
            <h2 className="font-medium mb-1">
              {chatItem.title}
            </h2>

            {/* SUBTEXT */}
            <p className="text-xs opacity-50">
              Chat session
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chats