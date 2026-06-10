"use client"
import { memo } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const StatsCard = memo(function StatsCard({
  icon: Icon,
  label,
  value,
  color = "gold"
}: {
  icon: LucideIcon
  label: string
  value: string
  color?: "gold" | "cyan" | "blood"
}) {
  const colorMap = {
    gold: "text-[var(--color-gold)] border-[var(--color-gold)]",
    cyan: "text-[var(--color-cyan)] border-[var(--color-cyan)]",
    blood: "text-[var(--color-blood)] border-[var(--color-blood)]"
  }

  return (
    <div className="group relative scanlines flex flex-col gap-3 bg-[var(--color-ink-deep)] p-5 pixel-border border-b-4 border-b-black/40 overflow-hidden hover:-translate-y-1 transition-transform">
      {/* Hover Background Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="flex items-center gap-3 z-10">
        <div className={cn("p-1.5 border-2", colorMap[color])}>
           <Icon className="size-4 pixelated group-hover:animate-pulse" strokeWidth={3} aria-hidden="true" />
        </div>
        <span className="text-[8px] font-black text-steel uppercase tracking-[0.2em]">{label}</span>
      </div>
      <p className={cn("text-[18px] font-black leading-none md:text-[24px] uppercase tracking-tighter z-10 text-shadow-glow", colorMap[color].split(' ')[0])}>
        {value}
      </p>
    </div>
  )
})
