import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Target, ShieldCheck, Flame, ChevronRight } from "lucide-react"
import Link from "next/link"

// Fungsi Fetch Data dari API Internal
async function getClanData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/clan`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const data = await getClanData();

  // Mapping data dari API (dengan data manual sebagai cadangan/fallback)
  const clan = {
    name: data?.ClanName || "Mc`Donalds",
    master: data?.ClanMasterNick || "McD`PatrickSTAR",
    created: data?.ClanCreated || "11.Apr.2024",
    rank: `${data?.ClanTitle || "BlackOps"} ${data?.ClanScale || "Battalion"}`,
    members: `${data?.ClanMembersNOW || "94"}/${data?.ClanMembersMAX || "250"}`,
    exp: data?.ClanExp ? parseInt(data.ClanExp).toLocaleString() : "108,009,074"
  };

  return (
    <main className="min-h-screen bg-[#0d0f14] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://wallpaperaccess.com/full/2151121.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] to-transparent" />
        
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Flame size={14} /> Dibuat | {clan.created} Point Blank Indonesia
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">
             {clan.name} <span className="text-primary">CLAN</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg italic">
            "I'm Lovin' It, I'm Killin' It." Dipimpin oleh <span className="text-white font-bold">{clan.master}</span>, kami adalah keluarga yang mendominasi setiap medan tempur.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/80 text-black font-black px-8 h-12 rounded-full shadow-lg shadow-primary/20">
              GABUNG SEKARANG
            </Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-8 h-12 rounded-full">
              LIHAT PRESTASI
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Stats Grid - OTOMATIS DARI API */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          <StatsCard icon={<Trophy className="text-primary" />} label="Rank" value={clan.rank} />
          <StatsCard icon={<Target className="text-primary" />} label="Total EXP" value={clan.exp} />
          <StatsCard icon={<Users className="text-primary" />} label="Total Members" value={clan.members} />
          <StatsCard icon={<ShieldCheck className="text-primary" />} label="Status" value="Verified" />
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
              Tentang <span className="text-primary">Kami</span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Berawal dari sekumpulan pemain publik yang sering bermain bersama, <strong>{clan.name} Clan</strong> dibentuk dengan visi menciptakan komunitas yang solid, kompetitif, namun tetap santai.
              </p>
              <p>
                Kami fokus pada gameplay taktis di mode Bomb Mission dan menjunjung tinggi kejujuran di bawah komando <strong>{clan.master}</strong>. Di sini, skill memang penting, tapi loyalitas adalah segalanya.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative">
            <div className="absolute -top-4 -right-4 bg-primary text-black font-black p-4 rounded-2xl rotate-12 shadow-xl">
              NO CHEAT!
            </div>
            <h3 className="text-xl font-bold mb-4 uppercase text-primary">Visi & Misi</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-gray-300">Menjadi salah satu clan yang disegani di server Indonesia.</p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-gray-300">Membangun kerja sama tim yang harmonis layaknya keluarga.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Link Cepat */}
        <div className="grid md:grid-cols-3 gap-6">
          <QuickLink title="Peraturan Clan" desc="Baca rules agar tidak ter-kick." href="/rules" />
          <QuickLink title="Info War Malam" desc="Cek jadwal dan lawan sparring." href="/schedule" />
          <QuickLink title="Store & GB" desc="Layanan eksklusif khusus member." href="/store" />
        </div>
      </div>
    </main>
  )
}

function StatsCard({ icon, label, value }: any) {
  return (
    <div className="bg-[#14161d] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center">
      <div className="mb-3 p-3 bg-white/5 rounded-xl">{icon}</div>
      <p className="text-xs text-gray-500 uppercase tracking-widest">{label}</p>
      <p className="text-xl md:text-2xl font-black text-white">{value}</p>
    </div>
  )
}

function QuickLink({ title, desc, href }: any) {
  return (
    <Link href={href} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{title}</h4>
        <ChevronRight className="text-gray-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
      </div>
      <p className="text-sm text-gray-500">{desc}</p>
    </Link>
  )
}