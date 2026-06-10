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
        "group flex flex-col gap-3 p-3 text-left transition-transform duration-100 will-change-transform",
        "hover:scale-[1.03] active:scale-[0.96]",
        task.completed
          ? "bg-[var(--color-blood)] text-paper pixel-border-red"
          : "bg-[var(--color-ink-deep)] text-paper pixel-border hover:pixel-border-red",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        {/* Checkbox */}
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center",
            task.completed
              ? "bg-paper text-[var(--color-blood)]"
              : "bg-[var(--color-ink)] text-transparent group-hover:text-steel",
          )}
        >
          <Check className="size-4 pixelated" strokeWidth={3} aria-hidden="true" />
        </span>

        {/* Streak */}
        <span
          className={cn(
            "flex items-center gap-1 text-[8px]",
            task.completed ? "text-paper" : "text-[var(--color-blood)]",
          )}
        >
          <Flame className="size-3 pixelated" strokeWidth={2.5} aria-hidden="true" />
          {task.streak}
        </span>
      </div>

      <p className="text-[9px] leading-relaxed md:text-[10px]">{task.name}</p>

      <span
        className={cn(
          "text-[8px] md:text-[9px]",
          task.completed ? "text-paper" : "text-steel",
        )}
      >
        +{task.xpReward} XP
      </span>
    </button>
  )
})
