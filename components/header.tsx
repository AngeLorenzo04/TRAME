import { XPBar } from "@/components/xp-bar"

export function Header({
  xp,
  decay,
  level,
}: {
  xp: number
  decay: number
  level: number
}) {
  return (
    <header className="flex flex-col gap-4 bg-[var(--color-ink)] p-4 pixel-border md:flex-row md:items-center md:gap-6 md:p-5">
      <div className="flex-1">
        <XPBar xp={xp} decay={decay} />
      </div>

      {/* Level display */}
      <div className="flex shrink-0 flex-col items-center justify-center gap-1 bg-[var(--color-ink-deep)] p-4 pixel-border-red">
        <span className="text-[8px] text-steel md:text-[10px]">LIVELLO</span>
        <span className="text-[28px] leading-none text-[var(--color-blood)] md:text-[40px]">
          {level}
        </span>
      </div>
    </header>
  )
}
