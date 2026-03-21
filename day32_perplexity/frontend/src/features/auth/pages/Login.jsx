import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const submitForm = async (event) => {
        event.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    if (!loading && user) return <Navigate to="/" replace />

    return (
        <section className="relative flex min-h-screen w-full items-center justify-center bg-[#050505] p-6 font-sans antialiased">
            
            {/* VAPOR-SHADOW BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-150 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800/10 blur-[120px]" />
                <div className="absolute left-1/2 top-1/2 h-100 w-75 -translate-x-1/2 -translate-y-[60%] rounded-full bg-zinc-900/80 blur-[80px]" />
            </div>

            {/* THE GLASS CONTAINER */}
            <div className="relative z-10 w-full max-w-105 overflow-hidden rounded-[40px] border border-white/10 bg-white/2 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl lg:p-12">
                
                {/* Glossy top reflection */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

                <header className="mb-10 text-center">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 italic">vandru AI</p>
                    <h1 className="text-3xl font-bold tracking-tight text-white/90">
                        Log In, Start Your <br /> AI Journey
                    </h1>
                </header>

                <form onSubmit={submitForm} className="space-y-5">
                    
                    {/* Compact Email Input */}
                    <div className="space-y-1.5">
                        <label className="ml-4 text-[10px] font-bold uppercase tracking-widest text-white/20">Email</label>
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-white/60">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-2xl border border-white/5 bg-white/3 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-white/10 focus:bg-white/6"
                            />
                        </div>
                    </div>

                    {/* Compact Password Input */}
                    <div className="space-y-1.5">
                        <label className="ml-4 text-[10px] font-bold uppercase tracking-widest text-white/20">Password</label>
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-white/60">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full rounded-2xl border border-white/5 bg-white/3 py-3.5 pl-11 pr-11 text-sm text-white outline-none transition-all focus:border-white/10 focus:bg-white/6"
                            />
                        </div>
                    </div>

                    {/* Remember & Forgot - Tightened */}
                    <div className="flex items-center justify-between px-2 pt-1 text-[10px] font-bold uppercase tracking-wider">
                        <label className="flex items-center gap-2 text-white/20 cursor-pointer hover:text-white/40 transition-colors">
                            <input type="checkbox" className="h-3 w-3 rounded border-white/10 bg-white/5 accent-white/40" /> Remember me
                        </label>
                        <button type="button" className="text-white/20 hover:text-white transition-colors">Forgot Password?</button>
                    </div>

                    {/* THE GLOSS BUTTON */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full overflow-hidden rounded-2xl bg-linear-to-b from-white/10 to-white/2 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-20"
                        >
                            {/* Hover shine effect */}
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            
                            {loading ? 'Validating...' : 'Login'}
                        </button>
                    </div>
                </form>

                <footer className="mt-10 text-center">
                    <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
                        Don't have an account?{' '}
                        <Link to="/register" className="ml-1 text-white/50 hover:text-white transition-colors underline underline-offset-4">
                            Create Identity
                        </Link>
                    </p>
                </footer>
            </div>
        </section>
    )
}

export default Login