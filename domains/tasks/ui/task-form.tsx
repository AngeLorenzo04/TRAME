"use client"

import { useState } from "react"
import { X, Check, Zap, Target } from "lucide-react"
import { Category } from "@/domains/core/game-data"
import { CreateTaskInput } from "../types"
import { cn } from "@/lib/utils"

export function TaskForm({
  onSubmit,
  onClose
}: {
  onSubmit: (task: CreateTaskInput) => void
  onClose: () => void
}) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState<Category>("salute")
  const [xpReward, setXpReward] = useState(50)

  const categories: Category[] = ["salute", "universita", "mente", "social"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({ name, category, xpReward })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="scanlines w-full max-w-md bg-[var(--color-ink)] pixel-border-gold shadow-[0_0_50px_rgba(251,133,0,0.2)] animate-pixel-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[var(--color-gold-dark)] bg-[var(--color-gold)] p-3 text-black font-black uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Target className="size-5" />
            <span>NEW_OBJECTIVE_INITIATED</span>
          </div>
          <button onClick={onClose} className="hover:scale-110 active:scale-90 transition-transform">
            <X className="size-6" strokeWidth={4} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-steel uppercase tracking-widest">OBJECTIVE_LABEL</label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="// ENTER TASK NAME..."
              className="w-full bg-[var(--color-ink-deep)] p-4 text-paper pixel-border border-2 focus:border-[var(--color-gold)] outline-none transition-colors uppercase font-bold tracking-tighter placeholder:opacity-30"
            />
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-steel uppercase tracking-widest">SECTOR_CLASSIFICATION</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "p-2 text-[9px] font-black uppercase tracking-widest border-2 transition-all",
                    category === cat
                      ? "bg-[var(--color-gold)] text-black border-[var(--color-gold-dark)]"
                      : "bg-[var(--color-ink-deep)] text-steel border-[var(--color-ink-deep)] hover:border-steel"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* XP Slider (Simplified as buttons) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-steel uppercase tracking-widest">EXPERIENCE_REWARD_VALUE</label>
            <div className="flex items-center gap-4 bg-[var(--color-ink-deep)] p-2 pixel-border">
              <button 
                type="button" 
                onClick={() => setXpReward(Math.max(10, xpReward - 10))}
                className="size-10 bg-[var(--color-ink)] text-paper flex items-center justify-center font-black text-xl hover:bg-steel/20"
              >-</button>
              <div className="flex-1 text-center">
                <span className="text-[18px] font-black text-[var(--color-gold)]">{xpReward}</span>
                <span className="text-[10px] font-black text-paper ml-2">XP</span>
              </div>
              <button 
                type="button" 
                onClick={() => setXpReward(Math.min(200, xpReward + 10))}
                className="size-10 bg-[var(--color-ink)] text-paper flex items-center justify-center font-black text-xl hover:bg-steel/20"
              >+</button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="pixel-btn w-full bg-[var(--color-gold)] text-black font-black uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 shadow-[4px_4px_0_0_var(--color-gold-dark)] active:shadow-none"
          >
            <Zap className="size-5 fill-current" />
            DEPLOY_OBJECTIVE
          </button>
        </form>
      </div>
    </div>
  )
}
