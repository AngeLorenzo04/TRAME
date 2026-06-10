"use client"

import { memo, useState } from "react"
import { Plus, Trash2, ListChecks, Filter } from "lucide-react"
import { useGame } from "@/domains/core/store"
import { TaskCard } from "./task-card"
import { TaskForm } from "./task-form"
import { Category } from "@/domains/core/game-data"
import { cn } from "@/lib/utils"

export const TaskTerminal = memo(function TaskTerminal() {
  const { tasks, addTask, removeTask, toggleTask } = useGame()
  const [isAdding, setIsAdding] = useState(false)
  const [filter, setFilter] = useState<Category | "all">( "all")

  const filteredTasks = tasks.filter(t => filter === "all" || t.category === filter)
  const categories: (Category | "all")[] = ["all", "salute", "universita", "mente", "social"]

  return (
    <div className="flex flex-col gap-8">
      {/* Header Terminal */}
      <div className="animate-pixel-in scanlines bg-[var(--color-ink)] p-6 pixel-border border-b-4 border-b-black/40 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-[20px] font-black text-[var(--color-blood)] md:text-[28px] uppercase tracking-tighter flex items-center gap-3">
            <ListChecks className="size-8" />
            TASK TERMINAL
          </h1>
          <p className="mt-2 text-[9px] font-bold leading-relaxed text-steel uppercase tracking-widest">
            {"// MANAGE DAILY OPERATIONS... SYNCING ABILITIES"}
          </p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="pixel-btn w-full md:w-auto bg-[var(--color-blood)] text-paper text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[4px_4px_0_0_var(--color-blood-dark)]"
        >
          <Plus className="size-4" /> NEW_OBJECTIVE
        </button>
      </div>

      {/* Filter Row */}
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="relative group animate-pixel-in">
            <TaskCard task={task as any} onToggle={() => toggleTask(task.id)} />
            <button
              onClick={() => removeTask(task.id)}
              className="absolute -top-2 -right-2 size-8 bg-[var(--color-blood)] text-paper pixel-border-red opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110 active:scale-95 z-10 shadow-lg"
              title="TERMINATE_OBJECTIVE"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="col-span-full py-20 bg-[var(--color-ink-deep)] pixel-border border-dashed border-2 flex flex-col items-center justify-center text-steel opacity-50">
            <Filter className="size-12 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest">NO OPERATIONAL DATA FOUND FOR THIS SECTOR</p>
          </div>
        )}
      </div>

      {/* Form Overlay */}
      {isAdding && (
        <TaskForm 
          onSubmit={(input) => addTask(input)} 
          onClose={() => setIsAdding(false)} 
        />
      )}
    </div>
  )
})
