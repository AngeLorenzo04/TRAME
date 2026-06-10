type EventType = 
  | { type: "TASK_TOGGLED"; payload: { taskId: string | number; completed: boolean; xpReward: number; category: string } }
  | { type: "TRAME_TASK_TOGGLED"; payload: { trameId: number; taskId: number; completed: boolean; xpReward: number } }
  | { type: "LEVEL_UP"; payload: { newLevel: number } }

type Handler = (event: any) => void

class EventBus {
  private handlers: Set<Handler> = new Set()

  subscribe(handler: Handler) {
    this.handlers.add(handler)
    return () => {
      this.handlers.delete(handler)
    }
  }

  emit(event: EventType) {
    this.handlers.forEach(handler => handler(event))
  }
}

export const eventBus = new EventBus()
