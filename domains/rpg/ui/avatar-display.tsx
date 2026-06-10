"use client"

import { memo } from "react"
import Image from "next/image"
import { User, ShieldCheck } from "lucide-react"

export const AvatarDisplay = memo(function AvatarDisplay({ stats }: { stats: string[] }) {
  return (
    <div className="group relative scanlines bg-[var(--color-ink-deep)] p-6 pixel-border-red overflow-hidden shadow-[inset_0_0_20px_rgba(239,35,60,0.2)]">
      {/* Decorative scanner line */}
      <div className="absolute inset-x-0 h-1 bg-[var(--color-blood)]/20 animate-bounce top-0 pointer-events-none" />
      
      <div className="flex flex-col items-center gap-6">
        {/* Avatar Container */}
        <div className="relative p-2 bg-black/40 pixel-border border-2 border-[var(--color-blood)] group-hover:scale-105 transition-transform duration-200">
          <div className="absolute -top-1 -left-1 size-3 bg-[var(--color-blood)]" />
          <div className="absolute -bottom-1 -right-1 size-3 bg-[var(--color-blood)]" />
          <Image
            src="/avatar-athlete.png"
            alt="PILOT_IDENTITY_UNIT"
            width={120}
            height={120}
            className="pixelated brightness-110 contrast-125"
            priority
          />
        </div>

        {/* Identity Info */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--color-blood)]/30 pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[var(--color-blood)]" />
              <span className="text-[9px] font-black text-paper tracking-[0.2em]">PILOT_A01</span>
            </div>
            <span className="text-[8px] font-bold text-steel uppercase">CLASS: ATHLETE</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
             {stats.map((stat, i) => (
               <div key={i} className="flex items-center justify-between bg-black/20 p-2 border-l-2 border-[var(--color-blood)]">
                 <span className="text-[8px] font-black text-steel uppercase tracking-widest">{stat}</span>
                 <span className="text-[10px] font-black text-[var(--color-blood)]">ACTIVE</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
})
