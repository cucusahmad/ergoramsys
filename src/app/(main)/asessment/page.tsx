"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { Activity, ArrowRight, BarChart3, ClipboardList, Info, ShieldAlert, UserCheck } from "lucide-react";

export default function AssessmentIntroPage() {
  const steps = [
    {
      icon: <UserCheck className="h-6 w-6 text-blue-600" />,
      title: "1. Worker Information",
      description: "Fill in the basic details of the worker, including their role, age, and experience level.",
    },
    {
      icon: <Activity className="h-6 w-6 text-blue-600" />,
      title: "2. Posture & Movement",
      description:
        "Observe and score the worker's body postures, repetition frequency, and maximum acceptable weight limit (MDL).",
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-blue-600" />,
      title: "3. Task Evaluation",
      description: "Assess external factors such as load weight, job demand, and environmental conditions.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "4. Result & Risk Level",
      description: "Review the automatically calculated total score and identify the ergonomic risk level.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-blue-100 p-3">
            <ShieldAlert className="h-8 w-8 text-blue-700" />
          </div>
          <h1 className="font-extrabold text-4xl text-slate-900 tracking-tight">
            Welcome to <span className="text-blue-700">ErgoRAMMSys</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Ergonomic Risk Assessment for Manual Material Handling System. This tool is designed to help you
            systematically evaluate and mitigate physical risks in the workplace.
          </p>
        </motion.div>

        {/* Guidelines / Tata Cara Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-xl"
        >
          <div className="p-8 md:p-10">
            <h2 className="mb-8 border-b pb-4 font-bold text-2xl text-slate-800">Assessment Guidelines</h2>

            <div className="grid gap-8 md:grid-cols-2">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-lg text-slate-800">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notice */}
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <Info className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <h4 className="font-semibold text-amber-800">Important Notice</h4>
                <p className="mt-1 text-amber-700 text-sm leading-relaxed">
                  Please ensure you have observed the worker's routine for a sufficient amount of time (at least 15
                  minutes or multiple work cycles) before starting this assessment to guarantee accurate scoring.
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col items-center justify-between gap-4 border-slate-100 border-t bg-slate-50 p-6 sm:flex-row md:p-8">
            <p className="font-medium text-slate-500 text-sm">Ready to evaluate the workplace?</p>

            {/* Ganti href sesuai dengan alamat halaman form Anda */}
            <Link href="/asessment/asessform">
              <button className="group flex items-center gap-2 rounded-xl bg-[#f6bc1b] px-8 py-3.5 font-bold text-[#164d98] text-sm shadow-[0_4px_14px_rgba(246,188,27,0.4)] transition-all hover:bg-[#eab308] hover:shadow-[0_6px_20px_rgba(246,188,27,0.5)]">
                Start Assessment
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
