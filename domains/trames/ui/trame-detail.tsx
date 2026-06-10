"use client"

import { useMemo, memo } from "react"
import { ArrowLeft, Target, Award } from "lucide-react"
import { TaskCard } from "@/domains/tasks/ui/task-card"
import type { Trame } from "@/domains/core/game-data"
import { useGame } from "@/domains/core/store"
import { cn } from "@/lib/utils"

const themeStyles: Record<Trame["theme"], { border: string; accent: string; shadow: string }> = {
  blood: { border: "pixel-border-red", accent: "var(--color-blood)", shadow: "var(--color-blood-dark)" },
  steel: { border: "pixel-border", accent: "var(--color-steel)", shadow: "var(--color-ink-deep)" },
  energy: { border: "pixel-border-gold", accent: "var(--color-gold)", shadow: "var(--color-gold-dark)" },
}

export const TrameDetail = memo(function TrameDetail({
  trame,
  onBack,
}: {
  trame: Trame
  onBack: () => void
}) {
  const style = themeStyles[trame.theme]
  const { trame: allTrame, toggleTrameTask } = useGame()
  
  const currentTrame = useMemo(() => 
    allTrame.find(t => t.id === trame.id) || trame, 
    [allTrame, trame.id, trame]
  )

  const tasks = currentTrame.tasks

  const { done, total, earned } = useMemo(() => {
    const completed = tasks.filter((t) => t.completed)
    return {
      done: completed.length,
      total: tasks.length,
      earned: completed.reduce((sum, t) => sum + t.xpReward, 0),
    }
  }, [tasks])

  const segments = 16
  const filled = Math.round((done / Math.max(total, 1)) * segments)
  const percent = Math.round((done / Math.max(total, 1)) * 100)

  return (
    <div className="flex flex-col gap-8 animate-pixel-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="pixel-btn w-fit bg-[var(--color-ink-deep)] text-paper text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
      >
        <ArrowLeft className="size-4" strokeWidth={4} />
        RETURN_TO_LOG
      </button>

      {/* Header */}
      <div className="scanlines bg-[var(--color-ink)] p-8 pixel-border border-b-8 border-b-black/40 md:p-10" style={{ borderColor: style.accent }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
             <div className="flex items-center gap-3">
               <div className="size-4" style={{ backgroundColor: style.accent }} />
               <span className="text-[10px] font-black text-steel uppercase tracking-[0.3em]">CAMPAIGN_OPERATIONAL_UNIT</span>
             </div>
             <h1 className="text-[24px] font-black leading-none text-paper md:text-[40px] uppercase tracking-tighter">
               {currentTrame.title}
             </h1>
             <p className="text-[12px] leading-relaxed text-steel max-w-2xl italic">
               "{currentTrame.description}"
             </p>
          </div>

          <div className="shrink-0 bg-black/40 p-6 pixel-border-gold flex flex-col items-center justify-center min-w-[140px]">
             <Award className="size-10 text-[var(--color-gold)] mb-2" />
             <span className="text-[8px] font-black text-steel uppercase">REWARD_XP</span>
             <span className="text-[24px] font-black text-[var(--color-gold)]">{currentTrame.xpReward}</span>
          </div>
        </div>

        {/* Progress System */}
        <div className="mt-10 space-y-4">
          <div className="flex items-end justify-between text-[10px] font-black uppercase tracking-widest">
            <span style={{ color: style.accent }}>SYNC_STATUS: {percent}%</span>
            <span className="text-steel">{done} / {total} OBJECTIVES_CAPTURED</span>
          </div>
          <div className="flex gap-[3px] bg-black/40 p-2 pixel-border">
            {Array.from({ length: segments }).map((_, i) => (
              <div
                key={i}
                className={cn("h-6 flex-1 transition-all duration-500", i < filled && "animate-seg")}
                style={{
                  backgroundColor: i < filled ? style.accent : "rgba(255,255,255,0.05)",
                  animationDelay: i < filled ? "${i * 30}ms" : undefined,
                  boxShadow: i < filled ? "inset -4px -4px 0 0 rgba(0,0,0,0.2)" : "none"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Milestone Terminal */}
      <div className="scanlines bg-[var(--color-ink-deep)] p-6 pixel-border-red border-l-8 border-l-[var(--color-blood)]">
        <div className="flex items-center gap-4">
          <Target className="size-8 text-[var(--color-blood)] animate-pulse" />
          <div>
            <p className="text-[8px] font-black text-steel uppercase tracking-[0.2em]">// CURRENT_CRITICAL_OBJECTIVE</p>
            <p className="text-[14px] font-black text-paper uppercase tracking-tighter">
              {currentTrame.nextMilestone}
            </p>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-b-2 border-[var(--color-ink)] pb-4">
          <div className="size-3" style={{ backgroundColor: style.accent }} />
          <h2 className="text-[14px] font-black text-paper uppercase tracking-tighter">FIELD_RESOURCES_DEPLOYED</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task as any} 
              onToggle={(taskId) => toggleTrameTask(currentTrame.id, taskId)} 
            />
          ))}
        </div>
      </section>
    </div>
  )
})
