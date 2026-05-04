"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { School } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-28">
      {/* SOFT BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="container relative mx-auto grid max-w-7xl items-center gap-20 px-6 md:grid-cols-2">
        {/* ================= LEFT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          {/* 🔥 LOGO ADDED HERE */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logobaru.png"
              alt="ERGORAMMSys Logo"
              width={200}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <Badge className="w-fit gap-2 border border-indigo-100 bg-indigo-50 px-4 py-1 text-indigo-600 text-sm">
            <School size={16} />
            Ergonomic Risk Assessment System
          </Badge>

          <h1 className="font-extrabold text-4xl leading-tight md:text-5xl">
            Improve Workplace Safety with
            <span className="block bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent">
              ERGORAMMSys
            </span>
          </h1>

          <p className="max-w-xl text-lg text-slate-500">
            Manual Material Handling Tasks – Ergonomic Risk Assessment System (ERGORAMMSys) is a modern platform
            designed to assess and minimize ergonomic risks in manual handling activities.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-xl bg-indigo-500 px-8 py-6 shadow-sm hover:bg-indigo-600">
              <a href="/auth/login">Get Started</a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-slate-200 px-8 py-6 text-slate-600 hover:bg-slate-50"
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center"
        >
          {/* PULSE BACKGROUND */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute h-[440px] w-[440px] rounded-full bg-indigo-200/20 blur-3xl"
          />

          {/* ROTATING RING */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute h-[420px] w-[420px] rounded-full border border-indigo-200 border-dashed"
          />

          {/* IMAGE CARD */}
          <Card className="relative rounded-full bg-white/70 p-3 shadow-md backdrop-blur">
            <div className="relative h-[360px] w-[360px] overflow-hidden rounded-full">
              <Image src="/images/HeroSection.png" alt="MMH-ERAS System" fill priority className="object-cover" />
            </div>
          </Card>

          {/* FLOATING INFO */}
          <Floating label="⚠️ Risk Identification" className="-top-4 -left-14" />
          <Floating label="📊 Reports" className="top-1/2 -right-16" />
          <Floating label="✅ Safety" className="right-2 -bottom-4" />
        </motion.div>
      </div>
    </section>
  );
}

/* ================= FLOATING COMPONENT ================= */
function Floating({ label, className }: { label: string; className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className={`absolute ${className}`}
    >
      <Card className="border border-slate-100 bg-white/80 px-4 py-2 font-medium text-sm shadow-sm backdrop-blur">
        {label}
      </Card>
    </motion.div>
  );
}
