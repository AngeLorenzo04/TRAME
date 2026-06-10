"use client"

import { ChevronRight } from "lucide-react"
import type { Trame } from "@/lib/game-data"
import { cn } from "@/lib/utils"

const themeColor: Record<Trame["theme"], string> = {
  blood: "var(--color-blood)",
  steel: "var(--color-steel)",
  energy: "var(--color-gold)",
}

export function TrameCard({
  trame,
  index = 0,
  onOpen,
}: {
  trame: Trame
  index?: number
  onOpen?: (id: number) => void
}) {
  const accent = themeColor[trame.theme]
  const segments = 12
  const filled = Math.round((trame.step / trame.totalSteps) * segments)
  const percent = Math.round((trame.step / trame.totalSteps) * 100)

  return (
    <article
      onClick={() => onOpen?.(trame.id)}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onKeyDown={(e) => {
        if (onOpen && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onOpen(trame.id)
        }
      }}
      className={cn(
        "group flex flex-col gap-3 bg-[var(--color-ink-deep)] p-4 pixel-border",
        "animate-pixel-in transition-transform duration-100 hover:-translate-y-1 hover:pixel-border-red",
        onOpen && "cursor-pointer",
      )}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-3 shrink-0"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <h3 className="text-[10px] leading-relaxed text-paper md:text-[11px]">
            {trame.title}
          </h3>
        </div>
        <span className="shrink-0 text-[8px] text-steel md:text-[9px]">
          {trame.step}/{trame.totalSteps}
        </span>
      </div>

      <p className="text-[8px] leading-relaxed text-steel md:text-[9px]">
        {trame.description}
      </p>

      {/* Segmented progress */}
      <div className="flex gap-[2px] bg-[var(--color-ink)] p-1">
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filled
          return (
            <div
              key={i}
              className={cn("h-3 flex-1", isFilled && "animate-seg")}
              style={{
                backgroundColor: isFilled ? accent : "var(--color-ink-deep)",
                animationDelay: isFilled ? `${index * 90 + i * 40}ms` : undefined,
              }}
              aria-hidden="true"
            />
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[8px] md:text-[9px]" style={{ color: accent }}>
          {percent}% COMPLETA
        </span>
        <span className="text-[8px] text-steel md:text-[9px]">+{trame.xpReward} XP</span>
      </div>

      {/* Next milestone */}
      <div className="flex items-center gap-2 bg-[var(--color-ink)] p-2">
        <ChevronRight
          className="size-4 shrink-0 animate-blink pixelated"
          style={{ color: accent }}
          strokeWidth={3}
          aria-hidden="true"
        />
        <p className="text-[7px] leading-relaxed text-paper md:text-[8px]">
          {trame.nextMilestone}
        </p>
      </div>

      {onOpen && (
        <span
          className="text-right text-[7px] text-steel transition-colors group-hover:text-[var(--color-blood)] md:text-[8px]"
          aria-hidden="true"
        >
          {"APRI TRAMA >"}
        </span>
      )}
    </article>
  )
}
