import { create } from "zustand"
import { user as initialUser, initialTasks, trame as initialTrame, quickStats as initialStats } from "./game-data"
import type { UserData, Task, Trame, QuickStats } from "./game-data"

interface GameState {
  user: UserData
  tasks: Task[]
  trame: Trame[]
  quickStats: QuickStats
  
  // Actions
  toggleTask: (id: number) => void
  toggleTrameTask: (trameId: number, taskId: number) => void
  addXP: (amount: number) => void
}

export const useGameStore = create<GameState>((set) => ({
  user: initialUser,
  tasks: initialTasks,
  trame: initialTrame,
  quickStats: initialStats,

  toggleTask: (id: number) =>
    set((state) => {
      const task = state.tasks.find((t) => t.id === id)
      if (!task) return state

      const newCompleted = !task.completed
      const xpDiff = newCompleted ? task.xpReward : -task.xpReward

      return {
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, completed: newCompleted } : t
        ),
        user: {
          ...state.user,
          xp: state.user.xp + xpDiff,
        },
      }
    }),

  toggleTrameTask: (trameId: number, taskId: number) =>
    set((state) => {
      const trameItem = state.trame.find((t) => t.id === trameId)
      if (!trameItem) return state

      const task = trameItem.tasks.find((t) => t.id === taskId)
      if (!task) return state

      const newCompleted = !task.completed
      const xpDiff = newCompleted ? task.xpReward : -task.xpReward

      return {
        trame: state.trame.map((t) =>
          t.id === trameId
            ? {
                ...t,
                tasks: t.tasks.map((taskItem) =>
                  taskItem.id === taskId ? { ...taskItem, completed: newCompleted } : taskItem
                ),
              }
            : t
        ),
        user: {
          ...state.user,
          xp: state.user.xp + xpDiff,
        },
      }
    }),

  addXP: (amount: number) =>
    set((state) => ({
      user: {
        ...state.user,
        xp: state.user.xp + amount,
      },
    })),
}))

export const useGame = () => {
  const store = useGameStore()
  
  return {
    ...store,
    levelProgress: (store.user.xp % 3000) / 3000,
  }
}
