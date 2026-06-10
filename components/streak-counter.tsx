import { Flame } from "lucide-react"

export function StreakCounter({ days }: { days: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-[var(--color-ink-deep)] p-5 pixel-border">
      <Flame
        className="size-12 animate-flame pixelated text-[var(--color-blood)]"
        strokeWidth={2}
        aria-hidden="true"
      />
      <p className="text-[28px] leading-none text-[var(--color-blood)] md:text-[40px]">
        {days}
      </p>
      <p className="text-center text-[8px] leading-relaxed text-steel md:text-[10px]">
        GIORNI CONSECUTIVI
      </p>
    </div>
  )
}
