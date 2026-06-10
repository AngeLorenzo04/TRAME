import { memo } from "react"
import Image from "next/image"

export const AvatarDisplay = memo(function AvatarDisplay({ stats }: { stats: string[] }) {
  return (
    <div className="flex flex-col items-center gap-3 bg-[var(--color-ink-deep)] p-4 pixel-border-red">
      <div className="bg-[var(--color-ink)] p-1 pixel-border">
        <Image
          src="/avatar-athlete.png"
          alt="Pixel art avatar dell'atleta"
          width={96}
          height={96}
          className="pixelated"
          priority
        />
      </div>
      <p className="text-center text-[8px] leading-relaxed text-steel md:text-[10px]">
        {stats.join("  •  ")}
      </p>
    </div>
  )
})
