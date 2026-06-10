"use client"

import { useMemo, useState, useCallback, memo } from "react"
import { Flame, Map, Award, Trophy } from "lucide-react"
import { Sidebar, type NavKey } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AvatarDisplay } from "@/components/avatar-display"
import { TaskCard } from "@/components/task-card"
import { TrameCard } from "@/components/trame-card"
import { TrameDetail } from "@/components/trame-detail"
import { StreakCounter } from "@/components/streak-counter"
import { StatsCard } from "@/components/stats-card"
import { user, initialTasks, quickStats, trame, type Task } from "@/lib/game-data"

const SectionTitle = memo(function SectionTitle({
  children,
  hint,
  count,
}: {
  children: React.ReactNode
  hint?: string
  count?: number
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2 text-[10px] leading-relaxed text-paper md:text-[12px]">
          <span className="inline-block size-2 bg-[var(--color-blood)]" aria-hidden="true" />
          {children}
        </h2>
        {hint && (
          <p className="pl-4 text-[7px] leading-relaxed text-steel md:text-[8px]">{hint}</p>
        )}
      </div>
      {typeof count === "number" && (
        <span className="shrink-0 bg-[var(--color-ink-deep)] px-2 py-1 text-[8px] text-[var(--color-blood)] pixel-border md:text-[9px]">
          {count}
        </span>
      )}
    </div>
  )
})

const TrameGrid = memo(function TrameGrid({ onOpen }: { onOpen?: (id: number) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {trame.map((t, i) => (
        <TrameCard key={t.id} trame={t} index={i} onOpen={onOpen} />
      ))}
    </div>
  )
})

function DashboardView({ onOpenTrame }: { onOpenTrame: (id: number) => void }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const toggle = useCallback((id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    ), [])

  const { done, total, earned } = useMemo(() => {
    const completed = tasks.filter((t) => t.completed)
    return {
      done: completed.length,
      total: tasks.length,
      earned: completed.reduce((sum, t) => sum + t.xpReward, 0),
    }
  }, [tasks])

  const statList = useMemo(() => ["Atletico", "Riposato", "Focus"], [])

  return (
    <div className="flex flex-col gap-8">
      <div className="animate-pixel-in">
        <Header xp={user.xp} decay={user.dailyDecay} level={user.level} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: avatar + streak */}
        <div className="flex flex-col gap-6">
          <section className="animate-pixel-in" style={{ animationDelay: "60ms" }}>
            <SectionTitle hint="Il tuo personaggio cresce con le abitudini">AVATAR</SectionTitle>
            <AvatarDisplay stats={statList} />
          </section>
          <section className="animate-pixel-in" style={{ animationDelay: "120ms" }}>
            <SectionTitle hint="Non spezzare la catena!">STREAK</SectionTitle>
            <StreakCounter days={user.streak} />
          </section>
        </div>

        {/* Middle/right: check-in tasks */}
        <section className="animate-pixel-in lg:col-span-2" style={{ animationDelay: "180ms" }}>
          <SectionTitle hint={`${earned} XP guadagnati oggi · tocca per completare`} count={done}>
            CHECK-IN GIORNALIERO
          </SectionTitle>

          {/* Daily progress bar */}
          <div className="mb-3 flex items-center gap-2 bg-[var(--color-ink-deep)] p-2 pixel-border">
            <div className="flex flex-1 gap-[2px]">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className={
                    t.completed
                      ? "h-3 flex-1 animate-seg bg-[var(--color-blood)]"
                      : "h-3 flex-1 bg-[var(--color-ink)]"
                  }
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="shrink-0 text-[8px] text-paper md:text-[9px]">
              {done}/{total}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggle} />
            ))}
          </div>
        </section>
      </div>

      {/* Trame */}
      <section className="animate-pixel-in" style={{ animationDelay: "240ms" }}>
        <SectionTitle hint="Quest a lungo termine che intrecciano le tue abitudini" count={trame.length}>
          TRAME ATTIVE
        </SectionTitle>
        <TrameGrid onOpen={onOpenTrame} />
      </section>

      {/* Quick stats */}
      <section className="animate-pixel-in" style={{ animationDelay: "300ms" }}>
        <SectionTitle>QUICK STATS</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatsCard icon={Flame} label="STREAK ATTUALE" value={`${quickStats.currentStreak} giorni`} />
          <StatsCard icon={Map} label="TRAME ATTIVE" value={`${quickStats.activeTrames} trame`} />
          <StatsCard icon={Award} label="ACHIEVEMENT" value={`${quickStats.achievementsUnlocked} badge`} />
          <StatsCard icon={Trophy} label="LEADERBOARD" value={`#${quickStats.leaderboardRank}`} />
        </div>
      </section>
    </div>
  )
}

const TrameView = memo(function TrameView({ onOpenTrame }: { onOpenTrame: (id: number) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="animate-pixel-in bg-[var(--color-ink)] p-4 pixel-border md:p-5">
        <h1 className="text-[16px] text-[var(--color-blood)] md:text-[22px]">TRAME</h1>
        <p className="mt-2 text-[8px] leading-relaxed text-steel md:text-[10px]">
          {"// Quest narrative che raggruppano le tue abitudini in un percorso a tappe"}
        </p>
      </div>
      <section>
        <SectionTitle count={trame.length}>IN CORSO</SectionTitle>
        <TrameGrid onOpen={onOpenTrame} />
      </section>
    </div>
  )
})

const Placeholder = memo(function Placeholder({ title }: { title: string }) {
  return (
    <div className="grid min-h-[60vh] animate-pixel-in place-items-center bg-[var(--color-ink-deep)] p-8 pixel-border">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-[24px] text-[var(--color-blood)] md:text-[32px]">{title}</span>
        <p className="text-[8px] leading-relaxed text-steel md:text-[10px]">
          {"// SEZIONE IN COSTRUZIONE"}
        </p>
      </div>
    </div>
  )
})

export function Dashboard() {
  const [active, setActive] = useState<NavKey>("dashboard")
  const [openTrameId, setOpenTrameId] = useState<number | null>(null)

  const selectedTrame = useMemo(() => trame.find((t) => t.id === openTrameId) ?? null, [openTrameId])

  const handleSelect = useCallback((key: NavKey) => {
    setOpenTrameId(null)
    setActive(key)
  }, [])

  const handleOpenTrame = useCallback((id: number) => setOpenTrameId(id), [])
  const handleBack = useCallback(() => setOpenTrameId(null), [])

  return (
    <main className="flex min-h-screen gap-4 bg-background p-3 md:gap-6 md:p-6">
      <Sidebar active={active} onSelect={handleSelect} />

      <div className="min-w-0 flex-1">
        {selectedTrame ? (
          <TrameDetail trame={selectedTrame} onBack={handleBack} />
        ) : (
          <>
            {active === "dashboard" && <DashboardView onOpenTrame={handleOpenTrame} />}
            {active === "trame" && <TrameView onOpenTrame={handleOpenTrame} />}
            {active === "task" && <Placeholder title="TASK" />}
            {active === "profilo" && <Placeholder title="PROFILO" />}
            {active === "settings" && <Placeholder title="SETTINGS" />}
          </>
        )}
      </div>
    </main>
  )
}
