"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Target, User, Send, ChevronLeft, Flame, Activity } from "lucide-react"
import Link from "next/link"

export default function JoinPage() {
    const [formData, setFormData] = useState({
        nickname: "",
        rank: "",
        role: "Rusher",
        kd: "",
    })

    const handleSendWA = () => {
        const message = `Halo Admin ~MC'DONALDS~!%0A%0ASaya ingin bergabung ke Clan.%0A%0A- Nickname: ${formData.nickname}%0A- Rank: ${formData.rank}%0A- Role: ${formData.role}%0A- KD/HS: ${formData.kd}%0A%0AApakah masih ada slot?`
        window.open(`https://wa.me/6281234567890?text=${message}`, "_blank")
    }

    return (
        <main className="min-h-screen bg-[#0d0f14] text-white flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center p-4 py-12">
                <div className="w-full max-w-2xl relative">

                    {/* Efek Glow di belakang card */}
                    <div className="absolute -inset-1 bg-primary/20 blur-3xl rounded-[3rem] z-0" />

                    <Card className="relative z-10 bg-[#14161d] border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                        <CardHeader className="text-center pt-10 px-8">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20 rotate-3">
                                <ShieldCheck className="text-primary w-8 h-8" />
                            </div>
                            <CardTitle className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                                RECRUITMENT <span className="text-primary">STATION</span>
                            </CardTitle>
                            <CardDescription className="text-gray-500 font-medium">
                                Lengkapi berkas di bawah untuk diverifikasi oleh Commander.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-8 md:p-12 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Nickname Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                        <User size={12} /> Nickname PB
                                    </label>
                                    <Input
                                        placeholder="Contoh: McD`PatrickSTAR"
                                        className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-primary/50 transition-all font-bold"
                                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                                    />
                                </div>

                                {/* Rank Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                        <Flame size={12} /> Pangkat/Rank
                                    </label>
                                    <Input
                                        placeholder="Contoh: Colonel / Bintang 1"
                                        className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-primary/50 transition-all font-bold"
                                        onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                    />
                                </div>

                                {/* Role Selection */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                        <Target size={12} /> Main Role
                                    </label>
                                    <select
                                        className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:border-primary/50 font-bold transition-all appearance-none"
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option className="bg-[#14161d]">Rusher</option>
                                        <option className="bg-[#14161d]">Sniper</option>
                                        <option className="bg-[#14161d]">Support</option>
                                        <option className="bg-[#14161d]">Tanker</option>
                                    </select>
                                </div>

                                {/* KD Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                        <Activity size={12} /> KD / Headshot %
                                    </label>
                                    <Input
                                        placeholder="Contoh: 65% / 40%"
                                        className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-primary/50 transition-all font-bold"
                                        onChange={(e) => setFormData({ ...formData, kd: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    onClick={handleSendWA}
                                    className="w-full bg-primary hover:bg-primary/80 text-black font-black h-14 rounded-2xl text-lg shadow-lg shadow-primary/10 flex items-center gap-3 transition-all active:scale-95"
                                >
                                    KIRIM LAMARAN VIA WHATSAPP <Send size={20} />
                                </Button>
                                <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest mt-6">
                                    Admin akan membalas dalam 1x24 Jam • Pastikan Nickname Benar
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="relative z-50 flex justify-center w-full">
                        <Link
                            href="/"
                            className="mt-8 flex items-center gap-2 text-gray-500 hover:text-white transition-all text-sm font-bold uppercase tracking-widest group px-4 py-2"
                        >
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Kembali ke Beranda</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}