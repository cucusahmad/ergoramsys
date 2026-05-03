"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { GoogleButton } from "../_components/social-auth/google-button";

export default function LoginV1() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (email === "admin@gmail.com" && password === "12345678") {
      router.push("/asessment"); // 🔥 redirect
    } else {
      setError("Email atau password salah!");
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
      {/* ================= LEFT SIDE ================= */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600" />

        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center px-10 space-y-8"
        >
          {/* LOGO */}
          <Image
            src="/images/logobaru.png"
            alt="Logo"
            width={126}
            height={126}
            className="object-contain drop-shadow-lg"
            priority
          />

          <div>
            <h1 className="text-4xl font-bold text-white mb-3">ErgoRAMMSYs</h1>
            <p className="text-white/80 text-lg max-w-md">
              log in to ergonomic risks in manual handling activities platform.
            </p>
          </div>

          {/* WORKER IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-[280px] h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur">
              <Image src="/images/worker.png" alt="Worker" fill className="object-cover" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl border bg-white shadow-xl p-8 space-y-6">
            {/* LOGO */}
            <div className="text-center space-y-3">
              <Image src="/images/logobaru.png" alt="ErgoRAMMSYs" width={90} height={90} className="mx-auto" />

              <h2 className="text-2xl font-semibold text-slate-800">Login to ErgoRAMMSYs</h2>

              <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            {/* 🔥 LOGIN FORM LANGSUNG */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link prefetch={false} href="register" className="text-blue-600 hover:underline font-medium">
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
