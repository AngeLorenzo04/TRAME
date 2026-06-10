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
    <div className="flex flex-col gap-2 bg-[var(--color-ink-deep)] p-3 pixel-border">
      <Icon className="size-5 pixelated text-[var(--color-blood)]" strokeWidth={2.5} aria-hidden="true" />
      <p className="text-[14px] leading-none text-paper md:text-[18px]">{value}</p>
      <p className="text-[7px] leading-relaxed text-steel md:text-[9px]">{label}</p>
    </div>
  )
})
