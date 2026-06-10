import { create, StateCreator } from "zustand"
import { user as initialUser, initialTasks, trame as initialTrame, quickStats as initialStats } from "./game-data"
import type { UserData, Task, Trame, QuickStats } from "./game-data"
import { eventBus } from "./events"

interface TaskSlice {
  tasks: Task[]
  toggleTask: (id: number) => void
}

interface TrameSlice {
  trame: Trame[]
  toggleTrameTask: (trameId: number, taskId: number) => void
}

interface CharacterSlice {
  user: UserData
  quickStats: QuickStats
  addXP: (amount: number) => void
}

type GameState = TaskSlice & TrameSlice & CharacterSlice

const createTaskSlice: StateCreator<GameState, [], [], TaskSlice> = (set, get) => ({
  tasks: initialTasks,
  toggleTask: (id: number) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return

    const newCompleted = !task.completed
    
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: newCompleted } : t
      ),
    }))

    eventBus.emit({
      type: "TASK_TOGGLED",
      payload: {
        taskId: id,
        completed: newCompleted,
        xpReward: task.xpReward,
        category: task.category,
      },
    })
  },
})

const createTrameSlice: StateCreator<GameState, [], [], TrameSlice> = (set, get) => ({
  trame: initialTrame,
  toggleTrameTask: (trameId: number, taskId: number) => {
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
              tasks: t.tasks.map((taskItem) =>
                taskItem.id === taskId ? { ...taskItem, completed: newCompleted } : taskItem
              ),
            }
          : t
      ),
    }))

    eventBus.emit({
      type: "TRAME_TASK_TOGGLED",
      payload: {
        trameId,
        taskId,
        completed: newCompleted,
        xpReward: task.xpReward,
      },
    })
  },
})

const createCharacterSlice: StateCreator<GameState, [], [], CharacterSlice> = (set, get) => {
  // CharacterSlice subscribes to events to update XP
  eventBus.subscribe((event) => {
    if (event.type === "TASK_TOGGLED") {
      const { completed, xpReward } = event.payload
      const xpDiff = completed ? xpReward : -xpReward
      get().addXP(xpDiff)
    } else if (event.type === "TRAME_TASK_TOGGLED") {
      const { completed, xpReward } = event.payload
      const xpDiff = completed ? xpReward : -xpReward
      get().addXP(xpDiff)
    }
  })

  return {
    user: initialUser,
    quickStats: initialStats,
    addXP: (amount: number) =>
      set((state) => ({
        user: {
          ...state.user,
          xp: state.user.xp + amount,
        },
      })),
  }
}

export const useGameStore = create<GameState>((...a) => ({
  ...createTaskSlice(...a),
  ...createTrameSlice(...a),
  ...createCharacterSlice(...a),
}))

export const useGame = () => {
  const store = useGameStore()
  
  return {
    ...store,
    levelProgress: (store.user.xp % 3000) / 3000,
  }
}
