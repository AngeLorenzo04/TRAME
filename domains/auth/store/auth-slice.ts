import { StateCreator } from "zustand"
import { supabase } from "@/domains/core/supabase"
import type { User } from "@supabase/supabase-js"

export interface AuthSlice {
  sessionUser: User | null
  setSessionUser: (user: User | null) => void
  signOut: () => Promise<void>
}

export const createAuthSlice: StateCreator<any, [], [], AuthSlice> = (set) => ({
  sessionUser: null,
  setSessionUser: (user) => set({ sessionUser: user }),
  signOut: async () => {
    await supabase?.auth?.signOut()
    set({ sessionUser: null })
  }
})
