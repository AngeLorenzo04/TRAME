"use client"
import { memo } from "react"
import { XPBar } from "@/domains/rpg/ui/xp-bar"

export const Header = memo(function Header({
  xp,
  decay,
  level,
}: {
  xp: number
  decay: number
  level: number
}) {
  return (
    <header className="scanlines flex flex-col gap-6 hud-glass p-6 pixel-border-cyan border-b-4 border-b-black/40 md:flex-row md:items-center relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-cyan)] to-transparent opacity-50" />
      
      <div className="flex-1 z-10">
        <XPBar xp={xp} decay={decay} />
      </div>

      <div className="flex shrink-0 flex-col items-center justify-center gap-1 bg-black/60 p-6 pixel-border shadow-[4px_4px_0_0_var(--color-ink-deep)] min-w-[120px] relative glow-gold">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 size-2 border-t-2 border-l-2 border-[var(--color-gold)]" />
        <div className="absolute bottom-0 right-0 size-2 border-b-2 border-r-2 border-[var(--color-gold)]" />
        
        <span className="text-[9px] font-black text-[var(--color-gold)] uppercase tracking-[0.3em]">RANK</span>
        <span className="text-[40px] font-black leading-none text-paper md:text-[56px] text-shadow-glow">
          {level}
        </span>
      </div>
    </header>
  )
})
