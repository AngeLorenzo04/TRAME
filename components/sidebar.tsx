"use client"

import { Home, Map, ListChecks, User, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavKey = "dashboard" | "trame" | "task" | "profilo" | "settings"

const items: { key: NavKey; label: string; icon: typeof Home }[] = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "trame", label: "Trame", icon: Map },
  { key: "task", label: "Task", icon: ListChecks },
  { key: "profilo", label: "Profilo", icon: User },
  { key: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({
  active,
  onSelect,
}: {
  active: NavKey
  onSelect: (key: NavKey) => void
}) {
  return (
    <aside className="flex shrink-0 flex-col gap-6 bg-[var(--color-ink-deep)] p-3 pixel-border md:w-56 md:p-5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="grid size-8 place-items-center bg-[var(--color-blood)] text-[10px] text-paper">
          PX
        </div>
        <span className="hidden text-[10px] leading-relaxed text-paper md:block">
          PIXEL
          <span className="text-[var(--color-blood)]">HABIT</span>
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 p-2 text-[8px] leading-relaxed transition-transform duration-100 md:text-[10px]",
                "hover:translate-x-1",
                isActive
                  ? "bg-[var(--color-blood)] text-paper pixel-border-red"
                  : "text-steel hover:text-paper",
              )}
            >
              <Icon className="size-5 shrink-0 pixelated" strokeWidth={2.5} aria-hidden="true" />
              <span className="hidden md:inline">{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
