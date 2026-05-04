"use client";

import { motion } from "framer-motion";
import { CheckCircle, HeartHandshake, MapPin, Users } from "lucide-react";

import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white text-slate-700">
      {/* HERO */}
      <HeroSection />

      {/* ================= STATS ================= */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              ["5,000+", "Tasks Analyzed"],
              ["120+", "Companies"],
              ["10,000+", "Risk Reports"],
              ["100%", "Digital System"],
            ].map(([value, label], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-2xl border border-slate-100 bg-white/80 shadow-sm backdrop-blur transition hover:shadow-md">
                  <CardContent className="p-6 text-center">
                    <p className="font-extrabold text-3xl text-indigo-500">{value}</p>
                    <p className="mt-2 text-slate-500 text-sm">{label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-bold text-3xl md:text-4xl">Why ErgoRAMMSys</h2>

          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            Manual material handling activities often pose serious ergonomic risks. ErgoRAMMSys helps organizations
            identify, assess, and reduce these risks to create safer and more productive workplaces.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <Feature
              icon={<CheckCircle />}
              title="Risk Identification"
              desc="Detect ergonomic hazards in manual tasks."
            />
            <Feature icon={<Users />} title="Worker Safety" desc="Reduce injury risk and improve well-being." />
            <Feature icon={<HeartHandshake />} title="Productivity" desc="Increase efficiency through safer work." />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-center font-bold text-3xl md:text-4xl">Core Features</h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <FeatureCard icon={<MapPin />} title="Task Analysis">
              Evaluate tasks using ergonomic standards.
            </FeatureCard>

            <FeatureCard icon={<CheckCircle />} title="Risk Scoring">
              Automatic ergonomic risk calculation.
            </FeatureCard>

            <FeatureCard icon={<Users />} title="Reporting">
              Generate structured reports instantly.
            </FeatureCard>

            <FeatureCard icon={<HeartHandshake />} title="Improvement">
              Get actionable safety recommendations.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-center font-bold text-3xl md:text-4xl">How It Works</h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Input Task Data",
              "Select Method",
              "Risk Calculation",
              "Generate Report",
              "Review Results",
              "Take Action",
            ].map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {i + 1}. {title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center">
        <div className="container mx-auto max-w-3xl px-6">
          <Card className="rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-400 text-white shadow-md">
            <CardContent className="px-6 py-14">
              <h2 className="font-bold text-3xl md:text-4xl">Start Improving Workplace Safety</h2>

              <p className="mt-6 text-lg text-white/90">
                Identify risks, improve safety, and optimize productivity with MMH-ERAS.
              </p>

              <Button asChild size="lg" className="mt-10 bg-white text-indigo-600 hover:bg-white/90">
                <a href="/login">Get Started</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-6 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} MMH-ERAS
      </footer>
    </div>
  );
}

/* ================= COMPONENT ================= */

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div whileHover={{ y: -6 }}>
      <Card className="rounded-xl border border-slate-100 bg-white text-center shadow-sm transition hover:shadow-md">
        <CardContent className="p-6">
          <div className="mb-4 flex justify-center text-indigo-500">{icon}</div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="mt-2 text-slate-500 text-sm">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FeatureCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-2 text-indigo-500">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-500 text-sm">{children}</CardContent>
    </Card>
  );
}
