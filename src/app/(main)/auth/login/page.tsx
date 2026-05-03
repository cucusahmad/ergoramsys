"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Activity } from "lucide-react";

export default function LoginV1() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "12345678") {
        router.push("/asessment"); // 🔥 redirect
      } else {
        setError("Email atau password salah!");
        setIsLoading(false);
      }
    }, 800);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden font-sans p-6">
      
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg4.png" // 🔥 Pastikan file ada di folder public/images/bg.png
          alt="Background ErgoRAMMSYs"
          fill
          className="object-cover object-center"
          priority // Memuat gambar ini lebih dulu karena ini background utama
        />
        {/* Overlay Biru Gelap agar gambar tidak terlalu terang dan teks tetap terbaca */}
       
      
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center">
        
        {/* LOGO & TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex w-full flex-col items-center text-center"
        >
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl mb-6 relative group cursor-default">
            {/* Dekorasi kecil di sudut logo */}
            <div className="absolute -top-2 -right-2 bg-[#f6bc1b] text-[#164d98] p-1.5 rounded-full shadow-lg">
              <Activity className="h-5 w-5" />
            </div>
            <Image
              src="/images/logobaru.png"
              alt="Logo ErgoRAMMSYs"
              width={160}
              height={160}
              className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
          
         <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 tracking-tight drop-shadow-md mb-3">
  ErgoRAMMSYs
</h1>
          {/* Full English Abbreviation */}
          <p className="text-[#f6bc1b] font-semibold text-sm sm:text-base max-w-sm mx-auto leading-relaxed drop-shadow-sm px-4 py-1.5 bg-[#164d98]/60 backdrop-blur-md rounded-full border border-white/20">
            Ergonomic Risk Assessment for Manual Material Handling System
          </p>
        </motion.div>

        {/* LOGIN FORM CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_32px_rgb(0,0,0,0.3)] border border-white/50 p-8 sm:p-10 space-y-6"
        >
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl font-bold text-[#164d98] tracking-tight">System Login</h2>
            <p className="text-slate-500 text-sm">Enter your credentials to access the dashboard</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl text-center font-medium shadow-sm"
            >
              {error}
            </motion.div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1.5">
                         <label
  htmlFor="email"
  className="font-semibold text-[#164d98] text-sm"
>
  Email Address
</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#164d98] transition-colors" />
                </div>
             <input
  id="email"
  type="email"
  placeholder="admin@gmail.com"
  className="w-full border-2 border-slate-200 bg-white rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 transition-all focus:outline-none focus:ring-4 focus:ring-[#f6bc1b]/20 focus:border-[#f6bc1b]"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
              <label
  htmlFor="password"
  className="font-semibold text-[#164d98] text-sm"
>
  Password
</label>
                <Link href="#" className="text-xs font-bold text-[#164d98] hover:text-[#f6bc1b] transition-colors hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#164d98] transition-colors" />
                </div>
               <input
  id="password"
  type={showPassword ? "text" : "password"}
  placeholder="••••••••"
  className="w-full border-2 border-slate-200 bg-white rounded-xl pl-11 pr-12 py-3.5 text-sm text-slate-800 transition-all focus:outline-none focus:ring-4 focus:ring-[#f6bc1b]/20 focus:border-[#f6bc1b]"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#f6bc1b] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-[#164d98] bg-[#f6bc1b] hover:bg-[#eab308] focus:outline-none focus:ring-4 focus:ring-[#f6bc1b]/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(246,188,27,0.4)] hover:shadow-[0_8px_25px_rgba(246,188,27,0.5)] mt-4"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-[#164d98]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Log in to Assessment</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}