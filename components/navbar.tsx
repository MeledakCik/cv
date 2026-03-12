import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShieldCheck, Terminal, Code, FileText, ShieldAlert } from "lucide-react"
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0d0f14]/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-10">

        {/* Brand Personal */}
        <div className="group flex items-center gap-2 cursor-pointer shrink-0">
          <div className="bg-primary p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
            <ShieldCheck className="text-black h-6 w-6" />
          </div>
          <div className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
            Kakang<span className="text-primary italic text-sm ml-1">Cv</span>
          </div>
        </div>

        {/* Search Bar - Untuk mencari dokumentasi/project */}
        <div className="hidden lg:flex relative flex-1 max-w-xl">
          <Input
            className="bg-white/5 border-white/10 focus:bg-white/10 focus:border-primary/50 focus:ring-0 rounded-2xl pl-12 pr-4 h-12 w-full transition-all placeholder:text-gray-500 font-sans"
            placeholder="Cari project atau skill..."
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <Link href="mailto:email-kamu@example.com">
            <Button
              className="rounded-xl bg-primary hover:bg-primary/80 text-black font-bold px-6 h-11 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              Hire Me
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Sub-menu */}
      <div className="bg-white/[0.02] py-1">
        <div className="container mx-auto flex items-center gap-2 md:gap-4 text-[13px] font-semibold overflow-x-auto no-scrollbar px-4">
          <NavItem icon={<Terminal size={16} />} label="Terminal" active />
          <NavItem icon={<ShieldAlert size={16} />} label="Security Lab" />
          <NavItem icon={<Code size={16} />} label="Source Code" />
          <NavItem icon={<FileText size={16} />} label="Resume.pdf" />
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
      <span className="tracking-wider uppercase text-[11px] md:text-[12px]">{label}</span>
      <div className={`
        absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300
        ${active ? 'w-full' : 'w-0 group-hover:w-full'}
      `} />
    </div>
  )
}