"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { Activity, ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react"; // 👉 Ganti Mail jadi User
import { signIn } from "next-auth/react"; // 👉 Import fungsi login dari NextAuth

export default function LoginV1() {
  const router = useRouter();

  // 👉 Ubah state email menjadi username
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 👉 Ubah fungsi handleSubmit menjadi async
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 👉 Panggil fungsi signIn bawaan NextAuth
      const res = await signIn("credentials", {
        redirect: false, // Jangan redirect otomatis, kita tangani secara manual
        username: username,
        password: password,
      });

      if (res?.error) {
        // Jika login gagal (password salah / user tidak ada)
        setError("Username atau password salah!");
        setIsLoading(false);
      } else {
        // Jika login sukses
        router.push("/asessment"); // Arahkan ke halaman utama
        router.refresh(); // Refresh agar status sesi di server terupdate
      }
    } catch (_err) {
      setError("Terjadi kesalahan sistem.");
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 font-sans">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg4.png"
          alt="Background ERGORAMMSys"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ================= CONTENT CONTAINER ================= */}
      <div className="relative z-10 flex w-full max-w-[460px] flex-col items-center">
        {/* LOGO & TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex w-full flex-col items-center text-center"
        >
          <div className="group relative mb-6 cursor-default rounded-3xl border border-white/30 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
            <div className="absolute -top-2 -right-2 rounded-full bg-[#f6bc1b] p-1.5 text-[#164d98] shadow-lg">
              <Activity className="h-5 w-5" />
            </div>
            <Image
              src="/images/logobaru.png"
              alt="Logo ERGORAMMSys"
              width={160}
              height={160}
              className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>

          <h1 className="mb-3 font-extrabold text-4xl text-blue-700 tracking-tight drop-shadow-md sm:text-5xl">
            ErgoRAMMSys
          </h1>
          <p className="mx-auto max-w-sm rounded-full border border-white/20 bg-[#164d98]/60 px-4 py-1.5 font-semibold text-[#f6bc1b] text-sm leading-relaxed drop-shadow-sm backdrop-blur-md sm:text-base">
            Ergonomic Risk Assessment for Manual Material Handling System
          </p>
        </motion.div>

        {/* LOGIN FORM CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full space-y-6 rounded-[2rem] border border-white/50 bg-white/95 p-8 shadow-[0_8px_32px_rgb(0,0,0,0.3)] backdrop-blur-xl sm:p-10"
        >
          <div className="space-y-1.5 text-center">
            <h2 className="font-bold text-2xl text-[#164d98] tracking-tight">System Login</h2>
            <p className="text-slate-500 text-sm">Enter your credentials to access the dashboard</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-red-100 bg-red-50 p-3 text-center font-medium text-red-600 text-sm shadow-sm"
            >
              {error}
            </motion.div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="font-semibold text-[#164d98] text-sm">
                Username
              </label>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-[#164d98]" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="dummy_admin"
                  className="w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pr-4 pl-11 text-slate-800 text-sm transition-all focus:border-[#f6bc1b] focus:outline-none focus:ring-4 focus:ring-[#f6bc1b]/20"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-semibold text-[#164d98] text-sm">
                  Password
                </label>
                <Link
                  href="#"
                  className="font-bold text-[#164d98] text-xs transition-colors hover:text-[#f6bc1b] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="group relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-[#164d98]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pr-12 pl-11 text-slate-800 text-sm transition-all focus:border-[#f6bc1b] focus:outline-none focus:ring-4 focus:ring-[#f6bc1b]/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-[#f6bc1b] focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative mt-4 flex w-full items-center justify-center rounded-xl border border-transparent bg-[#f6bc1b] px-4 py-4 font-bold text-[#164d98] text-sm shadow-[0_8px_20px_rgba(246,188,27,0.4)] transition-all hover:bg-[#eab308] hover:shadow-[0_8px_25px_rgba(246,188,27,0.5)] focus:outline-none focus:ring-4 focus:ring-[#f6bc1b]/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 animate-spin text-[#164d98]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Authenticating...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Log in to Assessment</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
