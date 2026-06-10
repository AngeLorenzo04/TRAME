"use client"

import { memo } from "react"
import { Flame, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export const TaskCard = memo(function TaskCard({
  task,
  onToggle,
}: {
  task: {
    id: string | number
    name: string
    xpReward: number
    completed: boolean
    streak: number
    category: string
  }
  onToggle: (id: any) => void
}) {
  return (
    <button
      onClick={() => onToggle(task.id)}
      aria-pressed={task.completed}
      className={cn(
        "group relative flex flex-col gap-3 p-4 text-left transition-all duration-75 overflow-hidden",
        "hover:-translate-y-1 active:translate-y-0",
        task.completed
          ? "bg-[var(--color-blood)] text-paper pixel-border-red shadow-[4px_4px_0_0_var(--color-blood-dark)]"
          : "bg-[var(--color-ink-deep)] text-paper pixel-border hover:bg-[var(--color-ink)]",
      )}
    >
      {/* Background Glitch Effect on Completion */}
      {task.completed && (
        <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none" />
      )}

      <div className="flex items-start justify-between gap-2 z-10">
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center border-2 border-current transition-colors",
            task.completed
              ? "bg-paper text-[var(--color-blood)]"
              : "bg-[var(--color-ink)] text-steel group-hover:text-paper",
          )}
        >
          {task.completed && <Check className="size-5 pixelated animate-seg" strokeWidth={4} aria-hidden="true" />}
        </span>

        <span
          className={cn(
            "flex items-center gap-1 text-[9px] font-bold",
            task.completed ? "text-paper" : "text-[var(--color-blood)]",
          )}
        >
          <Flame className={cn("size-4 pixelated", !task.completed && "animate-flame")} strokeWidth={2.5} aria-hidden="true" />
          {task.streak}
        </span>
      </div>

      <p className="text-[11px] font-black leading-tight md:text-[13px] uppercase tracking-tighter z-10">{task.name}</p>

      <div className="mt-auto flex items-center justify-between border-t border-current/20 pt-2 z-10">
        <span className={cn("text-[7px] font-black tracking-widest", task.completed ? "text-paper" : "text-steel")}>
          {task.category.toUpperCase()}
        </span>
        <div className="flex flex-col items-end">
           <span className={cn("text-[10px] font-black", task.completed ? "text-paper" : "text-[var(--color-gold)]")}>
            +{task.xpReward} <span className="text-[7px] opacity-70">XP</span>
          </span>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-1 right-1 flex gap-1 opacity-20">
        <div className="size-1 bg-current" />
        <div className="size-1 bg-current" />
      </div>
    </button>
  )
})
