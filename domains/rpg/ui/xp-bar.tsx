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
          <span className="text-[7px] font-black text-steel uppercase tracking-widest">EXPERIENCE POOL</span>
          <p className="text-[18px] font-black leading-none text-paper uppercase tracking-tighter">
            {xp.toLocaleString()} <span className="text-[var(--color-blood)] text-[12px]">XP</span>
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[7px] font-black text-[var(--color-blood)] uppercase tracking-widest">DECAY RATE</span>
          <p className="text-[12px] font-black leading-none text-[var(--color-blood)]">-{Math.round(decay * 100)}%</p>
        </div>
      </div>

      <div className="flex gap-[2px] bg-[var(--color-ink-deep)] p-2 pixel-border border-b-4 border-b-black/40">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments
          const isDecaying = i >= filledSegments - decaySegments && i < filledSegments
          return (
            <div
              key={i}
              className={
                isDecaying
                  ? "h-5 flex-1 animate-decay bg-[var(--color-steel)]"
                  : isFilled
                    ? "h-5 flex-1 bg-[var(--color-blood)] shadow-[inset_-2px_-2px_0_0_var(--color-blood-dark)]"
                    : "h-5 flex-1 bg-[var(--color-ink)]"
              }
            />
          )
        })}
      </div>
    </div>
  )
})
