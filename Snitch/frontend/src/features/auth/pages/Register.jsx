import React, { useState } from 'react';
import {useAuth} from '../hook/useAuth'
import { useNavigate } from 'react-router';

const Register = () => {

  const navigate = useNavigate();
  const {handleRegister} = useAuth();

  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      fullname: fullName,       
      contact: contactNumber,
      email,
      password,
      isSeller
    })
    navigate("/")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0e0e0e] text-white font-sans selection:bg-[#39FF14] selection:text-black">
      {/* Container - Ample Breathing Space */}
      <div className="flex w-full max-w-310 flex-col md:flex-row rounded-3xl overflow-hidden bg-[#131313] mx-4 shadow-2xl shadow-black/80 my-8">
        
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
                Curated <br/> <span className="font-bold text-[#39FF14]">Fashion.</span>
              </h1>
              <p className="text-gray-400 max-w-sm text-base leading-relaxed">
                Discover seamless, minimal, and premium quality clothing. Join to access exclusive apparel drops.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-7/12 lg:w-1/2 p-10 sm:p-16 md:p-16 lg:p-24 xl:px-32 flex flex-col justify-center">
          <div className="w-full mx-auto space-y-14">
            
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight">Register</h2>
              <p className="text-gray-500 text-sm lg:text-base">Initialize your credentials below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Full Name */}
              <div className="group relative">
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="peer w-full bg-transparent px-0 py-3 text-white placeholder-transparent focus:outline-none border-b border-gray-800 focus:border-[#39FF14] transition-colors duration-300"
                  placeholder="Full Name"
                />
                <label 
                  htmlFor="fullName" 
                  className="absolute left-0 -top-6 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#39FF14]"
                >
                  Full Name
                </label>
              </div>

              {/* Contact Number */}
              <div className="group relative">
                <input
                  id="contactNumber"
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                  className="peer w-full bg-transparent px-0 py-3 text-white placeholder-transparent focus:outline-none border-b border-gray-800 focus:border-[#39FF14] transition-colors duration-300"
                  placeholder="Contact Number"
                />
                <label 
                  htmlFor="contactNumber" 
                  className="absolute left-0 -top-6 text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#39FF14]"
                >
                  Contact Number
                </label>
              </div>

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

              {/* isSeller Checkbox */}
              <div className="flex items-center pt-2">
                <div className="relative flex items-center">
                  <input
                    id="isSeller"
                    type="checkbox"
                    checked={isSeller}
                    onChange={(e) => setIsSeller(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border border-gray-700 bg-transparent transition-all checked:border-[#39FF14] checked:bg-[#39FF14] hover:border-[#39FF14] focus:outline-none focus:ring-2 focus:ring-[#39FF14]/50 focus:ring-offset-2 focus:ring-offset-[#131313]"
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0e0e0e] opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <label htmlFor="isSeller" className="ml-4 cursor-pointer text-sm md:text-base text-gray-400 select-none hover:text-gray-200 transition-colors">
                  Register as a Seller
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#39FF14] px-8 py-4 lg:py-5 text-sm lg:text-base font-bold tracking-widest text-[#0e0e0e] transition-all duration-300 hover:bg-[#32e612] hover:shadow-[0_0_25px_rgba(57,255,20,0.3)] focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:ring-offset-2 focus:ring-offset-[#131313]"
                >
                  <span className="relative z-10 uppercase">Access Granted</span>
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

              {/* Divider */}
              <div className="relative flex items-center justify-center pt-2">
                <div className="grow border-t border-gray-800"></div>
                <span className="shrink-0 px-4 text-xs text-gray-500 uppercase tracking-widest">or</span>
                <div className="grow border-t border-gray-800"></div>
              </div>

              {/* Google Continue Button */}
              <div>
                <a 
                  href="/api/auth/google"
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-700 bg-transparent px-8 py-4 lg:py-5 text-sm lg:text-base font-medium text-white transition-all duration-300 hover:bg-[#1a1a1a] hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#131313]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </a>
              </div>

              {/* Footer text link to login */}
              <div className="pt-2 text-center">
                 <p className="text-sm text-gray-400">
                   Already have an account? <span onClick={() => navigate('/login')} className="cursor-pointer font-bold text-[#39FF14] hover:underline hover:text-white transition-colors duration-200">Authenticate</span>
                 </p>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
