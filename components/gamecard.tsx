import Image from "next/image"
import { Card } from "@/components/ui/card"

export function GameCard({ title, publisher, imageSrc }: any) {
  return (
    <div className="group cursor-pointer">
      <Card className="relative overflow-hidden border-2 border-transparent group-hover:border-[#ffbc0d] rounded-2xl bg-[#262626] transition-all duration-300">
        <div className="aspect-[3/4] relative">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            unoptimized 
            className="object-cover p-1 rounded-2xl transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#db0007]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
             <span className="text-white text-xs font-bold">VIEW DETAILS</span>
          </div>
        </div>
      </Card>
      <div className="mt-3 text-center">
        <h3 className="text-white font-bold text-sm uppercase group-hover:text-[#ffbc0d] transition-colors">{title}</h3>
        <p className="text-gray-500 text-[10px] tracking-widest uppercase">{publisher}</p>
      </div>
    </div>
  )
}