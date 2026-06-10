"use client"

import { useMemo, useCallback, memo, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate, useLocation } from "react-router-dom"
import { Flame, Map, Award, Trophy, Info } from "lucide-react"
import { Sidebar, type NavKey } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AvatarDisplay } from "@/components/avatar-display"
import { TaskCard } from "@/components/task-card"
import { TrameCard } from "@/components/trame-card"
import { TrameDetail } from "@/components/trame-detail"
import { StreakCounter } from "@/components/streak-counter"
import { StatsCard } from "@/components/stats-card"
import { quickStats, trame } from "@/lib/game-data"
import { useGame } from "@/lib/store"

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
    <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-[var(--color-ink)] pb-2">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-3 text-[12px] font-black leading-none text-paper md:text-[14px] uppercase tracking-tighter">
          <span className="size-3 bg-[var(--color-blood)] shadow-[2px_2px_0_0_var(--color-blood-dark)]" aria-hidden="true" />
          {children}
        </h2>
        {hint && (
          <p className="pl-6 text-[8px] font-bold text-steel uppercase tracking-tight">{hint}</p>
        )}
      </div>
      {typeof count === "number" && (
        <span className="shrink-0 bg-[var(--color-blood)] px-3 py-1 text-[10px] font-black text-paper pixel-border-red">
          {count}
        </span>
      )}
    </div>
  )
})

const TrameGrid = memo(function TrameGrid({ onOpen }: { onOpen?: (id: number) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {trame.map((t, i) => (
        <TrameCard key={t.id} trame={t} index={i} onOpen={onOpen} />
      ))}
    </div>
  )
})

function DashboardView() {
  const { user, tasks, toggleTask } = useGame()
  const navigate = useNavigate()

  const { done, total, earned } = useMemo(() => {
    const completed = tasks.filter((t) => t.completed)
    return {
      done: completed.length,
      total: tasks.length,
      earned: completed.reduce((sum, t) => sum + t.xpReward, 0),
    }
  }, [tasks])

  const statList = useMemo(() => ["ATLETICO", "RIPOSATO", "FOCUS"], [])

  return (
    <div className="flex flex-col gap-10">
      <div className="animate-pixel-in">
        <Header xp={user.xp} decay={user.dailyDecay} level={user.level} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column: avatar + streak */}
        <div className="flex flex-col gap-8">
          <section className="animate-pixel-in" style={{ animationDelay: "60ms" }}>
            <SectionTitle hint="BIO-METRICS: SYNC STATUS">AVATAR</SectionTitle>
            <AvatarDisplay stats={statList} />
          </section>
          <section className="animate-pixel-in" style={{ animationDelay: "120ms" }}>
            <SectionTitle hint="CONSECUTIVE UPTIME">STREAK</SectionTitle>
            <StreakCounter days={user.streak} />
          </section>
        </div>

        {/* Middle/right: check-in tasks */}
        <section className="animate-pixel-in lg:col-span-2" style={{ animationDelay: "180ms" }}>
          <SectionTitle hint={`${earned} XP ACCUMULATED TODAY`} count={done}>
            DAILY OBJECTIVES
          </SectionTitle>

          {/* Daily progress bar */}
          <div className="mb-6 flex items-center gap-4 bg-[var(--color-ink-deep)] p-4 pixel-border border-b-4 border-b-black/40">
            <div className="flex flex-1 gap-[3px]">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className={
                    t.completed
                      ? "h-4 flex-1 animate-seg bg-[var(--color-blood)] shadow-[inset_-2px_-2px_0_0_var(--color-blood-dark)]"
                      : "h-4 flex-1 bg-[var(--color-ink)]"
                  }
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-black text-paper uppercase">SYNC</span>
               <span className="text-[12px] font-black text-[var(--color-blood)]">
                {done}/{total}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} />
            ))}
          </div>
        </section>
      </div>

      {/* Trame */}
      <section className="animate-pixel-in" style={{ animationDelay: "240ms" }}>
        <SectionTitle hint="NARRATIVE PROGRESSION TRACKER" count={trame.length}>
          ACTIVE QUESTS
        </SectionTitle>
        <TrameGrid onOpen={(id) => navigate(`/trame/${id}`)} />
      </section>

      {/* Quick stats */}
      <section className="animate-pixel-in" style={{ animationDelay: "300ms" }}>
        <SectionTitle hint="GLOBAL RANKING & ACHIEVEMENTS">SYSTEM STATS</SectionTitle>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatsCard icon={Flame} label="STREAK" value={`${quickStats.currentStreak} DAYS`} />
          <StatsCard icon={Map} label="QUESTS" value={`${quickStats.activeTrames} ACTIVE`} />
          <StatsCard icon={Award} label="BADGES" value={`${quickStats.achievementsUnlocked} UNLOCKED`} />
          <StatsCard icon={Trophy} label="RANK" value={`#${quickStats.leaderboardRank}`} />
        </div>
      </section>
    </div>
  )
}

