"use client"
import { memo } from "react"
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

export const Sidebar = memo(function Sidebar({
  active,
  onSelect,
}: {
  active: NavKey
  onSelect: (key: NavKey) => void
}) {
  return (
    <aside className="scanlines flex shrink-0 flex-col gap-8 bg-[var(--color-ink-deep)] p-4 pixel-border md:w-64 md:p-6">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2 border-b-2 border-[var(--color-steel)] pb-6 md:items-start">
        <div className="grid size-12 place-items-center bg-[var(--color-blood)] text-[14px] text-paper pixel-border-red">
          PX
        </div>
        <div className="hidden flex-col md:flex">
          <span className="text-[12px] font-bold tracking-widest text-paper">
            PIXEL <span className="text-[var(--color-blood)]">HABIT</span>
          </span>
          <span className="text-[7px] text-steel">v1.0.0-CORE</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-3">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-4 p-3 text-[9px] uppercase tracking-tighter transition-all duration-75 md:text-[11px]",
                "hover:translate-x-2",
                isActive
                  ? "bg-[var(--color-blood)] text-paper pixel-border-red shadow-[4px_4px_0_0_var(--color-blood-dark)]"
                  : "text-steel hover:text-paper hover:bg-[var(--color-ink)]",
              )}
            >
              <Icon className={cn("size-5 shrink-0 pixelated", isActive ? "animate-pulse" : "")} strokeWidth={2.5} aria-hidden="true" />
              <span className="hidden font-bold md:inline">{label}</span>
              {isActive && (
                <div className="absolute -left-1 top-1/2 size-2 -translate-y-1/2 bg-paper animate-blink" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer info */}
      <div className="mt-auto hidden border-t-2 border-[var(--color-ink)] pt-4 md:block">
        <p className="text-[7px] text-steel">SYSTEM STATUS: <span className="text-green-500">ONLINE</span></p>
      </div>
    </aside>
  )
})
