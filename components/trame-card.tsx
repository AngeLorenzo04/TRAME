"use client"
import { memo } from "react"
import { ChevronRight, Target } from "lucide-react"
import type { Trame } from "@/lib/game-data"
import { cn } from "@/lib/utils"

const themeStyles: Record<Trame["theme"], { border: string; accent: string }> = {
  blood: { border: "pixel-border-red", accent: "var(--color-blood)" },
  steel: { border: "pixel-border", accent: "var(--color-steel)" },
  energy: { border: "pixel-border-gold", accent: "var(--color-gold)" },
}

export const TrameCard = memo(function TrameCard({
  trame,
  index = 0,
  onOpen,
}: {
  trame: Trame
  index?: number
  onOpen?: (id: number) => void
}) {
  const style = themeStyles[trame.theme]
  const segments = 12
  const filled = Math.round((trame.step / trame.totalSteps) * segments)
  const percent = Math.round((trame.step / trame.totalSteps) * 100)

  return (
    <article
      onClick={() => onOpen?.(trame.id)}
      role={onOpen ? "button" : undefined}
      className={cn(
        "group scanlines flex flex-col gap-4 bg-[var(--color-ink-deep)] p-5 pixel-border",
        "animate-pixel-in transition-all duration-75 will-change-transform",
        "hover:-translate-y-1 hover:brightness-110 active:translate-y-0",
        onOpen && "cursor-pointer",
        style.border
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[7px] font-bold text-steel tracking-widest uppercase">QUEST ATTIVA</span>
          <h3 className="text-[12px] font-black leading-none text-paper md:text-[14px] uppercase tracking-tighter">
            {trame.title}
          </h3>
        </div>
        <div className="bg-[var(--color-ink)] px-2 py-1 text-[9px] font-bold text-paper border-2 border-current">
          {trame.step}/{trame.totalSteps}
        </div>
      </div>

      <p className="text-[9px] leading-relaxed text-steel line-clamp-2 italic">
        "{trame.description}"
      </p>

      <div className="space-y-2">
        <div className="flex gap-[2px] bg-[var(--color-ink)] p-1 border-2 border-[var(--color-ink-deep)]">
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={cn("h-4 flex-1", i < filled && "animate-seg")}
              style={{
                backgroundColor: i < filled ? style.accent : "transparent",
                animationDelay: i < filled ? `${index * 80 + i * 20}ms` : undefined,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-[8px] font-black uppercase">
          <span style={{ color: style.accent }}>{percent}% SYNC</span>
          <span className="text-steel">REWARD: <span className="text-[var(--color-gold)]">+{trame.xpReward} XP</span></span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3 bg-[var(--color-ink)] p-3 border-l-4" style={{ borderColor: style.accent }}>
        <Target className="size-4 shrink-0 text-paper" strokeWidth={3} />
        <p className="text-[8px] font-bold text-paper leading-tight">
          {trame.nextMilestone.toUpperCase()}
        </p>
      </div>

      {onOpen && (
        <div className="mt-2 flex items-center justify-end gap-2 text-[8px] font-black text-steel group-hover:text-paper transition-colors">
          ACCEDI AI DETTAGLI <ChevronRight className="size-3" strokeWidth={4} />
        </div>
      )}
    </article>
  )
})