const TrameView = memo(function TrameView() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-8">
      <div className="animate-pixel-in scanlines bg-[var(--color-ink)] p-6 pixel-border">
        <h1 className="text-[20px] font-black text-[var(--color-blood)] md:text-[28px] uppercase tracking-tighter">QUEST LOG</h1>
        <p className="mt-2 text-[9px] font-bold leading-relaxed text-steel uppercase tracking-widest">
          {"// ACCESSING NARRATIVE DATABASE... STREAMS SYNCED"}
        </p>
      </div>
      <section>
        <SectionTitle count={trame.length}>CURRENT EXPEDITIONS</SectionTitle>
        <TrameGrid onOpen={(id) => navigate(`/trame/${id}`)} />
      </section>
    </div>
  )
})

const TrameDetailWrapper = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const selectedTrame = useMemo(() => trame.find((t) => t.id === Number(id)) ?? null, [id])

  if (!selectedTrame) return <Navigate to="/trame" replace />

  return <TrameDetail trame={selectedTrame} onBack={() => navigate("/trame")} />
}

const Placeholder = memo(function Placeholder({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="grid min-h-[60vh] animate-pixel-in place-items-center bg-[var(--color-ink-deep)] p-8 pixel-border scanlines">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="size-20 bg-[var(--color-blood)] pixel-border-red flex items-center justify-center">
          <Info className="size-12 text-paper animate-pulse" />
        </div>
        <div className="space-y-2">
          <span className="text-[28px] font-black text-paper md:text-[40px] uppercase tracking-tighter">{title}</span>
          <p className="text-[10px] font-bold leading-relaxed text-steel uppercase tracking-widest">
            {subtitle || "// ENCRYPTED DATA SECTOR - AUTHORIZATION REQUIRED"}
          </p>
        </div>
        <button className="pixel-btn text-[10px] font-black uppercase tracking-widest mt-4">
          RETRY CONNECTION
        </button>
      </div>
    </div>
  )
})

function DashboardContent() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const active = useMemo(() => {
    const path = location.pathname.split("/")[1]
    return (path || "dashboard") as NavKey
  }, [location])

  const handleSelect = useCallback((key: NavKey) => {
    navigate(`/${key === "dashboard" ? "" : key}`)
  }, [navigate])

  return (
    <main className="flex min-h-screen gap-6 bg-background p-4 md:gap-8 md:p-8 cursor-default">
      <Sidebar active={active} onSelect={handleSelect} />

      <div className="min-w-0 flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/trame" element={<TrameView />} />
          <Route path="/trame/:id" element={<TrameDetailWrapper />} />
          <Route path="/task" element={<Placeholder title="TASK TERMINAL" subtitle="// ACCESS DENIED: COMPLETE MORE QUESTS" />} />
          <Route path="/profilo" element={<Placeholder title="PILOT PROFILE" subtitle="// LOADING BIOMETRIC DATA..." />} />
          <Route path="/settings" element={<Placeholder title="SYSTEM CONFIG" subtitle="// HARDWARE INTERFACE OFFLINE" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  )
}

export function Dashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <BrowserRouter>
      <DashboardContent />
    </BrowserRouter>
  )
}
