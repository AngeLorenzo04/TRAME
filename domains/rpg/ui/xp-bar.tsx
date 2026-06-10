"use client"
import { memo } from "react"

export const XPBar = memo(function XPBar({ xp, decay }: { xp: number; decay: number }) {
  const fill = Math.max(0, Math.min(1, (xp % 3000) / 3000))
  const segments = 24
  const filledSegments = Math.round(fill * segments)
  const decaySegments = Math.round(decay * segments)

  return (
    <div className="w-full space-y-2">
      <div className="flex items-end justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-[var(--color-cyan)] uppercase tracking-[0.2em] text-shadow-glow">EXPERIENCE_POOL</span>
          <p className="text-[24px] font-black leading-none text-paper uppercase tracking-tighter">
            {xp.toLocaleString()} <span className="text-[var(--color-cyan)] text-[14px] opacity-80">XP</span>
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black text-[var(--color-blood)] uppercase tracking-[0.2em] animate-pulse">DECAY_RATE</span>
          <p className="text-[14px] font-black leading-none text-[var(--color-blood)] text-shadow-glow">-{Math.round(decay * 100)}%</p>
        </div>
      </div>

      <div className="flex gap-[3px] bg-black/60 p-2 pixel-border border-b-4 border-b-black/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments
          const isDecaying = i >= filledSegments - decaySegments && i < filledSegments
          return (
            <div
              key={i}
              className={
                isDecaying
                  ? "h-6 flex-1 animate-decay bg-[var(--color-blood-dark)] opacity-50"
                  : isFilled
                    ? "h-6 flex-1 bg-[var(--color-cyan)] shadow-[inset_-2px_-2px_0_0_var(--color-cyan-dark)] glow-cyan"
                    : "h-6 flex-1 bg-white/5 border border-white/10"
              }
            />
          )
        })}
      </div>
    </div>
  )
})
