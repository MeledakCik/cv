// src/components/gamecard.tsx atau components/gamecard.tsx
import Image from "next/image"
import { Card } from "@/components/ui/card"

export function GameCard({ title, publisher, imageSrc }: any) {
  return (
    <div className="group cursor-pointer">
      <Card className="relative overflow-hidden border-none rounded-2xl bg-[#1e212b] transition-transform duration-300 group-hover:-translate-y-2">
        <div className="aspect-[3/4] relative">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            unoptimized // TAMBAHKAN INI
            className="object-cover rounded-2xl p-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Card>
      <div className="mt-3 text-center">
        <h3 className="text-white font-medium text-sm line-clamp-1">{title}</h3>
        <p className="text-gray-500 text-xs">{publisher}</p>
      </div>
    </div>
  )
}