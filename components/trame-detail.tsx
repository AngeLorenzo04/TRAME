"use client"

import { useMemo, memo } from "react"
import { ArrowLeft } from "lucide-react"
import { TaskCard } from "@/components/task-card"
import type { Trame } from "@/lib/game-data"
import { useGame } from "@/lib/store"

const themeColor: Record<Trame["theme"], string> = {
  blood: "var(--color-blood)",
  steel: "var(--color-steel)",
  energy: "var(--color-gold)",
}

export const TrameDetail = memo(function TrameDetail({
  trame,
  onBack,
}: {
  trame: Trame
  onBack: () => void
}) {
  const accent = themeColor[trame.theme]
  const { trame: allTrame, toggleTrameTask } = useGame()
  
  // Get the current version of this trame from the store
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

  const segments = 12
  const filled = Math.round((done / Math.max(total, 1)) * segments)
  const percent = Math.round((done / Math.max(total, 1)) * 100)

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex w-fit items-center gap-2 bg-[var(--color-ink-deep)] px-3 py-2 text-[8px] text-paper pixel-border transition-transform duration-100 hover:-translate-x-1 hover:pixel-border-red md:text-[9px]"
      >
        <ArrowLeft className="size-4 pixelated" strokeWidth={3} aria-hidden="true" />
        TUTTE LE TRAME
      </button>

      {/* Header */}
      <div className="animate-pixel-in bg-[var(--color-ink)] p-4 pixel-border md:p-5">
        <div className="flex items-center gap-3">
          <span
            className="inline-block size-4 shrink-0"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <h1 className="text-[14px] leading-relaxed md:text-[20px]" style={{ color: accent }}>
            {currentTrame.title}
          </h1>
        </div>
        <p className="mt-3 text-[8px] leading-relaxed text-steel md:text-[10px]">
          {currentTrame.description}
        </p>

        {/* Progress */}
        <div className="mt-4 flex gap-[2px] bg-[var(--color-ink-deep)] p-1">
          {Array.from({ length: segments }).map((_, i) => {
            const isFilled = i < filled
            return (
              <div
                key={i}
                className={isFilled ? "h-3 flex-1 animate-seg" : "h-3 flex-1"}
                style={{
                  backgroundColor: isFilled ? accent : "var(--color-ink)",
                  animationDelay: isFilled ? `${i * 40}ms` : undefined,
                }}
                aria-hidden="true"
              />
            )
          })}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[8px] md:text-[9px]" style={{ color: accent }}>
            {percent}% COMPLETA
          </span>
          <span className="text-[8px] text-steel md:text-[9px]">
            {earned} / {currentTrame.xpReward} XP
          </span>
        </div>
      </div>

      {/* Milestone */}
      <div className="animate-pixel-in bg-[var(--color-ink-deep)] p-3 pixel-border" style={{ animationDelay: "60ms" }}>
        <p className="text-[7px] text-steel md:text-[8px]">{"// PROSSIMA TAPPA"}</p>
        <p className="mt-2 text-[9px] leading-relaxed text-paper md:text-[10px]">
          {currentTrame.nextMilestone}
        </p>
      </div>

      {/* Tasks */}
      <section className="animate-pixel-in" style={{ animationDelay: "120ms" }}>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="flex items-center gap-2 text-[10px] leading-relaxed text-paper md:text-[12px]">
              <span className="inline-block size-2" style={{ backgroundColor: accent }} aria-hidden="true" />
              TASK ASSEGNATE
            </h2>
            <p className="pl-4 text-[7px] leading-relaxed text-steel md:text-[8px]">
              Completa queste abitudini per far avanzare la trama
            </p>
          </div>
          <span className="shrink-0 bg-[var(--color-ink-deep)] px-2 py-1 text-[8px] pixel-border md:text-[9px]" style={{ color: accent }}>
            {done}/{total}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={(taskId) => toggleTrameTask(currentTrame.id, taskId)} />
          ))}
        </div>
      </section>
    </div>
  )
})
