import { useState, useRef, useEffect } from 'react'
import { Plus, History, Library, Settings, HelpCircle, LogOut, Search, SlidersHorizontal, Share2, Zap, ArrowRight, Paperclip, Mic, ArrowUp, Gavel } from 'lucide-react'
import './App.css'

const getMockData = (problem) => ({
  problem: problem,
  solution_1: "The Real-Time Edge: Latency Optimization in Pit Wall Telemetry",
  solution_1_desc: "Focuses on the low-level C++ and Rust implementations required for processing 1.1 million data points per second. Explores the hardware-software handshake at the edge of the circuit.",
  solution_1_tags: ["Telemetry", "Low-latency", "Edge Computing"],
  solution_2: "Simulating Chaos: Monte Carlo Methods in Race Strategy Software",
  solution_2_desc: "A high-level overview of Python-based simulation frameworks used by strategists to predict tyre degradation and safety car windows. Focuses on the \"Human-in-the-loop\" UI/UX.",
  solution_2_tags: ["Simulation", "Python", "Decision Support"],
  judge: {
    solution_1_score: 8.5,
    solution_2_score: 7.0,
    solution_1_reasoning: "Automated comparative quality assessment",
    solution_2_reasoning: "Automated comparative quality assessment"
  }
})

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'user', 
      content: 'Write an article for developers in F1 racing',
      time: 'SENT 2M AGO'
    },
    {
      role: 'assistant',
      data: getMockData('Write an article for developers in F1 racing')
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessageText = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessageText, time: 'JUST NOW' }])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', data: getMockData(userMessageText) }
      ])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFBFF] text-slate-800 font-sans">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#F5F7FB] border-r border-[#E5E7EB]/50 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
        <div>
          {/* Logo Area */}
          <div className="px-6 py-8">
            <h1 className="text-xl font-bold text-blue-700">Luminous AI</h1>
            <p className="text-sm text-slate-500 font-medium">Premium Assistant</p>
          </div>

          {/* Nav Links */}
          <nav className="px-4 space-y-1">
            <button className="w-full flex items-center gap-3 bg-white text-blue-600 px-4 py-3 rounded-xl shadow-sm text-sm font-semibold border border-blue-50/50 hover:shadow-md transition-shadow">
              <Plus size={18} />
              New Chat
            </button>

            <div className="pt-6 pb-2 px-2">
              <div className="space-y-1">
                <NavItem icon={<History size={18} />} label="History" />
                <NavItem icon={<Library size={18} />} label="Collections" />
                <NavItem icon={<Settings size={18} />} label="Settings" />
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Sidebar */}
        <div className="px-4 pb-6 space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-colors text-sm">
            Upgrade to Pro
          </button>
          
          <div className="space-y-1 px-2">
            <NavItem icon={<HelpCircle size={18} />} label="Help" />
            <NavItem icon={<LogOut size={18} />} label="Sign Out" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-[#fdfdff] relative">
        
        {/* Header */}
        <header className="h-[72px] flex-none px-8 flex items-center justify-between border-b border-slate-100/50 bg-white/50 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-8">
            <div className="font-semibold text-slate-800 text-lg border-r border-slate-200 pr-8">Luminous AI</div>
            <div className="flex gap-6 text-sm font-medium">
              <button className="text-blue-600">Chat</button>
              <button className="text-slate-400 hover:text-slate-600 transition-colors">Canvas</button>
              <button className="text-slate-400 hover:text-slate-600 transition-colors">Plugins</button>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={14} className="text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search insights..." 
                className="bg-[#F0F2F9] text-sm rounded-full pl-9 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-100 border-none placeholder-slate-400"
              />
            </div>
            <button className="text-slate-400 hover:text-slate-600"><SlidersHorizontal size={18} /></button>
            <button className="text-slate-400 hover:text-slate-600"><Share2 size={18} /></button>
            <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto pb-[140px] pt-8">
          <div className="max-w-[1000px] mx-auto px-8 space-y-12">
            
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.role === 'user' ? (
                  <div className="flex flex-col items-end w-full mb-10">
                    <div className="bg-[#4169E1] text-white px-6 py-4 rounded-2xl rounded-tr-sm shadow-md max-w-xl text-[15px] leading-relaxed">
                      {msg.content}
                    </div>
                    {msg.time && (
                      <span className="text-[11px] font-medium text-slate-400 mt-2 tracking-wider lowercase">
                        {msg.time}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 mb-6">
                    
                    {/* AI Section Header Spacer */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-xl shadow-sm hover:shadow flex items-center justify-center shrink-0">
                        <Zap size={20} className="fill-white/20" />
                      </div>
                      <h2 className="text-[22px] font-bold text-slate-800 tracking-tight">Analysis & Drafting</h2>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                      
                      {/* Card 1 */}
                      <div className="bg-[#F8F9FE] rounded-3xl p-8 border border-white/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow relative">
                        <div className="flex justify-between items-start mb-8">
                          <span className="bg-[#60C9F8] text-white text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase">
                            Solution 1: Technical Focus
                          </span>
                          <span className="text-3xl font-bold text-slate-200">01</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-4 pr-4">
                          {msg.data.solution_1}
                        </h3>
                        
                        <p className="text-[14px] text-slate-500 leading-relaxed mb-8">
                          {msg.data.solution_1_desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-10">
                          {msg.data.solution_1_tags.map(tag => (
                            <span key={tag} className="bg-white border border-slate-100 text-slate-500 text-[12px] font-medium px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-shadow">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                          View Draft <ArrowRight size={16} />
                        </button>
                      </div>

                      {/* Card 2 */}
                      <div className="bg-[#F8F9FE] rounded-3xl p-8 border border-white/50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow relative">
                        <div className="flex justify-between items-start mb-8">
                          <span className="bg-[#FCAE8F] text-[#9A3412] text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full uppercase">
                            Solution 2: Strategy Focus
                          </span>
                          <span className="text-3xl font-bold text-slate-200">02</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-800 leading-tight mb-4 pr-4">
                          {msg.data.solution_2}
                        </h3>
                        
                        <p className="text-[14px] text-slate-500 leading-relaxed mb-8">
                          {msg.data.solution_2_desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-10">
                          {msg.data.solution_2_tags.map(tag => (
                            <span key={tag} className="bg-white border border-slate-100 text-slate-500 text-[12px] font-medium px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-shadow">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                          View Draft <ArrowRight size={16} />
                        </button>
                      </div>

                    </div>

                    {/* Judge Recommendation */}
                    <div className="mt-6 bg-white rounded-3xl p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] border border-slate-100/50 relative overflow-hidden">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#FFDED4] text-[#D97053] rounded-full flex items-center justify-center shrink-0 shadow-inner">
                          <Gavel size={22} className="stroke-[2.5]" />
                        </div>
                        <div>
                          <h3 className="text-[19px] font-bold text-slate-800">Judge Recommendation</h3>
                          <p className="text-[13px] text-slate-500">{msg.data.judge.solution_1_reasoning}</p>
                        </div>
                      </div>

                      <div className="flex justify-between gap-12 pt-6">
                        <div className="flex-1 flex justify-between items-end border-b border-slate-100 pb-2">
                          <span className="text-[12px] font-bold text-slate-400 tracking-wider uppercase mb-1">Score Solution 1</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-[42px] font-bold leading-none text-[#2563EB] tracking-tight">{msg.data.judge.solution_1_score}</span>
                            <span className="text-xl font-bold text-slate-200">/10</span>
                          </div>
                        </div>
                        <div className="flex-1 flex justify-between items-end border-b border-slate-100 pb-2">
                          <span className="text-[12px] font-bold text-slate-400 tracking-wider uppercase mb-1">Score Solution 2</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-[42px] font-bold leading-none text-slate-300 tracking-tight">{msg.data.judge.solution_2_score.toFixed(1)}</span>
                            <span className="text-xl font-bold text-slate-200">/10</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
               <div className="flex items-center gap-4 mb-8 translate-y-4">
                 <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl shadow-sm flex items-center justify-center shrink-0">
                   <Zap size={20} className="animate-pulse" />
                 </div>
                 <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
               </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar overlapping at the bottom */}
        <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-center pointer-events-none">
          <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-[1000px] bg-white rounded-full p-2.5 pb-2.5 pl-4 pr-3 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-slate-200/60 flex items-center gap-3 pointer-events-auto"
          >
            <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors p-2">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Luminous AI to refine these drafts..."
              className="flex-1 bg-transparent text-[15px] focus:outline-none placeholder-slate-400 py-2 h-full"
              disabled={isLoading}
            />
            <button type="button" className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
              <Mic size={18} />
            </button>
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="bg-[#4169E1] hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md disabled:opacity-50 transition-colors"
            >
              <ArrowUp size={20} className="stroke-[2.5]" />
            </button>
          </form>
        </div>

        {/* Subtext under input bar */}
        <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
           <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">
             Artificial Intelligence can provide varying perspectives. Review carefully.
           </p>
        </div>

      </main>
    </div>
  )
}

function NavItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
      <span className="text-slate-400">{icon}</span>
      {label}
    </button>
  )
}
