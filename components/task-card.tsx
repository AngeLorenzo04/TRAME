"use client"

import { memo } from "react"
import { Flame, Check } from "lucide-react"
import type { Task } from "@/lib/game-data"
import { cn } from "@/lib/utils"

export const TaskCard = memo(function TaskCard({
  task,
  onToggle,
}: {
  task: Task
  onToggle: (id: number) => void
}) {
  return (
    <button
      onClick={() => onToggle(task.id)}
      aria-pressed={task.completed}
      className={cn(
        "group flex flex-col gap-3 p-4 text-left transition-all duration-75 will-change-transform",
        "hover:-translate-y-1 active:translate-y-0",
        task.completed
          ? "bg-[var(--color-blood)] text-paper pixel-border-red shadow-[4px_4px_0_0_var(--color-blood-dark)]"
          : "bg-[var(--color-ink-deep)] text-paper pixel-border hover:bg-[var(--color-ink)]",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center border-2 border-current transition-colors",
            task.completed
              ? "bg-paper text-[var(--color-blood)]"
              : "bg-[var(--color-ink)] text-steel group-hover:text-paper",
          )}
        >
          {task.completed && <Check className="size-5 pixelated" strokeWidth={4} aria-hidden="true" />}
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

      <p className="text-[10px] font-bold leading-tight md:text-[12px] uppercase tracking-tighter">{task.name}</p>

      <div className="mt-auto flex items-center justify-between border-t border-current/20 pt-2">
        <span className={cn("text-[8px] font-bold", task.completed ? "text-paper" : "text-steel")}>
          {task.category.toUpperCase()}
        </span>
        <span className={cn("text-[9px] font-black", task.completed ? "text-paper" : "text-[var(--color-gold)]")}>
          +{task.xpReward} XP
        </span>
      </div>
    </button>
  )
})
