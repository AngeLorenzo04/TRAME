import { StateCreator } from "zustand"
import { Task, CreateTaskInput } from "./types"
import { initialTasks } from "@/domains/core/game-data"
import { eventBus } from "@/domains/core/events"

export interface TaskSlice {
  tasks: Task[]
  addTask: (input: CreateTaskInput) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
  resetDailyTasks: () => void
}

export const createTaskSlice: StateCreator<any, [], [], TaskSlice> = (set, get) => ({
  // Convert initial mock tasks to new format
  tasks: initialTasks.map(t => ({
    ...t,
    id: String(t.id),
    createdAt: Date.now()
  })),

  addTask: (input) => {
    const newTask: Task = {
      ...input,
      id: crypto.randomUUID(),
      completed: false,
      streak: 0,
      createdAt: Date.now()
    }
    set((state: any) => ({ tasks: [...state.tasks, newTask] }))
  },

  removeTask: (id) => {
    set((state: any) => ({
      tasks: state.tasks.filter((t: Task) => t.id !== id)
    }))
  },

  toggleTask: (id) => {
    const task = get().tasks.find((t: Task) => t.id === id)
    if (!task) return

    const newCompleted = !task.completed
    
    set((state: any) => ({
      tasks: state.tasks.map((t: Task) => 
        t.id === id ? { ...t, completed: newCompleted, lastCompletedAt: newCompleted ? Date.now() : t.lastCompletedAt } : t
      )
    }))

    eventBus.emit({
      type: "TASK_TOGGLED",
      payload: {
        taskId: id,
        completed: newCompleted,
        xpReward: task.xpReward,
        category: task.category
      }
    })
  },

  resetDailyTasks: () => {
    set((state: any) => ({
      tasks: state.tasks.map((t: Task) => ({ ...t, completed: false }))
    }))
  }
})
