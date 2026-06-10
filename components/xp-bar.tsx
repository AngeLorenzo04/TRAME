"use client"

import { memo } from "react"

/** Decaying XP bar. percent = current fill 0..1, decay = fraction lost this day */
export const XPBar = memo(function XPBar({ xp, decay }: { xp: number; decay: number }) {
  // Visual fill based on progress toward next level threshold (mock: xp % 3000 / 3000)
  const fill = Math.max(0, Math.min(1, (xp % 3000) / 3000))
  const segments = 20
  const filledSegments = Math.round(fill * segments)
  const decaySegments = Math.round(decay * segments)

  return (
    <div className="w-full">
      <div className="mb-2 flex items-end justify-between">
        <span className="text-[8px] text-steel md:text-[10px]">XP POOL</span>
        <span className="text-[8px] text-[var(--color-blood)] md:text-[10px]">
          -{Math.round(decay * 100)}% DECAY
        </span>
      </div>

      <div className="flex gap-[2px] bg-[var(--color-ink-deep)] p-1 pixel-border">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledSegments
          const isDecaying = i >= filledSegments - decaySegments && i < filledSegments
          return (
            <div
              key={i}
              className={
                isDecaying
                  ? "h-4 flex-1 animate-decay bg-[var(--color-steel)]"
                  : isFilled
                    ? "h-4 flex-1 bg-[var(--color-blood)]"
                    : "h-4 flex-1 bg-[var(--color-ink)]"
              }
            />
          )
        })}
      </div>

      <p className="mt-2 text-center text-[16px] text-paper md:text-[22px]">
        {xp.toLocaleString()} <span className="text-[var(--color-blood)]">XP</span>
      </p>
    </div>
  )
})
