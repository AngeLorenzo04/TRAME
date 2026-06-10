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
    <header className="scanlines flex flex-col gap-6 bg-[var(--color-ink)] p-6 pixel-border border-b-4 border-b-black/40 md:flex-row md:items-center">
      <div className="flex-1">
        <XPBar xp={xp} decay={decay} />
      </div>

      <div className="flex shrink-0 flex-col items-center justify-center gap-1 bg-[var(--color-ink-deep)] p-5 pixel-border-red shadow-[4px_4px_0_0_var(--color-blood-dark)] min-w-[100px]">
        <span className="text-[8px] font-black text-steel uppercase tracking-widest">RANK</span>
        <span className="text-[32px] font-black leading-none text-[var(--color-blood)] md:text-[48px]">
          {level}
        </span>
      </div>
    </header>
  )
})
