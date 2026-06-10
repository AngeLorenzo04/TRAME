import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { user as initialUser, trame as initialTrame, quickStats as initialStats } from "./game-data"
import type { UserData, Trame, QuickStats } from "./game-data"
import { eventBus } from "./events"
import { createTaskSlice, TaskSlice } from "@/domains/tasks/store"
import { createAuthSlice, AuthSlice } from "@/domains/auth/store/auth-slice"
import { supabase } from "./supabase"

interface TrameSlice {
  trame: Trame[]
  toggleTrameTask: (trameId: number, taskId: number) => void
}

interface CharacterSlice {
  user: UserData
  quickStats: QuickStats
  addXP: (amount: number) => void
}

type GameState = TaskSlice & TrameSlice & CharacterSlice & AuthSlice

const createTrameSlice = (set, get) => ({
  trame: initialTrame,
  toggleTrameTask: (trameId, taskId) => {
    const trameItem = get().trame.find((t) => t.id === trameId)
    if (!trameItem) return
    const task = trameItem.tasks.find((t) => t.id === taskId)
    if (!task) return
    const newCompleted = !task.completed
    set((state) => ({
      trame: state.trame.map((t) =>
        t.id === trameId
          ? {
              ...t,
              tasks: t.tasks.map((ti) => (ti.id === taskId ? { ...ti, completed: newCompleted } : ti)),
            }
          : t
      ),
    }))
    eventBus.emit({
      type: "TRAME_TASK_TOGGLED",
      payload: { trameId, taskId, completed: newCompleted, xpReward: task.xpReward }
    })
  },
})

const createCharacterSlice = (set) => ({
  user: initialUser,
  quickStats: initialStats,
  addXP: (amount) => set((state) => ({ user: { ...state.user, xp: state.user.xp + amount } })),
})

export const useGameStore = create<GameState>()(
  persist(
    (set, get, store) => ({
      ...createTaskSlice(set, get, store),
      ...createTrameSlice(set, get),
      ...createCharacterSlice(set),
      ...createAuthSlice(set, get, store),
    }),
    {
      name: "pixel-habit-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Global session listener
if (typeof window !== "undefined") {
  // Sync Supabase Auth with Zustand
  supabase?.auth?.onAuthStateChange((_event, session) => {
    useGameStore.getState().setSessionUser(session?.user ?? null)
  })

  eventBus.subscribe((event) => {
    const store = useGameStore.getState()
    if (event.type === "TASK_TOGGLED" || event.type === "TRAME_TASK_TOGGLED") {
      const { completed, xpReward } = event.payload
      store.addXP(completed ? xpReward : -xpReward)
    }
  })
}

export const useGame = () => {
  const store = useGameStore()
  return { ...store, levelProgress: (store.user.xp % 3000) / 3000 }
}
