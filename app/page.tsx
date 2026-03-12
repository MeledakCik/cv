"use client";
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Activity, BarChart3 } from "lucide-react"
import Link from "next/link"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  Tooltip
} from "recharts";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const skillData = [
    { subject: 'Cyber Sec', A: 95, fullMark: 100 },
    { subject: 'Python', A: 90, fullMark: 100 },
    { subject: 'Web Dev', A: 85, fullMark: 100 },
    { subject: 'Database', A: 80, fullMark: 100 },
    { subject: 'Automation', A: 88, fullMark: 100 },
    { subject: 'Bug Hunt', A: 92, fullMark: 100 },
  ];

  // Data untuk Line Chart (Simulasi Traffic/Activity)
  const trafficData = [
    { name: 'Mon', req: 400 },
    { name: 'Tue', req: 700 },
    { name: 'Wed', req: 600 },
    { name: 'Thu', req: 900 },
    { name: 'Fri', req: 1100 },
    { name: 'Sat', req: 800 },
    { name: 'Sun', req: 950 },
  ];

  const categories = [
    { title: "Python", desc: "Testing bug, hacking, AI, & automatic generator.", icon: "🐍" },
    { title: "Praktik & Proyek", desc: "Cek karya saya di github.com/K4K4NG.", icon: "🛠️" },
    { title: "Web", desc: "Membangun website simpel & kompleks (Next.js, Tailwind).", icon: "🌐" },
    { title: "Cyber Security", desc: "Penetration testing dan keamanan server/data.", icon: "🛡️" },
    { title: "Code Pemograman", desc: "Rust, Go, C++, PHP, JS, Java, Kotlin, dll.", icon: "💻" },
    { title: "Hobi", desc: "Membangun aplikasi, touring, dan mendaki gunung.", icon: "🏔️" },
  ]

  return (
    <main className="min-h-screen bg-[#08090a] text-[#e0e0e0] font-mono selection:bg-primary/30">
      <Navbar />

      {/* HERO SECTION (Tetap sama) */}
      <section className="relative overflow-hidden p-12 border-b border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-primary mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.5em]">Identity Verified - Kasyaf Anugrah</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
              I'AM <span className="text-primary italic">KASYAF</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl">
              Fokus pada <span className="text-white">Cyber Security</span> dan <span className="text-white">Bug Testing</span>.
              <Link href="#" className="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary"> Web Saya</Link> — menyediakan akses script eksklusif.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/80 text-black px-10 h-14 rounded-xl text-md font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                  OPEN TERMINAL
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS SECTION - CHART BARU */}
      <section className="container mx-auto px-4 py-20 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="bg-[#0d0f14] p-8 rounded-3xl border border-white/5 min-h-[400px]">
            <div className="flex items-center gap-2 mb-8 text-primary uppercase text-xs tracking-widest font-bold">
              <Activity size={16} /> Skill_Capability_Map.v1
            </div>
            <div className="h-[300px] w-full">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
                    <Radar
                      name="Kasyaf"
                      dataKey="A"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Line Chart Container */}
          <div className="bg-[#0d0f14] p-8 rounded-3xl border border-white/5 min-h-[400px]">
            <div className="flex items-center gap-2 mb-8 text-primary uppercase text-xs tracking-widest font-bold">
              <BarChart3 size={16} /> Weekly_Security_Audit.log
            </div>
            <div className="h-[300px] w-full">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <XAxis dataKey="name" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0d0f14', border: '1px solid #222', borderRadius: '8px' }}
                      itemStyle={{ color: '#06b6d4' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="req"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      dot={{ fill: '#06b6d4', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION (Tetap sama) */}
      <section className="container mx-auto px-4 py-24">
        {/* ... (Konten kategori kamu tetap di sini) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, i) => (
            <div key={i} className="group relative bg-[#0d0f14] p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden">
              {/* Konten kategori kamu */}
              <div className="relative flex flex-col gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 text-white uppercase">{item.title}</h3>
                  <p className="text-xs text-gray-500 font-sans">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}