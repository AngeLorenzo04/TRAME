"use client"

import { useState, memo } from "react"
import { supabase } from "@/domains/core/supabase"
import { useGameStore } from "@/domains/core/store"
import { Zap, ShieldAlert, Terminal, Loader2, Rocket, Fingerprint } from "lucide-react"
import { cn } from "@/lib/utils"

export const LoginTerminal = memo(function LoginTerminal() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<"login" | "signup">("login")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {

      // HARD BYPASS FOR LOCAL TESTING
      useGameStore.getState().setSessionUser({ id: 'local-test-pilot', email } as any)
      return;

    } catch (err: any) {
      setError(err.message || "ACCESS_DENIED")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[var(--color-ink)] scanlines pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,8,10,0.8)_100%)]" />
      </div>

      <div className="w-full max-w-lg animate-pixel-in relative z-10">
        {/* Terminal Header */}
        <div className="flex items-center gap-3 bg-[var(--color-ink-deep)] p-4 border-2 border-b-0 border-[var(--color-steel)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-blood)] via-[var(--color-gold)] to-[var(--color-cyan)] opacity-50" />
          <Terminal className="size-6 text-[var(--color-cyan)] animate-pulse-glow" />
          <div className="flex-1">
            <h1 className="text-[14px] font-black text-paper uppercase tracking-[0.3em] text-shadow-glow">NEXUS_AUTH_GATEWAY</h1>
            <p className="text-[8px] text-[var(--color-cyan)] uppercase tracking-widest font-bold">SYS.VER: 4.0.1 // ENCRYPTED_LINK</p>
          </div>
        </div>

        {/* Main Terminal Body */}
        <div className="hud-glass p-8 border-2 border-[var(--color-steel)] space-y-8 relative shadow-2xl">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 size-2 border-t-2 border-l-2 border-[var(--color-cyan)]" />
          <div className="absolute top-0 right-0 size-2 border-t-2 border-r-2 border-[var(--color-cyan)]" />
          <div className="absolute bottom-0 left-0 size-2 border-b-2 border-l-2 border-[var(--color-cyan)]" />
          <div className="absolute bottom-0 right-0 size-2 border-b-2 border-r-2 border-[var(--color-cyan)]" />

          <div className="text-center space-y-4">
            <div className="inline-flex p-4 bg-black/60 pixel-border-cyan mb-2 glow-cyan">
               {mode === "login" ? (
                 <Fingerprint className={cn("size-12 text-[var(--color-cyan)]", loading && "animate-pulse")} strokeWidth={1.5} />
               ) : (
                 <Rocket className={cn("size-12 text-[var(--color-gold)]", loading && "animate-pulse")} strokeWidth={1.5} />
               )}
            </div>
            <h2 className="text-[24px] font-black text-paper uppercase tracking-tighter text-shadow-glow">
              {mode === "login" ? "IDENTIFY_YOURSELF" : "ENROLL_NEW_PILOT"}
            </h2>
            <p className="text-[10px] font-bold text-steel uppercase tracking-widest">
              {mode === "login" ? "// AWAITING BIOMETRIC SCAN..." : "// INITIALIZING NEURAL UPLOAD..."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[9px] font-black text-[var(--color-cyan)] uppercase tracking-widest">
                  <span className="size-1.5 bg-[var(--color-cyan)] animate-pulse" />
                  USER_CREDENTIALS [EMAIL]
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 p-4 pl-4 text-paper border-b-2 border-[var(--color-steel)] focus:border-[var(--color-cyan)] focus:bg-black/80 outline-none transition-all font-bold tracking-widest uppercase placeholder:text-steel/30"
                    placeholder="ID@PIXEL.HABIT"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-cyan)] w-0 transition-all duration-300 peer-focus:w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[9px] font-black text-[var(--color-cyan)] uppercase tracking-widest">
                  <span className="size-1.5 bg-[var(--color-cyan)] animate-pulse" />
                  ACCESS_KEY [PASS]
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 p-4 pl-4 text-paper border-b-2 border-[var(--color-steel)] focus:border-[var(--color-cyan)] focus:bg-black/80 outline-none transition-all font-bold tracking-[0.3em] uppercase placeholder:text-steel/30"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-[var(--color-blood)]/10 border-l-4 border-[var(--color-blood)] p-3 flex items-center gap-3 animate-pulse glow-red">
                <ShieldAlert className="size-6 text-[var(--color-blood)] shrink-0" />
                <p className="text-[10px] font-black text-[var(--color-blood)] uppercase tracking-widest">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-5 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all",
                mode === "login" ? "pixel-btn-primary glow-red" : "pixel-btn bg-[var(--color-gold)] text-black border-[var(--color-gold-dark)] hover:bg-[var(--color-gold-dark)] glow-gold",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                <>
                   {mode === "login" ? <Zap className="size-5 fill-current" /> : <Rocket className="size-5 fill-current" />}
                   {mode === "login" ? "INITIALIZE_BOOT_UP" : "SYNC_NEW_IDENTITY"}
                </>
              )}
            </button>
          </form>

          {/* Mode Switch */}
          <div className="flex flex-col items-center gap-4 pt-6 border-t border-[var(--color-steel)]/30">
             <p className="text-[9px] font-bold text-steel uppercase tracking-widest">
               {mode === "login" ? "NO IDENTITY FOUND? " : "IDENTITY ALREADY ARCHIVED? "}
               <button 
                 onClick={() => setMode(mode === "login" ? "signup" : "login")}
                 className="text-[var(--color-cyan)] hover:text-paper hover:underline transition-colors ml-2"
               >
                 {mode === "login" ? "ENROLL_NOW" : "ACCESS_LOGIN"}
               </button>
             </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex justify-between px-2 text-[8px] font-black text-[var(--color-steel)] uppercase tracking-widest">
          <span className="flex items-center gap-2"><div className="size-1.5 bg-green-500 animate-pulse" /> NETWORK_STABLE</span>
          <span>LATENCY: 14MS</span>
        </div>
      </div>
    </div>
  )
})
