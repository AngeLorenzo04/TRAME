"use client"
import { memo } from "react"
import type { LucideIcon } from "lucide-react"

export const StatsCard = memo(function StatsCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="group scanlines flex flex-col gap-2 bg-[var(--color-ink-deep)] p-4 pixel-border border-b-4 border-b-black/40">
      <div className="flex items-center gap-2">
        <Icon className="size-5 pixelated text-[var(--color-gold)] group-hover:animate-bounce" strokeWidth={3} aria-hidden="true" />
        <span className="text-[7px] font-black text-steel uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-[16px] font-black leading-none text-paper md:text-[20px] uppercase tracking-tighter">{value}</p>
    </div>
  )
})
