"use client"

import { memo, useState } from "react"
import { Trash2, ListChecks, Filter } from "lucide-react"
import { useGame } from "@/domains/core/store"
import { TaskCard } from "./task-card"
import { Category } from "@/domains/core/game-data"
import { cn } from "@/lib/utils"

export const TaskTerminal = memo(function TaskTerminal() {
  const { tasks, removeTask, toggleTask } = useGame()
  const [filter, setFilter] = useState<Category | "all">( "all")

  const filteredTasks = tasks.filter(t => filter === "all" || t.category === filter)
  const categories: (Category | "all")[] = ["all", "salute", "universita", "mente", "social"]

  return (
    <div className="flex flex-col gap-8">
      <div className="animate-pixel-in scanlines bg-[var(--color-ink)] p-6 pixel-border border-b-4 border-b-black/40 flex justify-between items-center">
        <div>
          <h1 className="text-[20px] font-black text-[var(--color-blood)] md:text-[28px] uppercase tracking-tighter flex items-center gap-3">
            <ListChecks className="size-8" />
            TASK TERMINAL
          </h1>
          <p className="mt-2 text-[9px] font-bold leading-relaxed text-steel uppercase tracking-widest">
            {"// MANAGE DAILY OPERATIONS... SYNCING ABILITIES"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 animate-pixel-in" style={{ animationDelay: "100ms" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all",
              filter === cat 
                ? "bg-[var(--color-gold)] text-black pixel-border-gold shadow-[2px_2px_0_0_#000]" 
                : "bg-[var(--color-ink-deep)] text-steel pixel-border hover:text-paper"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="relative group">
            <TaskCard task={task as any} onToggle={() => toggleTask(task.id)} />
            <button
              onClick={() => removeTask(task.id)}
              className="absolute -top-2 -right-2 size-8 bg-[var(--color-blood)] text-paper pixel-border-red opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110 active:scale-95 z-10 shadow-lg"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
})
