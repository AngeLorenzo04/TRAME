# TRAME - Dashboard di Gamification

TRAME è una dashboard di gamification moderna e brutalista, progettata per trasformare le abitudini quotidiane in un'avventura narrativa di crescita personale. Costruita con Next.js e React, offre un'interfaccia pixel-art ad alto contrasto per monitorare progressi, XP e obiettivi a lungo termine.

## 🚀 Caratteristiche Principali

- **Sistema di XP e Livelli:** Guadagna esperienza completando i check-in giornalieri e scala i livelli. Attenzione al *daily decay*!
- **Avatar Dinamico:** Un personaggio che riflette le tue statistiche reali (Atletico, Riposato, Focus).
- **Check-in Giornaliero:** Monitora le tue abitudini con un sistema di task interattive divise per categorie (Salute, Università, Mente, Social).
- **Trame (Quest Narrative):** Percorsi a tappe a lungo termine (es. "Forgia di Ferro", "Mente Lucida") che raggruppano abitudini correlate.
- **Streak Tracker:** Mantieni la costanza per non spezzare la catena e visualizza la tua serie attuale.
- **Design Pixel-Art Brutalista:** Un'estetica unica con animazioni pixel e bordi definiti, ottimizzata per un'esperienza coinvolgente.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Linguaggio:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Componenti UI:** [Shadcn UI](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)
- **Icone:** [Lucide React](https://lucide.dev/)
- **Animazioni:** CSS Custom Animations (Pixel-in, Segment bar)

## 📦 Installazione e Avvio

Assicurati di avere [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) (o pnpm/yarn) installati.

1. **Clona il repository:**
   ```bash
   git clone <url-del-repo>
   cd gamification-app-frontend
   ```

2. **Installa le dipendenze:**
   ```bash
   npm install
   # oppure
   pnpm install
   ```

3. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

4. **Apri il browser:**
   Visita `http://localhost:3000` per vedere l'applicazione in funzione.

## 📂 Struttura del Progetto

- `app/`: Contiene le rotte principali e il layout dell'applicazione Next.js.
- `components/`: Componenti React riutilizzabili (Dashboard, Sidebar, TaskCard, ecc.).
- `components/ui/`: Componenti base della UI (Button, ecc.).
- `lib/`: Utility e dati simulati (`game-data.ts`).
- `public/`: Asset statici e immagini degli avatar.

## 🎨 Design System

L'app utilizza un sistema di colori personalizzato basato su variabili CSS:
- `--color-blood`: Il rosso primario per azioni e XP.
- `--color-ink-deep`: Il fondo scuro profondo.
- `--color-steel`: Colore secondario per testi e dettagli tecnici.
- `pixel-border`: Una classe utility per creare bordi in stile pixel-art.

---

Progetto sviluppato con ❤️ per la crescita personale.
