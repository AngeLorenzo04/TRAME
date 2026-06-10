import { Category } from "@/domains/core/game-data"

export interface Task {
  id: string
  name: string
  xpReward: number
  completed: boolean
  streak: number
  category: Category
  createdAt: number
  lastCompletedAt?: number
}

export type CreateTaskInput = Omit<Task, "id" | "completed" | "streak" | "createdAt" | "lastCompletedAt">
