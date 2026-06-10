"use client"

import { useState, useEffect, memo } from "react"
import { eventBus } from "@/domains/core/events"
import { Zap } from "lucide-react"

export const ToastSystem = memo(function ToastSystem() {
  const [toasts, setToasts] = useState<{ id: number; message: string; xp: number }[]>([])

  useEffect(() => {
    return eventBus.subscribe((event) => {
      if ((event.type === "TASK_TOGGLED" || event.type === "TRAME_TASK_TOGGLED") && event.payload.completed) {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message: "OBJECTIVE_SYNC_COMPLETE", xp: event.payload.xpReward }])
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
      }
    })
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="animate-pixel-in scanlines bg-[var(--color-gold)] text-black p-4 pixel-border-gold shadow-[8px_8px_0_0_#000] flex items-center gap-4"
        >
          <div className="bg-black text-[var(--color-gold)] p-2 pixel-border">
            <Zap className="size-6 fill-current" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest">{toast.message}</p>
            <p className="text-[20px] font-black leading-none uppercase tracking-tighter">+{toast.xp} XP RECEIVED</p>
          </div>
        </div>
      ))}
    </div>
  )
})
