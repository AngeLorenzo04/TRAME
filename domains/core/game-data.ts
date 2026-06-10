export type Category = "salute" | "universita" | "mente" | "social"

export interface Task {
  id: number
  name: string
  xpReward: number
  completed: boolean
  streak: number
  category: Category
}

export interface UserData {
  name: string
  level: number
  xp: number
  dailyDecay: number
  streak: number
  avatar: string
  stats: {
    athleticism: number
    calmness: number
    energy: number
    focus: number
  }
}

export interface QuickStats {
  currentStreak: number
  activeTrames: number
  achievementsUnlocked: number
  leaderboardRank: number
}

export type TrameTheme = "blood" | "steel" | "energy"

export interface Trame {
  id: number
  title: string
  description: string
  step: number
  totalSteps: number
  xpReward: number
  nextMilestone: string
  theme: TrameTheme
  tasks: Task[]
}

export const user: UserData = {
  name: "Angelo",
  level: 12,
  xp: 2450,
  dailyDecay: 0.1,
  streak: 7,
  avatar: "athlete",
  stats: {
    athleticism: 85,
    calmness: 60,
    energy: 75,
    focus: 90,
  },
}

export const initialTasks: Task[] = [
  { id: 1, name: "Palestra 3x/sett", xpReward: 80, completed: false, streak: 7, category: "salute" },
  { id: 2, name: "Studiare 7h/giorno", xpReward: 120, completed: true, streak: 12, category: "universita" },
  { id: 3, name: "Meditare 10 min", xpReward: 40, completed: false, streak: 4, category: "mente" },
  { id: 4, name: "Leggere 20 pagine", xpReward: 60, completed: false, streak: 9, category: "mente" },
  { id: 5, name: "Bere 2L acqua", xpReward: 30, completed: true, streak: 21, category: "salute" },
  { id: 6, name: "Chiamare un amico", xpReward: 50, completed: false, streak: 2, category: "social" },
]

export const quickStats: QuickStats = {
  currentStreak: 7,
  activeTrames: 3,
  achievementsUnlocked: 5,
  leaderboardRank: 47,
}

export const trame: Trame[] = [
  {
    id: 1,
    title: "FORGIA DI FERRO",
    description: "Costruisci una routine di allenamento incrollabile",
    step: 4,
    totalSteps: 7,
    xpReward: 500,
    nextMilestone: "Completa 3 sessioni di palestra",
    theme: "blood",
    tasks: [
      { id: 101, name: "Palestra 3x/sett", xpReward: 80, completed: true, streak: 7, category: "salute" },
      { id: 102, name: "Stretching mattutino", xpReward: 30, completed: true, streak: 5, category: "salute" },
      { id: 103, name: "Bere 2L acqua", xpReward: 30, completed: false, streak: 21, category: "salute" },
      { id: 104, name: "10k passi al giorno", xpReward: 50, completed: false, streak: 3, category: "salute" },
      { id: 105, name: "Dormire 8h", xpReward: 40, completed: false, streak: 2, category: "salute" },
    ],
  },
  {
    id: 2,
    title: "MENTE LUCIDA",
    description: "Allena focus e calma con meditazione e lettura",
    step: 6,
    totalSteps: 8,
    xpReward: 420,
    nextMilestone: "Medita per 5 giorni di fila",
    theme: "steel",
    tasks: [
      { id: 201, name: "Meditare 10 min", xpReward: 40, completed: true, streak: 4, category: "mente" },
      { id: 202, name: "Leggere 20 pagine", xpReward: 60, completed: true, streak: 9, category: "mente" },
      { id: 203, name: "Journaling serale", xpReward: 35, completed: false, streak: 6, category: "mente" },
      { id: 204, name: "Zero social al mattino", xpReward: 45, completed: false, streak: 1, category: "mente" },
    ],
  },
  {
    id: 3,
    title: "SCALATA ACCADEMICA",
    description: "Domina la sessione universitaria a colpi di studio",
    step: 2,
    totalSteps: 10,
    xpReward: 800,
    nextMilestone: "Studia 7h al giorno per una settimana",
    theme: "energy",
    tasks: [
      { id: 301, name: "Studiare 7h/giorno", xpReward: 120, completed: true, streak: 12, category: "universita" },
      { id: 302, name: "Ripasso flashcard", xpReward: 50, completed: false, streak: 4, category: "universita" },
      { id: 303, name: "Riassunto capitolo", xpReward: 70, completed: false, streak: 2, category: "universita" },
      { id: 304, name: "Esercizi pratici", xpReward: 60, completed: false, streak: 3, category: "universita" },
      { id: 305, name: "Pomodoro x4", xpReward: 40, completed: false, streak: 5, category: "universita" },
    ],
  },
]
