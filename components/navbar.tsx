import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Gamepad2, Users, Trophy, ScrollText, ShoppingBag, LogIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0d0f14]/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-10">

        <div className="group flex items-center gap-3 cursor-pointer shrink-0">
          {/* Container div diperbesar ke w-14 h-14 */}
          <div className="p-1 rounded-xl rotate-3 group-hover:rotate-0 transition-transform overflow-hidden w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-primary/50">
            <Image
              src="/images/logo.jpeg"
              alt="Mc`Donalds Clan Logo"
              width={120} // Width/Height di sini adalah resolusi render, bukan ukuran display CSS
              height={120}
              className="object-cover rounded-lg scale-110" // Pakai object-cover agar logo memenuhi kotak jika bentuknya square
              priority
            />
          </div>

          <div className="flex flex-col leading-none">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
              Mc`Donalds <span className="text-primary italic">Clan</span>
            </div>
            <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">Point Blank Indonesia</span>
          </div>
        </div>
        <div className="hidden lg:flex relative flex-1 max-w-xl">
          <Input
            className="bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary/50 focus:ring-0 rounded-2xl pl-12 pr-4 h-12 w-full transition-all placeholder:text-gray-500 font-sans"
            placeholder="Cari member, info war, atau layanan clan..."
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/join">
            <Button
              className="rounded-xl bg-primary hover:bg-primary/80 text-black font-bold px-6 h-11 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              Gabung Clan
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Sub-menu - Tema Clan PB */}
      <div className="bg-white/[0.02] py-1">
        <div className="container mx-auto flex items-center gap-2 md:gap-4 text-[13px] font-semibold overflow-x-auto no-scrollbar px-4">
          <NavItem icon={<Gamepad2 size={16} />} label="Beranda" active />
          <NavItem icon={<Users size={16} />} label="Daftar Member" />
          <NavItem icon={<Trophy size={16} />} label="Jadwal War / Turnamen" />
          <NavItem icon={<ShoppingBag size={16} />} label="Clan Store" />
          <NavItem icon={<ScrollText size={16} />} label="Peraturan Clan" />
        </div>
      </div>
    </nav>
  )
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`
      relative group flex items-center gap-2 px-4 py-3 cursor-pointer transition-all
      ${active ? 'text-primary' : 'text-gray-400 hover:text-white'}
    `}>
      {icon}
      <span className="tracking-wider uppercase text-[10px] md:text-[11px] whitespace-nowrap">{label}</span>

      {/* Indikator Aktif / Hover */}
      <div className={`
        absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300
        ${active ? 'w-full' : 'w-0 group-hover:w-full'}
      `} />
    </div>
  )
}