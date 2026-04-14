import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0e0e0e] text-white font-sans selection:bg-[#39FF14] selection:text-black">
      {/* Container - Ample Breathing Space */}
      <div className="flex w-full max-w-[1240px] flex-col md:flex-row rounded-3xl overflow-hidden bg-[#131313] mx-4 shadow-2xl shadow-black/80 my-8">
        
        {/* Left Decorative Image Panel */}
        <div className="relative hidden w-full md:block md:w-5/12 lg:w-1/2 p-12 lg:p-16 overflow-hidden bg-[#0a0a0a]">
          {/* Abstract glowing orb and lines as a replacement for the generated image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-top opacity-40 mix-blend-luminosity grayscale contrast-125"></div>
          
          {/* Neon green tint overlay */}
          <div className="absolute inset-0 bg-[#39FF14]/5 mix-blend-overlay"></div>
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#39FF14]/20 blur-[100px]"></div>
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#39FF14]/10 blur-[120px]"></div>
          
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-16">
                <div className="h-3 w-3 rounded-full bg-[#39FF14] shadow-[0_0_12px_#39FF14]"></div>
                <span className="text-sm font-semibold tracking-[0.2em] text-gray-400">SNITCH APPAREL</span>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-tight">
                Welcome <br/> <span className="font-bold text-[#39FF14]">Back.</span>
              </h1>
              <p className="text-gray-400 max-w-sm text-base leading-relaxed">
                Connect your credentials. Re-enter the high-frequency network and access your drops.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-10 sm:p-16 md:p-16 lg:p-24 xl:px-32 flex flex-col justify-center">
          <div className="w-full mx-auto space-y-14">
            
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight">Login</h2>
              <p className="text-gray-500 text-sm lg:text-base">Authenticate your session below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Email */}
              <div className="group relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="peer w-full bg-transparent px-0 py-3 text-white placeholder-transparent focus:outline-none border-b border-gray-800 focus:border-[#39FF14] transition-colors duration-300"
                  placeholder="Email"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 -top-6 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#39FF14]"
                >
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="group relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="peer w-full bg-transparent px-0 py-3 text-white placeholder-transparent focus:outline-none border-b border-gray-800 focus:border-[#39FF14] transition-colors duration-300"
                  placeholder="Password"
                />
                <label 
                  htmlFor="password" 
                  className="absolute left-0 -top-6 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#39FF14]"
                >
                  Password
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#39FF14] px-8 py-4 lg:py-5 text-sm lg:text-base font-bold tracking-widest text-[#0e0e0e] transition-all duration-300 hover:bg-[#32e612] hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:ring-offset-2 focus:ring-offset-[#131313]"
                >
                  <span className="relative z-10 uppercase">Authenticate</span>
                  <svg 
                    className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Footer text link to registration */}
              <div className="pt-4 text-center">
                 <p className="text-sm text-gray-400">
                   Don't have an account? <span onClick={() => navigate('/register')} className="cursor-pointer font-bold text-[#39FF14] hover:underline hover:text-white transition-colors duration-200">Join Now</span>
                 </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
